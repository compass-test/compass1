import { Plugin } from 'prosemirror-state';
import { findChildren } from 'prosemirror-utils';

import {
  FormQuestionType,
  QuestionParameters,
} from '@atlassian/proforma-common-core/form-system-models';

export const generateQuestionDeletedPlugin = (
  questionDeletedHandler: (questionId: number, type: FormQuestionType) => void,
): Plugin => {
  return new Plugin({
    view: editorView => ({
      update(view, lastState) {
        const newDoc = view.state.doc;
        const lastDoc = lastState.doc;

        const questionsBefore: QuestionParameters[] = findChildren(
          lastDoc,
          node =>
            node.attrs && node.attrs.extensionType === 'com.thinktilt.proforma',
        ).map(nodeWithPos => nodeWithPos.node.attrs.parameters);

        const questionsAfter: QuestionParameters[] = findChildren(
          newDoc,
          node =>
            node.attrs && node.attrs.extensionType === 'com.thinktilt.proforma',
        ).map(nodeWithPos => nodeWithPos.node.attrs.parameters);

        const deletedQuestions = questionsBefore.filter(
          questionBefore =>
            !questionsAfter.find(
              questionAfter => questionAfter.id === questionBefore.id,
            ),
        );

        deletedQuestions.forEach(parameters => {
          questionDeletedHandler(parameters.id, parameters.type);
        });
      },
    }),
  });
};
