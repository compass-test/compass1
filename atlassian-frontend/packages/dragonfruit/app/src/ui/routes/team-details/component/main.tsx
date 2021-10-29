import React from 'react';

import { useRouter } from 'react-resource-router';

import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';
import { TeamDashboard } from '@atlassian/dragonfruit-page-team-details';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ErrorPage } from '../../../../common/ui/error-page';

const PAGE = 'teamDashboard';

export default withErrorBoundary(
  () => {
    const [{ match }] = useRouter();
    const teamId = match.params.teamId || '';

    return (
      <ContextualAnalyticsData sourceName={PAGE} sourceType={SCREEN}>
        <TeamDashboard teamId={teamId} />
        <FireScreenAnalytics />
      </ContextualAnalyticsData>
    );
  },
  {
    componentName: PAGE,
    Fallback: ErrorPage,
  },
);
