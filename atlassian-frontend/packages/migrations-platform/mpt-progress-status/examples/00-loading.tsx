import React from 'react';

import { IntlProvider } from 'react-intl';

import ProgressStatus from '../src';

export default function Loading() {
  return (
    <IntlProvider locale="en">
      <div style={{ width: 300, margin: '1% auto' }}>
        <ProgressStatus
          label="apps installed"
          loadingLabel="Loading your installed apps"
          isLoading
        />
      </div>
    </IntlProvider>
  );
}
