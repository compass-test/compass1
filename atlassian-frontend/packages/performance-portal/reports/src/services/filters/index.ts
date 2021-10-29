import getISOWeek from 'date-fns/getISOWeek';
import getISOWeekYear from 'date-fns/getISOWeekYear';
import subMonths from 'date-fns/subMonths';

import {
  createUrlSyncedStore,
  PageLoadType,
  Percentile,
} from '@atlassian/performance-portal-common';

import {
  DailyResolution,
  MonthlyResolution,
  WeeklyResolution,
} from '../../common/constants';
import { MetricsOptions } from '../../common/types';
import {
  getPreviousWeekFriday,
  getPreviousWorkingDay,
  toUtcIsoDateString,
} from '../../common/utils/date';

const today = new Date();
const prevWorkingDayString = toUtcIsoDateString(getPreviousWorkingDay(today));

const prevWeekFriday = getPreviousWeekFriday(today);

const prevMonthFriday = subMonths(today, 1);

const initialState = {
  dailyReport: {
    date: prevWorkingDayString,
    isSet: false,
    maxDate: prevWorkingDayString,
  },
  weeklyReport: {
    selectedWeek: {
      year: getISOWeekYear(prevWeekFriday),
      weekNo: getISOWeek(prevWeekFriday),
    },
  },
  weeklyEndOfMonthReport: {
    selectedMonth: {
      year: prevMonthFriday.getUTCFullYear(),
      month: prevMonthFriday.getUTCMonth(),
    },
  },
  percentile: Percentile.p90,
  pageLoadType: PageLoadType.COMBINED,
  resolutionType: DailyResolution.value,
  visibleMetrics: {
    [MetricsOptions.FMP]: true,
    [MetricsOptions.TTI]: true,
    [MetricsOptions.SPATransitionRatio]: false,
  },
};

export const [
  filtersStore,
  FiltersContainer,
  useFilters,
] = createUrlSyncedStore({
  name: 'filters-store',
  queryParamName: 'reportFilters',
  initialState,
  actions: {
    setDailyReportDate: (date) => ({ setState, getState }) => {
      const prevState = getState();
      setState({
        ...prevState,
        dailyReport: { ...prevState.dailyReport, date, isSet: true },
      });
    },
    setDailyReportMaxDate: (maxDate) => ({ setState, getState }) => {
      const prevState = getState();
      setState({
        ...prevState,
        dailyReport: { ...prevState.dailyReport, maxDate },
      });
    },
    setWeeklyReportSelectedWeek: (year: number, weekNo: number) => ({
      setState,
      getState,
    }) => {
      const prevState = getState();
      setState({
        ...prevState,
        weeklyReport: {
          ...prevState.weeklyReport,
          selectedWeek: { year, weekNo },
        },
      });
    },
    setWeeklyEndOfMonthReportSelectedMonth: (year: number, month: number) => ({
      setState,
      getState,
    }) => {
      const prevState = getState();
      setState({
        ...prevState,
        weeklyEndOfMonthReport: {
          ...prevState.weeklyEndOfMonthReport,
          selectedMonth: { year, month },
        },
      });
    },
    setPercentile: (percentile) => ({ setState, getState }) => {
      setState({ ...getState(), percentile });
    },
    setPageLoadType: (pageLoadType) => ({ setState, getState }) => {
      setState({ ...getState(), pageLoadType });
    },
    setResolutionType: (resolutionType) => ({ setState, getState }) => {
      const prevState = getState();
      if (prevState.resolutionType !== resolutionType) {
        if (resolutionType === DailyResolution.value) {
          setState({
            ...prevState,
            resolutionType,
            dailyReport: initialState.dailyReport,
          });
        } else if (resolutionType === WeeklyResolution.value) {
          setState({
            ...prevState,
            resolutionType,
            weeklyReport: initialState.weeklyReport,
          });
        } else if (resolutionType === MonthlyResolution.value) {
          setState({
            ...prevState,
            resolutionType,
            weeklyEndOfMonthReport: initialState.weeklyEndOfMonthReport,
          });
        }
      }
    },
    setVisibleMetric: (metric: MetricsOptions, value: boolean) => ({
      setState,
      getState,
    }) => {
      const prevState = getState();
      setState({
        ...prevState,
        visibleMetrics: {
          ...prevState.visibleMetrics,
          [metric]: value,
        },
      });
    },
    resetState: () => ({ setState }) => {
      setState({ ...initialState });
    },
  },
});
