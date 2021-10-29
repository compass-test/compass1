import { useMemo } from 'react';

import { gql, useQuery } from '@apollo/client';
import isAfter from 'date-fns/isAfter';
import parseISO from 'date-fns/parseISO';
import { graphql, useFragment } from 'react-relay';

import {
  Environment,
  PageLoadType,
  Percentile,
} from '@atlassian/performance-portal-common';

import {
  FilteredMetric,
  Metrics,
  MetricsQueryVariables,
  ProcessedMetric,
  ToplineType,
} from '../../common/types';
import { getEndOfDayUTC, isWeekend } from '../../common/utils/date';

import type { dataSeries_useDataWithoutWeekends$key } from './__generated__/dataSeries_useDataWithoutWeekends.graphql';
import type { dataSeries_useProcessedData$key } from './__generated__/dataSeries_useProcessedData.graphql';

export const useDataWithoutWeekends = (
  dateRange: { dateFrom: string; dateTo: string },
  metricsData: dataSeries_useDataWithoutWeekends$key,
  percentile: Percentile,
  pageLoadType: PageLoadType,
): { loading: boolean; filteredData: FilteredMetric[] | undefined } => {
  const metrics = useFragment<dataSeries_useDataWithoutWeekends$key>(
    graphql`
      fragment dataSeries_useDataWithoutWeekends on Metric
      @relay(plural: true) {
        id
        name
        product
      }
    `,
    metricsData,
  );

  // the following is not relay
  // eslint-disable-next-line relay/generated-flow-types
  const { loading, data } = useQuery<Metrics, MetricsQueryVariables>(
    metricsDataQuery,
    {
      variables: {
        ids: metrics.map(({ id }) => id),
        env: Environment.PROD,
        dateTimeRange: {
          from: dateRange.dateFrom,
          to: dateRange.dateTo,
        },
        aggregations: [percentile],
        toplineTypes: [ToplineType.FMP, ToplineType.TTI],
        pageLoadTypes: [pageLoadType],
      },
    },
  );

  const filteredData = loading
    ? undefined
    : data?.metricsByIds.map((metric) => {
        return {
          id: metric.id,
          name: metric.name,
          product: metric.product,
          eventKey: metric.eventKey,
          series: metric.toplineTrend?.series.map((entry) => ({
            type: entry.toplineType,
            goal: entry.goal,
            data: entry.data.filter(
              (trendData) =>
                !isWeekend(parseISO(trendData.dateTime)) &&
                (trendData.aggregatedAt == null ||
                  isAfter(
                    new Date(trendData.aggregatedAt),
                    getEndOfDayUTC(new Date(trendData.dateTime)),
                  )),
            ),
          })),
        };
      });

  return {
    loading,
    filteredData,
  };
};

export const useProcessedData = (
  dateRange: { dateFrom: string; dateTo: string },
  metricsData: dataSeries_useProcessedData$key,
  percentile: Percentile,
  pageLoadType: PageLoadType,
): { loading: boolean; data: ProcessedMetric[] | undefined } => {
  const metrics = useFragment<dataSeries_useProcessedData$key>(
    graphql`
      fragment dataSeries_useProcessedData on Metric @relay(plural: true) {
        ...dataSeries_useDataWithoutWeekends
      }
    `,
    metricsData,
  );

  const { loading, filteredData } = useDataWithoutWeekends(
    dateRange,
    metrics,
    percentile,
    pageLoadType,
  );

  const volumeData = useMemo((): FilteredMetric[] | undefined => {
    return loading
      ? undefined
      : filteredData?.map((entry) => {
          return {
            id: entry.id,
            name: entry.name,
            product: entry.product,
            eventKey: entry.eventKey,
            series: entry.series,
            volume:
              entry.series[0]?.data
                .slice(-5)
                .reduce((sum, data) => sum + data.count, 0) || 0,
          };
        });
  }, [loading, filteredData]);

  return { loading, data: volumeData };
};

const metricsDataQuery = gql`
  query getReportsMetricsData(
    $ids: [ID]!
    $env: Environment!
    $dateTimeRange: DateTimeRange!
    $aggregations: [ToplineAggregation!]!
    $toplineTypes: [PageLoadToplineType!]!
    $pageLoadTypes: [PageLoadType!]!
  ) {
    metricsByIds(ids: $ids) {
      id
      name
      product
      ... on PageLoadMetric {
        eventKey
        toplineTrend(
          env: $env
          dateTimeRange: $dateTimeRange
          aggregations: $aggregations
          toplineTypes: $toplineTypes
          pageLoadTypes: $pageLoadTypes
        ) {
          series {
            toplineType
            aggregation
            pageLoadType
            goal {
              id
              name
              value
            }
            data {
              dateTime
              value
              count
              aggregatedAt
            }
          }
        }
      }
    }
  }
`;
