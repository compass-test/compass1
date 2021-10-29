import identity from 'lodash/identity';

import { isNumber } from '@atlassian/performance-portal-common';

import {
  ChartSnapshotData,
  RatioDataEntry,
  ToplineTrendGoal,
  ToplineType,
  TrendSeries,
} from '../../../types';
import { MetricDiffConfig } from '../../metric-diff';
import { getEntry } from '../entry';
import { MetricValues } from '../entry/types';

import { seriesToEndOfMonthMedian } from './utils';

const getGoal = (goals?: ToplineTrendGoal[]) => {
  if (!goals || goals.length === 0) {
    return undefined;
  }
  return goals.reduce(
    (acc, goal) => {
      if (goal.value < acc.value) {
        return goal;
      }
      return acc;
    },
    { value: Number.POSITIVE_INFINITY, name: 'initial', id: '' },
  );
};

const getColumnDataSets = (
  medianDatas?: ChartSnapshotData[],
  map: (value: number | undefined) => number | undefined = identity,
): MetricValues => {
  let medianLastMonth: number | undefined;
  let medianMedianTwoMonthsAgo: number | undefined;
  let medianLastQuarter: number | undefined;

  if (medianDatas) {
    if (medianDatas.length > 0) {
      medianLastMonth = map(medianDatas[medianDatas.length - 1]?.value);
    }
    if (medianDatas.length >= 2) {
      medianMedianTwoMonthsAgo = map(
        medianDatas[medianDatas.length - 2]?.value,
      );
    }

    if (medianDatas.length >= 4) {
      medianLastQuarter = map(medianDatas[medianDatas.length - 4]?.value);
    }
  }

  return {
    selectedPeriodValue: medianLastMonth,
    shortDistancePeriodValue: medianMedianTwoMonthsAgo,
    longDistancePeriodValue: medianLastQuarter,
  };
};

export const getSeries = (
  toplineType: ToplineType,
  allSeries?: TrendSeries[],
) => {
  const series = allSeries?.find((series) => series.type === toplineType);
  const monthlyMedianSeries = seriesToEndOfMonthMedian(series?.data);
  const values = getColumnDataSets(monthlyMedianSeries);
  const goal = getGoal(series?.goal);

  return {
    values,
    series: monthlyMedianSeries,
    goal,
  };
};

export const getFMPMonthlyEntry = (
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

export const getTTIMonthlyEntry = (
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

export const getSPATransitionMonthlyEntry = (
  metricId: string,
  ratioData?: RatioDataEntry[],
) => {
  const fullSeries = ratioData?.find((entry) => entry.id === metricId);
  const series = seriesToEndOfMonthMedian(fullSeries?.data);
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
