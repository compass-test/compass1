import cloneDeep from 'lodash/cloneDeep';
import { EditorView } from 'prosemirror-view';

import { FormCondition } from '@atlassian/proforma-common-core/form-system-models';

export interface ConditionInfo {
  sectionId: string;
  conditionId: number;
  condition: FormCondition;
}

export function findConditionsDependentOnQuestion(
  editorView: EditorView,
  questionId: number,
): any {
  const dependentConditions: ConditionInfo[] = [];
  editorView.state.doc.descendants((node, pos, parent) => {
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
            const sectionId = node.attrs.parameters.id;
            dependentConditions.push({
              sectionId,
              conditionId: parseInt(conditionKey, 10),
              condition,
            });
          }
        }
      });
    }
  });

  return dependentConditions;
}

export function removeConditionsFromDoc(
  conditionsToRemove: ConditionInfo[],
  editorView: EditorView,
): void {
  const editorState = editorView.state;
  let transaction = editorState.tr;

  editorState.doc.descendants((node, pos, parent) => {
    const isSectionNode = !!node.attrs && node.attrs.extensionKey === 'section';
    if (isSectionNode) {
      const sectionId = node.attrs.parameters.id;
      const conditionToDrop = conditionsToRemove.find(
        c => c.sectionId === sectionId,
      );
      if (conditionToDrop) {
        const newSectionConditions = cloneDeep(
          node.attrs.parameters.conditions,
        );
        delete newSectionConditions[conditionToDrop.conditionId];
        transaction = transaction.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          parameters: {
            ...node.attrs.parameters,
            conditions: newSectionConditions,
          },
        });
      }
    }
    return true;
  });

  editorView.dispatch(transaction);
}
