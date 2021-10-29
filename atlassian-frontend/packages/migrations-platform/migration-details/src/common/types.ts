export type ProjectType = 'jira' | 'service_desk';
export type ProjectStatsOf = {
  totalProjects: number;
  totalIssues: number;
  attachments: {
    totalSizeBytes: number;
  };
};
export type ProjectsConfig = {
  // Total number of projects in migration
  numberOfProjects: number;
  // Total size of all attachments in bytes
  attachmentsBytesSize: number;
  // Total number of issues in migration
  numberOfIssues: number;
  projectDataMigrationMode?: ProjectDataMigrationMode;
  // Total number of JSM projects
  projectStatsOfJira?: ProjectStatsOf;
  // Total number of JSW projects
  projectStatsOfJSM?: ProjectStatsOf;
};

export type ProjectDataMigrationMode =
  | 'All'
  | 'ConfigOnly'
  | 'AttachmentsOnly'
  | 'MediaUploadOnly'
  | 'MediaUploadLink';

export type Check = {
  status: CheckStatus;
  // Last time this check was executed (number of milliseconds since epoch time)
  lastExecution?: number;
  // Migration check created time (number of milliseconds since epoch time)
  createdOn?: number;
};

export type CheckStatus =
  | 'Running'
  | 'Success'
  | 'Error'
  | 'Warning'
  | 'ExecutionError';

export type CurrentMigrationStatus =
  | 'Validating'
  | 'Running'
  | 'Complete'
  | 'Incomplete'
  | 'Failed'
  | 'Stopping'
  | 'Stopped';

export type CurrentChecksStatus =
  | 'Running'
  | 'Success'
  | 'Error'
  | 'Warning'
  | 'ExecutionError'
  | 'BlockingExecutionError';

export type OverallMigrationStatus =
  | 'MigrationValidating'
  | 'MigrationRunning'
  | 'MigrationComplete'
  | 'MigrationIncomplete'
  | 'MigrationFailed'
  | 'MigrationStopping'
  | 'MigrationStopped'
  | 'ChecksRunning'
  | 'ChecksSuccess'
  | 'ChecksError'
  | 'ChecksWarning'
  | 'ChecksExecutionError'
  | 'ChecksBlockingExecutionError';

export type ProductFamilyKey = 'jira' | 'confluence' | 'bitbucket';

export type UsersAndGroupsConfig = {
  shouldPreserveMemberships: boolean;
  includeUsersInGroups?: boolean;
  includeRoleActors?: boolean;
  mode: UsersAndGroupsMode;
  numberOfUsers?: number;
  numberOfGroups?: number;
};

export type UsersAndGroupsMode = 'All' | 'Referenced';

export type CloudProductKey =
  | 'confluence.ondemand'
  | 'jira-core.ondemand'
  | 'jira-software.ondemand'
  | 'jira-servicedesk.ondemand';
type CloudEditionKey = 'free' | 'standard' | 'premium';

export type JiraCloudProductKey = Exclude<
  CloudProductKey,
  'confluence.ondemand'
>;
export type JiraCloudEditionKey = CloudEditionKey;

export type CloudProduct = {
  edition: JiraCloudEditionKey;
  productKey: JiraCloudProductKey;
};

export type AdvancedRoadmapsConfig = {
  // Total number of AR plans in migration
  numberOfPlans: number;
};

export type AppsMigrationConfig = {
  numberOfApps: number;
};

export type CustomerMigrationMode = 'ALL' | 'NONE' | 'REFERENCED';

export type CustomersConfig = {
  shouldMigrateProjects: boolean;
  customersCount: number;
  mode: CustomerMigrationMode;
};
