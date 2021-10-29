import React from 'react';

import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';
import { AppManagementPage } from '@atlassian/dragonfruit-page-apps';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ErrorPage } from '../../../../common/ui/error-page';

const PAGE = 'apps';

export default withErrorBoundary(
  () => (
    <ContextualAnalyticsData sourceName="apps" sourceType={SCREEN}>
      <AppManagementPage />
      <FireScreenAnalytics />
    </ContextualAnalyticsData>
  ),
  {
    componentName: PAGE,
    Fallback: ErrorPage,
  },
);
