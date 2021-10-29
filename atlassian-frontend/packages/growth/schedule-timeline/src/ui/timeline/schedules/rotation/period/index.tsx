/* eslint-disable react/react-in-jsx-scope */
/* @jsx jsx */

import Tooltip from '@atlaskit/tooltip';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
import { css, jsx } from '@emotion/core';
import moment, { Moment } from 'moment-timezone';
import { PeriodProps } from '../../../../../common/types';
import {
  localMidnight,
  normalizeDate,
  adjustLabelToFit,
  generateTooltipLabel,
} from '../../../../../common/utils';
import { HistoricalMarker } from './styled';

export function Period({
  startDate: periodStartDate,
  endDate: periodEndDate,
  rotation: { startDate: rotationStartDate, days: rotationDays, timezone },
  backgroundColor = colors.N500,
  textColor = colors.N0,
  label,
  type,
}: PeriodProps) {
  const localRotationStartDate: Moment = localMidnight(
    rotationStartDate,
    timezone,
  );
  const rotationStartDateMillis: number = normalizeDate(
    localRotationStartDate,
    timezone,
  ).valueOf();
  const rotationEndDateMillis: number = normalizeDate(
    moment.tz(localRotationStartDate, timezone).add(rotationDays, 'days'),
    timezone,
  ).valueOf();

  const periodStartDateMillis: number = normalizeDate(
    periodStartDate,
    timezone,
  ).valueOf();
  const periodEndDateMillis: number = normalizeDate(
    periodEndDate,
    timezone,
  ).valueOf();

  const totalDuration: number = moment
    .duration(rotationDays, 'days')
    .asMilliseconds();

  const begin =
    Math.max(rotationStartDateMillis, periodStartDateMillis) -
    rotationStartDateMillis;
  const end =
    Math.min(rotationEndDateMillis, periodEndDateMillis) -
    rotationStartDateMillis;
  const duration = end - begin;
  const width = (duration / totalDuration) * 100;
  return (
    <li
      className="period"
      css={css`
        color: ${textColor};
        background-color: ${backgroundColor};

        width: ${width}%;
        left: ${(begin / totalDuration) * 100}%;
      `}
    >
      <Tooltip content={generateTooltipLabel(label)} position="top">
        <div>{adjustLabelToFit(label, width)}</div>
      </Tooltip>
      {type === 'historical' ? <HistoricalMarker /> : null}
    </li>
  );
}

export default Period;
