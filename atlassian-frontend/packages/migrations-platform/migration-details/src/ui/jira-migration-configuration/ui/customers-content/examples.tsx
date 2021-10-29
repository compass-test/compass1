import React from 'react';

import { IntlProvider } from 'react-intl';

import CustomersContent from './index';

export const CustomersAll = () => {
  return (
    <IntlProvider locale="en">
      <CustomersContent
        customersConfig={{
          shouldMigrateProjects: true,
          mode: 'ALL',
          customersCount: 200,
        }}
      />
    </IntlProvider>
  );
};

export const CustomersReferenced = () => {
  return (
    <IntlProvider locale="en">
      <CustomersContent
        customersConfig={{
          shouldMigrateProjects: true,
          mode: 'REFERENCED',
          customersCount: 200,
        }}
      />
    </IntlProvider>
  );
};

export const NoCustomers = () => {
  return (
    <IntlProvider locale="en">
      <CustomersContent
        customersConfig={{
          shouldMigrateProjects: true,
          mode: 'NONE',
          customersCount: 0,
        }}
      />
    </IntlProvider>
  );
};
