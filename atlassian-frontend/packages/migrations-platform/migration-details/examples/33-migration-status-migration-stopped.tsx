import React from 'react';

import { IntlProvider } from 'react-intl';

import { MigrationStatus } from '../src';

export default () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        checks={[{ status: 'Warning' }]}
        migrationStatus="Stopped"
        productFamilyKey="jira"
        onViewChecks={() => undefined}
        onRefresh={() => {}}
      />
    </IntlProvider>
  );
};
