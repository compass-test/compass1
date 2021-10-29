import {
  pageLoadMetricMock,
  pageLoadPerformanceConfigMock,
  shareableGlobalConfigMock,
} from '../../../../mocks';
import {
  BasePageLoadMetricDataWithStartAndStop,
  IncludeSSRFeatureFlagsConfig,
} from '../../../../types';
import { ssrFeatureFlags } from '../../feature-flags';

describe('SSR feature flags plugin', () => {
  test('returns null when page does not mark FMP from SSR', async () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ isInitial: true });
    metric.stop({ stopTime: 100 });
    expect(
      await ssrFeatureFlags(
        pageLoadPerformanceConfigMock(),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock(),
      ),
    ).toBe(null);
  });

  test('returns null when none feature flags defined', async () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ isInitial: true });
    metric.stop({ stopTime: 100 });
    expect(
      await ssrFeatureFlags(
        pageLoadPerformanceConfigMock({ ssr: { doneAsFmp: true } }),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock(),
      ),
    ).toBe(null);
  });

  test('returns null when feature flags promise rejected', async () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ isInitial: true });
    metric.stop({ stopTime: 100 });
    expect(
      await ssrFeatureFlags(
        pageLoadPerformanceConfigMock({ ssr: { doneAsFmp: true } }),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock({
          ssr: {
            getFeatureFlags: () => Promise.reject(),
            getDoneMark: () => 10,
          },
        }),
      ),
    ).toBe(null);
  });

  test('returns values of feature flags synchronously', async () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ isInitial: true });
    metric.stop({ stopTime: 100 });
    expect(
      await ssrFeatureFlags(
        pageLoadPerformanceConfigMock({ ssr: { doneAsFmp: true } }),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock({
          ssr: {
            getFeatureFlags: () => ({ 'ssr.ff': true }),
            getDoneMark: () => 10,
          },
        }),
      ),
    ).toStrictEqual({
      'ssr:featureFlags': { 'ssr.ff': true },
    });
  });

  test('returns values of feature flags in promise', async () => {
    const metric = pageLoadMetricMock();
    metric.startPageLoad({ isInitial: true });
    metric.stop({ stopTime: 100 });
    expect(
      await ssrFeatureFlags(
        pageLoadPerformanceConfigMock({ ssr: { doneAsFmp: true } }),
        metric.getData() as BasePageLoadMetricDataWithStartAndStop,
        shareableGlobalConfigMock({
          ssr: {
            getFeatureFlags: () => Promise.resolve({ 'ssr.ff': true }),
            getDoneMark: () => 10,
          },
        }),
      ),
    ).toStrictEqual({
      'ssr:featureFlags': { 'ssr.ff': true },
    });
  });

  describe('returns feature flags when enforced', () => {
    test('by global config', async () => {
      const metric = pageLoadMetricMock();
      metric.startPageLoad({ isInitial: true });
      metric.stop({ stopTime: 100 });
      expect(
        await ssrFeatureFlags(
          pageLoadPerformanceConfigMock(),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock({
            ssr: {
              getFeatureFlags: () => ({ 'ssr.ff': true }),
              getDoneMark: () => 10,
              includeFeatureFlags: IncludeSSRFeatureFlagsConfig.WHEN_AVAILABLE,
            },
          }),
        ),
      ).toStrictEqual({
        'ssr:featureFlags': { 'ssr.ff': true },
      });
    });

    test('by metric config', async () => {
      const metric = pageLoadMetricMock();
      metric.startPageLoad({ isInitial: true });
      metric.stop({ stopTime: 100 });
      expect(
        await ssrFeatureFlags(
          pageLoadPerformanceConfigMock({
            ssr: {
              includeFeatureFlags: IncludeSSRFeatureFlagsConfig.WHEN_AVAILABLE,
            },
          }),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock({
            ssr: {
              getFeatureFlags: () => ({ 'ssr.ff': true }),
              getDoneMark: () => 10,
              includeFeatureFlags: IncludeSSRFeatureFlagsConfig.NEVER,
            },
          }),
        ),
      ).toStrictEqual({
        'ssr:featureFlags': { 'ssr.ff': true },
      });
    });
  });

  describe('returns null when enforced', () => {
    test('by global config', async () => {
      const metric = pageLoadMetricMock();
      metric.startPageLoad({ isInitial: true });
      metric.stop({ stopTime: 100 });
      expect(
        await ssrFeatureFlags(
          pageLoadPerformanceConfigMock({
            ssr: {
              doneAsFmp: true,
            },
          }),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock({
            ssr: {
              getFeatureFlags: () => ({ 'ssr.ff': true }),
              getDoneMark: () => 10,
              includeFeatureFlags: IncludeSSRFeatureFlagsConfig.NEVER,
            },
          }),
        ),
      ).toStrictEqual(null);
    });

    test('by metric config', async () => {
      const metric = pageLoadMetricMock();
      metric.startPageLoad({ isInitial: true });
      metric.stop({ stopTime: 100 });
      expect(
        await ssrFeatureFlags(
          pageLoadPerformanceConfigMock({
            ssr: {
              includeFeatureFlags: IncludeSSRFeatureFlagsConfig.NEVER,
              doneAsFmp: true,
            },
          }),
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock({
            ssr: {
              getFeatureFlags: () => ({ 'ssr.ff': true }),
              getDoneMark: () => 10,
            },
          }),
        ),
      ).toStrictEqual(null);
    });
  });
});
