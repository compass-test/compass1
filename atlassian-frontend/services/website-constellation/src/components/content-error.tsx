import React from 'react';
import Button from '@atlaskit/button';
import {
  ContextualAnalyticsData,
  SCREEN,
  FireScreenAnalytics,
} from '@atlassian/analytics-bridge';
import EmptyState from '@atlaskit/empty-state';

export const ContentRenderingError = () => {
  return (
    <ContextualAnalyticsData sourceType={SCREEN} sourceName="contentError">
      <FireScreenAnalytics />
      <EmptyState
        header="Something unexpected happened"
        description="There was a problem rendering this content, our team has been notified."
        primaryAction={<Button href="/">Head home</Button>}
      />
    </ContextualAnalyticsData>
  );
};
