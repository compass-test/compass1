import cloneDeep from 'lodash/cloneDeep';
import { Slice } from 'prosemirror-model';
import { findChildren } from 'prosemirror-utils';

import { EditorActions } from '@atlaskit/editor-core';
import {
  FormCondition,
  FormConditions,
  OneChoiceInput,
} from '@atlassian/proforma-common-core/form-system-models';

import { FormBuilderReferenceData } from '../../models/FormBuilderReferenceData';

import {
  checkJiraFieldAlreadyLinked,
  checkJiraFieldTypeIsValid,
} from './jiraFieldHelpers';
import {
  getUniqueQuestionKey,
  isDuplicateQuestionKey,
} from './questionKeyHelpers';

export function processSliceForInsert(
  slice: Slice,
  currentMaxIdInDoc: number,
  editorActions: EditorActions,
  currentRefData: FormBuilderReferenceData,
  currentQuestionKeys: Map<string, string>,
): {
  cleanedSlice: Slice;
  newQuestionKeys: Map<string, string>;
  newMaxId: number;
} {
  let newMaxId = currentMaxIdInDoc;
  // Keeps track of questionIds that have changed
  const updatedQuestionIds = new Map<number, number>();
  const newQuestionKeys = new Map<string, string>();

  slice.content.descendants(node => {
    const isQuestionNode =
      !!node.attrs && node.attrs.extensionKey === 'question';
    const isSectionNode = !!node.attrs && node.attrs.extensionKey === 'section';

    if (isQuestionNode || isSectionNode) {
      const originalNodeId = node.attrs.parameters.id;
      if (isSectionNode) {
        const newRandomSectionId = Math.floor(
          Math.random() * Number.MAX_SAFE_INTEGER,
        );
        node.attrs.parameters.id = newRandomSectionId;

        const insertedSectionConditions: FormConditions =
          node.attrs.parameters.conditions;
        const newSectionConditions: FormConditions = cloneDeep(
          node.attrs.parameters.conditions,
        );

        if (insertedSectionConditions) {
          Object.keys(insertedSectionConditions).forEach(conditionId => {
            const insertedCondition = insertedSectionConditions[conditionId];
            const transformedCondition = transformInsertedCondition(
              insertedCondition,
              updatedQuestionIds,
              originalNodeId.toString(),
              newRandomSectionId.toString(),
              editorActions,
            );

            // Update condition replacing the old one
            delete newSectionConditions[conditionId];
            newMaxId += 1;
            if (transformedCondition) {
              newSectionConditions[newMaxId] = transformedCondition;
            }
          });
          node.attrs.parameters.conditions = newSectionConditions;
        }
      }

      if (isQuestionNode) {
        newMaxId += 1;
        node.attrs.parameters.id = newMaxId;

        updatedQuestionIds.set(originalNodeId, newMaxId);
        const { questionKey, dcId, jiraField } = node.attrs.parameters;

        if (questionKey) {
          // The pasted content includes a question key, check that it will not cause duplication, if so assign a new question Key.
          const questionId = newMaxId.toString();
          if (
            isDuplicateQuestionKey(questionId, questionKey, currentQuestionKeys)
          ) {
            node.attrs.parameters.questionKey = getUniqueQuestionKey(
              questionId,
              questionKey,
              currentQuestionKeys,
            );
            newQuestionKeys.set(questionId, questionKey);
          }
        }

        if (dcId) {
          const dataConnectionAvailable =
            currentRefData.dataConnectionMap &&
            currentRefData.dataConnectionMap.has(dcId);

          if (!dataConnectionAvailable) {
            delete node.attrs.parameters.dcId;
          }
        }

        if (jiraField) {
          const jiraFieldUnavailable =
            !currentRefData.jiraFieldMap ||
            !currentRefData.jiraFieldMap.has(jiraField);
          const jiraFieldAlreadyLinked = checkJiraFieldAlreadyLinked(
            jiraField,
            editorActions,
          );
          const jiraFieldTypeInvalid = !checkJiraFieldTypeIsValid(
            jiraField,
            node.attrs.parameters,
            currentRefData,
          );

          if (
            jiraFieldUnavailable ||
            jiraFieldAlreadyLinked ||
            jiraFieldTypeInvalid
          ) {
            delete node.attrs.parameters.jiraField;
          }
        }
      }
    }
    return true;
  });

  return { cleanedSlice: slice, newQuestionKeys, newMaxId };
}

export function transformInsertedCondition(
  pastedCondition: FormCondition,
  updatedQuestionIds: Map<number, number>, // QuestionIds that have been updated during the paste
  originalSectionId: string,
  newSectionId: string,
  editorActions: EditorActions,
): FormCondition | undefined {
  const transformedCondition = cloneDeep(pastedCondition);
  let updatedLinkedQuestionChoices;
  // Update condition inputs, TODO: handle other types of condition input
  // Condition is a OneChoiceInput
  if (pastedCondition.i.co) {
    // update dependent questions
    updatedLinkedQuestionChoices = updateLinkedQuestionChoices(
      pastedCondition.i.co.cIds,
      updatedQuestionIds,
      editorActions,
    );
  }

  let updatedOutputSIds;
  // Update condition outputs, TODO: handle other condition outputs
  // condition applies to a section
  if (pastedCondition.o.sIds) {
    updatedOutputSIds = updateOutputSIds(
      pastedCondition.o.sIds,
      originalSectionId,
      newSectionId,
    );
  }

  if (
    updatedLinkedQuestionChoices &&
    Object.keys(updatedLinkedQuestionChoices).length > 0
  ) {
    transformedCondition.i.co!.cIds = updatedLinkedQuestionChoices;
    transformedCondition.o.sIds = updatedOutputSIds;
    return transformedCondition;
  }
  return undefined;
}

function updateLinkedQuestionChoices(
  linkedQuestions: OneChoiceInput['cIds'],
  updatedQuestionIds: Map<number, number>,
  editorActions: EditorActions,
): OneChoiceInput['cIds'] {
  const newLinkedQuestions: OneChoiceInput['cIds'] = {};

  Object.keys(linkedQuestions).forEach(linkedQuestionKey => {
    const linkedQuestionId = parseInt(linkedQuestionKey, 10);

    const canBeLinkedInPastedContent = updatedQuestionIds.has(linkedQuestionId);
    const canBeLinkedInDoc = docContainsValidLinkedQuestion(
      linkedQuestionId,
      linkedQuestions[linkedQuestionKey],
      editorActions,
    );

    if (canBeLinkedInPastedContent) {
      const newLinkedQuestionKey = updatedQuestionIds.get(linkedQuestionId);
      if (newLinkedQuestionKey) {
        newLinkedQuestions[newLinkedQuestionKey.toString()] =
          linkedQuestions[linkedQuestionKey];
      }
      return;
    }

    if (canBeLinkedInDoc) {
      newLinkedQuestions[linkedQuestionKey] =
        linkedQuestions[linkedQuestionKey];
    }
  });

  return newLinkedQuestions;
}

function docContainsValidLinkedQuestion(
  questionId: number,
  conditionChoiceIds: string[],
  editorActions: EditorActions,
): boolean {
  const editorView = editorActions._privateGetEditorView();
  if (!editorView) {
    // eslint-disable-next-line no-console
    console.error('Could not get question node, editor view is undefined');
    return false;
  }

  const questionNode = findChildren(
    editorView.state.doc,
    node => node.attrs.parameters && node.attrs.parameters.id === questionId,
  )[0];
  if (!questionNode?.node?.attrs.parameters?.choices) {
    return false;
  }

  // Check question is above current selection, so that pasted section is bellow linked question
  const currentSelectionPos = editorView.state.selection.$anchor.pos;
  if (questionNode.pos > currentSelectionPos) {
    return false;
  }

  const questionChoicesIds = questionNode.node.attrs.parameters.choices.map(
    // @ts-ignore
    choice => choice.id,
  );
  return conditionChoiceIds.every(conditionChoice =>
    questionChoicesIds.includes(conditionChoice),
  );
}

function updateOutputSIds(
  originalOutputSIds: string[],
  originalSectionId: string,
  newSectionId: string,
): string[] {
  let transformedOutputSIds = cloneDeep(originalOutputSIds);
  // Remove original sectionId
  transformedOutputSIds = transformedOutputSIds.filter(
    (sectionId: string) => sectionId !== originalSectionId,
  );
  // Insert new SectionID
  transformedOutputSIds.push(newSectionId);

  return transformedOutputSIds;
}
