import { isCustomConfig } from '../../metric/types';
import {
  BaseMetricDataWithStartAndStop,
  CustomHistogramConfig,
  PerformanceEventConfigTypes,
  ShareableGlobalConfig,
} from '../../types';

type CustomEventMetricsData = {
  'metric:duration': number;
  'metric:duration:slo'?: boolean;
  'metric:duration:slo:threshold'?: number;
  'metric:duration:histogramBuckets'?: string;
} | null;

export const customEventMetrics = (
  config: PerformanceEventConfigTypes,
  data: BaseMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
): CustomEventMetricsData => {
  if (!isCustomConfig(config)) {
    return null;
  }

  const payload: CustomEventMetricsData = {
    'metric:duration': Math.round(data.stop - data.start),
  };

  if (config.slo?.threshold !== undefined) {
    payload['metric:duration:slo'] =
      payload['metric:duration'] <= config.slo?.threshold;
    payload['metric:duration:slo:threshold'] = config.slo?.threshold;
  }

  if (config.histogram?.duration) {
    payload['metric:duration:histogramBuckets'] = config.histogram.duration;
  } else if (globalConfig.histogram) {
    payload[
      'metric:duration:histogramBuckets'
    ] = (globalConfig.histogram as CustomHistogramConfig).duration;
  }

  return payload;
};
