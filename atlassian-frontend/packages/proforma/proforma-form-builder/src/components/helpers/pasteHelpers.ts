import cloneDeep from 'lodash/cloneDeep';
import { findChildren } from 'prosemirror-utils';

import { EditorActions } from '@atlaskit/editor-core';
import {
  FormCondition,
  OneChoiceInput,
} from '@atlassian/proforma-common-core/form-system-models';

export function transformPastedCondition(
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
  } else {
    return undefined;
  }
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
