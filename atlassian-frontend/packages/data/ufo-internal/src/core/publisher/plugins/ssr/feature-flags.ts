import { SSRConfig } from '../../../types';

export const ssrFeatureFlags = (ssr: SSRConfig | null) => {
  if (!ssr?.getFeatureFlags) {
    return null;
  }

  try {
    const featureFlags = ssr.getFeatureFlags();
    if (featureFlags) {
      return { 'ssr:featureFlags': featureFlags };
    }
  } catch (e) {}
  return null;
};
