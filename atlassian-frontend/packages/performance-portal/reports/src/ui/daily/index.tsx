import React, { useCallback, useEffect, useMemo, useState } from 'react';

import format from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import parseISO from 'date-fns/parseISO';
import subDays from 'date-fns/subDays';
import last from 'lodash/last';
import orderBy from 'lodash/orderBy';
import memoizeOne from 'memoize-one';
import { graphql, useFragment } from 'react-relay';

import { DynamicTableStateless as DynamicTable } from '@atlaskit/dynamic-table';

import { MetricsOptions } from '../../common/types';
import { MetricName } from '../../common/ui/metric-name';
import { Container } from '../../common/ui/styled';
import {
  getFMPDailyEntry,
  getSPATransitionDailyEntry,
  getTTIDailyEntry,
} from '../../common/ui/table-helper/daily';
import { parseUtcIsoDateString } from '../../common/utils/date';
import { useProcessedData } from '../../services/data-series';
import { useFilters } from '../../services/filters';
import { VisibleMetricsState } from '../../services/filters/types';
import { usePageLoadsInitialRatioData } from '../../services/page-load-initial-ratio';
import { reportPageLoad } from '../../utils/performance';

import type { dailyReportFragment$key } from './__generated__/dailyReportFragment.graphql';
import { Controls } from './controls';

const headFMP = [
  {
    content: 'FMP',
    key: 'fmp',
  },
  {
    content: 'FMP day on day',
    key: 'fmp.dod',
  },
  {
    content: 'FMP week on week',
    key: 'fmp.wow',
  },
  {
    content: 'FMP monthly trend',
    key: 'fmp.snapshot',
  },
];

const headTTI = [
  {
    content: 'TTI',
    key: 'tti',
  },
  {
    content: 'TTI day on day',
    key: 'tti.dod',
  },
  {
    content: 'TTI week on week',
    key: 'tti.wow',
  },
  {
    content: 'TTI monthly trend',
    key: 'tti.snapshot',
  },
];

const headSPATransitionRatio = [
  {
    content: 'Transition ratio',
    key: 'ratio',
  },
  {
    content: 'Ratio day on day',
    key: 'ratio.dod',
  },
  {
    content: 'Ratio week on week',
    key: 'ratio.wow',
  },
  {
    content: 'Ratio monthly trend',
    key: 'ratio.snapshot',
  },
];

const getHead = memoizeOne((visibleMetrics: VisibleMetricsState) => ({
  cells: [
    {
      key: 'hot',
    },
    {
      content: 'Name',
      key: 'name',
    },
    ...(visibleMetrics[MetricsOptions.FMP] ? headFMP : []),
    ...(visibleMetrics[MetricsOptions.TTI] ? headTTI : []),
    ...(visibleMetrics[MetricsOptions.SPATransitionRatio]
      ? headSPATransitionRatio
      : []),
  ],
}));

export const DailyReport = (props: { metrics: dailyReportFragment$key }) => {
  const [state, actions] = useFilters();

  const dateTo = parseUtcIsoDateString(state.dailyReport.date);
  const dateFrom = subDays(dateTo, 28);

  const metrics = useFragment<dailyReportFragment$key>(
    graphql`
      fragment dailyReportFragment on Metric @relay(plural: true) {
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

  const [firstTimeLoad, setFirstTimeLoad] = useState(true);

  useEffect(() => {
    if (data && firstTimeLoad) {
      setFirstTimeLoad(false);
      const latestDateTime = data.reduce((latestDateTime, item) => {
        const itemLatestDateTime = item.series?.reduce(
          (_seriesLatestDate, series) => {
            const latestFullDayData = last(series.data);
            return latestFullDayData &&
              isAfter(
                new Date(latestFullDayData.dateTime),
                new Date(_seriesLatestDate ?? '1990-01-01T00:00:00.000Z'),
              )
              ? latestFullDayData.dateTime
              : _seriesLatestDate;
          },
          (undefined as unknown) as string,
        );
        return itemLatestDateTime &&
          isAfter(
            new Date(itemLatestDateTime),
            new Date(latestDateTime ?? '1990-01-01T00:00:00.000Z'),
          )
          ? itemLatestDateTime
          : latestDateTime;
      }, (undefined as unknown) as string);

      if (!latestDateTime) {
        return;
      }
      const latestDate = format(parseISO(latestDateTime), 'yyyy-MM-dd');
      actions.setDailyReportDate(latestDate);
      actions.setDailyReportMaxDate(latestDate);
    }
  }, [firstTimeLoad, data, actions]);

  const markPageLoaded = useCallback(() => {
    reportPageLoad.stop();
  }, []);

  const {
    loading: ratioLoading,
    data: ratioData,
  } = usePageLoadsInitialRatioData(
    { dateFrom: dateFrom.toISOString(), dateTo: dateTo.toISOString() },
    state.visibleMetrics[MetricsOptions.SPATransitionRatio]
      ? metrics.map(({ id }) => id)
      : [],
  );

  const rows = useMemo(() => {
    const sorted = orderBy(data, ['volume'], ['desc']);

    return sorted?.map((metric) => {
      const fmpRows = state.visibleMetrics[MetricsOptions.FMP]
        ? getFMPDailyEntry(metric.id, dateTo, metric?.series)
        : [];
      const ttiRows = state.visibleMetrics[MetricsOptions.TTI]
        ? getTTIDailyEntry(metric.id, dateTo, metric?.series)
        : [];
      const transitionRows = state.visibleMetrics[
        MetricsOptions.SPATransitionRatio
      ]
        ? getSPATransitionDailyEntry(metric.id, dateTo, ratioData)
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
          ...fmpRows,
          ...ttiRows,
          ...transitionRows,
        ],
      };
    });
  }, [data, dateTo, ratioData, state.visibleMetrics]);

  return (
    <Container>
      <Controls isLoading={loading} />
      <DynamicTable
        head={getHead(state.visibleMetrics)}
        isLoading={loading || ratioLoading}
        onPageRowsUpdate={(!loading && data && markPageLoaded) || undefined}
        rows={rows}
      />
    </Container>
  );
};
