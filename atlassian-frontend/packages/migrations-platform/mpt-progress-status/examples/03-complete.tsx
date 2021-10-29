import React from 'react';

import { IntlProvider } from 'react-intl';

import ProgressStatus from '../src';

export default function ZeroPercentComplete() {
  return (
    <IntlProvider locale="en">
      <div style={{ width: 300, margin: '1% auto' }}>
        <ProgressStatus
          total={30}
          done={30}
          label="apps installed"
          loadingLabel="Loading your installed apps"
        />
      </div>
    </IntlProvider>
  );
}
