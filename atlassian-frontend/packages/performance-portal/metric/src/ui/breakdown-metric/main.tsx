import React, { useCallback, useMemo, useState } from 'react';

import { RechartsFunction } from 'recharts';

import Spinner from '@atlaskit/spinner';

import storm from '../../common/assets/Storm.svg';
import { BreakdownViewType, Sort, TimingType } from '../../common/types';
import { SectionContainer, SectionHeader } from '../../common/ui/section';
import { toISODateString } from '../../common/utils';
import {
  useBreakdownComparisonDateParam,
  useBreakdownComparisonTypeParam,
  useBreakdownExpandedSelectionParam,
  useBreakdownShownToplineMetrics,
  useBreakdownSortParam,
  useBreakdownViewTypeParam,
  useFocusedCohortParam,
  useHideLowDurationThresholdParam,
  useHideLowVolumeThresholdParam,
  useSelectedDateParam,
} from '../../common/utils/metric-page-param';

import { Chart } from './chart';
import { ComparisonControl, SelectedComparison } from './comparison-control';
import { MetricsControl } from './metrics-control';
import { SettingsControl } from './settings-control';
import { SortControl } from './sort-control';
import {
  ControlsContainer,
  DataUnavailableContainer,
  ErrorImg,
  LoadingContainer,
} from './styled';
import { Graph, GraphDetails, Props } from './types';
import {
  addBaseBreakdownTimings,
  addComparisonBreakdownTimings,
  addTimingsToGraph,
  sortMetrics,
} from './utils';
import { ViewControl } from './view-control';
import { WaterfallChart } from './waterfall-chart';
import { ChartTimingData } from './waterfall-chart/types';

export const BreakdownMetric = ({
  loading,
  error,
  data,
  availableCohorts,
}: Props) => {
  const [baseDate] = useSelectedDateParam();
  const baseDateStr = toISODateString(baseDate);

  const [focusedCohort] = useFocusedCohortParam();
  const [comparison, setComparison] = useBreakdownComparisonTypeParam();

  const comparisonDate = useBreakdownComparisonDateParam();

  const [selected, setSelected] = useBreakdownExpandedSelectionParam();

  const onComparisonSelected = useCallback(
    (value: SelectedComparison) => {
      setComparison(value);
    },
    [setComparison],
  );

  const [sort, setSort] = useBreakdownSortParam();

  const [toplineMetrics, setToplineMetrics] = useBreakdownShownToplineMetrics();

  const [viewType, setViewType] = useBreakdownViewTypeParam();

  const [
    hideLowVolumeThreshold,
    setHideLowVolumeThreshold,
  ] = useHideLowVolumeThresholdParam();

  const [
    hideLowDurationThreshold,
    setHideLowDurationThreshold,
  ] = useHideLowDurationThresholdParam();

  const [isShowAbsoluteTimingDiff, setIsShowAbsoluteTimingDiff] = useState(
    false,
  );

  const [isShowPercentageTimeDiff, setIsShowPercentageTimeDiff] = useState(
    true,
  );

  const renderContent = (content: React.ReactElement) => (
    <SectionContainer>
      <SectionHeader>
        Breakdown for {focusedCohort === 'all' ? '' : focusedCohort}{' '}
        {baseDate?.toLocaleDateString()}
      </SectionHeader>
      <ControlsContainer>
        <ViewControl viewType={viewType} setViewType={setViewType} />
        <SortControl sort={sort} setSort={setSort} />
        <MetricsControl
          metrics={toplineMetrics}
          setMetrics={setToplineMetrics}
        />
        <ComparisonControl
          baseDateStr={baseDateStr}
          selectedComparison={comparison}
          onComparisonSelected={onComparisonSelected}
        />
        <SettingsControl
          hideItemVolumeThreshold={hideLowVolumeThreshold}
          setHideItemVolumeThreshold={setHideLowVolumeThreshold}
          hideItemDurationThreshold={hideLowDurationThreshold}
          setHideItemDurationThreshold={setHideLowDurationThreshold}
          isAbsoluteTimingDiffChecked={isShowAbsoluteTimingDiff}
          handleAbsoluteTimingDiffChange={setIsShowAbsoluteTimingDiff}
          isPercentageTimingDiffChecked={isShowPercentageTimeDiff}
          handlePercentageTimingDiffChange={setIsShowPercentageTimeDiff}
        />
      </ControlsContainer>
      {content}
    </SectionContainer>
  );

  const graph: Graph = useMemo(() => {
    const graph: Graph = {};
    if (!data || data.metric?.__typename !== 'PageLoadMetric') {
      return graph;
    }
    if (data.metric?.baseBreakdown?.timings?.metric) {
      addTimingsToGraph(
        graph,
        TimingType.METRIC,
        data.metric.baseBreakdown.timings.metric.filter(
          (timing) => toplineMetrics[timing.name],
        ),
        addBaseBreakdownTimings,
      );
    }
    if (data.metric?.comparisonBreakdown?.timings?.metric) {
      addTimingsToGraph(
        graph,
        TimingType.METRIC,
        data.metric.comparisonBreakdown.timings.metric.filter(
          (timing) => toplineMetrics[timing.name],
        ),
        addComparisonBreakdownTimings,
      );
    }
    if (data.metric?.baseBreakdown?.timings?.app) {
      addTimingsToGraph(
        graph,
        TimingType.APP,
        data.metric.baseBreakdown.timings.app,
        addBaseBreakdownTimings,
      );
    }
    if (data.metric?.comparisonBreakdown?.timings?.app) {
      addTimingsToGraph(
        graph,
        TimingType.APP,
        data.metric.comparisonBreakdown.timings.app,
        addComparisonBreakdownTimings,
      );
    }
    return graph;
  }, [data, toplineMetrics]);

  const chartData = useMemo(() => {
    const chartData: ChartTimingData[] = [];
    const sortType =
      viewType === BreakdownViewType.WATERFALL ? Sort.WATERFALL : sort;

    const addToChart = (cursor: GraphDetails, level = 0) => {
      const timing = {
        ...cursor,
        level,
        hasSubmetrics: false,
        isExpanded: selected[cursor.name],
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
    selected,
    sort,
    viewType,
  ]);

  const handleChartClick: RechartsFunction = (event) => {
    if (event && event.activeLabel) {
      setSelected({
        ...selected,
        [event.activeLabel]: !selected[event.activeLabel],
      });
    }
  };

  const handleWaterfallChartTimingBarClicked = useCallback(
    (timingName: string) => {
      setSelected({
        ...selected,
        [timingName]: !selected[timingName],
      });
    },
    [selected, setSelected],
  );

  if (error && !data) {
    return renderContent(<ErrorImg src={storm} />);
  }

  if (loading || !availableCohorts) {
    return renderContent(
      <LoadingContainer>
        <Spinner size="large" />
      </LoadingContainer>,
    );
  }

  if (!data) {
    return renderContent(
      <DataUnavailableContainer>Data Unavailable</DataUnavailableContainer>,
    );
  }

  return renderContent(
    <>
      {viewType === BreakdownViewType.COMPARISON && (
        <Chart
          data={chartData}
          onChartClick={handleChartClick}
          baseDate={baseDate}
          comparisonDate={comparisonDate}
          comparisonType={comparison.comparisonType}
          availableCohorts={availableCohorts}
          focusedCohort={focusedCohort}
        />
      )}
      {viewType === BreakdownViewType.WATERFALL && (
        <WaterfallChart
          data={chartData}
          onTimingBarClicked={handleWaterfallChartTimingBarClicked}
          baseDate={baseDate}
          comparisonDate={comparisonDate}
          comparisonType={comparison.comparisonType}
          availableCohorts={availableCohorts}
          focusedCohort={focusedCohort}
          isShowAbsoluteTimingDiff={isShowAbsoluteTimingDiff}
          isShowPercentageTimingDiff={isShowPercentageTimeDiff}
        />
      )}
    </>,
  );
};
