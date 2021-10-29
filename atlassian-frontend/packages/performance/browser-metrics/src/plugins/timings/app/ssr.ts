import {
  BaseMetricDataWithStartAndStop,
  BasePageLoadMetricDataWithStartAndStop,
  PageLoadPerformanceEventConfig,
  PerformanceEventConfig,
  ReportedTiming,
  ReportedTimings,
  ShareableGlobalConfig,
} from '../../../types';

import { NESTED_METRIC_SEPARATOR } from './constants';

type Entry = [string, ReportedTiming];

const filterEntry = (entry: ReportedTiming) => {
  return !(
    !entry ||
    typeof entry !== 'object' ||
    entry.startTime < 0 ||
    entry.duration < 0
  );
};

const mapEntry = (entry: ReportedTiming) => {
  return {
    startTime: Math.round(entry.startTime),
    duration: Math.round(entry.duration),
  };
};

const SSR_PREFIX = 'ssr';
const mapKey = (key: string) => {
  if (key === 'total') {
    return SSR_PREFIX;
  }
  return `${SSR_PREFIX}${NESTED_METRIC_SEPARATOR}${key}`;
};

export const ssrTimings = (
  config: PerformanceEventConfig | PageLoadPerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop | BasePageLoadMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
) => {
  if (!globalConfig.ssr || !globalConfig.ssr.getTimings) {
    return null;
  }
  const timings = globalConfig.ssr.getTimings();
  if (!timings) {
    return null;
  }

  const ssrTimings = Object.entries(timings).reduce(
    (acc: ReportedTimings, entry: Entry) => {
      if (filterEntry(entry[1])) {
        acc[mapKey(entry[0])] = mapEntry(entry[1]);
      }
      return acc;
    },
    {},
  );

  if (!ssrTimings || Object.keys(ssrTimings).length === 0) {
    return null;
  }

  return ssrTimings;
};
