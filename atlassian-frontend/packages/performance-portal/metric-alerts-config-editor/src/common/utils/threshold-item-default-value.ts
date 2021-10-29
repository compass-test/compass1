import { ThresholdItemFormValue } from '../../types';

export type SupportedEventType =
  | 'CUSTOM'
  | 'INLINE_RESULT'
  | 'PAGE_LOAD'
  | 'PAGE_SEGMENT_LOAD';

export const isSupportedEventType = (
  eventType: any,
): eventType is SupportedEventType => {
  switch (eventType?.toString()) {
    case 'CUSTOM':
    case 'INLINE_RESULT':
    case 'PAGE_LOAD':
    case 'PAGE_SEGMENT_LOAD':
      return true;
    default:
      return false;
  }
};
const DEFAULT_METRIC_TYPE = {
  PAGE_LOAD: 'TTI',
  PAGE_SEGMENT_LOAD: 'TTI',
  INLINE_RESULT: 'result',
  CUSTOM: 'duration',
};

const DEFAULT_PAGE_LOAD_TYPE = {
  PAGE_LOAD: 'COMBINED',
  PAGE_SEGMENT_LOAD: 'COMBINED',
  INLINE_RESULT: null,
  CUSTOM: null,
};

export const getThresholdItemDefaultValue = (eventType: SupportedEventType) => {
  return Object.freeze<Partial<ThresholdItemFormValue>>({
    env: 'PROD',
    pageLoadType: DEFAULT_PAGE_LOAD_TYPE[eventType],
    metricType: DEFAULT_METRIC_TYPE[eventType],
    percentile: 90,
    cohortType: 'ALL',
    cohortValue: 'all',
    thresholdType: 'ABSOLUTE_DIFF',
    comparisonType: 'WoW',
    priority: 'P3',
    ignoreWeekend: true,
  });
};
