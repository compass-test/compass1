import { BasePageLoadMetric } from '../../../../../metric/base-page-load-metric';
import {
  pageLoadMetricMock,
  pageLoadPerformanceConfigMock,
  shareableGlobalConfigMock,
} from '../../../../../mocks';
import { BasePageLoadMetricDataWithStartAndStop } from '../../../../../types';
import { ssrTimings } from '../../../app/ssr';

describe('SSR timings plugins', () => {
  let metric: BasePageLoadMetric;

  beforeEach(() => {
    metric = pageLoadMetricMock();
    metric.startPageLoad({ startTime: 0, isInitial: false });
    metric.stop({ stopTime: 8000 });
  });
  test('reports all provided data when valid', () => {
    expect(
      ssrTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock({
          ssr: {
            getTimings() {
              return {
                total: { startTime: 0, duration: 50 },
                prefetch: { startTime: 10, duration: 40 },
                'prefetch/nav': { startTime: 12, duration: 2.3333 },
              };
            },
          },
        }),
      ),
    ).toMatchObject({
      ssr: { startTime: 0, duration: 50 },
      'ssr/prefetch': { startTime: 10, duration: 40 },
      'ssr/prefetch/nav': { startTime: 12, duration: 2 },
    });
  });

  test('reports only valid subset of provided data', () => {
    expect(
      ssrTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock({
          ssr: {
            getTimings() {
              return {
                total: { startTime: 0, duration: 50 },
                prefetch: { startTime: 10, duration: 40 },
                'prefetch/nav': { startTime: 12, duration: 2.3333 },
                terminated: false,
                'prefetch/morethanspeedlight': { startTime: 12, duration: -12 },
                'prefetch/beforetheworld': { startTime: -12, duration: 120 },
              } as any;
            },
          },
        }),
      ),
    ).toMatchObject({
      ssr: { startTime: 0, duration: 50 },
      'ssr/prefetch': { startTime: 10, duration: 40 },
      'ssr/prefetch/nav': { startTime: 12, duration: 2 },
    });
  });

  test('reports null when getTimings returns null', () => {
    expect(
      ssrTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock({
          ssr: {
            getTimings() {
              return null;
            },
          },
        }),
      ),
    ).toBe(null);
  });
});
