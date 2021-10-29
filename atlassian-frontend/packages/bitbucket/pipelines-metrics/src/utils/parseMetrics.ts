import { Limits, Metric } from '../types';

import formatDate from './formatDate';
import formatDuration from './formatDuration';

const parseMetrics = (
  metrics: Metric[],
  visibleMetrics: { [key: string]: boolean },
  limits: Limits,
) =>
  metrics.map((metric) => {
    return {
      limit: 1, // = 100%
      hasReachedLimit: Object.keys(limits).some(
        (key) => metric.values[key] >= limits[key],
      ),
      duration: formatDuration(metrics[0].timestamp, metric.timestamp),
      timestamp: formatDate(metric.timestamp),
      values: Object.keys(metric.values).reduce((reducer: any, key) => {
        if (visibleMetrics[key]) {
          reducer[key] = metric.values[key] / limits[key];
        }
        return reducer;
      }, {}),
    };
  });

export default parseMetrics;
