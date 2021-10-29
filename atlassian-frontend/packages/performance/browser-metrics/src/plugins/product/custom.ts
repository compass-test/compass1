import {
  BaseMetricDataWithStartAndStop,
  BasePageLoadMetricDataWithStartAndStop,
  CustomValues,
  PageLoadPerformanceEventConfig,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';

export const productCustomData = (
  config: PerformanceEventConfig | PageLoadPerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop | BasePageLoadMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
): CustomValues | null => {
  if (!globalConfig.custom && !globalConfig.plugins) {
    return null;
  }
  const result: CustomValues = {};
  if (globalConfig.custom) {
    Object.entries(globalConfig.custom).forEach(([key, value]) => {
      result[`${globalConfig.product}:${key}`] = value;
    });
  }

  if (globalConfig.plugins) {
    globalConfig.plugins.forEach((plugin) => {
      const pluginOutput = plugin({
        start: data.start,
        stop: data.stop,
        key: data.key,
      });
      if (pluginOutput === null) {
        return;
      }
      Object.entries(pluginOutput).forEach(([key, value]) => {
        result[`${globalConfig.product}:${key}`] = value;
      });
    });
  }

  return result;
};
