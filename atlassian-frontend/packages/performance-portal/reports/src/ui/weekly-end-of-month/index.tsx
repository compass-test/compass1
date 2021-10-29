import React, { useCallback, useMemo } from 'react';

import subMonths from 'date-fns/subMonths';
import orderBy from 'lodash/orderBy';
import { graphql, useFragment } from 'react-relay';

import { DynamicTableStateless as DynamicTable } from '@atlaskit/dynamic-table';

import { MetricsOptions } from '../../common/types';
import { MetricName } from '../../common/ui/metric-name';
import { Container } from '../../common/ui/styled';
import {
  getFMPMonthlyEntry,
  getSPATransitionMonthlyEntry,
  getTTIMonthlyEntry,
} from '../../common/ui/table-helper/monthly';
import {
  getEndOfDayUTC,
  getMonthRange,
  parseUtcIsoDateString,
} from '../../common/utils/date';
import { useProcessedData } from '../../services/data-series';
import { useFilters } from '../../services/filters';
import { VisibleMetricsState } from '../../services/filters/types';
import { usePageLoadsInitialRatioData } from '../../services/page-load-initial-ratio';
import { reportPageLoad } from '../../utils/performance';

import type { weeklyEndOfMonthReportFragment$key } from './__generated__/weeklyEndOfMonthReportFragment.graphql';
import { Controls } from './controls';

const fmpHead = [
  {
    content: 'FMP',
    key: 'fmp.eom',
  },
  {
    content: 'FMP vs prev month',
    key: 'fmp.prevmonth',
  },
  {
    content: 'FMP vs prev quarter',
    key: 'fmp.vs.prevquater',
  },
  {
    content: 'FMP trend',
    key: 'fmp.eom.trend',
  },
];

const ttiHead = [
  {
    content: 'TTI',
    key: 'tti.eom',
  },
  {
    content: 'TTI vs prev month',
    key: 'tti.vs.prevmonth',
  },
  {
    content: 'TTI vs prev quarter',
    key: 'tti.vs.prevquater',
  },
  {
    content: 'TTI trend',
    key: 'tti.trend',
  },
];

const transitionRatioHead = [
  {
    content: 'Transition ratio',
    key: 'ratio.weekly',
  },
  {
    content: 'Ratio vs prev month',
    key: 'ratio.vs.prevmonth',
  },
  {
    content: 'Ratio vs prev quarter',
    key: 'ratio.vs.prevquater',
  },
  {
    content: 'Ratio trend',
    key: 'ratio.trend',
  },
];

const getHead = (visibleMetrics: VisibleMetricsState) => ({
  cells: [
    {
      key: 'hot',
    },
    {
      content: 'Name',
      key: 'name',
    },
    ...(visibleMetrics[MetricsOptions.FMP] ? fmpHead : []),
    ...(visibleMetrics[MetricsOptions.TTI] ? ttiHead : []),
    ...(visibleMetrics[MetricsOptions.SPATransitionRatio]
      ? transitionRatioHead
      : []),
  ],
});

export const WeeklyEndOfMonth = (props: {
  metrics: weeklyEndOfMonthReportFragment$key;
}) => {
  const [state] = useFilters();

  const metrics = useFragment<weeklyEndOfMonthReportFragment$key>(
    graphql`
      fragment weeklyEndOfMonthReportFragment on Metric @relay(plural: true) {
        id
        ...dataSeries_useProcessedData
      }
    `,
    props.metrics,
  );

  const { dateFrom, dateTo } = useMemo(() => {
    const selectedMonth = getMonthRange(
      state.weeklyEndOfMonthReport.selectedMonth,
    );
    const dateFrom = subMonths(parseUtcIsoDateString(selectedMonth.from), 6);
    const dateTo = getEndOfDayUTC(parseUtcIsoDateString(selectedMonth.to));

    return { dateFrom, dateTo };
  }, [state.weeklyEndOfMonthReport.selectedMonth]);

  const { loading, data } = useProcessedData(
    { dateFrom: dateFrom.toISOString(), dateTo: dateTo.toISOString() },
    metrics,
    state.percentile,
    state.pageLoadType,
  );

  const {
    loading: ratioLoading,
    data: ratioData,
  } = usePageLoadsInitialRatioData(
    { dateFrom: dateFrom.toISOString(), dateTo: dateTo.toISOString() },
    state.visibleMetrics[MetricsOptions.SPATransitionRatio]
      ? metrics.map(({ id }) => id)
      : [],
  );

  const markPageLoaded = useCallback(() => {
    data && reportPageLoad.stop();
  }, [data]);

  const sorted = useMemo(() => orderBy(data, ['volume'], ['desc']), [data]);

  const rows = useMemo(
    () =>
      sorted?.map((metric) => {
        const fmp = state.visibleMetrics[MetricsOptions.FMP]
          ? getFMPMonthlyEntry(metric.id, metric?.series)
          : [];
        const tti = state.visibleMetrics[MetricsOptions.TTI]
          ? getTTIMonthlyEntry(metric.id, metric?.series)
          : [];
        const transition = state.visibleMetrics[
          MetricsOptions.SPATransitionRatio
        ]
          ? getSPATransitionMonthlyEntry(metric.id, ratioData)
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
        head={getHead(state.visibleMetrics)}
        isLoading={loading || ratioLoading}
        onPageRowsUpdate={markPageLoaded}
        rows={rows}
      />
    </Container>
  );
};
