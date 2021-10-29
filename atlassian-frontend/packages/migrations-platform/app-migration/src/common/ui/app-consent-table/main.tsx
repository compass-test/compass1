import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import type { ConsentApp } from '../../../common/types';
import AppNameValue from '../../../common/ui/app-name-value';
import AppTable from '../../../common/ui/app-table';

import messages from './messages';
import { baseColGroupObj } from './utils';

const DEFAULT_SORT_KEY = 'app-name';
const CONSENT_STATUS_PRIORITY: ConsentApp['status'][] = [
  'ConsentNotGiven',
  'ConsentOutdated',
  'ServerAppOutdated',
  'NoAutomatedMigrationPath',
  'NoMigratingAlternative',
  'ConsentGiven',
  'NoMigrationNeeded',
];

export type Props = {
  apps: ConsentApp[];
  onRevokeConsent: (appKey: string) => void;
  onShowConsentModal: (appKey: string) => void;
  isLoading?: boolean;
};

const AppConsentTable: FC<InjectedIntlProps & Props> = ({
  intl,
  apps,
  onRevokeConsent,
  onShowConsentModal,
  isLoading = false,
}) => {
  return (
    <AppTable
      defaultPage={1}
      defaultSortKey={DEFAULT_SORT_KEY}
      defaultSortOrder="ASC"
      testId="consent-table"
      isLoading={isLoading}
      head={{
        cells: [
          {
            key: DEFAULT_SORT_KEY,
            isSortable: true,
            shouldTruncate: true,
            width: 20,
            content: intl.formatMessage(messages.tableHeaderNeededInCloud, {
              count: apps.length,
            }),
          },
          {
            key: 'app-consent-status',
            isSortable: true,
            content: intl.formatMessage(messages.tableHeaderConsentStatus),
          },
          {
            key: 'app-cta',
            width: 20,
            content: intl.formatMessage(messages.tableHeaderCallToAction),
          },
        ],
      }}
      rows={apps.map((app) => {
        const { ConsentStatus, CallToAction } = baseColGroupObj[app.status];

        return {
          key: app.key,
          cells: [
            {
              key: app.name,
              content: (
                <AppNameValue
                  name={app.name}
                  logoUrl={app.logoUrl}
                  isLoading={app.isLoading}
                />
              ),
            },
            {
              key: CONSENT_STATUS_PRIORITY.indexOf(app.status),
              content: (
                <ConsentStatus
                  contactVendorUrl={app.contactVendorUrl}
                  isLoading={app.isLoading}
                />
              ),
            },
            {
              content: (
                <CallToAction
                  appKey={app.key}
                  onRevokeConsent={onRevokeConsent}
                  onShowConsentModal={onShowConsentModal}
                  upgradeAppUrl={app.upgradeAppUrl}
                  isLoading={app.isLoading}
                />
              ),
            },
          ],
        };
      })}
    />
  );
};

export default injectIntl(AppConsentTable);
