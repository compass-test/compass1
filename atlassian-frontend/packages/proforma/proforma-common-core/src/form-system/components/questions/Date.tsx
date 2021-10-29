import React, { FC } from 'react';

import { observer } from 'mobx-react';

import { usePfFlags } from '../../../jira-common/context/FlagsContext';
import { QuestionProps } from '../QuestionProps';

import { EditDate } from './edit/EditDate';
import { ViewDate } from './view/ViewDate';

export const Date: FC<QuestionProps> = observer(
  ({ id, questionStore, view }) => {
    const flags = usePfFlags();

    if (
      view ||
      (flags.ReadOnlyQuestions && questionStore.formQuestion.readOnly)
    ) {
      return <ViewDate id={id} value={questionStore.currentAnswer} />;
    }

    return (
      <EditDate
        id={id}
        value={questionStore.currentAnswer}
        isInvalid={!!questionStore.validationErrors}
        onChange={(value: string) => questionStore.setAnswer(value)}
      />
    );
  },
);
