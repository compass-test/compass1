import React from 'react';

import { IntlProvider } from 'react-intl';

import { AppConsentPage, AppConsentPageProps } from '../src';
// Mocks
import {
  CONSENT_GIVEN,
  CONSENT_GIVEN_2,
  CONSENT_GIVEN_3,
} from '../src/common/mocks';

export default (props: Partial<AppConsentPageProps>) => {
  return (
    <IntlProvider locale="en">
      <AppConsentPage
        apps={[CONSENT_GIVEN, CONSENT_GIVEN_2, CONSENT_GIVEN_3]}
        onClose={() => {}}
        onConsent={(appKeys, consentGiven) => {}}
        onContinue={() => {}}
        onBack={() => {}}
        onNavigateToAssessment={() => {}}
        isLoading
        isAppAssessmentComplete
        {...props}
      />
    </IntlProvider>
  );
};
