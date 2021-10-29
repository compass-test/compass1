import React from 'react';

import { IntlProvider } from 'react-intl';

import { action } from '../example-helpers/utils';
import AppReliabilityCheck from '../src/ui/details/AppReliabilityCheck';

export default function AppsNotInstalledOnCloudExample() {
  return (
    <div style={{ width: 500, margin: '1% auto' }}>
      <IntlProvider locale="en">
        <AppReliabilityCheck
          appAssessmentUrl="https://www.google.com"
          onRemoveApps={action('RemoveApps')}
          alphaStageUrl="https://www.google.com"
          listOfOccurrences={['app1', 'app2', 'App 3']}
        />
      </IntlProvider>
    </div>
  );
}
