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
            status: 'Success',
            lastExecution: threeHoursAgo,
            createdOn: twoDaysAgo,
          },
        ]}
        estimatedTimeSeconds={1800}
        productFamilyKey="jira"
        refreshLabel="Re-run checks"
        onViewChecks={() => undefined}
        onRefresh={() => {}}
      />
    </IntlProvider>
  );
};
