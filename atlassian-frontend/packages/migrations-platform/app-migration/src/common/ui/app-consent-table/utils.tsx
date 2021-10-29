import React, { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import { AnalyticsButton, ExternalLink } from '@atlassian/mpt-elements';

import type { ConsentApp } from '../../types';
import LoadingPlaceholder from '../loading-placeholder';

import AppStatusValue from './app-status-value';
import messages from './messages';

type ColGroup = {
  ConsentStatus: FC<{
    contactVendorUrl: string;
    isLoading?: boolean;
  }>;
  CallToAction: FC<{
    appKey: string;
    onRevokeConsent: (appKey: string) => void;
    onShowConsentModal: (appKey: string) => void;
    upgradeAppUrl?: string;
    isLoading?: boolean;
  }>;
};

// The related column components categorise by consent status
export const baseColGroupObj: Record<ConsentApp['status'], ColGroup> = {
  ConsentGiven: {
    ConsentStatus: ({ isLoading }) => {
      return (
        <AppStatusValue appearance="Success" isLoading={isLoading}>
          <FormattedMessage {...messages.statusConsentGiven} />
        </AppStatusValue>
      );
    },
    CallToAction: ({ appKey, onRevokeConsent, isLoading }) => {
      if (isLoading) {
        return <LoadingPlaceholder />;
      }
      return (
        <AnalyticsButton
          analyticsId="appConsentScreenRevokeAgreement"
          testId="revokeAgreement"
          onClick={() => {
            onRevokeConsent(appKey);
          }}
        >
          <FormattedMessage {...messages.revokeConsent} />
        </AnalyticsButton>
      );
    },
  },
  ConsentNotGiven: {
    ConsentStatus: ({ isLoading }) => {
      return (
        <AppStatusValue appearance="Error" isLoading={isLoading}>
          <FormattedMessage {...messages.statusConsentNotGiven} />
        </AppStatusValue>
      );
    },
    CallToAction: ({ appKey, onShowConsentModal, isLoading }) => {
      if (isLoading) {
        return <LoadingPlaceholder />;
      }
      return (
        <AnalyticsButton
          analyticsId="appConsentScreenViewPolicy"
          testId="showModal"
          onClick={() => {
            onShowConsentModal(appKey);
          }}
        >
          <FormattedMessage {...messages.viewPolicy} />
        </AnalyticsButton>
      );
    },
  },
  ConsentOutdated: {
    ConsentStatus: ({ isLoading }) => {
      return (
        <AppStatusValue appearance="Error" isLoading={isLoading}>
          <FormattedMessage {...messages.statusConsentOutdated} />
        </AppStatusValue>
      );
    },
    CallToAction: ({ appKey, onShowConsentModal, isLoading }) => {
      if (isLoading) {
        return <LoadingPlaceholder />;
      }
      return (
        <AnalyticsButton
          analyticsId="appConsentScreenViewPolicy"
          testId="showModal"
          onClick={() => {
            onShowConsentModal(appKey);
          }}
        >
          <FormattedMessage {...messages.viewPolicy} />
        </AnalyticsButton>
      );
    },
  },
  NoMigrationNeeded: {
    ConsentStatus: ({ isLoading }) => {
      return (
        <AppStatusValue appearance="NoopSuccess" isLoading={isLoading}>
          <FormattedMessage {...messages.statusNoMigrationNeeded} />
        </AppStatusValue>
      );
    },
    CallToAction: () => {
      return null;
    },
  },
  NoMigratingAlternative: {
    ConsentStatus: ({ contactVendorUrl, isLoading }) => {
      return (
        <AppStatusValue appearance="NoopError" isLoading={isLoading}>
          <FormattedMessage
            {...messages.statusNoMigratingAlternative}
            values={{
              link: (
                <ExternalLink
                  analyticsId="appConsentScreenContactVendor"
                  href={contactVendorUrl}
                >
                  <FormattedMessage {...messages.contactVendorUrl} />
                </ExternalLink>
              ),
            }}
          />
        </AppStatusValue>
      );
    },
    CallToAction: () => {
      return null;
    },
  },
  NoAutomatedMigrationPath: {
    ConsentStatus: ({ contactVendorUrl, isLoading }) => {
      return (
        <AppStatusValue appearance="NoopError" isLoading={isLoading}>
          <FormattedMessage
            {...messages.statusNoAutomatedMigrationPath}
            values={{
              link: (
                <ExternalLink
                  analyticsId="appConsentScreenContactVendor"
                  href={contactVendorUrl}
                >
                  <FormattedMessage {...messages.contactVendorUrl} />
                </ExternalLink>
              ),
            }}
          />
        </AppStatusValue>
      );
    },
    CallToAction: () => {
      return null;
    },
  },
  ServerAppOutdated: {
    ConsentStatus: ({ isLoading }) => {
      return (
        <AppStatusValue appearance="Error" isLoading={isLoading}>
          <FormattedMessage {...messages.statusServerAppOutdated} />
        </AppStatusValue>
      );
    },
    CallToAction: ({ upgradeAppUrl, isLoading }) => {
      if (isLoading) {
        return <LoadingPlaceholder />;
      }
      return (
        <AnalyticsButton
          analyticsId="appConsentScreenUpdateApp"
          target="_blank"
          testId="upgradeApp"
          href={upgradeAppUrl}
        >
          <FormattedMessage {...messages.upgradeApp} />
        </AnalyticsButton>
      );
    },
  },
};
