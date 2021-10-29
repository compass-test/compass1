import { useCallback, useMemo } from 'react';

import addDays from 'date-fns/addDays';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

// eslint-disable-next-line @atlassian/tangerine/import/no-restricted-paths
import { ComparisonType } from '../../common/types';
import {
  getPreviousDate,
  getPreviousDateNonWeekend,
} from '../../common/utils/date-utils';
import { usePageParam } from '../url-query-param';

import { Cohorts } from './types';

export const getComparisonDate = (
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
  const [selectedDate] = usePageParam('selectedDate');
  const [showWeekend] = usePageParam('showWeekend');
  const [breakdownComparisonDateConfig] = usePageParam(
    'breakdownComparisonDateConfig',
  );

  const comparisonDate = useMemo(
    () =>
      getComparisonDate(
        breakdownComparisonDateConfig.comparisonType,
        showWeekend,
        selectedDate,
        breakdownComparisonDateConfig.selectedFixedDate,
      ),
    [
      breakdownComparisonDateConfig.comparisonType,
      breakdownComparisonDateConfig.selectedFixedDate,
      selectedDate,
      showWeekend,
    ],
  );

  return comparisonDate;
};

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
  const [paramValue, setParamValue] = usePageParam('visibleCohortMap');

  const [focusedCohort, setFocusedCohort] = usePageParam('focusedCohort');

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
    Object.entries(paramValue ?? {}).forEach(([key, value]) => {
      if (value) {
        selected.push(key);
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
