import {
  FormCondition,
  FormConditions,
  FormLayoutNode,
  FormLayoutNodeExtension,
  isShowCondition,
  TemplateForm,
} from '@atlassian/proforma-common-core/form-system-models';

import { AdfForm } from '../models/AdfForm';

/**
 * Converts a TemplateForm into an AdfForm suitable for editing in the Atlassian Editor.
 * Question properties are copied from the form design into the ADF document.
 *
 * @param form The TemplateForm to convert to into an AdfForm.
 */
export function templateFormToAdfForm(form: TemplateForm): AdfForm {
  const { layout, questions, sections } = form.design;

  // Allocate random section IDs for use within the form builder
  const newSectionIds = layout.map(layoutSection =>
    Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
  );

  function populateExtensionAttrs(node: FormLayoutNode): FormLayoutNode {
    // If this node has content then recursively process those child nodes first
    const childContent = node.content
      ? node.content.map(childNode => populateExtensionAttrs(childNode))
      : undefined;

    if (node.type === 'extension' || node.type === 'bodiedExtension') {
      // This node is an extension so it needs question data copied from the form into the node
      const extensionNode = node as FormLayoutNodeExtension;
      const {
        attrs: { extensionType, extensionKey },
      } = extensionNode;

      if (extensionType === 'com.thinktilt.proforma') {
        if (extensionKey === 'question') {
          const questionId =
            extensionNode.attrs.parameters && extensionNode.attrs.parameters.id;
          const question = questions[`${questionId}`];
          if (!question) {
            // eslint-disable-next-line no-console
            console.debug(
              `ProForma could not convert question ${questionId} to ADF because the question was not found`,
            );
          }
          return {
            ...extensionNode,
            attrs: {
              ...extensionNode.attrs,
              parameters: {
                ...question,
                id: questionId,
              },
            },
            ...(childContent && {
              content: childContent,
            }),
          };
        }

        if (extensionKey === 'section') {
          const sectionId =
            extensionNode.attrs.parameters && extensionNode.attrs.parameters.id;
          const section = sections[`${sectionId}`];
          if (!section) {
            // eslint-disable-next-line no-console
            console.debug(
              `ProForma could not convert section ${sectionId} to ADF because the section was not found`,
            );
          }

          // Generate the title to display above the section
          const extensionTitle = section.name
            ? `Section: ${section.name}`
            : undefined;

          return {
            ...extensionNode,
            attrs: {
              ...extensionNode.attrs,
              parameters: {
                id: sectionId,
                name: section.name,
                conditions: getSectionConditions(
                  form.design.conditions,
                  sectionId,
                ),
                extensionTitle,
              },
            },
            ...(childContent && {
              content: childContent,
            }),
          };
        }
      }
    }

    if (childContent) {
      // This node is not an extension, but it does contain content which might have extension in it so it must be rewritten
      return {
        ...node,
        content: childContent,
      };
    }

    // This node is not an extension and does not have child content so it does not need to be rewritten
    return node;
  }

  function populateSectionExtensionNode(sectionIndex: number): FormLayoutNode {
    const section = sections[`${sectionIndex}`];
    if (!section) {
      // eslint-disable-next-line no-console
      console.debug(
        `ProForma could not convert section ${sectionIndex} to ADF because the section was not found`,
      );
    }

    const sectionId = newSectionIds[sectionIndex];

    const name = section ? section.name : undefined;
    const extensionTitle = name ? `Section: ${name}` : undefined;

    return {
      type: 'extension',
      attrs: {
        extensionType: 'com.thinktilt.proforma',
        extensionKey: 'section',
        parameters: {
          name,
          extensionTitle,
          id: sectionId,
          conditions: getSectionConditions(
            form.design.conditions,
            sectionIndex,
          ),
        },
        layout: 'default',
      },
    };
  }

  const getSectionConditions = (
    formConditions: FormConditions | undefined,
    sectionIndex: string | number | undefined,
  ): FormConditions => {
    if (!formConditions || !sectionIndex) {
      return {};
    }

    let sectionCondition: FormCondition | undefined;
    let conditionId: string | undefined;

    Object.keys(formConditions).forEach(conditionKey => {
      const c = formConditions[conditionKey];
      if (isShowCondition(c)) {
        if (c.o.sIds && c.o.sIds.includes(`${sectionIndex}`)) {
          // Copy the section condition but remove its output, the output IDs will be recalculated on save
          sectionCondition = { ...c, o: {} };
          conditionId = conditionKey;
        }
      }
    });

    const sectionConditions = {};

    if (sectionCondition && conditionId) {
      // @ts-ignore
      sectionConditions[conditionId] = sectionCondition;
    }

    return sectionConditions;
  };

  const content: FormLayoutNode[] = layout.reduce(
    (content, layoutSection, index) => {
      if (index > 0) {
        content.push(populateSectionExtensionNode(index));
      }

      const layoutContent = populateExtensionAttrs(layoutSection);

      if (layoutContent.content) {
        content.push(...layoutContent.content);
      }

      return content;
    },
    [] as FormLayoutNode[],
  );

  return {
    type: 'doc',
    version: 1,
    content,
  } as AdfForm;
}
