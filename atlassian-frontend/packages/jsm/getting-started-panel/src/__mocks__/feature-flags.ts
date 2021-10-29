import {
  FeatureFlagKey,
  FeatureFlagMap,
  featureFlagDefaultValues,
} from '../controllers/feature-flags';

const createMockFeatureFlagFn = <T extends FeatureFlagKey>(featureFlagKey: T) =>
  jest
    .fn<FeatureFlagMap[T], []>()
    .mockReturnValue(featureFlagDefaultValues[featureFlagKey]);

export const useInProductHelpDocumentationLinksEnabled = createMockFeatureFlagFn(
  FeatureFlagKey.InProductHelpDocumentationLinks,
);

export const useIncidentConsolidationQuickTourItemsEnabled = createMockFeatureFlagFn(
  FeatureFlagKey.IncidentConsolidationQuickTourItems,
);
