import { customMetricMock, pageLoadMetricMock } from '../../../../../mocks';
import { BaseMetricDataWithStartAndStop } from '../../../../../types';
import { customTimings } from '../../../app/custom';

describe('custom timings plugin', () => {
  test('returns timings with endMark', () => {
    const metric = pageLoadMetricMock({
      timings: [
        { key: 'timing', endMark: 'mark' },
        { key: 'timing2', endMark: 'mark2' },
      ],
    });
    metric.startPageLoad({ startTime: 50, isInitial: false });
    metric.mark('mark', 100);
    metric.mark('mark2', 160);
    metric.stop({ stopTime: 1000 });
    const metricData = metric.getData() as BaseMetricDataWithStartAndStop;
    expect(customTimings(metricData.config, metricData)).toStrictEqual({
      timing: { startTime: 0, duration: 50 },
      timing2: { startTime: 0, duration: 110 },
    });
  });

  test('returns timings with startMark', () => {
    const metric = pageLoadMetricMock({
      timings: [
        { key: 'timing', startMark: 'mark' },
        { key: 'timing2', startMark: 'mark2' },
      ],
    });
    metric.startPageLoad({ startTime: 50, isInitial: false });
    metric.mark('mark', 100);
    metric.mark('mark2', 160);
    metric.stop({ stopTime: 1000 });
    const metricData = metric.getData() as BaseMetricDataWithStartAndStop;
    expect(customTimings(metricData.config, metricData)).toStrictEqual({
      timing: { startTime: 50, duration: 900 },
      timing2: { startTime: 110, duration: 840 },
    });
  });

  test('returns timings with startMark and endMark', () => {
    const metric = pageLoadMetricMock({
      timings: [
        { key: 'timing', startMark: 'mark', endMark: 'endMark' },
        { key: 'timing2', startMark: 'mark2', endMark: 'endMark2' },
      ],
    });
    metric.startPageLoad({ startTime: 50, isInitial: false });
    metric.mark('mark', 100);
    metric.mark('endMark', 110);
    metric.mark('mark2', 160);
    metric.mark('endMark2', 900);
    metric.stop({ stopTime: 1000 });
    const metricData = metric.getData() as BaseMetricDataWithStartAndStop;
    expect(customTimings(metricData.config, metricData)).toStrictEqual({
      timing: { startTime: 50, duration: 10 },
      timing2: { startTime: 110, duration: 740 },
    });
  });

  test('returns included metrics with special prefix', () => {
    const proxyMetric = customMetricMock();
    const metric = pageLoadMetricMock({
      include: [proxyMetric],
    });
    metric.startPageLoad({ startTime: 50, isInitial: false });
    proxyMetric.start({ startTime: 100 });
    proxyMetric.stop({ stopTime: 550 });
    metric.stop({ stopTime: 1000 });
    const metricData = metric.getData() as BaseMetricDataWithStartAndStop;
    expect(customTimings(metricData.config, metricData)).toStrictEqual({
      'include:custom': { startTime: 50, duration: 450 },
    });
  });

  test('returns timings of included metrics with special prefix', () => {
    const proxyMetric = customMetricMock({
      timings: [
        { key: 'timing', startMark: 'mark' },
        { key: 'timing2', startMark: 'mark2', endMark: 'endMark2' },
        { key: 'timing3', endMark: 'endMark3' },
      ],
    });
    const metric = pageLoadMetricMock({
      include: [proxyMetric],
    });
    metric.startPageLoad({ startTime: 40, isInitial: false });
    proxyMetric.start({ startTime: 100 });
    proxyMetric.mark('mark', 110);
    proxyMetric.mark('mark2', 140);
    proxyMetric.mark('endMark2', 200);
    proxyMetric.mark('endMark3', 300);
    proxyMetric.stop({ stopTime: 550 });
    metric.stop({ stopTime: 1000 });
    const metricData = metric.getData() as BaseMetricDataWithStartAndStop;
    expect(customTimings(metricData.config, metricData)).toStrictEqual({
      'include:custom': { startTime: 60, duration: 450 },
      'include:custom/timing': { startTime: 70, duration: 440 },
      'include:custom/timing2': { startTime: 100, duration: 60 },
      'include:custom/timing3': { startTime: 60, duration: 200 },
    });
  });

  test("ignores timings which have configured marks, but they don't exists", () => {
    const metric = pageLoadMetricMock({
      timings: [
        { key: 'timing', endMark: 'mark' },
        { key: 'timing2', startMark: 'mark2' },
        { key: 'timing3', startMark: 'mark3', endMark: 'endMark3' },
        { key: 'timing4', startMark: 'mark4', endMark: 'endMark4' },
        { key: 'timing5', endMark: 'mark5' },
      ],
    });
    metric.startPageLoad({ startTime: 50, isInitial: false });
    metric.mark('mark', 100);
    metric.mark('mark3', 160);
    metric.mark('endMark4', 180);
    metric.stop({ stopTime: 1000 });
    const metricData = metric.getData() as BaseMetricDataWithStartAndStop;
    expect(customTimings(metricData.config, metricData)).toStrictEqual({
      timing: { startTime: 0, duration: 50 },
    });
  });
});
