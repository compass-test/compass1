// https://developer.atlassian.com/platform/frontend-feature-flags/resources/api-keys/
export const FX3_PRODUCTION_KEY = '29f16425-c7d1-4111-a494-ea71e29deadc';
export const FX3_STAGING_KEY = '682e937a-6c8c-41a7-b7da-c9f02b1d3c3e';
export const FX3_LOCAL_KEY = 'aa338ef7-c5a6-4de5-ada9-438f8ecefad7';

// NOTE: sample feature flag left in here as demonstration of how to feature flag
// and to keep typescript happy when it comes to types in actions.ts
export enum FeatureFlagKey {
  SampleFeatureFlag = 'jsm.sample.feature.flag',
  InProductHelpDocumentationLinks = 'jsm.gsp.iph.doc.links',
  IncidentConsolidationQuickTourItems = 'jsm.gsp.incident.consolidation.quick.tour.items',
}

// we need to manually define this type because the compiler isn't smart enough
// to be aware of it outside of this file https://github.com/microsoft/TypeScript/issues/35329
export type FeatureFlagMap = {
  [FeatureFlagKey.SampleFeatureFlag]: boolean;
  [FeatureFlagKey.InProductHelpDocumentationLinks]: boolean;
  [FeatureFlagKey.IncidentConsolidationQuickTourItems]: boolean;
};

export const featureFlagDefaultValues: FeatureFlagMap = {
  [FeatureFlagKey.SampleFeatureFlag]: false,
  [FeatureFlagKey.InProductHelpDocumentationLinks]: false,
  [FeatureFlagKey.IncidentConsolidationQuickTourItems]: false,
};
