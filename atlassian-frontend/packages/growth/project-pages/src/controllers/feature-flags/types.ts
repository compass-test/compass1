export interface FeatureFlags {
  isGranularPagesExperiment: boolean;
  isJswConfluenceSilentBundlingExperiment: boolean;
  isProjectPagesProductionisation: boolean;
  isEmbeddedPagesExperiment: boolean;
  fireFeatureExposed: (flagKey: string) => void;
}
