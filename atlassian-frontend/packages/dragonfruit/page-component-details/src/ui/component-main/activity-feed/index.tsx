import React from 'react';

import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';

import { ActivityFeedProps, ActivityFeed as ActivityFeedUI } from './main';

const PAGE = 'activityFeed';

export function ActivityFeed(props: ActivityFeedProps) {
  return (
    <ContextualAnalyticsData sourceName={PAGE} sourceType={SCREEN}>
      <FireScreenAnalytics />
      <ActivityFeedUI {...props} />
    </ContextualAnalyticsData>
  );
}
