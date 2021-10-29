jest.mock('tti-polyfill');
jest.mock('web-vitals');
jest.mock('../../../../observer/web-vitals-observer');

import { PageVisibleState } from '../../../../metric/base-metric';
import { WebVitalsMetric } from '../../../../metric/web-vitals-metric';
import { webVitalsObserver } from '../../../../observer/web-vitals-observer';
import {
  BaseMetricDataWithStartAndStop,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../../../types';
import {
  webVitalsMetricCustomTimeout,
  webVitalsMetrics,
} from '../../web-vitals-metrics';

describe('plugin for web vitals metrics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('sets ttci, ttfb, fid, fcp, lcp, and cls', async () => {
    webVitalsObserver.ttciDetermined = Promise.resolve();
    webVitalsObserver.webVitalsDetermined = Promise.resolve();
    webVitalsObserver.data = {
      'metric:ttci': 1,
      'metric:ttfb': 2,
      'metric:fid': 3,
      'metric:fcp': 4,
      'metric:lcp': 5,
      'metric:cls': 6,
    };
    expect(await webVitalsMetricCustomTimeout(3000)).toMatchObject(
      webVitalsObserver.data,
    );
  });

  test('handles ttci failure gracefully', async () => {
    // according to the docs:
    // If no TTI value can be found, or if the browser doesn't support all the APIs required to detect TTI, the promise resolves to null.
    webVitalsObserver.ttciDetermined = Promise.resolve();
    webVitalsObserver.webVitalsDetermined = Promise.resolve();
    webVitalsObserver.data = {
      'metric:ttci': null,
      'metric:ttfb': 2,
      'metric:fid': 3,
      'metric:fcp': 4,
      'metric:lcp': 5,
      'metric:cls': 6,
    };
    expect(await webVitalsMetricCustomTimeout(3000)).toMatchObject(
      webVitalsObserver.data,
    );
  });

  test('handles web-vitals timeout gracefully', async () => {
    webVitalsObserver.ttciDetermined = Promise.resolve();

    // web vitals promise resolves after 2s
    webVitalsObserver.webVitalsDetermined = new Promise((resolve) =>
      setTimeout(resolve, 30000),
    );

    webVitalsObserver.data = {
      'metric:ttci': 1,
      'metric:ttfb': null,
      'metric:fid': null,
      'metric:fcp': null,
      'metric:lcp': 5,
      'metric:cls': 6,
    };
    expect(await webVitalsMetricCustomTimeout(200)).toMatchObject({
      'metric:ttci': 1,
      'metric:ttfb': null,
      'metric:fid': null,
      'metric:fcp': null,
      'metric:lcp': 5,
      'metric:cls': 6,
    });
  });
  test('set pageVisible:state and pageVisible:value', async () => {
    webVitalsObserver.ttciDetermined = Promise.resolve();
    webVitalsObserver.webVitalsDetermined = Promise.resolve();
    const metric = new WebVitalsMetric({
      key: 'test-key',
      route: 'test-route',
      startTime: 0,
      stopTime: 1,
      pageVisibleState: PageVisibleState.VISIBLE,
    });
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      get: function () {
        return false;
      },
    });
    expect(
      await webVitalsMetrics(
        {} as PerformanceEventConfig,
        metric.getData() as BaseMetricDataWithStartAndStop,
        {} as ShareableGlobalConfig,
      ),
    ).toMatchObject({
      'pageVisible:state': PageVisibleState.VISIBLE,
      'pageVisible:value': true,
    });
  });
});
