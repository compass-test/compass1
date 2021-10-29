import { createContext } from 'react';

export interface FeatureFlagContextData {
  featureFlags: Map<string, unknown>;
}

export const FeatureFlagContext = createContext<FeatureFlagContextData>({
  featureFlags: new Map(),
});
