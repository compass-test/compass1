import { ENVIRONMENT, getEnvironment } from '../../server/constants';

export type FeatureFlags = {
  // Show product fabric status on homepage
  // Delete after 2 weeks after rollout (26/April/2021)
  productFabricStatus: boolean;

  // Show integrator status inside of product fabric details dropdown
  // Delete after 2 weeks after rollout (26/April/2021)
  productFabricStatus_integratorStatus: boolean;

  // Show metrics (release averages) on homepage
  // Delete after 2 weeks after rollout (26/April/2021)
  releaseAverageMetrics: boolean;
};

const localhostFeatureFlags: FeatureFlags = {
  productFabricStatus: true,
  productFabricStatus_integratorStatus: true,
  releaseAverageMetrics: true,
};

const stagingFeatureFlags: FeatureFlags = {
  productFabricStatus: true,
  productFabricStatus_integratorStatus: true,
  releaseAverageMetrics: true,
};

const productionFeatureFlags: FeatureFlags = {
  productFabricStatus: true,
  productFabricStatus_integratorStatus: true,
  releaseAverageMetrics: true,
};

function mutateFlagsForProperties(
  flags: Partial<FeatureFlags>,
  query: URLSearchParams,
  properties: (keyof FeatureFlags)[],
) {
  for (const property of properties) {
    const value = query.get(property);
    if (value === 'true' || value === '1') {
      flags[property] = true;
    } else if (value === 'false' || value === '0') {
      flags[property] = false;
    }
  }
}

function getUrlQueryFlags(): Partial<FeatureFlags> | undefined {
  const flags: Partial<FeatureFlags> = {};
  if (typeof window !== 'undefined') {
    const query = new URLSearchParams(window.location.search);
    const featureFlagNames = Object.keys(localhostFeatureFlags);
    mutateFlagsForProperties(
      flags,
      query,
      featureFlagNames as (keyof FeatureFlags)[],
    );
  }
  return flags;
}

export const featureFlags = () => {
  const queryFlags = getUrlQueryFlags();
  switch (getEnvironment()) {
    case ENVIRONMENT.LOCALHOST:
      return {
        ...localhostFeatureFlags,
        ...queryFlags,
      };
    case ENVIRONMENT.STAGING:
      return {
        ...stagingFeatureFlags,
        ...queryFlags,
      };
    case ENVIRONMENT.PROD:
      return {
        ...productionFeatureFlags,
        ...queryFlags,
      };
  }
};

(window as any).__featureFlags = featureFlags();
