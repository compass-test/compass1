import React from 'react';

import { IntlProvider } from 'react-intl';

import AnonymousAccessContent from './index';

export const AnonymousAccessJira = () => {
  return (
    <IntlProvider locale="en">
      <AnonymousAccessContent productFamilyKey="jira" />
    </IntlProvider>
  );
};
