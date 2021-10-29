import React from 'react';

import { IntlProvider } from 'react-intl';

import { action, appList } from '../example-helpers/utils';
import AppsNotInstalledOnCloud from '../src/ui/details/AppsNotInstalledOnCloud';

export default function AppsNotInstalledOnCloudExample() {
  return (
    <div style={{ width: 500, margin: '1% auto' }}>
      <IntlProvider locale="en">
        <AppsNotInstalledOnCloud
          appAssessmentUrl="https://www.google.com"
          onRemoveApps={action('RemoveApps')}
          listOfOccurrences={appList}
        />
      </IntlProvider>
    </div>
  );
}
