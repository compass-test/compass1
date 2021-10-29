import {
  BMEventsType,
  CustomPerformanceEventConfig,
  InteractionPerformanceEventConfig,
  PageLoadPerformanceEventConfig,
  PageSegmentLoadPerformanceEventConfig,
} from '../types';

import { BasePageLoadMetricData } from './base-page-load-metric';
import { BasePageSegmentLoadMetricData } from './page-segment-load';

export const isPageLoadMetricData = (
  data: any,
): data is BasePageLoadMetricData => {
  return data.type === BMEventsType.PAGE_LOAD;
};

export const isPageSegmentLoadMetricData = (
  data: any,
): data is BasePageSegmentLoadMetricData => {
  return data.type === BMEventsType.PAGE_SEGMENT_LOAD;
};

export const isPageLoadConfig = (
  data: any,
): data is PageLoadPerformanceEventConfig => {
  return data.type === BMEventsType.PAGE_LOAD;
};

export const isPageSegmentLoadConfig = (
  data: any,
): data is PageSegmentLoadPerformanceEventConfig => {
  return data.type === BMEventsType.PAGE_SEGMENT_LOAD;
};

export const isInteractionConfig = (
  data: any,
): data is InteractionPerformanceEventConfig => {
  return data.type === BMEventsType.INLINE_RESULT;
};

export const isCustomConfig = (
  data: any,
): data is CustomPerformanceEventConfig => {
  return data.type === BMEventsType.CUSTOM;
};
