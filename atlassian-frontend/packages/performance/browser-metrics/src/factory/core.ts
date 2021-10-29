import { Metric } from '../metric/metric';
import { PageLoadMetric } from '../metric/page-load-metric';
import { PageSegmentLoadMetric } from '../metric/page-segment-load';
import { BMEventsType } from '../types';

import {
  CustomPerformanceEventFactoryConfig,
  InteractionPerformanceEventFactoryConfig,
  PageLoadPerformanceEventFactoryConfig,
  PageSegmentLoadPerformanceEventFactoryConfig,
} from './types';

export const pageLoad = (config: PageLoadPerformanceEventFactoryConfig) => {
  return new PageLoadMetric({ ...config, type: BMEventsType.PAGE_LOAD });
};

export const pageSegmentLoad = (
  config: PageSegmentLoadPerformanceEventFactoryConfig,
) => {
  return new PageSegmentLoadMetric({
    ...config,
    type: BMEventsType.PAGE_SEGMENT_LOAD,
  });
};

export const interaction = (
  config: InteractionPerformanceEventFactoryConfig,
) => {
  return new Metric({
    ...config,
    type: BMEventsType.INLINE_RESULT,
  });
};

export const custom = (config: CustomPerformanceEventFactoryConfig) => {
  return new Metric({ ...config, type: BMEventsType.CUSTOM });
};
