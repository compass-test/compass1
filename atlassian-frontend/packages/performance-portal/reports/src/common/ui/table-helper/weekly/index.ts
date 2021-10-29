import identity from 'lodash/identity';

import { isNumber } from '@atlassian/performance-portal-common';

import {
  ChartSnapshotData,
  RatioDataEntry,
  ToplineType,
  TrendSeries,
} from '../../../types';
import { MetricDiffConfig } from '../../metric-diff';
import { getEntry } from '../entry';
import { MetricValues } from '../entry/types';
import { getGoal } from '../goal';

import { seriesToWeeklyMedian } from './utils';

const getColumnDataSets = (
  medianDatas?: ChartSnapshotData[],
  map: (value: number | undefined) => number | undefined = identity,
): MetricValues => {
  let medianLastWeek: number | undefined;
  let medianWeekBeforeLastWeek: number | undefined;
  let medianFourWeeksBeforeLastWeek: number | undefined;

  if (medianDatas) {
    if (medianDatas.length > 0) {
      medianLastWeek = map(medianDatas[medianDatas.length - 1]?.value);
    }
    if (medianDatas.length >= 2) {
      medianWeekBeforeLastWeek = map(
        medianDatas[medianDatas.length - 2]?.value,
      );
    }

    if (medianDatas.length >= 4) {
      medianFourWeeksBeforeLastWeek = map(
        medianDatas[medianDatas.length - 5]?.value,
      );
    }
  }

  return {
    selectedPeriodValue: medianLastWeek,
    shortDistancePeriodValue: medianWeekBeforeLastWeek,
    longDistancePeriodValue: medianFourWeeksBeforeLastWeek,
  };
};

export const getSeries = (
  toplineType: ToplineType,
  allSeries?: TrendSeries[],
) => {
  const series = allSeries?.find((series) => series.type === toplineType);
  const weeklyMedianSeries = seriesToWeeklyMedian(series?.data);
  const values = getColumnDataSets(weeklyMedianSeries);
  const goal = getGoal(series?.goal);

  return {
    values,
    series: weeklyMedianSeries,
    goal,
  };
};

export const getFMPWeeklyEntry = (
  metricId: string,
  allSeries?: TrendSeries[],
) => {
  const { values, goal, series } = getSeries(ToplineType.FMP, allSeries);
  return getEntry({
    id: `${metricId}-fmp`,
    values,
    series,
    goal,
  });
};

export const getTTIWeeklyEntry = (
  metricId: string,
  allSeries?: TrendSeries[],
) => {
  const { values, goal, series } = getSeries(ToplineType.TTI, allSeries);
  return getEntry({
    id: `${metricId}-tti`,
    values,
    series,
    goal,
  });
};

export const getSPATransitionWeeklyEntry = (
  metricId: string,
  ratioData?: RatioDataEntry[],
) => {
  const fullSeries = ratioData?.find((entry) => entry.id === metricId);
  const series = seriesToWeeklyMedian(fullSeries?.data);
  const values = getColumnDataSets(series, (val) =>
    val !== undefined && isNumber(val) ? val * 100 : val,
  );
  return getEntry({
    id: `${metricId}-spa-transition-ratio`,
    values,
    series,
    unit: '%',
    mode: MetricDiffConfig.ABSOLUTE,
    highlightChange: false,
  });
};
