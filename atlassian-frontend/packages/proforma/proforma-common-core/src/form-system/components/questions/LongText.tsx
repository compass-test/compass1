import React, { FC } from 'react';

import { observer } from 'mobx-react';

import { usePfFlags } from '../../../jira-common/context/FlagsContext';
import { QuestionProps } from '../QuestionProps';

import { EditLongText } from './edit/EditLongText';
import { ViewLongText } from './view/ViewLongText';

export const LongText: FC<QuestionProps> = observer(
  ({ id, questionStore, view }) => {
    const flags = usePfFlags();

    if (
      view ||
      (flags.ReadOnlyQuestions && questionStore.formQuestion.readOnly)
    ) {
      return <ViewLongText id={id} value={questionStore.currentAnswer} />;
    }

    return (
      <EditLongText
        id={id}
        value={questionStore.currentAnswer}
        isInvalid={!!questionStore.validationErrors}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          questionStore.setAnswer(event.target.value)
        }
      />
    );
  },
);
