import React from 'react';

import { IntlProvider } from 'react-intl';

import { MigrationStatusIcon } from '../src';

export default function MigrationStatusIconExample() {
  return (
    <IntlProvider locale="en">
      <div>
        <div>
          <MigrationStatusIcon status="complete" />
        </div>
        <div>
          <MigrationStatusIcon status="error" />
        </div>
        <div>
          <MigrationStatusIcon status="error-lite" />
        </div>
        <div>
          <MigrationStatusIcon status="ready" />
        </div>
        <div>
          <MigrationStatusIcon status="running" />
        </div>
        <div>
          <MigrationStatusIcon status="warning" />
        </div>
        <div>
          <MigrationStatusIcon status="error-lite" size="large" />
        </div>
        <div>
          <MigrationStatusIcon status="ready" size="small" />
        </div>
        <div>
          <MigrationStatusIcon status="running" size="small" />
        </div>
        <div>
          <MigrationStatusIcon status="disabled" />
        </div>
      </div>
    </IntlProvider>
  );
}
