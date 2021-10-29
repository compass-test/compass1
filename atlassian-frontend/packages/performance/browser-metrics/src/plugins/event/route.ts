import {
  BaseMetricDataWithStartAndStop,
  PerformanceEventConfig,
} from '../../types';

export const eventRoute = (
  config: PerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop,
) => {
  if (!data.route) {
    return null;
  }
  return {
    'event:route': data.route,
  };
};
