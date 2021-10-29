import React from 'react';
import PoweredByConfluence from './index';
import { IntlProvider } from 'react-intl';

export const Default = () => {
  return (
    <IntlProvider locale="en">
      <PoweredByConfluence href="https://www.atlassian.com" />
    </IntlProvider>
  );
};
