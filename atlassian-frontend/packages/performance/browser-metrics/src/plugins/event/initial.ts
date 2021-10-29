import {
  isPageLoadMetricData,
  isPageSegmentLoadMetricData,
} from '../../metric/types';
import {
  BaseMetricDataWithStartAndStop,
  BasePageLoadMetricDataWithStartAndStop,
  PageSegmentLoadMetricDataWithStartAndStop,
  PerformanceEventConfig,
} from '../../types';

export const eventInitial = (
  config: PerformanceEventConfig,
  data:
    | BaseMetricDataWithStartAndStop
    | PageSegmentLoadMetricDataWithStartAndStop
    | BasePageLoadMetricDataWithStartAndStop,
) => {
  if (!isPageLoadMetricData(data) && !isPageSegmentLoadMetricData(data)) {
    return null;
  }
  return {
    'event:initial': data.isInitial,
  };
};
