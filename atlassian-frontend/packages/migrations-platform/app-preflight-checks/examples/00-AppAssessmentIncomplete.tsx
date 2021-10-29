import React from 'react';

import { IntlProvider } from 'react-intl';

import AppAssessmentIncomplete from '../src/ui/details/AppAssessmentIncomplete';

export default function AppAssessmentIncompleteExample() {
  return (
    <div style={{ width: 500, margin: '1% auto' }}>
      <IntlProvider locale="en">
        <AppAssessmentIncomplete appAssessmentUrl="https://www.google.com" />
      </IntlProvider>
    </div>
  );
}
