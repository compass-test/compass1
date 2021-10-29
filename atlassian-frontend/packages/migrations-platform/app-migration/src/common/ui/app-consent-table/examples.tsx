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
} from '../../mocks';

import AppConsentTable, { Props } from './main';

export const AppConsentTableEmpty = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppConsentTable
        apps={[]}
        onRevokeConsent={action('revokeConsent')}
        onShowConsentModal={action('showConsentModal')}
        {...props}
      />
    </IntlProvider>
  );
};

export const AppConsentTableAllStatus = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppConsentTable
        apps={[
          CONSENT_GIVEN,
          CONSENT_NOT_GIVEN,
          CONSENT_OUTDATED,
          NO_AUTOMATED_MIGRATION_PATH,
          NO_MIGRATION_ALTERNATIVE,
          NO_MIGRATION_NEEDED,
          SERVER_APP_OUTDATED,
        ]}
        onRevokeConsent={action('revokeConsent')}
        onShowConsentModal={action('showConsentModal')}
        {...props}
      />
    </IntlProvider>
  );
};

export const AppConsentTableAllCompleted = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppConsentTable
        apps={[CONSENT_GIVEN, CONSENT_GIVEN_2, CONSENT_GIVEN_3]}
        onRevokeConsent={action('revokeConsent')}
        onShowConsentModal={action('showConsentModal')}
        {...props}
      />
    </IntlProvider>
  );
};

export const AppConsentTableLoading = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <AppConsentTable
        apps={[CONSENT_GIVEN, CONSENT_GIVEN_2, CONSENT_GIVEN_3]}
        onRevokeConsent={action('revokeConsent')}
        onShowConsentModal={action('showConsentModal')}
        isLoading
        {...props}
      />
    </IntlProvider>
  );
};

export const AppConsentGivenStatusLoading = () => {
  return (
    <IntlProvider locale="en">
      <AppConsentTable
        apps={[
          { ...CONSENT_GIVEN, isLoading: true },
          CONSENT_NOT_GIVEN,
          { ...CONSENT_OUTDATED, isLoading: true },
          NO_AUTOMATED_MIGRATION_PATH,
          NO_MIGRATION_ALTERNATIVE,
          NO_MIGRATION_NEEDED,
          SERVER_APP_OUTDATED,
        ]}
        onRevokeConsent={action('revokeConsent')}
        onShowConsentModal={action('showConsentModal')}
      />
    </IntlProvider>
  );
};
