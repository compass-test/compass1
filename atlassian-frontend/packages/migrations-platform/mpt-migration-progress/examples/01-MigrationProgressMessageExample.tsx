import React from 'react';

import { IntlProvider } from 'react-intl';

import { MigrationProgressMessage } from '../src';

export default function MigrationProgressMessageExample() {
  return (
    <IntlProvider locale="en">
      <div>
        <div>
          <MigrationProgressMessage
            message="Ready to migrate."
            status="ready"
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <MigrationProgressMessage
            message="Ready to migrate app data"
            status="ready"
            tooltip="The app migration is ready to go"
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <MigrationProgressMessage
            message="Some checks failed."
            status="error-lite"
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <MigrationProgressMessage
            message="Some app checks failed."
            status="error-lite"
            tooltip="Some app preflight checks failed"
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <MigrationProgressMessage
            message="Migration in progress"
            status="running"
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <MigrationProgressMessage
            message="Migration complete"
            status="complete"
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <MigrationProgressMessage
            message="App data migration failed."
            status="error"
            tooltip="If a migration fails, te app data migration cannot start"
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <MigrationProgressMessage
            message="Partially migrated."
            status="warning"
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <MigrationProgressMessage
            message="Disabled message."
            status="disabled"
          />
        </div>
      </div>
    </IntlProvider>
  );
}
