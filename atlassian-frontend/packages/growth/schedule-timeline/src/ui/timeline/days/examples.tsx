// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import Days from './index';

function DaysExample() {
  return (
    <Days
      startDate={new Date('2019-10-21T00:00+11:00')}
      days={7}
      timezone="Australia/Sydney"
    />
  );
}

function WeeksExample() {
  return (
    <Days
      startDate={new Date('2019-10-21T00:00+11:00')}
      days={14}
      timezone="Australia/Sydney"
    />
  );
}

function MonthExample() {
  return (
    <Days
      startDate={new Date('2019-10-01T00:00+10:00')}
      days={31}
      timezone="Australia/Sydney"
    />
  );
}

function DateFormatExample() {
  return (
    <Days
      startDate={new Date('2019-10-21T00:00+11:00')}
      days={14}
      dateFormat="dd MM/D"
      timezone="Australia/Sydney"
    />
  );
}

export default {
  title: 'Days',
};

export const _7Days = () => <DaysExample />;
export const _2Weeks = () => <WeeksExample />;
export const _1Month = () => <MonthExample />;
export const AmericanDate = () => <DateFormatExample />;
