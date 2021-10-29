import React from 'react';

import { IntlProvider } from 'react-intl';

import { MigrationStatus } from '../src';

const threeHoursAgo = Date.now() - 1000 * 60 * 180;

export default () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        checks={[
          { status: 'Warning', lastExecution: threeHoursAgo },
          { status: 'Success', lastExecution: threeHoursAgo },
        ]}
        migrationStatus="Complete"
        estimatedTimeSeconds={1800}
        productFamilyKey="jira"
        onViewChecks={() => undefined}
        onRefresh={() => {}}
      />
    </IntlProvider>
  );
};
