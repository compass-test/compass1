import {
  BaseMetricDataWithStartAndStop,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';

export const eventProduct = (
  config: PerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
) => {
  return {
    'event:product': `${globalConfig.product}`,
  };
};
