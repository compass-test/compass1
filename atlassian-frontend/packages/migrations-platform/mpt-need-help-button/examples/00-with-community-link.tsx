import React from 'react';

import { IntlProvider } from 'react-intl';

import NeedHelpButton from '../src';

export default function WithCommunityLink() {
  return (
    <IntlProvider locale="en">
      <div style={{ width: 100, margin: '1% auto' }}>
        <NeedHelpButton communityLink="https://somewhere-else.com" />
      </div>
    </IntlProvider>
  );
}
