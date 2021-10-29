import React, { FC } from 'react';

import { observer } from 'mobx-react';

import { usePfFlags } from '../../../jira-common/context/FlagsContext';
import { QuestionProps } from '../QuestionProps';

import { EditParagraph } from './edit/EditParagraph';
import { ViewParagraph } from './view/ViewParagraph';

export const Paragraph: FC<QuestionProps> = observer(
  ({ id, questionStore, view }) => {
    const flags = usePfFlags();

    if (
      view ||
      (flags.ReadOnlyQuestions && questionStore.formQuestion.readOnly)
    ) {
      return <ViewParagraph id={id} value={questionStore.currentAnswer} />;
    }

    return (
      <EditParagraph
        id={id}
        value={questionStore.currentAnswer}
        isInvalid={!!questionStore.validationErrors}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          questionStore.setAnswer(event.target.value)
        }
      />
    );
  },
);
