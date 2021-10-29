import React, { useCallback, useEffect, useMemo } from 'react';

import orderBy from 'lodash/orderBy';

import { CohortType } from '@atlassian/performance-portal-common';

import { theme } from '../common/constants';
import {
  useCohortTypeParam,
  useFocusedCohortParam,
  usePageLoadTypeParam,
  usePercentileParam,
  useSelectedDateParam,
  useShowWeekendParam,
  useVisibleCohorts,
} from '../common/utils/metric-page-param';
import { useMetricPageState } from '../common/utils/metric-page-state';
import {
  useBreakdownChartData,
  useToplineChartData,
} from '../services/metric-chart-data';
import { ToplineTrendSeries } from '../services/metric-chart-data/topline/types';
import { metricPageLoad } from '../utils/performance';

import { BreakdownMetric } from './breakdown-metric';
import { GlobalFilters } from './global-filters';
import { Header } from './header';
import { Container } from './styled';
import { ToplineMetric } from './topline-metric';
import { TrendSummary } from './trend-summary';

const getCohortsFromToplineData = (
  data: ToplineTrendSeries[],
  cohortType: CohortType,
) => {
  if (!Array.isArray(data)) {
    return null;
  }

  const cohortValues = data.reduce((cohortAcc: string[], curr) => {
    if (
      curr.cohortType === cohortType &&
      !cohortAcc.includes(curr.cohortValue)
    ) {
      cohortAcc.push(curr.cohortValue);
    }
    return cohortAcc;
  }, []);

  const cohorts = cohortValues.map((cohort, index) => {
    return {
      cohort,
      color: theme.chart.colors[index % theme.chart.colors.length],
    };
  });
  return cohorts;
};

export const Metric = () => {
  const [pageState] = useMetricPageState();

  const id = pageState?.metric!.id;

  const [percentile] = usePercentileParam();

  const [pageLoadType] = usePageLoadTypeParam();

  const [cohortType] = useCohortTypeParam();

  const [showWeekend] = useShowWeekendParam();

  const [focusedCohort, setFocusedCohort] = useFocusedCohortParam();

  const [visibleCohorts] = useVisibleCohorts();

  const [selectedDate, setSelectedDate] = useSelectedDateParam();

  const {
    loading: isToplineLoading,
    error: toplineError,
    data: toplineData,
  } = useToplineChartData(id);

  const relatedToplineSeries = useMemo(() => {
    if (toplineData?.metric?.__typename !== 'PageLoadMetric') {
      return [];
    }
    const filteredSeries = toplineData?.metric?.toplineTrend?.series?.filter(
      (series) =>
        series.aggregation === percentile &&
        series.pageLoadType === pageLoadType &&
        series.cohortType === cohortType,
    );

    const sortedSeries = orderBy(
      filteredSeries,
      (series) => {
        return series.data?.reduce(
          (total, dataItem) => total + dataItem.count,
          0,
        );
      },
      'desc',
    );
    return sortedSeries;
  }, [
    cohortType,
    pageLoadType,
    percentile,
    toplineData?.metric?.__typename,
    // @ts-expect-error will be fixed when migrated to experience object instead
    toplineData?.metric?.toplineTrend?.series,
  ]);

  const availableCohorts = useMemo(() => {
    return getCohortsFromToplineData(relatedToplineSeries, cohortType);
  }, [relatedToplineSeries, cohortType]);

  useEffect(() => {
    if (!Array.isArray(availableCohorts)) {
      return;
    }

    const isFocusedCohortAvailable = availableCohorts.some(
      (c) => c.cohort === focusedCohort,
    );

    if (isFocusedCohortAvailable) {
      return;
    }

    let focusedCohortToSet = availableCohorts?.[0]?.cohort;
    if (visibleCohorts.length) {
      const firstAvailableVisibleCohort = visibleCohorts.find((visibleCohort) =>
        availableCohorts.find((c) => c.cohort === visibleCohort),
      );
      if (firstAvailableVisibleCohort) {
        focusedCohortToSet = firstAvailableVisibleCohort;
      }
    }
    setFocusedCohort(focusedCohortToSet);
  }, [availableCohorts, focusedCohort, setFocusedCohort, visibleCohorts]);

  const {
    loading: isBreakdownLoading,
    error: breakdownError,
    data: breakdownData,
  } = useBreakdownChartData(id);

  const stopPageLoad = useCallback(() => {
    metricPageLoad.stop();
  }, []);

  return (
    <Container>
      <Header />

      <GlobalFilters />

      <TrendSummary
        loading={isToplineLoading}
        error={toplineError}
        series={relatedToplineSeries}
        availableCohorts={availableCohorts}
        id={id}
      />

      <ToplineMetric
        loading={isToplineLoading}
        error={toplineError}
        series={relatedToplineSeries}
        // @ts-expect-error will be fixed when migrated to experience query instead
        hotEvents={toplineData?.metric?.hotEvents}
        showWeekend={showWeekend}
        onDateSelected={setSelectedDate}
        selectedDate={selectedDate}
        availableCohorts={availableCohorts}
        onLoad={stopPageLoad}
      />

      <BreakdownMetric
        loading={isBreakdownLoading}
        error={breakdownError}
        data={breakdownData}
        availableCohorts={availableCohorts}
      />
    </Container>
  );
};
