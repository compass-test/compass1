import React from 'react';

import { IntlProvider } from 'react-intl';

import { LONG_TEXT } from './mocks';

import AppStatusValue from './index';

export const AppStatusValueSuccess = () => {
  return (
    <IntlProvider locale="en">
      <AppStatusValue appearance="Success">{LONG_TEXT}</AppStatusValue>
    </IntlProvider>
  );
};

export const AppStatusValueError = () => {
  return (
    <IntlProvider locale="en">
      <AppStatusValue appearance="Error">{LONG_TEXT}</AppStatusValue>
    </IntlProvider>
  );
};

export const AppStatusValueNoopSuccess = () => {
  return (
    <IntlProvider locale="en">
      <AppStatusValue appearance="NoopSuccess">{LONG_TEXT}</AppStatusValue>
    </IntlProvider>
  );
};

export const AppStatusValueNoopError = () => {
  return (
    <IntlProvider locale="en">
      <AppStatusValue appearance="NoopError">{LONG_TEXT}</AppStatusValue>
    </IntlProvider>
  );
};

export const AppStatusValueIsLoading = () => {
  return (
    <IntlProvider locale="en">
      <AppStatusValue appearance="Success" isLoading>
        {LONG_TEXT}
      </AppStatusValue>
    </IntlProvider>
  );
};
