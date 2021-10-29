import React from 'react';

import { action } from '@storybook/addon-actions';
import { IntlProvider } from 'react-intl';

import {
  CONSENT_GIVEN,
  CONSENT_GIVEN_2,
  CONSENT_GIVEN_3,
  CONSENT_NOT_GIVEN,
  CONSENT_OUTDATED,
  NO_AUTOMATED_MIGRATION_PATH,
  NO_MIGRATION_ALTERNATIVE,
  NO_MIGRATION_NEEDED,
  SERVER_APP_OUTDATED,
} from '../../common/mocks';

import AppConsentPage, { Props } from './main';

export const AppConsentPageEmpty = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppConsentPage
        apps={[]}
        onClose={action('Close')}
        onConsent={action('Consent')}
        onContinue={action('Continue')}
        onBack={action('Back')}
        onNavigateToAssessment={action('NavigateToAssessment')}
        {...props}
        isAppAssessmentComplete
      />
    </IntlProvider>
  );
};

export const AppConsentPageAllStatus = (props: Partial<Props>) => {
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
        onClose={action('Close')}
        onConsent={action('Consent')}
        onContinue={action('Continue')}
        onBack={action('Back')}
        onNavigateToAssessment={action('NavigateToAssessment')}
        {...props}
        isAppAssessmentComplete
      />
    </IntlProvider>
  );
};

export const AppConsentPageAllCompleted = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppConsentPage
        apps={[CONSENT_GIVEN, CONSENT_GIVEN_2, CONSENT_GIVEN_3]}
        onClose={action('Close')}
        onConsent={action('Consent')}
        onContinue={action('Continue')}
        onBack={action('Back')}
        onNavigateToAssessment={action('NavigateToAssessment')}
        {...props}
        isAppAssessmentComplete
      />
    </IntlProvider>
  );
};

export const AppConsentPageLoading = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppConsentPage
        apps={[CONSENT_GIVEN, CONSENT_GIVEN_2, CONSENT_GIVEN_3]}
        onConsent={action('Consent')}
        onClose={action('Close')}
        onContinue={action('Continue')}
        onBack={action('Back')}
        onNavigateToAssessment={action('NavigateToAssessment')}
        isLoading
        {...props}
        isAppAssessmentComplete
      />
    </IntlProvider>
  );
};

export const AppConsentGivenStatusLoading = () => {
  return (
    <IntlProvider locale="en">
      <AppConsentPage
        apps={[
          { ...CONSENT_GIVEN, isLoading: true },
          CONSENT_NOT_GIVEN,
          { ...CONSENT_OUTDATED, isLoading: true },
          NO_AUTOMATED_MIGRATION_PATH,
          NO_MIGRATION_ALTERNATIVE,
          NO_MIGRATION_NEEDED,
          SERVER_APP_OUTDATED,
        ]}
        onConsent={action('Consent')}
        onClose={action('Close')}
        onContinue={action('Continue')}
        onBack={action('Back')}
        onNavigateToAssessment={action('NavigateToAssessment')}
        isAppAssessmentComplete
      />
    </IntlProvider>
  );
};

export const AppConsentPageWithIncompleteAssessment = (
  props: Partial<Props>,
) => {
  return (
    <IntlProvider locale="en">
      <AppConsentPage
        apps={[
          CONSENT_GIVEN,
          NO_AUTOMATED_MIGRATION_PATH,
          NO_MIGRATION_ALTERNATIVE,
          NO_MIGRATION_NEEDED,
        ]}
        onConsent={action('Consent')}
        onClose={action('Close')}
        onContinue={props.onContinue!}
        onBack={action('Back')}
        onNavigateToAssessment={action('NavigateToAssessment')}
        isAppAssessmentComplete={false}
      />
    </IntlProvider>
  );
};
