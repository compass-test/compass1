import React from 'react';

import { IntlProvider } from 'react-intl';

import { MigrationStatus } from '../src';

const threeHoursAgo = Date.now() - 1000 * 60 * 180;
const twoDaysAgo = Date.now() - 1000 * 60 * 60 * 24 * 2;

export default () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        checks={[
          {
            status: 'Warning',
            lastExecution: threeHoursAgo,
            createdOn: twoDaysAgo,
          },
          {
            status: 'Running',
            lastExecution: threeHoursAgo,
            createdOn: twoDaysAgo,
          },
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
