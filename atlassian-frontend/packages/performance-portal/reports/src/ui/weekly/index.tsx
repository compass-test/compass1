import React, { useCallback, useMemo } from 'react';

import subWeeks from 'date-fns/subWeeks';
import orderBy from 'lodash/orderBy';
import { graphql, useFragment } from 'react-relay';

import { DynamicTableStateless as DynamicTable } from '@atlaskit/dynamic-table';

import { MetricsOptions } from '../../common/types';
import { MetricName } from '../../common/ui/metric-name';
import { Container } from '../../common/ui/styled';
import {
  getFMPWeeklyEntry,
  getSPATransitionWeeklyEntry,
  getTTIWeeklyEntry,
} from '../../common/ui/table-helper/weekly';
import {
  getEndOfDayUTC,
  getISOWeekRange,
  parseUtcIsoDateString,
} from '../../common/utils/date';
import { useProcessedData } from '../../services/data-series';
import { useFilters } from '../../services/filters';
import { VisibleMetricsState } from '../../services/filters/types';
import { usePageLoadsInitialRatioData } from '../../services/page-load-initial-ratio';
import { reportPageLoad } from '../../utils/performance';

import type { weeklyReportFragment$key } from './__generated__/weeklyReportFragment.graphql';
import { Controls } from './controls';

const fmp = [
  {
    content: 'FMP weekly median',
    key: 'fmp.weekly',
  },
  {
    content: 'FMP vs prev week',
    key: 'fmp.vs.prevweek',
  },
  {
    content: 'FMP vs last month',
    key: 'fmp.vs.prevmonth',
  },
  {
    content: 'FMP trend',
    key: 'fmp.trend',
  },
];

const tti = [
  {
    content: 'TTI weekly median',
    key: 'tti.weekly',
  },
  {
    content: 'TTI vs prev week',
    key: 'tti.vs.prevweek',
  },
  {
    content: 'TTI vs last month',
    key: 'tti.vs.prevmonth',
  },
  {
    content: 'TTI trend',
    key: 'tti.trend',
  },
];

const transitionRatio = [
  {
    content: 'Transition ratio weekly median',
    key: 'ratio.weekly',
  },
  {
    content: 'Ratio vs prev week',
    key: 'ratio.vs.prevweek',
  },
  {
    content: 'Ratio vs last month',
    key: 'ratio.vs.prevmonth',
  },
  {
    content: 'Ratio trend',
    key: 'ratio.trend',
  },
];

const getTableHeaders = (visibleMetrics: VisibleMetricsState) => ({
  cells: [
    {
      key: 'hot',
    },
    {
      content: 'Name',
      key: 'name',
    },
    ...(visibleMetrics[MetricsOptions.FMP] ? fmp : []),
    ...(visibleMetrics[MetricsOptions.TTI] ? tti : []),
    ...(visibleMetrics[MetricsOptions.SPATransitionRatio]
      ? transitionRatio
      : []),
  ],
});

export const WeeklyReport = (props: { metrics: weeklyReportFragment$key }) => {
  const [state] = useFilters();

  const { dateFrom, dateTo } = useMemo(() => {
    const selectedWeek = getISOWeekRange(state.weeklyReport.selectedWeek);

    const dateFrom = subWeeks(parseUtcIsoDateString(selectedWeek.from), 8);
    const dateTo = getEndOfDayUTC(parseUtcIsoDateString(selectedWeek.to));

    return { dateFrom, dateTo };
  }, [state.weeklyReport.selectedWeek]);

  const metrics = useFragment<weeklyReportFragment$key>(
    graphql`
      fragment weeklyReportFragment on Metric @relay(plural: true) {
        id
        ...dataSeries_useProcessedData
      }
    `,
    props.metrics,
  );

  const { loading, data } = useProcessedData(
    { dateFrom: dateFrom.toISOString(), dateTo: dateTo.toISOString() },
    metrics,
    state.percentile,
    state.pageLoadType,
  );

  const markPageLoaded = useCallback(() => {
    data && reportPageLoad.stop();
  }, [data]);

  const sorted = useMemo(() => orderBy(data, ['volume'], ['desc']), [data]);

  const {
    loading: ratioLoading,
    data: ratioData,
  } = usePageLoadsInitialRatioData(
    { dateFrom: dateFrom.toISOString(), dateTo: dateTo.toISOString() },
    state.visibleMetrics[MetricsOptions.SPATransitionRatio]
      ? metrics.map(({ id }) => id)
      : [],
  );

  const rows = useMemo(
    () =>
      sorted?.map((metric) => {
        const fmp = state.visibleMetrics[MetricsOptions.FMP]
          ? getFMPWeeklyEntry(metric.id, metric?.series)
          : [];
        const tti = state.visibleMetrics[MetricsOptions.TTI]
          ? getTTIWeeklyEntry(metric.id, metric?.series)
          : [];
        const transition = state.visibleMetrics[
          MetricsOptions.SPATransitionRatio
        ]
          ? getSPATransitionWeeklyEntry(metric.id, ratioData)
          : [];

        return {
          cells: [
            {},
            {
              key: metric.name,
              content: (
                <MetricName
                  eventKey={metric.eventKey as string}
                  name={metric.name}
                />
              ),
            },
            ...fmp,
            ...tti,
            ...transition,
          ],
        };
      }),
    [sorted, ratioData, state.visibleMetrics],
  );

  return (
    <Container>
      <Controls />
      <DynamicTable
        head={getTableHeaders(state.visibleMetrics)}
        isLoading={loading || ratioLoading}
        onPageRowsUpdate={markPageLoaded}
        rows={rows}
      />
    </Container>
  );
};
