import { useMemo } from 'react';

import { graphql, useLazyLoadQuery } from 'react-relay';

import { toGQLDate } from '../../../common/utils';
import { usePageParam } from '../../url-query-param';

import type { pageLoadInitialRatioQuery } from './__generated__/pageLoadInitialRatioQuery.graphql';

export const usePageLoadInitialRatioData = (
  metricId: string,
  date: Date,
  focusedCohort: string,
) => {
  const [environment] = usePageParam('env');
  const [cohortType] = usePageParam('cohortType');

  const isoDateString = useMemo(() => toGQLDate(date), [date]);
  const variables = useMemo(
    () => ({
      id: metricId,
      env: environment,
      date: isoDateString,
      percentile: 90,
      cohort: `${cohortType}::${focusedCohort}`,
      noCohortSelected: !focusedCohort,
    }),
    [cohortType, environment, focusedCohort, isoDateString, metricId],
  );

  // eslint-disable-next-line relay/generated-flow-types
  const queryResult = useLazyLoadQuery<pageLoadInitialRatioQuery>(
    graphql`
      query pageLoadInitialRatioQuery(
        $id: ID!
        $env: Environment!
        $date: Date!
        $cohort: String!
        $noCohortSelected: Boolean!
      ) {
        metric(id: $id) {
          ... on PageLoadMetric {
            pageLoadTransitionRatio(env: $env, date: $date, cohort: $cohort)
            @skip(if: $noCohortSelected)
          }
        }
      }
    `,
    variables,
  );
  const ratio = queryResult.metric?.pageLoadTransitionRatio;

  return ratio;
};
