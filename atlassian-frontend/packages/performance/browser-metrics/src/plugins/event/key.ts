import { mapEventType } from '../../helper/map-event-type';
import {
  BaseMetricDataWithStartAndStop,
  BasePageLoadMetricDataWithStartAndStop,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';

export const eventKey = (
  config: PerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop | BasePageLoadMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
) => {
  return {
    'event:key': `${globalConfig.product}.fe.${mapEventType(config.type)}.${
      config.key
    }`,
  };
};
