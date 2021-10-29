import React from 'react';
import ContactSupport from './index';
import { IntlProvider } from 'react-intl';

export const Default = () => {
  return (
    <IntlProvider locale="en">
      <ContactSupport />
    </IntlProvider>
  );
};
