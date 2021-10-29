import React from 'react';

import { observer } from 'mobx-react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { usePfFlags } from '../../../jira-common/context/FlagsContext';
import { QuestionProps } from '../QuestionProps';

import { EditDateTime } from './edit/EditDateTime';
import { ViewDateTime } from './view/ViewDateTime';

export const DateTime = injectIntl(
  observer(
    ({ id, questionStore, view, intl }: QuestionProps & InjectedIntlProps) => {
      const flags = usePfFlags();

      if (
        view ||
        (flags.ReadOnlyQuestions && questionStore.formQuestion.readOnly)
      ) {
        const dateAnswer = questionStore.currentAnswer.date;
        const dateValue =
          dateAnswer.length < 1
            ? ''
            : intl.formatDate(dateAnswer, { timeZone: 'UTC' });
        const timeAnswer = questionStore.currentAnswer.time;
        let timeValue = '';
        if (timeAnswer.length) {
          const timeSplit = timeAnswer.split(':');
          const hours = parseInt(timeSplit[0], 10);
          const minutes = parseInt(timeSplit[1], 10);
          timeValue = intl.formatTime(Date.UTC(0, 0, 1, hours, minutes), {
            timeZone: 'UTC',
          });
        }
        return (
          <ViewDateTime id={id} dateValue={dateValue} timeValue={timeValue} />
        );
      }

      return (
        <EditDateTime
          id={id}
          dateValue={questionStore.currentAnswer.date}
          timeValue={questionStore.currentAnswer.time}
          isInvalid={!!questionStore.validationErrors}
          onDateChange={(value: string) => {
            questionStore.setAnswer({
              date: value,
              time: questionStore.currentAnswer.time,
            });
          }}
          onTimeChange={(value: string) => {
            questionStore.setAnswer({
              date: questionStore.currentAnswer.date,
              time: value,
            });
          }}
        />
      );
    },
  ),
);
