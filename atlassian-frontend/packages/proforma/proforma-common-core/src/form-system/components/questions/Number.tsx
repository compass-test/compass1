import React, { FC } from 'react';

import { observer } from 'mobx-react';

import { usePfFlags } from '../../../jira-common/context/FlagsContext';
import { QuestionProps } from '../QuestionProps';

import { EditNumber } from './edit/EditNumber';
import { ViewNumber } from './view/ViewNumber';

export const Number: FC<QuestionProps> = observer(
  ({ id, questionStore, view }) => {
    const flags = usePfFlags();

    if (
      view ||
      (flags.ReadOnlyQuestions && questionStore.formQuestion.readOnly)
    ) {
      return <ViewNumber id={id} value={questionStore.currentAnswer} />;
    }

    return (
      <EditNumber
        id={id}
        value={questionStore.currentAnswer}
        isInvalid={!!questionStore.validationErrors}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value.trim().replace(/[^\d.\-,]/g, '');
          questionStore.setAnswer(value);
        }}
      />
    );
  },
);
