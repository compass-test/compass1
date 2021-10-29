// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import moment from 'moment-timezone';

import { select, number, date, withKnobs } from '@storybook/addon-knobs';
import { createMockSchedules } from '../../common/mock-schedules';
import { IntervalUnit } from '../../common/types';
import Timeline from './index';

function Example({
  startDate,
  timezone,
  interval,
  intervalUnit,
  dateFormat,
  scheduleStartDate,
  scheduleTimezone,
  periodLength,
}: {
  startDate: Date | string;
  timezone: string;
  interval: number;
  intervalUnit: IntervalUnit;
  dateFormat: string;
  scheduleStartDate: Date | string;
  scheduleTimezone: string;
  periodLength: number;
}) {
  return (
    <Timeline
      {...{
        startDate,
        timezone,
        interval,
        intervalUnit,
        dateFormat,
        scheduleStartDate,
      }}
      currentDate={moment().toISOString()}
      rotations={[
        {
          name: 'Example Rotation',
          periods: createMockSchedules(
            scheduleStartDate,
            moment.tz(scheduleStartDate, scheduleTimezone).add(2, 'months'),
            moment.duration(periodLength, 'days'),
            scheduleTimezone,
          ),
        },
      ]}
    />
  );
}

export const _Timeline = () => {
  const startDate = new Date(
    date(
      `Timeline Start Date (${moment.tz.guess()})`,
      moment()
        .set({ day: 1, hour: 0, minute: 0, seconds: 0, milliseconds: 0 })
        .toDate(),
      'Timeline',
    ),
  );
  const timezone = select(
    'Timeline Timezone',
    moment.tz.names(),
    moment.tz.guess(),
    'Timeline',
  );

  const interval = number('Interval', 2, {}, 'Timeline');
  const intervalUnit = select(
    'Interval Unit',
    ['days', 'weeks', 'months'],
    'weeks',
    'Timeline',
  );
  const dateFormat = select(
    'Date Format',
    ['dd D/MM', 'dd MM/D'],
    'dd D/MM',
    'Timeline',
  );

  const scheduleStartDate = new Date(
    date(
      `Schedule Start Date (${moment.tz.guess()})`,
      moment()
        .subtract(1, 'month')
        .set({ day: 1, hour: 0, minute: 0, seconds: 0, milliseconds: 0 })
        .toDate(),
      'Schedule',
    ),
  );
  const scheduleTimezone = select(
    'Schedule Timezone',
    moment.tz.names(),
    moment.tz.guess(),
    'Schedule',
  );

  const periodLength = number('Period (Days)', 7, {}, 'Schedule');

  return (
    <Example
      {...{
        startDate,
        timezone,
        interval,
        intervalUnit,
        dateFormat,
        scheduleStartDate,
        scheduleTimezone,
        periodLength,
      }}
    />
  );
};

export default {
  title: 'Timeline',
  decorators: [withKnobs],
};
