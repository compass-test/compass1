import { Slice } from 'prosemirror-model';
import { findChildren } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';

import {
  AdfFormSection,
  FormCondition,
} from '@atlassian/proforma-common-core/form-system-models';

import { ConditionInfo } from './sectionHelpers';

function checkLinkedQuestionIsInSlice(
  slice: Slice,
  questionKey: string,
): boolean {
  let questionFound = false;
  slice.content.descendants(node => {
    if (node.attrs.parameters && node.attrs.parameters.id === questionKey) {
      questionFound = true;
    }
    return !questionFound; // This stops the descendants() function from goign down child nodes once the question is found
  });
  return questionFound;
}

function checkLinkedQuestionIsAboveDroppedSection(
  questionId: number,
  editorView: EditorView,
  dropPositon: number,
): boolean {
  const questionNodeInDoc = findChildren(
    editorView.state.doc,
    node => node.attrs.parameters && node.attrs.parameters.id === questionId,
  )[0];

  if (!questionNodeInDoc) {
    return false;
  }

  return questionNodeInDoc.pos < dropPositon;
}

export function findConditionsBrokenByDroppedSection(
  sectionParameters: AdfFormSection,
  droppedSlice: Slice,
  dropPosition: number,
  editorView: EditorView,
): ConditionInfo[] {
  const conditionsToRemove: ConditionInfo[] = [];

  const sectionConditions = sectionParameters.conditions;
  const sectionId = sectionParameters.id as string;
  const sectionContainsConditions =
    sectionConditions && Object.keys(sectionConditions).length > 0;

  if (sectionConditions && sectionContainsConditions) {
    Object.keys(sectionConditions).forEach(conditionKey => {
      const condition: FormCondition = sectionConditions[conditionKey];

      if (condition.i.co) {
        const linkedQuestions = condition.i.co.cIds;
        Object.keys(linkedQuestions).forEach(linkedQuestionKey => {
          const linkedQuestionIsInDroppedSlice = checkLinkedQuestionIsInSlice(
            droppedSlice,
            linkedQuestionKey,
          );
          if (!linkedQuestionIsInDroppedSlice) {
            if (
              !checkLinkedQuestionIsAboveDroppedSection(
                parseInt(linkedQuestionKey, 10),
                editorView,
                dropPosition,
              )
            ) {
              // The condition needs to be dropped because it's linked question is no longer valid
              conditionsToRemove.push({
                sectionId,
                conditionId: parseInt(conditionKey, 10),
                condition,
              });
            }
          }
        });
      }
    });
  }

  return conditionsToRemove;
}

export function findConditionsBrokenByDroppedQuestion(
  questionId: number,
  editorView: EditorView,
  dropPosition: number,
): ConditionInfo[] {
  const conditionsToRemove: ConditionInfo[] = [];
  editorView.state.doc.descendants((node, pos) => {
    if (
      node.attrs &&
      node.attrs.extensionKey === 'section' &&
      node.attrs.parameters &&
      node.attrs.parameters.conditions
    ) {
      Object.keys(node.attrs.parameters.conditions).forEach(conditionKey => {
        const condition: FormCondition =
          node.attrs.parameters.conditions[conditionKey];

        if (condition.i.co) {
          const linkedQuestions = condition.i.co.cIds;
          if (Object.keys(linkedQuestions).includes(questionId.toString())) {
            // Check if node is below drop position
            if (dropPosition > pos) {
              const sectionId = node.attrs.parameters.id;
              conditionsToRemove.push({
                sectionId,
                conditionId: parseInt(conditionKey, 10),
                condition,
              });
            }
          }
        }
      });
    }
  });

  return conditionsToRemove;
}
