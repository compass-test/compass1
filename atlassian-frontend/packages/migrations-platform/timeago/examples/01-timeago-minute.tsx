import React from 'react';

import { IntlProvider } from 'react-intl';

import TimeAgo from '../src';

const SECOND = 1000;
const MINUTE = 60 * SECOND;

export default function TimeAgoMinute() {
  return (
    <IntlProvider locale="en">
      <TimeAgo date={Date.now() - 50 * MINUTE} />
    </IntlProvider>
  );
}
