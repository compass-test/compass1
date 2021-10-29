import { BaseMetricData } from '../../../metric/base-metric';
import {
  BaseMetricDataWithStartAndStop,
  BasePageLoadMetricDataWithStartAndStop,
  PageLoadPerformanceEventConfig,
  PerformanceEventConfig,
} from '../../../types';

import { NESTED_METRIC_SEPARATOR } from './constants';

const retrieveTimings = (
  config: PerformanceEventConfig | PageLoadPerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop | BasePageLoadMetricDataWithStartAndStop,
  relativeTo: number = 0,
  prefix: string = '',
) => {
  const configTimings = config.timings || [];

  const timings = configTimings.reduce((entries: any, timing: any) => {
    if (timing.startMark && !data.marks[timing.startMark]) {
      return entries;
    }
    if (timing.endMark && !data.marks[timing.endMark]) {
      return entries;
    }
    if (data.start === null || data.stop === null) {
      return null;
    }
    const startTime = Math.round(
      (data.marks[timing.startMark] !== undefined
        ? data.marks[timing.startMark]
        : data.start) -
        data.start +
        relativeTo,
    );

    const duration = Math.round(
      (data.marks[timing.endMark] !== undefined
        ? data.marks[timing.endMark]
        : data.stop) -
        data.start -
        startTime +
        relativeTo,
    );

    entries[`${prefix}${timing.key}`] = { startTime, duration };
    return entries;
  }, {});

  return timings;
};

export const customTimings = (
  config: PerformanceEventConfig | PageLoadPerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop | BasePageLoadMetricDataWithStartAndStop,
) => {
  if (!config.timings && data.submetrics.length === 0) {
    return null;
  }

  const timings = retrieveTimings(config, data);

  data.submetrics.forEach((submetric: BaseMetricData) => {
    if (submetric.start !== null && submetric.stop !== null) {
      const submetricPrefix = `include:${submetric.config.key}`;
      timings[submetricPrefix] = {
        startTime: Math.round(submetric.start - data.start),
        duration: Math.round(submetric.stop - submetric.start),
      };
      Object.assign(
        timings,
        retrieveTimings(
          submetric.config,
          submetric as BaseMetricDataWithStartAndStop,
          submetric.start - data.start,
          submetricPrefix + NESTED_METRIC_SEPARATOR,
        ),
      );
    }
  });

  if (Object.keys(timings).length === 0) {
    return null;
  }

  return timings;
};
