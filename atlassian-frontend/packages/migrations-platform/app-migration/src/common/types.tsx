export type DataScope =
  | 'APP_DATA_OTHER'
  | 'APP_DATA_PII'
  | 'APP_DATA_SECURITY'
  | 'APP_DATA_UGC'
  | 'MIGRATION_TRACING_IDENTITY'
  | 'MIGRATION_TRACING_PRODUCT'
  | 'PRODUCT_DATA_OTHER'
  | 'PRODUCT_DATA_PII'
  | 'PRODUCT_DATA_SECURITY'
  | 'PRODUCT_DATA_UGC';

type AppInfo = {
  key: string;
  name: string;
  contactVendorUrl: string;
  privacyPolicyUrl: string;
  logoUrl?: string;
};

export type ConsentStatus =
  | 'ConsentGiven'
  | 'ConsentNotGiven'
  | 'ConsentOutdated'
  | 'ServerAppOutdated'
  | 'NoMigrationNeeded'
  | 'NoMigratingAlternative'
  | 'NoAutomatedMigrationPath';

export type ConsentApp = AppInfo & {
  status: ConsentStatus;
  cloudUrl: string;
  vendorName: string;
  dataScopes?: DataScope[];
  upgradeAppUrl?: string;
  isVendorHighlighted?: boolean;
  isLoading?: boolean;
};

export type MigrationStatus =
  | 'Unassigned'
  | 'NotNeeded'
  | 'Needed'
  | 'Alternative';

export type AppCloudCapability =
  | 'yes'
  | 'no'
  | 'unknown'
  | 'upgrade'
  | 'install_only'
  | 'manual'
  | 'discarded';

export type AssessmentApp = AppInfo & {
  canBeMigrated: AppCloudCapability;
  cloudUrl?: string;
  featureDifferencesUrl?: string;
  cloudVersionDevelopmentRoadmap?: string;
  hasCloudVersion: boolean;
  hasFeatureDifferences: AppCloudCapability;
  hasMacros: boolean;
  isEnabled: boolean;
  migrationNotes: string;
  migrationPathInstructionsUrl?: string;
  migrationStatus: MigrationStatus;
  migrationRoadmapRequest?: string;
  pages: number;
  // @TODO It's a bit confusing to have `status` and `migrationStatus`
  status: 'Success' | 'Running' | 'Error';
  upgradeAppUrl?: string;
  users: number;
  reliabilityState?: 'alpha' | 'beta';
};
