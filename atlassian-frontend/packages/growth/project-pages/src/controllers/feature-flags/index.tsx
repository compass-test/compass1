import React, { useContext } from 'react';
import { FeatureFlags } from './types';
export type { FeatureFlags };

const FeatureFlagsContext = React.createContext<FeatureFlags>({
  isGranularPagesExperiment: false,
  isJswConfluenceSilentBundlingExperiment: false,
  isProjectPagesProductionisation: false,
  isEmbeddedPagesExperiment: false,
  fireFeatureExposed: () => {},
});

export const useFeatureFlags = () =>
  useContext<FeatureFlags>(FeatureFlagsContext);
export const FeatureFlagsProvider = FeatureFlagsContext.Provider;

export const EMBEDDED_PAGES_EXPERIMENT_FLAG_KEY =
  'confluence.frontend.growth.jsw.embedded-pages';
