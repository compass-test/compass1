import React from 'react';

import { IntlProvider } from 'react-intl';

import { MigrationStatus } from '../src';

const threeHoursAgo = Date.now() - 1000 * 60 * 180;

export default () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        checks={[
          { status: 'Running' },
          { status: 'Success', lastExecution: threeHoursAgo },
          { status: 'Error', lastExecution: threeHoursAgo },
          { status: 'Warning', lastExecution: threeHoursAgo },
          { status: 'ExecutionError', lastExecution: threeHoursAgo },
        ]}
        estimatedTimeSeconds={1800}
        isCloudMigration
        productFamilyKey="jira"
        onViewChecks={() => undefined}
        onRefresh={() => {}}
      />
    </IntlProvider>
  );
};
