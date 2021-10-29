//==============================================================
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */
// @generated
// This file was automatically generated and should not be edited.
//==============================================================

import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type QueryKeySpecifier = (
  | 'activities'
  | 'app'
  | 'appActiveTunnels'
  | 'appDeployment'
  | 'appHostServices'
  | 'appInstallationTask'
  | 'appLogLines'
  | 'appLogs'
  | 'appStoredEntities'
  | 'appStoredEntitiesForCleanup'
  | 'appStoredEntity'
  | 'apps'
  | 'bitbucket'
  | 'bitbucketRepositoriesAvailableToLinkWithNewDevOpsService'
  | 'boardScope'
  | 'codeInJira'
  | 'compass'
  | 'customerSupport'
  | 'devOpsMetrics'
  | 'devOpsService'
  | 'devOpsServiceAndJiraProjectRelationship'
  | 'devOpsServiceAndOpsgenieTeamRelationship'
  | 'devOpsServiceAndRepositoryRelationship'
  | 'devOpsServiceRelationship'
  | 'devOpsServiceRelationshipsForJiraProject'
  | 'devOpsServiceRelationshipsForOpsgenieTeam'
  | 'devOpsServiceRelationshipsForRepository'
  | 'devOpsServiceTiers'
  | 'devOpsServices'
  | 'devOpsServicesById'
  | 'developerLogAccess'
  | 'developmentInformation'
  | 'diagnostics'
  | 'dvcs'
  | 'echo'
  | 'ecosystem'
  | 'extensionByKey'
  | 'extensionContexts'
  | 'extensionsEcho'
  | 'installationContextsWithLogAccess'
  | 'jira'
  | 'jiraProjectAndOpsgenieTeamRelationship'
  | 'jiraProjectAndRepositoryRelationship'
  | 'jiraProjectRelationshipsForOpsgenieTeam'
  | 'jiraProjectRelationshipsForRepository'
  | 'jiraProjectRelationshipsForService'
  | 'jiraReleases'
  | 'marketplaceApp'
  | 'marketplaceAppByCloudAppId'
  | 'marketplaceAppByKey'
  | 'marketplacePartner'
  | 'marketplacePricingPlan'
  | 'marketplaceUser'
  | 'me'
  | 'movie'
  | 'node'
  | 'opsgenie'
  | 'opsgenieTeamRelationshipForDevOpsService'
  | 'opsgenieTeamRelationshipsForJiraProject'
  | 'polarisAPIVersion'
  | 'polarisAnonymousVisitorHash'
  | 'polarisAnonymousVisitorHashByID'
  | 'polarisCollabToken'
  | 'polarisConnectAppByClientID'
  | 'polarisIdeas'
  | 'polarisInsight'
  | 'polarisInsights'
  | 'polarisInsightsWithErrors'
  | 'polarisLabels'
  | 'polarisLinkedDeliveryTickets'
  | 'polarisProject'
  | 'polarisSnippetPropertiesConfig'
  | 'polarisTermsConsent'
  | 'polarisView'
  | 'repositoryRelationshipsForDevOpsService'
  | 'repositoryRelationshipsForJiraProject'
  | 'roadmaps'
  | 'search'
  | 'team'
  | 'tenantContexts'
  | 'testing'
  | 'townsquare'
  | 'user'
  | 'users'
  | 'webTriggerUrlsByAppContext'
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  activities?: FieldPolicy<any> | FieldReadFunction<any>;
  app?: FieldPolicy<any> | FieldReadFunction<any>;
  appActiveTunnels?: FieldPolicy<any> | FieldReadFunction<any>;
  appDeployment?: FieldPolicy<any> | FieldReadFunction<any>;
  appHostServices?: FieldPolicy<any> | FieldReadFunction<any>;
  appInstallationTask?: FieldPolicy<any> | FieldReadFunction<any>;
  appLogLines?: FieldPolicy<any> | FieldReadFunction<any>;
  appLogs?: FieldPolicy<any> | FieldReadFunction<any>;
  appStoredEntities?: FieldPolicy<any> | FieldReadFunction<any>;
  appStoredEntitiesForCleanup?: FieldPolicy<any> | FieldReadFunction<any>;
  appStoredEntity?: FieldPolicy<any> | FieldReadFunction<any>;
  apps?: FieldPolicy<any> | FieldReadFunction<any>;
  bitbucket?: FieldPolicy<any> | FieldReadFunction<any>;
  bitbucketRepositoriesAvailableToLinkWithNewDevOpsService?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  boardScope?: FieldPolicy<any> | FieldReadFunction<any>;
  codeInJira?: FieldPolicy<any> | FieldReadFunction<any>;
  compass?: FieldPolicy<any> | FieldReadFunction<any>;
  customerSupport?: FieldPolicy<any> | FieldReadFunction<any>;
  devOpsMetrics?: FieldPolicy<any> | FieldReadFunction<any>;
  devOpsService?: FieldPolicy<any> | FieldReadFunction<any>;
  devOpsServiceAndJiraProjectRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  devOpsServiceAndOpsgenieTeamRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  devOpsServiceAndRepositoryRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  devOpsServiceRelationship?: FieldPolicy<any> | FieldReadFunction<any>;
  devOpsServiceRelationshipsForJiraProject?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  devOpsServiceRelationshipsForOpsgenieTeam?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  devOpsServiceRelationshipsForRepository?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  devOpsServiceTiers?: FieldPolicy<any> | FieldReadFunction<any>;
  devOpsServices?: FieldPolicy<any> | FieldReadFunction<any>;
  devOpsServicesById?: FieldPolicy<any> | FieldReadFunction<any>;
  developerLogAccess?: FieldPolicy<any> | FieldReadFunction<any>;
  developmentInformation?: FieldPolicy<any> | FieldReadFunction<any>;
  diagnostics?: FieldPolicy<any> | FieldReadFunction<any>;
  dvcs?: FieldPolicy<any> | FieldReadFunction<any>;
  echo?: FieldPolicy<any> | FieldReadFunction<any>;
  ecosystem?: FieldPolicy<any> | FieldReadFunction<any>;
  extensionByKey?: FieldPolicy<any> | FieldReadFunction<any>;
  extensionContexts?: FieldPolicy<any> | FieldReadFunction<any>;
  extensionsEcho?: FieldPolicy<any> | FieldReadFunction<any>;
  installationContextsWithLogAccess?: FieldPolicy<any> | FieldReadFunction<any>;
  jira?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraProjectAndOpsgenieTeamRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  jiraProjectAndRepositoryRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  jiraProjectRelationshipsForOpsgenieTeam?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  jiraProjectRelationshipsForRepository?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  jiraProjectRelationshipsForService?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  jiraReleases?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplaceApp?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplaceAppByCloudAppId?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplaceAppByKey?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplacePartner?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplacePricingPlan?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplaceUser?: FieldPolicy<any> | FieldReadFunction<any>;
  me?: FieldPolicy<any> | FieldReadFunction<any>;
  movie?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  opsgenie?: FieldPolicy<any> | FieldReadFunction<any>;
  opsgenieTeamRelationshipForDevOpsService?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  opsgenieTeamRelationshipsForJiraProject?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  polarisAPIVersion?: FieldPolicy<any> | FieldReadFunction<any>;
  polarisAnonymousVisitorHash?: FieldPolicy<any> | FieldReadFunction<any>;
  polarisAnonymousVisitorHashByID?: FieldPolicy<any> | FieldReadFunction<any>;
  polarisCollabToken?: FieldPolicy<any> | FieldReadFunction<any>;
  polarisConnectAppByClientID?: FieldPolicy<any> | FieldReadFunction<any>;
  polarisIdeas?: FieldPolicy<any> | FieldReadFunction<any>;
  polarisInsight?: FieldPolicy<any> | FieldReadFunction<any>;
  polarisInsights?: FieldPolicy<any> | FieldReadFunction<any>;
  polarisInsightsWithErrors?: FieldPolicy<any> | FieldReadFunction<any>;
  polarisLabels?: FieldPolicy<any> | FieldReadFunction<any>;
  polarisLinkedDeliveryTickets?: FieldPolicy<any> | FieldReadFunction<any>;
  polarisProject?: FieldPolicy<any> | FieldReadFunction<any>;
  polarisSnippetPropertiesConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  polarisTermsConsent?: FieldPolicy<any> | FieldReadFunction<any>;
  polarisView?: FieldPolicy<any> | FieldReadFunction<any>;
  repositoryRelationshipsForDevOpsService?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  repositoryRelationshipsForJiraProject?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  roadmaps?: FieldPolicy<any> | FieldReadFunction<any>;
  search?: FieldPolicy<any> | FieldReadFunction<any>;
  team?: FieldPolicy<any> | FieldReadFunction<any>;
  tenantContexts?: FieldPolicy<any> | FieldReadFunction<any>;
  testing?: FieldPolicy<any> | FieldReadFunction<any>;
  townsquare?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  users?: FieldPolicy<any> | FieldReadFunction<any>;
  webTriggerUrlsByAppContext?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivitiesKeySpecifier = (
  | 'all'
  | 'myActivities'
  | 'workedOn'
  | ActivitiesKeySpecifier
)[];
export type ActivitiesFieldPolicy = {
  all?: FieldPolicy<any> | FieldReadFunction<any>;
  myActivities?: FieldPolicy<any> | FieldReadFunction<any>;
  workedOn?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivitiesConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | ActivitiesConnectionKeySpecifier
)[];
export type ActivitiesConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivityEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | ActivityEdgeKeySpecifier
)[];
export type ActivityEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivitiesItemKeySpecifier = (
  | 'id'
  | 'object'
  | 'timestamp'
  | ActivitiesItemKeySpecifier
)[];
export type ActivitiesItemFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  object?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivitiesObjectKeySpecifier = (
  | 'cloudId'
  | 'containers'
  | 'contributors'
  | 'events'
  | 'extension'
  | 'iconUrl'
  | 'id'
  | 'localResourceId'
  | 'name'
  | 'parent'
  | 'product'
  | 'type'
  | 'url'
  | ActivitiesObjectKeySpecifier
)[];
export type ActivitiesObjectFieldPolicy = {
  cloudId?: FieldPolicy<any> | FieldReadFunction<any>;
  containers?: FieldPolicy<any> | FieldReadFunction<any>;
  contributors?: FieldPolicy<any> | FieldReadFunction<any>;
  events?: FieldPolicy<any> | FieldReadFunction<any>;
  extension?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  localResourceId?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  parent?: FieldPolicy<any> | FieldReadFunction<any>;
  product?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivitiesContainerKeySpecifier = (
  | 'cloudId'
  | 'iconUrl'
  | 'id'
  | 'localResourceId'
  | 'name'
  | 'product'
  | 'type'
  | 'url'
  | ActivitiesContainerKeySpecifier
)[];
export type ActivitiesContainerFieldPolicy = {
  cloudId?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  localResourceId?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  product?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivitiesContributorKeySpecifier = (
  | 'count'
  | 'lastAccessedDate'
  | 'profile'
  | ActivitiesContributorKeySpecifier
)[];
export type ActivitiesContributorFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  lastAccessedDate?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = (
  | 'accountId'
  | 'accountStatus'
  | 'name'
  | 'picture'
  | UserKeySpecifier
)[];
export type UserFieldPolicy = {
  accountId?: FieldPolicy<any> | FieldReadFunction<any>;
  accountStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  picture?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivitiesEventKeySpecifier = (
  | 'eventType'
  | 'extension'
  | 'id'
  | 'timestamp'
  | 'user'
  | ActivitiesEventKeySpecifier
)[];
export type ActivitiesEventFieldPolicy = {
  eventType?: FieldPolicy<any> | FieldReadFunction<any>;
  extension?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivitiesCommentedEventKeySpecifier = (
  | 'commentId'
  | ActivitiesCommentedEventKeySpecifier
)[];
export type ActivitiesCommentedEventFieldPolicy = {
  commentId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivitiesTransitionedEventKeySpecifier = (
  | 'from'
  | 'to'
  | ActivitiesTransitionedEventKeySpecifier
)[];
export type ActivitiesTransitionedEventFieldPolicy = {
  from?: FieldPolicy<any> | FieldReadFunction<any>;
  to?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivitiesUserKeySpecifier = (
  | 'profile'
  | ActivitiesUserKeySpecifier
)[];
export type ActivitiesUserFieldPolicy = {
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivitiesJiraIssueKeySpecifier = (
  | 'issueKey'
  | ActivitiesJiraIssueKeySpecifier
)[];
export type ActivitiesJiraIssueFieldPolicy = {
  issueKey?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivitiesObjectParentKeySpecifier = (
  | 'id'
  | 'type'
  | ActivitiesObjectParentKeySpecifier
)[];
export type ActivitiesObjectParentFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivityPageInfoKeySpecifier = (
  | 'hasNextPage'
  | 'hasPreviousPage'
  | ActivityPageInfoKeySpecifier
)[];
export type ActivityPageInfoFieldPolicy = {
  hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>;
  hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MyActivitiesKeySpecifier = (
  | 'all'
  | 'viewed'
  | 'workedOn'
  | MyActivitiesKeySpecifier
)[];
export type MyActivitiesFieldPolicy = {
  all?: FieldPolicy<any> | FieldReadFunction<any>;
  viewed?: FieldPolicy<any> | FieldReadFunction<any>;
  workedOn?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppKeySpecifier = (
  | 'avatarFileId'
  | 'contactLink'
  | 'createdBy'
  | 'description'
  | 'distributionStatus'
  | 'environmentByKey'
  | 'environments'
  | 'id'
  | 'marketplaceApp'
  | 'name'
  | 'privacyPolicy'
  | 'storesPersonalData'
  | 'tags'
  | 'termsOfService'
  | 'vendorName'
  | AppKeySpecifier
)[];
export type AppFieldPolicy = {
  avatarFileId?: FieldPolicy<any> | FieldReadFunction<any>;
  contactLink?: FieldPolicy<any> | FieldReadFunction<any>;
  createdBy?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  distributionStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  environmentByKey?: FieldPolicy<any> | FieldReadFunction<any>;
  environments?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplaceApp?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  privacyPolicy?: FieldPolicy<any> | FieldReadFunction<any>;
  storesPersonalData?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
  termsOfService?: FieldPolicy<any> | FieldReadFunction<any>;
  vendorName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppEnvironmentKeySpecifier = (
  | 'appId'
  | 'createdAt'
  | 'createdBy'
  | 'deployments'
  | 'id'
  | 'installations'
  | 'key'
  | 'oauthClient'
  | 'scopes'
  | 'type'
  | 'variables'
  | 'versions'
  | AppEnvironmentKeySpecifier
)[];
export type AppEnvironmentFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  createdBy?: FieldPolicy<any> | FieldReadFunction<any>;
  deployments?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  installations?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  oauthClient?: FieldPolicy<any> | FieldReadFunction<any>;
  scopes?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  variables?: FieldPolicy<any> | FieldReadFunction<any>;
  versions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppDeploymentKeySpecifier = (
  | 'appId'
  | 'createdAt'
  | 'createdBy'
  | 'environmentKey'
  | 'errorDetails'
  | 'id'
  | 'stages'
  | 'status'
  | AppDeploymentKeySpecifier
)[];
export type AppDeploymentFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  createdBy?: FieldPolicy<any> | FieldReadFunction<any>;
  environmentKey?: FieldPolicy<any> | FieldReadFunction<any>;
  errorDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  stages?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ErrorDetailsKeySpecifier = (
  | 'code'
  | 'fields'
  | 'message'
  | ErrorDetailsKeySpecifier
)[];
export type ErrorDetailsFieldPolicy = {
  code?: FieldPolicy<any> | FieldReadFunction<any>;
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppDeploymentStageKeySpecifier = (
  | 'description'
  | 'events'
  | 'key'
  | 'progress'
  | AppDeploymentStageKeySpecifier
)[];
export type AppDeploymentStageFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  events?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  progress?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppDeploymentEventKeySpecifier = (
  | 'createdAt'
  | 'stepName'
  | AppDeploymentEventKeySpecifier
)[];
export type AppDeploymentEventFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  stepName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppDeploymentStageProgressKeySpecifier = (
  | 'doneSteps'
  | 'totalSteps'
  | AppDeploymentStageProgressKeySpecifier
)[];
export type AppDeploymentStageProgressFieldPolicy = {
  doneSteps?: FieldPolicy<any> | FieldReadFunction<any>;
  totalSteps?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppInstallationKeySpecifier = (
  | 'app'
  | 'appEnvironment'
  | 'appEnvironmentVersion'
  | 'createdAt'
  | 'createdBy'
  | 'id'
  | 'installationContext'
  | 'license'
  | 'version'
  | AppInstallationKeySpecifier
)[];
export type AppInstallationFieldPolicy = {
  app?: FieldPolicy<any> | FieldReadFunction<any>;
  appEnvironment?: FieldPolicy<any> | FieldReadFunction<any>;
  appEnvironmentVersion?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  createdBy?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  installationContext?: FieldPolicy<any> | FieldReadFunction<any>;
  license?: FieldPolicy<any> | FieldReadFunction<any>;
  version?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppEnvironmentVersionKeySpecifier = (
  | 'id'
  | 'isLatest'
  | 'migrationKeys'
  | 'permissions'
  | 'requiresLicense'
  | 'version'
  | AppEnvironmentVersionKeySpecifier
)[];
export type AppEnvironmentVersionFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isLatest?: FieldPolicy<any> | FieldReadFunction<any>;
  migrationKeys?: FieldPolicy<any> | FieldReadFunction<any>;
  permissions?: FieldPolicy<any> | FieldReadFunction<any>;
  requiresLicense?: FieldPolicy<any> | FieldReadFunction<any>;
  version?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MigrationKeysKeySpecifier = (
  | 'confluence'
  | 'jira'
  | MigrationKeysKeySpecifier
)[];
export type MigrationKeysFieldPolicy = {
  confluence?: FieldPolicy<any> | FieldReadFunction<any>;
  jira?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppPermissionKeySpecifier = (
  | 'egress'
  | 'scopes'
  | 'securityPolicies'
  | AppPermissionKeySpecifier
)[];
export type AppPermissionFieldPolicy = {
  egress?: FieldPolicy<any> | FieldReadFunction<any>;
  scopes?: FieldPolicy<any> | FieldReadFunction<any>;
  securityPolicies?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppNetworkEgressPermissionKeySpecifier = (
  | 'addresses'
  | 'type'
  | AppNetworkEgressPermissionKeySpecifier
)[];
export type AppNetworkEgressPermissionFieldPolicy = {
  addresses?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppHostServiceScopeKeySpecifier = (
  | 'description'
  | 'key'
  | 'name'
  | 'service'
  | AppHostServiceScopeKeySpecifier
)[];
export type AppHostServiceScopeFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  service?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppHostServiceKeySpecifier = (
  | 'description'
  | 'name'
  | 'scopes'
  | 'serviceId'
  | AppHostServiceKeySpecifier
)[];
export type AppHostServiceFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  scopes?: FieldPolicy<any> | FieldReadFunction<any>;
  serviceId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppSecurityPoliciesPermissionKeySpecifier = (
  | 'policies'
  | 'type'
  | AppSecurityPoliciesPermissionKeySpecifier
)[];
export type AppSecurityPoliciesPermissionFieldPolicy = {
  policies?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppInstallationLicenseKeySpecifier = (
  | 'active'
  | 'billingPeriod'
  | 'isEvaluation'
  | 'subscriptionEndDate'
  | 'supportEntitlementNumber'
  | 'trialEndDate'
  | 'type'
  | AppInstallationLicenseKeySpecifier
)[];
export type AppInstallationLicenseFieldPolicy = {
  active?: FieldPolicy<any> | FieldReadFunction<any>;
  billingPeriod?: FieldPolicy<any> | FieldReadFunction<any>;
  isEvaluation?: FieldPolicy<any> | FieldReadFunction<any>;
  subscriptionEndDate?: FieldPolicy<any> | FieldReadFunction<any>;
  supportEntitlementNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  trialEndDate?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppVersionKeySpecifier = ('isLatest' | AppVersionKeySpecifier)[];
export type AppVersionFieldPolicy = {
  isLatest?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AtlassianOAuthClientKeySpecifier = (
  | 'callbacks'
  | 'clientID'
  | 'refreshToken'
  | AtlassianOAuthClientKeySpecifier
)[];
export type AtlassianOAuthClientFieldPolicy = {
  callbacks?: FieldPolicy<any> | FieldReadFunction<any>;
  clientID?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshToken?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RefreshTokenKeySpecifier = (
  | 'refreshTokenRotation'
  | RefreshTokenKeySpecifier
)[];
export type RefreshTokenFieldPolicy = {
  refreshTokenRotation?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppEnvironmentVariableKeySpecifier = (
  | 'encrypt'
  | 'key'
  | 'value'
  | AppEnvironmentVariableKeySpecifier
)[];
export type AppEnvironmentVariableFieldPolicy = {
  encrypt?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppEnvironmentVersionConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | 'totalCount'
  | AppEnvironmentVersionConnectionKeySpecifier
)[];
export type AppEnvironmentVersionConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppEnvironmentVersionEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | AppEnvironmentVersionEdgeKeySpecifier
)[];
export type AppEnvironmentVersionEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PageInfoKeySpecifier = (
  | 'endCursor'
  | 'hasNextPage'
  | 'hasPreviousPage'
  | 'startCursor'
  | PageInfoKeySpecifier
)[];
export type PageInfoFieldPolicy = {
  endCursor?: FieldPolicy<any> | FieldReadFunction<any>;
  hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>;
  hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>;
  startCursor?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceAppKeySpecifier = (
  | 'appId'
  | 'appKey'
  | 'categories'
  | 'createdAt'
  | 'distribution'
  | 'entityStatus'
  | 'forumsUrl'
  | 'googleAnalyticsId'
  | 'isAtlassianCommunityEnabled'
  | 'issueTrackerUrl'
  | 'jsdWidgetKey'
  | 'listingStatus'
  | 'logo'
  | 'marketingLabels'
  | 'name'
  | 'partner'
  | 'privacyPolicyUrl'
  | 'productHostingOptions'
  | 'programs'
  | 'reviewSummary'
  | 'slug'
  | 'statusPageUrl'
  | 'summary'
  | 'supportTicketSystemUrl'
  | 'tagline'
  | 'versions'
  | 'watchersInfo'
  | 'wikiUrl'
  | MarketplaceAppKeySpecifier
)[];
export type MarketplaceAppFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  appKey?: FieldPolicy<any> | FieldReadFunction<any>;
  categories?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  distribution?: FieldPolicy<any> | FieldReadFunction<any>;
  entityStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  forumsUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  googleAnalyticsId?: FieldPolicy<any> | FieldReadFunction<any>;
  isAtlassianCommunityEnabled?: FieldPolicy<any> | FieldReadFunction<any>;
  issueTrackerUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  jsdWidgetKey?: FieldPolicy<any> | FieldReadFunction<any>;
  listingStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  logo?: FieldPolicy<any> | FieldReadFunction<any>;
  marketingLabels?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  partner?: FieldPolicy<any> | FieldReadFunction<any>;
  privacyPolicyUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  productHostingOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  programs?: FieldPolicy<any> | FieldReadFunction<any>;
  reviewSummary?: FieldPolicy<any> | FieldReadFunction<any>;
  slug?: FieldPolicy<any> | FieldReadFunction<any>;
  statusPageUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  summary?: FieldPolicy<any> | FieldReadFunction<any>;
  supportTicketSystemUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  tagline?: FieldPolicy<any> | FieldReadFunction<any>;
  versions?: FieldPolicy<any> | FieldReadFunction<any>;
  watchersInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  wikiUrl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceAppCategoryKeySpecifier = (
  | 'name'
  | MarketplaceAppCategoryKeySpecifier
)[];
export type MarketplaceAppCategoryFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceAppDistributionKeySpecifier = (
  | 'downloadCount'
  | 'installationCount'
  | 'isPreinstalledInCloud'
  | 'isPreinstalledInServerDC'
  | MarketplaceAppDistributionKeySpecifier
)[];
export type MarketplaceAppDistributionFieldPolicy = {
  downloadCount?: FieldPolicy<any> | FieldReadFunction<any>;
  installationCount?: FieldPolicy<any> | FieldReadFunction<any>;
  isPreinstalledInCloud?: FieldPolicy<any> | FieldReadFunction<any>;
  isPreinstalledInServerDC?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceListingImageKeySpecifier = (
  | 'highResolution'
  | 'original'
  | 'scaled'
  | MarketplaceListingImageKeySpecifier
)[];
export type MarketplaceListingImageFieldPolicy = {
  highResolution?: FieldPolicy<any> | FieldReadFunction<any>;
  original?: FieldPolicy<any> | FieldReadFunction<any>;
  scaled?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceImageFileKeySpecifier = (
  | 'height'
  | 'id'
  | 'width'
  | MarketplaceImageFileKeySpecifier
)[];
export type MarketplaceImageFileFieldPolicy = {
  height?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  width?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplacePartnerKeySpecifier = (
  | 'address'
  | 'contactDetails'
  | 'id'
  | 'name'
  | 'partnerType'
  | 'programs'
  | 'slug'
  | 'support'
  | MarketplacePartnerKeySpecifier
)[];
export type MarketplacePartnerFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  contactDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  partnerType?: FieldPolicy<any> | FieldReadFunction<any>;
  programs?: FieldPolicy<any> | FieldReadFunction<any>;
  slug?: FieldPolicy<any> | FieldReadFunction<any>;
  support?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplacePartnerAddressKeySpecifier = (
  | 'city'
  | 'country'
  | 'line1'
  | 'line2'
  | 'postalCode'
  | 'state'
  | MarketplacePartnerAddressKeySpecifier
)[];
export type MarketplacePartnerAddressFieldPolicy = {
  city?: FieldPolicy<any> | FieldReadFunction<any>;
  country?: FieldPolicy<any> | FieldReadFunction<any>;
  line1?: FieldPolicy<any> | FieldReadFunction<any>;
  line2?: FieldPolicy<any> | FieldReadFunction<any>;
  postalCode?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplacePartnerContactDetailsKeySpecifier = (
  | 'emailId'
  | 'homepageUrl'
  | 'otherContactDetails'
  | 'phoneNumber'
  | MarketplacePartnerContactDetailsKeySpecifier
)[];
export type MarketplacePartnerContactDetailsFieldPolicy = {
  emailId?: FieldPolicy<any> | FieldReadFunction<any>;
  homepageUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  otherContactDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  phoneNumber?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplacePartnerProgramsKeySpecifier = (
  | 'isCloudAppSecuritySelfAssessmentDone'
  | MarketplacePartnerProgramsKeySpecifier
)[];
export type MarketplacePartnerProgramsFieldPolicy = {
  isCloudAppSecuritySelfAssessmentDone?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
};
export type MarketplacePartnerSupportKeySpecifier = (
  | 'availability'
  | 'contactDetails'
  | MarketplacePartnerSupportKeySpecifier
)[];
export type MarketplacePartnerSupportFieldPolicy = {
  availability?: FieldPolicy<any> | FieldReadFunction<any>;
  contactDetails?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplacePartnerSupportAvailabilityKeySpecifier = (
  | 'daysOfWeek'
  | 'endTime'
  | 'holidays'
  | 'isAvailable24Hours'
  | 'startTime'
  | 'timezone'
  | 'timezoneOffset'
  | MarketplacePartnerSupportAvailabilityKeySpecifier
)[];
export type MarketplacePartnerSupportAvailabilityFieldPolicy = {
  daysOfWeek?: FieldPolicy<any> | FieldReadFunction<any>;
  endTime?: FieldPolicy<any> | FieldReadFunction<any>;
  holidays?: FieldPolicy<any> | FieldReadFunction<any>;
  isAvailable24Hours?: FieldPolicy<any> | FieldReadFunction<any>;
  startTime?: FieldPolicy<any> | FieldReadFunction<any>;
  timezone?: FieldPolicy<any> | FieldReadFunction<any>;
  timezoneOffset?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplacePartnerSupportHolidayKeySpecifier = (
  | 'date'
  | 'holidayFrequency'
  | 'title'
  | MarketplacePartnerSupportHolidayKeySpecifier
)[];
export type MarketplacePartnerSupportHolidayFieldPolicy = {
  date?: FieldPolicy<any> | FieldReadFunction<any>;
  holidayFrequency?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplacePartnerSupportContactKeySpecifier = (
  | 'emailId'
  | 'phoneNumber'
  | 'websiteUrl'
  | MarketplacePartnerSupportContactKeySpecifier
)[];
export type MarketplacePartnerSupportContactFieldPolicy = {
  emailId?: FieldPolicy<any> | FieldReadFunction<any>;
  phoneNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  websiteUrl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceAppProgramsKeySpecifier = (
  | 'cloudFortified'
  | MarketplaceAppProgramsKeySpecifier
)[];
export type MarketplaceAppProgramsFieldPolicy = {
  cloudFortified?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceCloudFortifiedKeySpecifier = (
  | 'status'
  | MarketplaceCloudFortifiedKeySpecifier
)[];
export type MarketplaceCloudFortifiedFieldPolicy = {
  status?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceAppReviewSummaryKeySpecifier = (
  | 'count'
  | 'rating'
  | 'score'
  | MarketplaceAppReviewSummaryKeySpecifier
)[];
export type MarketplaceAppReviewSummaryFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  rating?: FieldPolicy<any> | FieldReadFunction<any>;
  score?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceAppVersionConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | MarketplaceAppVersionConnectionKeySpecifier
)[];
export type MarketplaceAppVersionConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceAppVersionEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | MarketplaceAppVersionEdgeKeySpecifier
)[];
export type MarketplaceAppVersionEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceAppVersionKeySpecifier = (
  | 'buildNumber'
  | 'deployment'
  | 'documentationUrl'
  | 'endUserLicenseAgreementUrl'
  | 'heroImage'
  | 'highlights'
  | 'isSupported'
  | 'learnMoreUrl'
  | 'licenseType'
  | 'moreDetails'
  | 'paymentModel'
  | 'productHostingOptions'
  | 'purchaseUrl'
  | 'releaseDate'
  | 'releaseNotes'
  | 'releaseNotesUrl'
  | 'releaseSummary'
  | 'screenshots'
  | 'sourceCodeLicenseUrl'
  | 'version'
  | 'visibility'
  | 'youtubeId'
  | MarketplaceAppVersionKeySpecifier
)[];
export type MarketplaceAppVersionFieldPolicy = {
  buildNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  deployment?: FieldPolicy<any> | FieldReadFunction<any>;
  documentationUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  endUserLicenseAgreementUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  heroImage?: FieldPolicy<any> | FieldReadFunction<any>;
  highlights?: FieldPolicy<any> | FieldReadFunction<any>;
  isSupported?: FieldPolicy<any> | FieldReadFunction<any>;
  learnMoreUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  licenseType?: FieldPolicy<any> | FieldReadFunction<any>;
  moreDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  paymentModel?: FieldPolicy<any> | FieldReadFunction<any>;
  productHostingOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  purchaseUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  releaseDate?: FieldPolicy<any> | FieldReadFunction<any>;
  releaseNotes?: FieldPolicy<any> | FieldReadFunction<any>;
  releaseNotesUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  releaseSummary?: FieldPolicy<any> | FieldReadFunction<any>;
  screenshots?: FieldPolicy<any> | FieldReadFunction<any>;
  sourceCodeLicenseUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  version?: FieldPolicy<any> | FieldReadFunction<any>;
  visibility?: FieldPolicy<any> | FieldReadFunction<any>;
  youtubeId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceAppDeploymentKeySpecifier = (
  | 'compatibleProducts'
  | MarketplaceAppDeploymentKeySpecifier
)[];
export type MarketplaceAppDeploymentFieldPolicy = {
  compatibleProducts?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompatibleAtlassianProductKeySpecifier = (
  | 'atlassianProduct'
  | 'id'
  | 'name'
  | CompatibleAtlassianProductKeySpecifier
)[];
export type CompatibleAtlassianProductFieldPolicy = {
  atlassianProduct?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceSupportedAtlassianProductKeySpecifier = (
  | 'hostingOptions'
  | 'id'
  | 'name'
  | MarketplaceSupportedAtlassianProductKeySpecifier
)[];
export type MarketplaceSupportedAtlassianProductFieldPolicy = {
  hostingOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceListingHighlightKeySpecifier = (
  | 'caption'
  | 'croppedScreenshot'
  | 'screenshot'
  | 'summary'
  | 'title'
  | MarketplaceListingHighlightKeySpecifier
)[];
export type MarketplaceListingHighlightFieldPolicy = {
  caption?: FieldPolicy<any> | FieldReadFunction<any>;
  croppedScreenshot?: FieldPolicy<any> | FieldReadFunction<any>;
  screenshot?: FieldPolicy<any> | FieldReadFunction<any>;
  summary?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceListingScreenshotKeySpecifier = (
  | 'caption'
  | 'image'
  | MarketplaceListingScreenshotKeySpecifier
)[];
export type MarketplaceListingScreenshotFieldPolicy = {
  caption?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceAppVersionLicenseTypeKeySpecifier = (
  | 'id'
  | 'link'
  | 'name'
  | MarketplaceAppVersionLicenseTypeKeySpecifier
)[];
export type MarketplaceAppVersionLicenseTypeFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  link?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceAppWatchersInfoKeySpecifier = (
  | 'isUserWatchingApp'
  | 'watchersCount'
  | MarketplaceAppWatchersInfoKeySpecifier
)[];
export type MarketplaceAppWatchersInfoFieldPolicy = {
  isUserWatchingApp?: FieldPolicy<any> | FieldReadFunction<any>;
  watchersCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppTunnelDefinitionsKeySpecifier = (
  | 'customUI'
  | 'faasTunnelUrl'
  | AppTunnelDefinitionsKeySpecifier
)[];
export type AppTunnelDefinitionsFieldPolicy = {
  customUI?: FieldPolicy<any> | FieldReadFunction<any>;
  faasTunnelUrl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CustomUITunnelDefinitionKeySpecifier = (
  | 'resourceKey'
  | 'tunnelUrl'
  | CustomUITunnelDefinitionKeySpecifier
)[];
export type CustomUITunnelDefinitionFieldPolicy = {
  resourceKey?: FieldPolicy<any> | FieldReadFunction<any>;
  tunnelUrl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppInstallationTaskKeySpecifier = (
  | 'appEnvironmentId'
  | 'appId'
  | 'errors'
  | 'id'
  | 'state'
  | AppInstallationTaskKeySpecifier
)[];
export type AppInstallationTaskFieldPolicy = {
  appEnvironmentId?: FieldPolicy<any> | FieldReadFunction<any>;
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationErrorKeySpecifier = (
  | 'extensions'
  | 'message'
  | MutationErrorKeySpecifier
)[];
export type MutationErrorFieldPolicy = {
  extensions?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationErrorExtensionKeySpecifier = (
  | 'errorType'
  | 'statusCode'
  | MutationErrorExtensionKeySpecifier
)[];
export type MutationErrorExtensionFieldPolicy = {
  errorType?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppLogLineConnectionKeySpecifier = (
  | 'edges'
  | 'metadata'
  | 'nodes'
  | 'pageInfo'
  | AppLogLineConnectionKeySpecifier
)[];
export type AppLogLineConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppLogLineEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | AppLogLineEdgeKeySpecifier
)[];
export type AppLogLineEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppLogLineKeySpecifier = (
  | 'level'
  | 'message'
  | 'other'
  | 'timestamp'
  | AppLogLineKeySpecifier
)[];
export type AppLogLineFieldPolicy = {
  level?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  other?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FunctionInvocationMetadataKeySpecifier = (
  | 'appVersion'
  | 'function'
  | 'id'
  | 'installationContext'
  | 'moduleType'
  | 'trigger'
  | FunctionInvocationMetadataKeySpecifier
)[];
export type FunctionInvocationMetadataFieldPolicy = {
  appVersion?: FieldPolicy<any> | FieldReadFunction<any>;
  function?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  installationContext?: FieldPolicy<any> | FieldReadFunction<any>;
  moduleType?: FieldPolicy<any> | FieldReadFunction<any>;
  trigger?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FunctionDescriptionKeySpecifier = (
  | 'key'
  | FunctionDescriptionKeySpecifier
)[];
export type FunctionDescriptionFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppInstallationContextKeySpecifier = (
  | 'id'
  | AppInstallationContextKeySpecifier
)[];
export type AppInstallationContextFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FunctionTriggerKeySpecifier = (
  | 'key'
  | 'type'
  | FunctionTriggerKeySpecifier
)[];
export type FunctionTriggerFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppLogConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | AppLogConnectionKeySpecifier
)[];
export type AppLogConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppLogEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | AppLogEdgeKeySpecifier
)[];
export type AppLogEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppLogKeySpecifier = (
  | 'appLogLines'
  | 'appVersion'
  | 'function'
  | 'id'
  | 'installationContext'
  | 'moduleType'
  | 'startTime'
  | 'trigger'
  | AppLogKeySpecifier
)[];
export type AppLogFieldPolicy = {
  appLogLines?: FieldPolicy<any> | FieldReadFunction<any>;
  appVersion?: FieldPolicy<any> | FieldReadFunction<any>;
  function?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  installationContext?: FieldPolicy<any> | FieldReadFunction<any>;
  moduleType?: FieldPolicy<any> | FieldReadFunction<any>;
  startTime?: FieldPolicy<any> | FieldReadFunction<any>;
  trigger?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppLogLinesKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | AppLogLinesKeySpecifier
)[];
export type AppLogLinesFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppStoredEntityConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | 'totalCount'
  | AppStoredEntityConnectionKeySpecifier
)[];
export type AppStoredEntityConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppStoredEntityEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | AppStoredEntityEdgeKeySpecifier
)[];
export type AppStoredEntityEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppStoredEntityKeySpecifier = (
  | 'key'
  | 'value'
  | AppStoredEntityKeySpecifier
)[];
export type AppStoredEntityFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppStoredEntityPageInfoKeySpecifier = (
  | 'hasNextPage'
  | 'hasPreviousPage'
  | AppStoredEntityPageInfoKeySpecifier
)[];
export type AppStoredEntityPageInfoFieldPolicy = {
  hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>;
  hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | 'totalCount'
  | AppConnectionKeySpecifier
)[];
export type AppConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppEdgeKeySpecifier = ('cursor' | 'node' | AppEdgeKeySpecifier)[];
export type AppEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BitbucketQueryKeySpecifier = (
  | 'bitbucketRepository'
  | 'bitbucketWorkspace'
  | BitbucketQueryKeySpecifier
)[];
export type BitbucketQueryFieldPolicy = {
  bitbucketRepository?: FieldPolicy<any> | FieldReadFunction<any>;
  bitbucketWorkspace?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BitbucketRepositoryKeySpecifier = (
  | 'avatar'
  | 'devOpsServiceRelationships'
  | 'id'
  | 'jiraProjectRelationships'
  | 'name'
  | 'webUrl'
  | 'workspace'
  | BitbucketRepositoryKeySpecifier
)[];
export type BitbucketRepositoryFieldPolicy = {
  avatar?: FieldPolicy<any> | FieldReadFunction<any>;
  devOpsServiceRelationships?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraProjectRelationships?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  webUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  workspace?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BitbucketRepositoryAvatarKeySpecifier = (
  | 'url'
  | BitbucketRepositoryAvatarKeySpecifier
)[];
export type BitbucketRepositoryAvatarFieldPolicy = {
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceAndRepositoryRelationshipConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | DevOpsServiceAndRepositoryRelationshipConnectionKeySpecifier
)[];
export type DevOpsServiceAndRepositoryRelationshipConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceAndRepositoryRelationshipEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | DevOpsServiceAndRepositoryRelationshipEdgeKeySpecifier
)[];
export type DevOpsServiceAndRepositoryRelationshipEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceAndRepositoryRelationshipKeySpecifier = (
  | 'bitbucketRepository'
  | 'createdAt'
  | 'createdBy'
  | 'description'
  | 'devOpsService'
  | 'id'
  | 'lastUpdatedAt'
  | 'lastUpdatedBy'
  | 'properties'
  | 'revision'
  | 'thirdPartyRepository'
  | DevOpsServiceAndRepositoryRelationshipKeySpecifier
)[];
export type DevOpsServiceAndRepositoryRelationshipFieldPolicy = {
  bitbucketRepository?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  createdBy?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  devOpsService?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdatedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  properties?: FieldPolicy<any> | FieldReadFunction<any>;
  revision?: FieldPolicy<any> | FieldReadFunction<any>;
  thirdPartyRepository?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceKeySpecifier = (
  | 'bitbucketRepositoriesAvailableToLinkWith'
  | 'cloudId'
  | 'containedByDevOpsServiceRelationship'
  | 'containsDevOpsServiceRelationships'
  | 'createdAt'
  | 'createdBy'
  | 'dependedOnByDevOpsServiceRelationships'
  | 'dependsOnDevOpsServiceRelationships'
  | 'description'
  | 'id'
  | 'jiraProjects'
  | 'lastUpdatedAt'
  | 'lastUpdatedBy'
  | 'name'
  | 'opsgenieTeamRelationship'
  | 'opsgenieTeamsAvailableToLinkWith'
  | 'organizationId'
  | 'properties'
  | 'repositoryRelationships'
  | 'revision'
  | 'serviceTier'
  | 'servicesAvailableToLinkWith'
  | DevOpsServiceKeySpecifier
)[];
export type DevOpsServiceFieldPolicy = {
  bitbucketRepositoriesAvailableToLinkWith?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  cloudId?: FieldPolicy<any> | FieldReadFunction<any>;
  containedByDevOpsServiceRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  containsDevOpsServiceRelationships?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  createdBy?: FieldPolicy<any> | FieldReadFunction<any>;
  dependedOnByDevOpsServiceRelationships?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  dependsOnDevOpsServiceRelationships?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraProjects?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdatedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  opsgenieTeamRelationship?: FieldPolicy<any> | FieldReadFunction<any>;
  opsgenieTeamsAvailableToLinkWith?: FieldPolicy<any> | FieldReadFunction<any>;
  organizationId?: FieldPolicy<any> | FieldReadFunction<any>;
  properties?: FieldPolicy<any> | FieldReadFunction<any>;
  repositoryRelationships?: FieldPolicy<any> | FieldReadFunction<any>;
  revision?: FieldPolicy<any> | FieldReadFunction<any>;
  serviceTier?: FieldPolicy<any> | FieldReadFunction<any>;
  servicesAvailableToLinkWith?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BitbucketRepositoryIdConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | BitbucketRepositoryIdConnectionKeySpecifier
)[];
export type BitbucketRepositoryIdConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BitbucketRepositoryIdEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | BitbucketRepositoryIdEdgeKeySpecifier
)[];
export type BitbucketRepositoryIdEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceRelationshipKeySpecifier = (
  | 'cloudId'
  | 'createdAt'
  | 'createdBy'
  | 'description'
  | 'endService'
  | 'id'
  | 'lastUpdatedAt'
  | 'lastUpdatedBy'
  | 'organizationId'
  | 'properties'
  | 'revision'
  | 'startService'
  | 'type'
  | DevOpsServiceRelationshipKeySpecifier
)[];
export type DevOpsServiceRelationshipFieldPolicy = {
  cloudId?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  createdBy?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  endService?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdatedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  organizationId?: FieldPolicy<any> | FieldReadFunction<any>;
  properties?: FieldPolicy<any> | FieldReadFunction<any>;
  revision?: FieldPolicy<any> | FieldReadFunction<any>;
  startService?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceRelationshipConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | 'totalCount'
  | DevOpsServiceRelationshipConnectionKeySpecifier
)[];
export type DevOpsServiceRelationshipConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceRelationshipEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | DevOpsServiceRelationshipEdgeKeySpecifier
)[];
export type DevOpsServiceRelationshipEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceAndJiraProjectRelationshipConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | DevOpsServiceAndJiraProjectRelationshipConnectionKeySpecifier
)[];
export type DevOpsServiceAndJiraProjectRelationshipConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceAndJiraProjectRelationshipEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | DevOpsServiceAndJiraProjectRelationshipEdgeKeySpecifier
)[];
export type DevOpsServiceAndJiraProjectRelationshipEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceAndJiraProjectRelationshipKeySpecifier = (
  | 'createdAt'
  | 'createdBy'
  | 'description'
  | 'devOpsService'
  | 'id'
  | 'jiraProject'
  | 'lastUpdatedAt'
  | 'lastUpdatedBy'
  | 'properties'
  | 'relationshipType'
  | 'revision'
  | DevOpsServiceAndJiraProjectRelationshipKeySpecifier
)[];
export type DevOpsServiceAndJiraProjectRelationshipFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  createdBy?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  devOpsService?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraProject?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdatedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  properties?: FieldPolicy<any> | FieldReadFunction<any>;
  relationshipType?: FieldPolicy<any> | FieldReadFunction<any>;
  revision?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectKeySpecifier = (
  | 'avatar'
  | 'category'
  | 'cloudId'
  | 'description'
  | 'devOpsServiceRelationships'
  | 'id'
  | 'key'
  | 'leadId'
  | 'name'
  | 'opsgenieTeamRelationships'
  | 'opsgenieTeamsAvailableToLinkWith'
  | 'projectUrl'
  | 'repositoryRelationships'
  | 'servicesAvailableToLinkWith'
  | JiraProjectKeySpecifier
)[];
export type JiraProjectFieldPolicy = {
  avatar?: FieldPolicy<any> | FieldReadFunction<any>;
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  cloudId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  devOpsServiceRelationships?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  leadId?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  opsgenieTeamRelationships?: FieldPolicy<any> | FieldReadFunction<any>;
  opsgenieTeamsAvailableToLinkWith?: FieldPolicy<any> | FieldReadFunction<any>;
  projectUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  repositoryRelationships?: FieldPolicy<any> | FieldReadFunction<any>;
  servicesAvailableToLinkWith?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAvatarKeySpecifier = (
  | 'large'
  | 'medium'
  | 'small'
  | 'xsmall'
  | JiraAvatarKeySpecifier
)[];
export type JiraAvatarFieldPolicy = {
  large?: FieldPolicy<any> | FieldReadFunction<any>;
  medium?: FieldPolicy<any> | FieldReadFunction<any>;
  small?: FieldPolicy<any> | FieldReadFunction<any>;
  xsmall?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectCategoryKeySpecifier = (
  | 'description'
  | 'id'
  | 'name'
  | JiraProjectCategoryKeySpecifier
)[];
export type JiraProjectCategoryFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectAndOpsgenieTeamRelationshipConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | JiraProjectAndOpsgenieTeamRelationshipConnectionKeySpecifier
)[];
export type JiraProjectAndOpsgenieTeamRelationshipConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectAndOpsgenieTeamRelationshipEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraProjectAndOpsgenieTeamRelationshipEdgeKeySpecifier
)[];
export type JiraProjectAndOpsgenieTeamRelationshipEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectAndOpsgenieTeamRelationshipKeySpecifier = (
  | 'createdAt'
  | 'createdBy'
  | 'description'
  | 'id'
  | 'jiraProject'
  | 'jiraProjectType'
  | 'lastUpdatedAt'
  | 'lastUpdatedBy'
  | 'opsgenieTeam'
  | 'properties'
  | 'revision'
  | JiraProjectAndOpsgenieTeamRelationshipKeySpecifier
)[];
export type JiraProjectAndOpsgenieTeamRelationshipFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  createdBy?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraProject?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraProjectType?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdatedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  opsgenieTeam?: FieldPolicy<any> | FieldReadFunction<any>;
  properties?: FieldPolicy<any> | FieldReadFunction<any>;
  revision?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpsgenieTeamKeySpecifier = (
  | 'alertCounts'
  | 'createdAt'
  | 'description'
  | 'devOpsServiceRelationships'
  | 'id'
  | 'jiraProjectRelationships'
  | 'members'
  | 'name'
  | 'schedules'
  | 'updatedAt'
  | 'url'
  | OpsgenieTeamKeySpecifier
)[];
export type OpsgenieTeamFieldPolicy = {
  alertCounts?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  devOpsServiceRelationships?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraProjectRelationships?: FieldPolicy<any> | FieldReadFunction<any>;
  members?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  schedules?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpsgenieAlertCountByPriorityKeySpecifier = (
  | 'countPerDay'
  | 'priority'
  | OpsgenieAlertCountByPriorityKeySpecifier
)[];
export type OpsgenieAlertCountByPriorityFieldPolicy = {
  countPerDay?: FieldPolicy<any> | FieldReadFunction<any>;
  priority?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpsgenieAlertCountPerDayKeySpecifier = (
  | 'count'
  | 'day'
  | OpsgenieAlertCountPerDayKeySpecifier
)[];
export type OpsgenieAlertCountPerDayFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  day?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceAndOpsgenieTeamRelationshipConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | DevOpsServiceAndOpsgenieTeamRelationshipConnectionKeySpecifier
)[];
export type DevOpsServiceAndOpsgenieTeamRelationshipConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceAndOpsgenieTeamRelationshipEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | DevOpsServiceAndOpsgenieTeamRelationshipEdgeKeySpecifier
)[];
export type DevOpsServiceAndOpsgenieTeamRelationshipEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceAndOpsgenieTeamRelationshipKeySpecifier = (
  | 'createdAt'
  | 'createdBy'
  | 'description'
  | 'devOpsService'
  | 'id'
  | 'lastUpdatedAt'
  | 'lastUpdatedBy'
  | 'opsgenieTeam'
  | 'opsgenieTeamId'
  | 'properties'
  | 'revision'
  | DevOpsServiceAndOpsgenieTeamRelationshipKeySpecifier
)[];
export type DevOpsServiceAndOpsgenieTeamRelationshipFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  createdBy?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  devOpsService?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdatedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  opsgenieTeam?: FieldPolicy<any> | FieldReadFunction<any>;
  opsgenieTeamId?: FieldPolicy<any> | FieldReadFunction<any>;
  properties?: FieldPolicy<any> | FieldReadFunction<any>;
  revision?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpsgenieTeamMemberConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | OpsgenieTeamMemberConnectionKeySpecifier
)[];
export type OpsgenieTeamMemberConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpsgenieTeamMemberEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | OpsgenieTeamMemberEdgeKeySpecifier
)[];
export type OpsgenieTeamMemberEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpsgenieTeamMemberKeySpecifier = (
  | 'user'
  | OpsgenieTeamMemberKeySpecifier
)[];
export type OpsgenieTeamMemberFieldPolicy = {
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpsgenieScheduleKeySpecifier = (
  | 'enabled'
  | 'finalTimeline'
  | 'id'
  | 'name'
  | 'timezone'
  | OpsgenieScheduleKeySpecifier
)[];
export type OpsgenieScheduleFieldPolicy = {
  enabled?: FieldPolicy<any> | FieldReadFunction<any>;
  finalTimeline?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  timezone?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpsgenieScheduleTimelineKeySpecifier = (
  | 'endDate'
  | 'rotations'
  | 'startDate'
  | OpsgenieScheduleTimelineKeySpecifier
)[];
export type OpsgenieScheduleTimelineFieldPolicy = {
  endDate?: FieldPolicy<any> | FieldReadFunction<any>;
  rotations?: FieldPolicy<any> | FieldReadFunction<any>;
  startDate?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpsgenieScheduleRotationKeySpecifier = (
  | 'id'
  | 'name'
  | 'order'
  | 'periods'
  | OpsgenieScheduleRotationKeySpecifier
)[];
export type OpsgenieScheduleRotationFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  order?: FieldPolicy<any> | FieldReadFunction<any>;
  periods?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpsgenieSchedulePeriodKeySpecifier = (
  | 'endDate'
  | 'recipient'
  | 'startDate'
  | 'type'
  | OpsgenieSchedulePeriodKeySpecifier
)[];
export type OpsgenieSchedulePeriodFieldPolicy = {
  endDate?: FieldPolicy<any> | FieldReadFunction<any>;
  recipient?: FieldPolicy<any> | FieldReadFunction<any>;
  startDate?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpsgenieSchedulePeriodRecipientKeySpecifier = (
  | 'id'
  | 'type'
  | 'user'
  | OpsgenieSchedulePeriodRecipientKeySpecifier
)[];
export type OpsgenieSchedulePeriodRecipientFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpsgenieTeamConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | OpsgenieTeamConnectionKeySpecifier
)[];
export type OpsgenieTeamConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpsgenieTeamEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | OpsgenieTeamEdgeKeySpecifier
)[];
export type OpsgenieTeamEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectAndRepositoryRelationshipConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | JiraProjectAndRepositoryRelationshipConnectionKeySpecifier
)[];
export type JiraProjectAndRepositoryRelationshipConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectAndRepositoryRelationshipEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraProjectAndRepositoryRelationshipEdgeKeySpecifier
)[];
export type JiraProjectAndRepositoryRelationshipEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectAndRepositoryRelationshipKeySpecifier = (
  | 'bitbucketRepository'
  | 'certainty'
  | 'createdAt'
  | 'createdBy'
  | 'description'
  | 'id'
  | 'jiraProject'
  | 'lastInferredAt'
  | 'lastInferredBy'
  | 'lastUpdatedAt'
  | 'lastUpdatedBy'
  | 'properties'
  | 'revision'
  | 'thirdPartyRepository'
  | JiraProjectAndRepositoryRelationshipKeySpecifier
)[];
export type JiraProjectAndRepositoryRelationshipFieldPolicy = {
  bitbucketRepository?: FieldPolicy<any> | FieldReadFunction<any>;
  certainty?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  createdBy?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraProject?: FieldPolicy<any> | FieldReadFunction<any>;
  lastInferredAt?: FieldPolicy<any> | FieldReadFunction<any>;
  lastInferredBy?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdatedBy?: FieldPolicy<any> | FieldReadFunction<any>;
  properties?: FieldPolicy<any> | FieldReadFunction<any>;
  revision?: FieldPolicy<any> | FieldReadFunction<any>;
  thirdPartyRepository?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsThirdPartyRepositoryKeySpecifier = (
  | 'avatar'
  | 'id'
  | 'name'
  | 'webUrl'
  | DevOpsThirdPartyRepositoryKeySpecifier
)[];
export type DevOpsThirdPartyRepositoryFieldPolicy = {
  avatar?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  webUrl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsAvatarKeySpecifier = (
  | 'description'
  | 'url'
  | DevOpsAvatarKeySpecifier
)[];
export type DevOpsAvatarFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | 'totalCount'
  | DevOpsServiceConnectionKeySpecifier
)[];
export type DevOpsServiceConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | DevOpsServiceEdgeKeySpecifier
)[];
export type DevOpsServiceEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsServiceTierKeySpecifier = (
  | 'description'
  | 'id'
  | 'level'
  | 'name'
  | 'nameKey'
  | DevOpsServiceTierKeySpecifier
)[];
export type DevOpsServiceTierFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  level?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  nameKey?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BitbucketWorkspaceKeySpecifier = (
  | 'id'
  | 'name'
  | 'repositories'
  | BitbucketWorkspaceKeySpecifier
)[];
export type BitbucketWorkspaceFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  repositories?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BitbucketRepositoryConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | BitbucketRepositoryConnectionKeySpecifier
)[];
export type BitbucketRepositoryConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BitbucketRepositoryEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | BitbucketRepositoryEdgeKeySpecifier
)[];
export type BitbucketRepositoryEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BoardScopeKeySpecifier = (
  | 'backlog'
  | 'board'
  | 'cardParents'
  | 'cards'
  | 'currentUser'
  | 'customFilters'
  | 'estimation'
  | 'featureGroups'
  | 'features'
  | 'filteredCardIds'
  | 'projectLocation'
  | 'reports'
  | 'sprint'
  | 'sprints'
  | 'userSwimlaneStrategy'
  | BoardScopeKeySpecifier
)[];
export type BoardScopeFieldPolicy = {
  backlog?: FieldPolicy<any> | FieldReadFunction<any>;
  board?: FieldPolicy<any> | FieldReadFunction<any>;
  cardParents?: FieldPolicy<any> | FieldReadFunction<any>;
  cards?: FieldPolicy<any> | FieldReadFunction<any>;
  currentUser?: FieldPolicy<any> | FieldReadFunction<any>;
  customFilters?: FieldPolicy<any> | FieldReadFunction<any>;
  estimation?: FieldPolicy<any> | FieldReadFunction<any>;
  featureGroups?: FieldPolicy<any> | FieldReadFunction<any>;
  features?: FieldPolicy<any> | FieldReadFunction<any>;
  filteredCardIds?: FieldPolicy<any> | FieldReadFunction<any>;
  projectLocation?: FieldPolicy<any> | FieldReadFunction<any>;
  reports?: FieldPolicy<any> | FieldReadFunction<any>;
  sprint?: FieldPolicy<any> | FieldReadFunction<any>;
  sprints?: FieldPolicy<any> | FieldReadFunction<any>;
  userSwimlaneStrategy?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BacklogKeySpecifier = (
  | 'assignees'
  | 'boardIssueListKey'
  | 'cardTypes'
  | 'cards'
  | 'extension'
  | 'labels'
  | 'requestColumnMigration'
  | BacklogKeySpecifier
)[];
export type BacklogFieldPolicy = {
  assignees?: FieldPolicy<any> | FieldReadFunction<any>;
  boardIssueListKey?: FieldPolicy<any> | FieldReadFunction<any>;
  cardTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  cards?: FieldPolicy<any> | FieldReadFunction<any>;
  extension?: FieldPolicy<any> | FieldReadFunction<any>;
  labels?: FieldPolicy<any> | FieldReadFunction<any>;
  requestColumnMigration?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CardTypeKeySpecifier = (
  | 'hierarchyLevelType'
  | 'iconUrl'
  | 'id'
  | 'inlineCardCreate'
  | 'name'
  | CardTypeKeySpecifier
)[];
export type CardTypeFieldPolicy = {
  hierarchyLevelType?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  inlineCardCreate?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type InlineCardCreateConfigKeySpecifier = (
  | 'enabled'
  | 'useGlobalCreate'
  | InlineCardCreateConfigKeySpecifier
)[];
export type InlineCardCreateConfigFieldPolicy = {
  enabled?: FieldPolicy<any> | FieldReadFunction<any>;
  useGlobalCreate?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SoftwareCardKeySpecifier = (
  | 'assignee'
  | 'childCardsMetadata'
  | 'childrenIds'
  | 'coverMedia'
  | 'devStatus'
  | 'done'
  | 'dueDate'
  | 'estimate'
  | 'fixVersionsIds'
  | 'flagged'
  | 'id'
  | 'key'
  | 'labels'
  | 'parentId'
  | 'priority'
  | 'status'
  | 'summary'
  | 'type'
  | SoftwareCardKeySpecifier
)[];
export type SoftwareCardFieldPolicy = {
  assignee?: FieldPolicy<any> | FieldReadFunction<any>;
  childCardsMetadata?: FieldPolicy<any> | FieldReadFunction<any>;
  childrenIds?: FieldPolicy<any> | FieldReadFunction<any>;
  coverMedia?: FieldPolicy<any> | FieldReadFunction<any>;
  devStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  done?: FieldPolicy<any> | FieldReadFunction<any>;
  dueDate?: FieldPolicy<any> | FieldReadFunction<any>;
  estimate?: FieldPolicy<any> | FieldReadFunction<any>;
  fixVersionsIds?: FieldPolicy<any> | FieldReadFunction<any>;
  flagged?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  labels?: FieldPolicy<any> | FieldReadFunction<any>;
  parentId?: FieldPolicy<any> | FieldReadFunction<any>;
  priority?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  summary?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ChildCardsMetadataKeySpecifier = (
  | 'complete'
  | 'total'
  | ChildCardsMetadataKeySpecifier
)[];
export type ChildCardsMetadataFieldPolicy = {
  complete?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CardCoverMediaKeySpecifier = (
  | 'attachmentId'
  | 'attachmentMediaApiId'
  | 'clientId'
  | 'endpointUrl'
  | 'hiddenByUser'
  | 'token'
  | CardCoverMediaKeySpecifier
)[];
export type CardCoverMediaFieldPolicy = {
  attachmentId?: FieldPolicy<any> | FieldReadFunction<any>;
  attachmentMediaApiId?: FieldPolicy<any> | FieldReadFunction<any>;
  clientId?: FieldPolicy<any> | FieldReadFunction<any>;
  endpointUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  hiddenByUser?: FieldPolicy<any> | FieldReadFunction<any>;
  token?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevStatusKeySpecifier = (
  | 'activity'
  | 'count'
  | DevStatusKeySpecifier
)[];
export type DevStatusFieldPolicy = {
  activity?: FieldPolicy<any> | FieldReadFunction<any>;
  count?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EstimateKeySpecifier = (
  | 'originalEstimate'
  | 'storyPoints'
  | EstimateKeySpecifier
)[];
export type EstimateFieldPolicy = {
  originalEstimate?: FieldPolicy<any> | FieldReadFunction<any>;
  storyPoints?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OriginalEstimateKeySpecifier = (
  | 'value'
  | 'valueAsText'
  | OriginalEstimateKeySpecifier
)[];
export type OriginalEstimateFieldPolicy = {
  value?: FieldPolicy<any> | FieldReadFunction<any>;
  valueAsText?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CardPriorityKeySpecifier = (
  | 'iconUrl'
  | 'name'
  | CardPriorityKeySpecifier
)[];
export type CardPriorityFieldPolicy = {
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CardStatusKeySpecifier = (
  | 'category'
  | 'id'
  | 'name'
  | CardStatusKeySpecifier
)[];
export type CardStatusFieldPolicy = {
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BacklogExtensionKeySpecifier = (
  | 'operations'
  | BacklogExtensionKeySpecifier
)[];
export type BacklogExtensionFieldPolicy = {
  operations?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SoftwareOperationKeySpecifier = (
  | 'icon'
  | 'name'
  | 'styleClass'
  | 'tooltip'
  | 'url'
  | SoftwareOperationKeySpecifier
)[];
export type SoftwareOperationFieldPolicy = {
  icon?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  styleClass?: FieldPolicy<any> | FieldReadFunction<any>;
  tooltip?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IconKeySpecifier = ('url' | IconKeySpecifier)[];
export type IconFieldPolicy = {
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SoftwareBoardKeySpecifier = (
  | 'assignees'
  | 'cardChildren'
  | 'cardMedia'
  | 'cardTypes'
  | 'cards'
  | 'columns'
  | 'editConfig'
  | 'hasClearedCards'
  | 'id'
  | 'inlineCardCreate'
  | 'labels'
  | 'name'
  | 'rankCustomFieldId'
  | 'swimlaneStrategy'
  | 'swimlanes'
  | 'userSwimlanes'
  | SoftwareBoardKeySpecifier
)[];
export type SoftwareBoardFieldPolicy = {
  assignees?: FieldPolicy<any> | FieldReadFunction<any>;
  cardChildren?: FieldPolicy<any> | FieldReadFunction<any>;
  cardMedia?: FieldPolicy<any> | FieldReadFunction<any>;
  cardTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  cards?: FieldPolicy<any> | FieldReadFunction<any>;
  columns?: FieldPolicy<any> | FieldReadFunction<any>;
  editConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  hasClearedCards?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  inlineCardCreate?: FieldPolicy<any> | FieldReadFunction<any>;
  labels?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  rankCustomFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  swimlaneStrategy?: FieldPolicy<any> | FieldReadFunction<any>;
  swimlanes?: FieldPolicy<any> | FieldReadFunction<any>;
  userSwimlanes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CardMediaConfigKeySpecifier = (
  | 'enabled'
  | CardMediaConfigKeySpecifier
)[];
export type CardMediaConfigFieldPolicy = {
  enabled?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ColumnKeySpecifier = (
  | 'cards'
  | 'columnStatus'
  | 'id'
  | 'isDone'
  | 'isInitial'
  | 'maxCardCount'
  | 'name'
  | ColumnKeySpecifier
)[];
export type ColumnFieldPolicy = {
  cards?: FieldPolicy<any> | FieldReadFunction<any>;
  columnStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isDone?: FieldPolicy<any> | FieldReadFunction<any>;
  isInitial?: FieldPolicy<any> | FieldReadFunction<any>;
  maxCardCount?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ColumnStatusKeySpecifier = (
  | 'cardTypeTransitions'
  | 'status'
  | 'transitions'
  | ColumnStatusKeySpecifier
)[];
export type ColumnStatusFieldPolicy = {
  cardTypeTransitions?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  transitions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SoftwareCardTypeTransitionKeySpecifier = (
  | 'cardType'
  | 'hasConditions'
  | 'isGlobal'
  | 'isInitial'
  | 'name'
  | 'originStatus'
  | 'status'
  | 'transitionId'
  | SoftwareCardTypeTransitionKeySpecifier
)[];
export type SoftwareCardTypeTransitionFieldPolicy = {
  cardType?: FieldPolicy<any> | FieldReadFunction<any>;
  hasConditions?: FieldPolicy<any> | FieldReadFunction<any>;
  isGlobal?: FieldPolicy<any> | FieldReadFunction<any>;
  isInitial?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  originStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  transitionId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SoftwareCardTransitionKeySpecifier = (
  | 'cardType'
  | 'hasConditions'
  | 'id'
  | 'isGlobal'
  | 'isInitial'
  | 'name'
  | 'originStatus'
  | 'status'
  | SoftwareCardTransitionKeySpecifier
)[];
export type SoftwareCardTransitionFieldPolicy = {
  cardType?: FieldPolicy<any> | FieldReadFunction<any>;
  hasConditions?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isGlobal?: FieldPolicy<any> | FieldReadFunction<any>;
  isInitial?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  originStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BoardEditConfigKeySpecifier = (
  | 'inlineCardCreate'
  | 'inlineColumnEdit'
  | BoardEditConfigKeySpecifier
)[];
export type BoardEditConfigFieldPolicy = {
  inlineCardCreate?: FieldPolicy<any> | FieldReadFunction<any>;
  inlineColumnEdit?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type InlineColumnEditConfigKeySpecifier = (
  | 'enabled'
  | InlineColumnEditConfigKeySpecifier
)[];
export type InlineColumnEditConfigFieldPolicy = {
  enabled?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SwimlaneKeySpecifier = (
  | 'allowedCardTypes'
  | 'columnsInSwimlane'
  | 'iconUrl'
  | 'id'
  | 'name'
  | SwimlaneKeySpecifier
)[];
export type SwimlaneFieldPolicy = {
  allowedCardTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  columnsInSwimlane?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ColumnInSwimlaneKeySpecifier = (
  | 'cards'
  | 'columnDetails'
  | ColumnInSwimlaneKeySpecifier
)[];
export type ColumnInSwimlaneFieldPolicy = {
  cards?: FieldPolicy<any> | FieldReadFunction<any>;
  columnDetails?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CardParentKeySpecifier = (
  | 'cardType'
  | 'childrenInfo'
  | 'color'
  | 'dueDate'
  | 'id'
  | 'key'
  | 'startDate'
  | 'status'
  | 'summary'
  | CardParentKeySpecifier
)[];
export type CardParentFieldPolicy = {
  cardType?: FieldPolicy<any> | FieldReadFunction<any>;
  childrenInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  color?: FieldPolicy<any> | FieldReadFunction<any>;
  dueDate?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  startDate?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  summary?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SoftwareCardChildrenInfoKeySpecifier = (
  | 'doneStats'
  | 'inProgressStats'
  | 'lastColumnIssueStats'
  | 'todoStats'
  | SoftwareCardChildrenInfoKeySpecifier
)[];
export type SoftwareCardChildrenInfoFieldPolicy = {
  doneStats?: FieldPolicy<any> | FieldReadFunction<any>;
  inProgressStats?: FieldPolicy<any> | FieldReadFunction<any>;
  lastColumnIssueStats?: FieldPolicy<any> | FieldReadFunction<any>;
  todoStats?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SoftwareCardChildrenInfoStatsKeySpecifier = (
  | 'cardCount'
  | SoftwareCardChildrenInfoStatsKeySpecifier
)[];
export type SoftwareCardChildrenInfoStatsFieldPolicy = {
  cardCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CurrentUserKeySpecifier = (
  | 'permissions'
  | CurrentUserKeySpecifier
)[];
export type CurrentUserFieldPolicy = {
  permissions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CustomFilterKeySpecifier = (
  | 'description'
  | 'filterQuery'
  | 'id'
  | 'name'
  | CustomFilterKeySpecifier
)[];
export type CustomFilterFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  filterQuery?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type FilterQueryKeySpecifier = (
  | 'errors'
  | 'sanitisedJql'
  | FilterQueryKeySpecifier
)[];
export type FilterQueryFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  sanitisedJql?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EstimationConfigKeySpecifier = (
  | 'available'
  | 'current'
  | EstimationConfigKeySpecifier
)[];
export type EstimationConfigFieldPolicy = {
  available?: FieldPolicy<any> | FieldReadFunction<any>;
  current?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AvailableEstimationsKeySpecifier = (
  | 'name'
  | 'statisticFieldId'
  | AvailableEstimationsKeySpecifier
)[];
export type AvailableEstimationsFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  statisticFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CurrentEstimationKeySpecifier = (
  | 'customFieldId'
  | 'name'
  | CurrentEstimationKeySpecifier
)[];
export type CurrentEstimationFieldPolicy = {
  customFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BoardFeatureGroupConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | BoardFeatureGroupConnectionKeySpecifier
)[];
export type BoardFeatureGroupConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BoardFeatureGroupEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | 'order'
  | BoardFeatureGroupEdgeKeySpecifier
)[];
export type BoardFeatureGroupEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  order?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BoardFeatureGroupKeySpecifier = (
  | 'features'
  | 'id'
  | 'name'
  | BoardFeatureGroupKeySpecifier
)[];
export type BoardFeatureGroupFieldPolicy = {
  features?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BoardFeatureConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | BoardFeatureConnectionKeySpecifier
)[];
export type BoardFeatureConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BoardFeatureEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | 'order'
  | BoardFeatureEdgeKeySpecifier
)[];
export type BoardFeatureEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  order?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BoardFeatureViewKeySpecifier = (
  | 'canEnable'
  | 'description'
  | 'id'
  | 'isEnabled'
  | 'title'
  | BoardFeatureViewKeySpecifier
)[];
export type BoardFeatureViewFieldPolicy = {
  canEnable?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isEnabled?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BoardFeatureKeySpecifier = (
  | 'category'
  | 'key'
  | 'prerequisites'
  | 'status'
  | 'toggle'
  | BoardFeatureKeySpecifier
)[];
export type BoardFeatureFieldPolicy = {
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  prerequisites?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  toggle?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SoftwareProjectKeySpecifier = (
  | 'cardTypes'
  | 'id'
  | 'key'
  | 'name'
  | SoftwareProjectKeySpecifier
)[];
export type SoftwareProjectFieldPolicy = {
  cardTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SoftwareReportsKeySpecifier = (
  | 'burndownChart'
  | 'cumulativeFlowDiagram'
  | 'overview'
  | SoftwareReportsKeySpecifier
)[];
export type SoftwareReportsFieldPolicy = {
  burndownChart?: FieldPolicy<any> | FieldReadFunction<any>;
  cumulativeFlowDiagram?: FieldPolicy<any> | FieldReadFunction<any>;
  overview?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BurndownChartKeySpecifier = (
  | 'chart'
  | 'filters'
  | BurndownChartKeySpecifier
)[];
export type BurndownChartFieldPolicy = {
  chart?: FieldPolicy<any> | FieldReadFunction<any>;
  filters?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BurndownChartDataKeySpecifier = (
  | 'endTime'
  | 'scopeChangeEvents'
  | 'sprintEndEvent'
  | 'sprintStartEvent'
  | 'startTime'
  | 'table'
  | 'timeZone'
  | BurndownChartDataKeySpecifier
)[];
export type BurndownChartDataFieldPolicy = {
  endTime?: FieldPolicy<any> | FieldReadFunction<any>;
  scopeChangeEvents?: FieldPolicy<any> | FieldReadFunction<any>;
  sprintEndEvent?: FieldPolicy<any> | FieldReadFunction<any>;
  sprintStartEvent?: FieldPolicy<any> | FieldReadFunction<any>;
  startTime?: FieldPolicy<any> | FieldReadFunction<any>;
  table?: FieldPolicy<any> | FieldReadFunction<any>;
  timeZone?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SprintScopeChangeDataKeySpecifier = (
  | 'completion'
  | 'estimate'
  | 'eventType'
  | 'issueKey'
  | 'issueSummary'
  | 'prevCompletion'
  | 'prevEstimate'
  | 'prevRemaining'
  | 'prevScope'
  | 'remaining'
  | 'scope'
  | 'timestamp'
  | SprintScopeChangeDataKeySpecifier
)[];
export type SprintScopeChangeDataFieldPolicy = {
  completion?: FieldPolicy<any> | FieldReadFunction<any>;
  estimate?: FieldPolicy<any> | FieldReadFunction<any>;
  eventType?: FieldPolicy<any> | FieldReadFunction<any>;
  issueKey?: FieldPolicy<any> | FieldReadFunction<any>;
  issueSummary?: FieldPolicy<any> | FieldReadFunction<any>;
  prevCompletion?: FieldPolicy<any> | FieldReadFunction<any>;
  prevEstimate?: FieldPolicy<any> | FieldReadFunction<any>;
  prevRemaining?: FieldPolicy<any> | FieldReadFunction<any>;
  prevScope?: FieldPolicy<any> | FieldReadFunction<any>;
  remaining?: FieldPolicy<any> | FieldReadFunction<any>;
  scope?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SprintEndDataKeySpecifier = (
  | 'issueList'
  | 'remainingEstimate'
  | 'timestamp'
  | SprintEndDataKeySpecifier
)[];
export type SprintEndDataFieldPolicy = {
  issueList?: FieldPolicy<any> | FieldReadFunction<any>;
  remainingEstimate?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ScopeSprintIssueKeySpecifier = (
  | 'estimate'
  | 'issueKey'
  | 'issueSummary'
  | ScopeSprintIssueKeySpecifier
)[];
export type ScopeSprintIssueFieldPolicy = {
  estimate?: FieldPolicy<any> | FieldReadFunction<any>;
  issueKey?: FieldPolicy<any> | FieldReadFunction<any>;
  issueSummary?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SprintStartDataKeySpecifier = (
  | 'issueList'
  | 'scopeEstimate'
  | 'timestamp'
  | SprintStartDataKeySpecifier
)[];
export type SprintStartDataFieldPolicy = {
  issueList?: FieldPolicy<any> | FieldReadFunction<any>;
  scopeEstimate?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BurndownChartDataTableKeySpecifier = (
  | 'completedIssues'
  | 'completedIssuesOutsideOfSprint'
  | 'incompleteIssues'
  | 'issuesRemovedFromSprint'
  | 'scopeChanges'
  | BurndownChartDataTableKeySpecifier
)[];
export type BurndownChartDataTableFieldPolicy = {
  completedIssues?: FieldPolicy<any> | FieldReadFunction<any>;
  completedIssuesOutsideOfSprint?: FieldPolicy<any> | FieldReadFunction<any>;
  incompleteIssues?: FieldPolicy<any> | FieldReadFunction<any>;
  issuesRemovedFromSprint?: FieldPolicy<any> | FieldReadFunction<any>;
  scopeChanges?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BurndownChartDataTableIssueRowKeySpecifier = (
  | 'assignee'
  | 'cardParent'
  | 'cardStatus'
  | 'cardType'
  | 'estimate'
  | 'issueKey'
  | 'issueSummary'
  | BurndownChartDataTableIssueRowKeySpecifier
)[];
export type BurndownChartDataTableIssueRowFieldPolicy = {
  assignee?: FieldPolicy<any> | FieldReadFunction<any>;
  cardParent?: FieldPolicy<any> | FieldReadFunction<any>;
  cardStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  cardType?: FieldPolicy<any> | FieldReadFunction<any>;
  estimate?: FieldPolicy<any> | FieldReadFunction<any>;
  issueKey?: FieldPolicy<any> | FieldReadFunction<any>;
  issueSummary?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BurndownChartDataTableScopeChangeRowKeySpecifier = (
  | 'cardParent'
  | 'cardType'
  | 'sprintScopeChange'
  | 'timestamp'
  | BurndownChartDataTableScopeChangeRowKeySpecifier
)[];
export type BurndownChartDataTableScopeChangeRowFieldPolicy = {
  cardParent?: FieldPolicy<any> | FieldReadFunction<any>;
  cardType?: FieldPolicy<any> | FieldReadFunction<any>;
  sprintScopeChange?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SprintReportsFiltersKeySpecifier = (
  | 'estimationStatistic'
  | 'sprints'
  | SprintReportsFiltersKeySpecifier
)[];
export type SprintReportsFiltersFieldPolicy = {
  estimationStatistic?: FieldPolicy<any> | FieldReadFunction<any>;
  sprints?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SprintKeySpecifier = (
  | 'cards'
  | 'daysRemaining'
  | 'endDate'
  | 'goal'
  | 'id'
  | 'name'
  | 'sprintMetadata'
  | 'sprintState'
  | 'startDate'
  | SprintKeySpecifier
)[];
export type SprintFieldPolicy = {
  cards?: FieldPolicy<any> | FieldReadFunction<any>;
  daysRemaining?: FieldPolicy<any> | FieldReadFunction<any>;
  endDate?: FieldPolicy<any> | FieldReadFunction<any>;
  goal?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  sprintMetadata?: FieldPolicy<any> | FieldReadFunction<any>;
  sprintState?: FieldPolicy<any> | FieldReadFunction<any>;
  startDate?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SoftwareSprintMetadataKeySpecifier = (
  | 'numCompletedIssues'
  | 'numOpenIssues'
  | 'top100CompletedCardKeysWithIncompleteChildren'
  | SoftwareSprintMetadataKeySpecifier
)[];
export type SoftwareSprintMetadataFieldPolicy = {
  numCompletedIssues?: FieldPolicy<any> | FieldReadFunction<any>;
  numOpenIssues?: FieldPolicy<any> | FieldReadFunction<any>;
  top100CompletedCardKeysWithIncompleteChildren?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
};
export type CumulativeFlowDiagramKeySpecifier = (
  | 'chart'
  | 'filters'
  | CumulativeFlowDiagramKeySpecifier
)[];
export type CumulativeFlowDiagramFieldPolicy = {
  chart?: FieldPolicy<any> | FieldReadFunction<any>;
  filters?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CFDChartConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | CFDChartConnectionKeySpecifier
)[];
export type CFDChartConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CFDChartEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | CFDChartEdgeKeySpecifier
)[];
export type CFDChartEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CFDChartDataKeySpecifier = (
  | 'changes'
  | 'columnCounts'
  | 'timestamp'
  | CFDChartDataKeySpecifier
)[];
export type CFDChartDataFieldPolicy = {
  changes?: FieldPolicy<any> | FieldReadFunction<any>;
  columnCounts?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CFDIssueColumnChangeEntryKeySpecifier = (
  | 'columnFrom'
  | 'columnTo'
  | 'key'
  | 'point'
  | 'statusTo'
  | 'timestamp'
  | CFDIssueColumnChangeEntryKeySpecifier
)[];
export type CFDIssueColumnChangeEntryFieldPolicy = {
  columnFrom?: FieldPolicy<any> | FieldReadFunction<any>;
  columnTo?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  point?: FieldPolicy<any> | FieldReadFunction<any>;
  statusTo?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TimeSeriesPointKeySpecifier = (
  | 'id'
  | 'x'
  | 'y'
  | TimeSeriesPointKeySpecifier
)[];
export type TimeSeriesPointFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  x?: FieldPolicy<any> | FieldReadFunction<any>;
  y?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CFDColumnCountKeySpecifier = (
  | 'columnIndex'
  | 'count'
  | CFDColumnCountKeySpecifier
)[];
export type CFDColumnCountFieldPolicy = {
  columnIndex?: FieldPolicy<any> | FieldReadFunction<any>;
  count?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CFDFiltersKeySpecifier = ('columns' | CFDFiltersKeySpecifier)[];
export type CFDFiltersFieldPolicy = {
  columns?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CFDColumnKeySpecifier = ('name' | CFDColumnKeySpecifier)[];
export type CFDColumnFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ReportsOverviewKeySpecifier = (
  | 'metadata'
  | ReportsOverviewKeySpecifier
)[];
export type ReportsOverviewFieldPolicy = {
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SoftwareReportKeySpecifier = (
  | 'group'
  | 'id'
  | 'imageUri'
  | 'inapplicableDescription'
  | 'inapplicableReason'
  | 'isApplicable'
  | 'key'
  | 'localisedDescription'
  | 'localisedName'
  | 'urlName'
  | SoftwareReportKeySpecifier
)[];
export type SoftwareReportFieldPolicy = {
  group?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  imageUri?: FieldPolicy<any> | FieldReadFunction<any>;
  inapplicableDescription?: FieldPolicy<any> | FieldReadFunction<any>;
  inapplicableReason?: FieldPolicy<any> | FieldReadFunction<any>;
  isApplicable?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  localisedDescription?: FieldPolicy<any> | FieldReadFunction<any>;
  localisedName?: FieldPolicy<any> | FieldReadFunction<any>;
  urlName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CodeInJiraKeySpecifier = (
  | 'siteConfiguration'
  | 'userConfiguration'
  | CodeInJiraKeySpecifier
)[];
export type CodeInJiraFieldPolicy = {
  siteConfiguration?: FieldPolicy<any> | FieldReadFunction<any>;
  userConfiguration?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CodeInJiraSiteConfigurationKeySpecifier = (
  | 'connectedVcsProviders'
  | CodeInJiraSiteConfigurationKeySpecifier
)[];
export type CodeInJiraSiteConfigurationFieldPolicy = {
  connectedVcsProviders?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CodeInJiraVcsProviderKeySpecifier = (
  | 'baseUrl'
  | 'id'
  | 'name'
  | 'providerId'
  | 'providerNamespace'
  | CodeInJiraVcsProviderKeySpecifier
)[];
export type CodeInJiraVcsProviderFieldPolicy = {
  baseUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  providerId?: FieldPolicy<any> | FieldReadFunction<any>;
  providerNamespace?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CodeInJiraUserConfigurationKeySpecifier = (
  | 'ownedBitbucketWorkspaces'
  | CodeInJiraUserConfigurationKeySpecifier
)[];
export type CodeInJiraUserConfigurationFieldPolicy = {
  ownedBitbucketWorkspaces?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CodeInJiraBitbucketWorkspaceKeySpecifier = (
  | 'name'
  | 'slug'
  | 'uuid'
  | CodeInJiraBitbucketWorkspaceKeySpecifier
)[];
export type CodeInJiraBitbucketWorkspaceFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  slug?: FieldPolicy<any> | FieldReadFunction<any>;
  uuid?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassCatalogQueryApiKeySpecifier = (
  | 'component'
  | 'componentByExternalAlias'
  | 'fieldDefinitionsByComponentType'
  | 'scorecard'
  | 'scorecards'
  | 'searchComponentLabels'
  | 'searchComponents'
  | 'starredComponents'
  | 'teamCheckins'
  | CompassCatalogQueryApiKeySpecifier
)[];
export type CompassCatalogQueryApiFieldPolicy = {
  component?: FieldPolicy<any> | FieldReadFunction<any>;
  componentByExternalAlias?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldDefinitionsByComponentType?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecard?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecards?: FieldPolicy<any> | FieldReadFunction<any>;
  searchComponentLabels?: FieldPolicy<any> | FieldReadFunction<any>;
  searchComponents?: FieldPolicy<any> | FieldReadFunction<any>;
  starredComponents?: FieldPolicy<any> | FieldReadFunction<any>;
  teamCheckins?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassComponentKeySpecifier = (
  | '_isDeleted'
  | '_isOptimistic'
  | 'announcements'
  | 'applicableScorecards'
  | 'changeMetadata'
  | 'dataManager'
  | 'description'
  | 'eventSources'
  | 'events'
  | 'externalAliases'
  | 'fields'
  | 'id'
  | 'labels'
  | 'links'
  | 'name'
  | 'ownerId'
  | 'relationships'
  | 'scorecardScore'
  | 'scorecardScores'
  | 'scorecards'
  | 'type'
  | CompassComponentKeySpecifier
)[];
export type CompassComponentFieldPolicy = {
  _isDeleted?: FieldPolicy<any> | FieldReadFunction<any>;
  _isOptimistic?: FieldPolicy<any> | FieldReadFunction<any>;
  announcements?: FieldPolicy<any> | FieldReadFunction<any>;
  applicableScorecards?: FieldPolicy<any> | FieldReadFunction<any>;
  changeMetadata?: FieldPolicy<any> | FieldReadFunction<any>;
  dataManager?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  eventSources?: FieldPolicy<any> | FieldReadFunction<any>;
  events?: FieldPolicy<any> | FieldReadFunction<any>;
  externalAliases?: FieldPolicy<any> | FieldReadFunction<any>;
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  labels?: FieldPolicy<any> | FieldReadFunction<any>;
  links?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  ownerId?: FieldPolicy<any> | FieldReadFunction<any>;
  relationships?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecardScore?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecardScores?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecards?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassAnnouncementKeySpecifier = (
  | 'acknowledgements'
  | 'component'
  | 'description'
  | 'id'
  | 'targetDate'
  | 'title'
  | CompassAnnouncementKeySpecifier
)[];
export type CompassAnnouncementFieldPolicy = {
  acknowledgements?: FieldPolicy<any> | FieldReadFunction<any>;
  component?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  targetDate?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassAnnouncementAcknowledgementKeySpecifier = (
  | 'component'
  | 'hasAcknowledged'
  | CompassAnnouncementAcknowledgementKeySpecifier
)[];
export type CompassAnnouncementAcknowledgementFieldPolicy = {
  component?: FieldPolicy<any> | FieldReadFunction<any>;
  hasAcknowledged?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassScorecardKeySpecifier = (
  | '_isDeleted'
  | '_isOptimistic'
  | 'appliedToComponents'
  | 'changeMetadata'
  | 'componentType'
  | 'criterias'
  | 'description'
  | 'id'
  | 'importance'
  | 'name'
  | 'owner'
  | 'scorecardScore'
  | CompassScorecardKeySpecifier
)[];
export type CompassScorecardFieldPolicy = {
  _isDeleted?: FieldPolicy<any> | FieldReadFunction<any>;
  _isOptimistic?: FieldPolicy<any> | FieldReadFunction<any>;
  appliedToComponents?: FieldPolicy<any> | FieldReadFunction<any>;
  changeMetadata?: FieldPolicy<any> | FieldReadFunction<any>;
  componentType?: FieldPolicy<any> | FieldReadFunction<any>;
  criterias?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  importance?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  owner?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecardScore?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassScorecardAppliedToComponentsConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | CompassScorecardAppliedToComponentsConnectionKeySpecifier
)[];
export type CompassScorecardAppliedToComponentsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassScorecardAppliedToComponentsEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | CompassScorecardAppliedToComponentsEdgeKeySpecifier
)[];
export type CompassScorecardAppliedToComponentsEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryErrorKeySpecifier = (
  | 'extensions'
  | 'identifier'
  | 'message'
  | QueryErrorKeySpecifier
)[];
export type QueryErrorFieldPolicy = {
  extensions?: FieldPolicy<any> | FieldReadFunction<any>;
  identifier?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryErrorExtensionKeySpecifier = (
  | 'errorType'
  | 'statusCode'
  | QueryErrorExtensionKeySpecifier
)[];
export type QueryErrorExtensionFieldPolicy = {
  errorType?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassChangeMetadataKeySpecifier = (
  | 'createdAt'
  | 'createdBy'
  | 'lastUserModificationAt'
  | 'lastUserModificationBy'
  | CompassChangeMetadataKeySpecifier
)[];
export type CompassChangeMetadataFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  createdBy?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUserModificationAt?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUserModificationBy?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassScorecardCriteriaKeySpecifier = (
  | 'id'
  | 'scorecardCriteriaScore'
  | 'weight'
  | CompassScorecardCriteriaKeySpecifier
)[];
export type CompassScorecardCriteriaFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecardCriteriaScore?: FieldPolicy<any> | FieldReadFunction<any>;
  weight?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassScorecardCriteriaScoreKeySpecifier = (
  | 'maxScore'
  | 'score'
  | 'scorecardCriteria'
  | CompassScorecardCriteriaScoreKeySpecifier
)[];
export type CompassScorecardCriteriaScoreFieldPolicy = {
  maxScore?: FieldPolicy<any> | FieldReadFunction<any>;
  score?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecardCriteria?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassScorecardScoreKeySpecifier = (
  | 'criteriaScores'
  | 'maxTotalScore'
  | 'scorecard'
  | 'totalScore'
  | CompassScorecardScoreKeySpecifier
)[];
export type CompassScorecardScoreFieldPolicy = {
  criteriaScores?: FieldPolicy<any> | FieldReadFunction<any>;
  maxTotalScore?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecard?: FieldPolicy<any> | FieldReadFunction<any>;
  totalScore?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassComponentDataManagerKeySpecifier = (
  | 'ecosystemAppId'
  | 'externalSourceURL'
  | 'lastSyncEvent'
  | CompassComponentDataManagerKeySpecifier
)[];
export type CompassComponentDataManagerFieldPolicy = {
  ecosystemAppId?: FieldPolicy<any> | FieldReadFunction<any>;
  externalSourceURL?: FieldPolicy<any> | FieldReadFunction<any>;
  lastSyncEvent?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ComponentSyncEventKeySpecifier = (
  | 'lastSyncErrors'
  | 'status'
  | 'time'
  | ComponentSyncEventKeySpecifier
)[];
export type ComponentSyncEventFieldPolicy = {
  lastSyncErrors?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  time?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EventSourceKeySpecifier = (
  | 'eventType'
  | 'externalEventSourceId'
  | 'id'
  | EventSourceKeySpecifier
)[];
export type EventSourceFieldPolicy = {
  eventType?: FieldPolicy<any> | FieldReadFunction<any>;
  externalEventSourceId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassEventConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | CompassEventConnectionKeySpecifier
)[];
export type CompassEventConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassEventEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | CompassEventEdgeKeySpecifier
)[];
export type CompassEventEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassEventKeySpecifier = (
  | 'description'
  | 'displayName'
  | 'eventType'
  | 'lastUpdated'
  | 'url'
  | CompassEventKeySpecifier
)[];
export type CompassEventFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  eventType?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassExternalAliasKeySpecifier = (
  | 'externalAliasId'
  | 'externalSource'
  | CompassExternalAliasKeySpecifier
)[];
export type CompassExternalAliasFieldPolicy = {
  externalAliasId?: FieldPolicy<any> | FieldReadFunction<any>;
  externalSource?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassFieldKeySpecifier = (
  | 'definition'
  | CompassFieldKeySpecifier
)[];
export type CompassFieldFieldPolicy = {
  definition?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassFieldDefinitionKeySpecifier = (
  | 'description'
  | 'id'
  | 'name'
  | 'options'
  | 'type'
  | CompassFieldDefinitionKeySpecifier
)[];
export type CompassFieldDefinitionFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  options?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassEnumFieldDefinitionOptionsKeySpecifier = (
  | 'default'
  | 'values'
  | CompassEnumFieldDefinitionOptionsKeySpecifier
)[];
export type CompassEnumFieldDefinitionOptionsFieldPolicy = {
  default?: FieldPolicy<any> | FieldReadFunction<any>;
  values?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassComponentLabelKeySpecifier = (
  | 'name'
  | CompassComponentLabelKeySpecifier
)[];
export type CompassComponentLabelFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassLinkKeySpecifier = (
  | '_isDeleted'
  | 'id'
  | 'name'
  | 'type'
  | 'url'
  | CompassLinkKeySpecifier
)[];
export type CompassLinkFieldPolicy = {
  _isDeleted?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassRelationshipConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | CompassRelationshipConnectionKeySpecifier
)[];
export type CompassRelationshipConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassRelationshipEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | CompassRelationshipEdgeKeySpecifier
)[];
export type CompassRelationshipEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassRelationshipKeySpecifier = (
  | '_isDeleted'
  | 'changeMetadata'
  | 'endNode'
  | 'startNode'
  | 'type'
  | CompassRelationshipKeySpecifier
)[];
export type CompassRelationshipFieldPolicy = {
  _isDeleted?: FieldPolicy<any> | FieldReadFunction<any>;
  changeMetadata?: FieldPolicy<any> | FieldReadFunction<any>;
  endNode?: FieldPolicy<any> | FieldReadFunction<any>;
  startNode?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassFieldDefinitionsKeySpecifier = (
  | 'definitions'
  | CompassFieldDefinitionsKeySpecifier
)[];
export type CompassFieldDefinitionsFieldPolicy = {
  definitions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassScorecardConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | CompassScorecardConnectionKeySpecifier
)[];
export type CompassScorecardConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassScorecardEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | CompassScorecardEdgeKeySpecifier
)[];
export type CompassScorecardEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassSearchComponentLabelsConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | CompassSearchComponentLabelsConnectionKeySpecifier
)[];
export type CompassSearchComponentLabelsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassSearchComponentLabelsEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | CompassSearchComponentLabelsEdgeKeySpecifier
)[];
export type CompassSearchComponentLabelsEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassSearchComponentConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | CompassSearchComponentConnectionKeySpecifier
)[];
export type CompassSearchComponentConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassSearchComponentEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | CompassSearchComponentEdgeKeySpecifier
)[];
export type CompassSearchComponentEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassSearchComponentResultKeySpecifier = (
  | 'component'
  | 'link'
  | CompassSearchComponentResultKeySpecifier
)[];
export type CompassSearchComponentResultFieldPolicy = {
  component?: FieldPolicy<any> | FieldReadFunction<any>;
  link?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassStarredComponentConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | CompassStarredComponentConnectionKeySpecifier
)[];
export type CompassStarredComponentConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassStarredComponentEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | CompassStarredComponentEdgeKeySpecifier
)[];
export type CompassStarredComponentEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassTeamCheckinKeySpecifier = (
  | '_isDeleted'
  | '_isOptimistic'
  | 'changeMetadata'
  | 'id'
  | 'mood'
  | 'response1'
  | 'response2'
  | 'response3'
  | 'teamId'
  | CompassTeamCheckinKeySpecifier
)[];
export type CompassTeamCheckinFieldPolicy = {
  _isDeleted?: FieldPolicy<any> | FieldReadFunction<any>;
  _isOptimistic?: FieldPolicy<any> | FieldReadFunction<any>;
  changeMetadata?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  mood?: FieldPolicy<any> | FieldReadFunction<any>;
  response1?: FieldPolicy<any> | FieldReadFunction<any>;
  response2?: FieldPolicy<any> | FieldReadFunction<any>;
  response3?: FieldPolicy<any> | FieldReadFunction<any>;
  teamId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestCatalogQueryApiKeySpecifier = (
  | 'me'
  | 'supportRequest'
  | SupportRequestCatalogQueryApiKeySpecifier
)[];
export type SupportRequestCatalogQueryApiFieldPolicy = {
  me?: FieldPolicy<any> | FieldReadFunction<any>;
  supportRequest?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestPageKeySpecifier = (
  | 'migrationRequests'
  | 'namedContactRelations'
  | 'profile'
  | 'requests'
  | SupportRequestPageKeySpecifier
)[];
export type SupportRequestPageFieldPolicy = {
  migrationRequests?: FieldPolicy<any> | FieldReadFunction<any>;
  namedContactRelations?: FieldPolicy<any> | FieldReadFunction<any>;
  profile?: FieldPolicy<any> | FieldReadFunction<any>;
  requests?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestHierarchyRequestsKeySpecifier = (
  | 'page'
  | 'total'
  | SupportRequestHierarchyRequestsKeySpecifier
)[];
export type SupportRequestHierarchyRequestsFieldPolicy = {
  page?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestHierarchyRequestKeySpecifier = (
  | 'children'
  | 'createdDate'
  | 'description'
  | 'id'
  | 'parent'
  | 'participants'
  | 'reporter'
  | 'requestTypeName'
  | 'status'
  | 'summary'
  | 'targetScreen'
  | SupportRequestHierarchyRequestKeySpecifier
)[];
export type SupportRequestHierarchyRequestFieldPolicy = {
  children?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  parent?: FieldPolicy<any> | FieldReadFunction<any>;
  participants?: FieldPolicy<any> | FieldReadFunction<any>;
  reporter?: FieldPolicy<any> | FieldReadFunction<any>;
  requestTypeName?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  summary?: FieldPolicy<any> | FieldReadFunction<any>;
  targetScreen?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestCommonRequestKeySpecifier = (
  | 'createdDate'
  | 'description'
  | 'id'
  | 'participants'
  | 'reporter'
  | 'requestTypeName'
  | 'status'
  | 'summary'
  | SupportRequestCommonRequestKeySpecifier
)[];
export type SupportRequestCommonRequestFieldPolicy = {
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  participants?: FieldPolicy<any> | FieldReadFunction<any>;
  reporter?: FieldPolicy<any> | FieldReadFunction<any>;
  requestTypeName?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  summary?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestDisplayableDateTimeKeySpecifier = (
  | 'dateTime'
  | 'epochMillis'
  | 'friendly'
  | SupportRequestDisplayableDateTimeKeySpecifier
)[];
export type SupportRequestDisplayableDateTimeFieldPolicy = {
  dateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  epochMillis?: FieldPolicy<any> | FieldReadFunction<any>;
  friendly?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestUserKeySpecifier = (
  | 'displayName'
  | 'email'
  | 'user'
  | 'username'
  | SupportRequestUserKeySpecifier
)[];
export type SupportRequestUserFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  username?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestStatusKeySpecifier = (
  | 'category'
  | 'createdDate'
  | 'text'
  | SupportRequestStatusKeySpecifier
)[];
export type SupportRequestStatusFieldPolicy = {
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  text?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestNamedContactRelationsKeySpecifier = (
  | 'cloudEnterpriseRelations'
  | 'premierSupportRelations'
  | SupportRequestNamedContactRelationsKeySpecifier
)[];
export type SupportRequestNamedContactRelationsFieldPolicy = {
  cloudEnterpriseRelations?: FieldPolicy<any> | FieldReadFunction<any>;
  premierSupportRelations?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestNamedContactRelationKeySpecifier = (
  | 'contactRelations'
  | 'orgId'
  | 'orgName'
  | 'sen'
  | SupportRequestNamedContactRelationKeySpecifier
)[];
export type SupportRequestNamedContactRelationFieldPolicy = {
  contactRelations?: FieldPolicy<any> | FieldReadFunction<any>;
  orgId?: FieldPolicy<any> | FieldReadFunction<any>;
  orgName?: FieldPolicy<any> | FieldReadFunction<any>;
  sen?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestContactRelationKeySpecifier = (
  | 'contact'
  | 'openRequest'
  | SupportRequestContactRelationKeySpecifier
)[];
export type SupportRequestContactRelationFieldPolicy = {
  contact?: FieldPolicy<any> | FieldReadFunction<any>;
  openRequest?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestTicketKeySpecifier = (
  | 'issueKey'
  | SupportRequestTicketKeySpecifier
)[];
export type SupportRequestTicketFieldPolicy = {
  issueKey?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestsKeySpecifier = (
  | 'page'
  | 'total'
  | SupportRequestsKeySpecifier
)[];
export type SupportRequestsFieldPolicy = {
  page?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestKeySpecifier = (
  | 'comments'
  | 'createdDate'
  | 'description'
  | 'fields'
  | 'id'
  | 'participants'
  | 'projectName'
  | 'reporter'
  | 'requestTypeName'
  | 'routeToSupportPortal'
  | 'status'
  | 'statuses'
  | 'summary'
  | 'targetScreen'
  | 'transitions'
  | SupportRequestKeySpecifier
)[];
export type SupportRequestFieldPolicy = {
  comments?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  participants?: FieldPolicy<any> | FieldReadFunction<any>;
  projectName?: FieldPolicy<any> | FieldReadFunction<any>;
  reporter?: FieldPolicy<any> | FieldReadFunction<any>;
  requestTypeName?: FieldPolicy<any> | FieldReadFunction<any>;
  routeToSupportPortal?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  statuses?: FieldPolicy<any> | FieldReadFunction<any>;
  summary?: FieldPolicy<any> | FieldReadFunction<any>;
  targetScreen?: FieldPolicy<any> | FieldReadFunction<any>;
  transitions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestCommentsKeySpecifier = (
  | 'lastPage'
  | 'limit'
  | 'offset'
  | 'size'
  | 'values'
  | SupportRequestCommentsKeySpecifier
)[];
export type SupportRequestCommentsFieldPolicy = {
  lastPage?: FieldPolicy<any> | FieldReadFunction<any>;
  limit?: FieldPolicy<any> | FieldReadFunction<any>;
  offset?: FieldPolicy<any> | FieldReadFunction<any>;
  size?: FieldPolicy<any> | FieldReadFunction<any>;
  values?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestCommentKeySpecifier = (
  | 'author'
  | 'createdDate'
  | 'message'
  | SupportRequestCommentKeySpecifier
)[];
export type SupportRequestCommentFieldPolicy = {
  author?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestFieldKeySpecifier = (
  | 'id'
  | 'label'
  | 'value'
  | SupportRequestFieldKeySpecifier
)[];
export type SupportRequestFieldFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestFieldValueKeySpecifier = (
  | 'value'
  | SupportRequestFieldValueKeySpecifier
)[];
export type SupportRequestFieldValueFieldPolicy = {
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestStatusesKeySpecifier = (
  | 'lastPage'
  | 'limit'
  | 'offset'
  | 'size'
  | 'values'
  | SupportRequestStatusesKeySpecifier
)[];
export type SupportRequestStatusesFieldPolicy = {
  lastPage?: FieldPolicy<any> | FieldReadFunction<any>;
  limit?: FieldPolicy<any> | FieldReadFunction<any>;
  offset?: FieldPolicy<any> | FieldReadFunction<any>;
  size?: FieldPolicy<any> | FieldReadFunction<any>;
  values?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestTransitionsKeySpecifier = (
  | 'lastPage'
  | 'limit'
  | 'offset'
  | 'size'
  | 'values'
  | SupportRequestTransitionsKeySpecifier
)[];
export type SupportRequestTransitionsFieldPolicy = {
  lastPage?: FieldPolicy<any> | FieldReadFunction<any>;
  limit?: FieldPolicy<any> | FieldReadFunction<any>;
  offset?: FieldPolicy<any> | FieldReadFunction<any>;
  size?: FieldPolicy<any> | FieldReadFunction<any>;
  values?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestTransitionKeySpecifier = (
  | 'id'
  | 'name'
  | SupportRequestTransitionKeySpecifier
)[];
export type SupportRequestTransitionFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsKeySpecifier = (
  | 'cycleTime'
  | 'deploymentFrequency'
  | 'deploymentSize'
  | 'perDeploymentMetrics'
  | 'perIssueMetrics'
  | DevOpsMetricsKeySpecifier
)[];
export type DevOpsMetricsFieldPolicy = {
  cycleTime?: FieldPolicy<any> | FieldReadFunction<any>;
  deploymentFrequency?: FieldPolicy<any> | FieldReadFunction<any>;
  deploymentSize?: FieldPolicy<any> | FieldReadFunction<any>;
  perDeploymentMetrics?: FieldPolicy<any> | FieldReadFunction<any>;
  perIssueMetrics?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsCycleTimeKeySpecifier = (
  | 'cycleTimeMetrics'
  | 'hasPermissionForAllContributingIssues'
  | 'phase'
  | 'resolution'
  | DevOpsMetricsCycleTimeKeySpecifier
)[];
export type DevOpsMetricsCycleTimeFieldPolicy = {
  cycleTimeMetrics?: FieldPolicy<any> | FieldReadFunction<any>;
  hasPermissionForAllContributingIssues?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  phase?: FieldPolicy<any> | FieldReadFunction<any>;
  resolution?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsCycleTimeMetricsKeySpecifier = (
  | 'aggregateData'
  | 'data'
  | DevOpsMetricsCycleTimeMetricsKeySpecifier
)[];
export type DevOpsMetricsCycleTimeMetricsFieldPolicy = {
  aggregateData?: FieldPolicy<any> | FieldReadFunction<any>;
  data?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsCycleTimeDataKeySpecifier = (
  | 'cycleTimeSeconds'
  | 'dateTime'
  | 'issuesShippedCount'
  | DevOpsMetricsCycleTimeDataKeySpecifier
)[];
export type DevOpsMetricsCycleTimeDataFieldPolicy = {
  cycleTimeSeconds?: FieldPolicy<any> | FieldReadFunction<any>;
  dateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  issuesShippedCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsResolutionKeySpecifier = (
  | 'unit'
  | 'value'
  | DevOpsMetricsResolutionKeySpecifier
)[];
export type DevOpsMetricsResolutionFieldPolicy = {
  unit?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsDeploymentFrequencyKeySpecifier = (
  | 'aggregateData'
  | 'data'
  | 'environmentType'
  | 'resolution'
  | 'state'
  | DevOpsMetricsDeploymentFrequencyKeySpecifier
)[];
export type DevOpsMetricsDeploymentFrequencyFieldPolicy = {
  aggregateData?: FieldPolicy<any> | FieldReadFunction<any>;
  data?: FieldPolicy<any> | FieldReadFunction<any>;
  environmentType?: FieldPolicy<any> | FieldReadFunction<any>;
  resolution?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsDeploymentFrequencyDataKeySpecifier = (
  | 'count'
  | 'dateTime'
  | DevOpsMetricsDeploymentFrequencyDataKeySpecifier
)[];
export type DevOpsMetricsDeploymentFrequencyDataFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  dateTime?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsDeploymentSizeKeySpecifier = (
  | 'aggregateData'
  | 'data'
  | DevOpsMetricsDeploymentSizeKeySpecifier
)[];
export type DevOpsMetricsDeploymentSizeFieldPolicy = {
  aggregateData?: FieldPolicy<any> | FieldReadFunction<any>;
  data?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsDeploymentSizeDataKeySpecifier = (
  | 'dateTime'
  | 'deploymentSize'
  | DevOpsMetricsDeploymentSizeDataKeySpecifier
)[];
export type DevOpsMetricsDeploymentSizeDataFieldPolicy = {
  dateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  deploymentSize?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsPerDeploymentMetricsConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | DevOpsMetricsPerDeploymentMetricsConnectionKeySpecifier
)[];
export type DevOpsMetricsPerDeploymentMetricsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsDeploymentMetricsEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | DevOpsMetricsDeploymentMetricsEdgeKeySpecifier
)[];
export type DevOpsMetricsDeploymentMetricsEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsDeploymentMetricsKeySpecifier = (
  | 'deployment'
  | 'deploymentSize'
  | DevOpsMetricsDeploymentMetricsKeySpecifier
)[];
export type DevOpsMetricsDeploymentMetricsFieldPolicy = {
  deployment?: FieldPolicy<any> | FieldReadFunction<any>;
  deploymentSize?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeploymentSummaryKeySpecifier = (
  | 'deploymentSequenceNumber'
  | 'description'
  | 'displayName'
  | 'environment'
  | 'id'
  | 'issueIds'
  | 'lastUpdated'
  | 'pipeline'
  | 'provider'
  | 'serviceAssociations'
  | 'state'
  | 'updateSequenceNumber'
  | 'url'
  | DeploymentSummaryKeySpecifier
)[];
export type DeploymentSummaryFieldPolicy = {
  deploymentSequenceNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  environment?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  issueIds?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>;
  pipeline?: FieldPolicy<any> | FieldReadFunction<any>;
  provider?: FieldPolicy<any> | FieldReadFunction<any>;
  serviceAssociations?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
  updateSequenceNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsEnvironmentKeySpecifier = (
  | 'category'
  | 'displayName'
  | DevOpsEnvironmentKeySpecifier
)[];
export type DevOpsEnvironmentFieldPolicy = {
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeploymentPipelineKeySpecifier = (
  | 'displayName'
  | 'url'
  | DeploymentPipelineKeySpecifier
)[];
export type DeploymentPipelineFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsProviderKeySpecifier = (
  | 'links'
  | 'logo'
  | 'name'
  | DevOpsProviderKeySpecifier
)[];
export type DevOpsProviderFieldPolicy = {
  links?: FieldPolicy<any> | FieldReadFunction<any>;
  logo?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsProviderLinksKeySpecifier = (
  | 'documentation'
  | 'home'
  | 'listDeploymentsTemplate'
  | DevOpsProviderLinksKeySpecifier
)[];
export type DevOpsProviderLinksFieldPolicy = {
  documentation?: FieldPolicy<any> | FieldReadFunction<any>;
  home?: FieldPolicy<any> | FieldReadFunction<any>;
  listDeploymentsTemplate?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsPerIssueMetricsConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | DevOpsMetricsPerIssueMetricsConnectionKeySpecifier
)[];
export type DevOpsMetricsPerIssueMetricsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsIssueMetricsEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | DevOpsMetricsIssueMetricsEdgeKeySpecifier
)[];
export type DevOpsMetricsIssueMetricsEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsIssueMetricsKeySpecifier = (
  | 'commitsCount'
  | 'id'
  | 'lastSuccessfulProductionDeployment'
  | 'meanReviewTimeSeconds'
  | 'pullRequestsCount'
  | 'totalCycleTimeSeconds'
  | DevOpsMetricsIssueMetricsKeySpecifier
)[];
export type DevOpsMetricsIssueMetricsFieldPolicy = {
  commitsCount?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastSuccessfulProductionDeployment?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  meanReviewTimeSeconds?: FieldPolicy<any> | FieldReadFunction<any>;
  pullRequestsCount?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCycleTimeSeconds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeveloperLogAccessResultKeySpecifier = (
  | 'contextId'
  | 'developerHasAccess'
  | DeveloperLogAccessResultKeySpecifier
)[];
export type DeveloperLogAccessResultFieldPolicy = {
  contextId?: FieldPolicy<any> | FieldReadFunction<any>;
  developerHasAccess?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsDevelopmentInformationKeySpecifier = (
  | 'details'
  | IssueDevOpsDevelopmentInformationKeySpecifier
)[];
export type IssueDevOpsDevelopmentInformationFieldPolicy = {
  details?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsDetailsKeySpecifier = (
  | 'deploymentProviders'
  | 'embeddedMarketplace'
  | 'featureFlagProviders'
  | 'instanceTypes'
  | 'remoteLinksByType'
  | IssueDevOpsDetailsKeySpecifier
)[];
export type IssueDevOpsDetailsFieldPolicy = {
  deploymentProviders?: FieldPolicy<any> | FieldReadFunction<any>;
  embeddedMarketplace?: FieldPolicy<any> | FieldReadFunction<any>;
  featureFlagProviders?: FieldPolicy<any> | FieldReadFunction<any>;
  instanceTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  remoteLinksByType?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsDeploymentProviderDetailsKeySpecifier = (
  | 'deployments'
  | 'homeUrl'
  | 'id'
  | 'logoUrl'
  | 'name'
  | IssueDevOpsDeploymentProviderDetailsKeySpecifier
)[];
export type IssueDevOpsDeploymentProviderDetailsFieldPolicy = {
  deployments?: FieldPolicy<any> | FieldReadFunction<any>;
  homeUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  logoUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsDeploymentDetailsKeySpecifier = (
  | 'displayName'
  | 'environment'
  | 'lastUpdated'
  | 'pipelineDisplayName'
  | 'pipelineId'
  | 'pipelineUrl'
  | 'state'
  | 'url'
  | IssueDevOpsDeploymentDetailsKeySpecifier
)[];
export type IssueDevOpsDeploymentDetailsFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  environment?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>;
  pipelineDisplayName?: FieldPolicy<any> | FieldReadFunction<any>;
  pipelineId?: FieldPolicy<any> | FieldReadFunction<any>;
  pipelineUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsDeploymentEnvironmentKeySpecifier = (
  | 'displayName'
  | 'id'
  | 'type'
  | IssueDevOpsDeploymentEnvironmentKeySpecifier
)[];
export type IssueDevOpsDeploymentEnvironmentFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsEmbeddedMarketplaceKeySpecifier = (
  | 'shouldDisplayForBuilds'
  | 'shouldDisplayForDeployments'
  | 'shouldDisplayForFeatureFlags'
  | IssueDevOpsEmbeddedMarketplaceKeySpecifier
)[];
export type IssueDevOpsEmbeddedMarketplaceFieldPolicy = {
  shouldDisplayForBuilds?: FieldPolicy<any> | FieldReadFunction<any>;
  shouldDisplayForDeployments?: FieldPolicy<any> | FieldReadFunction<any>;
  shouldDisplayForFeatureFlags?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsFeatureFlagProviderKeySpecifier = (
  | 'createFlagTemplateUrl'
  | 'featureFlags'
  | 'id'
  | 'linkFlagTemplateUrl'
  | IssueDevOpsFeatureFlagProviderKeySpecifier
)[];
export type IssueDevOpsFeatureFlagProviderFieldPolicy = {
  createFlagTemplateUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  featureFlags?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  linkFlagTemplateUrl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsFeatureFlagKeySpecifier = (
  | 'details'
  | 'displayName'
  | 'id'
  | 'key'
  | 'providerId'
  | 'summary'
  | IssueDevOpsFeatureFlagKeySpecifier
)[];
export type IssueDevOpsFeatureFlagFieldPolicy = {
  details?: FieldPolicy<any> | FieldReadFunction<any>;
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  providerId?: FieldPolicy<any> | FieldReadFunction<any>;
  summary?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsFeatureFlagDetailsKeySpecifier = (
  | 'environment'
  | 'lastUpdated'
  | 'status'
  | 'url'
  | IssueDevOpsFeatureFlagDetailsKeySpecifier
)[];
export type IssueDevOpsFeatureFlagDetailsFieldPolicy = {
  environment?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsFeatureFlagEnvironmentKeySpecifier = (
  | 'name'
  | 'type'
  | IssueDevOpsFeatureFlagEnvironmentKeySpecifier
)[];
export type IssueDevOpsFeatureFlagEnvironmentFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsFeatureFlagStatusKeySpecifier = (
  | 'defaultValue'
  | 'enabled'
  | 'rollout'
  | IssueDevOpsFeatureFlagStatusKeySpecifier
)[];
export type IssueDevOpsFeatureFlagStatusFieldPolicy = {
  defaultValue?: FieldPolicy<any> | FieldReadFunction<any>;
  enabled?: FieldPolicy<any> | FieldReadFunction<any>;
  rollout?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsFeatureFlagRolloutKeySpecifier = (
  | 'percentage'
  | 'rules'
  | 'text'
  | IssueDevOpsFeatureFlagRolloutKeySpecifier
)[];
export type IssueDevOpsFeatureFlagRolloutFieldPolicy = {
  percentage?: FieldPolicy<any> | FieldReadFunction<any>;
  rules?: FieldPolicy<any> | FieldReadFunction<any>;
  text?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsFeatureFlagSummaryKeySpecifier = (
  | 'lastUpdated'
  | 'status'
  | 'url'
  | IssueDevOpsFeatureFlagSummaryKeySpecifier
)[];
export type IssueDevOpsFeatureFlagSummaryFieldPolicy = {
  lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsProviderInstanceKeySpecifier = (
  | 'baseUrl'
  | 'buildProviders'
  | 'danglingPullRequests'
  | 'devStatusErrorMessage'
  | 'devStatusErrorMessages'
  | 'id'
  | 'isSingleInstance'
  | 'name'
  | 'repository'
  | 'type'
  | 'typeName'
  | IssueDevOpsProviderInstanceKeySpecifier
)[];
export type IssueDevOpsProviderInstanceFieldPolicy = {
  baseUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  buildProviders?: FieldPolicy<any> | FieldReadFunction<any>;
  danglingPullRequests?: FieldPolicy<any> | FieldReadFunction<any>;
  devStatusErrorMessage?: FieldPolicy<any> | FieldReadFunction<any>;
  devStatusErrorMessages?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isSingleInstance?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  repository?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  typeName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsBuildProviderKeySpecifier = (
  | 'avatarUrl'
  | 'builds'
  | 'description'
  | 'id'
  | 'name'
  | 'url'
  | IssueDevOpsBuildProviderKeySpecifier
)[];
export type IssueDevOpsBuildProviderFieldPolicy = {
  avatarUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  builds?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsBuildDetailKeySpecifier = (
  | 'buildNumber'
  | 'description'
  | 'id'
  | 'lastUpdated'
  | 'name'
  | 'references'
  | 'state'
  | 'testSummary'
  | 'url'
  | IssueDevOpsBuildDetailKeySpecifier
)[];
export type IssueDevOpsBuildDetailFieldPolicy = {
  buildNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  references?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
  testSummary?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsBuildReferenceKeySpecifier = (
  | 'name'
  | 'uri'
  | IssueDevOpsBuildReferenceKeySpecifier
)[];
export type IssueDevOpsBuildReferenceFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  uri?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsTestSummaryKeySpecifier = (
  | 'numberFailed'
  | 'numberPassed'
  | 'numberSkipped'
  | 'totalNumber'
  | IssueDevOpsTestSummaryKeySpecifier
)[];
export type IssueDevOpsTestSummaryFieldPolicy = {
  numberFailed?: FieldPolicy<any> | FieldReadFunction<any>;
  numberPassed?: FieldPolicy<any> | FieldReadFunction<any>;
  numberSkipped?: FieldPolicy<any> | FieldReadFunction<any>;
  totalNumber?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsPullRequestDetailsKeySpecifier = (
  | 'author'
  | 'branchName'
  | 'branchUrl'
  | 'commentCount'
  | 'id'
  | 'lastUpdate'
  | 'name'
  | 'reviewers'
  | 'status'
  | 'url'
  | IssueDevOpsPullRequestDetailsKeySpecifier
)[];
export type IssueDevOpsPullRequestDetailsFieldPolicy = {
  author?: FieldPolicy<any> | FieldReadFunction<any>;
  branchName?: FieldPolicy<any> | FieldReadFunction<any>;
  branchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  commentCount?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdate?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  reviewers?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsPullRequestAuthorKeySpecifier = (
  | 'avatarUrl'
  | 'name'
  | IssueDevOpsPullRequestAuthorKeySpecifier
)[];
export type IssueDevOpsPullRequestAuthorFieldPolicy = {
  avatarUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsPullRequestReviewerKeySpecifier = (
  | 'avatarUrl'
  | 'isApproved'
  | 'name'
  | IssueDevOpsPullRequestReviewerKeySpecifier
)[];
export type IssueDevOpsPullRequestReviewerFieldPolicy = {
  avatarUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  isApproved?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsRepositoryDetailsKeySpecifier = (
  | 'avatarUrl'
  | 'branches'
  | 'commits'
  | 'description'
  | 'name'
  | 'parent'
  | 'pullRequests'
  | 'url'
  | IssueDevOpsRepositoryDetailsKeySpecifier
)[];
export type IssueDevOpsRepositoryDetailsFieldPolicy = {
  avatarUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  branches?: FieldPolicy<any> | FieldReadFunction<any>;
  commits?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  parent?: FieldPolicy<any> | FieldReadFunction<any>;
  pullRequests?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsBranchDetailsKeySpecifier = (
  | 'createPullRequestUrl'
  | 'createReviewUrl'
  | 'lastCommit'
  | 'name'
  | 'pullRequests'
  | 'reviews'
  | 'url'
  | IssueDevOpsBranchDetailsKeySpecifier
)[];
export type IssueDevOpsBranchDetailsFieldPolicy = {
  createPullRequestUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  createReviewUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  lastCommit?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  pullRequests?: FieldPolicy<any> | FieldReadFunction<any>;
  reviews?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsHeadCommitKeySpecifier = (
  | 'displayId'
  | 'timestamp'
  | 'url'
  | IssueDevOpsHeadCommitKeySpecifier
)[];
export type IssueDevOpsHeadCommitFieldPolicy = {
  displayId?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsBranchPullRequestStatesSummaryKeySpecifier = (
  | 'lastUpdate'
  | 'name'
  | 'status'
  | 'url'
  | IssueDevOpsBranchPullRequestStatesSummaryKeySpecifier
)[];
export type IssueDevOpsBranchPullRequestStatesSummaryFieldPolicy = {
  lastUpdate?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsReviewKeySpecifier = (
  | 'id'
  | 'state'
  | 'url'
  | IssueDevOpsReviewKeySpecifier
)[];
export type IssueDevOpsReviewFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsCommitDetailsKeySpecifier = (
  | 'author'
  | 'createReviewUrl'
  | 'displayId'
  | 'files'
  | 'id'
  | 'isMerge'
  | 'message'
  | 'reviews'
  | 'timestamp'
  | 'url'
  | IssueDevOpsCommitDetailsKeySpecifier
)[];
export type IssueDevOpsCommitDetailsFieldPolicy = {
  author?: FieldPolicy<any> | FieldReadFunction<any>;
  createReviewUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  displayId?: FieldPolicy<any> | FieldReadFunction<any>;
  files?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isMerge?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  reviews?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsCommitFileKeySpecifier = (
  | 'changeType'
  | 'linesAdded'
  | 'linesRemoved'
  | 'path'
  | 'url'
  | IssueDevOpsCommitFileKeySpecifier
)[];
export type IssueDevOpsCommitFileFieldPolicy = {
  changeType?: FieldPolicy<any> | FieldReadFunction<any>;
  linesAdded?: FieldPolicy<any> | FieldReadFunction<any>;
  linesRemoved?: FieldPolicy<any> | FieldReadFunction<any>;
  path?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsRepositoryParentKeySpecifier = (
  | 'name'
  | 'url'
  | IssueDevOpsRepositoryParentKeySpecifier
)[];
export type IssueDevOpsRepositoryParentFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsRemoteLinksByTypeKeySpecifier = (
  | 'providers'
  | 'types'
  | IssueDevOpsRemoteLinksByTypeKeySpecifier
)[];
export type IssueDevOpsRemoteLinksByTypeFieldPolicy = {
  providers?: FieldPolicy<any> | FieldReadFunction<any>;
  types?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsRemoteLinkProviderKeySpecifier = (
  | 'actions'
  | 'documentationUrl'
  | 'homeUrl'
  | 'id'
  | 'logoUrl'
  | 'name'
  | IssueDevOpsRemoteLinkProviderKeySpecifier
)[];
export type IssueDevOpsRemoteLinkProviderFieldPolicy = {
  actions?: FieldPolicy<any> | FieldReadFunction<any>;
  documentationUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  homeUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  logoUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsRemoteLinkProviderActionKeySpecifier = (
  | 'id'
  | 'label'
  | 'templateUrl'
  | IssueDevOpsRemoteLinkProviderActionKeySpecifier
)[];
export type IssueDevOpsRemoteLinkProviderActionFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  templateUrl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsRemoteLinkLabelKeySpecifier = (
  | 'value'
  | IssueDevOpsRemoteLinkLabelKeySpecifier
)[];
export type IssueDevOpsRemoteLinkLabelFieldPolicy = {
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsRemoteLinkTypeKeySpecifier = (
  | 'remoteLinks'
  | 'type'
  | IssueDevOpsRemoteLinkTypeKeySpecifier
)[];
export type IssueDevOpsRemoteLinkTypeFieldPolicy = {
  remoteLinks?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsRemoteLinkKeySpecifier = (
  | 'actionIds'
  | 'attributeMap'
  | 'description'
  | 'displayName'
  | 'id'
  | 'providerId'
  | 'status'
  | 'type'
  | 'url'
  | IssueDevOpsRemoteLinkKeySpecifier
)[];
export type IssueDevOpsRemoteLinkFieldPolicy = {
  actionIds?: FieldPolicy<any> | FieldReadFunction<any>;
  attributeMap?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  providerId?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsRemoteLinkAttributeTupleKeySpecifier = (
  | 'key'
  | 'value'
  | IssueDevOpsRemoteLinkAttributeTupleKeySpecifier
)[];
export type IssueDevOpsRemoteLinkAttributeTupleFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type IssueDevOpsRemoteLinkStatusKeySpecifier = (
  | 'appearance'
  | 'label'
  | IssueDevOpsRemoteLinkStatusKeySpecifier
)[];
export type IssueDevOpsRemoteLinkStatusFieldPolicy = {
  appearance?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DvcsQueryKeySpecifier = (
  | 'bitbucketWorkspacesLinkedToSite'
  | DvcsQueryKeySpecifier
)[];
export type DvcsQueryFieldPolicy = {
  bitbucketWorkspacesLinkedToSite?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DvcsBitbucketWorkspaceConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | DvcsBitbucketWorkspaceConnectionKeySpecifier
)[];
export type DvcsBitbucketWorkspaceConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DvcsBitbucketWorkspaceEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | DvcsBitbucketWorkspaceEdgeKeySpecifier
)[];
export type DvcsBitbucketWorkspaceEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EcosystemQueryKeySpecifier = (
  | 'userGrants'
  | EcosystemQueryKeySpecifier
)[];
export type EcosystemQueryFieldPolicy = {
  userGrants?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserGrantConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | UserGrantConnectionKeySpecifier
)[];
export type UserGrantConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserGrantEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | UserGrantEdgeKeySpecifier
)[];
export type UserGrantEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserGrantKeySpecifier = (
  | 'accountId'
  | 'appDetails'
  | 'appId'
  | 'id'
  | 'oauthClientId'
  | 'scopes'
  | UserGrantKeySpecifier
)[];
export type UserGrantFieldPolicy = {
  accountId?: FieldPolicy<any> | FieldReadFunction<any>;
  appDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  oauthClientId?: FieldPolicy<any> | FieldReadFunction<any>;
  scopes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserGrantAppDetailsKeySpecifier = (
  | 'avatarUrl'
  | 'contactLink'
  | 'description'
  | 'name'
  | 'privacyPolicyLink'
  | 'termsOfServiceLink'
  | 'vendorName'
  | UserGrantAppDetailsKeySpecifier
)[];
export type UserGrantAppDetailsFieldPolicy = {
  avatarUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  contactLink?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  privacyPolicyLink?: FieldPolicy<any> | FieldReadFunction<any>;
  termsOfServiceLink?: FieldPolicy<any> | FieldReadFunction<any>;
  vendorName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserGrantPageInfoKeySpecifier = (
  | 'endCursor'
  | 'hasNextPage'
  | 'hasPreviousPage'
  | 'startCursor'
  | UserGrantPageInfoKeySpecifier
)[];
export type UserGrantPageInfoFieldPolicy = {
  endCursor?: FieldPolicy<any> | FieldReadFunction<any>;
  hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>;
  hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>;
  startCursor?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ExtensionKeySpecifier = (
  | 'appOwner'
  | 'appVersion'
  | 'consentUrl'
  | 'currentUserConsent'
  | 'definitionId'
  | 'egress'
  | 'environmentId'
  | 'environmentKey'
  | 'environmentType'
  | 'id'
  | 'installationId'
  | 'key'
  | 'license'
  | 'properties'
  | 'requiresUserConsent'
  | 'securityPolicies'
  | 'type'
  | ExtensionKeySpecifier
)[];
export type ExtensionFieldPolicy = {
  appOwner?: FieldPolicy<any> | FieldReadFunction<any>;
  appVersion?: FieldPolicy<any> | FieldReadFunction<any>;
  consentUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  currentUserConsent?: FieldPolicy<any> | FieldReadFunction<any>;
  definitionId?: FieldPolicy<any> | FieldReadFunction<any>;
  egress?: FieldPolicy<any> | FieldReadFunction<any>;
  environmentId?: FieldPolicy<any> | FieldReadFunction<any>;
  environmentKey?: FieldPolicy<any> | FieldReadFunction<any>;
  environmentType?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  installationId?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  license?: FieldPolicy<any> | FieldReadFunction<any>;
  properties?: FieldPolicy<any> | FieldReadFunction<any>;
  requiresUserConsent?: FieldPolicy<any> | FieldReadFunction<any>;
  securityPolicies?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserConsentExtensionKeySpecifier = (
  | 'appEnvironmentVersion'
  | 'consentedAt'
  | 'user'
  | UserConsentExtensionKeySpecifier
)[];
export type UserConsentExtensionFieldPolicy = {
  appEnvironmentVersion?: FieldPolicy<any> | FieldReadFunction<any>;
  consentedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserConsentExtensionAppEnvironmentVersionKeySpecifier = (
  | 'id'
  | UserConsentExtensionAppEnvironmentVersionKeySpecifier
)[];
export type UserConsentExtensionAppEnvironmentVersionFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserConsentExtensionUserKeySpecifier = (
  | 'aaid'
  | UserConsentExtensionUserKeySpecifier
)[];
export type UserConsentExtensionUserFieldPolicy = {
  aaid?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppNetworkEgressPermissionExtensionKeySpecifier = (
  | 'addresses'
  | 'type'
  | AppNetworkEgressPermissionExtensionKeySpecifier
)[];
export type AppNetworkEgressPermissionExtensionFieldPolicy = {
  addresses?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppSecurityPoliciesPermissionExtensionKeySpecifier = (
  | 'policies'
  | 'type'
  | AppSecurityPoliciesPermissionExtensionKeySpecifier
)[];
export type AppSecurityPoliciesPermissionExtensionFieldPolicy = {
  policies?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ExtensionContextKeySpecifier = (
  | 'appAuditLogs'
  | 'extensionsByType'
  | 'id'
  | 'installations'
  | ExtensionContextKeySpecifier
)[];
export type ExtensionContextFieldPolicy = {
  appAuditLogs?: FieldPolicy<any> | FieldReadFunction<any>;
  extensionsByType?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  installations?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppAuditConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | AppAuditConnectionKeySpecifier
)[];
export type AppAuditConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuditEventEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | AuditEventEdgeKeySpecifier
)[];
export type AuditEventEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuditEventKeySpecifier = (
  | 'attributes'
  | 'id'
  | 'message'
  | AuditEventKeySpecifier
)[];
export type AuditEventFieldPolicy = {
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuditEventAttributesKeySpecifier = (
  | 'action'
  | 'actor'
  | 'container'
  | 'context'
  | 'time'
  | AuditEventAttributesKeySpecifier
)[];
export type AuditEventAttributesFieldPolicy = {
  action?: FieldPolicy<any> | FieldReadFunction<any>;
  actor?: FieldPolicy<any> | FieldReadFunction<any>;
  container?: FieldPolicy<any> | FieldReadFunction<any>;
  context?: FieldPolicy<any> | FieldReadFunction<any>;
  time?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ContainerEventObjectKeySpecifier = (
  | 'attributes'
  | 'id'
  | 'type'
  | ContainerEventObjectKeySpecifier
)[];
export type ContainerEventObjectFieldPolicy = {
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ContextEventObjectKeySpecifier = (
  | 'attributes'
  | 'id'
  | 'type'
  | ContextEventObjectKeySpecifier
)[];
export type ContextEventObjectFieldPolicy = {
  attributes?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuditMessageObjectKeySpecifier = (
  | 'content'
  | 'format'
  | AuditMessageObjectKeySpecifier
)[];
export type AuditMessageObjectFieldPolicy = {
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  format?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuditsPageInfoKeySpecifier = (
  | 'hasNextPage'
  | 'hasPreviousPage'
  | AuditsPageInfoKeySpecifier
)[];
export type AuditsPageInfoFieldPolicy = {
  hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>;
  hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppInstallationConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | AppInstallationConnectionKeySpecifier
)[];
export type AppInstallationConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppInstallationEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | AppInstallationEdgeKeySpecifier
)[];
export type AppInstallationEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type InstallationContextWithLogAccessKeySpecifier = (
  | 'installationContext'
  | 'tenantContext'
  | InstallationContextWithLogAccessKeySpecifier
)[];
export type InstallationContextWithLogAccessFieldPolicy = {
  installationContext?: FieldPolicy<any> | FieldReadFunction<any>;
  tenantContext?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TenantContextKeySpecifier = (
  | 'cloudId'
  | 'hostName'
  | 'orgId'
  | TenantContextKeySpecifier
)[];
export type TenantContextFieldPolicy = {
  cloudId?: FieldPolicy<any> | FieldReadFunction<any>;
  hostName?: FieldPolicy<any> | FieldReadFunction<any>;
  orgId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraQueryKeySpecifier = (
  | 'allGrantTypeKeys'
  | 'allJiraProjectCategories'
  | 'allJiraProjects'
  | 'applicationPropertiesByKey'
  | 'devOps'
  | 'getProjectsByPermissionScheme'
  | 'grantTypeValues'
  | 'issueById'
  | 'issueByKey'
  | 'issueContainersByType'
  | 'jiraProject'
  | 'jqlBuilder'
  | 'permissionSchemeGrants'
  | 'version'
  | 'viewPermissionScheme'
  | JiraQueryKeySpecifier
)[];
export type JiraQueryFieldPolicy = {
  allGrantTypeKeys?: FieldPolicy<any> | FieldReadFunction<any>;
  allJiraProjectCategories?: FieldPolicy<any> | FieldReadFunction<any>;
  allJiraProjects?: FieldPolicy<any> | FieldReadFunction<any>;
  applicationPropertiesByKey?: FieldPolicy<any> | FieldReadFunction<any>;
  devOps?: FieldPolicy<any> | FieldReadFunction<any>;
  getProjectsByPermissionScheme?: FieldPolicy<any> | FieldReadFunction<any>;
  grantTypeValues?: FieldPolicy<any> | FieldReadFunction<any>;
  issueById?: FieldPolicy<any> | FieldReadFunction<any>;
  issueByKey?: FieldPolicy<any> | FieldReadFunction<any>;
  issueContainersByType?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraProject?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlBuilder?: FieldPolicy<any> | FieldReadFunction<any>;
  permissionSchemeGrants?: FieldPolicy<any> | FieldReadFunction<any>;
  version?: FieldPolicy<any> | FieldReadFunction<any>;
  viewPermissionScheme?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraGrantTypeKeyKeySpecifier = (
  | 'key'
  | 'name'
  | JiraGrantTypeKeyKeySpecifier
)[];
export type JiraGrantTypeKeyFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectCategoryConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | JiraProjectCategoryConnectionKeySpecifier
)[];
export type JiraProjectCategoryConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectCategoryEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraProjectCategoryEdgeKeySpecifier
)[];
export type JiraProjectCategoryEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | JiraProjectConnectionKeySpecifier
)[];
export type JiraProjectConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraProjectEdgeKeySpecifier
)[];
export type JiraProjectEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraApplicationPropertyKeySpecifier = (
  | 'allowedValues'
  | 'defaultValue'
  | 'description'
  | 'example'
  | 'id'
  | 'isEditable'
  | 'key'
  | 'name'
  | 'type'
  | 'value'
  | JiraApplicationPropertyKeySpecifier
)[];
export type JiraApplicationPropertyFieldPolicy = {
  allowedValues?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultValue?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  example?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isEditable?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraDevOpsQueryKeySpecifier = (
  | 'devOpsIssuePanel'
  | JiraDevOpsQueryKeySpecifier
)[];
export type JiraDevOpsQueryFieldPolicy = {
  devOpsIssuePanel?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraDevOpsIssuePanelKeySpecifier = (
  | 'devOpsIssuePanelBanner'
  | 'devSummaryResult'
  | 'panelState'
  | JiraDevOpsIssuePanelKeySpecifier
)[];
export type JiraDevOpsIssuePanelFieldPolicy = {
  devOpsIssuePanelBanner?: FieldPolicy<any> | FieldReadFunction<any>;
  devSummaryResult?: FieldPolicy<any> | FieldReadFunction<any>;
  panelState?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueDevSummaryResultKeySpecifier = (
  | 'configErrors'
  | 'devSummary'
  | 'errors'
  | JiraIssueDevSummaryResultKeySpecifier
)[];
export type JiraIssueDevSummaryResultFieldPolicy = {
  configErrors?: FieldPolicy<any> | FieldReadFunction<any>;
  devSummary?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueDevSummaryErrorKeySpecifier = (
  | 'instance'
  | 'message'
  | JiraIssueDevSummaryErrorKeySpecifier
)[];
export type JiraIssueDevSummaryErrorFieldPolicy = {
  instance?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueDevSummaryErrorProviderInstanceKeySpecifier = (
  | 'baseUrl'
  | 'name'
  | 'type'
  | JiraIssueDevSummaryErrorProviderInstanceKeySpecifier
)[];
export type JiraIssueDevSummaryErrorProviderInstanceFieldPolicy = {
  baseUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueDevSummaryKeySpecifier = (
  | 'branch'
  | 'build'
  | 'commit'
  | 'deploymentEnvironments'
  | 'pullrequest'
  | 'review'
  | JiraIssueDevSummaryKeySpecifier
)[];
export type JiraIssueDevSummaryFieldPolicy = {
  branch?: FieldPolicy<any> | FieldReadFunction<any>;
  build?: FieldPolicy<any> | FieldReadFunction<any>;
  commit?: FieldPolicy<any> | FieldReadFunction<any>;
  deploymentEnvironments?: FieldPolicy<any> | FieldReadFunction<any>;
  pullrequest?: FieldPolicy<any> | FieldReadFunction<any>;
  review?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueBranchDevSummaryContainerKeySpecifier = (
  | 'overall'
  | 'summaryByProvider'
  | JiraIssueBranchDevSummaryContainerKeySpecifier
)[];
export type JiraIssueBranchDevSummaryContainerFieldPolicy = {
  overall?: FieldPolicy<any> | FieldReadFunction<any>;
  summaryByProvider?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueBranchDevSummaryKeySpecifier = (
  | 'count'
  | 'lastUpdated'
  | JiraIssueBranchDevSummaryKeySpecifier
)[];
export type JiraIssueBranchDevSummaryFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueDevSummaryByProviderKeySpecifier = (
  | 'count'
  | 'name'
  | 'providerId'
  | JiraIssueDevSummaryByProviderKeySpecifier
)[];
export type JiraIssueDevSummaryByProviderFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  providerId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueBuildDevSummaryContainerKeySpecifier = (
  | 'overall'
  | 'summaryByProvider'
  | JiraIssueBuildDevSummaryContainerKeySpecifier
)[];
export type JiraIssueBuildDevSummaryContainerFieldPolicy = {
  overall?: FieldPolicy<any> | FieldReadFunction<any>;
  summaryByProvider?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueBuildDevSummaryKeySpecifier = (
  | 'count'
  | 'failedBuildCount'
  | 'lastUpdated'
  | 'successfulBuildCount'
  | 'unknownBuildCount'
  | JiraIssueBuildDevSummaryKeySpecifier
)[];
export type JiraIssueBuildDevSummaryFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  failedBuildCount?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>;
  successfulBuildCount?: FieldPolicy<any> | FieldReadFunction<any>;
  unknownBuildCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueCommitDevSummaryContainerKeySpecifier = (
  | 'overall'
  | 'summaryByProvider'
  | JiraIssueCommitDevSummaryContainerKeySpecifier
)[];
export type JiraIssueCommitDevSummaryContainerFieldPolicy = {
  overall?: FieldPolicy<any> | FieldReadFunction<any>;
  summaryByProvider?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueCommitDevSummaryKeySpecifier = (
  | 'count'
  | 'lastUpdated'
  | JiraIssueCommitDevSummaryKeySpecifier
)[];
export type JiraIssueCommitDevSummaryFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueDeploymentEnvironmentDevSummaryContainerKeySpecifier = (
  | 'overall'
  | 'summaryByProvider'
  | JiraIssueDeploymentEnvironmentDevSummaryContainerKeySpecifier
)[];
export type JiraIssueDeploymentEnvironmentDevSummaryContainerFieldPolicy = {
  overall?: FieldPolicy<any> | FieldReadFunction<any>;
  summaryByProvider?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueDeploymentEnvironmentDevSummaryKeySpecifier = (
  | 'count'
  | 'lastUpdated'
  | 'topEnvironments'
  | JiraIssueDeploymentEnvironmentDevSummaryKeySpecifier
)[];
export type JiraIssueDeploymentEnvironmentDevSummaryFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>;
  topEnvironments?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueDeploymentEnvironmentKeySpecifier = (
  | 'status'
  | 'title'
  | JiraIssueDeploymentEnvironmentKeySpecifier
)[];
export type JiraIssueDeploymentEnvironmentFieldPolicy = {
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssuePullRequestDevSummaryContainerKeySpecifier = (
  | 'overall'
  | 'summaryByProvider'
  | JiraIssuePullRequestDevSummaryContainerKeySpecifier
)[];
export type JiraIssuePullRequestDevSummaryContainerFieldPolicy = {
  overall?: FieldPolicy<any> | FieldReadFunction<any>;
  summaryByProvider?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssuePullRequestDevSummaryKeySpecifier = (
  | 'count'
  | 'lastUpdated'
  | 'open'
  | 'state'
  | 'stateCount'
  | JiraIssuePullRequestDevSummaryKeySpecifier
)[];
export type JiraIssuePullRequestDevSummaryFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>;
  open?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
  stateCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueReviewDevSummaryContainerKeySpecifier = (
  | 'overall'
  | 'summaryByProvider'
  | JiraIssueReviewDevSummaryContainerKeySpecifier
)[];
export type JiraIssueReviewDevSummaryContainerFieldPolicy = {
  overall?: FieldPolicy<any> | FieldReadFunction<any>;
  summaryByProvider?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueReviewDevSummaryKeySpecifier = (
  | 'count'
  | 'lastUpdated'
  | 'state'
  | 'stateCount'
  | JiraIssueReviewDevSummaryKeySpecifier
)[];
export type JiraIssueReviewDevSummaryFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
  stateCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraGrantTypeValueConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraGrantTypeValueConnectionKeySpecifier
)[];
export type JiraGrantTypeValueConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraGrantTypeValueEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraGrantTypeValueEdgeKeySpecifier
)[];
export type JiraGrantTypeValueEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraDefaultGrantTypeValueKeySpecifier = (
  | 'id'
  | 'name'
  | JiraDefaultGrantTypeValueKeySpecifier
)[];
export type JiraDefaultGrantTypeValueFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraGroupGrantTypeValueKeySpecifier = (
  | 'group'
  | 'id'
  | JiraGroupGrantTypeValueKeySpecifier
)[];
export type JiraGroupGrantTypeValueFieldPolicy = {
  group?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraGroupKeySpecifier = (
  | 'groupId'
  | 'id'
  | 'name'
  | JiraGroupKeySpecifier
)[];
export type JiraGroupFieldPolicy = {
  groupId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueFieldGrantTypeValueKeySpecifier = (
  | 'field'
  | 'id'
  | JiraIssueFieldGrantTypeValueKeySpecifier
)[];
export type JiraIssueFieldGrantTypeValueFieldPolicy = {
  field?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'type'
  | JiraIssueFieldKeySpecifier
)[];
export type JiraIssueFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectRoleGrantTypeValueKeySpecifier = (
  | 'id'
  | 'role'
  | JiraProjectRoleGrantTypeValueKeySpecifier
)[];
export type JiraProjectRoleGrantTypeValueFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraRoleKeySpecifier = (
  | 'description'
  | 'id'
  | 'name'
  | 'roleId'
  | JiraRoleKeySpecifier
)[];
export type JiraRoleFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  roleId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraUserGrantTypeValueKeySpecifier = (
  | 'id'
  | 'user'
  | JiraUserGrantTypeValueKeySpecifier
)[];
export type JiraUserGrantTypeValueFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueKeySpecifier = (
  | 'attachments'
  | 'comments'
  | 'fields'
  | 'fieldsById'
  | 'id'
  | 'issueId'
  | 'key'
  | 'worklogs'
  | JiraIssueKeySpecifier
)[];
export type JiraIssueFieldPolicy = {
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  comments?: FieldPolicy<any> | FieldReadFunction<any>;
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldsById?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  issueId?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  worklogs?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAttachmentConnectionKeySpecifier = (
  | 'edges'
  | 'indicativeCount'
  | 'pageInfo'
  | JiraAttachmentConnectionKeySpecifier
)[];
export type JiraAttachmentConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  indicativeCount?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAttachmentEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraAttachmentEdgeKeySpecifier
)[];
export type JiraAttachmentEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAttachmentKeySpecifier = (
  | 'attachmentId'
  | 'author'
  | 'created'
  | 'fileName'
  | 'fileSize'
  | 'mediaApiFileId'
  | 'mimeType'
  | 'parentId'
  | 'parentName'
  | JiraAttachmentKeySpecifier
)[];
export type JiraAttachmentFieldPolicy = {
  attachmentId?: FieldPolicy<any> | FieldReadFunction<any>;
  author?: FieldPolicy<any> | FieldReadFunction<any>;
  created?: FieldPolicy<any> | FieldReadFunction<any>;
  fileName?: FieldPolicy<any> | FieldReadFunction<any>;
  fileSize?: FieldPolicy<any> | FieldReadFunction<any>;
  mediaApiFileId?: FieldPolicy<any> | FieldReadFunction<any>;
  mimeType?: FieldPolicy<any> | FieldReadFunction<any>;
  parentId?: FieldPolicy<any> | FieldReadFunction<any>;
  parentName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraCommentConnectionKeySpecifier = (
  | 'edges'
  | 'indicativeCount'
  | 'pageInfo'
  | JiraCommentConnectionKeySpecifier
)[];
export type JiraCommentConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  indicativeCount?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraCommentEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraCommentEdgeKeySpecifier
)[];
export type JiraCommentEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraCommentKeySpecifier = (
  | 'author'
  | 'commentId'
  | 'created'
  | 'permissionLevel'
  | 'richText'
  | 'updateAuthor'
  | 'updated'
  | JiraCommentKeySpecifier
)[];
export type JiraCommentFieldPolicy = {
  author?: FieldPolicy<any> | FieldReadFunction<any>;
  commentId?: FieldPolicy<any> | FieldReadFunction<any>;
  created?: FieldPolicy<any> | FieldReadFunction<any>;
  permissionLevel?: FieldPolicy<any> | FieldReadFunction<any>;
  richText?: FieldPolicy<any> | FieldReadFunction<any>;
  updateAuthor?: FieldPolicy<any> | FieldReadFunction<any>;
  updated?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPermissionLevelKeySpecifier = (
  | 'group'
  | 'role'
  | JiraPermissionLevelKeySpecifier
)[];
export type JiraPermissionLevelFieldPolicy = {
  group?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraRichTextKeySpecifier = (
  | 'adfValue'
  | 'plainText'
  | 'wikiValue'
  | JiraRichTextKeySpecifier
)[];
export type JiraRichTextFieldPolicy = {
  adfValue?: FieldPolicy<any> | FieldReadFunction<any>;
  plainText?: FieldPolicy<any> | FieldReadFunction<any>;
  wikiValue?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraADFKeySpecifier = ('json' | JiraADFKeySpecifier)[];
export type JiraADFFieldPolicy = {
  json?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueFieldConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraIssueFieldConnectionKeySpecifier
)[];
export type JiraIssueFieldConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueFieldEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraIssueFieldEdgeKeySpecifier
)[];
export type JiraIssueFieldEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraWorkLogConnectionKeySpecifier = (
  | 'edges'
  | 'indicativeCount'
  | 'pageInfo'
  | JiraWorkLogConnectionKeySpecifier
)[];
export type JiraWorkLogConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  indicativeCount?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraWorkLogEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraWorkLogEdgeKeySpecifier
)[];
export type JiraWorkLogEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraWorklogKeySpecifier = (
  | 'author'
  | 'created'
  | 'id'
  | 'permissionLevel'
  | 'remainingEstimate'
  | 'startDate'
  | 'timeSpent'
  | 'updateAuthor'
  | 'updated'
  | 'workDescription'
  | 'worklogId'
  | JiraWorklogKeySpecifier
)[];
export type JiraWorklogFieldPolicy = {
  author?: FieldPolicy<any> | FieldReadFunction<any>;
  created?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  permissionLevel?: FieldPolicy<any> | FieldReadFunction<any>;
  remainingEstimate?: FieldPolicy<any> | FieldReadFunction<any>;
  startDate?: FieldPolicy<any> | FieldReadFunction<any>;
  timeSpent?: FieldPolicy<any> | FieldReadFunction<any>;
  updateAuthor?: FieldPolicy<any> | FieldReadFunction<any>;
  updated?: FieldPolicy<any> | FieldReadFunction<any>;
  workDescription?: FieldPolicy<any> | FieldReadFunction<any>;
  worklogId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraEstimateKeySpecifier = (
  | 'timeInSeconds'
  | JiraEstimateKeySpecifier
)[];
export type JiraEstimateFieldPolicy = {
  timeInSeconds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueItemContainersKeySpecifier = (
  | 'containers'
  | 'defaultItemLocations'
  | JiraIssueItemContainersKeySpecifier
)[];
export type JiraIssueItemContainersFieldPolicy = {
  containers?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultItemLocations?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueItemContainerKeySpecifier = (
  | 'containerType'
  | 'items'
  | JiraIssueItemContainerKeySpecifier
)[];
export type JiraIssueItemContainerFieldPolicy = {
  containerType?: FieldPolicy<any> | FieldReadFunction<any>;
  items?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueItemContainerItemConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | 'totalCount'
  | JiraIssueItemContainerItemConnectionKeySpecifier
)[];
export type JiraIssueItemContainerItemConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueItemContainerItemEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraIssueItemContainerItemEdgeKeySpecifier
)[];
export type JiraIssueItemContainerItemEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueItemFieldItemKeySpecifier = (
  | 'containerPosition'
  | 'fieldItemId'
  | JiraIssueItemFieldItemKeySpecifier
)[];
export type JiraIssueItemFieldItemFieldPolicy = {
  containerPosition?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldItemId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueItemGroupContainerKeySpecifier = (
  | 'groupContainerId'
  | 'items'
  | 'minimised'
  | 'name'
  | JiraIssueItemGroupContainerKeySpecifier
)[];
export type JiraIssueItemGroupContainerFieldPolicy = {
  groupContainerId?: FieldPolicy<any> | FieldReadFunction<any>;
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  minimised?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueItemGroupContainerItemConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | 'totalCount'
  | JiraIssueItemGroupContainerItemConnectionKeySpecifier
)[];
export type JiraIssueItemGroupContainerItemConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueItemGroupContainerItemEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraIssueItemGroupContainerItemEdgeKeySpecifier
)[];
export type JiraIssueItemGroupContainerItemEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueItemPanelItemKeySpecifier = (
  | 'panelItemId'
  | JiraIssueItemPanelItemKeySpecifier
)[];
export type JiraIssueItemPanelItemFieldPolicy = {
  panelItemId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueItemTabContainerKeySpecifier = (
  | 'items'
  | 'name'
  | 'tabContainerId'
  | JiraIssueItemTabContainerKeySpecifier
)[];
export type JiraIssueItemTabContainerFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  tabContainerId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueItemTabContainerItemConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | 'totalCount'
  | JiraIssueItemTabContainerItemConnectionKeySpecifier
)[];
export type JiraIssueItemTabContainerItemConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueItemTabContainerItemEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraIssueItemTabContainerItemEdgeKeySpecifier
)[];
export type JiraIssueItemTabContainerItemEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueItemLayoutDefaultItemLocationKeySpecifier = (
  | 'containerLocation'
  | 'itemLocationRuleType'
  | JiraIssueItemLayoutDefaultItemLocationKeySpecifier
)[];
export type JiraIssueItemLayoutDefaultItemLocationFieldPolicy = {
  containerLocation?: FieldPolicy<any> | FieldReadFunction<any>;
  itemLocationRuleType?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlBuilderKeySpecifier = (
  | 'cascadingSelectOptions'
  | 'fieldValues'
  | 'fields'
  | 'functions'
  | 'hydrateJqlQuery'
  | 'hydrateJqlQueryForFilter'
  | 'issueTypes'
  | 'lastUsedMode'
  | 'recentFields'
  | 'recentlyUsedProjects'
  | 'recentlyUsedSprints'
  | 'recentlyUsedUsers'
  | 'suggestedGroups'
  | 'versions'
  | JiraJqlBuilderKeySpecifier
)[];
export type JiraJqlBuilderFieldPolicy = {
  cascadingSelectOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldValues?: FieldPolicy<any> | FieldReadFunction<any>;
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
  functions?: FieldPolicy<any> | FieldReadFunction<any>;
  hydrateJqlQuery?: FieldPolicy<any> | FieldReadFunction<any>;
  hydrateJqlQueryForFilter?: FieldPolicy<any> | FieldReadFunction<any>;
  issueTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUsedMode?: FieldPolicy<any> | FieldReadFunction<any>;
  recentFields?: FieldPolicy<any> | FieldReadFunction<any>;
  recentlyUsedProjects?: FieldPolicy<any> | FieldReadFunction<any>;
  recentlyUsedSprints?: FieldPolicy<any> | FieldReadFunction<any>;
  recentlyUsedUsers?: FieldPolicy<any> | FieldReadFunction<any>;
  suggestedGroups?: FieldPolicy<any> | FieldReadFunction<any>;
  versions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlOptionFieldValueConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraJqlOptionFieldValueConnectionKeySpecifier
)[];
export type JiraJqlOptionFieldValueConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlOptionFieldValueEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraJqlOptionFieldValueEdgeKeySpecifier
)[];
export type JiraJqlOptionFieldValueEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlOptionFieldValueKeySpecifier = (
  | 'displayName'
  | 'jqlTerm'
  | JiraJqlOptionFieldValueKeySpecifier
)[];
export type JiraJqlOptionFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlFieldValueKeySpecifier = (
  | 'displayName'
  | 'jqlTerm'
  | JiraJqlFieldValueKeySpecifier
)[];
export type JiraJqlFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlFieldValueConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraJqlFieldValueConnectionKeySpecifier
)[];
export type JiraJqlFieldValueConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlFieldValueEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraJqlFieldValueEdgeKeySpecifier
)[];
export type JiraJqlFieldValueEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlFieldConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraJqlFieldConnectionKeySpecifier
)[];
export type JiraJqlFieldConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlFieldEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraJqlFieldEdgeKeySpecifier
)[];
export type JiraJqlFieldEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlFieldKeySpecifier = (
  | 'allowedClauseTypes'
  | 'autoCompleteTemplate'
  | 'dataTypes'
  | 'displayName'
  | 'jqlFieldType'
  | 'jqlTerm'
  | 'operators'
  | 'searchTemplate'
  | 'shouldShowInContext'
  | JiraJqlFieldKeySpecifier
)[];
export type JiraJqlFieldFieldPolicy = {
  allowedClauseTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  autoCompleteTemplate?: FieldPolicy<any> | FieldReadFunction<any>;
  dataTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlFieldType?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  operators?: FieldPolicy<any> | FieldReadFunction<any>;
  searchTemplate?: FieldPolicy<any> | FieldReadFunction<any>;
  shouldShowInContext?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlFieldTypeKeySpecifier = (
  | 'displayName'
  | 'jqlTerm'
  | JiraJqlFieldTypeKeySpecifier
)[];
export type JiraJqlFieldTypeFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlSearchTemplateKeySpecifier = (
  | 'key'
  | JiraJqlSearchTemplateKeySpecifier
)[];
export type JiraJqlSearchTemplateFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlFunctionKeySpecifier = (
  | 'dataTypes'
  | 'displayName'
  | 'isList'
  | 'value'
  | JiraJqlFunctionKeySpecifier
)[];
export type JiraJqlFunctionFieldPolicy = {
  dataTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  isList?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlHydratedQueryKeySpecifier = (
  | 'fields'
  | 'jql'
  | JiraJqlHydratedQueryKeySpecifier
)[];
export type JiraJqlHydratedQueryFieldPolicy = {
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
  jql?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlQueryHydratedErrorKeySpecifier = (
  | 'error'
  | 'jqlTerm'
  | JiraJqlQueryHydratedErrorKeySpecifier
)[];
export type JiraJqlQueryHydratedErrorFieldPolicy = {
  error?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlQueryHydratedFieldKeySpecifier = (
  | 'field'
  | 'jqlTerm'
  | 'values'
  | JiraJqlQueryHydratedFieldKeySpecifier
)[];
export type JiraJqlQueryHydratedFieldFieldPolicy = {
  field?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  values?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlQueryHydratedValueKeySpecifier = (
  | 'jqlTerm'
  | 'values'
  | JiraJqlQueryHydratedValueKeySpecifier
)[];
export type JiraJqlQueryHydratedValueFieldPolicy = {
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  values?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlIssueTypesKeySpecifier = (
  | 'aboveBaseLevel'
  | 'baseLevel'
  | 'belowBaseLevel'
  | JiraJqlIssueTypesKeySpecifier
)[];
export type JiraJqlIssueTypesFieldPolicy = {
  aboveBaseLevel?: FieldPolicy<any> | FieldReadFunction<any>;
  baseLevel?: FieldPolicy<any> | FieldReadFunction<any>;
  belowBaseLevel?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlIssueTypeFieldValueConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraJqlIssueTypeFieldValueConnectionKeySpecifier
)[];
export type JiraJqlIssueTypeFieldValueConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlIssueTypeFieldValueEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraJqlIssueTypeFieldValueEdgeKeySpecifier
)[];
export type JiraJqlIssueTypeFieldValueEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlIssueTypeFieldValueKeySpecifier = (
  | 'displayName'
  | 'issueTypes'
  | 'jqlTerm'
  | JiraJqlIssueTypeFieldValueKeySpecifier
)[];
export type JiraJqlIssueTypeFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  issueTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueTypeKeySpecifier = (
  | 'avatar'
  | 'description'
  | 'id'
  | 'name'
  | JiraIssueTypeKeySpecifier
)[];
export type JiraIssueTypeFieldPolicy = {
  avatar?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlProjectFieldValueConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraJqlProjectFieldValueConnectionKeySpecifier
)[];
export type JiraJqlProjectFieldValueConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlProjectFieldValueEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraJqlProjectFieldValueEdgeKeySpecifier
)[];
export type JiraJqlProjectFieldValueEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlProjectFieldValueKeySpecifier = (
  | 'displayName'
  | 'jqlTerm'
  | 'project'
  | JiraJqlProjectFieldValueKeySpecifier
)[];
export type JiraJqlProjectFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  project?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlSprintFieldValueConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraJqlSprintFieldValueConnectionKeySpecifier
)[];
export type JiraJqlSprintFieldValueConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlSprintFieldValueEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraJqlSprintFieldValueEdgeKeySpecifier
)[];
export type JiraJqlSprintFieldValueEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlSprintFieldValueKeySpecifier = (
  | 'displayName'
  | 'jqlTerm'
  | 'sprint'
  | JiraJqlSprintFieldValueKeySpecifier
)[];
export type JiraJqlSprintFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  sprint?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraSprintKeySpecifier = (
  | 'boardName'
  | 'endDate'
  | 'id'
  | 'name'
  | 'sprintId'
  | 'startDate'
  | 'state'
  | JiraSprintKeySpecifier
)[];
export type JiraSprintFieldPolicy = {
  boardName?: FieldPolicy<any> | FieldReadFunction<any>;
  endDate?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  sprintId?: FieldPolicy<any> | FieldReadFunction<any>;
  startDate?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlUserFieldValueConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraJqlUserFieldValueConnectionKeySpecifier
)[];
export type JiraJqlUserFieldValueConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlUserFieldValueEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraJqlUserFieldValueEdgeKeySpecifier
)[];
export type JiraJqlUserFieldValueEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlUserFieldValueKeySpecifier = (
  | 'displayName'
  | 'jqlTerm'
  | 'user'
  | JiraJqlUserFieldValueKeySpecifier
)[];
export type JiraJqlUserFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlGroupFieldValueConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraJqlGroupFieldValueConnectionKeySpecifier
)[];
export type JiraJqlGroupFieldValueConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlGroupFieldValueEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraJqlGroupFieldValueEdgeKeySpecifier
)[];
export type JiraJqlGroupFieldValueEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlGroupFieldValueKeySpecifier = (
  | 'displayName'
  | 'group'
  | 'jqlTerm'
  | JiraJqlGroupFieldValueKeySpecifier
)[];
export type JiraJqlGroupFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  group?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlVersionsKeySpecifier = (
  | 'archived'
  | 'released'
  | 'unreleased'
  | JiraJqlVersionsKeySpecifier
)[];
export type JiraJqlVersionsFieldPolicy = {
  archived?: FieldPolicy<any> | FieldReadFunction<any>;
  released?: FieldPolicy<any> | FieldReadFunction<any>;
  unreleased?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlVersionFieldValueConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraJqlVersionFieldValueConnectionKeySpecifier
)[];
export type JiraJqlVersionFieldValueConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlVersionFieldValueEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraJqlVersionFieldValueEdgeKeySpecifier
)[];
export type JiraJqlVersionFieldValueEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlVersionFieldValueKeySpecifier = (
  | 'displayName'
  | 'jqlTerm'
  | JiraJqlVersionFieldValueKeySpecifier
)[];
export type JiraJqlVersionFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPermissionGrantValueConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraPermissionGrantValueConnectionKeySpecifier
)[];
export type JiraPermissionGrantValueConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPermissionGrantValueEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraPermissionGrantValueEdgeKeySpecifier
)[];
export type JiraPermissionGrantValueEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPermissionGrantValueKeySpecifier = (
  | 'id'
  | 'value'
  | JiraPermissionGrantValueKeySpecifier
)[];
export type JiraPermissionGrantValueFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraVersionKeySpecifier = (
  | 'description'
  | 'iconUrl'
  | 'id'
  | 'name'
  | 'releaseDate'
  | 'startDate'
  | 'status'
  | 'versionId'
  | JiraVersionKeySpecifier
)[];
export type JiraVersionFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  releaseDate?: FieldPolicy<any> | FieldReadFunction<any>;
  startDate?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  versionId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPermissionSchemeViewKeySpecifier = (
  | 'grantGroups'
  | 'scheme'
  | JiraPermissionSchemeViewKeySpecifier
)[];
export type JiraPermissionSchemeViewFieldPolicy = {
  grantGroups?: FieldPolicy<any> | FieldReadFunction<any>;
  scheme?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPermissionSchemeGrantGroupKeySpecifier = (
  | 'category'
  | 'grantHolders'
  | JiraPermissionSchemeGrantGroupKeySpecifier
)[];
export type JiraPermissionSchemeGrantGroupFieldPolicy = {
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  grantHolders?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectPermissionCategoryKeySpecifier = (
  | 'key'
  | 'name'
  | JiraProjectPermissionCategoryKeySpecifier
)[];
export type JiraProjectPermissionCategoryFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPermissionGrantHolderKeySpecifier = (
  | 'grants'
  | 'permission'
  | JiraPermissionGrantHolderKeySpecifier
)[];
export type JiraPermissionGrantHolderFieldPolicy = {
  grants?: FieldPolicy<any> | FieldReadFunction<any>;
  permission?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPermissionGrantsKeySpecifier = (
  | 'grantType'
  | 'grantValues'
  | JiraPermissionGrantsKeySpecifier
)[];
export type JiraPermissionGrantsFieldPolicy = {
  grantType?: FieldPolicy<any> | FieldReadFunction<any>;
  grantValues?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectPermissionKeySpecifier = (
  | 'description'
  | 'key'
  | 'name'
  | 'type'
  | JiraProjectPermissionKeySpecifier
)[];
export type JiraProjectPermissionFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPermissionSchemeKeySpecifier = (
  | 'description'
  | 'id'
  | 'name'
  | JiraPermissionSchemeKeySpecifier
)[];
export type JiraPermissionSchemeFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraReleasesKeySpecifier = (
  | 'deployments'
  | 'deploymentsById'
  | 'epics'
  | 'issues'
  | JiraReleasesKeySpecifier
)[];
export type JiraReleasesFieldPolicy = {
  deployments?: FieldPolicy<any> | FieldReadFunction<any>;
  deploymentsById?: FieldPolicy<any> | FieldReadFunction<any>;
  epics?: FieldPolicy<any> | FieldReadFunction<any>;
  issues?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraReleasesDeploymentSummaryConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | JiraReleasesDeploymentSummaryConnectionKeySpecifier
)[];
export type JiraReleasesDeploymentSummaryConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraReleasesDeploymentSummaryEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraReleasesDeploymentSummaryEdgeKeySpecifier
)[];
export type JiraReleasesDeploymentSummaryEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraReleasesEpicConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | JiraReleasesEpicConnectionKeySpecifier
)[];
export type JiraReleasesEpicConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraReleasesEpicEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraReleasesEpicEdgeKeySpecifier
)[];
export type JiraReleasesEpicEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraReleasesEpicKeySpecifier = (
  | 'assignee'
  | 'color'
  | 'id'
  | 'issueKey'
  | 'issueTypeId'
  | 'lastDeployed'
  | 'summary'
  | JiraReleasesEpicKeySpecifier
)[];
export type JiraReleasesEpicFieldPolicy = {
  assignee?: FieldPolicy<any> | FieldReadFunction<any>;
  color?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  issueKey?: FieldPolicy<any> | FieldReadFunction<any>;
  issueTypeId?: FieldPolicy<any> | FieldReadFunction<any>;
  lastDeployed?: FieldPolicy<any> | FieldReadFunction<any>;
  summary?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraReleasesIssueConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | JiraReleasesIssueConnectionKeySpecifier
)[];
export type JiraReleasesIssueConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraReleasesIssueEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraReleasesIssueEdgeKeySpecifier
)[];
export type JiraReleasesIssueEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraReleasesIssueKeySpecifier = (
  | 'assignee'
  | 'epic'
  | 'id'
  | 'issueKey'
  | 'issueTypeId'
  | 'lastDeployed'
  | 'summary'
  | JiraReleasesIssueKeySpecifier
)[];
export type JiraReleasesIssueFieldPolicy = {
  assignee?: FieldPolicy<any> | FieldReadFunction<any>;
  epic?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  issueKey?: FieldPolicy<any> | FieldReadFunction<any>;
  issueTypeId?: FieldPolicy<any> | FieldReadFunction<any>;
  lastDeployed?: FieldPolicy<any> | FieldReadFunction<any>;
  summary?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplacePricingPlanKeySpecifier = (
  | 'billingCycle'
  | 'currency'
  | 'status'
  | 'tieredPricing'
  | MarketplacePricingPlanKeySpecifier
)[];
export type MarketplacePricingPlanFieldPolicy = {
  billingCycle?: FieldPolicy<any> | FieldReadFunction<any>;
  currency?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  tieredPricing?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceTieredPricingKeySpecifier = (
  | 'items'
  | 'tierType'
  | 'tiersMode'
  | MarketplaceTieredPricingKeySpecifier
)[];
export type MarketplaceTieredPricingFieldPolicy = {
  items?: FieldPolicy<any> | FieldReadFunction<any>;
  tierType?: FieldPolicy<any> | FieldReadFunction<any>;
  tiersMode?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplacePricingItemKeySpecifier = (
  | 'amount'
  | 'ceiling'
  | 'floor'
  | 'policy'
  | MarketplacePricingItemKeySpecifier
)[];
export type MarketplacePricingItemFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  ceiling?: FieldPolicy<any> | FieldReadFunction<any>;
  floor?: FieldPolicy<any> | FieldReadFunction<any>;
  policy?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceUserKeySpecifier = (
  | 'appPermissions'
  | 'id'
  | MarketplaceUserKeySpecifier
)[];
export type MarketplaceUserFieldPolicy = {
  appPermissions?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuthenticationContextKeySpecifier = (
  | 'user'
  | AuthenticationContextKeySpecifier
)[];
export type AuthenticationContextFieldPolicy = {
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TestingMovieKeySpecifier = (
  | 'characters'
  | 'id'
  | 'renamedName'
  | TestingMovieKeySpecifier
)[];
export type TestingMovieFieldPolicy = {
  characters?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  renamedName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TestingCharacterKeySpecifier = (
  | 'id'
  | 'name'
  | TestingCharacterKeySpecifier
)[];
export type TestingCharacterFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OpsgenieQueryKeySpecifier = (
  | 'allOpsgenieTeams'
  | 'myOpsgenieSchedules'
  | 'opsgenieTeam'
  | 'opsgenieTeams'
  | 'opsgenieTeamsWithServiceModificationPermissions'
  | OpsgenieQueryKeySpecifier
)[];
export type OpsgenieQueryFieldPolicy = {
  allOpsgenieTeams?: FieldPolicy<any> | FieldReadFunction<any>;
  myOpsgenieSchedules?: FieldPolicy<any> | FieldReadFunction<any>;
  opsgenieTeam?: FieldPolicy<any> | FieldReadFunction<any>;
  opsgenieTeams?: FieldPolicy<any> | FieldReadFunction<any>;
  opsgenieTeamsWithServiceModificationPermissions?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
};
export type PolarisAnonymousVisitorViewHashKeySpecifier = (
  | 'cloudId'
  | 'hash'
  | 'projectId'
  | 'projectKey'
  | 'viewId'
  | PolarisAnonymousVisitorViewHashKeySpecifier
)[];
export type PolarisAnonymousVisitorViewHashFieldPolicy = {
  cloudId?: FieldPolicy<any> | FieldReadFunction<any>;
  hash?: FieldPolicy<any> | FieldReadFunction<any>;
  projectId?: FieldPolicy<any> | FieldReadFunction<any>;
  projectKey?: FieldPolicy<any> | FieldReadFunction<any>;
  viewId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisDelegationTokenKeySpecifier = (
  | 'expires'
  | 'token'
  | 'url'
  | PolarisDelegationTokenKeySpecifier
)[];
export type PolarisDelegationTokenFieldPolicy = {
  expires?: FieldPolicy<any> | FieldReadFunction<any>;
  token?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisConnectAppKeySpecifier = (
  | 'appId'
  | 'avatarUrl'
  | 'id'
  | 'name'
  | 'oauthClientId'
  | 'play'
  | PolarisConnectAppKeySpecifier
)[];
export type PolarisConnectAppFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  avatarUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  oauthClientId?: FieldPolicy<any> | FieldReadFunction<any>;
  play?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisPlayKeySpecifier = (
  | 'contribution'
  | 'contributions'
  | 'fields'
  | 'id'
  | 'kind'
  | 'label'
  | 'parameters'
  | 'view'
  | PolarisPlayKeySpecifier
)[];
export type PolarisPlayFieldPolicy = {
  contribution?: FieldPolicy<any> | FieldReadFunction<any>;
  contributions?: FieldPolicy<any> | FieldReadFunction<any>;
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  kind?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  parameters?: FieldPolicy<any> | FieldReadFunction<any>;
  view?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisPlayContributionKeySpecifier = (
  | 'aaid'
  | 'amount'
  | 'appearsIn'
  | 'comment'
  | 'created'
  | 'id'
  | 'play'
  | 'subject'
  | 'updated'
  | PolarisPlayContributionKeySpecifier
)[];
export type PolarisPlayContributionFieldPolicy = {
  aaid?: FieldPolicy<any> | FieldReadFunction<any>;
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  appearsIn?: FieldPolicy<any> | FieldReadFunction<any>;
  comment?: FieldPolicy<any> | FieldReadFunction<any>;
  created?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  play?: FieldPolicy<any> | FieldReadFunction<any>;
  subject?: FieldPolicy<any> | FieldReadFunction<any>;
  updated?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisInsightKeySpecifier = (
  | 'aaid'
  | 'account'
  | 'container'
  | 'contribs'
  | 'created'
  | 'description'
  | 'id'
  | 'play'
  | 'snippets'
  | 'updated'
  | PolarisInsightKeySpecifier
)[];
export type PolarisInsightFieldPolicy = {
  aaid?: FieldPolicy<any> | FieldReadFunction<any>;
  account?: FieldPolicy<any> | FieldReadFunction<any>;
  container?: FieldPolicy<any> | FieldReadFunction<any>;
  contribs?: FieldPolicy<any> | FieldReadFunction<any>;
  created?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  play?: FieldPolicy<any> | FieldReadFunction<any>;
  snippets?: FieldPolicy<any> | FieldReadFunction<any>;
  updated?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisSnippetKeySpecifier = (
  | 'appInfo'
  | 'data'
  | 'id'
  | 'oauthClientId'
  | 'properties'
  | 'refresh'
  | 'updated'
  | 'url'
  | PolarisSnippetKeySpecifier
)[];
export type PolarisSnippetFieldPolicy = {
  appInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  data?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  oauthClientId?: FieldPolicy<any> | FieldReadFunction<any>;
  properties?: FieldPolicy<any> | FieldReadFunction<any>;
  refresh?: FieldPolicy<any> | FieldReadFunction<any>;
  updated?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisRefreshInfoKeySpecifier = (
  | 'autoSeconds'
  | 'error'
  | 'errorCode'
  | 'errorType'
  | 'last'
  | 'next'
  | 'queued'
  | 'timeToLiveSeconds'
  | PolarisRefreshInfoKeySpecifier
)[];
export type PolarisRefreshInfoFieldPolicy = {
  autoSeconds?: FieldPolicy<any> | FieldReadFunction<any>;
  error?: FieldPolicy<any> | FieldReadFunction<any>;
  errorCode?: FieldPolicy<any> | FieldReadFunction<any>;
  errorType?: FieldPolicy<any> | FieldReadFunction<any>;
  last?: FieldPolicy<any> | FieldReadFunction<any>;
  next?: FieldPolicy<any> | FieldReadFunction<any>;
  queued?: FieldPolicy<any> | FieldReadFunction<any>;
  timeToLiveSeconds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisCommentKeySpecifier = (
  | 'aaid'
  | 'account'
  | 'content'
  | 'created'
  | 'id'
  | 'kind'
  | 'subject'
  | 'updated'
  | PolarisCommentKeySpecifier
)[];
export type PolarisCommentFieldPolicy = {
  aaid?: FieldPolicy<any> | FieldReadFunction<any>;
  account?: FieldPolicy<any> | FieldReadFunction<any>;
  content?: FieldPolicy<any> | FieldReadFunction<any>;
  created?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  kind?: FieldPolicy<any> | FieldReadFunction<any>;
  subject?: FieldPolicy<any> | FieldReadFunction<any>;
  updated?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaPlayFieldKeySpecifier = (
  | 'aspect'
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'play'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaPlayFieldKeySpecifier
)[];
export type PolarisIdeaPlayFieldFieldPolicy = {
  aspect?: FieldPolicy<any> | FieldReadFunction<any>;
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  play?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaFieldKeySpecifier
)[];
export type PolarisIdeaFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisDecorationKeySpecifier = (
  | 'id'
  | 'valueDecoration'
  | 'valueRules'
  | PolarisDecorationKeySpecifier
)[];
export type PolarisDecorationFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  valueDecoration?: FieldPolicy<any> | FieldReadFunction<any>;
  valueRules?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisValueDecorationKeySpecifier = (
  | 'backgroundColor'
  | 'emoji'
  | 'highlightContainer'
  | PolarisValueDecorationKeySpecifier
)[];
export type PolarisValueDecorationFieldPolicy = {
  backgroundColor?: FieldPolicy<any> | FieldReadFunction<any>;
  emoji?: FieldPolicy<any> | FieldReadFunction<any>;
  highlightContainer?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisValueRuleKeySpecifier = (
  | 'operator'
  | 'value'
  | PolarisValueRuleKeySpecifier
)[];
export type PolarisValueRuleFieldPolicy = {
  operator?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisPresentationKeySpecifier = (
  | 'parameters'
  | 'type'
  | PolarisPresentationKeySpecifier
)[];
export type PolarisPresentationFieldPolicy = {
  parameters?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisViewKeySpecifier = (
  | 'collabServiceDelegation'
  | 'comments'
  | 'containsArchived'
  | 'description'
  | 'fields'
  | 'filter'
  | 'groupBy'
  | 'groupValues'
  | 'hidden'
  | 'id'
  | 'immutable'
  | 'jql'
  | 'lastCommentsViewedTimestamp'
  | 'lastViewed'
  | 'name'
  | 'projectId'
  | 'rank'
  | 'sort'
  | 'tableColumnSizes'
  | 'userJql'
  | 'verticalGroupBy'
  | 'verticalGroupValues'
  | 'viewSetId'
  | 'visualizationType'
  | 'x'
  | 'y'
  | PolarisViewKeySpecifier
)[];
export type PolarisViewFieldPolicy = {
  collabServiceDelegation?: FieldPolicy<any> | FieldReadFunction<any>;
  comments?: FieldPolicy<any> | FieldReadFunction<any>;
  containsArchived?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
  filter?: FieldPolicy<any> | FieldReadFunction<any>;
  groupBy?: FieldPolicy<any> | FieldReadFunction<any>;
  groupValues?: FieldPolicy<any> | FieldReadFunction<any>;
  hidden?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  immutable?: FieldPolicy<any> | FieldReadFunction<any>;
  jql?: FieldPolicy<any> | FieldReadFunction<any>;
  lastCommentsViewedTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  lastViewed?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  projectId?: FieldPolicy<any> | FieldReadFunction<any>;
  rank?: FieldPolicy<any> | FieldReadFunction<any>;
  sort?: FieldPolicy<any> | FieldReadFunction<any>;
  tableColumnSizes?: FieldPolicy<any> | FieldReadFunction<any>;
  userJql?: FieldPolicy<any> | FieldReadFunction<any>;
  verticalGroupBy?: FieldPolicy<any> | FieldReadFunction<any>;
  verticalGroupValues?: FieldPolicy<any> | FieldReadFunction<any>;
  viewSetId?: FieldPolicy<any> | FieldReadFunction<any>;
  visualizationType?: FieldPolicy<any> | FieldReadFunction<any>;
  x?: FieldPolicy<any> | FieldReadFunction<any>;
  y?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisViewFilterKeySpecifier = (
  | 'field'
  | 'kind'
  | 'values'
  | PolarisViewFilterKeySpecifier
)[];
export type PolarisViewFilterFieldPolicy = {
  field?: FieldPolicy<any> | FieldReadFunction<any>;
  kind?: FieldPolicy<any> | FieldReadFunction<any>;
  values?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisViewFilterValueKeySpecifier = (
  | 'numericValue'
  | 'operator'
  | 'stringValue'
  | PolarisViewFilterValueKeySpecifier
)[];
export type PolarisViewFilterValueFieldPolicy = {
  numericValue?: FieldPolicy<any> | FieldReadFunction<any>;
  operator?: FieldPolicy<any> | FieldReadFunction<any>;
  stringValue?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisGroupValueKeySpecifier = (
  | 'id'
  | 'label'
  | PolarisGroupValueKeySpecifier
)[];
export type PolarisGroupValueFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisViewLastViewedKeySpecifier = (
  | 'aaid'
  | 'account'
  | 'timestamp'
  | PolarisViewLastViewedKeySpecifier
)[];
export type PolarisViewLastViewedFieldPolicy = {
  aaid?: FieldPolicy<any> | FieldReadFunction<any>;
  account?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisSortFieldKeySpecifier = (
  | 'field'
  | 'order'
  | PolarisSortFieldKeySpecifier
)[];
export type PolarisSortFieldFieldPolicy = {
  field?: FieldPolicy<any> | FieldReadFunction<any>;
  order?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisViewTableColumnSizeKeySpecifier = (
  | 'field'
  | 'size'
  | PolarisViewTableColumnSizeKeySpecifier
)[];
export type PolarisViewTableColumnSizeFieldPolicy = {
  field?: FieldPolicy<any> | FieldReadFunction<any>;
  size?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeasKeySpecifier = (
  | 'ideas'
  | 'total'
  | PolarisIdeasKeySpecifier
)[];
export type PolarisIdeasFieldPolicy = {
  ideas?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisRestIdeaKeySpecifier = (
  | 'fields'
  | 'id'
  | 'key'
  | PolarisRestIdeaKeySpecifier
)[];
export type PolarisRestIdeaFieldPolicy = {
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LabelUsageKeySpecifier = (
  | 'count'
  | 'label'
  | LabelUsageKeySpecifier
)[];
export type LabelUsageFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisProjectKeySpecifier = (
  | 'activationId'
  | 'arjConfiguration'
  | 'arjHierarchyConfiguration'
  | 'avatarUrls'
  | 'fields'
  | 'id'
  | 'ideaTypes'
  | 'ideas'
  | 'insights'
  | 'issueLinkType'
  | 'key'
  | 'name'
  | 'onboarded'
  | 'play'
  | 'plays'
  | 'rankField'
  | 'refreshing'
  | 'selectedDeliveryProject'
  | 'snippetProviders'
  | 'statusCategories'
  | 'template'
  | 'views'
  | 'viewsets'
  | PolarisProjectKeySpecifier
)[];
export type PolarisProjectFieldPolicy = {
  activationId?: FieldPolicy<any> | FieldReadFunction<any>;
  arjConfiguration?: FieldPolicy<any> | FieldReadFunction<any>;
  arjHierarchyConfiguration?: FieldPolicy<any> | FieldReadFunction<any>;
  avatarUrls?: FieldPolicy<any> | FieldReadFunction<any>;
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  ideaTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  ideas?: FieldPolicy<any> | FieldReadFunction<any>;
  insights?: FieldPolicy<any> | FieldReadFunction<any>;
  issueLinkType?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  onboarded?: FieldPolicy<any> | FieldReadFunction<any>;
  play?: FieldPolicy<any> | FieldReadFunction<any>;
  plays?: FieldPolicy<any> | FieldReadFunction<any>;
  rankField?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshing?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedDeliveryProject?: FieldPolicy<any> | FieldReadFunction<any>;
  snippetProviders?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCategories?: FieldPolicy<any> | FieldReadFunction<any>;
  template?: FieldPolicy<any> | FieldReadFunction<any>;
  views?: FieldPolicy<any> | FieldReadFunction<any>;
  viewsets?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ArjConfigurationKeySpecifier = (
  | 'epicLinkCustomFieldId'
  | 'parentCustomFieldId'
  | ArjConfigurationKeySpecifier
)[];
export type ArjConfigurationFieldPolicy = {
  epicLinkCustomFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  parentCustomFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ArjHierarchyConfigurationLevelKeySpecifier = (
  | 'issueTypes'
  | 'title'
  | ArjHierarchyConfigurationLevelKeySpecifier
)[];
export type ArjHierarchyConfigurationLevelFieldPolicy = {
  issueTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ProjectAvatarsKeySpecifier = (
  | 'x16'
  | 'x24'
  | 'x32'
  | 'x48'
  | ProjectAvatarsKeySpecifier
)[];
export type ProjectAvatarsFieldPolicy = {
  x16?: FieldPolicy<any> | FieldReadFunction<any>;
  x24?: FieldPolicy<any> | FieldReadFunction<any>;
  x32?: FieldPolicy<any> | FieldReadFunction<any>;
  x48?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaTypeKeySpecifier = (
  | 'description'
  | 'iconUrl'
  | 'id'
  | 'name'
  | PolarisIdeaTypeKeySpecifier
)[];
export type PolarisIdeaTypeFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaKeySpecifier = (
  | 'archived'
  | 'id'
  | 'lastCommentsViewedTimestamp'
  | 'lastInsightsViewedTimestamp'
  | PolarisIdeaKeySpecifier
)[];
export type PolarisIdeaFieldPolicy = {
  archived?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lastCommentsViewedTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  lastInsightsViewedTimestamp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIssueLinkTypeKeySpecifier = (
  | 'datapoint'
  | 'delivery'
  | 'merge'
  | PolarisIssueLinkTypeKeySpecifier
)[];
export type PolarisIssueLinkTypeFieldPolicy = {
  datapoint?: FieldPolicy<any> | FieldReadFunction<any>;
  delivery?: FieldPolicy<any> | FieldReadFunction<any>;
  merge?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisRefreshStatusKeySpecifier = (
  | 'count'
  | 'errors'
  | 'last'
  | 'pending'
  | PolarisRefreshStatusKeySpecifier
)[];
export type PolarisRefreshStatusFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  last?: FieldPolicy<any> | FieldReadFunction<any>;
  pending?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisSnippetProviderKeySpecifier = (
  | 'app'
  | 'groups'
  | 'id'
  | 'properties'
  | PolarisSnippetProviderKeySpecifier
)[];
export type PolarisSnippetProviderFieldPolicy = {
  app?: FieldPolicy<any> | FieldReadFunction<any>;
  groups?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  properties?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisSnippetGroupDeclKeySpecifier = (
  | 'id'
  | 'key'
  | 'label'
  | 'properties'
  | PolarisSnippetGroupDeclKeySpecifier
)[];
export type PolarisSnippetGroupDeclFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  properties?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisSnippetPropertyDeclKeySpecifier = (
  | 'id'
  | 'key'
  | 'kind'
  | 'label'
  | PolarisSnippetPropertyDeclKeySpecifier
)[];
export type PolarisSnippetPropertyDeclFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  kind?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisStatusCategoryKeySpecifier = (
  | 'colorName'
  | 'id'
  | 'key'
  | 'name'
  | PolarisStatusCategoryKeySpecifier
)[];
export type PolarisStatusCategoryFieldPolicy = {
  colorName?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisProjectTemplateKeySpecifier = (
  | 'ideas'
  | PolarisProjectTemplateKeySpecifier
)[];
export type PolarisProjectTemplateFieldPolicy = {
  ideas?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisViewSetKeySpecifier = (
  | 'id'
  | 'name'
  | 'rank'
  | 'type'
  | 'views'
  | 'viewsets'
  | PolarisViewSetKeySpecifier
)[];
export type PolarisViewSetFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  rank?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  views?: FieldPolicy<any> | FieldReadFunction<any>;
  viewsets?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisSnippetPropertiesConfigKeySpecifier = (
  | 'config'
  | PolarisSnippetPropertiesConfigKeySpecifier
)[];
export type PolarisSnippetPropertiesConfigFieldPolicy = {
  config?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisTermsConsentKeySpecifier = (
  | 'consented'
  | 'locale'
  | 'requiresMarketingConsent'
  | PolarisTermsConsentKeySpecifier
)[];
export type PolarisTermsConsentFieldPolicy = {
  consented?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  requiresMarketingConsent?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapsQueryKeySpecifier = (
  | 'roadmapForSource'
  | 'roadmapItemByIds'
  | RoadmapsQueryKeySpecifier
)[];
export type RoadmapsQueryFieldPolicy = {
  roadmapForSource?: FieldPolicy<any> | FieldReadFunction<any>;
  roadmapItemByIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapDetailsKeySpecifier = (
  | 'metadata'
  | 'roadmapConfiguration'
  | 'roadmapItems'
  | RoadmapDetailsKeySpecifier
)[];
export type RoadmapDetailsFieldPolicy = {
  metadata?: FieldPolicy<any> | FieldReadFunction<any>;
  roadmapConfiguration?: FieldPolicy<any> | FieldReadFunction<any>;
  roadmapItems?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapMetadataKeySpecifier = (
  | 'corruptedIssueCount'
  | 'hasExceededEpicLimit'
  | 'hasExceededIssueLimit'
  | RoadmapMetadataKeySpecifier
)[];
export type RoadmapMetadataFieldPolicy = {
  corruptedIssueCount?: FieldPolicy<any> | FieldReadFunction<any>;
  hasExceededEpicLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  hasExceededIssueLimit?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapConfigurationKeySpecifier = (
  | 'boardConfiguration'
  | 'dependencies'
  | 'externalConfiguration'
  | 'isCrossProject'
  | 'projectConfigurations'
  | 'rankIssuesSupported'
  | 'roadmapFeatureEnabled'
  | 'statusCategories'
  | 'userConfiguration'
  | RoadmapConfigurationKeySpecifier
)[];
export type RoadmapConfigurationFieldPolicy = {
  boardConfiguration?: FieldPolicy<any> | FieldReadFunction<any>;
  dependencies?: FieldPolicy<any> | FieldReadFunction<any>;
  externalConfiguration?: FieldPolicy<any> | FieldReadFunction<any>;
  isCrossProject?: FieldPolicy<any> | FieldReadFunction<any>;
  projectConfigurations?: FieldPolicy<any> | FieldReadFunction<any>;
  rankIssuesSupported?: FieldPolicy<any> | FieldReadFunction<any>;
  roadmapFeatureEnabled?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCategories?: FieldPolicy<any> | FieldReadFunction<any>;
  userConfiguration?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapBoardConfigurationKeySpecifier = (
  | 'isBoardJqlFilteringOutEpics'
  | 'isSprintsFeatureEnabled'
  | 'isUserBoardAdmin'
  | 'jql'
  | 'sprints'
  | RoadmapBoardConfigurationKeySpecifier
)[];
export type RoadmapBoardConfigurationFieldPolicy = {
  isBoardJqlFilteringOutEpics?: FieldPolicy<any> | FieldReadFunction<any>;
  isSprintsFeatureEnabled?: FieldPolicy<any> | FieldReadFunction<any>;
  isUserBoardAdmin?: FieldPolicy<any> | FieldReadFunction<any>;
  jql?: FieldPolicy<any> | FieldReadFunction<any>;
  sprints?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapSprintKeySpecifier = (
  | 'endDate'
  | 'id'
  | 'name'
  | 'startDate'
  | 'state'
  | RoadmapSprintKeySpecifier
)[];
export type RoadmapSprintFieldPolicy = {
  endDate?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  startDate?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapDependencyConfigurationKeySpecifier = (
  | 'inwardDependencyDescription'
  | 'isDependenciesEnabled'
  | 'outwardDependencyDescription'
  | RoadmapDependencyConfigurationKeySpecifier
)[];
export type RoadmapDependencyConfigurationFieldPolicy = {
  inwardDependencyDescription?: FieldPolicy<any> | FieldReadFunction<any>;
  isDependenciesEnabled?: FieldPolicy<any> | FieldReadFunction<any>;
  outwardDependencyDescription?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapExternalConfigurationKeySpecifier = (
  | 'colorFields'
  | 'dueDateField'
  | 'epicLinkField'
  | 'epicNameField'
  | 'externalSystem'
  | 'rankField'
  | 'sprintField'
  | 'startDateField'
  | RoadmapExternalConfigurationKeySpecifier
)[];
export type RoadmapExternalConfigurationFieldPolicy = {
  colorFields?: FieldPolicy<any> | FieldReadFunction<any>;
  dueDateField?: FieldPolicy<any> | FieldReadFunction<any>;
  epicLinkField?: FieldPolicy<any> | FieldReadFunction<any>;
  epicNameField?: FieldPolicy<any> | FieldReadFunction<any>;
  externalSystem?: FieldPolicy<any> | FieldReadFunction<any>;
  rankField?: FieldPolicy<any> | FieldReadFunction<any>;
  sprintField?: FieldPolicy<any> | FieldReadFunction<any>;
  startDateField?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapProjectConfigurationKeySpecifier = (
  | 'childItemTypes'
  | 'defaultItemTypeId'
  | 'parentItemTypes'
  | 'permissions'
  | 'projectId'
  | 'projectKey'
  | 'projectName'
  | 'validation'
  | 'versions'
  | RoadmapProjectConfigurationKeySpecifier
)[];
export type RoadmapProjectConfigurationFieldPolicy = {
  childItemTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultItemTypeId?: FieldPolicy<any> | FieldReadFunction<any>;
  parentItemTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  permissions?: FieldPolicy<any> | FieldReadFunction<any>;
  projectId?: FieldPolicy<any> | FieldReadFunction<any>;
  projectKey?: FieldPolicy<any> | FieldReadFunction<any>;
  projectName?: FieldPolicy<any> | FieldReadFunction<any>;
  validation?: FieldPolicy<any> | FieldReadFunction<any>;
  versions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapItemTypeKeySpecifier = (
  | 'avatarId'
  | 'description'
  | 'iconUrl'
  | 'id'
  | 'name'
  | 'requiredFieldIds'
  | 'subtask'
  | RoadmapItemTypeKeySpecifier
)[];
export type RoadmapItemTypeFieldPolicy = {
  avatarId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  requiredFieldIds?: FieldPolicy<any> | FieldReadFunction<any>;
  subtask?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapProjectPermissionsKeySpecifier = (
  | 'canAdministerProjects'
  | 'canCreateIssues'
  | 'canEditIssues'
  | 'canScheduleIssues'
  | RoadmapProjectPermissionsKeySpecifier
)[];
export type RoadmapProjectPermissionsFieldPolicy = {
  canAdministerProjects?: FieldPolicy<any> | FieldReadFunction<any>;
  canCreateIssues?: FieldPolicy<any> | FieldReadFunction<any>;
  canEditIssues?: FieldPolicy<any> | FieldReadFunction<any>;
  canScheduleIssues?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapProjectValidationKeySpecifier = (
  | 'hasAllFieldAssociations'
  | 'hasEpicIssueType'
  | 'hasValidHierarchy'
  | RoadmapProjectValidationKeySpecifier
)[];
export type RoadmapProjectValidationFieldPolicy = {
  hasAllFieldAssociations?: FieldPolicy<any> | FieldReadFunction<any>;
  hasEpicIssueType?: FieldPolicy<any> | FieldReadFunction<any>;
  hasValidHierarchy?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapVersionKeySpecifier = (
  | 'id'
  | 'name'
  | 'status'
  | RoadmapVersionKeySpecifier
)[];
export type RoadmapVersionFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapStatusCategoryKeySpecifier = (
  | 'id'
  | 'key'
  | 'name'
  | RoadmapStatusCategoryKeySpecifier
)[];
export type RoadmapStatusCategoryFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapUserConfigurationKeySpecifier = (
  | 'creationPreferences'
  | 'epicView'
  | 'hasCompletedOnboarding'
  | 'isDependenciesVisible'
  | 'isProgressVisible'
  | 'listWidth'
  | 'timelineMode'
  | RoadmapUserConfigurationKeySpecifier
)[];
export type RoadmapUserConfigurationFieldPolicy = {
  creationPreferences?: FieldPolicy<any> | FieldReadFunction<any>;
  epicView?: FieldPolicy<any> | FieldReadFunction<any>;
  hasCompletedOnboarding?: FieldPolicy<any> | FieldReadFunction<any>;
  isDependenciesVisible?: FieldPolicy<any> | FieldReadFunction<any>;
  isProgressVisible?: FieldPolicy<any> | FieldReadFunction<any>;
  listWidth?: FieldPolicy<any> | FieldReadFunction<any>;
  timelineMode?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapCreationPreferencesKeySpecifier = (
  | 'projectId'
  | RoadmapCreationPreferencesKeySpecifier
)[];
export type RoadmapCreationPreferencesFieldPolicy = {
  projectId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapItemConnectionKeySpecifier = (
  | 'edges'
  | 'nodes'
  | 'pageInfo'
  | RoadmapItemConnectionKeySpecifier
)[];
export type RoadmapItemConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  nodes?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapItemEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | RoadmapItemEdgeKeySpecifier
)[];
export type RoadmapItemEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapItemKeySpecifier = (
  | 'assignee'
  | 'color'
  | 'createdDate'
  | 'dependencies'
  | 'dueDate'
  | 'id'
  | 'inferredDueDate'
  | 'inferredStartDate'
  | 'itemType'
  | 'key'
  | 'labels'
  | 'parentId'
  | 'projectId'
  | 'rank'
  | 'resolutionDate'
  | 'sprintIds'
  | 'startDate'
  | 'status'
  | 'statusCategory'
  | 'summary'
  | 'versionIds'
  | RoadmapItemKeySpecifier
)[];
export type RoadmapItemFieldPolicy = {
  assignee?: FieldPolicy<any> | FieldReadFunction<any>;
  color?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  dependencies?: FieldPolicy<any> | FieldReadFunction<any>;
  dueDate?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  inferredDueDate?: FieldPolicy<any> | FieldReadFunction<any>;
  inferredStartDate?: FieldPolicy<any> | FieldReadFunction<any>;
  itemType?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  labels?: FieldPolicy<any> | FieldReadFunction<any>;
  parentId?: FieldPolicy<any> | FieldReadFunction<any>;
  projectId?: FieldPolicy<any> | FieldReadFunction<any>;
  rank?: FieldPolicy<any> | FieldReadFunction<any>;
  resolutionDate?: FieldPolicy<any> | FieldReadFunction<any>;
  sprintIds?: FieldPolicy<any> | FieldReadFunction<any>;
  startDate?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCategory?: FieldPolicy<any> | FieldReadFunction<any>;
  summary?: FieldPolicy<any> | FieldReadFunction<any>;
  versionIds?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapItemStatusKeySpecifier = (
  | 'id'
  | 'name'
  | 'statusCategory'
  | RoadmapItemStatusKeySpecifier
)[];
export type RoadmapItemStatusFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCategory?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapItemStatusCategoryKeySpecifier = (
  | 'id'
  | 'key'
  | 'name'
  | RoadmapItemStatusCategoryKeySpecifier
)[];
export type RoadmapItemStatusCategoryFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SearchQueryAPIKeySpecifier = (
  | 'search'
  | SearchQueryAPIKeySpecifier
)[];
export type SearchQueryAPIFieldPolicy = {
  search?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SearchItemConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | SearchItemConnectionKeySpecifier
)[];
export type SearchItemConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SearchResultItemEdgeKeySpecifier = (
  | 'node'
  | 'cursor'
  | SearchResultItemEdgeKeySpecifier
)[];
export type SearchResultItemEdgeFieldPolicy = {
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SearchResultKeySpecifier = (
  | 'id'
  | 'title'
  | 'url'
  | 'iconUrl'
  | 'type'
  | 'description'
  | 'lastModifiedDate'
  | SearchResultKeySpecifier
)[];
export type SearchResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  lastModifiedDate?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TeamQueryKeySpecifier = ('team' | TeamQueryKeySpecifier)[];
export type TeamQueryFieldPolicy = {
  team?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TeamKeySpecifier = (
  | 'id'
  | 'displayName'
  | 'smallAvatarImageUrl'
  | 'largeAvatarImageUrl'
  | TeamKeySpecifier
)[];
export type TeamFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  smallAvatarImageUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  largeAvatarImageUrl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TestingKeySpecifier = (
  | 'echo'
  | 'movie'
  | 'movies'
  | 'uuid'
  | TestingKeySpecifier
)[];
export type TestingFieldPolicy = {
  echo?: FieldPolicy<any> | FieldReadFunction<any>;
  movie?: FieldPolicy<any> | FieldReadFunction<any>;
  movies?: FieldPolicy<any> | FieldReadFunction<any>;
  uuid?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TownsquareQueryApiKeySpecifier = (
  | 'commentsByAri'
  | 'goalsByAri'
  | 'projectsByAri'
  | TownsquareQueryApiKeySpecifier
)[];
export type TownsquareQueryApiFieldPolicy = {
  commentsByAri?: FieldPolicy<any> | FieldReadFunction<any>;
  goalsByAri?: FieldPolicy<any> | FieldReadFunction<any>;
  projectsByAri?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TownsquareCommentConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | TownsquareCommentConnectionKeySpecifier
)[];
export type TownsquareCommentConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TownsquareCommentEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | TownsquareCommentEdgeKeySpecifier
)[];
export type TownsquareCommentEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TownsquareCommentKeySpecifier = (
  | 'creator'
  | 'id'
  | 'object'
  | 'url'
  | 'uuid'
  | TownsquareCommentKeySpecifier
)[];
export type TownsquareCommentFieldPolicy = {
  creator?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  object?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
  uuid?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TownsquareCommentObjectKeySpecifier = (
  | 'ari'
  | 'iconData'
  | 'name'
  | 'url'
  | TownsquareCommentObjectKeySpecifier
)[];
export type TownsquareCommentObjectFieldPolicy = {
  ari?: FieldPolicy<any> | FieldReadFunction<any>;
  iconData?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TownsquareGoalConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | TownsquareGoalConnectionKeySpecifier
)[];
export type TownsquareGoalConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TownsquareGoalEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | TownsquareGoalEdgeKeySpecifier
)[];
export type TownsquareGoalEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TownsquareGoalKeySpecifier = (
  | 'archived'
  | 'iconData'
  | 'id'
  | 'key'
  | 'name'
  | 'owner'
  | 'url'
  | 'uuid'
  | TownsquareGoalKeySpecifier
)[];
export type TownsquareGoalFieldPolicy = {
  archived?: FieldPolicy<any> | FieldReadFunction<any>;
  iconData?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  owner?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
  uuid?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TownsquareProjectConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | TownsquareProjectConnectionKeySpecifier
)[];
export type TownsquareProjectConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TownsquareProjectEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | TownsquareProjectEdgeKeySpecifier
)[];
export type TownsquareProjectEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TownsquareProjectKeySpecifier = (
  | 'archived'
  | 'iconData'
  | 'id'
  | 'key'
  | 'name'
  | 'owner'
  | 'url'
  | 'uuid'
  | TownsquareProjectKeySpecifier
)[];
export type TownsquareProjectFieldPolicy = {
  archived?: FieldPolicy<any> | FieldReadFunction<any>;
  iconData?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  owner?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
  uuid?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type WebTriggerUrlKeySpecifier = (
  | 'appId'
  | 'contextId'
  | 'envId'
  | 'extensionId'
  | 'id'
  | 'product'
  | 'tenantContext'
  | 'triggerKey'
  | 'url'
  | WebTriggerUrlKeySpecifier
)[];
export type WebTriggerUrlFieldPolicy = {
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  contextId?: FieldPolicy<any> | FieldReadFunction<any>;
  envId?: FieldPolicy<any> | FieldReadFunction<any>;
  extensionId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  product?: FieldPolicy<any> | FieldReadFunction<any>;
  tenantContext?: FieldPolicy<any> | FieldReadFunction<any>;
  triggerKey?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | 'appStorage'
  | 'applyPolarisProjectTemplate'
  | 'archivePolarisInsights'
  | 'assignIssueParent'
  | 'boardCardMove'
  | 'compass'
  | 'completeSprint'
  | 'configurePolarisRefresh'
  | 'copyPolarisInsights'
  | 'createApp'
  | 'createAppDeployment'
  | 'createAppDeploymentUrl'
  | 'createAppTunnels'
  | 'createCardParent'
  | 'createColumn'
  | 'createCustomFilter'
  | 'createDevOpsService'
  | 'createDevOpsServiceAndJiraProjectRelationship'
  | 'createDevOpsServiceAndOpsgenieTeamRelationship'
  | 'createDevOpsServiceAndRepositoryRelationship'
  | 'createDevOpsServiceRelationship'
  | 'createHostedResourceUploadUrl'
  | 'createJiraProjectAndOpsgenieTeamRelationship'
  | 'createJiraProjectAndRepositoryRelationship'
  | 'createPolarisAnonymousVisitorHash'
  | 'createPolarisCalculatedField'
  | 'createPolarisComment'
  | 'createPolarisDecoration'
  | 'createPolarisInsight'
  | 'createPolarisInsightFromPlayContribution'
  | 'createPolarisPlay'
  | 'createPolarisPlayContribution'
  | 'createPolarisStandardField'
  | 'createPolarisView'
  | 'createPolarisViewSet'
  | 'createSprint'
  | 'createWebTriggerUrl'
  | 'customerSupport'
  | 'deleteApp'
  | 'deleteAppEnvironmentVariable'
  | 'deleteAppTunnels'
  | 'deleteColumn'
  | 'deleteCustomFilter'
  | 'deleteDevOpsContainerRelationshipEntityProperties'
  | 'deleteDevOpsService'
  | 'deleteDevOpsServiceAndJiraProjectRelationship'
  | 'deleteDevOpsServiceAndOpsgenieTeamRelationship'
  | 'deleteDevOpsServiceAndRepositoryRelationship'
  | 'deleteDevOpsServiceEntityProperties'
  | 'deleteDevOpsServiceRelationship'
  | 'deleteJiraProjectAndOpsgenieTeamRelationship'
  | 'deleteJiraProjectAndRepositoryRelationship'
  | 'deletePolarisAnonymousVisitorHash'
  | 'deletePolarisDecoration'
  | 'deletePolarisField'
  | 'deletePolarisFieldOption'
  | 'deletePolarisInsight'
  | 'deletePolarisPlayContribution'
  | 'deletePolarisView'
  | 'deletePolarisViewSet'
  | 'deleteSprint'
  | 'deleteWebTriggerUrl'
  | 'ecosystem'
  | 'editSprint'
  | 'installApp'
  | 'invokeAuxEffects'
  | 'invokeExtension'
  | 'invokePolarisObject'
  | 'jira'
  | 'jsw'
  | 'moveSprintDown'
  | 'moveSprintUp'
  | 'rankCardParent'
  | 'rankColumn'
  | 'refreshPolarisSnippets'
  | 'resolvePolarisObject'
  | 'setAppEnvironmentVariable'
  | 'setColumnLimit'
  | 'setColumnName'
  | 'setEstimationType'
  | 'setExternalAuthCredentials'
  | 'setPolarisProjectOnboarded'
  | 'setPolarisSelectedDeliveryProject'
  | 'setPolarisSnippetPropertiesConfig'
  | 'setSwimlaneStrategy'
  | 'setUserSwimlaneStrategy'
  | 'startSprint'
  | 'subscribeToApp'
  | 'unarchivePolarisInsights'
  | 'unassignIssueParent'
  | 'uninstallApp'
  | 'unsubscribeFromApp'
  | 'unwatchMarketplaceApp'
  | 'updateAppDetails'
  | 'updateAtlassianOAuthClient'
  | 'updateCustomFilter'
  | 'updateDevOpsContainerRelationshipEntityProperties'
  | 'updateDevOpsService'
  | 'updateDevOpsServiceAndJiraProjectRelationship'
  | 'updateDevOpsServiceAndOpsgenieTeamRelationship'
  | 'updateDevOpsServiceAndRepositoryRelationship'
  | 'updateDevOpsServiceEntityProperties'
  | 'updateDevOpsServiceRelationship'
  | 'updateDeveloperLogAccess'
  | 'updateJiraProjectAndOpsgenieTeamRelationship'
  | 'updateJiraProjectAndRepositoryRelationship'
  | 'updatePolarisCalculatedField'
  | 'updatePolarisComment'
  | 'updatePolarisDecoration'
  | 'updatePolarisFieldDescription'
  | 'updatePolarisFieldOptionWeight'
  | 'updatePolarisIdea'
  | 'updatePolarisInsight'
  | 'updatePolarisPlayContribution'
  | 'updatePolarisTermsConsent'
  | 'updatePolarisView'
  | 'updatePolarisViewRankV2'
  | 'updatePolarisViewSet'
  | 'upgradeApp'
  | 'userAuthTokenForExtension'
  | 'watchMarketplaceApp'
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  appStorage?: FieldPolicy<any> | FieldReadFunction<any>;
  applyPolarisProjectTemplate?: FieldPolicy<any> | FieldReadFunction<any>;
  archivePolarisInsights?: FieldPolicy<any> | FieldReadFunction<any>;
  assignIssueParent?: FieldPolicy<any> | FieldReadFunction<any>;
  boardCardMove?: FieldPolicy<any> | FieldReadFunction<any>;
  compass?: FieldPolicy<any> | FieldReadFunction<any>;
  completeSprint?: FieldPolicy<any> | FieldReadFunction<any>;
  configurePolarisRefresh?: FieldPolicy<any> | FieldReadFunction<any>;
  copyPolarisInsights?: FieldPolicy<any> | FieldReadFunction<any>;
  createApp?: FieldPolicy<any> | FieldReadFunction<any>;
  createAppDeployment?: FieldPolicy<any> | FieldReadFunction<any>;
  createAppDeploymentUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  createAppTunnels?: FieldPolicy<any> | FieldReadFunction<any>;
  createCardParent?: FieldPolicy<any> | FieldReadFunction<any>;
  createColumn?: FieldPolicy<any> | FieldReadFunction<any>;
  createCustomFilter?: FieldPolicy<any> | FieldReadFunction<any>;
  createDevOpsService?: FieldPolicy<any> | FieldReadFunction<any>;
  createDevOpsServiceAndJiraProjectRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  createDevOpsServiceAndOpsgenieTeamRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  createDevOpsServiceAndRepositoryRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  createDevOpsServiceRelationship?: FieldPolicy<any> | FieldReadFunction<any>;
  createHostedResourceUploadUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  createJiraProjectAndOpsgenieTeamRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  createJiraProjectAndRepositoryRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  createPolarisAnonymousVisitorHash?: FieldPolicy<any> | FieldReadFunction<any>;
  createPolarisCalculatedField?: FieldPolicy<any> | FieldReadFunction<any>;
  createPolarisComment?: FieldPolicy<any> | FieldReadFunction<any>;
  createPolarisDecoration?: FieldPolicy<any> | FieldReadFunction<any>;
  createPolarisInsight?: FieldPolicy<any> | FieldReadFunction<any>;
  createPolarisInsightFromPlayContribution?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  createPolarisPlay?: FieldPolicy<any> | FieldReadFunction<any>;
  createPolarisPlayContribution?: FieldPolicy<any> | FieldReadFunction<any>;
  createPolarisStandardField?: FieldPolicy<any> | FieldReadFunction<any>;
  createPolarisView?: FieldPolicy<any> | FieldReadFunction<any>;
  createPolarisViewSet?: FieldPolicy<any> | FieldReadFunction<any>;
  createSprint?: FieldPolicy<any> | FieldReadFunction<any>;
  createWebTriggerUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  customerSupport?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteApp?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteAppEnvironmentVariable?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteAppTunnels?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteColumn?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteCustomFilter?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteDevOpsContainerRelationshipEntityProperties?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  deleteDevOpsService?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteDevOpsServiceAndJiraProjectRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  deleteDevOpsServiceAndOpsgenieTeamRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  deleteDevOpsServiceAndRepositoryRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  deleteDevOpsServiceEntityProperties?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  deleteDevOpsServiceRelationship?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteJiraProjectAndOpsgenieTeamRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  deleteJiraProjectAndRepositoryRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  deletePolarisAnonymousVisitorHash?: FieldPolicy<any> | FieldReadFunction<any>;
  deletePolarisDecoration?: FieldPolicy<any> | FieldReadFunction<any>;
  deletePolarisField?: FieldPolicy<any> | FieldReadFunction<any>;
  deletePolarisFieldOption?: FieldPolicy<any> | FieldReadFunction<any>;
  deletePolarisInsight?: FieldPolicy<any> | FieldReadFunction<any>;
  deletePolarisPlayContribution?: FieldPolicy<any> | FieldReadFunction<any>;
  deletePolarisView?: FieldPolicy<any> | FieldReadFunction<any>;
  deletePolarisViewSet?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteSprint?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteWebTriggerUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  ecosystem?: FieldPolicy<any> | FieldReadFunction<any>;
  editSprint?: FieldPolicy<any> | FieldReadFunction<any>;
  installApp?: FieldPolicy<any> | FieldReadFunction<any>;
  invokeAuxEffects?: FieldPolicy<any> | FieldReadFunction<any>;
  invokeExtension?: FieldPolicy<any> | FieldReadFunction<any>;
  invokePolarisObject?: FieldPolicy<any> | FieldReadFunction<any>;
  jira?: FieldPolicy<any> | FieldReadFunction<any>;
  jsw?: FieldPolicy<any> | FieldReadFunction<any>;
  moveSprintDown?: FieldPolicy<any> | FieldReadFunction<any>;
  moveSprintUp?: FieldPolicy<any> | FieldReadFunction<any>;
  rankCardParent?: FieldPolicy<any> | FieldReadFunction<any>;
  rankColumn?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshPolarisSnippets?: FieldPolicy<any> | FieldReadFunction<any>;
  resolvePolarisObject?: FieldPolicy<any> | FieldReadFunction<any>;
  setAppEnvironmentVariable?: FieldPolicy<any> | FieldReadFunction<any>;
  setColumnLimit?: FieldPolicy<any> | FieldReadFunction<any>;
  setColumnName?: FieldPolicy<any> | FieldReadFunction<any>;
  setEstimationType?: FieldPolicy<any> | FieldReadFunction<any>;
  setExternalAuthCredentials?: FieldPolicy<any> | FieldReadFunction<any>;
  setPolarisProjectOnboarded?: FieldPolicy<any> | FieldReadFunction<any>;
  setPolarisSelectedDeliveryProject?: FieldPolicy<any> | FieldReadFunction<any>;
  setPolarisSnippetPropertiesConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  setSwimlaneStrategy?: FieldPolicy<any> | FieldReadFunction<any>;
  setUserSwimlaneStrategy?: FieldPolicy<any> | FieldReadFunction<any>;
  startSprint?: FieldPolicy<any> | FieldReadFunction<any>;
  subscribeToApp?: FieldPolicy<any> | FieldReadFunction<any>;
  unarchivePolarisInsights?: FieldPolicy<any> | FieldReadFunction<any>;
  unassignIssueParent?: FieldPolicy<any> | FieldReadFunction<any>;
  uninstallApp?: FieldPolicy<any> | FieldReadFunction<any>;
  unsubscribeFromApp?: FieldPolicy<any> | FieldReadFunction<any>;
  unwatchMarketplaceApp?: FieldPolicy<any> | FieldReadFunction<any>;
  updateAppDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  updateAtlassianOAuthClient?: FieldPolicy<any> | FieldReadFunction<any>;
  updateCustomFilter?: FieldPolicy<any> | FieldReadFunction<any>;
  updateDevOpsContainerRelationshipEntityProperties?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  updateDevOpsService?: FieldPolicy<any> | FieldReadFunction<any>;
  updateDevOpsServiceAndJiraProjectRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  updateDevOpsServiceAndOpsgenieTeamRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  updateDevOpsServiceAndRepositoryRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  updateDevOpsServiceEntityProperties?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  updateDevOpsServiceRelationship?: FieldPolicy<any> | FieldReadFunction<any>;
  updateDeveloperLogAccess?: FieldPolicy<any> | FieldReadFunction<any>;
  updateJiraProjectAndOpsgenieTeamRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  updateJiraProjectAndRepositoryRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  updatePolarisCalculatedField?: FieldPolicy<any> | FieldReadFunction<any>;
  updatePolarisComment?: FieldPolicy<any> | FieldReadFunction<any>;
  updatePolarisDecoration?: FieldPolicy<any> | FieldReadFunction<any>;
  updatePolarisFieldDescription?: FieldPolicy<any> | FieldReadFunction<any>;
  updatePolarisFieldOptionWeight?: FieldPolicy<any> | FieldReadFunction<any>;
  updatePolarisIdea?: FieldPolicy<any> | FieldReadFunction<any>;
  updatePolarisInsight?: FieldPolicy<any> | FieldReadFunction<any>;
  updatePolarisPlayContribution?: FieldPolicy<any> | FieldReadFunction<any>;
  updatePolarisTermsConsent?: FieldPolicy<any> | FieldReadFunction<any>;
  updatePolarisView?: FieldPolicy<any> | FieldReadFunction<any>;
  updatePolarisViewRankV2?: FieldPolicy<any> | FieldReadFunction<any>;
  updatePolarisViewSet?: FieldPolicy<any> | FieldReadFunction<any>;
  upgradeApp?: FieldPolicy<any> | FieldReadFunction<any>;
  userAuthTokenForExtension?: FieldPolicy<any> | FieldReadFunction<any>;
  watchMarketplaceApp?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppStorageMutationKeySpecifier = (
  | 'deleteAppStoredEntity'
  | 'setAppStoredEntity'
  | AppStorageMutationKeySpecifier
)[];
export type AppStorageMutationFieldPolicy = {
  deleteAppStoredEntity?: FieldPolicy<any> | FieldReadFunction<any>;
  setAppStoredEntity?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteAppStoredEntityPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteAppStoredEntityPayloadKeySpecifier
)[];
export type DeleteAppStoredEntityPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | PayloadKeySpecifier
)[];
export type PayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetAppStoredEntityPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | SetAppStoredEntityPayloadKeySpecifier
)[];
export type SetAppStoredEntityPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ApplyPolarisProjectTemplatePayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | ApplyPolarisProjectTemplatePayloadKeySpecifier
)[];
export type ApplyPolarisProjectTemplatePayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ArchivePolarisInsightsPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | ArchivePolarisInsightsPayloadKeySpecifier
)[];
export type ArchivePolarisInsightsPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AssignIssueParentOutputKeySpecifier = (
  | 'boardScope'
  | 'clientMutationId'
  | 'message'
  | 'statusCode'
  | 'success'
  | AssignIssueParentOutputKeySpecifier
)[];
export type AssignIssueParentOutputFieldPolicy = {
  boardScope?: FieldPolicy<any> | FieldReadFunction<any>;
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationResponseKeySpecifier = (
  | 'message'
  | 'statusCode'
  | 'success'
  | MutationResponseKeySpecifier
)[];
export type MutationResponseFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MoveCardOutputKeySpecifier = (
  | 'clientMutationId'
  | 'issuesWereTransitioned'
  | 'message'
  | 'statusCode'
  | 'success'
  | MoveCardOutputKeySpecifier
)[];
export type MoveCardOutputFieldPolicy = {
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  issuesWereTransitioned?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassCatalogMutationApiKeySpecifier = (
  | 'acknowledgeAnnouncement'
  | 'addComponentLabels'
  | 'applyScorecardToComponent'
  | 'attachComponentDataManager'
  | 'attachEventSource'
  | 'createAnnouncement'
  | 'createComponent'
  | 'createComponentExternalAlias'
  | 'createComponentLink'
  | 'createDeploymentEvent'
  | 'createEventSource'
  | 'createRelationship'
  | 'createScorecard'
  | 'createScorecardCriterias'
  | 'createStarredComponent'
  | 'createTeamCheckin'
  | 'deleteAnnouncement'
  | 'deleteComponent'
  | 'deleteComponentExternalAlias'
  | 'deleteComponentLink'
  | 'deleteEventSource'
  | 'deleteRelationship'
  | 'deleteScorecard'
  | 'deleteScorecardCriterias'
  | 'deleteStarredComponent'
  | 'deleteTeamCheckin'
  | 'detachComponentDataManager'
  | 'detachEventSource'
  | 'removeComponentLabels'
  | 'removeScorecardFromComponent'
  | 'unlinkExternalSource'
  | 'updateAnnouncement'
  | 'updateComponent'
  | 'updateComponentDataManagerMetadata'
  | 'updateComponentLink'
  | 'updateScorecard'
  | 'updateScorecardCriterias'
  | 'updateTeamCheckin'
  | CompassCatalogMutationApiKeySpecifier
)[];
export type CompassCatalogMutationApiFieldPolicy = {
  acknowledgeAnnouncement?: FieldPolicy<any> | FieldReadFunction<any>;
  addComponentLabels?: FieldPolicy<any> | FieldReadFunction<any>;
  applyScorecardToComponent?: FieldPolicy<any> | FieldReadFunction<any>;
  attachComponentDataManager?: FieldPolicy<any> | FieldReadFunction<any>;
  attachEventSource?: FieldPolicy<any> | FieldReadFunction<any>;
  createAnnouncement?: FieldPolicy<any> | FieldReadFunction<any>;
  createComponent?: FieldPolicy<any> | FieldReadFunction<any>;
  createComponentExternalAlias?: FieldPolicy<any> | FieldReadFunction<any>;
  createComponentLink?: FieldPolicy<any> | FieldReadFunction<any>;
  createDeploymentEvent?: FieldPolicy<any> | FieldReadFunction<any>;
  createEventSource?: FieldPolicy<any> | FieldReadFunction<any>;
  createRelationship?: FieldPolicy<any> | FieldReadFunction<any>;
  createScorecard?: FieldPolicy<any> | FieldReadFunction<any>;
  createScorecardCriterias?: FieldPolicy<any> | FieldReadFunction<any>;
  createStarredComponent?: FieldPolicy<any> | FieldReadFunction<any>;
  createTeamCheckin?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteAnnouncement?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteComponent?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteComponentExternalAlias?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteComponentLink?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteEventSource?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteRelationship?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteScorecard?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteScorecardCriterias?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteStarredComponent?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteTeamCheckin?: FieldPolicy<any> | FieldReadFunction<any>;
  detachComponentDataManager?: FieldPolicy<any> | FieldReadFunction<any>;
  detachEventSource?: FieldPolicy<any> | FieldReadFunction<any>;
  removeComponentLabels?: FieldPolicy<any> | FieldReadFunction<any>;
  removeScorecardFromComponent?: FieldPolicy<any> | FieldReadFunction<any>;
  unlinkExternalSource?: FieldPolicy<any> | FieldReadFunction<any>;
  updateAnnouncement?: FieldPolicy<any> | FieldReadFunction<any>;
  updateComponent?: FieldPolicy<any> | FieldReadFunction<any>;
  updateComponentDataManagerMetadata?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  updateComponentLink?: FieldPolicy<any> | FieldReadFunction<any>;
  updateScorecard?: FieldPolicy<any> | FieldReadFunction<any>;
  updateScorecardCriterias?: FieldPolicy<any> | FieldReadFunction<any>;
  updateTeamCheckin?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassAcknowledgeAnnouncementPayloadKeySpecifier = (
  | 'acknowledgement'
  | 'errors'
  | 'success'
  | CompassAcknowledgeAnnouncementPayloadKeySpecifier
)[];
export type CompassAcknowledgeAnnouncementPayloadFieldPolicy = {
  acknowledgement?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AddCompassComponentLabelsPayloadKeySpecifier = (
  | 'addedLabels'
  | 'componentDetails'
  | 'errors'
  | 'success'
  | AddCompassComponentLabelsPayloadKeySpecifier
)[];
export type AddCompassComponentLabelsPayloadFieldPolicy = {
  addedLabels?: FieldPolicy<any> | FieldReadFunction<any>;
  componentDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ApplyCompassScorecardToComponentPayloadKeySpecifier = (
  | 'componentDetails'
  | 'errors'
  | 'success'
  | ApplyCompassScorecardToComponentPayloadKeySpecifier
)[];
export type ApplyCompassScorecardToComponentPayloadFieldPolicy = {
  componentDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AttachCompassComponentDataManagerPayloadKeySpecifier = (
  | 'componentDetails'
  | 'errors'
  | 'success'
  | AttachCompassComponentDataManagerPayloadKeySpecifier
)[];
export type AttachCompassComponentDataManagerPayloadFieldPolicy = {
  componentDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AttachEventSourcePayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | AttachEventSourcePayloadKeySpecifier
)[];
export type AttachEventSourcePayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassCreateAnnouncementPayloadKeySpecifier = (
  | 'createdAnnouncement'
  | 'errors'
  | 'success'
  | CompassCreateAnnouncementPayloadKeySpecifier
)[];
export type CompassCreateAnnouncementPayloadFieldPolicy = {
  createdAnnouncement?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCompassComponentPayloadKeySpecifier = (
  | 'componentDetails'
  | 'errors'
  | 'success'
  | CreateCompassComponentPayloadKeySpecifier
)[];
export type CreateCompassComponentPayloadFieldPolicy = {
  componentDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCompassComponentExternalAliasPayloadKeySpecifier = (
  | 'componentDetails'
  | 'createdCompassExternalAlias'
  | 'errors'
  | 'success'
  | CreateCompassComponentExternalAliasPayloadKeySpecifier
)[];
export type CreateCompassComponentExternalAliasPayloadFieldPolicy = {
  componentDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  createdCompassExternalAlias?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCompassComponentLinkPayloadKeySpecifier = (
  | 'componentDetails'
  | 'createdComponentLink'
  | 'errors'
  | 'success'
  | CreateCompassComponentLinkPayloadKeySpecifier
)[];
export type CreateCompassComponentLinkPayloadFieldPolicy = {
  componentDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  createdComponentLink?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateDeploymentEventsPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | CreateDeploymentEventsPayloadKeySpecifier
)[];
export type CreateDeploymentEventsPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateEventSourcePayloadKeySpecifier = (
  | 'errors'
  | 'eventSource'
  | 'success'
  | CreateEventSourcePayloadKeySpecifier
)[];
export type CreateEventSourcePayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  eventSource?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCompassRelationshipPayloadKeySpecifier = (
  | 'createdCompassRelationship'
  | 'errors'
  | 'success'
  | CreateCompassRelationshipPayloadKeySpecifier
)[];
export type CreateCompassRelationshipPayloadFieldPolicy = {
  createdCompassRelationship?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCompassScorecardPayloadKeySpecifier = (
  | 'errors'
  | 'scorecardDetails'
  | 'success'
  | CreateCompassScorecardPayloadKeySpecifier
)[];
export type CreateCompassScorecardPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecardDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCompassScorecardCriteriasPayloadKeySpecifier = (
  | 'errors'
  | 'scorecard'
  | 'success'
  | CreateCompassScorecardCriteriasPayloadKeySpecifier
)[];
export type CreateCompassScorecardCriteriasPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecard?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateCompassStarredComponentPayloadKeySpecifier = (
  | 'components'
  | 'errors'
  | 'success'
  | CreateCompassStarredComponentPayloadKeySpecifier
)[];
export type CreateCompassStarredComponentPayloadFieldPolicy = {
  components?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassCreateTeamCheckinPayloadKeySpecifier = (
  | 'createdTeamCheckin'
  | 'errors'
  | 'success'
  | CompassCreateTeamCheckinPayloadKeySpecifier
)[];
export type CompassCreateTeamCheckinPayloadFieldPolicy = {
  createdTeamCheckin?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassDeleteAnnouncementPayloadKeySpecifier = (
  | 'deletedAnnouncementId'
  | 'errors'
  | 'success'
  | CompassDeleteAnnouncementPayloadKeySpecifier
)[];
export type CompassDeleteAnnouncementPayloadFieldPolicy = {
  deletedAnnouncementId?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteCompassComponentPayloadKeySpecifier = (
  | '_isOptimistic'
  | 'deletedComponentId'
  | 'errors'
  | 'success'
  | DeleteCompassComponentPayloadKeySpecifier
)[];
export type DeleteCompassComponentPayloadFieldPolicy = {
  _isOptimistic?: FieldPolicy<any> | FieldReadFunction<any>;
  deletedComponentId?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteCompassComponentExternalAliasPayloadKeySpecifier = (
  | 'componentDetails'
  | 'deletedCompassExternalAlias'
  | 'errors'
  | 'success'
  | DeleteCompassComponentExternalAliasPayloadKeySpecifier
)[];
export type DeleteCompassComponentExternalAliasPayloadFieldPolicy = {
  componentDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  deletedCompassExternalAlias?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteCompassComponentLinkPayloadKeySpecifier = (
  | 'componentDetails'
  | 'deletedCompassLinkId'
  | 'errors'
  | 'success'
  | DeleteCompassComponentLinkPayloadKeySpecifier
)[];
export type DeleteCompassComponentLinkPayloadFieldPolicy = {
  componentDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  deletedCompassLinkId?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteEventSourcePayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteEventSourcePayloadKeySpecifier
)[];
export type DeleteEventSourcePayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteCompassRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteCompassRelationshipPayloadKeySpecifier
)[];
export type DeleteCompassRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteCompassScorecardPayloadKeySpecifier = (
  | 'errors'
  | 'scorecardId'
  | 'success'
  | DeleteCompassScorecardPayloadKeySpecifier
)[];
export type DeleteCompassScorecardPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecardId?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteCompassScorecardCriteriasPayloadKeySpecifier = (
  | 'errors'
  | 'scorecard'
  | 'success'
  | DeleteCompassScorecardCriteriasPayloadKeySpecifier
)[];
export type DeleteCompassScorecardCriteriasPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecard?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteCompassStarredComponentPayloadKeySpecifier = (
  | 'components'
  | 'errors'
  | 'success'
  | DeleteCompassStarredComponentPayloadKeySpecifier
)[];
export type DeleteCompassStarredComponentPayloadFieldPolicy = {
  components?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassDeleteTeamCheckinPayloadKeySpecifier = (
  | 'deletedTeamCheckinId'
  | 'errors'
  | 'success'
  | CompassDeleteTeamCheckinPayloadKeySpecifier
)[];
export type CompassDeleteTeamCheckinPayloadFieldPolicy = {
  deletedTeamCheckinId?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DetachCompassComponentDataManagerPayloadKeySpecifier = (
  | 'componentDetails'
  | 'errors'
  | 'success'
  | DetachCompassComponentDataManagerPayloadKeySpecifier
)[];
export type DetachCompassComponentDataManagerPayloadFieldPolicy = {
  componentDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DetachEventSourcePayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DetachEventSourcePayloadKeySpecifier
)[];
export type DetachEventSourcePayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RemoveCompassComponentLabelsPayloadKeySpecifier = (
  | 'componentDetails'
  | 'errors'
  | 'removedLabelNames'
  | 'success'
  | RemoveCompassComponentLabelsPayloadKeySpecifier
)[];
export type RemoveCompassComponentLabelsPayloadFieldPolicy = {
  componentDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  removedLabelNames?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RemoveCompassScorecardFromComponentPayloadKeySpecifier = (
  | 'componentDetails'
  | 'errors'
  | 'success'
  | RemoveCompassScorecardFromComponentPayloadKeySpecifier
)[];
export type RemoveCompassScorecardFromComponentPayloadFieldPolicy = {
  componentDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnlinkExternalSourcePayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | UnlinkExternalSourcePayloadKeySpecifier
)[];
export type UnlinkExternalSourcePayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassUpdateAnnouncementPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | 'updatedAnnouncement'
  | CompassUpdateAnnouncementPayloadKeySpecifier
)[];
export type CompassUpdateAnnouncementPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAnnouncement?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateCompassComponentPayloadKeySpecifier = (
  | 'componentDetails'
  | 'errors'
  | 'success'
  | UpdateCompassComponentPayloadKeySpecifier
)[];
export type UpdateCompassComponentPayloadFieldPolicy = {
  componentDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateCompassComponentDataManagerMetadataPayloadKeySpecifier = (
  | 'componentDetails'
  | 'errors'
  | 'success'
  | UpdateCompassComponentDataManagerMetadataPayloadKeySpecifier
)[];
export type UpdateCompassComponentDataManagerMetadataPayloadFieldPolicy = {
  componentDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateCompassComponentLinkPayloadKeySpecifier = (
  | 'componentDetails'
  | 'errors'
  | 'success'
  | 'updatedComponentLink'
  | UpdateCompassComponentLinkPayloadKeySpecifier
)[];
export type UpdateCompassComponentLinkPayloadFieldPolicy = {
  componentDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedComponentLink?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateCompassScorecardPayloadKeySpecifier = (
  | 'errors'
  | 'scorecardDetails'
  | 'success'
  | UpdateCompassScorecardPayloadKeySpecifier
)[];
export type UpdateCompassScorecardPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecardDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateCompassScorecardCriteriasPayloadKeySpecifier = (
  | 'errors'
  | 'scorecard'
  | 'success'
  | UpdateCompassScorecardCriteriasPayloadKeySpecifier
)[];
export type UpdateCompassScorecardCriteriasPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecard?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassUpdateTeamCheckinPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | 'updatedTeamCheckin'
  | CompassUpdateTeamCheckinPayloadKeySpecifier
)[];
export type CompassUpdateTeamCheckinPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedTeamCheckin?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompleteSprintResponseKeySpecifier = (
  | 'boardScope'
  | 'message'
  | 'statusCode'
  | 'success'
  | CompleteSprintResponseKeySpecifier
)[];
export type CompleteSprintResponseFieldPolicy = {
  boardScope?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ConfigurePolarisRefreshPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | ConfigurePolarisRefreshPayloadKeySpecifier
)[];
export type ConfigurePolarisRefreshPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CopyPolarisInsightsPayloadKeySpecifier = (
  | 'copiedInsights'
  | 'errors'
  | 'success'
  | CopyPolarisInsightsPayloadKeySpecifier
)[];
export type CopyPolarisInsightsPayloadFieldPolicy = {
  copiedInsights?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateAppResponseKeySpecifier = (
  | 'app'
  | 'errors'
  | 'success'
  | CreateAppResponseKeySpecifier
)[];
export type CreateAppResponseFieldPolicy = {
  app?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateAppDeploymentResponseKeySpecifier = (
  | 'deployment'
  | 'errors'
  | 'success'
  | CreateAppDeploymentResponseKeySpecifier
)[];
export type CreateAppDeploymentResponseFieldPolicy = {
  deployment?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateAppDeploymentUrlResponseKeySpecifier = (
  | 'deploymentUrl'
  | 'errors'
  | 'success'
  | CreateAppDeploymentUrlResponseKeySpecifier
)[];
export type CreateAppDeploymentUrlResponseFieldPolicy = {
  deploymentUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateAppTunnelResponseKeySpecifier = (
  | 'errors'
  | 'expiry'
  | 'keepAlive'
  | 'success'
  | CreateAppTunnelResponseKeySpecifier
)[];
export type CreateAppTunnelResponseFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  expiry?: FieldPolicy<any> | FieldReadFunction<any>;
  keepAlive?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CardParentCreateOutputKeySpecifier = (
  | 'clientMutationId'
  | 'message'
  | 'newCardParents'
  | 'statusCode'
  | 'success'
  | CardParentCreateOutputKeySpecifier
)[];
export type CardParentCreateOutputFieldPolicy = {
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  newCardParents?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateColumnOutputKeySpecifier = (
  | 'columns'
  | 'message'
  | 'newColumn'
  | 'statusCode'
  | 'success'
  | CreateColumnOutputKeySpecifier
)[];
export type CreateColumnOutputFieldPolicy = {
  columns?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  newColumn?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CustomFilterCreateOutputKeySpecifier = (
  | 'customFilter'
  | 'message'
  | 'statusCode'
  | 'success'
  | 'validationErrors'
  | CustomFilterCreateOutputKeySpecifier
)[];
export type CustomFilterCreateOutputFieldPolicy = {
  customFilter?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  validationErrors?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CustomFiltersValidationErrorKeySpecifier = (
  | 'errorMessage'
  | 'fieldName'
  | CustomFiltersValidationErrorKeySpecifier
)[];
export type CustomFiltersValidationErrorFieldPolicy = {
  errorMessage?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateDevOpsServicePayloadKeySpecifier = (
  | 'errors'
  | 'service'
  | 'success'
  | CreateDevOpsServicePayloadKeySpecifier
)[];
export type CreateDevOpsServicePayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  service?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateDevOpsServiceAndJiraProjectRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'serviceAndJiraProjectRelationship'
  | 'success'
  | CreateDevOpsServiceAndJiraProjectRelationshipPayloadKeySpecifier
)[];
export type CreateDevOpsServiceAndJiraProjectRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  serviceAndJiraProjectRelationship?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateDevOpsServiceAndOpsgenieTeamRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'serviceAndOpsgenieTeamRelationship'
  | 'success'
  | CreateDevOpsServiceAndOpsgenieTeamRelationshipPayloadKeySpecifier
)[];
export type CreateDevOpsServiceAndOpsgenieTeamRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  serviceAndOpsgenieTeamRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateDevOpsServiceAndRepositoryRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'serviceAndRepositoryRelationship'
  | 'success'
  | CreateDevOpsServiceAndRepositoryRelationshipPayloadKeySpecifier
)[];
export type CreateDevOpsServiceAndRepositoryRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  serviceAndRepositoryRelationship?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateDevOpsServiceRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'serviceRelationship'
  | 'success'
  | CreateDevOpsServiceRelationshipPayloadKeySpecifier
)[];
export type CreateDevOpsServiceRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  serviceRelationship?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateHostedResourceUploadUrlPayloadKeySpecifier = (
  | 'errors'
  | 'preSignedUrls'
  | 'success'
  | 'uploadId'
  | CreateHostedResourceUploadUrlPayloadKeySpecifier
)[];
export type CreateHostedResourceUploadUrlPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  preSignedUrls?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  uploadId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type HostedResourcePreSignedUrlKeySpecifier = (
  | 'uploadFormData'
  | 'uploadUrl'
  | HostedResourcePreSignedUrlKeySpecifier
)[];
export type HostedResourcePreSignedUrlFieldPolicy = {
  uploadFormData?: FieldPolicy<any> | FieldReadFunction<any>;
  uploadUrl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateJiraProjectAndOpsgenieTeamRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'jiraProjectAndOpsgenieTeamRelationship'
  | 'success'
  | CreateJiraProjectAndOpsgenieTeamRelationshipPayloadKeySpecifier
)[];
export type CreateJiraProjectAndOpsgenieTeamRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraProjectAndOpsgenieTeamRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateJiraProjectAndRepositoryRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'jiraProjectAndRepositoryRelationship'
  | 'success'
  | CreateJiraProjectAndRepositoryRelationshipPayloadKeySpecifier
)[];
export type CreateJiraProjectAndRepositoryRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraProjectAndRepositoryRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePolarisAnonymousVisitorHashPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | CreatePolarisAnonymousVisitorHashPayloadKeySpecifier
)[];
export type CreatePolarisAnonymousVisitorHashPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePolarisCalculatedFieldPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | CreatePolarisCalculatedFieldPayloadKeySpecifier
)[];
export type CreatePolarisCalculatedFieldPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePolarisCommentPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | CreatePolarisCommentPayloadKeySpecifier
)[];
export type CreatePolarisCommentPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePolarisDecorationPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | CreatePolarisDecorationPayloadKeySpecifier
)[];
export type CreatePolarisDecorationPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePolarisInsightPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | CreatePolarisInsightPayloadKeySpecifier
)[];
export type CreatePolarisInsightPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePolarisPlayPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | CreatePolarisPlayPayloadKeySpecifier
)[];
export type CreatePolarisPlayPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePolarisPlayContributionPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | CreatePolarisPlayContributionPayloadKeySpecifier
)[];
export type CreatePolarisPlayContributionPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePolarisStandardFieldPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | CreatePolarisStandardFieldPayloadKeySpecifier
)[];
export type CreatePolarisStandardFieldPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePolarisViewPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | CreatePolarisViewPayloadKeySpecifier
)[];
export type CreatePolarisViewPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatePolarisViewSetPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | CreatePolarisViewSetPayloadKeySpecifier
)[];
export type CreatePolarisViewSetPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateSprintResponseKeySpecifier = (
  | 'message'
  | 'sprint'
  | 'statusCode'
  | 'success'
  | CreateSprintResponseKeySpecifier
)[];
export type CreateSprintResponseFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  sprint?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreatedSprintKeySpecifier = (
  | 'canUpdateSprint'
  | 'daysRemaining'
  | 'endDate'
  | 'id'
  | 'name'
  | 'sprintState'
  | 'startDate'
  | CreatedSprintKeySpecifier
)[];
export type CreatedSprintFieldPolicy = {
  canUpdateSprint?: FieldPolicy<any> | FieldReadFunction<any>;
  daysRemaining?: FieldPolicy<any> | FieldReadFunction<any>;
  endDate?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  sprintState?: FieldPolicy<any> | FieldReadFunction<any>;
  startDate?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CreateWebTriggerUrlResponseKeySpecifier = (
  | 'id'
  | 'message'
  | 'statusCode'
  | 'success'
  | 'url'
  | CreateWebTriggerUrlResponseKeySpecifier
)[];
export type CreateWebTriggerUrlResponseFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SupportRequestCatalogMutationApiKeySpecifier = (
  | 'addComment'
  | 'statusTransition'
  | SupportRequestCatalogMutationApiKeySpecifier
)[];
export type SupportRequestCatalogMutationApiFieldPolicy = {
  addComment?: FieldPolicy<any> | FieldReadFunction<any>;
  statusTransition?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteAppResponseKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteAppResponseKeySpecifier
)[];
export type DeleteAppResponseFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteAppEnvironmentVariablePayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteAppEnvironmentVariablePayloadKeySpecifier
)[];
export type DeleteAppEnvironmentVariablePayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GenericMutationResponseKeySpecifier = (
  | 'errors'
  | 'success'
  | GenericMutationResponseKeySpecifier
)[];
export type GenericMutationResponseFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteColumnOutputKeySpecifier = (
  | 'columns'
  | 'message'
  | 'statusCode'
  | 'success'
  | DeleteColumnOutputKeySpecifier
)[];
export type DeleteColumnOutputFieldPolicy = {
  columns?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteDevOpsContainerRelationshipEntityPropertiesPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteDevOpsContainerRelationshipEntityPropertiesPayloadKeySpecifier
)[];
export type DeleteDevOpsContainerRelationshipEntityPropertiesPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteDevOpsServicePayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteDevOpsServicePayloadKeySpecifier
)[];
export type DeleteDevOpsServicePayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteDevOpsServiceAndJiraProjectRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteDevOpsServiceAndJiraProjectRelationshipPayloadKeySpecifier
)[];
export type DeleteDevOpsServiceAndJiraProjectRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteDevOpsServiceAndOpsgenieTeamRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteDevOpsServiceAndOpsgenieTeamRelationshipPayloadKeySpecifier
)[];
export type DeleteDevOpsServiceAndOpsgenieTeamRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteDevOpsServiceAndRepositoryRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteDevOpsServiceAndRepositoryRelationshipPayloadKeySpecifier
)[];
export type DeleteDevOpsServiceAndRepositoryRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteDevOpsServiceEntityPropertiesPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteDevOpsServiceEntityPropertiesPayloadKeySpecifier
)[];
export type DeleteDevOpsServiceEntityPropertiesPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteDevOpsServiceRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteDevOpsServiceRelationshipPayloadKeySpecifier
)[];
export type DeleteDevOpsServiceRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteJiraProjectAndOpsgenieTeamRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteJiraProjectAndOpsgenieTeamRelationshipPayloadKeySpecifier
)[];
export type DeleteJiraProjectAndOpsgenieTeamRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteJiraProjectAndRepositoryRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteJiraProjectAndRepositoryRelationshipPayloadKeySpecifier
)[];
export type DeleteJiraProjectAndRepositoryRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeletePolarisAnonymousVisitorHashPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeletePolarisAnonymousVisitorHashPayloadKeySpecifier
)[];
export type DeletePolarisAnonymousVisitorHashPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeletePolarisDecorationPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeletePolarisDecorationPayloadKeySpecifier
)[];
export type DeletePolarisDecorationPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeletePolarisFieldPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeletePolarisFieldPayloadKeySpecifier
)[];
export type DeletePolarisFieldPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeletePolarisFieldOptionPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeletePolarisFieldOptionPayloadKeySpecifier
)[];
export type DeletePolarisFieldOptionPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeletePolarisInsightPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeletePolarisInsightPayloadKeySpecifier
)[];
export type DeletePolarisInsightPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeletePolarisPlayContributionPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeletePolarisPlayContributionPayloadKeySpecifier
)[];
export type DeletePolarisPlayContributionPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeletePolarisViewPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeletePolarisViewPayloadKeySpecifier
)[];
export type DeletePolarisViewPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeletePolarisViewSetPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeletePolarisViewSetPayloadKeySpecifier
)[];
export type DeletePolarisViewSetPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteWebTriggerUrlResponseKeySpecifier = (
  | 'message'
  | 'statusCode'
  | 'success'
  | DeleteWebTriggerUrlResponseKeySpecifier
)[];
export type DeleteWebTriggerUrlResponseFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EcosystemMutationKeySpecifier = (
  | 'deleteUserGrant'
  | 'updateAppHostServiceScopes'
  | EcosystemMutationKeySpecifier
)[];
export type EcosystemMutationFieldPolicy = {
  deleteUserGrant?: FieldPolicy<any> | FieldReadFunction<any>;
  updateAppHostServiceScopes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteUserGrantPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | DeleteUserGrantPayloadKeySpecifier
)[];
export type DeleteUserGrantPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateAppHostServiceScopesResponsePayloadKeySpecifier = (
  | 'app'
  | 'appEnvironmentVersion'
  | 'errors'
  | 'success'
  | UpdateAppHostServiceScopesResponsePayloadKeySpecifier
)[];
export type UpdateAppHostServiceScopesResponsePayloadFieldPolicy = {
  app?: FieldPolicy<any> | FieldReadFunction<any>;
  appEnvironmentVersion?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SprintResponseKeySpecifier = (
  | 'message'
  | 'sprint'
  | 'statusCode'
  | 'success'
  | SprintResponseKeySpecifier
)[];
export type SprintResponseFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  sprint?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppInstallationResponseKeySpecifier = (
  | 'errors'
  | 'installationId'
  | 'success'
  | 'taskId'
  | AppInstallationResponseKeySpecifier
)[];
export type AppInstallationResponseFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  installationId?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  taskId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type InvokeAuxEffectsResponseKeySpecifier = (
  | 'errorDetails'
  | 'errors'
  | 'message'
  | 'result'
  | 'statusCode'
  | 'success'
  | InvokeAuxEffectsResponseKeySpecifier
)[];
export type InvokeAuxEffectsResponseFieldPolicy = {
  errorDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  result?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuxEffectsResultKeySpecifier = (
  | 'effects'
  | AuxEffectsResultKeySpecifier
)[];
export type AuxEffectsResultFieldPolicy = {
  effects?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type InvokeExtensionResponseKeySpecifier = (
  | 'errorDetails'
  | 'errors'
  | 'externalAuth'
  | 'message'
  | 'response'
  | 'statusCode'
  | 'success'
  | InvokeExtensionResponseKeySpecifier
)[];
export type InvokeExtensionResponseFieldPolicy = {
  errorDetails?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  externalAuth?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  response?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ExternalAuthProviderKeySpecifier = (
  | 'displayName'
  | 'key'
  | 'url'
  | ExternalAuthProviderKeySpecifier
)[];
export type ExternalAuthProviderFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type InvocationResponsePayloadKeySpecifier = (
  | 'body'
  | InvocationResponsePayloadKeySpecifier
)[];
export type InvocationResponsePayloadFieldPolicy = {
  body?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type InvokePolarisObjectPayloadKeySpecifier = (
  | 'errors'
  | 'response'
  | 'success'
  | InvokePolarisObjectPayloadKeySpecifier
)[];
export type InvokePolarisObjectPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  response?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ResolvedPolarisObjectKeySpecifier = (
  | 'auth'
  | 'body'
  | 'externalAuth'
  | 'oauthClientId'
  | 'statusCode'
  | ResolvedPolarisObjectKeySpecifier
)[];
export type ResolvedPolarisObjectFieldPolicy = {
  auth?: FieldPolicy<any> | FieldReadFunction<any>;
  body?: FieldPolicy<any> | FieldReadFunction<any>;
  externalAuth?: FieldPolicy<any> | FieldReadFunction<any>;
  oauthClientId?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ResolvedPolarisObjectAuthKeySpecifier = (
  | 'hint'
  | 'type'
  | ResolvedPolarisObjectAuthKeySpecifier
)[];
export type ResolvedPolarisObjectAuthFieldPolicy = {
  hint?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ResolvedPolarisObjectExternalAuthKeySpecifier = (
  | 'displayName'
  | 'key'
  | 'url'
  | ResolvedPolarisObjectExternalAuthKeySpecifier
)[];
export type ResolvedPolarisObjectExternalAuthFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraMutationKeySpecifier = (
  | 'addPermissionSchemeGrants'
  | 'devOps'
  | 'removePermissionSchemeGrants'
  | JiraMutationKeySpecifier
)[];
export type JiraMutationFieldPolicy = {
  addPermissionSchemeGrants?: FieldPolicy<any> | FieldReadFunction<any>;
  devOps?: FieldPolicy<any> | FieldReadFunction<any>;
  removePermissionSchemeGrants?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPermissionSchemeAddGrantPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | JiraPermissionSchemeAddGrantPayloadKeySpecifier
)[];
export type JiraPermissionSchemeAddGrantPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraDevOpsMutationKeySpecifier = (
  | 'dismissDevOpsIssuePanelBanner'
  | 'optoutOfDevOpsIssuePanelNotConnectedState'
  | JiraDevOpsMutationKeySpecifier
)[];
export type JiraDevOpsMutationFieldPolicy = {
  dismissDevOpsIssuePanelBanner?: FieldPolicy<any> | FieldReadFunction<any>;
  optoutOfDevOpsIssuePanelNotConnectedState?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
};
export type JiraDismissDevOpsIssuePanelBannerPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | JiraDismissDevOpsIssuePanelBannerPayloadKeySpecifier
)[];
export type JiraDismissDevOpsIssuePanelBannerPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraOptoutDevOpsIssuePanelNotConnectedPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | JiraOptoutDevOpsIssuePanelNotConnectedPayloadKeySpecifier
)[];
export type JiraOptoutDevOpsIssuePanelNotConnectedPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPermissionSchemeRemoveGrantPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | JiraPermissionSchemeRemoveGrantPayloadKeySpecifier
)[];
export type JiraPermissionSchemeRemoveGrantPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JswMutationKeySpecifier = (
  | 'deleteCard'
  | JswMutationKeySpecifier
)[];
export type JswMutationFieldPolicy = {
  deleteCard?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DeleteCardOutputKeySpecifier = (
  | 'clientMutationId'
  | 'message'
  | 'statusCode'
  | 'success'
  | DeleteCardOutputKeySpecifier
)[];
export type DeleteCardOutputFieldPolicy = {
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MoveSprintDownResponseKeySpecifier = (
  | 'boardScope'
  | 'message'
  | 'statusCode'
  | 'success'
  | MoveSprintDownResponseKeySpecifier
)[];
export type MoveSprintDownResponseFieldPolicy = {
  boardScope?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MoveSprintUpResponseKeySpecifier = (
  | 'boardScope'
  | 'message'
  | 'statusCode'
  | 'success'
  | MoveSprintUpResponseKeySpecifier
)[];
export type MoveSprintUpResponseFieldPolicy = {
  boardScope?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RankColumnOutputKeySpecifier = (
  | 'columns'
  | 'message'
  | 'statusCode'
  | 'success'
  | RankColumnOutputKeySpecifier
)[];
export type RankColumnOutputFieldPolicy = {
  columns?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RefreshPolarisSnippetsPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | RefreshPolarisSnippetsPayloadKeySpecifier
)[];
export type RefreshPolarisSnippetsPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisRefreshJobKeySpecifier = (
  | 'progress'
  | 'refreshedSnippets'
  | PolarisRefreshJobKeySpecifier
)[];
export type PolarisRefreshJobFieldPolicy = {
  progress?: FieldPolicy<any> | FieldReadFunction<any>;
  refreshedSnippets?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisRefreshJobProgressKeySpecifier = (
  | 'errorCount'
  | 'pendingCount'
  | PolarisRefreshJobProgressKeySpecifier
)[];
export type PolarisRefreshJobProgressFieldPolicy = {
  errorCount?: FieldPolicy<any> | FieldReadFunction<any>;
  pendingCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ResolvePolarisObjectPayloadKeySpecifier = (
  | 'errors'
  | 'response'
  | 'success'
  | ResolvePolarisObjectPayloadKeySpecifier
)[];
export type ResolvePolarisObjectPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  response?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetAppEnvironmentVariablePayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | SetAppEnvironmentVariablePayloadKeySpecifier
)[];
export type SetAppEnvironmentVariablePayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetColumnLimitOutputKeySpecifier = (
  | 'columns'
  | 'message'
  | 'statusCode'
  | 'success'
  | SetColumnLimitOutputKeySpecifier
)[];
export type SetColumnLimitOutputFieldPolicy = {
  columns?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetColumnNameOutputKeySpecifier = (
  | 'column'
  | 'message'
  | 'statusCode'
  | 'success'
  | SetColumnNameOutputKeySpecifier
)[];
export type SetColumnNameOutputFieldPolicy = {
  column?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetExternalAuthCredentialsPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | SetExternalAuthCredentialsPayloadKeySpecifier
)[];
export type SetExternalAuthCredentialsPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetPolarisProjectOnboardedPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | SetPolarisProjectOnboardedPayloadKeySpecifier
)[];
export type SetPolarisProjectOnboardedPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetPolarisSelectedDeliveryProjectPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | SetPolarisSelectedDeliveryProjectPayloadKeySpecifier
)[];
export type SetPolarisSelectedDeliveryProjectPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetPolarisSnippetPropertiesConfigPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | SetPolarisSnippetPropertiesConfigPayloadKeySpecifier
)[];
export type SetPolarisSnippetPropertiesConfigPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetSwimlaneStrategyResponseKeySpecifier = (
  | 'message'
  | 'statusCode'
  | 'strategy'
  | 'success'
  | SetSwimlaneStrategyResponseKeySpecifier
)[];
export type SetSwimlaneStrategyResponseFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  strategy?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppSubscribePayloadKeySpecifier = (
  | 'errors'
  | 'installation'
  | 'success'
  | 'taskId'
  | AppSubscribePayloadKeySpecifier
)[];
export type AppSubscribePayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  installation?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  taskId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnarchivePolarisInsightsPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | UnarchivePolarisInsightsPayloadKeySpecifier
)[];
export type UnarchivePolarisInsightsPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnassignIssueParentOutputKeySpecifier = (
  | 'boardScope'
  | 'clientMutationId'
  | 'message'
  | 'statusCode'
  | 'success'
  | UnassignIssueParentOutputKeySpecifier
)[];
export type UnassignIssueParentOutputFieldPolicy = {
  boardScope?: FieldPolicy<any> | FieldReadFunction<any>;
  clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppUninstallationResponseKeySpecifier = (
  | 'errors'
  | 'success'
  | 'taskId'
  | AppUninstallationResponseKeySpecifier
)[];
export type AppUninstallationResponseFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  taskId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppUnsubscribePayloadKeySpecifier = (
  | 'errors'
  | 'installation'
  | 'success'
  | 'taskId'
  | AppUnsubscribePayloadKeySpecifier
)[];
export type AppUnsubscribePayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  installation?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  taskId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnwatchMarketplaceAppPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | UnwatchMarketplaceAppPayloadKeySpecifier
)[];
export type UnwatchMarketplaceAppPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateAppDetailsResponseKeySpecifier = (
  | 'app'
  | 'errors'
  | 'success'
  | UpdateAppDetailsResponseKeySpecifier
)[];
export type UpdateAppDetailsResponseFieldPolicy = {
  app?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateAtlassianOAuthClientResponseKeySpecifier = (
  | 'errors'
  | 'success'
  | UpdateAtlassianOAuthClientResponseKeySpecifier
)[];
export type UpdateAtlassianOAuthClientResponseFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateDevOpsContainerRelationshipEntityPropertiesPayloadKeySpecifier = (
  | 'errors'
  | 'properties'
  | 'success'
  | UpdateDevOpsContainerRelationshipEntityPropertiesPayloadKeySpecifier
)[];
export type UpdateDevOpsContainerRelationshipEntityPropertiesPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  properties?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateDevOpsServicePayloadKeySpecifier = (
  | 'errors'
  | 'service'
  | 'success'
  | UpdateDevOpsServicePayloadKeySpecifier
)[];
export type UpdateDevOpsServicePayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  service?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateDevOpsServiceAndJiraProjectRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'serviceAndJiraProjectRelationship'
  | 'success'
  | UpdateDevOpsServiceAndJiraProjectRelationshipPayloadKeySpecifier
)[];
export type UpdateDevOpsServiceAndJiraProjectRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  serviceAndJiraProjectRelationship?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateDevOpsServiceAndOpsgenieTeamRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'serviceAndOpsgenieTeamRelationship'
  | 'success'
  | UpdateDevOpsServiceAndOpsgenieTeamRelationshipPayloadKeySpecifier
)[];
export type UpdateDevOpsServiceAndOpsgenieTeamRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  serviceAndOpsgenieTeamRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateDevOpsServiceAndRepositoryRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'serviceAndRepositoryRelationship'
  | 'success'
  | UpdateDevOpsServiceAndRepositoryRelationshipPayloadKeySpecifier
)[];
export type UpdateDevOpsServiceAndRepositoryRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  serviceAndRepositoryRelationship?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateDevOpsServiceEntityPropertiesPayloadKeySpecifier = (
  | 'errors'
  | 'properties'
  | 'success'
  | UpdateDevOpsServiceEntityPropertiesPayloadKeySpecifier
)[];
export type UpdateDevOpsServiceEntityPropertiesPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  properties?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateDevOpsServiceRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'serviceRelationship'
  | 'success'
  | UpdateDevOpsServiceRelationshipPayloadKeySpecifier
)[];
export type UpdateDevOpsServiceRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  serviceRelationship?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateDeveloperLogAccessPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | UpdateDeveloperLogAccessPayloadKeySpecifier
)[];
export type UpdateDeveloperLogAccessPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateJiraProjectAndOpsgenieTeamRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'jiraProjectAndOpsgenieTeamRelationship'
  | 'success'
  | UpdateJiraProjectAndOpsgenieTeamRelationshipPayloadKeySpecifier
)[];
export type UpdateJiraProjectAndOpsgenieTeamRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraProjectAndOpsgenieTeamRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdateJiraProjectAndRepositoryRelationshipPayloadKeySpecifier = (
  | 'errors'
  | 'jiraProjectAndRepositoryRelationship'
  | 'success'
  | UpdateJiraProjectAndRepositoryRelationshipPayloadKeySpecifier
)[];
export type UpdateJiraProjectAndRepositoryRelationshipPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraProjectAndRepositoryRelationship?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdatePolarisCalculatedFieldPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | UpdatePolarisCalculatedFieldPayloadKeySpecifier
)[];
export type UpdatePolarisCalculatedFieldPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdatePolarisCommentPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | UpdatePolarisCommentPayloadKeySpecifier
)[];
export type UpdatePolarisCommentPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdatePolarisDecorationPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | UpdatePolarisDecorationPayloadKeySpecifier
)[];
export type UpdatePolarisDecorationPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdatePolarisFieldDescriptionPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | UpdatePolarisFieldDescriptionPayloadKeySpecifier
)[];
export type UpdatePolarisFieldDescriptionPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdatePolarisFieldOptionWeightPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | UpdatePolarisFieldOptionWeightPayloadKeySpecifier
)[];
export type UpdatePolarisFieldOptionWeightPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdatePolarisIdeaPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | UpdatePolarisIdeaPayloadKeySpecifier
)[];
export type UpdatePolarisIdeaPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdatePolarisInsightPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | UpdatePolarisInsightPayloadKeySpecifier
)[];
export type UpdatePolarisInsightPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdatePolarisPlayContributionPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | UpdatePolarisPlayContributionPayloadKeySpecifier
)[];
export type UpdatePolarisPlayContributionPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdatePolarisTermsConsentPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | UpdatePolarisTermsConsentPayloadKeySpecifier
)[];
export type UpdatePolarisTermsConsentPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdatePolarisViewPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | UpdatePolarisViewPayloadKeySpecifier
)[];
export type UpdatePolarisViewPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdatePolarisViewRankV2PayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | UpdatePolarisViewRankV2PayloadKeySpecifier
)[];
export type UpdatePolarisViewRankV2PayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UpdatePolarisViewSetPayloadKeySpecifier = (
  | 'errors'
  | 'node'
  | 'success'
  | UpdatePolarisViewSetPayloadKeySpecifier
)[];
export type UpdatePolarisViewSetPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppInstallationUpgradeResponseKeySpecifier = (
  | 'errors'
  | 'installationId'
  | 'success'
  | 'taskId'
  | AppInstallationUpgradeResponseKeySpecifier
)[];
export type AppInstallationUpgradeResponseFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  installationId?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
  taskId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserAuthTokenForExtensionResponseKeySpecifier = (
  | 'authToken'
  | 'errors'
  | 'success'
  | UserAuthTokenForExtensionResponseKeySpecifier
)[];
export type UserAuthTokenForExtensionResponseFieldPolicy = {
  authToken?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuthTokenKeySpecifier = ('token' | 'ttl' | AuthTokenKeySpecifier)[];
export type AuthTokenFieldPolicy = {
  token?: FieldPolicy<any> | FieldReadFunction<any>;
  ttl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type WatchMarketplaceAppPayloadKeySpecifier = (
  | 'errors'
  | 'success'
  | WatchMarketplaceAppPayloadKeySpecifier
)[];
export type WatchMarketplaceAppPayloadFieldPolicy = {
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  success?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppDeploymentLogEventKeySpecifier = (
  | 'createdAt'
  | 'level'
  | 'message'
  | 'stepName'
  | AppDeploymentLogEventKeySpecifier
)[];
export type AppDeploymentLogEventFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  level?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  stepName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppDeploymentSnapshotLogEventKeySpecifier = (
  | 'createdAt'
  | 'level'
  | 'message'
  | 'stepName'
  | AppDeploymentSnapshotLogEventKeySpecifier
)[];
export type AppDeploymentSnapshotLogEventFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  level?: FieldPolicy<any> | FieldReadFunction<any>;
  message?: FieldPolicy<any> | FieldReadFunction<any>;
  stepName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppDeploymentTransitionEventKeySpecifier = (
  | 'createdAt'
  | 'newStatus'
  | 'stepName'
  | AppDeploymentTransitionEventKeySpecifier
)[];
export type AppDeploymentTransitionEventFieldPolicy = {
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  newStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  stepName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppInstallationCreationTaskKeySpecifier = (
  | 'appEnvironmentId'
  | 'appId'
  | 'appVersionId'
  | 'context'
  | 'errors'
  | 'id'
  | 'state'
  | AppInstallationCreationTaskKeySpecifier
)[];
export type AppInstallationCreationTaskFieldPolicy = {
  appEnvironmentId?: FieldPolicy<any> | FieldReadFunction<any>;
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  appVersionId?: FieldPolicy<any> | FieldReadFunction<any>;
  context?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppInstallationDeletionTaskKeySpecifier = (
  | 'appEnvironmentId'
  | 'appId'
  | 'context'
  | 'errors'
  | 'id'
  | 'state'
  | AppInstallationDeletionTaskKeySpecifier
)[];
export type AppInstallationDeletionTaskFieldPolicy = {
  appEnvironmentId?: FieldPolicy<any> | FieldReadFunction<any>;
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  context?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppInstallationSubscribeTaskKeySpecifier = (
  | 'appEnvironmentId'
  | 'appId'
  | 'context'
  | 'errors'
  | 'id'
  | 'state'
  | AppInstallationSubscribeTaskKeySpecifier
)[];
export type AppInstallationSubscribeTaskFieldPolicy = {
  appEnvironmentId?: FieldPolicy<any> | FieldReadFunction<any>;
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  context?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppInstallationUnsubscribeTaskKeySpecifier = (
  | 'appEnvironmentId'
  | 'appId'
  | 'context'
  | 'errors'
  | 'id'
  | 'state'
  | AppInstallationUnsubscribeTaskKeySpecifier
)[];
export type AppInstallationUnsubscribeTaskFieldPolicy = {
  appEnvironmentId?: FieldPolicy<any> | FieldReadFunction<any>;
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  context?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppInstallationUpgradeTaskKeySpecifier = (
  | 'appEnvironmentId'
  | 'appId'
  | 'appVersionId'
  | 'context'
  | 'errors'
  | 'id'
  | 'state'
  | AppInstallationUpgradeTaskKeySpecifier
)[];
export type AppInstallationUpgradeTaskFieldPolicy = {
  appEnvironmentId?: FieldPolicy<any> | FieldReadFunction<any>;
  appId?: FieldPolicy<any> | FieldReadFunction<any>;
  appVersionId?: FieldPolicy<any> | FieldReadFunction<any>;
  context?: FieldPolicy<any> | FieldReadFunction<any>;
  errors?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AppUserKeySpecifier = (
  | 'accountId'
  | 'accountStatus'
  | 'name'
  | 'picture'
  | AppUserKeySpecifier
)[];
export type AppUserFieldPolicy = {
  accountId?: FieldPolicy<any> | FieldReadFunction<any>;
  accountStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  picture?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AtlassianAccountUserKeySpecifier = (
  | 'accountId'
  | 'accountStatus'
  | 'email'
  | 'locale'
  | 'name'
  | 'picture'
  | 'zoneinfo'
  | AtlassianAccountUserKeySpecifier
)[];
export type AtlassianAccountUserFieldPolicy = {
  accountId?: FieldPolicy<any> | FieldReadFunction<any>;
  accountStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  picture?: FieldPolicy<any> | FieldReadFunction<any>;
  zoneinfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LocalizationContextKeySpecifier = (
  | 'locale'
  | 'zoneinfo'
  | LocalizationContextKeySpecifier
)[];
export type LocalizationContextFieldPolicy = {
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  zoneinfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CloudAppScopeKeySpecifier = (
  | 'capability'
  | 'id'
  | 'name'
  | CloudAppScopeKeySpecifier
)[];
export type CloudAppScopeFieldPolicy = {
  capability?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassDeploymentEventKeySpecifier = (
  | 'deploymentSequenceNumber'
  | 'description'
  | 'displayName'
  | 'environment'
  | 'eventType'
  | 'lastUpdated'
  | 'pipeline'
  | 'state'
  | 'updateSequenceNumber'
  | 'url'
  | CompassDeploymentEventKeySpecifier
)[];
export type CompassDeploymentEventFieldPolicy = {
  deploymentSequenceNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  environment?: FieldPolicy<any> | FieldReadFunction<any>;
  eventType?: FieldPolicy<any> | FieldReadFunction<any>;
  lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>;
  pipeline?: FieldPolicy<any> | FieldReadFunction<any>;
  state?: FieldPolicy<any> | FieldReadFunction<any>;
  updateSequenceNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassDeploymentEventEnvironmentKeySpecifier = (
  | 'category'
  | 'displayName'
  | 'environmentId'
  | CompassDeploymentEventEnvironmentKeySpecifier
)[];
export type CompassDeploymentEventEnvironmentFieldPolicy = {
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  environmentId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassDeploymentEventPipelineKeySpecifier = (
  | 'displayName'
  | 'pipelineId'
  | 'url'
  | CompassDeploymentEventPipelineKeySpecifier
)[];
export type CompassDeploymentEventPipelineFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  pipelineId?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassEnumFieldKeySpecifier = (
  | 'definition'
  | 'value'
  | CompassEnumFieldKeySpecifier
)[];
export type CompassEnumFieldFieldPolicy = {
  definition?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassHasDescriptionScorecardCriteriaKeySpecifier = (
  | 'id'
  | 'scorecardCriteriaScore'
  | 'weight'
  | CompassHasDescriptionScorecardCriteriaKeySpecifier
)[];
export type CompassHasDescriptionScorecardCriteriaFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecardCriteriaScore?: FieldPolicy<any> | FieldReadFunction<any>;
  weight?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassHasFieldScorecardCriteriaKeySpecifier = (
  | 'fieldDefinition'
  | 'id'
  | 'scorecardCriteriaScore'
  | 'weight'
  | CompassHasFieldScorecardCriteriaKeySpecifier
)[];
export type CompassHasFieldScorecardCriteriaFieldPolicy = {
  fieldDefinition?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecardCriteriaScore?: FieldPolicy<any> | FieldReadFunction<any>;
  weight?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassHasLinkScorecardCriteriaKeySpecifier = (
  | 'id'
  | 'linkType'
  | 'scorecardCriteriaScore'
  | 'weight'
  | CompassHasLinkScorecardCriteriaKeySpecifier
)[];
export type CompassHasLinkScorecardCriteriaFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  linkType?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecardCriteriaScore?: FieldPolicy<any> | FieldReadFunction<any>;
  weight?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompassHasOwnerScorecardCriteriaKeySpecifier = (
  | 'id'
  | 'scorecardCriteriaScore'
  | 'weight'
  | CompassHasOwnerScorecardCriteriaKeySpecifier
)[];
export type CompassHasOwnerScorecardCriteriaFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  scorecardCriteriaScore?: FieldPolicy<any> | FieldReadFunction<any>;
  weight?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompatibleAtlassianCloudProductKeySpecifier = (
  | 'atlassianProduct'
  | 'id'
  | 'name'
  | CompatibleAtlassianCloudProductKeySpecifier
)[];
export type CompatibleAtlassianCloudProductFieldPolicy = {
  atlassianProduct?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompatibleAtlassianDataCenterProductKeySpecifier = (
  | 'atlassianProduct'
  | 'id'
  | 'maximumVersion'
  | 'minimumVersion'
  | 'name'
  | CompatibleAtlassianDataCenterProductKeySpecifier
)[];
export type CompatibleAtlassianDataCenterProductFieldPolicy = {
  atlassianProduct?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  maximumVersion?: FieldPolicy<any> | FieldReadFunction<any>;
  minimumVersion?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CompatibleAtlassianServerProductKeySpecifier = (
  | 'atlassianProduct'
  | 'id'
  | 'maximumVersion'
  | 'minimumVersion'
  | 'name'
  | CompatibleAtlassianServerProductKeySpecifier
)[];
export type CompatibleAtlassianServerProductFieldPolicy = {
  atlassianProduct?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  maximumVersion?: FieldPolicy<any> | FieldReadFunction<any>;
  minimumVersion?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ConnectAppScopeKeySpecifier = (
  | 'atlassianProductName'
  | 'capability'
  | 'id'
  | 'name'
  | 'scopeId'
  | ConnectAppScopeKeySpecifier
)[];
export type ConnectAppScopeFieldPolicy = {
  atlassianProductName?: FieldPolicy<any> | FieldReadFunction<any>;
  capability?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  scopeId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CustomerUserKeySpecifier = (
  | 'accountId'
  | 'accountStatus'
  | 'email'
  | 'locale'
  | 'name'
  | 'picture'
  | 'zoneinfo'
  | CustomerUserKeySpecifier
)[];
export type CustomerUserFieldPolicy = {
  accountId?: FieldPolicy<any> | FieldReadFunction<any>;
  accountStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  locale?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  picture?: FieldPolicy<any> | FieldReadFunction<any>;
  zoneinfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsCycleTimeMeanKeySpecifier = (
  | 'aggregateData'
  | 'data'
  | DevOpsMetricsCycleTimeMeanKeySpecifier
)[];
export type DevOpsMetricsCycleTimeMeanFieldPolicy = {
  aggregateData?: FieldPolicy<any> | FieldReadFunction<any>;
  data?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type DevOpsMetricsCycleTimePercentileKeySpecifier = (
  | 'aggregateData'
  | 'data'
  | 'percentile'
  | DevOpsMetricsCycleTimePercentileKeySpecifier
)[];
export type DevOpsMetricsCycleTimePercentileFieldPolicy = {
  aggregateData?: FieldPolicy<any> | FieldReadFunction<any>;
  data?: FieldPolicy<any> | FieldReadFunction<any>;
  percentile?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GenericMutationErrorExtensionKeySpecifier = (
  | 'errorType'
  | 'statusCode'
  | GenericMutationErrorExtensionKeySpecifier
)[];
export type GenericMutationErrorExtensionFieldPolicy = {
  errorType?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GenericQueryErrorExtensionKeySpecifier = (
  | 'errorType'
  | 'statusCode'
  | GenericQueryErrorExtensionKeySpecifier
)[];
export type GenericQueryErrorExtensionFieldPolicy = {
  errorType?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type InvokeExtensionPayloadErrorExtensionKeySpecifier = (
  | 'errorType'
  | 'fields'
  | 'statusCode'
  | InvokeExtensionPayloadErrorExtensionKeySpecifier
)[];
export type InvokeExtensionPayloadErrorExtensionFieldPolicy = {
  errorType?: FieldPolicy<any> | FieldReadFunction<any>;
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCode?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type InvokeExtensionPayloadErrorExtensionFieldsKeySpecifier = (
  | 'authInfoUrl'
  | InvokeExtensionPayloadErrorExtensionFieldsKeySpecifier
)[];
export type InvokeExtensionPayloadErrorExtensionFieldsFieldPolicy = {
  authInfoUrl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAffectedServiceKeySpecifier = (
  | 'serviceId'
  | JiraAffectedServiceKeySpecifier
)[];
export type JiraAffectedServiceFieldPolicy = {
  serviceId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAffectedServiceConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraAffectedServiceConnectionKeySpecifier
)[];
export type JiraAffectedServiceConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAffectedServiceEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraAffectedServiceEdgeKeySpecifier
)[];
export type JiraAffectedServiceEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAffectedServicesFieldKeySpecifier = (
  | 'affectedServices'
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'selectedAffectedServices'
  | 'type'
  | 'userFieldConfig'
  | JiraAffectedServicesFieldKeySpecifier
)[];
export type JiraAffectedServicesFieldFieldPolicy = {
  affectedServices?: FieldPolicy<any> | FieldReadFunction<any>;
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedAffectedServices?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueFieldConfigurationKeySpecifier = (
  | 'fieldConfig'
  | JiraIssueFieldConfigurationKeySpecifier
)[];
export type JiraIssueFieldConfigurationFieldPolicy = {
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraFieldConfigKeySpecifier = (
  | 'isEditable'
  | 'isRequired'
  | 'nonEditableReason'
  | JiraFieldConfigKeySpecifier
)[];
export type JiraFieldConfigFieldPolicy = {
  isEditable?: FieldPolicy<any> | FieldReadFunction<any>;
  isRequired?: FieldPolicy<any> | FieldReadFunction<any>;
  nonEditableReason?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraFieldNonEditableReasonKeySpecifier = (
  | 'message'
  | JiraFieldNonEditableReasonKeySpecifier
)[];
export type JiraFieldNonEditableReasonFieldPolicy = {
  message?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraUserIssueFieldConfigurationKeySpecifier = (
  | 'userFieldConfig'
  | JiraUserIssueFieldConfigurationKeySpecifier
)[];
export type JiraUserIssueFieldConfigurationFieldPolicy = {
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraUserFieldConfigKeySpecifier = (
  | 'isPinned'
  | 'isSelected'
  | JiraUserFieldConfigKeySpecifier
)[];
export type JiraUserFieldConfigFieldPolicy = {
  isPinned?: FieldPolicy<any> | FieldReadFunction<any>;
  isSelected?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAssetKeySpecifier = (
  | 'appKey'
  | 'originId'
  | 'serializedOrigin'
  | 'value'
  | JiraAssetKeySpecifier
)[];
export type JiraAssetFieldPolicy = {
  appKey?: FieldPolicy<any> | FieldReadFunction<any>;
  originId?: FieldPolicy<any> | FieldReadFunction<any>;
  serializedOrigin?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAssetFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'selectedAssets'
  | 'type'
  | 'userFieldConfig'
  | JiraAssetFieldKeySpecifier
)[];
export type JiraAssetFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedAssets?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAtlassianTeamKeySpecifier = (
  | 'avatar'
  | 'name'
  | 'teamId'
  | JiraAtlassianTeamKeySpecifier
)[];
export type JiraAtlassianTeamFieldPolicy = {
  avatar?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  teamId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAtlassianTeamConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraAtlassianTeamConnectionKeySpecifier
)[];
export type JiraAtlassianTeamConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAtlassianTeamEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraAtlassianTeamEdgeKeySpecifier
)[];
export type JiraAtlassianTeamEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAtlassianTeamFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'selectedTeam'
  | 'teams'
  | 'type'
  | 'userFieldConfig'
  | JiraAtlassianTeamFieldKeySpecifier
)[];
export type JiraAtlassianTeamFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedTeam?: FieldPolicy<any> | FieldReadFunction<any>;
  teams?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraAttachmentsFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'attachments'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'maxAllowedTotalAttachmentsSize'
  | 'mediaContext'
  | 'name'
  | 'permissions'
  | 'type'
  | 'userFieldConfig'
  | JiraAttachmentsFieldKeySpecifier
)[];
export type JiraAttachmentsFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  attachments?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  maxAllowedTotalAttachmentsSize?: FieldPolicy<any> | FieldReadFunction<any>;
  mediaContext?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  permissions?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraMediaContextKeySpecifier = (
  | 'uploadToken'
  | JiraMediaContextKeySpecifier
)[];
export type JiraMediaContextFieldPolicy = {
  uploadToken?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraMediaUploadTokenKeySpecifier = (
  | 'clientId'
  | 'endpointUrl'
  | 'targetCollection'
  | 'token'
  | 'tokenDurationInMin'
  | JiraMediaUploadTokenKeySpecifier
)[];
export type JiraMediaUploadTokenFieldPolicy = {
  clientId?: FieldPolicy<any> | FieldReadFunction<any>;
  endpointUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  targetCollection?: FieldPolicy<any> | FieldReadFunction<any>;
  token?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenDurationInMin?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraCMDBFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'attributesIncludedInAutoCompleteSearch'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'isMulti'
  | 'name'
  | 'searchUrl'
  | 'selectedCmdbObjects'
  | 'type'
  | 'userFieldConfig'
  | JiraCMDBFieldKeySpecifier
)[];
export type JiraCMDBFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  attributesIncludedInAutoCompleteSearch?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isMulti?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedCmdbObjects?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraCmdbObjectKeySpecifier = (
  | 'id'
  | 'label'
  | 'objectGlobalId'
  | 'objectId'
  | 'workspaceId'
  | JiraCmdbObjectKeySpecifier
)[];
export type JiraCmdbObjectFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  objectGlobalId?: FieldPolicy<any> | FieldReadFunction<any>;
  objectId?: FieldPolicy<any> | FieldReadFunction<any>;
  workspaceId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraCascadingOptionKeySpecifier = (
  | 'childOptionValue'
  | 'parentOptionValue'
  | JiraCascadingOptionKeySpecifier
)[];
export type JiraCascadingOptionFieldPolicy = {
  childOptionValue?: FieldPolicy<any> | FieldReadFunction<any>;
  parentOptionValue?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraOptionKeySpecifier = (
  | 'id'
  | 'isDisabled'
  | 'optionId'
  | 'value'
  | JiraOptionKeySpecifier
)[];
export type JiraOptionFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isDisabled?: FieldPolicy<any> | FieldReadFunction<any>;
  optionId?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraCascadingOptionsKeySpecifier = (
  | 'childOptionValues'
  | 'parentOptionValue'
  | JiraCascadingOptionsKeySpecifier
)[];
export type JiraCascadingOptionsFieldPolicy = {
  childOptionValues?: FieldPolicy<any> | FieldReadFunction<any>;
  parentOptionValue?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraCascadingOptionsConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraCascadingOptionsConnectionKeySpecifier
)[];
export type JiraCascadingOptionsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraCascadingOptionsEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraCascadingOptionsEdgeKeySpecifier
)[];
export type JiraCascadingOptionsEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraCascadingSelectFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'cascadingOption'
  | 'cascadingOptions'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'type'
  | 'userFieldConfig'
  | JiraCascadingSelectFieldKeySpecifier
)[];
export type JiraCascadingSelectFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  cascadingOption?: FieldPolicy<any> | FieldReadFunction<any>;
  cascadingOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraCheckboxesFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'fieldOptions'
  | 'id'
  | 'name'
  | 'selectedFieldOptions'
  | 'type'
  | 'userFieldConfig'
  | JiraCheckboxesFieldKeySpecifier
)[];
export type JiraCheckboxesFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedFieldOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraOptionConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraOptionConnectionKeySpecifier
)[];
export type JiraOptionConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraOptionEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraOptionEdgeKeySpecifier
)[];
export type JiraOptionEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraColorKeySpecifier = (
  | 'colorKey'
  | 'id'
  | JiraColorKeySpecifier
)[];
export type JiraColorFieldPolicy = {
  colorKey?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraColorFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'color'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'type'
  | 'userFieldConfig'
  | JiraColorFieldKeySpecifier
)[];
export type JiraColorFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  color?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraComponentKeySpecifier = (
  | 'componentId'
  | 'description'
  | 'id'
  | 'name'
  | JiraComponentKeySpecifier
)[];
export type JiraComponentFieldPolicy = {
  componentId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraComponentConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraComponentConnectionKeySpecifier
)[];
export type JiraComponentConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraComponentEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraComponentEdgeKeySpecifier
)[];
export type JiraComponentEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraComponentsFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'components'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'selectedComponents'
  | 'type'
  | 'userFieldConfig'
  | JiraComponentsFieldKeySpecifier
)[];
export type JiraComponentsFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  components?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedComponents?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraConnectMultipleSelectFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'fieldOptions'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'selectedFieldOptions'
  | 'type'
  | 'userFieldConfig'
  | JiraConnectMultipleSelectFieldKeySpecifier
)[];
export type JiraConnectMultipleSelectFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedFieldOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraConnectNumberFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'number'
  | 'type'
  | 'userFieldConfig'
  | JiraConnectNumberFieldKeySpecifier
)[];
export type JiraConnectNumberFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  number?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraConnectRichTextFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'mediaContext'
  | 'name'
  | 'renderer'
  | 'richText'
  | 'type'
  | 'userFieldConfig'
  | JiraConnectRichTextFieldKeySpecifier
)[];
export type JiraConnectRichTextFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  mediaContext?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  renderer?: FieldPolicy<any> | FieldReadFunction<any>;
  richText?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraConnectSingleSelectFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'fieldOption'
  | 'fieldOptions'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'type'
  | 'userFieldConfig'
  | JiraConnectSingleSelectFieldKeySpecifier
)[];
export type JiraConnectSingleSelectFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldOption?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraConnectTextFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'text'
  | 'type'
  | 'userFieldConfig'
  | JiraConnectTextFieldKeySpecifier
)[];
export type JiraConnectTextFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  text?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraDatePickerFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'date'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'type'
  | 'userFieldConfig'
  | JiraDatePickerFieldKeySpecifier
)[];
export type JiraDatePickerFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  date?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraDateTimePickerFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'dateTime'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'type'
  | 'userFieldConfig'
  | JiraDateTimePickerFieldKeySpecifier
)[];
export type JiraDateTimePickerFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  dateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraEpicKeySpecifier = (
  | 'color'
  | 'done'
  | 'id'
  | 'issueId'
  | 'key'
  | 'name'
  | 'summary'
  | JiraEpicKeySpecifier
)[];
export type JiraEpicFieldPolicy = {
  color?: FieldPolicy<any> | FieldReadFunction<any>;
  done?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  issueId?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  summary?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraEpicConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraEpicConnectionKeySpecifier
)[];
export type JiraEpicConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraEpicEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraEpicEdgeKeySpecifier
)[];
export type JiraEpicEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraEpicLinkFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'epic'
  | 'epics'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'type'
  | 'userFieldConfig'
  | JiraEpicLinkFieldKeySpecifier
)[];
export type JiraEpicLinkFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  epic?: FieldPolicy<any> | FieldReadFunction<any>;
  epics?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraFlagKeySpecifier = ('isFlagged' | JiraFlagKeySpecifier)[];
export type JiraFlagFieldPolicy = {
  isFlagged?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraFlagFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'flag'
  | 'id'
  | 'name'
  | 'type'
  | 'userFieldConfig'
  | JiraFlagFieldKeySpecifier
)[];
export type JiraFlagFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  flag?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraForgeGroupFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'groups'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'selectedGroup'
  | 'type'
  | 'userFieldConfig'
  | JiraForgeGroupFieldKeySpecifier
)[];
export type JiraForgeGroupFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  groups?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedGroup?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraGroupConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraGroupConnectionKeySpecifier
)[];
export type JiraGroupConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraForgeNumberFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'number'
  | 'type'
  | 'userFieldConfig'
  | JiraForgeNumberFieldKeySpecifier
)[];
export type JiraForgeNumberFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  number?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraForgeStringFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'text'
  | 'type'
  | 'userFieldConfig'
  | JiraForgeStringFieldKeySpecifier
)[];
export type JiraForgeStringFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  text?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraForgeStringsFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'labels'
  | 'name'
  | 'searchUrl'
  | 'selectedLabels'
  | 'type'
  | 'userFieldConfig'
  | JiraForgeStringsFieldKeySpecifier
)[];
export type JiraForgeStringsFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  labels?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedLabels?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraLabelConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraLabelConnectionKeySpecifier
)[];
export type JiraLabelConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraLabelEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraLabelEdgeKeySpecifier
)[];
export type JiraLabelEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraLabelKeySpecifier = (
  | 'labelId'
  | 'name'
  | JiraLabelKeySpecifier
)[];
export type JiraLabelFieldPolicy = {
  labelId?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraForgeUserFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'type'
  | 'user'
  | 'userFieldConfig'
  | 'users'
  | JiraForgeUserFieldKeySpecifier
)[];
export type JiraForgeUserFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  users?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraUserConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraUserConnectionKeySpecifier
)[];
export type JiraUserConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraUserEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraUserEdgeKeySpecifier
)[];
export type JiraUserEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraGroupEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraGroupEdgeKeySpecifier
)[];
export type JiraGroupEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraIssueConnectionKeySpecifier
)[];
export type JiraIssueConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraIssueEdgeKeySpecifier
)[];
export type JiraIssueEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueLinkKeySpecifier = (
  | 'id'
  | 'issue'
  | 'issueLinkId'
  | 'relatedBy'
  | JiraIssueLinkKeySpecifier
)[];
export type JiraIssueLinkFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  issue?: FieldPolicy<any> | FieldReadFunction<any>;
  issueLinkId?: FieldPolicy<any> | FieldReadFunction<any>;
  relatedBy?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueLinkTypeRelationKeySpecifier = (
  | 'direction'
  | 'id'
  | 'linkTypeId'
  | 'linkTypeName'
  | 'relationName'
  | JiraIssueLinkTypeRelationKeySpecifier
)[];
export type JiraIssueLinkTypeRelationFieldPolicy = {
  direction?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  linkTypeId?: FieldPolicy<any> | FieldReadFunction<any>;
  linkTypeName?: FieldPolicy<any> | FieldReadFunction<any>;
  relationName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueLinkConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraIssueLinkConnectionKeySpecifier
)[];
export type JiraIssueLinkConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueLinkEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraIssueLinkEdgeKeySpecifier
)[];
export type JiraIssueLinkEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueLinkFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'issueLinkConnection'
  | 'issueLinkTypeRelations'
  | 'issueLinks'
  | 'issues'
  | 'name'
  | 'searchUrl'
  | 'type'
  | 'userFieldConfig'
  | JiraIssueLinkFieldKeySpecifier
)[];
export type JiraIssueLinkFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  issueLinkConnection?: FieldPolicy<any> | FieldReadFunction<any>;
  issueLinkTypeRelations?: FieldPolicy<any> | FieldReadFunction<any>;
  issueLinks?: FieldPolicy<any> | FieldReadFunction<any>;
  issues?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueLinkTypeRelationConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraIssueLinkTypeRelationConnectionKeySpecifier
)[];
export type JiraIssueLinkTypeRelationConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueLinkTypeRelationEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraIssueLinkTypeRelationEdgeKeySpecifier
)[];
export type JiraIssueLinkTypeRelationEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueRestrictionFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'roles'
  | 'searchUrl'
  | 'selectedRoles'
  | 'type'
  | 'userFieldConfig'
  | JiraIssueRestrictionFieldKeySpecifier
)[];
export type JiraIssueRestrictionFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  roles?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedRoles?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraRoleConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraRoleConnectionKeySpecifier
)[];
export type JiraRoleConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraRoleEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraRoleEdgeKeySpecifier
)[];
export type JiraRoleEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueTypeConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | JiraIssueTypeConnectionKeySpecifier
)[];
export type JiraIssueTypeConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueTypeEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraIssueTypeEdgeKeySpecifier
)[];
export type JiraIssueTypeEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraIssueTypeFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'issueType'
  | 'issueTypes'
  | 'name'
  | 'type'
  | JiraIssueTypeFieldKeySpecifier
)[];
export type JiraIssueTypeFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  issueType?: FieldPolicy<any> | FieldReadFunction<any>;
  issueTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlCascadingOptionFieldValueKeySpecifier = (
  | 'displayName'
  | 'jqlTerm'
  | 'parentOption'
  | JiraJqlCascadingOptionFieldValueKeySpecifier
)[];
export type JiraJqlCascadingOptionFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  parentOption?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlComponentFieldValueKeySpecifier = (
  | 'displayName'
  | 'jqlTerm'
  | JiraJqlComponentFieldValueKeySpecifier
)[];
export type JiraJqlComponentFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlIssueFieldValueKeySpecifier = (
  | 'displayName'
  | 'issue'
  | 'jqlTerm'
  | JiraJqlIssueFieldValueKeySpecifier
)[];
export type JiraJqlIssueFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  issue?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlLabelFieldValueKeySpecifier = (
  | 'displayName'
  | 'jqlTerm'
  | 'label'
  | JiraJqlLabelFieldValueKeySpecifier
)[];
export type JiraJqlLabelFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlPriorityFieldValueKeySpecifier = (
  | 'displayName'
  | 'jqlTerm'
  | 'priority'
  | JiraJqlPriorityFieldValueKeySpecifier
)[];
export type JiraJqlPriorityFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  priority?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPriorityKeySpecifier = (
  | 'color'
  | 'iconUrl'
  | 'id'
  | 'name'
  | 'priorityId'
  | JiraPriorityKeySpecifier
)[];
export type JiraPriorityFieldPolicy = {
  color?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  priorityId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlResolutionFieldValueKeySpecifier = (
  | 'displayName'
  | 'jqlTerm'
  | 'resolution'
  | JiraJqlResolutionFieldValueKeySpecifier
)[];
export type JiraJqlResolutionFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  resolution?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraResolutionKeySpecifier = (
  | 'description'
  | 'id'
  | 'name'
  | 'resolutionId'
  | JiraResolutionKeySpecifier
)[];
export type JiraResolutionFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  resolutionId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlStatusCategoryFieldValueKeySpecifier = (
  | 'displayName'
  | 'jqlTerm'
  | 'statusCategory'
  | JiraJqlStatusCategoryFieldValueKeySpecifier
)[];
export type JiraJqlStatusCategoryFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCategory?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraStatusCategoryKeySpecifier = (
  | 'colorName'
  | 'id'
  | 'key'
  | 'name'
  | 'statusCategoryId'
  | JiraStatusCategoryKeySpecifier
)[];
export type JiraStatusCategoryFieldPolicy = {
  colorName?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCategoryId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraJqlStatusFieldValueKeySpecifier = (
  | 'displayName'
  | 'jqlTerm'
  | 'statusCategory'
  | JiraJqlStatusFieldValueKeySpecifier
)[];
export type JiraJqlStatusFieldValueFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  jqlTerm?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCategory?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraLabelsFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'labels'
  | 'name'
  | 'searchUrl'
  | 'selectedLabels'
  | 'type'
  | 'userFieldConfig'
  | JiraLabelsFieldKeySpecifier
)[];
export type JiraLabelsFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  labels?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedLabels?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraMultipleGroupPickerFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'groups'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'selectedGroups'
  | 'type'
  | 'userFieldConfig'
  | JiraMultipleGroupPickerFieldKeySpecifier
)[];
export type JiraMultipleGroupPickerFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  groups?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedGroups?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraMultipleSelectFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'fieldOptions'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'selectedFieldOptions'
  | 'type'
  | 'userFieldConfig'
  | JiraMultipleSelectFieldKeySpecifier
)[];
export type JiraMultipleSelectFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedFieldOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraMultipleSelectUserPickerFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'selectedUsers'
  | 'type'
  | 'userFieldConfig'
  | 'users'
  | JiraMultipleSelectUserPickerFieldKeySpecifier
)[];
export type JiraMultipleSelectUserPickerFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedUsers?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  users?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraMultipleVersionPickerFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'selectedVersions'
  | 'type'
  | 'userFieldConfig'
  | 'versions'
  | JiraMultipleVersionPickerFieldKeySpecifier
)[];
export type JiraMultipleVersionPickerFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedVersions?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  versions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraVersionConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraVersionConnectionKeySpecifier
)[];
export type JiraVersionConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraVersionEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraVersionEdgeKeySpecifier
)[];
export type JiraVersionEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraNumberFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'number'
  | 'type'
  | 'userFieldConfig'
  | JiraNumberFieldKeySpecifier
)[];
export type JiraNumberFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  number?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraParentIssueFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'parentIssue'
  | 'type'
  | 'userFieldConfig'
  | JiraParentIssueFieldKeySpecifier
)[];
export type JiraParentIssueFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  parentIssue?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPeopleFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'isMulti'
  | 'name'
  | 'searchUrl'
  | 'selectedUsers'
  | 'type'
  | 'userFieldConfig'
  | 'users'
  | JiraPeopleFieldKeySpecifier
)[];
export type JiraPeopleFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isMulti?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedUsers?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  users?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPlatformAttachmentKeySpecifier = (
  | 'attachmentId'
  | 'author'
  | 'created'
  | 'fileName'
  | 'fileSize'
  | 'id'
  | 'mediaApiFileId'
  | 'mimeType'
  | 'parentId'
  | 'parentName'
  | JiraPlatformAttachmentKeySpecifier
)[];
export type JiraPlatformAttachmentFieldPolicy = {
  attachmentId?: FieldPolicy<any> | FieldReadFunction<any>;
  author?: FieldPolicy<any> | FieldReadFunction<any>;
  created?: FieldPolicy<any> | FieldReadFunction<any>;
  fileName?: FieldPolicy<any> | FieldReadFunction<any>;
  fileSize?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  mediaApiFileId?: FieldPolicy<any> | FieldReadFunction<any>;
  mimeType?: FieldPolicy<any> | FieldReadFunction<any>;
  parentId?: FieldPolicy<any> | FieldReadFunction<any>;
  parentName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPlatformCommentKeySpecifier = (
  | 'author'
  | 'commentId'
  | 'created'
  | 'id'
  | 'permissionLevel'
  | 'richText'
  | 'updateAuthor'
  | 'updated'
  | JiraPlatformCommentKeySpecifier
)[];
export type JiraPlatformCommentFieldPolicy = {
  author?: FieldPolicy<any> | FieldReadFunction<any>;
  commentId?: FieldPolicy<any> | FieldReadFunction<any>;
  created?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  permissionLevel?: FieldPolicy<any> | FieldReadFunction<any>;
  richText?: FieldPolicy<any> | FieldReadFunction<any>;
  updateAuthor?: FieldPolicy<any> | FieldReadFunction<any>;
  updated?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPriorityConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraPriorityConnectionKeySpecifier
)[];
export type JiraPriorityConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPriorityEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraPriorityEdgeKeySpecifier
)[];
export type JiraPriorityEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraPriorityFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'priorities'
  | 'priority'
  | 'type'
  | 'userFieldConfig'
  | JiraPriorityFieldKeySpecifier
)[];
export type JiraPriorityFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  priorities?: FieldPolicy<any> | FieldReadFunction<any>;
  priority?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraProjectFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'project'
  | 'projects'
  | 'searchUrl'
  | 'type'
  | 'userFieldConfig'
  | JiraProjectFieldKeySpecifier
)[];
export type JiraProjectFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  project?: FieldPolicy<any> | FieldReadFunction<any>;
  projects?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraRadioSelectFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'fieldOptions'
  | 'id'
  | 'name'
  | 'selectedOption'
  | 'type'
  | 'userFieldConfig'
  | JiraRadioSelectFieldKeySpecifier
)[];
export type JiraRadioSelectFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedOption?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraResolutionConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraResolutionConnectionKeySpecifier
)[];
export type JiraResolutionConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraResolutionEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraResolutionEdgeKeySpecifier
)[];
export type JiraResolutionEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraResolutionFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'resolution'
  | 'resolutions'
  | 'type'
  | 'userFieldConfig'
  | JiraResolutionFieldKeySpecifier
)[];
export type JiraResolutionFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  resolution?: FieldPolicy<any> | FieldReadFunction<any>;
  resolutions?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraRichTextFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'mediaContext'
  | 'name'
  | 'renderer'
  | 'richText'
  | 'type'
  | 'userFieldConfig'
  | JiraRichTextFieldKeySpecifier
)[];
export type JiraRichTextFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  mediaContext?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  renderer?: FieldPolicy<any> | FieldReadFunction<any>;
  richText?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraSecurityLevelKeySpecifier = (
  | 'description'
  | 'id'
  | 'name'
  | 'securityId'
  | JiraSecurityLevelKeySpecifier
)[];
export type JiraSecurityLevelFieldPolicy = {
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  securityId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraSecurityLevelConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraSecurityLevelConnectionKeySpecifier
)[];
export type JiraSecurityLevelConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraSecurityLevelEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraSecurityLevelEdgeKeySpecifier
)[];
export type JiraSecurityLevelEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraSecurityLevelFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'securityLevel'
  | 'securityLevels'
  | 'type'
  | 'userFieldConfig'
  | JiraSecurityLevelFieldKeySpecifier
)[];
export type JiraSecurityLevelFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  securityLevel?: FieldPolicy<any> | FieldReadFunction<any>;
  securityLevels?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementActiveApprovalKeySpecifier = (
  | 'approverPrincipals'
  | 'approvers'
  | 'canAnswerApproval'
  | 'configuration'
  | 'createdDate'
  | 'decisions'
  | 'finalDecision'
  | 'id'
  | 'name'
  | 'pendingApprovalCount'
  | 'status'
  | JiraServiceManagementActiveApprovalKeySpecifier
)[];
export type JiraServiceManagementActiveApprovalFieldPolicy = {
  approverPrincipals?: FieldPolicy<any> | FieldReadFunction<any>;
  approvers?: FieldPolicy<any> | FieldReadFunction<any>;
  canAnswerApproval?: FieldPolicy<any> | FieldReadFunction<any>;
  configuration?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  decisions?: FieldPolicy<any> | FieldReadFunction<any>;
  finalDecision?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  pendingApprovalCount?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementGroupApproverPrincipalsKeySpecifier = (
  | 'jiraServiceManagementGroupApproverPrincipals'
  | JiraServiceManagementGroupApproverPrincipalsKeySpecifier
)[];
export type JiraServiceManagementGroupApproverPrincipalsFieldPolicy = {
  jiraServiceManagementGroupApproverPrincipals?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
};
export type JiraServiceManagementGroupApproverPrincipalKeySpecifier = (
  | 'approvedCount'
  | 'groupApproverPrincipalId'
  | 'memberCount'
  | 'name'
  | JiraServiceManagementGroupApproverPrincipalKeySpecifier
)[];
export type JiraServiceManagementGroupApproverPrincipalFieldPolicy = {
  approvedCount?: FieldPolicy<any> | FieldReadFunction<any>;
  groupApproverPrincipalId?: FieldPolicy<any> | FieldReadFunction<any>;
  memberCount?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementUserApproverPrincipalKeySpecifier = (
  | 'jiraRest'
  | 'user'
  | JiraServiceManagementUserApproverPrincipalKeySpecifier
)[];
export type JiraServiceManagementUserApproverPrincipalFieldPolicy = {
  jiraRest?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementUserApproverPrincipalConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraServiceManagementUserApproverPrincipalConnectionKeySpecifier
)[];
export type JiraServiceManagementUserApproverPrincipalConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementUserApproverPrincipalEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraServiceManagementUserApproverPrincipalEdgeKeySpecifier
)[];
export type JiraServiceManagementUserApproverPrincipalEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementApproverConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraServiceManagementApproverConnectionKeySpecifier
)[];
export type JiraServiceManagementApproverConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementApproverEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraServiceManagementApproverEdgeKeySpecifier
)[];
export type JiraServiceManagementApproverEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementApproverKeySpecifier = (
  | 'approver'
  | 'approverDecision'
  | JiraServiceManagementApproverKeySpecifier
)[];
export type JiraServiceManagementApproverFieldPolicy = {
  approver?: FieldPolicy<any> | FieldReadFunction<any>;
  approverDecision?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementApprovalConfigurationKeySpecifier = (
  | 'approversConfiguration'
  | 'condition'
  | JiraServiceManagementApprovalConfigurationKeySpecifier
)[];
export type JiraServiceManagementApprovalConfigurationFieldPolicy = {
  approversConfiguration?: FieldPolicy<any> | FieldReadFunction<any>;
  condition?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementApproversConfigurationKeySpecifier = (
  | 'customFieldId'
  | 'customFieldName'
  | 'type'
  | JiraServiceManagementApproversConfigurationKeySpecifier
)[];
export type JiraServiceManagementApproversConfigurationFieldPolicy = {
  customFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  customFieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementApprovalConditionKeySpecifier = (
  | 'type'
  | 'value'
  | JiraServiceManagementApprovalConditionKeySpecifier
)[];
export type JiraServiceManagementApprovalConditionFieldPolicy = {
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementDecisionConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraServiceManagementDecisionConnectionKeySpecifier
)[];
export type JiraServiceManagementDecisionConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementDecisionEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraServiceManagementDecisionEdgeKeySpecifier
)[];
export type JiraServiceManagementDecisionEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementDecisionKeySpecifier = (
  | 'approver'
  | 'approverDecision'
  | JiraServiceManagementDecisionKeySpecifier
)[];
export type JiraServiceManagementDecisionFieldPolicy = {
  approver?: FieldPolicy<any> | FieldReadFunction<any>;
  approverDecision?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementApprovalStatusKeySpecifier = (
  | 'categoryId'
  | 'id'
  | 'name'
  | JiraServiceManagementApprovalStatusKeySpecifier
)[];
export type JiraServiceManagementApprovalStatusFieldPolicy = {
  categoryId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementApprovalFieldKeySpecifier = (
  | 'activeApproval'
  | 'aliasFieldId'
  | 'completedApprovals'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'type'
  | 'userFieldConfig'
  | JiraServiceManagementApprovalFieldKeySpecifier
)[];
export type JiraServiceManagementApprovalFieldFieldPolicy = {
  activeApproval?: FieldPolicy<any> | FieldReadFunction<any>;
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  completedApprovals?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementCompletedApprovalKeySpecifier = (
  | 'approvers'
  | 'completedDate'
  | 'createdDate'
  | 'finalDecision'
  | 'id'
  | 'name'
  | 'status'
  | JiraServiceManagementCompletedApprovalKeySpecifier
)[];
export type JiraServiceManagementCompletedApprovalFieldPolicy = {
  approvers?: FieldPolicy<any> | FieldReadFunction<any>;
  completedDate?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  finalDecision?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementAttachmentKeySpecifier = (
  | 'attachmentId'
  | 'author'
  | 'created'
  | 'fileName'
  | 'fileSize'
  | 'id'
  | 'mediaApiFileId'
  | 'mimeType'
  | 'parentCommentVisibility'
  | 'parentId'
  | 'parentName'
  | JiraServiceManagementAttachmentKeySpecifier
)[];
export type JiraServiceManagementAttachmentFieldPolicy = {
  attachmentId?: FieldPolicy<any> | FieldReadFunction<any>;
  author?: FieldPolicy<any> | FieldReadFunction<any>;
  created?: FieldPolicy<any> | FieldReadFunction<any>;
  fileName?: FieldPolicy<any> | FieldReadFunction<any>;
  fileSize?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  mediaApiFileId?: FieldPolicy<any> | FieldReadFunction<any>;
  mimeType?: FieldPolicy<any> | FieldReadFunction<any>;
  parentCommentVisibility?: FieldPolicy<any> | FieldReadFunction<any>;
  parentId?: FieldPolicy<any> | FieldReadFunction<any>;
  parentName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementCommentKeySpecifier = (
  | 'author'
  | 'commentId'
  | 'created'
  | 'id'
  | 'permissionLevel'
  | 'richText'
  | 'updateAuthor'
  | 'updated'
  | 'visibility'
  | JiraServiceManagementCommentKeySpecifier
)[];
export type JiraServiceManagementCommentFieldPolicy = {
  author?: FieldPolicy<any> | FieldReadFunction<any>;
  commentId?: FieldPolicy<any> | FieldReadFunction<any>;
  created?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  permissionLevel?: FieldPolicy<any> | FieldReadFunction<any>;
  richText?: FieldPolicy<any> | FieldReadFunction<any>;
  updateAuthor?: FieldPolicy<any> | FieldReadFunction<any>;
  updated?: FieldPolicy<any> | FieldReadFunction<any>;
  visibility?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementDateTimeFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'dateTime'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'type'
  | 'userFieldConfig'
  | JiraServiceManagementDateTimeFieldKeySpecifier
)[];
export type JiraServiceManagementDateTimeFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  dateTime?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementFeedbackKeySpecifier = (
  | 'rating'
  | JiraServiceManagementFeedbackKeySpecifier
)[];
export type JiraServiceManagementFeedbackFieldPolicy = {
  rating?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementIncidentKeySpecifier = (
  | 'hasLinkedIncidents'
  | JiraServiceManagementIncidentKeySpecifier
)[];
export type JiraServiceManagementIncidentFieldPolicy = {
  hasLinkedIncidents?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementIncidentLinkingFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'incident'
  | 'name'
  | 'type'
  | JiraServiceManagementIncidentLinkingFieldKeySpecifier
)[];
export type JiraServiceManagementIncidentLinkingFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  incident?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementIssueTypeHierarchyLevelKeySpecifier = (
  | 'level'
  | 'name'
  | JiraServiceManagementIssueTypeHierarchyLevelKeySpecifier
)[];
export type JiraServiceManagementIssueTypeHierarchyLevelFieldPolicy = {
  level?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementLanguageKeySpecifier = (
  | 'displayName'
  | 'languageCode'
  | JiraServiceManagementLanguageKeySpecifier
)[];
export type JiraServiceManagementLanguageFieldPolicy = {
  displayName?: FieldPolicy<any> | FieldReadFunction<any>;
  languageCode?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementMultipleSelectUserPickerFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'selectedUsers'
  | 'type'
  | 'userFieldConfig'
  | 'users'
  | JiraServiceManagementMultipleSelectUserPickerFieldKeySpecifier
)[];
export type JiraServiceManagementMultipleSelectUserPickerFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedUsers?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  users?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementOrganizationKeySpecifier = (
  | 'domain'
  | 'organizationId'
  | 'organizationName'
  | JiraServiceManagementOrganizationKeySpecifier
)[];
export type JiraServiceManagementOrganizationFieldPolicy = {
  domain?: FieldPolicy<any> | FieldReadFunction<any>;
  organizationId?: FieldPolicy<any> | FieldReadFunction<any>;
  organizationName?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementOrganizationConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraServiceManagementOrganizationConnectionKeySpecifier
)[];
export type JiraServiceManagementOrganizationConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementOrganizationEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraServiceManagementOrganizationEdgeKeySpecifier
)[];
export type JiraServiceManagementOrganizationEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementOrganizationFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'organizations'
  | 'searchUrl'
  | 'selectedOrganizations'
  | 'type'
  | 'userFieldConfig'
  | JiraServiceManagementOrganizationFieldKeySpecifier
)[];
export type JiraServiceManagementOrganizationFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  organizations?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedOrganizations?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementPeopleFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'isMulti'
  | 'name'
  | 'searchUrl'
  | 'selectedUsers'
  | 'type'
  | 'userFieldConfig'
  | 'users'
  | JiraServiceManagementPeopleFieldKeySpecifier
)[];
export type JiraServiceManagementPeopleFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isMulti?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedUsers?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  users?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementRequestFeedbackFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'feedback'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'type'
  | 'userFieldConfig'
  | JiraServiceManagementRequestFeedbackFieldKeySpecifier
)[];
export type JiraServiceManagementRequestFeedbackFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  feedback?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementRequestLanguageFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'language'
  | 'languages'
  | 'name'
  | 'type'
  | 'userFieldConfig'
  | JiraServiceManagementRequestLanguageFieldKeySpecifier
)[];
export type JiraServiceManagementRequestLanguageFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  language?: FieldPolicy<any> | FieldReadFunction<any>;
  languages?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementRequestTypeKeySpecifier = (
  | 'avatar'
  | 'description'
  | 'helpText'
  | 'id'
  | 'issueType'
  | 'key'
  | 'name'
  | 'portalId'
  | 'practices'
  | 'requestTypeId'
  | JiraServiceManagementRequestTypeKeySpecifier
)[];
export type JiraServiceManagementRequestTypeFieldPolicy = {
  avatar?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  helpText?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  issueType?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  portalId?: FieldPolicy<any> | FieldReadFunction<any>;
  practices?: FieldPolicy<any> | FieldReadFunction<any>;
  requestTypeId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementRequestTypePracticeKeySpecifier = (
  | 'key'
  | JiraServiceManagementRequestTypePracticeKeySpecifier
)[];
export type JiraServiceManagementRequestTypePracticeFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementRequestTypeConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraServiceManagementRequestTypeConnectionKeySpecifier
)[];
export type JiraServiceManagementRequestTypeConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementRequestTypeEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraServiceManagementRequestTypeEdgeKeySpecifier
)[];
export type JiraServiceManagementRequestTypeEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementRequestTypeFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'requestType'
  | 'requestTypes'
  | 'type'
  | JiraServiceManagementRequestTypeFieldKeySpecifier
)[];
export type JiraServiceManagementRequestTypeFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  requestType?: FieldPolicy<any> | FieldReadFunction<any>;
  requestTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementTeamResponderKeySpecifier = (
  | 'team'
  | JiraServiceManagementTeamResponderKeySpecifier
)[];
export type JiraServiceManagementTeamResponderFieldPolicy = {
  team?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementUserResponderKeySpecifier = (
  | 'user'
  | JiraServiceManagementUserResponderKeySpecifier
)[];
export type JiraServiceManagementUserResponderFieldPolicy = {
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraServiceManagementRespondersFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'responders'
  | 'type'
  | JiraServiceManagementRespondersFieldKeySpecifier
)[];
export type JiraServiceManagementRespondersFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  responders?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraSingleGroupPickerFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'groups'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'selectedGroup'
  | 'type'
  | 'userFieldConfig'
  | JiraSingleGroupPickerFieldKeySpecifier
)[];
export type JiraSingleGroupPickerFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  groups?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedGroup?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraSingleLineTextFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'text'
  | 'type'
  | 'userFieldConfig'
  | JiraSingleLineTextFieldKeySpecifier
)[];
export type JiraSingleLineTextFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  text?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraSingleSelectFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'fieldOption'
  | 'fieldOptions'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'type'
  | 'userFieldConfig'
  | JiraSingleSelectFieldKeySpecifier
)[];
export type JiraSingleSelectFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldOption?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldOptions?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraSingleSelectUserPickerFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'type'
  | 'user'
  | 'userFieldConfig'
  | 'users'
  | JiraSingleSelectUserPickerFieldKeySpecifier
)[];
export type JiraSingleSelectUserPickerFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  users?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraSingleVersionPickerFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'type'
  | 'userFieldConfig'
  | 'version'
  | 'versions'
  | JiraSingleVersionPickerFieldKeySpecifier
)[];
export type JiraSingleVersionPickerFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  version?: FieldPolicy<any> | FieldReadFunction<any>;
  versions?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraSprintConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraSprintConnectionKeySpecifier
)[];
export type JiraSprintConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraSprintEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraSprintEdgeKeySpecifier
)[];
export type JiraSprintEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraSprintFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'selectedSprints'
  | 'sprints'
  | 'type'
  | 'userFieldConfig'
  | JiraSprintFieldKeySpecifier
)[];
export type JiraSprintFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedSprints?: FieldPolicy<any> | FieldReadFunction<any>;
  sprints?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraStatusKeySpecifier = (
  | 'id'
  | 'name'
  | 'statusCategory'
  | 'statusId'
  | JiraStatusKeySpecifier
)[];
export type JiraStatusFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  statusCategory?: FieldPolicy<any> | FieldReadFunction<any>;
  statusId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraStatusFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'status'
  | 'type'
  | 'userFieldConfig'
  | JiraStatusFieldKeySpecifier
)[];
export type JiraStatusFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraSubtasksFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'subtasks'
  | 'type'
  | JiraSubtasksFieldKeySpecifier
)[];
export type JiraSubtasksFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  subtasks?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraTeamKeySpecifier = (
  | 'avatar'
  | 'description'
  | 'id'
  | 'members'
  | 'name'
  | 'teamId'
  | JiraTeamKeySpecifier
)[];
export type JiraTeamFieldPolicy = {
  avatar?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  members?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  teamId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraTeamConnectionKeySpecifier = (
  | 'edges'
  | 'pageInfo'
  | 'totalCount'
  | JiraTeamConnectionKeySpecifier
)[];
export type JiraTeamConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraTeamEdgeKeySpecifier = (
  | 'cursor'
  | 'node'
  | JiraTeamEdgeKeySpecifier
)[];
export type JiraTeamEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraTeamFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'searchUrl'
  | 'selectedTeam'
  | 'teams'
  | 'type'
  | 'userFieldConfig'
  | JiraTeamFieldKeySpecifier
)[];
export type JiraTeamFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  searchUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  selectedTeam?: FieldPolicy<any> | FieldReadFunction<any>;
  teams?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraTimeTrackingFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'originalEstimate'
  | 'remainingEstimate'
  | 'timeSpent'
  | 'timeTrackingSettings'
  | 'type'
  | 'userFieldConfig'
  | JiraTimeTrackingFieldKeySpecifier
)[];
export type JiraTimeTrackingFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  originalEstimate?: FieldPolicy<any> | FieldReadFunction<any>;
  remainingEstimate?: FieldPolicy<any> | FieldReadFunction<any>;
  timeSpent?: FieldPolicy<any> | FieldReadFunction<any>;
  timeTrackingSettings?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraTimeTrackingSettingsKeySpecifier = (
  | 'defaultFormat'
  | 'defaultUnit'
  | 'isJiraConfiguredTimeTrackingEnabled'
  | 'workingDaysPerWeek'
  | 'workingHoursPerDay'
  | JiraTimeTrackingSettingsKeySpecifier
)[];
export type JiraTimeTrackingSettingsFieldPolicy = {
  defaultFormat?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultUnit?: FieldPolicy<any> | FieldReadFunction<any>;
  isJiraConfiguredTimeTrackingEnabled?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  workingDaysPerWeek?: FieldPolicy<any> | FieldReadFunction<any>;
  workingHoursPerDay?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraUrlFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'type'
  | 'url'
  | 'userFieldConfig'
  | JiraUrlFieldKeySpecifier
)[];
export type JiraUrlFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraVoteKeySpecifier = (
  | 'count'
  | 'hasVoted'
  | JiraVoteKeySpecifier
)[];
export type JiraVoteFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  hasVoted?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraVotesFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'type'
  | 'userFieldConfig'
  | 'vote'
  | JiraVotesFieldKeySpecifier
)[];
export type JiraVotesFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  vote?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraWatchKeySpecifier = (
  | 'count'
  | 'isWatching'
  | JiraWatchKeySpecifier
)[];
export type JiraWatchFieldPolicy = {
  count?: FieldPolicy<any> | FieldReadFunction<any>;
  isWatching?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type JiraWatchesFieldKeySpecifier = (
  | 'aliasFieldId'
  | 'description'
  | 'fieldConfig'
  | 'fieldId'
  | 'id'
  | 'name'
  | 'type'
  | 'userFieldConfig'
  | 'watch'
  | JiraWatchesFieldKeySpecifier
)[];
export type JiraWatchesFieldFieldPolicy = {
  aliasFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  userFieldConfig?: FieldPolicy<any> | FieldReadFunction<any>;
  watch?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceAppDeploymentStepKeySpecifier = (
  | 'instruction'
  | 'screenshot'
  | MarketplaceAppDeploymentStepKeySpecifier
)[];
export type MarketplaceAppDeploymentStepFieldPolicy = {
  instruction?: FieldPolicy<any> | FieldReadFunction<any>;
  screenshot?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceCloudAppDeploymentKeySpecifier = (
  | 'cloudAppEnvironmentId'
  | 'cloudAppId'
  | 'cloudAppVersionId'
  | 'compatibleProducts'
  | 'scopes'
  | MarketplaceCloudAppDeploymentKeySpecifier
)[];
export type MarketplaceCloudAppDeploymentFieldPolicy = {
  cloudAppEnvironmentId?: FieldPolicy<any> | FieldReadFunction<any>;
  cloudAppId?: FieldPolicy<any> | FieldReadFunction<any>;
  cloudAppVersionId?: FieldPolicy<any> | FieldReadFunction<any>;
  compatibleProducts?: FieldPolicy<any> | FieldReadFunction<any>;
  scopes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceConnectAppDeploymentKeySpecifier = (
  | 'compatibleProducts'
  | 'isDescriptorFileAvailable'
  | 'scopes'
  | MarketplaceConnectAppDeploymentKeySpecifier
)[];
export type MarketplaceConnectAppDeploymentFieldPolicy = {
  compatibleProducts?: FieldPolicy<any> | FieldReadFunction<any>;
  isDescriptorFileAvailable?: FieldPolicy<any> | FieldReadFunction<any>;
  scopes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceInstructionalAppDeploymentKeySpecifier = (
  | 'compatibleProducts'
  | 'instructions'
  | 'isBinaryUrlAvailable'
  | MarketplaceInstructionalAppDeploymentKeySpecifier
)[];
export type MarketplaceInstructionalAppDeploymentFieldPolicy = {
  compatibleProducts?: FieldPolicy<any> | FieldReadFunction<any>;
  instructions?: FieldPolicy<any> | FieldReadFunction<any>;
  isBinaryUrlAvailable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplacePlugins1AppDeploymentKeySpecifier = (
  | 'compatibleProducts'
  | 'isDeploymentArtifactAvailable'
  | MarketplacePlugins1AppDeploymentKeySpecifier
)[];
export type MarketplacePlugins1AppDeploymentFieldPolicy = {
  compatibleProducts?: FieldPolicy<any> | FieldReadFunction<any>;
  isDeploymentArtifactAvailable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplacePlugins2AppDeploymentKeySpecifier = (
  | 'compatibleProducts'
  | 'isDeploymentArtifactAvailable'
  | MarketplacePlugins2AppDeploymentKeySpecifier
)[];
export type MarketplacePlugins2AppDeploymentFieldPolicy = {
  compatibleProducts?: FieldPolicy<any> | FieldReadFunction<any>;
  isDeploymentArtifactAvailable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MarketplaceWorkflowAppDeploymentKeySpecifier = (
  | 'compatibleProducts'
  | 'isWorkflowDataFileAvailable'
  | MarketplaceWorkflowAppDeploymentKeySpecifier
)[];
export type MarketplaceWorkflowAppDeploymentFieldPolicy = {
  compatibleProducts?: FieldPolicy<any> | FieldReadFunction<any>;
  isWorkflowDataFileAvailable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisDecorationSchemeKeySpecifier = (
  | 'fields'
  | 'id'
  | PolarisDecorationSchemeKeySpecifier
)[];
export type PolarisDecorationSchemeFieldPolicy = {
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaArchivedByFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaArchivedByFieldKeySpecifier
)[];
export type PolarisIdeaArchivedByFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaArchivedFieldKeySpecifier = (
  | 'archivedOption'
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaArchivedFieldKeySpecifier
)[];
export type PolarisIdeaArchivedFieldFieldPolicy = {
  archivedOption?: FieldPolicy<any> | FieldReadFunction<any>;
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaFieldOptionKeySpecifier = (
  | 'id'
  | 'label'
  | 'weight'
  | PolarisIdeaFieldOptionKeySpecifier
)[];
export type PolarisIdeaFieldOptionFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  weight?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaArchivedOnFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaArchivedOnFieldKeySpecifier
)[];
export type PolarisIdeaArchivedOnFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaDateFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaDateFieldKeySpecifier
)[];
export type PolarisIdeaDateFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaDateTimeFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaDateTimeFieldKeySpecifier
)[];
export type PolarisIdeaDateTimeFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaDocumentFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaDocumentFieldKeySpecifier
)[];
export type PolarisIdeaDocumentFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaIssueCommentsFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaIssueCommentsFieldKeySpecifier
)[];
export type PolarisIdeaIssueCommentsFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaIssueIdFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaIssueIdFieldKeySpecifier
)[];
export type PolarisIdeaIssueIdFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaIssueTypeFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaIssueTypeFieldKeySpecifier
)[];
export type PolarisIdeaIssueTypeFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaKeyFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaKeyFieldKeySpecifier
)[];
export type PolarisIdeaKeyFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaLabelsFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaLabelsFieldKeySpecifier
)[];
export type PolarisIdeaLabelsFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaLinkedIssuesFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaLinkedIssuesFieldKeySpecifier
)[];
export type PolarisIdeaLinkedIssuesFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaLinkedIssuesProgressFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaLinkedIssuesProgressFieldKeySpecifier
)[];
export type PolarisIdeaLinkedIssuesProgressFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaNumberFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaNumberFieldKeySpecifier
)[];
export type PolarisIdeaNumberFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaOptionFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'options'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaOptionFieldKeySpecifier
)[];
export type PolarisIdeaOptionFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  options?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaOptionsFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'options'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaOptionsFieldKeySpecifier
)[];
export type PolarisIdeaOptionsFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  options?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaSpecialFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | 'specialType'
  | PolarisIdeaSpecialFieldKeySpecifier
)[];
export type PolarisIdeaSpecialFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
  specialType?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaStatusFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaStatusFieldKeySpecifier
)[];
export type PolarisIdeaStatusFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaStringFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaStringFieldKeySpecifier
)[];
export type PolarisIdeaStringFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaUserFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaUserFieldKeySpecifier
)[];
export type PolarisIdeaUserFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaUsersFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaUsersFieldKeySpecifier
)[];
export type PolarisIdeaUsersFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PolarisIdeaVotesFieldKeySpecifier = (
  | 'builtin'
  | 'decorations'
  | 'defaultSortOrder'
  | 'description'
  | 'editable'
  | 'fieldId'
  | 'fieldName'
  | 'formula'
  | 'groupable'
  | 'id'
  | 'jiraFieldKey'
  | 'label'
  | 'linearizable'
  | 'presentation'
  | 'sortable'
  | PolarisIdeaVotesFieldKeySpecifier
)[];
export type PolarisIdeaVotesFieldFieldPolicy = {
  builtin?: FieldPolicy<any> | FieldReadFunction<any>;
  decorations?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultSortOrder?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  editable?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  fieldName?: FieldPolicy<any> | FieldReadFunction<any>;
  formula?: FieldPolicy<any> | FieldReadFunction<any>;
  groupable?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  jiraFieldKey?: FieldPolicy<any> | FieldReadFunction<any>;
  label?: FieldPolicy<any> | FieldReadFunction<any>;
  linearizable?: FieldPolicy<any> | FieldReadFunction<any>;
  presentation?: FieldPolicy<any> | FieldReadFunction<any>;
  sortable?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoadmapProjectKeySpecifier = (
  | 'areDependenciesSupported'
  | 'colorCustomFieldId'
  | 'description'
  | 'epicIssueTypeId'
  | 'hasCompletedOnboarding'
  | 'id'
  | 'inwardDependencyDescription'
  | 'itemTypes'
  | 'key'
  | 'lead'
  | 'lexoRankCustomFieldId'
  | 'name'
  | 'outwardDependencyDescription'
  | 'permissions'
  | 'startDateCustomFieldId'
  | 'validation'
  | RoadmapProjectKeySpecifier
)[];
export type RoadmapProjectFieldPolicy = {
  areDependenciesSupported?: FieldPolicy<any> | FieldReadFunction<any>;
  colorCustomFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  epicIssueTypeId?: FieldPolicy<any> | FieldReadFunction<any>;
  hasCompletedOnboarding?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  inwardDependencyDescription?: FieldPolicy<any> | FieldReadFunction<any>;
  itemTypes?: FieldPolicy<any> | FieldReadFunction<any>;
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  lead?: FieldPolicy<any> | FieldReadFunction<any>;
  lexoRankCustomFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  outwardDependencyDescription?: FieldPolicy<any> | FieldReadFunction<any>;
  permissions?: FieldPolicy<any> | FieldReadFunction<any>;
  startDateCustomFieldId?: FieldPolicy<any> | FieldReadFunction<any>;
  validation?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type _AppliedDirectiveKeySpecifier = (
  | 'args'
  | 'name'
  | _AppliedDirectiveKeySpecifier
)[];
export type _AppliedDirectiveFieldPolicy = {
  args?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type _DirectiveArgumentKeySpecifier = (
  | 'name'
  | 'value'
  | _DirectiveArgumentKeySpecifier
)[];
export type _DirectiveArgumentFieldPolicy = {
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SearchConfluencePageBlogAttachmentKeySpecifier = (
  | 'id'
  | 'title'
  | 'url'
  | 'iconUrl'
  | 'type'
  | 'description'
  | 'lastModifiedDate'
  | 'space'
  | SearchConfluencePageBlogAttachmentKeySpecifier
)[];
export type SearchConfluencePageBlogAttachmentFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  lastModifiedDate?: FieldPolicy<any> | FieldReadFunction<any>;
  space?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SearchSpaceKeySpecifier = (
  | 'key'
  | 'iconUrl'
  | SearchSpaceKeySpecifier
)[];
export type SearchSpaceFieldPolicy = {
  key?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SearchConfluenceSpaceKeySpecifier = (
  | 'id'
  | 'title'
  | 'url'
  | 'iconUrl'
  | 'type'
  | 'description'
  | 'lastModifiedDate'
  | SearchConfluenceSpaceKeySpecifier
)[];
export type SearchConfluenceSpaceFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  lastModifiedDate?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SearchDefaultResultKeySpecifier = (
  | 'id'
  | 'title'
  | 'url'
  | 'iconUrl'
  | 'type'
  | 'description'
  | 'lastModifiedDate'
  | SearchDefaultResultKeySpecifier
)[];
export type SearchDefaultResultFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
  iconUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  lastModifiedDate?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TypedTypePolicies = TypePolicies & {
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | QueryKeySpecifier
      | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  Activities?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActivitiesKeySpecifier
      | (() => undefined | ActivitiesKeySpecifier);
    fields?: ActivitiesFieldPolicy;
  };
  ActivitiesConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActivitiesConnectionKeySpecifier
      | (() => undefined | ActivitiesConnectionKeySpecifier);
    fields?: ActivitiesConnectionFieldPolicy;
  };
  ActivityEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActivityEdgeKeySpecifier
      | (() => undefined | ActivityEdgeKeySpecifier);
    fields?: ActivityEdgeFieldPolicy;
  };
  ActivitiesItem?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActivitiesItemKeySpecifier
      | (() => undefined | ActivitiesItemKeySpecifier);
    fields?: ActivitiesItemFieldPolicy;
  };
  Node?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | NodeKeySpecifier | (() => undefined | NodeKeySpecifier);
    fields?: NodeFieldPolicy;
  };
  ActivitiesObject?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActivitiesObjectKeySpecifier
      | (() => undefined | ActivitiesObjectKeySpecifier);
    fields?: ActivitiesObjectFieldPolicy;
  };
  ActivitiesContainer?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActivitiesContainerKeySpecifier
      | (() => undefined | ActivitiesContainerKeySpecifier);
    fields?: ActivitiesContainerFieldPolicy;
  };
  ActivitiesContributor?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActivitiesContributorKeySpecifier
      | (() => undefined | ActivitiesContributorKeySpecifier);
    fields?: ActivitiesContributorFieldPolicy;
  };
  User?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    fields?: UserFieldPolicy;
  };
  ActivitiesEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActivitiesEventKeySpecifier
      | (() => undefined | ActivitiesEventKeySpecifier);
    fields?: ActivitiesEventFieldPolicy;
  };
  ActivitiesCommentedEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActivitiesCommentedEventKeySpecifier
      | (() => undefined | ActivitiesCommentedEventKeySpecifier);
    fields?: ActivitiesCommentedEventFieldPolicy;
  };
  ActivitiesTransitionedEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActivitiesTransitionedEventKeySpecifier
      | (() => undefined | ActivitiesTransitionedEventKeySpecifier);
    fields?: ActivitiesTransitionedEventFieldPolicy;
  };
  ActivitiesUser?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActivitiesUserKeySpecifier
      | (() => undefined | ActivitiesUserKeySpecifier);
    fields?: ActivitiesUserFieldPolicy;
  };
  ActivitiesJiraIssue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActivitiesJiraIssueKeySpecifier
      | (() => undefined | ActivitiesJiraIssueKeySpecifier);
    fields?: ActivitiesJiraIssueFieldPolicy;
  };
  ActivitiesObjectParent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActivitiesObjectParentKeySpecifier
      | (() => undefined | ActivitiesObjectParentKeySpecifier);
    fields?: ActivitiesObjectParentFieldPolicy;
  };
  ActivityPageInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ActivityPageInfoKeySpecifier
      | (() => undefined | ActivityPageInfoKeySpecifier);
    fields?: ActivityPageInfoFieldPolicy;
  };
  MyActivities?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MyActivitiesKeySpecifier
      | (() => undefined | MyActivitiesKeySpecifier);
    fields?: MyActivitiesFieldPolicy;
  };
  App?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | AppKeySpecifier | (() => undefined | AppKeySpecifier);
    fields?: AppFieldPolicy;
  };
  AppEnvironment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppEnvironmentKeySpecifier
      | (() => undefined | AppEnvironmentKeySpecifier);
    fields?: AppEnvironmentFieldPolicy;
  };
  AppDeployment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppDeploymentKeySpecifier
      | (() => undefined | AppDeploymentKeySpecifier);
    fields?: AppDeploymentFieldPolicy;
  };
  ErrorDetails?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ErrorDetailsKeySpecifier
      | (() => undefined | ErrorDetailsKeySpecifier);
    fields?: ErrorDetailsFieldPolicy;
  };
  AppDeploymentStage?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppDeploymentStageKeySpecifier
      | (() => undefined | AppDeploymentStageKeySpecifier);
    fields?: AppDeploymentStageFieldPolicy;
  };
  AppDeploymentEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppDeploymentEventKeySpecifier
      | (() => undefined | AppDeploymentEventKeySpecifier);
    fields?: AppDeploymentEventFieldPolicy;
  };
  AppDeploymentStageProgress?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppDeploymentStageProgressKeySpecifier
      | (() => undefined | AppDeploymentStageProgressKeySpecifier);
    fields?: AppDeploymentStageProgressFieldPolicy;
  };
  AppInstallation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppInstallationKeySpecifier
      | (() => undefined | AppInstallationKeySpecifier);
    fields?: AppInstallationFieldPolicy;
  };
  AppEnvironmentVersion?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppEnvironmentVersionKeySpecifier
      | (() => undefined | AppEnvironmentVersionKeySpecifier);
    fields?: AppEnvironmentVersionFieldPolicy;
  };
  MigrationKeys?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MigrationKeysKeySpecifier
      | (() => undefined | MigrationKeysKeySpecifier);
    fields?: MigrationKeysFieldPolicy;
  };
  AppPermission?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppPermissionKeySpecifier
      | (() => undefined | AppPermissionKeySpecifier);
    fields?: AppPermissionFieldPolicy;
  };
  AppNetworkEgressPermission?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppNetworkEgressPermissionKeySpecifier
      | (() => undefined | AppNetworkEgressPermissionKeySpecifier);
    fields?: AppNetworkEgressPermissionFieldPolicy;
  };
  AppHostServiceScope?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppHostServiceScopeKeySpecifier
      | (() => undefined | AppHostServiceScopeKeySpecifier);
    fields?: AppHostServiceScopeFieldPolicy;
  };
  AppHostService?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppHostServiceKeySpecifier
      | (() => undefined | AppHostServiceKeySpecifier);
    fields?: AppHostServiceFieldPolicy;
  };
  AppSecurityPoliciesPermission?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppSecurityPoliciesPermissionKeySpecifier
      | (() => undefined | AppSecurityPoliciesPermissionKeySpecifier);
    fields?: AppSecurityPoliciesPermissionFieldPolicy;
  };
  AppInstallationLicense?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppInstallationLicenseKeySpecifier
      | (() => undefined | AppInstallationLicenseKeySpecifier);
    fields?: AppInstallationLicenseFieldPolicy;
  };
  AppVersion?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppVersionKeySpecifier
      | (() => undefined | AppVersionKeySpecifier);
    fields?: AppVersionFieldPolicy;
  };
  AtlassianOAuthClient?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AtlassianOAuthClientKeySpecifier
      | (() => undefined | AtlassianOAuthClientKeySpecifier);
    fields?: AtlassianOAuthClientFieldPolicy;
  };
  RefreshToken?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RefreshTokenKeySpecifier
      | (() => undefined | RefreshTokenKeySpecifier);
    fields?: RefreshTokenFieldPolicy;
  };
  AppEnvironmentVariable?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppEnvironmentVariableKeySpecifier
      | (() => undefined | AppEnvironmentVariableKeySpecifier);
    fields?: AppEnvironmentVariableFieldPolicy;
  };
  AppEnvironmentVersionConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppEnvironmentVersionConnectionKeySpecifier
      | (() => undefined | AppEnvironmentVersionConnectionKeySpecifier);
    fields?: AppEnvironmentVersionConnectionFieldPolicy;
  };
  AppEnvironmentVersionEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppEnvironmentVersionEdgeKeySpecifier
      | (() => undefined | AppEnvironmentVersionEdgeKeySpecifier);
    fields?: AppEnvironmentVersionEdgeFieldPolicy;
  };
  PageInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PageInfoKeySpecifier
      | (() => undefined | PageInfoKeySpecifier);
    fields?: PageInfoFieldPolicy;
  };
  MarketplaceApp?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceAppKeySpecifier
      | (() => undefined | MarketplaceAppKeySpecifier);
    fields?: MarketplaceAppFieldPolicy;
  };
  MarketplaceAppCategory?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceAppCategoryKeySpecifier
      | (() => undefined | MarketplaceAppCategoryKeySpecifier);
    fields?: MarketplaceAppCategoryFieldPolicy;
  };
  MarketplaceAppDistribution?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceAppDistributionKeySpecifier
      | (() => undefined | MarketplaceAppDistributionKeySpecifier);
    fields?: MarketplaceAppDistributionFieldPolicy;
  };
  MarketplaceListingImage?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceListingImageKeySpecifier
      | (() => undefined | MarketplaceListingImageKeySpecifier);
    fields?: MarketplaceListingImageFieldPolicy;
  };
  MarketplaceImageFile?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceImageFileKeySpecifier
      | (() => undefined | MarketplaceImageFileKeySpecifier);
    fields?: MarketplaceImageFileFieldPolicy;
  };
  MarketplacePartner?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplacePartnerKeySpecifier
      | (() => undefined | MarketplacePartnerKeySpecifier);
    fields?: MarketplacePartnerFieldPolicy;
  };
  MarketplacePartnerAddress?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplacePartnerAddressKeySpecifier
      | (() => undefined | MarketplacePartnerAddressKeySpecifier);
    fields?: MarketplacePartnerAddressFieldPolicy;
  };
  MarketplacePartnerContactDetails?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | MarketplacePartnerContactDetailsKeySpecifier
      | (() => undefined | MarketplacePartnerContactDetailsKeySpecifier);
    fields?: MarketplacePartnerContactDetailsFieldPolicy;
  };
  MarketplacePartnerPrograms?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplacePartnerProgramsKeySpecifier
      | (() => undefined | MarketplacePartnerProgramsKeySpecifier);
    fields?: MarketplacePartnerProgramsFieldPolicy;
  };
  MarketplacePartnerSupport?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplacePartnerSupportKeySpecifier
      | (() => undefined | MarketplacePartnerSupportKeySpecifier);
    fields?: MarketplacePartnerSupportFieldPolicy;
  };
  MarketplacePartnerSupportAvailability?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | MarketplacePartnerSupportAvailabilityKeySpecifier
      | (() => undefined | MarketplacePartnerSupportAvailabilityKeySpecifier);
    fields?: MarketplacePartnerSupportAvailabilityFieldPolicy;
  };
  MarketplacePartnerSupportHoliday?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | MarketplacePartnerSupportHolidayKeySpecifier
      | (() => undefined | MarketplacePartnerSupportHolidayKeySpecifier);
    fields?: MarketplacePartnerSupportHolidayFieldPolicy;
  };
  MarketplacePartnerSupportContact?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | MarketplacePartnerSupportContactKeySpecifier
      | (() => undefined | MarketplacePartnerSupportContactKeySpecifier);
    fields?: MarketplacePartnerSupportContactFieldPolicy;
  };
  MarketplaceAppPrograms?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceAppProgramsKeySpecifier
      | (() => undefined | MarketplaceAppProgramsKeySpecifier);
    fields?: MarketplaceAppProgramsFieldPolicy;
  };
  MarketplaceCloudFortified?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceCloudFortifiedKeySpecifier
      | (() => undefined | MarketplaceCloudFortifiedKeySpecifier);
    fields?: MarketplaceCloudFortifiedFieldPolicy;
  };
  MarketplaceAppReviewSummary?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceAppReviewSummaryKeySpecifier
      | (() => undefined | MarketplaceAppReviewSummaryKeySpecifier);
    fields?: MarketplaceAppReviewSummaryFieldPolicy;
  };
  MarketplaceAppVersionConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceAppVersionConnectionKeySpecifier
      | (() => undefined | MarketplaceAppVersionConnectionKeySpecifier);
    fields?: MarketplaceAppVersionConnectionFieldPolicy;
  };
  MarketplaceAppVersionEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceAppVersionEdgeKeySpecifier
      | (() => undefined | MarketplaceAppVersionEdgeKeySpecifier);
    fields?: MarketplaceAppVersionEdgeFieldPolicy;
  };
  MarketplaceAppVersion?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceAppVersionKeySpecifier
      | (() => undefined | MarketplaceAppVersionKeySpecifier);
    fields?: MarketplaceAppVersionFieldPolicy;
  };
  MarketplaceAppDeployment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceAppDeploymentKeySpecifier
      | (() => undefined | MarketplaceAppDeploymentKeySpecifier);
    fields?: MarketplaceAppDeploymentFieldPolicy;
  };
  CompatibleAtlassianProduct?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompatibleAtlassianProductKeySpecifier
      | (() => undefined | CompatibleAtlassianProductKeySpecifier);
    fields?: CompatibleAtlassianProductFieldPolicy;
  };
  MarketplaceSupportedAtlassianProduct?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | MarketplaceSupportedAtlassianProductKeySpecifier
      | (() => undefined | MarketplaceSupportedAtlassianProductKeySpecifier);
    fields?: MarketplaceSupportedAtlassianProductFieldPolicy;
  };
  MarketplaceListingHighlight?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceListingHighlightKeySpecifier
      | (() => undefined | MarketplaceListingHighlightKeySpecifier);
    fields?: MarketplaceListingHighlightFieldPolicy;
  };
  MarketplaceListingScreenshot?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceListingScreenshotKeySpecifier
      | (() => undefined | MarketplaceListingScreenshotKeySpecifier);
    fields?: MarketplaceListingScreenshotFieldPolicy;
  };
  MarketplaceAppVersionLicenseType?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | MarketplaceAppVersionLicenseTypeKeySpecifier
      | (() => undefined | MarketplaceAppVersionLicenseTypeKeySpecifier);
    fields?: MarketplaceAppVersionLicenseTypeFieldPolicy;
  };
  MarketplaceAppWatchersInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceAppWatchersInfoKeySpecifier
      | (() => undefined | MarketplaceAppWatchersInfoKeySpecifier);
    fields?: MarketplaceAppWatchersInfoFieldPolicy;
  };
  AppTunnelDefinitions?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppTunnelDefinitionsKeySpecifier
      | (() => undefined | AppTunnelDefinitionsKeySpecifier);
    fields?: AppTunnelDefinitionsFieldPolicy;
  };
  CustomUITunnelDefinition?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CustomUITunnelDefinitionKeySpecifier
      | (() => undefined | CustomUITunnelDefinitionKeySpecifier);
    fields?: CustomUITunnelDefinitionFieldPolicy;
  };
  AppInstallationTask?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppInstallationTaskKeySpecifier
      | (() => undefined | AppInstallationTaskKeySpecifier);
    fields?: AppInstallationTaskFieldPolicy;
  };
  MutationError?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MutationErrorKeySpecifier
      | (() => undefined | MutationErrorKeySpecifier);
    fields?: MutationErrorFieldPolicy;
  };
  MutationErrorExtension?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MutationErrorExtensionKeySpecifier
      | (() => undefined | MutationErrorExtensionKeySpecifier);
    fields?: MutationErrorExtensionFieldPolicy;
  };
  AppLogLineConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppLogLineConnectionKeySpecifier
      | (() => undefined | AppLogLineConnectionKeySpecifier);
    fields?: AppLogLineConnectionFieldPolicy;
  };
  AppLogLineEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppLogLineEdgeKeySpecifier
      | (() => undefined | AppLogLineEdgeKeySpecifier);
    fields?: AppLogLineEdgeFieldPolicy;
  };
  AppLogLine?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppLogLineKeySpecifier
      | (() => undefined | AppLogLineKeySpecifier);
    fields?: AppLogLineFieldPolicy;
  };
  FunctionInvocationMetadata?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FunctionInvocationMetadataKeySpecifier
      | (() => undefined | FunctionInvocationMetadataKeySpecifier);
    fields?: FunctionInvocationMetadataFieldPolicy;
  };
  FunctionDescription?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FunctionDescriptionKeySpecifier
      | (() => undefined | FunctionDescriptionKeySpecifier);
    fields?: FunctionDescriptionFieldPolicy;
  };
  AppInstallationContext?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppInstallationContextKeySpecifier
      | (() => undefined | AppInstallationContextKeySpecifier);
    fields?: AppInstallationContextFieldPolicy;
  };
  FunctionTrigger?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FunctionTriggerKeySpecifier
      | (() => undefined | FunctionTriggerKeySpecifier);
    fields?: FunctionTriggerFieldPolicy;
  };
  AppLogConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppLogConnectionKeySpecifier
      | (() => undefined | AppLogConnectionKeySpecifier);
    fields?: AppLogConnectionFieldPolicy;
  };
  AppLogEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppLogEdgeKeySpecifier
      | (() => undefined | AppLogEdgeKeySpecifier);
    fields?: AppLogEdgeFieldPolicy;
  };
  AppLog?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppLogKeySpecifier
      | (() => undefined | AppLogKeySpecifier);
    fields?: AppLogFieldPolicy;
  };
  AppLogLines?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppLogLinesKeySpecifier
      | (() => undefined | AppLogLinesKeySpecifier);
    fields?: AppLogLinesFieldPolicy;
  };
  AppStoredEntityConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppStoredEntityConnectionKeySpecifier
      | (() => undefined | AppStoredEntityConnectionKeySpecifier);
    fields?: AppStoredEntityConnectionFieldPolicy;
  };
  AppStoredEntityEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppStoredEntityEdgeKeySpecifier
      | (() => undefined | AppStoredEntityEdgeKeySpecifier);
    fields?: AppStoredEntityEdgeFieldPolicy;
  };
  AppStoredEntity?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppStoredEntityKeySpecifier
      | (() => undefined | AppStoredEntityKeySpecifier);
    fields?: AppStoredEntityFieldPolicy;
  };
  AppStoredEntityPageInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppStoredEntityPageInfoKeySpecifier
      | (() => undefined | AppStoredEntityPageInfoKeySpecifier);
    fields?: AppStoredEntityPageInfoFieldPolicy;
  };
  AppConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppConnectionKeySpecifier
      | (() => undefined | AppConnectionKeySpecifier);
    fields?: AppConnectionFieldPolicy;
  };
  AppEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppEdgeKeySpecifier
      | (() => undefined | AppEdgeKeySpecifier);
    fields?: AppEdgeFieldPolicy;
  };
  BitbucketQuery?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BitbucketQueryKeySpecifier
      | (() => undefined | BitbucketQueryKeySpecifier);
    fields?: BitbucketQueryFieldPolicy;
  };
  BitbucketRepository?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BitbucketRepositoryKeySpecifier
      | (() => undefined | BitbucketRepositoryKeySpecifier);
    fields?: BitbucketRepositoryFieldPolicy;
  };
  BitbucketRepositoryAvatar?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BitbucketRepositoryAvatarKeySpecifier
      | (() => undefined | BitbucketRepositoryAvatarKeySpecifier);
    fields?: BitbucketRepositoryAvatarFieldPolicy;
  };
  DevOpsServiceAndRepositoryRelationshipConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsServiceAndRepositoryRelationshipConnectionKeySpecifier
      | (() =>
          | undefined
          | DevOpsServiceAndRepositoryRelationshipConnectionKeySpecifier);
    fields?: DevOpsServiceAndRepositoryRelationshipConnectionFieldPolicy;
  };
  DevOpsServiceAndRepositoryRelationshipEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsServiceAndRepositoryRelationshipEdgeKeySpecifier
      | (() =>
          | undefined
          | DevOpsServiceAndRepositoryRelationshipEdgeKeySpecifier);
    fields?: DevOpsServiceAndRepositoryRelationshipEdgeFieldPolicy;
  };
  DevOpsServiceAndRepositoryRelationship?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsServiceAndRepositoryRelationshipKeySpecifier
      | (() => undefined | DevOpsServiceAndRepositoryRelationshipKeySpecifier);
    fields?: DevOpsServiceAndRepositoryRelationshipFieldPolicy;
  };
  DevOpsService?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsServiceKeySpecifier
      | (() => undefined | DevOpsServiceKeySpecifier);
    fields?: DevOpsServiceFieldPolicy;
  };
  BitbucketRepositoryIdConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BitbucketRepositoryIdConnectionKeySpecifier
      | (() => undefined | BitbucketRepositoryIdConnectionKeySpecifier);
    fields?: BitbucketRepositoryIdConnectionFieldPolicy;
  };
  BitbucketRepositoryIdEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BitbucketRepositoryIdEdgeKeySpecifier
      | (() => undefined | BitbucketRepositoryIdEdgeKeySpecifier);
    fields?: BitbucketRepositoryIdEdgeFieldPolicy;
  };
  DevOpsServiceRelationship?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsServiceRelationshipKeySpecifier
      | (() => undefined | DevOpsServiceRelationshipKeySpecifier);
    fields?: DevOpsServiceRelationshipFieldPolicy;
  };
  DevOpsServiceRelationshipConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsServiceRelationshipConnectionKeySpecifier
      | (() => undefined | DevOpsServiceRelationshipConnectionKeySpecifier);
    fields?: DevOpsServiceRelationshipConnectionFieldPolicy;
  };
  DevOpsServiceRelationshipEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsServiceRelationshipEdgeKeySpecifier
      | (() => undefined | DevOpsServiceRelationshipEdgeKeySpecifier);
    fields?: DevOpsServiceRelationshipEdgeFieldPolicy;
  };
  DevOpsServiceAndJiraProjectRelationshipConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsServiceAndJiraProjectRelationshipConnectionKeySpecifier
      | (() =>
          | undefined
          | DevOpsServiceAndJiraProjectRelationshipConnectionKeySpecifier);
    fields?: DevOpsServiceAndJiraProjectRelationshipConnectionFieldPolicy;
  };
  DevOpsServiceAndJiraProjectRelationshipEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsServiceAndJiraProjectRelationshipEdgeKeySpecifier
      | (() =>
          | undefined
          | DevOpsServiceAndJiraProjectRelationshipEdgeKeySpecifier);
    fields?: DevOpsServiceAndJiraProjectRelationshipEdgeFieldPolicy;
  };
  DevOpsServiceAndJiraProjectRelationship?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsServiceAndJiraProjectRelationshipKeySpecifier
      | (() => undefined | DevOpsServiceAndJiraProjectRelationshipKeySpecifier);
    fields?: DevOpsServiceAndJiraProjectRelationshipFieldPolicy;
  };
  JiraProject?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraProjectKeySpecifier
      | (() => undefined | JiraProjectKeySpecifier);
    fields?: JiraProjectFieldPolicy;
  };
  JiraAvatar?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAvatarKeySpecifier
      | (() => undefined | JiraAvatarKeySpecifier);
    fields?: JiraAvatarFieldPolicy;
  };
  JiraProjectCategory?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraProjectCategoryKeySpecifier
      | (() => undefined | JiraProjectCategoryKeySpecifier);
    fields?: JiraProjectCategoryFieldPolicy;
  };
  JiraProjectAndOpsgenieTeamRelationshipConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraProjectAndOpsgenieTeamRelationshipConnectionKeySpecifier
      | (() =>
          | undefined
          | JiraProjectAndOpsgenieTeamRelationshipConnectionKeySpecifier);
    fields?: JiraProjectAndOpsgenieTeamRelationshipConnectionFieldPolicy;
  };
  JiraProjectAndOpsgenieTeamRelationshipEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraProjectAndOpsgenieTeamRelationshipEdgeKeySpecifier
      | (() =>
          | undefined
          | JiraProjectAndOpsgenieTeamRelationshipEdgeKeySpecifier);
    fields?: JiraProjectAndOpsgenieTeamRelationshipEdgeFieldPolicy;
  };
  JiraProjectAndOpsgenieTeamRelationship?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraProjectAndOpsgenieTeamRelationshipKeySpecifier
      | (() => undefined | JiraProjectAndOpsgenieTeamRelationshipKeySpecifier);
    fields?: JiraProjectAndOpsgenieTeamRelationshipFieldPolicy;
  };
  OpsgenieTeam?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpsgenieTeamKeySpecifier
      | (() => undefined | OpsgenieTeamKeySpecifier);
    fields?: OpsgenieTeamFieldPolicy;
  };
  OpsgenieAlertCountByPriority?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpsgenieAlertCountByPriorityKeySpecifier
      | (() => undefined | OpsgenieAlertCountByPriorityKeySpecifier);
    fields?: OpsgenieAlertCountByPriorityFieldPolicy;
  };
  OpsgenieAlertCountPerDay?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpsgenieAlertCountPerDayKeySpecifier
      | (() => undefined | OpsgenieAlertCountPerDayKeySpecifier);
    fields?: OpsgenieAlertCountPerDayFieldPolicy;
  };
  DevOpsServiceAndOpsgenieTeamRelationshipConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsServiceAndOpsgenieTeamRelationshipConnectionKeySpecifier
      | (() =>
          | undefined
          | DevOpsServiceAndOpsgenieTeamRelationshipConnectionKeySpecifier);
    fields?: DevOpsServiceAndOpsgenieTeamRelationshipConnectionFieldPolicy;
  };
  DevOpsServiceAndOpsgenieTeamRelationshipEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsServiceAndOpsgenieTeamRelationshipEdgeKeySpecifier
      | (() =>
          | undefined
          | DevOpsServiceAndOpsgenieTeamRelationshipEdgeKeySpecifier);
    fields?: DevOpsServiceAndOpsgenieTeamRelationshipEdgeFieldPolicy;
  };
  DevOpsServiceAndOpsgenieTeamRelationship?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsServiceAndOpsgenieTeamRelationshipKeySpecifier
      | (() =>
          | undefined
          | DevOpsServiceAndOpsgenieTeamRelationshipKeySpecifier);
    fields?: DevOpsServiceAndOpsgenieTeamRelationshipFieldPolicy;
  };
  OpsgenieTeamMemberConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpsgenieTeamMemberConnectionKeySpecifier
      | (() => undefined | OpsgenieTeamMemberConnectionKeySpecifier);
    fields?: OpsgenieTeamMemberConnectionFieldPolicy;
  };
  OpsgenieTeamMemberEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpsgenieTeamMemberEdgeKeySpecifier
      | (() => undefined | OpsgenieTeamMemberEdgeKeySpecifier);
    fields?: OpsgenieTeamMemberEdgeFieldPolicy;
  };
  OpsgenieTeamMember?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpsgenieTeamMemberKeySpecifier
      | (() => undefined | OpsgenieTeamMemberKeySpecifier);
    fields?: OpsgenieTeamMemberFieldPolicy;
  };
  OpsgenieSchedule?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpsgenieScheduleKeySpecifier
      | (() => undefined | OpsgenieScheduleKeySpecifier);
    fields?: OpsgenieScheduleFieldPolicy;
  };
  OpsgenieScheduleTimeline?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpsgenieScheduleTimelineKeySpecifier
      | (() => undefined | OpsgenieScheduleTimelineKeySpecifier);
    fields?: OpsgenieScheduleTimelineFieldPolicy;
  };
  OpsgenieScheduleRotation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpsgenieScheduleRotationKeySpecifier
      | (() => undefined | OpsgenieScheduleRotationKeySpecifier);
    fields?: OpsgenieScheduleRotationFieldPolicy;
  };
  OpsgenieSchedulePeriod?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpsgenieSchedulePeriodKeySpecifier
      | (() => undefined | OpsgenieSchedulePeriodKeySpecifier);
    fields?: OpsgenieSchedulePeriodFieldPolicy;
  };
  OpsgenieSchedulePeriodRecipient?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpsgenieSchedulePeriodRecipientKeySpecifier
      | (() => undefined | OpsgenieSchedulePeriodRecipientKeySpecifier);
    fields?: OpsgenieSchedulePeriodRecipientFieldPolicy;
  };
  OpsgenieTeamConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpsgenieTeamConnectionKeySpecifier
      | (() => undefined | OpsgenieTeamConnectionKeySpecifier);
    fields?: OpsgenieTeamConnectionFieldPolicy;
  };
  OpsgenieTeamEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpsgenieTeamEdgeKeySpecifier
      | (() => undefined | OpsgenieTeamEdgeKeySpecifier);
    fields?: OpsgenieTeamEdgeFieldPolicy;
  };
  JiraProjectAndRepositoryRelationshipConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraProjectAndRepositoryRelationshipConnectionKeySpecifier
      | (() =>
          | undefined
          | JiraProjectAndRepositoryRelationshipConnectionKeySpecifier);
    fields?: JiraProjectAndRepositoryRelationshipConnectionFieldPolicy;
  };
  JiraProjectAndRepositoryRelationshipEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraProjectAndRepositoryRelationshipEdgeKeySpecifier
      | (() =>
          | undefined
          | JiraProjectAndRepositoryRelationshipEdgeKeySpecifier);
    fields?: JiraProjectAndRepositoryRelationshipEdgeFieldPolicy;
  };
  JiraProjectAndRepositoryRelationship?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraProjectAndRepositoryRelationshipKeySpecifier
      | (() => undefined | JiraProjectAndRepositoryRelationshipKeySpecifier);
    fields?: JiraProjectAndRepositoryRelationshipFieldPolicy;
  };
  DevOpsThirdPartyRepository?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsThirdPartyRepositoryKeySpecifier
      | (() => undefined | DevOpsThirdPartyRepositoryKeySpecifier);
    fields?: DevOpsThirdPartyRepositoryFieldPolicy;
  };
  DevOpsAvatar?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsAvatarKeySpecifier
      | (() => undefined | DevOpsAvatarKeySpecifier);
    fields?: DevOpsAvatarFieldPolicy;
  };
  DevOpsServiceConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsServiceConnectionKeySpecifier
      | (() => undefined | DevOpsServiceConnectionKeySpecifier);
    fields?: DevOpsServiceConnectionFieldPolicy;
  };
  DevOpsServiceEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsServiceEdgeKeySpecifier
      | (() => undefined | DevOpsServiceEdgeKeySpecifier);
    fields?: DevOpsServiceEdgeFieldPolicy;
  };
  DevOpsServiceTier?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsServiceTierKeySpecifier
      | (() => undefined | DevOpsServiceTierKeySpecifier);
    fields?: DevOpsServiceTierFieldPolicy;
  };
  BitbucketWorkspace?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BitbucketWorkspaceKeySpecifier
      | (() => undefined | BitbucketWorkspaceKeySpecifier);
    fields?: BitbucketWorkspaceFieldPolicy;
  };
  BitbucketRepositoryConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BitbucketRepositoryConnectionKeySpecifier
      | (() => undefined | BitbucketRepositoryConnectionKeySpecifier);
    fields?: BitbucketRepositoryConnectionFieldPolicy;
  };
  BitbucketRepositoryEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BitbucketRepositoryEdgeKeySpecifier
      | (() => undefined | BitbucketRepositoryEdgeKeySpecifier);
    fields?: BitbucketRepositoryEdgeFieldPolicy;
  };
  BoardScope?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BoardScopeKeySpecifier
      | (() => undefined | BoardScopeKeySpecifier);
    fields?: BoardScopeFieldPolicy;
  };
  Backlog?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BacklogKeySpecifier
      | (() => undefined | BacklogKeySpecifier);
    fields?: BacklogFieldPolicy;
  };
  CardType?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CardTypeKeySpecifier
      | (() => undefined | CardTypeKeySpecifier);
    fields?: CardTypeFieldPolicy;
  };
  InlineCardCreateConfig?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | InlineCardCreateConfigKeySpecifier
      | (() => undefined | InlineCardCreateConfigKeySpecifier);
    fields?: InlineCardCreateConfigFieldPolicy;
  };
  SoftwareCard?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SoftwareCardKeySpecifier
      | (() => undefined | SoftwareCardKeySpecifier);
    fields?: SoftwareCardFieldPolicy;
  };
  ChildCardsMetadata?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ChildCardsMetadataKeySpecifier
      | (() => undefined | ChildCardsMetadataKeySpecifier);
    fields?: ChildCardsMetadataFieldPolicy;
  };
  CardCoverMedia?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CardCoverMediaKeySpecifier
      | (() => undefined | CardCoverMediaKeySpecifier);
    fields?: CardCoverMediaFieldPolicy;
  };
  DevStatus?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevStatusKeySpecifier
      | (() => undefined | DevStatusKeySpecifier);
    fields?: DevStatusFieldPolicy;
  };
  Estimate?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EstimateKeySpecifier
      | (() => undefined | EstimateKeySpecifier);
    fields?: EstimateFieldPolicy;
  };
  OriginalEstimate?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OriginalEstimateKeySpecifier
      | (() => undefined | OriginalEstimateKeySpecifier);
    fields?: OriginalEstimateFieldPolicy;
  };
  CardPriority?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CardPriorityKeySpecifier
      | (() => undefined | CardPriorityKeySpecifier);
    fields?: CardPriorityFieldPolicy;
  };
  CardStatus?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CardStatusKeySpecifier
      | (() => undefined | CardStatusKeySpecifier);
    fields?: CardStatusFieldPolicy;
  };
  BacklogExtension?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BacklogExtensionKeySpecifier
      | (() => undefined | BacklogExtensionKeySpecifier);
    fields?: BacklogExtensionFieldPolicy;
  };
  SoftwareOperation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SoftwareOperationKeySpecifier
      | (() => undefined | SoftwareOperationKeySpecifier);
    fields?: SoftwareOperationFieldPolicy;
  };
  Icon?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | IconKeySpecifier | (() => undefined | IconKeySpecifier);
    fields?: IconFieldPolicy;
  };
  SoftwareBoard?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SoftwareBoardKeySpecifier
      | (() => undefined | SoftwareBoardKeySpecifier);
    fields?: SoftwareBoardFieldPolicy;
  };
  CardMediaConfig?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CardMediaConfigKeySpecifier
      | (() => undefined | CardMediaConfigKeySpecifier);
    fields?: CardMediaConfigFieldPolicy;
  };
  Column?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ColumnKeySpecifier
      | (() => undefined | ColumnKeySpecifier);
    fields?: ColumnFieldPolicy;
  };
  ColumnStatus?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ColumnStatusKeySpecifier
      | (() => undefined | ColumnStatusKeySpecifier);
    fields?: ColumnStatusFieldPolicy;
  };
  SoftwareCardTypeTransition?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SoftwareCardTypeTransitionKeySpecifier
      | (() => undefined | SoftwareCardTypeTransitionKeySpecifier);
    fields?: SoftwareCardTypeTransitionFieldPolicy;
  };
  SoftwareCardTransition?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SoftwareCardTransitionKeySpecifier
      | (() => undefined | SoftwareCardTransitionKeySpecifier);
    fields?: SoftwareCardTransitionFieldPolicy;
  };
  BoardEditConfig?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BoardEditConfigKeySpecifier
      | (() => undefined | BoardEditConfigKeySpecifier);
    fields?: BoardEditConfigFieldPolicy;
  };
  InlineColumnEditConfig?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | InlineColumnEditConfigKeySpecifier
      | (() => undefined | InlineColumnEditConfigKeySpecifier);
    fields?: InlineColumnEditConfigFieldPolicy;
  };
  Swimlane?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SwimlaneKeySpecifier
      | (() => undefined | SwimlaneKeySpecifier);
    fields?: SwimlaneFieldPolicy;
  };
  ColumnInSwimlane?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ColumnInSwimlaneKeySpecifier
      | (() => undefined | ColumnInSwimlaneKeySpecifier);
    fields?: ColumnInSwimlaneFieldPolicy;
  };
  CardParent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CardParentKeySpecifier
      | (() => undefined | CardParentKeySpecifier);
    fields?: CardParentFieldPolicy;
  };
  SoftwareCardChildrenInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SoftwareCardChildrenInfoKeySpecifier
      | (() => undefined | SoftwareCardChildrenInfoKeySpecifier);
    fields?: SoftwareCardChildrenInfoFieldPolicy;
  };
  SoftwareCardChildrenInfoStats?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SoftwareCardChildrenInfoStatsKeySpecifier
      | (() => undefined | SoftwareCardChildrenInfoStatsKeySpecifier);
    fields?: SoftwareCardChildrenInfoStatsFieldPolicy;
  };
  CurrentUser?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CurrentUserKeySpecifier
      | (() => undefined | CurrentUserKeySpecifier);
    fields?: CurrentUserFieldPolicy;
  };
  CustomFilter?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CustomFilterKeySpecifier
      | (() => undefined | CustomFilterKeySpecifier);
    fields?: CustomFilterFieldPolicy;
  };
  FilterQuery?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FilterQueryKeySpecifier
      | (() => undefined | FilterQueryKeySpecifier);
    fields?: FilterQueryFieldPolicy;
  };
  EstimationConfig?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EstimationConfigKeySpecifier
      | (() => undefined | EstimationConfigKeySpecifier);
    fields?: EstimationConfigFieldPolicy;
  };
  AvailableEstimations?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AvailableEstimationsKeySpecifier
      | (() => undefined | AvailableEstimationsKeySpecifier);
    fields?: AvailableEstimationsFieldPolicy;
  };
  CurrentEstimation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CurrentEstimationKeySpecifier
      | (() => undefined | CurrentEstimationKeySpecifier);
    fields?: CurrentEstimationFieldPolicy;
  };
  BoardFeatureGroupConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BoardFeatureGroupConnectionKeySpecifier
      | (() => undefined | BoardFeatureGroupConnectionKeySpecifier);
    fields?: BoardFeatureGroupConnectionFieldPolicy;
  };
  BoardFeatureGroupEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BoardFeatureGroupEdgeKeySpecifier
      | (() => undefined | BoardFeatureGroupEdgeKeySpecifier);
    fields?: BoardFeatureGroupEdgeFieldPolicy;
  };
  BoardFeatureGroup?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BoardFeatureGroupKeySpecifier
      | (() => undefined | BoardFeatureGroupKeySpecifier);
    fields?: BoardFeatureGroupFieldPolicy;
  };
  BoardFeatureConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BoardFeatureConnectionKeySpecifier
      | (() => undefined | BoardFeatureConnectionKeySpecifier);
    fields?: BoardFeatureConnectionFieldPolicy;
  };
  BoardFeatureEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BoardFeatureEdgeKeySpecifier
      | (() => undefined | BoardFeatureEdgeKeySpecifier);
    fields?: BoardFeatureEdgeFieldPolicy;
  };
  BoardFeatureView?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BoardFeatureViewKeySpecifier
      | (() => undefined | BoardFeatureViewKeySpecifier);
    fields?: BoardFeatureViewFieldPolicy;
  };
  BoardFeature?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BoardFeatureKeySpecifier
      | (() => undefined | BoardFeatureKeySpecifier);
    fields?: BoardFeatureFieldPolicy;
  };
  SoftwareProject?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SoftwareProjectKeySpecifier
      | (() => undefined | SoftwareProjectKeySpecifier);
    fields?: SoftwareProjectFieldPolicy;
  };
  SoftwareReports?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SoftwareReportsKeySpecifier
      | (() => undefined | SoftwareReportsKeySpecifier);
    fields?: SoftwareReportsFieldPolicy;
  };
  BurndownChart?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BurndownChartKeySpecifier
      | (() => undefined | BurndownChartKeySpecifier);
    fields?: BurndownChartFieldPolicy;
  };
  BurndownChartData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BurndownChartDataKeySpecifier
      | (() => undefined | BurndownChartDataKeySpecifier);
    fields?: BurndownChartDataFieldPolicy;
  };
  SprintScopeChangeData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SprintScopeChangeDataKeySpecifier
      | (() => undefined | SprintScopeChangeDataKeySpecifier);
    fields?: SprintScopeChangeDataFieldPolicy;
  };
  SprintEndData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SprintEndDataKeySpecifier
      | (() => undefined | SprintEndDataKeySpecifier);
    fields?: SprintEndDataFieldPolicy;
  };
  ScopeSprintIssue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ScopeSprintIssueKeySpecifier
      | (() => undefined | ScopeSprintIssueKeySpecifier);
    fields?: ScopeSprintIssueFieldPolicy;
  };
  SprintStartData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SprintStartDataKeySpecifier
      | (() => undefined | SprintStartDataKeySpecifier);
    fields?: SprintStartDataFieldPolicy;
  };
  BurndownChartDataTable?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BurndownChartDataTableKeySpecifier
      | (() => undefined | BurndownChartDataTableKeySpecifier);
    fields?: BurndownChartDataTableFieldPolicy;
  };
  BurndownChartDataTableIssueRow?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | BurndownChartDataTableIssueRowKeySpecifier
      | (() => undefined | BurndownChartDataTableIssueRowKeySpecifier);
    fields?: BurndownChartDataTableIssueRowFieldPolicy;
  };
  BurndownChartDataTableScopeChangeRow?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | BurndownChartDataTableScopeChangeRowKeySpecifier
      | (() => undefined | BurndownChartDataTableScopeChangeRowKeySpecifier);
    fields?: BurndownChartDataTableScopeChangeRowFieldPolicy;
  };
  SprintReportsFilters?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SprintReportsFiltersKeySpecifier
      | (() => undefined | SprintReportsFiltersKeySpecifier);
    fields?: SprintReportsFiltersFieldPolicy;
  };
  Sprint?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SprintKeySpecifier
      | (() => undefined | SprintKeySpecifier);
    fields?: SprintFieldPolicy;
  };
  SoftwareSprintMetadata?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SoftwareSprintMetadataKeySpecifier
      | (() => undefined | SoftwareSprintMetadataKeySpecifier);
    fields?: SoftwareSprintMetadataFieldPolicy;
  };
  CumulativeFlowDiagram?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CumulativeFlowDiagramKeySpecifier
      | (() => undefined | CumulativeFlowDiagramKeySpecifier);
    fields?: CumulativeFlowDiagramFieldPolicy;
  };
  CFDChartConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CFDChartConnectionKeySpecifier
      | (() => undefined | CFDChartConnectionKeySpecifier);
    fields?: CFDChartConnectionFieldPolicy;
  };
  CFDChartEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CFDChartEdgeKeySpecifier
      | (() => undefined | CFDChartEdgeKeySpecifier);
    fields?: CFDChartEdgeFieldPolicy;
  };
  CFDChartData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CFDChartDataKeySpecifier
      | (() => undefined | CFDChartDataKeySpecifier);
    fields?: CFDChartDataFieldPolicy;
  };
  CFDIssueColumnChangeEntry?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CFDIssueColumnChangeEntryKeySpecifier
      | (() => undefined | CFDIssueColumnChangeEntryKeySpecifier);
    fields?: CFDIssueColumnChangeEntryFieldPolicy;
  };
  TimeSeriesPoint?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TimeSeriesPointKeySpecifier
      | (() => undefined | TimeSeriesPointKeySpecifier);
    fields?: TimeSeriesPointFieldPolicy;
  };
  CFDColumnCount?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CFDColumnCountKeySpecifier
      | (() => undefined | CFDColumnCountKeySpecifier);
    fields?: CFDColumnCountFieldPolicy;
  };
  CFDFilters?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CFDFiltersKeySpecifier
      | (() => undefined | CFDFiltersKeySpecifier);
    fields?: CFDFiltersFieldPolicy;
  };
  CFDColumn?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CFDColumnKeySpecifier
      | (() => undefined | CFDColumnKeySpecifier);
    fields?: CFDColumnFieldPolicy;
  };
  ReportsOverview?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ReportsOverviewKeySpecifier
      | (() => undefined | ReportsOverviewKeySpecifier);
    fields?: ReportsOverviewFieldPolicy;
  };
  SoftwareReport?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SoftwareReportKeySpecifier
      | (() => undefined | SoftwareReportKeySpecifier);
    fields?: SoftwareReportFieldPolicy;
  };
  CodeInJira?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CodeInJiraKeySpecifier
      | (() => undefined | CodeInJiraKeySpecifier);
    fields?: CodeInJiraFieldPolicy;
  };
  CodeInJiraSiteConfiguration?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CodeInJiraSiteConfigurationKeySpecifier
      | (() => undefined | CodeInJiraSiteConfigurationKeySpecifier);
    fields?: CodeInJiraSiteConfigurationFieldPolicy;
  };
  CodeInJiraVcsProvider?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CodeInJiraVcsProviderKeySpecifier
      | (() => undefined | CodeInJiraVcsProviderKeySpecifier);
    fields?: CodeInJiraVcsProviderFieldPolicy;
  };
  CodeInJiraUserConfiguration?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CodeInJiraUserConfigurationKeySpecifier
      | (() => undefined | CodeInJiraUserConfigurationKeySpecifier);
    fields?: CodeInJiraUserConfigurationFieldPolicy;
  };
  CodeInJiraBitbucketWorkspace?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CodeInJiraBitbucketWorkspaceKeySpecifier
      | (() => undefined | CodeInJiraBitbucketWorkspaceKeySpecifier);
    fields?: CodeInJiraBitbucketWorkspaceFieldPolicy;
  };
  CompassCatalogQueryApi?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassCatalogQueryApiKeySpecifier
      | (() => undefined | CompassCatalogQueryApiKeySpecifier);
    fields?: CompassCatalogQueryApiFieldPolicy;
  };
  CompassComponent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassComponentKeySpecifier
      | (() => undefined | CompassComponentKeySpecifier);
    fields?: CompassComponentFieldPolicy;
  };
  CompassAnnouncement?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassAnnouncementKeySpecifier
      | (() => undefined | CompassAnnouncementKeySpecifier);
    fields?: CompassAnnouncementFieldPolicy;
  };
  CompassAnnouncementAcknowledgement?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassAnnouncementAcknowledgementKeySpecifier
      | (() => undefined | CompassAnnouncementAcknowledgementKeySpecifier);
    fields?: CompassAnnouncementAcknowledgementFieldPolicy;
  };
  CompassScorecard?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassScorecardKeySpecifier
      | (() => undefined | CompassScorecardKeySpecifier);
    fields?: CompassScorecardFieldPolicy;
  };
  CompassScorecardAppliedToComponentsConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassScorecardAppliedToComponentsConnectionKeySpecifier
      | (() =>
          | undefined
          | CompassScorecardAppliedToComponentsConnectionKeySpecifier);
    fields?: CompassScorecardAppliedToComponentsConnectionFieldPolicy;
  };
  CompassScorecardAppliedToComponentsEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassScorecardAppliedToComponentsEdgeKeySpecifier
      | (() => undefined | CompassScorecardAppliedToComponentsEdgeKeySpecifier);
    fields?: CompassScorecardAppliedToComponentsEdgeFieldPolicy;
  };
  QueryError?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | QueryErrorKeySpecifier
      | (() => undefined | QueryErrorKeySpecifier);
    fields?: QueryErrorFieldPolicy;
  };
  QueryErrorExtension?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | QueryErrorExtensionKeySpecifier
      | (() => undefined | QueryErrorExtensionKeySpecifier);
    fields?: QueryErrorExtensionFieldPolicy;
  };
  CompassChangeMetadata?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassChangeMetadataKeySpecifier
      | (() => undefined | CompassChangeMetadataKeySpecifier);
    fields?: CompassChangeMetadataFieldPolicy;
  };
  CompassScorecardCriteria?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassScorecardCriteriaKeySpecifier
      | (() => undefined | CompassScorecardCriteriaKeySpecifier);
    fields?: CompassScorecardCriteriaFieldPolicy;
  };
  CompassScorecardCriteriaScore?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassScorecardCriteriaScoreKeySpecifier
      | (() => undefined | CompassScorecardCriteriaScoreKeySpecifier);
    fields?: CompassScorecardCriteriaScoreFieldPolicy;
  };
  CompassScorecardScore?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassScorecardScoreKeySpecifier
      | (() => undefined | CompassScorecardScoreKeySpecifier);
    fields?: CompassScorecardScoreFieldPolicy;
  };
  CompassComponentDataManager?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassComponentDataManagerKeySpecifier
      | (() => undefined | CompassComponentDataManagerKeySpecifier);
    fields?: CompassComponentDataManagerFieldPolicy;
  };
  ComponentSyncEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ComponentSyncEventKeySpecifier
      | (() => undefined | ComponentSyncEventKeySpecifier);
    fields?: ComponentSyncEventFieldPolicy;
  };
  EventSource?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EventSourceKeySpecifier
      | (() => undefined | EventSourceKeySpecifier);
    fields?: EventSourceFieldPolicy;
  };
  CompassEventConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassEventConnectionKeySpecifier
      | (() => undefined | CompassEventConnectionKeySpecifier);
    fields?: CompassEventConnectionFieldPolicy;
  };
  CompassEventEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassEventEdgeKeySpecifier
      | (() => undefined | CompassEventEdgeKeySpecifier);
    fields?: CompassEventEdgeFieldPolicy;
  };
  CompassEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassEventKeySpecifier
      | (() => undefined | CompassEventKeySpecifier);
    fields?: CompassEventFieldPolicy;
  };
  CompassExternalAlias?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassExternalAliasKeySpecifier
      | (() => undefined | CompassExternalAliasKeySpecifier);
    fields?: CompassExternalAliasFieldPolicy;
  };
  CompassField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassFieldKeySpecifier
      | (() => undefined | CompassFieldKeySpecifier);
    fields?: CompassFieldFieldPolicy;
  };
  CompassFieldDefinition?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassFieldDefinitionKeySpecifier
      | (() => undefined | CompassFieldDefinitionKeySpecifier);
    fields?: CompassFieldDefinitionFieldPolicy;
  };
  CompassEnumFieldDefinitionOptions?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassEnumFieldDefinitionOptionsKeySpecifier
      | (() => undefined | CompassEnumFieldDefinitionOptionsKeySpecifier);
    fields?: CompassEnumFieldDefinitionOptionsFieldPolicy;
  };
  CompassComponentLabel?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassComponentLabelKeySpecifier
      | (() => undefined | CompassComponentLabelKeySpecifier);
    fields?: CompassComponentLabelFieldPolicy;
  };
  CompassLink?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassLinkKeySpecifier
      | (() => undefined | CompassLinkKeySpecifier);
    fields?: CompassLinkFieldPolicy;
  };
  CompassRelationshipConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassRelationshipConnectionKeySpecifier
      | (() => undefined | CompassRelationshipConnectionKeySpecifier);
    fields?: CompassRelationshipConnectionFieldPolicy;
  };
  CompassRelationshipEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassRelationshipEdgeKeySpecifier
      | (() => undefined | CompassRelationshipEdgeKeySpecifier);
    fields?: CompassRelationshipEdgeFieldPolicy;
  };
  CompassRelationship?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassRelationshipKeySpecifier
      | (() => undefined | CompassRelationshipKeySpecifier);
    fields?: CompassRelationshipFieldPolicy;
  };
  CompassFieldDefinitions?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassFieldDefinitionsKeySpecifier
      | (() => undefined | CompassFieldDefinitionsKeySpecifier);
    fields?: CompassFieldDefinitionsFieldPolicy;
  };
  CompassScorecardConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassScorecardConnectionKeySpecifier
      | (() => undefined | CompassScorecardConnectionKeySpecifier);
    fields?: CompassScorecardConnectionFieldPolicy;
  };
  CompassScorecardEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassScorecardEdgeKeySpecifier
      | (() => undefined | CompassScorecardEdgeKeySpecifier);
    fields?: CompassScorecardEdgeFieldPolicy;
  };
  CompassSearchComponentLabelsConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassSearchComponentLabelsConnectionKeySpecifier
      | (() => undefined | CompassSearchComponentLabelsConnectionKeySpecifier);
    fields?: CompassSearchComponentLabelsConnectionFieldPolicy;
  };
  CompassSearchComponentLabelsEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassSearchComponentLabelsEdgeKeySpecifier
      | (() => undefined | CompassSearchComponentLabelsEdgeKeySpecifier);
    fields?: CompassSearchComponentLabelsEdgeFieldPolicy;
  };
  CompassSearchComponentConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassSearchComponentConnectionKeySpecifier
      | (() => undefined | CompassSearchComponentConnectionKeySpecifier);
    fields?: CompassSearchComponentConnectionFieldPolicy;
  };
  CompassSearchComponentEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassSearchComponentEdgeKeySpecifier
      | (() => undefined | CompassSearchComponentEdgeKeySpecifier);
    fields?: CompassSearchComponentEdgeFieldPolicy;
  };
  CompassSearchComponentResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassSearchComponentResultKeySpecifier
      | (() => undefined | CompassSearchComponentResultKeySpecifier);
    fields?: CompassSearchComponentResultFieldPolicy;
  };
  CompassStarredComponentConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassStarredComponentConnectionKeySpecifier
      | (() => undefined | CompassStarredComponentConnectionKeySpecifier);
    fields?: CompassStarredComponentConnectionFieldPolicy;
  };
  CompassStarredComponentEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassStarredComponentEdgeKeySpecifier
      | (() => undefined | CompassStarredComponentEdgeKeySpecifier);
    fields?: CompassStarredComponentEdgeFieldPolicy;
  };
  CompassTeamCheckin?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassTeamCheckinKeySpecifier
      | (() => undefined | CompassTeamCheckinKeySpecifier);
    fields?: CompassTeamCheckinFieldPolicy;
  };
  SupportRequestCatalogQueryApi?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestCatalogQueryApiKeySpecifier
      | (() => undefined | SupportRequestCatalogQueryApiKeySpecifier);
    fields?: SupportRequestCatalogQueryApiFieldPolicy;
  };
  SupportRequestPage?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestPageKeySpecifier
      | (() => undefined | SupportRequestPageKeySpecifier);
    fields?: SupportRequestPageFieldPolicy;
  };
  SupportRequestHierarchyRequests?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestHierarchyRequestsKeySpecifier
      | (() => undefined | SupportRequestHierarchyRequestsKeySpecifier);
    fields?: SupportRequestHierarchyRequestsFieldPolicy;
  };
  SupportRequestHierarchyRequest?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestHierarchyRequestKeySpecifier
      | (() => undefined | SupportRequestHierarchyRequestKeySpecifier);
    fields?: SupportRequestHierarchyRequestFieldPolicy;
  };
  SupportRequestCommonRequest?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestCommonRequestKeySpecifier
      | (() => undefined | SupportRequestCommonRequestKeySpecifier);
    fields?: SupportRequestCommonRequestFieldPolicy;
  };
  SupportRequestDisplayableDateTime?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | SupportRequestDisplayableDateTimeKeySpecifier
      | (() => undefined | SupportRequestDisplayableDateTimeKeySpecifier);
    fields?: SupportRequestDisplayableDateTimeFieldPolicy;
  };
  SupportRequestUser?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestUserKeySpecifier
      | (() => undefined | SupportRequestUserKeySpecifier);
    fields?: SupportRequestUserFieldPolicy;
  };
  SupportRequestStatus?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestStatusKeySpecifier
      | (() => undefined | SupportRequestStatusKeySpecifier);
    fields?: SupportRequestStatusFieldPolicy;
  };
  SupportRequestNamedContactRelations?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | SupportRequestNamedContactRelationsKeySpecifier
      | (() => undefined | SupportRequestNamedContactRelationsKeySpecifier);
    fields?: SupportRequestNamedContactRelationsFieldPolicy;
  };
  SupportRequestNamedContactRelation?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | SupportRequestNamedContactRelationKeySpecifier
      | (() => undefined | SupportRequestNamedContactRelationKeySpecifier);
    fields?: SupportRequestNamedContactRelationFieldPolicy;
  };
  SupportRequestContactRelation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestContactRelationKeySpecifier
      | (() => undefined | SupportRequestContactRelationKeySpecifier);
    fields?: SupportRequestContactRelationFieldPolicy;
  };
  SupportRequestTicket?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestTicketKeySpecifier
      | (() => undefined | SupportRequestTicketKeySpecifier);
    fields?: SupportRequestTicketFieldPolicy;
  };
  SupportRequests?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestsKeySpecifier
      | (() => undefined | SupportRequestsKeySpecifier);
    fields?: SupportRequestsFieldPolicy;
  };
  SupportRequest?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestKeySpecifier
      | (() => undefined | SupportRequestKeySpecifier);
    fields?: SupportRequestFieldPolicy;
  };
  SupportRequestComments?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestCommentsKeySpecifier
      | (() => undefined | SupportRequestCommentsKeySpecifier);
    fields?: SupportRequestCommentsFieldPolicy;
  };
  SupportRequestComment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestCommentKeySpecifier
      | (() => undefined | SupportRequestCommentKeySpecifier);
    fields?: SupportRequestCommentFieldPolicy;
  };
  SupportRequestField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestFieldKeySpecifier
      | (() => undefined | SupportRequestFieldKeySpecifier);
    fields?: SupportRequestFieldFieldPolicy;
  };
  SupportRequestFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestFieldValueKeySpecifier
      | (() => undefined | SupportRequestFieldValueKeySpecifier);
    fields?: SupportRequestFieldValueFieldPolicy;
  };
  SupportRequestStatuses?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestStatusesKeySpecifier
      | (() => undefined | SupportRequestStatusesKeySpecifier);
    fields?: SupportRequestStatusesFieldPolicy;
  };
  SupportRequestTransitions?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestTransitionsKeySpecifier
      | (() => undefined | SupportRequestTransitionsKeySpecifier);
    fields?: SupportRequestTransitionsFieldPolicy;
  };
  SupportRequestTransition?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SupportRequestTransitionKeySpecifier
      | (() => undefined | SupportRequestTransitionKeySpecifier);
    fields?: SupportRequestTransitionFieldPolicy;
  };
  DevOpsMetrics?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsMetricsKeySpecifier
      | (() => undefined | DevOpsMetricsKeySpecifier);
    fields?: DevOpsMetricsFieldPolicy;
  };
  DevOpsMetricsCycleTime?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsMetricsCycleTimeKeySpecifier
      | (() => undefined | DevOpsMetricsCycleTimeKeySpecifier);
    fields?: DevOpsMetricsCycleTimeFieldPolicy;
  };
  DevOpsMetricsCycleTimeMetrics?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsMetricsCycleTimeMetricsKeySpecifier
      | (() => undefined | DevOpsMetricsCycleTimeMetricsKeySpecifier);
    fields?: DevOpsMetricsCycleTimeMetricsFieldPolicy;
  };
  DevOpsMetricsCycleTimeData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsMetricsCycleTimeDataKeySpecifier
      | (() => undefined | DevOpsMetricsCycleTimeDataKeySpecifier);
    fields?: DevOpsMetricsCycleTimeDataFieldPolicy;
  };
  DevOpsMetricsResolution?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsMetricsResolutionKeySpecifier
      | (() => undefined | DevOpsMetricsResolutionKeySpecifier);
    fields?: DevOpsMetricsResolutionFieldPolicy;
  };
  DevOpsMetricsDeploymentFrequency?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsMetricsDeploymentFrequencyKeySpecifier
      | (() => undefined | DevOpsMetricsDeploymentFrequencyKeySpecifier);
    fields?: DevOpsMetricsDeploymentFrequencyFieldPolicy;
  };
  DevOpsMetricsDeploymentFrequencyData?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsMetricsDeploymentFrequencyDataKeySpecifier
      | (() => undefined | DevOpsMetricsDeploymentFrequencyDataKeySpecifier);
    fields?: DevOpsMetricsDeploymentFrequencyDataFieldPolicy;
  };
  DevOpsMetricsDeploymentSize?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsMetricsDeploymentSizeKeySpecifier
      | (() => undefined | DevOpsMetricsDeploymentSizeKeySpecifier);
    fields?: DevOpsMetricsDeploymentSizeFieldPolicy;
  };
  DevOpsMetricsDeploymentSizeData?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsMetricsDeploymentSizeDataKeySpecifier
      | (() => undefined | DevOpsMetricsDeploymentSizeDataKeySpecifier);
    fields?: DevOpsMetricsDeploymentSizeDataFieldPolicy;
  };
  DevOpsMetricsPerDeploymentMetricsConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsMetricsPerDeploymentMetricsConnectionKeySpecifier
      | (() =>
          | undefined
          | DevOpsMetricsPerDeploymentMetricsConnectionKeySpecifier);
    fields?: DevOpsMetricsPerDeploymentMetricsConnectionFieldPolicy;
  };
  DevOpsMetricsDeploymentMetricsEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsMetricsDeploymentMetricsEdgeKeySpecifier
      | (() => undefined | DevOpsMetricsDeploymentMetricsEdgeKeySpecifier);
    fields?: DevOpsMetricsDeploymentMetricsEdgeFieldPolicy;
  };
  DevOpsMetricsDeploymentMetrics?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsMetricsDeploymentMetricsKeySpecifier
      | (() => undefined | DevOpsMetricsDeploymentMetricsKeySpecifier);
    fields?: DevOpsMetricsDeploymentMetricsFieldPolicy;
  };
  DeploymentSummary?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeploymentSummaryKeySpecifier
      | (() => undefined | DeploymentSummaryKeySpecifier);
    fields?: DeploymentSummaryFieldPolicy;
  };
  DevOpsEnvironment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsEnvironmentKeySpecifier
      | (() => undefined | DevOpsEnvironmentKeySpecifier);
    fields?: DevOpsEnvironmentFieldPolicy;
  };
  DeploymentPipeline?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeploymentPipelineKeySpecifier
      | (() => undefined | DeploymentPipelineKeySpecifier);
    fields?: DeploymentPipelineFieldPolicy;
  };
  DevOpsProvider?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsProviderKeySpecifier
      | (() => undefined | DevOpsProviderKeySpecifier);
    fields?: DevOpsProviderFieldPolicy;
  };
  DevOpsProviderLinks?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsProviderLinksKeySpecifier
      | (() => undefined | DevOpsProviderLinksKeySpecifier);
    fields?: DevOpsProviderLinksFieldPolicy;
  };
  DevOpsMetricsPerIssueMetricsConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsMetricsPerIssueMetricsConnectionKeySpecifier
      | (() => undefined | DevOpsMetricsPerIssueMetricsConnectionKeySpecifier);
    fields?: DevOpsMetricsPerIssueMetricsConnectionFieldPolicy;
  };
  DevOpsMetricsIssueMetricsEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsMetricsIssueMetricsEdgeKeySpecifier
      | (() => undefined | DevOpsMetricsIssueMetricsEdgeKeySpecifier);
    fields?: DevOpsMetricsIssueMetricsEdgeFieldPolicy;
  };
  DevOpsMetricsIssueMetrics?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsMetricsIssueMetricsKeySpecifier
      | (() => undefined | DevOpsMetricsIssueMetricsKeySpecifier);
    fields?: DevOpsMetricsIssueMetricsFieldPolicy;
  };
  DeveloperLogAccessResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeveloperLogAccessResultKeySpecifier
      | (() => undefined | DeveloperLogAccessResultKeySpecifier);
    fields?: DeveloperLogAccessResultFieldPolicy;
  };
  IssueDevOpsDevelopmentInformation?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | IssueDevOpsDevelopmentInformationKeySpecifier
      | (() => undefined | IssueDevOpsDevelopmentInformationKeySpecifier);
    fields?: IssueDevOpsDevelopmentInformationFieldPolicy;
  };
  IssueDevOpsDetails?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsDetailsKeySpecifier
      | (() => undefined | IssueDevOpsDetailsKeySpecifier);
    fields?: IssueDevOpsDetailsFieldPolicy;
  };
  IssueDevOpsDeploymentProviderDetails?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | IssueDevOpsDeploymentProviderDetailsKeySpecifier
      | (() => undefined | IssueDevOpsDeploymentProviderDetailsKeySpecifier);
    fields?: IssueDevOpsDeploymentProviderDetailsFieldPolicy;
  };
  IssueDevOpsDeploymentDetails?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsDeploymentDetailsKeySpecifier
      | (() => undefined | IssueDevOpsDeploymentDetailsKeySpecifier);
    fields?: IssueDevOpsDeploymentDetailsFieldPolicy;
  };
  IssueDevOpsDeploymentEnvironment?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | IssueDevOpsDeploymentEnvironmentKeySpecifier
      | (() => undefined | IssueDevOpsDeploymentEnvironmentKeySpecifier);
    fields?: IssueDevOpsDeploymentEnvironmentFieldPolicy;
  };
  IssueDevOpsEmbeddedMarketplace?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsEmbeddedMarketplaceKeySpecifier
      | (() => undefined | IssueDevOpsEmbeddedMarketplaceKeySpecifier);
    fields?: IssueDevOpsEmbeddedMarketplaceFieldPolicy;
  };
  IssueDevOpsFeatureFlagProvider?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsFeatureFlagProviderKeySpecifier
      | (() => undefined | IssueDevOpsFeatureFlagProviderKeySpecifier);
    fields?: IssueDevOpsFeatureFlagProviderFieldPolicy;
  };
  IssueDevOpsFeatureFlag?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsFeatureFlagKeySpecifier
      | (() => undefined | IssueDevOpsFeatureFlagKeySpecifier);
    fields?: IssueDevOpsFeatureFlagFieldPolicy;
  };
  IssueDevOpsFeatureFlagDetails?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsFeatureFlagDetailsKeySpecifier
      | (() => undefined | IssueDevOpsFeatureFlagDetailsKeySpecifier);
    fields?: IssueDevOpsFeatureFlagDetailsFieldPolicy;
  };
  IssueDevOpsFeatureFlagEnvironment?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | IssueDevOpsFeatureFlagEnvironmentKeySpecifier
      | (() => undefined | IssueDevOpsFeatureFlagEnvironmentKeySpecifier);
    fields?: IssueDevOpsFeatureFlagEnvironmentFieldPolicy;
  };
  IssueDevOpsFeatureFlagStatus?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsFeatureFlagStatusKeySpecifier
      | (() => undefined | IssueDevOpsFeatureFlagStatusKeySpecifier);
    fields?: IssueDevOpsFeatureFlagStatusFieldPolicy;
  };
  IssueDevOpsFeatureFlagRollout?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsFeatureFlagRolloutKeySpecifier
      | (() => undefined | IssueDevOpsFeatureFlagRolloutKeySpecifier);
    fields?: IssueDevOpsFeatureFlagRolloutFieldPolicy;
  };
  IssueDevOpsFeatureFlagSummary?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsFeatureFlagSummaryKeySpecifier
      | (() => undefined | IssueDevOpsFeatureFlagSummaryKeySpecifier);
    fields?: IssueDevOpsFeatureFlagSummaryFieldPolicy;
  };
  IssueDevOpsProviderInstance?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsProviderInstanceKeySpecifier
      | (() => undefined | IssueDevOpsProviderInstanceKeySpecifier);
    fields?: IssueDevOpsProviderInstanceFieldPolicy;
  };
  IssueDevOpsBuildProvider?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsBuildProviderKeySpecifier
      | (() => undefined | IssueDevOpsBuildProviderKeySpecifier);
    fields?: IssueDevOpsBuildProviderFieldPolicy;
  };
  IssueDevOpsBuildDetail?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsBuildDetailKeySpecifier
      | (() => undefined | IssueDevOpsBuildDetailKeySpecifier);
    fields?: IssueDevOpsBuildDetailFieldPolicy;
  };
  IssueDevOpsBuildReference?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsBuildReferenceKeySpecifier
      | (() => undefined | IssueDevOpsBuildReferenceKeySpecifier);
    fields?: IssueDevOpsBuildReferenceFieldPolicy;
  };
  IssueDevOpsTestSummary?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsTestSummaryKeySpecifier
      | (() => undefined | IssueDevOpsTestSummaryKeySpecifier);
    fields?: IssueDevOpsTestSummaryFieldPolicy;
  };
  IssueDevOpsPullRequestDetails?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsPullRequestDetailsKeySpecifier
      | (() => undefined | IssueDevOpsPullRequestDetailsKeySpecifier);
    fields?: IssueDevOpsPullRequestDetailsFieldPolicy;
  };
  IssueDevOpsPullRequestAuthor?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsPullRequestAuthorKeySpecifier
      | (() => undefined | IssueDevOpsPullRequestAuthorKeySpecifier);
    fields?: IssueDevOpsPullRequestAuthorFieldPolicy;
  };
  IssueDevOpsPullRequestReviewer?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsPullRequestReviewerKeySpecifier
      | (() => undefined | IssueDevOpsPullRequestReviewerKeySpecifier);
    fields?: IssueDevOpsPullRequestReviewerFieldPolicy;
  };
  IssueDevOpsRepositoryDetails?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsRepositoryDetailsKeySpecifier
      | (() => undefined | IssueDevOpsRepositoryDetailsKeySpecifier);
    fields?: IssueDevOpsRepositoryDetailsFieldPolicy;
  };
  IssueDevOpsBranchDetails?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsBranchDetailsKeySpecifier
      | (() => undefined | IssueDevOpsBranchDetailsKeySpecifier);
    fields?: IssueDevOpsBranchDetailsFieldPolicy;
  };
  IssueDevOpsHeadCommit?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsHeadCommitKeySpecifier
      | (() => undefined | IssueDevOpsHeadCommitKeySpecifier);
    fields?: IssueDevOpsHeadCommitFieldPolicy;
  };
  IssueDevOpsBranchPullRequestStatesSummary?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | IssueDevOpsBranchPullRequestStatesSummaryKeySpecifier
      | (() =>
          | undefined
          | IssueDevOpsBranchPullRequestStatesSummaryKeySpecifier);
    fields?: IssueDevOpsBranchPullRequestStatesSummaryFieldPolicy;
  };
  IssueDevOpsReview?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsReviewKeySpecifier
      | (() => undefined | IssueDevOpsReviewKeySpecifier);
    fields?: IssueDevOpsReviewFieldPolicy;
  };
  IssueDevOpsCommitDetails?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsCommitDetailsKeySpecifier
      | (() => undefined | IssueDevOpsCommitDetailsKeySpecifier);
    fields?: IssueDevOpsCommitDetailsFieldPolicy;
  };
  IssueDevOpsCommitFile?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsCommitFileKeySpecifier
      | (() => undefined | IssueDevOpsCommitFileKeySpecifier);
    fields?: IssueDevOpsCommitFileFieldPolicy;
  };
  IssueDevOpsRepositoryParent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsRepositoryParentKeySpecifier
      | (() => undefined | IssueDevOpsRepositoryParentKeySpecifier);
    fields?: IssueDevOpsRepositoryParentFieldPolicy;
  };
  IssueDevOpsRemoteLinksByType?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsRemoteLinksByTypeKeySpecifier
      | (() => undefined | IssueDevOpsRemoteLinksByTypeKeySpecifier);
    fields?: IssueDevOpsRemoteLinksByTypeFieldPolicy;
  };
  IssueDevOpsRemoteLinkProvider?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsRemoteLinkProviderKeySpecifier
      | (() => undefined | IssueDevOpsRemoteLinkProviderKeySpecifier);
    fields?: IssueDevOpsRemoteLinkProviderFieldPolicy;
  };
  IssueDevOpsRemoteLinkProviderAction?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | IssueDevOpsRemoteLinkProviderActionKeySpecifier
      | (() => undefined | IssueDevOpsRemoteLinkProviderActionKeySpecifier);
    fields?: IssueDevOpsRemoteLinkProviderActionFieldPolicy;
  };
  IssueDevOpsRemoteLinkLabel?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsRemoteLinkLabelKeySpecifier
      | (() => undefined | IssueDevOpsRemoteLinkLabelKeySpecifier);
    fields?: IssueDevOpsRemoteLinkLabelFieldPolicy;
  };
  IssueDevOpsRemoteLinkType?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsRemoteLinkTypeKeySpecifier
      | (() => undefined | IssueDevOpsRemoteLinkTypeKeySpecifier);
    fields?: IssueDevOpsRemoteLinkTypeFieldPolicy;
  };
  IssueDevOpsRemoteLink?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsRemoteLinkKeySpecifier
      | (() => undefined | IssueDevOpsRemoteLinkKeySpecifier);
    fields?: IssueDevOpsRemoteLinkFieldPolicy;
  };
  IssueDevOpsRemoteLinkAttributeTuple?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | IssueDevOpsRemoteLinkAttributeTupleKeySpecifier
      | (() => undefined | IssueDevOpsRemoteLinkAttributeTupleKeySpecifier);
    fields?: IssueDevOpsRemoteLinkAttributeTupleFieldPolicy;
  };
  IssueDevOpsRemoteLinkStatus?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | IssueDevOpsRemoteLinkStatusKeySpecifier
      | (() => undefined | IssueDevOpsRemoteLinkStatusKeySpecifier);
    fields?: IssueDevOpsRemoteLinkStatusFieldPolicy;
  };
  DvcsQuery?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DvcsQueryKeySpecifier
      | (() => undefined | DvcsQueryKeySpecifier);
    fields?: DvcsQueryFieldPolicy;
  };
  DvcsBitbucketWorkspaceConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DvcsBitbucketWorkspaceConnectionKeySpecifier
      | (() => undefined | DvcsBitbucketWorkspaceConnectionKeySpecifier);
    fields?: DvcsBitbucketWorkspaceConnectionFieldPolicy;
  };
  DvcsBitbucketWorkspaceEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DvcsBitbucketWorkspaceEdgeKeySpecifier
      | (() => undefined | DvcsBitbucketWorkspaceEdgeKeySpecifier);
    fields?: DvcsBitbucketWorkspaceEdgeFieldPolicy;
  };
  EcosystemQuery?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EcosystemQueryKeySpecifier
      | (() => undefined | EcosystemQueryKeySpecifier);
    fields?: EcosystemQueryFieldPolicy;
  };
  UserGrantConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UserGrantConnectionKeySpecifier
      | (() => undefined | UserGrantConnectionKeySpecifier);
    fields?: UserGrantConnectionFieldPolicy;
  };
  UserGrantEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UserGrantEdgeKeySpecifier
      | (() => undefined | UserGrantEdgeKeySpecifier);
    fields?: UserGrantEdgeFieldPolicy;
  };
  UserGrant?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UserGrantKeySpecifier
      | (() => undefined | UserGrantKeySpecifier);
    fields?: UserGrantFieldPolicy;
  };
  UserGrantAppDetails?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UserGrantAppDetailsKeySpecifier
      | (() => undefined | UserGrantAppDetailsKeySpecifier);
    fields?: UserGrantAppDetailsFieldPolicy;
  };
  UserGrantPageInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UserGrantPageInfoKeySpecifier
      | (() => undefined | UserGrantPageInfoKeySpecifier);
    fields?: UserGrantPageInfoFieldPolicy;
  };
  Extension?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ExtensionKeySpecifier
      | (() => undefined | ExtensionKeySpecifier);
    fields?: ExtensionFieldPolicy;
  };
  UserConsentExtension?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UserConsentExtensionKeySpecifier
      | (() => undefined | UserConsentExtensionKeySpecifier);
    fields?: UserConsentExtensionFieldPolicy;
  };
  UserConsentExtensionAppEnvironmentVersion?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UserConsentExtensionAppEnvironmentVersionKeySpecifier
      | (() =>
          | undefined
          | UserConsentExtensionAppEnvironmentVersionKeySpecifier);
    fields?: UserConsentExtensionAppEnvironmentVersionFieldPolicy;
  };
  UserConsentExtensionUser?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UserConsentExtensionUserKeySpecifier
      | (() => undefined | UserConsentExtensionUserKeySpecifier);
    fields?: UserConsentExtensionUserFieldPolicy;
  };
  AppNetworkEgressPermissionExtension?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | AppNetworkEgressPermissionExtensionKeySpecifier
      | (() => undefined | AppNetworkEgressPermissionExtensionKeySpecifier);
    fields?: AppNetworkEgressPermissionExtensionFieldPolicy;
  };
  AppSecurityPoliciesPermissionExtension?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | AppSecurityPoliciesPermissionExtensionKeySpecifier
      | (() => undefined | AppSecurityPoliciesPermissionExtensionKeySpecifier);
    fields?: AppSecurityPoliciesPermissionExtensionFieldPolicy;
  };
  ExtensionContext?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ExtensionContextKeySpecifier
      | (() => undefined | ExtensionContextKeySpecifier);
    fields?: ExtensionContextFieldPolicy;
  };
  AppAuditConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppAuditConnectionKeySpecifier
      | (() => undefined | AppAuditConnectionKeySpecifier);
    fields?: AppAuditConnectionFieldPolicy;
  };
  AuditEventEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AuditEventEdgeKeySpecifier
      | (() => undefined | AuditEventEdgeKeySpecifier);
    fields?: AuditEventEdgeFieldPolicy;
  };
  AuditEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AuditEventKeySpecifier
      | (() => undefined | AuditEventKeySpecifier);
    fields?: AuditEventFieldPolicy;
  };
  AuditEventAttributes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AuditEventAttributesKeySpecifier
      | (() => undefined | AuditEventAttributesKeySpecifier);
    fields?: AuditEventAttributesFieldPolicy;
  };
  ContainerEventObject?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ContainerEventObjectKeySpecifier
      | (() => undefined | ContainerEventObjectKeySpecifier);
    fields?: ContainerEventObjectFieldPolicy;
  };
  ContextEventObject?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ContextEventObjectKeySpecifier
      | (() => undefined | ContextEventObjectKeySpecifier);
    fields?: ContextEventObjectFieldPolicy;
  };
  AuditMessageObject?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AuditMessageObjectKeySpecifier
      | (() => undefined | AuditMessageObjectKeySpecifier);
    fields?: AuditMessageObjectFieldPolicy;
  };
  AuditsPageInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AuditsPageInfoKeySpecifier
      | (() => undefined | AuditsPageInfoKeySpecifier);
    fields?: AuditsPageInfoFieldPolicy;
  };
  AppInstallationConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppInstallationConnectionKeySpecifier
      | (() => undefined | AppInstallationConnectionKeySpecifier);
    fields?: AppInstallationConnectionFieldPolicy;
  };
  AppInstallationEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppInstallationEdgeKeySpecifier
      | (() => undefined | AppInstallationEdgeKeySpecifier);
    fields?: AppInstallationEdgeFieldPolicy;
  };
  InstallationContextWithLogAccess?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | InstallationContextWithLogAccessKeySpecifier
      | (() => undefined | InstallationContextWithLogAccessKeySpecifier);
    fields?: InstallationContextWithLogAccessFieldPolicy;
  };
  TenantContext?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TenantContextKeySpecifier
      | (() => undefined | TenantContextKeySpecifier);
    fields?: TenantContextFieldPolicy;
  };
  JiraQuery?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraQueryKeySpecifier
      | (() => undefined | JiraQueryKeySpecifier);
    fields?: JiraQueryFieldPolicy;
  };
  JiraGrantTypeKey?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraGrantTypeKeyKeySpecifier
      | (() => undefined | JiraGrantTypeKeyKeySpecifier);
    fields?: JiraGrantTypeKeyFieldPolicy;
  };
  JiraProjectCategoryConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraProjectCategoryConnectionKeySpecifier
      | (() => undefined | JiraProjectCategoryConnectionKeySpecifier);
    fields?: JiraProjectCategoryConnectionFieldPolicy;
  };
  JiraProjectCategoryEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraProjectCategoryEdgeKeySpecifier
      | (() => undefined | JiraProjectCategoryEdgeKeySpecifier);
    fields?: JiraProjectCategoryEdgeFieldPolicy;
  };
  JiraProjectConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraProjectConnectionKeySpecifier
      | (() => undefined | JiraProjectConnectionKeySpecifier);
    fields?: JiraProjectConnectionFieldPolicy;
  };
  JiraProjectEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraProjectEdgeKeySpecifier
      | (() => undefined | JiraProjectEdgeKeySpecifier);
    fields?: JiraProjectEdgeFieldPolicy;
  };
  JiraApplicationProperty?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraApplicationPropertyKeySpecifier
      | (() => undefined | JiraApplicationPropertyKeySpecifier);
    fields?: JiraApplicationPropertyFieldPolicy;
  };
  JiraDevOpsQuery?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraDevOpsQueryKeySpecifier
      | (() => undefined | JiraDevOpsQueryKeySpecifier);
    fields?: JiraDevOpsQueryFieldPolicy;
  };
  JiraDevOpsIssuePanel?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraDevOpsIssuePanelKeySpecifier
      | (() => undefined | JiraDevOpsIssuePanelKeySpecifier);
    fields?: JiraDevOpsIssuePanelFieldPolicy;
  };
  JiraIssueDevSummaryResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueDevSummaryResultKeySpecifier
      | (() => undefined | JiraIssueDevSummaryResultKeySpecifier);
    fields?: JiraIssueDevSummaryResultFieldPolicy;
  };
  JiraIssueDevSummaryError?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueDevSummaryErrorKeySpecifier
      | (() => undefined | JiraIssueDevSummaryErrorKeySpecifier);
    fields?: JiraIssueDevSummaryErrorFieldPolicy;
  };
  JiraIssueDevSummaryErrorProviderInstance?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssueDevSummaryErrorProviderInstanceKeySpecifier
      | (() =>
          | undefined
          | JiraIssueDevSummaryErrorProviderInstanceKeySpecifier);
    fields?: JiraIssueDevSummaryErrorProviderInstanceFieldPolicy;
  };
  JiraIssueDevSummary?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueDevSummaryKeySpecifier
      | (() => undefined | JiraIssueDevSummaryKeySpecifier);
    fields?: JiraIssueDevSummaryFieldPolicy;
  };
  JiraIssueBranchDevSummaryContainer?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssueBranchDevSummaryContainerKeySpecifier
      | (() => undefined | JiraIssueBranchDevSummaryContainerKeySpecifier);
    fields?: JiraIssueBranchDevSummaryContainerFieldPolicy;
  };
  JiraIssueBranchDevSummary?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueBranchDevSummaryKeySpecifier
      | (() => undefined | JiraIssueBranchDevSummaryKeySpecifier);
    fields?: JiraIssueBranchDevSummaryFieldPolicy;
  };
  JiraIssueDevSummaryByProvider?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueDevSummaryByProviderKeySpecifier
      | (() => undefined | JiraIssueDevSummaryByProviderKeySpecifier);
    fields?: JiraIssueDevSummaryByProviderFieldPolicy;
  };
  JiraIssueBuildDevSummaryContainer?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssueBuildDevSummaryContainerKeySpecifier
      | (() => undefined | JiraIssueBuildDevSummaryContainerKeySpecifier);
    fields?: JiraIssueBuildDevSummaryContainerFieldPolicy;
  };
  JiraIssueBuildDevSummary?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueBuildDevSummaryKeySpecifier
      | (() => undefined | JiraIssueBuildDevSummaryKeySpecifier);
    fields?: JiraIssueBuildDevSummaryFieldPolicy;
  };
  JiraIssueCommitDevSummaryContainer?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssueCommitDevSummaryContainerKeySpecifier
      | (() => undefined | JiraIssueCommitDevSummaryContainerKeySpecifier);
    fields?: JiraIssueCommitDevSummaryContainerFieldPolicy;
  };
  JiraIssueCommitDevSummary?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueCommitDevSummaryKeySpecifier
      | (() => undefined | JiraIssueCommitDevSummaryKeySpecifier);
    fields?: JiraIssueCommitDevSummaryFieldPolicy;
  };
  JiraIssueDeploymentEnvironmentDevSummaryContainer?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssueDeploymentEnvironmentDevSummaryContainerKeySpecifier
      | (() =>
          | undefined
          | JiraIssueDeploymentEnvironmentDevSummaryContainerKeySpecifier);
    fields?: JiraIssueDeploymentEnvironmentDevSummaryContainerFieldPolicy;
  };
  JiraIssueDeploymentEnvironmentDevSummary?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssueDeploymentEnvironmentDevSummaryKeySpecifier
      | (() =>
          | undefined
          | JiraIssueDeploymentEnvironmentDevSummaryKeySpecifier);
    fields?: JiraIssueDeploymentEnvironmentDevSummaryFieldPolicy;
  };
  JiraIssueDeploymentEnvironment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueDeploymentEnvironmentKeySpecifier
      | (() => undefined | JiraIssueDeploymentEnvironmentKeySpecifier);
    fields?: JiraIssueDeploymentEnvironmentFieldPolicy;
  };
  JiraIssuePullRequestDevSummaryContainer?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssuePullRequestDevSummaryContainerKeySpecifier
      | (() => undefined | JiraIssuePullRequestDevSummaryContainerKeySpecifier);
    fields?: JiraIssuePullRequestDevSummaryContainerFieldPolicy;
  };
  JiraIssuePullRequestDevSummary?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssuePullRequestDevSummaryKeySpecifier
      | (() => undefined | JiraIssuePullRequestDevSummaryKeySpecifier);
    fields?: JiraIssuePullRequestDevSummaryFieldPolicy;
  };
  JiraIssueReviewDevSummaryContainer?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssueReviewDevSummaryContainerKeySpecifier
      | (() => undefined | JiraIssueReviewDevSummaryContainerKeySpecifier);
    fields?: JiraIssueReviewDevSummaryContainerFieldPolicy;
  };
  JiraIssueReviewDevSummary?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueReviewDevSummaryKeySpecifier
      | (() => undefined | JiraIssueReviewDevSummaryKeySpecifier);
    fields?: JiraIssueReviewDevSummaryFieldPolicy;
  };
  JiraGrantTypeValueConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraGrantTypeValueConnectionKeySpecifier
      | (() => undefined | JiraGrantTypeValueConnectionKeySpecifier);
    fields?: JiraGrantTypeValueConnectionFieldPolicy;
  };
  JiraGrantTypeValueEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraGrantTypeValueEdgeKeySpecifier
      | (() => undefined | JiraGrantTypeValueEdgeKeySpecifier);
    fields?: JiraGrantTypeValueEdgeFieldPolicy;
  };
  JiraDefaultGrantTypeValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraDefaultGrantTypeValueKeySpecifier
      | (() => undefined | JiraDefaultGrantTypeValueKeySpecifier);
    fields?: JiraDefaultGrantTypeValueFieldPolicy;
  };
  JiraGroupGrantTypeValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraGroupGrantTypeValueKeySpecifier
      | (() => undefined | JiraGroupGrantTypeValueKeySpecifier);
    fields?: JiraGroupGrantTypeValueFieldPolicy;
  };
  JiraGroup?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraGroupKeySpecifier
      | (() => undefined | JiraGroupKeySpecifier);
    fields?: JiraGroupFieldPolicy;
  };
  JiraIssueFieldGrantTypeValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueFieldGrantTypeValueKeySpecifier
      | (() => undefined | JiraIssueFieldGrantTypeValueKeySpecifier);
    fields?: JiraIssueFieldGrantTypeValueFieldPolicy;
  };
  JiraIssueField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueFieldKeySpecifier
      | (() => undefined | JiraIssueFieldKeySpecifier);
    fields?: JiraIssueFieldFieldPolicy;
  };
  JiraProjectRoleGrantTypeValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraProjectRoleGrantTypeValueKeySpecifier
      | (() => undefined | JiraProjectRoleGrantTypeValueKeySpecifier);
    fields?: JiraProjectRoleGrantTypeValueFieldPolicy;
  };
  JiraRole?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraRoleKeySpecifier
      | (() => undefined | JiraRoleKeySpecifier);
    fields?: JiraRoleFieldPolicy;
  };
  JiraUserGrantTypeValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraUserGrantTypeValueKeySpecifier
      | (() => undefined | JiraUserGrantTypeValueKeySpecifier);
    fields?: JiraUserGrantTypeValueFieldPolicy;
  };
  JiraIssue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueKeySpecifier
      | (() => undefined | JiraIssueKeySpecifier);
    fields?: JiraIssueFieldPolicy;
  };
  JiraAttachmentConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAttachmentConnectionKeySpecifier
      | (() => undefined | JiraAttachmentConnectionKeySpecifier);
    fields?: JiraAttachmentConnectionFieldPolicy;
  };
  JiraAttachmentEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAttachmentEdgeKeySpecifier
      | (() => undefined | JiraAttachmentEdgeKeySpecifier);
    fields?: JiraAttachmentEdgeFieldPolicy;
  };
  JiraAttachment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAttachmentKeySpecifier
      | (() => undefined | JiraAttachmentKeySpecifier);
    fields?: JiraAttachmentFieldPolicy;
  };
  JiraCommentConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraCommentConnectionKeySpecifier
      | (() => undefined | JiraCommentConnectionKeySpecifier);
    fields?: JiraCommentConnectionFieldPolicy;
  };
  JiraCommentEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraCommentEdgeKeySpecifier
      | (() => undefined | JiraCommentEdgeKeySpecifier);
    fields?: JiraCommentEdgeFieldPolicy;
  };
  JiraComment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraCommentKeySpecifier
      | (() => undefined | JiraCommentKeySpecifier);
    fields?: JiraCommentFieldPolicy;
  };
  JiraPermissionLevel?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPermissionLevelKeySpecifier
      | (() => undefined | JiraPermissionLevelKeySpecifier);
    fields?: JiraPermissionLevelFieldPolicy;
  };
  JiraRichText?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraRichTextKeySpecifier
      | (() => undefined | JiraRichTextKeySpecifier);
    fields?: JiraRichTextFieldPolicy;
  };
  JiraADF?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraADFKeySpecifier
      | (() => undefined | JiraADFKeySpecifier);
    fields?: JiraADFFieldPolicy;
  };
  JiraIssueFieldConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueFieldConnectionKeySpecifier
      | (() => undefined | JiraIssueFieldConnectionKeySpecifier);
    fields?: JiraIssueFieldConnectionFieldPolicy;
  };
  JiraIssueFieldEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueFieldEdgeKeySpecifier
      | (() => undefined | JiraIssueFieldEdgeKeySpecifier);
    fields?: JiraIssueFieldEdgeFieldPolicy;
  };
  JiraWorkLogConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraWorkLogConnectionKeySpecifier
      | (() => undefined | JiraWorkLogConnectionKeySpecifier);
    fields?: JiraWorkLogConnectionFieldPolicy;
  };
  JiraWorkLogEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraWorkLogEdgeKeySpecifier
      | (() => undefined | JiraWorkLogEdgeKeySpecifier);
    fields?: JiraWorkLogEdgeFieldPolicy;
  };
  JiraWorklog?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraWorklogKeySpecifier
      | (() => undefined | JiraWorklogKeySpecifier);
    fields?: JiraWorklogFieldPolicy;
  };
  JiraEstimate?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraEstimateKeySpecifier
      | (() => undefined | JiraEstimateKeySpecifier);
    fields?: JiraEstimateFieldPolicy;
  };
  JiraIssueItemContainers?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueItemContainersKeySpecifier
      | (() => undefined | JiraIssueItemContainersKeySpecifier);
    fields?: JiraIssueItemContainersFieldPolicy;
  };
  JiraIssueItemContainer?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueItemContainerKeySpecifier
      | (() => undefined | JiraIssueItemContainerKeySpecifier);
    fields?: JiraIssueItemContainerFieldPolicy;
  };
  JiraIssueItemContainerItemConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssueItemContainerItemConnectionKeySpecifier
      | (() => undefined | JiraIssueItemContainerItemConnectionKeySpecifier);
    fields?: JiraIssueItemContainerItemConnectionFieldPolicy;
  };
  JiraIssueItemContainerItemEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueItemContainerItemEdgeKeySpecifier
      | (() => undefined | JiraIssueItemContainerItemEdgeKeySpecifier);
    fields?: JiraIssueItemContainerItemEdgeFieldPolicy;
  };
  JiraIssueItemFieldItem?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueItemFieldItemKeySpecifier
      | (() => undefined | JiraIssueItemFieldItemKeySpecifier);
    fields?: JiraIssueItemFieldItemFieldPolicy;
  };
  JiraIssueItemGroupContainer?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueItemGroupContainerKeySpecifier
      | (() => undefined | JiraIssueItemGroupContainerKeySpecifier);
    fields?: JiraIssueItemGroupContainerFieldPolicy;
  };
  JiraIssueItemGroupContainerItemConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssueItemGroupContainerItemConnectionKeySpecifier
      | (() =>
          | undefined
          | JiraIssueItemGroupContainerItemConnectionKeySpecifier);
    fields?: JiraIssueItemGroupContainerItemConnectionFieldPolicy;
  };
  JiraIssueItemGroupContainerItemEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssueItemGroupContainerItemEdgeKeySpecifier
      | (() => undefined | JiraIssueItemGroupContainerItemEdgeKeySpecifier);
    fields?: JiraIssueItemGroupContainerItemEdgeFieldPolicy;
  };
  JiraIssueItemPanelItem?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueItemPanelItemKeySpecifier
      | (() => undefined | JiraIssueItemPanelItemKeySpecifier);
    fields?: JiraIssueItemPanelItemFieldPolicy;
  };
  JiraIssueItemTabContainer?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueItemTabContainerKeySpecifier
      | (() => undefined | JiraIssueItemTabContainerKeySpecifier);
    fields?: JiraIssueItemTabContainerFieldPolicy;
  };
  JiraIssueItemTabContainerItemConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssueItemTabContainerItemConnectionKeySpecifier
      | (() => undefined | JiraIssueItemTabContainerItemConnectionKeySpecifier);
    fields?: JiraIssueItemTabContainerItemConnectionFieldPolicy;
  };
  JiraIssueItemTabContainerItemEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssueItemTabContainerItemEdgeKeySpecifier
      | (() => undefined | JiraIssueItemTabContainerItemEdgeKeySpecifier);
    fields?: JiraIssueItemTabContainerItemEdgeFieldPolicy;
  };
  JiraIssueItemLayoutDefaultItemLocation?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssueItemLayoutDefaultItemLocationKeySpecifier
      | (() => undefined | JiraIssueItemLayoutDefaultItemLocationKeySpecifier);
    fields?: JiraIssueItemLayoutDefaultItemLocationFieldPolicy;
  };
  JiraJqlBuilder?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlBuilderKeySpecifier
      | (() => undefined | JiraJqlBuilderKeySpecifier);
    fields?: JiraJqlBuilderFieldPolicy;
  };
  JiraJqlOptionFieldValueConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraJqlOptionFieldValueConnectionKeySpecifier
      | (() => undefined | JiraJqlOptionFieldValueConnectionKeySpecifier);
    fields?: JiraJqlOptionFieldValueConnectionFieldPolicy;
  };
  JiraJqlOptionFieldValueEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlOptionFieldValueEdgeKeySpecifier
      | (() => undefined | JiraJqlOptionFieldValueEdgeKeySpecifier);
    fields?: JiraJqlOptionFieldValueEdgeFieldPolicy;
  };
  JiraJqlOptionFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlOptionFieldValueKeySpecifier
      | (() => undefined | JiraJqlOptionFieldValueKeySpecifier);
    fields?: JiraJqlOptionFieldValueFieldPolicy;
  };
  JiraJqlFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlFieldValueKeySpecifier
      | (() => undefined | JiraJqlFieldValueKeySpecifier);
    fields?: JiraJqlFieldValueFieldPolicy;
  };
  JiraJqlFieldValueConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlFieldValueConnectionKeySpecifier
      | (() => undefined | JiraJqlFieldValueConnectionKeySpecifier);
    fields?: JiraJqlFieldValueConnectionFieldPolicy;
  };
  JiraJqlFieldValueEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlFieldValueEdgeKeySpecifier
      | (() => undefined | JiraJqlFieldValueEdgeKeySpecifier);
    fields?: JiraJqlFieldValueEdgeFieldPolicy;
  };
  JiraJqlFieldConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlFieldConnectionKeySpecifier
      | (() => undefined | JiraJqlFieldConnectionKeySpecifier);
    fields?: JiraJqlFieldConnectionFieldPolicy;
  };
  JiraJqlFieldEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlFieldEdgeKeySpecifier
      | (() => undefined | JiraJqlFieldEdgeKeySpecifier);
    fields?: JiraJqlFieldEdgeFieldPolicy;
  };
  JiraJqlField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlFieldKeySpecifier
      | (() => undefined | JiraJqlFieldKeySpecifier);
    fields?: JiraJqlFieldFieldPolicy;
  };
  JiraJqlFieldType?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlFieldTypeKeySpecifier
      | (() => undefined | JiraJqlFieldTypeKeySpecifier);
    fields?: JiraJqlFieldTypeFieldPolicy;
  };
  JiraJqlSearchTemplate?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlSearchTemplateKeySpecifier
      | (() => undefined | JiraJqlSearchTemplateKeySpecifier);
    fields?: JiraJqlSearchTemplateFieldPolicy;
  };
  JiraJqlFunction?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlFunctionKeySpecifier
      | (() => undefined | JiraJqlFunctionKeySpecifier);
    fields?: JiraJqlFunctionFieldPolicy;
  };
  JiraJqlHydratedQuery?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlHydratedQueryKeySpecifier
      | (() => undefined | JiraJqlHydratedQueryKeySpecifier);
    fields?: JiraJqlHydratedQueryFieldPolicy;
  };
  JiraJqlQueryHydratedError?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlQueryHydratedErrorKeySpecifier
      | (() => undefined | JiraJqlQueryHydratedErrorKeySpecifier);
    fields?: JiraJqlQueryHydratedErrorFieldPolicy;
  };
  JiraJqlQueryHydratedField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlQueryHydratedFieldKeySpecifier
      | (() => undefined | JiraJqlQueryHydratedFieldKeySpecifier);
    fields?: JiraJqlQueryHydratedFieldFieldPolicy;
  };
  JiraJqlQueryHydratedValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlQueryHydratedValueKeySpecifier
      | (() => undefined | JiraJqlQueryHydratedValueKeySpecifier);
    fields?: JiraJqlQueryHydratedValueFieldPolicy;
  };
  JiraJqlIssueTypes?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlIssueTypesKeySpecifier
      | (() => undefined | JiraJqlIssueTypesKeySpecifier);
    fields?: JiraJqlIssueTypesFieldPolicy;
  };
  JiraJqlIssueTypeFieldValueConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraJqlIssueTypeFieldValueConnectionKeySpecifier
      | (() => undefined | JiraJqlIssueTypeFieldValueConnectionKeySpecifier);
    fields?: JiraJqlIssueTypeFieldValueConnectionFieldPolicy;
  };
  JiraJqlIssueTypeFieldValueEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlIssueTypeFieldValueEdgeKeySpecifier
      | (() => undefined | JiraJqlIssueTypeFieldValueEdgeKeySpecifier);
    fields?: JiraJqlIssueTypeFieldValueEdgeFieldPolicy;
  };
  JiraJqlIssueTypeFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlIssueTypeFieldValueKeySpecifier
      | (() => undefined | JiraJqlIssueTypeFieldValueKeySpecifier);
    fields?: JiraJqlIssueTypeFieldValueFieldPolicy;
  };
  JiraIssueType?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueTypeKeySpecifier
      | (() => undefined | JiraIssueTypeKeySpecifier);
    fields?: JiraIssueTypeFieldPolicy;
  };
  JiraJqlProjectFieldValueConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraJqlProjectFieldValueConnectionKeySpecifier
      | (() => undefined | JiraJqlProjectFieldValueConnectionKeySpecifier);
    fields?: JiraJqlProjectFieldValueConnectionFieldPolicy;
  };
  JiraJqlProjectFieldValueEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlProjectFieldValueEdgeKeySpecifier
      | (() => undefined | JiraJqlProjectFieldValueEdgeKeySpecifier);
    fields?: JiraJqlProjectFieldValueEdgeFieldPolicy;
  };
  JiraJqlProjectFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlProjectFieldValueKeySpecifier
      | (() => undefined | JiraJqlProjectFieldValueKeySpecifier);
    fields?: JiraJqlProjectFieldValueFieldPolicy;
  };
  JiraJqlSprintFieldValueConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraJqlSprintFieldValueConnectionKeySpecifier
      | (() => undefined | JiraJqlSprintFieldValueConnectionKeySpecifier);
    fields?: JiraJqlSprintFieldValueConnectionFieldPolicy;
  };
  JiraJqlSprintFieldValueEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlSprintFieldValueEdgeKeySpecifier
      | (() => undefined | JiraJqlSprintFieldValueEdgeKeySpecifier);
    fields?: JiraJqlSprintFieldValueEdgeFieldPolicy;
  };
  JiraJqlSprintFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlSprintFieldValueKeySpecifier
      | (() => undefined | JiraJqlSprintFieldValueKeySpecifier);
    fields?: JiraJqlSprintFieldValueFieldPolicy;
  };
  JiraSprint?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraSprintKeySpecifier
      | (() => undefined | JiraSprintKeySpecifier);
    fields?: JiraSprintFieldPolicy;
  };
  JiraJqlUserFieldValueConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlUserFieldValueConnectionKeySpecifier
      | (() => undefined | JiraJqlUserFieldValueConnectionKeySpecifier);
    fields?: JiraJqlUserFieldValueConnectionFieldPolicy;
  };
  JiraJqlUserFieldValueEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlUserFieldValueEdgeKeySpecifier
      | (() => undefined | JiraJqlUserFieldValueEdgeKeySpecifier);
    fields?: JiraJqlUserFieldValueEdgeFieldPolicy;
  };
  JiraJqlUserFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlUserFieldValueKeySpecifier
      | (() => undefined | JiraJqlUserFieldValueKeySpecifier);
    fields?: JiraJqlUserFieldValueFieldPolicy;
  };
  JiraJqlGroupFieldValueConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraJqlGroupFieldValueConnectionKeySpecifier
      | (() => undefined | JiraJqlGroupFieldValueConnectionKeySpecifier);
    fields?: JiraJqlGroupFieldValueConnectionFieldPolicy;
  };
  JiraJqlGroupFieldValueEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlGroupFieldValueEdgeKeySpecifier
      | (() => undefined | JiraJqlGroupFieldValueEdgeKeySpecifier);
    fields?: JiraJqlGroupFieldValueEdgeFieldPolicy;
  };
  JiraJqlGroupFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlGroupFieldValueKeySpecifier
      | (() => undefined | JiraJqlGroupFieldValueKeySpecifier);
    fields?: JiraJqlGroupFieldValueFieldPolicy;
  };
  JiraJqlVersions?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlVersionsKeySpecifier
      | (() => undefined | JiraJqlVersionsKeySpecifier);
    fields?: JiraJqlVersionsFieldPolicy;
  };
  JiraJqlVersionFieldValueConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraJqlVersionFieldValueConnectionKeySpecifier
      | (() => undefined | JiraJqlVersionFieldValueConnectionKeySpecifier);
    fields?: JiraJqlVersionFieldValueConnectionFieldPolicy;
  };
  JiraJqlVersionFieldValueEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlVersionFieldValueEdgeKeySpecifier
      | (() => undefined | JiraJqlVersionFieldValueEdgeKeySpecifier);
    fields?: JiraJqlVersionFieldValueEdgeFieldPolicy;
  };
  JiraJqlVersionFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlVersionFieldValueKeySpecifier
      | (() => undefined | JiraJqlVersionFieldValueKeySpecifier);
    fields?: JiraJqlVersionFieldValueFieldPolicy;
  };
  JiraPermissionGrantValueConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraPermissionGrantValueConnectionKeySpecifier
      | (() => undefined | JiraPermissionGrantValueConnectionKeySpecifier);
    fields?: JiraPermissionGrantValueConnectionFieldPolicy;
  };
  JiraPermissionGrantValueEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPermissionGrantValueEdgeKeySpecifier
      | (() => undefined | JiraPermissionGrantValueEdgeKeySpecifier);
    fields?: JiraPermissionGrantValueEdgeFieldPolicy;
  };
  JiraPermissionGrantValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPermissionGrantValueKeySpecifier
      | (() => undefined | JiraPermissionGrantValueKeySpecifier);
    fields?: JiraPermissionGrantValueFieldPolicy;
  };
  JiraVersion?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraVersionKeySpecifier
      | (() => undefined | JiraVersionKeySpecifier);
    fields?: JiraVersionFieldPolicy;
  };
  JiraPermissionSchemeView?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPermissionSchemeViewKeySpecifier
      | (() => undefined | JiraPermissionSchemeViewKeySpecifier);
    fields?: JiraPermissionSchemeViewFieldPolicy;
  };
  JiraPermissionSchemeGrantGroup?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPermissionSchemeGrantGroupKeySpecifier
      | (() => undefined | JiraPermissionSchemeGrantGroupKeySpecifier);
    fields?: JiraPermissionSchemeGrantGroupFieldPolicy;
  };
  JiraProjectPermissionCategory?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraProjectPermissionCategoryKeySpecifier
      | (() => undefined | JiraProjectPermissionCategoryKeySpecifier);
    fields?: JiraProjectPermissionCategoryFieldPolicy;
  };
  JiraPermissionGrantHolder?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPermissionGrantHolderKeySpecifier
      | (() => undefined | JiraPermissionGrantHolderKeySpecifier);
    fields?: JiraPermissionGrantHolderFieldPolicy;
  };
  JiraPermissionGrants?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPermissionGrantsKeySpecifier
      | (() => undefined | JiraPermissionGrantsKeySpecifier);
    fields?: JiraPermissionGrantsFieldPolicy;
  };
  JiraProjectPermission?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraProjectPermissionKeySpecifier
      | (() => undefined | JiraProjectPermissionKeySpecifier);
    fields?: JiraProjectPermissionFieldPolicy;
  };
  JiraPermissionScheme?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPermissionSchemeKeySpecifier
      | (() => undefined | JiraPermissionSchemeKeySpecifier);
    fields?: JiraPermissionSchemeFieldPolicy;
  };
  JiraReleases?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraReleasesKeySpecifier
      | (() => undefined | JiraReleasesKeySpecifier);
    fields?: JiraReleasesFieldPolicy;
  };
  JiraReleasesDeploymentSummaryConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraReleasesDeploymentSummaryConnectionKeySpecifier
      | (() => undefined | JiraReleasesDeploymentSummaryConnectionKeySpecifier);
    fields?: JiraReleasesDeploymentSummaryConnectionFieldPolicy;
  };
  JiraReleasesDeploymentSummaryEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraReleasesDeploymentSummaryEdgeKeySpecifier
      | (() => undefined | JiraReleasesDeploymentSummaryEdgeKeySpecifier);
    fields?: JiraReleasesDeploymentSummaryEdgeFieldPolicy;
  };
  JiraReleasesEpicConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraReleasesEpicConnectionKeySpecifier
      | (() => undefined | JiraReleasesEpicConnectionKeySpecifier);
    fields?: JiraReleasesEpicConnectionFieldPolicy;
  };
  JiraReleasesEpicEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraReleasesEpicEdgeKeySpecifier
      | (() => undefined | JiraReleasesEpicEdgeKeySpecifier);
    fields?: JiraReleasesEpicEdgeFieldPolicy;
  };
  JiraReleasesEpic?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraReleasesEpicKeySpecifier
      | (() => undefined | JiraReleasesEpicKeySpecifier);
    fields?: JiraReleasesEpicFieldPolicy;
  };
  JiraReleasesIssueConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraReleasesIssueConnectionKeySpecifier
      | (() => undefined | JiraReleasesIssueConnectionKeySpecifier);
    fields?: JiraReleasesIssueConnectionFieldPolicy;
  };
  JiraReleasesIssueEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraReleasesIssueEdgeKeySpecifier
      | (() => undefined | JiraReleasesIssueEdgeKeySpecifier);
    fields?: JiraReleasesIssueEdgeFieldPolicy;
  };
  JiraReleasesIssue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraReleasesIssueKeySpecifier
      | (() => undefined | JiraReleasesIssueKeySpecifier);
    fields?: JiraReleasesIssueFieldPolicy;
  };
  MarketplacePricingPlan?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplacePricingPlanKeySpecifier
      | (() => undefined | MarketplacePricingPlanKeySpecifier);
    fields?: MarketplacePricingPlanFieldPolicy;
  };
  MarketplaceTieredPricing?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceTieredPricingKeySpecifier
      | (() => undefined | MarketplaceTieredPricingKeySpecifier);
    fields?: MarketplaceTieredPricingFieldPolicy;
  };
  MarketplacePricingItem?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplacePricingItemKeySpecifier
      | (() => undefined | MarketplacePricingItemKeySpecifier);
    fields?: MarketplacePricingItemFieldPolicy;
  };
  MarketplaceUser?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceUserKeySpecifier
      | (() => undefined | MarketplaceUserKeySpecifier);
    fields?: MarketplaceUserFieldPolicy;
  };
  AuthenticationContext?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AuthenticationContextKeySpecifier
      | (() => undefined | AuthenticationContextKeySpecifier);
    fields?: AuthenticationContextFieldPolicy;
  };
  TestingMovie?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TestingMovieKeySpecifier
      | (() => undefined | TestingMovieKeySpecifier);
    fields?: TestingMovieFieldPolicy;
  };
  TestingCharacter?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TestingCharacterKeySpecifier
      | (() => undefined | TestingCharacterKeySpecifier);
    fields?: TestingCharacterFieldPolicy;
  };
  OpsgenieQuery?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | OpsgenieQueryKeySpecifier
      | (() => undefined | OpsgenieQueryKeySpecifier);
    fields?: OpsgenieQueryFieldPolicy;
  };
  PolarisAnonymousVisitorViewHash?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisAnonymousVisitorViewHashKeySpecifier
      | (() => undefined | PolarisAnonymousVisitorViewHashKeySpecifier);
    fields?: PolarisAnonymousVisitorViewHashFieldPolicy;
  };
  PolarisDelegationToken?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisDelegationTokenKeySpecifier
      | (() => undefined | PolarisDelegationTokenKeySpecifier);
    fields?: PolarisDelegationTokenFieldPolicy;
  };
  PolarisConnectApp?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisConnectAppKeySpecifier
      | (() => undefined | PolarisConnectAppKeySpecifier);
    fields?: PolarisConnectAppFieldPolicy;
  };
  PolarisPlay?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisPlayKeySpecifier
      | (() => undefined | PolarisPlayKeySpecifier);
    fields?: PolarisPlayFieldPolicy;
  };
  PolarisPlayContribution?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisPlayContributionKeySpecifier
      | (() => undefined | PolarisPlayContributionKeySpecifier);
    fields?: PolarisPlayContributionFieldPolicy;
  };
  PolarisInsight?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisInsightKeySpecifier
      | (() => undefined | PolarisInsightKeySpecifier);
    fields?: PolarisInsightFieldPolicy;
  };
  PolarisSnippet?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisSnippetKeySpecifier
      | (() => undefined | PolarisSnippetKeySpecifier);
    fields?: PolarisSnippetFieldPolicy;
  };
  PolarisRefreshInfo?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisRefreshInfoKeySpecifier
      | (() => undefined | PolarisRefreshInfoKeySpecifier);
    fields?: PolarisRefreshInfoFieldPolicy;
  };
  PolarisComment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisCommentKeySpecifier
      | (() => undefined | PolarisCommentKeySpecifier);
    fields?: PolarisCommentFieldPolicy;
  };
  PolarisIdeaPlayField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaPlayFieldKeySpecifier
      | (() => undefined | PolarisIdeaPlayFieldKeySpecifier);
    fields?: PolarisIdeaPlayFieldFieldPolicy;
  };
  PolarisIdeaField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaFieldKeySpecifier
      | (() => undefined | PolarisIdeaFieldKeySpecifier);
    fields?: PolarisIdeaFieldFieldPolicy;
  };
  PolarisDecoration?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisDecorationKeySpecifier
      | (() => undefined | PolarisDecorationKeySpecifier);
    fields?: PolarisDecorationFieldPolicy;
  };
  PolarisValueDecoration?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisValueDecorationKeySpecifier
      | (() => undefined | PolarisValueDecorationKeySpecifier);
    fields?: PolarisValueDecorationFieldPolicy;
  };
  PolarisValueRule?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisValueRuleKeySpecifier
      | (() => undefined | PolarisValueRuleKeySpecifier);
    fields?: PolarisValueRuleFieldPolicy;
  };
  PolarisPresentation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisPresentationKeySpecifier
      | (() => undefined | PolarisPresentationKeySpecifier);
    fields?: PolarisPresentationFieldPolicy;
  };
  PolarisView?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisViewKeySpecifier
      | (() => undefined | PolarisViewKeySpecifier);
    fields?: PolarisViewFieldPolicy;
  };
  PolarisViewFilter?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisViewFilterKeySpecifier
      | (() => undefined | PolarisViewFilterKeySpecifier);
    fields?: PolarisViewFilterFieldPolicy;
  };
  PolarisViewFilterValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisViewFilterValueKeySpecifier
      | (() => undefined | PolarisViewFilterValueKeySpecifier);
    fields?: PolarisViewFilterValueFieldPolicy;
  };
  PolarisGroupValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisGroupValueKeySpecifier
      | (() => undefined | PolarisGroupValueKeySpecifier);
    fields?: PolarisGroupValueFieldPolicy;
  };
  PolarisViewLastViewed?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisViewLastViewedKeySpecifier
      | (() => undefined | PolarisViewLastViewedKeySpecifier);
    fields?: PolarisViewLastViewedFieldPolicy;
  };
  PolarisSortField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisSortFieldKeySpecifier
      | (() => undefined | PolarisSortFieldKeySpecifier);
    fields?: PolarisSortFieldFieldPolicy;
  };
  PolarisViewTableColumnSize?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisViewTableColumnSizeKeySpecifier
      | (() => undefined | PolarisViewTableColumnSizeKeySpecifier);
    fields?: PolarisViewTableColumnSizeFieldPolicy;
  };
  PolarisIdeas?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeasKeySpecifier
      | (() => undefined | PolarisIdeasKeySpecifier);
    fields?: PolarisIdeasFieldPolicy;
  };
  PolarisRestIdea?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisRestIdeaKeySpecifier
      | (() => undefined | PolarisRestIdeaKeySpecifier);
    fields?: PolarisRestIdeaFieldPolicy;
  };
  LabelUsage?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LabelUsageKeySpecifier
      | (() => undefined | LabelUsageKeySpecifier);
    fields?: LabelUsageFieldPolicy;
  };
  PolarisProject?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisProjectKeySpecifier
      | (() => undefined | PolarisProjectKeySpecifier);
    fields?: PolarisProjectFieldPolicy;
  };
  ArjConfiguration?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ArjConfigurationKeySpecifier
      | (() => undefined | ArjConfigurationKeySpecifier);
    fields?: ArjConfigurationFieldPolicy;
  };
  ArjHierarchyConfigurationLevel?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ArjHierarchyConfigurationLevelKeySpecifier
      | (() => undefined | ArjHierarchyConfigurationLevelKeySpecifier);
    fields?: ArjHierarchyConfigurationLevelFieldPolicy;
  };
  ProjectAvatars?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ProjectAvatarsKeySpecifier
      | (() => undefined | ProjectAvatarsKeySpecifier);
    fields?: ProjectAvatarsFieldPolicy;
  };
  PolarisIdeaType?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaTypeKeySpecifier
      | (() => undefined | PolarisIdeaTypeKeySpecifier);
    fields?: PolarisIdeaTypeFieldPolicy;
  };
  PolarisIdea?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaKeySpecifier
      | (() => undefined | PolarisIdeaKeySpecifier);
    fields?: PolarisIdeaFieldPolicy;
  };
  PolarisIssueLinkType?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIssueLinkTypeKeySpecifier
      | (() => undefined | PolarisIssueLinkTypeKeySpecifier);
    fields?: PolarisIssueLinkTypeFieldPolicy;
  };
  PolarisRefreshStatus?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisRefreshStatusKeySpecifier
      | (() => undefined | PolarisRefreshStatusKeySpecifier);
    fields?: PolarisRefreshStatusFieldPolicy;
  };
  PolarisSnippetProvider?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisSnippetProviderKeySpecifier
      | (() => undefined | PolarisSnippetProviderKeySpecifier);
    fields?: PolarisSnippetProviderFieldPolicy;
  };
  PolarisSnippetGroupDecl?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisSnippetGroupDeclKeySpecifier
      | (() => undefined | PolarisSnippetGroupDeclKeySpecifier);
    fields?: PolarisSnippetGroupDeclFieldPolicy;
  };
  PolarisSnippetPropertyDecl?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisSnippetPropertyDeclKeySpecifier
      | (() => undefined | PolarisSnippetPropertyDeclKeySpecifier);
    fields?: PolarisSnippetPropertyDeclFieldPolicy;
  };
  PolarisStatusCategory?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisStatusCategoryKeySpecifier
      | (() => undefined | PolarisStatusCategoryKeySpecifier);
    fields?: PolarisStatusCategoryFieldPolicy;
  };
  PolarisProjectTemplate?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisProjectTemplateKeySpecifier
      | (() => undefined | PolarisProjectTemplateKeySpecifier);
    fields?: PolarisProjectTemplateFieldPolicy;
  };
  PolarisViewSet?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisViewSetKeySpecifier
      | (() => undefined | PolarisViewSetKeySpecifier);
    fields?: PolarisViewSetFieldPolicy;
  };
  PolarisSnippetPropertiesConfig?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisSnippetPropertiesConfigKeySpecifier
      | (() => undefined | PolarisSnippetPropertiesConfigKeySpecifier);
    fields?: PolarisSnippetPropertiesConfigFieldPolicy;
  };
  PolarisTermsConsent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisTermsConsentKeySpecifier
      | (() => undefined | PolarisTermsConsentKeySpecifier);
    fields?: PolarisTermsConsentFieldPolicy;
  };
  RoadmapsQuery?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapsQueryKeySpecifier
      | (() => undefined | RoadmapsQueryKeySpecifier);
    fields?: RoadmapsQueryFieldPolicy;
  };
  RoadmapDetails?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapDetailsKeySpecifier
      | (() => undefined | RoadmapDetailsKeySpecifier);
    fields?: RoadmapDetailsFieldPolicy;
  };
  RoadmapMetadata?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapMetadataKeySpecifier
      | (() => undefined | RoadmapMetadataKeySpecifier);
    fields?: RoadmapMetadataFieldPolicy;
  };
  RoadmapConfiguration?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapConfigurationKeySpecifier
      | (() => undefined | RoadmapConfigurationKeySpecifier);
    fields?: RoadmapConfigurationFieldPolicy;
  };
  RoadmapBoardConfiguration?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapBoardConfigurationKeySpecifier
      | (() => undefined | RoadmapBoardConfigurationKeySpecifier);
    fields?: RoadmapBoardConfigurationFieldPolicy;
  };
  RoadmapSprint?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapSprintKeySpecifier
      | (() => undefined | RoadmapSprintKeySpecifier);
    fields?: RoadmapSprintFieldPolicy;
  };
  RoadmapDependencyConfiguration?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapDependencyConfigurationKeySpecifier
      | (() => undefined | RoadmapDependencyConfigurationKeySpecifier);
    fields?: RoadmapDependencyConfigurationFieldPolicy;
  };
  RoadmapExternalConfiguration?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapExternalConfigurationKeySpecifier
      | (() => undefined | RoadmapExternalConfigurationKeySpecifier);
    fields?: RoadmapExternalConfigurationFieldPolicy;
  };
  RoadmapProjectConfiguration?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapProjectConfigurationKeySpecifier
      | (() => undefined | RoadmapProjectConfigurationKeySpecifier);
    fields?: RoadmapProjectConfigurationFieldPolicy;
  };
  RoadmapItemType?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapItemTypeKeySpecifier
      | (() => undefined | RoadmapItemTypeKeySpecifier);
    fields?: RoadmapItemTypeFieldPolicy;
  };
  RoadmapProjectPermissions?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapProjectPermissionsKeySpecifier
      | (() => undefined | RoadmapProjectPermissionsKeySpecifier);
    fields?: RoadmapProjectPermissionsFieldPolicy;
  };
  RoadmapProjectValidation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapProjectValidationKeySpecifier
      | (() => undefined | RoadmapProjectValidationKeySpecifier);
    fields?: RoadmapProjectValidationFieldPolicy;
  };
  RoadmapVersion?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapVersionKeySpecifier
      | (() => undefined | RoadmapVersionKeySpecifier);
    fields?: RoadmapVersionFieldPolicy;
  };
  RoadmapStatusCategory?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapStatusCategoryKeySpecifier
      | (() => undefined | RoadmapStatusCategoryKeySpecifier);
    fields?: RoadmapStatusCategoryFieldPolicy;
  };
  RoadmapUserConfiguration?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapUserConfigurationKeySpecifier
      | (() => undefined | RoadmapUserConfigurationKeySpecifier);
    fields?: RoadmapUserConfigurationFieldPolicy;
  };
  RoadmapCreationPreferences?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapCreationPreferencesKeySpecifier
      | (() => undefined | RoadmapCreationPreferencesKeySpecifier);
    fields?: RoadmapCreationPreferencesFieldPolicy;
  };
  RoadmapItemConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapItemConnectionKeySpecifier
      | (() => undefined | RoadmapItemConnectionKeySpecifier);
    fields?: RoadmapItemConnectionFieldPolicy;
  };
  RoadmapItemEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapItemEdgeKeySpecifier
      | (() => undefined | RoadmapItemEdgeKeySpecifier);
    fields?: RoadmapItemEdgeFieldPolicy;
  };
  RoadmapItem?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapItemKeySpecifier
      | (() => undefined | RoadmapItemKeySpecifier);
    fields?: RoadmapItemFieldPolicy;
  };
  RoadmapItemStatus?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapItemStatusKeySpecifier
      | (() => undefined | RoadmapItemStatusKeySpecifier);
    fields?: RoadmapItemStatusFieldPolicy;
  };
  RoadmapItemStatusCategory?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapItemStatusCategoryKeySpecifier
      | (() => undefined | RoadmapItemStatusCategoryKeySpecifier);
    fields?: RoadmapItemStatusCategoryFieldPolicy;
  };
  SearchQueryAPI?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SearchQueryAPIKeySpecifier
      | (() => undefined | SearchQueryAPIKeySpecifier);
    fields?: SearchQueryAPIFieldPolicy;
  };
  SearchItemConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SearchItemConnectionKeySpecifier
      | (() => undefined | SearchItemConnectionKeySpecifier);
    fields?: SearchItemConnectionFieldPolicy;
  };
  SearchResultItemEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SearchResultItemEdgeKeySpecifier
      | (() => undefined | SearchResultItemEdgeKeySpecifier);
    fields?: SearchResultItemEdgeFieldPolicy;
  };
  SearchResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SearchResultKeySpecifier
      | (() => undefined | SearchResultKeySpecifier);
    fields?: SearchResultFieldPolicy;
  };
  TeamQuery?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TeamQueryKeySpecifier
      | (() => undefined | TeamQueryKeySpecifier);
    fields?: TeamQueryFieldPolicy;
  };
  Team?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | TeamKeySpecifier | (() => undefined | TeamKeySpecifier);
    fields?: TeamFieldPolicy;
  };
  Testing?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TestingKeySpecifier
      | (() => undefined | TestingKeySpecifier);
    fields?: TestingFieldPolicy;
  };
  TownsquareQueryApi?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TownsquareQueryApiKeySpecifier
      | (() => undefined | TownsquareQueryApiKeySpecifier);
    fields?: TownsquareQueryApiFieldPolicy;
  };
  TownsquareCommentConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TownsquareCommentConnectionKeySpecifier
      | (() => undefined | TownsquareCommentConnectionKeySpecifier);
    fields?: TownsquareCommentConnectionFieldPolicy;
  };
  TownsquareCommentEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TownsquareCommentEdgeKeySpecifier
      | (() => undefined | TownsquareCommentEdgeKeySpecifier);
    fields?: TownsquareCommentEdgeFieldPolicy;
  };
  TownsquareComment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TownsquareCommentKeySpecifier
      | (() => undefined | TownsquareCommentKeySpecifier);
    fields?: TownsquareCommentFieldPolicy;
  };
  TownsquareCommentObject?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TownsquareCommentObjectKeySpecifier
      | (() => undefined | TownsquareCommentObjectKeySpecifier);
    fields?: TownsquareCommentObjectFieldPolicy;
  };
  TownsquareGoalConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TownsquareGoalConnectionKeySpecifier
      | (() => undefined | TownsquareGoalConnectionKeySpecifier);
    fields?: TownsquareGoalConnectionFieldPolicy;
  };
  TownsquareGoalEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TownsquareGoalEdgeKeySpecifier
      | (() => undefined | TownsquareGoalEdgeKeySpecifier);
    fields?: TownsquareGoalEdgeFieldPolicy;
  };
  TownsquareGoal?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TownsquareGoalKeySpecifier
      | (() => undefined | TownsquareGoalKeySpecifier);
    fields?: TownsquareGoalFieldPolicy;
  };
  TownsquareProjectConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TownsquareProjectConnectionKeySpecifier
      | (() => undefined | TownsquareProjectConnectionKeySpecifier);
    fields?: TownsquareProjectConnectionFieldPolicy;
  };
  TownsquareProjectEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TownsquareProjectEdgeKeySpecifier
      | (() => undefined | TownsquareProjectEdgeKeySpecifier);
    fields?: TownsquareProjectEdgeFieldPolicy;
  };
  TownsquareProject?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | TownsquareProjectKeySpecifier
      | (() => undefined | TownsquareProjectKeySpecifier);
    fields?: TownsquareProjectFieldPolicy;
  };
  WebTriggerUrl?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | WebTriggerUrlKeySpecifier
      | (() => undefined | WebTriggerUrlKeySpecifier);
    fields?: WebTriggerUrlFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MutationKeySpecifier
      | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  AppStorageMutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppStorageMutationKeySpecifier
      | (() => undefined | AppStorageMutationKeySpecifier);
    fields?: AppStorageMutationFieldPolicy;
  };
  DeleteAppStoredEntityPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeleteAppStoredEntityPayloadKeySpecifier
      | (() => undefined | DeleteAppStoredEntityPayloadKeySpecifier);
    fields?: DeleteAppStoredEntityPayloadFieldPolicy;
  };
  Payload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PayloadKeySpecifier
      | (() => undefined | PayloadKeySpecifier);
    fields?: PayloadFieldPolicy;
  };
  SetAppStoredEntityPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SetAppStoredEntityPayloadKeySpecifier
      | (() => undefined | SetAppStoredEntityPayloadKeySpecifier);
    fields?: SetAppStoredEntityPayloadFieldPolicy;
  };
  ApplyPolarisProjectTemplatePayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | ApplyPolarisProjectTemplatePayloadKeySpecifier
      | (() => undefined | ApplyPolarisProjectTemplatePayloadKeySpecifier);
    fields?: ApplyPolarisProjectTemplatePayloadFieldPolicy;
  };
  ArchivePolarisInsightsPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ArchivePolarisInsightsPayloadKeySpecifier
      | (() => undefined | ArchivePolarisInsightsPayloadKeySpecifier);
    fields?: ArchivePolarisInsightsPayloadFieldPolicy;
  };
  AssignIssueParentOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AssignIssueParentOutputKeySpecifier
      | (() => undefined | AssignIssueParentOutputKeySpecifier);
    fields?: AssignIssueParentOutputFieldPolicy;
  };
  MutationResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MutationResponseKeySpecifier
      | (() => undefined | MutationResponseKeySpecifier);
    fields?: MutationResponseFieldPolicy;
  };
  MoveCardOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MoveCardOutputKeySpecifier
      | (() => undefined | MoveCardOutputKeySpecifier);
    fields?: MoveCardOutputFieldPolicy;
  };
  CompassCatalogMutationApi?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassCatalogMutationApiKeySpecifier
      | (() => undefined | CompassCatalogMutationApiKeySpecifier);
    fields?: CompassCatalogMutationApiFieldPolicy;
  };
  CompassAcknowledgeAnnouncementPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassAcknowledgeAnnouncementPayloadKeySpecifier
      | (() => undefined | CompassAcknowledgeAnnouncementPayloadKeySpecifier);
    fields?: CompassAcknowledgeAnnouncementPayloadFieldPolicy;
  };
  AddCompassComponentLabelsPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | AddCompassComponentLabelsPayloadKeySpecifier
      | (() => undefined | AddCompassComponentLabelsPayloadKeySpecifier);
    fields?: AddCompassComponentLabelsPayloadFieldPolicy;
  };
  ApplyCompassScorecardToComponentPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | ApplyCompassScorecardToComponentPayloadKeySpecifier
      | (() => undefined | ApplyCompassScorecardToComponentPayloadKeySpecifier);
    fields?: ApplyCompassScorecardToComponentPayloadFieldPolicy;
  };
  AttachCompassComponentDataManagerPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | AttachCompassComponentDataManagerPayloadKeySpecifier
      | (() =>
          | undefined
          | AttachCompassComponentDataManagerPayloadKeySpecifier);
    fields?: AttachCompassComponentDataManagerPayloadFieldPolicy;
  };
  AttachEventSourcePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AttachEventSourcePayloadKeySpecifier
      | (() => undefined | AttachEventSourcePayloadKeySpecifier);
    fields?: AttachEventSourcePayloadFieldPolicy;
  };
  CompassCreateAnnouncementPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassCreateAnnouncementPayloadKeySpecifier
      | (() => undefined | CompassCreateAnnouncementPayloadKeySpecifier);
    fields?: CompassCreateAnnouncementPayloadFieldPolicy;
  };
  CreateCompassComponentPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateCompassComponentPayloadKeySpecifier
      | (() => undefined | CreateCompassComponentPayloadKeySpecifier);
    fields?: CreateCompassComponentPayloadFieldPolicy;
  };
  CreateCompassComponentExternalAliasPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreateCompassComponentExternalAliasPayloadKeySpecifier
      | (() =>
          | undefined
          | CreateCompassComponentExternalAliasPayloadKeySpecifier);
    fields?: CreateCompassComponentExternalAliasPayloadFieldPolicy;
  };
  CreateCompassComponentLinkPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreateCompassComponentLinkPayloadKeySpecifier
      | (() => undefined | CreateCompassComponentLinkPayloadKeySpecifier);
    fields?: CreateCompassComponentLinkPayloadFieldPolicy;
  };
  CreateDeploymentEventsPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateDeploymentEventsPayloadKeySpecifier
      | (() => undefined | CreateDeploymentEventsPayloadKeySpecifier);
    fields?: CreateDeploymentEventsPayloadFieldPolicy;
  };
  CreateEventSourcePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateEventSourcePayloadKeySpecifier
      | (() => undefined | CreateEventSourcePayloadKeySpecifier);
    fields?: CreateEventSourcePayloadFieldPolicy;
  };
  CreateCompassRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreateCompassRelationshipPayloadKeySpecifier
      | (() => undefined | CreateCompassRelationshipPayloadKeySpecifier);
    fields?: CreateCompassRelationshipPayloadFieldPolicy;
  };
  CreateCompassScorecardPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateCompassScorecardPayloadKeySpecifier
      | (() => undefined | CreateCompassScorecardPayloadKeySpecifier);
    fields?: CreateCompassScorecardPayloadFieldPolicy;
  };
  CreateCompassScorecardCriteriasPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreateCompassScorecardCriteriasPayloadKeySpecifier
      | (() => undefined | CreateCompassScorecardCriteriasPayloadKeySpecifier);
    fields?: CreateCompassScorecardCriteriasPayloadFieldPolicy;
  };
  CreateCompassStarredComponentPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreateCompassStarredComponentPayloadKeySpecifier
      | (() => undefined | CreateCompassStarredComponentPayloadKeySpecifier);
    fields?: CreateCompassStarredComponentPayloadFieldPolicy;
  };
  CompassCreateTeamCheckinPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassCreateTeamCheckinPayloadKeySpecifier
      | (() => undefined | CompassCreateTeamCheckinPayloadKeySpecifier);
    fields?: CompassCreateTeamCheckinPayloadFieldPolicy;
  };
  CompassDeleteAnnouncementPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassDeleteAnnouncementPayloadKeySpecifier
      | (() => undefined | CompassDeleteAnnouncementPayloadKeySpecifier);
    fields?: CompassDeleteAnnouncementPayloadFieldPolicy;
  };
  DeleteCompassComponentPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeleteCompassComponentPayloadKeySpecifier
      | (() => undefined | DeleteCompassComponentPayloadKeySpecifier);
    fields?: DeleteCompassComponentPayloadFieldPolicy;
  };
  DeleteCompassComponentExternalAliasPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeleteCompassComponentExternalAliasPayloadKeySpecifier
      | (() =>
          | undefined
          | DeleteCompassComponentExternalAliasPayloadKeySpecifier);
    fields?: DeleteCompassComponentExternalAliasPayloadFieldPolicy;
  };
  DeleteCompassComponentLinkPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeleteCompassComponentLinkPayloadKeySpecifier
      | (() => undefined | DeleteCompassComponentLinkPayloadKeySpecifier);
    fields?: DeleteCompassComponentLinkPayloadFieldPolicy;
  };
  DeleteEventSourcePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeleteEventSourcePayloadKeySpecifier
      | (() => undefined | DeleteEventSourcePayloadKeySpecifier);
    fields?: DeleteEventSourcePayloadFieldPolicy;
  };
  DeleteCompassRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeleteCompassRelationshipPayloadKeySpecifier
      | (() => undefined | DeleteCompassRelationshipPayloadKeySpecifier);
    fields?: DeleteCompassRelationshipPayloadFieldPolicy;
  };
  DeleteCompassScorecardPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeleteCompassScorecardPayloadKeySpecifier
      | (() => undefined | DeleteCompassScorecardPayloadKeySpecifier);
    fields?: DeleteCompassScorecardPayloadFieldPolicy;
  };
  DeleteCompassScorecardCriteriasPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeleteCompassScorecardCriteriasPayloadKeySpecifier
      | (() => undefined | DeleteCompassScorecardCriteriasPayloadKeySpecifier);
    fields?: DeleteCompassScorecardCriteriasPayloadFieldPolicy;
  };
  DeleteCompassStarredComponentPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeleteCompassStarredComponentPayloadKeySpecifier
      | (() => undefined | DeleteCompassStarredComponentPayloadKeySpecifier);
    fields?: DeleteCompassStarredComponentPayloadFieldPolicy;
  };
  CompassDeleteTeamCheckinPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassDeleteTeamCheckinPayloadKeySpecifier
      | (() => undefined | CompassDeleteTeamCheckinPayloadKeySpecifier);
    fields?: CompassDeleteTeamCheckinPayloadFieldPolicy;
  };
  DetachCompassComponentDataManagerPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DetachCompassComponentDataManagerPayloadKeySpecifier
      | (() =>
          | undefined
          | DetachCompassComponentDataManagerPayloadKeySpecifier);
    fields?: DetachCompassComponentDataManagerPayloadFieldPolicy;
  };
  DetachEventSourcePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DetachEventSourcePayloadKeySpecifier
      | (() => undefined | DetachEventSourcePayloadKeySpecifier);
    fields?: DetachEventSourcePayloadFieldPolicy;
  };
  RemoveCompassComponentLabelsPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | RemoveCompassComponentLabelsPayloadKeySpecifier
      | (() => undefined | RemoveCompassComponentLabelsPayloadKeySpecifier);
    fields?: RemoveCompassComponentLabelsPayloadFieldPolicy;
  };
  RemoveCompassScorecardFromComponentPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | RemoveCompassScorecardFromComponentPayloadKeySpecifier
      | (() =>
          | undefined
          | RemoveCompassScorecardFromComponentPayloadKeySpecifier);
    fields?: RemoveCompassScorecardFromComponentPayloadFieldPolicy;
  };
  UnlinkExternalSourcePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UnlinkExternalSourcePayloadKeySpecifier
      | (() => undefined | UnlinkExternalSourcePayloadKeySpecifier);
    fields?: UnlinkExternalSourcePayloadFieldPolicy;
  };
  CompassUpdateAnnouncementPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassUpdateAnnouncementPayloadKeySpecifier
      | (() => undefined | CompassUpdateAnnouncementPayloadKeySpecifier);
    fields?: CompassUpdateAnnouncementPayloadFieldPolicy;
  };
  UpdateCompassComponentPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UpdateCompassComponentPayloadKeySpecifier
      | (() => undefined | UpdateCompassComponentPayloadKeySpecifier);
    fields?: UpdateCompassComponentPayloadFieldPolicy;
  };
  UpdateCompassComponentDataManagerMetadataPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdateCompassComponentDataManagerMetadataPayloadKeySpecifier
      | (() =>
          | undefined
          | UpdateCompassComponentDataManagerMetadataPayloadKeySpecifier);
    fields?: UpdateCompassComponentDataManagerMetadataPayloadFieldPolicy;
  };
  UpdateCompassComponentLinkPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdateCompassComponentLinkPayloadKeySpecifier
      | (() => undefined | UpdateCompassComponentLinkPayloadKeySpecifier);
    fields?: UpdateCompassComponentLinkPayloadFieldPolicy;
  };
  UpdateCompassScorecardPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UpdateCompassScorecardPayloadKeySpecifier
      | (() => undefined | UpdateCompassScorecardPayloadKeySpecifier);
    fields?: UpdateCompassScorecardPayloadFieldPolicy;
  };
  UpdateCompassScorecardCriteriasPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdateCompassScorecardCriteriasPayloadKeySpecifier
      | (() => undefined | UpdateCompassScorecardCriteriasPayloadKeySpecifier);
    fields?: UpdateCompassScorecardCriteriasPayloadFieldPolicy;
  };
  CompassUpdateTeamCheckinPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassUpdateTeamCheckinPayloadKeySpecifier
      | (() => undefined | CompassUpdateTeamCheckinPayloadKeySpecifier);
    fields?: CompassUpdateTeamCheckinPayloadFieldPolicy;
  };
  CompleteSprintResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompleteSprintResponseKeySpecifier
      | (() => undefined | CompleteSprintResponseKeySpecifier);
    fields?: CompleteSprintResponseFieldPolicy;
  };
  ConfigurePolarisRefreshPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ConfigurePolarisRefreshPayloadKeySpecifier
      | (() => undefined | ConfigurePolarisRefreshPayloadKeySpecifier);
    fields?: ConfigurePolarisRefreshPayloadFieldPolicy;
  };
  CopyPolarisInsightsPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CopyPolarisInsightsPayloadKeySpecifier
      | (() => undefined | CopyPolarisInsightsPayloadKeySpecifier);
    fields?: CopyPolarisInsightsPayloadFieldPolicy;
  };
  CreateAppResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateAppResponseKeySpecifier
      | (() => undefined | CreateAppResponseKeySpecifier);
    fields?: CreateAppResponseFieldPolicy;
  };
  CreateAppDeploymentResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateAppDeploymentResponseKeySpecifier
      | (() => undefined | CreateAppDeploymentResponseKeySpecifier);
    fields?: CreateAppDeploymentResponseFieldPolicy;
  };
  CreateAppDeploymentUrlResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateAppDeploymentUrlResponseKeySpecifier
      | (() => undefined | CreateAppDeploymentUrlResponseKeySpecifier);
    fields?: CreateAppDeploymentUrlResponseFieldPolicy;
  };
  CreateAppTunnelResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateAppTunnelResponseKeySpecifier
      | (() => undefined | CreateAppTunnelResponseKeySpecifier);
    fields?: CreateAppTunnelResponseFieldPolicy;
  };
  CardParentCreateOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CardParentCreateOutputKeySpecifier
      | (() => undefined | CardParentCreateOutputKeySpecifier);
    fields?: CardParentCreateOutputFieldPolicy;
  };
  CreateColumnOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateColumnOutputKeySpecifier
      | (() => undefined | CreateColumnOutputKeySpecifier);
    fields?: CreateColumnOutputFieldPolicy;
  };
  CustomFilterCreateOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CustomFilterCreateOutputKeySpecifier
      | (() => undefined | CustomFilterCreateOutputKeySpecifier);
    fields?: CustomFilterCreateOutputFieldPolicy;
  };
  CustomFiltersValidationError?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CustomFiltersValidationErrorKeySpecifier
      | (() => undefined | CustomFiltersValidationErrorKeySpecifier);
    fields?: CustomFiltersValidationErrorFieldPolicy;
  };
  CreateDevOpsServicePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateDevOpsServicePayloadKeySpecifier
      | (() => undefined | CreateDevOpsServicePayloadKeySpecifier);
    fields?: CreateDevOpsServicePayloadFieldPolicy;
  };
  CreateDevOpsServiceAndJiraProjectRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreateDevOpsServiceAndJiraProjectRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | CreateDevOpsServiceAndJiraProjectRelationshipPayloadKeySpecifier);
    fields?: CreateDevOpsServiceAndJiraProjectRelationshipPayloadFieldPolicy;
  };
  CreateDevOpsServiceAndOpsgenieTeamRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreateDevOpsServiceAndOpsgenieTeamRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | CreateDevOpsServiceAndOpsgenieTeamRelationshipPayloadKeySpecifier);
    fields?: CreateDevOpsServiceAndOpsgenieTeamRelationshipPayloadFieldPolicy;
  };
  CreateDevOpsServiceAndRepositoryRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreateDevOpsServiceAndRepositoryRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | CreateDevOpsServiceAndRepositoryRelationshipPayloadKeySpecifier);
    fields?: CreateDevOpsServiceAndRepositoryRelationshipPayloadFieldPolicy;
  };
  CreateDevOpsServiceRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreateDevOpsServiceRelationshipPayloadKeySpecifier
      | (() => undefined | CreateDevOpsServiceRelationshipPayloadKeySpecifier);
    fields?: CreateDevOpsServiceRelationshipPayloadFieldPolicy;
  };
  CreateHostedResourceUploadUrlPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreateHostedResourceUploadUrlPayloadKeySpecifier
      | (() => undefined | CreateHostedResourceUploadUrlPayloadKeySpecifier);
    fields?: CreateHostedResourceUploadUrlPayloadFieldPolicy;
  };
  HostedResourcePreSignedUrl?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | HostedResourcePreSignedUrlKeySpecifier
      | (() => undefined | HostedResourcePreSignedUrlKeySpecifier);
    fields?: HostedResourcePreSignedUrlFieldPolicy;
  };
  CreateJiraProjectAndOpsgenieTeamRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreateJiraProjectAndOpsgenieTeamRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | CreateJiraProjectAndOpsgenieTeamRelationshipPayloadKeySpecifier);
    fields?: CreateJiraProjectAndOpsgenieTeamRelationshipPayloadFieldPolicy;
  };
  CreateJiraProjectAndRepositoryRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreateJiraProjectAndRepositoryRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | CreateJiraProjectAndRepositoryRelationshipPayloadKeySpecifier);
    fields?: CreateJiraProjectAndRepositoryRelationshipPayloadFieldPolicy;
  };
  CreatePolarisAnonymousVisitorHashPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreatePolarisAnonymousVisitorHashPayloadKeySpecifier
      | (() =>
          | undefined
          | CreatePolarisAnonymousVisitorHashPayloadKeySpecifier);
    fields?: CreatePolarisAnonymousVisitorHashPayloadFieldPolicy;
  };
  CreatePolarisCalculatedFieldPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreatePolarisCalculatedFieldPayloadKeySpecifier
      | (() => undefined | CreatePolarisCalculatedFieldPayloadKeySpecifier);
    fields?: CreatePolarisCalculatedFieldPayloadFieldPolicy;
  };
  CreatePolarisCommentPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreatePolarisCommentPayloadKeySpecifier
      | (() => undefined | CreatePolarisCommentPayloadKeySpecifier);
    fields?: CreatePolarisCommentPayloadFieldPolicy;
  };
  CreatePolarisDecorationPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreatePolarisDecorationPayloadKeySpecifier
      | (() => undefined | CreatePolarisDecorationPayloadKeySpecifier);
    fields?: CreatePolarisDecorationPayloadFieldPolicy;
  };
  CreatePolarisInsightPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreatePolarisInsightPayloadKeySpecifier
      | (() => undefined | CreatePolarisInsightPayloadKeySpecifier);
    fields?: CreatePolarisInsightPayloadFieldPolicy;
  };
  CreatePolarisPlayPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreatePolarisPlayPayloadKeySpecifier
      | (() => undefined | CreatePolarisPlayPayloadKeySpecifier);
    fields?: CreatePolarisPlayPayloadFieldPolicy;
  };
  CreatePolarisPlayContributionPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreatePolarisPlayContributionPayloadKeySpecifier
      | (() => undefined | CreatePolarisPlayContributionPayloadKeySpecifier);
    fields?: CreatePolarisPlayContributionPayloadFieldPolicy;
  };
  CreatePolarisStandardFieldPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CreatePolarisStandardFieldPayloadKeySpecifier
      | (() => undefined | CreatePolarisStandardFieldPayloadKeySpecifier);
    fields?: CreatePolarisStandardFieldPayloadFieldPolicy;
  };
  CreatePolarisViewPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreatePolarisViewPayloadKeySpecifier
      | (() => undefined | CreatePolarisViewPayloadKeySpecifier);
    fields?: CreatePolarisViewPayloadFieldPolicy;
  };
  CreatePolarisViewSetPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreatePolarisViewSetPayloadKeySpecifier
      | (() => undefined | CreatePolarisViewSetPayloadKeySpecifier);
    fields?: CreatePolarisViewSetPayloadFieldPolicy;
  };
  CreateSprintResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateSprintResponseKeySpecifier
      | (() => undefined | CreateSprintResponseKeySpecifier);
    fields?: CreateSprintResponseFieldPolicy;
  };
  CreatedSprint?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreatedSprintKeySpecifier
      | (() => undefined | CreatedSprintKeySpecifier);
    fields?: CreatedSprintFieldPolicy;
  };
  CreateWebTriggerUrlResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CreateWebTriggerUrlResponseKeySpecifier
      | (() => undefined | CreateWebTriggerUrlResponseKeySpecifier);
    fields?: CreateWebTriggerUrlResponseFieldPolicy;
  };
  SupportRequestCatalogMutationApi?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | SupportRequestCatalogMutationApiKeySpecifier
      | (() => undefined | SupportRequestCatalogMutationApiKeySpecifier);
    fields?: SupportRequestCatalogMutationApiFieldPolicy;
  };
  DeleteAppResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeleteAppResponseKeySpecifier
      | (() => undefined | DeleteAppResponseKeySpecifier);
    fields?: DeleteAppResponseFieldPolicy;
  };
  DeleteAppEnvironmentVariablePayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeleteAppEnvironmentVariablePayloadKeySpecifier
      | (() => undefined | DeleteAppEnvironmentVariablePayloadKeySpecifier);
    fields?: DeleteAppEnvironmentVariablePayloadFieldPolicy;
  };
  GenericMutationResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | GenericMutationResponseKeySpecifier
      | (() => undefined | GenericMutationResponseKeySpecifier);
    fields?: GenericMutationResponseFieldPolicy;
  };
  DeleteColumnOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeleteColumnOutputKeySpecifier
      | (() => undefined | DeleteColumnOutputKeySpecifier);
    fields?: DeleteColumnOutputFieldPolicy;
  };
  DeleteDevOpsContainerRelationshipEntityPropertiesPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeleteDevOpsContainerRelationshipEntityPropertiesPayloadKeySpecifier
      | (() =>
          | undefined
          | DeleteDevOpsContainerRelationshipEntityPropertiesPayloadKeySpecifier);
    fields?: DeleteDevOpsContainerRelationshipEntityPropertiesPayloadFieldPolicy;
  };
  DeleteDevOpsServicePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeleteDevOpsServicePayloadKeySpecifier
      | (() => undefined | DeleteDevOpsServicePayloadKeySpecifier);
    fields?: DeleteDevOpsServicePayloadFieldPolicy;
  };
  DeleteDevOpsServiceAndJiraProjectRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeleteDevOpsServiceAndJiraProjectRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | DeleteDevOpsServiceAndJiraProjectRelationshipPayloadKeySpecifier);
    fields?: DeleteDevOpsServiceAndJiraProjectRelationshipPayloadFieldPolicy;
  };
  DeleteDevOpsServiceAndOpsgenieTeamRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeleteDevOpsServiceAndOpsgenieTeamRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | DeleteDevOpsServiceAndOpsgenieTeamRelationshipPayloadKeySpecifier);
    fields?: DeleteDevOpsServiceAndOpsgenieTeamRelationshipPayloadFieldPolicy;
  };
  DeleteDevOpsServiceAndRepositoryRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeleteDevOpsServiceAndRepositoryRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | DeleteDevOpsServiceAndRepositoryRelationshipPayloadKeySpecifier);
    fields?: DeleteDevOpsServiceAndRepositoryRelationshipPayloadFieldPolicy;
  };
  DeleteDevOpsServiceEntityPropertiesPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeleteDevOpsServiceEntityPropertiesPayloadKeySpecifier
      | (() =>
          | undefined
          | DeleteDevOpsServiceEntityPropertiesPayloadKeySpecifier);
    fields?: DeleteDevOpsServiceEntityPropertiesPayloadFieldPolicy;
  };
  DeleteDevOpsServiceRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeleteDevOpsServiceRelationshipPayloadKeySpecifier
      | (() => undefined | DeleteDevOpsServiceRelationshipPayloadKeySpecifier);
    fields?: DeleteDevOpsServiceRelationshipPayloadFieldPolicy;
  };
  DeleteJiraProjectAndOpsgenieTeamRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeleteJiraProjectAndOpsgenieTeamRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | DeleteJiraProjectAndOpsgenieTeamRelationshipPayloadKeySpecifier);
    fields?: DeleteJiraProjectAndOpsgenieTeamRelationshipPayloadFieldPolicy;
  };
  DeleteJiraProjectAndRepositoryRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeleteJiraProjectAndRepositoryRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | DeleteJiraProjectAndRepositoryRelationshipPayloadKeySpecifier);
    fields?: DeleteJiraProjectAndRepositoryRelationshipPayloadFieldPolicy;
  };
  DeletePolarisAnonymousVisitorHashPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeletePolarisAnonymousVisitorHashPayloadKeySpecifier
      | (() =>
          | undefined
          | DeletePolarisAnonymousVisitorHashPayloadKeySpecifier);
    fields?: DeletePolarisAnonymousVisitorHashPayloadFieldPolicy;
  };
  DeletePolarisDecorationPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeletePolarisDecorationPayloadKeySpecifier
      | (() => undefined | DeletePolarisDecorationPayloadKeySpecifier);
    fields?: DeletePolarisDecorationPayloadFieldPolicy;
  };
  DeletePolarisFieldPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeletePolarisFieldPayloadKeySpecifier
      | (() => undefined | DeletePolarisFieldPayloadKeySpecifier);
    fields?: DeletePolarisFieldPayloadFieldPolicy;
  };
  DeletePolarisFieldOptionPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeletePolarisFieldOptionPayloadKeySpecifier
      | (() => undefined | DeletePolarisFieldOptionPayloadKeySpecifier);
    fields?: DeletePolarisFieldOptionPayloadFieldPolicy;
  };
  DeletePolarisInsightPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeletePolarisInsightPayloadKeySpecifier
      | (() => undefined | DeletePolarisInsightPayloadKeySpecifier);
    fields?: DeletePolarisInsightPayloadFieldPolicy;
  };
  DeletePolarisPlayContributionPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DeletePolarisPlayContributionPayloadKeySpecifier
      | (() => undefined | DeletePolarisPlayContributionPayloadKeySpecifier);
    fields?: DeletePolarisPlayContributionPayloadFieldPolicy;
  };
  DeletePolarisViewPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeletePolarisViewPayloadKeySpecifier
      | (() => undefined | DeletePolarisViewPayloadKeySpecifier);
    fields?: DeletePolarisViewPayloadFieldPolicy;
  };
  DeletePolarisViewSetPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeletePolarisViewSetPayloadKeySpecifier
      | (() => undefined | DeletePolarisViewSetPayloadKeySpecifier);
    fields?: DeletePolarisViewSetPayloadFieldPolicy;
  };
  DeleteWebTriggerUrlResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeleteWebTriggerUrlResponseKeySpecifier
      | (() => undefined | DeleteWebTriggerUrlResponseKeySpecifier);
    fields?: DeleteWebTriggerUrlResponseFieldPolicy;
  };
  EcosystemMutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | EcosystemMutationKeySpecifier
      | (() => undefined | EcosystemMutationKeySpecifier);
    fields?: EcosystemMutationFieldPolicy;
  };
  DeleteUserGrantPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeleteUserGrantPayloadKeySpecifier
      | (() => undefined | DeleteUserGrantPayloadKeySpecifier);
    fields?: DeleteUserGrantPayloadFieldPolicy;
  };
  UpdateAppHostServiceScopesResponsePayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdateAppHostServiceScopesResponsePayloadKeySpecifier
      | (() =>
          | undefined
          | UpdateAppHostServiceScopesResponsePayloadKeySpecifier);
    fields?: UpdateAppHostServiceScopesResponsePayloadFieldPolicy;
  };
  SprintResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SprintResponseKeySpecifier
      | (() => undefined | SprintResponseKeySpecifier);
    fields?: SprintResponseFieldPolicy;
  };
  AppInstallationResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppInstallationResponseKeySpecifier
      | (() => undefined | AppInstallationResponseKeySpecifier);
    fields?: AppInstallationResponseFieldPolicy;
  };
  InvokeAuxEffectsResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | InvokeAuxEffectsResponseKeySpecifier
      | (() => undefined | InvokeAuxEffectsResponseKeySpecifier);
    fields?: InvokeAuxEffectsResponseFieldPolicy;
  };
  AuxEffectsResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AuxEffectsResultKeySpecifier
      | (() => undefined | AuxEffectsResultKeySpecifier);
    fields?: AuxEffectsResultFieldPolicy;
  };
  InvokeExtensionResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | InvokeExtensionResponseKeySpecifier
      | (() => undefined | InvokeExtensionResponseKeySpecifier);
    fields?: InvokeExtensionResponseFieldPolicy;
  };
  ExternalAuthProvider?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ExternalAuthProviderKeySpecifier
      | (() => undefined | ExternalAuthProviderKeySpecifier);
    fields?: ExternalAuthProviderFieldPolicy;
  };
  InvocationResponsePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | InvocationResponsePayloadKeySpecifier
      | (() => undefined | InvocationResponsePayloadKeySpecifier);
    fields?: InvocationResponsePayloadFieldPolicy;
  };
  InvokePolarisObjectPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | InvokePolarisObjectPayloadKeySpecifier
      | (() => undefined | InvokePolarisObjectPayloadKeySpecifier);
    fields?: InvokePolarisObjectPayloadFieldPolicy;
  };
  ResolvedPolarisObject?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ResolvedPolarisObjectKeySpecifier
      | (() => undefined | ResolvedPolarisObjectKeySpecifier);
    fields?: ResolvedPolarisObjectFieldPolicy;
  };
  ResolvedPolarisObjectAuth?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ResolvedPolarisObjectAuthKeySpecifier
      | (() => undefined | ResolvedPolarisObjectAuthKeySpecifier);
    fields?: ResolvedPolarisObjectAuthFieldPolicy;
  };
  ResolvedPolarisObjectExternalAuth?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | ResolvedPolarisObjectExternalAuthKeySpecifier
      | (() => undefined | ResolvedPolarisObjectExternalAuthKeySpecifier);
    fields?: ResolvedPolarisObjectExternalAuthFieldPolicy;
  };
  JiraMutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraMutationKeySpecifier
      | (() => undefined | JiraMutationKeySpecifier);
    fields?: JiraMutationFieldPolicy;
  };
  JiraPermissionSchemeAddGrantPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraPermissionSchemeAddGrantPayloadKeySpecifier
      | (() => undefined | JiraPermissionSchemeAddGrantPayloadKeySpecifier);
    fields?: JiraPermissionSchemeAddGrantPayloadFieldPolicy;
  };
  JiraDevOpsMutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraDevOpsMutationKeySpecifier
      | (() => undefined | JiraDevOpsMutationKeySpecifier);
    fields?: JiraDevOpsMutationFieldPolicy;
  };
  JiraDismissDevOpsIssuePanelBannerPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraDismissDevOpsIssuePanelBannerPayloadKeySpecifier
      | (() =>
          | undefined
          | JiraDismissDevOpsIssuePanelBannerPayloadKeySpecifier);
    fields?: JiraDismissDevOpsIssuePanelBannerPayloadFieldPolicy;
  };
  JiraOptoutDevOpsIssuePanelNotConnectedPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraOptoutDevOpsIssuePanelNotConnectedPayloadKeySpecifier
      | (() =>
          | undefined
          | JiraOptoutDevOpsIssuePanelNotConnectedPayloadKeySpecifier);
    fields?: JiraOptoutDevOpsIssuePanelNotConnectedPayloadFieldPolicy;
  };
  JiraPermissionSchemeRemoveGrantPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraPermissionSchemeRemoveGrantPayloadKeySpecifier
      | (() => undefined | JiraPermissionSchemeRemoveGrantPayloadKeySpecifier);
    fields?: JiraPermissionSchemeRemoveGrantPayloadFieldPolicy;
  };
  JswMutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JswMutationKeySpecifier
      | (() => undefined | JswMutationKeySpecifier);
    fields?: JswMutationFieldPolicy;
  };
  DeleteCardOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DeleteCardOutputKeySpecifier
      | (() => undefined | DeleteCardOutputKeySpecifier);
    fields?: DeleteCardOutputFieldPolicy;
  };
  MoveSprintDownResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MoveSprintDownResponseKeySpecifier
      | (() => undefined | MoveSprintDownResponseKeySpecifier);
    fields?: MoveSprintDownResponseFieldPolicy;
  };
  MoveSprintUpResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MoveSprintUpResponseKeySpecifier
      | (() => undefined | MoveSprintUpResponseKeySpecifier);
    fields?: MoveSprintUpResponseFieldPolicy;
  };
  RankColumnOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RankColumnOutputKeySpecifier
      | (() => undefined | RankColumnOutputKeySpecifier);
    fields?: RankColumnOutputFieldPolicy;
  };
  RefreshPolarisSnippetsPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RefreshPolarisSnippetsPayloadKeySpecifier
      | (() => undefined | RefreshPolarisSnippetsPayloadKeySpecifier);
    fields?: RefreshPolarisSnippetsPayloadFieldPolicy;
  };
  PolarisRefreshJob?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisRefreshJobKeySpecifier
      | (() => undefined | PolarisRefreshJobKeySpecifier);
    fields?: PolarisRefreshJobFieldPolicy;
  };
  PolarisRefreshJobProgress?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisRefreshJobProgressKeySpecifier
      | (() => undefined | PolarisRefreshJobProgressKeySpecifier);
    fields?: PolarisRefreshJobProgressFieldPolicy;
  };
  ResolvePolarisObjectPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ResolvePolarisObjectPayloadKeySpecifier
      | (() => undefined | ResolvePolarisObjectPayloadKeySpecifier);
    fields?: ResolvePolarisObjectPayloadFieldPolicy;
  };
  SetAppEnvironmentVariablePayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | SetAppEnvironmentVariablePayloadKeySpecifier
      | (() => undefined | SetAppEnvironmentVariablePayloadKeySpecifier);
    fields?: SetAppEnvironmentVariablePayloadFieldPolicy;
  };
  SetColumnLimitOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SetColumnLimitOutputKeySpecifier
      | (() => undefined | SetColumnLimitOutputKeySpecifier);
    fields?: SetColumnLimitOutputFieldPolicy;
  };
  SetColumnNameOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SetColumnNameOutputKeySpecifier
      | (() => undefined | SetColumnNameOutputKeySpecifier);
    fields?: SetColumnNameOutputFieldPolicy;
  };
  SetExternalAuthCredentialsPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | SetExternalAuthCredentialsPayloadKeySpecifier
      | (() => undefined | SetExternalAuthCredentialsPayloadKeySpecifier);
    fields?: SetExternalAuthCredentialsPayloadFieldPolicy;
  };
  SetPolarisProjectOnboardedPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | SetPolarisProjectOnboardedPayloadKeySpecifier
      | (() => undefined | SetPolarisProjectOnboardedPayloadKeySpecifier);
    fields?: SetPolarisProjectOnboardedPayloadFieldPolicy;
  };
  SetPolarisSelectedDeliveryProjectPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | SetPolarisSelectedDeliveryProjectPayloadKeySpecifier
      | (() =>
          | undefined
          | SetPolarisSelectedDeliveryProjectPayloadKeySpecifier);
    fields?: SetPolarisSelectedDeliveryProjectPayloadFieldPolicy;
  };
  SetPolarisSnippetPropertiesConfigPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | SetPolarisSnippetPropertiesConfigPayloadKeySpecifier
      | (() =>
          | undefined
          | SetPolarisSnippetPropertiesConfigPayloadKeySpecifier);
    fields?: SetPolarisSnippetPropertiesConfigPayloadFieldPolicy;
  };
  SetSwimlaneStrategyResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SetSwimlaneStrategyResponseKeySpecifier
      | (() => undefined | SetSwimlaneStrategyResponseKeySpecifier);
    fields?: SetSwimlaneStrategyResponseFieldPolicy;
  };
  AppSubscribePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppSubscribePayloadKeySpecifier
      | (() => undefined | AppSubscribePayloadKeySpecifier);
    fields?: AppSubscribePayloadFieldPolicy;
  };
  UnarchivePolarisInsightsPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UnarchivePolarisInsightsPayloadKeySpecifier
      | (() => undefined | UnarchivePolarisInsightsPayloadKeySpecifier);
    fields?: UnarchivePolarisInsightsPayloadFieldPolicy;
  };
  UnassignIssueParentOutput?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UnassignIssueParentOutputKeySpecifier
      | (() => undefined | UnassignIssueParentOutputKeySpecifier);
    fields?: UnassignIssueParentOutputFieldPolicy;
  };
  AppUninstallationResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppUninstallationResponseKeySpecifier
      | (() => undefined | AppUninstallationResponseKeySpecifier);
    fields?: AppUninstallationResponseFieldPolicy;
  };
  AppUnsubscribePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppUnsubscribePayloadKeySpecifier
      | (() => undefined | AppUnsubscribePayloadKeySpecifier);
    fields?: AppUnsubscribePayloadFieldPolicy;
  };
  UnwatchMarketplaceAppPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UnwatchMarketplaceAppPayloadKeySpecifier
      | (() => undefined | UnwatchMarketplaceAppPayloadKeySpecifier);
    fields?: UnwatchMarketplaceAppPayloadFieldPolicy;
  };
  UpdateAppDetailsResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UpdateAppDetailsResponseKeySpecifier
      | (() => undefined | UpdateAppDetailsResponseKeySpecifier);
    fields?: UpdateAppDetailsResponseFieldPolicy;
  };
  UpdateAtlassianOAuthClientResponse?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdateAtlassianOAuthClientResponseKeySpecifier
      | (() => undefined | UpdateAtlassianOAuthClientResponseKeySpecifier);
    fields?: UpdateAtlassianOAuthClientResponseFieldPolicy;
  };
  UpdateDevOpsContainerRelationshipEntityPropertiesPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdateDevOpsContainerRelationshipEntityPropertiesPayloadKeySpecifier
      | (() =>
          | undefined
          | UpdateDevOpsContainerRelationshipEntityPropertiesPayloadKeySpecifier);
    fields?: UpdateDevOpsContainerRelationshipEntityPropertiesPayloadFieldPolicy;
  };
  UpdateDevOpsServicePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UpdateDevOpsServicePayloadKeySpecifier
      | (() => undefined | UpdateDevOpsServicePayloadKeySpecifier);
    fields?: UpdateDevOpsServicePayloadFieldPolicy;
  };
  UpdateDevOpsServiceAndJiraProjectRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdateDevOpsServiceAndJiraProjectRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | UpdateDevOpsServiceAndJiraProjectRelationshipPayloadKeySpecifier);
    fields?: UpdateDevOpsServiceAndJiraProjectRelationshipPayloadFieldPolicy;
  };
  UpdateDevOpsServiceAndOpsgenieTeamRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdateDevOpsServiceAndOpsgenieTeamRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | UpdateDevOpsServiceAndOpsgenieTeamRelationshipPayloadKeySpecifier);
    fields?: UpdateDevOpsServiceAndOpsgenieTeamRelationshipPayloadFieldPolicy;
  };
  UpdateDevOpsServiceAndRepositoryRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdateDevOpsServiceAndRepositoryRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | UpdateDevOpsServiceAndRepositoryRelationshipPayloadKeySpecifier);
    fields?: UpdateDevOpsServiceAndRepositoryRelationshipPayloadFieldPolicy;
  };
  UpdateDevOpsServiceEntityPropertiesPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdateDevOpsServiceEntityPropertiesPayloadKeySpecifier
      | (() =>
          | undefined
          | UpdateDevOpsServiceEntityPropertiesPayloadKeySpecifier);
    fields?: UpdateDevOpsServiceEntityPropertiesPayloadFieldPolicy;
  };
  UpdateDevOpsServiceRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdateDevOpsServiceRelationshipPayloadKeySpecifier
      | (() => undefined | UpdateDevOpsServiceRelationshipPayloadKeySpecifier);
    fields?: UpdateDevOpsServiceRelationshipPayloadFieldPolicy;
  };
  UpdateDeveloperLogAccessPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UpdateDeveloperLogAccessPayloadKeySpecifier
      | (() => undefined | UpdateDeveloperLogAccessPayloadKeySpecifier);
    fields?: UpdateDeveloperLogAccessPayloadFieldPolicy;
  };
  UpdateJiraProjectAndOpsgenieTeamRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdateJiraProjectAndOpsgenieTeamRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | UpdateJiraProjectAndOpsgenieTeamRelationshipPayloadKeySpecifier);
    fields?: UpdateJiraProjectAndOpsgenieTeamRelationshipPayloadFieldPolicy;
  };
  UpdateJiraProjectAndRepositoryRelationshipPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdateJiraProjectAndRepositoryRelationshipPayloadKeySpecifier
      | (() =>
          | undefined
          | UpdateJiraProjectAndRepositoryRelationshipPayloadKeySpecifier);
    fields?: UpdateJiraProjectAndRepositoryRelationshipPayloadFieldPolicy;
  };
  UpdatePolarisCalculatedFieldPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdatePolarisCalculatedFieldPayloadKeySpecifier
      | (() => undefined | UpdatePolarisCalculatedFieldPayloadKeySpecifier);
    fields?: UpdatePolarisCalculatedFieldPayloadFieldPolicy;
  };
  UpdatePolarisCommentPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UpdatePolarisCommentPayloadKeySpecifier
      | (() => undefined | UpdatePolarisCommentPayloadKeySpecifier);
    fields?: UpdatePolarisCommentPayloadFieldPolicy;
  };
  UpdatePolarisDecorationPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UpdatePolarisDecorationPayloadKeySpecifier
      | (() => undefined | UpdatePolarisDecorationPayloadKeySpecifier);
    fields?: UpdatePolarisDecorationPayloadFieldPolicy;
  };
  UpdatePolarisFieldDescriptionPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdatePolarisFieldDescriptionPayloadKeySpecifier
      | (() => undefined | UpdatePolarisFieldDescriptionPayloadKeySpecifier);
    fields?: UpdatePolarisFieldDescriptionPayloadFieldPolicy;
  };
  UpdatePolarisFieldOptionWeightPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdatePolarisFieldOptionWeightPayloadKeySpecifier
      | (() => undefined | UpdatePolarisFieldOptionWeightPayloadKeySpecifier);
    fields?: UpdatePolarisFieldOptionWeightPayloadFieldPolicy;
  };
  UpdatePolarisIdeaPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UpdatePolarisIdeaPayloadKeySpecifier
      | (() => undefined | UpdatePolarisIdeaPayloadKeySpecifier);
    fields?: UpdatePolarisIdeaPayloadFieldPolicy;
  };
  UpdatePolarisInsightPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UpdatePolarisInsightPayloadKeySpecifier
      | (() => undefined | UpdatePolarisInsightPayloadKeySpecifier);
    fields?: UpdatePolarisInsightPayloadFieldPolicy;
  };
  UpdatePolarisPlayContributionPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdatePolarisPlayContributionPayloadKeySpecifier
      | (() => undefined | UpdatePolarisPlayContributionPayloadKeySpecifier);
    fields?: UpdatePolarisPlayContributionPayloadFieldPolicy;
  };
  UpdatePolarisTermsConsentPayload?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UpdatePolarisTermsConsentPayloadKeySpecifier
      | (() => undefined | UpdatePolarisTermsConsentPayloadKeySpecifier);
    fields?: UpdatePolarisTermsConsentPayloadFieldPolicy;
  };
  UpdatePolarisViewPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UpdatePolarisViewPayloadKeySpecifier
      | (() => undefined | UpdatePolarisViewPayloadKeySpecifier);
    fields?: UpdatePolarisViewPayloadFieldPolicy;
  };
  UpdatePolarisViewRankV2Payload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UpdatePolarisViewRankV2PayloadKeySpecifier
      | (() => undefined | UpdatePolarisViewRankV2PayloadKeySpecifier);
    fields?: UpdatePolarisViewRankV2PayloadFieldPolicy;
  };
  UpdatePolarisViewSetPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | UpdatePolarisViewSetPayloadKeySpecifier
      | (() => undefined | UpdatePolarisViewSetPayloadKeySpecifier);
    fields?: UpdatePolarisViewSetPayloadFieldPolicy;
  };
  AppInstallationUpgradeResponse?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppInstallationUpgradeResponseKeySpecifier
      | (() => undefined | AppInstallationUpgradeResponseKeySpecifier);
    fields?: AppInstallationUpgradeResponseFieldPolicy;
  };
  UserAuthTokenForExtensionResponse?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | UserAuthTokenForExtensionResponseKeySpecifier
      | (() => undefined | UserAuthTokenForExtensionResponseKeySpecifier);
    fields?: UserAuthTokenForExtensionResponseFieldPolicy;
  };
  AuthToken?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AuthTokenKeySpecifier
      | (() => undefined | AuthTokenKeySpecifier);
    fields?: AuthTokenFieldPolicy;
  };
  WatchMarketplaceAppPayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | WatchMarketplaceAppPayloadKeySpecifier
      | (() => undefined | WatchMarketplaceAppPayloadKeySpecifier);
    fields?: WatchMarketplaceAppPayloadFieldPolicy;
  };
  AppDeploymentLogEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppDeploymentLogEventKeySpecifier
      | (() => undefined | AppDeploymentLogEventKeySpecifier);
    fields?: AppDeploymentLogEventFieldPolicy;
  };
  AppDeploymentSnapshotLogEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppDeploymentSnapshotLogEventKeySpecifier
      | (() => undefined | AppDeploymentSnapshotLogEventKeySpecifier);
    fields?: AppDeploymentSnapshotLogEventFieldPolicy;
  };
  AppDeploymentTransitionEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppDeploymentTransitionEventKeySpecifier
      | (() => undefined | AppDeploymentTransitionEventKeySpecifier);
    fields?: AppDeploymentTransitionEventFieldPolicy;
  };
  AppInstallationCreationTask?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppInstallationCreationTaskKeySpecifier
      | (() => undefined | AppInstallationCreationTaskKeySpecifier);
    fields?: AppInstallationCreationTaskFieldPolicy;
  };
  AppInstallationDeletionTask?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppInstallationDeletionTaskKeySpecifier
      | (() => undefined | AppInstallationDeletionTaskKeySpecifier);
    fields?: AppInstallationDeletionTaskFieldPolicy;
  };
  AppInstallationSubscribeTask?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppInstallationSubscribeTaskKeySpecifier
      | (() => undefined | AppInstallationSubscribeTaskKeySpecifier);
    fields?: AppInstallationSubscribeTaskFieldPolicy;
  };
  AppInstallationUnsubscribeTask?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppInstallationUnsubscribeTaskKeySpecifier
      | (() => undefined | AppInstallationUnsubscribeTaskKeySpecifier);
    fields?: AppInstallationUnsubscribeTaskFieldPolicy;
  };
  AppInstallationUpgradeTask?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppInstallationUpgradeTaskKeySpecifier
      | (() => undefined | AppInstallationUpgradeTaskKeySpecifier);
    fields?: AppInstallationUpgradeTaskFieldPolicy;
  };
  AppUser?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AppUserKeySpecifier
      | (() => undefined | AppUserKeySpecifier);
    fields?: AppUserFieldPolicy;
  };
  AtlassianAccountUser?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | AtlassianAccountUserKeySpecifier
      | (() => undefined | AtlassianAccountUserKeySpecifier);
    fields?: AtlassianAccountUserFieldPolicy;
  };
  LocalizationContext?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | LocalizationContextKeySpecifier
      | (() => undefined | LocalizationContextKeySpecifier);
    fields?: LocalizationContextFieldPolicy;
  };
  CloudAppScope?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CloudAppScopeKeySpecifier
      | (() => undefined | CloudAppScopeKeySpecifier);
    fields?: CloudAppScopeFieldPolicy;
  };
  CompassDeploymentEvent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassDeploymentEventKeySpecifier
      | (() => undefined | CompassDeploymentEventKeySpecifier);
    fields?: CompassDeploymentEventFieldPolicy;
  };
  CompassDeploymentEventEnvironment?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassDeploymentEventEnvironmentKeySpecifier
      | (() => undefined | CompassDeploymentEventEnvironmentKeySpecifier);
    fields?: CompassDeploymentEventEnvironmentFieldPolicy;
  };
  CompassDeploymentEventPipeline?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassDeploymentEventPipelineKeySpecifier
      | (() => undefined | CompassDeploymentEventPipelineKeySpecifier);
    fields?: CompassDeploymentEventPipelineFieldPolicy;
  };
  CompassEnumField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassEnumFieldKeySpecifier
      | (() => undefined | CompassEnumFieldKeySpecifier);
    fields?: CompassEnumFieldFieldPolicy;
  };
  CompassHasDescriptionScorecardCriteria?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassHasDescriptionScorecardCriteriaKeySpecifier
      | (() => undefined | CompassHasDescriptionScorecardCriteriaKeySpecifier);
    fields?: CompassHasDescriptionScorecardCriteriaFieldPolicy;
  };
  CompassHasFieldScorecardCriteria?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassHasFieldScorecardCriteriaKeySpecifier
      | (() => undefined | CompassHasFieldScorecardCriteriaKeySpecifier);
    fields?: CompassHasFieldScorecardCriteriaFieldPolicy;
  };
  CompassHasLinkScorecardCriteria?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompassHasLinkScorecardCriteriaKeySpecifier
      | (() => undefined | CompassHasLinkScorecardCriteriaKeySpecifier);
    fields?: CompassHasLinkScorecardCriteriaFieldPolicy;
  };
  CompassHasOwnerScorecardCriteria?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompassHasOwnerScorecardCriteriaKeySpecifier
      | (() => undefined | CompassHasOwnerScorecardCriteriaKeySpecifier);
    fields?: CompassHasOwnerScorecardCriteriaFieldPolicy;
  };
  CompatibleAtlassianCloudProduct?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CompatibleAtlassianCloudProductKeySpecifier
      | (() => undefined | CompatibleAtlassianCloudProductKeySpecifier);
    fields?: CompatibleAtlassianCloudProductFieldPolicy;
  };
  CompatibleAtlassianDataCenterProduct?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompatibleAtlassianDataCenterProductKeySpecifier
      | (() => undefined | CompatibleAtlassianDataCenterProductKeySpecifier);
    fields?: CompatibleAtlassianDataCenterProductFieldPolicy;
  };
  CompatibleAtlassianServerProduct?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | CompatibleAtlassianServerProductKeySpecifier
      | (() => undefined | CompatibleAtlassianServerProductKeySpecifier);
    fields?: CompatibleAtlassianServerProductFieldPolicy;
  };
  ConnectAppScope?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | ConnectAppScopeKeySpecifier
      | (() => undefined | ConnectAppScopeKeySpecifier);
    fields?: ConnectAppScopeFieldPolicy;
  };
  CustomerUser?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | CustomerUserKeySpecifier
      | (() => undefined | CustomerUserKeySpecifier);
    fields?: CustomerUserFieldPolicy;
  };
  DevOpsMetricsCycleTimeMean?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | DevOpsMetricsCycleTimeMeanKeySpecifier
      | (() => undefined | DevOpsMetricsCycleTimeMeanKeySpecifier);
    fields?: DevOpsMetricsCycleTimeMeanFieldPolicy;
  };
  DevOpsMetricsCycleTimePercentile?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | DevOpsMetricsCycleTimePercentileKeySpecifier
      | (() => undefined | DevOpsMetricsCycleTimePercentileKeySpecifier);
    fields?: DevOpsMetricsCycleTimePercentileFieldPolicy;
  };
  GenericMutationErrorExtension?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | GenericMutationErrorExtensionKeySpecifier
      | (() => undefined | GenericMutationErrorExtensionKeySpecifier);
    fields?: GenericMutationErrorExtensionFieldPolicy;
  };
  GenericQueryErrorExtension?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | GenericQueryErrorExtensionKeySpecifier
      | (() => undefined | GenericQueryErrorExtensionKeySpecifier);
    fields?: GenericQueryErrorExtensionFieldPolicy;
  };
  InvokeExtensionPayloadErrorExtension?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | InvokeExtensionPayloadErrorExtensionKeySpecifier
      | (() => undefined | InvokeExtensionPayloadErrorExtensionKeySpecifier);
    fields?: InvokeExtensionPayloadErrorExtensionFieldPolicy;
  };
  InvokeExtensionPayloadErrorExtensionFields?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | InvokeExtensionPayloadErrorExtensionFieldsKeySpecifier
      | (() =>
          | undefined
          | InvokeExtensionPayloadErrorExtensionFieldsKeySpecifier);
    fields?: InvokeExtensionPayloadErrorExtensionFieldsFieldPolicy;
  };
  JiraAffectedService?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAffectedServiceKeySpecifier
      | (() => undefined | JiraAffectedServiceKeySpecifier);
    fields?: JiraAffectedServiceFieldPolicy;
  };
  JiraAffectedServiceConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAffectedServiceConnectionKeySpecifier
      | (() => undefined | JiraAffectedServiceConnectionKeySpecifier);
    fields?: JiraAffectedServiceConnectionFieldPolicy;
  };
  JiraAffectedServiceEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAffectedServiceEdgeKeySpecifier
      | (() => undefined | JiraAffectedServiceEdgeKeySpecifier);
    fields?: JiraAffectedServiceEdgeFieldPolicy;
  };
  JiraAffectedServicesField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAffectedServicesFieldKeySpecifier
      | (() => undefined | JiraAffectedServicesFieldKeySpecifier);
    fields?: JiraAffectedServicesFieldFieldPolicy;
  };
  JiraIssueFieldConfiguration?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueFieldConfigurationKeySpecifier
      | (() => undefined | JiraIssueFieldConfigurationKeySpecifier);
    fields?: JiraIssueFieldConfigurationFieldPolicy;
  };
  JiraFieldConfig?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraFieldConfigKeySpecifier
      | (() => undefined | JiraFieldConfigKeySpecifier);
    fields?: JiraFieldConfigFieldPolicy;
  };
  JiraFieldNonEditableReason?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraFieldNonEditableReasonKeySpecifier
      | (() => undefined | JiraFieldNonEditableReasonKeySpecifier);
    fields?: JiraFieldNonEditableReasonFieldPolicy;
  };
  JiraUserIssueFieldConfiguration?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraUserIssueFieldConfigurationKeySpecifier
      | (() => undefined | JiraUserIssueFieldConfigurationKeySpecifier);
    fields?: JiraUserIssueFieldConfigurationFieldPolicy;
  };
  JiraUserFieldConfig?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraUserFieldConfigKeySpecifier
      | (() => undefined | JiraUserFieldConfigKeySpecifier);
    fields?: JiraUserFieldConfigFieldPolicy;
  };
  JiraAsset?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAssetKeySpecifier
      | (() => undefined | JiraAssetKeySpecifier);
    fields?: JiraAssetFieldPolicy;
  };
  JiraAssetField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAssetFieldKeySpecifier
      | (() => undefined | JiraAssetFieldKeySpecifier);
    fields?: JiraAssetFieldFieldPolicy;
  };
  JiraAtlassianTeam?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAtlassianTeamKeySpecifier
      | (() => undefined | JiraAtlassianTeamKeySpecifier);
    fields?: JiraAtlassianTeamFieldPolicy;
  };
  JiraAtlassianTeamConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAtlassianTeamConnectionKeySpecifier
      | (() => undefined | JiraAtlassianTeamConnectionKeySpecifier);
    fields?: JiraAtlassianTeamConnectionFieldPolicy;
  };
  JiraAtlassianTeamEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAtlassianTeamEdgeKeySpecifier
      | (() => undefined | JiraAtlassianTeamEdgeKeySpecifier);
    fields?: JiraAtlassianTeamEdgeFieldPolicy;
  };
  JiraAtlassianTeamField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAtlassianTeamFieldKeySpecifier
      | (() => undefined | JiraAtlassianTeamFieldKeySpecifier);
    fields?: JiraAtlassianTeamFieldFieldPolicy;
  };
  JiraAttachmentsField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraAttachmentsFieldKeySpecifier
      | (() => undefined | JiraAttachmentsFieldKeySpecifier);
    fields?: JiraAttachmentsFieldFieldPolicy;
  };
  JiraMediaContext?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraMediaContextKeySpecifier
      | (() => undefined | JiraMediaContextKeySpecifier);
    fields?: JiraMediaContextFieldPolicy;
  };
  JiraMediaUploadToken?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraMediaUploadTokenKeySpecifier
      | (() => undefined | JiraMediaUploadTokenKeySpecifier);
    fields?: JiraMediaUploadTokenFieldPolicy;
  };
  JiraCMDBField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraCMDBFieldKeySpecifier
      | (() => undefined | JiraCMDBFieldKeySpecifier);
    fields?: JiraCMDBFieldFieldPolicy;
  };
  JiraCmdbObject?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraCmdbObjectKeySpecifier
      | (() => undefined | JiraCmdbObjectKeySpecifier);
    fields?: JiraCmdbObjectFieldPolicy;
  };
  JiraCascadingOption?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraCascadingOptionKeySpecifier
      | (() => undefined | JiraCascadingOptionKeySpecifier);
    fields?: JiraCascadingOptionFieldPolicy;
  };
  JiraOption?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraOptionKeySpecifier
      | (() => undefined | JiraOptionKeySpecifier);
    fields?: JiraOptionFieldPolicy;
  };
  JiraCascadingOptions?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraCascadingOptionsKeySpecifier
      | (() => undefined | JiraCascadingOptionsKeySpecifier);
    fields?: JiraCascadingOptionsFieldPolicy;
  };
  JiraCascadingOptionsConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraCascadingOptionsConnectionKeySpecifier
      | (() => undefined | JiraCascadingOptionsConnectionKeySpecifier);
    fields?: JiraCascadingOptionsConnectionFieldPolicy;
  };
  JiraCascadingOptionsEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraCascadingOptionsEdgeKeySpecifier
      | (() => undefined | JiraCascadingOptionsEdgeKeySpecifier);
    fields?: JiraCascadingOptionsEdgeFieldPolicy;
  };
  JiraCascadingSelectField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraCascadingSelectFieldKeySpecifier
      | (() => undefined | JiraCascadingSelectFieldKeySpecifier);
    fields?: JiraCascadingSelectFieldFieldPolicy;
  };
  JiraCheckboxesField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraCheckboxesFieldKeySpecifier
      | (() => undefined | JiraCheckboxesFieldKeySpecifier);
    fields?: JiraCheckboxesFieldFieldPolicy;
  };
  JiraOptionConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraOptionConnectionKeySpecifier
      | (() => undefined | JiraOptionConnectionKeySpecifier);
    fields?: JiraOptionConnectionFieldPolicy;
  };
  JiraOptionEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraOptionEdgeKeySpecifier
      | (() => undefined | JiraOptionEdgeKeySpecifier);
    fields?: JiraOptionEdgeFieldPolicy;
  };
  JiraColor?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraColorKeySpecifier
      | (() => undefined | JiraColorKeySpecifier);
    fields?: JiraColorFieldPolicy;
  };
  JiraColorField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraColorFieldKeySpecifier
      | (() => undefined | JiraColorFieldKeySpecifier);
    fields?: JiraColorFieldFieldPolicy;
  };
  JiraComponent?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraComponentKeySpecifier
      | (() => undefined | JiraComponentKeySpecifier);
    fields?: JiraComponentFieldPolicy;
  };
  JiraComponentConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraComponentConnectionKeySpecifier
      | (() => undefined | JiraComponentConnectionKeySpecifier);
    fields?: JiraComponentConnectionFieldPolicy;
  };
  JiraComponentEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraComponentEdgeKeySpecifier
      | (() => undefined | JiraComponentEdgeKeySpecifier);
    fields?: JiraComponentEdgeFieldPolicy;
  };
  JiraComponentsField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraComponentsFieldKeySpecifier
      | (() => undefined | JiraComponentsFieldKeySpecifier);
    fields?: JiraComponentsFieldFieldPolicy;
  };
  JiraConnectMultipleSelectField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraConnectMultipleSelectFieldKeySpecifier
      | (() => undefined | JiraConnectMultipleSelectFieldKeySpecifier);
    fields?: JiraConnectMultipleSelectFieldFieldPolicy;
  };
  JiraConnectNumberField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraConnectNumberFieldKeySpecifier
      | (() => undefined | JiraConnectNumberFieldKeySpecifier);
    fields?: JiraConnectNumberFieldFieldPolicy;
  };
  JiraConnectRichTextField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraConnectRichTextFieldKeySpecifier
      | (() => undefined | JiraConnectRichTextFieldKeySpecifier);
    fields?: JiraConnectRichTextFieldFieldPolicy;
  };
  JiraConnectSingleSelectField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraConnectSingleSelectFieldKeySpecifier
      | (() => undefined | JiraConnectSingleSelectFieldKeySpecifier);
    fields?: JiraConnectSingleSelectFieldFieldPolicy;
  };
  JiraConnectTextField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraConnectTextFieldKeySpecifier
      | (() => undefined | JiraConnectTextFieldKeySpecifier);
    fields?: JiraConnectTextFieldFieldPolicy;
  };
  JiraDatePickerField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraDatePickerFieldKeySpecifier
      | (() => undefined | JiraDatePickerFieldKeySpecifier);
    fields?: JiraDatePickerFieldFieldPolicy;
  };
  JiraDateTimePickerField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraDateTimePickerFieldKeySpecifier
      | (() => undefined | JiraDateTimePickerFieldKeySpecifier);
    fields?: JiraDateTimePickerFieldFieldPolicy;
  };
  JiraEpic?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraEpicKeySpecifier
      | (() => undefined | JiraEpicKeySpecifier);
    fields?: JiraEpicFieldPolicy;
  };
  JiraEpicConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraEpicConnectionKeySpecifier
      | (() => undefined | JiraEpicConnectionKeySpecifier);
    fields?: JiraEpicConnectionFieldPolicy;
  };
  JiraEpicEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraEpicEdgeKeySpecifier
      | (() => undefined | JiraEpicEdgeKeySpecifier);
    fields?: JiraEpicEdgeFieldPolicy;
  };
  JiraEpicLinkField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraEpicLinkFieldKeySpecifier
      | (() => undefined | JiraEpicLinkFieldKeySpecifier);
    fields?: JiraEpicLinkFieldFieldPolicy;
  };
  JiraFlag?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraFlagKeySpecifier
      | (() => undefined | JiraFlagKeySpecifier);
    fields?: JiraFlagFieldPolicy;
  };
  JiraFlagField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraFlagFieldKeySpecifier
      | (() => undefined | JiraFlagFieldKeySpecifier);
    fields?: JiraFlagFieldFieldPolicy;
  };
  JiraForgeGroupField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraForgeGroupFieldKeySpecifier
      | (() => undefined | JiraForgeGroupFieldKeySpecifier);
    fields?: JiraForgeGroupFieldFieldPolicy;
  };
  JiraGroupConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraGroupConnectionKeySpecifier
      | (() => undefined | JiraGroupConnectionKeySpecifier);
    fields?: JiraGroupConnectionFieldPolicy;
  };
  JiraForgeNumberField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraForgeNumberFieldKeySpecifier
      | (() => undefined | JiraForgeNumberFieldKeySpecifier);
    fields?: JiraForgeNumberFieldFieldPolicy;
  };
  JiraForgeStringField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraForgeStringFieldKeySpecifier
      | (() => undefined | JiraForgeStringFieldKeySpecifier);
    fields?: JiraForgeStringFieldFieldPolicy;
  };
  JiraForgeStringsField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraForgeStringsFieldKeySpecifier
      | (() => undefined | JiraForgeStringsFieldKeySpecifier);
    fields?: JiraForgeStringsFieldFieldPolicy;
  };
  JiraLabelConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraLabelConnectionKeySpecifier
      | (() => undefined | JiraLabelConnectionKeySpecifier);
    fields?: JiraLabelConnectionFieldPolicy;
  };
  JiraLabelEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraLabelEdgeKeySpecifier
      | (() => undefined | JiraLabelEdgeKeySpecifier);
    fields?: JiraLabelEdgeFieldPolicy;
  };
  JiraLabel?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraLabelKeySpecifier
      | (() => undefined | JiraLabelKeySpecifier);
    fields?: JiraLabelFieldPolicy;
  };
  JiraForgeUserField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraForgeUserFieldKeySpecifier
      | (() => undefined | JiraForgeUserFieldKeySpecifier);
    fields?: JiraForgeUserFieldFieldPolicy;
  };
  JiraUserConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraUserConnectionKeySpecifier
      | (() => undefined | JiraUserConnectionKeySpecifier);
    fields?: JiraUserConnectionFieldPolicy;
  };
  JiraUserEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraUserEdgeKeySpecifier
      | (() => undefined | JiraUserEdgeKeySpecifier);
    fields?: JiraUserEdgeFieldPolicy;
  };
  JiraGroupEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraGroupEdgeKeySpecifier
      | (() => undefined | JiraGroupEdgeKeySpecifier);
    fields?: JiraGroupEdgeFieldPolicy;
  };
  JiraIssueConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueConnectionKeySpecifier
      | (() => undefined | JiraIssueConnectionKeySpecifier);
    fields?: JiraIssueConnectionFieldPolicy;
  };
  JiraIssueEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueEdgeKeySpecifier
      | (() => undefined | JiraIssueEdgeKeySpecifier);
    fields?: JiraIssueEdgeFieldPolicy;
  };
  JiraIssueLink?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueLinkKeySpecifier
      | (() => undefined | JiraIssueLinkKeySpecifier);
    fields?: JiraIssueLinkFieldPolicy;
  };
  JiraIssueLinkTypeRelation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueLinkTypeRelationKeySpecifier
      | (() => undefined | JiraIssueLinkTypeRelationKeySpecifier);
    fields?: JiraIssueLinkTypeRelationFieldPolicy;
  };
  JiraIssueLinkConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueLinkConnectionKeySpecifier
      | (() => undefined | JiraIssueLinkConnectionKeySpecifier);
    fields?: JiraIssueLinkConnectionFieldPolicy;
  };
  JiraIssueLinkEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueLinkEdgeKeySpecifier
      | (() => undefined | JiraIssueLinkEdgeKeySpecifier);
    fields?: JiraIssueLinkEdgeFieldPolicy;
  };
  JiraIssueLinkField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueLinkFieldKeySpecifier
      | (() => undefined | JiraIssueLinkFieldKeySpecifier);
    fields?: JiraIssueLinkFieldFieldPolicy;
  };
  JiraIssueLinkTypeRelationConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraIssueLinkTypeRelationConnectionKeySpecifier
      | (() => undefined | JiraIssueLinkTypeRelationConnectionKeySpecifier);
    fields?: JiraIssueLinkTypeRelationConnectionFieldPolicy;
  };
  JiraIssueLinkTypeRelationEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueLinkTypeRelationEdgeKeySpecifier
      | (() => undefined | JiraIssueLinkTypeRelationEdgeKeySpecifier);
    fields?: JiraIssueLinkTypeRelationEdgeFieldPolicy;
  };
  JiraIssueRestrictionField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueRestrictionFieldKeySpecifier
      | (() => undefined | JiraIssueRestrictionFieldKeySpecifier);
    fields?: JiraIssueRestrictionFieldFieldPolicy;
  };
  JiraRoleConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraRoleConnectionKeySpecifier
      | (() => undefined | JiraRoleConnectionKeySpecifier);
    fields?: JiraRoleConnectionFieldPolicy;
  };
  JiraRoleEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraRoleEdgeKeySpecifier
      | (() => undefined | JiraRoleEdgeKeySpecifier);
    fields?: JiraRoleEdgeFieldPolicy;
  };
  JiraIssueTypeConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueTypeConnectionKeySpecifier
      | (() => undefined | JiraIssueTypeConnectionKeySpecifier);
    fields?: JiraIssueTypeConnectionFieldPolicy;
  };
  JiraIssueTypeEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueTypeEdgeKeySpecifier
      | (() => undefined | JiraIssueTypeEdgeKeySpecifier);
    fields?: JiraIssueTypeEdgeFieldPolicy;
  };
  JiraIssueTypeField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraIssueTypeFieldKeySpecifier
      | (() => undefined | JiraIssueTypeFieldKeySpecifier);
    fields?: JiraIssueTypeFieldFieldPolicy;
  };
  JiraJqlCascadingOptionFieldValue?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraJqlCascadingOptionFieldValueKeySpecifier
      | (() => undefined | JiraJqlCascadingOptionFieldValueKeySpecifier);
    fields?: JiraJqlCascadingOptionFieldValueFieldPolicy;
  };
  JiraJqlComponentFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlComponentFieldValueKeySpecifier
      | (() => undefined | JiraJqlComponentFieldValueKeySpecifier);
    fields?: JiraJqlComponentFieldValueFieldPolicy;
  };
  JiraJqlIssueFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlIssueFieldValueKeySpecifier
      | (() => undefined | JiraJqlIssueFieldValueKeySpecifier);
    fields?: JiraJqlIssueFieldValueFieldPolicy;
  };
  JiraJqlLabelFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlLabelFieldValueKeySpecifier
      | (() => undefined | JiraJqlLabelFieldValueKeySpecifier);
    fields?: JiraJqlLabelFieldValueFieldPolicy;
  };
  JiraJqlPriorityFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlPriorityFieldValueKeySpecifier
      | (() => undefined | JiraJqlPriorityFieldValueKeySpecifier);
    fields?: JiraJqlPriorityFieldValueFieldPolicy;
  };
  JiraPriority?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPriorityKeySpecifier
      | (() => undefined | JiraPriorityKeySpecifier);
    fields?: JiraPriorityFieldPolicy;
  };
  JiraJqlResolutionFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlResolutionFieldValueKeySpecifier
      | (() => undefined | JiraJqlResolutionFieldValueKeySpecifier);
    fields?: JiraJqlResolutionFieldValueFieldPolicy;
  };
  JiraResolution?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraResolutionKeySpecifier
      | (() => undefined | JiraResolutionKeySpecifier);
    fields?: JiraResolutionFieldPolicy;
  };
  JiraJqlStatusCategoryFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlStatusCategoryFieldValueKeySpecifier
      | (() => undefined | JiraJqlStatusCategoryFieldValueKeySpecifier);
    fields?: JiraJqlStatusCategoryFieldValueFieldPolicy;
  };
  JiraStatusCategory?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraStatusCategoryKeySpecifier
      | (() => undefined | JiraStatusCategoryKeySpecifier);
    fields?: JiraStatusCategoryFieldPolicy;
  };
  JiraJqlStatusFieldValue?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraJqlStatusFieldValueKeySpecifier
      | (() => undefined | JiraJqlStatusFieldValueKeySpecifier);
    fields?: JiraJqlStatusFieldValueFieldPolicy;
  };
  JiraLabelsField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraLabelsFieldKeySpecifier
      | (() => undefined | JiraLabelsFieldKeySpecifier);
    fields?: JiraLabelsFieldFieldPolicy;
  };
  JiraMultipleGroupPickerField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraMultipleGroupPickerFieldKeySpecifier
      | (() => undefined | JiraMultipleGroupPickerFieldKeySpecifier);
    fields?: JiraMultipleGroupPickerFieldFieldPolicy;
  };
  JiraMultipleSelectField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraMultipleSelectFieldKeySpecifier
      | (() => undefined | JiraMultipleSelectFieldKeySpecifier);
    fields?: JiraMultipleSelectFieldFieldPolicy;
  };
  JiraMultipleSelectUserPickerField?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraMultipleSelectUserPickerFieldKeySpecifier
      | (() => undefined | JiraMultipleSelectUserPickerFieldKeySpecifier);
    fields?: JiraMultipleSelectUserPickerFieldFieldPolicy;
  };
  JiraMultipleVersionPickerField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraMultipleVersionPickerFieldKeySpecifier
      | (() => undefined | JiraMultipleVersionPickerFieldKeySpecifier);
    fields?: JiraMultipleVersionPickerFieldFieldPolicy;
  };
  JiraVersionConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraVersionConnectionKeySpecifier
      | (() => undefined | JiraVersionConnectionKeySpecifier);
    fields?: JiraVersionConnectionFieldPolicy;
  };
  JiraVersionEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraVersionEdgeKeySpecifier
      | (() => undefined | JiraVersionEdgeKeySpecifier);
    fields?: JiraVersionEdgeFieldPolicy;
  };
  JiraNumberField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraNumberFieldKeySpecifier
      | (() => undefined | JiraNumberFieldKeySpecifier);
    fields?: JiraNumberFieldFieldPolicy;
  };
  JiraParentIssueField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraParentIssueFieldKeySpecifier
      | (() => undefined | JiraParentIssueFieldKeySpecifier);
    fields?: JiraParentIssueFieldFieldPolicy;
  };
  JiraPeopleField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPeopleFieldKeySpecifier
      | (() => undefined | JiraPeopleFieldKeySpecifier);
    fields?: JiraPeopleFieldFieldPolicy;
  };
  JiraPlatformAttachment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPlatformAttachmentKeySpecifier
      | (() => undefined | JiraPlatformAttachmentKeySpecifier);
    fields?: JiraPlatformAttachmentFieldPolicy;
  };
  JiraPlatformComment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPlatformCommentKeySpecifier
      | (() => undefined | JiraPlatformCommentKeySpecifier);
    fields?: JiraPlatformCommentFieldPolicy;
  };
  JiraPriorityConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPriorityConnectionKeySpecifier
      | (() => undefined | JiraPriorityConnectionKeySpecifier);
    fields?: JiraPriorityConnectionFieldPolicy;
  };
  JiraPriorityEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPriorityEdgeKeySpecifier
      | (() => undefined | JiraPriorityEdgeKeySpecifier);
    fields?: JiraPriorityEdgeFieldPolicy;
  };
  JiraPriorityField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraPriorityFieldKeySpecifier
      | (() => undefined | JiraPriorityFieldKeySpecifier);
    fields?: JiraPriorityFieldFieldPolicy;
  };
  JiraProjectField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraProjectFieldKeySpecifier
      | (() => undefined | JiraProjectFieldKeySpecifier);
    fields?: JiraProjectFieldFieldPolicy;
  };
  JiraRadioSelectField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraRadioSelectFieldKeySpecifier
      | (() => undefined | JiraRadioSelectFieldKeySpecifier);
    fields?: JiraRadioSelectFieldFieldPolicy;
  };
  JiraResolutionConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraResolutionConnectionKeySpecifier
      | (() => undefined | JiraResolutionConnectionKeySpecifier);
    fields?: JiraResolutionConnectionFieldPolicy;
  };
  JiraResolutionEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraResolutionEdgeKeySpecifier
      | (() => undefined | JiraResolutionEdgeKeySpecifier);
    fields?: JiraResolutionEdgeFieldPolicy;
  };
  JiraResolutionField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraResolutionFieldKeySpecifier
      | (() => undefined | JiraResolutionFieldKeySpecifier);
    fields?: JiraResolutionFieldFieldPolicy;
  };
  JiraRichTextField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraRichTextFieldKeySpecifier
      | (() => undefined | JiraRichTextFieldKeySpecifier);
    fields?: JiraRichTextFieldFieldPolicy;
  };
  JiraSecurityLevel?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraSecurityLevelKeySpecifier
      | (() => undefined | JiraSecurityLevelKeySpecifier);
    fields?: JiraSecurityLevelFieldPolicy;
  };
  JiraSecurityLevelConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraSecurityLevelConnectionKeySpecifier
      | (() => undefined | JiraSecurityLevelConnectionKeySpecifier);
    fields?: JiraSecurityLevelConnectionFieldPolicy;
  };
  JiraSecurityLevelEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraSecurityLevelEdgeKeySpecifier
      | (() => undefined | JiraSecurityLevelEdgeKeySpecifier);
    fields?: JiraSecurityLevelEdgeFieldPolicy;
  };
  JiraSecurityLevelField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraSecurityLevelFieldKeySpecifier
      | (() => undefined | JiraSecurityLevelFieldKeySpecifier);
    fields?: JiraSecurityLevelFieldFieldPolicy;
  };
  JiraServiceManagementActiveApproval?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementActiveApprovalKeySpecifier
      | (() => undefined | JiraServiceManagementActiveApprovalKeySpecifier);
    fields?: JiraServiceManagementActiveApprovalFieldPolicy;
  };
  JiraServiceManagementGroupApproverPrincipals?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementGroupApproverPrincipalsKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementGroupApproverPrincipalsKeySpecifier);
    fields?: JiraServiceManagementGroupApproverPrincipalsFieldPolicy;
  };
  JiraServiceManagementGroupApproverPrincipal?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementGroupApproverPrincipalKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementGroupApproverPrincipalKeySpecifier);
    fields?: JiraServiceManagementGroupApproverPrincipalFieldPolicy;
  };
  JiraServiceManagementUserApproverPrincipal?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementUserApproverPrincipalKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementUserApproverPrincipalKeySpecifier);
    fields?: JiraServiceManagementUserApproverPrincipalFieldPolicy;
  };
  JiraServiceManagementUserApproverPrincipalConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementUserApproverPrincipalConnectionKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementUserApproverPrincipalConnectionKeySpecifier);
    fields?: JiraServiceManagementUserApproverPrincipalConnectionFieldPolicy;
  };
  JiraServiceManagementUserApproverPrincipalEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementUserApproverPrincipalEdgeKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementUserApproverPrincipalEdgeKeySpecifier);
    fields?: JiraServiceManagementUserApproverPrincipalEdgeFieldPolicy;
  };
  JiraServiceManagementApproverConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementApproverConnectionKeySpecifier
      | (() => undefined | JiraServiceManagementApproverConnectionKeySpecifier);
    fields?: JiraServiceManagementApproverConnectionFieldPolicy;
  };
  JiraServiceManagementApproverEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementApproverEdgeKeySpecifier
      | (() => undefined | JiraServiceManagementApproverEdgeKeySpecifier);
    fields?: JiraServiceManagementApproverEdgeFieldPolicy;
  };
  JiraServiceManagementApprover?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraServiceManagementApproverKeySpecifier
      | (() => undefined | JiraServiceManagementApproverKeySpecifier);
    fields?: JiraServiceManagementApproverFieldPolicy;
  };
  JiraServiceManagementApprovalConfiguration?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementApprovalConfigurationKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementApprovalConfigurationKeySpecifier);
    fields?: JiraServiceManagementApprovalConfigurationFieldPolicy;
  };
  JiraServiceManagementApproversConfiguration?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementApproversConfigurationKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementApproversConfigurationKeySpecifier);
    fields?: JiraServiceManagementApproversConfigurationFieldPolicy;
  };
  JiraServiceManagementApprovalCondition?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementApprovalConditionKeySpecifier
      | (() => undefined | JiraServiceManagementApprovalConditionKeySpecifier);
    fields?: JiraServiceManagementApprovalConditionFieldPolicy;
  };
  JiraServiceManagementDecisionConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementDecisionConnectionKeySpecifier
      | (() => undefined | JiraServiceManagementDecisionConnectionKeySpecifier);
    fields?: JiraServiceManagementDecisionConnectionFieldPolicy;
  };
  JiraServiceManagementDecisionEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementDecisionEdgeKeySpecifier
      | (() => undefined | JiraServiceManagementDecisionEdgeKeySpecifier);
    fields?: JiraServiceManagementDecisionEdgeFieldPolicy;
  };
  JiraServiceManagementDecision?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraServiceManagementDecisionKeySpecifier
      | (() => undefined | JiraServiceManagementDecisionKeySpecifier);
    fields?: JiraServiceManagementDecisionFieldPolicy;
  };
  JiraServiceManagementApprovalStatus?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementApprovalStatusKeySpecifier
      | (() => undefined | JiraServiceManagementApprovalStatusKeySpecifier);
    fields?: JiraServiceManagementApprovalStatusFieldPolicy;
  };
  JiraServiceManagementApprovalField?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementApprovalFieldKeySpecifier
      | (() => undefined | JiraServiceManagementApprovalFieldKeySpecifier);
    fields?: JiraServiceManagementApprovalFieldFieldPolicy;
  };
  JiraServiceManagementCompletedApproval?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementCompletedApprovalKeySpecifier
      | (() => undefined | JiraServiceManagementCompletedApprovalKeySpecifier);
    fields?: JiraServiceManagementCompletedApprovalFieldPolicy;
  };
  JiraServiceManagementAttachment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraServiceManagementAttachmentKeySpecifier
      | (() => undefined | JiraServiceManagementAttachmentKeySpecifier);
    fields?: JiraServiceManagementAttachmentFieldPolicy;
  };
  JiraServiceManagementComment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraServiceManagementCommentKeySpecifier
      | (() => undefined | JiraServiceManagementCommentKeySpecifier);
    fields?: JiraServiceManagementCommentFieldPolicy;
  };
  JiraServiceManagementDateTimeField?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementDateTimeFieldKeySpecifier
      | (() => undefined | JiraServiceManagementDateTimeFieldKeySpecifier);
    fields?: JiraServiceManagementDateTimeFieldFieldPolicy;
  };
  JiraServiceManagementFeedback?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraServiceManagementFeedbackKeySpecifier
      | (() => undefined | JiraServiceManagementFeedbackKeySpecifier);
    fields?: JiraServiceManagementFeedbackFieldPolicy;
  };
  JiraServiceManagementIncident?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraServiceManagementIncidentKeySpecifier
      | (() => undefined | JiraServiceManagementIncidentKeySpecifier);
    fields?: JiraServiceManagementIncidentFieldPolicy;
  };
  JiraServiceManagementIncidentLinkingField?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementIncidentLinkingFieldKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementIncidentLinkingFieldKeySpecifier);
    fields?: JiraServiceManagementIncidentLinkingFieldFieldPolicy;
  };
  JiraServiceManagementIssueTypeHierarchyLevel?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementIssueTypeHierarchyLevelKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementIssueTypeHierarchyLevelKeySpecifier);
    fields?: JiraServiceManagementIssueTypeHierarchyLevelFieldPolicy;
  };
  JiraServiceManagementLanguage?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraServiceManagementLanguageKeySpecifier
      | (() => undefined | JiraServiceManagementLanguageKeySpecifier);
    fields?: JiraServiceManagementLanguageFieldPolicy;
  };
  JiraServiceManagementMultipleSelectUserPickerField?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementMultipleSelectUserPickerFieldKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementMultipleSelectUserPickerFieldKeySpecifier);
    fields?: JiraServiceManagementMultipleSelectUserPickerFieldFieldPolicy;
  };
  JiraServiceManagementOrganization?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementOrganizationKeySpecifier
      | (() => undefined | JiraServiceManagementOrganizationKeySpecifier);
    fields?: JiraServiceManagementOrganizationFieldPolicy;
  };
  JiraServiceManagementOrganizationConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementOrganizationConnectionKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementOrganizationConnectionKeySpecifier);
    fields?: JiraServiceManagementOrganizationConnectionFieldPolicy;
  };
  JiraServiceManagementOrganizationEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementOrganizationEdgeKeySpecifier
      | (() => undefined | JiraServiceManagementOrganizationEdgeKeySpecifier);
    fields?: JiraServiceManagementOrganizationEdgeFieldPolicy;
  };
  JiraServiceManagementOrganizationField?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementOrganizationFieldKeySpecifier
      | (() => undefined | JiraServiceManagementOrganizationFieldKeySpecifier);
    fields?: JiraServiceManagementOrganizationFieldFieldPolicy;
  };
  JiraServiceManagementPeopleField?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementPeopleFieldKeySpecifier
      | (() => undefined | JiraServiceManagementPeopleFieldKeySpecifier);
    fields?: JiraServiceManagementPeopleFieldFieldPolicy;
  };
  JiraServiceManagementRequestFeedbackField?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementRequestFeedbackFieldKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementRequestFeedbackFieldKeySpecifier);
    fields?: JiraServiceManagementRequestFeedbackFieldFieldPolicy;
  };
  JiraServiceManagementRequestLanguageField?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementRequestLanguageFieldKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementRequestLanguageFieldKeySpecifier);
    fields?: JiraServiceManagementRequestLanguageFieldFieldPolicy;
  };
  JiraServiceManagementRequestType?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementRequestTypeKeySpecifier
      | (() => undefined | JiraServiceManagementRequestTypeKeySpecifier);
    fields?: JiraServiceManagementRequestTypeFieldPolicy;
  };
  JiraServiceManagementRequestTypePractice?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementRequestTypePracticeKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementRequestTypePracticeKeySpecifier);
    fields?: JiraServiceManagementRequestTypePracticeFieldPolicy;
  };
  JiraServiceManagementRequestTypeConnection?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementRequestTypeConnectionKeySpecifier
      | (() =>
          | undefined
          | JiraServiceManagementRequestTypeConnectionKeySpecifier);
    fields?: JiraServiceManagementRequestTypeConnectionFieldPolicy;
  };
  JiraServiceManagementRequestTypeEdge?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementRequestTypeEdgeKeySpecifier
      | (() => undefined | JiraServiceManagementRequestTypeEdgeKeySpecifier);
    fields?: JiraServiceManagementRequestTypeEdgeFieldPolicy;
  };
  JiraServiceManagementRequestTypeField?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementRequestTypeFieldKeySpecifier
      | (() => undefined | JiraServiceManagementRequestTypeFieldKeySpecifier);
    fields?: JiraServiceManagementRequestTypeFieldFieldPolicy;
  };
  JiraServiceManagementTeamResponder?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementTeamResponderKeySpecifier
      | (() => undefined | JiraServiceManagementTeamResponderKeySpecifier);
    fields?: JiraServiceManagementTeamResponderFieldPolicy;
  };
  JiraServiceManagementUserResponder?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementUserResponderKeySpecifier
      | (() => undefined | JiraServiceManagementUserResponderKeySpecifier);
    fields?: JiraServiceManagementUserResponderFieldPolicy;
  };
  JiraServiceManagementRespondersField?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | JiraServiceManagementRespondersFieldKeySpecifier
      | (() => undefined | JiraServiceManagementRespondersFieldKeySpecifier);
    fields?: JiraServiceManagementRespondersFieldFieldPolicy;
  };
  JiraSingleGroupPickerField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraSingleGroupPickerFieldKeySpecifier
      | (() => undefined | JiraSingleGroupPickerFieldKeySpecifier);
    fields?: JiraSingleGroupPickerFieldFieldPolicy;
  };
  JiraSingleLineTextField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraSingleLineTextFieldKeySpecifier
      | (() => undefined | JiraSingleLineTextFieldKeySpecifier);
    fields?: JiraSingleLineTextFieldFieldPolicy;
  };
  JiraSingleSelectField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraSingleSelectFieldKeySpecifier
      | (() => undefined | JiraSingleSelectFieldKeySpecifier);
    fields?: JiraSingleSelectFieldFieldPolicy;
  };
  JiraSingleSelectUserPickerField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraSingleSelectUserPickerFieldKeySpecifier
      | (() => undefined | JiraSingleSelectUserPickerFieldKeySpecifier);
    fields?: JiraSingleSelectUserPickerFieldFieldPolicy;
  };
  JiraSingleVersionPickerField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraSingleVersionPickerFieldKeySpecifier
      | (() => undefined | JiraSingleVersionPickerFieldKeySpecifier);
    fields?: JiraSingleVersionPickerFieldFieldPolicy;
  };
  JiraSprintConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraSprintConnectionKeySpecifier
      | (() => undefined | JiraSprintConnectionKeySpecifier);
    fields?: JiraSprintConnectionFieldPolicy;
  };
  JiraSprintEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraSprintEdgeKeySpecifier
      | (() => undefined | JiraSprintEdgeKeySpecifier);
    fields?: JiraSprintEdgeFieldPolicy;
  };
  JiraSprintField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraSprintFieldKeySpecifier
      | (() => undefined | JiraSprintFieldKeySpecifier);
    fields?: JiraSprintFieldFieldPolicy;
  };
  JiraStatus?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraStatusKeySpecifier
      | (() => undefined | JiraStatusKeySpecifier);
    fields?: JiraStatusFieldPolicy;
  };
  JiraStatusField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraStatusFieldKeySpecifier
      | (() => undefined | JiraStatusFieldKeySpecifier);
    fields?: JiraStatusFieldFieldPolicy;
  };
  JiraSubtasksField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraSubtasksFieldKeySpecifier
      | (() => undefined | JiraSubtasksFieldKeySpecifier);
    fields?: JiraSubtasksFieldFieldPolicy;
  };
  JiraTeam?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraTeamKeySpecifier
      | (() => undefined | JiraTeamKeySpecifier);
    fields?: JiraTeamFieldPolicy;
  };
  JiraTeamConnection?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraTeamConnectionKeySpecifier
      | (() => undefined | JiraTeamConnectionKeySpecifier);
    fields?: JiraTeamConnectionFieldPolicy;
  };
  JiraTeamEdge?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraTeamEdgeKeySpecifier
      | (() => undefined | JiraTeamEdgeKeySpecifier);
    fields?: JiraTeamEdgeFieldPolicy;
  };
  JiraTeamField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraTeamFieldKeySpecifier
      | (() => undefined | JiraTeamFieldKeySpecifier);
    fields?: JiraTeamFieldFieldPolicy;
  };
  JiraTimeTrackingField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraTimeTrackingFieldKeySpecifier
      | (() => undefined | JiraTimeTrackingFieldKeySpecifier);
    fields?: JiraTimeTrackingFieldFieldPolicy;
  };
  JiraTimeTrackingSettings?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraTimeTrackingSettingsKeySpecifier
      | (() => undefined | JiraTimeTrackingSettingsKeySpecifier);
    fields?: JiraTimeTrackingSettingsFieldPolicy;
  };
  JiraUrlField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraUrlFieldKeySpecifier
      | (() => undefined | JiraUrlFieldKeySpecifier);
    fields?: JiraUrlFieldFieldPolicy;
  };
  JiraVote?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraVoteKeySpecifier
      | (() => undefined | JiraVoteKeySpecifier);
    fields?: JiraVoteFieldPolicy;
  };
  JiraVotesField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraVotesFieldKeySpecifier
      | (() => undefined | JiraVotesFieldKeySpecifier);
    fields?: JiraVotesFieldFieldPolicy;
  };
  JiraWatch?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraWatchKeySpecifier
      | (() => undefined | JiraWatchKeySpecifier);
    fields?: JiraWatchFieldPolicy;
  };
  JiraWatchesField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | JiraWatchesFieldKeySpecifier
      | (() => undefined | JiraWatchesFieldKeySpecifier);
    fields?: JiraWatchesFieldFieldPolicy;
  };
  MarketplaceAppDeploymentStep?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceAppDeploymentStepKeySpecifier
      | (() => undefined | MarketplaceAppDeploymentStepKeySpecifier);
    fields?: MarketplaceAppDeploymentStepFieldPolicy;
  };
  MarketplaceCloudAppDeployment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceCloudAppDeploymentKeySpecifier
      | (() => undefined | MarketplaceCloudAppDeploymentKeySpecifier);
    fields?: MarketplaceCloudAppDeploymentFieldPolicy;
  };
  MarketplaceConnectAppDeployment?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MarketplaceConnectAppDeploymentKeySpecifier
      | (() => undefined | MarketplaceConnectAppDeploymentKeySpecifier);
    fields?: MarketplaceConnectAppDeploymentFieldPolicy;
  };
  MarketplaceInstructionalAppDeployment?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | MarketplaceInstructionalAppDeploymentKeySpecifier
      | (() => undefined | MarketplaceInstructionalAppDeploymentKeySpecifier);
    fields?: MarketplaceInstructionalAppDeploymentFieldPolicy;
  };
  MarketplacePlugins1AppDeployment?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | MarketplacePlugins1AppDeploymentKeySpecifier
      | (() => undefined | MarketplacePlugins1AppDeploymentKeySpecifier);
    fields?: MarketplacePlugins1AppDeploymentFieldPolicy;
  };
  MarketplacePlugins2AppDeployment?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | MarketplacePlugins2AppDeploymentKeySpecifier
      | (() => undefined | MarketplacePlugins2AppDeploymentKeySpecifier);
    fields?: MarketplacePlugins2AppDeploymentFieldPolicy;
  };
  MarketplaceWorkflowAppDeployment?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | MarketplaceWorkflowAppDeploymentKeySpecifier
      | (() => undefined | MarketplaceWorkflowAppDeploymentKeySpecifier);
    fields?: MarketplaceWorkflowAppDeploymentFieldPolicy;
  };
  PolarisDecorationScheme?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisDecorationSchemeKeySpecifier
      | (() => undefined | PolarisDecorationSchemeKeySpecifier);
    fields?: PolarisDecorationSchemeFieldPolicy;
  };
  PolarisIdeaArchivedByField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaArchivedByFieldKeySpecifier
      | (() => undefined | PolarisIdeaArchivedByFieldKeySpecifier);
    fields?: PolarisIdeaArchivedByFieldFieldPolicy;
  };
  PolarisIdeaArchivedField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaArchivedFieldKeySpecifier
      | (() => undefined | PolarisIdeaArchivedFieldKeySpecifier);
    fields?: PolarisIdeaArchivedFieldFieldPolicy;
  };
  PolarisIdeaFieldOption?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaFieldOptionKeySpecifier
      | (() => undefined | PolarisIdeaFieldOptionKeySpecifier);
    fields?: PolarisIdeaFieldOptionFieldPolicy;
  };
  PolarisIdeaArchivedOnField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaArchivedOnFieldKeySpecifier
      | (() => undefined | PolarisIdeaArchivedOnFieldKeySpecifier);
    fields?: PolarisIdeaArchivedOnFieldFieldPolicy;
  };
  PolarisIdeaDateField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaDateFieldKeySpecifier
      | (() => undefined | PolarisIdeaDateFieldKeySpecifier);
    fields?: PolarisIdeaDateFieldFieldPolicy;
  };
  PolarisIdeaDateTimeField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaDateTimeFieldKeySpecifier
      | (() => undefined | PolarisIdeaDateTimeFieldKeySpecifier);
    fields?: PolarisIdeaDateTimeFieldFieldPolicy;
  };
  PolarisIdeaDocumentField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaDocumentFieldKeySpecifier
      | (() => undefined | PolarisIdeaDocumentFieldKeySpecifier);
    fields?: PolarisIdeaDocumentFieldFieldPolicy;
  };
  PolarisIdeaIssueCommentsField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaIssueCommentsFieldKeySpecifier
      | (() => undefined | PolarisIdeaIssueCommentsFieldKeySpecifier);
    fields?: PolarisIdeaIssueCommentsFieldFieldPolicy;
  };
  PolarisIdeaIssueIdField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaIssueIdFieldKeySpecifier
      | (() => undefined | PolarisIdeaIssueIdFieldKeySpecifier);
    fields?: PolarisIdeaIssueIdFieldFieldPolicy;
  };
  PolarisIdeaIssueTypeField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaIssueTypeFieldKeySpecifier
      | (() => undefined | PolarisIdeaIssueTypeFieldKeySpecifier);
    fields?: PolarisIdeaIssueTypeFieldFieldPolicy;
  };
  PolarisIdeaKeyField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaKeyFieldKeySpecifier
      | (() => undefined | PolarisIdeaKeyFieldKeySpecifier);
    fields?: PolarisIdeaKeyFieldFieldPolicy;
  };
  PolarisIdeaLabelsField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaLabelsFieldKeySpecifier
      | (() => undefined | PolarisIdeaLabelsFieldKeySpecifier);
    fields?: PolarisIdeaLabelsFieldFieldPolicy;
  };
  PolarisIdeaLinkedIssuesField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaLinkedIssuesFieldKeySpecifier
      | (() => undefined | PolarisIdeaLinkedIssuesFieldKeySpecifier);
    fields?: PolarisIdeaLinkedIssuesFieldFieldPolicy;
  };
  PolarisIdeaLinkedIssuesProgressField?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | PolarisIdeaLinkedIssuesProgressFieldKeySpecifier
      | (() => undefined | PolarisIdeaLinkedIssuesProgressFieldKeySpecifier);
    fields?: PolarisIdeaLinkedIssuesProgressFieldFieldPolicy;
  };
  PolarisIdeaNumberField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaNumberFieldKeySpecifier
      | (() => undefined | PolarisIdeaNumberFieldKeySpecifier);
    fields?: PolarisIdeaNumberFieldFieldPolicy;
  };
  PolarisIdeaOptionField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaOptionFieldKeySpecifier
      | (() => undefined | PolarisIdeaOptionFieldKeySpecifier);
    fields?: PolarisIdeaOptionFieldFieldPolicy;
  };
  PolarisIdeaOptionsField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaOptionsFieldKeySpecifier
      | (() => undefined | PolarisIdeaOptionsFieldKeySpecifier);
    fields?: PolarisIdeaOptionsFieldFieldPolicy;
  };
  PolarisIdeaSpecialField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaSpecialFieldKeySpecifier
      | (() => undefined | PolarisIdeaSpecialFieldKeySpecifier);
    fields?: PolarisIdeaSpecialFieldFieldPolicy;
  };
  PolarisIdeaStatusField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaStatusFieldKeySpecifier
      | (() => undefined | PolarisIdeaStatusFieldKeySpecifier);
    fields?: PolarisIdeaStatusFieldFieldPolicy;
  };
  PolarisIdeaStringField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaStringFieldKeySpecifier
      | (() => undefined | PolarisIdeaStringFieldKeySpecifier);
    fields?: PolarisIdeaStringFieldFieldPolicy;
  };
  PolarisIdeaUserField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaUserFieldKeySpecifier
      | (() => undefined | PolarisIdeaUserFieldKeySpecifier);
    fields?: PolarisIdeaUserFieldFieldPolicy;
  };
  PolarisIdeaUsersField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaUsersFieldKeySpecifier
      | (() => undefined | PolarisIdeaUsersFieldKeySpecifier);
    fields?: PolarisIdeaUsersFieldFieldPolicy;
  };
  PolarisIdeaVotesField?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | PolarisIdeaVotesFieldKeySpecifier
      | (() => undefined | PolarisIdeaVotesFieldKeySpecifier);
    fields?: PolarisIdeaVotesFieldFieldPolicy;
  };
  RoadmapProject?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoadmapProjectKeySpecifier
      | (() => undefined | RoadmapProjectKeySpecifier);
    fields?: RoadmapProjectFieldPolicy;
  };
  _AppliedDirective?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | _AppliedDirectiveKeySpecifier
      | (() => undefined | _AppliedDirectiveKeySpecifier);
    fields?: _AppliedDirectiveFieldPolicy;
  };
  _DirectiveArgument?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | _DirectiveArgumentKeySpecifier
      | (() => undefined | _DirectiveArgumentKeySpecifier);
    fields?: _DirectiveArgumentFieldPolicy;
  };
  SearchConfluencePageBlogAttachment?: Omit<
    TypePolicy,
    'fields' | 'keyFields'
  > & {
    keyFields?:
      | false
      | SearchConfluencePageBlogAttachmentKeySpecifier
      | (() => undefined | SearchConfluencePageBlogAttachmentKeySpecifier);
    fields?: SearchConfluencePageBlogAttachmentFieldPolicy;
  };
  SearchSpace?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SearchSpaceKeySpecifier
      | (() => undefined | SearchSpaceKeySpecifier);
    fields?: SearchSpaceFieldPolicy;
  };
  SearchConfluenceSpace?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SearchConfluenceSpaceKeySpecifier
      | (() => undefined | SearchConfluenceSpaceKeySpecifier);
    fields?: SearchConfluenceSpaceFieldPolicy;
  };
  SearchDefaultResult?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SearchDefaultResultKeySpecifier
      | (() => undefined | SearchDefaultResultKeySpecifier);
    fields?: SearchDefaultResultFieldPolicy;
  };
};
