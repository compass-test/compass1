import React from 'react';

import { IntlProvider } from 'react-intl';

import Spinner from '@atlaskit/spinner';

import { MigrationStatus } from '../src';

const threeHoursAgo = Date.now() - 1000 * 60 * 180;

export default () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        checks={[
          { status: 'Success', lastExecution: threeHoursAgo },
          { status: 'Success', lastExecution: threeHoursAgo },
        ]}
        migrationStatus="Running"
        estimatedTimeSeconds={1800}
        productFamilyKey="jira"
        onViewChecks={() => undefined}
        onRefresh={() => {}}
        overrideStatusMessageAction={<Spinner />}
      />
    </IntlProvider>
  );
};
