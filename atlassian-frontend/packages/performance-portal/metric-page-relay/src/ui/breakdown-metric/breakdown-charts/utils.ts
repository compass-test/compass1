import {
  CohortType,
  Environment,
  PageLoadType,
} from '@atlassian/performance-portal-common';

import { Sort, TimingType } from '../../../common/types';
import { toISODateString } from '../../../common/utils';

import {
  BreakdownAggregation,
  breakdownChartsFragmentRefetchQueryVariables,
} from './__generated__/breakdownChartsFragmentRefetchQuery.graphql';
import { AddingFunction, Graph, GraphDetails, TimingDetail } from './types';

const roundNumber = (number: number) => {
  return Math.round((number + Number.EPSILON) * 100) / 100;
};

export const addBaseBreakdownTimings: AddingFunction = (current, timing) => {
  current.duration = roundNumber(timing.duration);
  current.comparisonDuration = null;
  current.delta = null;
  current.deltaPercent = null;
  current.startTime = roundNumber(timing.startTime);
  current.comparisonStartTime = null;
  current.count = timing.count && roundNumber(timing.count);
  current.comparisonCount = null;
};

export const addComparisonBreakdownTimings: AddingFunction = (
  current,
  timing,
) => {
  current.comparisonDuration = roundNumber(timing.duration);
  current.comparisonStartTime = roundNumber(timing.startTime);
  current.comparisonCount = timing.count && roundNumber(timing.count);

  if (current.duration) {
    current.delta = roundNumber(current.duration - timing.duration);
    current.deltaPercent = roundNumber(
      ((current.duration - timing.duration) / timing.duration) * 100,
    );
  } else {
    current.duration = null;
    current.delta = null;
    current.deltaPercent = null;
  }
};

export const addTimingsToGraph = (
  graph: Graph,
  timingType: TimingType,
  timings: Readonly<TimingDetail[]>,
  addingFunction: AddingFunction,
) => {
  timings.forEach((timing) => {
    const sections = timing.name.split('/');
    let current = graph;
    let prev: GraphDetails | null = null;
    sections.forEach((section, i) => {
      if (section === 'total') {
        if (prev) {
          addingFunction(prev, timing);
        }
        return;
      }
      if (!current[section]) {
        current[section] = {
          name: `${current.name ? `${current.name}/` : ''}${section}`,
          timingType,
          startTime: timing.startTime,
          duration: timing.duration,
          count: timing.count,
          submetrics: {},
          level: i,
        };
      }
      if (i === sections.length - 1) {
        current[section].name = timing.name;
        addingFunction(current[section], timing);
      } else {
        prev = current[section];
        current = current[section].submetrics;
      }
    });
  });
};

export const sortMetrics = (sort: Sort, metrics: Array<GraphDetails>) => {
  switch (sort) {
    case Sort.VALUE_DESC:
      metrics.sort((a, b) => (a?.delta ?? 0) - (b?.delta ?? 0));
      break;
    case Sort.VALUE_ASC:
      metrics.sort((a, b) => (b?.delta ?? 0) - (a?.delta ?? 0));
      break;
    case Sort.CHANGE_DESC:
      metrics.sort((a, b) => (a?.deltaPercent ?? 0) - (b?.deltaPercent ?? 0));
      break;
    case Sort.CHANGE_ASC:
      metrics.sort((a, b) => (b?.deltaPercent ?? 0) - (a?.deltaPercent ?? 0));
      break;
    case Sort.WATERFALL:
      metrics.sort((a, b) => (a?.startTime ?? 0) - (b?.startTime ?? 0));
  }
};

type GetBreakdownChartsVariablesParams = {
  env: Environment;
  baseDate: Date;
  comparisonDate: Date;
  percentile: string;
  pageLoadType: PageLoadType;
  cohortType: CohortType;
  focusedCohort: string;
};

const isBreakdownAggregation = (
  value: string,
): value is BreakdownAggregation => {
  if (['p50', 'p75', 'p90'].includes(value)) {
    return true;
  }
  return false;
};

export const getBreakdownChartsFragmentRefetchQueryVariables = ({
  env,
  baseDate,
  comparisonDate,
  percentile,
  pageLoadType,
  cohortType,
  focusedCohort,
}: GetBreakdownChartsVariablesParams): Omit<
  breakdownChartsFragmentRefetchQueryVariables,
  'id'
> => {
  if (!isBreakdownAggregation(percentile)) {
    throw new Error(`unexpected percentile value ${percentile}`);
  }
  return {
    env,
    baseDate: toISODateString(baseDate),
    comparisonDate: toISODateString(comparisonDate),
    breakdownAggregation: percentile,
    pageLoadType,
    cohortType,
    focusedCohort,
  };
};
