import React from 'react';

import { useRouter } from 'react-resource-router';

import {
  ContextualAnalyticsData,
  FireScreenAnalytics,
  SCREEN,
} from '@atlassian/analytics-bridge';
import { useScorecardDetailsPageEnabled } from '@atlassian/dragonfruit-feature-flags';
import { PageScorecardDetails } from '@atlassian/dragonfruit-page-scorecard-details';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ErrorPage } from '../../../../common/ui/error-page';

const PAGE = 'scorecardDetails';

export default withErrorBoundary(
  () => {
    const scorecardDetailsPageEnabled = useScorecardDetailsPageEnabled();
    const [{ match }] = useRouter();
    const scorecardId = match.params.scorecardId || '';
    return scorecardDetailsPageEnabled ? (
      <ContextualAnalyticsData sourceName={PAGE} sourceType={SCREEN}>
        <PageScorecardDetails scorecardId={scorecardId} />
        <FireScreenAnalytics />
      </ContextualAnalyticsData>
    ) : null;
  },
  {
    componentName: PAGE,
    Fallback: ErrorPage,
  },
);
