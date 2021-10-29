import React, { FC } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import type { HeadCellType, RowCellType } from '@atlaskit/dynamic-table/types';

import type { AssessmentApp } from '../../../common/types';
import AppNameValue from '../app-name-value';
import AppTable from '../app-table';
import HeadLabel from '../head-label';

import AppCanBeMigratedValue from './app-can-be-migrated-value';
import AppDecisionValue from './app-decision-value';
import AppHasCloudValue, { getCloudLinkValue } from './app-has-cloud-value';
import AppNotesValue from './app-notes-value';
import {
  CAN_BE_MIGRATED_PRIORITY,
  CLOUD_LINK_PRIORIRY,
  MIGRATION_STATUS_PRIORITY,
} from './constants';
import messages from './messages';
import { getUsageTableHeads, getUsageTableRows } from './utils';

const DEFAULT_SORT_KEY = 'name';

export type Status = 'Unassigned' | 'NotNeeded' | 'Needed' | 'Alternative';

export type Props = {
  apps: AssessmentApp[];
  onMigrationNotesChange: (appKey: string, value: string) => Promise<void>;
  onMigrationStatusChange: (appKey: string, value: Status) => Promise<void>;
  onHome?: () => void;
  automatedPathUrlForNonEap?: string;
  reliabilityAppUrl?: string;
  isLoading?: boolean;
  // Should show usage columns
  shouldShowUsage?: boolean;
  // Whether the usages are loading
  isUsageLoading?: boolean;
};

const AppsAssessmentTable: FC<InjectedIntlProps & Props> = ({
  intl,
  apps,
  onMigrationNotesChange,
  onMigrationStatusChange,
  onHome,
  automatedPathUrlForNonEap,
  isLoading = false,
  shouldShowUsage = false,
  isUsageLoading = false,
  reliabilityAppUrl,
}) => {
  const appsCount = apps.length;
  const usageTableHeads: HeadCellType[] = shouldShowUsage
    ? getUsageTableHeads(intl, isUsageLoading)
    : [];

  return (
    <AppTable
      defaultPage={1}
      defaultSortKey={DEFAULT_SORT_KEY}
      defaultSortOrder="ASC"
      emptyDescription={intl.formatMessage(messages.emptyDescription)}
      isLoading={isLoading}
      onHome={onHome}
      testId="assessment-table"
      head={{
        cells: [
          {
            key: DEFAULT_SORT_KEY,
            isSortable: true,
            shouldTruncate: true,
            width: 19,
            content: `User installed apps (${appsCount})`,
          },
          {
            key: 'migration-status',
            isSortable: true,
            width: 19,
            content: (
              <HeadLabel
                property="migrationStatus"
                title={intl.formatMessage(
                  messages.headDescriptionMigrationStatus,
                )}
              >
                <FormattedMessage {...messages.headLabelMigrationStatus} />
              </HeadLabel>
            ),
          },
          {
            key: 'has-cloud-version',
            isSortable: true,
            width: 10,
            content: (
              <HeadLabel
                property="hasCloudVersion"
                title={intl.formatMessage(
                  messages.headDescriptionHasCloudVersion,
                )}
              >
                <FormattedMessage {...messages.headLabelHasCloudVersion} />
              </HeadLabel>
            ),
          },
          ...usageTableHeads,
          {
            key: 'can-be-migrated',
            isSortable: true,
            width: 10,
            content: (
              <HeadLabel
                property="canBeMigrated"
                title={intl.formatMessage(
                  messages.headDescriptionCanBeMigrated,
                )}
              >
                <FormattedMessage {...messages.headLabelCanBeMigrated} />
              </HeadLabel>
            ),
          },
          {
            key: 'migration-notes',
            content: (
              <HeadLabel
                property="migrationNotes"
                title={intl.formatMessage(
                  messages.headDescriptionMigrationNotes,
                )}
              >
                <FormattedMessage {...messages.headLabelMigrationNotes} />
              </HeadLabel>
            ),
          },
        ],
      }}
      rows={apps.map((app) => {
        const usageTableRows: RowCellType[] = shouldShowUsage
          ? getUsageTableRows(app)
          : [];
        const cloudLink = getCloudLinkValue({
          hasCloudVersion: app.hasCloudVersion,
          hasFeatureDifferences: app.hasFeatureDifferences,
          featureDifferencesUrl: app.featureDifferencesUrl,
          cloudVersionDevelopmentRoadmap: app.cloudVersionDevelopmentRoadmap,
        });

        return {
          key: app.key,
          cells: [
            {
              key: app.name.toLocaleLowerCase(),
              content: <AppNameValue name={app.name} logoUrl={app.logoUrl} />,
            },
            {
              key: MIGRATION_STATUS_PRIORITY.indexOf(app.migrationStatus),
              content: (
                <AppDecisionValue
                  appKey={app.key}
                  defaultMigrationStatus={app.migrationStatus}
                  onChange={onMigrationStatusChange}
                />
              ),
            },
            {
              key: CLOUD_LINK_PRIORIRY.indexOf(cloudLink),
              content: (
                <AppHasCloudValue
                  appKey={app.key}
                  cloudLink={cloudLink}
                  cloudUrl={app.cloudUrl}
                  featureDifferencesUrl={app.featureDifferencesUrl}
                  contactVendorUrl={app.contactVendorUrl}
                  cloudVersionDevelopmentRoadmap={
                    app.cloudVersionDevelopmentRoadmap
                  }
                />
              ),
            },
            ...usageTableRows,
            {
              key: CAN_BE_MIGRATED_PRIORITY.indexOf(app.canBeMigrated),
              content: (
                <AppCanBeMigratedValue
                  appKey={app.key}
                  canBeMigrated={app.canBeMigrated}
                  contactVendorUrl={app.contactVendorUrl}
                  upgradeAppUrl={app.upgradeAppUrl}
                  migrationPathInstructionsUrl={
                    app.migrationPathInstructionsUrl
                  }
                  automatedPathUrlForNonEap={automatedPathUrlForNonEap}
                  migrationRoadmapRequest={app.migrationRoadmapRequest}
                  reliabilityAppUrl={reliabilityAppUrl}
                  reliabilityState={app.reliabilityState}
                />
              ),
            },
            {
              key: 'migrationNotes',
              content: (
                <AppNotesValue
                  appKey={app.key}
                  defaultMigrationNotes={app.migrationNotes}
                  onChange={onMigrationNotesChange}
                />
              ),
            },
          ],
        };
      })}
    />
  );
};

export default injectIntl(AppsAssessmentTable);
