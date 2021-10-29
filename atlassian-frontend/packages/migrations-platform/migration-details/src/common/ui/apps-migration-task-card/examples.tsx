import React from 'react';

import { IntlProvider } from 'react-intl';

import AppsMigrationTaskCard from './index';

export const AppsMigrationTaskCardNoSelection = () => {
  return (
    <IntlProvider locale="en">
      <AppsMigrationTaskCard
        selection={undefined}
        onSelect={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const AppsMigrationTaskCardNotMigrating = () => {
  return (
    <IntlProvider locale="en">
      <AppsMigrationTaskCard
        selection={{
          numberOfApps: 0,
        }}
        onSelect={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const AppsMigrationTaskCardWithOneApp = () => {
  return (
    <IntlProvider locale="en">
      <AppsMigrationTaskCard
        selection={{
          numberOfApps: 1,
        }}
        onSelect={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};

export const AppsMigrationTaskCardWithMultipleApps = () => {
  return (
    <IntlProvider locale="en">
      <AppsMigrationTaskCard
        selection={{
          numberOfApps: 5,
        }}
        onSelect={() => undefined}
        isDisabled={false}
        isLoading={false}
        isSelectLoading={false}
        isSkipLoading={false}
      />
    </IntlProvider>
  );
};
