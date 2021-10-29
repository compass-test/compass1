import React, { useCallback } from 'react';

import { graphql, useFragment } from 'react-relay';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';
import { SlackIcon } from '@atlassian/performance-portal-common';

import type { slackChannelHeaderFragment$key } from './__generated__/slackChannelHeaderFragment.graphql';

type Props = {
  data: slackChannelHeaderFragment$key;
};

export const SlackChannel = (props: Props) => {
  const data = useFragment(
    graphql`
      fragment slackChannelHeaderFragment on Metric {
        slackChannel
      }
    `,
    props.data,
  );

  const { createAnalyticsEvent } = useAnalyticsEvents();

  const onClick = useCallback(() => {
    const analyticsEvent = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'slackTeamLink',
      source: 'metric',
    });
    sendUIEvent(analyticsEvent);
  }, [createAnalyticsEvent]);

  return data.slackChannel ? (
    <Button
      href={`https://slack.com/app_redirect?channel=${data.slackChannel}&team=TFCUTJ0G5`}
      target="_blank"
      onClick={onClick}
      iconBefore={<SlackIcon />}
    >
      #{data.slackChannel}
    </Button>
  ) : null;
};
