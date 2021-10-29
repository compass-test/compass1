import {
  interactionMetricMock,
  interactionPerformanceConfigMock,
  shareableGlobalConfigMock,
} from '../../../../mocks';
import { BaseMetricDataWithStartAndStop } from '../../../../types';
import { interactionMetrics } from '../../interaction-metrics';

describe('plugin for core interaction metrics', () => {
  test('returns only inline result', () => {
    const metric = interactionMetricMock();
    metric.start({ startTime: 0 });
    metric.stop({ stopTime: 100 });
    expect(
      interactionMetrics(
        interactionPerformanceConfigMock(),
        metric.getData() as BaseMetricDataWithStartAndStop,
        shareableGlobalConfigMock(),
      ),
    ).toEqual({
      'metric:result': 100,
    });
  });

  test('returns inline result and slo if defined', () => {
    const metric = interactionMetricMock();
    metric.start({ startTime: 0 });
    metric.stop({ stopTime: 100 });
    expect(
      interactionMetrics(
        interactionPerformanceConfigMock({
          slo: { result: { threshold: 100 } },
        }),
        metric.getData() as BaseMetricDataWithStartAndStop,
        shareableGlobalConfigMock(),
      ),
    ).toEqual({
      'metric:result': 100,
      'metric:result:slo': true,
      'metric:result:slo:threshold': 100,
    });
  });

  test('returns inline result and response with slos if defined', () => {
    const metric = interactionMetricMock();
    metric.start({ startTime: 0 });
    metric.mark('feedback', 50);
    metric.stop({ stopTime: 100 });
    expect(
      interactionMetrics(
        interactionPerformanceConfigMock({
          slo: {
            result: { threshold: 100 },
            response: { threshold: 20 },
          },
        }),
        metric.getData() as BaseMetricDataWithStartAndStop,
        shareableGlobalConfigMock(),
      ),
    ).toEqual({
      'metric:result': 100,
      'metric:result:slo': true,
      'metric:result:slo:threshold': 100,
      'metric:response': 50,
      'metric:response:slo': false,
      'metric:response:slo:threshold': 20,
    });
  });

  describe('histograms', () => {
    test('generated from local config', () => {
      const metric = interactionMetricMock();
      metric.start({ startTime: 0 });
      metric.mark('feedback', 50);
      metric.stop({ stopTime: 100 });
      expect(
        interactionMetrics(
          interactionPerformanceConfigMock({
            histogram: {
              result: '100_200',
              response: '50_100',
            },
          }),
          metric.getData() as BaseMetricDataWithStartAndStop,
          shareableGlobalConfigMock(),
        ),
      ).toEqual({
        'metric:result': 100,
        'metric:response': 50,
        'metric:result:histogramBuckets': '100_200',
        'metric:response:histogramBuckets': '50_100',
      });
    });

    test('generated from global config', () => {
      const metric = interactionMetricMock();
      metric.start({ startTime: 0 });
      metric.mark('feedback', 50);
      metric.stop({ stopTime: 100 });
      expect(
        interactionMetrics(
          interactionPerformanceConfigMock(),
          metric.getData() as BaseMetricDataWithStartAndStop,
          shareableGlobalConfigMock({
            histogram: {
              result: '100_200',
              response: '50_100',
            },
          }),
        ),
      ).toEqual({
        'metric:result': 100,
        'metric:response': 50,
        'metric:result:histogramBuckets': '100_200',
        'metric:response:histogramBuckets': '50_100',
      });
    });
  });
});
