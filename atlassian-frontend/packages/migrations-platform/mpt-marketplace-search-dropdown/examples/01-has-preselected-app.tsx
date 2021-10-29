import React from 'react';

import { IntlProvider } from 'react-intl';

import MarketplaceSearch from '../src';

export default function HasSelected() {
  return (
    <IntlProvider locale="en">
      <MarketplaceSearch
        cloudProduct="jira"
        selectedAppKey="boja.jira.pdf.com"
        onSelectApp={() => {}}
      />
    </IntlProvider>
  );
}
