import React from 'react';

import { addLocaleData, IntlProvider } from 'react-intl';
import fr from 'react-intl/locale-data/fr';

import { MigrationStatus } from '../src';

const threeHoursAgo = Date.now() - 1000 * 60 * 180;

addLocaleData(fr);

export default () => {
  return (
    <IntlProvider locale="fr">
      <MigrationStatus
        checks={[
          { status: 'Success' },
          { status: 'Error' },
          { status: 'Warning', lastExecution: threeHoursAgo },
          { status: 'ExecutionError' },
        ]}
        estimatedTimeSeconds={1800}
        productFamilyKey="jira"
        onViewChecks={() => undefined}
        onRefresh={() => {}}
      />
    </IntlProvider>
  );
};
