import { pageLoadMetaMetric } from '../../metric/page-load-meta-metric';
import { isPageSegmentLoadConfig } from '../../metric/types';
import {
  BMPageLoadMetrics,
  BMPageSegmentLoadMetrics,
  isDetailedPageSegmentLoadSlo,
  PageSegmentLoadHistogramConfig,
  PageSegmentLoadMetricDataWithStartAndStop,
  PageSegmentLoadPerformanceEventConfig,
  PageSegmentLoadSlo,
  PageSegmentPageLoadMetricsOptions,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';

type PageSegmentLoadMetricsData = {
  'metric:fmp': number;
  'metric:fmp:histogramBuckets'?: string;
  'metric:fmp:slo'?: boolean;
  'metric:fmp:slo:threshold'?: number;
  'metric:tti': number;
  'metric:tti:histogramBuckets'?: string;
  'metric:tti:slo'?: boolean;
  'metric:tti:slo:threshold'?: number;
  pageLoad?: { fmp: number | null; tti: number | null };
};

const getThreshold = (isInitial: boolean, metric: PageSegmentLoadSlo) => {
  return isDetailedPageSegmentLoadSlo(metric)
    ? isInitial
      ? metric.initial.threshold
      : metric.transition.threshold
    : metric.threshold;
};

const getHistogram = (
  isInitial: boolean,
  metric: BMPageSegmentLoadMetrics.fmp | BMPageSegmentLoadMetrics.tti,
  histogram: PageSegmentLoadHistogramConfig,
) => {
  return isInitial ? histogram.initial[metric] : histogram.transition[metric];
};

export const pageSegmentLoadMetrics = (
  config: PerformanceEventConfig | PageSegmentLoadPerformanceEventConfig,
  data: PageSegmentLoadMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
): PageSegmentLoadMetricsData => {
  if (!isPageSegmentLoadConfig(config)) {
    throw new Error(
      'Browser Metrics: cannot gather page segment load data for non-page-segment-load config',
    );
  }

  const fmp = data.marks[BMPageSegmentLoadMetrics.fmp] || data.stop;

  const result: PageSegmentLoadMetricsData = {
    'metric:fmp': Math.round(fmp - data.start),
    'metric:tti': Math.round(data.stop - data.start),
  };

  if (config.histogram) {
    result['metric:fmp:histogramBuckets'] = getHistogram(
      data.isInitial,
      BMPageSegmentLoadMetrics.fmp,
      config.histogram,
    );
    result['metric:tti:histogramBuckets'] = getHistogram(
      data.isInitial,
      BMPageSegmentLoadMetrics.tti,
      config.histogram,
    );
  } else if (globalConfig.histogram) {
    const histogram = globalConfig.histogram as PageSegmentLoadHistogramConfig;
    result['metric:fmp:histogramBuckets'] = getHistogram(
      data.isInitial,
      BMPageSegmentLoadMetrics.fmp,
      histogram,
    );
    result['metric:tti:histogramBuckets'] = getHistogram(
      data.isInitial,
      BMPageSegmentLoadMetrics.tti,
      histogram,
    );
  }

  if (config.slo?.fmp) {
    const threshold = getThreshold(data.isInitial, config.slo.fmp);
    result['metric:fmp:slo'] = result['metric:fmp'] <= threshold;
    result['metric:fmp:slo:threshold'] = threshold;
  }

  if (config.slo?.tti) {
    const threshold = getThreshold(data.isInitial, config.slo.tti);
    result['metric:tti:slo'] = result['metric:tti'] <= threshold;
    result['metric:tti:slo:threshold'] = threshold;
  }

  if (
    config.includePageLoadTimings ===
      PageSegmentPageLoadMetricsOptions.IF_PRESENT ||
    config.includePageLoadTimings ===
      PageSegmentPageLoadMetricsOptions.WAIT_UNTIL_PRESENT
  ) {
    const pageLoadData = pageLoadMetaMetric.getData();
    const fmp =
      pageLoadData.stop !== null && pageLoadData.start !== null
        ? Math.round(
            (pageLoadData.marks[BMPageLoadMetrics.fmp] || pageLoadData.stop) -
              pageLoadData.start,
          )
        : null;
    const tti =
      pageLoadData.stop !== null && pageLoadData.start !== null
        ? Math.round(pageLoadData.stop - pageLoadData.start)
        : null;

    result['pageLoad'] = {
      fmp,
      tti,
    };
  }

  return result;
};
