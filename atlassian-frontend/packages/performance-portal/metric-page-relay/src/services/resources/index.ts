import { createRelayResource } from '@atlassian/performance-portal-relay-utils';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { getBreakdownChartsFragmentRefetchQueryVariables } from '../../ui/breakdown-metric/breakdown-charts/utils';
import MainMetricPageQuery, {
  metricPageQuery,
  // eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
} from '../../ui/metric-page/__generated__/metricPageQuery.graphql';
import { getComparisonDate } from '../metric-page-param';
import { getInitialState } from '../url-query-param';

export const metricResource = createRelayResource<metricPageQuery>({
  getQuery: ({ match }) => {
    const {
      env,
      selectedDate,
      percentile,
      pageLoadType,
      cohortType,
      focusedCohort,
      breakdownComparisonDateConfig,
      showWeekend,
    } = getInitialState();

    const comparisonDate = getComparisonDate(
      breakdownComparisonDateConfig.comparisonType,
      showWeekend,
      selectedDate,
      breakdownComparisonDateConfig.selectedFixedDate,
    );

    const breakdownChartsFragmentRefetchQueryVariables = getBreakdownChartsFragmentRefetchQueryVariables(
      {
        env,
        baseDate: selectedDate,
        comparisonDate: comparisonDate,
        percentile,
        pageLoadType,
        cohortType,
        focusedCohort,
      },
    );

    return {
      query: MainMetricPageQuery,
      variables: {
        eventKey: String(match.params.eventKey),
        ...breakdownChartsFragmentRefetchQueryVariables,
      },
    };
  },
});
