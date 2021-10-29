import React from 'react';

import { IntlProvider } from 'react-intl';

import { CoreMigrationProgress } from '../src';

export default function CoreMigrationProgressMessageExample() {
  return (
    <IntlProvider locale="en">
      <div>
        <div>
          <CoreMigrationProgress status="COMPLETE" />
        </div>
        <div style={{ marginTop: '16px' }}>
          <CoreMigrationProgress status="FAILED" />
        </div>
        <div style={{ marginTop: '16px' }}>
          <CoreMigrationProgress status="INCOMPLETE" />
        </div>{' '}
        <div style={{ marginTop: '16px' }}>
          <CoreMigrationProgress status="SAVED_READY" />
        </div>{' '}
        <div style={{ marginTop: '16px' }}>
          <CoreMigrationProgress status="RUNNING" />
        </div>
        <div style={{ marginTop: '16px' }}>
          <CoreMigrationProgress status="SAVED_PREFLIGHT_ERROR" />
        </div>
        <div style={{ marginTop: '16px' }}>
          <CoreMigrationProgress status="SAVED_INCOMPLETE" />
        </div>
        <div style={{ marginTop: '16px' }}>
          <CoreMigrationProgress status="VALIDATING" />
        </div>
        <div style={{ marginTop: '16px' }}>
          <CoreMigrationProgress status="EXPIRED" />
        </div>
      </div>
    </IntlProvider>
  );
}
