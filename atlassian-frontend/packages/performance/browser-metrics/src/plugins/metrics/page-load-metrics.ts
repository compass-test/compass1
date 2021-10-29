import { isPageLoadConfig } from '../../metric/types';
import {
  BasePageLoadMetricDataWithStartAndStop,
  BMPageLoadMetrics,
  isDetailedPageLoadSlo,
  PageLoadHistogramConfig,
  PageLoadPerformanceEventConfig,
  PageLoadSlo,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';

type PageLoadMetricsData = {
  'metric:fmp': number;
  'metric:fmp:histogramBuckets'?: string;
  'metric:fmp:slo'?: boolean;
  'metric:fmp:slo:threshold'?: number;
  'metric:tti': number;
  'metric:tti:histogramBuckets'?: string;
  'metric:tti:slo'?: boolean;
  'metric:tti:slo:threshold'?: number;
};

const getThreshold = (isInitial: boolean, metric: PageLoadSlo) => {
  return isDetailedPageLoadSlo(metric)
    ? isInitial
      ? metric.initial.threshold
      : metric.transition.threshold
    : metric.threshold;
};

const getHistogram = (
  isInitial: boolean,
  metric: BMPageLoadMetrics.fmp | BMPageLoadMetrics.tti,
  histogram: PageLoadHistogramConfig,
) => {
  return isInitial ? histogram.initial[metric] : histogram.transition[metric];
};

export const pageLoadMetrics = (
  config: PerformanceEventConfig | PageLoadPerformanceEventConfig,
  data: BasePageLoadMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
): PageLoadMetricsData => {
  if (!isPageLoadConfig(config)) {
    throw new Error(
      'Browser Metrics: cannot gather page load data for non-page-load config',
    );
  }

  const fmp = data.marks[BMPageLoadMetrics.fmp] || data.stop;

  const result: PageLoadMetricsData = {
    'metric:fmp': Math.round(fmp - data.start),
    'metric:tti': Math.round(data.stop - data.start),
  };

  if (config.histogram) {
    result['metric:fmp:histogramBuckets'] = getHistogram(
      data.isInitial,
      BMPageLoadMetrics.fmp,
      config.histogram,
    );
    result['metric:tti:histogramBuckets'] = getHistogram(
      data.isInitial,
      BMPageLoadMetrics.tti,
      config.histogram,
    );
  } else if (globalConfig.histogram) {
    const histogram = globalConfig.histogram as PageLoadHistogramConfig;
    result['metric:fmp:histogramBuckets'] = getHistogram(
      data.isInitial,
      BMPageLoadMetrics.fmp,
      histogram,
    );
    result['metric:tti:histogramBuckets'] = getHistogram(
      data.isInitial,
      BMPageLoadMetrics.tti,
      histogram,
    );
  }

  if (config.slo && config.slo.fmp) {
    const threshold = getThreshold(data.isInitial, config.slo.fmp);
    result['metric:fmp:slo'] = result['metric:fmp'] <= threshold;
    result['metric:fmp:slo:threshold'] = threshold;
  }

  if (config.slo && config.slo.tti) {
    const threshold = getThreshold(data.isInitial, config.slo.tti);
    result['metric:tti:slo'] = result['metric:tti'] <= threshold;
    result['metric:tti:slo:threshold'] = threshold;
  }

  return result;
};
