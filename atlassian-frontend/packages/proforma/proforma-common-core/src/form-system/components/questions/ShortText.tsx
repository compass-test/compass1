import React, { FC } from 'react';

import { observer } from 'mobx-react';

import { usePfFlags } from '../../../jira-common/context/FlagsContext';
import { QuestionProps } from '../QuestionProps';

import { EditShortText } from './edit/EditShortText';
import { ViewShortText } from './view/ViewShortText';

export const ShortText: FC<QuestionProps> = observer(
  ({ id, questionStore, view }) => {
    const flags = usePfFlags();

    if (
      view ||
      (flags.ReadOnlyQuestions && questionStore.formQuestion.readOnly)
    ) {
      return <ViewShortText id={id} value={questionStore.currentAnswer} />;
    }

    return (
      <EditShortText
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
