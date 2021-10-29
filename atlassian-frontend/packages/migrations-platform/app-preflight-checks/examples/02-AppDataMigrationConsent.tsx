import React from 'react';

import { IntlProvider } from 'react-intl';

import { action, appList } from '../example-helpers/utils';
import AppDataMigrationConsent from '../src/ui/details/AppDataMigrationConsent';

export default function AppDataMigrationConsentExample() {
  return (
    <div style={{ width: 500, margin: '1% auto' }}>
      <IntlProvider locale="en">
        <AppDataMigrationConsent
          consentUrl="https://www.google.com"
          onRemoveApps={action('RemoveApps')}
          listOfOccurrences={appList}
        />
      </IntlProvider>
    </div>
  );
}
