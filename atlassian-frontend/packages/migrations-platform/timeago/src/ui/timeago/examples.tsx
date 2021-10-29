import React from 'react';

import { IntlProvider } from 'react-intl';

import TimeAgo from './index';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const TimeAgoRecent = () => {
  return (
    <IntlProvider locale="en">
      <TimeAgo date={Date.now() - 0.5 * MINUTE} />
    </IntlProvider>
  );
};

export const TimeAgoMinute = () => {
  return (
    <IntlProvider locale="en">
      <TimeAgo date={Date.now() - 50 * MINUTE} />
    </IntlProvider>
  );
};

export const TimeAgoHour = () => {
  return (
    <IntlProvider locale="en">
      <TimeAgo date={Date.now() - 5 * HOUR - 7 * MINUTE} />
    </IntlProvider>
  );
};

export const TimeAgoDay = () => {
  return (
    <IntlProvider locale="en">
      <TimeAgo date={Date.now() - 1 * DAY - 2 * HOUR} />
    </IntlProvider>
  );
};

export const TimeAgoMonth = () => {
  return (
    <IntlProvider locale="en">
      <TimeAgo date={Date.now() - 30 * DAY - 2 * HOUR} />
    </IntlProvider>
  );
};

export const TimeAgoYear = () => {
  return (
    <IntlProvider locale="en">
      <TimeAgo date={Date.now() - 365 * DAY - 2 * HOUR} />
    </IntlProvider>
  );
};
