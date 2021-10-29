import {
  pageLoadMetricMock,
  pageLoadPerformanceConfigMock,
  shareableGlobalConfigMock,
} from '../../../../mocks';
import { BasePageLoadMetricDataWithStartAndStop } from '../../../../types';
import { featureFlags } from '../../index';

describe('feature flags plugin', () => {
  test('returns null when none feature flags defined', () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ isInitial: true });
    metric.stop({ stopTime: 100 });
    expect(
      featureFlags(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock(),
      ),
    ).toEqual(null);
  });

  test('returns values of global flags', () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ isInitial: true });
    metric.stop({ stopTime: 100 });
    expect(
      featureFlags(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock({ featureFlags: { 'test2.global': true } }),
      ),
    ).toEqual({
      featureFlags: { 'test2.global': true },
    });
  });

  test('returns values of local flags', () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ isInitial: true });
    metric.stop({ stopTime: 100 });
    expect(
      featureFlags(
        pageLoadPerformanceConfigMock({ featureFlags: ['test1.local'] }),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock(),
      ),
    ).toEqual({
      featureFlags: { 'test1.local': true },
    });
  });

  test('returns values of global and local flags combined', () => {
    const metric = pageLoadMetricMock({});
    metric.startPageLoad({ isInitial: true });
    metric.stop({ stopTime: 100 });
    expect(
      featureFlags(
        pageLoadPerformanceConfigMock({ featureFlags: ['test1.local'] }),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock({ featureFlags: { 'test2.global': true } }),
      ),
    ).toEqual({
      featureFlags: { 'test1.local': true, 'test2.global': true },
    });
  });
});
