import React, { useCallback, useMemo } from 'react';

import { graphql, useRefetchableFragment } from 'react-relay';
import { RechartsFunction } from 'recharts';

import { useRefetchOnVariablesChange } from '@atlassian/performance-portal-relay-utils';

import {
  AvailableCohort,
  BreakdownViewType,
  Sort,
  TimingType,
  ToplineMetrics,
} from '../../../common/types';
import { useBreakdownComparisonDateParam } from '../../../services/metric-page-param';
import { usePageParam } from '../../../services/url-query-param';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { Chart } from '../chart';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { WaterfallChart } from '../waterfall-chart';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { ChartTimingData } from '../waterfall-chart/types';

import type { breakdownChartsFragment$key } from './__generated__/breakdownChartsFragment.graphql';
import type { breakdownChartsFragmentRefetchQuery } from './__generated__/breakdownChartsFragmentRefetchQuery.graphql';
import { Graph, GraphDetails } from './types';
import {
  addBaseBreakdownTimings,
  addComparisonBreakdownTimings,
  addTimingsToGraph,
  getBreakdownChartsFragmentRefetchQueryVariables,
  sortMetrics,
} from './utils';

interface Props {
  breakdownCharts: breakdownChartsFragment$key;
  availableCohorts: AvailableCohort[];
}

export const BreakdownCharts = ({
  breakdownCharts,
  availableCohorts,
}: Props) => {
  const [env] = usePageParam('env');
  const [selectedDate] = usePageParam('selectedDate');
  const [percentile] = usePageParam('percentile');
  const [pageLoadType] = usePageParam('pageLoadType');
  const [cohortType] = usePageParam('cohortType');
  const [focusedCohort] = usePageParam('focusedCohort');
  const [breakdownComparisonDateConfig] = usePageParam(
    'breakdownComparisonDateConfig',
  );
  const comparisonDate = useBreakdownComparisonDateParam();
  const [breakdownExpandedKeyMap, setBreakdownExpandedKeyMap] = usePageParam(
    'breakdownExpandedKeyMap',
  );
  const [breakdownSortType] = usePageParam('breakdownSortType');
  const [toplineMetrics] = usePageParam('breakdownVisibleTopLineMetricMap');
  const [breakdownViewType] = usePageParam('breakdownViewType');

  const [
    {
      hideLowVolumeThreshold,
      hideLowDurationThreshold,
      showAbsoluteTimingDiff,
      showPercentageTimeDiff,
    },
  ] = usePageParam('breakdownConfig');

  const [
    { baseBreakdown, comparisonBreakdown },
    refetchBreakdownCharts,
    // eslint-disable-next-line relay/generated-flow-types
  ] = useRefetchableFragment<
    breakdownChartsFragmentRefetchQuery,
    breakdownChartsFragment$key
  >(
    graphql`
      fragment breakdownChartsFragment on PageLoadMetric
      @refetchable(queryName: "breakdownChartsFragmentRefetchQuery") {
        baseBreakdown: breakdown(
          env: $env
          date: $baseDate
          aggregation: $breakdownAggregation
          pageLoadType: $pageLoadType
          cohortType: $cohortType
          cohortValue: $focusedCohort
        ) {
          timings {
            app {
              name
              # We need this filed, don't know why eslint cannot pick it up
              # eslint-disable-next-line relay/unused-fields
              startTime
              duration
              count
              # We need this filed, don't know why eslint cannot pick it up
              # eslint-disable-next-line relay/unused-fields
              aggregatedAt
            }
            metric {
              name
              # We need this filed, don't know why eslint cannot pick it up
              # eslint-disable-next-line relay/unused-fields
              startTime
              duration
              count
              # We need this filed, don't know why eslint cannot pick it up
              # eslint-disable-next-line relay/unused-fields
              aggregatedAt
            }
          }
        }
        comparisonBreakdown: breakdown(
          env: $env
          date: $comparisonDate
          aggregation: $breakdownAggregation
          pageLoadType: $pageLoadType
          cohortType: $cohortType
          cohortValue: $focusedCohort
        ) {
          timings {
            app {
              name
              # We need this filed, don't know why eslint cannot pick it up
              # eslint-disable-next-line relay/unused-fields
              startTime
              duration
              count
              # We need this filed, don't know why eslint cannot pick it up
              # eslint-disable-next-line relay/unused-fields
              aggregatedAt
            }
            metric {
              name
              # We need this filed, don't know why eslint cannot pick it up
              # eslint-disable-next-line relay/unused-fields
              startTime
              duration
              count
              # We need this filed, don't know why eslint cannot pick it up
              # eslint-disable-next-line relay/unused-fields
              aggregatedAt
            }
          }
        }
      }
    `,
    breakdownCharts,
  );

  const breakdownChartsFragmentRefetchQueryVariablesVariables = useMemo(
    () =>
      getBreakdownChartsFragmentRefetchQueryVariables({
        env,
        baseDate: selectedDate,
        comparisonDate: comparisonDate,
        percentile,
        pageLoadType,
        cohortType,
        focusedCohort,
      }),
    [
      cohortType,
      comparisonDate,
      env,
      focusedCohort,
      pageLoadType,
      percentile,
      selectedDate,
    ],
  );

  useRefetchOnVariablesChange(
    refetchBreakdownCharts,
    breakdownChartsFragmentRefetchQueryVariablesVariables,
  );

  const graph: Graph = useMemo(() => {
    const graph: Graph = {};
    if (baseBreakdown?.timings?.metric) {
      addTimingsToGraph(
        graph,
        TimingType.METRIC,
        baseBreakdown.timings.metric.filter(
          (timing) => toplineMetrics[timing.name as ToplineMetrics],
        ),
        addBaseBreakdownTimings,
      );
    }
    if (comparisonBreakdown?.timings?.metric) {
      addTimingsToGraph(
        graph,
        TimingType.METRIC,
        comparisonBreakdown.timings.metric.filter(
          (timing) => toplineMetrics[timing.name as ToplineMetrics],
        ),
        addComparisonBreakdownTimings,
      );
    }
    if (baseBreakdown?.timings?.app) {
      addTimingsToGraph(
        graph,
        TimingType.APP,
        baseBreakdown.timings.app,
        addBaseBreakdownTimings,
      );
    }
    if (comparisonBreakdown?.timings?.app) {
      addTimingsToGraph(
        graph,
        TimingType.APP,
        comparisonBreakdown.timings.app,
        addComparisonBreakdownTimings,
      );
    }
    return graph;
  }, [baseBreakdown, toplineMetrics, comparisonBreakdown]);

  const chartData = useMemo(() => {
    const chartData: ChartTimingData[] = [];
    const sortType =
      breakdownViewType === BreakdownViewType.WATERFALL
        ? Sort.WATERFALL
        : breakdownSortType;

    const addToChart = (cursor: GraphDetails, level = 0) => {
      const timing = {
        ...cursor,
        level,
        hasSubmetrics: false,
        isExpanded: breakdownExpandedKeyMap[cursor.name],
      };

      const submetrics = cursor.submetrics && Object.values(cursor.submetrics);
      const hasSubmetrics = submetrics && submetrics.length > 0;
      timing.hasSubmetrics = hasSubmetrics;

      if (
        (timing?.count ?? 0) > hideLowVolumeThreshold &&
        (timing?.duration ?? 0) > hideLowDurationThreshold
      ) {
        chartData.push(timing);
      }

      if (timing.hasSubmetrics && timing.isExpanded) {
        sortMetrics(sortType, submetrics);
        submetrics.forEach((metric) => {
          addToChart(metric, level + 1);
        });
      }
    };

    const metrics = Object.values(graph);
    sortMetrics(sortType, metrics);
    metrics.forEach((topLevelMetric) => {
      addToChart(topLevelMetric);
    });
    return chartData;
  }, [
    graph,
    hideLowDurationThreshold,
    hideLowVolumeThreshold,
    breakdownExpandedKeyMap,
    breakdownSortType,
    breakdownViewType,
  ]);

  const handleChartClick: RechartsFunction = (event) => {
    if (event && event.activeLabel) {
      setBreakdownExpandedKeyMap({
        ...breakdownExpandedKeyMap,
        [event.activeLabel]: !breakdownExpandedKeyMap[event.activeLabel],
      });
    }
  };

  const handleWaterfallChartTimingBarClicked = useCallback(
    (timingName: string) => {
      setBreakdownExpandedKeyMap({
        ...breakdownExpandedKeyMap,
        [timingName]: !breakdownExpandedKeyMap[timingName],
      });
    },
    [breakdownExpandedKeyMap, setBreakdownExpandedKeyMap],
  );

  return (
    <>
      {breakdownViewType === BreakdownViewType.COMPARISON && (
        <Chart
          data={chartData}
          onChartClick={handleChartClick}
          baseDate={selectedDate}
          comparisonDate={comparisonDate}
          comparisonType={breakdownComparisonDateConfig.comparisonType}
          availableCohorts={availableCohorts}
          focusedCohort={focusedCohort}
        />
      )}
      {breakdownViewType === BreakdownViewType.WATERFALL && (
        <WaterfallChart
          data={chartData}
          onTimingBarClicked={handleWaterfallChartTimingBarClicked}
          baseDate={selectedDate}
          comparisonDate={comparisonDate}
          comparisonType={breakdownComparisonDateConfig.comparisonType}
          availableCohorts={availableCohorts}
          focusedCohort={focusedCohort}
          isShowAbsoluteTimingDiff={showAbsoluteTimingDiff}
          isShowPercentageTimingDiff={showPercentageTimeDiff}
        />
      )}
    </>
  );
};
