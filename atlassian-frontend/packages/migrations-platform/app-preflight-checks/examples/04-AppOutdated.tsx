import React from 'react';

import { IntlProvider } from 'react-intl';

import { action, outdatedApps } from '../example-helpers/utils';
import AppOutdated from '../src/ui/details/AppOutdated';

export default function AppsNotInstalledOnCloudExample() {
  return (
    <div style={{ width: 500, margin: '1% auto' }}>
      <IntlProvider locale="en">
        <AppOutdated
          appAssessmentUrl="https://www.google.com"
          onRemoveApps={action('RemoveApps')}
          outdatedApps={outdatedApps}
        />
      </IntlProvider>
    </div>
  );
}
