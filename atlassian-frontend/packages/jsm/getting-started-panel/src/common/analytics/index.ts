import React from 'react';
import { fireUIAnalytics, SCREEN } from '@atlassian/analytics-bridge';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { jsmGettingStartedPanelScreenName } from './constants';

interface EventParams {
  attributes?: Record<string, any>;
  handler?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const useLinkClickedEvent = (
  actionSubjectId: string,
  {
    attributes = undefined,
    handler = (e) => e.stopPropagation(),
  }: EventParams = {},
) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  // TODO: The links' onClick does not give us an Atlaskit event so
  // we have to create it ourselves. Because of this we don't have the context
  // populated automatically from ContextualAnalyticsData
  const event = createAnalyticsEvent({
    action: 'clicked',
    actionSubject: 'link',
  });
  event.context.push({
    source: `${jsmGettingStartedPanelScreenName}${SCREEN}`,
  });
  return (e: React.MouseEvent<HTMLElement>) => {
    if (attributes) {
      fireUIAnalytics(event, actionSubjectId, attributes);
    } else {
      fireUIAnalytics(event, actionSubjectId);
    }
    handler(e);
  };
};
