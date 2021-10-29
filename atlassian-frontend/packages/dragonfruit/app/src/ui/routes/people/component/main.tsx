import React from 'react';

import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';
import {
  UI_TEAM_LIST_PAGE,
  UI_TEAM_LIST_PAGE_DEFAULT_VALUE,
  useFeatureFlag,
} from '@atlassian/dragonfruit-feature-flags';
import { PageTeamList } from '@atlassian/dragonfruit-page-team-list';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ErrorPage } from '../../../../common/ui/error-page';

const PAGE = 'people';

export default withErrorBoundary(
  () => {
    const { value: newTeamListPageEnabled } = useFeatureFlag<boolean>(
      UI_TEAM_LIST_PAGE,
      UI_TEAM_LIST_PAGE_DEFAULT_VALUE,
    );

    // We weren't disabling this route or returning an error page before the
    // feature flagging here. While we probably should have a standard for this
    // it was not considered part of COMPASS-2727's scope. We're just
    // maintaining existing behavior if the feature flag is off and returning
    // a placeholder div for now.
    return (
      <ContextualAnalyticsData sourceName={PAGE} sourceType={SCREEN}>
        {newTeamListPageEnabled ? (
          <PageTeamList testId={'page-team-list'} />
        ) : (
          <div>People page</div>
        )}
        <FireScreenAnalytics />
      </ContextualAnalyticsData>
    );
  },
  {
    componentName: PAGE,
    Fallback: ErrorPage,
  },
);
