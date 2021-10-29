import React from 'react';

import { IntlProvider } from 'react-intl';

import TimeAgo from '../src';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export default function TimeAgoDay() {
  return (
    <IntlProvider locale="en">
      <TimeAgo date={Date.now() - 2 * DAY - 2 * HOUR} />
    </IntlProvider>
  );
}
