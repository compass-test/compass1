import subDays from 'date-fns/subDays';
import identity from 'lodash/identity';

import { isNumber } from '@atlassian/performance-portal-common';

import {
  RatioDataEntry,
  ToplineTrendData,
  ToplineType,
  TrendSeries,
} from '../../../types';
import {
  getPreviousWorkingDay,
  parseUtcIsoDateString,
} from '../../../utils/date';
import { MetricDiffConfig } from '../../metric-diff';
import { getEntry } from '../entry';
import { MetricValues } from '../entry/types';
import { getGoal } from '../goal';

const calculateDailyValuesFromSeriesData = (
  series?: ToplineTrendData[],
  map: (value: number | undefined) => number | undefined = identity,
  selectedDay?: string,
): MetricValues => {
  let selectedDayValue: number | undefined;
  let prevDayValue: number | undefined;
  let prevWeekValue: number | undefined;

  if (series && selectedDay) {
    const lastAvailableDay = parseUtcIsoDateString(selectedDay);
    const prevDay = getPreviousWorkingDay(lastAvailableDay);
    const prevWeek = subDays(lastAvailableDay, 7);

    selectedDayValue = map(
      series?.find(({ dateTime }) => dateTime === selectedDay)?.value,
    );
    prevDayValue = map(
      series?.find(({ dateTime }) => dateTime === prevDay.toISOString())?.value,
    );
    prevWeekValue = map(
      series?.find(({ dateTime }) => dateTime === prevWeek.toISOString())
        ?.value,
    );
  }

  return {
    selectedPeriodValue: selectedDayValue,
    shortDistancePeriodValue: prevDayValue,
    longDistancePeriodValue: prevWeekValue,
  };
};

export const getSeries = (
  dateTo: Date,
  toplineType: ToplineType,
  allSeries?: TrendSeries[],
) => {
  const series = allSeries?.find((series) => series.type === toplineType);
  const values = calculateDailyValuesFromSeriesData(
    series?.data,
    undefined,
    dateTo.toISOString(),
  );
  const goal = getGoal(series?.goal);

  return {
    values,
    series: series?.data,
    goal,
  };
};

export const getFMPDailyEntry = (
  metricId: string,
  dateTo: Date,
  allSeries?: TrendSeries[],
) => {
  const { values, goal, series } = getSeries(
    dateTo,
    ToplineType.FMP,
    allSeries,
  );
  return getEntry({
    id: `${metricId}-fmp`,
    values,
    series,
    goal,
    showGrid: true,
  });
};

export const getTTIDailyEntry = (
  metricId: string,
  dateTo: Date,
  allSeries?: TrendSeries[],
) => {
  const { values, goal, series } = getSeries(
    dateTo,
    ToplineType.TTI,
    allSeries,
  );
  return getEntry({
    id: `${metricId}-tti`,
    values,
    series,
    goal,
    showGrid: true,
  });
};

export const getSPATransitionDailyEntry = (
  metricId: string,
  dateTo: Date,
  ratioData?: RatioDataEntry[],
) => {
  const series = ratioData?.find((entry) => entry.id === metricId);
  const values = calculateDailyValuesFromSeriesData(
    series?.data,
    (val) => (val !== undefined && isNumber(val) ? val * 100 : val),
    dateTo.toISOString(),
  );
  return getEntry({
    id: `${metricId}-spa-transition-ratio`,
    values,
    series: series?.data,
    unit: '%',
    mode: MetricDiffConfig.ABSOLUTE,
    highlightChange: false,
    showGrid: true,
  });
};
