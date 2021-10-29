import React, { useCallback } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';
import { SlackIcon } from '@atlassian/performance-portal-common';

export interface Props {
  channelName: string;
}

export const SlackChannel = ({ channelName }: Props) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const onClick = useCallback(() => {
    const analyticsEvent = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'slackTeamLink',
      source: 'metric',
    });
    sendUIEvent(analyticsEvent);
  }, [createAnalyticsEvent]);

  return (
    <Button
      href={`https://slack.com/app_redirect?channel=${channelName}&team=TFCUTJ0G5`}
      target="_blank"
      onClick={onClick}
      iconBefore={<SlackIcon />}
    >
      #{channelName}
    </Button>
  );
};
