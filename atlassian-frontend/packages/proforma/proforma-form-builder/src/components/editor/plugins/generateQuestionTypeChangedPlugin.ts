import { Plugin } from 'prosemirror-state';
import { findChildren } from 'prosemirror-utils';

import {
  FormQuestionType,
  QuestionParameters,
} from '@atlassian/proforma-common-core/form-system-models';

export const generateQuestionTypeChangedPlugin = (
  questionTypeChangedHandler: (
    questionId: number,
    prevType: FormQuestionType,
    newType: FormQuestionType,
  ) => void,
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

        questionsBefore.forEach(questionParametersBefore => {
          const questionParametersAfter:
            | QuestionParameters
            | undefined = questionsAfter.find(
            q => q.id === questionParametersBefore.id,
          );

          if (questionParametersAfter) {
            if (
              questionParametersBefore.type !== questionParametersAfter.type
            ) {
              questionTypeChangedHandler(
                questionParametersBefore.id,
                questionParametersBefore.type,
                questionParametersAfter.type,
              );
            }
          }
        });
      },
    }),
  });
};
