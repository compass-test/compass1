import React from 'react';

import { IntlProvider } from 'react-intl';

import { AppMigrationProgress } from '../src';

export default function AppMigrationProgressMessageExample() {
  return (
    <IntlProvider locale="en">
      <div>
        <div>
          <AppMigrationProgress status="COMPLETE" />
        </div>
        <div style={{ marginTop: '16px' }}>
          <AppMigrationProgress status="FAILED" />
        </div>
        <div style={{ marginTop: '16px' }}>
          <AppMigrationProgress status="INCOMPLETE" />
        </div>{' '}
        <div style={{ marginTop: '16px' }}>
          <AppMigrationProgress status="READY" />
        </div>{' '}
        <div style={{ marginTop: '16px' }}>
          <AppMigrationProgress status="RUNNING" />
        </div>
        <div style={{ marginTop: '16px' }}>
          <AppMigrationProgress status="UNKNOWN" />
        </div>
        <div style={{ marginTop: '16px' }}>
          <AppMigrationProgress status="EXPIRED" />
        </div>
      </div>
    </IntlProvider>
  );
}
