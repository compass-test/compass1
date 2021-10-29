/* eslint-disable react/react-in-jsx-scope */
/* @jsx jsx */

import moment from 'moment-timezone';
import { css, jsx } from '@emotion/core';

import { DayContainer, Day } from './styled';
import { DaysProps } from '../../../common/types';
import { localMidnight } from '../../../common/utils';

export function Days({
  startDate,
  timezone,
  days,
  dateFormat = 'dd D/MM',
  locale,
}: DaysProps) {
  const localStartDate = localMidnight(startDate, timezone);

  const dayComponents = Array.from({ length: days }, (_, k) => {
    const dateWithLocale = locale
      ? moment(localStartDate).locale(locale)
      : moment(localStartDate);
    const dateLabel = dateWithLocale.add(k, 'days').format(dateFormat);

    return (
      <Day
        css={css`
          width: ${100 / days}%;
        `}
        key={dateLabel}
      >
        {dateLabel}
      </Day>
    );
  });
  return <DayContainer className="days">{dayComponents}</DayContainer>;
}

export default Days;
