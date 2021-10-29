import {
  BasePageLoadMetricDataWithStartAndStop,
  PageLoadPerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';

export const ssrSuccess = (
  config: PageLoadPerformanceEventConfig,
  data: BasePageLoadMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
) => {
  if (
    config.ssr &&
    config.ssr.doneAsFmp &&
    globalConfig.ssr &&
    globalConfig.ssr.getDoneMark &&
    globalConfig.ssr.getDoneMark()
  ) {
    return { 'ssr:success': true };
  }

  return null;
};
