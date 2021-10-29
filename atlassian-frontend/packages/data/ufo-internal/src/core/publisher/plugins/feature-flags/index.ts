import {
  ExperienceData,
  PageLoadExperienceData,
} from '@atlassian/ufo-experimental/types';

import { FeatureFlagClient, FeatureFlagValue } from '../../../types';

type FeatureFlagsPluginPayload = {
  featureFlags: { [key: string]: FeatureFlagValue };
} | null;

export const featureFlags = (
  featureFlagClient: FeatureFlagClient,
  featureFlags: string[],
  data: ExperienceData | PageLoadExperienceData,
): FeatureFlagsPluginPayload => {
  const allFeatureFlags = [...featureFlags, ...data.featureFlags];

  if (allFeatureFlags.length === 0) {
    return null;
  }

  const mappedFeatureFlags = Object.fromEntries(
    allFeatureFlags.map(featureFlagKey => [
      featureFlagKey,
      featureFlagClient.getValue(featureFlagKey),
    ]),
  );

  return {
    featureFlags: mappedFeatureFlags,
  };
};
