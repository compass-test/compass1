import React from 'react';

import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';
import {
  UI_TEAMS_LIST_PAGE,
  UI_TEAMS_LIST_PAGE_DEFAULT_VALUE,
  useFeatureFlag,
} from '@atlassian/dragonfruit-feature-flags';
import { PageTeamsList } from '@atlassian/dragonfruit-page-teams-list';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ErrorPage } from '../../../../common/ui/error-page';

const PAGE = 'teamList';

export default withErrorBoundary(
  () => {
    const { value: useTeamsListPageEnabled } = useFeatureFlag<boolean>(
      UI_TEAMS_LIST_PAGE,
      UI_TEAMS_LIST_PAGE_DEFAULT_VALUE,
    );

    return (
      <ContextualAnalyticsData sourceName={PAGE} sourceType={SCREEN}>
        {useTeamsListPageEnabled ? (
          <PageTeamsList testId="page-teams-list" />
        ) : null}
        <FireScreenAnalytics />
      </ContextualAnalyticsData>
    );
  },
  {
    componentName: PAGE,
    Fallback: ErrorPage,
  },
);
