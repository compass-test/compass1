import { gql, useQuery } from '@apollo/client';
import parseISO from 'date-fns/parseISO';

import {
  CohortType,
  Environment,
  PageLoadType,
  Percentile,
  ToplineType,
} from '@atlassian/performance-portal-common';

import { RatioResultEntry, ToplineTrendData } from '../../common/types';
import { isWeekend } from '../../common/utils/date';

import {
  PageLoadInitialRatioQueryResponse,
  PageLoadInitialRatioQueryVariables,
  PageLoadInitialRatioSeries,
} from './types';

const ratioQuery = gql`
  query pagesLoadInitialRatio(
    $ids: [ID]!
    $env: Environment!
    $dateTimeRange: DateTimeRange!
    $aggregations: [ToplineAggregation!]!
    $toplineTypes: [PageLoadToplineType!]!
    $pageLoadTypes: [PageLoadType!]!
    $cohortTypes: [CohortType!]!
  ) {
    metricsByIds(ids: $ids) {
      id
      ... on PageLoadMetric {
        toplineTrend(
          env: $env
          dateTimeRange: $dateTimeRange
          aggregations: $aggregations
          toplineTypes: $toplineTypes
          pageLoadTypes: $pageLoadTypes
          cohortTypes: $cohortTypes
        ) {
          series {
            pageLoadType
            data {
              dateTime
              count
            }
          }
        }
      }
    }
  }
`;

export const usePageLoadInitialRatioQuery = (
  { dateFrom, dateTo }: { dateFrom: string; dateTo: string },
  metricIds: string[],
) => {
  return useQuery<
    PageLoadInitialRatioQueryResponse,
    PageLoadInitialRatioQueryVariables
  >(ratioQuery, {
    variables: {
      ids: metricIds,
      env: Environment.PROD,

      dateTimeRange: {
        from: dateFrom,
        to: dateTo,
      },
      aggregations: [Percentile.p90],
      toplineTypes: [ToplineType.TTI],
      pageLoadTypes: [PageLoadType.COMBINED, PageLoadType.TRANSITION],
      cohortTypes: [CohortType.ALL],
    },
    skip: metricIds.length === 0,
  });
};

export const mapToplineTrend = (toplineTrend: {
  series: PageLoadInitialRatioSeries[];
}): ToplineTrendData[] => {
  const combined = toplineTrend.series.find(
    (series) => series.pageLoadType === PageLoadType.COMBINED,
  );
  const transition = toplineTrend.series.find(
    (series) => series.pageLoadType === PageLoadType.TRANSITION,
  );

  if (!combined) {
    return [];
  }

  return combined.data
    .filter((trendData) => !isWeekend(parseISO(trendData.dateTime)))
    .map((dataEntry) => {
      const transitionVolume =
        transition?.data.find(({ dateTime }) => dataEntry.dateTime === dateTime)
          ?.count ||
        0 ||
        0;

      return {
        dateTime: dataEntry.dateTime,
        count: dataEntry.count,
        value: transitionVolume / dataEntry.count,
      };
    });
};

export const usePageLoadsInitialRatioData = (
  dateRange: { dateFrom: string; dateTo: string },
  metricIds: string[],
): RatioResultEntry => {
  const { loading, error, data } = usePageLoadInitialRatioQuery(
    dateRange,
    metricIds,
  );
  if (loading || error || !data) {
    return {
      loading,
      error,
      data: undefined,
    };
  }

  return {
    loading,
    error,
    data: data.metricsByIds.map((metric) => ({
      id: metric.id,
      data: mapToplineTrend(metric.toplineTrend),
    })),
  };
};
