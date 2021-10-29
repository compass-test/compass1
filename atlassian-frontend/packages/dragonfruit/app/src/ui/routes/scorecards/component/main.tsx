import React from 'react';

import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';
import { ScorecardListPage } from '@atlassian/dragonfruit-page-scorecard-list';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ErrorPage } from '../../../../common/ui/error-page';

const PAGE = 'scorecardSettings';

export default withErrorBoundary(
  () => (
    <ContextualAnalyticsData sourceName={PAGE} sourceType={SCREEN}>
      <ScorecardListPage />
      <FireScreenAnalytics />
    </ContextualAnalyticsData>
  ),
  {
    componentName: PAGE,
    Fallback: ErrorPage,
  },
);
