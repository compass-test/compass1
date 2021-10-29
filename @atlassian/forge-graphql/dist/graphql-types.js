"use strict";
//==============================================================
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */
// @generated
// This file was automatically generated and should not be edited.
//==============================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventKnownAvIs = exports.EpicView = exports.DevStatusActivity = exports.DevOpsServiceRelationshipType = exports.DevOpsServiceAndRepositoryRelationshipSortBy = exports.DevOpsServiceAndJiraProjectRelationshipType = exports.DevOpsRepositoryHostingProviderFilter = exports.DevOpsRelationshipCertaintyFilter = exports.DevOpsRelationshipCertainty = exports.DevOpsMetricsRollupOption = exports.DevOpsMetricsResolutionUnit = exports.DevOpsMetricsCycleTimePhase = exports.DevOpsJiraProjectType = exports.DevOpsEnvironmentCategory = exports.DeploymentState = exports.ComponentSyncEventStatus = exports.CompassScorecardImportance = exports.CompassRelationshipType = exports.CompassQuerySortOrder = exports.CompassLinkType = exports.CompassFieldType = exports.CompassEventType = exports.CompassDeploymentEventState = exports.CompassDeploymentEventEnvironmentCategory = exports.CompassComponentType = exports.CardHierarchyLevelEnumType = exports.BuiltinPolarisIdeaField = exports.BoardFeatureToggleStatus = exports.BoardFeatureStatus = exports.BitbucketPermission = exports.AtlassianProductHostingType = exports.AppTaskState = exports.AppStoredEntityCondition = exports.AppSecurityPoliciesPermissionTypeExtension = exports.AppSecurityPoliciesPermissionType = exports.AppNetworkPermissionTypeExtension = exports.AppNetworkPermissionType = exports.AppEnvironmentType = exports.AppDeploymentStepStatus = exports.AppDeploymentStatus = exports.AppDeploymentEventLogLevel = exports.ApiGroup = exports.ApiContext = exports.ActivityProduct = exports.ActivityObjectType = exports.ActivityEventType = exports.ActivitiesObjectType = exports.ActivitiesFilterType = exports.ActivitiesContainerType = exports.AccountStatus = void 0;
exports.PolarisResolvedObjectAuthType = exports.PolarisRefreshError = exports.PolarisPlayKind = exports.PolarisFieldType = exports.PolarisCommentKind = exports.MarketplacePricingTierType = exports.MarketplacePricingTierPolicy = exports.MarketplacePricingTierMode = exports.MarketplacePricingPlanStatus = exports.MarketplacePartnerType = exports.MarketplacePartnerSupportHolidayFrequency = exports.MarketplaceLocation = exports.MarketplaceListingStatus = exports.MarketplaceEntityStatus = exports.MarketplaceCloudFortifiedStatus = exports.MarketplaceBillingCycle = exports.MarketplaceAppVersionVisibility = exports.MarketplaceAppPermission = exports.MarketplaceAppPaymentModel = exports.LicenseOverrideState = exports.JiraVersionStatus = exports.JiraTimeUnit = exports.JiraTimeFormat = exports.JiraStatusCategoryColor = exports.JiraSprintState = exports.JiraReviewState = exports.JiraReleasesIssueReleaseStatusFilter = exports.JiraReleasesEpicReleaseStatusFilter = exports.JiraPullRequestState = exports.JiraProjectType = exports.JiraProjectSortField = exports.JiraProjectPermissionCategoryEnum = exports.JiraProjectAndRepositoryRelationshipSortBy = exports.JiraJqlOperator = exports.JiraJqlClauseType = exports.JiraJqlBuilderMode = exports.JiraJqlAutocompleteType = exports.JiraIssueLinkDirection = exports.JiraGrantTypeKeyEnum = exports.JiraDevOpsIssuePanelState = exports.JiraDevOpsIssuePanelBannerType = exports.JiraCascadingSelectOptionType = exports.JiraAttachmentsPermissions = exports.IssueDevOpsPullRequestStatus = exports.IssueDevOpsDeploymentState = exports.IssueDevOpsDeploymentEnvironmentType = exports.IssueDevOpsCommitChangeType = exports.GrantCheckProduct = exports.FunctionTriggerType = exports.EventMatchingStrategies = void 0;
exports.SwimlaneStrategy = exports.SupportRequestStatusCategory = exports.SupportRequestQueryStatusCategory = exports.SupportRequestQueryOwnership = exports.SprintState = exports.SprintReportsEstimationStatisticType = exports.SortDirection = exports.SoftwareCardsDestinationEnum = exports.Scope = exports.RoadmapVersionStatus = exports.RoadmapTimelineMode = exports.RoadmapSprintState = exports.RoadmapPaletteColor = exports.RateLimitingCurrency = exports.Product = exports.PolarisVisualizationType = exports.PolarisViewSetType = exports.PolarisViewFilterOperator = exports.PolarisViewFilterKind = exports.PolarisValueOperator = exports.PolarisSortOrder = exports.PolarisSnippetPropertyKind = void 0;
/**
 * "
 * The lifecycle status of the account
 */
var AccountStatus;
(function (AccountStatus) {
    /** The account is an active account */
    AccountStatus["Active"] = "active";
    /** The account has been closed */
    AccountStatus["Closed"] = "closed";
    /** The account is no longer an active account */
    AccountStatus["Inactive"] = "inactive";
})(AccountStatus = exports.AccountStatus || (exports.AccountStatus = {}));
var ActivitiesContainerType;
(function (ActivitiesContainerType) {
    ActivitiesContainerType["Project"] = "PROJECT";
    ActivitiesContainerType["Site"] = "SITE";
    ActivitiesContainerType["Space"] = "SPACE";
})(ActivitiesContainerType = exports.ActivitiesContainerType || (exports.ActivitiesContainerType = {}));
var ActivitiesFilterType;
(function (ActivitiesFilterType) {
    ActivitiesFilterType["And"] = "AND";
    ActivitiesFilterType["Or"] = "OR";
})(ActivitiesFilterType = exports.ActivitiesFilterType || (exports.ActivitiesFilterType = {}));
var ActivitiesObjectType;
(function (ActivitiesObjectType) {
    ActivitiesObjectType["Blogpost"] = "BLOGPOST";
    ActivitiesObjectType["Issue"] = "ISSUE";
    ActivitiesObjectType["Page"] = "PAGE";
})(ActivitiesObjectType = exports.ActivitiesObjectType || (exports.ActivitiesObjectType = {}));
var ActivityEventType;
(function (ActivityEventType) {
    ActivityEventType["Assigned"] = "ASSIGNED";
    ActivityEventType["Commented"] = "COMMENTED";
    ActivityEventType["Created"] = "CREATED";
    ActivityEventType["Edited"] = "EDITED";
    ActivityEventType["Liked"] = "LIKED";
    ActivityEventType["Published"] = "PUBLISHED";
    ActivityEventType["Transitioned"] = "TRANSITIONED";
    ActivityEventType["Unassigned"] = "UNASSIGNED";
    ActivityEventType["Updated"] = "UPDATED";
    ActivityEventType["Viewed"] = "VIEWED";
})(ActivityEventType = exports.ActivityEventType || (exports.ActivityEventType = {}));
var ActivityObjectType;
(function (ActivityObjectType) {
    ActivityObjectType["Blogpost"] = "BLOGPOST";
    ActivityObjectType["Comment"] = "COMMENT";
    ActivityObjectType["Issue"] = "ISSUE";
    ActivityObjectType["Page"] = "PAGE";
    ActivityObjectType["Project"] = "PROJECT";
    ActivityObjectType["Site"] = "SITE";
    ActivityObjectType["Space"] = "SPACE";
    ActivityObjectType["Task"] = "TASK";
})(ActivityObjectType = exports.ActivityObjectType || (exports.ActivityObjectType = {}));
var ActivityProduct;
(function (ActivityProduct) {
    ActivityProduct["Confluence"] = "CONFLUENCE";
    ActivityProduct["Jira"] = "JIRA";
    ActivityProduct["JiraBusiness"] = "JIRA_BUSINESS";
    ActivityProduct["JiraOps"] = "JIRA_OPS";
    ActivityProduct["JiraServiceDesk"] = "JIRA_SERVICE_DESK";
    ActivityProduct["JiraSoftware"] = "JIRA_SOFTWARE";
})(ActivityProduct = exports.ActivityProduct || (exports.ActivityProduct = {}));
/** Only used for inside the schema to mark the context for generic types */
var ApiContext;
(function (ApiContext) {
    ApiContext["Devops"] = "DEVOPS";
})(ApiContext = exports.ApiContext || (exports.ApiContext = {}));
/**
 * This enum is the names of API groupings within the total Atlassian API.
 *
 * This is used by our documentation tooling to group together types and fields into logical groups
 */
var ApiGroup;
(function (ApiGroup) {
    ApiGroup["Caas"] = "CAAS";
    ApiGroup["Compass"] = "COMPASS";
    ApiGroup["DevopsContainerRelationship"] = "DEVOPS_CONTAINER_RELATIONSHIP";
    ApiGroup["DevopsService"] = "DEVOPS_SERVICE";
    ApiGroup["Forge"] = "FORGE";
    ApiGroup["Jira"] = "JIRA";
    ApiGroup["Polaris"] = "POLARIS";
    ApiGroup["XenLogsApi"] = "XEN_LOGS_API";
})(ApiGroup = exports.ApiGroup || (exports.ApiGroup = {}));
var AppDeploymentEventLogLevel;
(function (AppDeploymentEventLogLevel) {
    AppDeploymentEventLogLevel["Error"] = "ERROR";
    AppDeploymentEventLogLevel["Info"] = "INFO";
    AppDeploymentEventLogLevel["Warning"] = "WARNING";
})(AppDeploymentEventLogLevel = exports.AppDeploymentEventLogLevel || (exports.AppDeploymentEventLogLevel = {}));
var AppDeploymentStatus;
(function (AppDeploymentStatus) {
    AppDeploymentStatus["Done"] = "DONE";
    AppDeploymentStatus["Failed"] = "FAILED";
    AppDeploymentStatus["InProgress"] = "IN_PROGRESS";
})(AppDeploymentStatus = exports.AppDeploymentStatus || (exports.AppDeploymentStatus = {}));
var AppDeploymentStepStatus;
(function (AppDeploymentStepStatus) {
    AppDeploymentStepStatus["Done"] = "DONE";
    AppDeploymentStepStatus["Failed"] = "FAILED";
    AppDeploymentStepStatus["Started"] = "STARTED";
})(AppDeploymentStepStatus = exports.AppDeploymentStepStatus || (exports.AppDeploymentStepStatus = {}));
var AppEnvironmentType;
(function (AppEnvironmentType) {
    AppEnvironmentType["Development"] = "DEVELOPMENT";
    AppEnvironmentType["Production"] = "PRODUCTION";
    AppEnvironmentType["Staging"] = "STAGING";
})(AppEnvironmentType = exports.AppEnvironmentType || (exports.AppEnvironmentType = {}));
var AppNetworkPermissionType;
(function (AppNetworkPermissionType) {
    AppNetworkPermissionType["FetchBackendSide"] = "FETCH_BACKEND_SIDE";
    AppNetworkPermissionType["FetchClientSide"] = "FETCH_CLIENT_SIDE";
    AppNetworkPermissionType["Fonts"] = "FONTS";
    AppNetworkPermissionType["Frames"] = "FRAMES";
    AppNetworkPermissionType["Images"] = "IMAGES";
    AppNetworkPermissionType["Media"] = "MEDIA";
    AppNetworkPermissionType["Navigation"] = "NAVIGATION";
    AppNetworkPermissionType["Scripts"] = "SCRIPTS";
    AppNetworkPermissionType["Styles"] = "STYLES";
})(AppNetworkPermissionType = exports.AppNetworkPermissionType || (exports.AppNetworkPermissionType = {}));
var AppNetworkPermissionTypeExtension;
(function (AppNetworkPermissionTypeExtension) {
    AppNetworkPermissionTypeExtension["FetchBackendSide"] = "FETCH_BACKEND_SIDE";
    AppNetworkPermissionTypeExtension["FetchClientSide"] = "FETCH_CLIENT_SIDE";
    AppNetworkPermissionTypeExtension["Fonts"] = "FONTS";
    AppNetworkPermissionTypeExtension["Frames"] = "FRAMES";
    AppNetworkPermissionTypeExtension["Images"] = "IMAGES";
    AppNetworkPermissionTypeExtension["Media"] = "MEDIA";
    AppNetworkPermissionTypeExtension["Navigation"] = "NAVIGATION";
    AppNetworkPermissionTypeExtension["Scripts"] = "SCRIPTS";
    AppNetworkPermissionTypeExtension["Styles"] = "STYLES";
})(AppNetworkPermissionTypeExtension = exports.AppNetworkPermissionTypeExtension || (exports.AppNetworkPermissionTypeExtension = {}));
var AppSecurityPoliciesPermissionType;
(function (AppSecurityPoliciesPermissionType) {
    AppSecurityPoliciesPermissionType["Scripts"] = "SCRIPTS";
    AppSecurityPoliciesPermissionType["Styles"] = "STYLES";
})(AppSecurityPoliciesPermissionType = exports.AppSecurityPoliciesPermissionType || (exports.AppSecurityPoliciesPermissionType = {}));
var AppSecurityPoliciesPermissionTypeExtension;
(function (AppSecurityPoliciesPermissionTypeExtension) {
    AppSecurityPoliciesPermissionTypeExtension["Scripts"] = "SCRIPTS";
    AppSecurityPoliciesPermissionTypeExtension["Styles"] = "STYLES";
})(AppSecurityPoliciesPermissionTypeExtension = exports.AppSecurityPoliciesPermissionTypeExtension || (exports.AppSecurityPoliciesPermissionTypeExtension = {}));
var AppStoredEntityCondition;
(function (AppStoredEntityCondition) {
    AppStoredEntityCondition["StartsWith"] = "STARTS_WITH";
})(AppStoredEntityCondition = exports.AppStoredEntityCondition || (exports.AppStoredEntityCondition = {}));
var AppTaskState;
(function (AppTaskState) {
    AppTaskState["Complete"] = "COMPLETE";
    AppTaskState["Failed"] = "FAILED";
    AppTaskState["Pending"] = "PENDING";
    AppTaskState["Running"] = "RUNNING";
})(AppTaskState = exports.AppTaskState || (exports.AppTaskState = {}));
/** Hosting type where Atlassian product instance is installed. */
var AtlassianProductHostingType;
(function (AtlassianProductHostingType) {
    AtlassianProductHostingType["Cloud"] = "CLOUD";
    AtlassianProductHostingType["DataCenter"] = "DATA_CENTER";
    AtlassianProductHostingType["Server"] = "SERVER";
})(AtlassianProductHostingType = exports.AtlassianProductHostingType || (exports.AtlassianProductHostingType = {}));
/** Bitbucket Permission Enum */
var BitbucketPermission;
(function (BitbucketPermission) {
    /** Bitbucket admin permission */
    BitbucketPermission["Admin"] = "ADMIN";
})(BitbucketPermission = exports.BitbucketPermission || (exports.BitbucketPermission = {}));
var BoardFeatureStatus;
(function (BoardFeatureStatus) {
    BoardFeatureStatus["ComingSoon"] = "COMING_SOON";
    BoardFeatureStatus["Disabled"] = "DISABLED";
    BoardFeatureStatus["Enabled"] = "ENABLED";
})(BoardFeatureStatus = exports.BoardFeatureStatus || (exports.BoardFeatureStatus = {}));
var BoardFeatureToggleStatus;
(function (BoardFeatureToggleStatus) {
    BoardFeatureToggleStatus["Disabled"] = "DISABLED";
    BoardFeatureToggleStatus["Enabled"] = "ENABLED";
})(BoardFeatureToggleStatus = exports.BoardFeatureToggleStatus || (exports.BoardFeatureToggleStatus = {}));
var BuiltinPolarisIdeaField;
(function (BuiltinPolarisIdeaField) {
    /**  Jira Product Discovery fields */
    BuiltinPolarisIdeaField["Archived"] = "ARCHIVED";
    BuiltinPolarisIdeaField["ArchivedBy"] = "ARCHIVED_BY";
    BuiltinPolarisIdeaField["ArchivedOn"] = "ARCHIVED_ON";
    /**  Jira fields */
    BuiltinPolarisIdeaField["Assignee"] = "ASSIGNEE";
    BuiltinPolarisIdeaField["Created"] = "CREATED";
    BuiltinPolarisIdeaField["Creator"] = "CREATOR";
    BuiltinPolarisIdeaField["DeliveryProgress"] = "DELIVERY_PROGRESS";
    BuiltinPolarisIdeaField["DeliveryStatus"] = "DELIVERY_STATUS";
    BuiltinPolarisIdeaField["Description"] = "DESCRIPTION";
    BuiltinPolarisIdeaField["IssueComments"] = "ISSUE_COMMENTS";
    BuiltinPolarisIdeaField["IssueId"] = "ISSUE_ID";
    BuiltinPolarisIdeaField["IssueType"] = "ISSUE_TYPE";
    BuiltinPolarisIdeaField["Key"] = "KEY";
    BuiltinPolarisIdeaField["Labels"] = "LABELS";
    BuiltinPolarisIdeaField["LinkedIssues"] = "LINKED_ISSUES";
    BuiltinPolarisIdeaField["NumDataPoints"] = "NUM_DATA_POINTS";
    BuiltinPolarisIdeaField["Reporter"] = "REPORTER";
    BuiltinPolarisIdeaField["Status"] = "STATUS";
    BuiltinPolarisIdeaField["Summary"] = "SUMMARY";
    BuiltinPolarisIdeaField["Updated"] = "UPDATED";
    BuiltinPolarisIdeaField["Votes"] = "VOTES";
})(BuiltinPolarisIdeaField = exports.BuiltinPolarisIdeaField || (exports.BuiltinPolarisIdeaField = {}));
var CardHierarchyLevelEnumType;
(function (CardHierarchyLevelEnumType) {
    CardHierarchyLevelEnumType["Base"] = "BASE";
    CardHierarchyLevelEnumType["Child"] = "CHILD";
    CardHierarchyLevelEnumType["Parent"] = "PARENT";
})(CardHierarchyLevelEnumType = exports.CardHierarchyLevelEnumType || (exports.CardHierarchyLevelEnumType = {}));
/** Identifies the type of component. */
var CompassComponentType;
(function (CompassComponentType) {
    /** A standalone software artifact that is directly consumable by an end-user. */
    CompassComponentType["Application"] = "APPLICATION";
    /** A standalone software artifact that provides some functionality for other software via embedding. */
    CompassComponentType["Library"] = "LIBRARY";
    /** A software artifact that does not fit into the pre-defined categories. */
    CompassComponentType["Other"] = "OTHER";
    /** A software artifact that provides some functionality for other software over the network. */
    CompassComponentType["Service"] = "SERVICE";
})(CompassComponentType = exports.CompassComponentType || (exports.CompassComponentType = {}));
var CompassDeploymentEventEnvironmentCategory;
(function (CompassDeploymentEventEnvironmentCategory) {
    CompassDeploymentEventEnvironmentCategory["Development"] = "DEVELOPMENT";
    CompassDeploymentEventEnvironmentCategory["Production"] = "PRODUCTION";
    CompassDeploymentEventEnvironmentCategory["Staging"] = "STAGING";
    CompassDeploymentEventEnvironmentCategory["Testing"] = "TESTING";
    CompassDeploymentEventEnvironmentCategory["Unmapped"] = "UNMAPPED";
})(CompassDeploymentEventEnvironmentCategory = exports.CompassDeploymentEventEnvironmentCategory || (exports.CompassDeploymentEventEnvironmentCategory = {}));
/**  Compass Deployment Event */
var CompassDeploymentEventState;
(function (CompassDeploymentEventState) {
    CompassDeploymentEventState["Cancelled"] = "CANCELLED";
    CompassDeploymentEventState["Failed"] = "FAILED";
    CompassDeploymentEventState["InProgress"] = "IN_PROGRESS";
    CompassDeploymentEventState["Pending"] = "PENDING";
    CompassDeploymentEventState["RolledBack"] = "ROLLED_BACK";
    CompassDeploymentEventState["Successful"] = "SUCCESSFUL";
    CompassDeploymentEventState["Unknown"] = "UNKNOWN";
})(CompassDeploymentEventState = exports.CompassDeploymentEventState || (exports.CompassDeploymentEventState = {}));
var CompassEventType;
(function (CompassEventType) {
    CompassEventType["Deployment"] = "DEPLOYMENT";
})(CompassEventType = exports.CompassEventType || (exports.CompassEventType = {}));
/** Specifies the type of value for a field. */
var CompassFieldType;
(function (CompassFieldType) {
    CompassFieldType["Date"] = "DATE";
    CompassFieldType["Enum"] = "ENUM";
    CompassFieldType["Number"] = "NUMBER";
    CompassFieldType["Text"] = "TEXT";
})(CompassFieldType = exports.CompassFieldType || (exports.CompassFieldType = {}));
/** The types used to identify the intent of the link. */
var CompassLinkType;
(function (CompassLinkType) {
    /** Chat Channels for contacting the owners/support of the component */
    CompassLinkType["ChatChannel"] = "CHAT_CHANNEL";
    /** A link to the dashboard of the component. */
    CompassLinkType["Dashboard"] = "DASHBOARD";
    /** A link to the documentation of the component. */
    CompassLinkType["Document"] = "DOCUMENT";
    /** A link to the on-call schedule of the component. */
    CompassLinkType["OnCall"] = "ON_CALL";
    /** Other link for a Component. */
    CompassLinkType["OtherLink"] = "OTHER_LINK";
    /** A link to the Jira or third-party project of the component. */
    CompassLinkType["Project"] = "PROJECT";
    /** A link to the source code repository of the component. */
    CompassLinkType["Repository"] = "REPOSITORY";
})(CompassLinkType = exports.CompassLinkType || (exports.CompassLinkType = {}));
var CompassQuerySortOrder;
(function (CompassQuerySortOrder) {
    CompassQuerySortOrder["Asc"] = "ASC";
    CompassQuerySortOrder["Desc"] = "DESC";
})(CompassQuerySortOrder = exports.CompassQuerySortOrder || (exports.CompassQuerySortOrder = {}));
/** Defines the relationship types. A relationship must be one of these types. */
var CompassRelationshipType;
(function (CompassRelationshipType) {
    CompassRelationshipType["DependsOn"] = "DEPENDS_ON";
})(CompassRelationshipType = exports.CompassRelationshipType || (exports.CompassRelationshipType = {}));
/** The types used to identify the importance of the scorecard. */
var CompassScorecardImportance;
(function (CompassScorecardImportance) {
    /** Recommended to the component's owner when they select a scorecard to apply to their component. */
    CompassScorecardImportance["Recommended"] = "RECOMMENDED";
    /** Automatically applied to all components of the specified type or types and cannot be removed. */
    CompassScorecardImportance["Required"] = "REQUIRED";
    /** Custom scorecard, focused on specific use cases within teams or departments. */
    CompassScorecardImportance["UserDefined"] = "USER_DEFINED";
})(CompassScorecardImportance = exports.CompassScorecardImportance || (exports.CompassScorecardImportance = {}));
/** Status types of a data manager sync event. */
var ComponentSyncEventStatus;
(function (ComponentSyncEventStatus) {
    /** A Compass internal server issue prevented the sync from occurring. */
    ComponentSyncEventStatus["ServerError"] = "SERVER_ERROR";
    /** The component updates were successfully synced to Compass. */
    ComponentSyncEventStatus["Success"] = "SUCCESS";
    /** An issue with the calling app or user input prevented the component from syncing to Compass. */
    ComponentSyncEventStatus["UserError"] = "USER_ERROR";
})(ComponentSyncEventStatus = exports.ComponentSyncEventStatus || (exports.ComponentSyncEventStatus = {}));
/** The state that a code deployment can be in (think of a deployment in Bitbucket Pipelines, CircleCI, etc). */
var DeploymentState;
(function (DeploymentState) {
    DeploymentState["Cancelled"] = "CANCELLED";
    DeploymentState["Failed"] = "FAILED";
    DeploymentState["InProgress"] = "IN_PROGRESS";
    DeploymentState["Pending"] = "PENDING";
    DeploymentState["RolledBack"] = "ROLLED_BACK";
    DeploymentState["Successful"] = "SUCCESSFUL";
    DeploymentState["Unknown"] = "UNKNOWN";
})(DeploymentState = exports.DeploymentState || (exports.DeploymentState = {}));
/**
 * The types of environments that a code change can be released to.
 *
 * The release may be via a code deployment or via a feature flag change.
 */
var DevOpsEnvironmentCategory;
(function (DevOpsEnvironmentCategory) {
    DevOpsEnvironmentCategory["Development"] = "DEVELOPMENT";
    DevOpsEnvironmentCategory["Production"] = "PRODUCTION";
    DevOpsEnvironmentCategory["Staging"] = "STAGING";
    DevOpsEnvironmentCategory["Testing"] = "TESTING";
    DevOpsEnvironmentCategory["Unmapped"] = "UNMAPPED";
})(DevOpsEnvironmentCategory = exports.DevOpsEnvironmentCategory || (exports.DevOpsEnvironmentCategory = {}));
var DevOpsJiraProjectType;
(function (DevOpsJiraProjectType) {
    DevOpsJiraProjectType["JiraCore"] = "JIRA_CORE";
    DevOpsJiraProjectType["JiraServicedesk"] = "JIRA_SERVICEDESK";
    DevOpsJiraProjectType["JiraSoftware"] = "JIRA_SOFTWARE";
})(DevOpsJiraProjectType = exports.DevOpsJiraProjectType || (exports.DevOpsJiraProjectType = {}));
var DevOpsMetricsCycleTimePhase;
(function (DevOpsMetricsCycleTimePhase) {
    /** Development phase from initial code commit to deployed code. */
    DevOpsMetricsCycleTimePhase["CommitToDeployment"] = "COMMIT_TO_DEPLOYMENT";
    /** Development phase from initial code commit to opened pull request. */
    DevOpsMetricsCycleTimePhase["CommitToPr"] = "COMMIT_TO_PR";
})(DevOpsMetricsCycleTimePhase = exports.DevOpsMetricsCycleTimePhase || (exports.DevOpsMetricsCycleTimePhase = {}));
/** Unit for specified resolution value. */
var DevOpsMetricsResolutionUnit;
(function (DevOpsMetricsResolutionUnit) {
    DevOpsMetricsResolutionUnit["Day"] = "DAY";
    DevOpsMetricsResolutionUnit["Hour"] = "HOUR";
    DevOpsMetricsResolutionUnit["Week"] = "WEEK";
})(DevOpsMetricsResolutionUnit = exports.DevOpsMetricsResolutionUnit || (exports.DevOpsMetricsResolutionUnit = {}));
var DevOpsMetricsRollupOption;
(function (DevOpsMetricsRollupOption) {
    DevOpsMetricsRollupOption["Mean"] = "MEAN";
    DevOpsMetricsRollupOption["Percentile"] = "PERCENTILE";
})(DevOpsMetricsRollupOption = exports.DevOpsMetricsRollupOption || (exports.DevOpsMetricsRollupOption = {}));
var DevOpsRelationshipCertainty;
(function (DevOpsRelationshipCertainty) {
    /** The relationship was created by a user. */
    DevOpsRelationshipCertainty["Explicit"] = "EXPLICIT";
    /** The relationship was inferred by a system. */
    DevOpsRelationshipCertainty["Implicit"] = "IMPLICIT";
})(DevOpsRelationshipCertainty = exports.DevOpsRelationshipCertainty || (exports.DevOpsRelationshipCertainty = {}));
var DevOpsRelationshipCertaintyFilter;
(function (DevOpsRelationshipCertaintyFilter) {
    /** Return all relationships. */
    DevOpsRelationshipCertaintyFilter["All"] = "ALL";
    /** Return only relationships created by a user. */
    DevOpsRelationshipCertaintyFilter["Explicit"] = "EXPLICIT";
    /** Return only relationships inferred by a system. */
    DevOpsRelationshipCertaintyFilter["Implicit"] = "IMPLICIT";
})(DevOpsRelationshipCertaintyFilter = exports.DevOpsRelationshipCertaintyFilter || (exports.DevOpsRelationshipCertaintyFilter = {}));
var DevOpsRepositoryHostingProviderFilter;
(function (DevOpsRepositoryHostingProviderFilter) {
    DevOpsRepositoryHostingProviderFilter["All"] = "ALL";
    DevOpsRepositoryHostingProviderFilter["BitbucketCloud"] = "BITBUCKET_CLOUD";
    DevOpsRepositoryHostingProviderFilter["ThirdParty"] = "THIRD_PARTY";
})(DevOpsRepositoryHostingProviderFilter = exports.DevOpsRepositoryHostingProviderFilter || (exports.DevOpsRepositoryHostingProviderFilter = {}));
var DevOpsServiceAndJiraProjectRelationshipType;
(function (DevOpsServiceAndJiraProjectRelationshipType) {
    /** A relationship created for the change management feature */
    DevOpsServiceAndJiraProjectRelationshipType["ChangeManagement"] = "CHANGE_MANAGEMENT";
    /** A standard relationship */
    DevOpsServiceAndJiraProjectRelationshipType["Default"] = "DEFAULT";
})(DevOpsServiceAndJiraProjectRelationshipType = exports.DevOpsServiceAndJiraProjectRelationshipType || (exports.DevOpsServiceAndJiraProjectRelationshipType = {}));
var DevOpsServiceAndRepositoryRelationshipSortBy;
(function (DevOpsServiceAndRepositoryRelationshipSortBy) {
    DevOpsServiceAndRepositoryRelationshipSortBy["LastInferredAt"] = "LAST_INFERRED_AT";
})(DevOpsServiceAndRepositoryRelationshipSortBy = exports.DevOpsServiceAndRepositoryRelationshipSortBy || (exports.DevOpsServiceAndRepositoryRelationshipSortBy = {}));
/** #################### Enums ##################### */
var DevOpsServiceRelationshipType;
(function (DevOpsServiceRelationshipType) {
    DevOpsServiceRelationshipType["Contains"] = "CONTAINS";
    DevOpsServiceRelationshipType["DependsOn"] = "DEPENDS_ON";
})(DevOpsServiceRelationshipType = exports.DevOpsServiceRelationshipType || (exports.DevOpsServiceRelationshipType = {}));
var DevStatusActivity;
(function (DevStatusActivity) {
    DevStatusActivity["BranchOpen"] = "BRANCH_OPEN";
    DevStatusActivity["Commit"] = "COMMIT";
    DevStatusActivity["PrDeclined"] = "PR_DECLINED";
    DevStatusActivity["PrMerged"] = "PR_MERGED";
    DevStatusActivity["PrOpen"] = "PR_OPEN";
})(DevStatusActivity = exports.DevStatusActivity || (exports.DevStatusActivity = {}));
/** View settings for epics on the roadmap */
var EpicView;
(function (EpicView) {
    /** All epics regardless of status */
    EpicView["All"] = "ALL";
    /** Epics with status complete */
    EpicView["Completed"] = "COMPLETED";
    /** Epics with status incomplete */
    EpicView["Incomplete"] = "INCOMPLETE";
})(EpicView = exports.EpicView || (exports.EpicView = {}));
var EventKnownAvIs;
(function (EventKnownAvIs) {
    EventKnownAvIs["AviBitbucketPrCreated"] = "AVI_BITBUCKET_PR_CREATED";
    EventKnownAvIs["AviJiraIssueCreated"] = "AVI_JIRA_ISSUE_CREATED";
    EventKnownAvIs["AviJiraIssueUpdated"] = "AVI_JIRA_ISSUE_UPDATED";
})(EventKnownAvIs = exports.EventKnownAvIs || (exports.EventKnownAvIs = {}));
var EventMatchingStrategies;
(function (EventMatchingStrategies) {
    EventMatchingStrategies["BitbucketByRepo"] = "BITBUCKET_BY_REPO";
    EventMatchingStrategies["JiraByIssue"] = "JIRA_BY_ISSUE";
    /** This strategy will look ar Jira events and match on cloud id and project id */
    EventMatchingStrategies["JiraByProject"] = "JIRA_BY_PROJECT";
})(EventMatchingStrategies = exports.EventMatchingStrategies || (exports.EventMatchingStrategies = {}));
/** Which type of trigger */
var FunctionTriggerType;
(function (FunctionTriggerType) {
    FunctionTriggerType["Frontend"] = "FRONTEND";
    FunctionTriggerType["Manual"] = "MANUAL";
    FunctionTriggerType["Product"] = "PRODUCT";
    FunctionTriggerType["Web"] = "WEB";
})(FunctionTriggerType = exports.FunctionTriggerType || (exports.FunctionTriggerType = {}));
var GrantCheckProduct;
(function (GrantCheckProduct) {
    GrantCheckProduct["Compass"] = "COMPASS";
    GrantCheckProduct["Confluence"] = "CONFLUENCE";
    GrantCheckProduct["Jira"] = "JIRA";
    GrantCheckProduct["JiraServicedesk"] = "JIRA_SERVICEDESK";
})(GrantCheckProduct = exports.GrantCheckProduct || (exports.GrantCheckProduct = {}));
var IssueDevOpsCommitChangeType;
(function (IssueDevOpsCommitChangeType) {
    IssueDevOpsCommitChangeType["Added"] = "ADDED";
    IssueDevOpsCommitChangeType["Copied"] = "COPIED";
    IssueDevOpsCommitChangeType["Deleted"] = "DELETED";
    IssueDevOpsCommitChangeType["Modify"] = "MODIFY";
    IssueDevOpsCommitChangeType["Moved"] = "MOVED";
    IssueDevOpsCommitChangeType["Unknown"] = "UNKNOWN";
})(IssueDevOpsCommitChangeType = exports.IssueDevOpsCommitChangeType || (exports.IssueDevOpsCommitChangeType = {}));
var IssueDevOpsDeploymentEnvironmentType;
(function (IssueDevOpsDeploymentEnvironmentType) {
    IssueDevOpsDeploymentEnvironmentType["Development"] = "DEVELOPMENT";
    IssueDevOpsDeploymentEnvironmentType["Production"] = "PRODUCTION";
    IssueDevOpsDeploymentEnvironmentType["Staging"] = "STAGING";
    IssueDevOpsDeploymentEnvironmentType["Testing"] = "TESTING";
    IssueDevOpsDeploymentEnvironmentType["Unmapped"] = "UNMAPPED";
})(IssueDevOpsDeploymentEnvironmentType = exports.IssueDevOpsDeploymentEnvironmentType || (exports.IssueDevOpsDeploymentEnvironmentType = {}));
var IssueDevOpsDeploymentState;
(function (IssueDevOpsDeploymentState) {
    IssueDevOpsDeploymentState["Cancelled"] = "CANCELLED";
    IssueDevOpsDeploymentState["Failed"] = "FAILED";
    IssueDevOpsDeploymentState["InProgress"] = "IN_PROGRESS";
    IssueDevOpsDeploymentState["Pending"] = "PENDING";
    IssueDevOpsDeploymentState["RolledBack"] = "ROLLED_BACK";
    IssueDevOpsDeploymentState["Successful"] = "SUCCESSFUL";
    IssueDevOpsDeploymentState["Unknown"] = "UNKNOWN";
})(IssueDevOpsDeploymentState = exports.IssueDevOpsDeploymentState || (exports.IssueDevOpsDeploymentState = {}));
var IssueDevOpsPullRequestStatus;
(function (IssueDevOpsPullRequestStatus) {
    IssueDevOpsPullRequestStatus["Declined"] = "DECLINED";
    IssueDevOpsPullRequestStatus["Merged"] = "MERGED";
    IssueDevOpsPullRequestStatus["Open"] = "OPEN";
})(IssueDevOpsPullRequestStatus = exports.IssueDevOpsPullRequestStatus || (exports.IssueDevOpsPullRequestStatus = {}));
var JiraAttachmentsPermissions;
(function (JiraAttachmentsPermissions) {
    /** Allows the user to create atachments on the correspondig Issue. */
    JiraAttachmentsPermissions["CreateAttachments"] = "CREATE_ATTACHMENTS";
    /** Allows the user to delete attachments on the corresponding Issue. */
    JiraAttachmentsPermissions["DeleteOwnAttachments"] = "DELETE_OWN_ATTACHMENTS";
})(JiraAttachmentsPermissions = exports.JiraAttachmentsPermissions || (exports.JiraAttachmentsPermissions = {}));
/**
 * Cascading options can either be a parent or a child - this enum captures this characteristic.
 *
 * E.g. If there is a parent cascading option named `P1`, it may or may not have
 * child cascading options named `C1` and `C2`.
 * - `P1` would be a `PARENT` enum
 * - `C1` and `C2` would be `CHILD` enums
 */
var JiraCascadingSelectOptionType;
(function (JiraCascadingSelectOptionType) {
    /** All options, regardless of whether they're a parent or child. */
    JiraCascadingSelectOptionType["All"] = "ALL";
    /** Child option only */
    JiraCascadingSelectOptionType["Child"] = "CHILD";
    /** Parent option only */
    JiraCascadingSelectOptionType["Parent"] = "PARENT";
})(JiraCascadingSelectOptionType = exports.JiraCascadingSelectOptionType || (exports.JiraCascadingSelectOptionType = {}));
var JiraDevOpsIssuePanelBannerType;
(function (JiraDevOpsIssuePanelBannerType) {
    /** Banner that explains how to add issue keys in your commits, branches and PRs */
    JiraDevOpsIssuePanelBannerType["IssueKeyOnboarding"] = "ISSUE_KEY_ONBOARDING";
})(JiraDevOpsIssuePanelBannerType = exports.JiraDevOpsIssuePanelBannerType || (exports.JiraDevOpsIssuePanelBannerType = {}));
/** The possible States the DevOps Issue Panel can be in */
var JiraDevOpsIssuePanelState;
(function (JiraDevOpsIssuePanelState) {
    /** Panel should show the available Dev Summary */
    JiraDevOpsIssuePanelState["DevSummary"] = "DEV_SUMMARY";
    /** Panel should be hidden */
    JiraDevOpsIssuePanelState["Hidden"] = "HIDDEN";
    /** Panel should show the "not connected" state to prompt user to integrate tools */
    JiraDevOpsIssuePanelState["NotConnected"] = "NOT_CONNECTED";
})(JiraDevOpsIssuePanelState = exports.JiraDevOpsIssuePanelState || (exports.JiraDevOpsIssuePanelState = {}));
/**
 * The grant type key enum represents all the possible grant types available in Jira.
 * A grant type may take an optional parameter value.
 * For example: PROJECT_ROLE grant type takes project role id as parameter. And, PROJECT_LEAD grant type do not.
 *
 * The actual ARI formats are documented on the various concrete grant type values.
 */
var JiraGrantTypeKeyEnum;
(function (JiraGrantTypeKeyEnum) {
    /**
     * The anonymous access represents the public access without logging in.
     * It takes no parameter.
     */
    JiraGrantTypeKeyEnum["AnonymousAccess"] = "ANONYMOUS_ACCESS";
    /**
     * Any user who has the product access.
     * It takes no parameter.
     */
    JiraGrantTypeKeyEnum["AnyLoggedinUserApplicationRole"] = "ANY_LOGGEDIN_USER_APPLICATION_ROLE";
    /**
     * A application role is used to grant a user/group access to the application group.
     * It takes application role as parameter.
     */
    JiraGrantTypeKeyEnum["ApplicationRole"] = "APPLICATION_ROLE";
    /**
     * The issue assignee role.
     * It takes platform defined 'assignee' as parameter to represent the issue field value.
     */
    JiraGrantTypeKeyEnum["Assignee"] = "ASSIGNEE";
    /**
     * A group is a collection of users who can be given access together.
     * It represents group in the organization's user base.
     * It takes group id as parameter.
     */
    JiraGrantTypeKeyEnum["Group"] = "GROUP";
    /**
     * A multi group picker custom field.
     * It takes multi group picker custom field id as parameter.
     */
    JiraGrantTypeKeyEnum["MultiGroupPicker"] = "MULTI_GROUP_PICKER";
    /**
     * A multi user picker custom field.
     * It takes multi user picker custom field id as parameter.
     */
    JiraGrantTypeKeyEnum["MultiUserPicker"] = "MULTI_USER_PICKER";
    /**
     * The project lead role.
     * It takes no parameter.
     */
    JiraGrantTypeKeyEnum["ProjectLead"] = "PROJECT_LEAD";
    /**
     * A role that user/group can play in a project.
     * It takes project role as parameter.
     */
    JiraGrantTypeKeyEnum["ProjectRole"] = "PROJECT_ROLE";
    /**
     * The issue reporter role.
     * It takes platform defined 'reporter' as parameter to represent the issue field value.
     */
    JiraGrantTypeKeyEnum["Reporter"] = "REPORTER";
    /**
     * The grant type defines what the customers can do from the portal view.
     * It takes no parameter.
     */
    JiraGrantTypeKeyEnum["ServiceProjectCustomerPortalAccess"] = "SERVICE_PROJECT_CUSTOMER_PORTAL_ACCESS";
    /**
     * An individual user who can be given the access to work on one or more projects.
     * It takes user account id as parameter.
     */
    JiraGrantTypeKeyEnum["User"] = "USER";
})(JiraGrantTypeKeyEnum = exports.JiraGrantTypeKeyEnum || (exports.JiraGrantTypeKeyEnum = {}));
/** Represents the possible linking directions between issues. */
var JiraIssueLinkDirection;
(function (JiraIssueLinkDirection) {
    /** Going from the other issue to this issue. */
    JiraIssueLinkDirection["Inward"] = "INWARD";
    /** Going from this issue to the other issue. */
    JiraIssueLinkDirection["Outward"] = "OUTWARD";
})(JiraIssueLinkDirection = exports.JiraIssueLinkDirection || (exports.JiraIssueLinkDirection = {}));
/**
 * The autocomplete types available for Jira fields in the context of the Jira Query Language.
 *
 * This enum also describes which fields have field-value support from this schema.
 */
var JiraJqlAutocompleteType;
(function (JiraJqlAutocompleteType) {
    /** The Jira component field JQL autocomplete type. */
    JiraJqlAutocompleteType["Component"] = "COMPONENT";
    /** The Jira group field JQL autocomplete type. */
    JiraJqlAutocompleteType["Group"] = "GROUP";
    /** The Jira issue field JQL autocomplete type. */
    JiraJqlAutocompleteType["Issue"] = "ISSUE";
    /** The Jira issue field type JQL autocomplete type. */
    JiraJqlAutocompleteType["Issuetype"] = "ISSUETYPE";
    /** No autocomplete support. */
    JiraJqlAutocompleteType["None"] = "NONE";
    /** The Jira priority field JQL autocomplete type. */
    JiraJqlAutocompleteType["Priority"] = "PRIORITY";
    /** The Jira project field JQL autocomplete type. */
    JiraJqlAutocompleteType["Project"] = "PROJECT";
    /** The Jira sprint field JQL autocomplete type. */
    JiraJqlAutocompleteType["Sprint"] = "SPRINT";
    /** The Jira status field JQL autocomplete type. */
    JiraJqlAutocompleteType["Status"] = "STATUS";
    /** The Jira status category field JQL autocomplete type. */
    JiraJqlAutocompleteType["Statuscategory"] = "STATUSCATEGORY";
    /** The Jira user field JQL autocomplete type. */
    JiraJqlAutocompleteType["User"] = "USER";
    /** The Jira version field JQL autocomplete type. */
    JiraJqlAutocompleteType["Version"] = "VERSION";
})(JiraJqlAutocompleteType = exports.JiraJqlAutocompleteType || (exports.JiraJqlAutocompleteType = {}));
/** The modes the JQL builder can be displayed and used in. */
var JiraJqlBuilderMode;
(function (JiraJqlBuilderMode) {
    /**
     * The basic mode, allows queries to be built and executed via the JQL basic editor.
     *
     * This mode allows users to easily construct JQL queries by interacting with the UI.
     */
    JiraJqlBuilderMode["Basic"] = "BASIC";
    /**
     * The JQL mode, allows queries to be built and executed via the JQL advanced editor.
     *
     * This mode allows users to manually type and construct complex JQL queries.
     */
    JiraJqlBuilderMode["Jql"] = "JQL";
})(JiraJqlBuilderMode = exports.JiraJqlBuilderMode || (exports.JiraJqlBuilderMode = {}));
/** The types of JQL clauses supported by Jira. */
var JiraJqlClauseType;
(function (JiraJqlClauseType) {
    /** This denotes both WHERE and ORDER_BY. */
    JiraJqlClauseType["Any"] = "ANY";
    /** This corresponds to fields used to sort Jira Issues. */
    JiraJqlClauseType["OrderBy"] = "ORDER_BY";
    /** This corresponds to jql fields used as filter criteria of Jira issues. */
    JiraJqlClauseType["Where"] = "WHERE";
})(JiraJqlClauseType = exports.JiraJqlClauseType || (exports.JiraJqlClauseType = {}));
/**
 * The types of JQL operators supported by Jira.
 *
 * An operator in JQL is one or more symbols or words,which compares the value of a field on its left with one or more values (or functions) on its right,
 * such that only true results are retrieved by the clause.
 *
 * For more information on JQL operators please visit: https://support.atlassian.com/jira-software-cloud/docs/advanced-search-reference-jql-operators.
 */
var JiraJqlOperator;
(function (JiraJqlOperator) {
    /** The `CHANGED` operator is used to find issues that have a value that had changed for the specified field. */
    JiraJqlOperator["Changed"] = "CHANGED";
    /** The `CHANGED` operator is used to find issues that have a value that had changed for the specified field. */
    JiraJqlOperator["Contains"] = "CONTAINS";
    /** The `=` operator is used to search for issues where the value of the specified field exactly matches the specified value. */
    JiraJqlOperator["Equals"] = "EQUALS";
    /** The `>` operator is used to search for issues where the value of the specified field is greater than the specified value. */
    JiraJqlOperator["GreaterThan"] = "GREATER_THAN";
    /** The `>=` operator is used to search for issues where the value of the specified field is greater than or equal to the specified value. */
    JiraJqlOperator["GreaterThanOrEqual"] = "GREATER_THAN_OR_EQUAL";
    /** The `IN` operator is used to search for issues where the value of the specified field is one of multiple specified values. */
    JiraJqlOperator["In"] = "IN";
    /** The `IS` operator can only be used with EMPTY or NULL. That is, it is used to search for issues where the specified field has no value. */
    JiraJqlOperator["Is"] = "IS";
    /** The `IS NOT` operator can only be used with EMPTY or NULL. That is, it is used to search for issues where the specified field has a value. */
    JiraJqlOperator["IsNot"] = "IS_NOT";
    /** The `<` operator is used to search for issues where the value of the specified field is less than the specified value. */
    JiraJqlOperator["LessThan"] = "LESS_THAN";
    /** The `<=` operator is used to search for issues where the value of the specified field is less than or equal to than the specified value. */
    JiraJqlOperator["LessThanOrEqual"] = "LESS_THAN_OR_EQUAL";
    /** The `!~` operator is used to search for issues where the value of the specified field is not a "fuzzy" match for the specified value. */
    JiraJqlOperator["NotContains"] = "NOT_CONTAINS";
    /** The `!=` operator is used to search for issues where the value of the specified field does not match the specified value. */
    JiraJqlOperator["NotEquals"] = "NOT_EQUALS";
    /** The `NOT IN` operator is used to search for issues where the value of the specified field is not one of multiple specified values. */
    JiraJqlOperator["NotIn"] = "NOT_IN";
    /** The `WAS` operator is used to find issues that currently have or previously had the specified value for the specified field. */
    JiraJqlOperator["Was"] = "WAS";
    /** The `WAS IN` operator is used to find issues that currently have or previously had any of multiple specified values for the specified field. */
    JiraJqlOperator["WasIn"] = "WAS_IN";
    /** The `WAS NOT` operator is used to find issues that have never had the specified value for the specified field. */
    JiraJqlOperator["WasNot"] = "WAS_NOT";
    /** The `WAS NOT IN` operator is used to search for issues where the value of the specified field has never been one of multiple specified values. */
    JiraJqlOperator["WasNotIn"] = "WAS_NOT_IN";
})(JiraJqlOperator = exports.JiraJqlOperator || (exports.JiraJqlOperator = {}));
/** #################### Enums ##################### */
var JiraProjectAndRepositoryRelationshipSortBy;
(function (JiraProjectAndRepositoryRelationshipSortBy) {
    JiraProjectAndRepositoryRelationshipSortBy["LastInferredAt"] = "LAST_INFERRED_AT";
})(JiraProjectAndRepositoryRelationshipSortBy = exports.JiraProjectAndRepositoryRelationshipSortBy || (exports.JiraProjectAndRepositoryRelationshipSortBy = {}));
/**
 * The category of the project permission.
 * It represents the logical grouping of the project permissions.
 */
var JiraProjectPermissionCategoryEnum;
(function (JiraProjectPermissionCategoryEnum) {
    /** Represents one or more permissions to manage issue attacments such as create and delete. */
    JiraProjectPermissionCategoryEnum["Attachments"] = "ATTACHMENTS";
    /** Represents one or more permissions to manage issue comments such as add, delete and edit. */
    JiraProjectPermissionCategoryEnum["Comments"] = "COMMENTS";
    /** Represents one or more permissions applicable at issue level to manage operations such as create, delete, edit, and transition. */
    JiraProjectPermissionCategoryEnum["Issues"] = "ISSUES";
    /** Represents one or more permissions representing default category if not any other existing category. */
    JiraProjectPermissionCategoryEnum["Other"] = "OTHER";
    /** Represents one or more permissions applicable at project level such as project administration, view project information, and manage sprints. */
    JiraProjectPermissionCategoryEnum["Projects"] = "PROJECTS";
    /** Represents one or more permissions to manage worklogs, time tracking for billing purpose in some cases. */
    JiraProjectPermissionCategoryEnum["TimeTracking"] = "TIME_TRACKING";
    /** Represents one or more permissions to manage watchers and voters of an issue. */
    JiraProjectPermissionCategoryEnum["VotersAndWatchers"] = "VOTERS_AND_WATCHERS";
})(JiraProjectPermissionCategoryEnum = exports.JiraProjectPermissionCategoryEnum || (exports.JiraProjectPermissionCategoryEnum = {}));
var JiraProjectSortField;
(function (JiraProjectSortField) {
    /** sorts by category */
    JiraProjectSortField["Category"] = "CATEGORY";
    /** sorts by project key */
    JiraProjectSortField["Key"] = "KEY";
    /** sorts by lead */
    JiraProjectSortField["Lead"] = "LEAD";
    /** sorts by project name */
    JiraProjectSortField["Name"] = "NAME";
})(JiraProjectSortField = exports.JiraProjectSortField || (exports.JiraProjectSortField = {}));
/** Jira Project types */
var JiraProjectType;
(function (JiraProjectType) {
    /** A business project */
    JiraProjectType["Business"] = "BUSINESS";
    /** A service desk project */
    JiraProjectType["ServiceDesk"] = "SERVICE_DESK";
    /** A software project */
    JiraProjectType["Software"] = "SOFTWARE";
})(JiraProjectType = exports.JiraProjectType || (exports.JiraProjectType = {}));
/** Possible states for Pull Requests */
var JiraPullRequestState;
(function (JiraPullRequestState) {
    /** Pull Request is Declined */
    JiraPullRequestState["Declined"] = "DECLINED";
    /** Pull Request is Merged */
    JiraPullRequestState["Merged"] = "MERGED";
    /** Pull Request is Open */
    JiraPullRequestState["Open"] = "OPEN";
})(JiraPullRequestState = exports.JiraPullRequestState || (exports.JiraPullRequestState = {}));
/**
 * Used for specifying whether or not epics that haven't been released should be included
 * in the results.
 *
 * For an epic to be considered as released, at least one of the issues or subtasks within
 * it must have been released.
 */
var JiraReleasesEpicReleaseStatusFilter;
(function (JiraReleasesEpicReleaseStatusFilter) {
    /** Only epics that have been released (to any environment) will be included in the results. */
    JiraReleasesEpicReleaseStatusFilter["Released"] = "RELEASED";
    /**
     * Epics that have been released will be returned first, followed by epics that haven't
     * yet been released.
     */
    JiraReleasesEpicReleaseStatusFilter["ReleasedAndUnreleased"] = "RELEASED_AND_UNRELEASED";
})(JiraReleasesEpicReleaseStatusFilter = exports.JiraReleasesEpicReleaseStatusFilter || (exports.JiraReleasesEpicReleaseStatusFilter = {}));
/**
 * Used for specifying whether or not issues that haven't been released should be included
 * in the results.
 */
var JiraReleasesIssueReleaseStatusFilter;
(function (JiraReleasesIssueReleaseStatusFilter) {
    /** Only issues that have been released (to any environment) will be included in the results. */
    JiraReleasesIssueReleaseStatusFilter["Released"] = "RELEASED";
    /**
     * Issues that have been released will be returned first, followed by issues that haven't
     * yet been released.
     */
    JiraReleasesIssueReleaseStatusFilter["ReleasedAndUnreleased"] = "RELEASED_AND_UNRELEASED";
    /** Only issues that have *not* been released (to any environment) will be included in the results. */
    JiraReleasesIssueReleaseStatusFilter["Unreleased"] = "UNRELEASED";
})(JiraReleasesIssueReleaseStatusFilter = exports.JiraReleasesIssueReleaseStatusFilter || (exports.JiraReleasesIssueReleaseStatusFilter = {}));
/** Possible states for Reviews */
var JiraReviewState;
(function (JiraReviewState) {
    /** Review is in Require Approval state */
    JiraReviewState["Approval"] = "APPROVAL";
    /** Review has been closed */
    JiraReviewState["Closed"] = "CLOSED";
    /** Review is in Dead state */
    JiraReviewState["Dead"] = "DEAD";
    /** Review is in Draft state */
    JiraReviewState["Draft"] = "DRAFT";
    /** Review has been rejected */
    JiraReviewState["Rejected"] = "REJECTED";
    /** Review is in Review state */
    JiraReviewState["Review"] = "REVIEW";
    /** Review is in Summarize state */
    JiraReviewState["Summarize"] = "SUMMARIZE";
    /** Review state is unknown */
    JiraReviewState["Unknown"] = "UNKNOWN";
})(JiraReviewState = exports.JiraReviewState || (exports.JiraReviewState = {}));
/** Represents the state of the sprint. */
var JiraSprintState;
(function (JiraSprintState) {
    /** The sprint is in progress. */
    JiraSprintState["Active"] = "ACTIVE";
    /** The sprint has been completed. */
    JiraSprintState["Closed"] = "CLOSED";
    /** The sprint hasn't been started yet. */
    JiraSprintState["Future"] = "FUTURE";
})(JiraSprintState = exports.JiraSprintState || (exports.JiraSprintState = {}));
/** Color of the status category. */
var JiraStatusCategoryColor;
(function (JiraStatusCategoryColor) {
    /** #4a6785 */
    JiraStatusCategoryColor["BlueGray"] = "BLUE_GRAY";
    /** #815b3a */
    JiraStatusCategoryColor["Brown"] = "BROWN";
    /** #14892c */
    JiraStatusCategoryColor["Green"] = "GREEN";
    /** #707070 */
    JiraStatusCategoryColor["MediumGray"] = "MEDIUM_GRAY";
    /** #d04437 */
    JiraStatusCategoryColor["WarmRed"] = "WARM_RED";
    /** #f6c342 */
    JiraStatusCategoryColor["Yellow"] = "YELLOW";
})(JiraStatusCategoryColor = exports.JiraStatusCategoryColor || (exports.JiraStatusCategoryColor = {}));
/** Different time formats supported for entering & displaying time tracking related data. */
var JiraTimeFormat;
(function (JiraTimeFormat) {
    /** E.g. 2d 4.5h */
    JiraTimeFormat["Days"] = "DAYS";
    /** E.g. 52.5h */
    JiraTimeFormat["Hours"] = "HOURS";
    /** E.g. 2 days, 4 hours, 30 minutes */
    JiraTimeFormat["Pretty"] = "PRETTY";
})(JiraTimeFormat = exports.JiraTimeFormat || (exports.JiraTimeFormat = {}));
/**
 * Different time units supported for entering & displaying time tracking related data.
 * Get the currently configured default duration to use when parsing duration string for time tracking.
 */
var JiraTimeUnit;
(function (JiraTimeUnit) {
    /** When the current duration is in days. */
    JiraTimeUnit["Day"] = "DAY";
    /** When the current duration is in hours. */
    JiraTimeUnit["Hour"] = "HOUR";
    /** When the current duration is in minutes. */
    JiraTimeUnit["Minute"] = "MINUTE";
    /** When the current duration is in weeks. */
    JiraTimeUnit["Week"] = "WEEK";
})(JiraTimeUnit = exports.JiraTimeUnit || (exports.JiraTimeUnit = {}));
/** The status of a version field. */
var JiraVersionStatus;
(function (JiraVersionStatus) {
    /** Indicates the version is archived, no further changes can be made to this version unless it is un-archived */
    JiraVersionStatus["Archived"] = "ARCHIVED";
    /** Indicates the version is available to public */
    JiraVersionStatus["Released"] = "RELEASED";
    /** Indicates the version is not launched yet */
    JiraVersionStatus["Unreleased"] = "UNRELEASED";
})(JiraVersionStatus = exports.JiraVersionStatus || (exports.JiraVersionStatus = {}));
var LicenseOverrideState;
(function (LicenseOverrideState) {
    LicenseOverrideState["Active"] = "ACTIVE";
    LicenseOverrideState["Inactive"] = "INACTIVE";
    LicenseOverrideState["Trial"] = "TRIAL";
})(LicenseOverrideState = exports.LicenseOverrideState || (exports.LicenseOverrideState = {}));
/** Payment model for integrating an app with an Atlassian product. */
var MarketplaceAppPaymentModel;
(function (MarketplaceAppPaymentModel) {
    MarketplaceAppPaymentModel["Free"] = "FREE";
    MarketplaceAppPaymentModel["PaidViaAtlassian"] = "PAID_VIA_ATLASSIAN";
    MarketplaceAppPaymentModel["PaidViaPartner"] = "PAID_VIA_PARTNER";
})(MarketplaceAppPaymentModel = exports.MarketplaceAppPaymentModel || (exports.MarketplaceAppPaymentModel = {}));
/** Permissions that a MarketplaceUser can have on MarketplaceApps */
var MarketplaceAppPermission;
(function (MarketplaceAppPermission) {
    MarketplaceAppPermission["ManageAppDetails"] = "MANAGE_APP_DETAILS";
})(MarketplaceAppPermission = exports.MarketplaceAppPermission || (exports.MarketplaceAppPermission = {}));
/** Visibility of the Marketplace app's version */
var MarketplaceAppVersionVisibility;
(function (MarketplaceAppVersionVisibility) {
    MarketplaceAppVersionVisibility["Private"] = "PRIVATE";
    MarketplaceAppVersionVisibility["Public"] = "PUBLIC";
})(MarketplaceAppVersionVisibility = exports.MarketplaceAppVersionVisibility || (exports.MarketplaceAppVersionVisibility = {}));
/** Billing cycle for which pricing plan applies */
var MarketplaceBillingCycle;
(function (MarketplaceBillingCycle) {
    MarketplaceBillingCycle["Annual"] = "ANNUAL";
    MarketplaceBillingCycle["Monthly"] = "MONTHLY";
})(MarketplaceBillingCycle = exports.MarketplaceBillingCycle || (exports.MarketplaceBillingCycle = {}));
var MarketplaceCloudFortifiedStatus;
(function (MarketplaceCloudFortifiedStatus) {
    MarketplaceCloudFortifiedStatus["Approved"] = "APPROVED";
    MarketplaceCloudFortifiedStatus["NotAParticipant"] = "NOT_A_PARTICIPANT";
    MarketplaceCloudFortifiedStatus["Rejected"] = "REJECTED";
})(MarketplaceCloudFortifiedStatus = exports.MarketplaceCloudFortifiedStatus || (exports.MarketplaceCloudFortifiedStatus = {}));
/** Status of an entity in Marketplace system */
var MarketplaceEntityStatus;
(function (MarketplaceEntityStatus) {
    MarketplaceEntityStatus["Active"] = "ACTIVE";
    MarketplaceEntityStatus["Archived"] = "ARCHIVED";
})(MarketplaceEntityStatus = exports.MarketplaceEntityStatus || (exports.MarketplaceEntityStatus = {}));
/** Status of app’s listing in Marketplace. */
var MarketplaceListingStatus;
(function (MarketplaceListingStatus) {
    MarketplaceListingStatus["Private"] = "PRIVATE";
    MarketplaceListingStatus["Public"] = "PUBLIC";
    MarketplaceListingStatus["ReadyToLaunch"] = "READY_TO_LAUNCH";
    MarketplaceListingStatus["Rejected"] = "REJECTED";
    MarketplaceListingStatus["Submitted"] = "SUBMITTED";
})(MarketplaceListingStatus = exports.MarketplaceListingStatus || (exports.MarketplaceListingStatus = {}));
/** Marketplace location */
var MarketplaceLocation;
(function (MarketplaceLocation) {
    MarketplaceLocation["InProduct"] = "IN_PRODUCT";
    MarketplaceLocation["Website"] = "WEBSITE";
})(MarketplaceLocation = exports.MarketplaceLocation || (exports.MarketplaceLocation = {}));
/** Tells whether support is on holiday only one time or if it repeats annually. */
var MarketplacePartnerSupportHolidayFrequency;
(function (MarketplacePartnerSupportHolidayFrequency) {
    MarketplacePartnerSupportHolidayFrequency["Annual"] = "ANNUAL";
    MarketplacePartnerSupportHolidayFrequency["OneTime"] = "ONE_TIME";
})(MarketplacePartnerSupportHolidayFrequency = exports.MarketplacePartnerSupportHolidayFrequency || (exports.MarketplacePartnerSupportHolidayFrequency = {}));
/** Tells if the Marketplace partner is an Atlassian’s internal one. */
var MarketplacePartnerType;
(function (MarketplacePartnerType) {
    MarketplacePartnerType["AtlassianInternal"] = "ATLASSIAN_INTERNAL";
})(MarketplacePartnerType = exports.MarketplacePartnerType || (exports.MarketplacePartnerType = {}));
/** Status of the plan : LIVE, PENDING or DRAFT */
var MarketplacePricingPlanStatus;
(function (MarketplacePricingPlanStatus) {
    MarketplacePricingPlanStatus["Draft"] = "DRAFT";
    MarketplacePricingPlanStatus["Live"] = "LIVE";
    MarketplacePricingPlanStatus["Pending"] = "PENDING";
})(MarketplacePricingPlanStatus = exports.MarketplacePricingPlanStatus || (exports.MarketplacePricingPlanStatus = {}));
/** Mode of the tier : GRADUATED (progressive PUP), VOLUME (constant for all users) */
var MarketplacePricingTierMode;
(function (MarketplacePricingTierMode) {
    MarketplacePricingTierMode["Graduated"] = "GRADUATED";
    MarketplacePricingTierMode["Volume"] = "VOLUME";
})(MarketplacePricingTierMode = exports.MarketplacePricingTierMode || (exports.MarketplacePricingTierMode = {}));
/** Policy of the tier : BLOCK (FLAT) or PER_UNIT (PUP) */
var MarketplacePricingTierPolicy;
(function (MarketplacePricingTierPolicy) {
    MarketplacePricingTierPolicy["Block"] = "BLOCK";
    MarketplacePricingTierPolicy["PerUnit"] = "PER_UNIT";
})(MarketplacePricingTierPolicy = exports.MarketplacePricingTierPolicy || (exports.MarketplacePricingTierPolicy = {}));
/** Type of the tier */
var MarketplacePricingTierType;
(function (MarketplacePricingTierType) {
    MarketplacePricingTierType["RemoteAgentTiered"] = "REMOTE_AGENT_TIERED";
    MarketplacePricingTierType["UserTiered"] = "USER_TIERED";
})(MarketplacePricingTierType = exports.MarketplacePricingTierType || (exports.MarketplacePricingTierType = {}));
var PolarisCommentKind;
(function (PolarisCommentKind) {
    PolarisCommentKind["PlayContribution"] = "PLAY_CONTRIBUTION";
    PolarisCommentKind["View"] = "VIEW";
})(PolarisCommentKind = exports.PolarisCommentKind || (exports.PolarisCommentKind = {}));
/** ##### Input ####### */
var PolarisFieldType;
(function (PolarisFieldType) {
    PolarisFieldType["PolarisIdeaDateField"] = "PolarisIdeaDateField";
    PolarisFieldType["PolarisIdeaDateTimeField"] = "PolarisIdeaDateTimeField";
    PolarisFieldType["PolarisIdeaLabelsField"] = "PolarisIdeaLabelsField";
    PolarisFieldType["PolarisIdeaNumberField"] = "PolarisIdeaNumberField";
    PolarisFieldType["PolarisIdeaOptionField"] = "PolarisIdeaOptionField";
    PolarisFieldType["PolarisIdeaOptionsField"] = "PolarisIdeaOptionsField";
    PolarisFieldType["PolarisIdeaPlayField"] = "PolarisIdeaPlayField";
    PolarisFieldType["PolarisIdeaStringField"] = "PolarisIdeaStringField";
    PolarisFieldType["PolarisIdeaUserField"] = "PolarisIdeaUserField";
    PolarisFieldType["PolarisIdeaUsersField"] = "PolarisIdeaUsersField";
})(PolarisFieldType = exports.PolarisFieldType || (exports.PolarisFieldType = {}));
var PolarisPlayKind;
(function (PolarisPlayKind) {
    PolarisPlayKind["PolarisBudgetAllocationPlay"] = "PolarisBudgetAllocationPlay";
})(PolarisPlayKind = exports.PolarisPlayKind || (exports.PolarisPlayKind = {}));
var PolarisRefreshError;
(function (PolarisRefreshError) {
    PolarisRefreshError["InternalError"] = "INTERNAL_ERROR";
    PolarisRefreshError["InvalidSnippet"] = "INVALID_SNIPPET";
    PolarisRefreshError["NeedAuth"] = "NEED_AUTH";
    PolarisRefreshError["NotFound"] = "NOT_FOUND";
})(PolarisRefreshError = exports.PolarisRefreshError || (exports.PolarisRefreshError = {}));
var PolarisResolvedObjectAuthType;
(function (PolarisResolvedObjectAuthType) {
    PolarisResolvedObjectAuthType["ApiKey"] = "API_KEY";
    PolarisResolvedObjectAuthType["Oauth2"] = "OAUTH2";
})(PolarisResolvedObjectAuthType = exports.PolarisResolvedObjectAuthType || (exports.PolarisResolvedObjectAuthType = {}));
var PolarisSnippetPropertyKind;
(function (PolarisSnippetPropertyKind) {
    /**  1-5 integer rating */
    PolarisSnippetPropertyKind["Labels"] = "LABELS";
    PolarisSnippetPropertyKind["Number"] = "NUMBER";
    /**  generic number */
    PolarisSnippetPropertyKind["Rating"] = "RATING";
})(PolarisSnippetPropertyKind = exports.PolarisSnippetPropertyKind || (exports.PolarisSnippetPropertyKind = {}));
var PolarisSortOrder;
(function (PolarisSortOrder) {
    PolarisSortOrder["Asc"] = "ASC";
    PolarisSortOrder["Desc"] = "DESC";
})(PolarisSortOrder = exports.PolarisSortOrder || (exports.PolarisSortOrder = {}));
var PolarisValueOperator;
(function (PolarisValueOperator) {
    PolarisValueOperator["Eq"] = "EQ";
    PolarisValueOperator["Gt"] = "GT";
    PolarisValueOperator["Gte"] = "GTE";
    PolarisValueOperator["Lt"] = "LT";
    PolarisValueOperator["Lte"] = "LTE";
})(PolarisValueOperator = exports.PolarisValueOperator || (exports.PolarisValueOperator = {}));
var PolarisViewFilterKind;
(function (PolarisViewFilterKind) {
    PolarisViewFilterKind["FieldIdentity"] = "FIELD_IDENTITY";
    /**  a field being matched by identity */
    PolarisViewFilterKind["FieldNumeric"] = "FIELD_NUMERIC";
    /**  a field being matched by numeric comparison */
    PolarisViewFilterKind["Text"] = "TEXT";
})(PolarisViewFilterKind = exports.PolarisViewFilterKind || (exports.PolarisViewFilterKind = {}));
var PolarisViewFilterOperator;
(function (PolarisViewFilterOperator) {
    PolarisViewFilterOperator["Eq"] = "EQ";
    PolarisViewFilterOperator["Gt"] = "GT";
    PolarisViewFilterOperator["Gte"] = "GTE";
    PolarisViewFilterOperator["Lt"] = "LT";
    PolarisViewFilterOperator["Lte"] = "LTE";
    PolarisViewFilterOperator["Neq"] = "NEQ";
})(PolarisViewFilterOperator = exports.PolarisViewFilterOperator || (exports.PolarisViewFilterOperator = {}));
var PolarisViewSetType;
(function (PolarisViewSetType) {
    PolarisViewSetType["Capture"] = "CAPTURE";
    PolarisViewSetType["Custom"] = "CUSTOM";
    PolarisViewSetType["Deliver"] = "DELIVER";
    PolarisViewSetType["Prioritize"] = "PRIORITIZE";
    /**  for views that are used to manage the display of single ideas (e.g., Idea views) */
    PolarisViewSetType["Section"] = "SECTION";
    PolarisViewSetType["Single"] = "SINGLE";
    PolarisViewSetType["System"] = "SYSTEM";
})(PolarisViewSetType = exports.PolarisViewSetType || (exports.PolarisViewSetType = {}));
var PolarisVisualizationType;
(function (PolarisVisualizationType) {
    PolarisVisualizationType["Board"] = "BOARD";
    PolarisVisualizationType["Table"] = "TABLE";
    PolarisVisualizationType["Twoxtwo"] = "TWOXTWO";
})(PolarisVisualizationType = exports.PolarisVisualizationType || (exports.PolarisVisualizationType = {}));
var Product;
(function (Product) {
    Product["Confluence"] = "Confluence";
    Product["Jira"] = "Jira";
})(Product = exports.Product || (exports.Product = {}));
var RateLimitingCurrency;
(function (RateLimitingCurrency) {
    RateLimitingCurrency["TestingService"] = "TESTING_SERVICE";
})(RateLimitingCurrency = exports.RateLimitingCurrency || (exports.RateLimitingCurrency = {}));
/** Supported colors in the Palette */
var RoadmapPaletteColor;
(function (RoadmapPaletteColor) {
    RoadmapPaletteColor["Blue"] = "BLUE";
    RoadmapPaletteColor["DarkBlue"] = "DARK_BLUE";
    RoadmapPaletteColor["DarkGreen"] = "DARK_GREEN";
    RoadmapPaletteColor["DarkGrey"] = "DARK_GREY";
    RoadmapPaletteColor["DarkOrange"] = "DARK_ORANGE";
    RoadmapPaletteColor["DarkPurple"] = "DARK_PURPLE";
    RoadmapPaletteColor["DarkTeal"] = "DARK_TEAL";
    RoadmapPaletteColor["DarkYellow"] = "DARK_YELLOW";
    RoadmapPaletteColor["Green"] = "GREEN";
    RoadmapPaletteColor["Grey"] = "GREY";
    RoadmapPaletteColor["Orange"] = "ORANGE";
    RoadmapPaletteColor["Purple"] = "PURPLE";
    RoadmapPaletteColor["Teal"] = "TEAL";
    RoadmapPaletteColor["Yellow"] = "YELLOW";
})(RoadmapPaletteColor = exports.RoadmapPaletteColor || (exports.RoadmapPaletteColor = {}));
/** States that a sprint can be in */
var RoadmapSprintState;
(function (RoadmapSprintState) {
    /** A current sprint */
    RoadmapSprintState["Active"] = "ACTIVE";
    /** A sprint that was completed in the past */
    RoadmapSprintState["Closed"] = "CLOSED";
    /** A sprint that is planned for the future */
    RoadmapSprintState["Future"] = "FUTURE";
})(RoadmapSprintState = exports.RoadmapSprintState || (exports.RoadmapSprintState = {}));
/** Defines the available timeline modes */
var RoadmapTimelineMode;
(function (RoadmapTimelineMode) {
    /** Months */
    RoadmapTimelineMode["Months"] = "MONTHS";
    /** Quarters */
    RoadmapTimelineMode["Quarters"] = "QUARTERS";
    /** Weeks */
    RoadmapTimelineMode["Weeks"] = "WEEKS";
})(RoadmapTimelineMode = exports.RoadmapTimelineMode || (exports.RoadmapTimelineMode = {}));
/** Avaliable version statuses */
var RoadmapVersionStatus;
(function (RoadmapVersionStatus) {
    /** version has been archived */
    RoadmapVersionStatus["Archived"] = "ARCHIVED";
    /** version has been released */
    RoadmapVersionStatus["Released"] = "RELEASED";
    /** version has not been released */
    RoadmapVersionStatus["Unreleased"] = "UNRELEASED";
})(RoadmapVersionStatus = exports.RoadmapVersionStatus || (exports.RoadmapVersionStatus = {}));
var Scope;
(function (Scope) {
    /** outbound-auth */
    Scope["AdminContainer"] = "ADMIN_CONTAINER";
    Scope["AuthConfluenceUser"] = "AUTH_CONFLUENCE_USER";
    /** confluence */
    Scope["ConfluenceAtlassianExternal"] = "CONFLUENCE_ATLASSIAN_EXTERNAL";
    Scope["IdentityAtlassianExternal"] = "IDENTITY_ATLASSIAN_EXTERNAL";
    Scope["JiraAtlassianExternal"] = "JIRA_ATLASSIAN_EXTERNAL";
    /** ecosystem */
    Scope["ManageApp"] = "MANAGE_APP";
    Scope["ManageConfluenceConfiguration"] = "MANAGE_CONFLUENCE_CONFIGURATION";
    Scope["ManageDirectory"] = "MANAGE_DIRECTORY";
    Scope["ManageJiraConfiguration"] = "MANAGE_JIRA_CONFIGURATION";
    Scope["ManageJiraDataProvider"] = "MANAGE_JIRA_DATA_PROVIDER";
    Scope["ManageJiraProject"] = "MANAGE_JIRA_PROJECT";
    /** identity */
    Scope["ManageOrg"] = "MANAGE_ORG";
    Scope["ManageServicedeskCustomer"] = "MANAGE_SERVICEDESK_CUSTOMER";
    /** platform */
    Scope["MigrateConfluence"] = "MIGRATE_CONFLUENCE";
    /** compass */
    Scope["ReadCompassComponent"] = "READ_COMPASS_COMPONENT";
    Scope["ReadCompassEvent"] = "READ_COMPASS_EVENT";
    Scope["ReadCompassScorecard"] = "READ_COMPASS_SCORECARD";
    Scope["ReadConfluenceContentAll"] = "READ_CONFLUENCE_CONTENT_ALL";
    Scope["ReadConfluenceContentPermission"] = "READ_CONFLUENCE_CONTENT_PERMISSION";
    Scope["ReadConfluenceContentSummary"] = "READ_CONFLUENCE_CONTENT_SUMMARY";
    Scope["ReadConfluenceGroups"] = "READ_CONFLUENCE_GROUPS";
    Scope["ReadConfluenceProps"] = "READ_CONFLUENCE_PROPS";
    Scope["ReadConfluenceSpaceSummary"] = "READ_CONFLUENCE_SPACE_SUMMARY";
    Scope["ReadConfluenceUser"] = "READ_CONFLUENCE_USER";
    Scope["ReadContainer"] = "READ_CONTAINER";
    /** jira */
    Scope["ReadJiraUser"] = "READ_JIRA_USER";
    Scope["ReadJiraWork"] = "READ_JIRA_WORK";
    Scope["ReadMe"] = "READ_ME";
    /** notification-log */
    Scope["ReadNotifications"] = "READ_NOTIFICATIONS";
    /** jira-servicedesk */
    Scope["ReadServicedeskRequest"] = "READ_SERVICEDESK_REQUEST";
    Scope["SearchConfluence"] = "SEARCH_CONFLUENCE_";
    Scope["StorageApp"] = "STORAGE_APP";
    Scope["ViewUserprofile"] = "VIEW_USERPROFILE";
    Scope["WriteCompassComponent"] = "WRITE_COMPASS_COMPONENT";
    Scope["WriteCompassEvent"] = "WRITE_COMPASS_EVENT";
    Scope["WriteCompassScorecard"] = "WRITE_COMPASS_SCORECARD";
    Scope["WriteConfluenceContent"] = "WRITE_CONFLUENCE_CONTENT";
    Scope["WriteConfluenceFile"] = "WRITE_CONFLUENCE_FILE";
    Scope["WriteConfluenceGroups"] = "WRITE_CONFLUENCE_GROUPS";
    Scope["WriteConfluenceProps"] = "WRITE_CONFLUENCE_PROPS";
    Scope["WriteConfluenceSpace"] = "WRITE_CONFLUENCE_SPACE";
    Scope["WriteContainer"] = "WRITE_CONTAINER";
    Scope["WriteJiraWork"] = "WRITE_JIRA_WORK";
    Scope["WriteNotifications"] = "WRITE_NOTIFICATIONS";
    Scope["WriteServicedeskRequest"] = "WRITE_SERVICEDESK_REQUEST";
})(Scope = exports.Scope || (exports.Scope = {}));
var SoftwareCardsDestinationEnum;
(function (SoftwareCardsDestinationEnum) {
    SoftwareCardsDestinationEnum["Backlog"] = "BACKLOG";
    SoftwareCardsDestinationEnum["ExistingSprint"] = "EXISTING_SPRINT";
    SoftwareCardsDestinationEnum["NewSprint"] = "NEW_SPRINT";
})(SoftwareCardsDestinationEnum = exports.SoftwareCardsDestinationEnum || (exports.SoftwareCardsDestinationEnum = {}));
/** The sort direction of the collection */
var SortDirection;
(function (SortDirection) {
    /** Sort in ascending order */
    SortDirection["Asc"] = "ASC";
    /** Sort in descending order */
    SortDirection["Desc"] = "DESC";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
var SprintReportsEstimationStatisticType;
(function (SprintReportsEstimationStatisticType) {
    SprintReportsEstimationStatisticType["IssueCount"] = "ISSUE_COUNT";
    SprintReportsEstimationStatisticType["OriginalEstimate"] = "ORIGINAL_ESTIMATE";
    SprintReportsEstimationStatisticType["StoryPoints"] = "STORY_POINTS";
})(SprintReportsEstimationStatisticType = exports.SprintReportsEstimationStatisticType || (exports.SprintReportsEstimationStatisticType = {}));
var SprintState;
(function (SprintState) {
    SprintState["Active"] = "ACTIVE";
    SprintState["Closed"] = "CLOSED";
    SprintState["Future"] = "FUTURE";
})(SprintState = exports.SprintState || (exports.SprintState = {}));
/** Query parameter for how this user has access to the request, e.g. they were the reporter or added as a participant. */
var SupportRequestQueryOwnership;
(function (SupportRequestQueryOwnership) {
    SupportRequestQueryOwnership["Participant"] = "PARTICIPANT";
    SupportRequestQueryOwnership["Reporter"] = "REPORTER";
})(SupportRequestQueryOwnership = exports.SupportRequestQueryOwnership || (exports.SupportRequestQueryOwnership = {}));
/** The general category for the status of the ticket. */
var SupportRequestQueryStatusCategory;
(function (SupportRequestQueryStatusCategory) {
    SupportRequestQueryStatusCategory["Done"] = "DONE";
    SupportRequestQueryStatusCategory["Open"] = "OPEN";
})(SupportRequestQueryStatusCategory = exports.SupportRequestQueryStatusCategory || (exports.SupportRequestQueryStatusCategory = {}));
/** The general category for the status of the ticket. */
var SupportRequestStatusCategory;
(function (SupportRequestStatusCategory) {
    SupportRequestStatusCategory["Done"] = "DONE";
    SupportRequestStatusCategory["InProgress"] = "IN_PROGRESS";
    SupportRequestStatusCategory["Open"] = "OPEN";
})(SupportRequestStatusCategory = exports.SupportRequestStatusCategory || (exports.SupportRequestStatusCategory = {}));
/** How to group cards on the board into swimlanes */
var SwimlaneStrategy;
(function (SwimlaneStrategy) {
    SwimlaneStrategy["Assignee"] = "ASSIGNEE";
    SwimlaneStrategy["Issuechildren"] = "ISSUECHILDREN";
    SwimlaneStrategy["Issueparent"] = "ISSUEPARENT";
    SwimlaneStrategy["None"] = "NONE";
})(SwimlaneStrategy = exports.SwimlaneStrategy || (exports.SwimlaneStrategy = {}));
//# sourceMappingURL=graphql-types.js.map