import React from 'react';

import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';

import { AnnouncementsProps, Announcements as AnnouncementsUI } from './main';

const PAGE = 'announcements';

export function Announcements(props: AnnouncementsProps) {
  return (
    <ContextualAnalyticsData sourceName={PAGE} sourceType={SCREEN}>
      <FireScreenAnalytics />
      <AnnouncementsUI {...props} />
    </ContextualAnalyticsData>
  );
}
