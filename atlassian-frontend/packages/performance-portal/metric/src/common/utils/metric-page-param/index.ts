import { useCallback, useMemo } from 'react';

import addDays from 'date-fns/addDays';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { NumberParam } from 'serialize-query-params';

import {
  CohortType,
  Environment,
  PageLoadType,
} from '@atlassian/performance-portal-common';
import {
  SelectedParam,
  useBooleanQueryParam,
  useQueryParamSerialized,
  useStringQueryParam,
  useUTCDateQueryParam,
} from '@atlassian/performance-portal-query-param';

import {
  PageLoadToplineType,
  ToplineAggregation,
} from '../../../__generated__/graphql';
import {
  BreakdownViewType,
  ComparisonType,
  Sort,
  ToplineMetrics,
} from '../../types';
import { ComparisonParam } from '../comparison-param';
import {
  getPreviousDate,
  getPreviousDateNonWeekend,
  getStartOfDayUTC,
  isWeekendDate,
} from '../date-utils';

import { Cohorts } from './types';

export const usePercentileParam = () =>
  useStringQueryParam('percentile', ToplineAggregation.P90);

export const useEnvParam = () => useStringQueryParam('env', Environment.PROD);

export const usePageLoadTypeParam = () =>
  useStringQueryParam('type', PageLoadType.INITIAL);

export const useCohortTypeParam = () => {
  return useStringQueryParam('cohortType', CohortType.ALL);
};

export const useShowWeekendParam = () =>
  useBooleanQueryParam('weekends', false);

export const useFocusedCohortParam = () => useStringQueryParam('focusedCohort');

export const useSelectedDateParam = () => {
  const nowDate = new Date();
  const [showWeekend] = useShowWeekendParam();

  let defaultSelected = getStartOfDayUTC(
    addDays(nowDate, nowDate.getUTCHours() >= 2 ? -1 : -2),
  ); // our aggregation finishes more or less at UTC 02:00

  if (!showWeekend && isWeekendDate(defaultSelected)) {
    defaultSelected = getPreviousDateNonWeekend(defaultSelected);
  }

  return useUTCDateQueryParam(
    'selected',
    defaultSelected, // our aggregation finishes more or less at UTC 02:00
  );
};

export const useToplineRangeParam = () =>
  useQueryParamSerialized('range', NumberParam, 1);

export const useToplineTypeParam = () =>
  useStringQueryParam('toplineType', PageLoadToplineType.TTI);

export const useBreakdownViewTypeParam = () =>
  useStringQueryParam('breakdownView', BreakdownViewType.WATERFALL);

export const useBreakdownComparisonTypeParam = () =>
  useQueryParamSerialized('comparison', ComparisonParam, {
    comparisonType: ComparisonType.WoW,
  });

const getComparisonDate = (
  comparisonType: ComparisonType,
  showWeekend: boolean,
  baseDate: Date,
  fixedDate?: Date,
) => {
  switch (comparisonType) {
    case ComparisonType.DoD:
      return showWeekend
        ? getPreviousDate(baseDate)
        : getPreviousDateNonWeekend(baseDate);
    case ComparisonType.WoW:
      return addDays(baseDate, -7);
    case ComparisonType.Fixed:
      return fixedDate || baseDate;
    default:
      return baseDate;
  }
};

export const useBreakdownComparisonDateParam = () => {
  const [baseDate] = useSelectedDateParam();
  const [showWeekend] = useShowWeekendParam();
  const [comparison] = useBreakdownComparisonTypeParam();
  return getComparisonDate(
    comparison.comparisonType,
    showWeekend,
    baseDate,
    comparison.selectedFixedDate,
  );
};
export const useBreakdownExpandedSelectionParam = () =>
  useQueryParamSerialized('expanded', SelectedParam, {});

export const useBreakdownSortParam = () =>
  useStringQueryParam('sort', Sort.CHANGE_DESC);

export const useHideLowVolumeThresholdParam = () =>
  useStringQueryParam('hideLowVolumeThreshold', 100);

export const useHideLowDurationThresholdParam = () =>
  useStringQueryParam('hideLowDurationThreshold', 0);

export const useBreakdownShownToplineMetrics = () =>
  useQueryParamSerialized('metrics', SelectedParam, {
    [ToplineMetrics.TTI]: true,
    [ToplineMetrics.FMP]: true,
  });

export const useVisibleCohorts = (
  availableCohorts?: string[],
): [
  string[],
  (cohort: string) => void,
  (cohort: string) => void,
  () => void,
  (cohort: string) => void,
  boolean,
] => {
  const [paramValue, setParamValue] = useQueryParamSerialized(
    'visibleCohort',
    SelectedParam,
    {},
  );

  const [focusedCohort, setFocusedCohort] = useFocusedCohortParam();

  const isAllVisible = useMemo(() => {
    if (isEmpty(paramValue)) {
      return true;
    }

    const allVisibleFullObject: Cohorts = {};
    availableCohorts?.forEach((cohort) => {
      allVisibleFullObject[cohort] = true;
    });

    if (isEqual(paramValue, allVisibleFullObject)) {
      return true;
    }

    return false;
  }, [availableCohorts, paramValue]);

  const visibleCohorts = useMemo(() => {
    if (isAllVisible) {
      return [...(availableCohorts ?? [])];
    }
    const selected: string[] = [];
    Object.keys(paramValue).forEach((cohort) => {
      if (paramValue[cohort]) {
        selected.push(cohort);
      }
    });

    return selected;
  }, [availableCohorts, isAllVisible, paramValue]);

  const show = useCallback(
    (cohort) => {
      const val: Cohorts = {};
      visibleCohorts.forEach((c) => {
        val[c] = true;
      });
      val[cohort] = true;
      if (
        !availableCohorts ||
        Object.keys(val).length === availableCohorts.length
      ) {
        setParamValue({});
      } else {
        setParamValue(val);
      }
    },
    [visibleCohorts, setParamValue, availableCohorts],
  );

  const hide = useCallback(
    (cohort) => {
      const val: Cohorts = {};
      visibleCohorts.forEach((c) => {
        val[c] = true;
      });
      delete val[cohort];
      setParamValue(val);
      if (!isEmpty(val) && !val[focusedCohort]) {
        setFocusedCohort(Object.keys(val)[0]);
      }
    },
    [visibleCohorts, setParamValue, focusedCohort, setFocusedCohort],
  );

  const showAll = useCallback(() => {
    setParamValue({});
  }, [setParamValue]);

  const showOnly = useCallback(
    (cohort) => {
      setParamValue({ [cohort]: true });
      setFocusedCohort(cohort);
    },
    [setParamValue, setFocusedCohort],
  );

  return [visibleCohorts, show, hide, showAll, showOnly, isAllVisible];
};
