import { ADFEntity, filter } from '@atlaskit/adf-utils';
import {
  AdfFormQuestion,
  FormCondition,
  FormConditions,
  FormLayout,
  FormLayoutNode,
  FormLayoutNodeExtension,
  FormQuestion,
  FormQuestions,
  FormSection,
  FormSections,
  FormSectionType,
  isShowCondition,
  ShowCondition,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';
import { removeQuestionChoices } from '@atlassian/proforma-common-core/form-system-utils';

import { AdfForm } from '../models/AdfForm';
import { SectionParameters } from '../models/SectionParameters';

interface NodeAndQuestions {
  node: FormLayoutNode;
  completedLayouts: FormLayout[];
  questions: FormQuestions;
  sections: FormSections;
  conditions: FormConditions;
  split: boolean;
}

interface ContentAndQuestions {
  updatedContent: FormLayoutNode[];
  completedLayouts: FormLayout[];
  updatedQuestions: FormQuestions;
  updatedSections: FormSections;
  updatedConditions: FormConditions;
}

interface AugmentedSections {
  [sectionId: string]: AugmentedSection;
}

interface AugmentedSection {
  type: FormSectionType;
  name?: string;
  conditions?: string[];
  questions?: string[];
}

/**
 * Converts an AdfForm into a TemplateForm suitable for saving to the backend.
 * Question properties are copied out of the ADF document and into the form questions property.
 *
 * You are required to provide both a form and some ADF because the ADF is not a complete representation
 * of a form — it is just the design. The form is updated rather than created from scratch.
 *
 * @param form The TemplateForm to be updated with data from ADF.
 * @param adf The ADF from the form builder to apply to this form.
 */
export function adfToTemplateForm(
  form: TemplateForm,
  adf: AdfForm,
  keepRefData?: boolean,
): TemplateForm {
  /**
   * Move questions out of the given ADF node and into a questions object. Any question found in the ADF is placed in the questions object returned
   * by this function, and removed from the ADF (except for the ID which remains in the ADF). This function is designed to be called recursively.
   *
   * @param node An ADF node, may be the top level of an ADF document or any level within it.
   * @param questions An object to add the questions encountered in the given ADF node.
   */
  function extractQuestions(
    node: FormLayoutNode,
    layouts: FormLayout[],
    questions: FormQuestions,
    sections: FormSections,
    conditions: FormConditions,
  ): NodeAndQuestions {
    // If this node has content then recursively process that first. This uses a reducer so that as questions accumulate into a single object.
    const childData = node?.content
      ? node.content.reduce(
          (accumulator, currentNode): ContentAndQuestions => {
            const {
              updatedContent,
              completedLayouts,
              updatedQuestions,
              updatedSections,
              updatedConditions,
            } = accumulator;
            const nodeAndQuestions = extractQuestions(
              currentNode,
              completedLayouts,
              updatedQuestions,
              updatedSections,
              updatedConditions,
            );
            if (nodeAndQuestions.split) {
              // The node indicates that it is split in the document, so create a new document in the layout array
              nodeAndQuestions.completedLayouts.push({
                version: 1,
                type: 'doc',
                content: updatedContent,
              });
              return {
                updatedContent: [],
                completedLayouts: nodeAndQuestions.completedLayouts,
                updatedQuestions: nodeAndQuestions.questions,
                updatedSections: nodeAndQuestions.sections,
                updatedConditions: nodeAndQuestions.conditions,
              };
            } else {
              // This is a normal node, so include it in the existing layout
              updatedContent.push(nodeAndQuestions.node);
              return {
                updatedContent,
                completedLayouts: nodeAndQuestions.completedLayouts,
                updatedQuestions: nodeAndQuestions.questions,
                updatedSections: nodeAndQuestions.sections,
                updatedConditions: nodeAndQuestions.conditions,
              };
            }
          },
          {
            updatedContent: [] as FormLayoutNode[],
            completedLayouts: layouts,
            updatedQuestions: questions,
            updatedSections: sections,
            updatedConditions: conditions,
          } as ContentAndQuestions,
        )
      : undefined;

    let updatedLayouts = childData ? childData.completedLayouts : layouts;
    let updatedQuestions = childData ? childData.updatedQuestions : questions;
    let updatedSections = childData ? childData.updatedSections : sections;
    let updatedConditions = childData
      ? childData.updatedConditions
      : conditions;
    let updatedNode: FormLayoutNode = {
      ...node,
      ...(childData &&
        childData.updatedContent && {
          content: childData.updatedContent,
        }),
    };
    let split = false;

    const getSectionConditionIds = (
      sectionParameters: SectionParameters,
    ): string[] => {
      return sectionParameters.conditions
        ? Object.keys(sectionParameters.conditions)
        : [];
    };

    const extractConditionFromSection = (
      sectionIndex: number,
      sectionParameters: SectionParameters,
    ): [string | undefined, FormCondition | undefined] => {
      if (!sectionParameters.conditions) {
        return [undefined, undefined];
      }

      const conditionId = Object.keys(sectionParameters.conditions)[0];
      const condition = {
        ...sectionParameters.conditions[conditionId],
        o: {
          sIds: [sectionIndex.toString()],
        },
      };

      return [conditionId, condition];
    };

    if (
      (node && node.type === 'extension') ||
      node.type === 'bodiedExtension'
    ) {
      // This node is an extension so we may be able to extract a question from it
      const extensionNode = node as FormLayoutNodeExtension;
      const {
        attrs: { extensionType, extensionKey, parameters },
      } = extensionNode;
      if (extensionType === 'com.thinktilt.proforma') {
        if (
          extensionKey === 'question' &&
          parameters &&
          (parameters as AdfFormQuestion).id
        ) {
          // This is a question, so grab it and remove its ID
          const questionParameters = parameters as AdfFormQuestion;
          const questionId = questionParameters.id;
          delete questionParameters.id;
          let question = questionParameters as FormQuestion;
          // If this is linked to a Jira field or data connection, remove the choices because they the linked field will provide them.
          if ((question.jiraField || question.dcId) && !keepRefData) {
            question = removeQuestionChoices(question);
          }
          // Add the question to the questions object.
          updatedQuestions = {
            ...updatedQuestions,
            [questionId!]: question,
          };
          // Update the ADF node to remove the question (except for the ID)
          updatedNode = {
            ...updatedNode,
            attrs: {
              ...updatedNode.attrs,
              parameters: {
                id: questionId,
              },
            },
          };
        }

        if (extensionKey === 'section' && parameters) {
          // This is a section node, so transfer its properties to a form section
          const sectionParameters = parameters as SectionParameters;
          // The section index is the position where this section will be in the layouts array
          const sectionIndex = updatedLayouts.length + 1;

          const [conditionId, condition] = extractConditionFromSection(
            sectionIndex,
            parameters as SectionParameters,
          );
          const sectionConditionIds = getSectionConditionIds(
            parameters as SectionParameters,
          );
          const section: FormSection = {
            type: FormSectionType.Block,
            name: sectionParameters.name,
            conditions: sectionConditionIds,
          };
          // Add the section to the sections object.
          updatedSections = {
            ...updatedSections,
            [sectionIndex]: section,
          };
          // Add the condition to the conditions object.
          if (conditionId && condition) {
            updatedConditions = {
              ...updatedConditions,
              [conditionId]: condition,
            };
          } else {
            updatedConditions = {
              ...updatedConditions,
            };
          }
          // Update the ADF node to remove the section (except for the ID)
          updatedNode = {
            type: '',
          };
          // Split the layouts here
          split = true;
        }
      }
    }

    return {
      node: updatedNode,
      completedLayouts: updatedLayouts,
      questions: updatedQuestions,
      sections: updatedSections,
      conditions: updatedConditions,
      split,
    };
  }

  // Call the recursive function to walk through the ADF and find all the questions.
  const {
    node,
    completedLayouts,
    questions,
    sections,
    conditions,
  } = extractQuestions(adf, [], {}, {}, {});

  // The final section doesn't have a delimiter after it, so add it to the layouts now
  const layouts = [...completedLayouts, node as FormLayout];

  const finalSections = updateSectionsWithCascadingConditions(
    sections,
    conditions,
    layouts,
  );

  return {
    ...form,
    design: {
      ...form.design,
      layout: layouts,
      questions,
      sections: finalSections,
      conditions,
      settings: {
        ...form.design.settings,
      },
    },
  };
}

const updateSectionsWithCascadingConditions = (
  sections: FormSections,
  conditions: FormConditions,
  layouts: FormLayoutNode[],
): FormSections => {
  // Get augmented version of sections including the questions they are part of
  const sectionsWithIncludedQuestions: AugmentedSections = getAugmentedSections(
    sections,
    layouts,
  );

  const newSections = { ...sections };

  Object.keys(newSections).forEach(sectionId => {
    const section: AugmentedSection = newSections[sectionId];
    const sectionConditions = section.conditions || [];
    section.conditions = getParentConditionsToSection(
      sectionId,
      section,
      sectionConditions,
      conditions,
      sectionsWithIncludedQuestions,
    );
  });

  // Remove questions property in sections
  Object.keys(newSections).forEach(sectionId => {
    delete (newSections[sectionId] as AugmentedSection).questions;
  });

  return newSections;
};

function getParentConditionsToSection(
  sectionId: string,
  section: FormSection,
  sectionConditions: string[],
  formConditions: FormConditions,
  augmentedSections: AugmentedSections,
): string[] {
  let newSectionConditions = [...sectionConditions];

  const sectionCondition = getConditionFromSectionId(formConditions, sectionId);
  if (!sectionCondition) {
    return newSectionConditions;
  }

  const dependentQuestion = Object.keys(
    sectionCondition.i.co!.cIds,
  )[0] as string;
  // If the dependent question is in another section
  Object.keys(augmentedSections).forEach(augmentedSectionId => {
    const augmentedSection = augmentedSections[augmentedSectionId];

    if (
      augmentedSection.questions &&
      augmentedSection.questions.includes(dependentQuestion) &&
      augmentedSection.conditions
    ) {
      // add conditions from parent section
      newSectionConditions = [
        ...newSectionConditions,
        ...augmentedSection.conditions,
      ];
      // Remove duplicates
      newSectionConditions = newSectionConditions.filter(
        (item, index) => newSectionConditions.indexOf(item) === index,
      );
      // keep going up the parent sections to get their conditions
      newSectionConditions = [
        ...getParentConditionsToSection(
          augmentedSectionId,
          augmentedSection,
          newSectionConditions,
          formConditions,
          augmentedSections,
        ),
      ];
    }
  });

  return newSectionConditions;
}

function getConditionFromSectionId(
  conditions: FormConditions,
  sectionId: string,
): ShowCondition | undefined {
  let resultCondition: ShowCondition | undefined;

  Object.keys(conditions).forEach(conditionId => {
    const condition = conditions[conditionId];
    if (
      isShowCondition(condition) &&
      condition.o.sIds &&
      condition.o.sIds.includes(sectionId)
    ) {
      resultCondition = condition;
    }
  });

  return resultCondition;
}

function getAugmentedSections(
  sections: FormSections,
  layouts: FormLayoutNode[],
): AugmentedSections {
  const newSections: AugmentedSections = { ...sections };

  Object.keys(newSections).forEach(sectionId => {
    // @ts-ignore
    const sectionLayout = layouts[sectionId];
    if (sectionLayout) {
      newSections[sectionId].questions = getQuestionIdsFromSectionLayout(
        sectionLayout,
      );
    }
  });

  return newSections;
}

function getQuestionIdsFromSectionLayout(
  sectionLayout: FormLayoutNode,
): string[] {
  const sectionQuestionNodes = filter(sectionLayout, (node: ADFEntity) => {
    if (!node.attrs || !node.attrs.parameters || !node.attrs.parameters.id) {
      return false;
    }
    return node.attrs.extensionKey === 'question';
  });
  return sectionQuestionNodes.map((node: ADFEntity) =>
    node.attrs!.parameters.id.toString(),
  );
}
