import { pageLoadMetaMetric } from '../../../../metric/page-load-meta-metric';
import {
  pageSegmentLoadMetricMock,
  pageSegmentLoadPerformanceConfigMock,
  shareableGlobalConfigMock,
} from '../../../../mocks';
import {
  PageSegmentLoadMetricDataWithStartAndStop,
  PageSegmentPageLoadMetricsOptions,
} from '../../../../types';
import { pageSegmentLoadMetrics } from '../../page-segment-load-metrics';

describe('plugin for core page segment load metrics', () => {
  test('returns only fmp and tti as same when fmp mark not found', () => {
    const metric = pageSegmentLoadMetricMock();
    metric.start({ startTime: 0 });
    metric.stop({ stopTime: 100 });
    expect(
      pageSegmentLoadMetrics(
        pageSegmentLoadPerformanceConfigMock(),
        metric.getData() as PageSegmentLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock(),
      ),
    ).toEqual({
      'metric:fmp': 100,
      'metric:tti': 100,
    });
  });

  test('returns separate fmp and tti when fmp mark exists', () => {
    const metric = pageSegmentLoadMetricMock();
    metric.start({ startTime: 0 });
    metric.markFMP(50);
    metric.stop({ stopTime: 100 });
    expect(
      pageSegmentLoadMetrics(
        pageSegmentLoadPerformanceConfigMock(),
        metric.getData() as PageSegmentLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock(),
      ),
    ).toEqual({
      'metric:fmp': 50,
      'metric:tti': 100,
    });
  });

  describe('histogram buckets', () => {
    test('returns from local histograms', () => {
      const metric = pageSegmentLoadMetricMock();
      metric.start({ startTime: 0 });
      metric.stop({ stopTime: 100 });
      expect(
        pageSegmentLoadMetrics(
          pageSegmentLoadPerformanceConfigMock({
            histogram: {
              initial: { fmp: '2000_2500', tti: '2000_2500' },
              transition: { fmp: '1000_1500', tti: '1000_1500' },
            },
          }),
          metric.getData() as PageSegmentLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock(),
        ),
      ).toEqual({
        'metric:fmp': 100,
        'metric:tti': 100,
        'metric:fmp:histogramBuckets': '2000_2500',
        'metric:tti:histogramBuckets': '2000_2500',
      });
    });

    test('returns from global histograms', () => {
      const metric = pageSegmentLoadMetricMock();
      metric.start({ startTime: 0 });
      metric.stop({ stopTime: 100 });
      expect(
        pageSegmentLoadMetrics(
          pageSegmentLoadPerformanceConfigMock(),
          metric.getData() as PageSegmentLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock({
            histogram: {
              initial: { fmp: '2000_2500', tti: '2000_2500' },
              transition: { fmp: '1000_2500', tti: '1000_2500' },
            },
          }),
        ),
      ).toEqual({
        'metric:fmp': 100,
        'metric:tti': 100,
        'metric:fmp:histogramBuckets': '2000_2500',
        'metric:tti:histogramBuckets': '2000_2500',
      });
    });
  });

  describe('page segment load metrics', () => {
    test('are not added when includePageLoadMetric is configured as OFF', () => {
      const metric = pageSegmentLoadMetricMock();
      metric.start({ startTime: 0 });
      metric.stop({ stopTime: 100 });
      expect(
        pageSegmentLoadMetrics(
          pageSegmentLoadPerformanceConfigMock(),
          metric.getData() as PageSegmentLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock(),
        ),
      ).toEqual({
        'metric:fmp': 100,
        'metric:tti': 100,
      });
    });

    test('are added when includePageLoadMetric is configured as IF_PRESENT', () => {
      const metric = pageSegmentLoadMetricMock();
      pageLoadMetaMetric.startPageLoad({ startTime: 0, isInitial: false });
      pageLoadMetaMetric.stop({ stopTime: 1000 });
      metric.start({ startTime: 0 });
      metric.stop({ stopTime: 100 });
      expect(
        pageSegmentLoadMetrics(
          pageSegmentLoadPerformanceConfigMock({
            includePageLoadTimings:
              PageSegmentPageLoadMetricsOptions.IF_PRESENT,
          }),
          metric.getData() as PageSegmentLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock(),
        ),
      ).toEqual({
        'metric:fmp': 100,
        'metric:tti': 100,
        pageLoad: {
          fmp: 1000,
          tti: 1000,
        },
      });
    });

    test('FMP and TTI are different when includePageLoadMetric is configured as IF_PRESENT and FMP mark is available', () => {
      const metric = pageSegmentLoadMetricMock();
      pageLoadMetaMetric.startPageLoad({ startTime: 0, isInitial: false });
      pageLoadMetaMetric.markFMP(500);
      pageLoadMetaMetric.stop({ stopTime: 1000 });
      metric.start({ startTime: 0 });
      metric.stop({ stopTime: 100 });
      expect(
        pageSegmentLoadMetrics(
          pageSegmentLoadPerformanceConfigMock({
            includePageLoadTimings:
              PageSegmentPageLoadMetricsOptions.IF_PRESENT,
          }),
          metric.getData() as PageSegmentLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock(),
        ),
      ).toEqual({
        'metric:fmp': 100,
        'metric:tti': 100,
        pageLoad: {
          fmp: 500,
          tti: 1000,
        },
      });
    });

    test('are null and added when includePageLoadMetric is configured as IF_PRESENT and page load is not finished', () => {
      const metric = pageSegmentLoadMetricMock();
      pageLoadMetaMetric.startPageLoad({ startTime: 0, isInitial: false });
      metric.start({ startTime: 0 });
      metric.stop({ stopTime: 100 });
      expect(
        pageSegmentLoadMetrics(
          pageSegmentLoadPerformanceConfigMock({
            includePageLoadTimings:
              PageSegmentPageLoadMetricsOptions.IF_PRESENT,
          }),
          metric.getData() as PageSegmentLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock(),
        ),
      ).toEqual({
        'metric:fmp': 100,
        'metric:tti': 100,
        pageLoad: {
          fmp: null,
          tti: null,
        },
      });
    });

    test('are added when includePageLoadMetric is configured as WAIT_UNTIL_PRESENT', () => {
      const metric = pageSegmentLoadMetricMock();
      pageLoadMetaMetric.startPageLoad({ startTime: 0, isInitial: false });
      pageLoadMetaMetric.stop({ stopTime: 1000 });
      metric.start({ startTime: 0 });
      metric.stop({ stopTime: 100 });
      expect(
        pageSegmentLoadMetrics(
          pageSegmentLoadPerformanceConfigMock({
            includePageLoadTimings:
              PageSegmentPageLoadMetricsOptions.WAIT_UNTIL_PRESENT,
          }),
          metric.getData() as PageSegmentLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock(),
        ),
      ).toEqual({
        'metric:fmp': 100,
        'metric:tti': 100,
        pageLoad: {
          fmp: 1000,
          tti: 1000,
        },
      });
    });

    test('page load metrics are calculated relative to page load start', () => {
      const metric = pageSegmentLoadMetricMock();
      pageLoadMetaMetric.startPageLoad({ startTime: 100, isInitial: false });
      pageLoadMetaMetric.stop({ stopTime: 1000 });
      metric.start({ startTime: 100 });
      metric.stop({ stopTime: 200 });
      expect(
        pageSegmentLoadMetrics(
          pageSegmentLoadPerformanceConfigMock({
            includePageLoadTimings:
              PageSegmentPageLoadMetricsOptions.WAIT_UNTIL_PRESENT,
          }),
          metric.getData() as PageSegmentLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock(),
        ),
      ).toEqual({
        'metric:fmp': 100,
        'metric:tti': 100,
        pageLoad: {
          fmp: 900,
          tti: 900,
        },
      });
    });
  });
});
