import React from 'react';

import { IntlProvider } from 'react-intl';

import ProgressStatus from './index';

export const ProgressStatusDefault = () => {
  return (
    <IntlProvider locale="en">
      <ProgressStatus done={0} total={13} label="projects migrated" />
    </IntlProvider>
  );
};

export const ProgressStatusSuccess = () => {
  return (
    <IntlProvider locale="en">
      <ProgressStatus done={13} total={13} label="projects migrated" />
    </IntlProvider>
  );
};

export const ProgressStatusMoved = () => {
  return (
    <IntlProvider locale="en">
      <ProgressStatus done={5} total={13} label="projects migrated" />
    </IntlProvider>
  );
};

export const ProgressStatusEmpty = () => {
  return (
    <IntlProvider locale="en">
      <ProgressStatus done={0} total={0} label="projects migrated" />
    </IntlProvider>
  );
};

export const ProgressStatusWithTitle = () => {
  return (
    <IntlProvider locale="en">
      <ProgressStatus
        done={12}
        total={13}
        label="projects migrated"
        title="progress status tooltip title"
      />
    </IntlProvider>
  );
};

export const ProgressStatusLoading = () => {
  return (
    <IntlProvider locale="en">
      <ProgressStatus
        done={12}
        total={13}
        label="projects migrated"
        loadingLabel="fetching migrated projects…"
        isLoading
      />
    </IntlProvider>
  );
};
