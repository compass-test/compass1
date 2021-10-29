import {
  BaseMetricDataWithStartAndStop,
  BasePageLoadMetricDataWithStartAndStop,
  PerformanceEventConfig,
} from '../../types';

export const pageVisibleState = (
  config: PerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop | BasePageLoadMetricDataWithStartAndStop,
) => {
  return {
    'pageVisible:state': data.pageVisibleState,
  };
};
