import {
  BaseMetricDataWithStartAndStop,
  FeatureFlagValue,
  PageLoadPerformanceEventConfig,
  PerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';

type FeatureFlagsPluginPayload = {
  featureFlags: { [key: string]: FeatureFlagValue };
} | null;

export const featureFlags = (
  config: PerformanceEventConfig | PageLoadPerformanceEventConfig,
  data: BaseMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
): FeatureFlagsPluginPayload => {
  const localFeatureFlags =
    config.featureFlags?.reduce(
      (acc: { [key: string]: FeatureFlagValue }, ffName: string) => {
        acc[ffName] = globalConfig.ffClient.getValue(ffName);
        return acc;
      },
      {},
    ) || null;

  if (
    (!globalConfig.featureFlags ||
      Object.keys(globalConfig.featureFlags).length === 0) &&
    (!localFeatureFlags || Object.keys(localFeatureFlags).length === 0)
  ) {
    return null;
  }

  return {
    featureFlags: { ...localFeatureFlags, ...globalConfig.featureFlags },
  };
};
