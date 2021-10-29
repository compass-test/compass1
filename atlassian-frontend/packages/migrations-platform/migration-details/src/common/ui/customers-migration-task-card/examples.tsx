import React from 'react';

import { IntlProvider } from 'react-intl';

import CustomersTaskCard from './index';

export const NoSelection = () => {
  return (
    <IntlProvider locale="en">
      <CustomersTaskCard
        selection={undefined}
        onSelect={() => undefined}
        isDisabled={false}
        disabledDescription={undefined}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
        hasMadeProjectsSelection={false}
        isNotMigratingAnyProjects={true}
        onSelectAllCustomers={() => undefined}
        onSkipAllCustomers={() => undefined}
      />
    </IntlProvider>
  );
};
