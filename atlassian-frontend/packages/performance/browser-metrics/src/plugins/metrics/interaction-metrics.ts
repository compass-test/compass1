import { isInteractionConfig } from '../../metric/types';
import {
  BaseMetricDataWithStartAndStop,
  BMInteractionMetrics,
  InteractionHistogramConfig,
  isInteractionMetricsSlo,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';

type InteractionMetricsData = {
  'metric:result': number;
  'metric:result:histogramBuckets'?: string;
  'metric:result:slo'?: boolean;
  'metric:result:slo:threshold'?: number;
  'metric:response'?: number;
  'metric:response:histogramBuckets'?: string;
  'metric:response:slo'?: boolean;
  'metric:response:slo:threshold'?: number;
} | null;

export const interactionMetrics = (
  config: PerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
): InteractionMetricsData => {
  if (!isInteractionConfig(config)) {
    return null;
  }

  const result: InteractionMetricsData = {
    'metric:result': Math.round(data.stop - data.start),
  };

  if (config.histogram?.result) {
    result['metric:result:histogramBuckets'] = config.histogram.result;
  } else if (globalConfig.histogram) {
    const histogram = globalConfig.histogram as InteractionHistogramConfig;
    if (histogram.result !== undefined) {
      result['metric:result:histogramBuckets'] =
        histogram[BMInteractionMetrics.result];
    }
  }

  if (config.slo && isInteractionMetricsSlo(config.slo) && config.slo.result) {
    result['metric:result:slo'] =
      result['metric:result'] <= config.slo.result.threshold;
    result['metric:result:slo:threshold'] = config.slo.result.threshold;
  }

  if (data.marks['feedback']) {
    result['metric:response'] = Math.round(
      (data.marks['feedback'] || data.stop) - data.start,
    );

    if (config.histogram?.response) {
      result['metric:response:histogramBuckets'] =
        config.histogram[BMInteractionMetrics.response];
    } else if (globalConfig.histogram) {
      const histogram = globalConfig.histogram as InteractionHistogramConfig;
      if (histogram.result !== undefined) {
        result['metric:response:histogramBuckets'] =
          histogram[BMInteractionMetrics.response];
      }
    }

    if (
      config.slo &&
      isInteractionMetricsSlo(config.slo) &&
      config.slo.response
    ) {
      result['metric:response:slo'] =
        result['metric:response'] <= config.slo.response.threshold;
      result['metric:response:slo:threshold'] = config.slo.response.threshold;
    }
  }

  return result;
};
