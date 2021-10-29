import React, { useCallback, useEffect, useMemo } from 'react';

import orderBy from 'lodash/orderBy';
import { graphql, useFragment } from 'react-relay';

import { theme } from '../../common/constants';
import { useToplineChartData } from '../../services/metric-chart-data';
import { ToplineTrendSeries } from '../../services/metric-chart-data/topline/types';
import { useVisibleCohorts } from '../../services/metric-page-param';
import { usePageParam } from '../../services/url-query-param';
import { metricPageLoad } from '../../utils/performance';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { BreakdownMetric } from '../breakdown-metric';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { GlobalFilters } from '../global-filters';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { Header } from '../header';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { ToplineMetric } from '../topline-metric';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { TrendSummary } from '../trend-summary';

import type { metricFragment$key } from './__generated__/metricFragment.graphql';
import { Container } from './styled';

const getCohortsFromToplineData = (data?: ToplineTrendSeries) => {
  if (!Array.isArray(data)) {
    return null;
  }

  const cohortValues = data.reduce((cohortAcc: string[], curr) => {
    if (!cohortAcc.includes(curr.cohortValue)) {
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

interface Props {
  data: metricFragment$key;
}

export const Metric = (props: Props) => {
  const data = useFragment(
    graphql`
      fragment metricFragment on Metric {
        __typename
        id
        ...headerFragment
        ...globalFiltersFragment
        ...breakdownMetric_metric
        ...breakdownMetric_breakdownCharts
      }
    `,
    props.data,
  );

  const id = data.id;

  const [showWeekend] = usePageParam('showWeekend');
  const [focusedCohort, setFocusedCohort] = usePageParam('focusedCohort');
  const [visibleCohorts] = useVisibleCohorts();
  const [selectedDate, setSelectedDate] = usePageParam('selectedDate');
  const [topLineType] = usePageParam('topLineType');

  const {
    loading: isToplineLoading,
    error: toplineError,
    data: toplineData,
  } = useToplineChartData(id, topLineType.toLowerCase());

  const sortedToplineSeries = useMemo(
    () =>
      orderBy(
        toplineData.experience?.dailyToplineTrend ?? [],
        (series) => {
          return series.data?.reduce(
            (total, dataItem) => total + dataItem.count,
            0,
          );
        },
        'desc',
      ),
    [toplineData],
  );

  const availableCohorts = useMemo(() => {
    return getCohortsFromToplineData(sortedToplineSeries);
  }, [sortedToplineSeries]);

  // Set focusedCohort after getting the topline data
  useEffect(() => {
    if (!availableCohorts?.length) {
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

  const stopPageLoad = useCallback(() => {
    metricPageLoad.stop();
  }, []);

  return (
    <Container>
      <Header data={data} />

      <GlobalFilters data={data} />

      <TrendSummary availableCohorts={availableCohorts} id={id} />

      <ToplineMetric
        loading={isToplineLoading}
        error={toplineError}
        series={sortedToplineSeries}
        hotEvents={toplineData?.experience?.hotEvents}
        showWeekend={showWeekend}
        onDateSelected={setSelectedDate}
        selectedDate={selectedDate}
        availableCohorts={availableCohorts}
        onLoad={stopPageLoad}
      />

      <BreakdownMetric
        metricRef={data}
        breakdownChartsRef={data.__typename === 'PageLoadMetric' ? data : null}
        availableCohorts={availableCohorts}
      />
    </Container>
  );
};
