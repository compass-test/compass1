import { Metric } from '../metric/metric';
import { BMEventsType } from '../types';

import { custom, interaction } from './core';
import {
  CustomPerformanceEventFactoryConfig,
  InteractionPerformanceEventFactoryConfig,
  PageSegmentLoadPerformanceEventFactoryConfig,
  PerformanceEventFactoryConfig,
} from './types';

const concurrentMetrics: {
  [key: string]: { [key: string]: Metric };
} = {};

const getKey = <T extends PerformanceEventFactoryConfig>(
  config: T,
  type: BMEventsType,
) => `${type}--${config.key}`;

const validateConfig = <T extends PerformanceEventFactoryConfig>(config: T) => {
  if (config.include) {
    throw new Error('"include" is not supported in concurrent actions');
  }
  if (config.until) {
    throw new Error('"until" is not supported in concurrent actions');
  }
};

const ensurePath = <T extends PerformanceEventFactoryConfig>(
  config: T,
  type: BMEventsType,
) => {
  const key = getKey(config, type);
  if (!(key in concurrentMetrics)) {
    concurrentMetrics[key] = {};
  }
};

const getMetricFromCache = <T extends PerformanceEventFactoryConfig>(
  concurrentId: string | number,
  config: T,
  type: BMEventsType,
) => {
  const concurrentKey = getKey(config, type);
  if (
    concurrentKey in concurrentMetrics &&
    concurrentMetrics[concurrentKey][String(concurrentId)]
  ) {
    return concurrentMetrics[concurrentKey][String(concurrentId)];
  }

  if (!(concurrentKey in concurrentMetrics)) {
    concurrentMetrics[concurrentKey] = {};
  }
};

const makeConcurrentMetric = <T extends PerformanceEventFactoryConfig>(
  concurrentId: string | number,
  config: T,
  type: BMEventsType,
) => {
  validateConfig(config);
  ensurePath(config, type);
  const metricFromCache = getMetricFromCache(concurrentId, config, type);
  if (metricFromCache) {
    return metricFromCache;
  }

  const metricFactory =
    type === BMEventsType.INLINE_RESULT ? interaction : custom;

  const metric = metricFactory(config);
  concurrentMetrics[getKey(config, type)][String(concurrentId)] = metric;

  return metric;
};

export const concurrent = {
  pageSegmentLoad: (config: PageSegmentLoadPerformanceEventFactoryConfig) => (
    concurrentId: string | number,
  ) =>
    makeConcurrentMetric<PageSegmentLoadPerformanceEventFactoryConfig>(
      concurrentId,
      { ...config },
      BMEventsType.PAGE_SEGMENT_LOAD,
    ),
  interaction: (config: InteractionPerformanceEventFactoryConfig) => (
    concurrentId: string | number,
  ) =>
    makeConcurrentMetric<InteractionPerformanceEventFactoryConfig>(
      concurrentId,
      { ...config },
      BMEventsType.INLINE_RESULT,
    ),
  custom: (config: CustomPerformanceEventFactoryConfig) => (
    concurrentId: string | number,
  ) =>
    makeConcurrentMetric<CustomPerformanceEventFactoryConfig>(
      concurrentId,
      { ...config },
      BMEventsType.CUSTOM,
    ),
};
