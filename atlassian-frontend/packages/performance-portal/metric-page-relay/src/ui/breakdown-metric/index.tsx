import React, { Suspense, useCallback } from 'react';

import { graphql, useFragment } from 'react-relay';

import Spinner from '@atlaskit/spinner';
import { ErrorBoundary } from '@atlassian/performance-portal-common';

import storm from '../../common/assets/Storm.svg';
import { AvailableCohort } from '../../common/types';
import { SectionContainer, SectionHeader } from '../../common/ui/section';
import { toISODateString } from '../../common/utils';
import { usePageParam } from '../../services/url-query-param';

import type { breakdownMetric_breakdownCharts$key } from './__generated__/breakdownMetric_breakdownCharts.graphql';
import type { breakdownMetric_metric$key } from './__generated__/breakdownMetric_metric.graphql';
import { BreakdownCharts } from './breakdown-charts';
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
import { ViewControl } from './view-control';

export interface Props {
  metricRef: breakdownMetric_metric$key;
  breakdownChartsRef: breakdownMetric_breakdownCharts$key | null;
  availableCohorts: AvailableCohort[] | null;
}

export const BreakdownMetric = ({
  metricRef,
  breakdownChartsRef,
  availableCohorts,
}: Props) => {
  const [selectedDate] = usePageParam('selectedDate');
  const baseDateStr = toISODateString(selectedDate);

  const [focusedCohort] = usePageParam('focusedCohort');
  const [
    breakdownComparisonDateConfig,
    setBreakdownComparisonDateConfig,
  ] = usePageParam('breakdownComparisonDateConfig');

  const onComparisonSelected = useCallback(
    (value: SelectedComparison) => {
      setBreakdownComparisonDateConfig(value);
    },
    [setBreakdownComparisonDateConfig],
  );

  const [breakdownSortType, setBreakdownSortType] = usePageParam(
    'breakdownSortType',
  );

  const [toplineMetrics, setToplineMetrics] = usePageParam(
    'breakdownVisibleTopLineMetricMap',
  );

  const [breakdownViewType, setBreakdownViewType] = usePageParam(
    'breakdownViewType',
  );

  const [breakdownConfig, setBreakdownConfig] = usePageParam('breakdownConfig');
  const {
    hideLowVolumeThreshold,
    hideLowDurationThreshold,
    showAbsoluteTimingDiff,
    showPercentageTimeDiff,
  } = breakdownConfig;

  const metric = useFragment<breakdownMetric_metric$key>(
    graphql`
      fragment breakdownMetric_metric on Metric {
        __typename
      }
    `,
    metricRef,
  );

  const breakdownCharts = useFragment<breakdownMetric_breakdownCharts$key>(
    graphql`
      fragment breakdownMetric_breakdownCharts on PageLoadMetric {
        ...breakdownChartsFragment
      }
    `,
    breakdownChartsRef,
  );

  return (
    <SectionContainer>
      <SectionHeader>
        Breakdown for {focusedCohort === 'all' ? '' : focusedCohort}{' '}
        {selectedDate.toLocaleDateString()}
      </SectionHeader>
      <ControlsContainer>
        <ViewControl
          viewType={breakdownViewType}
          setViewType={setBreakdownViewType}
        />
        <SortControl sort={breakdownSortType} setSort={setBreakdownSortType} />
        <MetricsControl
          metrics={toplineMetrics}
          setMetrics={setToplineMetrics}
        />
        <ComparisonControl
          baseDateStr={baseDateStr}
          selectedComparison={breakdownComparisonDateConfig}
          onComparisonSelected={onComparisonSelected}
        />
        <SettingsControl
          hideItemVolumeThreshold={hideLowVolumeThreshold}
          setHideItemVolumeThreshold={(value) =>
            setBreakdownConfig({
              ...breakdownConfig,
              hideLowVolumeThreshold: value,
            })
          }
          hideItemDurationThreshold={hideLowDurationThreshold}
          setHideItemDurationThreshold={(value) =>
            setBreakdownConfig({
              ...breakdownConfig,
              hideLowDurationThreshold: value,
            })
          }
          isAbsoluteTimingDiffChecked={showAbsoluteTimingDiff}
          handleAbsoluteTimingDiffChange={(isChecked) =>
            setBreakdownConfig({
              ...breakdownConfig,
              showAbsoluteTimingDiff: isChecked,
            })
          }
          isPercentageTimingDiffChecked={showPercentageTimeDiff}
          handlePercentageTimingDiffChange={(isChecked) =>
            setBreakdownConfig({
              ...breakdownConfig,
              showPercentageTimeDiff: isChecked,
            })
          }
        />
      </ControlsContainer>
      {!metricRef || !breakdownChartsRef ? (
        <DataUnavailableContainer>
          {metric?.__typename !== 'PageLoadMetric'
            ? 'Metric type is not supported'
            : 'Data Unavailable'}
        </DataUnavailableContainer>
      ) : (
        <Suspense
          fallback={
            <LoadingContainer>
              <Spinner size="large" />
            </LoadingContainer>
          }
        >
          <ErrorBoundary fallback={() => <ErrorImg src={storm} />}>
            {breakdownCharts && availableCohorts && (
              <BreakdownCharts
                breakdownCharts={breakdownCharts}
                availableCohorts={availableCohorts}
              />
            )}
          </ErrorBoundary>
        </Suspense>
      )}
    </SectionContainer>
  );
};
