import {
  BaseMetricDataWithStartAndStop,
  BasePageLoadMetricDataWithStartAndStop,
  BMEventsType,
  PageLoadPerformanceEventConfig,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../../types';

import { customTimings } from './custom';
import { ssrTimings } from './ssr';

export const appTimings = (
  config: PerformanceEventConfig | PageLoadPerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop | BasePageLoadMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
) => {
  const explicitTimings =
    (config.type === BMEventsType.PAGE_LOAD &&
      (data as BasePageLoadMetricDataWithStartAndStop).explicitTimings) ||
    null;

  const timings = customTimings(config, data);
  const ssr =
    config.type === BMEventsType.PAGE_LOAD &&
    (data as BasePageLoadMetricDataWithStartAndStop).isInitial
      ? ssrTimings(config, data, globalConfig)
      : null;

  const timingsApp = (explicitTimings || timings || ssr) && {
    ...explicitTimings,
    ...timings,
    ...ssr,
  };

  if (!timingsApp) {
    return null;
  }

  return { 'timings:app': timingsApp };
};
