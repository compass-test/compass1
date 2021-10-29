import {
  BaseMetricDataWithStartAndStop,
  BasePageLoadMetricDataWithStartAndStop,
  PageLoadPerformanceEventConfig,
  PerformanceEventConfig,
  ReportedTimings,
  ShareableGlobalConfig,
} from '../../types';

type BundleEvalTimingsPayload = {
  'timings:bundleEval': ReportedTimings;
} | null;

type InternalBundleEvalTimingsMethodPayload = (
  config: PerformanceEventConfig | PageLoadPerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop | BasePageLoadMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
  performance?: Performance,
) => BundleEvalTimingsPayload;

type BundleEvalTimingsMethodPayload = (
  ...args: Parameters<InternalBundleEvalTimingsMethodPayload>
) => Promise<BundleEvalTimingsPayload>;

const bundleEvalTimingsInternal: InternalBundleEvalTimingsMethodPayload = (
  config,
  data,
  globalConfig,
  performance = window.performance,
) => {
  const started: { [key: string]: PerformanceEntry } = {};
  const timings: {
    [key: string]: { startTime: number; duration: number };
  } = {};

  performance.getEntriesByType('mark').forEach((mark) => {
    if (!globalConfig.bundleEvalTimings) {
      return;
    }
    const result = globalConfig.bundleEvalTimings.mapPerformanceMark(mark.name);
    if (!result) {
      return;
    }
    const { type, name } = result;

    if (
      type === 'start' &&
      data.start !== null &&
      mark.startTime >= data.start
    ) {
      started[name] = mark;
      return;
    }

    if (type === 'end' && started[name]) {
      timings[name] = {
        startTime: Math.round(started[name].startTime - data.start),
        duration: Math.round(mark.startTime - started[name].startTime),
      };
      delete started[name];
    }
  });

  if (
    globalConfig.bundleEvalTimings &&
    globalConfig.bundleEvalTimings.additionalTimings &&
    data.start !== null
  ) {
    const result = globalConfig.bundleEvalTimings.additionalTimings(data.start);
    if (result) {
      Object.entries(result).forEach(([key, value]) => {
        timings[key] = value;
      });
    }
  }

  if (Object.keys(timings).length === 0) {
    return null;
  }

  return { 'timings:bundleEval': timings };
};

export const bundleEvalTimings: BundleEvalTimingsMethodPayload = (...args) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(bundleEvalTimingsInternal(...args));
    });
  });
};
