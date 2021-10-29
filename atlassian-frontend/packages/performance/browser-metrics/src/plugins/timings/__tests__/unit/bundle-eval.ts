import {
  pageLoadMetricMock,
  pageLoadPerformanceConfigMock,
  shareableGlobalConfigMock,
} from '../../../../mocks';
import { BasePageLoadMetricDataWithStartAndStop } from '../../../../types';
import { bundleEvalTimings } from '../../bundle-eval';

jest.useFakeTimers();

const performanceMock = {
  getEntriesByType: jest.fn().mockImplementation(() => [
    { name: 'vendor.js:start', startTime: 10 },
    { name: 'vendor.js:end', startTime: 100 },
    { name: 'product.js:start', startTime: 100 },
    { name: 'product.js:end', startTime: 200 },
    { name: 'non-critical.js:start', startTime: 500 },
    { name: 'non-critical.js:stop', startTime: 1500 },
  ]),
};

const bundleEvalTimingsConfig = {
  mapPerformanceMark(mark: string): { name: any; type: string } | null {
    if (mark.endsWith(':start')) {
      return {
        name: mark.substring(0, mark.indexOf(':start')),
        type: 'start',
      };
    }
    if (mark.endsWith(':end')) {
      return {
        name: mark.substring(0, mark.indexOf(':end')),
        type: 'end',
      };
    }
    return null;
  },
};

describe('bundle eval timings plugin', () => {
  beforeEach(() => {
    // @ts-ignore
    jest.spyOn(window, 'setTimeout').mockImplementation((cb) => {
      cb(1);
    });
  });

  afterEach(() => {
    // @ts-ignore
    window.setTimeout.mockRestore();
  });

  test('return null when bundle eval timings are not configured', async () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ startTime: 50, isInitial: false });
    metric.stop({ stopTime: 1000 });
    expect(
      await bundleEvalTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock(),
        // @ts-ignore
        performanceMock,
      ),
    ).toEqual(null);
  });

  test('return only finished bundles which started after start time of the event', async () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ startTime: 50, isInitial: false });
    metric.stop({ stopTime: 1000 });
    expect(
      await bundleEvalTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock({
          bundleEvalTimings: bundleEvalTimingsConfig,
        }),
        // @ts-ignore
        performanceMock,
      ),
    ).toEqual({
      'timings:bundleEval': {
        'product.js': { startTime: 50, duration: 100 },
      },
    });
  });

  test('adds additional timings to existing ones', async () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ startTime: 50, isInitial: false });
    metric.stop({ stopTime: 1000 });
    expect(
      await bundleEvalTimings(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock({
          bundleEvalTimings: {
            ...bundleEvalTimingsConfig,
            additionalTimings(startTime: number) {
              return {
                'batch.js': { startTime: 200 - startTime, duration: 1000 },
              };
            },
          },
        }),
        // @ts-ignore
        performanceMock,
      ),
    ).toEqual({
      'timings:bundleEval': {
        'product.js': { startTime: 50, duration: 100 },
        'batch.js': { startTime: 150, duration: 1000 },
      },
    });
  });
});
