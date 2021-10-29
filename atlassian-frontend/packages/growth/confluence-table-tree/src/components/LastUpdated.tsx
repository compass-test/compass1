import React from 'react';
import { fireOperationalAnalytics } from '@atlassian/analytics-bridge';
import {
  withAnalyticsEvents,
  CreateUIAnalyticsEvent,
} from '@atlaskit/analytics-next';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../messages';

import { LastUpdatedContainer, LastUpdatedUnknown } from '../styled';

interface LastUpdatedProps {
  lastUpdated?: {
    friendlyWhen: string;
  };
  createAnalyticsEvent?: CreateUIAnalyticsEvent;
}

export const LastUpdatedBase: React.FC<LastUpdatedProps> = ({
  lastUpdated,
  createAnalyticsEvent,
}) => {
  if (lastUpdated) {
    return (
      <LastUpdatedContainer>{lastUpdated.friendlyWhen}</LastUpdatedContainer>
    );
  }

  if (createAnalyticsEvent) {
    fireOperationalAnalytics(
      createAnalyticsEvent({}),
      'confluencePageTree unknownContributor',
    );
  }

  return (
    <LastUpdatedUnknown>
      <FormattedMessage {...messages.unknown} />
    </LastUpdatedUnknown>
  );
};

export default withAnalyticsEvents()(injectIntl(LastUpdatedBase));
