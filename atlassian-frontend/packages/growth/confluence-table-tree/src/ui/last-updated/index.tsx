import React from 'react';
import { fireOperationalAnalytics } from '@atlassian/analytics-bridge';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import messages from '../../messages';
import lastUpdatedMessages from './messages';
import { LastUpdatedWrapper } from './styled';
import { LastUpdated } from '../../types';

export const LastUpdatedBase = ({
  lastUpdated,
  intl: { formatMessage },
}: {
  lastUpdated?: LastUpdated;
} & InjectedIntlProps) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  if (!lastUpdated) {
    fireOperationalAnalytics(
      createAnalyticsEvent({}),
      'confluencePageTree unknownContributor',
    );
    return (
      <small>
        <FormattedMessage {...messages.unknown} />
      </small>
    );
  }
  const { friendlyWhen, number } = lastUpdated;
  const prefix =
    number === 1 ? lastUpdatedMessages.created : lastUpdatedMessages.updated;
  return (
    <LastUpdatedWrapper>
      {formatMessage(prefix)} {friendlyWhen}
    </LastUpdatedWrapper>
  );
};

export default injectIntl(LastUpdatedBase);
