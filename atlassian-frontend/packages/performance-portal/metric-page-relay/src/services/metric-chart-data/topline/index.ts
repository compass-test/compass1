import { useMemo } from 'react';

import addMonths from 'date-fns/addMonths';
//TODO: Remove this eslint-disable when we migrate the child components to relay
/* eslint-disable relay/unused-fields*/
import { graphql } from 'react-relay';

import { useLazyLoadQueryWithLoadingState } from '@atlassian/performance-portal-relay-utils';

import {
  getEndOfDayUTC,
  getStartOfDayUTC,
  toGQLDate,
} from '../../../common/utils';
import { usePageParam } from '../../url-query-param';

import {
  toplineQuery,
  toplineQueryVariables,
} from './__generated__/toplineQuery.graphql';

export const convertPercentileToNumber = (percentile: string): number => {
  const PercentileEnumToNumberMap: Record<string, number> = {
    p50: 50,
    p75: 75,
    p90: 90,
  };

  return PercentileEnumToNumberMap[percentile as string] ?? 90;
};

export const useToplineChartData = (metricId: string, metric: string) => {
  const [environment] = usePageParam('env');
  const [percentile] = usePageParam('percentile');
  const [pageLoadType] = usePageParam('pageLoadType');
  const [cohortType] = usePageParam('cohortType');

  const variables: toplineQueryVariables = useMemo(() => {
    const endOfTodayUTC = getEndOfDayUTC(new Date());
    const dateFrom = toGQLDate(getStartOfDayUTC(addMonths(endOfTodayUTC, -12)));
    const dateTo = toGQLDate(endOfTodayUTC);

    return {
      id: metricId,
      env: environment,
      dateFrom,
      dateTo,
      percentile: convertPercentileToNumber(percentile),
      pageLoadType: pageLoadType,
      metric,
      cohortType: cohortType.toLowerCase(),
    };
  }, [cohortType, environment, metric, metricId, pageLoadType, percentile]);

  // TODO: use useRefetchableFragment
  return useLazyLoadQueryWithLoadingState<toplineQuery>(
    graphql`
      query toplineQuery(
        $id: ID!
        $env: Environment!
        $dateFrom: Date!
        $dateTo: Date!
        $percentile: Int!
        $pageLoadType: PageLoadType
        $metric: String!
        $cohortType: String!
      ) {
        experience(experienceId: $id) {
          __typename
          id
          hotEvents(from: $dateFrom, to: $dateTo) {
            issueId
            name
            startAt
            endAt
          }
          dailyToplineTrend(
            env: $env
            dateFrom: $dateFrom
            dateTo: $dateTo
            percentile: $percentile
            pageLoadType: $pageLoadType
            metric: $metric
            cohortType: $cohortType
          ) {
            env
            percentile
            pageLoadType
            metric
            cohortType
            cohortValue
            data {
              day
              value
              count
              aggregatedAt
              overrideAt
              overrideSourceName
            }
            goals {
              id
              name
              value
            }
          }
        }
      }
    `,
    variables,
  );
};
