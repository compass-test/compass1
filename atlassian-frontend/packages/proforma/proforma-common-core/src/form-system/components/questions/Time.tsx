import React, { FC } from 'react';

import { observer } from 'mobx-react';

import { usePfFlags } from '../../../jira-common/context/FlagsContext';
import { QuestionProps } from '../QuestionProps';

import { EditTime } from './edit/EditTime';
import { ViewTime } from './view/ViewTime';

export const Time: FC<QuestionProps> = observer(
  ({ id, questionStore, view }) => {
    const flags = usePfFlags();

    if (
      view ||
      (flags.ReadOnlyQuestions && questionStore.formQuestion.readOnly)
    ) {
      return <ViewTime id={id} value={questionStore.currentAnswer} />;
    }

    return (
      <EditTime
        id={id}
        value={questionStore.currentAnswer}
        isInvalid={!!questionStore.validationErrors}
        onChange={(value: string) => {
          let returnValue = value;
          if (value.includes('am') || value.includes('pm')) {
            returnValue = value.slice(0, -2);
          }
          questionStore.setAnswer(returnValue);
        }}
      />
    );
  },
);
