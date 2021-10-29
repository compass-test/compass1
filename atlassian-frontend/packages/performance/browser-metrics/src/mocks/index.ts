import { Metric } from '../metric/metric';
import { PageLoadMetric } from '../metric/page-load-metric';
import { PageSegmentLoadMetric } from '../metric/page-segment-load';
import {
  BMEventsType,
  CustomPerformanceEventConfig,
  InteractionPerformanceEventConfig,
  PageLoadPerformanceEventConfig,
  PageSegmentLoadPerformanceEventConfig,
  PageVisibleValueOrigin,
  ShareableGlobalConfig,
} from '../types';

export const customPerformanceConfigMock = (
  extraConfig: Partial<CustomPerformanceEventConfig> = {},
): CustomPerformanceEventConfig => ({
  key: 'custom',
  type: BMEventsType.CUSTOM,
  ...extraConfig,
});

export const interactionPerformanceConfigMock = (
  extraConfig: Partial<InteractionPerformanceEventConfig> = {},
): InteractionPerformanceEventConfig => ({
  key: 'interaction',
  type: BMEventsType.INLINE_RESULT,
  ...extraConfig,
});

export const pageLoadPerformanceConfigMock = (
  extraConfig: Partial<PageLoadPerformanceEventConfig> = {},
): PageLoadPerformanceEventConfig => ({
  key: 'page-load',
  type: BMEventsType.PAGE_LOAD,
  ...extraConfig,
});

export const pageSegmentLoadPerformanceConfigMock = (
  extraConfig: Partial<PageSegmentLoadPerformanceEventConfig> = {},
): PageSegmentLoadPerformanceEventConfig => ({
  key: 'page-segment-load',
  type: BMEventsType.PAGE_SEGMENT_LOAD,
  ...extraConfig,
});

export const customMetricMock = (
  extraConfig: Partial<CustomPerformanceEventConfig> = {},
) => {
  return new Metric(customPerformanceConfigMock(extraConfig));
};

export const interactionMetricMock = (
  extraConfig: Partial<InteractionPerformanceEventConfig> = {},
) => {
  return new Metric(interactionPerformanceConfigMock(extraConfig));
};

export const pageLoadMetricMock = (
  extraConfig: Partial<PageLoadPerformanceEventConfig> = {},
) => {
  return new PageLoadMetric(pageLoadPerformanceConfigMock(extraConfig));
};

export const pageSegmentLoadMetricMock = (
  extraConfig: Partial<PageSegmentLoadPerformanceEventConfig> = {},
) => {
  return new PageSegmentLoadMetric(
    pageSegmentLoadPerformanceConfigMock(extraConfig),
  );
};

export const shareableGlobalConfigMock = (
  extraConfig: Partial<ShareableGlobalConfig> = {},
): ShareableGlobalConfig => ({
  product: 'product',
  region: 'stg-east',
  app: {
    framework: {
      name: 'react',
      version: '16.8.0',
    },
    version: { web: 'JF-PROD-10000' },
  },
  resourceTimings: {
    mapResources: (url) => url,
    sanitiseEndpoints: (url) => url,
  },
  featureFlags: {},
  ffClient: { getValue: () => true },
  pageVisibleValueOrigin: PageVisibleValueOrigin.pageVisibleState,
  ...extraConfig,
});
