import React, { FC, ReactNode, useMemo } from 'react';

import { FormattedMessage, InjectedIntl } from 'react-intl';

import { VerticalHeadingsTable } from '@atlassian/mpt-elements';
import TimeAgo from '@atlassian/mpt-timeago';
import { useIntl, withCustomIntlProvider } from '@atlassian/mpt-utils';

import {
  Check,
  CurrentChecksStatus,
  CurrentMigrationStatus,
  ProductFamilyKey,
} from '../../common/types';
import { fetchLanguageFile } from '../../utils/i18n';

import AnonymousAccessContent from './anonymous-access-content';
import ChecksContent from './checks-content';
import messages from './messages';
import StatusMessage from './status-message';
import {
  ChecksWrapper,
  ContentWrapper,
  EstimatesWrapper,
  MigrationCreationInfoWrapper,
  MigrationCreationWrapper,
  Wrapper,
} from './styled';
import {
  getChecksInfo,
  getEstimatedTimeSection,
  getOverallMigrationStatus,
} from './utils';

export type Props = {
  // Checks - this is used in combination with migration status to determine the overall migration status and last updated time
  checks: Check[];
  // Checks - do check execution errors block the migration from being run?
  isExecutionErrorBlocking?: boolean;
  // To differentiate between S2C & C2C
  isCloudMigration?: boolean;
  // Migration status - this is used in combination with preflight check statuses to determine the overall migration status
  migrationStatus?: CurrentMigrationStatus;
  // A warning message is shown if any containers are available to the public
  areAnyContainersPubliclyAvailable?: boolean;
  // Product family key is used to determine container name
  productFamilyKey: ProductFamilyKey;
  // Estimated time for migration in seconds (estimated time at 16Mbps)
  estimatedTimeSeconds?: number;
  // Text to be displayed for refresh button
  refreshLabel?: string;
  // Optionally pass ReactNode to override status message action, e.g. Spinner instead of button
  overrideStatusMessageAction?: ReactNode;
  // Method to execute on viewing checks, displayed when there are any check warnings or errors
  onViewChecks: () => void;
  onRefresh: () => void;
  children?: ReactNode;
};

const accessHeaderForProductFamily: Partial<Record<
  ProductFamilyKey,
  FormattedMessage.MessageDescriptor
>> = {
  jira: messages.containerAccessJiraHeader,
};

const getChecksRows = (
  intl: InjectedIntl,
  checksStatus: CurrentChecksStatus,
  onViewChecks: () => void,
  productFamilyKey: ProductFamilyKey,
  areAnyContainersPubliclyAvailable: boolean | undefined,
) => {
  const rows = [
    {
      header: intl.formatMessage(messages.checksHeader),
      content: (
        <ChecksContent
          checksStatus={checksStatus}
          onViewChecks={onViewChecks}
        />
      ),
    },
  ];

  if (areAnyContainersPubliclyAvailable) {
    const accessHeader = accessHeaderForProductFamily[productFamilyKey];
    if (accessHeader) {
      rows.push({
        header: intl.formatMessage(accessHeader),
        content: <AnonymousAccessContent productFamilyKey={productFamilyKey} />,
      });
    }
  }

  return rows;
};

const getEstimatesRows = (
  intl: InjectedIntl,
  isCloudMigration: boolean,
  estimatedTimeSeconds?: number,
  lastChecked?: number,
) => {
  const rows = [];
  const showSpeedDetails = !isCloudMigration;

  if (estimatedTimeSeconds !== undefined) {
    rows.push({
      header: intl.formatMessage(messages.estimatedTimeToMigrateHeader),
      content: (
        <>
          {getEstimatedTimeSection(
            estimatedTimeSeconds,
            intl,
            showSpeedDetails,
          )}
        </>
      ),
    });
  }

  if (lastChecked !== undefined) {
    rows.push({
      header: intl.formatMessage(messages.lastCheckedHeader),
      content: <TimeAgo date={lastChecked} />,
    });
  }

  return rows;
};

const MigrationStatus: FC<Props> = ({
  checks,
  isExecutionErrorBlocking,
  isCloudMigration = false,
  migrationStatus,
  areAnyContainersPubliclyAvailable,
  overrideStatusMessageAction,
  productFamilyKey,
  estimatedTimeSeconds,
  refreshLabel,
  onViewChecks,
  onRefresh,
  children,
}) => {
  const { intl } = useIntl();
  const { checksStatus, lastChecked, creation } = useMemo(
    () => getChecksInfo(checks, isExecutionErrorBlocking),
    [checks, isExecutionErrorBlocking],
  );
  const overallMigrationStatus = getOverallMigrationStatus(
    checksStatus,
    migrationStatus,
  );

  const shouldShowChecks = migrationStatus == null;
  const shouldShowEstimates =
    migrationStatus == null && checksStatus !== 'Running';
  const shouldShowCreation = migrationStatus !== 'Running';

  return (
    <Wrapper status={overallMigrationStatus}>
      <ContentWrapper>
        <StatusMessage
          status={overallMigrationStatus}
          onRefresh={onRefresh}
          refreshLabel={refreshLabel}
          actionContent={overrideStatusMessageAction}
          productFamilyKey={productFamilyKey}
          isCloudMigration={isCloudMigration}
        />
        {shouldShowChecks && (
          <ChecksWrapper>
            <VerticalHeadingsTable
              rows={getChecksRows(
                intl,
                checksStatus,
                onViewChecks,
                productFamilyKey,
                areAnyContainersPubliclyAvailable,
              )}
            />
          </ChecksWrapper>
        )}
        {shouldShowEstimates && (
          <EstimatesWrapper>
            <VerticalHeadingsTable
              rows={getEstimatesRows(
                intl,
                isCloudMigration,
                estimatedTimeSeconds,
                lastChecked,
              )}
            />
          </EstimatesWrapper>
        )}
        {shouldShowCreation && creation !== undefined ? (
          <MigrationCreationWrapper>
            <VerticalHeadingsTable
              rows={[
                {
                  header: intl.formatMessage(messages.creationHeader),
                  content: (
                    <>
                      <TimeAgo date={creation} />
                      <MigrationCreationInfoWrapper>
                        {intl.formatMessage(messages.creationHeaderInfo)}
                      </MigrationCreationInfoWrapper>
                    </>
                  ),
                },
              ]}
            />
          </MigrationCreationWrapper>
        ) : null}
        {children}
      </ContentWrapper>
    </Wrapper>
  );
};

export default withCustomIntlProvider(MigrationStatus, fetchLanguageFile);
