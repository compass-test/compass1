/* eslint-disable react/react-in-jsx-scope */
/* @jsx jsx */

import moment from 'moment-timezone';
import { css, jsx } from '@emotion/core';

import Days from './days';
import Schedules from './schedules';

import { TimelineProps } from '../../common/types';
import {
  calculateDays,
  filterSchedules,
  normalizeDate,
  localMidnight,
} from '../../common/utils';
import {
  TimelineContainer,
  BodyHead,
  BodyContent,
  RotationLabels,
  Marker,
} from './styled';

export function Timeline({
  startDate,
  currentDate,
  timezone,
  interval = 2,
  intervalUnit = 'weeks',
  rotations,
  dateFormat,
  locale,
}: TimelineProps) {
  const days = calculateDays(startDate, timezone, interval, intervalUnit);
  const filteredRotations = rotations.map(({ name, periods }) => ({
    name,
    periods: filterSchedules(periods, startDate, timezone, days),
  }));
  const localStartDate = localMidnight(startDate, timezone);
  const startDateMillis: number = normalizeDate(
    localStartDate,
    timezone,
  ).valueOf();

  const totalDuration: number = moment.duration(days, 'days').asMilliseconds();
  const markerTime: number =
    normalizeDate(currentDate, timezone).valueOf() - startDateMillis;

  return (
    <TimelineContainer className="body">
      <BodyHead className="body-head">
        <RotationLabels>
          {filteredRotations.map(({ name }) => (
            <li key={name}>
              <span
                css={css`
                  display: block;
                  width: 100%;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                `}
                title={name}
              >
                {name}
              </span>
            </li>
          ))}
        </RotationLabels>
      </BodyHead>
      <BodyContent className="body-content">
        <Days {...{ startDate, timezone, days, dateFormat, locale }} />
        <Schedules
          {...{
            startDate,
            currentDate,
            timezone,
            days,
            rotations: filteredRotations,
          }}
        />
        {markerTime >= 0 && markerTime <= totalDuration ? (
          <Marker
            css={css`
              left: ${(markerTime / totalDuration) * 100}%;
            `}
          />
        ) : null}
      </BodyContent>
    </TimelineContainer>
  );
}

export default Timeline;
