import React from 'react';

import { IntlProvider } from 'react-intl';

import AppNameValue from './index';

const APP_NAME = 'Jira Workflow Toolbox';
const LOGO_URL =
  'https://marketplace-cdn.atlassian.com/files/images/9ffe3549-de47-4170-a76a-147db9f10c65.png';

export const AppNameValueBasic = () => {
  return (
    <IntlProvider locale="en">
      <AppNameValue name={APP_NAME} />
    </IntlProvider>
  );
};

export const AppNameValueBasicWhenLoading = () => {
  return (
    <IntlProvider locale="en">
      <AppNameValue name={APP_NAME} isLoading />
    </IntlProvider>
  );
};

export const AppNameValueWithLogo = () => {
  return (
    <IntlProvider locale="en">
      <AppNameValue name={APP_NAME} logoUrl={LOGO_URL} />
    </IntlProvider>
  );
};

export const AppNameValueWithLogoWhenLoading = () => {
  return (
    <IntlProvider locale="en">
      <AppNameValue name={APP_NAME} logoUrl={LOGO_URL} isLoading />
    </IntlProvider>
  );
};
