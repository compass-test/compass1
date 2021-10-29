import React from 'react';

import { IntlProvider } from 'react-intl';

import Spinner from '@atlaskit/spinner';

import { MigrationStatus } from '../src';

export default () => {
  return (
    <IntlProvider locale="en">
      <MigrationStatus
        checks={[{ status: 'Warning' }]}
        migrationStatus="Stopping"
        productFamilyKey="jira"
        onViewChecks={() => undefined}
        onRefresh={() => {}}
        overrideStatusMessageAction={<Spinner />}
      />
    </IntlProvider>
  );
};
