import addDays from 'date-fns/addDays';
import { jsonDateParser } from 'json-date-parser';
import { qs } from 'url-parse';
import { DeepPartial } from 'utility-types';

import {
  CohortType,
  createUrlSyncedStore,
  deepMergeWithArrayOverwrite,
  Environment,
  PageLoadType,
  safelyToDate,
} from '@atlassian/performance-portal-common';
import { SelectedParam } from '@atlassian/performance-portal-query-param';

import {
  BreakdownViewType,
  ComparisonType,
  Sort,
  ToplineMetrics,
} from '../../common/types';
import {
  getPreviousDateNonWeekend,
  getStartOfDayUTC,
  isWeekendDate,
} from '../../common/utils';
import { ComparisonParam, SelectedComparison } from '../comparison-param';

const getDefaultDate = (): Date => {
  const nowDate = new Date();
  let defaultSelected = getStartOfDayUTC(
    addDays(nowDate, nowDate.getUTCHours() >= 2 ? -1 : -2),
  ); // our aggregation finishes more or less at UTC 02:00

  if (isWeekendDate(defaultSelected)) {
    defaultSelected = getPreviousDateNonWeekend(defaultSelected);
  }
  return defaultSelected;
};

const QUERY_PARAM_NAME = 'metricPage';

export const defaultState = {
  percentile: 'p90',
  env: Environment.PROD,
  pageLoadType: PageLoadType.INITIAL,
  cohortType: CohortType.ALL,
  showWeekend: false,
  focusedCohort: 'all',
  selectedDate: getDefaultDate(),
  topLineDateRangeInMonth: 1,
  topLineType: 'TTI',
  visibleCohortMap: {} as Record<string, boolean> | undefined,
  breakdownConfig: {
    hideLowVolumeThreshold: 100,
    hideLowDurationThreshold: 0,
    showAbsoluteTimingDiff: false,
    showPercentageTimeDiff: true,
  },
  breakdownComparisonDateConfig: {
    comparisonType: ComparisonType.WoW,
  } as SelectedComparison,
  breakdownViewType: BreakdownViewType.WATERFALL,
  breakdownExpandedKeyMap: {} as Record<string, boolean>,
  breakdownSortType: Sort.CHANGE_DESC,
  breakdownVisibleTopLineMetricMap: {
    [ToplineMetrics.TTI]: true,
    [ToplineMetrics.FMP]: true,
  } as Record<ToplineMetrics, boolean>,
};

type StateType = typeof defaultState;

const getQueryParams = (urlSearchString: string): Record<string, unknown> => {
  const queryParams = qs.parse(urlSearchString) as Record<string, unknown>;

  return queryParams;
};

export const getInitialState = (): StateType => {
  const queryParams = getQueryParams(window.location.search);

  const metricStateFromUrl: undefined | DeepPartial<StateType> =
    queryParams[QUERY_PARAM_NAME] &&
    JSON.parse(queryParams[QUERY_PARAM_NAME] as string, jsonDateParser);

  const stateFromLegacyUrl = getStateFromLegacyUrl();

  return deepMergeWithArrayOverwrite(
    deepMergeWithArrayOverwrite(defaultState, metricStateFromUrl),
    stateFromLegacyUrl,
  );
};

export const getStateFromLegacyUrl = (): DeepPartial<StateType> => {
  const queryParams = getQueryParams(window.location.search);

  const stateFromLegacyUrl: DeepPartial<StateType> = {
    percentile: queryParams.percentile as string,
    env: queryParams.env as Environment,
    pageLoadType: queryParams.type as PageLoadType,
    cohortType: queryParams.cohortType as CohortType,
    showWeekend: queryParams.weekends === '1',
    focusedCohort: queryParams.focusedCohort as string,
    selectedDate:
      queryParams.selected != null
        ? safelyToDate(queryParams.selected, getDefaultDate())
        : undefined,
    topLineDateRangeInMonth:
      queryParams.range != null
        ? parseInt(queryParams.range as string, 10)
        : undefined,
    topLineType: queryParams.toplineType as string,
    breakdownViewType: queryParams.breakdownView as BreakdownViewType,
    visibleCohortMap:
      queryParams.visibleCohort != null
        ? SelectedParam.decode(queryParams.visibleCohort as string[])
        : undefined,
    breakdownComparisonDateConfig:
      queryParams.comparison != null
        ? ComparisonParam.decode(queryParams.comparison as any) ?? undefined
        : undefined,
    breakdownExpandedKeyMap:
      queryParams.expanded != null
        ? SelectedParam.decode(queryParams.expanded as string[])
        : undefined,
    breakdownSortType: queryParams.sort as Sort,
    breakdownConfig: {
      hideLowVolumeThreshold:
        queryParams.hideLowVolumeThreshold != null
          ? parseInt((queryParams.hideLowVolumeThreshold ?? 100) as string, 10)
          : undefined,
      hideLowDurationThreshold:
        queryParams.hideLowDurationThreshold != null
          ? parseInt(
              (queryParams.hideLowDurationThreshold ?? 100) as string,
              10,
            )
          : undefined,
    },
    breakdownVisibleTopLineMetricMap:
      queryParams.metrics != null
        ? (SelectedParam.decode(queryParams.metrics as string[]) as Record<
            ToplineMetrics,
            boolean
          >)
        : undefined,
  };

  return stateFromLegacyUrl;
};

export const [
  pageParamStore,
  PageParamContainer,
  usePageParams,
] = createUrlSyncedStore({
  name: 'metric-page-urlSyncedStore',
  queryParamName: QUERY_PARAM_NAME,
  initialState: defaultState,
  actions: {
    setParam: (
      fieldName: keyof StateType,
      value: StateType[typeof fieldName],
    ) => ({ setState, getState }) => {
      const prevState = getState();
      setState({ ...prevState, [fieldName]: value });
    },
  },
  onInit: (stateFromUrl) => {
    if (stateFromUrl) {
      return stateFromUrl;
    }
    const stateFromBackwardCompatUrl = getStateFromLegacyUrl();
    return stateFromBackwardCompatUrl;
  },
});

export const usePageParam = <FIELD_NAME extends keyof StateType>(
  fieldName: FIELD_NAME,
): [StateType[FIELD_NAME], (value: StateType[FIELD_NAME]) => void] => {
  const [state, actions] = usePageParams();

  return [
    state[fieldName],
    (newValue: StateType[FIELD_NAME]) => {
      actions.setParam(fieldName, newValue);
    },
  ];
};
