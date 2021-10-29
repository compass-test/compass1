import React from 'react';

import { IntlProvider } from 'react-intl';

import AppDecisionValue, { Props } from './main';

export const AppDecisionValueDefault = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppDecisionValue
        appKey="fake-key"
        onChange={async () => {}}
        {...props}
      />
    </IntlProvider>
  );
};

export const AppDecisionValueUnassigned = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppDecisionValue
        appKey="fake-key"
        defaultMigrationStatus="Unassigned"
        onChange={async () => {}}
        {...props}
      />
    </IntlProvider>
  );
};

export const AppDecisionValueNeeded = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppDecisionValue
        appKey="fake-key"
        defaultMigrationStatus="Needed"
        onChange={async () => {}}
        {...props}
      />
    </IntlProvider>
  );
};

export const AppDecisionValueNotNeeded = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppDecisionValue
        appKey="fake-key"
        defaultMigrationStatus="NotNeeded"
        onChange={async () => {}}
        {...props}
      />
    </IntlProvider>
  );
};

export const AppDecisionValueAlternative = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppDecisionValue
        appKey="fake-key"
        defaultMigrationStatus="Alternative"
        onChange={async () => {}}
        {...props}
      />
    </IntlProvider>
  );
};
