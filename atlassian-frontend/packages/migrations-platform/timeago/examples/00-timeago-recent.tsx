import React from 'react';

import { IntlProvider } from 'react-intl';

import TimeAgo from '../src';

const SECOND = 1000;
const MINUTE = 60 * SECOND;

export default function TimeAgoRecent() {
  return (
    <IntlProvider locale="en">
      <TimeAgo date={Date.now() - 0.5 * MINUTE} />
    </IntlProvider>
  );
}
