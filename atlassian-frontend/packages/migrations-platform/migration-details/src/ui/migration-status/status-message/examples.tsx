import React from 'react';

import { IntlProvider } from 'react-intl';

import StatusMessage from './index';

export const StatusMessageBasic = () => {
  return (
    <IntlProvider locale="en">
      <StatusMessage status="ChecksError" onRefresh={() => {}} />
    </IntlProvider>
  );
};

export const StatusMessageChecksRunning = () => {
  return (
    <IntlProvider locale="en">
      <StatusMessage status="ChecksRunning" onRefresh={() => {}} />
    </IntlProvider>
  );
};

export const StatusMessageChecksAutoSaveRunning = () => {
  return (
    <IntlProvider locale="en">
      <StatusMessage
        status="ChecksRunning"
        isCloudMigration
        onRefresh={() => {}}
      />
    </IntlProvider>
  );
};

export const StatusMessageMigrationStopping = () => {
  return (
    <IntlProvider locale="en">
      <StatusMessage status="MigrationStopping" onRefresh={() => {}} />
    </IntlProvider>
  );
};

export const StatusMessageMigrationStopped = () => {
  return (
    <IntlProvider locale="en">
      <StatusMessage status="MigrationStopped" onRefresh={() => {}} />
    </IntlProvider>
  );
};

export const StatusMessageMigrationWithCustomRefeshLabel = () => {
  return (
    <IntlProvider locale="en">
      <StatusMessage
        status="ChecksError"
        onRefresh={() => {}}
        refreshLabel="Re-run checks"
      />
    </IntlProvider>
  );
};

export const StatusMessageWithCustomAction = () => {
  return (
    <IntlProvider locale="en">
      <StatusMessage
        status="ChecksError"
        onRefresh={() => {}}
        actionContent="Hello World"
      />
    </IntlProvider>
  );
};

export const StatusMessageIncompleteForCloudMigration = () => {
  return (
    <IntlProvider locale="en">
      <StatusMessage
        status="MigrationIncomplete"
        onRefresh={() => {}}
        isCloudMigration
      />
    </IntlProvider>
  );
};
