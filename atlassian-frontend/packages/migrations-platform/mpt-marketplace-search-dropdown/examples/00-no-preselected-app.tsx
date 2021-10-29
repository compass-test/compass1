import React from 'react';

import { IntlProvider } from 'react-intl';

import MarketplaceSearch from '../src';

export default function Basic() {
  return (
    <IntlProvider locale="en">
      <MarketplaceSearch cloudProduct="jira" onSelectApp={() => {}} />
    </IntlProvider>
  );
}
