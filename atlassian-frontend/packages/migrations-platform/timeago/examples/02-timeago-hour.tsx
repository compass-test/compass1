import React from 'react';

import { IntlProvider } from 'react-intl';

import TimeAgo from '../src';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

export default function TimeAgoHour() {
  return (
    <IntlProvider locale="en">
      <TimeAgo date={Date.now() - 5 * HOUR - 7 * MINUTE} />
    </IntlProvider>
  );
}
