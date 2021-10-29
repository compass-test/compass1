export type { PublisherSetupAttrs } from './publisher/publisher';

export type FeatureFlagValue = boolean | string | number;

export type FeatureFlagClient = {
  getValue: (featureFlagName: string) => FeatureFlagValue;
};

export type SSRFeatureFlags = { [key: string]: FeatureFlagValue };

export type SSRConfig = {
  getDoneMark: () => number | null;
  getFeatureFlags: () => SSRFeatureFlags | null;
};
