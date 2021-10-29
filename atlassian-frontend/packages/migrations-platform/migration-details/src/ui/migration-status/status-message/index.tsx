import React, { FC, ReactNode } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import RefreshIcon from '@atlaskit/icon/glyph/refresh';
import { AnalyticsButton } from '@atlassian/mpt-elements';

import type {
  OverallMigrationStatus,
  ProductFamilyKey,
} from '../../../common/types';

import {
  preMigrationStatuses,
  statusToMessages,
  statusToMessagesForCloudMigration,
} from './constants';
import messages from './messages';
import { HeaderWrapper, RefreshWrapper } from './styled';

type Props = {
  status: OverallMigrationStatus;
  productFamilyKey?: ProductFamilyKey;
  refreshLabel?: string;
  onRefresh: () => void;
  actionContent?: ReactNode;
  isCloudMigration?: boolean;
};

const StatusMessage: FC<InjectedIntlProps & Props> = ({
  status,
  productFamilyKey = 'jira',
  refreshLabel,
  onRefresh,
  intl,
  actionContent,
  isCloudMigration,
}) => {
  const { title, description, cloudDestination } = isCloudMigration
    ? statusToMessagesForCloudMigration[status]
    : statusToMessages[status];

  return (
    <>
      <HeaderWrapper>
        <h3>{intl.formatMessage(title)}</h3>
        {actionContent
          ? actionContent
          : preMigrationStatuses.includes(status) && (
              <AnalyticsButton
                onClick={onRefresh}
                analyticsId="refreshMigrationDataButton"
                isDisabled={status === 'ChecksRunning'}
              >
                <RefreshWrapper>
                  <RefreshIcon label={intl.formatMessage(messages.refresh)} />
                  &nbsp;{refreshLabel || intl.formatMessage(messages.refresh)}
                </RefreshWrapper>
              </AnalyticsButton>
            )}
      </HeaderWrapper>
      <p data-testid="migrationStatusDescription">
        {description && intl.formatMessage(description)}
        {cloudDestination &&
          intl.formatMessage(cloudDestination[productFamilyKey])}
      </p>
    </>
  );
};

export default injectIntl(StatusMessage);
