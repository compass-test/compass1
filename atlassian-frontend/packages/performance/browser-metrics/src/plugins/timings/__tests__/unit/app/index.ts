import {
  pageLoadMetricMock,
  shareableGlobalConfigMock,
} from '../../../../../mocks';
import { BaseMetricDataWithStartAndStop } from '../../../../../types';
import { appTimings } from '../../../app';

describe('app timings', () => {
  const ssrConfig = {
    ssr: {
      getTimings() {
        return {
          total: { startTime: 20, duration: 150 },
        };
      },
    },
  };

  test('return combined ssr and custom timings for initial page load', () => {
    const metric = pageLoadMetricMock({
      timings: [{ key: 'timing', endMark: 'mark' }],
    });
    metric.startPageLoad({ isInitial: true });
    metric.mark('mark', 100);
    metric.stop({ stopTime: 1000 });
    const metricData = metric.getData() as BaseMetricDataWithStartAndStop;
    expect(
      appTimings(
        metricData.config,
        metricData,
        shareableGlobalConfigMock(ssrConfig),
      ),
    ).toStrictEqual({
      'timings:app': {
        timing: { startTime: 0, duration: 100 },
        ssr: { startTime: 20, duration: 150 },
      },
    });
  });

  test('return custom timings for non-initial page load', () => {
    const metric = pageLoadMetricMock({
      timings: [{ key: 'timing', endMark: 'mark' }],
    });
    metric.startPageLoad({ startTime: 50, isInitial: false });
    metric.mark('mark', 100);
    metric.stop({ stopTime: 1000 });
    const metricData = metric.getData() as BaseMetricDataWithStartAndStop;
    expect(
      appTimings(
        metricData.config,
        metricData,
        shareableGlobalConfigMock(ssrConfig),
      ),
    ).toStrictEqual({
      'timings:app': {
        timing: { startTime: 0, duration: 50 },
      },
    });
  });

  test('return null when neigher ssr nor custom timings are available', () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ isInitial: true });
    metric.stop({ stopTime: 1000 });
    const metricData = metric.getData() as BaseMetricDataWithStartAndStop;
    expect(
      appTimings(metricData.config, metricData, shareableGlobalConfigMock()),
    ).toStrictEqual(null);
  });
});
