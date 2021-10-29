import {
  BaseMetricDataWithStartAndStop,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';

export const eventRegion = (
  config: PerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
) => {
  return {
    'event:region': `${globalConfig.region}`,
  };
};
