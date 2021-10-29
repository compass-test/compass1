import React from 'react';

import { IntlProvider } from 'react-intl';

import AppCanBeMigrated, { Props } from './main';

export const AppCanBeMigratedInstallOnly = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppCanBeMigrated
        appKey="fake-key"
        canBeMigrated="install_only"
        migrationPathInstructionsUrl="http://atlassian.net"
        {...props}
      />
    </IntlProvider>
  );
};

export const AppCanBeMigratedInstallOnlyEAP = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppCanBeMigrated
        appKey="fake-key"
        canBeMigrated="install_only"
        migrationPathInstructionsUrl="http://atlassian.net"
        automatedPathUrlForNonEap="http://atlassian.net"
        {...props}
      />
    </IntlProvider>
  );
};

export const AppCanBeMigratedYes = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppCanBeMigrated
        appKey="fake-key"
        canBeMigrated="yes"
        migrationPathInstructionsUrl="http://atlassian.net"
        {...props}
      />
    </IntlProvider>
  );
};

export const AppCanBeMigratedManual = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppCanBeMigrated
        appKey="fake-key"
        canBeMigrated="manual"
        migrationPathInstructionsUrl="http://atlassian.net"
        {...props}
      />
    </IntlProvider>
  );
};

export const AppCanBeMigratedUnknown = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppCanBeMigrated
        appKey="fake-key"
        canBeMigrated="unknown"
        contactVendorUrl="http://atlassian.net"
        {...props}
      />
    </IntlProvider>
  );
};

export const AppCanBeMigratedUpgrade = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppCanBeMigrated
        appKey="fake-key"
        canBeMigrated="upgrade"
        upgradeAppUrl="http://atlassian.net"
        {...props}
      />
    </IntlProvider>
  );
};

export const AppCanBeMigratedNo = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppCanBeMigrated appKey="fake-key" canBeMigrated="no" {...props} />
    </IntlProvider>
  );
};
