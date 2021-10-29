import {
  BaseMetricDataWithStartAndStop,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';

export const appFramework = (
  config: PerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
) => {
  if (!globalConfig.app.framework) {
    return null;
  }
  return {
    'app:framework:name': globalConfig.app.framework.name,
    'app:framework:version': globalConfig.app.framework.version,
  };
};
