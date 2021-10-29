import React from 'react';

import moment from 'moment';

import { useIntl } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { TimeCellStyled } from './styled';

type TimeCellProps = {
  eventLastUpdated: string;
};

export function TimeCell(props: TimeCellProps) {
  const { eventLastUpdated } = props;
  const { formatMessage, locale } = useIntl();
  moment.locale(locale); // set moment locale
  const targetMoment = moment(eventLastUpdated);
  const isTargetDateToday = moment().isSame(targetMoment, 'day');
  const targetDateText = isTargetDateToday
    ? formatMessage(messages.deploymentToday, {
        deploymentTime: targetMoment.format('LT'),
      })
    : targetMoment.format('lll');
  return (
    <TimeCellStyled dateTime={eventLastUpdated}>
      {targetDateText}
    </TimeCellStyled>
  );
}
