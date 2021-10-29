import { pageLoadMetaMetric } from '../../../../metric/page-load-meta-metric';
import {
  pageLoadMetricMock,
  pageLoadPerformanceConfigMock,
  shareableGlobalConfigMock,
} from '../../../../mocks';
import { BasePageLoadMetricDataWithStartAndStop } from '../../../../types';
import { pageLoadMetrics } from '../../page-load-metrics';

jest.mock('../../../../helper/ssr-get-done-mark', () => ({
  SSRGetDoneMark: {
    getDoneMark: () => 70,
  },
}));

describe('plugin for core page load metrics', () => {
  test('returns only fmp and tti as same when no ssr configured', () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ isInitial: true });
    metric.stop({ stopTime: 100 });
    expect(
      pageLoadMetrics(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock(),
      ),
    ).toEqual({
      'metric:fmp': 100,
      'metric:tti': 100,
    });
  });

  test('returns same fmp and tti when ssr configured but no fmp mark', () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ isInitial: true });
    metric.stop({ stopTime: 100 });
    expect(
      pageLoadMetrics(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock({
          ssr: {
            getDoneMark: () => 70,
          },
        }),
      ),
    ).toEqual({
      'metric:fmp': 100,
      'metric:tti': 100,
    });
  });

  test('returns separate fmp and tti when fmp mark exists', () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ isInitial: true });
    metric.markFMP(50);
    metric.stop({ stopTime: 100 });
    expect(
      pageLoadMetrics(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock(),
      ),
    ).toEqual({
      'metric:fmp': 50,
      'metric:tti': 100,
    });
  });

  test('returns different fmp and tti metrics if ssr is configured and done mark is set and initial page load', () => {
    const metric = pageLoadMetricMock({ ssr: { doneAsFmp: true } });
    metric.startPageLoad({ isInitial: true });
    metric.stop({ stopTime: 100 });
    expect(
      pageLoadMetrics(
        pageLoadPerformanceConfigMock({
          ssr: { doneAsFmp: true },
        }),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock(),
      ),
    ).toEqual({
      'metric:fmp': 70,
      'metric:tti': 100,
    });
  });

  test('returns same fmp and tti metrics if non initial page load', () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ startTime: 10, isInitial: false });
    metric.stop({ stopTime: 100 });
    expect(
      pageLoadMetrics(
        pageLoadPerformanceConfigMock({
          ssr: { doneAsFmp: true },
        }),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock(),
      ),
    ).toEqual({
      'metric:fmp': 90,
      'metric:tti': 90,
    });
  });

  describe('returns fmp relative to spa transition start ignoring initial FMP mark', () => {
    test('when starting page load using meta page load', () => {
      const metric = pageLoadMetricMock({ ssr: { doneAsFmp: true } });
      pageLoadMetaMetric.startPageLoad({ isInitial: true });
      metric.stop({ stopTime: 100 });
      pageLoadMetaMetric.startPageLoad({ startTime: 150, isInitial: false });
      metric.stop({ stopTime: 200 });
      expect(
        pageLoadMetrics(
          pageLoadPerformanceConfigMock({
            ssr: { doneAsFmp: true },
          }),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock(),
        ),
      ).toEqual({
        'metric:fmp': 50,
        'metric:tti': 50,
      });
    });

    test('when starting page load directly', () => {
      const metric = pageLoadMetricMock({ ssr: { doneAsFmp: true } });
      metric.startPageLoad({ isInitial: true });
      metric.stop({ stopTime: 100 });
      metric.startPageLoad({ startTime: 150, isInitial: false });
      metric.stop({ stopTime: 200 });
      expect(
        pageLoadMetrics(
          pageLoadPerformanceConfigMock({
            ssr: { doneAsFmp: true },
          }),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock(),
        ),
      ).toEqual({
        'metric:fmp': 50,
        'metric:tti': 50,
      });
    });
  });

  describe('histogram buckets', () => {
    test('returns from local histograms', () => {
      const metric = pageLoadMetricMock({ ssr: { doneAsFmp: true } });
      metric.startPageLoad({ isInitial: true });
      metric.stop({ stopTime: 100 });
      expect(
        pageLoadMetrics(
          pageLoadPerformanceConfigMock({
            ssr: { doneAsFmp: true },
            histogram: {
              initial: { fmp: '2000_2500', tti: '2000_2500' },
              transition: { fmp: '2000_2500', tti: '2000_2500' },
            },
          }),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock(),
        ),
      ).toEqual({
        'metric:fmp': 70,
        'metric:tti': 100,
        'metric:fmp:histogramBuckets': '2000_2500',
        'metric:tti:histogramBuckets': '2000_2500',
      });
    });

    test('returns from global histograms', () => {
      const metric = pageLoadMetricMock({ ssr: { doneAsFmp: true } });
      metric.startPageLoad({ isInitial: true });
      metric.stop({ stopTime: 100 });
      expect(
        pageLoadMetrics(
          pageLoadPerformanceConfigMock({
            ssr: { doneAsFmp: true },
          }),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock({
            histogram: {
              initial: { fmp: '2000_2500', tti: '2000_2500' },
              transition: { fmp: '2000_2500', tti: '2000_2500' },
            },
          }),
        ),
      ).toEqual({
        'metric:fmp': 70,
        'metric:tti': 100,
        'metric:fmp:histogramBuckets': '2000_2500',
        'metric:tti:histogramBuckets': '2000_2500',
      });
    });
  });
});
