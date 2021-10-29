import React from 'react';

import { IntlProvider } from 'react-intl';

import NeedHelpButton from '../src';

export default function WithCustomAnalyticsAttributes() {
  return (
    <IntlProvider locale="en">
      <div style={{ width: 100, margin: '1% auto' }}>
        <NeedHelpButton
          communityLink="https://somewhere-else.com"
          supportLink="https://somewhere.com"
          documentationLink="https://nowhere.com"
          analyticsAttributes={{ fakeProperty: 'fakeValue' }}
        />
      </div>
    </IntlProvider>
  );
}
