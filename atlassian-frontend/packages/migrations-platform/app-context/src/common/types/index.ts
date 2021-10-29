export type ProductFamily = 'jira' | 'confluence' | 'bitbucket_';

// Cloud
export type CloudProductKey =
  | 'bitbucket.ondemand'
  | 'confluence.ondemand'
  | 'jira-core.ondemand'
  | 'jira-software.ondemand'
  | 'jira-servicedesk.ondemand';

export type CloudEditionKey = 'free' | 'standard' | 'premium';

type CloudSiteInfo = {
  cloudId: string;
  cloudUrl: string;
};

export type CloudProductInfo = {
  productKey: CloudProductKey;
  edition: CloudEditionKey;
  usersCount: number;
};

export type CloudSite = CloudSiteInfo & Partial<CloudProductInfo>;

export type AppConstants = {
  cloudEditionNames: { [key in CloudEditionKey]: string };
  cloudName: string;
  feedbackCollector?: {
    embeddableKey: string;
    requestTypeId: string;
  };
};

export type User = {
  name: string;
  email: string;
};

export type UsersAndGroupsStats = {
  numberOfUsers: number;
  numberOfGroups: number;
};

export type ProductInstanceStats = {
  numberOfUsers: number;
  numberOfGroups: number;
  numberOfContainers: number;
  numberOfObjects: number;
  sizeOfAttachments: number;
  totalMigrationTime: number;
};

export type MigrationPlanStats = {
  numberOfObjects?: number;
  sizeOfAttachments?: number;
};

export type MigrationStatsProvider = {
  getUsersAndGroupsStats: () => Promise<UsersAndGroupsStats>;
  getProductInstanceStats: () => Promise<ProductInstanceStats>;
  getMigrationPlanStats: (context?: any) => Promise<MigrationPlanStats | null>;
};

// UsersProvider
export type UsersProvider = {
  getCurrent: () => Promise<User>;
};

// AppProviders
export type AppProviders = {
  migrationStats: MigrationStatsProvider;
  users: UsersProvider;
};
