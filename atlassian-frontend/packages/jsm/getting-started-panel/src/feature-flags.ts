import { FeatureFlagKey, useGspFeatureFlag } from './controllers/feature-flags';

// Don't forget to add a mock for your flag in ./__mocks__/feature-flags.ts

export const useInProductHelpDocumentationLinksEnabled = () =>
  useGspFeatureFlag(FeatureFlagKey.InProductHelpDocumentationLinks);

export const useIncidentConsolidationQuickTourItemsEnabled = () =>
  useGspFeatureFlag(FeatureFlagKey.IncidentConsolidationQuickTourItems);
