import {
  BasePageLoadMetricDataWithStartAndStop,
  GetSSRFeatureFlags,
  IncludeSSRFeatureFlagsConfig,
  PageLoadPerformanceEventConfig,
  ShareableGlobalConfig,
} from '../../types';

const retrieveFeatureFlags = async (getFeatureFlags: GetSSRFeatureFlags) => {
  try {
    const featureFlags = await getFeatureFlags();
    if (featureFlags) {
      return { 'ssr:featureFlags': featureFlags };
    }
  } catch (e) {}
  return null;
};

export const ssrFeatureFlags = async (
  config: PageLoadPerformanceEventConfig,
  data: BasePageLoadMetricDataWithStartAndStop,
  globalConfig: ShareableGlobalConfig,
) => {
  // no config or missing
  if (!globalConfig.ssr?.getFeatureFlags) {
    return null;
  }

  const includeFeatureFlags =
    config.ssr?.includeFeatureFlags ||
    globalConfig.ssr?.includeFeatureFlags ||
    IncludeSSRFeatureFlagsConfig.WHEN_FMP;

  if (
    includeFeatureFlags === IncludeSSRFeatureFlagsConfig.WHEN_AVAILABLE ||
    (config.ssr?.doneAsFmp &&
      includeFeatureFlags === IncludeSSRFeatureFlagsConfig.WHEN_FMP)
  ) {
    return await retrieveFeatureFlags(globalConfig.ssr.getFeatureFlags);
  }

  return null;
};
