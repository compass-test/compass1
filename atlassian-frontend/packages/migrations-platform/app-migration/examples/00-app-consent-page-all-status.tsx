import React from 'react';

import { IntlProvider } from 'react-intl';

import { AppConsentPage, AppConsentPageProps } from '../src';
// Mocks
import {
  CONSENT_GIVEN,
  CONSENT_NOT_GIVEN,
  CONSENT_OUTDATED,
  NO_AUTOMATED_MIGRATION_PATH,
  NO_MIGRATION_ALTERNATIVE,
  NO_MIGRATION_NEEDED,
  SERVER_APP_OUTDATED,
} from '../src/common/mocks';

export default (props: Partial<AppConsentPageProps>) => {
  return (
    <IntlProvider locale="en">
      <AppConsentPage
        apps={[
          CONSENT_GIVEN,
          CONSENT_NOT_GIVEN,
          CONSENT_OUTDATED,
          NO_AUTOMATED_MIGRATION_PATH,
          NO_MIGRATION_ALTERNATIVE,
          NO_MIGRATION_NEEDED,
          SERVER_APP_OUTDATED,
        ]}
        onClose={() => {}}
        onConsent={(appKeys, consentGiven) => {}}
        onContinue={() => {}}
        onBack={() => {}}
        onNavigateToAssessment={() => {}}
        isAppAssessmentComplete
        {...props}
      />
    </IntlProvider>
  );
};
