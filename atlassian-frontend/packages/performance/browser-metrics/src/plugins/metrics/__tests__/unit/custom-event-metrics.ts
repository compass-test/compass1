import { customMetricMock, shareableGlobalConfigMock } from '../../../../mocks';
import { BaseMetricDataWithStartAndStop } from '../../../../types';
import { customEventMetrics } from '../../custom-event-metrics';

describe('custom event metric', () => {
  test('generated metric:duration key', () => {
    const metric = customMetricMock();
    metric.start({ startTime: 10 });
    metric.stop({ stopTime: 100 });
    const data = metric.getData() as BaseMetricDataWithStartAndStop;
    expect(
      customEventMetrics(data.config, data, shareableGlobalConfigMock()),
    ).toMatchObject({
      'metric:duration': 90,
    });
  });

  describe('slo', () => {
    test('is set to false when value is bigger than threshold', () => {
      const metric = customMetricMock({ slo: { threshold: 1 } });
      metric.start({ startTime: 10 });
      metric.stop({ stopTime: 100 });
      const data = metric.getData() as BaseMetricDataWithStartAndStop;
      expect(
        customEventMetrics(data.config, data, shareableGlobalConfigMock()),
      ).toMatchObject({
        'metric:duration': 90,
        'metric:duration:slo': false,
        'metric:duration:slo:threshold': 1,
      });
    });
    test('is set to true when value is below or equal than threshold', () => {
      const metric = customMetricMock({ slo: { threshold: 1 } });
      metric.start({ startTime: 10 });
      metric.stop({ stopTime: 100 });
      const data = metric.getData() as BaseMetricDataWithStartAndStop;
      expect(
        customEventMetrics(data.config, data, shareableGlobalConfigMock()),
      ).toMatchObject({
        'metric:duration': 90,
        'metric:duration:slo': false,
        'metric:duration:slo:threshold': 1,
      });
    });
  });

  describe('histogram', () => {
    test('is generated from local config', () => {
      const metric = customMetricMock({ histogram: { duration: '100_1000' } });
      metric.start({ startTime: 10 });
      metric.stop({ stopTime: 100 });
      const data = metric.getData() as BaseMetricDataWithStartAndStop;
      expect(
        customEventMetrics(data.config, data, shareableGlobalConfigMock()),
      ).toMatchObject({
        'metric:duration': 90,
        'metric:duration:histogramBuckets': '100_1000',
      });
    });

    test('is generated from global config', () => {
      const metric = customMetricMock();
      metric.start({ startTime: 10 });
      metric.stop({ stopTime: 100 });
      const data = metric.getData() as BaseMetricDataWithStartAndStop;
      expect(
        customEventMetrics(
          data.config,
          data,
          shareableGlobalConfigMock({ histogram: { duration: '100_1000' } }),
        ),
      ).toMatchObject({
        'metric:duration': 90,
        'metric:duration:histogramBuckets': '100_1000',
      });
    });
  });
});
