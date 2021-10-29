export type OutdatedAppDetails = {
  name: string;
  version: string;
  url: string;
  key: string;
  versionWithMigration: string;
};

export type AppOutdatedProps = {
  outdatedApps: OutdatedAppDetails[];
  appAssessmentUrl: string;
  onRemoveApps: (appKeys: string[]) => void;
};
