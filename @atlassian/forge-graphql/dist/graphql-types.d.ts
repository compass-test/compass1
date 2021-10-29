export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** AppStoredEntityFieldValue */
    AppStoredEntityFieldValue: any;
    /** Supported colors in the Palette */
    CardPaletteColor: any;
    /** CardTypeHierarchyLevelType */
    CardTypeHierarchyLevelType: any;
    /** A date scalar that accepts string values that are in yyyy-mm-dd format */
    Date: any;
    /** DateTime type */
    DateTime: any;
    /** A JSON scalar */
    JSON: any;
    /** Long type */
    Long: any;
    /** SoftwareBoardFeatureKey */
    SoftwareBoardFeatureKey: any;
    /** SoftwareBoardPermission */
    SoftwareBoardPermission: any;
    /** SprintScopeChangeEventType */
    SprintScopeChangeEventType: any;
    /** A URL Scala type */
    URL: any;
};
/**
 * "
 * The lifecycle status of the account
 */
export declare enum AccountStatus {
    /** The account is an active account */
    Active = "active",
    /** The account has been closed */
    Closed = "closed",
    /** The account is no longer an active account */
    Inactive = "inactive"
}
/**  --------------------------------------- API */
export declare type Activities = {
    __typename?: 'Activities';
    /**
     * get all activity
     * - filters - query filters for the activity stream
     * - first - show 1st <N> items of the response
     */
    all: ActivitiesConnection;
    /** get activity for the currently logged in user */
    myActivities?: Maybe<MyActivities>;
    /**
     * get "Worked on" activity
     * - filters - query filters for the activity stream
     * - first - show 1st <N> items of the response
     */
    workedOn: ActivitiesConnection;
};
/**  --------------------------------------- API */
export declare type ActivitiesAllArgs = {
    after?: Maybe<Scalars['String']>;
    filters?: Maybe<Array<ActivitiesFilter>>;
    first?: Maybe<Scalars['Int']>;
};
/**  --------------------------------------- API */
export declare type ActivitiesWorkedOnArgs = {
    after?: Maybe<Scalars['String']>;
    filters?: Maybe<Array<ActivitiesFilter>>;
    first?: Maybe<Scalars['Int']>;
};
export declare type ActivitiesArguments = {
    /** set of Atlassian account IDs */
    accountIds?: Maybe<Array<Scalars['ID']>>;
    /** set of Cloud IDs */
    cloudIds?: Maybe<Array<Scalars['ID']>>;
    /** set of Container IDs */
    containerIds?: Maybe<Array<Scalars['ID']>>;
    /** The creation time of the earliest events to be included in the result */
    earliestStart?: Maybe<Scalars['DateTime']>;
    /** set of Event Types */
    eventTypes?: Maybe<Array<ActivityEventType>>;
    /** The creation time of the latest events to be included in the result */
    latestStart?: Maybe<Scalars['DateTime']>;
    /** set of Object Types */
    objectTypes?: Maybe<Array<ActivitiesObjectType>>;
    /** set of products */
    products?: Maybe<Array<ActivityProduct>>;
    /** arbitrary transition filters */
    transitions?: Maybe<Array<ActivityTransition>>;
};
/** Extension of ActivitiesEvent, is a part of ActivitiesEventExtension union */
export declare type ActivitiesCommentedEvent = {
    __typename?: 'ActivitiesCommentedEvent';
    commentId: Scalars['ID'];
};
export declare type ActivitiesConnection = {
    __typename?: 'ActivitiesConnection';
    edges?: Maybe<Array<Maybe<ActivityEdge>>>;
    nodes: Array<ActivitiesItem>;
    pageInfo: ActivityPageInfo;
};
export declare type ActivitiesContainer = {
    __typename?: 'ActivitiesContainer';
    cloudId?: Maybe<Scalars['String']>;
    iconUrl?: Maybe<Scalars['URL']>;
    /** Base64 encoded ARI of container. */
    id: Scalars['ID'];
    /** Local (in product) object ID of the corresponding object. */
    localResourceId?: Maybe<Scalars['ID']>;
    name?: Maybe<Scalars['String']>;
    product?: Maybe<ActivityProduct>;
    type?: Maybe<ActivitiesContainerType>;
    url?: Maybe<Scalars['URL']>;
};
export declare enum ActivitiesContainerType {
    Project = "PROJECT",
    Site = "SITE",
    Space = "SPACE"
}
export declare type ActivitiesContributor = {
    __typename?: 'ActivitiesContributor';
    /**
     * count of contributions for sorting by frequency,
     * all event types that is being ingested, except VIEWED and VIEWED_CONTENT
     * is considered to be a contribution
     */
    count?: Maybe<Scalars['Int']>;
    lastAccessedDate?: Maybe<Scalars['DateTime']>;
    profile?: Maybe<User>;
};
export declare type ActivitiesEvent = Node & {
    __typename?: 'ActivitiesEvent';
    eventType?: Maybe<ActivityEventType>;
    extension?: Maybe<ActivitiesEventExtension>;
    /** Unique event ID */
    id: Scalars['ID'];
    timestamp?: Maybe<Scalars['DateTime']>;
    user?: Maybe<ActivitiesUser>;
};
export declare type ActivitiesEventExtension = ActivitiesCommentedEvent | ActivitiesTransitionedEvent;
export declare type ActivitiesFilter = {
    arguments?: Maybe<ActivitiesArguments>;
    /** defines relationship in-between filter arguments (AND/OR) */
    type?: Maybe<ActivitiesFilterType>;
};
export declare enum ActivitiesFilterType {
    And = "AND",
    Or = "OR"
}
export declare type ActivitiesItem = Node & {
    __typename?: 'ActivitiesItem';
    /** Base64 encoded ARI of the activity. */
    id: Scalars['ID'];
    object?: Maybe<ActivitiesObject>;
    timestamp?: Maybe<Scalars['DateTime']>;
};
/** Extension of ActivitiesObject, is a part of ActivitiesObjectExtension union */
export declare type ActivitiesJiraIssue = {
    __typename?: 'ActivitiesJiraIssue';
    issueKey?: Maybe<Scalars['String']>;
};
export declare type ActivitiesObject = Node & {
    __typename?: 'ActivitiesObject';
    cloudId?: Maybe<Scalars['String']>;
    /** Hierarchy of the containers, top container comes first */
    containers?: Maybe<Array<ActivitiesContainer>>;
    contributors?: Maybe<Array<ActivitiesContributor>>;
    events?: Maybe<Array<ActivitiesEvent>>;
    extension?: Maybe<ActivitiesObjectExtension>;
    iconUrl?: Maybe<Scalars['URL']>;
    /** Base64 encoded ARI of the object. */
    id: Scalars['ID'];
    /** Local (in product) object ID of the corresponding object. */
    localResourceId?: Maybe<Scalars['ID']>;
    name?: Maybe<Scalars['String']>;
    parent?: Maybe<ActivitiesObjectParent>;
    product?: Maybe<ActivityProduct>;
    type?: Maybe<ActivityObjectType>;
    url?: Maybe<Scalars['URL']>;
};
export declare type ActivitiesObjectEventsArgs = {
    first?: Maybe<Scalars['Int']>;
};
export declare type ActivitiesObjectExtension = ActivitiesJiraIssue;
export declare type ActivitiesObjectParent = {
    __typename?: 'ActivitiesObjectParent';
    /** Base64 encoded ARI of the object. */
    id: Scalars['ID'];
    type?: Maybe<ActivityObjectType>;
};
export declare enum ActivitiesObjectType {
    Blogpost = "BLOGPOST",
    Issue = "ISSUE",
    Page = "PAGE"
}
/** Extension of ActivitiesEvent, is a part of ActivitiesEventExtension union */
export declare type ActivitiesTransitionedEvent = {
    __typename?: 'ActivitiesTransitionedEvent';
    from?: Maybe<Scalars['String']>;
    to?: Maybe<Scalars['String']>;
};
export declare type ActivitiesUser = {
    __typename?: 'ActivitiesUser';
    profile?: Maybe<User>;
};
export declare type ActivityEdge = {
    __typename?: 'ActivityEdge';
    cursor: Scalars['String'];
    node?: Maybe<ActivitiesItem>;
};
export declare enum ActivityEventType {
    Assigned = "ASSIGNED",
    Commented = "COMMENTED",
    Created = "CREATED",
    Edited = "EDITED",
    Liked = "LIKED",
    Published = "PUBLISHED",
    Transitioned = "TRANSITIONED",
    Unassigned = "UNASSIGNED",
    Updated = "UPDATED",
    Viewed = "VIEWED"
}
export declare enum ActivityObjectType {
    Blogpost = "BLOGPOST",
    Comment = "COMMENT",
    Issue = "ISSUE",
    Page = "PAGE",
    Project = "PROJECT",
    Site = "SITE",
    Space = "SPACE",
    Task = "TASK"
}
export declare type ActivityPageInfo = {
    __typename?: 'ActivityPageInfo';
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
};
export declare enum ActivityProduct {
    Confluence = "CONFLUENCE",
    Jira = "JIRA",
    JiraBusiness = "JIRA_BUSINESS",
    JiraOps = "JIRA_OPS",
    JiraServiceDesk = "JIRA_SERVICE_DESK",
    JiraSoftware = "JIRA_SOFTWARE"
}
/**
 * Represents arbitrary transition,
 * e.g. in case of TRANSITIONED event type it could be `from: "inprogress" to: "done"`.
 */
export declare type ActivityTransition = {
    from?: Maybe<Scalars['String']>;
    to?: Maybe<Scalars['String']>;
};
/** Accepts input for adding labels to a component. */
export declare type AddCompassComponentLabelsInput = {
    /** The ID of the component to add the labels to. */
    componentId: Scalars['ID'];
    /** The collection of labels to add to the component. */
    labelNames: Array<Scalars['String']>;
};
/** The payload returned after adding labels to a component. */
export declare type AddCompassComponentLabelsPayload = Payload & {
    __typename?: 'AddCompassComponentLabelsPayload';
    /** The collection of labels that were added to the component. */
    addedLabels?: Maybe<Array<CompassComponentLabel>>;
    /** The details of the component that was mutated. */
    componentDetails?: Maybe<CompassComponent>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
export declare type AddPolarisColumnInput = {
    /**
     * The column to insert this column before.  If not specified,
     * the new column is added to the right of all columns.
     */
    before?: Maybe<Scalars['ID']>;
    /** The id of the field to add */
    field: Scalars['ID'];
    /** The format to use for the rendering the field's data */
    format?: Maybe<Scalars['String']>;
    /**
     * An override for the column heading; if not specified,
     * the field label should be used.
     */
    heading?: Maybe<Scalars['String']>;
    /** The width to configure on the column */
    width?: Maybe<Scalars['Int']>;
};
/** Only used for inside the schema to mark the context for generic types */
export declare enum ApiContext {
    Devops = "DEVOPS"
}
/**
 * This enum is the names of API groupings within the total Atlassian API.
 *
 * This is used by our documentation tooling to group together types and fields into logical groups
 */
export declare enum ApiGroup {
    Caas = "CAAS",
    Compass = "COMPASS",
    DevopsContainerRelationship = "DEVOPS_CONTAINER_RELATIONSHIP",
    DevopsService = "DEVOPS_SERVICE",
    Forge = "FORGE",
    Jira = "JIRA",
    Polaris = "POLARIS",
    XenLogsApi = "XEN_LOGS_API"
}
export declare type App = {
    __typename?: 'App';
    avatarFileId?: Maybe<Scalars['String']>;
    contactLink?: Maybe<Scalars['String']>;
    createdBy?: Maybe<User>;
    description: Scalars['String'];
    distributionStatus: Scalars['String'];
    environmentByKey?: Maybe<AppEnvironment>;
    environments: Array<AppEnvironment>;
    id: Scalars['ID'];
    marketplaceApp?: Maybe<MarketplaceApp>;
    name: Scalars['String'];
    privacyPolicy?: Maybe<Scalars['String']>;
    storesPersonalData: Scalars['Boolean'];
    /**
     * A list of app tags.
     * This is a beta field and can be changes without a notice.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: AppTags` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    tags?: Maybe<Array<Scalars['String']>>;
    termsOfService?: Maybe<Scalars['String']>;
    vendorName?: Maybe<Scalars['String']>;
};
export declare type AppEnvironmentByKeyArgs = {
    key: Scalars['String'];
};
export declare type AppAuditConnection = {
    __typename?: 'AppAuditConnection';
    edges?: Maybe<Array<Maybe<AuditEventEdge>>>;
    /** nodes field allows easy access for the first N data items */
    nodes?: Maybe<Array<Maybe<AuditEvent>>>;
    /** pageInfo determines whether there are more entries to query. */
    pageInfo?: Maybe<AuditsPageInfo>;
};
export declare type AppConnection = {
    __typename?: 'AppConnection';
    edges?: Maybe<Array<Maybe<AppEdge>>>;
    nodes?: Maybe<Array<Maybe<App>>>;
    pageInfo: PageInfo;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type AppDeployment = {
    __typename?: 'AppDeployment';
    appId: Scalars['ID'];
    createdAt: Scalars['String'];
    createdBy?: Maybe<User>;
    environmentKey: Scalars['String'];
    errorDetails?: Maybe<ErrorDetails>;
    id: Scalars['ID'];
    stages?: Maybe<Array<AppDeploymentStage>>;
    status: AppDeploymentStatus;
};
export declare type AppDeploymentEvent = {
    createdAt: Scalars['String'];
    stepName: Scalars['String'];
};
export declare enum AppDeploymentEventLogLevel {
    Error = "ERROR",
    Info = "INFO",
    Warning = "WARNING"
}
export declare type AppDeploymentLogEvent = AppDeploymentEvent & {
    __typename?: 'AppDeploymentLogEvent';
    createdAt: Scalars['String'];
    level?: Maybe<AppDeploymentEventLogLevel>;
    message?: Maybe<Scalars['String']>;
    stepName: Scalars['String'];
};
export declare type AppDeploymentSnapshotLogEvent = AppDeploymentEvent & {
    __typename?: 'AppDeploymentSnapshotLogEvent';
    createdAt: Scalars['String'];
    level?: Maybe<AppDeploymentEventLogLevel>;
    message?: Maybe<Scalars['String']>;
    stepName: Scalars['String'];
};
export declare type AppDeploymentStage = {
    __typename?: 'AppDeploymentStage';
    description: Scalars['String'];
    events?: Maybe<Array<AppDeploymentEvent>>;
    key: Scalars['String'];
    progress: AppDeploymentStageProgress;
};
export declare type AppDeploymentStageProgress = {
    __typename?: 'AppDeploymentStageProgress';
    doneSteps: Scalars['Int'];
    totalSteps: Scalars['Int'];
};
export declare enum AppDeploymentStatus {
    Done = "DONE",
    Failed = "FAILED",
    InProgress = "IN_PROGRESS"
}
export declare enum AppDeploymentStepStatus {
    Done = "DONE",
    Failed = "FAILED",
    Started = "STARTED"
}
export declare type AppDeploymentTransitionEvent = AppDeploymentEvent & {
    __typename?: 'AppDeploymentTransitionEvent';
    createdAt: Scalars['String'];
    newStatus?: Maybe<AppDeploymentStepStatus>;
    stepName: Scalars['String'];
};
export declare type AppEdge = {
    __typename?: 'AppEdge';
    cursor: Scalars['String'];
    node?: Maybe<App>;
};
export declare type AppEnvironment = {
    __typename?: 'AppEnvironment';
    appId: Scalars['ID'];
    createdAt: Scalars['String'];
    createdBy?: Maybe<User>;
    /**
     * This field is currently in BETA - set X-ExperimentalApi-xls-last-deployments-v0 to call it.
     * A list of deployments for app environment
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: xls-last-deployments-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    deployments?: Maybe<Array<AppDeployment>>;
    id: Scalars['ID'];
    /** A list of installations of the app */
    installations?: Maybe<Array<AppInstallation>>;
    key: Scalars['String'];
    /** Primary oauth client for the App to interact with Atlassian Authorisation server */
    oauthClient: AtlassianOAuthClient;
    /**
     * This field is **deprecated** and will be removed in the future
     * @deprecated This has been superseeded by having scopes per version
     */
    scopes?: Maybe<Array<Scalars['String']>>;
    type: AppEnvironmentType;
    variables?: Maybe<Array<AppEnvironmentVariable>>;
    /** The list of major versions for this environment in reverse chronological order (i.e. latest versions first) */
    versions?: Maybe<AppEnvironmentVersionConnection>;
};
export declare type AppEnvironmentVersionsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
/** Used to uniquely identify an environment, when being used as an input. */
export declare type AppEnvironmentInput = {
    appId: Scalars['ID'];
    key: Scalars['String'];
};
export declare enum AppEnvironmentType {
    Development = "DEVELOPMENT",
    Production = "PRODUCTION",
    Staging = "STAGING"
}
export declare type AppEnvironmentVariable = {
    __typename?: 'AppEnvironmentVariable';
    /** Whether or not to encrypt */
    encrypt: Scalars['Boolean'];
    /** The key of the environment variable */
    key: Scalars['String'];
    /** The value of the environment variable */
    value?: Maybe<Scalars['String']>;
};
/** The input needed to create or update an environment variable. */
export declare type AppEnvironmentVariableInput = {
    /** Whether or not to encrypt (default=false) */
    encrypt?: Maybe<Scalars['Boolean']>;
    /** The key of the environment variable */
    key: Scalars['String'];
    /** The value of the environment variable */
    value: Scalars['String'];
};
/**
 * Represents a major version of an AppEnvironment.
 * A major version is one that requires consent from end users before upgrading installations, typically a change in
 * the permissions an App requires.
 * Other changes do not trigger a new major version to be created and are instead applied to the latest major version
 */
export declare type AppEnvironmentVersion = {
    __typename?: 'AppEnvironmentVersion';
    id: Scalars['ID'];
    /** a flag which if true indicates this version is the latest major version for this environment */
    isLatest: Scalars['Boolean'];
    /** A set of migrationKeys for each product corresponding to the Connect App Key */
    migrationKeys?: Maybe<MigrationKeys>;
    /** The permissions that this app requires on installation. These must be consented to by the installer */
    permissions: Array<AppPermission>;
    /** A flag which indicates if this version requires a license */
    requiresLicense: Scalars['Boolean'];
    /** The semver for this version (e.g. 2.4.0) */
    version: Scalars['String'];
};
export declare type AppEnvironmentVersionConnection = {
    __typename?: 'AppEnvironmentVersionConnection';
    /** A paginated list of AppEnvironmentVersions */
    edges?: Maybe<Array<Maybe<AppEnvironmentVersionEdge>>>;
    /** nodes field allows easy access for the first N data items */
    nodes?: Maybe<Array<Maybe<AppEnvironmentVersion>>>;
    /** pageInfo determines whether there are more entries to query */
    pageInfo: PageInfo;
    /** totalCount is the number of records retrieved on a query */
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type AppEnvironmentVersionEdge = {
    __typename?: 'AppEnvironmentVersionEdge';
    cursor: Scalars['String'];
    node?: Maybe<AppEnvironmentVersion>;
};
export declare type AppHostService = {
    __typename?: 'AppHostService';
    description: Scalars['String'];
    name: Scalars['String'];
    scopes?: Maybe<Array<AppHostServiceScope>>;
    serviceId: Scalars['ID'];
};
export declare type AppHostServiceScope = {
    __typename?: 'AppHostServiceScope';
    description: Scalars['String'];
    key: Scalars['String'];
    name: Scalars['String'];
    service: AppHostService;
};
export declare type AppInstallation = {
    __typename?: 'AppInstallation';
    /** An object that refers to the installed app */
    app?: Maybe<App>;
    /** An object that refers to the installed app environment */
    appEnvironment?: Maybe<AppEnvironment>;
    /** An object that refers to the installed app environment version */
    appEnvironmentVersion?: Maybe<AppEnvironmentVersion>;
    /** Time when the app was installed */
    createdAt: Scalars['String'];
    /** An object that refers to the account that installed the app */
    createdBy?: Maybe<User>;
    /** A unique Id representing installation the app into a context in the environment */
    id: Scalars['ID'];
    /** A unique Id representing the context into which the app is being installed */
    installationContext: Scalars['ID'];
    license?: Maybe<AppInstallationLicense>;
    /** An object that refers to the version of the installation */
    version?: Maybe<AppVersion>;
};
export declare type AppInstallationConnection = {
    __typename?: 'AppInstallationConnection';
    edges?: Maybe<Array<Maybe<AppInstallationEdge>>>;
    nodes?: Maybe<Array<Maybe<AppInstallation>>>;
    pageInfo: PageInfo;
};
export declare type AppInstallationContext = {
    __typename?: 'AppInstallationContext';
    id: Scalars['ID'];
};
export declare type AppInstallationCreationTask = AppInstallationTask & {
    __typename?: 'AppInstallationCreationTask';
    appEnvironmentId?: Maybe<Scalars['ID']>;
    appId: Scalars['ID'];
    appVersionId?: Maybe<Scalars['ID']>;
    context: Scalars['ID'];
    errors?: Maybe<Array<MutationError>>;
    id: Scalars['ID'];
    state: AppTaskState;
};
export declare type AppInstallationDeletionTask = AppInstallationTask & {
    __typename?: 'AppInstallationDeletionTask';
    appEnvironmentId?: Maybe<Scalars['ID']>;
    appId: Scalars['ID'];
    context: Scalars['ID'];
    errors?: Maybe<Array<MutationError>>;
    id: Scalars['ID'];
    state: AppTaskState;
};
export declare type AppInstallationEdge = {
    __typename?: 'AppInstallationEdge';
    cursor: Scalars['String'];
    node?: Maybe<AppInstallation>;
};
/** Input payload for the app environment install mutation */
export declare type AppInstallationInput = {
    /** A unique Id representing the app */
    appId: Scalars['ID'];
    /** Whether the installation will be done asynchronously */
    async?: Maybe<Scalars['Boolean']>;
    /** The key of the app's environment to be used for installation */
    environmentKey: Scalars['String'];
    /** A unique Id representing the context into which the app is being installed */
    installationContext: Scalars['ID'];
    /** Bypass licensing flow if licenseOverride is set */
    licenseOverride?: Maybe<LicenseOverrideState>;
    /** A unique Id representing a specific version of an app */
    versionId?: Maybe<Scalars['ID']>;
};
export declare type AppInstallationLicense = {
    __typename?: 'AppInstallationLicense';
    active: Scalars['Boolean'];
    billingPeriod?: Maybe<Scalars['String']>;
    isEvaluation?: Maybe<Scalars['Boolean']>;
    subscriptionEndDate?: Maybe<Scalars['DateTime']>;
    supportEntitlementNumber?: Maybe<Scalars['String']>;
    trialEndDate?: Maybe<Scalars['DateTime']>;
    type?: Maybe<Scalars['String']>;
};
/** The response from the installation of an app environment */
export declare type AppInstallationResponse = Payload & {
    __typename?: 'AppInstallationResponse';
    errors?: Maybe<Array<MutationError>>;
    installationId?: Maybe<Scalars['ID']>;
    success: Scalars['Boolean'];
    taskId?: Maybe<Scalars['ID']>;
};
export declare type AppInstallationSubscribeTask = AppInstallationTask & {
    __typename?: 'AppInstallationSubscribeTask';
    appEnvironmentId?: Maybe<Scalars['ID']>;
    appId: Scalars['ID'];
    context: Scalars['ID'];
    errors?: Maybe<Array<MutationError>>;
    id: Scalars['ID'];
    state: AppTaskState;
};
export declare type AppInstallationTask = {
    appEnvironmentId?: Maybe<Scalars['ID']>;
    appId: Scalars['ID'];
    errors?: Maybe<Array<MutationError>>;
    id: Scalars['ID'];
    state: AppTaskState;
};
export declare type AppInstallationUnsubscribeTask = AppInstallationTask & {
    __typename?: 'AppInstallationUnsubscribeTask';
    appEnvironmentId?: Maybe<Scalars['ID']>;
    appId: Scalars['ID'];
    context: Scalars['ID'];
    errors?: Maybe<Array<MutationError>>;
    id: Scalars['ID'];
    state: AppTaskState;
};
/** Input payload for the app environment upgrade mutation */
export declare type AppInstallationUpgradeInput = {
    /** A unique Id representing the app */
    appId: Scalars['ID'];
    /** Whether the installation upgrade will be done asynchronously */
    async?: Maybe<Scalars['Boolean']>;
    /** The key of the app's environment to be used for installation upgrade */
    environmentKey: Scalars['String'];
    /** A unique Id representing the context into which the app is being upgraded */
    installationContext: Scalars['ID'];
    /** A unique Id representing a specific major version of the app */
    versionId?: Maybe<Scalars['ID']>;
};
/** The response from the installation upgrade of an app environment */
export declare type AppInstallationUpgradeResponse = Payload & {
    __typename?: 'AppInstallationUpgradeResponse';
    errors?: Maybe<Array<MutationError>>;
    installationId?: Maybe<Scalars['ID']>;
    success: Scalars['Boolean'];
    taskId?: Maybe<Scalars['ID']>;
};
export declare type AppInstallationUpgradeTask = AppInstallationTask & {
    __typename?: 'AppInstallationUpgradeTask';
    appEnvironmentId?: Maybe<Scalars['ID']>;
    appId: Scalars['ID'];
    appVersionId?: Maybe<Scalars['ID']>;
    context: Scalars['ID'];
    errors?: Maybe<Array<MutationError>>;
    id: Scalars['ID'];
    state: AppTaskState;
};
export declare type AppInstallationsFilter = {
    appId: Scalars['ID'];
    environmentType?: Maybe<AppEnvironmentType>;
};
export declare type AppLog = FunctionInvocationMetadata & Node & {
    __typename?: 'AppLog';
    /**
     * Gets up to 200 earliest log lines for this invocation.
     * For getting more log lines use appLogLines field in Query type.
     */
    appLogLines?: Maybe<AppLogLines>;
    appVersion: Scalars['String'];
    function?: Maybe<FunctionDescription>;
    id: Scalars['ID'];
    installationContext?: Maybe<AppInstallationContext>;
    moduleType?: Maybe<Scalars['String']>;
    /**
     * The start time of the invocation
     *
     * RFC-3339 formatted timestamp.
     */
    startTime?: Maybe<Scalars['String']>;
    trigger?: Maybe<FunctionTrigger>;
};
export declare type AppLogAppLogLinesArgs = {
    first?: Maybe<Scalars['Int']>;
};
/** Relay-style Connection to `AppLog` objects. */
export declare type AppLogConnection = {
    __typename?: 'AppLogConnection';
    edges?: Maybe<Array<Maybe<AppLogEdge>>>;
    nodes?: Maybe<Array<Maybe<AppLog>>>;
    pageInfo: PageInfo;
};
/** Relay-style Edge to an `AppLog` object. */
export declare type AppLogEdge = {
    __typename?: 'AppLogEdge';
    cursor: Scalars['String'];
    node: AppLog;
};
export declare type AppLogLine = {
    __typename?: 'AppLogLine';
    /**
     * Log level of log line.  Typically one of:
     * TRACE, DEBUG, INFO, WARN, ERROR, FATAL
     */
    level?: Maybe<Scalars['String']>;
    /** The free-form textual message from the log statement. */
    message?: Maybe<Scalars['String']>;
    /**
     * We really don't know what other fields may be in the logs.
     *
     * This field may be an array or an object.
     *
     * If it's an object, it will include only fields in `includeFields`,
     * unless `includeFields` is null, in which case it will include
     * all fields that are not in `excludeFields`.
     *
     * If it's an array it will include the entire array.
     */
    other?: Maybe<Scalars['JSON']>;
    /**
     * Time the log line was issued
     *
     * RFC-3339 formatted timestamp
     */
    timestamp: Scalars['String'];
};
/** Relay-style Connection to `AppLogLine` objects. */
export declare type AppLogLineConnection = {
    __typename?: 'AppLogLineConnection';
    edges?: Maybe<Array<Maybe<AppLogLineEdge>>>;
    /** Metadata about the function invocation (applies to all log lines of invocation) */
    metadata: FunctionInvocationMetadata;
    nodes?: Maybe<Array<Maybe<AppLogLine>>>;
    pageInfo: PageInfo;
};
/** Relay-style Edge to an `AppLogLine` object. */
export declare type AppLogLineEdge = {
    __typename?: 'AppLogLineEdge';
    cursor: Scalars['String'];
    node: AppLogLine;
};
/**
 * AppLogLines returned from AppLog query.
 *
 * Not quite a Relay-style Connection since you can't page from this query.
 */
export declare type AppLogLines = {
    __typename?: 'AppLogLines';
    edges?: Maybe<Array<Maybe<AppLogLineEdge>>>;
    nodes?: Maybe<Array<Maybe<AppLogLine>>>;
    pageInfo: PageInfo;
};
export declare type AppNetworkEgressPermission = {
    __typename?: 'AppNetworkEgressPermission';
    addresses?: Maybe<Array<Scalars['String']>>;
    type?: Maybe<AppNetworkPermissionType>;
};
export declare type AppNetworkEgressPermissionExtension = {
    __typename?: 'AppNetworkEgressPermissionExtension';
    addresses?: Maybe<Array<Scalars['String']>>;
    type?: Maybe<AppNetworkPermissionTypeExtension>;
};
export declare enum AppNetworkPermissionType {
    FetchBackendSide = "FETCH_BACKEND_SIDE",
    FetchClientSide = "FETCH_CLIENT_SIDE",
    Fonts = "FONTS",
    Frames = "FRAMES",
    Images = "IMAGES",
    Media = "MEDIA",
    Navigation = "NAVIGATION",
    Scripts = "SCRIPTS",
    Styles = "STYLES"
}
export declare enum AppNetworkPermissionTypeExtension {
    FetchBackendSide = "FETCH_BACKEND_SIDE",
    FetchClientSide = "FETCH_CLIENT_SIDE",
    Fonts = "FONTS",
    Frames = "FRAMES",
    Images = "IMAGES",
    Media = "MEDIA",
    Navigation = "NAVIGATION",
    Scripts = "SCRIPTS",
    Styles = "STYLES"
}
/** Permissions that relate to the App's interaction with supported APIs and supported network egress */
export declare type AppPermission = {
    __typename?: 'AppPermission';
    egress?: Maybe<Array<AppNetworkEgressPermission>>;
    scopes: Array<AppHostServiceScope>;
    securityPolicies?: Maybe<Array<AppSecurityPoliciesPermission>>;
};
export declare type AppSecurityPoliciesPermission = {
    __typename?: 'AppSecurityPoliciesPermission';
    policies?: Maybe<Array<Scalars['String']>>;
    type?: Maybe<AppSecurityPoliciesPermissionType>;
};
export declare type AppSecurityPoliciesPermissionExtension = {
    __typename?: 'AppSecurityPoliciesPermissionExtension';
    policies?: Maybe<Array<Scalars['String']>>;
    type?: Maybe<AppSecurityPoliciesPermissionTypeExtension>;
};
export declare enum AppSecurityPoliciesPermissionType {
    Scripts = "SCRIPTS",
    Styles = "STYLES"
}
export declare enum AppSecurityPoliciesPermissionTypeExtension {
    Scripts = "SCRIPTS",
    Styles = "STYLES"
}
export declare type AppServicesFilter = {
    name: Scalars['String'];
};
export declare type AppStorageMutation = {
    __typename?: 'AppStorageMutation';
    /**
     * Delete an untyped entity in a specific context given a key
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: AppEntityStorage` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    deleteAppStoredEntity?: Maybe<DeleteAppStoredEntityPayload>;
    /**
     * Set an untyped entity in a specific context given a key
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: AppEntityStorage` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    setAppStoredEntity?: Maybe<SetAppStoredEntityPayload>;
};
export declare type AppStorageMutationDeleteAppStoredEntityArgs = {
    input: DeleteAppStoredEntityMutationInput;
};
export declare type AppStorageMutationSetAppStoredEntityArgs = {
    input: SetAppStoredEntityMutationInput;
};
export declare type AppStoredEntity = {
    __typename?: 'AppStoredEntity';
    /**
     * The identifier for this entity
     *
     * Keys must be between 1-100 characters long and must match the following pattern /^[a-zA-Z0-9:._\s-]+$/
     */
    key: Scalars['ID'];
    /**
     * Entities may be up to 2000 bytes long. Note that size within ESS may differ from
     * the size of the entity sent to this service. The entity size is counted within this service.
     */
    value?: Maybe<Scalars['JSON']>;
};
export declare enum AppStoredEntityCondition {
    StartsWith = "STARTS_WITH"
}
export declare type AppStoredEntityConnection = {
    __typename?: 'AppStoredEntityConnection';
    /** The AppStoredEntityConnection is a paginated list of Entities from storage service */
    edges?: Maybe<Array<Maybe<AppStoredEntityEdge>>>;
    /** nodes field allows easy access for the first N data items */
    nodes?: Maybe<Array<Maybe<AppStoredEntity>>>;
    /** pageInfo determines whether there are more entries to query. */
    pageInfo?: Maybe<AppStoredEntityPageInfo>;
    /** totalCount is the number of records retrived on a query. */
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type AppStoredEntityEdge = {
    __typename?: 'AppStoredEntityEdge';
    /**
     * Edge is a combination of node and cursor and follows the relay specs.
     *
     * Cursor returns the key of the last record that was queried and
     * should be used as input to after when querying for paginated entities
     */
    cursor: Scalars['String'];
    node?: Maybe<AppStoredEntity>;
};
/**
 * The identifier for this entity
 *
 * where condition to filter
 */
export declare type AppStoredEntityFilter = {
    condition: AppStoredEntityCondition;
    /** Condition filter to be provided when querying for Entities. */
    field: Scalars['String'];
    value: Scalars['AppStoredEntityFieldValue'];
};
export declare type AppStoredEntityPageInfo = {
    __typename?: 'AppStoredEntityPageInfo';
    /** The pageInfo is the place to allow code to navigate the paginated list. */
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
};
export declare type AppSubscribeInput = {
    appId: Scalars['ID'];
    envKey: Scalars['String'];
    installationContext: Scalars['ID'];
};
export declare type AppSubscribePayload = Payload & {
    __typename?: 'AppSubscribePayload';
    errors?: Maybe<Array<MutationError>>;
    installation?: Maybe<AppInstallation>;
    success: Scalars['Boolean'];
    taskId?: Maybe<Scalars['ID']>;
};
export declare enum AppTaskState {
    Complete = "COMPLETE",
    Failed = "FAILED",
    Pending = "PENDING",
    Running = "RUNNING"
}
export declare type AppTunnelDefinitions = {
    __typename?: 'AppTunnelDefinitions';
    customUI?: Maybe<Array<Maybe<CustomUiTunnelDefinition>>>;
    /** The URL to tunnel FaaS calls to */
    faasTunnelUrl?: Maybe<Scalars['URL']>;
};
/** Input payload for the app environment uninstall mutation */
export declare type AppUninstallationInput = {
    /** A unique Id representing the app */
    appId: Scalars['ID'];
    /** Whether the installation will be done asynchronously */
    async?: Maybe<Scalars['Boolean']>;
    /** The key of the app's environment to be used for uninstallation */
    environmentKey: Scalars['String'];
    /** A unique Id representing the context into which the app is being uninstalled */
    installationContext?: Maybe<Scalars['ID']>;
    /** A unique Id representing the installationId" */
    installationId?: Maybe<Scalars['ID']>;
    /** Bypass licensing flow if licenseOverride is set */
    licenseOverride?: Maybe<LicenseOverrideState>;
};
/** The response from the uninstallation of an app environment */
export declare type AppUninstallationResponse = Payload & {
    __typename?: 'AppUninstallationResponse';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
    taskId?: Maybe<Scalars['ID']>;
};
export declare type AppUnsubscribeInput = {
    appId: Scalars['ID'];
    envKey: Scalars['String'];
    installationContext: Scalars['ID'];
};
export declare type AppUnsubscribePayload = Payload & {
    __typename?: 'AppUnsubscribePayload';
    errors?: Maybe<Array<MutationError>>;
    installation?: Maybe<AppInstallation>;
    success: Scalars['Boolean'];
    taskId?: Maybe<Scalars['ID']>;
};
/**
 * This does not represent a real person but rather the identity that backs an installed application
 *
 * See the documentation on the `User` for more details
 */
export declare type AppUser = User & {
    __typename?: 'AppUser';
    accountId: Scalars['ID'];
    accountStatus: AccountStatus;
    name: Scalars['String'];
    picture: Scalars['URL'];
};
export declare type AppVersion = {
    __typename?: 'AppVersion';
    isLatest: Scalars['Boolean'];
};
/** The payload returned from applying a scorecard to a component. */
export declare type ApplyCompassScorecardToComponentPayload = Payload & {
    __typename?: 'ApplyCompassScorecardToComponentPayload';
    /**
     * The details of the component that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    componentDetails?: Maybe<CompassComponent>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
export declare type ApplyPolarisProjectTemplateInput = {
    ideaType: Scalars['ID'];
    project: Scalars['ID'];
    template: Scalars['ID'];
};
export declare type ApplyPolarisProjectTemplatePayload = Payload & {
    __typename?: 'ApplyPolarisProjectTemplatePayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type AppsFilter = {
    isPublishable?: Maybe<Scalars['Boolean']>;
    migrationKey?: Maybe<Scalars['String']>;
};
export declare type ArchivePolarisInsightsPayload = Payload & {
    __typename?: 'ArchivePolarisInsightsPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type ArjConfiguration = {
    __typename?: 'ArjConfiguration';
    epicLinkCustomFieldId?: Maybe<Scalars['String']>;
    parentCustomFieldId?: Maybe<Scalars['String']>;
};
export declare type ArjHierarchyConfigurationLevel = {
    __typename?: 'ArjHierarchyConfigurationLevel';
    issueTypes?: Maybe<Array<Scalars['String']>>;
    title: Scalars['String'];
};
export declare type AssignIssueParentInput = {
    boardId: Scalars['ID'];
    issueIds: Array<Scalars['ID']>;
    issueParentId: Scalars['ID'];
};
export declare type AssignIssueParentOutput = MutationResponse & {
    __typename?: 'AssignIssueParentOutput';
    boardScope?: Maybe<BoardScope>;
    clientMutationId?: Maybe<Scalars['ID']>;
    message: Scalars['String'];
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
/**
 * This represents a real person that has an account in a wide range of Atlassian products
 *
 * See the documentation on the `User` and `LocalizationContext` for more details
 */
export declare type AtlassianAccountUser = LocalizationContext & User & {
    __typename?: 'AtlassianAccountUser';
    accountId: Scalars['ID'];
    accountStatus: AccountStatus;
    email?: Maybe<Scalars['String']>;
    locale?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    picture: Scalars['URL'];
    zoneinfo?: Maybe<Scalars['String']>;
};
export declare type AtlassianOAuthClient = {
    __typename?: 'AtlassianOAuthClient';
    /** Callback url where the users are redirected once the authentication is complete */
    callbacks?: Maybe<Array<Scalars['String']>>;
    /** Identifier of the client for authentication */
    clientID: Scalars['ID'];
    /** Rotating refresh token status for the auth client */
    refreshToken?: Maybe<RefreshToken>;
};
/** Hosting type where Atlassian product instance is installed. */
export declare enum AtlassianProductHostingType {
    Cloud = "CLOUD",
    DataCenter = "DATA_CENTER",
    Server = "SERVER"
}
/** Accepts input to attach a data manager to a component. */
export declare type AttachCompassComponentDataManagerInput = {
    /** The ID of the component to attach a data manager to. */
    componentId: Scalars['ID'];
    /** An URL of the external source of the component's data. */
    externalSourceURL?: Maybe<Scalars['URL']>;
};
/** The payload returned from attaching a data manager to a component. */
export declare type AttachCompassComponentDataManagerPayload = Payload & {
    __typename?: 'AttachCompassComponentDataManagerPayload';
    /**
     * The details of the component that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    componentDetails?: Maybe<CompassComponent>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
export declare type AttachEventSourceInput = {
    /** The ID of the component to attach the event source to. */
    componentId: Scalars['ID'];
    /** The ID of the event source. */
    eventSourceId: Scalars['ID'];
};
export declare type AttachEventSourcePayload = Payload & {
    __typename?: 'AttachEventSourcePayload';
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
export declare type AuditEvent = {
    __typename?: 'AuditEvent';
    /** The attributes of an audit event */
    attributes: AuditEventAttributes;
    /** Audit Event Id */
    id: Scalars['ID'];
    /** Message with content and format to be displayed */
    message?: Maybe<AuditMessageObject>;
};
export declare type AuditEventAttributes = {
    __typename?: 'AuditEventAttributes';
    /** The action for audit log event */
    action: Scalars['String'];
    /** The Actor who created the event */
    actor?: Maybe<User>;
    /** The Container EventObjects for this event */
    container: Array<Maybe<ContainerEventObject>>;
    /** The Context EventObjects for this event */
    context: Array<Maybe<ContextEventObject>>;
    /** The time when the event occurred */
    time: Scalars['String'];
};
export declare type AuditEventEdge = {
    __typename?: 'AuditEventEdge';
    cursor: Scalars['String'];
    node?: Maybe<AuditEvent>;
};
export declare type AuditMessageObject = {
    __typename?: 'AuditMessageObject';
    content?: Maybe<Scalars['String']>;
    format?: Maybe<Scalars['String']>;
};
export declare type AuditsPageInfo = {
    __typename?: 'AuditsPageInfo';
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
};
export declare type AuthToken = {
    __typename?: 'AuthToken';
    token: Scalars['String'];
    ttl: Scalars['Int'];
};
/** This type contains information about the currently logged in user */
export declare type AuthenticationContext = {
    __typename?: 'AuthenticationContext';
    /** Information about the currently logged in user. */
    user?: Maybe<User>;
};
/** Payload to invoke an AUX Effect */
export declare type AuxEffectsInvocationPayload = {
    /** Configuration arguments for the instance of the AUX extension */
    config?: Maybe<Scalars['JSON']>;
    /** Environment information about where the effects are dispatched from */
    context: Scalars['JSON'];
    /** The effects to action inside the function */
    effects: Array<Scalars['JSON']>;
    /** The current state of the AUX extension */
    state: Scalars['JSON'];
};
/** A response to an aux invocation */
export declare type AuxEffectsResult = {
    __typename?: 'AuxEffectsResult';
    /**
     * The list of effects in response to an aux effects invocation.
     *
     * Render effects should return valid rendering effects to the invoker,
     * to allow the front-end to render the required content. These are kept as
     * generic JSON blobs since consumers of this API are responsible for defining
     * what these effects look like.
     */
    effects: Array<Scalars['JSON']>;
};
export declare type AvailableEstimations = {
    __typename?: 'AvailableEstimations';
    /** Name of the estimation. */
    name: Scalars['String'];
    /** Unique identifier of the estimation. Temporary naming until we remove "statistic" from Jira. */
    statisticFieldId: Scalars['String'];
};
/** The input for a Avatar for a Third Party Repository */
export declare type AvatarInput = {
    /** The description of the avatar. */
    description?: Maybe<Scalars['String']>;
    /** The URL of the avatar. */
    webUrl?: Maybe<Scalars['String']>;
};
export declare type Backlog = {
    __typename?: 'Backlog';
    /** List of the assignees of all cards currently displayed on the backlog */
    assignees?: Maybe<Array<Maybe<User>>>;
    /**
     * Temporarily needed to support legacy write API_.  the issue list key to use when creating issue's on the board.
     * Required when creating issues on a board with backlogs
     */
    boardIssueListKey?: Maybe<Scalars['String']>;
    /** List of card types which can be created directly on the backlog or sprints */
    cardTypes: Array<Maybe<CardType>>;
    cards: Array<Maybe<SoftwareCard>>;
    /** connect add-ons information */
    extension?: Maybe<BacklogExtension>;
    /** Labels for filtering and adding to cards */
    labels: Array<Maybe<Scalars['String']>>;
    /** Whether or not to show the 'migrate this column to your backlog' prompt (set when first enabling backlogs) */
    requestColumnMigration: Scalars['Boolean'];
};
export declare type BacklogCardsArgs = {
    cardIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type BacklogExtension = {
    __typename?: 'BacklogExtension';
    /** list of operations that add-on can perform */
    operations?: Maybe<Array<Maybe<SoftwareOperation>>>;
};
/** Bitbucket Permission Enum */
export declare enum BitbucketPermission {
    /** Bitbucket admin permission */
    Admin = "ADMIN"
}
export declare type BitbucketQuery = {
    __typename?: 'BitbucketQuery';
    /** Look up the Bitbucket repository by ARI. */
    bitbucketRepository?: Maybe<BitbucketRepository>;
    /** Look up the Bitbucket workspace by ARI. */
    bitbucketWorkspace?: Maybe<BitbucketWorkspace>;
};
export declare type BitbucketQueryBitbucketRepositoryArgs = {
    id: Scalars['ID'];
};
export declare type BitbucketQueryBitbucketWorkspaceArgs = {
    id: Scalars['ID'];
};
export declare type BitbucketRepository = Node & {
    __typename?: 'BitbucketRepository';
    /** The Bitbucket avatar. */
    avatar?: Maybe<BitbucketRepositoryAvatar>;
    /**
     * The connection entity for DevOps Service relationships for this Bitbucket repository, according to the specified
     * pagination, filtering and sorting.
     */
    devOpsServiceRelationships?: Maybe<DevOpsServiceAndRepositoryRelationshipConnection>;
    /** The ARI of the Bitbucket repository. */
    id: Scalars['ID'];
    /**
     * The connection entity for Jira project relationships for this Bitbucket repository, according to the specified
     * pagination, filtering and sorting.
     */
    jiraProjectRelationships?: Maybe<JiraProjectAndRepositoryRelationshipConnection>;
    /** Name of Bitbucket repository. */
    name: Scalars['String'];
    /** URI for accessing Bitbucket repository. */
    webUrl: Scalars['URL'];
    /** Bitbucket workspace the repository is part of. */
    workspace?: Maybe<BitbucketWorkspace>;
};
export declare type BitbucketRepositoryDevOpsServiceRelationshipsArgs = {
    after?: Maybe<Scalars['String']>;
    filter?: Maybe<DevOpsServiceAndRepositoryRelationshipFilter>;
    first?: Maybe<Scalars['Int']>;
    sort?: Maybe<DevOpsServiceAndRepositoryRelationshipSort>;
};
export declare type BitbucketRepositoryJiraProjectRelationshipsArgs = {
    after?: Maybe<Scalars['String']>;
    cloudId: Scalars['ID'];
    filter?: Maybe<JiraProjectAndRepositoryRelationshipFilter>;
    first?: Maybe<Scalars['Int']>;
    sort?: Maybe<JiraProjectAndRepositoryRelationshipSort>;
};
export declare type BitbucketRepositoryAvatar = {
    __typename?: 'BitbucketRepositoryAvatar';
    /** URI for retrieving Bitbucket avatar. */
    url: Scalars['URL'];
};
export declare type BitbucketRepositoryConnection = {
    __typename?: 'BitbucketRepositoryConnection';
    edges?: Maybe<Array<Maybe<BitbucketRepositoryEdge>>>;
    nodes?: Maybe<Array<Maybe<BitbucketRepository>>>;
    pageInfo: PageInfo;
};
export declare type BitbucketRepositoryEdge = {
    __typename?: 'BitbucketRepositoryEdge';
    cursor: Scalars['String'];
    node?: Maybe<BitbucketRepository>;
};
export declare type BitbucketRepositoryIdConnection = {
    __typename?: 'BitbucketRepositoryIdConnection';
    edges?: Maybe<Array<Maybe<BitbucketRepositoryIdEdge>>>;
    pageInfo: PageInfo;
};
export declare type BitbucketRepositoryIdEdge = {
    __typename?: 'BitbucketRepositoryIdEdge';
    cursor: Scalars['String'];
    node?: Maybe<BitbucketRepository>;
};
export declare type BitbucketWorkspace = Node & {
    __typename?: 'BitbucketWorkspace';
    /** The ARI of the Bitbucket workspace. */
    id: Scalars['ID'];
    /** Name of the Bitbucket workspace. */
    name: Scalars['String'];
    /**
     * List of Bitbucket Repositories belong to the Bitbucket Workspace
     * The returned repositories are filtered based on user permission and role-value specified by permissionFilter argument.
     * If no permissionFilter specified, the list contains all repositories that user can access.
     */
    repositories?: Maybe<BitbucketRepositoryConnection>;
};
export declare type BitbucketWorkspaceRepositoriesArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    permissionFilter?: Maybe<BitbucketPermission>;
};
export declare type BoardCardMoveInput = {
    /** the ID of a board */
    boardId?: Maybe<Scalars['ID']>;
    /** The IDs of cards to move */
    cardIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
    /** Card information on where card should be positioned */
    rank?: Maybe<CardRank>;
    /** The swimlane position, which might set additional fields */
    swimlaneId?: Maybe<Scalars['ID']>;
    /** The ID of the transition */
    transition?: Maybe<Scalars['ID']>;
};
export declare type BoardEditConfig = {
    __typename?: 'BoardEditConfig';
    /** Configuration for showing inline card create */
    inlineCardCreate?: Maybe<InlineCardCreateConfig>;
    /** Configuration for showing inline column mutations */
    inlineColumnEdit?: Maybe<InlineColumnEditConfig>;
};
export declare type BoardFeature = {
    __typename?: 'BoardFeature';
    category: Scalars['String'];
    key?: Maybe<Scalars['SoftwareBoardFeatureKey']>;
    prerequisites?: Maybe<Array<Maybe<BoardFeature>>>;
    status?: Maybe<BoardFeatureStatus>;
    toggle?: Maybe<BoardFeatureToggleStatus>;
};
/** Relay connection definition for a list of board features */
export declare type BoardFeatureConnection = {
    __typename?: 'BoardFeatureConnection';
    edges?: Maybe<Array<Maybe<BoardFeatureEdge>>>;
    pageInfo?: Maybe<PageInfo>;
};
/** Relay edge definition for a board feature */
export declare type BoardFeatureEdge = {
    __typename?: 'BoardFeatureEdge';
    /** The cursor position of this edge. Used for pagination */
    cursor?: Maybe<Scalars['String']>;
    /** The feature group of the edge */
    node?: Maybe<BoardFeatureView>;
    /** The order of this edge */
    order?: Maybe<Scalars['Int']>;
};
export declare type BoardFeatureGroup = Node & {
    __typename?: 'BoardFeatureGroup';
    /** The board features in this group */
    features?: Maybe<BoardFeatureConnection>;
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
};
/** Relay connection definition for a list of board feature groups */
export declare type BoardFeatureGroupConnection = {
    __typename?: 'BoardFeatureGroupConnection';
    /** The list of edges of this connection */
    edges?: Maybe<Array<Maybe<BoardFeatureGroupEdge>>>;
    /** Page detail for pagination */
    pageInfo?: Maybe<PageInfo>;
};
/** Relay edge definition for a board feature group */
export declare type BoardFeatureGroupEdge = {
    __typename?: 'BoardFeatureGroupEdge';
    /** The cursor position of this edge. Used for pagination */
    cursor?: Maybe<Scalars['String']>;
    /** The board feature group of the edge */
    node?: Maybe<BoardFeatureGroup>;
    /** The order of this edge */
    order?: Maybe<Scalars['Int']>;
};
export declare enum BoardFeatureStatus {
    ComingSoon = "COMING_SOON",
    Disabled = "DISABLED",
    Enabled = "ENABLED"
}
export declare enum BoardFeatureToggleStatus {
    Disabled = "DISABLED",
    Enabled = "ENABLED"
}
export declare type BoardFeatureView = Node & {
    __typename?: 'BoardFeatureView';
    canEnable?: Maybe<Scalars['Boolean']>;
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    isEnabled?: Maybe<Scalars['Boolean']>;
    title?: Maybe<Scalars['String']>;
};
/** Root node for queries about simple / agility / nextgen boards. */
export declare type BoardScope = {
    __typename?: 'BoardScope';
    /** Null if there's no backlog */
    backlog?: Maybe<Backlog>;
    board?: Maybe<SoftwareBoard>;
    /** Card parents (AKA Epics) for filtering and adding to cards */
    cardParents: Array<Maybe<CardParent>>;
    /** Cards in the board scope with given card IDs */
    cards: Array<Maybe<SoftwareCard>>;
    /** Information about the user making this request. */
    currentUser: CurrentUser;
    /** Custom filters for this board scope */
    customFilters?: Maybe<Array<Maybe<CustomFilter>>>;
    /** Estimation type currently configured for the board. */
    estimation?: Maybe<EstimationConfig>;
    /** List of all feature groups on the board. This is similar to the list of features, but support groupings for the frontend to render */
    featureGroups?: Maybe<BoardFeatureGroupConnection>;
    /** List of all features on the board, and their state. */
    features: Array<Maybe<BoardFeature>>;
    /**
     * Return filtered card Ids on applying custom filters
     * This mutation is currently in BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: filteredCardIds` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    filteredCardIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
    /** The project location for this board scope */
    projectLocation: SoftwareProject;
    /** List of reports on this board.  null if reports are not enabled on this board. */
    reports?: Maybe<SoftwareReports>;
    /** Request sprint by Id. */
    sprint?: Maybe<Sprint>;
    /** Null if sprints are disabled (empty if there are no sprints) */
    sprints?: Maybe<Array<Maybe<Sprint>>>;
    /** Current user's swimlane-strategy, NONE if SWAG was unable to retrieve it */
    userSwimlaneStrategy?: Maybe<SwimlaneStrategy>;
};
/** Root node for queries about simple / agility / nextgen boards. */
export declare type BoardScopeCardsArgs = {
    cardIds: Array<Maybe<Scalars['ID']>>;
};
/** Root node for queries about simple / agility / nextgen boards. */
export declare type BoardScopeFilteredCardIdsArgs = {
    customFilterIds: Array<Maybe<Scalars['ID']>>;
    issueIds: Array<Maybe<Scalars['ID']>>;
};
/** Root node for queries about simple / agility / nextgen boards. */
export declare type BoardScopeSprintArgs = {
    sprintId: Scalars['ID'];
};
/** Root node for queries about simple / agility / nextgen boards. */
export declare type BoardScopeSprintsArgs = {
    state?: Maybe<Array<Maybe<SprintState>>>;
};
export declare enum BuiltinPolarisIdeaField {
    /**  Jira Product Discovery fields */
    Archived = "ARCHIVED",
    ArchivedBy = "ARCHIVED_BY",
    ArchivedOn = "ARCHIVED_ON",
    /**  Jira fields */
    Assignee = "ASSIGNEE",
    Created = "CREATED",
    Creator = "CREATOR",
    DeliveryProgress = "DELIVERY_PROGRESS",
    DeliveryStatus = "DELIVERY_STATUS",
    Description = "DESCRIPTION",
    IssueComments = "ISSUE_COMMENTS",
    IssueId = "ISSUE_ID",
    IssueType = "ISSUE_TYPE",
    Key = "KEY",
    Labels = "LABELS",
    LinkedIssues = "LINKED_ISSUES",
    NumDataPoints = "NUM_DATA_POINTS",
    Reporter = "REPORTER",
    Status = "STATUS",
    Summary = "SUMMARY",
    Updated = "UPDATED",
    Votes = "VOTES"
}
/** Burndown chart focuses on remaining scope over time */
export declare type BurndownChart = {
    __typename?: 'BurndownChart';
    /** Burndown charts are graphing the remaining over time */
    chart: BurndownChartData;
    /** Filters for the report */
    filters: SprintReportsFilters;
};
/** Burndown chart focuses on remaining scope over time */
export declare type BurndownChartChartArgs = {
    estimation?: Maybe<SprintReportsEstimationStatisticType>;
    sprintId?: Maybe<Scalars['ID']>;
};
export declare type BurndownChartData = {
    __typename?: 'BurndownChartData';
    /** the set end time of the sprint, not when the sprint completed */
    endTime?: Maybe<Scalars['DateTime']>;
    /**
     * data for a sprint scope change
     * each point are assumed to be scope change during a sprint
     */
    scopeChangeEvents: Array<Maybe<SprintScopeChangeData>>;
    /**
     * data for sprint end event
     * can be null if sprint has not been completed yet
     */
    sprintEndEvent?: Maybe<SprintEndData>;
    /** data for sprint start event */
    sprintStartEvent: SprintStartData;
    /** the start time of the sprint */
    startTime?: Maybe<Scalars['DateTime']>;
    /** data for the table */
    table?: Maybe<BurndownChartDataTable>;
    /** the current user's timezone */
    timeZone?: Maybe<Scalars['String']>;
};
export declare type BurndownChartDataTable = {
    __typename?: 'BurndownChartDataTable';
    completedIssues: Array<Maybe<BurndownChartDataTableIssueRow>>;
    completedIssuesOutsideOfSprint: Array<Maybe<BurndownChartDataTableIssueRow>>;
    incompleteIssues: Array<Maybe<BurndownChartDataTableIssueRow>>;
    issuesRemovedFromSprint: Array<Maybe<BurndownChartDataTableIssueRow>>;
    scopeChanges: Array<Maybe<BurndownChartDataTableScopeChangeRow>>;
};
export declare type BurndownChartDataTableIssueRow = {
    __typename?: 'BurndownChartDataTableIssueRow';
    assignee?: Maybe<User>;
    cardParent?: Maybe<CardParent>;
    cardStatus?: Maybe<CardStatus>;
    cardType?: Maybe<CardType>;
    estimate?: Maybe<Scalars['Float']>;
    issueKey: Scalars['String'];
    issueSummary: Scalars['String'];
};
export declare type BurndownChartDataTableScopeChangeRow = {
    __typename?: 'BurndownChartDataTableScopeChangeRow';
    cardParent?: Maybe<CardParent>;
    cardType?: Maybe<CardType>;
    sprintScopeChange: SprintScopeChangeData;
    timestamp: Scalars['DateTime'];
};
/**
 * Report pagination
 * -----------------
 */
export declare type CfdChartConnection = {
    __typename?: 'CFDChartConnection';
    edges: Array<Maybe<CfdChartEdge>>;
    pageInfo: PageInfo;
};
/**
 * Report data
 * -----------------
 */
export declare type CfdChartData = {
    __typename?: 'CFDChartData';
    changes: Array<Maybe<CfdIssueColumnChangeEntry>>;
    columnCounts: Array<Maybe<CfdColumnCount>>;
    timestamp: Scalars['DateTime'];
};
export declare type CfdChartEdge = {
    __typename?: 'CFDChartEdge';
    cursor: Scalars['String'];
    node: CfdChartData;
};
export declare type CfdColumn = {
    __typename?: 'CFDColumn';
    name: Scalars['String'];
};
export declare type CfdColumnCount = {
    __typename?: 'CFDColumnCount';
    columnIndex: Scalars['Int'];
    count: Scalars['Int'];
};
/**
 * Report filters
 * --------------
 */
export declare type CfdFilters = {
    __typename?: 'CFDFilters';
    columns: Array<Maybe<CfdColumn>>;
};
export declare type CfdIssueColumnChangeEntry = {
    __typename?: 'CFDIssueColumnChangeEntry';
    columnFrom?: Maybe<Scalars['Int']>;
    columnTo?: Maybe<Scalars['Int']>;
    key?: Maybe<Scalars['ID']>;
    point?: Maybe<TimeSeriesPoint>;
    statusTo?: Maybe<Scalars['ID']>;
    /** in ISO 8601 format */
    timestamp: Scalars['String'];
};
export declare type CardCoverMedia = {
    __typename?: 'CardCoverMedia';
    attachmentId?: Maybe<Scalars['Long']>;
    attachmentMediaApiId?: Maybe<Scalars['ID']>;
    clientId?: Maybe<Scalars['String']>;
    /** endpoint to retrieve the media from */
    endpointUrl?: Maybe<Scalars['String']>;
    /** true if this card has media, but it's explicity been hidden by the user */
    hiddenByUser: Scalars['Boolean'];
    token?: Maybe<Scalars['String']>;
};
export declare enum CardHierarchyLevelEnumType {
    Base = "BASE",
    Child = "CHILD",
    Parent = "PARENT"
}
export declare type CardMediaConfig = {
    __typename?: 'CardMediaConfig';
    /** Whether or not to show card media on this board */
    enabled: Scalars['Boolean'];
};
export declare type CardParent = {
    __typename?: 'CardParent';
    /** Card type */
    cardType: CardType;
    /** Some info about its children */
    childrenInfo?: Maybe<SoftwareCardChildrenInfo>;
    /** The color for this card */
    color?: Maybe<Scalars['CardPaletteColor']>;
    /** The due date set on the issue parent */
    dueDate?: Maybe<Scalars['String']>;
    /** Card id */
    id: Scalars['ID'];
    /** Card key */
    key: Scalars['String'];
    /** The start date set on the issue parent */
    startDate?: Maybe<Scalars['String']>;
    /** Card status */
    status?: Maybe<CardStatus>;
    /** Card summary */
    summary: Scalars['String'];
};
export declare type CardPriority = {
    __typename?: 'CardPriority';
    iconUrl?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
};
export declare type CardRank = {
    /** The card that is after this card */
    afterCardId?: Maybe<Scalars['ID']>;
    /** The card that is before this card */
    beforeCardId?: Maybe<Scalars['ID']>;
};
export declare type CardStatus = {
    __typename?: 'CardStatus';
    /** Which status category this statue belongs to.  Values:  "undefined" | "new" (ie todo) | "indeterminate" (aka "in progress") | "done" */
    category?: Maybe<Scalars['String']>;
    /** Card status id */
    id?: Maybe<Scalars['ID']>;
    /** Card status name */
    name?: Maybe<Scalars['String']>;
};
export declare type CardType = {
    __typename?: 'CardType';
    /** The type of hierarchy level that card type belongs to */
    hierarchyLevelType?: Maybe<Scalars['CardTypeHierarchyLevelType']>;
    /** URL to the icon to show for this card type */
    iconUrl?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['ID']>;
    /** The configuration for creating cards with this type inline. */
    inlineCardCreate?: Maybe<InlineCardCreateConfig>;
    name?: Maybe<Scalars['String']>;
};
/** Children metadata for cards */
export declare type ChildCardsMetadata = {
    __typename?: 'ChildCardsMetadata';
    complete?: Maybe<Scalars['Int']>;
    total?: Maybe<Scalars['Int']>;
};
/** Level of access to an Atlassian product that a cloud app can request */
export declare type CloudAppScope = {
    __typename?: 'CloudAppScope';
    /** Description of the level of access to an Atlassian product that an app can request */
    capability: Scalars['String'];
    /** Unique id of the scope */
    id: Scalars['ID'];
    /** Name of the scope */
    name: Scalars['String'];
};
export declare type CodeInJira = {
    __typename?: 'CodeInJira';
    /** Site specific configuration required to build the 'Code in Jira' page */
    siteConfiguration?: Maybe<CodeInJiraSiteConfiguration>;
    /** User specific configuration required to build the 'Code in Jira' page */
    userConfiguration?: Maybe<CodeInJiraUserConfiguration>;
};
export declare type CodeInJiraBitbucketWorkspace = {
    __typename?: 'CodeInJiraBitbucketWorkspace';
    /** Workspace name (eg. Fusion) */
    name?: Maybe<Scalars['String']>;
    /**
     * URL slug (eg. fusion). Used to differentiate multiple workspaces
     * to the user when the names are same
     */
    slug?: Maybe<Scalars['String']>;
    /** Unique ID of the Bitbucket workspace in UUID format */
    uuid: Scalars['ID'];
};
export declare type CodeInJiraSiteConfiguration = {
    __typename?: 'CodeInJiraSiteConfiguration';
    /**
     * A list of providers that are already connected to the site
     * Eg. Bitbucket, Github, Gitlab etc.
     */
    connectedVcsProviders?: Maybe<Array<Maybe<CodeInJiraVcsProvider>>>;
};
export declare type CodeInJiraUserConfiguration = {
    __typename?: 'CodeInJiraUserConfiguration';
    /**
     * A list of Bitbucket workspaces that the current user has admin access too
     * The user can connect Jira to one these Workspaces
     */
    ownedBitbucketWorkspaces?: Maybe<Array<Maybe<CodeInJiraBitbucketWorkspace>>>;
};
/**
 * A Version Control System object
 * Eg. Bitbucket, GitHub, GitLab
 */
export declare type CodeInJiraVcsProvider = {
    __typename?: 'CodeInJiraVcsProvider';
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    providerId?: Maybe<Scalars['String']>;
    providerNamespace?: Maybe<Scalars['String']>;
};
/** A column on the board */
export declare type Column = {
    __typename?: 'Column';
    /** The cards contained in the column */
    cards: Array<Maybe<SoftwareCard>>;
    /** The statuses mapped to this column */
    columnStatus: Array<ColumnStatus>;
    /** Column's id */
    id?: Maybe<Scalars['ID']>;
    /** Whether this column is the done column.  Each board has exactly one done column. */
    isDone: Scalars['Boolean'];
    /** Whether this column is the inital column.  Each board has exactly one initial column. */
    isInitial: Scalars['Boolean'];
    /** Number of cards allowed in this column before displaying a warning,  null if no limit */
    maxCardCount?: Maybe<Scalars['Int']>;
    /** Column's name */
    name?: Maybe<Scalars['String']>;
};
/** Represents a column inside a swimlane.  Each swimlane gets a ColumnInSwimlane for each column. */
export declare type ColumnInSwimlane = {
    __typename?: 'ColumnInSwimlane';
    /** The cards contained in this column in the given swimlane */
    cards: Array<Maybe<SoftwareCard>>;
    /** The details of the column */
    columnDetails?: Maybe<Column>;
};
/** Represents a column inside a swimlane.  Each swimlane gets a ColumnInSwimlane for each column. */
export declare type ColumnInSwimlaneCardsArgs = {
    cardIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};
/** A status associated with a column, along with its transitions */
export declare type ColumnStatus = {
    __typename?: 'ColumnStatus';
    /**
     * Possible card transitions with a certain card type into this status
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: SoftwareCardTypeTransitions` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    cardTypeTransitions?: Maybe<Array<SoftwareCardTypeTransition>>;
    /** The status */
    status: CardStatus;
    /** Possible transitions into this status */
    transitions: Array<SoftwareCardTransition>;
};
/** Accepts input for acknowledging an announcement. */
export declare type CompassAcknowledgeAnnouncementInput = {
    /** The ID of the announcement being acknowledged. */
    announcementId: Scalars['ID'];
    /** The ID of the component that is acknowledging the announcement. */
    componentId: Scalars['ID'];
};
/** The payload returned after acknowledging an announcement. */
export declare type CompassAcknowledgeAnnouncementPayload = Payload & {
    __typename?: 'CompassAcknowledgeAnnouncementPayload';
    /** The announcement acknowledgement. */
    acknowledgement?: Maybe<CompassAnnouncementAcknowledgement>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** An announcement communicates news or updates relating to a component. */
export declare type CompassAnnouncement = {
    __typename?: 'CompassAnnouncement';
    /** The list of acknowledgements that are required for this announcement. */
    acknowledgements?: Maybe<Array<CompassAnnouncementAcknowledgement>>;
    /**
     * The component that posted the announcement.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    component?: Maybe<CompassComponent>;
    /** The description of the announcement. */
    description?: Maybe<Scalars['String']>;
    /** The ID of the announcement. */
    id: Scalars['ID'];
    /** The date on which the updates in the announcement will take effect. */
    targetDate?: Maybe<Scalars['DateTime']>;
    /** The title of the announcement. */
    title?: Maybe<Scalars['String']>;
};
/** Tracks whether or not a component has acknowledged an announcement. */
export declare type CompassAnnouncementAcknowledgement = {
    __typename?: 'CompassAnnouncementAcknowledgement';
    /**
     * The component that needs to acknowledge.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    component?: Maybe<CompassComponent>;
    /** Whether the component has acknowledged the announcement or not. */
    hasAcknowledged?: Maybe<Scalars['Boolean']>;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApi = {
    __typename?: 'CompassCatalogMutationApi';
    /**
     * Acknowledges an announcement on behalf of a component.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    acknowledgeAnnouncement?: Maybe<CompassAcknowledgeAnnouncementPayload>;
    /**
     * Adds a collection of labels to a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    addComponentLabels?: Maybe<AddCompassComponentLabelsPayload>;
    /**
     * Applies a scorecard to a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    applyScorecardToComponent?: Maybe<ApplyCompassScorecardToComponentPayload>;
    /**
     * Attach a data manager to a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    attachComponentDataManager?: Maybe<AttachCompassComponentDataManagerPayload>;
    /**
     * Attaches an event source to a component.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    attachEventSource?: Maybe<AttachEventSourcePayload>;
    /**
     * Creates an announcement for a component.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    createAnnouncement?: Maybe<CompassCreateAnnouncementPayload>;
    /**
     * Creates a new component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    createComponent?: Maybe<CreateCompassComponentPayload>;
    /**
     * Creates an external alias for a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    createComponentExternalAlias?: Maybe<CreateCompassComponentExternalAliasPayload>;
    /**
     * Creates a link for a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    createComponentLink?: Maybe<CreateCompassComponentLinkPayload>;
    /**
     * Creates a deployment event.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:event:compass__
     */
    createDeploymentEvent?: Maybe<CreateDeploymentEventsPayload>;
    /**
     * Creates an event source.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    createEventSource?: Maybe<CreateEventSourcePayload>;
    /**
     * Creates a new relationship between two components.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    createRelationship?: Maybe<CreateCompassRelationshipPayload>;
    /**
     * Creates a scorecard.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:scorecard:compass__
     */
    createScorecard?: Maybe<CreateCompassScorecardPayload>;
    /**
     * Adds criteria to a scorecard.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:scorecard:compass__
     */
    createScorecardCriterias?: Maybe<CreateCompassScorecardCriteriasPayload>;
    /**
     * Creates a starred relationship between a user and a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    createStarredComponent?: Maybe<CreateCompassStarredComponentPayload>;
    /**
     * Creates a checkin for a team.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    createTeamCheckin?: Maybe<CompassCreateTeamCheckinPayload>;
    /**
     * Deletes an existing announcement from a component.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    deleteAnnouncement?: Maybe<CompassDeleteAnnouncementPayload>;
    /**
     * Deletes an existing component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    deleteComponent?: Maybe<DeleteCompassComponentPayload>;
    /**
     * Deletes an existing external alias from a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    deleteComponentExternalAlias?: Maybe<DeleteCompassComponentExternalAliasPayload>;
    /**
     * Deletes an existing link from a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    deleteComponentLink?: Maybe<DeleteCompassComponentLinkPayload>;
    /**
     * Deletes an event source.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    deleteEventSource?: Maybe<DeleteEventSourcePayload>;
    /**
     * Deletes an existing relationship between two components.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    deleteRelationship?: Maybe<DeleteCompassRelationshipPayload>;
    /**
     * Deletes a scorecard.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:scorecard:compass__
     */
    deleteScorecard?: Maybe<DeleteCompassScorecardPayload>;
    /**
     * Deletes criteria from a scorecard.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:scorecard:compass__
     */
    deleteScorecardCriterias?: Maybe<DeleteCompassScorecardCriteriasPayload>;
    /**
     * Deletes a starred relationship between a user and a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    deleteStarredComponent?: Maybe<DeleteCompassStarredComponentPayload>;
    /**
     * Deletes a checkin from a team.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    deleteTeamCheckin?: Maybe<CompassDeleteTeamCheckinPayload>;
    /**
     * Detach a data manager from a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    detachComponentDataManager?: Maybe<DetachCompassComponentDataManagerPayload>;
    /**
     * Detaches an event source from a component.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    detachEventSource?: Maybe<DetachEventSourcePayload>;
    /**
     * Removes a collection of existing labels from a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    removeComponentLabels?: Maybe<RemoveCompassComponentLabelsPayload>;
    /**
     * Removes a scorecard from a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    removeScorecardFromComponent?: Maybe<RemoveCompassScorecardFromComponentPayload>;
    /**
     * Clean external aliases and data managers pertaining to an externalSource
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    unlinkExternalSource?: Maybe<UnlinkExternalSourcePayload>;
    /**
     * Updates an announcement from a component.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    updateAnnouncement?: Maybe<CompassUpdateAnnouncementPayload>;
    /**
     * Updates an existing component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    updateComponent?: Maybe<UpdateCompassComponentPayload>;
    /**
     * Update a data manager of a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    updateComponentDataManagerMetadata?: Maybe<UpdateCompassComponentDataManagerMetadataPayload>;
    /**
     * Updates a link from a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:component:compass__
     */
    updateComponentLink?: Maybe<UpdateCompassComponentLinkPayload>;
    /**
     * Updates a scorecard.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:scorecard:compass__
     */
    updateScorecard?: Maybe<UpdateCompassScorecardPayload>;
    /**
     * Updates criteria on a scorecard.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __write:scorecard:compass__
     */
    updateScorecardCriterias?: Maybe<UpdateCompassScorecardCriteriasPayload>;
    /**
     * Updates a checkin for a team.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    updateTeamCheckin?: Maybe<CompassUpdateTeamCheckinPayload>;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiAcknowledgeAnnouncementArgs = {
    input: CompassAcknowledgeAnnouncementInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiAddComponentLabelsArgs = {
    input: AddCompassComponentLabelsInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiApplyScorecardToComponentArgs = {
    componentId: Scalars['ID'];
    scorecardId: Scalars['ID'];
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiAttachComponentDataManagerArgs = {
    input: AttachCompassComponentDataManagerInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiAttachEventSourceArgs = {
    input: AttachEventSourceInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiCreateAnnouncementArgs = {
    input: CompassCreateAnnouncementInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiCreateComponentArgs = {
    cloudId: Scalars['ID'];
    input: CreateCompassComponentInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiCreateComponentExternalAliasArgs = {
    input: CreateCompassComponentExternalAliasInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiCreateComponentLinkArgs = {
    input: CreateCompassComponentLinkInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiCreateDeploymentEventArgs = {
    input: CreateDeploymentEventInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiCreateEventSourceArgs = {
    input: CreateEventSourceInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiCreateRelationshipArgs = {
    input: CreateCompassRelationshipInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiCreateScorecardArgs = {
    cloudId: Scalars['ID'];
    input: CreateCompassScorecardInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiCreateScorecardCriteriasArgs = {
    input: CreateCompassScorecardCriteriasInput;
    scorecardId: Scalars['ID'];
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiCreateStarredComponentArgs = {
    cloudId: Scalars['ID'];
    input: CreateCompassStarredComponentInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiCreateTeamCheckinArgs = {
    input: CompassCreateTeamCheckinInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiDeleteAnnouncementArgs = {
    input: CompassDeleteAnnouncementInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiDeleteComponentArgs = {
    input: DeleteCompassComponentInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiDeleteComponentExternalAliasArgs = {
    input: DeleteCompassComponentExternalAliasInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiDeleteComponentLinkArgs = {
    input: DeleteCompassComponentLinkInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiDeleteEventSourceArgs = {
    input: DeleteEventSourceInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiDeleteRelationshipArgs = {
    input: DeleteCompassRelationshipInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiDeleteScorecardArgs = {
    scorecardId: Scalars['ID'];
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiDeleteScorecardCriteriasArgs = {
    input: DeleteCompassScorecardCriteriasInput;
    scorecardId: Scalars['ID'];
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiDeleteStarredComponentArgs = {
    cloudId: Scalars['ID'];
    input: DeleteCompassStarredComponentInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiDeleteTeamCheckinArgs = {
    input: CompassDeleteTeamCheckinInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiDetachComponentDataManagerArgs = {
    input: DetachCompassComponentDataManagerInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiDetachEventSourceArgs = {
    input: DetachEventSourceInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiRemoveComponentLabelsArgs = {
    input: RemoveCompassComponentLabelsInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiRemoveScorecardFromComponentArgs = {
    componentId: Scalars['ID'];
    scorecardId: Scalars['ID'];
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiUnlinkExternalSourceArgs = {
    input: UnlinkExternalSourceInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiUpdateAnnouncementArgs = {
    input: CompassUpdateAnnouncementInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiUpdateComponentArgs = {
    input: UpdateCompassComponentInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiUpdateComponentDataManagerMetadataArgs = {
    input: UpdateCompassComponentDataManagerMetadataInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiUpdateComponentLinkArgs = {
    input: UpdateCompassComponentLinkInput;
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiUpdateScorecardArgs = {
    input: UpdateCompassScorecardInput;
    scorecardId: Scalars['ID'];
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiUpdateScorecardCriteriasArgs = {
    input: UpdateCompassScorecardCriteriasInput;
    scorecardId: Scalars['ID'];
};
/** The top level wrapper for the Compass Mutations API. */
export declare type CompassCatalogMutationApiUpdateTeamCheckinArgs = {
    input: CompassUpdateTeamCheckinInput;
};
/** Top level wrapper for Compass Query API */
export declare type CompassCatalogQueryApi = {
    __typename?: 'CompassCatalogQueryApi';
    /**
     * Retrieves a single component by its internal ID.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    component?: Maybe<CompassComponentResult>;
    /**
     * Retrieves a single component by its external alias.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    componentByExternalAlias?: Maybe<CompassComponentResult>;
    /** Retrieves field definitions by component type. */
    fieldDefinitionsByComponentType?: Maybe<CompassFieldDefinitionsResult>;
    /**
     * Retrieves a scorecard by its unique identifier (ID).
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:scorecard:compass__
     */
    scorecard?: Maybe<CompassScorecardResult>;
    /**
     * Retrieves available scorecards.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:scorecard:compass__
     */
    scorecards?: Maybe<CompassScorecardsQueryResult>;
    /**
     * Searches for all component labels within Compass.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    searchComponentLabels?: Maybe<CompassComponentLabelsQueryResult>;
    /**
     * Searches for Compass components.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    searchComponents?: Maybe<CompassComponentQueryResult>;
    /**
     * Retrieve all starred components based on the user id.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    starredComponents?: Maybe<CompassStarredComponentQueryResult>;
    /**
     * A collection of checkins posted by a team; sorted by most recent.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    teamCheckins?: Maybe<Array<CompassTeamCheckin>>;
};
/** Top level wrapper for Compass Query API */
export declare type CompassCatalogQueryApiComponentArgs = {
    id: Scalars['ID'];
};
/** Top level wrapper for Compass Query API */
export declare type CompassCatalogQueryApiComponentByExternalAliasArgs = {
    cloudId: Scalars['ID'];
    externalID: Scalars['ID'];
    externalSource?: Maybe<Scalars['ID']>;
};
/** Top level wrapper for Compass Query API */
export declare type CompassCatalogQueryApiFieldDefinitionsByComponentTypeArgs = {
    cloudId: Scalars['ID'];
    input: CompassComponentType;
};
/** Top level wrapper for Compass Query API */
export declare type CompassCatalogQueryApiScorecardArgs = {
    id: Scalars['ID'];
};
/** Top level wrapper for Compass Query API */
export declare type CompassCatalogQueryApiScorecardsArgs = {
    cloudId: Scalars['ID'];
    query?: Maybe<CompassScorecardsQuery>;
};
/** Top level wrapper for Compass Query API */
export declare type CompassCatalogQueryApiSearchComponentLabelsArgs = {
    cloudId: Scalars['String'];
    query?: Maybe<CompassSearchComponentLabelsQuery>;
};
/** Top level wrapper for Compass Query API */
export declare type CompassCatalogQueryApiSearchComponentsArgs = {
    cloudId: Scalars['String'];
    query?: Maybe<CompassSearchComponentQuery>;
};
/** Top level wrapper for Compass Query API */
export declare type CompassCatalogQueryApiStarredComponentsArgs = {
    cloudId: Scalars['ID'];
    query?: Maybe<CompassStarredComponentQuery>;
};
/** Top level wrapper for Compass Query API */
export declare type CompassCatalogQueryApiTeamCheckinsArgs = {
    input: CompassTeamCheckinsInput;
};
/** Metadata about who created or updated the object and when. */
export declare type CompassChangeMetadata = {
    __typename?: 'CompassChangeMetadata';
    /** The date and time when the object was created. */
    createdAt?: Maybe<Scalars['DateTime']>;
    /** The user who created the object. */
    createdBy?: Maybe<User>;
    /** The date and time when the object was last updated. */
    lastUserModificationAt?: Maybe<Scalars['DateTime']>;
    /** The user who last updated the object. */
    lastUserModificationBy?: Maybe<User>;
};
/** A component represents a software development artifact tracked in Compass. */
export declare type CompassComponent = Node & {
    __typename?: 'CompassComponent';
    /**
     * A collection of announcements posted by the component.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    announcements?: Maybe<Array<CompassAnnouncement>>;
    /**
     * A collection of scorecards applicable to a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:scorecard:compass__
     */
    applicableScorecards?: Maybe<Array<CompassScorecard>>;
    /** Metadata about who created the component and when. */
    changeMetadata: CompassChangeMetadata;
    /** The external integration that manages data for this component. */
    dataManager?: Maybe<CompassComponentDataManager>;
    /** The description of the component. */
    description?: Maybe<Scalars['String']>;
    /**
     * The event sources associated to the component.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    eventSources?: Maybe<Array<EventSource>>;
    /**
     * The events associated to the component.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-prototype` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:event:compass__
     */
    events?: Maybe<CompassEventsQueryResult>;
    /** A collection of aliases that represent the component in external systems. */
    externalAliases?: Maybe<Array<CompassExternalAlias>>;
    /** A collection of fields for storing data about the component. */
    fields?: Maybe<Array<CompassField>>;
    /** The unique identifier (ID) of the component. */
    id: Scalars['ID'];
    /** A collection of labels that provide additional contextual information about the component. */
    labels?: Maybe<Array<CompassComponentLabel>>;
    /** A collection of links to other entities on the internet. */
    links?: Maybe<Array<CompassLink>>;
    /** The name of the component. */
    name: Scalars['String'];
    /** The unique identifier (ID) of the team that owns the component. */
    ownerId?: Maybe<Scalars['ID']>;
    /** A collection of relationships between the component and other entities in Compass. */
    relationships?: Maybe<CompassRelationshipConnectionResult>;
    /** Returns the calculated total score for a given scorecard applied to this component. */
    scorecardScore?: Maybe<CompassScorecardScore>;
    /**
     * A collection of scorecard scores applied to a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:scorecard:compass__
     */
    scorecardScores?: Maybe<Array<CompassScorecardScore>>;
    /**
     * A collection of scorecards applied to a component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:scorecard:compass__
     */
    scorecards?: Maybe<Array<CompassScorecard>>;
    /** The type of component. */
    type: CompassComponentType;
};
/** A component represents a software development artifact tracked in Compass. */
export declare type CompassComponentEventsArgs = {
    query?: Maybe<CompassEventsQuery>;
};
/** A component represents a software development artifact tracked in Compass. */
export declare type CompassComponentRelationshipsArgs = {
    query?: Maybe<CompassRelationshipQuery>;
};
/** A component represents a software development artifact tracked in Compass. */
export declare type CompassComponentScorecardScoreArgs = {
    query?: Maybe<CompassComponentScorecardScoreQuery>;
};
/** An external integration that manages data for a particular component. */
export declare type CompassComponentDataManager = {
    __typename?: 'CompassComponentDataManager';
    /** The unique identifier (ID) of the ecosystem app acting as a component data manager. */
    ecosystemAppId: Scalars['ID'];
    /** An URL of the external source. */
    externalSourceURL?: Maybe<Scalars['URL']>;
    /** Details about the last sync event to this component. */
    lastSyncEvent?: Maybe<ComponentSyncEvent>;
};
/** A label provides additional contextual information about a component. */
export declare type CompassComponentLabel = {
    __typename?: 'CompassComponentLabel';
    /** The name of the label. */
    name?: Maybe<Scalars['String']>;
};
export declare type CompassComponentLabelsQueryResult = CompassSearchComponentLabelsConnection | QueryError;
export declare type CompassComponentQueryResult = CompassSearchComponentConnection | QueryError;
export declare type CompassComponentResult = CompassComponent | QueryError;
/** Scorecard score on a component for a scorecard. */
export declare type CompassComponentScorecardScoreQuery = {
    /** The unique identifier (ID) of the scorecard. */
    scorecardId: Scalars['ID'];
};
/** Identifies the type of component. */
export declare enum CompassComponentType {
    /** A standalone software artifact that is directly consumable by an end-user. */
    Application = "APPLICATION",
    /** A standalone software artifact that provides some functionality for other software via embedding. */
    Library = "LIBRARY",
    /** A software artifact that does not fit into the pre-defined categories. */
    Other = "OTHER",
    /** A software artifact that provides some functionality for other software over the network. */
    Service = "SERVICE"
}
/** Accepts input for creating a component announcement. */
export declare type CompassCreateAnnouncementInput = {
    /** The ID of the component to create an announcement for. */
    componentId: Scalars['ID'];
    /** The description of the announcement. */
    description?: Maybe<Scalars['String']>;
    /** The date on which the changes in the announcement will take effect. */
    targetDate: Scalars['DateTime'];
    /** The title of the announcement. */
    title: Scalars['String'];
};
/** The payload returned after creating a component announcement. */
export declare type CompassCreateAnnouncementPayload = Payload & {
    __typename?: 'CompassCreateAnnouncementPayload';
    /** The created announcement. */
    createdAnnouncement?: Maybe<CompassAnnouncement>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** Accepts input for creating a checkin. */
export declare type CompassCreateTeamCheckinInput = {
    /** The cloud ID of the site to update a checkin on. */
    cloudId: Scalars['ID'];
    /** The mood of the checkin. */
    mood: Scalars['Int'];
    /** The response to the question 1 of the team checkin. */
    response1?: Maybe<Scalars['String']>;
    /** The response to the question 2 of the team checkin. */
    response2?: Maybe<Scalars['String']>;
    /** The response to the question 3 of the team checkin. */
    response3?: Maybe<Scalars['String']>;
    /** The unique identifier (ID) of the team that did the checkin. */
    teamId: Scalars['ID'];
};
/** The payload returned after creating a component announcement. */
export declare type CompassCreateTeamCheckinPayload = Payload & {
    __typename?: 'CompassCreateTeamCheckinPayload';
    /** Details of the created team checkin. */
    createdTeamCheckin?: Maybe<CompassTeamCheckin>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** Accepts input for deleting a component announcement. */
export declare type CompassDeleteAnnouncementInput = {
    /** The cloud ID of the site to delete an announcement from. */
    cloudId: Scalars['ID'];
    /** The ID of the announcement to delete. */
    id: Scalars['ID'];
};
/** The payload returned after deleting a component announcement. */
export declare type CompassDeleteAnnouncementPayload = Payload & {
    __typename?: 'CompassDeleteAnnouncementPayload';
    /** The ID of the announcement that was deleted. */
    deletedAnnouncementId?: Maybe<Scalars['ID']>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** Accepts input for deleting a team checkin. */
export declare type CompassDeleteTeamCheckinInput = {
    /** The cloud ID of the site to update a checkin on. */
    cloudId: Scalars['ID'];
    /** The ID of the team checkin to delete. */
    id: Scalars['ID'];
};
/** The payload returned after deleting a team checkin. */
export declare type CompassDeleteTeamCheckinPayload = Payload & {
    __typename?: 'CompassDeleteTeamCheckinPayload';
    /** ID of the checkin that was deleted. */
    deletedTeamCheckinId?: Maybe<Scalars['ID']>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
export declare type CompassDeploymentEvent = CompassEvent & {
    __typename?: 'CompassDeploymentEvent';
    /** The sequence number for the deployment. */
    deploymentSequenceNumber?: Maybe<Scalars['Long']>;
    /** The description of the deployment event. */
    description?: Maybe<Scalars['String']>;
    /** The name of the deployment event. */
    displayName: Scalars['String'];
    /** The environment where the deployment event has occurred. */
    environment?: Maybe<CompassDeploymentEventEnvironment>;
    /** The type of the event. */
    eventType: CompassEventType;
    /** The last time this event was updated. */
    lastUpdated: Scalars['DateTime'];
    /** The deployment event pipeline. */
    pipeline?: Maybe<CompassDeploymentEventPipeline>;
    /** The state of the deployment. */
    state?: Maybe<CompassDeploymentEventState>;
    /** The sequence number specifying the order of updates of the deployment event. */
    updateSequenceNumber?: Maybe<Scalars['Long']>;
    /** The URL of the deployment event. */
    url?: Maybe<Scalars['URL']>;
};
export declare type CompassDeploymentEventEnvironment = {
    __typename?: 'CompassDeploymentEventEnvironment';
    /** The type of environment, where the component deployment event has occurred. */
    category?: Maybe<CompassDeploymentEventEnvironmentCategory>;
    /** The display name of the environment, where the component deployment event has occurred. */
    displayName?: Maybe<Scalars['String']>;
    /** The ID of the environment, where the deployment event has occurred. */
    environmentId?: Maybe<Scalars['String']>;
};
export declare enum CompassDeploymentEventEnvironmentCategory {
    Development = "DEVELOPMENT",
    Production = "PRODUCTION",
    Staging = "STAGING",
    Testing = "TESTING",
    Unmapped = "UNMAPPED"
}
export declare type CompassDeploymentEventEnvironmentInput = {
    /** The type of environment, where the component deployment event has occurred. */
    category: CompassDeploymentEventEnvironmentCategory;
    /** The display name of the environment, where the component deployment event has occurred. */
    displayName: Scalars['String'];
    /** The ID of the environment, where the deployment event has occurred. */
    environmentId: Scalars['String'];
};
export declare type CompassDeploymentEventPipeline = {
    __typename?: 'CompassDeploymentEventPipeline';
    /** The name of the deployment event pipeline. */
    displayName?: Maybe<Scalars['String']>;
    /** The ID of the deployment event pipeline. */
    pipelineId?: Maybe<Scalars['String']>;
    /** The URL linking to the deployment event pipeline. */
    url?: Maybe<Scalars['String']>;
};
export declare type CompassDeploymentEventPipelineInput = {
    /** The name of the deployment event pipeline. */
    displayName: Scalars['String'];
    /** The ID of the deployment event pipeline. */
    pipelineId: Scalars['String'];
    /** The URL linking to the deployment event pipeline. */
    url: Scalars['String'];
};
/**  Compass Deployment Event */
export declare enum CompassDeploymentEventState {
    Cancelled = "CANCELLED",
    Failed = "FAILED",
    InProgress = "IN_PROGRESS",
    Pending = "PENDING",
    RolledBack = "ROLLED_BACK",
    Successful = "SUCCESSFUL",
    Unknown = "UNKNOWN"
}
export declare type CompassEnumField = CompassField & {
    __typename?: 'CompassEnumField';
    /** The definition of the field. */
    definition?: Maybe<CompassFieldDefinition>;
    /** The value of the field. */
    value?: Maybe<Array<Scalars['String']>>;
};
export declare type CompassEnumFieldDefinitionOptions = {
    __typename?: 'CompassEnumFieldDefinitionOptions';
    /** The default option for field definition. If null, the field is not required. */
    default?: Maybe<Array<Scalars['String']>>;
    /** Possible values of the field definition. */
    values?: Maybe<Array<Scalars['String']>>;
};
export declare type CompassEnumFieldValueInput = {
    value?: Maybe<Array<Scalars['String']>>;
};
export declare type CompassEvent = {
    /** The description of the event. */
    description?: Maybe<Scalars['String']>;
    /** The name of the event. */
    displayName: Scalars['String'];
    /** The type of the event. */
    eventType: CompassEventType;
    /** The last time this event was updated. */
    lastUpdated: Scalars['DateTime'];
    /** The URL of the event. */
    url?: Maybe<Scalars['URL']>;
};
export declare type CompassEventConnection = {
    __typename?: 'CompassEventConnection';
    edges?: Maybe<Array<Maybe<CompassEventEdge>>>;
    nodes?: Maybe<Array<CompassEvent>>;
    pageInfo: PageInfo;
};
export declare type CompassEventEdge = {
    __typename?: 'CompassEventEdge';
    cursor: Scalars['String'];
    node?: Maybe<CompassEvent>;
};
export declare type CompassEventTimeParameters = {
    /** The time to end querying for event data. */
    endAt?: Maybe<Scalars['DateTime']>;
    /** The time to begin querying for event data. */
    startFrom?: Maybe<Scalars['DateTime']>;
};
export declare enum CompassEventType {
    Deployment = "DEPLOYMENT"
}
export declare type CompassEventsQuery = {
    /** Returns the events after the specified cursor position. */
    after?: Maybe<Scalars['String']>;
    /** The list of event types. */
    eventTypes?: Maybe<Array<CompassEventType>>;
    /** The first N number of events to return in the query. */
    first?: Maybe<Scalars['Int']>;
    /** Returns the events after that match the CompassEventTimeParameters. */
    timeParameters?: Maybe<CompassEventTimeParameters>;
};
export declare type CompassEventsQueryResult = CompassEventConnection | QueryError;
/** An alias of the component in an external system. */
export declare type CompassExternalAlias = {
    __typename?: 'CompassExternalAlias';
    /** The ID of the component in an external system. */
    externalAliasId: Scalars['ID'];
    /** The external system hosting the component. */
    externalSource?: Maybe<Scalars['ID']>;
};
export declare type CompassExternalAliasInput = {
    /** The ID of the component in the external source */
    externalId: Scalars['ID'];
    /** The external system hosting the component */
    externalSource?: Maybe<Scalars['ID']>;
};
/** A field represents data about a component. */
export declare type CompassField = {
    /** The definition of the field. */
    definition?: Maybe<CompassFieldDefinition>;
};
/** The schema of a field. */
export declare type CompassFieldDefinition = {
    __typename?: 'CompassFieldDefinition';
    /** The description of the field. */
    description: Scalars['String'];
    /** The unique identifier (ID) of the field definition. */
    id: Scalars['ID'];
    /** The name of the field. */
    name: Scalars['String'];
    /** The options for the field definition. */
    options: CompassFieldDefinitionOptions;
    /** The type of field. */
    type: CompassFieldType;
};
export declare type CompassFieldDefinitionOptions = CompassEnumFieldDefinitionOptions;
export declare type CompassFieldDefinitions = {
    __typename?: 'CompassFieldDefinitions';
    definitions: Array<CompassFieldDefinition>;
};
export declare type CompassFieldDefinitionsResult = CompassFieldDefinitions | QueryError;
/** Specifies the type of value for a field. */
export declare enum CompassFieldType {
    Date = "DATE",
    Enum = "ENUM",
    Number = "NUMBER",
    Text = "TEXT"
}
export declare type CompassFieldValueInput = {
    enum?: Maybe<CompassEnumFieldValueInput>;
};
/** The configuration for a scorecard criterion representing the presence of a description. */
export declare type CompassHasDescriptionScorecardCriteria = CompassScorecardCriteria & {
    __typename?: 'CompassHasDescriptionScorecardCriteria';
    id: Scalars['ID'];
    /** Returns the calculated score for a given component */
    scorecardCriteriaScore?: Maybe<CompassScorecardCriteriaScore>;
    weight: Scalars['Int'];
};
/** The configuration for a scorecard criterion representing the presence of a description. */
export declare type CompassHasDescriptionScorecardCriteriaScorecardCriteriaScoreArgs = {
    query?: Maybe<CompassScorecardCriteriaScoreQuery>;
};
/** The configuration for a scorecard criterion representing the presence of a field, for example, 'Has Tier'. */
export declare type CompassHasFieldScorecardCriteria = CompassScorecardCriteria & {
    __typename?: 'CompassHasFieldScorecardCriteria';
    /** The target of a relationship, for example, 'Owner' if 'Has Owner'. */
    fieldDefinition: CompassFieldDefinition;
    /** The ID of the scorecard criterion. */
    id: Scalars['ID'];
    /** Returns the calculated score for a component. */
    scorecardCriteriaScore?: Maybe<CompassScorecardCriteriaScore>;
    /** The weight that will be used in determining the aggregate score. */
    weight: Scalars['Int'];
};
/** The configuration for a scorecard criterion representing the presence of a field, for example, 'Has Tier'. */
export declare type CompassHasFieldScorecardCriteriaScorecardCriteriaScoreArgs = {
    query?: Maybe<CompassScorecardCriteriaScoreQuery>;
};
/** The configuration for a scorecard criterion representing the presence of a link, for example, 'Has Repository', or 'Has Documentation'. */
export declare type CompassHasLinkScorecardCriteria = CompassScorecardCriteria & {
    __typename?: 'CompassHasLinkScorecardCriteria';
    /** The ID of the scorecard criterion. */
    id: Scalars['ID'];
    /** The type of link, for example 'Repository' if 'Has Repository'. */
    linkType: CompassLinkType;
    /** Returns the calculated score for a component. */
    scorecardCriteriaScore?: Maybe<CompassScorecardCriteriaScore>;
    /** The weight that will be used in determining the aggregate score. */
    weight: Scalars['Int'];
};
/** The configuration for a scorecard criterion representing the presence of a link, for example, 'Has Repository', or 'Has Documentation'. */
export declare type CompassHasLinkScorecardCriteriaScorecardCriteriaScoreArgs = {
    query?: Maybe<CompassScorecardCriteriaScoreQuery>;
};
/** Configuration for a scorecard criteria representing the presence of an owner */
export declare type CompassHasOwnerScorecardCriteria = CompassScorecardCriteria & {
    __typename?: 'CompassHasOwnerScorecardCriteria';
    /** The ID of the scorecard criterion. */
    id: Scalars['ID'];
    /** Returns the calculated score for a component. */
    scorecardCriteriaScore?: Maybe<CompassScorecardCriteriaScore>;
    /** The weight that will be used in determining the aggregate score. */
    weight: Scalars['Int'];
};
/** Configuration for a scorecard criteria representing the presence of an owner */
export declare type CompassHasOwnerScorecardCriteriaScorecardCriteriaScoreArgs = {
    query?: Maybe<CompassScorecardCriteriaScoreQuery>;
};
/** A link to an entity or resource on the internet. */
export declare type CompassLink = {
    __typename?: 'CompassLink';
    /** The unique identifier (ID) of the link. */
    id: Scalars['ID'];
    /** An user-provided name of the link. */
    name?: Maybe<Scalars['String']>;
    /** The type of link. */
    type: CompassLinkType;
    /** An URL to the entity or resource on the internet. */
    url: Scalars['URL'];
};
/** The types used to identify the intent of the link. */
export declare enum CompassLinkType {
    /** Chat Channels for contacting the owners/support of the component */
    ChatChannel = "CHAT_CHANNEL",
    /** A link to the dashboard of the component. */
    Dashboard = "DASHBOARD",
    /** A link to the documentation of the component. */
    Document = "DOCUMENT",
    /** A link to the on-call schedule of the component. */
    OnCall = "ON_CALL",
    /** Other link for a Component. */
    OtherLink = "OTHER_LINK",
    /** A link to the Jira or third-party project of the component. */
    Project = "PROJECT",
    /** A link to the source code repository of the component. */
    Repository = "REPOSITORY"
}
/** Field Filters. */
export declare type CompassQueryFieldFilter = {
    filter?: Maybe<CompassQueryFilter>;
    name: Scalars['String'];
};
export declare type CompassQueryFilter = {
    eq?: Maybe<Scalars['String']>;
    in?: Maybe<Array<Maybe<Scalars['String']>>>;
    neq?: Maybe<Scalars['String']>;
};
export declare type CompassQuerySort = {
    name?: Maybe<Scalars['String']>;
    /**  name of field to sort results by */
    order?: Maybe<CompassQuerySortOrder>;
};
export declare enum CompassQuerySortOrder {
    Asc = "ASC",
    Desc = "DESC"
}
/** A relationship between two components. */
export declare type CompassRelationship = {
    __typename?: 'CompassRelationship';
    changeMetadata?: Maybe<CompassChangeMetadata>;
    /**
     * The ending node of the relationship.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    endNode?: Maybe<CompassComponent>;
    /**
     * The starting node of the relationship.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    startNode?: Maybe<CompassComponent>;
    /** The type of relationship. */
    type: CompassRelationshipType;
};
export declare type CompassRelationshipConnection = {
    __typename?: 'CompassRelationshipConnection';
    edges?: Maybe<Array<CompassRelationshipEdge>>;
    nodes?: Maybe<Array<CompassRelationship>>;
    pageInfo: PageInfo;
};
export declare type CompassRelationshipConnectionResult = CompassRelationshipConnection | QueryError;
export declare type CompassRelationshipEdge = {
    __typename?: 'CompassRelationshipEdge';
    cursor: Scalars['String'];
    node?: Maybe<CompassRelationship>;
};
/** Accepts input for finding component relationships. */
export declare type CompassRelationshipQuery = {
    /** The relationships to be returned after the specified cursor position. */
    after?: Maybe<Scalars['String']>;
    /** The filters for the relationships to be searched for. */
    filters?: Maybe<CompassRelationshipQueryFilters>;
    /** The number of relationships to return in the query. */
    first?: Maybe<Scalars['Int']>;
};
export declare type CompassRelationshipQueryFilters = {
    /** OR'd set of relationship types. */
    types?: Maybe<Array<CompassRelationshipType>>;
};
/** Defines the relationship types. A relationship must be one of these types. */
export declare enum CompassRelationshipType {
    DependsOn = "DEPENDS_ON"
}
/** The configuration for a scorecard that can be used by components. */
export declare type CompassScorecard = Node & {
    __typename?: 'CompassScorecard';
    /** Returns a list of components to which this scorecard is applied. */
    appliedToComponents?: Maybe<CompassScorecardAppliedToComponentsQueryResult>;
    /** Contains change metadata for the scorecard. */
    changeMetadata: CompassChangeMetadata;
    /** The type of component to which this scorecard is restricted. */
    componentType: CompassComponentType;
    /** The criteria used for calculating the score. */
    criterias?: Maybe<Array<CompassScorecardCriteria>>;
    /** The description of the scorecard. */
    description?: Maybe<Scalars['String']>;
    /** The unique identifier (ID) of the scorecard. */
    id: Scalars['ID'];
    /** Determines how the scorecard will be applied by default. */
    importance: CompassScorecardImportance;
    /** The name of the scorecard. */
    name: Scalars['String'];
    /** The unique identifier (ID) of the scorecard's owner. */
    owner?: Maybe<User>;
    /** Returns the calculated total score for a given component. */
    scorecardScore?: Maybe<CompassScorecardScore>;
};
/** The configuration for a scorecard that can be used by components. */
export declare type CompassScorecardAppliedToComponentsArgs = {
    query?: Maybe<CompassScorecardAppliedToComponentsQuery>;
};
/** The configuration for a scorecard that can be used by components. */
export declare type CompassScorecardScorecardScoreArgs = {
    query?: Maybe<CompassScorecardScoreQuery>;
};
export declare type CompassScorecardAppliedToComponentsConnection = {
    __typename?: 'CompassScorecardAppliedToComponentsConnection';
    edges?: Maybe<Array<CompassScorecardAppliedToComponentsEdge>>;
    nodes?: Maybe<Array<CompassComponent>>;
    pageInfo: PageInfo;
};
export declare type CompassScorecardAppliedToComponentsEdge = {
    __typename?: 'CompassScorecardAppliedToComponentsEdge';
    cursor: Scalars['String'];
    node?: Maybe<CompassComponent>;
};
/** Accepts input to find components a scorecard is applied to and their scores */
export declare type CompassScorecardAppliedToComponentsQuery = {
    /** Returns the components after the specified cursor position. */
    after?: Maybe<Scalars['String']>;
    /** The first N number of components to return in the query. */
    first?: Maybe<Scalars['Int']>;
};
export declare type CompassScorecardAppliedToComponentsQueryResult = CompassScorecardAppliedToComponentsConnection | QueryError;
export declare type CompassScorecardConnection = {
    __typename?: 'CompassScorecardConnection';
    edges?: Maybe<Array<CompassScorecardEdge>>;
    nodes?: Maybe<Array<CompassScorecard>>;
    pageInfo: PageInfo;
};
/** The configuration for a scorecard criterion that can be shared across components. */
export declare type CompassScorecardCriteria = {
    /** The ID of the scorecard criterion. */
    id: Scalars['ID'];
    /** Returns the calculated score for a component. */
    scorecardCriteriaScore?: Maybe<CompassScorecardCriteriaScore>;
    /** The weight that will be used in determining the aggregate score. */
    weight: Scalars['Int'];
};
/** The configuration for a scorecard criterion that can be shared across components. */
export declare type CompassScorecardCriteriaScorecardCriteriaScoreArgs = {
    query?: Maybe<CompassScorecardCriteriaScoreQuery>;
};
/** Contains the calculated score for each scorecard criteria that is associated with a specific component. */
export declare type CompassScorecardCriteriaScore = {
    __typename?: 'CompassScorecardCriteriaScore';
    /** The maximum score value for the criterion. The value is used in calculating the aggregate score as a percentage. */
    maxScore: Scalars['Int'];
    /** The calculated score value for the criterion. */
    score: Scalars['Int'];
    /** The associated scorecard criterion. */
    scorecardCriteria: CompassScorecardCriteria;
};
export declare type CompassScorecardCriteriaScoreQuery = {
    /** The unique identifier (ID) of the component. */
    componentId: Scalars['ID'];
};
export declare type CompassScorecardEdge = {
    __typename?: 'CompassScorecardEdge';
    cursor: Scalars['String'];
    node?: Maybe<CompassScorecard>;
};
/** The types used to identify the importance of the scorecard. */
export declare enum CompassScorecardImportance {
    /** Recommended to the component's owner when they select a scorecard to apply to their component. */
    Recommended = "RECOMMENDED",
    /** Automatically applied to all components of the specified type or types and cannot be removed. */
    Required = "REQUIRED",
    /** Custom scorecard, focused on specific use cases within teams or departments. */
    UserDefined = "USER_DEFINED"
}
export declare type CompassScorecardResult = CompassScorecard | QueryError;
/** Contains the calculated score for a component. Each component has one calculated score per scorecard. */
export declare type CompassScorecardScore = {
    __typename?: 'CompassScorecardScore';
    /** Returns the scores for individual criterion. */
    criteriaScores?: Maybe<Array<CompassScorecardCriteriaScore>>;
    /** The maximum possible total score value. */
    maxTotalScore: Scalars['Int'];
    /** The associated scorecard. */
    scorecard: CompassScorecard;
    /** The total calculated score value. */
    totalScore: Scalars['Int'];
};
/** Scorecard score on a scorecard for a component. */
export declare type CompassScorecardScoreQuery = {
    /** The unique identifier (ID) of the component. */
    componentId: Scalars['ID'];
};
/** Accepts input to find available scorecards. */
export declare type CompassScorecardsQuery = {
    /** Returns the scorecards after the specified cursor position. */
    after?: Maybe<Scalars['String']>;
    /** The first N number of scorecards to return in the query. */
    first?: Maybe<Scalars['Int']>;
};
export declare type CompassScorecardsQueryResult = CompassScorecardConnection | QueryError;
export declare type CompassSearchComponentConnection = {
    __typename?: 'CompassSearchComponentConnection';
    edges?: Maybe<Array<CompassSearchComponentEdge>>;
    nodes?: Maybe<Array<CompassSearchComponentResult>>;
    pageInfo: PageInfo;
};
export declare type CompassSearchComponentEdge = {
    __typename?: 'CompassSearchComponentEdge';
    cursor: Scalars['String'];
    node?: Maybe<CompassSearchComponentResult>;
};
export declare type CompassSearchComponentLabelsConnection = {
    __typename?: 'CompassSearchComponentLabelsConnection';
    edges?: Maybe<Array<CompassSearchComponentLabelsEdge>>;
    nodes?: Maybe<Array<CompassComponentLabel>>;
    pageInfo: PageInfo;
};
export declare type CompassSearchComponentLabelsEdge = {
    __typename?: 'CompassSearchComponentLabelsEdge';
    cursor: Scalars['String'];
    node?: Maybe<CompassComponentLabel>;
};
/** The query to find component labels within Compass. */
export declare type CompassSearchComponentLabelsQuery = {
    /** Returns results after the specified cursor. */
    after?: Maybe<Scalars['String']>;
    /** Number of results to return in the query. The default is 25. */
    first?: Maybe<Scalars['Int']>;
    /** Text query to search against. */
    query?: Maybe<Scalars['String']>;
    /** Sorting parameters for the results to be searched for. The default is by ranked results. */
    sort?: Maybe<Array<Maybe<CompassQuerySort>>>;
};
/** The query to find components. */
export declare type CompassSearchComponentQuery = {
    /** Returns results after the specified cursor. */
    after?: Maybe<Scalars['String']>;
    /** Filters on component fields to be searched against. */
    fieldFilters?: Maybe<Array<Maybe<CompassQueryFieldFilter>>>;
    /** Number of results to return in the query. The default is 25. */
    first?: Maybe<Scalars['Int']>;
    /** Text query to search against. */
    query?: Maybe<Scalars['String']>;
    /** Sorting parameters for the results to be searched for. The default is by ranked results. */
    sort?: Maybe<Array<Maybe<CompassQuerySort>>>;
};
export declare type CompassSearchComponentResult = {
    __typename?: 'CompassSearchComponentResult';
    /**
     * The Compass component.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    component?: Maybe<CompassComponent>;
    /** Link to the component. Search UI can use this link to direct the user to the component page on click. */
    link: Scalars['URL'];
};
export declare type CompassStarredComponentConnection = {
    __typename?: 'CompassStarredComponentConnection';
    edges?: Maybe<Array<CompassStarredComponentEdge>>;
    nodes?: Maybe<Array<CompassComponent>>;
    pageInfo: PageInfo;
};
export declare type CompassStarredComponentEdge = {
    __typename?: 'CompassStarredComponentEdge';
    cursor: Scalars['String'];
    /**
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    node?: Maybe<CompassComponent>;
};
/** The query fields for finding starred components. */
export declare type CompassStarredComponentQuery = {
    /** Returns starred components after the specified cursor. */
    after?: Maybe<Scalars['String']>;
    /** First N number of starred components to return in the query. The default is 25. */
    first?: Maybe<Scalars['Int']>;
};
export declare type CompassStarredComponentQueryResult = CompassStarredComponentConnection | QueryError;
/** A team checkin communicates checkin for a team. */
export declare type CompassTeamCheckin = {
    __typename?: 'CompassTeamCheckin';
    /** Contains change metadata for the team checkin. */
    changeMetadata: CompassChangeMetadata;
    /** The ID of the team checkin. */
    id: Scalars['ID'];
    /** The mood of the team checkin. */
    mood?: Maybe<Scalars['Int']>;
    /** The response to the question 1 of the team checkin. */
    response1?: Maybe<Scalars['String']>;
    /** The response to the question 2 of the team checkin. */
    response2?: Maybe<Scalars['String']>;
    /** The response to the question 3 of the team checkin. */
    response3?: Maybe<Scalars['String']>;
    /** The unique identifier (ID) of the team that did the checkin. */
    teamId?: Maybe<Scalars['ID']>;
};
/** Accepts input for deleting a team checkin. */
export declare type CompassTeamCheckinsInput = {
    /** The cloud ID of the site to update a checkin on. */
    cloudId: Scalars['ID'];
    /** The unique identifier (ID) of the team that did the checkin. */
    teamId: Scalars['ID'];
};
/** Accepts input for updating a component announcement. */
export declare type CompassUpdateAnnouncementInput = {
    /** Whether the existing acknowledgements should be reset or not. */
    clearAcknowledgements?: Maybe<Scalars['Boolean']>;
    /** The cloud ID of the site to update an announcement on. */
    cloudId: Scalars['ID'];
    /** The description of the announcement. */
    description?: Maybe<Scalars['String']>;
    /** The ID of the announcement being updated. */
    id: Scalars['ID'];
    /** The date on which the changes in the announcement will take effect. */
    targetDate?: Maybe<Scalars['DateTime']>;
    /** The title of the announcement. */
    title?: Maybe<Scalars['String']>;
};
/** The payload returned after updating a component announcement. */
export declare type CompassUpdateAnnouncementPayload = Payload & {
    __typename?: 'CompassUpdateAnnouncementPayload';
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
    /** The updated announcement. */
    updatedAnnouncement?: Maybe<CompassAnnouncement>;
};
/** Accepts input for updating a team checkin. */
export declare type CompassUpdateTeamCheckinInput = {
    /** The cloud ID of the site to update a checkin on. */
    cloudId: Scalars['ID'];
    /** The ID of the team checkin being updated. */
    id: Scalars['ID'];
    /** The mood of the team checkin. */
    mood: Scalars['Int'];
    /** The response to the question 1 of the team checkin. */
    response1?: Maybe<Scalars['String']>;
    /** The response to the question 2 of the team checkin. */
    response2?: Maybe<Scalars['String']>;
    /** The response to the question 3 of the team checkin. */
    response3?: Maybe<Scalars['String']>;
};
/** The payload returned after updating a team checkin. */
export declare type CompassUpdateTeamCheckinPayload = Payload & {
    __typename?: 'CompassUpdateTeamCheckinPayload';
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
    /** Details of the updated checkin. */
    updatedTeamCheckin?: Maybe<CompassTeamCheckin>;
};
/** All Atlassian Cloud Products an app version is compatible with */
export declare type CompatibleAtlassianCloudProduct = CompatibleAtlassianProduct & {
    __typename?: 'CompatibleAtlassianCloudProduct';
    /** Atlassian product */
    atlassianProduct?: Maybe<MarketplaceSupportedAtlassianProduct>;
    /**
     * Unique id for this Atlassian product in Marketplace system
     *
     *
     * This field is **deprecated** and will be removed in the future
     * @deprecated Use field `atlassianProduct.id`
     */
    id: Scalars['ID'];
    /**
     * Name of Atlassian product
     *
     *
     * This field is **deprecated** and will be removed in the future
     * @deprecated Use field `atlassianProduct.name`
     */
    name: Scalars['String'];
};
/** All Atlassian DataCenter Products an app version is compatible with */
export declare type CompatibleAtlassianDataCenterProduct = CompatibleAtlassianProduct & {
    __typename?: 'CompatibleAtlassianDataCenterProduct';
    /** Atlassian product */
    atlassianProduct?: Maybe<MarketplaceSupportedAtlassianProduct>;
    /**
     * Unique id for this Atlassian product in Marketplace system
     *
     *
     * This field is **deprecated** and will be removed in the future
     * @deprecated Use field `atlassianProduct.id`
     */
    id: Scalars['ID'];
    /** Maximum version number of Atlassian Product */
    maximumVersion: Scalars['String'];
    /** Minimum version number of Atlassian Product */
    minimumVersion: Scalars['String'];
    /**
     * Name of Atlassian product
     *
     *
     * This field is **deprecated** and will be removed in the future
     * @deprecated Use field `atlassianProduct.name`
     */
    name: Scalars['String'];
};
/** All Atlassian Products an app version is compatible with */
export declare type CompatibleAtlassianProduct = {
    /** Atlassian product */
    atlassianProduct?: Maybe<MarketplaceSupportedAtlassianProduct>;
    /**
     * Unique id for this Atlassian product in Marketplace system
     *
     *
     * This field is **deprecated** and will be removed in the future
     * @deprecated Use field `atlassianProduct.id`
     */
    id: Scalars['ID'];
    /**
     * Name of Atlassian product
     *
     *
     * This field is **deprecated** and will be removed in the future
     * @deprecated Use field `atlassianProduct.name`
     */
    name: Scalars['String'];
};
/** All Atlassian Server Products an app version is compatible with */
export declare type CompatibleAtlassianServerProduct = CompatibleAtlassianProduct & {
    __typename?: 'CompatibleAtlassianServerProduct';
    /** Atlassian product */
    atlassianProduct?: Maybe<MarketplaceSupportedAtlassianProduct>;
    /**
     * Unique id for this Atlassian product in Marketplace system
     *
     *
     * This field is **deprecated** and will be removed in the future
     * @deprecated Use field `atlassianProduct.id`
     */
    id: Scalars['ID'];
    /** Maximum version number of Atlassian Product */
    maximumVersion: Scalars['String'];
    /** Minimum version number of Atlassian Product */
    minimumVersion: Scalars['String'];
    /**
     * Name of Atlassian product
     *
     *
     * This field is **deprecated** and will be removed in the future
     * @deprecated Use field `atlassianProduct.name`
     */
    name: Scalars['String'];
};
/** Complete sprint */
export declare type CompleteSprintInput = {
    boardId: Scalars['ID'];
    incompleteCardsDestination: SoftwareCardsDestination;
    sprintId: Scalars['ID'];
};
export declare type CompleteSprintResponse = MutationResponse & {
    __typename?: 'CompleteSprintResponse';
    boardScope?: Maybe<BoardScope>;
    message: Scalars['String'];
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
/** Event data corresponding to a dataManager updating a component. */
export declare type ComponentSyncEvent = {
    __typename?: 'ComponentSyncEvent';
    /** Error messages explaining why the last sync event may have failed. */
    lastSyncErrors?: Maybe<Array<Scalars['String']>>;
    /** Status of the last sync event. */
    status: ComponentSyncEventStatus;
    /** Timestamp when the last sync event occurred. */
    time: Scalars['DateTime'];
};
/** Details on the result of the last component sync. */
export declare type ComponentSyncEventInput = {
    /** Error messages explaining why last sync event failed. */
    lastSyncErrors?: Maybe<Array<Scalars['String']>>;
    /** Status of the last sync event. */
    status: ComponentSyncEventStatus;
};
/** Status types of a data manager sync event. */
export declare enum ComponentSyncEventStatus {
    /** A Compass internal server issue prevented the sync from occurring. */
    ServerError = "SERVER_ERROR",
    /** The component updates were successfully synced to Compass. */
    Success = "SUCCESS",
    /** An issue with the calling app or user input prevented the component from syncing to Compass. */
    UserError = "USER_ERROR"
}
export declare type ConfigurePolarisRefreshInput = {
    autoRefreshTimeSeconds?: Maybe<Scalars['Int']>;
    clearError?: Maybe<Scalars['Boolean']>;
    /**  either an issue, an insight, or a snippet */
    disable?: Maybe<Scalars['Boolean']>;
    project: Scalars['ID'];
    setError?: Maybe<PolarisRefreshError>;
    subject?: Maybe<Scalars['ID']>;
    timeToLiveSeconds?: Maybe<Scalars['Int']>;
};
export declare type ConfigurePolarisRefreshPayload = Payload & {
    __typename?: 'ConfigurePolarisRefreshPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<Scalars['Int']>;
    success: Scalars['Boolean'];
};
/** Level of access to an Atlassian product that an app can request */
export declare type ConnectAppScope = {
    __typename?: 'ConnectAppScope';
    /** Name of Atlassian product to which this scope applies */
    atlassianProductName: Scalars['String'];
    /** Description of the level of access to an Atlassian product that an app can request */
    capability: Scalars['String'];
    /** Unique id of the scope */
    id: Scalars['ID'];
    /** Name of the scope */
    name: Scalars['String'];
    /**
     * Unique id of the scope (Deprecated field: Use field `id`)
     *
     *
     * This field is **deprecated** and will be removed in the future
     * @deprecated Use field `id`
     */
    scopeId: Scalars['ID'];
};
export declare type ContainerEventObject = {
    __typename?: 'ContainerEventObject';
    attributes: Scalars['JSON'];
    id: Scalars['ID'];
    type: Scalars['String'];
};
export declare type ContextEventObject = {
    __typename?: 'ContextEventObject';
    attributes: Scalars['JSON'];
    id: Scalars['ID'];
    type: Scalars['String'];
};
export declare type CopyPolarisInsightsContainerInput = {
    /** The container ARI which contains insights */
    container?: Maybe<Scalars['ID']>;
    /** The project ARI which contains container */
    project: Scalars['ID'];
};
export declare type CopyPolarisInsightsInput = {
    /** Destination container to copy insgihts */
    destination: CopyPolarisInsightsContainerInput;
    /** Insight ARI's list that should be copied. Leave it empty to copy all insights from source to destination */
    insights?: Maybe<Array<Scalars['String']>>;
    /** Source container to copy insgihts */
    source: CopyPolarisInsightsContainerInput;
};
export declare type CopyPolarisInsightsPayload = Payload & {
    __typename?: 'CopyPolarisInsightsPayload';
    copiedInsights?: Maybe<Array<PolarisInsight>>;
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type CreateAppDeploymentInput = {
    appId: Scalars['ID'];
    artifactUrl: Scalars['URL'];
    environmentKey: Scalars['String'];
    hostedResourceUploadId?: Maybe<Scalars['ID']>;
};
/** Response from creating a deployment */
export declare type CreateAppDeploymentResponse = Payload & {
    __typename?: 'CreateAppDeploymentResponse';
    /** Details about the created deployment */
    deployment?: Maybe<AppDeployment>;
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type CreateAppDeploymentUrlInput = {
    appId: Scalars['ID'];
};
/** Response from creating an app deployment url */
export declare type CreateAppDeploymentUrlResponse = Payload & {
    __typename?: 'CreateAppDeploymentUrlResponse';
    deploymentUrl?: Maybe<Scalars['String']>;
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type CreateAppInput = {
    description?: Maybe<Scalars['String']>;
    name: Scalars['String'];
};
/** Response from creating an app */
export declare type CreateAppResponse = Payload & {
    __typename?: 'CreateAppResponse';
    /** Details about the created app */
    app?: Maybe<App>;
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
/** A response to a tunnel creation request */
export declare type CreateAppTunnelResponse = Payload & {
    __typename?: 'CreateAppTunnelResponse';
    errors?: Maybe<Array<MutationError>>;
    /**
     * The actual expiry time (in milliseconds) of the created forge tunnel. Once the
     * tunnel expires, Forge apps will display the deployed version even
     * if the local development server is still active.
     */
    expiry?: Maybe<Scalars['String']>;
    /**
     * The recommended keep-alive time (in milliseconds) by which the forge CLI (or
     * other clients) should re-establish the forge tunnel.
     * This is guaranteed to be less than the expiry of the forge tunnel.
     */
    keepAlive?: Maybe<Scalars['String']>;
    success: Scalars['Boolean'];
};
/**
 * Establish tunnels for a specific environment of an app.
 *
 * This will redirect all function calls to the provided faas url. This URL must implement the same
 * invocation contract that is used elsewhere in Xen.
 *
 * This will also be used to redirect Custom UI product rendering to the custom ui urls. We separate
 * them by extension key.
 */
export declare type CreateAppTunnelsInput = {
    /** The app to setup a tunnel for */
    appId: Scalars['ID'];
    /** The environment key */
    environmentKey: Scalars['String'];
    /** Should existing tunnels be overwritten */
    force?: Maybe<Scalars['Boolean']>;
    /** The tunnel definitions */
    tunnelDefinitions: TunnelDefinitionsInput;
};
/**
 * ## Mutations
 * ## Column Mutations ###
 */
export declare type CreateColumnInput = {
    boardId: Scalars['ID'];
    columnName: Scalars['String'];
};
export declare type CreateColumnOutput = MutationResponse & {
    __typename?: 'CreateColumnOutput';
    columns?: Maybe<Array<Column>>;
    message: Scalars['String'];
    newColumn?: Maybe<Column>;
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
/** Accepts input to create an external alias of a component. */
export declare type CreateCompassComponentExternalAliasInput = {
    /** The ID of the component to which you add the alias. */
    componentId: Scalars['ID'];
    /** An alias of the component identifier in external sources. */
    externalAlias: CompassExternalAliasInput;
};
/** The payload returned from creating an external alias of a component. */
export declare type CreateCompassComponentExternalAliasPayload = Payload & {
    __typename?: 'CreateCompassComponentExternalAliasPayload';
    /**
     * The details of the component that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    componentDetails?: Maybe<CompassComponent>;
    /** Created Compass External Alias */
    createdCompassExternalAlias?: Maybe<CompassExternalAlias>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** Accepts input for creating a new component. */
export declare type CreateCompassComponentInput = {
    /** The description of the component. */
    description?: Maybe<Scalars['String']>;
    /** A collection of fields for storing data about the component. */
    fields?: Maybe<Array<CreateCompassFieldInput>>;
    /** The name of the component. */
    name: Scalars['String'];
    /** The unique identifier (ID) of the team that owns the component. */
    ownerId?: Maybe<Scalars['ID']>;
    /** The type of the component. */
    type: CompassComponentType;
};
/** Accepts input to add links for a component. */
export declare type CreateCompassComponentLinkInput = {
    /** The ID of the component to add the link. */
    componentId: Scalars['ID'];
    /** The link to be added for the component. */
    link: CreateCompassLinkInput;
};
/** The payload returned after adding a link for a component. */
export declare type CreateCompassComponentLinkPayload = Payload & {
    __typename?: 'CreateCompassComponentLinkPayload';
    /**
     * The details of the component that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    componentDetails?: Maybe<CompassComponent>;
    /** The newly created component link. */
    createdComponentLink?: Maybe<CompassLink>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** The payload returned from creating a new component. */
export declare type CreateCompassComponentPayload = Payload & {
    __typename?: 'CreateCompassComponentPayload';
    /**
     * The details of the component that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    componentDetails?: Maybe<CompassComponent>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** Accepts input to create a field. */
export declare type CreateCompassFieldInput = {
    /** The ID of the field definition. */
    definition: Scalars['ID'];
    /** The value of the field. */
    value: CompassFieldValueInput;
};
/** Accepts input to a create a scorecard criterion representing the presence of a description. */
export declare type CreateCompassHasDescriptionScorecardCriteriaInput = {
    weight: Scalars['Int'];
};
/** Accepts input to create a scorecard criterion representing the presence of a field, for example, 'Has Tier'. */
export declare type CreateCompassHasFieldScorecardCriteriaInput = {
    /** The ID for the field definition that is the target of a relationship. */
    fieldDefinitionId: Scalars['ID'];
    /** The weight that will be used in determining the aggregate score. */
    weight: Scalars['Int'];
};
/** Accepts input to create a scorecard criterion representing the presence of a link, for example, 'Has Repository' or 'Has Documentation'. */
export declare type CreateCompassHasLinkScorecardCriteriaInput = {
    /** The type of link, for example, 'Repository' if 'Has Repository'. */
    linkType: CompassLinkType;
    /** The weight that will be used in determining the aggregate score. */
    weight: Scalars['Int'];
};
export declare type CreateCompassHasOwnerScorecardCriteriaInput = {
    /** The weight that will be used in determining the aggregate score. */
    weight: Scalars['Int'];
};
/** Accepts details of the link to add to a component. */
export declare type CreateCompassLinkInput = {
    /** The name of the link. */
    name?: Maybe<Scalars['String']>;
    /** The type of the link. */
    type: CompassLinkType;
    /** The URL of the link. */
    url: Scalars['URL'];
};
/** Accepts input for creating a new relationship. */
export declare type CreateCompassRelationshipInput = {
    /** The unique identifier (ID) of the component at the ending node. */
    endNodeId: Scalars['ID'];
    /** The unique identifier (ID) of the component at the starting node. */
    startNodeId: Scalars['ID'];
    /** The type of the relationship. */
    type: CompassRelationshipType;
};
/** The payload returned from creating a new relationship. */
export declare type CreateCompassRelationshipPayload = Payload & {
    __typename?: 'CreateCompassRelationshipPayload';
    /** The newly created relationship between two components. */
    createdCompassRelationship?: Maybe<CompassRelationship>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** Accepts input to create a scorecard criterion. */
export declare type CreateCompassScorecardCriteriaInput = {
    hasDescription?: Maybe<CreateCompassHasDescriptionScorecardCriteriaInput>;
    hasField?: Maybe<CreateCompassHasFieldScorecardCriteriaInput>;
    hasLink?: Maybe<CreateCompassHasLinkScorecardCriteriaInput>;
    hasOwner?: Maybe<CreateCompassHasOwnerScorecardCriteriaInput>;
};
/** Accepts input to create a scorecard criterion. */
export declare type CreateCompassScorecardCriteriasInput = {
    criterias: Array<CreateCompassScorecardCriteriaInput>;
};
/** The payload returned from creating a scorecard criterion. */
export declare type CreateCompassScorecardCriteriasPayload = Payload & {
    __typename?: 'CreateCompassScorecardCriteriasPayload';
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /**
     * The scorecard that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:scorecard:compass__
     */
    scorecard?: Maybe<CompassScorecard>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/**  MUTATION INPUTS/PAYLOAD TYPES */
export declare type CreateCompassScorecardInput = {
    componentType: CompassComponentType;
    criterias?: Maybe<Array<CreateCompassScorecardCriteriaInput>>;
    description?: Maybe<Scalars['String']>;
    importance: CompassScorecardImportance;
    name: Scalars['String'];
    ownerId?: Maybe<Scalars['ID']>;
};
/** The payload returned from creating a scorecard criterion. */
export declare type CreateCompassScorecardPayload = Payload & {
    __typename?: 'CreateCompassScorecardPayload';
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /**
     * The scorecard that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:scorecard:compass__
     */
    scorecardDetails?: Maybe<CompassScorecard>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** Accepts input for creating a starred component. */
export declare type CreateCompassStarredComponentInput = {
    /** The ID of the component to be starred. */
    id: Scalars['ID'];
};
/** The payload returned from creating a starred component. */
export declare type CreateCompassStarredComponentPayload = Payload & {
    __typename?: 'CreateCompassStarredComponentPayload';
    /** A list of starred components. */
    components?: Maybe<CompassStarredComponentConnection>;
    /** A list of errors that occurred during mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the relationship is created successfully. */
    success: Scalars['Boolean'];
};
/** CustomFilters Mutation */
export declare type CreateCustomFilterInput = {
    boardId: Scalars['ID'];
    description?: Maybe<Scalars['String']>;
    jql: Scalars['String'];
    name: Scalars['String'];
};
export declare type CreateDeploymentEventInput = {
    /** The cloud ID of the site to create a deployment event for. */
    cloudId: Scalars['ID'];
    /** The sequence number for the deployment. */
    deploymentSequenceNumber: Scalars['Long'];
    /** The description of the deployment event. */
    description: Scalars['String'];
    /** The name of the deployment event. */
    displayName: Scalars['String'];
    /** The environment where the deployment event has occurred. */
    environment: CompassDeploymentEventEnvironmentInput;
    /** The ID of the external event source. */
    externalEventSourceId: Scalars['ID'];
    /** The last time this event was updated. */
    lastUpdated: Scalars['DateTime'];
    /** The deployment event pipeline. */
    pipeline: CompassDeploymentEventPipelineInput;
    /** The state of the deployment. */
    state: CompassDeploymentEventState;
    /** The sequence number specifying the order of updates of the deployment event. */
    updateSequenceNumber: Scalars['Long'];
    /** The URL of the deployment event. */
    url: Scalars['URL'];
};
export declare type CreateDeploymentEventsPayload = Payload & {
    __typename?: 'CreateDeploymentEventsPayload';
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** The request input for creating a relationship between a DevOps Service and an Jira Project. */
export declare type CreateDevOpsServiceAndJiraProjectRelationshipInput = {
    /** The ID of the site of the service and the Jira project. */
    cloudId: Scalars['ID'];
    /** An optional description of the relationship. */
    description?: Maybe<Scalars['String']>;
    /** The Jira project ARI */
    jiraProjectId: Scalars['ID'];
    /** Optional properties of the relationship. */
    properties?: Maybe<Array<DevOpsContainerRelationshipEntityPropertyInput>>;
    /** The type of the relationship. */
    relationshipType: DevOpsServiceAndJiraProjectRelationshipType;
    /** The ARI of the DevOps Service. */
    serviceId: Scalars['ID'];
};
/** #################### Mutation Payloads - Service and Jira Project Relationship ##################### */
export declare type CreateDevOpsServiceAndJiraProjectRelationshipPayload = Payload & {
    __typename?: 'CreateDevOpsServiceAndJiraProjectRelationshipPayload';
    /** The list of errors occurred during create relationship */
    errors?: Maybe<Array<MutationError>>;
    /** The created relationship */
    serviceAndJiraProjectRelationship?: Maybe<DevOpsServiceAndJiraProjectRelationship>;
    /** The result of whether the relationship is created successfully or not */
    success: Scalars['Boolean'];
};
/** The request input for creating a relationship between a DevOps Service and an Opsgenie Team */
export declare type CreateDevOpsServiceAndOpsgenieTeamRelationshipInput = {
    /**
     * We can't infer this from the service ARI since the container association registry doesn't own the service ARI -
     * therefore we have to treat it as opaque.
     */
    cloudId: Scalars['ID'];
    /** An optional description of the relationship. */
    description?: Maybe<Scalars['String']>;
    /**
     * The ARI of the Opsgenie Team
     *
     * The Opsgenie team must exist on the same site as the service. If it doesn't, the create will fail
     * with a OPSGENIE_TEAM_ID_INVALID error.
     */
    opsgenieTeamId: Scalars['ID'];
    /** Optional properties of the relationship. */
    properties?: Maybe<Array<DevOpsContainerRelationshipEntityPropertyInput>>;
    /** The ARI of the DevOps Service. */
    serviceId: Scalars['ID'];
};
/** The response payload of creating a relationship between a DevOps Service and an Opsgenie Team */
export declare type CreateDevOpsServiceAndOpsgenieTeamRelationshipPayload = Payload & {
    __typename?: 'CreateDevOpsServiceAndOpsgenieTeamRelationshipPayload';
    /** The list of errors occurred during update relationship */
    errors?: Maybe<Array<MutationError>>;
    /** The created relationship */
    serviceAndOpsgenieTeamRelationship?: Maybe<DevOpsServiceAndOpsgenieTeamRelationship>;
    /** The result of whether the relationship is created successfully or not */
    success: Scalars['Boolean'];
};
/** The request input for creating a relationship between a DevOps Service and a Repository */
export declare type CreateDevOpsServiceAndRepositoryRelationshipInput = {
    /** The Bitbucket Repository ARI */
    bitbucketRepositoryId?: Maybe<Scalars['ID']>;
    /** An optional description of the relationship. */
    description?: Maybe<Scalars['String']>;
    /** Optional properties of the relationship. */
    properties?: Maybe<Array<DevOpsContainerRelationshipEntityPropertyInput>>;
    /** The ARI of the DevOps Service. */
    serviceId: Scalars['ID'];
    /** The Third Party Repository. It should be null when repositoryId is a Bitbucket Repository ARI */
    thirdPartyRepository?: Maybe<ThirdPartyRepositoryInput>;
};
/** #################### Mutation Payloads - DevOps Service and Repository Relationship ##################### */
export declare type CreateDevOpsServiceAndRepositoryRelationshipPayload = Payload & {
    __typename?: 'CreateDevOpsServiceAndRepositoryRelationshipPayload';
    errors?: Maybe<Array<MutationError>>;
    /** The created relationship */
    serviceAndRepositoryRelationship?: Maybe<DevOpsServiceAndRepositoryRelationship>;
    success: Scalars['Boolean'];
};
/** The request input for creating a new DevOps Service */
export declare type CreateDevOpsServiceInput = {
    cloudId: Scalars['String'];
    description?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    properties?: Maybe<Array<DevOpsServiceEntityPropertyInput>>;
    /** Tier assigned to the DevOps Service */
    serviceTier: DevOpsServiceTierInput;
};
/** The response payload of creating a new DevOps Service */
export declare type CreateDevOpsServicePayload = Payload & {
    __typename?: 'CreateDevOpsServicePayload';
    /** The list of errors occurred during the DevOps Service creation */
    errors?: Maybe<Array<MutationError>>;
    /** The created DevOps Service */
    service?: Maybe<DevOpsService>;
    /** The result of whether a new DevOps Service is created successfully or not */
    success: Scalars['Boolean'];
};
/** The request input for creating a new DevOps Service Relationship */
export declare type CreateDevOpsServiceRelationshipInput = {
    /** The description of the relationship */
    description?: Maybe<Scalars['String']>;
    /** The Service ARI of the end node of the relationship */
    endId: Scalars['ID'];
    /** The properties of the relationship */
    properties?: Maybe<Array<DevOpsServiceEntityPropertyInput>>;
    /** The Service ARI of the start node of the relationship */
    startId: Scalars['ID'];
    /** The inter-service relationship type */
    type: DevOpsServiceRelationshipType;
};
export declare type CreateDevOpsServiceRelationshipPayload = Payload & {
    __typename?: 'CreateDevOpsServiceRelationshipPayload';
    errors?: Maybe<Array<MutationError>>;
    /** The created inter-service relationship */
    serviceRelationship?: Maybe<DevOpsServiceRelationship>;
    success: Scalars['Boolean'];
};
export declare type CreateEventSourceInput = {
    /** The type of the event to be created. */
    eventType: CompassEventType;
    /** The ID of the external event source. */
    externalEventSourceId: Scalars['ID'];
};
export declare type CreateEventSourcePayload = Payload & {
    __typename?: 'CreateEventSourcePayload';
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** The source of event data. */
    eventSource?: Maybe<EventSource>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
export declare type CreateHostedResourceUploadUrlInput = {
    appId: Scalars['ID'];
    environmentKey: Scalars['String'];
    resourceKeys: Array<Scalars['String']>;
};
/** Response from creating a hosted resource upload url */
export declare type CreateHostedResourceUploadUrlPayload = Payload & {
    __typename?: 'CreateHostedResourceUploadUrlPayload';
    errors?: Maybe<Array<MutationError>>;
    preSignedUrls?: Maybe<Array<HostedResourcePreSignedUrl>>;
    success: Scalars['Boolean'];
    uploadId: Scalars['ID'];
};
/** #################### Mutation Input - Jira Project and Opsgenie Team Relationship ##################### */
export declare type CreateJiraProjectAndOpsgenieTeamRelationshipInput = {
    /** An optional description of the relationship. */
    description?: Maybe<Scalars['String']>;
    /** The ARI of the Jira project. */
    jiraProjectId: Scalars['ID'];
    /** The type of Jira. */
    jiraProjectType?: Maybe<DevOpsJiraProjectType>;
    /**
     * The Opsgenie team must exist on the same site as the service. If it doesn't, the create will fail
     * with a OPSGENIE_TEAM_ID_INVALID error.
     */
    opsgenieTeamId: Scalars['ID'];
    /** Optional properties of the relationship. */
    properties?: Maybe<Array<DevOpsContainerRelationshipEntityPropertyInput>>;
};
/** #################### Mutation Payloads - Jira Project and Opsgenie Team Relationship ##################### */
export declare type CreateJiraProjectAndOpsgenieTeamRelationshipPayload = Payload & {
    __typename?: 'CreateJiraProjectAndOpsgenieTeamRelationshipPayload';
    errors?: Maybe<Array<MutationError>>;
    /** The created relationship */
    jiraProjectAndOpsgenieTeamRelationship?: Maybe<JiraProjectAndOpsgenieTeamRelationship>;
    success: Scalars['Boolean'];
};
/** The request input for creating a relationship between a Jira project and a repository */
export declare type CreateJiraProjectAndRepositoryRelationshipInput = {
    /**
     * The Bitbucket repository ARI.
     * This parameter should be null when the third party repository is not null, and vice versa.
     */
    bitbucketRepositoryId?: Maybe<Scalars['ID']>;
    /** An optional description of the relationship */
    description?: Maybe<Scalars['String']>;
    /** The project ARI */
    jiraProjectId: Scalars['ID'];
    /** Optional properties of the relationship */
    properties?: Maybe<Array<DevOpsContainerRelationshipEntityPropertyInput>>;
    /**
     * The third party repository details.
     * This parameter should be null when the Bitbucket repository ARI is not null, and vice versa.
     */
    thirdPartyRepository?: Maybe<ThirdPartyRepositoryInput>;
};
/** #################### Mutation Payloads - Jira Project and Repository Relationship ##################### */
export declare type CreateJiraProjectAndRepositoryRelationshipPayload = Payload & {
    __typename?: 'CreateJiraProjectAndRepositoryRelationshipPayload';
    /** The list of errors occurred during relationship creation */
    errors?: Maybe<Array<MutationError>>;
    /** The created relationship */
    jiraProjectAndRepositoryRelationship?: Maybe<JiraProjectAndRepositoryRelationship>;
    /** The result of whether the relationship is created successfully or not */
    success: Scalars['Boolean'];
};
export declare type CreatePolarisAnonymousVisitorHashPayload = Payload & {
    __typename?: 'CreatePolarisAnonymousVisitorHashPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisAnonymousVisitorHash>;
    success: Scalars['Boolean'];
};
export declare type CreatePolarisCalculatedField = {
    formula: Scalars['JSON'];
    label: Scalars['String'];
    presentation?: Maybe<PolarisPresentationInput>;
    project: Scalars['ID'];
};
export declare type CreatePolarisCalculatedFieldPayload = Payload & {
    __typename?: 'CreatePolarisCalculatedFieldPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisIdeaField>;
    success: Scalars['Boolean'];
};
export declare type CreatePolarisCommentInput = {
    content?: Maybe<Scalars['JSON']>;
    kind?: Maybe<PolarisCommentKind>;
    subject?: Maybe<Scalars['ID']>;
};
export declare type CreatePolarisCommentPayload = Payload & {
    __typename?: 'CreatePolarisCommentPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisComment>;
    success: Scalars['Boolean'];
};
export declare type CreatePolarisDecorationInput = {
    field: Scalars['ID'];
    update: UpdatePolarisDecorationInput;
};
export declare type CreatePolarisDecorationPayload = Payload & {
    __typename?: 'CreatePolarisDecorationPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisDecoration>;
    success: Scalars['Boolean'];
};
export declare type CreatePolarisInsightFromPlayContributionInput = {
    /** The ARI of the play contribution */
    contribution: Scalars['ID'];
    /**
     * The ARI of the idea to add the insight to.  If null, then the insight
     * is added to the idea that the contribution is for.
     */
    subject?: Maybe<Scalars['ID']>;
};
export declare type CreatePolarisInsightInput = {
    /** The cloudID in which we are adding insight */
    cloudID: Scalars['String'];
    /**
     * DEPRECATED, DO NOT USE
     * Array of datas in JSON format. It will be validated with JSON schema of Polaris Insights Data format.
     */
    data?: Maybe<Array<Scalars['JSON']>>;
    /** Description in ADF format https://developer.atlassian.com/platform/atlassian-document-format/ */
    description?: Maybe<Scalars['JSON']>;
    /** The issueID in which we are adding insight, cloud be empty for adding insight on project level */
    issueID?: Maybe<Scalars['Int']>;
    /** The projectID in which we are adding insight */
    projectID: Scalars['Int'];
    /** Array of snippets */
    snippets?: Maybe<Array<CreatePolarisSnippetInput>>;
};
export declare type CreatePolarisInsightPayload = Payload & {
    __typename?: 'CreatePolarisInsightPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisInsight>;
    success: Scalars['Boolean'];
};
export declare type CreatePolarisPlayContribution = {
    /**  the issue (idea) to which this contribution is being made */
    amount?: Maybe<Scalars['Int']>;
    /**  the extent of the contribution (null=drop value) */
    comment?: Maybe<Scalars['JSON']>;
    play: Scalars['ID'];
    /**  the play being contributed to */
    subject: Scalars['ID'];
};
export declare type CreatePolarisPlayContributionPayload = {
    __typename?: 'CreatePolarisPlayContributionPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisPlayContribution>;
    success: Scalars['Boolean'];
};
export declare type CreatePolarisPlayInput = {
    /**  the view from which the play is created */
    description?: Maybe<Scalars['JSON']>;
    fromView?: Maybe<Scalars['ID']>;
    kind: PolarisPlayKind;
    label: Scalars['String'];
    parameters?: Maybe<Scalars['JSON']>;
    project: Scalars['ID'];
    /**  the label for the play field, and the "short" name of the play */
    summary?: Maybe<Scalars['String']>;
};
export declare type CreatePolarisPlayPayload = {
    __typename?: 'CreatePolarisPlayPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisPlay>;
    success: Scalars['Boolean'];
};
export declare type CreatePolarisProjectInput = {
    key: Scalars['String'];
    name: Scalars['String'];
    tenant: Scalars['ID'];
};
export declare type CreatePolarisSnippetInput = {
    /** Data in JSON format. It will be validated with JSON schema of Polaris Insights Data format. */
    data?: Maybe<Scalars['JSON']>;
    /** OauthClientId of CaaS app */
    oauthClientId: Scalars['String'];
    /**
     * DEPRECATED, DO NOT USE
     * Snippet-level properties in JSON format.
     */
    properties?: Maybe<Scalars['JSON']>;
    /** Snippet url that is source of data */
    url?: Maybe<Scalars['String']>;
};
export declare type CreatePolarisStandardFieldInput = {
    fieldType: PolarisFieldType;
    ideaType: Scalars['ID'];
    name: Scalars['String'];
    presentation?: Maybe<PolarisPresentationInput>;
    project: Scalars['ID'];
};
/** #### Payload ##### */
export declare type CreatePolarisStandardFieldPayload = Payload & {
    __typename?: 'CreatePolarisStandardFieldPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisIdeaField>;
    success: Scalars['Boolean'];
};
export declare type CreatePolarisViewInput = {
    container: Scalars['ID'];
    /**  the type of viz to create */
    copyView?: Maybe<Scalars['ID']>;
    /**  view to copy configuration from */
    update?: Maybe<UpdatePolarisViewInput>;
    visualizationType?: Maybe<PolarisVisualizationType>;
};
export declare type CreatePolarisViewPayload = Payload & {
    __typename?: 'CreatePolarisViewPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisView>;
    success: Scalars['Boolean'];
};
export declare type CreatePolarisViewSetInput = {
    container: Scalars['ID'];
    name: Scalars['String'];
};
export declare type CreatePolarisViewSetPayload = Payload & {
    __typename?: 'CreatePolarisViewSetPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisViewSet>;
    success: Scalars['Boolean'];
};
/** Create sprint */
export declare type CreateSprintInput = {
    boardId: Scalars['ID'];
};
export declare type CreateSprintResponse = MutationResponse & {
    __typename?: 'CreateSprintResponse';
    message: Scalars['String'];
    sprint?: Maybe<CreatedSprint>;
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
/** Response from creating an webtrigger url */
export declare type CreateWebTriggerUrlResponse = MutationResponse & {
    __typename?: 'CreateWebTriggerUrlResponse';
    /** Id of the webtrigger. Populated only if success is true. */
    id?: Maybe<Scalars['ID']>;
    message: Scalars['String'];
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
    /** Url of the webtrigger. Populated only if success is true. */
    url?: Maybe<Scalars['URL']>;
};
export declare type CreatedSprint = {
    __typename?: 'CreatedSprint';
    /** Can this sprint be update by the current user */
    canUpdateSprint?: Maybe<Scalars['Boolean']>;
    /** The number of days remaining */
    daysRemaining?: Maybe<Scalars['Int']>;
    /** The end date of the sprint, in ISO 8601 format */
    endDate?: Maybe<Scalars['DateTime']>;
    /** The ID of the sprint */
    id: Scalars['ID'];
    /** The sprint's name */
    name?: Maybe<Scalars['String']>;
    /** The state of the sprint, can be one of the following (FUTURE, ACTIVE, CLOSED) */
    sprintState?: Maybe<SprintState>;
    /** The start date of the sprint, in ISO 8601 format */
    startDate?: Maybe<Scalars['DateTime']>;
};
/** Node for querying the Cumulative Flow Diagram report */
export declare type CumulativeFlowDiagram = {
    __typename?: 'CumulativeFlowDiagram';
    chart: CfdChartConnection;
    filters: CfdFilters;
};
/** Node for querying the Cumulative Flow Diagram report */
export declare type CumulativeFlowDiagramChartArgs = {
    cursor?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type CurrentEstimation = {
    __typename?: 'CurrentEstimation';
    /** Custom field configured as the estimation type. Null when estimation feature is disabled. */
    customFieldId?: Maybe<Scalars['String']>;
    /** Name of the custom field. */
    name?: Maybe<Scalars['String']>;
};
/** Information about the current user. Different users will see different results. */
export declare type CurrentUser = {
    __typename?: 'CurrentUser';
    /** List of permissions the *user making the request* has for this board. */
    permissions: Array<Maybe<Scalars['SoftwareBoardPermission']>>;
};
export declare type CustomFilter = {
    __typename?: 'CustomFilter';
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    jql: Scalars['String'];
    name: Scalars['String'];
};
export declare type CustomFilterCreateOutput = MutationResponse & {
    __typename?: 'CustomFilterCreateOutput';
    customFilter?: Maybe<CustomFilter>;
    message: Scalars['String'];
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
    validationErrors: Array<CustomFiltersValidationError>;
};
export declare type CustomFiltersValidationError = {
    __typename?: 'CustomFiltersValidationError';
    errorMessage: Scalars['String'];
    fieldName: Scalars['String'];
};
export declare type CustomUiTunnelDefinition = {
    __typename?: 'CustomUITunnelDefinition';
    resourceKey?: Maybe<Scalars['String']>;
    tunnelUrl?: Maybe<Scalars['URL']>;
};
export declare type CustomUiTunnelDefinitionInput = {
    resourceKey?: Maybe<Scalars['String']>;
    tunnelUrl?: Maybe<Scalars['URL']>;
};
/**
 * This represents a real person that has an free account within the Jira Service Desk product
 *
 * See the documentation on the `User` and `LocalizationContext` for more details
 */
export declare type CustomerUser = LocalizationContext & User & {
    __typename?: 'CustomerUser';
    accountId: Scalars['ID'];
    accountStatus: AccountStatus;
    email?: Maybe<Scalars['String']>;
    locale?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    picture: Scalars['URL'];
    zoneinfo?: Maybe<Scalars['String']>;
};
/** Time ranges of invocation date. */
export declare type DateSearchInput = {
    /**
     * The start time of the earliest invocation to include in the results.
     * If null, search results will only be limited by retention limits.
     *
     * RFC-3339 formatted timestamp.
     */
    earliestStart?: Maybe<Scalars['String']>;
    /**
     * The start time of the latest invocation to include in the results.
     * If null, will include most recent invocations.
     *
     * RFC-3339 formatted timestamp.
     */
    latestStart?: Maybe<Scalars['String']>;
};
export declare type DeleteAppEnvironmentVariableInput = {
    environment: AppEnvironmentInput;
    /** The key of the environment variable to delete */
    key: Scalars['String'];
};
export declare type DeleteAppInput = {
    appId: Scalars['ID'];
};
/** Response from deleting an app */
export declare type DeleteAppResponse = Payload & {
    __typename?: 'DeleteAppResponse';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type DeleteAppStoredEntityMutationInput = {
    /** The ARI to store this entity within */
    contextAri: Scalars['ID'];
    /** Specify whether the encrypted value should be deleted */
    encrypted?: Maybe<Scalars['Boolean']>;
    /**
     * The identifier for the entity
     *
     * Keys must be between 1-100 characters long and must match the following pattern /^[a-zA-Z0-9:._\s-]+$/
     */
    key: Scalars['ID'];
};
/** Generic implementation of MutationResponse for responses that don't need any extra data */
export declare type DeleteAppStoredEntityPayload = Payload & {
    __typename?: 'DeleteAppStoredEntityPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type DeleteAppTunnelInput = {
    /** The app to setup a tunnel for */
    appId: Scalars['ID'];
    /** The environment key */
    environmentKey: Scalars['String'];
};
export declare type DeleteColumnInput = {
    boardId: Scalars['ID'];
    columnId: Scalars['ID'];
};
export declare type DeleteColumnOutput = MutationResponse & {
    __typename?: 'DeleteColumnOutput';
    columns?: Maybe<Array<Column>>;
    message: Scalars['String'];
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
/** Accepts input to delete an external alias. */
export declare type DeleteCompassComponentExternalAliasInput = {
    /** The ID of the component to which you add the external alias. */
    componentId: Scalars['ID'];
    /** The alias of the component identifier in external sources. */
    externalAlias: CompassExternalAliasInput;
};
/** The payload returned from deleting the external alias of a component. */
export declare type DeleteCompassComponentExternalAliasPayload = Payload & {
    __typename?: 'DeleteCompassComponentExternalAliasPayload';
    /**
     * The details of the component that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    componentDetails?: Maybe<CompassComponent>;
    /** Deleted Compass External Alias */
    deletedCompassExternalAlias?: Maybe<CompassExternalAlias>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** Accepts input for deleting an existing component. */
export declare type DeleteCompassComponentInput = {
    /** The ID of the component to be deleted. */
    id: Scalars['ID'];
};
/** Accepts input to delete a component link. */
export declare type DeleteCompassComponentLinkInput = {
    /** The ID for the component to delete a link. */
    componentId: Scalars['ID'];
    /** The component link to be deleted. */
    link: Scalars['ID'];
};
/** The payload retuned after deleting a component link. */
export declare type DeleteCompassComponentLinkPayload = Payload & {
    __typename?: 'DeleteCompassComponentLinkPayload';
    /**
     * The details of the component that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    componentDetails?: Maybe<CompassComponent>;
    /** The ID of the deleted component link. */
    deletedCompassLinkId?: Maybe<Scalars['ID']>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** The payload returned from deleting an existing component. */
export declare type DeleteCompassComponentPayload = Payload & {
    __typename?: 'DeleteCompassComponentPayload';
    /** The ID of the component that was deleted. */
    deletedComponentId?: Maybe<Scalars['ID']>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** Accepts input for deleting an existing relationship between two components. */
export declare type DeleteCompassRelationshipInput = {
    /** The unique identifier (ID) of the component at the ending node. */
    endNodeId: Scalars['ID'];
    /** The unique identifier (ID) of the component at the starting node. */
    startNodeId: Scalars['ID'];
    /** The type of the relationship. */
    type: CompassRelationshipType;
};
/** The payload returned from deleting an existing component. */
export declare type DeleteCompassRelationshipPayload = Payload & {
    __typename?: 'DeleteCompassRelationshipPayload';
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
export declare type DeleteCompassScorecardCriteriaInput = {
    /** ID of the scorecard criterion for deletion. The criteria is already applied to a scorecard. */
    id: Scalars['ID'];
};
export declare type DeleteCompassScorecardCriteriasInput = {
    criterias: Array<DeleteCompassScorecardCriteriaInput>;
};
/** The payload returned from deleting a scorecard criterion. */
export declare type DeleteCompassScorecardCriteriasPayload = Payload & {
    __typename?: 'DeleteCompassScorecardCriteriasPayload';
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /**
     * The scorecard that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:scorecard:compass__
     */
    scorecard?: Maybe<CompassScorecard>;
    /** Whether the mutation was successful or not */
    success: Scalars['Boolean'];
};
/** The payload returned from deleting a scorecard criterion. */
export declare type DeleteCompassScorecardPayload = Payload & {
    __typename?: 'DeleteCompassScorecardPayload';
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** The scorecard that was mutated. */
    scorecardId: Scalars['ID'];
    /** Whether the mutation was successful or not */
    success: Scalars['Boolean'];
};
/** Accepts input for deleting a starred component. */
export declare type DeleteCompassStarredComponentInput = {
    /** The ID of the component to be un-starred. */
    id: Scalars['ID'];
};
/** Payload returned from deleting a starred component. */
export declare type DeleteCompassStarredComponentPayload = Payload & {
    __typename?: 'DeleteCompassStarredComponentPayload';
    /** A list of starred components. */
    components?: Maybe<CompassStarredComponentConnection>;
    /** A list of errors that occurred during mutation */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the relationship is deleted successfully */
    success: Scalars['Boolean'];
};
export declare type DeleteCustomFilterInput = {
    boardId: Scalars['ID'];
    customFilterId: Scalars['String'];
};
/** The request input for deleting relationship properties */
export declare type DeleteDevOpsContainerRelationshipEntityPropertiesInput = {
    /** The ARI of the any of the relationship entity */
    id: Scalars['ID'];
    /** The properties with the given keys in the list will be removed from the relationship */
    keys: Array<Scalars['String']>;
};
/** The response payload of deleting DevOps Service Entity Properties */
export declare type DeleteDevOpsContainerRelationshipEntityPropertiesPayload = Payload & {
    __typename?: 'DeleteDevOpsContainerRelationshipEntityPropertiesPayload';
    /** The errors occurred during relationship properties delete */
    errors?: Maybe<Array<MutationError>>;
    /** The result of whether relationship properties have been successfully deleted or not */
    success: Scalars['Boolean'];
};
/** The request input for deleting a relationship between a DevOps Service and a Jira Project */
export declare type DeleteDevOpsServiceAndJiraProjectRelationshipInput = {
    /** The DevOps Graph Service_And_Jira_Project relationship ARI */
    id: Scalars['ID'];
};
export declare type DeleteDevOpsServiceAndJiraProjectRelationshipPayload = Payload & {
    __typename?: 'DeleteDevOpsServiceAndJiraProjectRelationshipPayload';
    /** The list of errors occurred during delete relationship */
    errors?: Maybe<Array<MutationError>>;
    /** The result of whether the relationship is deleted successfully or not */
    success: Scalars['Boolean'];
};
/** The request input for deleting a relationship between a DevOps Service and an Opsgenie Team */
export declare type DeleteDevOpsServiceAndOpsgenieTeamRelationshipInput = {
    id: Scalars['ID'];
};
/** The response payload of deleting a relationship between a DevOps Service and an Opsgenie Team */
export declare type DeleteDevOpsServiceAndOpsgenieTeamRelationshipPayload = Payload & {
    __typename?: 'DeleteDevOpsServiceAndOpsgenieTeamRelationshipPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
/** The request input for deleting a relationship between a DevOps Service and a Repository */
export declare type DeleteDevOpsServiceAndRepositoryRelationshipInput = {
    /** The ARI of the relationship */
    id: Scalars['ID'];
};
export declare type DeleteDevOpsServiceAndRepositoryRelationshipPayload = Payload & {
    __typename?: 'DeleteDevOpsServiceAndRepositoryRelationshipPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
/** The request input for deleting DevOps Service Entity Properties */
export declare type DeleteDevOpsServiceEntityPropertiesInput = {
    /** The ARI of the DevOps Service */
    id: Scalars['ID'];
    /** The properties with the given keys in the list will be removed from the DevOps Service */
    keys: Array<Scalars['String']>;
};
/** The response payload of deleting DevOps Service Entity Properties */
export declare type DeleteDevOpsServiceEntityPropertiesPayload = Payload & {
    __typename?: 'DeleteDevOpsServiceEntityPropertiesPayload';
    /** The errors occurred during DevOps Service Entity Properties delete */
    errors?: Maybe<Array<MutationError>>;
    /** The result of whether DevOps Service Entity Properties have been successfully deleted or not */
    success: Scalars['Boolean'];
};
/** The request input for deleting a DevOps Service */
export declare type DeleteDevOpsServiceInput = {
    id: Scalars['ID'];
};
/** The response payload of deleting a DevOps Service */
export declare type DeleteDevOpsServicePayload = Payload & {
    __typename?: 'DeleteDevOpsServicePayload';
    /** The list of errors occurred during DevOps Service deletion */
    errors?: Maybe<Array<MutationError>>;
    /** The result of whether the DevOps Service is deleted successfully or not */
    success: Scalars['Boolean'];
};
/** The request input for deleting a DevOps Service Relationship */
export declare type DeleteDevOpsServiceRelationshipInput = {
    /** The ARI of the DevOps Service Relationship */
    id: Scalars['ID'];
};
export declare type DeleteDevOpsServiceRelationshipPayload = Payload & {
    __typename?: 'DeleteDevOpsServiceRelationshipPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type DeleteEventSourceInput = {
    /** The type of event to be deleted. */
    eventType: CompassEventType;
    /** The ID of the external event source. */
    externalEventSourceId: Scalars['ID'];
};
export declare type DeleteEventSourcePayload = Payload & {
    __typename?: 'DeleteEventSourcePayload';
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
export declare type DeleteJiraProjectAndOpsgenieTeamRelationshipInput = {
    id: Scalars['ID'];
};
export declare type DeleteJiraProjectAndOpsgenieTeamRelationshipPayload = Payload & {
    __typename?: 'DeleteJiraProjectAndOpsgenieTeamRelationshipPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
/** The request input for deleting a relationship between a Jira project and a repository */
export declare type DeleteJiraProjectAndRepositoryRelationshipInput = {
    /** The relationship ARI */
    id: Scalars['ID'];
};
export declare type DeleteJiraProjectAndRepositoryRelationshipPayload = Payload & {
    __typename?: 'DeleteJiraProjectAndRepositoryRelationshipPayload';
    /** The list of errors occurred during relationship deletion */
    errors?: Maybe<Array<MutationError>>;
    /** The result of whether the relationship is deleted successfully or not */
    success: Scalars['Boolean'];
};
export declare type DeletePolarisAnonymousVisitorHashPayload = Payload & {
    __typename?: 'DeletePolarisAnonymousVisitorHashPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type DeletePolarisDecorationInput = {
    backgroundColor?: Maybe<Scalars['Boolean']>;
    emoji?: Maybe<Scalars['Boolean']>;
    highlightContainer?: Maybe<Scalars['Boolean']>;
};
export declare type DeletePolarisDecorationPayload = Payload & {
    __typename?: 'DeletePolarisDecorationPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type DeletePolarisFieldOptionInput = {
    field: Scalars['ID'];
    ideaType: Scalars['ID'];
    option: Scalars['ID'];
    project: Scalars['ID'];
};
export declare type DeletePolarisFieldOptionPayload = Payload & {
    __typename?: 'DeletePolarisFieldOptionPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type DeletePolarisFieldPayload = Payload & {
    __typename?: 'DeletePolarisFieldPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type DeletePolarisInsightPayload = Payload & {
    __typename?: 'DeletePolarisInsightPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type DeletePolarisPlayContributionPayload = {
    __typename?: 'DeletePolarisPlayContributionPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type DeletePolarisViewPayload = Payload & {
    __typename?: 'DeletePolarisViewPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type DeletePolarisViewSetPayload = Payload & {
    __typename?: 'DeletePolarisViewSetPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
/** Delete sprint */
export declare type DeleteSprintInput = {
    boardId: Scalars['ID'];
    sprintId: Scalars['ID'];
};
export declare type DeleteUserGrantInput = {
    oauthClientId: Scalars['ID'];
};
export declare type DeleteUserGrantPayload = Payload & {
    __typename?: 'DeleteUserGrantPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
/** Response from creating an webtrigger url */
export declare type DeleteWebTriggerUrlResponse = MutationResponse & {
    __typename?: 'DeleteWebTriggerUrlResponse';
    message: Scalars['String'];
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
/**
 * This object models the Continuous Delivery (CD) Pipeline concept, an automated process (usually comprised of multiple stages)
 * for getting software from version control right through to the production environment.
 */
export declare type DeploymentPipeline = {
    __typename?: 'DeploymentPipeline';
    /** The name of the pipeline to present to the user. */
    displayName?: Maybe<Scalars['String']>;
    /** A URL users can use to link to this deployment pipeline. */
    url?: Maybe<Scalars['String']>;
};
/** The state that a code deployment can be in (think of a deployment in Bitbucket Pipelines, CircleCI, etc). */
export declare enum DeploymentState {
    Cancelled = "CANCELLED",
    Failed = "FAILED",
    InProgress = "IN_PROGRESS",
    Pending = "PENDING",
    RolledBack = "ROLLED_BACK",
    Successful = "SUCCESSFUL",
    Unknown = "UNKNOWN"
}
/**
 * This object models a deployment in the Continuous Delivery (CD) Pipeline concept, an automated process (usually comprised of
 * multiple stages) for getting software from version control right through to the production environment.
 *
 * TODO: Add `services` field when Service Registry has been integrated into AGG.
 */
export declare type DeploymentSummary = Node & {
    __typename?: 'DeploymentSummary';
    /**
     * This is the identifier for the deployment.
     *
     * It must be unique for the specified pipeline and environment. It must be a monotonically
     * increasing number, as this is used to sequence the deployments.
     */
    deploymentSequenceNumber?: Maybe<Scalars['Long']>;
    /** A short description of the deployment. */
    description?: Maybe<Scalars['String']>;
    /** The human-readable name for the deployment. Will be shown in the UI. */
    displayName?: Maybe<Scalars['String']>;
    /** The environment that the deployment is present in. */
    environment?: Maybe<DevOpsEnvironment>;
    id: Scalars['ID'];
    /**
     * IDs of the issues that are included in the deployment.
     *
     * At least one of the commits in the deployment must be associated with an issue for it
     * to appear here (meaning the issue key is mentioned in the commit message).
     */
    issueIds?: Maybe<Array<Scalars['ID']>>;
    /** The last-updated timestamp to present to the user as a summary of the state of the deployment. */
    lastUpdated?: Maybe<Scalars['DateTime']>;
    /**
     * This object models the Continuous Delivery (CD) Pipeline concept, an automated process
     * (usually comprised of multiple stages) for getting software from version control right through
     * to the production environment.
     */
    pipeline?: Maybe<DeploymentPipeline>;
    /**
     * This is the DevOps provider for the deployment.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: DevOpsProvider` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    provider?: Maybe<DevOpsProvider>;
    /** The state of the deployment. */
    state?: Maybe<DeploymentState>;
    /**
     * A number used to apply an order to the updates to the deployment, as identified by the
     * `deploymentSequenceNumber`, in the case of out-of-order receipt of update requests.
     *
     * It must be a monotonically increasing number. For example, epoch time could be one
     * way to generate the `updateSequenceNumber`.
     */
    updateSequenceNumber?: Maybe<Scalars['Long']>;
    /** A URL users can use to link to this deployment, in this environment. */
    url?: Maybe<Scalars['String']>;
};
/** Accepts input to detach a data manager from a component. */
export declare type DetachCompassComponentDataManagerInput = {
    /** The ID of the component to detach a data manager from. */
    componentId: Scalars['ID'];
};
/** The payload returned from detaching a data manager from a component. */
export declare type DetachCompassComponentDataManagerPayload = Payload & {
    __typename?: 'DetachCompassComponentDataManagerPayload';
    /**
     * The details of the component that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    componentDetails?: Maybe<CompassComponent>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
export declare type DetachEventSourceInput = {
    /** The ID of the component to detach the event source from. */
    componentId: Scalars['ID'];
    /** The ID of the event source. */
    eventSourceId: Scalars['ID'];
};
export declare type DetachEventSourcePayload = Payload & {
    __typename?: 'DetachEventSourcePayload';
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
export declare type DevOpsAvatar = {
    __typename?: 'DevOpsAvatar';
    /** The description of the avatar. */
    description?: Maybe<Scalars['String']>;
    /** The URL of the avatar. */
    url?: Maybe<Scalars['URL']>;
};
export declare type DevOpsContainerRelationshipEntityPropertyInput = {
    /**
     * Keys must:
     * * Contain only the characters a-z, A-Z, 0-9, _ and -.
     * * Be no greater than 80 characters long.
     * * Not begin with an underscore.
     */
    key: Scalars['String'];
    /**
     * * Can be no larger than 5KB for all properties for an entity.
     * * Can not be `null`.
     */
    value: Scalars['JSON'];
};
/**
 * An environment that a code change can be released to.
 *
 * The release may be via a code deployment or via a feature flag change.
 */
export declare type DevOpsEnvironment = {
    __typename?: 'DevOpsEnvironment';
    /** The type of the environment. */
    category?: Maybe<DevOpsEnvironmentCategory>;
    /** The name of the environment to present to the user. */
    displayName?: Maybe<Scalars['String']>;
};
/**
 * The types of environments that a code change can be released to.
 *
 * The release may be via a code deployment or via a feature flag change.
 */
export declare enum DevOpsEnvironmentCategory {
    Development = "DEVELOPMENT",
    Production = "PRODUCTION",
    Staging = "STAGING",
    Testing = "TESTING",
    Unmapped = "UNMAPPED"
}
export declare enum DevOpsJiraProjectType {
    JiraCore = "JIRA_CORE",
    JiraServicedesk = "JIRA_SERVICEDESK",
    JiraSoftware = "JIRA_SOFTWARE"
}
export declare type DevOpsMetrics = {
    __typename?: 'DevOpsMetrics';
    cycleTime?: Maybe<DevOpsMetricsCycleTime>;
    deploymentFrequency?: Maybe<DevOpsMetricsDeploymentFrequency>;
    deploymentSize?: Maybe<DevOpsMetricsDeploymentSize>;
    perDeploymentMetrics?: Maybe<DevOpsMetricsPerDeploymentMetricsConnection>;
    perIssueMetrics?: Maybe<DevOpsMetricsPerIssueMetricsConnection>;
};
export declare type DevOpsMetricsCycleTimeArgs = {
    cycleTimePercentiles?: Maybe<Array<Scalars['Int']>>;
    filter: DevOpsMetricsFilterInput;
    isIncludeCycleTimeMean?: Maybe<Scalars['Boolean']>;
};
export declare type DevOpsMetricsDeploymentFrequencyArgs = {
    environmentCategory?: DevOpsEnvironmentCategory;
    filter: DevOpsMetricsFilterInput;
    rollupType?: DevOpsMetricsRollupType;
};
export declare type DevOpsMetricsDeploymentSizeArgs = {
    environmentCategory?: DevOpsEnvironmentCategory;
    filter: DevOpsMetricsFilterInput;
    rollupType?: DevOpsMetricsRollupType;
};
export declare type DevOpsMetricsPerDeploymentMetricsArgs = {
    after?: Maybe<Scalars['String']>;
    filter: DevOpsMetricsPerDeploymentMetricsFilter;
    first: Scalars['Int'];
};
export declare type DevOpsMetricsPerIssueMetricsArgs = {
    after?: Maybe<Scalars['String']>;
    filter: DevOpsMetricsPerIssueMetricsFilter;
    first: Scalars['Int'];
};
export declare type DevOpsMetricsCycleTime = {
    __typename?: 'DevOpsMetricsCycleTime';
    /** List of cycle time metrics for each requested roll up metric type. */
    cycleTimeMetrics?: Maybe<Array<Maybe<DevOpsMetricsCycleTimeMetrics>>>;
    /** Indicates whether user requesting metrics has permission to all contributing issues. */
    hasPermissionForAllContributingIssues?: Maybe<Scalars['Boolean']>;
    /** The development phase which the cycle time is calculated for. */
    phase?: Maybe<DevOpsMetricsCycleTimePhase>;
    /**
     * The size of time interval in which data points are rolled up in.
     * E.g. Count of data over 2 weeks with 1 day resolution means rollup is number of datapoints per day over 2 weeks.
     */
    resolution?: Maybe<DevOpsMetricsResolution>;
};
export declare type DevOpsMetricsCycleTimeData = {
    __typename?: 'DevOpsMetricsCycleTimeData';
    /** Rolled up cycle time data (in seconds) between ('dateTime') and ('dateTime' + 'resolution'). Roll up method specified by 'metric'. */
    cycleTimeSeconds?: Maybe<Scalars['Long']>;
    /** dataTime of data point. Each data point is separated by size of time resolution specified. */
    dateTime?: Maybe<Scalars['DateTime']>;
    /** Number of issues shipped between ('dateTime') and ('dateTime' + 'resolution'). */
    issuesShippedCount?: Maybe<Scalars['Int']>;
};
export declare type DevOpsMetricsCycleTimeMean = DevOpsMetricsCycleTimeMetrics & {
    __typename?: 'DevOpsMetricsCycleTimeMean';
    /** Mean of data points in 'data' array. Rounded to the nearest second. */
    aggregateData?: Maybe<Scalars['Long']>;
    data?: Maybe<Array<Maybe<DevOpsMetricsCycleTimeData>>>;
};
export declare type DevOpsMetricsCycleTimeMetrics = {
    /** Data aggregated according to the rollup type specified. Rounded to the nearest second. */
    aggregateData?: Maybe<Scalars['Long']>;
    /** The cycle time data points, computed using roll up of the type specified in 'metric'. Rolled up by specified resolution. */
    data?: Maybe<Array<Maybe<DevOpsMetricsCycleTimeData>>>;
};
export declare type DevOpsMetricsCycleTimePercentile = DevOpsMetricsCycleTimeMetrics & {
    __typename?: 'DevOpsMetricsCycleTimePercentile';
    /**
     * The percentile value across all cycle-times in the database between dateTimeFrom and dateTimeTo
     * (not across the datapoints in 'data' array). Rounded to the nearest second.
     */
    aggregateData?: Maybe<Scalars['Long']>;
    data?: Maybe<Array<Maybe<DevOpsMetricsCycleTimeData>>>;
    /** Percentile metric of returned values. Will be between 0 and 100. */
    percentile?: Maybe<Scalars['Int']>;
};
export declare enum DevOpsMetricsCycleTimePhase {
    /** Development phase from initial code commit to deployed code. */
    CommitToDeployment = "COMMIT_TO_DEPLOYMENT",
    /** Development phase from initial code commit to opened pull request. */
    CommitToPr = "COMMIT_TO_PR"
}
export declare type DevOpsMetricsDeploymentFrequency = {
    __typename?: 'DevOpsMetricsDeploymentFrequency';
    /**
     * Deployment frequency aggregated according to the time resolution and rollup type specified.
     *
     * E.g. if the resolution were one week and the rollup type median, this value would be the median weekly
     * deployment count.
     */
    aggregateData?: Maybe<Scalars['Float']>;
    /** The deployment frequency data points rolled up by specified resolution. */
    data?: Maybe<Array<Maybe<DevOpsMetricsDeploymentFrequencyData>>>;
    /** Deployment environment type. */
    environmentType?: Maybe<DevOpsEnvironmentCategory>;
    /**
     * The size of time interval in which data points are rolled up in.
     * E.g. Count of data over 2 weeks with 1 day resolution means rollup is number of datapoints per day over 2 weeks.
     */
    resolution?: Maybe<DevOpsMetricsResolution>;
    /** Deployment state. Currently will only return for SUCCESSFUL, no State filter/input supported yet. */
    state?: Maybe<DeploymentState>;
};
/** #### Response ##### */
export declare type DevOpsMetricsDeploymentFrequencyData = {
    __typename?: 'DevOpsMetricsDeploymentFrequencyData';
    /** Number of deployments between ('dateTime') and ('dateTime' + 'resolution') */
    count?: Maybe<Scalars['Int']>;
    /** dataTime of data point. Each data point is separated by size of time resolution specified. */
    dateTime?: Maybe<Scalars['DateTime']>;
};
export declare type DevOpsMetricsDeploymentMetrics = {
    __typename?: 'DevOpsMetricsDeploymentMetrics';
    deployment?: Maybe<DeploymentSummary>;
    /**
     * Currently the only size metric supported is "number of issues per deployment".
     *
     * Note: The issues per deployment count will ignore Jira permissions, meaning the user may not have permission to view all of the issues.
     * The list of `issueIds` contained in the `DeploymentSummary` will however respect Jira permissions.
     */
    deploymentSize?: Maybe<Scalars['Long']>;
};
export declare type DevOpsMetricsDeploymentMetricsEdge = {
    __typename?: 'DevOpsMetricsDeploymentMetricsEdge';
    cursor: Scalars['String'];
    node?: Maybe<DevOpsMetricsDeploymentMetrics>;
};
export declare type DevOpsMetricsDeploymentSize = {
    __typename?: 'DevOpsMetricsDeploymentSize';
    /**
     * Deployment size aggregated according to the rollup type specified.
     *
     * E.g. if the rollup type were median, this will be the median number of issues per deployment
     * over the whole time period.
     */
    aggregateData?: Maybe<Scalars['Float']>;
    /** The deployment size data points rolled up by specified resolution. */
    data?: Maybe<Array<Maybe<DevOpsMetricsDeploymentSizeData>>>;
};
export declare type DevOpsMetricsDeploymentSizeData = {
    __typename?: 'DevOpsMetricsDeploymentSizeData';
    /** dataTime of data point. Each data point is separated by size of time resolution specified. */
    dateTime?: Maybe<Scalars['DateTime']>;
    /** Aggregated number of issues per deployment between ('dateTime') and ('dateTime' + 'resolution') */
    deploymentSize?: Maybe<Scalars['Float']>;
};
/** No results will be returned unless an association type is specified. Currently only 'jiraProjectIds' association type is supported. */
export declare type DevOpsMetricsFilterInput = {
    /** The identifier that indicates which cloud instance this data is to be fetched for. */
    cloudId: Scalars['ID'];
    /** The end dateTime for overall time interval to return results for. The interval is exclusive of this value. */
    endAtExclusive: Scalars['DateTime'];
    /** Issue level filters. Currently, in order to apply this filter, jiraProjectIds must also be provided */
    issueFilters?: Maybe<DevOpsMetricsIssueFilters>;
    /** List of Jira projectIds in the given 'cloudId' to fetch metrics for. Max limit of 10. */
    jiraProjectIds?: Maybe<Array<Scalars['ID']>>;
    /**
     * The size of time interval in which to rollup data points in. Default is 1 day.
     * E.g. Count of data over 2 weeks with 1 day resolution means rollup is number of datapoints per day over 2 weeks.
     */
    resolution?: Maybe<DevOpsMetricsResolutionInput>;
    /** The start dateTime for overall time interval to return results for. The interval is inclusive of this value. */
    startFromInclusive: Scalars['DateTime'];
    /**
     * The Olson Timezone ID. E.g. 'Australia/Sydney'.
     * Specifies which timezone to aggregate data in so that daylight savings is taken into account if it occurred between request time range.
     */
    timezoneId?: Maybe<Scalars['String']>;
};
export declare type DevOpsMetricsIssueFilters = {
    /**
     * Only issues in these epics will be returned.
     *
     * Note:
     * * If a null ID is included in the list, issues not in epics will be included in the results.
     * * If a subtask's parent issue is in one of the epics, the subtask will also be returned.
     */
    epicIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
    /** Only issues of these types will be returned. */
    issueTypeIds?: Maybe<Array<Scalars['ID']>>;
};
export declare type DevOpsMetricsIssueMetrics = {
    __typename?: 'DevOpsMetricsIssueMetrics';
    commitsCount?: Maybe<Scalars['Int']>;
    /**  Issue ARI  */
    id: Scalars['ID'];
    /**  DateTime of the most recent successful deployment to production. */
    lastSuccessfulProductionDeployment?: Maybe<Scalars['DateTime']>;
    /**  Average of review times of all pull requests associated with the issueId. */
    meanReviewTimeSeconds?: Maybe<Scalars['Long']>;
    pullRequestsCount?: Maybe<Scalars['Int']>;
    /**  Development time from initial code commit to deployed code in production environment. */
    totalCycleTimeSeconds?: Maybe<Scalars['Long']>;
};
export declare type DevOpsMetricsIssueMetricsEdge = {
    __typename?: 'DevOpsMetricsIssueMetricsEdge';
    cursor: Scalars['String'];
    node?: Maybe<DevOpsMetricsIssueMetrics>;
};
export declare type DevOpsMetricsPerDeploymentMetricsConnection = {
    __typename?: 'DevOpsMetricsPerDeploymentMetricsConnection';
    edges?: Maybe<Array<Maybe<DevOpsMetricsDeploymentMetricsEdge>>>;
    nodes?: Maybe<Array<Maybe<DevOpsMetricsDeploymentMetrics>>>;
    pageInfo: PageInfo;
};
/** No results will be returned unless an association type is specified. Currently only 'jiraProjectIds' association type is supported. */
export declare type DevOpsMetricsPerDeploymentMetricsFilter = {
    /** The identifier that indicates which cloud instance this data is to be fetched for. */
    cloudId: Scalars['ID'];
    /** The end dateTime for overall time interval to return results for. The interval is exclusive of this value. */
    endAtExclusive: Scalars['DateTime'];
    /** List of environment categories to filter for - only deployments in these categories will be returned. */
    environmentCategories?: Array<DevOpsEnvironmentCategory>;
    /** List of Jira projectIds in the given 'cloudId' to fetch metrics for. Max limit of 10. */
    jiraProjectIds?: Maybe<Array<Scalars['ID']>>;
    /** The start dateTime for overall time interval to return results for. The interval is inclusive of this value. */
    startFromInclusive: Scalars['DateTime'];
};
export declare type DevOpsMetricsPerIssueMetricsConnection = {
    __typename?: 'DevOpsMetricsPerIssueMetricsConnection';
    edges?: Maybe<Array<Maybe<DevOpsMetricsIssueMetricsEdge>>>;
    nodes?: Maybe<Array<Maybe<DevOpsMetricsIssueMetrics>>>;
    pageInfo: PageInfo;
};
/** No results will be returned unless an association type is specified. Currently only 'jiraProjectIds' association type is supported. */
export declare type DevOpsMetricsPerIssueMetricsFilter = {
    /** The identifier that indicates which cloud instance this data is to be fetched for. */
    cloudId: Scalars['ID'];
    /** The end dateTime for overall time interval to return results for. The interval is exclusive of this value. */
    endAtExclusive: Scalars['DateTime'];
    /** Issue level filters. Currently, in order to apply this filter, jiraProjectIds must also be provided */
    issueFilters?: Maybe<DevOpsMetricsIssueFilters>;
    /** List of Jira projectIds in the given 'cloudId' to fetch metrics for. Max limit of 10. */
    jiraProjectIds?: Maybe<Array<Scalars['ID']>>;
    /** The start dateTime for overall time interval to return results for. The interval is inclusive of this value. */
    startFromInclusive: Scalars['DateTime'];
};
export declare type DevOpsMetricsResolution = {
    __typename?: 'DevOpsMetricsResolution';
    /** Unit for specified resolution value. */
    unit?: Maybe<DevOpsMetricsResolutionUnit>;
    /** Value for resolution specified. */
    value?: Maybe<Scalars['Int']>;
};
export declare type DevOpsMetricsResolutionInput = {
    /** Input unit for specified resolution value. */
    unit: DevOpsMetricsResolutionUnit;
    /** Input value for resolution specified. */
    value: Scalars['Int'];
};
/** Unit for specified resolution value. */
export declare enum DevOpsMetricsResolutionUnit {
    Day = "DAY",
    Hour = "HOUR",
    Week = "WEEK"
}
export declare enum DevOpsMetricsRollupOption {
    Mean = "MEAN",
    Percentile = "PERCENTILE"
}
export declare type DevOpsMetricsRollupType = {
    /** Must only be specified if the rollup kind is PERCENTILE */
    percentile?: Maybe<Scalars['Int']>;
    type: DevOpsMetricsRollupOption;
};
/** A provider that a deployment has been done with. */
export declare type DevOpsProvider = {
    __typename?: 'DevOpsProvider';
    /** Links associated with the DevOpsProvider. Currently contains documentation, home and listDeploymentsTemplate URLs. */
    links?: Maybe<DevOpsProviderLinks>;
    /**
     * The logo to display for the Provider within the UI. This should be a 32x32 (or similar) favicon style image.
     * In the future this may be extended to support multi-resolution logos.
     */
    logo?: Maybe<Scalars['URL']>;
    /**
     * The display name to use for the Provider. May be rendered in the UI. Example: 'Github'.
     * In the future this may be extended to support an I18nString for localized names.
     */
    name?: Maybe<Scalars['String']>;
};
/** A type to group various URLs of Provider */
export declare type DevOpsProviderLinks = {
    __typename?: 'DevOpsProviderLinks';
    /** Documentation URL of the provider */
    documentation?: Maybe<Scalars['URL']>;
    /** Home URL of the provider */
    home?: Maybe<Scalars['URL']>;
    /** List deployments URL for the provider */
    listDeploymentsTemplate?: Maybe<Scalars['URL']>;
};
export declare enum DevOpsRelationshipCertainty {
    /** The relationship was created by a user. */
    Explicit = "EXPLICIT",
    /** The relationship was inferred by a system. */
    Implicit = "IMPLICIT"
}
export declare enum DevOpsRelationshipCertaintyFilter {
    /** Return all relationships. */
    All = "ALL",
    /** Return only relationships created by a user. */
    Explicit = "EXPLICIT",
    /** Return only relationships inferred by a system. */
    Implicit = "IMPLICIT"
}
export declare enum DevOpsRepositoryHostingProviderFilter {
    All = "ALL",
    BitbucketCloud = "BITBUCKET_CLOUD",
    ThirdParty = "THIRD_PARTY"
}
export declare type DevOpsService = Node & {
    __typename?: 'DevOpsService';
    /**
     * Bitbucket repositories that are available to be linked with via createDevOpsServiceAndRepositoryRelationship
     * If nameFilter is provided, only repositories with names containing this case-insensitive string will be returned.
     * For case of creating a new service (that has not been created), consumer can use `bitbucketRepositoriesAvailableToLinkWithNewDevOpsService` query
     */
    bitbucketRepositoriesAvailableToLinkWith?: Maybe<BitbucketRepositoryIdConnection>;
    /** The cloud ID of the DevOps Service */
    cloudId: Scalars['String'];
    /** Relationship with a DevOps Service that contains this DevOps service */
    containedByDevOpsServiceRelationship?: Maybe<DevOpsServiceRelationship>;
    /** Relationships with DevOps Services that this DevOps Service contains */
    containsDevOpsServiceRelationships?: Maybe<DevOpsServiceRelationshipConnection>;
    /** The datetime when the DevOps Service was created */
    createdAt: Scalars['DateTime'];
    /** The user who created the DevOps Service */
    createdBy: Scalars['String'];
    /** Relationships with DevOps Services that are depend on this DevOps Service */
    dependedOnByDevOpsServiceRelationships?: Maybe<DevOpsServiceRelationshipConnection>;
    /** Relationships with DevOps Services that this DevOps Service depends on */
    dependsOnDevOpsServiceRelationships?: Maybe<DevOpsServiceRelationshipConnection>;
    /** The description of the DevOps Service */
    description?: Maybe<Scalars['String']>;
    /** The DevOps Service ARI */
    id: Scalars['ID'];
    /** Relationships with Jira projects associated to this DevOps Service. */
    jiraProjects?: Maybe<DevOpsServiceAndJiraProjectRelationshipConnection>;
    /** The most recent datetime when the DevOps Service was updated */
    lastUpdatedAt?: Maybe<Scalars['DateTime']>;
    /** The last user who updated the DevOps Service */
    lastUpdatedBy?: Maybe<Scalars['String']>;
    /** The name of the DevOps Service */
    name: Scalars['String'];
    /** The relationship between this Service and an Opsgenie team */
    opsgenieTeamRelationship?: Maybe<DevOpsServiceAndOpsgenieTeamRelationship>;
    /** Opsgenie teams that are available to be linked with via createDevOpsServiceAndOpsgenieTeamRelationship */
    opsgenieTeamsAvailableToLinkWith?: Maybe<OpsgenieTeamConnection>;
    /** The organisation ID of the DevOps Service */
    organizationId: Scalars['String'];
    /** Look up JSON properties of the DevOps Service by keys */
    properties?: Maybe<Scalars['JSON']>;
    /** Relationships with VCS repositories associated to this DevOps Service */
    repositoryRelationships?: Maybe<DevOpsServiceAndRepositoryRelationshipConnection>;
    /**
     * The revision that must be provided when updating a DevOps Service to prevent
     * simultaneous updates from overwriting each other
     */
    revision: Scalars['ID'];
    /** Tier assigned to the DevOps Service */
    serviceTier?: Maybe<DevOpsServiceTier>;
    /** Services that are available to be linked with via createDevOpsServiceRelationship */
    servicesAvailableToLinkWith?: Maybe<DevOpsServiceConnection>;
};
export declare type DevOpsServiceBitbucketRepositoriesAvailableToLinkWithArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    nameFilter?: Maybe<Scalars['String']>;
};
export declare type DevOpsServiceContainsDevOpsServiceRelationshipsArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type DevOpsServiceDependedOnByDevOpsServiceRelationshipsArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type DevOpsServiceDependsOnDevOpsServiceRelationshipsArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type DevOpsServiceJiraProjectsArgs = {
    after?: Maybe<Scalars['String']>;
    filter?: Maybe<DevOpsServiceAndJiraProjectRelationshipFilter>;
    first?: Maybe<Scalars['Int']>;
};
export declare type DevOpsServiceOpsgenieTeamsAvailableToLinkWithArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type DevOpsServicePropertiesArgs = {
    keys: Array<Scalars['String']>;
};
export declare type DevOpsServiceRepositoryRelationshipsArgs = {
    after?: Maybe<Scalars['String']>;
    filter?: Maybe<DevOpsServiceAndRepositoryRelationshipFilter>;
    first?: Maybe<Scalars['Int']>;
    sort?: Maybe<DevOpsServiceAndRepositoryRelationshipSort>;
};
export declare type DevOpsServiceServicesAvailableToLinkWithArgs = {
    after?: Maybe<Scalars['String']>;
    filter?: Maybe<DevOpsServicesFilterInput>;
    first?: Maybe<Scalars['Int']>;
};
/** A relationship between DevOps Service and Jira Project Team */
export declare type DevOpsServiceAndJiraProjectRelationship = Node & {
    __typename?: 'DevOpsServiceAndJiraProjectRelationship';
    /** When the relationship was created. */
    createdAt: Scalars['DateTime'];
    /** Who created the relationship. */
    createdBy: Scalars['String'];
    /** An optional description of the relationship. */
    description?: Maybe<Scalars['String']>;
    /** The details of DevOps Service in the relationship. */
    devOpsService?: Maybe<DevOpsService>;
    /** The ARI of this relationship. */
    id: Scalars['ID'];
    /** The Jira project related to the repository. */
    jiraProject?: Maybe<JiraProject>;
    /** When the relationship was updated last.  Only present for relationships that have been updated. */
    lastUpdatedAt?: Maybe<Scalars['DateTime']>;
    /** Who updated the relationship last. Only present for relationships that have been updated. */
    lastUpdatedBy?: Maybe<Scalars['String']>;
    /** Look up JSON properties of the relationship by keys. */
    properties?: Maybe<Scalars['JSON']>;
    /** The type of the relationship. */
    relationshipType: DevOpsServiceAndJiraProjectRelationshipType;
    /**
     * The revision must be provided when updating a relationship to prevent
     * simultaneous updates from overwriting each other.
     */
    revision: Scalars['ID'];
};
/** A relationship between DevOps Service and Jira Project Team */
export declare type DevOpsServiceAndJiraProjectRelationshipPropertiesArgs = {
    keys: Array<Scalars['String']>;
};
export declare type DevOpsServiceAndJiraProjectRelationshipConnection = {
    __typename?: 'DevOpsServiceAndJiraProjectRelationshipConnection';
    edges?: Maybe<Array<Maybe<DevOpsServiceAndJiraProjectRelationshipEdge>>>;
    nodes?: Maybe<Array<Maybe<DevOpsServiceAndJiraProjectRelationship>>>;
    pageInfo: PageInfo;
};
export declare type DevOpsServiceAndJiraProjectRelationshipEdge = {
    __typename?: 'DevOpsServiceAndJiraProjectRelationshipEdge';
    cursor: Scalars['String'];
    node?: Maybe<DevOpsServiceAndJiraProjectRelationship>;
};
export declare type DevOpsServiceAndJiraProjectRelationshipFilter = {
    /** Include only relationships with the specified certainty */
    certainty?: Maybe<DevOpsRelationshipCertaintyFilter>;
    /** Include only relationships with the specified relationship type */
    relationshipTypeIn?: Maybe<Array<DevOpsServiceAndJiraProjectRelationshipType>>;
};
export declare enum DevOpsServiceAndJiraProjectRelationshipType {
    /** A relationship created for the change management feature */
    ChangeManagement = "CHANGE_MANAGEMENT",
    /** A standard relationship */
    Default = "DEFAULT"
}
/** A relationship between DevOps Service and Opsgenie Team */
export declare type DevOpsServiceAndOpsgenieTeamRelationship = Node & {
    __typename?: 'DevOpsServiceAndOpsgenieTeamRelationship';
    /** The datetime when the relationship was created */
    createdAt: Scalars['DateTime'];
    /** The user who created the relationship */
    createdBy: Scalars['String'];
    /** An optional description of the relationship. */
    description?: Maybe<Scalars['String']>;
    /** The details of DevOps Service in the relationship. */
    devOpsService?: Maybe<DevOpsService>;
    /** The ARI of this relationship. */
    id: Scalars['ID'];
    /** The most recent datetime when the relationship was updated */
    lastUpdatedAt?: Maybe<Scalars['DateTime']>;
    /** The last user who updated the relationship */
    lastUpdatedBy?: Maybe<Scalars['String']>;
    /** The Opsgenie team details related to the service. */
    opsgenieTeam?: Maybe<OpsgenieTeam>;
    /**
     * The id (Opsgenie team ARI) of the Opsgenie team related to the service.
     *
     *
     * This field is **deprecated** and will be removed in the future
     * @deprecated use field opsgenieTeam to retrieve team details
     */
    opsgenieTeamId: Scalars['ID'];
    /** Look up JSON properties of the relationship by keys. */
    properties?: Maybe<Scalars['JSON']>;
    /**
     * The revision must be provided when updating a relationship to prevent
     * simultaneous updates from overwriting each other.
     */
    revision: Scalars['ID'];
};
/** A relationship between DevOps Service and Opsgenie Team */
export declare type DevOpsServiceAndOpsgenieTeamRelationshipPropertiesArgs = {
    keys: Array<Scalars['String']>;
};
export declare type DevOpsServiceAndOpsgenieTeamRelationshipConnection = {
    __typename?: 'DevOpsServiceAndOpsgenieTeamRelationshipConnection';
    edges?: Maybe<Array<Maybe<DevOpsServiceAndOpsgenieTeamRelationshipEdge>>>;
    nodes?: Maybe<Array<Maybe<DevOpsServiceAndOpsgenieTeamRelationship>>>;
    pageInfo: PageInfo;
};
export declare type DevOpsServiceAndOpsgenieTeamRelationshipEdge = {
    __typename?: 'DevOpsServiceAndOpsgenieTeamRelationshipEdge';
    cursor: Scalars['String'];
    node?: Maybe<DevOpsServiceAndOpsgenieTeamRelationship>;
};
/** A relationship between a DevOps Service and a Repository */
export declare type DevOpsServiceAndRepositoryRelationship = Node & {
    __typename?: 'DevOpsServiceAndRepositoryRelationship';
    /**
     * If the repository provider is Bitbucket, this will contain the Bitbucket repository details,
     * otherwise null.
     */
    bitbucketRepository?: Maybe<BitbucketRepository>;
    /** The time when the relationship was created */
    createdAt: Scalars['DateTime'];
    /** The user who created the relationship */
    createdBy: Scalars['String'];
    /** An optional description of the relationship. */
    description?: Maybe<Scalars['String']>;
    /** The details of DevOps Service in the relationship. */
    devOpsService?: Maybe<DevOpsService>;
    /** The ARI of this Relationship. */
    id: Scalars['ID'];
    /** The latest time when the relationship was updated */
    lastUpdatedAt?: Maybe<Scalars['DateTime']>;
    /** The latest user who updated the relationship */
    lastUpdatedBy?: Maybe<Scalars['String']>;
    /** Look up JSON properties of the relationship by keys. */
    properties?: Maybe<Scalars['JSON']>;
    /**
     * The revision must be provided when updating a relationship to prevent
     * multiple simultaneous updates from overwriting each other.
     */
    revision: Scalars['ID'];
    /** If the repository provider is a third party, this will contain the repository details, otherwise null. */
    thirdPartyRepository?: Maybe<DevOpsThirdPartyRepository>;
};
/** A relationship between a DevOps Service and a Repository */
export declare type DevOpsServiceAndRepositoryRelationshipPropertiesArgs = {
    keys: Array<Scalars['String']>;
};
export declare type DevOpsServiceAndRepositoryRelationshipConnection = {
    __typename?: 'DevOpsServiceAndRepositoryRelationshipConnection';
    edges?: Maybe<Array<Maybe<DevOpsServiceAndRepositoryRelationshipEdge>>>;
    nodes?: Maybe<Array<Maybe<DevOpsServiceAndRepositoryRelationship>>>;
    pageInfo: PageInfo;
};
export declare type DevOpsServiceAndRepositoryRelationshipEdge = {
    __typename?: 'DevOpsServiceAndRepositoryRelationshipEdge';
    cursor: Scalars['String'];
    node?: Maybe<DevOpsServiceAndRepositoryRelationship>;
};
export declare type DevOpsServiceAndRepositoryRelationshipFilter = {
    /** Include only relationships with the specified certainty */
    certainty?: Maybe<DevOpsRelationshipCertaintyFilter>;
    /** Include only relationships with the specified repository hosting provider type */
    hostingProvider?: Maybe<DevOpsRepositoryHostingProviderFilter>;
    /**
     * Include only relationships with all of the specified property keys.
     * If this is omitted, no filtering by 'all property keys' is applied.
     */
    withAllPropertyKeys?: Maybe<Array<Scalars['String']>>;
};
export declare type DevOpsServiceAndRepositoryRelationshipSort = {
    /** The field to apply sorting on */
    by: DevOpsServiceAndRepositoryRelationshipSortBy;
    /** The direction of sorting */
    order?: SortDirection;
};
export declare enum DevOpsServiceAndRepositoryRelationshipSortBy {
    LastInferredAt = "LAST_INFERRED_AT"
}
/** The connection object for a collection of Services. */
export declare type DevOpsServiceConnection = {
    __typename?: 'DevOpsServiceConnection';
    edges?: Maybe<Array<Maybe<DevOpsServiceEdge>>>;
    nodes?: Maybe<Array<Maybe<DevOpsService>>>;
    pageInfo: PageInfo;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type DevOpsServiceEdge = {
    __typename?: 'DevOpsServiceEdge';
    cursor: Scalars['String'];
    node?: Maybe<DevOpsService>;
};
/** The request input for DevOps Service Entity Property */
export declare type DevOpsServiceEntityPropertyInput = {
    /**
     * Keys must:
     * * Contain only the characters a-z, A-Z, 0-9, _ and -
     * * Be no greater than 80 characters long
     * * Not begin with an underscore
     */
    key: Scalars['String'];
    /**
     * * Can be no larger than 5KB for all properties for an entity
     * * Can not be `null`
     */
    value: Scalars['JSON'];
};
export declare type DevOpsServiceRelationship = Node & {
    __typename?: 'DevOpsServiceRelationship';
    /** The cloud ID of the DevOps Service Relationship */
    cloudId: Scalars['String'];
    /** The datetime when the DevOps Service Relationship was created */
    createdAt: Scalars['DateTime'];
    /** The user who created the DevOps Service Relationship */
    createdBy: Scalars['String'];
    /** The description of the DevOps Service Relationship */
    description?: Maybe<Scalars['String']>;
    /** The end service of the DevOps Service Relationship */
    endService?: Maybe<DevOpsService>;
    /** The DevOps Service Relationship ARI */
    id: Scalars['ID'];
    /** The most recent datetime when the DevOps Service Relationship was updated */
    lastUpdatedAt?: Maybe<Scalars['DateTime']>;
    /** The last user who updated the DevOps Service Relationship */
    lastUpdatedBy?: Maybe<Scalars['String']>;
    /** The organization ID of the DevOps Service Relationship */
    organizationId: Scalars['String'];
    /** Look up JSON properties of the DevOps Service by keys */
    properties?: Maybe<Scalars['JSON']>;
    /**
     * The revision that must be provided when updating a DevOps Service relationship to prevent
     * simultaneous updates from overwriting each other
     */
    revision: Scalars['ID'];
    /** The start service of the DevOps Service Relationship */
    startService?: Maybe<DevOpsService>;
    /** The inter-service relationship type of the DevOps Service Relationship */
    type: DevOpsServiceRelationshipType;
};
export declare type DevOpsServiceRelationshipPropertiesArgs = {
    keys: Array<Scalars['String']>;
};
/** The connection object for a collection of DevOps Service relationships. */
export declare type DevOpsServiceRelationshipConnection = {
    __typename?: 'DevOpsServiceRelationshipConnection';
    edges?: Maybe<Array<Maybe<DevOpsServiceRelationshipEdge>>>;
    nodes?: Maybe<Array<Maybe<DevOpsServiceRelationship>>>;
    pageInfo: PageInfo;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type DevOpsServiceRelationshipEdge = {
    __typename?: 'DevOpsServiceRelationshipEdge';
    cursor: Scalars['String'];
    node?: Maybe<DevOpsServiceRelationship>;
};
/** #################### Enums ##################### */
export declare enum DevOpsServiceRelationshipType {
    Contains = "CONTAINS",
    DependsOn = "DEPENDS_ON"
}
export declare type DevOpsServiceTier = {
    __typename?: 'DevOpsServiceTier';
    /** Description of the tier level and the standards that a DevOps Service at this tier should meet */
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    /** The level of the tier. Lower numbers are more important */
    level: Scalars['Int'];
    /** The name of the tier, if set by the user */
    name?: Maybe<Scalars['String']>;
    /** The translation key for the name. Only present when name is null */
    nameKey?: Maybe<Scalars['String']>;
};
export declare type DevOpsServiceTierInput = {
    level: Scalars['Int'];
};
/** The filtering input for retrieving services. tierLevelIn must not be empty if provided. */
export declare type DevOpsServicesFilterInput = {
    /** Case insensitive string to filter service names with */
    nameContains?: Maybe<Scalars['String']>;
    /** Integer numbers to filter service tier levels with */
    tierLevelIn?: Maybe<Array<Scalars['Int']>>;
};
/** #################### Supporting Types ##################### */
export declare type DevOpsThirdPartyRepository = {
    __typename?: 'DevOpsThirdPartyRepository';
    /** Avatar details for the third party repository. */
    avatar?: Maybe<DevOpsAvatar>;
    /** The ID of the third party repository. */
    id: Scalars['ID'];
    /** The name of the third party repository. */
    name?: Maybe<Scalars['String']>;
    /** The URL of the third party repository. */
    webUrl?: Maybe<Scalars['URL']>;
};
/** Dev status context */
export declare type DevStatus = {
    __typename?: 'DevStatus';
    activity: DevStatusActivity;
    count?: Maybe<Scalars['Int']>;
};
export declare enum DevStatusActivity {
    BranchOpen = "BRANCH_OPEN",
    Commit = "COMMIT",
    PrDeclined = "PR_DECLINED",
    PrMerged = "PR_MERGED",
    PrOpen = "PR_OPEN"
}
export declare type DeveloperLogAccessResult = {
    __typename?: 'DeveloperLogAccessResult';
    /** Site ARI */
    contextId: Scalars['ID'];
    /** Indicates whether developer has access to logs */
    developerHasAccess: Scalars['Boolean'];
};
export declare type DvcsBitbucketWorkspaceConnection = {
    __typename?: 'DvcsBitbucketWorkspaceConnection';
    edges?: Maybe<Array<Maybe<DvcsBitbucketWorkspaceEdge>>>;
    nodes?: Maybe<Array<Maybe<BitbucketWorkspace>>>;
    pageInfo: PageInfo;
};
export declare type DvcsBitbucketWorkspaceEdge = {
    __typename?: 'DvcsBitbucketWorkspaceEdge';
    cursor: Scalars['String'];
    /** The Bitbucket workspace. */
    node?: Maybe<BitbucketWorkspace>;
};
export declare type DvcsQuery = {
    __typename?: 'DvcsQuery';
    /**
     * Return the Bitbucket workspaces linked to this site.  User must
     * have access to Jira on this site.
     * *** This function will be deprecated in the near future. ***
     */
    bitbucketWorkspacesLinkedToSite?: Maybe<DvcsBitbucketWorkspaceConnection>;
};
export declare type DvcsQueryBitbucketWorkspacesLinkedToSiteArgs = {
    after?: Maybe<Scalars['String']>;
    cloudId: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
};
export declare type EcosystemMutation = {
    __typename?: 'EcosystemMutation';
    deleteUserGrant?: Maybe<DeleteUserGrantPayload>;
    /** Update an app environment and enrol to new scopes */
    updateAppHostServiceScopes?: Maybe<UpdateAppHostServiceScopesResponsePayload>;
};
export declare type EcosystemMutationDeleteUserGrantArgs = {
    input: DeleteUserGrantInput;
};
export declare type EcosystemMutationUpdateAppHostServiceScopesArgs = {
    input: UpdateAppHostServiceScopesInput;
};
export declare type EcosystemQuery = {
    __typename?: 'EcosystemQuery';
    userGrants?: Maybe<UserGrantConnection>;
};
export declare type EcosystemQueryUserGrantsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
/** Edit sprint */
export declare type EditSprintInput = {
    boardId: Scalars['ID'];
    endDate?: Maybe<Scalars['String']>;
    goal?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    sprintId: Scalars['ID'];
    startDate?: Maybe<Scalars['String']>;
};
/** View settings for epics on the roadmap */
export declare enum EpicView {
    /** All epics regardless of status */
    All = "ALL",
    /** Epics with status complete */
    Completed = "COMPLETED",
    /** Epics with status incomplete */
    Incomplete = "INCOMPLETE"
}
/**
 * WARNING: This ErrorDetails is shared with "xen_lifecycle_service". This should not be,
 * but it was on oversight.
 */
export declare type ErrorDetails = {
    __typename?: 'ErrorDetails';
    /** Specific code used to make difference between errors to handle them differently */
    code: Scalars['String'];
    /** Addition error data */
    fields?: Maybe<Scalars['JSON']>;
    /** Copy of top-level message */
    message: Scalars['String'];
};
/** Estimate object which contains an estimate for a card when it exists */
export declare type Estimate = {
    __typename?: 'Estimate';
    originalEstimate?: Maybe<OriginalEstimate>;
    storyPoints?: Maybe<Scalars['Float']>;
};
export declare type EstimationConfig = {
    __typename?: 'EstimationConfig';
    /** All available estimation types that can be used in the project. */
    available: Array<AvailableEstimations>;
    /** Currently configured estimation. */
    current: CurrentEstimation;
};
export declare enum EventKnownAvIs {
    AviBitbucketPrCreated = "AVI_BITBUCKET_PR_CREATED",
    AviJiraIssueCreated = "AVI_JIRA_ISSUE_CREATED",
    AviJiraIssueUpdated = "AVI_JIRA_ISSUE_UPDATED"
}
export declare enum EventMatchingStrategies {
    BitbucketByRepo = "BITBUCKET_BY_REPO",
    JiraByIssue = "JIRA_BY_ISSUE",
    /** This strategy will look ar Jira events and match on cloud id and project id */
    JiraByProject = "JIRA_BY_PROJECT"
}
/**  Compass Events */
export declare type EventSource = {
    __typename?: 'EventSource';
    /** The type of the event. */
    eventType: CompassEventType;
    /** The ID of the external event source. */
    externalEventSourceId: Scalars['ID'];
    /** The ID of the event source. */
    id: Scalars['ID'];
};
/** An arbitrary extension definition as defined by the Ecosystem */
export declare type Extension = {
    __typename?: 'Extension';
    appOwner?: Maybe<User>;
    appVersion?: Maybe<Scalars['String']>;
    consentUrl?: Maybe<Scalars['String']>;
    currentUserConsent?: Maybe<UserConsentExtension>;
    definitionId: Scalars['ID'];
    egress?: Maybe<Array<AppNetworkEgressPermissionExtension>>;
    environmentId: Scalars['ID'];
    environmentKey: Scalars['String'];
    environmentType: Scalars['String'];
    id: Scalars['ID'];
    installationId: Scalars['String'];
    key: Scalars['String'];
    license?: Maybe<AppInstallationLicense>;
    properties: Scalars['JSON'];
    requiresUserConsent?: Maybe<Scalars['Boolean']>;
    securityPolicies?: Maybe<Array<AppSecurityPoliciesPermissionExtension>>;
    type: Scalars['String'];
};
/** The context in which an extension exists */
export declare type ExtensionContext = {
    __typename?: 'ExtensionContext';
    appAuditLogs: AppAuditConnection;
    extensionsByType: Array<Extension>;
    id: Scalars['ID'];
    installations?: Maybe<AppInstallationConnection>;
};
/** The context in which an extension exists */
export declare type ExtensionContextAppAuditLogsArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
/** The context in which an extension exists */
export declare type ExtensionContextExtensionsByTypeArgs = {
    type: Scalars['String'];
};
/** The context in which an extension exists */
export declare type ExtensionContextInstallationsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    filter?: Maybe<AppInstallationsFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
/**
 * Details about an extension.
 *
 * This information is used to look up the extension within CaaS so that the
 * correct function can be resolved.
 *
 * This will eventually be superseded by an Id.
 */
export declare type ExtensionDetailsInput = {
    /** The definition identifier as provided by CaaS */
    definitionId: Scalars['ID'];
    /** The extension key as provided by CaaS */
    extensionKey: Scalars['String'];
};
export declare type ExternalAuthCredentialsInput = {
    /** The oAuth Client Id */
    clientId?: Maybe<Scalars['ID']>;
    /** The shared secret */
    clientSecret?: Maybe<Scalars['String']>;
};
export declare type ExternalAuthProvider = {
    __typename?: 'ExternalAuthProvider';
    displayName: Scalars['String'];
    key: Scalars['String'];
    url: Scalars['URL'];
};
export declare type FunctionDescription = {
    __typename?: 'FunctionDescription';
    key: Scalars['String'];
};
/** The data describing a function invocation. */
export declare type FunctionInvocationMetadata = {
    appVersion: Scalars['String'];
    /** Metadata about the function of the app that was called */
    function?: Maybe<FunctionDescription>;
    /** The invocation ID */
    id: Scalars['ID'];
    /** The context in which the app is installed */
    installationContext?: Maybe<AppInstallationContext>;
    /** Metadata about module type */
    moduleType?: Maybe<Scalars['String']>;
    /** Metadata about what caused the function to run */
    trigger?: Maybe<FunctionTrigger>;
};
export declare type FunctionTrigger = {
    __typename?: 'FunctionTrigger';
    key?: Maybe<Scalars['String']>;
    type?: Maybe<FunctionTriggerType>;
};
/** Which type of trigger */
export declare enum FunctionTriggerType {
    Frontend = "FRONTEND",
    Manual = "MANUAL",
    Product = "PRODUCT",
    Web = "WEB"
}
/** Concrete version of MutationErrorExtension that does not include any extra fields */
export declare type GenericMutationErrorExtension = MutationErrorExtension & {
    __typename?: 'GenericMutationErrorExtension';
    errorType?: Maybe<Scalars['String']>;
    statusCode?: Maybe<Scalars['Int']>;
};
/** Generic implementation of MutationResponse for responses that don't need any extra data */
export declare type GenericMutationResponse = Payload & {
    __typename?: 'GenericMutationResponse';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
/** Concrete version of QueryErrorExtension that does not include any extra fields */
export declare type GenericQueryErrorExtension = QueryErrorExtension & {
    __typename?: 'GenericQueryErrorExtension';
    errorType?: Maybe<Scalars['String']>;
    statusCode?: Maybe<Scalars['Int']>;
};
export declare enum GrantCheckProduct {
    Compass = "COMPASS",
    Confluence = "CONFLUENCE",
    Jira = "JIRA",
    JiraServicedesk = "JIRA_SERVICEDESK"
}
export declare type HostedResourcePreSignedUrl = {
    __typename?: 'HostedResourcePreSignedUrl';
    uploadFormData: Scalars['JSON'];
    uploadUrl: Scalars['String'];
};
export declare type Icon = {
    __typename?: 'Icon';
    url?: Maybe<Scalars['String']>;
};
export declare type InlineCardCreateConfig = {
    __typename?: 'InlineCardCreateConfig';
    /** Whether inline create is enabled */
    enabled: Scalars['Boolean'];
    /** Whether the global create should be used when creating */
    useGlobalCreate?: Maybe<Scalars['Boolean']>;
};
export declare type InlineColumnEditConfig = {
    __typename?: 'InlineColumnEditConfig';
    enabled: Scalars['Boolean'];
};
export declare type InstallationContextWithLogAccess = {
    __typename?: 'InstallationContextWithLogAccess';
    /** Installation context as an ARI */
    installationContext: Scalars['ID'];
    /** The tenant context for the cloud id. Only populated if context id is a valid cloud context. */
    tenantContext?: Maybe<TenantContext>;
};
/** The data returned from a function invocation */
export declare type InvocationResponsePayload = {
    __typename?: 'InvocationResponsePayload';
    /** The body of the function response */
    body: Scalars['JSON'];
};
/** Input payload for the invoke aux mutation */
export declare type InvokeAuxEffectsInput = {
    /**
     * The list of applicable context Ids
     * Context Ids are used within the ecosystem platform to identify product
     * controlled areas into which apps can be installed. Host products should
     * determine how this list of contexts is constructed.
     *
     * *Important:* this should start with the most specific context as the
     * most specific extension will be the selected extension.
     */
    contextIds: Array<Scalars['ID']>;
    /** An identifier for an alternative entry point function to invoke */
    entryPoint?: Maybe<Scalars['String']>;
    /**
     * Information needed to look up an extension
     *
     * Note: Either `extensionDetails` or `extensionId` must be provided
     */
    extensionDetails?: Maybe<ExtensionDetailsInput>;
    /**
     * An identifier for the extension to invoke
     *
     * Note: Either `extensionDetails` or `extensionId` must be provided
     */
    extensionId?: Maybe<Scalars['ID']>;
    /** The payload to invoke an AUX Effect */
    payload: AuxEffectsInvocationPayload;
};
/** The response from an AUX effects invocation */
export declare type InvokeAuxEffectsResponse = MutationResponse & Payload & {
    __typename?: 'InvokeAuxEffectsResponse';
    errorDetails?: Maybe<ErrorDetails>;
    errors?: Maybe<Array<MutationError>>;
    message: Scalars['String'];
    result?: Maybe<AuxEffectsResult>;
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
/** Input payload for the invoke mutation */
export declare type InvokeExtensionInput = {
    /**
     * The list of applicable context Ids
     * Context Ids are used within the ecosystem platform to identify product
     * controlled areas into which apps can be installed. Host products should
     * determine how this list of contexts is constructed.
     *
     * *Important:* this should start with the most specific context as the
     * most specific extension will be the selected extension.
     */
    contextIds: Array<Scalars['ID']>;
    /** An identifier for an alternative entry point function to invoke */
    entryPoint?: Maybe<Scalars['String']>;
    /**
     * Information needed to look up an extension
     *
     * Note: Either `extensionDetails` or `extensionId` must be provided
     */
    extensionDetails?: Maybe<ExtensionDetailsInput>;
    /**
     * An identifier for the extension to invoke
     *
     * Note: Either `extensionDetails` or `extensionId` must be provided
     */
    extensionId?: Maybe<Scalars['ID']>;
    /** The payload to send as part of the invocation */
    payload: Scalars['JSON'];
    /** An identifier for a schema to validate the response against */
    schema?: Maybe<Scalars['String']>;
};
export declare type InvokeExtensionPayloadErrorExtension = MutationErrorExtension & {
    __typename?: 'InvokeExtensionPayloadErrorExtension';
    errorType?: Maybe<Scalars['String']>;
    fields?: Maybe<InvokeExtensionPayloadErrorExtensionFields>;
    statusCode?: Maybe<Scalars['Int']>;
};
export declare type InvokeExtensionPayloadErrorExtensionFields = {
    __typename?: 'InvokeExtensionPayloadErrorExtensionFields';
    authInfoUrl?: Maybe<Scalars['String']>;
};
/** The response from a function invocation */
export declare type InvokeExtensionResponse = MutationResponse & Payload & {
    __typename?: 'InvokeExtensionResponse';
    errorDetails?: Maybe<ErrorDetails>;
    errors?: Maybe<Array<MutationError>>;
    /**
     * Details about the external auth for this service, if any exists.
     *
     * This is typically used for directing the user to a consent screen.
     */
    externalAuth?: Maybe<Array<Maybe<ExternalAuthProvider>>>;
    message: Scalars['String'];
    /** The invocation response */
    response?: Maybe<InvocationResponsePayload>;
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
export declare type InvokePolarisObjectInput = {
    /** Snippet action */
    action: Scalars['JSON'];
    /** Custom auth token that will be used in unfurl request and saved if request was successful */
    authToken?: Maybe<Scalars['String']>;
    /** Snippet data */
    data: Scalars['JSON'];
    /** Issue ARI */
    issue: Scalars['ID'];
    /** OauthClientId of CaaS app */
    oauthClientId: Scalars['String'];
    /** Project ARI */
    project: Scalars['ID'];
    /** Resource url that will be used to unfurl data */
    resourceUrl: Scalars['String'];
};
export declare type InvokePolarisObjectPayload = Payload & {
    __typename?: 'InvokePolarisObjectPayload';
    errors?: Maybe<Array<MutationError>>;
    response?: Maybe<ResolvedPolarisObject>;
    success: Scalars['Boolean'];
};
/** Detailed information of a repository's branch */
export declare type IssueDevOpsBranchDetails = {
    __typename?: 'IssueDevOpsBranchDetails';
    createPullRequestUrl?: Maybe<Scalars['String']>;
    createReviewUrl?: Maybe<Scalars['String']>;
    lastCommit?: Maybe<IssueDevOpsHeadCommit>;
    name: Scalars['String'];
    pullRequests?: Maybe<Array<IssueDevOpsBranchPullRequestStatesSummary>>;
    reviews?: Maybe<Array<IssueDevOpsReview>>;
    url?: Maybe<Scalars['String']>;
};
/** Short description of a pull request associated with a branch */
export declare type IssueDevOpsBranchPullRequestStatesSummary = {
    __typename?: 'IssueDevOpsBranchPullRequestStatesSummary';
    /** Time of the last update in ISO 8601 format */
    lastUpdate?: Maybe<Scalars['DateTime']>;
    name: Scalars['String'];
    status?: Maybe<IssueDevOpsPullRequestStatus>;
    url?: Maybe<Scalars['String']>;
};
/** Detailed information about a build tied to a provider */
export declare type IssueDevOpsBuildDetail = {
    __typename?: 'IssueDevOpsBuildDetail';
    buildNumber?: Maybe<Scalars['Int']>;
    description?: Maybe<Scalars['String']>;
    id: Scalars['String'];
    lastUpdated?: Maybe<Scalars['DateTime']>;
    name?: Maybe<Scalars['String']>;
    references?: Maybe<Array<IssueDevOpsBuildReference>>;
    state?: Maybe<Scalars['String']>;
    testSummary?: Maybe<IssueDevOpsTestSummary>;
    url?: Maybe<Scalars['String']>;
};
/** A build pipeline provider */
export declare type IssueDevOpsBuildProvider = {
    __typename?: 'IssueDevOpsBuildProvider';
    avatarUrl?: Maybe<Scalars['String']>;
    builds?: Maybe<Array<IssueDevOpsBuildDetail>>;
    description?: Maybe<Scalars['String']>;
    id: Scalars['String'];
    name?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
};
/** Information that links a build to a version control system (commits, branches, etc.) */
export declare type IssueDevOpsBuildReference = {
    __typename?: 'IssueDevOpsBuildReference';
    name: Scalars['String'];
    uri?: Maybe<Scalars['String']>;
};
export declare enum IssueDevOpsCommitChangeType {
    Added = "ADDED",
    Copied = "COPIED",
    Deleted = "DELETED",
    Modify = "MODIFY",
    Moved = "MOVED",
    Unknown = "UNKNOWN"
}
/** Detailed information of a commit in a repository */
export declare type IssueDevOpsCommitDetails = {
    __typename?: 'IssueDevOpsCommitDetails';
    author?: Maybe<IssueDevOpsPullRequestAuthor>;
    createReviewUrl?: Maybe<Scalars['String']>;
    displayId?: Maybe<Scalars['String']>;
    files?: Maybe<Array<IssueDevOpsCommitFile>>;
    id: Scalars['String'];
    isMerge?: Maybe<Scalars['Boolean']>;
    message?: Maybe<Scalars['String']>;
    reviews?: Maybe<Array<IssueDevOpsReview>>;
    /** Time of the commit update in ISO 8601 format */
    timestamp?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
};
/** Information of a file modified in a commit */
export declare type IssueDevOpsCommitFile = {
    __typename?: 'IssueDevOpsCommitFile';
    changeType?: Maybe<IssueDevOpsCommitChangeType>;
    linesAdded?: Maybe<Scalars['Int']>;
    linesRemoved?: Maybe<Scalars['Int']>;
    path: Scalars['String'];
    url?: Maybe<Scalars['String']>;
};
/** Detailed information of a deployment */
export declare type IssueDevOpsDeploymentDetails = {
    __typename?: 'IssueDevOpsDeploymentDetails';
    displayName?: Maybe<Scalars['String']>;
    environment?: Maybe<IssueDevOpsDeploymentEnvironment>;
    lastUpdated?: Maybe<Scalars['DateTime']>;
    pipelineDisplayName?: Maybe<Scalars['String']>;
    pipelineId: Scalars['String'];
    pipelineUrl?: Maybe<Scalars['String']>;
    state?: Maybe<IssueDevOpsDeploymentState>;
    url?: Maybe<Scalars['String']>;
};
export declare type IssueDevOpsDeploymentEnvironment = {
    __typename?: 'IssueDevOpsDeploymentEnvironment';
    displayName?: Maybe<Scalars['String']>;
    id: Scalars['String'];
    type?: Maybe<IssueDevOpsDeploymentEnvironmentType>;
};
export declare enum IssueDevOpsDeploymentEnvironmentType {
    Development = "DEVELOPMENT",
    Production = "PRODUCTION",
    Staging = "STAGING",
    Testing = "TESTING",
    Unmapped = "UNMAPPED"
}
/**
 * This object witholds deployment providers essential information,
 * as well as its list of latest deployments per pipeline.
 * A provider without deployments related to the asked issueId will not be returned.
 */
export declare type IssueDevOpsDeploymentProviderDetails = {
    __typename?: 'IssueDevOpsDeploymentProviderDetails';
    /** A list of the latest deployments of each pipeline */
    deployments?: Maybe<Array<IssueDevOpsDeploymentDetails>>;
    homeUrl?: Maybe<Scalars['String']>;
    id: Scalars['String'];
    logoUrl?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
};
export declare enum IssueDevOpsDeploymentState {
    Cancelled = "CANCELLED",
    Failed = "FAILED",
    InProgress = "IN_PROGRESS",
    Pending = "PENDING",
    RolledBack = "ROLLED_BACK",
    Successful = "SUCCESSFUL",
    Unknown = "UNKNOWN"
}
/** Aggregates all the instance types (bitbucket, stash, github) and its development information */
export declare type IssueDevOpsDetails = {
    __typename?: 'IssueDevOpsDetails';
    deploymentProviders?: Maybe<Array<IssueDevOpsDeploymentProviderDetails>>;
    embeddedMarketplace: IssueDevOpsEmbeddedMarketplace;
    featureFlagProviders?: Maybe<Array<IssueDevOpsFeatureFlagProvider>>;
    instanceTypes: Array<IssueDevOpsProviderInstance>;
    remoteLinksByType?: Maybe<IssueDevOpsRemoteLinksByType>;
};
/** Information related to the development process of an issue */
export declare type IssueDevOpsDevelopmentInformation = {
    __typename?: 'IssueDevOpsDevelopmentInformation';
    details?: Maybe<IssueDevOpsDetails>;
};
/** Information related to the development process of an issue */
export declare type IssueDevOpsDevelopmentInformationDetailsArgs = {
    instanceTypes?: Array<Scalars['String']>;
};
/**
 * A set of booleans that indicate if the embedded marketplace
 * should be shown if a user does not have installed providers
 */
export declare type IssueDevOpsEmbeddedMarketplace = {
    __typename?: 'IssueDevOpsEmbeddedMarketplace';
    shouldDisplayForBuilds: Scalars['Boolean'];
    shouldDisplayForDeployments: Scalars['Boolean'];
    shouldDisplayForFeatureFlags: Scalars['Boolean'];
};
export declare type IssueDevOpsFeatureFlag = {
    __typename?: 'IssueDevOpsFeatureFlag';
    details?: Maybe<Array<IssueDevOpsFeatureFlagDetails>>;
    displayName?: Maybe<Scalars['String']>;
    /** the identifier for the feature flag as provided */
    id: Scalars['String'];
    key?: Maybe<Scalars['String']>;
    /** Can be used to link to a provider record if required */
    providerId?: Maybe<Scalars['String']>;
    summary?: Maybe<IssueDevOpsFeatureFlagSummary>;
};
export declare type IssueDevOpsFeatureFlagDetails = {
    __typename?: 'IssueDevOpsFeatureFlagDetails';
    environment?: Maybe<IssueDevOpsFeatureFlagEnvironment>;
    lastUpdated?: Maybe<Scalars['String']>;
    status?: Maybe<IssueDevOpsFeatureFlagStatus>;
    url: Scalars['String'];
};
export declare type IssueDevOpsFeatureFlagEnvironment = {
    __typename?: 'IssueDevOpsFeatureFlagEnvironment';
    name: Scalars['String'];
    type?: Maybe<Scalars['String']>;
};
export declare type IssueDevOpsFeatureFlagProvider = {
    __typename?: 'IssueDevOpsFeatureFlagProvider';
    createFlagTemplateUrl?: Maybe<Scalars['String']>;
    featureFlags?: Maybe<Array<IssueDevOpsFeatureFlag>>;
    id: Scalars['String'];
    linkFlagTemplateUrl?: Maybe<Scalars['String']>;
};
export declare type IssueDevOpsFeatureFlagRollout = {
    __typename?: 'IssueDevOpsFeatureFlagRollout';
    percentage?: Maybe<Scalars['Float']>;
    rules?: Maybe<Scalars['Int']>;
    text?: Maybe<Scalars['String']>;
};
export declare type IssueDevOpsFeatureFlagStatus = {
    __typename?: 'IssueDevOpsFeatureFlagStatus';
    defaultValue?: Maybe<Scalars['String']>;
    enabled: Scalars['Boolean'];
    rollout?: Maybe<IssueDevOpsFeatureFlagRollout>;
};
export declare type IssueDevOpsFeatureFlagSummary = {
    __typename?: 'IssueDevOpsFeatureFlagSummary';
    lastUpdated?: Maybe<Scalars['String']>;
    status: IssueDevOpsFeatureFlagStatus;
    url?: Maybe<Scalars['String']>;
};
/** Latest commit on a branch */
export declare type IssueDevOpsHeadCommit = {
    __typename?: 'IssueDevOpsHeadCommit';
    displayId: Scalars['String'];
    /** Time of the commit in ISO 8601 format */
    timestamp?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
};
/** Detailed information of an instance and its data (source data, build data, deployment data) */
export declare type IssueDevOpsProviderInstance = {
    __typename?: 'IssueDevOpsProviderInstance';
    baseUrl?: Maybe<Scalars['String']>;
    buildProviders?: Maybe<Array<IssueDevOpsBuildProvider>>;
    /**
     * There are common cases where a Pull Request is merged and its branch is deleted.
     * The downstream sources do not provide repository information on the PR, only branches information.
     * When the branch is deleted, it's not possible to create the bridge between PRs and Repository.
     * For this reason, any PR that couldn't be assigned to a repository will appear on this list.
     */
    danglingPullRequests?: Maybe<Array<IssueDevOpsPullRequestDetails>>;
    /**
     * An error message related to this instance passed down from DevStatus
     * These are not GraphQL errors. When an instance type is requested,
     * DevStatus may respond with a list instances and strings nested inside the 'errors' field, as follows:
     * `{ 'errors': [{'_instance': { ... }, error: 'unauthorized' }], detail: [ ... ] }`.
     * The status code for this response however is still 200
     * since only part of the instances requested may present these issues.
     * `devStatusErrorMessage` is deprecated. Use `devStatusErrorMessages`.
     */
    devStatusErrorMessage?: Maybe<Scalars['String']>;
    devStatusErrorMessages?: Maybe<Array<Scalars['String']>>;
    id: Scalars['String'];
    /** Indicates if it is possible to return more than a single instance per type. Only possible with FeCru */
    isSingleInstance?: Maybe<Scalars['Boolean']>;
    /** The name of the instance type */
    name?: Maybe<Scalars['String']>;
    repository?: Maybe<Array<IssueDevOpsRepositoryDetails>>;
    /** Raw type of the instance. e.g. bitbucket, stash, github */
    type?: Maybe<Scalars['String']>;
    /** The descriptive name of the instance type. e.g. Bitbucket Cloud */
    typeName?: Maybe<Scalars['String']>;
};
/** Description of a pull request or commit author */
export declare type IssueDevOpsPullRequestAuthor = {
    __typename?: 'IssueDevOpsPullRequestAuthor';
    /** The avatar URL of the author */
    avatarUrl?: Maybe<Scalars['String']>;
    name: Scalars['String'];
};
/** Detailed information of a pull request */
export declare type IssueDevOpsPullRequestDetails = {
    __typename?: 'IssueDevOpsPullRequestDetails';
    author?: Maybe<IssueDevOpsPullRequestAuthor>;
    branchName?: Maybe<Scalars['String']>;
    branchUrl?: Maybe<Scalars['String']>;
    commentCount?: Maybe<Scalars['Int']>;
    id: Scalars['String'];
    /** Time of the last update in ISO 8601 format */
    lastUpdate?: Maybe<Scalars['DateTime']>;
    name?: Maybe<Scalars['String']>;
    reviewers?: Maybe<Array<IssueDevOpsPullRequestReviewer>>;
    status?: Maybe<IssueDevOpsPullRequestStatus>;
    url?: Maybe<Scalars['String']>;
};
/** Description of a pull request reviewer */
export declare type IssueDevOpsPullRequestReviewer = {
    __typename?: 'IssueDevOpsPullRequestReviewer';
    /** The avatar URL of the reviewer */
    avatarUrl?: Maybe<Scalars['String']>;
    /** Flag representing if the reviewer has already approved the PR */
    isApproved?: Maybe<Scalars['Boolean']>;
    name: Scalars['String'];
};
export declare enum IssueDevOpsPullRequestStatus {
    Declined = "DECLINED",
    Merged = "MERGED",
    Open = "OPEN"
}
export declare type IssueDevOpsRemoteLink = {
    __typename?: 'IssueDevOpsRemoteLink';
    actionIds?: Maybe<Array<Scalars['String']>>;
    attributeMap?: Maybe<Array<IssueDevOpsRemoteLinkAttributeTuple>>;
    description?: Maybe<Scalars['String']>;
    displayName?: Maybe<Scalars['String']>;
    id: Scalars['String'];
    providerId?: Maybe<Scalars['String']>;
    status?: Maybe<IssueDevOpsRemoteLinkStatus>;
    type?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
};
export declare type IssueDevOpsRemoteLinkAttributeTuple = {
    __typename?: 'IssueDevOpsRemoteLinkAttributeTuple';
    key: Scalars['String'];
    value: Scalars['String'];
};
export declare type IssueDevOpsRemoteLinkLabel = {
    __typename?: 'IssueDevOpsRemoteLinkLabel';
    value: Scalars['String'];
};
export declare type IssueDevOpsRemoteLinkProvider = {
    __typename?: 'IssueDevOpsRemoteLinkProvider';
    actions?: Maybe<Array<IssueDevOpsRemoteLinkProviderAction>>;
    documentationUrl?: Maybe<Scalars['String']>;
    homeUrl?: Maybe<Scalars['String']>;
    id: Scalars['String'];
    logoUrl?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
};
export declare type IssueDevOpsRemoteLinkProviderAction = {
    __typename?: 'IssueDevOpsRemoteLinkProviderAction';
    id: Scalars['String'];
    label?: Maybe<IssueDevOpsRemoteLinkLabel>;
    templateUrl?: Maybe<Scalars['String']>;
};
export declare type IssueDevOpsRemoteLinkStatus = {
    __typename?: 'IssueDevOpsRemoteLinkStatus';
    appearance?: Maybe<Scalars['String']>;
    label?: Maybe<Scalars['String']>;
};
export declare type IssueDevOpsRemoteLinkType = {
    __typename?: 'IssueDevOpsRemoteLinkType';
    remoteLinks?: Maybe<Array<IssueDevOpsRemoteLink>>;
    type: Scalars['String'];
};
export declare type IssueDevOpsRemoteLinksByType = {
    __typename?: 'IssueDevOpsRemoteLinksByType';
    providers: Array<IssueDevOpsRemoteLinkProvider>;
    types: Array<IssueDevOpsRemoteLinkType>;
};
/** Detailed information of a VCS repository */
export declare type IssueDevOpsRepositoryDetails = {
    __typename?: 'IssueDevOpsRepositoryDetails';
    /** The repository avatar URL */
    avatarUrl?: Maybe<Scalars['String']>;
    branches?: Maybe<Array<IssueDevOpsBranchDetails>>;
    commits?: Maybe<Array<IssueDevOpsCommitDetails>>;
    description?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    /** A reference to the parent repository from where this has been forked for */
    parent?: Maybe<IssueDevOpsRepositoryParent>;
    pullRequests?: Maybe<Array<IssueDevOpsPullRequestDetails>>;
    url?: Maybe<Scalars['String']>;
};
/** Short description of the parent repository from which the fork was made */
export declare type IssueDevOpsRepositoryParent = {
    __typename?: 'IssueDevOpsRepositoryParent';
    name: Scalars['String'];
    url?: Maybe<Scalars['String']>;
};
/** Short desciption of a review associated with a branch or commit */
export declare type IssueDevOpsReview = {
    __typename?: 'IssueDevOpsReview';
    id: Scalars['String'];
    state?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
};
/** A summary for the tests results for a particular build */
export declare type IssueDevOpsTestSummary = {
    __typename?: 'IssueDevOpsTestSummary';
    numberFailed?: Maybe<Scalars['Int']>;
    numberPassed?: Maybe<Scalars['Int']>;
    numberSkipped?: Maybe<Scalars['Int']>;
    totalNumber?: Maybe<Scalars['Int']>;
};
/** Represents the Atlassian Document Format content in JSON format. */
export declare type JiraAdf = {
    __typename?: 'JiraADF';
    /** The content of ADF in JSON. */
    json?: Maybe<Scalars['JSON']>;
};
/**
 * Represents an affected service entity for a Jira Issue.
 * AffectedService provides context on what has been changed.
 */
export declare type JiraAffectedService = {
    __typename?: 'JiraAffectedService';
    /** The id of the affected service. E.g. jira. */
    serviceId?: Maybe<Scalars['String']>;
};
/** The connection type for JiraAffectedService. */
export declare type JiraAffectedServiceConnection = {
    __typename?: 'JiraAffectedServiceConnection';
    /** A list of edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraAffectedServiceEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraAffectedService connection. */
export declare type JiraAffectedServiceEdge = {
    __typename?: 'JiraAffectedServiceEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraAffectedService>;
};
/** Represents Affected Services field. */
export declare type JiraAffectedServicesField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraAffectedServicesField';
    /**
     * Paginated list of affected services available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    affectedServices?: Maybe<JiraAffectedServiceConnection>;
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search url to query for all Affected Services when user interact with field. */
    searchUrl?: Maybe<Scalars['String']>;
    /** The affected services available on the Issue or default affected services configured for the field. */
    selectedAffectedServices?: Maybe<Array<Maybe<JiraAffectedService>>>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents Affected Services field. */
export declare type JiraAffectedServicesFieldAffectedServicesArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
    suggested?: Maybe<Scalars['Boolean']>;
};
/** Represents a single option value for an asset field. */
export declare type JiraAsset = {
    __typename?: 'JiraAsset';
    /** The app key, which should be the Connect app key. This parameter is used to scope the originId. */
    appKey?: Maybe<Scalars['String']>;
    /** The identifier of an asset. This is the same identifier for the asset in its origin (external) system. */
    originId?: Maybe<Scalars['String']>;
    /** The appKey + originId separated by a forward slash. */
    serializedOrigin?: Maybe<Scalars['String']>;
    /** The appKey + originId separated by a forward slash. */
    value?: Maybe<Scalars['String']>;
};
/** Represents the Asset field on a Jira Issue. */
export declare type JiraAssetField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraAssetField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search URL to fetch all the assets for the field on a Jira Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** The assets available on the Issue or default assets configured for the field. */
    selectedAssets?: Maybe<Array<Maybe<JiraAsset>>>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents an Atlassian team in Jira. */
export declare type JiraAtlassianTeam = {
    __typename?: 'JiraAtlassianTeam';
    /** The avatar of the team. */
    avatar?: Maybe<JiraAvatar>;
    /** The name of the team. */
    name?: Maybe<Scalars['String']>;
    /** The UUID of team. */
    teamId?: Maybe<Scalars['String']>;
};
/** The connection type for JiraAtlassianTeam. */
export declare type JiraAtlassianTeamConnection = {
    __typename?: 'JiraAtlassianTeamConnection';
    /** A list of edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraAtlassianTeamEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraAtlassianTeam connection. */
export declare type JiraAtlassianTeamEdge = {
    __typename?: 'JiraAtlassianTeamEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraAtlassianTeam>;
};
/** Represents the Atlassian team field on a Jira Issue. Allows you to select a team to be associated with an issue. */
export declare type JiraAtlassianTeamField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraAtlassianTeamField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search URL to fetch all the teams options for the field on a Jira Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** The team available on the Issue or default team configured for the field. */
    selectedTeam?: Maybe<JiraAtlassianTeam>;
    /**
     * Paginated list of team options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    teams?: Maybe<JiraAtlassianTeamConnection>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents the Atlassian team field on a Jira Issue. Allows you to select a team to be associated with an issue. */
export declare type JiraAtlassianTeamFieldTeamsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
export declare type JiraAttachment = {
    __typename?: 'JiraAttachment';
    /** Date the attachment was created in seconds since the epoch. */
    createdDate?: Maybe<Scalars['DateTime']>;
    /** File name. */
    filename?: Maybe<Scalars['String']>;
    /** File size. */
    filesize?: Maybe<Scalars['Int']>;
    /** Global identifier for the attachment. */
    id: Scalars['ID'];
    /** Attachment file id from media service. */
    mediaApiFileId?: Maybe<Scalars['String']>;
    /** File type. */
    mimetype?: Maybe<Scalars['String']>;
};
/** The connection type for JiraAttachment. */
export declare type JiraAttachmentConnection = {
    __typename?: 'JiraAttachmentConnection';
    /** The data for Edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraAttachmentEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** The total number of JiraAttachment matching the criteria. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraAttachment connection. */
export declare type JiraAttachmentEdge = {
    __typename?: 'JiraAttachmentEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraAttachment>;
};
/** Represents an attachment field on a Jira Issue. */
export declare type JiraAttachmentsField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraAttachmentsField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Paginated list of attachments available for the field or the Issue. */
    attachments?: Maybe<JiraAttachmentConnection>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Defines the maximum size limit (in bytes) of the total of all the attachments which can be associated with this field. */
    maxAllowedTotalAttachmentsSize?: Maybe<Scalars['Long']>;
    /** Contains the information needed to add a media content to this field. */
    mediaContext?: Maybe<JiraMediaContext>;
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Defines the permissions of the attachment collection. */
    permissions?: Maybe<Array<Maybe<JiraAttachmentsPermissions>>>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents an attachment field on a Jira Issue. */
export declare type JiraAttachmentsFieldAttachmentsArgs = {
    maxResults?: Maybe<Scalars['Int']>;
    orderDirection?: Maybe<JiraOrderDirection>;
    orderField?: Maybe<JiraAttachmentsOrderField>;
    startAt?: Maybe<Scalars['Int']>;
};
export declare type JiraAttachmentsOrderField = {
    id: Scalars['ID'];
};
export declare enum JiraAttachmentsPermissions {
    /** Allows the user to create atachments on the correspondig Issue. */
    CreateAttachments = "CREATE_ATTACHMENTS",
    /** Allows the user to delete attachments on the corresponding Issue. */
    DeleteOwnAttachments = "DELETE_OWN_ATTACHMENTS"
}
/** Represents the four avatar sizes' url. */
export declare type JiraAvatar = {
    __typename?: 'JiraAvatar';
    /** A large avatar (48x48 pixels). */
    large?: Maybe<Scalars['String']>;
    /** A medium avatar (32x32 pixels). */
    medium?: Maybe<Scalars['String']>;
    /** A small avatar (24x24 pixels). */
    small?: Maybe<Scalars['String']>;
    /** An extra-small avatar (16x16 pixels). */
    xsmall?: Maybe<Scalars['String']>;
};
/** Represents CMDB field on a Jira Issue. */
export declare type JiraCmdbField = JiraIssueField & JiraIssueFieldConfiguration & {
    __typename?: 'JiraCMDBField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Attributes that are configured for autocomplete search. */
    attributesIncludedInAutoCompleteSearch?: Maybe<Array<Maybe<Scalars['String']>>>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Whether the field is configured to act as single/multi select CMDB(s) field. */
    isMulti?: Maybe<Scalars['Boolean']>;
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search url to fetch all available cmdb options for the field or the Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** The CMDB objects available on the Issue or default CMDB objects configured for the field. */
    selectedCmdbObjects?: Maybe<Array<Maybe<JiraCmdbObject>>>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/**
 * Represents the pair of values (parent & child combination) in a cascading select.
 * This type is used to represent a selected cascading field value on a Jira Issue.
 * Since this is 2 level hierarchy, it is not possible to represent the same underlying
 * type for both single cascadingOption and list of cascadingOptions. Thus, we have created different types.
 */
export declare type JiraCascadingOption = {
    __typename?: 'JiraCascadingOption';
    /** Defines the selected single child option value for the parent. */
    childOptionValue?: Maybe<JiraOption>;
    /** Defines the parent option value. */
    parentOptionValue?: Maybe<JiraOption>;
};
/** Represents the childs options allowed values for a parent option in cascading select operation. */
export declare type JiraCascadingOptions = {
    __typename?: 'JiraCascadingOptions';
    /** Defines all the list of child options available for the parent option. */
    childOptionValues?: Maybe<Array<Maybe<JiraOption>>>;
    /** Defines the parent option value. */
    parentOptionValue?: Maybe<JiraOption>;
};
/** The connection type for JiraCascadingOptions. */
export declare type JiraCascadingOptionsConnection = {
    __typename?: 'JiraCascadingOptionsConnection';
    /** The data for Edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraCascadingOptionsEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraCascadingOptions connection. */
export declare type JiraCascadingOptionsEdge = {
    __typename?: 'JiraCascadingOptionsEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraCascadingOptions>;
};
/** Represents cascading select field. Currently only handles 2 level hierarchy. */
export declare type JiraCascadingSelectField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraCascadingSelectField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** The cascading option available on the Issue or default cascading option configured for the field. */
    cascadingOption?: Maybe<JiraCascadingOption>;
    /**
     * Paginated list of cascading options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    cascadingOptions?: Maybe<JiraCascadingOptionsConnection>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents cascading select field. Currently only handles 2 level hierarchy. */
export declare type JiraCascadingSelectFieldCascadingOptionsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
/**
 * Cascading options can either be a parent or a child - this enum captures this characteristic.
 *
 * E.g. If there is a parent cascading option named `P1`, it may or may not have
 * child cascading options named `C1` and `C2`.
 * - `P1` would be a `PARENT` enum
 * - `C1` and `C2` would be `CHILD` enums
 */
export declare enum JiraCascadingSelectOptionType {
    /** All options, regardless of whether they're a parent or child. */
    All = "ALL",
    /** Child option only */
    Child = "CHILD",
    /** Parent option only */
    Parent = "PARENT"
}
/** An input filter used to specify the cascading options returned. */
export declare type JiraCascadingSelectOptionsFilter = {
    /** The type of cascading option to be returned. */
    optionType: JiraCascadingSelectOptionType;
    /**
     * Used for retrieving CHILD cascading options by specifying the PARENT cascading option's name.
     *
     * The parent name is case-sensitive and it will not be applied to non-child cascading options.
     */
    parentOptionName?: Maybe<Scalars['String']>;
};
/** Represents the check boxes field on a Jira Issue. */
export declare type JiraCheckboxesField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraCheckboxesField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /**
     * Paginated list of options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    fieldOptions?: Maybe<JiraOptionConnection>;
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** The options available on the Issue or default options configured for the field. */
    selectedFieldOptions?: Maybe<Array<Maybe<JiraOption>>>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents the check boxes field on a Jira Issue. */
export declare type JiraCheckboxesFieldFieldOptionsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
/** Jira Configuration Management Database. */
export declare type JiraCmdbObject = Node & {
    __typename?: 'JiraCmdbObject';
    /** Global identifier for the cmdb field. */
    id: Scalars['ID'];
    /** Label display in the cmdb field. */
    label?: Maybe<Scalars['String']>;
    /** Unique object id formed with `workspaceId`:`objectId`. */
    objectGlobalId?: Maybe<Scalars['String']>;
    /** Unique id in the workspace of the cmdb object. */
    objectId?: Maybe<Scalars['String']>;
    /** Workspace id of the cmdb object. */
    workspaceId?: Maybe<Scalars['String']>;
};
/** Jira color that displays on a field. */
export declare type JiraColor = {
    __typename?: 'JiraColor';
    /** The key associated with the color based on the field type (issue color, epic color). */
    colorKey?: Maybe<Scalars['String']>;
    /** Global identifier for the color. */
    id?: Maybe<Scalars['ID']>;
};
/** Represents color field on a Jira Issue. E.g. issue color, epic color. */
export declare type JiraColorField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraColorField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** The color available on the Issue or default color configured for the field. */
    color?: Maybe<JiraColor>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Jira component defines a sub-selectin of a project. */
export declare type JiraComponent = Node & {
    __typename?: 'JiraComponent';
    /** Component id in digital format. */
    componentId: Scalars['Long'];
    /** Component description. */
    description?: Maybe<Scalars['String']>;
    /** Global identifier for the color. */
    id: Scalars['ID'];
    /** The name of the component. */
    name?: Maybe<Scalars['String']>;
};
/** The connection type for JiraComponent. */
export declare type JiraComponentConnection = {
    __typename?: 'JiraComponentConnection';
    /** A list of edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraComponentEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total number of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraComponent connection. */
export declare type JiraComponentEdge = {
    __typename?: 'JiraComponentEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraComponent>;
};
/** Represents components field on a Jira Issue. */
export declare type JiraComponentsField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraComponentsField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /**
     * Paginated list of component options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    components?: Maybe<JiraComponentConnection>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** The component available on the Issue or default component configured for the field. */
    selectedComponents?: Maybe<Array<Maybe<JiraComponent>>>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents components field on a Jira Issue. */
export declare type JiraComponentsFieldComponentsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
/** Represents a multi-select field created by Connect App. */
export declare type JiraConnectMultipleSelectField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraConnectMultipleSelectField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /**
     * Paginated list of options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    fieldOptions?: Maybe<JiraOptionConnection>;
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    searchUrl?: Maybe<Scalars['String']>;
    /** The options available on the Issue or default options configured for the field. */
    selectedFieldOptions?: Maybe<Array<Maybe<JiraOption>>>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a multi-select field created by Connect App. */
export declare type JiraConnectMultipleSelectFieldFieldOptionsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
/** Represents a number field created by Connect App. */
export declare type JiraConnectNumberField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraConnectNumberField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Connected number. */
    number?: Maybe<Scalars['Float']>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents rich text field on a Jira Issue. E.g. description, environment. */
export declare type JiraConnectRichTextField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraConnectRichTextField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Contains the information needed to add a media content to this field. */
    mediaContext?: Maybe<JiraMediaContext>;
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /**
     * Determines what editor to render.
     * E.g. default text rendering or wiki text rendering.
     */
    renderer?: Maybe<Scalars['String']>;
    /** The rich text available on the Issue or default rich text configured for the field. */
    richText?: Maybe<JiraRichText>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a single select field created by Connect App. */
export declare type JiraConnectSingleSelectField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraConnectSingleSelectField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** The option available on the Issue or default option configured for the field. */
    fieldOption?: Maybe<JiraOption>;
    /**
     * Paginated list of options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    fieldOptions?: Maybe<JiraOptionConnection>;
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    searchUrl?: Maybe<Scalars['String']>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a single select field created by Connect App. */
export declare type JiraConnectSingleSelectFieldFieldOptionsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
/** Represents a text field created by Connect App. */
export declare type JiraConnectTextField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraConnectTextField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Content of the connect text field. */
    text?: Maybe<Scalars['String']>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a date picker field on an issue. */
export declare type JiraDatePickerField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraDatePickerField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** The date available on the Issue or default date configured for the field. */
    date?: Maybe<Scalars['Date']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a date time picker field on a Jira Issue. */
export declare type JiraDateTimePickerField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraDateTimePickerField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** The datetime available on the Issue or default datetime configured for the field. */
    dateTime?: Maybe<Scalars['DateTime']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/**
 * The default grant type with only id and name to return data for grant types such as PROJECT_LEAD, APPLICATION_ROLE,
 * ANY_LOGGEDIN_USER_APPLICATION_ROLE, ANONYMOUS_ACCESS, SERVICE_PROJECT_CUSTOMER_PORTAL_ACCESS
 */
export declare type JiraDefaultGrantTypeValue = Node & {
    __typename?: 'JiraDefaultGrantTypeValue';
    /**
     * The ARI to represent the default grant type value.
     * For example:
     * PROJECT_LEAD ari - ari:cloud:jira:a2520569-493f-45bc-807b-54b02bc724d1:role/project-lead/activation/bd0c43a9-a23a-4302-8ffa-ca04bde7c747/project/f67c73a8-545e-455b-a6bd-3d53cb7e0524
     * APPLICATION_ROLE ari for JSM - ari:cloud:jira-servicedesk::role/123
     * ANY_LOGGEDIN_USER_APPLICATION_ROLE ari - ari:cloud:jira::role/product/member
     * ANONYMOUS_ACCESS ari - ari:cloud:identity::user/unidentified
     */
    id: Scalars['ID'];
    /** The display name of the grant type value such as GROUP. */
    name: Scalars['String'];
};
/** Container for all DevOps data for an issue, to be displayed in the DevOps Panel of an issue */
export declare type JiraDevOpsIssuePanel = {
    __typename?: 'JiraDevOpsIssuePanel';
    /** Specify a banner to show on top of the dev panel. `null` means that no banner should be displayed. */
    devOpsIssuePanelBanner?: Maybe<JiraDevOpsIssuePanelBannerType>;
    /** Container for the Dev Summary of this issue */
    devSummaryResult?: Maybe<JiraIssueDevSummaryResult>;
    /** Specifies the state the DevOps panel in the issue view should be in */
    panelState?: Maybe<JiraDevOpsIssuePanelState>;
};
export declare enum JiraDevOpsIssuePanelBannerType {
    /** Banner that explains how to add issue keys in your commits, branches and PRs */
    IssueKeyOnboarding = "ISSUE_KEY_ONBOARDING"
}
/** The possible States the DevOps Issue Panel can be in */
export declare enum JiraDevOpsIssuePanelState {
    /** Panel should show the available Dev Summary */
    DevSummary = "DEV_SUMMARY",
    /** Panel should be hidden */
    Hidden = "HIDDEN",
    /** Panel should show the "not connected" state to prompt user to integrate tools */
    NotConnected = "NOT_CONNECTED"
}
/** Container for all DevOps related mutations in Jira */
export declare type JiraDevOpsMutation = {
    __typename?: 'JiraDevOpsMutation';
    /**
     * Lets a user dismiss a banner shown in the DevOps Issue Panel
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: JiraDevOps` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    dismissDevOpsIssuePanelBanner?: Maybe<JiraDismissDevOpsIssuePanelBannerPayload>;
    /**
     * Lets a user opt-out of the "not-connected" state in the DevOps Issue Panel
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: JiraDevOps` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    optoutOfDevOpsIssuePanelNotConnectedState?: Maybe<JiraOptoutDevOpsIssuePanelNotConnectedPayload>;
};
/** Container for all DevOps related mutations in Jira */
export declare type JiraDevOpsMutationDismissDevOpsIssuePanelBannerArgs = {
    input: JiraDismissDevOpsIssuePanelBannerInput;
};
/** Container for all DevOps related queries in Jira */
export declare type JiraDevOpsQuery = {
    __typename?: 'JiraDevOpsQuery';
    /**
     * Returns the JiraDevOpsIssuePanel for an issue
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: JiraDevOps` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    devOpsIssuePanel?: Maybe<JiraDevOpsIssuePanel>;
};
/** Container for all DevOps related queries in Jira */
export declare type JiraDevOpsQueryDevOpsIssuePanelArgs = {
    issueId: Scalars['ID'];
};
/** The input type for devops panel banner dismissal */
export declare type JiraDismissDevOpsIssuePanelBannerInput = {
    /**
     * Only "issue-key-onboarding" is supported currently as this is the only banner
     * that can be displayed in the panel for now
     */
    bannerType: JiraDevOpsIssuePanelBannerType;
    /** ID of the issue this banner was dismissed on */
    issueId: Scalars['ID'];
};
/** The response payload for devops panel banner dismissal */
export declare type JiraDismissDevOpsIssuePanelBannerPayload = Payload & {
    __typename?: 'JiraDismissDevOpsIssuePanelBannerPayload';
    /** The errors field represents additional mutation error information if exists. */
    errors?: Maybe<Array<MutationError>>;
    /** The success indicator saying whether mutation operation was successful as a whole or not. */
    success: Scalars['Boolean'];
};
/** Represents an epic. */
export declare type JiraEpic = {
    __typename?: 'JiraEpic';
    /** Color string for the epic. */
    color?: Maybe<Scalars['String']>;
    /** Status of the epic, whether its completed or not. */
    done?: Maybe<Scalars['Boolean']>;
    /** Global identifier for the epic/issue Id. */
    id: Scalars['ID'];
    /** Issue Id for the epic. */
    issueId: Scalars['Long'];
    /** Key identifier for the issue. */
    key?: Maybe<Scalars['String']>;
    /** Name of the epic. */
    name?: Maybe<Scalars['String']>;
    /** Summary of the epic. */
    summary?: Maybe<Scalars['String']>;
};
/** The connection type for JiraEpic. */
export declare type JiraEpicConnection = {
    __typename?: 'JiraEpicConnection';
    /** A list of edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraEpicEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraEpic connection. */
export declare type JiraEpicEdge = {
    __typename?: 'JiraEpicEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraEpic>;
};
/** Represents epic link field on a Jira Issue. */
export declare type JiraEpicLinkField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraEpicLinkField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** The epic available on the Issue or default epic configured for the field. */
    epic?: Maybe<JiraEpic>;
    /**
     * Paginated list of epic options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    epics?: Maybe<JiraEpicConnection>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search url to fetch all available epics options for the field or the Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents epic link field on a Jira Issue. */
export declare type JiraEpicLinkFieldEpicsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    done?: Maybe<Scalars['Boolean']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
/** Represents the Jira time tracking estimate type. */
export declare type JiraEstimate = {
    __typename?: 'JiraEstimate';
    /** The estimated time in seconds. */
    timeInSeconds?: Maybe<Scalars['Long']>;
};
/** Attributes of field configuration. */
export declare type JiraFieldConfig = {
    __typename?: 'JiraFieldConfig';
    /** Defines if a field is editable. */
    isEditable?: Maybe<Scalars['Boolean']>;
    /** Defines if a field is required on a screen. */
    isRequired?: Maybe<Scalars['Boolean']>;
    /**
     * Explains the reason why a field is not editable on a screen.
     * E.g. cases where a field needs a licensed premium version to be editable.
     */
    nonEditableReason?: Maybe<JiraFieldNonEditableReason>;
};
/** Represents the information for a field being non-editable on Issue screens. */
export declare type JiraFieldNonEditableReason = {
    __typename?: 'JiraFieldNonEditableReason';
    /** Message explanining why the field is non-editable (if present). */
    message?: Maybe<Scalars['String']>;
};
/** Represents the Jira flag. */
export declare type JiraFlag = {
    __typename?: 'JiraFlag';
    /** Indicates whether the issue is flagged or not. */
    isFlagged?: Maybe<Scalars['Boolean']>;
};
/** Represents a flag field on a Jira Issue. E.g. flagged. */
export declare type JiraFlagField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraFlagField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** The flag value available on the issue. */
    flag?: Maybe<JiraFlag>;
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a Group field created by Forge App. */
export declare type JiraForgeGroupField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraForgeGroupField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /**
     * Paginated list of group options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    groups?: Maybe<JiraGroupConnection>;
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    searchUrl?: Maybe<Scalars['String']>;
    /** The group available on the Issue or default group configured for the field. */
    selectedGroup?: Maybe<JiraGroup>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a Group field created by Forge App. */
export declare type JiraForgeGroupFieldGroupsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
/** Represents a number field created by Forge App. */
export declare type JiraForgeNumberField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraForgeNumberField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** The number available on the Issue or default number configured for the field. */
    number?: Maybe<Scalars['Float']>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a string field created by Forge App. */
export declare type JiraForgeStringField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraForgeStringField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** The text available on the Issue or default text configured for the field. */
    text?: Maybe<Scalars['String']>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a strings field created by Forge App. */
export declare type JiraForgeStringsField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraForgeStringsField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /**
     * Paginated list of label options for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    labels?: Maybe<JiraLabelConnection>;
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search url to fetch all available labels options on the field or an Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** The labels available on the Issue or default labels configured for the field. */
    selectedLabels?: Maybe<Array<Maybe<JiraLabel>>>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a strings field created by Forge App. */
export declare type JiraForgeStringsFieldLabelsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
    suggested?: Maybe<Scalars['Boolean']>;
};
/** Represents a User field created by Forge App. */
export declare type JiraForgeUserField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraForgeUserField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search url to fetch all available users options for the field or the Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** Field type key. */
    type: Scalars['String'];
    /** The user available on the Issue or default user configured for the field. */
    user?: Maybe<User>;
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
    /**
     * Paginated list of user options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    users?: Maybe<JiraUserConnection>;
};
/** Represents a User field created by Forge App. */
export declare type JiraForgeUserFieldUsersArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
    suggested?: Maybe<Scalars['Boolean']>;
};
/** The unique key of the grant type such as PROJECT_ROLE. */
export declare type JiraGrantTypeKey = {
    __typename?: 'JiraGrantTypeKey';
    /** The key to identify the grant type such as PROJECT_ROLE. */
    key: JiraGrantTypeKeyEnum;
    /** The display name of the grant type key such as Project Role. */
    name: Scalars['String'];
};
/**
 * The grant type key enum represents all the possible grant types available in Jira.
 * A grant type may take an optional parameter value.
 * For example: PROJECT_ROLE grant type takes project role id as parameter. And, PROJECT_LEAD grant type do not.
 *
 * The actual ARI formats are documented on the various concrete grant type values.
 */
export declare enum JiraGrantTypeKeyEnum {
    /**
     * The anonymous access represents the public access without logging in.
     * It takes no parameter.
     */
    AnonymousAccess = "ANONYMOUS_ACCESS",
    /**
     * Any user who has the product access.
     * It takes no parameter.
     */
    AnyLoggedinUserApplicationRole = "ANY_LOGGEDIN_USER_APPLICATION_ROLE",
    /**
     * A application role is used to grant a user/group access to the application group.
     * It takes application role as parameter.
     */
    ApplicationRole = "APPLICATION_ROLE",
    /**
     * The issue assignee role.
     * It takes platform defined 'assignee' as parameter to represent the issue field value.
     */
    Assignee = "ASSIGNEE",
    /**
     * A group is a collection of users who can be given access together.
     * It represents group in the organization's user base.
     * It takes group id as parameter.
     */
    Group = "GROUP",
    /**
     * A multi group picker custom field.
     * It takes multi group picker custom field id as parameter.
     */
    MultiGroupPicker = "MULTI_GROUP_PICKER",
    /**
     * A multi user picker custom field.
     * It takes multi user picker custom field id as parameter.
     */
    MultiUserPicker = "MULTI_USER_PICKER",
    /**
     * The project lead role.
     * It takes no parameter.
     */
    ProjectLead = "PROJECT_LEAD",
    /**
     * A role that user/group can play in a project.
     * It takes project role as parameter.
     */
    ProjectRole = "PROJECT_ROLE",
    /**
     * The issue reporter role.
     * It takes platform defined 'reporter' as parameter to represent the issue field value.
     */
    Reporter = "REPORTER",
    /**
     * The grant type defines what the customers can do from the portal view.
     * It takes no parameter.
     */
    ServiceProjectCustomerPortalAccess = "SERVICE_PROJECT_CUSTOMER_PORTAL_ACCESS",
    /**
     * An individual user who can be given the access to work on one or more projects.
     * It takes user account id as parameter.
     */
    User = "USER"
}
/** The JiraGrantTypeValue union resolves to one of the concrete types such as JiraDefaultGrantTypeValue, JiraProjectRoleGrantTypeValue. */
export declare type JiraGrantTypeValue = JiraDefaultGrantTypeValue | JiraGroupGrantTypeValue | JiraIssueFieldGrantTypeValue | JiraProjectRoleGrantTypeValue | JiraUserGrantTypeValue;
/** A type to represent one or more paginated list of one or more permission grant values available for a given grant type. */
export declare type JiraGrantTypeValueConnection = {
    __typename?: 'JiraGrantTypeValueConnection';
    /** The data for edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraGrantTypeValueEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** The total number of items matching the criteria. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge object representing grant type value information used within connection object. */
export declare type JiraGrantTypeValueEdge = {
    __typename?: 'JiraGrantTypeValueEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at this edge. */
    node: JiraGrantTypeValue;
};
/** Represents a Jira Group. */
export declare type JiraGroup = {
    __typename?: 'JiraGroup';
    /** Group Id, can be null on group creation */
    groupId?: Maybe<Scalars['ID']>;
    /** The global identifier of the group in ARI format. */
    id: Scalars['ID'];
    /** Name of the Group */
    name?: Maybe<Scalars['String']>;
};
/** The connection type for JiraGroup. */
export declare type JiraGroupConnection = {
    __typename?: 'JiraGroupConnection';
    /** The data for Edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraGroup>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraGroupConnection connection. */
export declare type JiraGroupEdge = {
    __typename?: 'JiraGroupEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraGroup>;
};
/** The GROUP grant type value where group data is provided by identity service. */
export declare type JiraGroupGrantTypeValue = Node & {
    __typename?: 'JiraGroupGrantTypeValue';
    /** The group information such as name, and description. */
    group: JiraGroup;
    /**
     * The ARI to represent the group grant type value.
     * For example: ari:cloud:identity::group/123
     */
    id: Scalars['ID'];
};
/** Jira Issue node. Includes the Issue data displayable in the current User context. */
export declare type JiraIssue = Node & {
    __typename?: 'JiraIssue';
    /**
     * Loads the displayable fields relevant to the current Issue/User context.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    fields?: Maybe<JiraIssueFieldConnection>;
    /**
     * Paginated list of fields available on this issue. Allows clients to specify fields by their identifier.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    fieldsById?: Maybe<JiraIssueFieldConnection>;
    /** Unique identifier associated with this Issue. */
    id: Scalars['ID'];
    /** Issue ID in numeric format. E.g. 10000 */
    issueId: Scalars['Long'];
    /** The {projectKey}-{issueNumber} associated with this Issue. */
    key: Scalars['String'];
};
/** Jira Issue node. Includes the Issue data displayable in the current User context. */
export declare type JiraIssueFieldsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
/** Jira Issue node. Includes the Issue data displayable in the current User context. */
export declare type JiraIssueFieldsByIdArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    ids: Array<Scalars['ID']>;
    last?: Maybe<Scalars['Int']>;
};
/** Summary of the Branches attached to the issue */
export declare type JiraIssueBranchDevSummary = {
    __typename?: 'JiraIssueBranchDevSummary';
    /** Total number of Branches for the issue */
    count?: Maybe<Scalars['Int']>;
    /** Date at which this summary was last updated */
    lastUpdated?: Maybe<Scalars['DateTime']>;
};
/** Container for the summary of the Branches attached to the issue */
export declare type JiraIssueBranchDevSummaryContainer = {
    __typename?: 'JiraIssueBranchDevSummaryContainer';
    /** The actual summary of the Branches attached to the issue */
    overall?: Maybe<JiraIssueBranchDevSummary>;
    /** Count of Branches aggregated per provider */
    summaryByProvider?: Maybe<Array<JiraIssueDevSummaryByProvider>>;
};
/** Summary of the Builds attached to the issue */
export declare type JiraIssueBuildDevSummary = {
    __typename?: 'JiraIssueBuildDevSummary';
    /** Total number of Builds for the issue */
    count?: Maybe<Scalars['Int']>;
    /** Number of failed buids for the issue */
    failedBuildCount?: Maybe<Scalars['Int']>;
    /** Date at which this summary was last updated */
    lastUpdated?: Maybe<Scalars['DateTime']>;
    /** Number of successful buids for the issue */
    successfulBuildCount?: Maybe<Scalars['Int']>;
    /** Number of buids with unknown result for the issue */
    unknownBuildCount?: Maybe<Scalars['Int']>;
};
/** Container for the summary of the Builds attached to the issue */
export declare type JiraIssueBuildDevSummaryContainer = {
    __typename?: 'JiraIssueBuildDevSummaryContainer';
    /** The actual summary of the Builds attached to the issue */
    overall?: Maybe<JiraIssueBuildDevSummary>;
    /** Count of Builds aggregated per provider */
    summaryByProvider?: Maybe<Array<JiraIssueDevSummaryByProvider>>;
};
/** Summary of the Commits attached to the issue */
export declare type JiraIssueCommitDevSummary = {
    __typename?: 'JiraIssueCommitDevSummary';
    /** Total number of Commits for the issue */
    count?: Maybe<Scalars['Int']>;
    /** Date at which this summary was last updated */
    lastUpdated?: Maybe<Scalars['DateTime']>;
};
/** Container for the summary of the Commits attached to the issue */
export declare type JiraIssueCommitDevSummaryContainer = {
    __typename?: 'JiraIssueCommitDevSummaryContainer';
    /** The actual summary of the Commits attached to the issue */
    overall?: Maybe<JiraIssueCommitDevSummary>;
    /** Count of Commits aggregated per provider */
    summaryByProvider?: Maybe<Array<JiraIssueDevSummaryByProvider>>;
};
/** The connection type for JiraIssue. */
export declare type JiraIssueConnection = {
    __typename?: 'JiraIssueConnection';
    /** A list of edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraIssueEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** Lists the summaries available for each type of dev info, for a given issue */
export declare type JiraIssueDevSummary = {
    __typename?: 'JiraIssueDevSummary';
    /** Summary of the Branches attached to the issue */
    branch?: Maybe<JiraIssueBranchDevSummaryContainer>;
    /** Summary of the Builds attached to the issue */
    build?: Maybe<JiraIssueBuildDevSummaryContainer>;
    /** Summary of the Commits attached to the issue */
    commit?: Maybe<JiraIssueCommitDevSummaryContainer>;
    /** Summary of the Pull Requests attached to the issue */
    pullrequest?: Maybe<JiraIssuePullRequestDevSummaryContainer>;
    /** Summary of the Reviews attached to the issue */
    review?: Maybe<JiraIssueReviewDevSummaryContainer>;
};
/** Aggregates the `count` of entities for a given provider */
export declare type JiraIssueDevSummaryByProvider = {
    __typename?: 'JiraIssueDevSummaryByProvider';
    /** Number of entities associated with that provider */
    count?: Maybe<Scalars['Int']>;
    /** Provider name */
    name?: Maybe<Scalars['String']>;
    /** UUID for a given provider, to allow aggregation */
    providerId?: Maybe<Scalars['String']>;
};
/** Error when querying the JiraIssueDevSummary */
export declare type JiraIssueDevSummaryError = {
    __typename?: 'JiraIssueDevSummaryError';
    /** Information about the provider that triggered the error */
    instance?: Maybe<JiraIssueDevSummaryErrorProviderInstance>;
    /** A message describing the error */
    message?: Maybe<Scalars['String']>;
};
/** Basic information on a provider that triggered an error */
export declare type JiraIssueDevSummaryErrorProviderInstance = {
    __typename?: 'JiraIssueDevSummaryErrorProviderInstance';
    /** Base URL of the provider's instance that failed */
    baseUrl?: Maybe<Scalars['String']>;
    /** Provider's name */
    name?: Maybe<Scalars['String']>;
    /** Provider's type */
    type?: Maybe<Scalars['String']>;
};
/** Container for the Dev Summary of an issue */
export declare type JiraIssueDevSummaryResult = {
    __typename?: 'JiraIssueDevSummaryResult';
    /**
     * Returns "non-transient errors". That is, configuration errors that require admin intervention to be solved.
     * This returns an empty collection when called for users that are not administrators or system administrators.
     */
    configErrors?: Maybe<Array<JiraIssueDevSummaryError>>;
    /** Contains all available summaries for the issue */
    devSummary?: Maybe<JiraIssueDevSummary>;
    /**
     * Returns "transient errors". That is, errors that may be solved by retrying the fetch operation.
     * This excludes configuration errors that require admin intervention to be solved.
     */
    errors?: Maybe<Array<JiraIssueDevSummaryError>>;
};
/** An edge in a JiraIssue connection. */
export declare type JiraIssueEdge = {
    __typename?: 'JiraIssueEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraIssue>;
};
/** Represents the common structure across Issue fields. */
export declare type JiraIssueField = {
    /**
     * The field ID alias.
     * Applies to managed or commonly known custom fields in Jira, which allow lookup without requiring the custom field ID.
     * E.g. rank or startdate.
     */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the entity. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Field type key. E.g. project, issuetype, com.pyxis.greenhopper.Jira:gh-epic-link. */
    type: Scalars['String'];
};
/** Represents the configurations associated with an Issue field. */
export declare type JiraIssueFieldConfiguration = {
    /** Attributes of an Issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
};
/** The connection type for JiraIssueField. */
export declare type JiraIssueFieldConnection = {
    __typename?: 'JiraIssueFieldConnection';
    /** A list of edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraIssueFieldEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraIssueField connection. */
export declare type JiraIssueFieldEdge = {
    __typename?: 'JiraIssueFieldEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraIssueField>;
};
/**
 * The issue field grant type used to represent field of an issue.
 * Grant types such as ASSIGNEE, REPORTER, MULTI USER PICKER, and MULTI GROUP PICKER use this grant type value.
 */
export declare type JiraIssueFieldGrantTypeValue = Node & {
    __typename?: 'JiraIssueFieldGrantTypeValue';
    /** The issue field information such as name, description, field id. */
    field: JiraIssueField;
    /**
     * The ARI to represent the issue field grant type value.
     * For example:
     * assignee field ARI is ari:cloud:jira:a2520569-493f-45bc-807b-54b02bc724d1:issuefieldvalue/10000/assignee
     * reporter field ARI is ari:cloud:jira:a2520569-493f-45bc-807b-54b02bc724d1:issuefieldvalue/10000/reporter
     * multi user picker field ARI is ari:cloud:jira:a2520569-493f-45bc-807b-54b02bc724d1:issuefieldvalue/10000/customfield_10126
     */
    id: Scalars['ID'];
};
/**
 * Represents a single issue link containing the link id, link type and destination issue.
 *
 * For issue create, JiraIssueLink will be populated with
 * the default IssueLink types in the relatedBy field.
 * The issueLinkId and issue fields will be null.
 *
 * For issue view, JiraIssueLink will be populated with
 * the issue link data available on the issue.
 * The issue field will contain a nested JiraIssue that is atmost 1 level deep.
 * The nested JiraIssue will not contain fields that can contain further nesting.
 */
export declare type JiraIssueLink = {
    __typename?: 'JiraIssueLink';
    /** Global identifier for the Issue Link. */
    id?: Maybe<Scalars['ID']>;
    /** The destination Issue to which this link is connected. */
    issue?: Maybe<JiraIssue>;
    /** Identifier for the Issue Link. Can be null to represent a link not yet created */
    issueLinkId?: Maybe<Scalars['ID']>;
    /**
     * Issue link type relation through which the source issue is connected to the
     * destination issue. Source Issue is the Issue being created/queried.
     */
    relatedBy?: Maybe<JiraIssueLinkTypeRelation>;
};
/** The connection type for JiraIssueLink. */
export declare type JiraIssueLinkConnection = {
    __typename?: 'JiraIssueLinkConnection';
    /** The data for Edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraIssueLinkEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** The total number of JiraIssueLink matching the criteria. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** Represents the possible linking directions between issues. */
export declare enum JiraIssueLinkDirection {
    /** Going from the other issue to this issue. */
    Inward = "INWARD",
    /** Going from this issue to the other issue. */
    Outward = "OUTWARD"
}
/** An edge in a JiraIssueLink connection. */
export declare type JiraIssueLinkEdge = {
    __typename?: 'JiraIssueLinkEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraIssueLink>;
};
/** Represents linked issues field on a Jira Issue. */
export declare type JiraIssueLinkField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraIssueLinkField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /**
     * Paginated list of issue links available on the issue. TODO: Change name to issueLinks once the above array is removed.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    issueLinkConnection?: Maybe<JiraIssueLinkConnection>;
    /**
     * Represents the different issue link type relations/desc which can be mapped/linked to the issue in context.
     * Issue in context is the one which is being created/ which is being queried.
     */
    issueLinkTypeRelations?: Maybe<JiraIssueLinkTypeRelationConnection>;
    /** Represents all the issue links defined on a Jira Issue. Should be deprecated and replaced with issueLinksConnection. */
    issueLinks?: Maybe<Array<Maybe<JiraIssueLink>>>;
    /** Paginated list of issues which can be related/linked with above issueLinkTypeRelations. */
    issues?: Maybe<JiraIssueConnection>;
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search url to list all available issues which can be related/linked with above issueLinkTypeRelations. */
    searchUrl?: Maybe<Scalars['String']>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents linked issues field on a Jira Issue. */
export declare type JiraIssueLinkFieldIssueLinkConnectionArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
/** Represents linked issues field on a Jira Issue. */
export declare type JiraIssueLinkFieldIssueLinkTypeRelationsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
/** Represents linked issues field on a Jira Issue. */
export declare type JiraIssueLinkFieldIssuesArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
export declare type JiraIssueLinkTypeRelation = Node & {
    __typename?: 'JiraIssueLinkTypeRelation';
    /** Represents the direction of issue link type. For example: INWARD, OUTWARD */
    direction?: Maybe<JiraIssueLinkDirection>;
    /** Global identifier for the Issue Link Type Relation. */
    id: Scalars['ID'];
    /** Represents the IssueLinkType id to which this type belongs to. */
    linkTypeId: Scalars['Long'];
    /** Display name of IssueLinkType to which this relation belongs to. For example: Blocks, Duplicate, Cloners */
    linkTypeName?: Maybe<Scalars['String']>;
    /**
     * Represents the description of the relation by which this link is identified.
     * This can be the inward or outward description of an IssueLinkType.
     * For example: blocks, is blocked by, duplicates, is duplicated by, clones, is cloned by.
     */
    relationName?: Maybe<Scalars['String']>;
};
/** The connection type for JiraIssueLinkTypeRelation. */
export declare type JiraIssueLinkTypeRelationConnection = {
    __typename?: 'JiraIssueLinkTypeRelationConnection';
    /** The data for Edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraIssueLinkTypeRelationEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** The total number of JiraIssueLinkTypeRelation matching the criteria. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraIssueLinkType connection. */
export declare type JiraIssueLinkTypeRelationEdge = {
    __typename?: 'JiraIssueLinkTypeRelationEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraIssueLinkTypeRelation>;
};
/** Summary of the Pull Requests attached to the issue */
export declare type JiraIssuePullRequestDevSummary = {
    __typename?: 'JiraIssuePullRequestDevSummary';
    /** Total number of Pull Requests for the issue */
    count?: Maybe<Scalars['Int']>;
    /** Date at which this summary was last updated */
    lastUpdated?: Maybe<Scalars['DateTime']>;
    /** Whether the Pull Requests for the given state are open or not */
    open?: Maybe<Scalars['Boolean']>;
    /** State of the Pull Requests in the summary */
    state?: Maybe<JiraPullRequestState>;
    /** Number of Pull Requests for the state */
    stateCount?: Maybe<Scalars['Int']>;
};
/** Container for the summary of the Pull Requests attached to the issue */
export declare type JiraIssuePullRequestDevSummaryContainer = {
    __typename?: 'JiraIssuePullRequestDevSummaryContainer';
    /** The actual summary of the Pull Requests attached to the issue */
    overall?: Maybe<JiraIssuePullRequestDevSummary>;
    /** Count of Pull Requests aggregated per provider */
    summaryByProvider?: Maybe<Array<JiraIssueDevSummaryByProvider>>;
};
/** Represents issue restriction field on an issue for next gen projects. */
export declare type JiraIssueRestrictionField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraIssueRestrictionField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /**
     * Paginated list of roles available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    roles?: Maybe<JiraRoleConnection>;
    /** Search URL to fetch all the roles options for the fields on an issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** The roles available on the Issue or default roles configured for the field. */
    selectedRoles?: Maybe<Array<Maybe<JiraRole>>>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents issue restriction field on an issue for next gen projects. */
export declare type JiraIssueRestrictionFieldRolesArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
/** Summary of the Reviews attached to the issue */
export declare type JiraIssueReviewDevSummary = {
    __typename?: 'JiraIssueReviewDevSummary';
    /** Total number of Reviews for the issue */
    count?: Maybe<Scalars['Int']>;
    /** Date at which this summary was last updated */
    lastUpdated?: Maybe<Scalars['DateTime']>;
    /** State of the Reviews in the summary */
    state?: Maybe<JiraReviewState>;
    /** Number of Reviews for the state */
    stateCount?: Maybe<Scalars['Int']>;
};
/** Container for the summary of the Reviews attached to the issue */
export declare type JiraIssueReviewDevSummaryContainer = {
    __typename?: 'JiraIssueReviewDevSummaryContainer';
    /** The actual summary of the Reviews attached to the issue */
    overall?: Maybe<JiraIssueReviewDevSummary>;
    /** Count of Reviews aggregated per provider */
    summaryByProvider?: Maybe<Array<JiraIssueDevSummaryByProvider>>;
};
export declare type JiraIssueType = Node & {
    __typename?: 'JiraIssueType';
    avatar?: Maybe<JiraAvatar>;
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    name: Scalars['String'];
};
/**  Copied over from jira-project, will extend this type after deprecating rest bridge project */
export declare type JiraIssueTypeConnection = {
    __typename?: 'JiraIssueTypeConnection';
    /** A list of edges. */
    edges?: Maybe<Array<Maybe<JiraIssueTypeEdge>>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};
export declare type JiraIssueTypeEdge = {
    __typename?: 'JiraIssueTypeEdge';
    /** A cursor for use in pagination */
    cursor: Scalars['String'];
    /** The item at the end of the edge */
    node?: Maybe<JiraIssueType>;
};
/** Represents an issue type field on a Jira Issue. */
export declare type JiraIssueTypeField = JiraIssueField & JiraIssueFieldConfiguration & {
    __typename?: 'JiraIssueTypeField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /**
     * "
     * The issue type available on the Issue or default issue type configured for the field.
     */
    issueType?: Maybe<JiraIssueType>;
    /**
     * List of issuetype options available to be selected for the field.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    issueTypes?: Maybe<JiraIssueTypeConnection>;
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Field type key. */
    type: Scalars['String'];
};
/** Represents an issue type field on a Jira Issue. */
export declare type JiraIssueTypeFieldIssueTypesArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
    suggested?: Maybe<Scalars['Boolean']>;
};
/**
 * The autocomplete types available for Jira fields in the context of the Jira Query Language.
 *
 * This enum also describes which fields have field-value support from this schema.
 */
export declare enum JiraJqlAutocompleteType {
    /** The Jira component field JQL autocomplete type. */
    Component = "COMPONENT",
    /** The Jira group field JQL autocomplete type. */
    Group = "GROUP",
    /** The Jira issue field JQL autocomplete type. */
    Issue = "ISSUE",
    /** The Jira issue field type JQL autocomplete type. */
    Issuetype = "ISSUETYPE",
    /** No autocomplete support. */
    None = "NONE",
    /** The Jira priority field JQL autocomplete type. */
    Priority = "PRIORITY",
    /** The Jira project field JQL autocomplete type. */
    Project = "PROJECT",
    /** The Jira sprint field JQL autocomplete type. */
    Sprint = "SPRINT",
    /** The Jira status field JQL autocomplete type. */
    Status = "STATUS",
    /** The Jira status category field JQL autocomplete type. */
    Statuscategory = "STATUSCATEGORY",
    /** The Jira user field JQL autocomplete type. */
    User = "USER",
    /** The Jira version field JQL autocomplete type. */
    Version = "VERSION"
}
/**
 * Encapsulates queries and fields necessary to power the JQL builder.
 *
 * It also exposes generic JQL capabilities that can be leveraged to power other experiences.
 */
export declare type JiraJqlBuilder = {
    __typename?: 'JiraJqlBuilder';
    /** Retrieves the field-values for the Jira cascading options field. */
    cascadingSelectOptions?: Maybe<JiraJqlOptionFieldValueConnection>;
    /**
     * Retrieves a connection of field-values for a specified Jira Field.
     *
     * E.g. A given Jira checkbox field may have the following field-values: `Option 1`, `Option 2` and `Option 3`.
     */
    fieldValues?: Maybe<JiraJqlFieldValueConnection>;
    /**
     * Retrieves a connection of searchable Jira JQL fields.
     *
     * In a given JQL, fields will precede operators and operators precede field-values/ functions.
     *
     * E.g. `${FIELD} ${OPERATOR} ${FUNCTION}()` => `Assignee = currentUser()`
     */
    fields?: Maybe<JiraJqlFieldConnectionResult>;
    /** A list of available JQL functions. */
    functions: Array<JiraJqlFunction>;
    /** Hydrates the JQL fields and field-values of a given JQL query. */
    hydrateJqlQuery?: Maybe<JiraJqlHydratedQueryResult>;
    /**
     * Hydrates the JQL fields and field-values of a filter corresponding to the provided filter ID.
     *
     * The id provided MUST be in ARI format.
     *
     * This query will error if the id parameter is not in ARI format, does not pass validation or does not correspond to a JiraFilter.
     */
    hydrateJqlQueryForFilter?: Maybe<JiraJqlHydratedQueryResult>;
    /** Retrieves the field-values for the Jira issueType field. */
    issueTypes?: Maybe<JiraJqlIssueTypes>;
    /**
     * The last used JQL builder search mode.
     *
     * This can either be the Basic or JQL search mode.
     */
    lastUsedMode?: Maybe<JiraJqlBuilderMode>;
    /** Retrieves a connection of Jira fields recently used in JQL searches. */
    recentFields?: Maybe<JiraJqlFieldConnectionResult>;
    /** Retrieves a connection of projects that have recently been viewed by the current user. */
    recentlyUsedProjects?: Maybe<JiraJqlProjectFieldValueConnection>;
    /** Retrieves a connection of sprints that have recently been viewed by the current user. */
    recentlyUsedSprints?: Maybe<JiraJqlSprintFieldValueConnection>;
    /** Retrieves a connection of users recently used in Jira user fields. */
    recentlyUsedUsers?: Maybe<JiraJqlUserFieldValueConnection>;
    /**
     * Retrieves a connection of suggested groups.
     *
     * Groups are suggested when the current user is a member.
     */
    suggestedGroups?: Maybe<JiraJqlGroupFieldValueConnection>;
    /** Retrieves the field-values for the Jira version field. */
    versions?: Maybe<JiraJqlVersions>;
};
/**
 * Encapsulates queries and fields necessary to power the JQL builder.
 *
 * It also exposes generic JQL capabilities that can be leveraged to power other experiences.
 */
export declare type JiraJqlBuilderCascadingSelectOptionsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    filter: JiraCascadingSelectOptionsFilter;
    first?: Maybe<Scalars['Int']>;
    jqlContext?: Maybe<Scalars['String']>;
    jqlTerm: Scalars['String'];
    last?: Maybe<Scalars['Int']>;
    searchString?: Maybe<Scalars['String']>;
};
/**
 * Encapsulates queries and fields necessary to power the JQL builder.
 *
 * It also exposes generic JQL capabilities that can be leveraged to power other experiences.
 */
export declare type JiraJqlBuilderFieldValuesArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    jqlContext?: Maybe<Scalars['String']>;
    jqlTerm: Scalars['String'];
    searchString?: Maybe<Scalars['String']>;
};
/**
 * Encapsulates queries and fields necessary to power the JQL builder.
 *
 * It also exposes generic JQL capabilities that can be leveraged to power other experiences.
 */
export declare type JiraJqlBuilderFieldsArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    forClause?: Maybe<JiraJqlClauseType>;
    jqlContext?: Maybe<Scalars['String']>;
    searchString?: Maybe<Scalars['String']>;
};
/**
 * Encapsulates queries and fields necessary to power the JQL builder.
 *
 * It also exposes generic JQL capabilities that can be leveraged to power other experiences.
 */
export declare type JiraJqlBuilderHydrateJqlQueryArgs = {
    query?: Maybe<Scalars['String']>;
};
/**
 * Encapsulates queries and fields necessary to power the JQL builder.
 *
 * It also exposes generic JQL capabilities that can be leveraged to power other experiences.
 */
export declare type JiraJqlBuilderHydrateJqlQueryForFilterArgs = {
    id: Scalars['ID'];
};
/**
 * Encapsulates queries and fields necessary to power the JQL builder.
 *
 * It also exposes generic JQL capabilities that can be leveraged to power other experiences.
 */
export declare type JiraJqlBuilderIssueTypesArgs = {
    jqlContext?: Maybe<Scalars['String']>;
};
/**
 * Encapsulates queries and fields necessary to power the JQL builder.
 *
 * It also exposes generic JQL capabilities that can be leveraged to power other experiences.
 */
export declare type JiraJqlBuilderRecentFieldsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    forClause?: Maybe<JiraJqlClauseType>;
    jqlContext?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
};
/**
 * Encapsulates queries and fields necessary to power the JQL builder.
 *
 * It also exposes generic JQL capabilities that can be leveraged to power other experiences.
 */
export declare type JiraJqlBuilderRecentlyUsedProjectsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
/**
 * Encapsulates queries and fields necessary to power the JQL builder.
 *
 * It also exposes generic JQL capabilities that can be leveraged to power other experiences.
 */
export declare type JiraJqlBuilderRecentlyUsedSprintsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    jqlContext?: Maybe<Scalars['String']>;
    last?: Maybe<Scalars['Int']>;
};
/**
 * Encapsulates queries and fields necessary to power the JQL builder.
 *
 * It also exposes generic JQL capabilities that can be leveraged to power other experiences.
 */
export declare type JiraJqlBuilderRecentlyUsedUsersArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
/**
 * Encapsulates queries and fields necessary to power the JQL builder.
 *
 * It also exposes generic JQL capabilities that can be leveraged to power other experiences.
 */
export declare type JiraJqlBuilderSuggestedGroupsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
/**
 * Encapsulates queries and fields necessary to power the JQL builder.
 *
 * It also exposes generic JQL capabilities that can be leveraged to power other experiences.
 */
export declare type JiraJqlBuilderVersionsArgs = {
    jqlContext?: Maybe<Scalars['String']>;
    jqlTerm: Scalars['String'];
};
/** The modes the JQL builder can be displayed and used in. */
export declare enum JiraJqlBuilderMode {
    /**
     * The basic mode, allows queries to be built and executed via the JQL basic editor.
     *
     * This mode allows users to easily construct JQL queries by interacting with the UI.
     */
    Basic = "BASIC",
    /**
     * The JQL mode, allows queries to be built and executed via the JQL advanced editor.
     *
     * This mode allows users to manually type and construct complex JQL queries.
     */
    Jql = "JQL"
}
/** Represents a field-value for a JQL cascading option field. */
export declare type JiraJqlCascadingOptionFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlCascadingOptionFieldValue';
    /** The user-friendly name for a cascading option JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira cascading option field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
    /** The Jira JQL parent option associated with this JQL field value. */
    parentOption?: Maybe<JiraJqlOptionFieldValue>;
};
/** The types of JQL clauses supported by Jira. */
export declare enum JiraJqlClauseType {
    /** This denotes both WHERE and ORDER_BY. */
    Any = "ANY",
    /** This corresponds to fields used to sort Jira Issues. */
    OrderBy = "ORDER_BY",
    /** This corresponds to jql fields used as filter criteria of Jira issues. */
    Where = "WHERE"
}
/** Represents a field-value for a JQL component field. */
export declare type JiraJqlComponentFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlComponentFieldValue';
    /** The user-friendly name for a component JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira component field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
};
/** The representation of a Jira field within the context of the Jira Query Language. */
export declare type JiraJqlField = {
    __typename?: 'JiraJqlField';
    /** The JQL clause types that can be used with this field. */
    allowedClauseTypes: Array<JiraJqlClauseType>;
    /** Defines how the field-values should be shown for a field in the JQL-Builder's JQL mode. */
    autoCompleteTemplate?: Maybe<JiraJqlAutocompleteType>;
    /**
     * The data types handled by the current field.
     * These can be used to identify which JQL functions are supported.
     */
    dataTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
    /** The user-friendly name for the current field, to be displayed in the UI. */
    displayName?: Maybe<Scalars['String']>;
    /**
     * The field-type of the current field.
     * E.g. `Short Text`, `Number`, `Version Picker`, `Team` etc.
     * Important note: This information only exists for collapsed fields.
     */
    jqlFieldType?: Maybe<JiraJqlFieldType>;
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira JQL field.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['ID'];
    /** The JQL operators that can be used with this field. */
    operators: Array<JiraJqlOperator>;
    /** Defines how a field should be represented in the basic search mode of the JQL builder. */
    searchTemplate?: Maybe<JiraJqlSearchTemplate>;
    /** Determines whether or not the current field should be accessible in the current search context. */
    shouldShowInContext?: Maybe<Scalars['Boolean']>;
};
/** Represents a connection of Jira JQL fields. */
export declare type JiraJqlFieldConnection = {
    __typename?: 'JiraJqlFieldConnection';
    /** The data for the edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraJqlFieldEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** The total number of JiraJqlFields matching the criteria. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** A union of a Jira JQL field connection and a GraphQL query error. */
export declare type JiraJqlFieldConnectionResult = JiraJqlFieldConnection | QueryError;
/** Represents a Jira JQL field edge. */
export declare type JiraJqlFieldEdge = {
    __typename?: 'JiraJqlFieldEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraJqlField>;
};
/**
 * The representation of a Jira JQL field-type in the context of the Jira Query Language.
 *
 * E.g. `Short Text`, `Number`, `Version Picker`, `Team` etc.
 *
 * Important note: This information only exists for collapsed fields.
 */
export declare type JiraJqlFieldType = {
    __typename?: 'JiraJqlFieldType';
    /** The translated name of the field type. */
    displayName: Scalars['String'];
    /** The non-translated name of the field type. */
    jqlTerm: Scalars['String'];
};
/** A generic interface for JQL fields in Jira. */
export declare type JiraJqlFieldValue = {
    /** The user-friendly name for a component JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira JQL field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
};
/** Represents a connection of field-values for a JQL field. */
export declare type JiraJqlFieldValueConnection = {
    __typename?: 'JiraJqlFieldValueConnection';
    /** The data for the edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraJqlFieldValueEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** The total number of JiraJqlFieldValues matching the criteria. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** Represents a field-value edge for a JQL field. */
export declare type JiraJqlFieldValueEdge = {
    __typename?: 'JiraJqlFieldValueEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraJqlFieldValue>;
};
/**
 * A function in JQL appears as a word followed by parentheses, which may contain one or more explicit values or Jira fields.
 *
 * In a clause, a function is preceded by an operator, which in turn is preceded by a field.
 *
 * A function performs a calculation on either specific Jira data or the function's content in parentheses,
 * such that only true results are retrieved by the function, and then again by the clause in which the function is used.
 *
 * E.g. `approved()`, `currentUser()`, `endOfMonth()` etc.
 */
export declare type JiraJqlFunction = {
    __typename?: 'JiraJqlFunction';
    /**
     * The data types that this function handles and creates values for.
     *
     * This allows consumers to infer information on the JiraJqlField type such as which functions are supported.
     */
    dataTypes: Array<Scalars['String']>;
    /** The user-friendly name for the function, to be displayed in the UI. */
    displayName?: Maybe<Scalars['String']>;
    /**
     * Indicates whether or not the function is meant to be used with IN or NOT IN operators, that is,
     * if the function should be viewed as returning a list.
     *
     * The method should return false when it is to be used with the other relational operators (e.g. =, !=, <, >, ...)
     * that only work with single values.
     */
    isList?: Maybe<Scalars['Boolean']>;
    /** A JQL-function safe encoded name. This value will not be encoded if the displayName is already safe. */
    value?: Maybe<Scalars['String']>;
};
/** Represents a field-value for a JQL group field. */
export declare type JiraJqlGroupFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlGroupFieldValue';
    /** The user-friendly name for a group JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /** The Jira group associated with this JQL field value. */
    group: JiraGroup;
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira group field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it into a query (e.g. wrap it in "" )
     */
    jqlTerm: Scalars['String'];
};
/** Represents a connection of field-values for a JQL group field. */
export declare type JiraJqlGroupFieldValueConnection = {
    __typename?: 'JiraJqlGroupFieldValueConnection';
    /** The data for the edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraJqlGroupFieldValueEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** The total number of JiraJqlGroupFieldValues matching the criteria. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** Represents a field-value edge for a JQL group field. */
export declare type JiraJqlGroupFieldValueEdge = {
    __typename?: 'JiraJqlGroupFieldValueEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraJqlGroupFieldValue>;
};
/** Represents a JQL query with hydrated fields and field-values. */
export declare type JiraJqlHydratedQuery = {
    __typename?: 'JiraJqlHydratedQuery';
    /** A list of hydrated fields from the provided JQL. */
    fields: Array<JiraJqlQueryHydratedFieldResult>;
    /** The JQL query to be hydrated. */
    jql?: Maybe<Scalars['String']>;
};
/** A union of a Jira JQL hydrated query and a GraphQL query error. */
export declare type JiraJqlHydratedQueryResult = JiraJqlHydratedQuery | QueryError;
/** Represents a field-value for a JQL Issue field. */
export declare type JiraJqlIssueFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlIssueFieldValue';
    /** The user-friendly name for an issue JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /** The Jira issue associated with this JQL field value. */
    issue: JiraIssue;
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
};
/** Represents a field-value for a JQL issue type field. */
export declare type JiraJqlIssueTypeFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlIssueTypeFieldValue';
    /** The user-friendly name for an issue type JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /** The Jira issue types associated with this JQL field value. */
    issueTypes: Array<JiraIssueType>;
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira issue type field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
};
/** Represents a connection of field-values for a JQL issue type field. */
export declare type JiraJqlIssueTypeFieldValueConnection = {
    __typename?: 'JiraJqlIssueTypeFieldValueConnection';
    /** The data for the edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraJqlIssueTypeFieldValueEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** The total number of JiraJqlIssueTypeFieldValues matching the criteria */
    totalCount?: Maybe<Scalars['Int']>;
};
/** Represents a field-value edge for a JQL issue type field. */
export declare type JiraJqlIssueTypeFieldValueEdge = {
    __typename?: 'JiraJqlIssueTypeFieldValueEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraJqlIssueTypeFieldValue>;
};
/** A variation of the fieldValues query for retrieving specifically Jira issue type field-values. */
export declare type JiraJqlIssueTypes = {
    __typename?: 'JiraJqlIssueTypes';
    /**
     * Retrieves top-level issue types that encapsulate all others.
     *
     * E.g. The `Epic` issue type in company-managed projects.
     */
    aboveBaseLevel?: Maybe<JiraJqlIssueTypeFieldValueConnection>;
    /**
     * Retrieves mid-level issue types.
     *
     * E.g. The `Bug`, `Story` and `Task` issue type in company-managed projects.
     */
    baseLevel?: Maybe<JiraJqlIssueTypeFieldValueConnection>;
    /**
     * Retrieves the lowest level issue types.
     *
     * E.g. The `Subtask` issue type in company-managed projects.
     */
    belowBaseLevel?: Maybe<JiraJqlIssueTypeFieldValueConnection>;
};
/** A variation of the fieldValues query for retrieving specifically Jira issue type field-values. */
export declare type JiraJqlIssueTypesAboveBaseLevelArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
/** A variation of the fieldValues query for retrieving specifically Jira issue type field-values. */
export declare type JiraJqlIssueTypesBaseLevelArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
/** A variation of the fieldValues query for retrieving specifically Jira issue type field-values. */
export declare type JiraJqlIssueTypesBelowBaseLevelArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
/** Represents a field-value for a JQL label field. */
export declare type JiraJqlLabelFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlLabelFieldValue';
    /** The user-friendly name for a label JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira label field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
    /** The Jira label associated with this JQL field value. */
    label?: Maybe<JiraLabel>;
};
/**
 * The types of JQL operators supported by Jira.
 *
 * An operator in JQL is one or more symbols or words,which compares the value of a field on its left with one or more values (or functions) on its right,
 * such that only true results are retrieved by the clause.
 *
 * For more information on JQL operators please visit: https://support.atlassian.com/jira-software-cloud/docs/advanced-search-reference-jql-operators.
 */
export declare enum JiraJqlOperator {
    /** The `CHANGED` operator is used to find issues that have a value that had changed for the specified field. */
    Changed = "CHANGED",
    /** The `CHANGED` operator is used to find issues that have a value that had changed for the specified field. */
    Contains = "CONTAINS",
    /** The `=` operator is used to search for issues where the value of the specified field exactly matches the specified value. */
    Equals = "EQUALS",
    /** The `>` operator is used to search for issues where the value of the specified field is greater than the specified value. */
    GreaterThan = "GREATER_THAN",
    /** The `>=` operator is used to search for issues where the value of the specified field is greater than or equal to the specified value. */
    GreaterThanOrEqual = "GREATER_THAN_OR_EQUAL",
    /** The `IN` operator is used to search for issues where the value of the specified field is one of multiple specified values. */
    In = "IN",
    /** The `IS` operator can only be used with EMPTY or NULL. That is, it is used to search for issues where the specified field has no value. */
    Is = "IS",
    /** The `IS NOT` operator can only be used with EMPTY or NULL. That is, it is used to search for issues where the specified field has a value. */
    IsNot = "IS_NOT",
    /** The `<` operator is used to search for issues where the value of the specified field is less than the specified value. */
    LessThan = "LESS_THAN",
    /** The `<=` operator is used to search for issues where the value of the specified field is less than or equal to than the specified value. */
    LessThanOrEqual = "LESS_THAN_OR_EQUAL",
    /** The `!~` operator is used to search for issues where the value of the specified field is not a "fuzzy" match for the specified value. */
    NotContains = "NOT_CONTAINS",
    /** The `!=` operator is used to search for issues where the value of the specified field does not match the specified value. */
    NotEquals = "NOT_EQUALS",
    /** The `NOT IN` operator is used to search for issues where the value of the specified field is not one of multiple specified values. */
    NotIn = "NOT_IN",
    /** The `WAS` operator is used to find issues that currently have or previously had the specified value for the specified field. */
    Was = "WAS",
    /** The `WAS IN` operator is used to find issues that currently have or previously had any of multiple specified values for the specified field. */
    WasIn = "WAS_IN",
    /** The `WAS NOT` operator is used to find issues that have never had the specified value for the specified field. */
    WasNot = "WAS_NOT",
    /** The `WAS NOT IN` operator is used to search for issues where the value of the specified field has never been one of multiple specified values. */
    WasNotIn = "WAS_NOT_IN"
}
/** Represents a field-value for a JQL option field. */
export declare type JiraJqlOptionFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlOptionFieldValue';
    /** The user-friendly name for an option JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira option field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
};
/** Represents a connection of field-values for a JQL option field. */
export declare type JiraJqlOptionFieldValueConnection = {
    __typename?: 'JiraJqlOptionFieldValueConnection';
    /** The data for the edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraJqlOptionFieldValueEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** The total number of JiraJqlOptionFieldValues matching the criteria. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** Represents a field-value edge for a JQL option field. */
export declare type JiraJqlOptionFieldValueEdge = {
    __typename?: 'JiraJqlOptionFieldValueEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraJqlOptionFieldValue>;
};
/** Represents a field-value for a JQL priority field. */
export declare type JiraJqlPriorityFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlPriorityFieldValue';
    /** The user-friendly name for a priority JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira priority field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
    /** The Jira property associated with this JQL field value. */
    priority: JiraPriority;
};
/** Represents a field-value for a JQL project field. */
export declare type JiraJqlProjectFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlProjectFieldValue';
    /** The user-friendly name for a project JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira project field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
    /** The Jira project associated with this JQL field value. */
    project: JiraProject;
};
/** Represents a connection of field-values for a JQL project field. */
export declare type JiraJqlProjectFieldValueConnection = {
    __typename?: 'JiraJqlProjectFieldValueConnection';
    /** The data for the edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraJqlProjectFieldValueEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** The total number of JiraJqlProjectFieldValues matching the criteria. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** Represents a field-value edge for a JQL project field. */
export declare type JiraJqlProjectFieldValueEdge = {
    __typename?: 'JiraJqlProjectFieldValueEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraJqlProjectFieldValue>;
};
/** Represents an error for a JQL query hydration. */
export declare type JiraJqlQueryHydratedError = {
    __typename?: 'JiraJqlQueryHydratedError';
    /** The error that occurred whilst hydrating the Jira JQL field. */
    error?: Maybe<QueryError>;
    /** An identifier for the hydrated Jira JQL field where the error occurred. */
    jqlTerm: Scalars['String'];
};
/** Represents a hydrated field for a JQL query. */
export declare type JiraJqlQueryHydratedField = {
    __typename?: 'JiraJqlQueryHydratedField';
    /** The Jira JQL field associated with the hydrated field. */
    field: JiraJqlField;
    /** An identifier for the hydrated Jira JQL field. */
    jqlTerm: Scalars['String'];
    /** The hydrated value results. */
    values: Array<Maybe<JiraJqlQueryHydratedValueResult>>;
};
/** A union of a JQL query hydrated field and a GraphQL query error. */
export declare type JiraJqlQueryHydratedFieldResult = JiraJqlQueryHydratedError | JiraJqlQueryHydratedField;
/** Represents a hydrated field-value for a given field in the JQL query. */
export declare type JiraJqlQueryHydratedValue = {
    __typename?: 'JiraJqlQueryHydratedValue';
    /** An identifier for the hydrated Jira JQL field value. */
    jqlTerm: Scalars['String'];
    /** The hydrated field values. */
    values: Array<Maybe<JiraJqlFieldValue>>;
};
/** A union of a JQL query hydrated field-value and a GraphQL query error. */
export declare type JiraJqlQueryHydratedValueResult = JiraJqlQueryHydratedError | JiraJqlQueryHydratedValue;
/** Represents a field-value for a JQL resolution field. */
export declare type JiraJqlResolutionFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlResolutionFieldValue';
    /** The user-friendly name for a resolution JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira resolution field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
    /** The Jira resolution associated with this JQL field value. */
    resolution?: Maybe<JiraResolution>;
};
/** The representation of a Jira field in the basic search mode of the JQL builder. */
export declare type JiraJqlSearchTemplate = {
    __typename?: 'JiraJqlSearchTemplate';
    key?: Maybe<Scalars['String']>;
};
/** Represents a field-value for a JQL sprint field. */
export declare type JiraJqlSprintFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlSprintFieldValue';
    /** The user-friendly name for a sprint JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira sprint field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
    /** The Jira sprint associated with this JQL field value. */
    sprint: JiraSprint;
};
/** Represents a connection of field-values for a JQL sprint field. */
export declare type JiraJqlSprintFieldValueConnection = {
    __typename?: 'JiraJqlSprintFieldValueConnection';
    /** The data for the edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraJqlSprintFieldValueEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** The total number of JiraJqlSprintFieldValues matching the criteria */
    totalCount?: Maybe<Scalars['Int']>;
};
/** Represents a field-value edge for a JQL sprint field. */
export declare type JiraJqlSprintFieldValueEdge = {
    __typename?: 'JiraJqlSprintFieldValueEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraJqlSprintFieldValue>;
};
/** Represents a field-value for a JQL status category field. */
export declare type JiraJqlStatusCategoryFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlStatusCategoryFieldValue';
    /** The user-friendly name for a status category JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira status category field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
    /** The Jira status category associated with this JQL field value. */
    statusCategory: JiraStatusCategory;
};
/** Represents a field-value for a JQL status field. */
export declare type JiraJqlStatusFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlStatusFieldValue';
    /** The user-friendly name for a status JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira status field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
    /** The Jira status category associated with this JQL field value. */
    statusCategory: JiraStatusCategory;
};
/** Represents a field-value for a JQL user field. */
export declare type JiraJqlUserFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlUserFieldValue';
    /** The user-friendly name for a user JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira user field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
    /** The user associated with this JQL field value. */
    user: User;
};
/** Represents a connection of field-values for a JQL user field. */
export declare type JiraJqlUserFieldValueConnection = {
    __typename?: 'JiraJqlUserFieldValueConnection';
    /** The data for the edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraJqlUserFieldValueEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** The total number of JiraJqlUserFieldValues matching the criteria. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** Represents a field-value edge for a JQL user field. */
export declare type JiraJqlUserFieldValueEdge = {
    __typename?: 'JiraJqlUserFieldValueEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraJqlUserFieldValue>;
};
/** Represents a field-value for a JQL version field. */
export declare type JiraJqlVersionFieldValue = JiraJqlFieldValue & {
    __typename?: 'JiraJqlVersionFieldValue';
    /** The user-friendly name for a version JQL field value, to be displayed in the UI. */
    displayName: Scalars['String'];
    /**
     * An identifier that a client should use in a JQL query when it’s referring to a Jira version field-value.
     *
     * Important note: this jqlTerm could require proper escaping before placing it  into a query (e.g. wrap it in "" ).
     */
    jqlTerm: Scalars['String'];
};
/** Represents a connection of field-values for a JQL version field. */
export declare type JiraJqlVersionFieldValueConnection = {
    __typename?: 'JiraJqlVersionFieldValueConnection';
    /** The data for the edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraJqlVersionFieldValueEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** The total number of JiraJqlVersionFieldValues matching the criteria. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** Represents a field-value edge for a JQL version field. */
export declare type JiraJqlVersionFieldValueEdge = {
    __typename?: 'JiraJqlVersionFieldValueEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraJqlVersionFieldValue>;
};
/**
 * A variation of the fieldValues query for retrieving specifically Jira version field-values.
 *
 * This type provides the capability to retrieve connections of released, unreleased and archived versions.
 *
 * Important note: that released and unreleased versions can be archived and vice versa.
 */
export declare type JiraJqlVersions = {
    __typename?: 'JiraJqlVersions';
    /** Retrieves a connection of archived versions. */
    archived?: Maybe<JiraJqlVersionFieldValueConnection>;
    /** Retrieves a connection of released versions. */
    released?: Maybe<JiraJqlVersionFieldValueConnection>;
    /** Retrieves a connection of unreleased versions. */
    unreleased?: Maybe<JiraJqlVersionFieldValueConnection>;
};
/**
 * A variation of the fieldValues query for retrieving specifically Jira version field-values.
 *
 * This type provides the capability to retrieve connections of released, unreleased and archived versions.
 *
 * Important note: that released and unreleased versions can be archived and vice versa.
 */
export declare type JiraJqlVersionsArchivedArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
/**
 * A variation of the fieldValues query for retrieving specifically Jira version field-values.
 *
 * This type provides the capability to retrieve connections of released, unreleased and archived versions.
 *
 * Important note: that released and unreleased versions can be archived and vice versa.
 */
export declare type JiraJqlVersionsReleasedArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    includeArchived?: Maybe<Scalars['Boolean']>;
    last?: Maybe<Scalars['Int']>;
};
/**
 * A variation of the fieldValues query for retrieving specifically Jira version field-values.
 *
 * This type provides the capability to retrieve connections of released, unreleased and archived versions.
 *
 * Important note: that released and unreleased versions can be archived and vice versa.
 */
export declare type JiraJqlVersionsUnreleasedArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    includeArchived?: Maybe<Scalars['Boolean']>;
    last?: Maybe<Scalars['Int']>;
};
/** Represents the label of a custom label field. */
export declare type JiraLabel = {
    __typename?: 'JiraLabel';
    /**
     * The identifier of the label.
     * Can be null when label is not yet created or label was returned without providing an Issue id.
     */
    labelId?: Maybe<Scalars['ID']>;
    /** The name of the label. */
    name?: Maybe<Scalars['String']>;
};
/** The connection type for JiraLabel. */
export declare type JiraLabelConnection = {
    __typename?: 'JiraLabelConnection';
    /** The data for Edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraLabelEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a Jiralabel connection. */
export declare type JiraLabelEdge = {
    __typename?: 'JiraLabelEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraLabel>;
};
/** Represents a labels field on a Jira Issue. Both system & custom field can be represented by this type. */
export declare type JiraLabelsField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraLabelsField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /**
     * Paginated list of label options for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    labels?: Maybe<JiraLabelConnection>;
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search url to fetch all available label options on a field or an Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** The labels available on the Issue or default labels configured for the field. */
    selectedLabels?: Maybe<Array<Maybe<JiraLabel>>>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a labels field on a Jira Issue. Both system & custom field can be represented by this type. */
export declare type JiraLabelsFieldLabelsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
    suggested?: Maybe<Scalars['Boolean']>;
};
/** Represents a media context used for file uploads. */
export declare type JiraMediaContext = {
    __typename?: 'JiraMediaContext';
    /** Contains the token information for uploading a media content. */
    uploadToken?: Maybe<JiraMediaUploadTokenResult>;
};
/** Contains the information needed for uploading a media content in jira on issue create/view screens. */
export declare type JiraMediaUploadToken = {
    __typename?: 'JiraMediaUploadToken';
    /** Registered client id of media API. */
    clientId?: Maybe<Scalars['String']>;
    /** Endpoint where the media content will be uploaded. */
    endpointUrl?: Maybe<Scalars['URL']>;
    /**
     * The collection in which to put the new files.
     * It can be user-scoped (such as upload-user-collection-*)
     * or project scoped (such as upload-project-*).
     */
    targetCollection?: Maybe<Scalars['String']>;
    /** token string value which can be used with Media API requests. */
    token?: Maybe<Scalars['String']>;
    /** Represents the duration (in minutes) for which token will be valid. */
    tokenDurationInMin?: Maybe<Scalars['Int']>;
};
/** Contains either the successful fetched media token information or an error. */
export declare type JiraMediaUploadTokenResult = JiraMediaUploadToken | QueryError;
/** Represents a multiple group picker field on a Jira Issue. */
export declare type JiraMultipleGroupPickerField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraMultipleGroupPickerField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /**
     * Paginated list of group options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    groups?: Maybe<JiraGroupConnection>;
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search URL to fetch all group pickers of the field on a Jira Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** Value or default values configured for the field or values available on the issue. */
    selectedGroups?: Maybe<Array<Maybe<JiraGroup>>>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a multiple group picker field on a Jira Issue. */
export declare type JiraMultipleGroupPickerFieldGroupsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
/** Represents the multi-select field on a Jira Issue. */
export declare type JiraMultipleSelectField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraMultipleSelectField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /**
     * Paginated list of options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    fieldOptions?: Maybe<JiraOptionConnection>;
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search URL to fetch all the teams options for the field on a Jira Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** The options available on the Issue or default options configured for the field. */
    selectedFieldOptions?: Maybe<Array<Maybe<JiraOption>>>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents the multi-select field on a Jira Issue. */
export declare type JiraMultipleSelectFieldFieldOptionsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
/** Represents a multi select user picker field on a Jira Issue. E.g. custom user picker */
export declare type JiraMultipleSelectUserPickerField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraMultipleSelectUserPickerField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the entity. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search url to fetch all available users options for the field or the Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** The users available on the Issue or default users configured for the field. */
    selectedUsers?: Maybe<Array<Maybe<User>>>;
    /** Field type key of the field. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
    /**
     * Paginated list of user options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    users?: Maybe<JiraUserConnection>;
};
/** Represents a multi select user picker field on a Jira Issue. E.g. custom user picker */
export declare type JiraMultipleSelectUserPickerFieldUsersArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
    suggested?: Maybe<Scalars['Boolean']>;
};
/** Represents a multi version picker field on a Jira Issue. E.g. fixVersions and multi version custom field. */
export declare type JiraMultipleVersionPickerField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraMultipleVersionPickerField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** The versions available on the Issue or default versions configured for the field. */
    selectedVersions?: Maybe<Array<Maybe<JiraVersion>>>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
    /**
     * Paginated list of versions options for the field or on a Jira Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    versions?: Maybe<JiraVersionConnection>;
};
/** Represents a multi version picker field on a Jira Issue. E.g. fixVersions and multi version custom field. */
export declare type JiraMultipleVersionPickerFieldVersionsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
    suggested?: Maybe<Scalars['Boolean']>;
};
export declare type JiraMutation = {
    __typename?: 'JiraMutation';
    /**
     * The mutation operation to add one or more new permission grants to the given permission scheme.
     * The operation takes mandatory permission scheme ID.
     * The limit on the new permission grants can be added is set to 5.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: PermissionScheme` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    addPermissionSchemeGrants?: Maybe<JiraPermissionSchemeAddGrantPayload>;
    /**
     * Container for all DevOps related mutations in Jira
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: JiraDevOps` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    devOps?: Maybe<JiraDevOpsMutation>;
    /**
     * The mutation operation to remove one or more existing permission scheme grants in the given permission scheme.
     * The operation takes mandatory permission scheme ID.
     * The limit on the new permission grants can be removed is set to 5.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: PermissionScheme` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    removePermissionSchemeGrants?: Maybe<JiraPermissionSchemeRemoveGrantPayload>;
};
export declare type JiraMutationAddPermissionSchemeGrantsArgs = {
    input: JiraPermissionSchemeAddGrantInput;
};
export declare type JiraMutationRemovePermissionSchemeGrantsArgs = {
    input: JiraPermissionSchemeRemoveGrantInput;
};
/** Represents a number field on a Jira Issue. E.g. float, story points. */
export declare type JiraNumberField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraNumberField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** The number available on the Issue or default number configured for the field. */
    number?: Maybe<Scalars['Float']>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a single option value in a select operation. */
export declare type JiraOption = Node & {
    __typename?: 'JiraOption';
    /** Global Identifier of the option. */
    id: Scalars['ID'];
    /** Whether or not the option has been disabled by the user. Disabled options are typically not accessible in the UI. */
    isDisabled?: Maybe<Scalars['Boolean']>;
    /** Identifier of the option. */
    optionId: Scalars['Long'];
    /** Value of the option. */
    value?: Maybe<Scalars['String']>;
};
/** The connection type for JiraOption. */
export declare type JiraOptionConnection = {
    __typename?: 'JiraOptionConnection';
    /** The data for Edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraOptionEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraOption connection. */
export declare type JiraOptionEdge = {
    __typename?: 'JiraOptionEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraOption>;
};
/** The response payload for opting out of the Not Connected state in the DevOpsPanel */
export declare type JiraOptoutDevOpsIssuePanelNotConnectedPayload = Payload & {
    __typename?: 'JiraOptoutDevOpsIssuePanelNotConnectedPayload';
    /** The errors field represents additional mutation error information if exists. */
    errors?: Maybe<Array<MutationError>>;
    /** The success indicator saying whether mutation operation was successful as a whole or not. */
    success: Scalars['Boolean'];
};
export declare type JiraOrderDirection = {
    id: Scalars['ID'];
};
/** Represents Parent field on a Jira Issue. E.g. JSW Parent, JPO Parent (to be unified). */
export declare type JiraParentIssueField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraParentIssueField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** The parent available on the Issue or default parent configured for the field. */
    parentIssue?: Maybe<JiraIssue>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a people picker field on a Jira Issue. */
export declare type JiraPeopleField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraPeopleField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Whether the field is configured to act as single/multi select user(s) field. */
    isMulti?: Maybe<Scalars['Boolean']>;
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search url to fetch all available users options for the field or the Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** The people available on the Issue or default people configured for the field. */
    selectedUsers?: Maybe<Array<Maybe<User>>>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
    /**
     * Paginated list of user options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    users?: Maybe<JiraUserConnection>;
};
/** Represents a people picker field on a Jira Issue. */
export declare type JiraPeopleFieldUsersArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
    suggested?: Maybe<Scalars['Boolean']>;
};
/**
 * The JiraPermissionGrantHolder represents an association between project permission information and
 * a bounded list of one or more permission grant.
 * A permission grant holds association between grant type and a paginated list of grant values.
 */
export declare type JiraPermissionGrantHolder = {
    __typename?: 'JiraPermissionGrantHolder';
    /** A bounded list of jira permission grant. */
    grants?: Maybe<Array<JiraPermissionGrants>>;
    /** The basic information about the project permission. */
    permission: JiraProjectPermission;
};
/**
 * The permission grant value represents the actual permission grant value.
 * The id field represent the grant ID and its not an ARI. The value represents actual value information specific to grant type.
 * For example: PROJECT_ROLE grant type value contains project role ID in ARI format and role specific details
 */
export declare type JiraPermissionGrantValue = {
    __typename?: 'JiraPermissionGrantValue';
    /**
     * The ID of the permission grant.
     * It represents the relationship among permission, grant type and grant type specific value.
     */
    id: Scalars['ID'];
    /**
     * The grant type value is an union type.
     * The value itself may resolve to one of the concrete types such as JiraDefaultGrantTypeValue, JiraProjectRoleGrantTypeValue.
     */
    value: JiraGrantTypeValue;
};
/** The type represents a paginated view of permission grant values in the form of connection object. */
export declare type JiraPermissionGrantValueConnection = {
    __typename?: 'JiraPermissionGrantValueConnection';
    /** The data for edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraPermissionGrantValueEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** The total number of items matching the criteria. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** The permission grant edge object used in connection object for representing an edge. */
export declare type JiraPermissionGrantValueEdge = {
    __typename?: 'JiraPermissionGrantValueEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at this edge. */
    node: JiraPermissionGrantValue;
};
/**
 * The JiraPermissionGrants represents an association between grant type information and a bounded list of one or more grant
 * values associated with given grant type.
 * Each grant value has grant type specific information.
 * For example, PROJECT_ROLE grant type value contains project role ID in ARI format and role specific details.
 */
export declare type JiraPermissionGrants = {
    __typename?: 'JiraPermissionGrants';
    /** The grant type information includes key and display name. */
    grantType: JiraGrantTypeKey;
    /** A bounded list of grant values. Each grant value has grant type specific information. */
    grantValues?: Maybe<Array<JiraPermissionGrantValue>>;
};
/**
 * Contains either the group or the projectRole associated with a comment/worklog, but not both.
 * If both are null, then the permission level is unspecified and the comment/worklog is public.
 */
export declare type JiraPermissionLevel = {
    __typename?: 'JiraPermissionLevel';
    /** The Jira Group associated with the comment/worklog. */
    group?: Maybe<JiraGroup>;
    /** The Jira ProjectRole associated with the comment/worklog. */
    role?: Maybe<JiraRole>;
};
/** A permission scheme is a collection of permission grants. */
export declare type JiraPermissionScheme = Node & {
    __typename?: 'JiraPermissionScheme';
    /** The description of the permission scheme. */
    description?: Maybe<Scalars['String']>;
    /** The ARI of the permission scheme. */
    id: Scalars['ID'];
    /** The display name of the permission scheme. */
    name: Scalars['String'];
};
/** The input type to add new permission grants to the given permission scheme. */
export declare type JiraPermissionSchemeAddGrantInput = {
    /** The list of one or more grants to be added. */
    grants: Array<JiraPermissionSchemeGrantInput>;
    /** The permission scheme ID in ARI format. */
    schemeId: Scalars['ID'];
};
/** The response payload for add permission grants mutation operation for a given permission scheme. */
export declare type JiraPermissionSchemeAddGrantPayload = Payload & {
    __typename?: 'JiraPermissionSchemeAddGrantPayload';
    /** The errors field represents additional mutation error information if exists. */
    errors?: Maybe<Array<MutationError>>;
    /** The success indicator saying whether mutation operation was successful as a whole or not. */
    success: Scalars['Boolean'];
};
/**
 * The JiraPermissionSchemeGrantGroup is an association between project permission category information and a bounded list of one or more
 * associated permission grant holder. A grant holder represents project permission information and its associated permission grants.
 */
export declare type JiraPermissionSchemeGrantGroup = {
    __typename?: 'JiraPermissionSchemeGrantGroup';
    /** The basic project permission category information such as key and display name. */
    category: JiraProjectPermissionCategory;
    /** A bounded list of one or more permission grant holders. */
    grantHolders?: Maybe<Array<Maybe<JiraPermissionGrantHolder>>>;
};
/** Specifies permission scheme grant for the combination of permission key, grant type key, and grant type value ARI. */
export declare type JiraPermissionSchemeGrantInput = {
    /** The grant type key such as USER. */
    grantType: JiraGrantTypeKeyEnum;
    /**
     * The grant value in ARI format.
     * For example: project role ID ari is of the format - ari:cloud:jira:a2520569-493f-45bc-807b-54b02bc724d1:role/project-role/activation/bd0c43a9-a23a-4302-8ffa-ca04bde7c747/projectrole/b434089d-7f6d-476b-884b-7811661f91d2
     */
    grantValue: Scalars['ID'];
    /** the project permission key. */
    permissionKey: Scalars['String'];
};
/** The input type to remove permission grants from the given permission scheme. */
export declare type JiraPermissionSchemeRemoveGrantInput = {
    /** The list of one or more grants to be removed. */
    grants: Array<JiraPermissionSchemeGrantInput>;
    /** The permission scheme ID in ARI format. */
    schemeId: Scalars['ID'];
};
/** The response payload for remove existing permission grants mutation operation for a given permission scheme. */
export declare type JiraPermissionSchemeRemoveGrantPayload = Payload & {
    __typename?: 'JiraPermissionSchemeRemoveGrantPayload';
    /** The errors field represents additional mutation error information if exists. */
    errors?: Maybe<Array<MutationError>>;
    /** The success indicator saying whether mutation operation was successful as a whole or not. */
    success: Scalars['Boolean'];
};
/**
 * The JiraPermissionSchemeView represents the composite view to capture basic information of
 * the permission scheme such as id, name, description and a bounded list of one or more grant groups.
 * A grant group contains existing permission grant information such as permission, permission category, grant type and grant type value.
 */
export declare type JiraPermissionSchemeView = {
    __typename?: 'JiraPermissionSchemeView';
    /** The bounded list of one or more grant groups represent each group of permission grants based on project permission category such as PROJECTS, ISSUES. */
    grantGroups?: Maybe<Array<JiraPermissionSchemeGrantGroup>>;
    /** The basic permission scheme information such as id, name and description. */
    scheme: JiraPermissionScheme;
};
/** The union result representing either the composite view of the permission scheme or the query error information. */
export declare type JiraPermissionSchemeViewResult = JiraPermissionSchemeView | QueryError;
/** Represents an issue's priority field */
export declare type JiraPriority = Node & {
    __typename?: 'JiraPriority';
    /** The priority color. */
    color?: Maybe<Scalars['String']>;
    /** The priority icon URL. */
    iconUrl?: Maybe<Scalars['URL']>;
    /** Unique identifier referencing the priority ID. */
    id: Scalars['ID'];
    /** The priority name. */
    name?: Maybe<Scalars['String']>;
    /**
     * "
     * The priority ID. E.g. 10000.
     */
    priorityId: Scalars['Long'];
};
/** The connection type for JiraPriority. */
export declare type JiraPriorityConnection = {
    __typename?: 'JiraPriorityConnection';
    /** A list of edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraPriorityEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraPriority connection. */
export declare type JiraPriorityEdge = {
    __typename?: 'JiraPriorityEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraPriority>;
};
/** Represents a priority field on a Jira Issue. */
export declare type JiraPriorityField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraPriorityField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an Issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /**
     * Paginated list of priority options for the field or on an Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    priorities?: Maybe<JiraPriorityConnection>;
    /** The priority available on the Issue or default priority configured for the field. */
    priority?: Maybe<JiraPriority>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a priority field on a Jira Issue. */
export declare type JiraPriorityFieldPrioritiesArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
    suggested?: Maybe<Scalars['Boolean']>;
};
/**  Copied over from jira-project, will extend this type after deprecating rest bridge project */
export declare type JiraProject = Node & {
    __typename?: 'JiraProject';
    avatar?: Maybe<JiraAvatar>;
    category?: Maybe<JiraProjectCategory>;
    cloudId: Scalars['ID'];
    description?: Maybe<Scalars['String']>;
    /**
     * The connection entity for DevOps Service relationships for this Jira project, according to the specified
     * pagination, filtering.
     */
    devOpsServiceRelationships?: Maybe<DevOpsServiceAndJiraProjectRelationshipConnection>;
    id: Scalars['ID'];
    key: Scalars['String'];
    leadId?: Maybe<Scalars['ID']>;
    name: Scalars['String'];
    /**
     * The connection entity for Opsgenie Team relationships for this Jira project, according to the specified
     * pagination, filtering.
     */
    opsgenieTeamRelationships?: Maybe<JiraProjectAndOpsgenieTeamRelationshipConnection>;
    /** Opsgenie teams that are available to be linked with via createJiraProjectAndOpsgenieTeamRelationship */
    opsgenieTeamsAvailableToLinkWith?: Maybe<OpsgenieTeamConnection>;
    projectUrl?: Maybe<Scalars['String']>;
    /**
     * The connection entity for repository relationships for this Jira project, according to the specified
     * pagination, filtering and sorting.
     */
    repositoryRelationships?: Maybe<JiraProjectAndRepositoryRelationshipConnection>;
    /** Services that are available to be linked with via createDevOpsServiceAndJiraProjectRelationship */
    servicesAvailableToLinkWith?: Maybe<DevOpsServiceConnection>;
};
/**  Copied over from jira-project, will extend this type after deprecating rest bridge project */
export declare type JiraProjectDevOpsServiceRelationshipsArgs = {
    after?: Maybe<Scalars['String']>;
    filter?: Maybe<DevOpsServiceAndJiraProjectRelationshipFilter>;
    first?: Maybe<Scalars['Int']>;
};
/**  Copied over from jira-project, will extend this type after deprecating rest bridge project */
export declare type JiraProjectOpsgenieTeamRelationshipsArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
/**  Copied over from jira-project, will extend this type after deprecating rest bridge project */
export declare type JiraProjectOpsgenieTeamsAvailableToLinkWithArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
/**  Copied over from jira-project, will extend this type after deprecating rest bridge project */
export declare type JiraProjectRepositoryRelationshipsArgs = {
    after?: Maybe<Scalars['String']>;
    filter?: Maybe<JiraProjectAndRepositoryRelationshipFilter>;
    first?: Maybe<Scalars['Int']>;
    sort?: Maybe<JiraProjectAndRepositoryRelationshipSort>;
};
/**  Copied over from jira-project, will extend this type after deprecating rest bridge project */
export declare type JiraProjectServicesAvailableToLinkWithArgs = {
    after?: Maybe<Scalars['String']>;
    filter?: Maybe<DevOpsServicesFilterInput>;
    first?: Maybe<Scalars['Int']>;
};
/** A relationship between a Jira Project and Opsgenie Team */
export declare type JiraProjectAndOpsgenieTeamRelationship = Node & {
    __typename?: 'JiraProjectAndOpsgenieTeamRelationship';
    /** When the relationship was created. */
    createdAt: Scalars['DateTime'];
    /** Who created the relationship. */
    createdBy: Scalars['String'];
    /** An optional description of the relationship. */
    description?: Maybe<Scalars['String']>;
    /** The ARI of this relationship. */
    id: Scalars['ID'];
    /** The Jira project related to the Opsgenie team. */
    jiraProject?: Maybe<JiraProject>;
    /** The type of Jira. */
    jiraProjectType?: Maybe<DevOpsJiraProjectType>;
    /** When the relationship was updated last.  Only present for relationships that have been updated. */
    lastUpdatedAt?: Maybe<Scalars['DateTime']>;
    /** Who updated the relationship last. Only present for relationships that have been updated. */
    lastUpdatedBy?: Maybe<Scalars['String']>;
    /** The Opsgenie team details related to the Jira Project. */
    opsgenieTeam?: Maybe<OpsgenieTeam>;
    /** Look up JSON properties of the relationship by keys. */
    properties?: Maybe<Scalars['JSON']>;
    /**
     * The revision must be provided when updating a relationship to prevent
     * simultaneous updates from overwriting each other.
     */
    revision: Scalars['ID'];
};
/** A relationship between a Jira Project and Opsgenie Team */
export declare type JiraProjectAndOpsgenieTeamRelationshipPropertiesArgs = {
    keys: Array<Scalars['String']>;
};
export declare type JiraProjectAndOpsgenieTeamRelationshipConnection = {
    __typename?: 'JiraProjectAndOpsgenieTeamRelationshipConnection';
    edges?: Maybe<Array<Maybe<JiraProjectAndOpsgenieTeamRelationshipEdge>>>;
    nodes?: Maybe<Array<Maybe<JiraProjectAndOpsgenieTeamRelationship>>>;
    pageInfo: PageInfo;
};
export declare type JiraProjectAndOpsgenieTeamRelationshipEdge = {
    __typename?: 'JiraProjectAndOpsgenieTeamRelationshipEdge';
    cursor: Scalars['String'];
    node?: Maybe<JiraProjectAndOpsgenieTeamRelationship>;
};
/** A relationship between a Jira project and a repository (Bitbucket or third party). */
export declare type JiraProjectAndRepositoryRelationship = Node & {
    __typename?: 'JiraProjectAndRepositoryRelationship';
    /**
     * If the repository provider is Bitbucket, this will contain the Bitbucket repository details,
     * otherwise null.
     */
    bitbucketRepository?: Maybe<BitbucketRepository>;
    /** Whether the relationship is explicit or inferred. */
    certainty: DevOpsRelationshipCertainty;
    /** When the relationship was created. */
    createdAt: Scalars['DateTime'];
    /** The AAID or system or system entity that created the relationship. */
    createdBy: Scalars['String'];
    /** An optional description of the relationship. */
    description?: Maybe<Scalars['String']>;
    /** The ARI of this relationship. */
    id: Scalars['ID'];
    /** The Jira project related to the repository. */
    jiraProject?: Maybe<JiraProject>;
    /** When the relationship was inferred last. Only present for implicit relationships. */
    lastInferredAt?: Maybe<Scalars['DateTime']>;
    /**
     * The system that inferred the relationship last.
     * Only present for implicit relationships.
     */
    lastInferredBy?: Maybe<Scalars['String']>;
    /** When the relationship was updated last.  Only present for relationships that have been updated. */
    lastUpdatedAt?: Maybe<Scalars['DateTime']>;
    /**
     * The AAID or system or system entity that updated the relationship last.
     * Only present for relationships that have been updated.
     */
    lastUpdatedBy?: Maybe<Scalars['String']>;
    /** Look up JSON properties of the relationship by keys. */
    properties?: Maybe<Scalars['JSON']>;
    /**
     * The revision must be provided when updating a relationship to prevent
     * simultaneous updates from overwriting each other.
     */
    revision: Scalars['ID'];
    /**
     * If the repository provider is a third party, this will contain the third party repository details,
     * otherwise null.
     */
    thirdPartyRepository?: Maybe<DevOpsThirdPartyRepository>;
};
/** A relationship between a Jira project and a repository (Bitbucket or third party). */
export declare type JiraProjectAndRepositoryRelationshipPropertiesArgs = {
    keys: Array<Scalars['String']>;
};
/** The connection object for a collection of Jira project and repository relationships. */
export declare type JiraProjectAndRepositoryRelationshipConnection = {
    __typename?: 'JiraProjectAndRepositoryRelationshipConnection';
    edges?: Maybe<Array<Maybe<JiraProjectAndRepositoryRelationshipEdge>>>;
    nodes?: Maybe<Array<Maybe<JiraProjectAndRepositoryRelationship>>>;
    pageInfo: PageInfo;
};
export declare type JiraProjectAndRepositoryRelationshipEdge = {
    __typename?: 'JiraProjectAndRepositoryRelationshipEdge';
    cursor: Scalars['String'];
    node?: Maybe<JiraProjectAndRepositoryRelationship>;
};
/** #################### Filtering and Sorting Inputs ##################### */
export declare type JiraProjectAndRepositoryRelationshipFilter = {
    /** Include only relationships with the specified certainty */
    certainty?: Maybe<DevOpsRelationshipCertaintyFilter>;
    /** Include only relationships with the specified repository hosting provider type */
    hostingProvider?: Maybe<DevOpsRepositoryHostingProviderFilter>;
    /**
     * Include only relationships with all of the specified property keys.
     * If this is omitted, no filtering by 'all property keys' is applied.
     */
    withAllPropertyKeys?: Maybe<Array<Scalars['String']>>;
};
export declare type JiraProjectAndRepositoryRelationshipSort = {
    /** The field to apply sorting on */
    by: JiraProjectAndRepositoryRelationshipSortBy;
    /** The direction of sorting */
    order?: SortDirection;
};
/** #################### Enums ##################### */
export declare enum JiraProjectAndRepositoryRelationshipSortBy {
    LastInferredAt = "LAST_INFERRED_AT"
}
export declare type JiraProjectCategory = Node & {
    __typename?: 'JiraProjectCategory';
    /** description of the Project category */
    description?: Maybe<Scalars['String']>;
    /** Global id of this project category */
    id: Scalars['ID'];
    /** display name of the Project category */
    name?: Maybe<Scalars['String']>;
};
export declare type JiraProjectCategoryConnection = {
    __typename?: 'JiraProjectCategoryConnection';
    /** A list of edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraProjectCategoryEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
};
export declare type JiraProjectCategoryEdge = {
    __typename?: 'JiraProjectCategoryEdge';
    /** A cursor for use in pagination */
    cursor: Scalars['String'];
    /** The item at the end of the edge */
    node?: Maybe<JiraProjectCategory>;
};
export declare type JiraProjectConnection = {
    __typename?: 'JiraProjectConnection';
    /** A list of edges. */
    edges?: Maybe<Array<Maybe<JiraProjectEdge>>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};
/** An edge in a connection. */
export declare type JiraProjectEdge = {
    __typename?: 'JiraProjectEdge';
    /** A cursor for use in pagination */
    cursor: Scalars['String'];
    /** The item at the end of the edge */
    node?: Maybe<JiraProject>;
};
/**
 * Represents a project field on a Jira Issue.
 * Both the system & custom project field can be represented by this type.
 */
export declare type JiraProjectField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraProjectField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an Issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The ID of the project field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** The project available on the Issue or default project configured for the field. */
    project?: Maybe<JiraProject>;
    /**
     * List of project options available for this field to be selected.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    projects?: Maybe<JiraProjectConnection>;
    /**
     * Search url to fetch all available projects options on the field or an Issue.
     * To be deprecated once project connection is supported for custom project fields.
     */
    searchUrl?: Maybe<Scalars['String']>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/**
 * Represents a project field on a Jira Issue.
 * Both the system & custom project field can be represented by this type.
 */
export declare type JiraProjectFieldProjectsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    recent?: Maybe<Scalars['Boolean']>;
    searchBy?: Maybe<Scalars['String']>;
};
export declare type JiraProjectFilterInput = {
    /**  Filter the results using a literal string. Projects witha matching key or name are returned (case insensitive). */
    keyword?: Maybe<Scalars['String']>;
    /** the project category that can be used to filter list of projects */
    projectCategoryId?: Maybe<Scalars['ID']>;
    /** the sort criteria that is used while filtering the projects */
    sortBy?: Maybe<JiraProjectSortInput>;
    /** the project types that can be used to filter list of projects */
    types?: Maybe<Array<JiraProjectType>>;
};
/** The project permission in Jira and it is scoped to projects. */
export declare type JiraProjectPermission = {
    __typename?: 'JiraProjectPermission';
    /** The description of the permission. */
    description: Scalars['String'];
    /** The unique key of the permission. */
    key: Scalars['String'];
    /** The display name of the permission. */
    name: Scalars['String'];
    /** The category of the permission. */
    type: JiraProjectPermissionCategory;
};
/**
 * The category of the project permission.
 * The category information is typically seen in the permission scheme Admin UI.
 * It is used to group the project permissions in general and available for connect app developers when registering new project permissions.
 */
export declare type JiraProjectPermissionCategory = {
    __typename?: 'JiraProjectPermissionCategory';
    /** The unique key of the permission category. */
    key: JiraProjectPermissionCategoryEnum;
    /** The display name of the permission category. */
    name: Scalars['String'];
};
/**
 * The category of the project permission.
 * It represents the logical grouping of the project permissions.
 */
export declare enum JiraProjectPermissionCategoryEnum {
    /** Represents one or more permissions to manage issue attacments such as create and delete. */
    Attachments = "ATTACHMENTS",
    /** Represents one or more permissions to manage issue comments such as add, delete and edit. */
    Comments = "COMMENTS",
    /** Represents one or more permissions applicable at issue level to manage operations such as create, delete, edit, and transition. */
    Issues = "ISSUES",
    /** Represents one or more permissions representing default category if not any other existing category. */
    Other = "OTHER",
    /** Represents one or more permissions applicable at project level such as project administration, view project information, and manage sprints. */
    Projects = "PROJECTS",
    /** Represents one or more permissions to manage worklogs, time tracking for billing purpose in some cases. */
    TimeTracking = "TIME_TRACKING",
    /** Represents one or more permissions to manage watchers and voters of an issue. */
    VotersAndWatchers = "VOTERS_AND_WATCHERS"
}
/** The project role grant type value having the project role information. */
export declare type JiraProjectRoleGrantTypeValue = Node & {
    __typename?: 'JiraProjectRoleGrantTypeValue';
    /**
     * The ARI to represent the project role grant type value.
     * For example: ari:cloud:jira:a2520569-493f-45bc-807b-54b02bc724d1:role/project-role/activation/bd0c43a9-a23a-4302-8ffa-ca04bde7c747/projectrole/b434089d-7f6d-476b-884b-7811661f91d2
     */
    id: Scalars['ID'];
    /** The project role information such as name, description. */
    role: JiraRole;
};
export declare enum JiraProjectSortField {
    /** sorts by category */
    Category = "CATEGORY",
    /** sorts by project key */
    Key = "KEY",
    /** sorts by lead */
    Lead = "LEAD",
    /** sorts by project name */
    Name = "NAME"
}
export declare type JiraProjectSortInput = {
    order?: Maybe<SortDirection>;
    sortBy?: Maybe<JiraProjectSortField>;
};
/** Jira Project types */
export declare enum JiraProjectType {
    /** A business project */
    Business = "BUSINESS",
    /** A service desk project */
    ServiceDesk = "SERVICE_DESK",
    /** A software project */
    Software = "SOFTWARE"
}
/** Possible states for Pull Requests */
export declare enum JiraPullRequestState {
    /** Pull Request is Declined */
    Declined = "DECLINED",
    /** Pull Request is Merged */
    Merged = "MERGED",
    /** Pull Request is Open */
    Open = "OPEN"
}
export declare type JiraQuery = {
    __typename?: 'JiraQuery';
    /**
     * Get all the available grant type keys such as project role, application access, user, group.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: PermissionScheme` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    allGrantTypeKeys: Array<JiraGrantTypeKey>;
    /** Returns a paginated connection of project categories */
    allJiraProjectCategories?: Maybe<JiraProjectCategoryConnection>;
    /** Returns a paginated connection of projects that meet the provided filter criteria */
    allJiraProjects?: Maybe<JiraProjectConnection>;
    /**
     * Container for all DevOps related queries in Jira
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: JiraDevOps` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    devOps?: Maybe<JiraDevOpsQuery>;
    /**
     * Get the list of paginated projects associated with the given permission scheme ID.
     * The project objects will be returned based on implicit ascending order by project name.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: PermissionScheme` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    getProjectsByPermissionScheme?: Maybe<JiraProjectConnection>;
    /**
     * Get the grant type values by search term amd grant type key.
     * It only supports fetching values for application role, multi user picker and multi group picker grant types.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: PermissionScheme` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    grantTypeValues?: Maybe<JiraGrantTypeValueConnection>;
    /**
     * Returns an Issue by the Issue ID and Jira instance Cloud ID.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: JiraIssue` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    issueById?: Maybe<JiraIssue>;
    /**
     * Returns an Issue by the Issue Key and Jira instance Cloud ID.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: JiraIssue` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    issueByKey?: Maybe<JiraIssue>;
    jiraProject?: Maybe<JiraProject>;
    /**
     * A parent field to get information about jql related aspects from a given jira instance.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: JiraJqlBuilder` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    jqlBuilder?: Maybe<JiraJqlBuilder>;
    /**
     * A list of paginated permission scheme grants based on the given permission scheme ID.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: PermissionScheme` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    permissionSchemeGrants?: Maybe<JiraPermissionGrantValueConnection>;
    /**
     * Get the permission scheme based on scheme id. The scheme ID input represent an ARI.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: PermissionScheme` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    viewPermissionScheme?: Maybe<JiraPermissionSchemeViewResult>;
};
export declare type JiraQueryAllGrantTypeKeysArgs = {
    cloudId: Scalars['ID'];
};
export declare type JiraQueryAllJiraProjectCategoriesArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    cloudId: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
export declare type JiraQueryAllJiraProjectsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    cloudId: Scalars['ID'];
    filter: JiraProjectFilterInput;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
export declare type JiraQueryGetProjectsByPermissionSchemeArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    schemeId: Scalars['ID'];
};
export declare type JiraQueryGrantTypeValuesArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    cloudId: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
    grantTypeKey?: Maybe<JiraGrantTypeKeyEnum>;
    last?: Maybe<Scalars['Int']>;
    searchTerm?: Maybe<Scalars['String']>;
};
export declare type JiraQueryIssueByIdArgs = {
    id: Scalars['ID'];
};
export declare type JiraQueryIssueByKeyArgs = {
    cloudId: Scalars['ID'];
    key: Scalars['String'];
};
export declare type JiraQueryJiraProjectArgs = {
    id: Scalars['ID'];
};
export declare type JiraQueryJqlBuilderArgs = {
    cloudId: Scalars['ID'];
};
export declare type JiraQueryPermissionSchemeGrantsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    permissionKey?: Maybe<Scalars['String']>;
    schemeId: Scalars['ID'];
};
export declare type JiraQueryViewPermissionSchemeArgs = {
    schemeId: Scalars['ID'];
};
/** Represents the radio select field on a Jira Issue. */
export declare type JiraRadioSelectField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraRadioSelectField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /**
     * Paginated list of options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    fieldOptions?: Maybe<JiraOptionConnection>;
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** The option available on the Issue or default option configured for the field. */
    selectedOption?: Maybe<JiraOption>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents the radio select field on a Jira Issue. */
export declare type JiraRadioSelectFieldFieldOptionsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
export declare type JiraReleases = {
    __typename?: 'JiraReleases';
    /** Deployment summaries that are ordered by the date at which they occured (most recent to least recent). */
    deployments?: Maybe<JiraReleasesDeploymentSummaryConnection>;
    /**
     * Query deployment summaries by ID.
     *
     * A maximum of 100 `deploymentIds` can be asked for at the one time.
     */
    deploymentsById?: Maybe<Array<Maybe<DeploymentSummary>>>;
    /**
     * Epic data that is filtered & ordered based on release-specific information.
     *
     * The returned epics will be ordered by the dates of the most recent deployments for
     * the issues within the epic that match the input filter. An epic containing an issue
     * that was released more recently will appear earlier in the list.
     */
    epics?: Maybe<JiraReleasesEpicConnection>;
    /**
     * Issue data that is filtered & ordered based on release-specific information.
     *
     * The returned issues will be ordered by the dates of the most recent deployments that
     * match the input filter. An issue that was released more recently will appear earlier
     * in the list.
     */
    issues?: Maybe<JiraReleasesIssueConnection>;
};
export declare type JiraReleasesDeploymentsArgs = {
    after?: Maybe<Scalars['String']>;
    filter: JiraReleasesDeploymentFilter;
    first?: Scalars['Int'];
};
export declare type JiraReleasesDeploymentsByIdArgs = {
    deploymentIds: Array<Scalars['ID']>;
};
export declare type JiraReleasesEpicsArgs = {
    after?: Maybe<Scalars['String']>;
    filter: JiraReleasesEpicFilter;
    first?: Scalars['Int'];
};
export declare type JiraReleasesIssuesArgs = {
    after?: Maybe<Scalars['String']>;
    filter: JiraReleasesIssueFilter;
    first?: Scalars['Int'];
};
export declare type JiraReleasesDeploymentFilter = {
    /** Only deployments in these environment types will be returned. */
    environmentCategories?: Maybe<Array<DevOpsEnvironmentCategory>>;
    /** Only deployments in these environments will be returned. */
    environmentDisplayNames?: Maybe<Array<Scalars['String']>>;
    /** Only deployments associated with these issues will be returned. */
    issueIds: Array<Scalars['ID']>;
    /** Only deployments in this time window will be returned. */
    timeWindow: JiraReleasesTimeWindowInput;
};
export declare type JiraReleasesDeploymentSummaryConnection = {
    __typename?: 'JiraReleasesDeploymentSummaryConnection';
    edges?: Maybe<Array<Maybe<JiraReleasesDeploymentSummaryEdge>>>;
    nodes?: Maybe<Array<Maybe<DeploymentSummary>>>;
    pageInfo: PageInfo;
};
export declare type JiraReleasesDeploymentSummaryEdge = {
    __typename?: 'JiraReleasesDeploymentSummaryEdge';
    cursor: Scalars['String'];
    node?: Maybe<DeploymentSummary>;
};
export declare type JiraReleasesEpic = {
    __typename?: 'JiraReleasesEpic';
    assignee?: Maybe<User>;
    color?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    issueKey?: Maybe<Scalars['String']>;
    issueTypeId?: Maybe<Scalars['ID']>;
    lastDeployed?: Maybe<Scalars['DateTime']>;
    summary?: Maybe<Scalars['String']>;
};
export declare type JiraReleasesEpicConnection = {
    __typename?: 'JiraReleasesEpicConnection';
    edges?: Maybe<Array<Maybe<JiraReleasesEpicEdge>>>;
    nodes?: Maybe<Array<Maybe<JiraReleasesEpic>>>;
    pageInfo: PageInfo;
};
export declare type JiraReleasesEpicEdge = {
    __typename?: 'JiraReleasesEpicEdge';
    cursor: Scalars['String'];
    node?: Maybe<JiraReleasesEpic>;
};
export declare type JiraReleasesEpicFilter = {
    /** Only epics in this project will be returned. */
    projectId: Scalars['ID'];
    /** Determines whether epics that haven't been released should be included in the results. */
    releaseStatusFilter?: Maybe<JiraReleasesEpicReleaseStatusFilter>;
    /** Only epics matching this text filter will be returned. */
    text?: Maybe<Scalars['String']>;
};
/**
 * Used for specifying whether or not epics that haven't been released should be included
 * in the results.
 *
 * For an epic to be considered as released, at least one of the issues or subtasks within
 * it must have been released.
 */
export declare enum JiraReleasesEpicReleaseStatusFilter {
    /** Only epics that have been released (to any environment) will be included in the results. */
    Released = "RELEASED",
    /**
     * Epics that have been released will be returned first, followed by epics that haven't
     * yet been released.
     */
    ReleasedAndUnreleased = "RELEASED_AND_UNRELEASED"
}
export declare type JiraReleasesIssue = {
    __typename?: 'JiraReleasesIssue';
    assignee?: Maybe<User>;
    /**
     * The epic this issue is contained within (either directly or indirectly).
     *
     * Note: If the issue and its ancestors are not within an epic, the value will be `null`.
     */
    epic?: Maybe<JiraReleasesEpic>;
    id: Scalars['ID'];
    issueKey?: Maybe<Scalars['String']>;
    issueTypeId?: Maybe<Scalars['ID']>;
    lastDeployed?: Maybe<Scalars['DateTime']>;
    summary?: Maybe<Scalars['String']>;
};
export declare type JiraReleasesIssueConnection = {
    __typename?: 'JiraReleasesIssueConnection';
    edges?: Maybe<Array<Maybe<JiraReleasesIssueEdge>>>;
    nodes?: Maybe<Array<Maybe<JiraReleasesIssue>>>;
    pageInfo: PageInfo;
};
export declare type JiraReleasesIssueEdge = {
    __typename?: 'JiraReleasesIssueEdge';
    cursor: Scalars['String'];
    node?: Maybe<JiraReleasesIssue>;
};
export declare type JiraReleasesIssueFilter = {
    /** Only issues assigned to these users will be returned. */
    assignees?: Maybe<Array<Scalars['ID']>>;
    /** Only issues that have been released in these environment *types* will be returned. */
    environmentCategories?: Maybe<Array<Maybe<DevOpsEnvironmentCategory>>>;
    /** Only issues that have been released in these environments will be returned. */
    environmentDisplayNames?: Maybe<Array<Scalars['String']>>;
    /**
     * Only issues in these epics will be returned.
     *
     * Note:
     * * If a null ID is included in the list, issues not in epics will be included in the results.
     * * If a subtask's parent issue is in one of the epics, the subtask will also be returned.
     */
    epicIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
    /** Only issues with the supplied fixVersions will be returned. */
    fixVersions?: Maybe<Array<Scalars['String']>>;
    /** Only issues of these types will be returned. */
    issueTypes?: Maybe<Array<Scalars['ID']>>;
    /** Only issues in this project will be returned. */
    projectId: Scalars['ID'];
    /** Determines whether issues that haven't been released should be included in the results. */
    releaseStatusFilter?: JiraReleasesIssueReleaseStatusFilter;
    /** Only issues matching this text filter will be returned (will match against all issue fields). */
    text?: Maybe<Scalars['String']>;
    /**
     * Only issues that have been released within this time window will be returned.
     *
     * Note: Issues that have not been released within the time window will still be returned
     * if the `includeIssuesWithoutReleases` argument is `true`.
     */
    timeWindow: JiraReleasesTimeWindowInput;
};
/**
 * Used for specifying whether or not issues that haven't been released should be included
 * in the results.
 */
export declare enum JiraReleasesIssueReleaseStatusFilter {
    /** Only issues that have been released (to any environment) will be included in the results. */
    Released = "RELEASED",
    /**
     * Issues that have been released will be returned first, followed by issues that haven't
     * yet been released.
     */
    ReleasedAndUnreleased = "RELEASED_AND_UNRELEASED",
    /** Only issues that have *not* been released (to any environment) will be included in the results. */
    Unreleased = "UNRELEASED"
}
export declare type JiraReleasesTimeWindowInput = {
    after: Scalars['DateTime'];
    before: Scalars['DateTime'];
};
/** Represents the resolution field of an issue. */
export declare type JiraResolution = Node & {
    __typename?: 'JiraResolution';
    /** Resolution description. */
    description?: Maybe<Scalars['String']>;
    /** Global identifier representing the resolution id. */
    id: Scalars['ID'];
    /** Resolution name. */
    name?: Maybe<Scalars['String']>;
    /** Resolution Id in the digital format. */
    resolutionId: Scalars['Long'];
};
/** The connection type for JiraResolution. */
export declare type JiraResolutionConnection = {
    __typename?: 'JiraResolutionConnection';
    /** The data for Edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraResolutionEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo?: Maybe<PageInfo>;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraResolution connection. */
export declare type JiraResolutionEdge = {
    __typename?: 'JiraResolutionEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraResolution>;
};
/** Represents a resolution field on a Jira Issue. */
export declare type JiraResolutionField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraResolutionField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** The resolution available on the Issue or default resolution configured for the field. */
    resolution?: Maybe<JiraResolution>;
    /**
     * Paginated list of resolution options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    resolutions?: Maybe<JiraResolutionConnection>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a resolution field on a Jira Issue. */
export declare type JiraResolutionFieldResolutionsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
    suggested?: Maybe<Scalars['Boolean']>;
};
/** Possible states for Reviews */
export declare enum JiraReviewState {
    /** Review is in Require Approval state */
    Approval = "APPROVAL",
    /** Review has been closed */
    Closed = "CLOSED",
    /** Review is in Dead state */
    Dead = "DEAD",
    /** Review is in Draft state */
    Draft = "DRAFT",
    /** Review has been rejected */
    Rejected = "REJECTED",
    /** Review is in Review state */
    Review = "REVIEW",
    /** Review is in Summarize state */
    Summarize = "SUMMARIZE",
    /** Review state is unknown */
    Unknown = "UNKNOWN"
}
/** Represents the rich text format of a rich text field. */
export declare type JiraRichText = {
    __typename?: 'JiraRichText';
    /** Text in Atlassian Document Format. */
    adfValue?: Maybe<JiraAdf>;
    /** Plain text version of the text. */
    plainText?: Maybe<Scalars['String']>;
    /** Text in wiki format. */
    wikiValue?: Maybe<Scalars['String']>;
};
/** Represents a rich text field on a Jira Issue. E.g. description, environment. */
export declare type JiraRichTextField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraRichTextField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Contains the information needed to add media content to the field. */
    mediaContext?: Maybe<JiraMediaContext>;
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /**
     * Determines what editor to render.
     * E.g. default text rendering or wiki text rendering.
     */
    renderer?: Maybe<Scalars['String']>;
    /** The rich text available on the Issue or default rich text configured for the field. */
    richText?: Maybe<JiraRichText>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents a Jira ProjectRole. */
export declare type JiraRole = {
    __typename?: 'JiraRole';
    /** Description of the ProjectRole. */
    description?: Maybe<Scalars['String']>;
    /** Global identifier of the ProjectRole. */
    id: Scalars['ID'];
    /** Name of the ProjectRole. */
    name?: Maybe<Scalars['String']>;
    /** Id of the ProjectRole. */
    roleId: Scalars['Long'];
};
/** The connection type for JiraRole. */
export declare type JiraRoleConnection = {
    __typename?: 'JiraRoleConnection';
    /** The data for Edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraRoleEdge>>>;
    /** The page infor of the current page of results. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraRoleConnection connection. */
export declare type JiraRoleEdge = {
    __typename?: 'JiraRoleEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraRole>;
};
/** Represents the security levels on an Issue. */
export declare type JiraSecurityLevel = Node & {
    __typename?: 'JiraSecurityLevel';
    /** Description of the security level. */
    description?: Maybe<Scalars['String']>;
    /** Global identifier for the security level. */
    id: Scalars['ID'];
    /** Name of the security level. */
    name?: Maybe<Scalars['String']>;
    /** identifier for the security level. */
    securityId: Scalars['Long'];
};
/** The connection type for JiraSecurityLevel. */
export declare type JiraSecurityLevelConnection = {
    __typename?: 'JiraSecurityLevelConnection';
    /** The data for Edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraSecurityLevelEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraSecurityLevel connection. */
export declare type JiraSecurityLevelEdge = {
    __typename?: 'JiraSecurityLevelEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraSecurityLevel>;
};
/** Represents security level field on a Jira Issue. Issue Security allows you to control who can and cannot view issues. */
export declare type JiraSecurityLevelField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraSecurityLevelField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** The security level available on the Issue or default security level configured for the field. */
    securityLevel?: Maybe<JiraSecurityLevel>;
    /**
     * Paginated list of security level options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    securityLevels?: Maybe<JiraSecurityLevelConnection>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents security level field on a Jira Issue. Issue Security allows you to control who can and cannot view issues. */
export declare type JiraSecurityLevelFieldSecurityLevelsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
/** Represents single group picker field. Allows you to select single Jira group to be associated with an issue. */
export declare type JiraSingleGroupPickerField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraSingleGroupPickerField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /**
     * Paginated list of group options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    groups?: Maybe<JiraGroupConnection>;
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search URL to fetch group picker field on a Jira Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** The group available on the Issue or default group configured for the field. */
    selectedGroup?: Maybe<JiraGroup>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents single group picker field. Allows you to select single Jira group to be associated with an issue. */
export declare type JiraSingleGroupPickerFieldGroupsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
/** Represents single line text field on a Jira Issue. E.g. summary, epic name, custom text field. */
export declare type JiraSingleLineTextField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraSingleLineTextField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** The text available on the Issue or default text configured for the field. */
    text?: Maybe<Scalars['String']>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents single select field on a Jira Issue. */
export declare type JiraSingleSelectField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraSingleSelectField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** The option available on the Issue or default option configured for the field. */
    fieldOption?: Maybe<JiraOption>;
    /**
     * Paginated list of options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    fieldOptions?: Maybe<JiraOptionConnection>;
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search URL to fetch the select option for the field on a Jira Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents single select field on a Jira Issue. */
export declare type JiraSingleSelectFieldFieldOptionsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
/** Represents a single select user field on a Jira Issue. E.g. assignee, reporter, custom user picker. */
export declare type JiraSingleSelectUserPickerField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraSingleSelectUserPickerField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search url to fetch all available users options for the field or the Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** Field type key. */
    type: Scalars['String'];
    /** The user available on the Issue or default user configured for the field. */
    user?: Maybe<User>;
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
    /**
     * Paginated list of user options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    users?: Maybe<JiraUserConnection>;
};
/** Represents a single select user field on a Jira Issue. E.g. assignee, reporter, custom user picker. */
export declare type JiraSingleSelectUserPickerFieldUsersArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
    suggested?: Maybe<Scalars['Boolean']>;
};
/** Represents a version field on a Jira Issue. E.g. custom version picker field. */
export declare type JiraSingleVersionPickerField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraSingleVersionPickerField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
    /** The version available on the Issue or default version configured for the field. */
    version?: Maybe<JiraVersion>;
    /**
     * Paginated list of versions options for the field or on a Jira Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    versions?: Maybe<JiraVersionConnection>;
};
/** Represents a version field on a Jira Issue. E.g. custom version picker field. */
export declare type JiraSingleVersionPickerFieldVersionsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
    suggested?: Maybe<Scalars['Boolean']>;
};
/** Represents the sprint field of an issue. */
export declare type JiraSprint = Node & {
    __typename?: 'JiraSprint';
    /** The board name that the sprint belongs to. */
    boardName?: Maybe<Scalars['String']>;
    /** End date of the sprint. */
    endDate?: Maybe<Scalars['DateTime']>;
    /** Global identifier for the sprint. */
    id: Scalars['ID'];
    /** Sprint name. */
    name?: Maybe<Scalars['String']>;
    /** Sprint id in the digital format. */
    sprintId: Scalars['Long'];
    /** Start date of the sprint. */
    startDate?: Maybe<Scalars['DateTime']>;
    /** Current state of the sprint. */
    state?: Maybe<JiraSprintState>;
};
/** The connection type for JiraSprint. */
export declare type JiraSprintConnection = {
    __typename?: 'JiraSprintConnection';
    /** The data for Edges in the current page. */
    edges?: Maybe<Array<Maybe<JiraSprintEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraSprint connection. */
export declare type JiraSprintEdge = {
    __typename?: 'JiraSprintEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraSprint>;
};
/** Represents sprint field on a Jira Issue. */
export declare type JiraSprintField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraSprintField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search url to fetch all available sprints options for the field or the Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** The sprints available on the Issue or default sprints configured for the field. */
    selectedSprints?: Maybe<Array<Maybe<JiraSprint>>>;
    /**
     * Paginated list of sprint options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    sprints?: Maybe<JiraSprintConnection>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents sprint field on a Jira Issue. */
export declare type JiraSprintFieldSprintsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
    state?: Maybe<JiraSprintState>;
};
/** Represents the state of the sprint. */
export declare enum JiraSprintState {
    /** The sprint is in progress. */
    Active = "ACTIVE",
    /** The sprint has been completed. */
    Closed = "CLOSED",
    /** The sprint hasn't been started yet. */
    Future = "FUTURE"
}
/** Represents the status field of an issue. */
export declare type JiraStatus = Node & {
    __typename?: 'JiraStatus';
    /** Global identifier for the Status. */
    id: Scalars['ID'];
    /** Name of status. E.g. Backlog, Selected for Development, In Progress, Done. */
    name?: Maybe<Scalars['String']>;
    /** Represents a group of Jira statuses. */
    statusCategory?: Maybe<JiraStatusCategory>;
    /** Status id in the digital format. */
    statusId: Scalars['Long'];
};
/** Represents the category of a status. */
export declare type JiraStatusCategory = Node & {
    __typename?: 'JiraStatusCategory';
    /** Color of status category. */
    colorName?: Maybe<JiraStatusCategoryColor>;
    /** Global identifier for the Status Category. */
    id: Scalars['ID'];
    /** A unique key to identify this status category. E.g. new, indeterminate, done. */
    key?: Maybe<Scalars['String']>;
    /** Name of status category. E.g. New, In Progress, Complete. */
    name?: Maybe<Scalars['String']>;
    /** Status category id in the digital format. */
    statusCategoryId: Scalars['Long'];
};
/** Color of the status category. */
export declare enum JiraStatusCategoryColor {
    /** #4a6785 */
    BlueGray = "BLUE_GRAY",
    /** #815b3a */
    Brown = "BROWN",
    /** #14892c */
    Green = "GREEN",
    /** #707070 */
    MediumGray = "MEDIUM_GRAY",
    /** #d04437 */
    WarmRed = "WARM_RED",
    /** #f6c342 */
    Yellow = "YELLOW"
}
/** Represents Status field. */
export declare type JiraStatusField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraStatusField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** The status available on the Issue or default status configured for the field. */
    status: JiraStatus;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents subtasks on a Jira Issue. */
export declare type JiraSubtasksField = JiraIssueField & JiraIssueFieldConfiguration & {
    __typename?: 'JiraSubtasksField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /**
     * Paginated list of subtasks on the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    subtasks?: Maybe<JiraIssueConnection>;
    /** Field type key. */
    type: Scalars['String'];
};
/** Represents subtasks on a Jira Issue. */
export declare type JiraSubtasksFieldSubtasksArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
/** Represents a single team in Jira */
export declare type JiraTeam = Node & {
    __typename?: 'JiraTeam';
    /** Avatar of the team */
    avatar?: Maybe<JiraAvatar>;
    /** Description of the team */
    description?: Maybe<Scalars['String']>;
    /** Global identifier of team */
    id: Scalars['ID'];
    /** Members available in the team */
    members?: Maybe<JiraUserConnection>;
    /** Name of the team */
    name?: Maybe<Scalars['String']>;
    /** Team id in the digital format */
    teamId: Scalars['Long'];
};
/** The connection type for JiraTeam. */
export declare type JiraTeamConnection = {
    __typename?: 'JiraTeamConnection';
    /** The data for Edges in the current page */
    edges?: Maybe<Array<Maybe<JiraTeamEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraTeam connection. */
export declare type JiraTeamEdge = {
    __typename?: 'JiraTeamEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraTeam>;
};
/** Represents the team field on a Jira Issue. Allows you to select a team to be associated with an issue. */
export declare type JiraTeamField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraTeamField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Search URL to fetch all the teams options for the field on a Jira Issue. */
    searchUrl?: Maybe<Scalars['String']>;
    /** The team available on the Issue or default team configured for the field. */
    selectedTeam?: Maybe<JiraTeam>;
    /**
     * Paginated list of team options available for the field or the Issue.
     * The server may throw an error if both a forward page (specified with `first`) and a backward page (specified with `last`) are requested simultaneously.
     */
    teams?: Maybe<JiraTeamConnection>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents the team field on a Jira Issue. Allows you to select a team to be associated with an issue. */
export declare type JiraTeamFieldTeamsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    searchBy?: Maybe<Scalars['String']>;
};
/** Different time formats supported for entering & displaying time tracking related data. */
export declare enum JiraTimeFormat {
    /** E.g. 2d 4.5h */
    Days = "DAYS",
    /** E.g. 52.5h */
    Hours = "HOURS",
    /** E.g. 2 days, 4 hours, 30 minutes */
    Pretty = "PRETTY"
}
/** Represents the time tracking field on Jira issue screens. */
export declare type JiraTimeTrackingField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraTimeTrackingField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Original Estimate displays the amount of time originally anticipated to resolve the issue. */
    originalEstimate?: Maybe<JiraEstimate>;
    /** Time Remaining displays the amount of time currently anticipated to resolve the issue. */
    remainingEstimate?: Maybe<JiraEstimate>;
    /** Time Spent displays the amount of time that has been spent on resolving the issue. */
    timeSpent?: Maybe<JiraEstimate>;
    /** This represents the global time tracking settings configuration like working hours and days. */
    timeTrackingSettings?: Maybe<JiraTimeTrackingSettings>;
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Represents the type for representing global time tracking settings. */
export declare type JiraTimeTrackingSettings = {
    __typename?: 'JiraTimeTrackingSettings';
    /** Format in which the time tracking details are presented to the user. */
    defaultFormat?: Maybe<JiraTimeFormat>;
    /** Default unit for time tracking wherever not specified. */
    defaultUnit?: Maybe<JiraTimeUnit>;
    /** Returns whether time tracking implementation is provided by Jira or some external providers. */
    isJiraConfiguredTimeTrackingEnabled?: Maybe<Scalars['Boolean']>;
    /** Number of days in a working week. */
    workingDaysPerWeek?: Maybe<Scalars['Float']>;
    /** Number of hours in a working day. */
    workingHoursPerDay?: Maybe<Scalars['Float']>;
};
/**
 * Different time units supported for entering & displaying time tracking related data.
 * Get the currently configured default duration to use when parsing duration string for time tracking.
 */
export declare enum JiraTimeUnit {
    /** When the current duration is in days. */
    Day = "DAY",
    /** When the current duration is in hours. */
    Hour = "HOUR",
    /** When the current duration is in minutes. */
    Minute = "MINUTE",
    /** When the current duration is in weeks. */
    Week = "WEEK"
}
/** Represents url field on a Jira Issue. */
export declare type JiraUrlField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraUrlField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Field type key. */
    type: Scalars['String'];
    /** The url available on the Issue or default url configured for the field. */
    url?: Maybe<Scalars['URL']>;
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** A connection to a list of users. */
export declare type JiraUserConnection = {
    __typename?: 'JiraUserConnection';
    /** A list of User edges. */
    edges?: Maybe<Array<Maybe<JiraUserEdge>>>;
    /** The page info of the current page of results. */
    pageInfo: PageInfo;
    /** A count of filtered result set across all pages. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in an User connection object. */
export declare type JiraUserEdge = {
    __typename?: 'JiraUserEdge';
    /** The cursor to this edge. */
    cursor?: Maybe<Scalars['String']>;
    /** The node at this edge. */
    node?: Maybe<User>;
};
/** Attributes of user made field configurations. */
export declare type JiraUserFieldConfig = {
    __typename?: 'JiraUserFieldConfig';
    /** Defines whether a field has been pinned by the user. */
    isPinned?: Maybe<Scalars['Boolean']>;
    /** Defines if the user has preferred to check a field on Issue creation. */
    isSelected?: Maybe<Scalars['Boolean']>;
};
/** The USER grant type value where user data is provided by identity service. */
export declare type JiraUserGrantTypeValue = Node & {
    __typename?: 'JiraUserGrantTypeValue';
    /**
     * The ARI to represent the grant user type value.
     * For example: ari:cloud:identity::user/123
     */
    id: Scalars['ID'];
    /** The GDPR compliant user profile information. */
    user: User;
};
/** Represents user made configurations associated with an Issue field. */
export declare type JiraUserIssueFieldConfiguration = {
    /** Attributes of an Issue field configuration info from a user's customisation. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
};
/** Jira Version type that can be either Versions system fields or Versions Custom fields. */
export declare type JiraVersion = Node & {
    __typename?: 'JiraVersion';
    /** Version icon URL. */
    iconUrl?: Maybe<Scalars['URL']>;
    id: Scalars['ID'];
    /** Version name. */
    name?: Maybe<Scalars['String']>;
    /** Status to which version belongs to. */
    status?: Maybe<JiraVersionStatus>;
    /** Version Id. */
    versionId: Scalars['Long'];
};
/** The connection type for JiraVersion. */
export declare type JiraVersionConnection = {
    __typename?: 'JiraVersionConnection';
    /** The data for Edges in the current page */
    edges?: Maybe<Array<Maybe<JiraVersionEdge>>>;
    /** Information about the current page. Used to aid in pagination. */
    pageInfo: PageInfo;
    /** The total count of items in the connection. */
    totalCount?: Maybe<Scalars['Int']>;
};
/** An edge in a JiraVersion connection. */
export declare type JiraVersionEdge = {
    __typename?: 'JiraVersionEdge';
    /** The cursor to this edge. */
    cursor: Scalars['String'];
    /** The node at the edge. */
    node?: Maybe<JiraVersion>;
};
/** The status of a version field. */
export declare enum JiraVersionStatus {
    /** Indicates the version is archived, no further changes can be made to this version unless it is un-archived */
    Archived = "ARCHIVED",
    /** Indicates the version is available to public */
    Released = "RELEASED",
    /** Indicates the version is not launched yet */
    Unreleased = "UNRELEASED"
}
/** Represents the votes information of an Issue. */
export declare type JiraVote = {
    __typename?: 'JiraVote';
    /** Count of users who have voted for this Issue. */
    count?: Maybe<Scalars['Long']>;
    /** Indicates whether the current user has voted for this Issue. */
    hasVoted?: Maybe<Scalars['Boolean']>;
};
/** Represents a votes field on a Jira Issue. */
export declare type JiraVotesField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraVotesField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
    /**
     * Represents the vote value available on the issue.
     * Can be null when voting is disabled.
     */
    vote?: Maybe<JiraVote>;
};
/** Represents the watches information. */
export declare type JiraWatch = {
    __typename?: 'JiraWatch';
    /** Count of users who are watching this issue. */
    count?: Maybe<Scalars['Long']>;
    /** Indicates whether the current user is watching this issue. */
    isWatching?: Maybe<Scalars['Boolean']>;
};
/** Represents the Watches system field. */
export declare type JiraWatchesField = JiraIssueField & JiraIssueFieldConfiguration & JiraUserIssueFieldConfiguration & {
    __typename?: 'JiraWatchesField';
    /** The field ID alias (if applicable). */
    aliasFieldId?: Maybe<Scalars['ID']>;
    /** Description for the field (if present). */
    description?: Maybe<Scalars['String']>;
    /** Attributes of an issue field's configuration info. */
    fieldConfig?: Maybe<JiraFieldConfig>;
    /** The identifier of the field. E.g. summary, customfield_10001, etc. */
    fieldId: Scalars['String'];
    /** Unique identifier for the field. */
    id: Scalars['ID'];
    /** Translated name for the field (if applicable). */
    name: Scalars['String'];
    /** Field type key. */
    type: Scalars['String'];
    /** Configuration changes which a user can apply to a field. E.g. pin or hide the field. */
    userFieldConfig?: Maybe<JiraUserFieldConfig>;
    /**
     * Represents the watch value available on the issue.
     * Can be null when watching is disabled.
     */
    watch?: Maybe<JiraWatch>;
};
export declare type LabelUsage = {
    __typename?: 'LabelUsage';
    count: Scalars['Int'];
    label: Scalars['String'];
};
export declare enum LicenseOverrideState {
    Active = "ACTIVE",
    Inactive = "INACTIVE",
    Trial = "TRIAL"
}
export declare type LocalizationContext = {
    /** The locale of user in RFC5646 format. */
    locale?: Maybe<Scalars['String']>;
    /** The timezone of the user as defined in the tz database https://www.iana.org/time-zones. */
    zoneinfo?: Maybe<Scalars['String']>;
};
/** The input for choosing invocations of interest. */
export declare type LogQueryInput = {
    /**
     * Limits the search to a particular version of the app.
     * Optional: if empty will search all versions of the app
     */
    appVersion?: Maybe<Scalars['String']>;
    /**
     * Limits the search to a particular date range.
     *
     * Note: Logs may have a TTL on them so older logs may not be available
     * despite search parameters.
     */
    dates?: Maybe<DateSearchInput>;
    /**
     * Limits the search to a particular function in the app.
     * Optional: if empty will search all functions.
     */
    functionKey?: Maybe<Scalars['String']>;
    /**
     * Specify which installations you want to search.
     * Optional: if empty will search all installations user has access to.
     */
    installationContexts?: Maybe<Array<Scalars['ID']>>;
};
/** A piece of code that modifies the functionality or look and feel of Atlassian products */
export declare type MarketplaceApp = {
    __typename?: 'MarketplaceApp';
    /** A numeric identifier for an app in marketplace. */
    appId: Scalars['ID'];
    /** A human-readable identifier for an app in marketplace. */
    appKey: Scalars['String'];
    /** List of categories associated with an app. */
    categories: Array<MarketplaceAppCategory>;
    /** Timestamp when the app was created, in ISO time format `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'` e.g, 2013-10-02T22:05:56.767Z */
    createdAt: Scalars['DateTime'];
    /** Distribution information about the app */
    distribution?: Maybe<MarketplaceAppDistribution>;
    /** Status of the app entity in Marketplace. */
    entityStatus: MarketplaceEntityStatus;
    /** A URL where users can find Community Support resources for the app */
    forumsUrl?: Maybe<Scalars['URL']>;
    /** Google analytics id used for tracking visitors to the app. */
    googleAnalyticsId?: Maybe<Scalars['String']>;
    /** When enabled providing customers with a place to ask questions or browse answers about the app. */
    isAtlassianCommunityEnabled: Scalars['Boolean'];
    /** Link to the issue tracker for the app */
    issueTrackerUrl?: Maybe<Scalars['URL']>;
    /** JSD widget key */
    jsdWidgetKey?: Maybe<Scalars['String']>;
    /** Status of app’s listing in Marketplace. */
    listingStatus: MarketplaceListingStatus;
    /** App's logo */
    logo?: Maybe<MarketplaceListingImage>;
    /** Marketing Labels for the app */
    marketingLabels: Array<Scalars['String']>;
    /** App's name in Marketplace. */
    name: Scalars['String'];
    /** Marketplace Partner that provided this app in Marketplace. */
    partner?: Maybe<MarketplacePartner>;
    /** Link to a statement explaining how the app uses and secures user data. */
    privacyPolicyUrl?: Maybe<Scalars['URL']>;
    /** Options of Atlassian product instance hosting types for which app versions are available. */
    productHostingOptions: Array<AtlassianProductHostingType>;
    /** Marketplace App Programs that this App has enrolled in. */
    programs?: Maybe<MarketplaceAppPrograms>;
    /** Summary of the reviews for an app */
    reviewSummary?: Maybe<MarketplaceAppReviewSummary>;
    /** An SEO-friendly URL pathname for the app */
    slug: Scalars['String'];
    /** Link to the status page for the app */
    statusPageUrl?: Maybe<Scalars['URL']>;
    /** A summary describing the app functionality. */
    summary?: Maybe<Scalars['String']>;
    /** Link to the support ticket system for the app */
    supportTicketSystemUrl?: Maybe<Scalars['URL']>;
    /** A short phrase that summarizes what the app does. */
    tagline?: Maybe<Scalars['String']>;
    /** App's versions in Marketplace system. */
    versions: MarketplaceAppVersionConnection;
    /** Information of watchers of a Marketplace app */
    watchersInfo?: Maybe<MarketplaceAppWatchersInfo>;
    /** A URL where users can find documentation platform hosted by the partner */
    wikiUrl?: Maybe<Scalars['URL']>;
};
/** A piece of code that modifies the functionality or look and feel of Atlassian products */
export declare type MarketplaceAppProductHostingOptionsArgs = {
    excludeHiddenIn?: Maybe<MarketplaceLocation>;
};
/** A piece of code that modifies the functionality or look and feel of Atlassian products */
export declare type MarketplaceAppVersionsArgs = {
    after?: Maybe<Scalars['String']>;
    filter?: Maybe<MarketplaceAppVersionFilter>;
    first?: Maybe<Scalars['Int']>;
};
/** Category associated with an app */
export declare type MarketplaceAppCategory = {
    __typename?: 'MarketplaceAppCategory';
    /** Name of the category */
    name: Scalars['String'];
};
/** All deployment related properties for an app version */
export declare type MarketplaceAppDeployment = {
    /** All Atlassian Products this app version is compatible with */
    compatibleProducts: Array<CompatibleAtlassianProduct>;
};
/** Step for installing the instructional app */
export declare type MarketplaceAppDeploymentStep = {
    __typename?: 'MarketplaceAppDeploymentStep';
    /** Text/html to explain the step */
    instruction: Scalars['String'];
    /** Screenshot of the step */
    screenshot?: Maybe<MarketplaceListingImage>;
};
/** Marketplace app's distribution information */
export declare type MarketplaceAppDistribution = {
    __typename?: 'MarketplaceAppDistribution';
    /** Number of app downloads */
    downloadCount?: Maybe<Scalars['Int']>;
    /** Number of app installations */
    installationCount?: Maybe<Scalars['Int']>;
    /** Tells whether the app is preinstalled on Cloud */
    isPreinstalledInCloud: Scalars['Boolean'];
    /** Tells whether the app is preinstalled on Server and Data Center */
    isPreinstalledInServerDC: Scalars['Boolean'];
};
/** Payment model for integrating an app with an Atlassian product. */
export declare enum MarketplaceAppPaymentModel {
    Free = "FREE",
    PaidViaAtlassian = "PAID_VIA_ATLASSIAN",
    PaidViaPartner = "PAID_VIA_PARTNER"
}
/** Permissions that a MarketplaceUser can have on MarketplaceApps */
export declare enum MarketplaceAppPermission {
    ManageAppDetails = "MANAGE_APP_DETAILS"
}
/** Marketplace App Programs that this Marketplace App has enrolled into. */
export declare type MarketplaceAppPrograms = {
    __typename?: 'MarketplaceAppPrograms';
    cloudFortified?: Maybe<MarketplaceCloudFortified>;
};
/** Summary of the reviews for an app */
export declare type MarketplaceAppReviewSummary = {
    __typename?: 'MarketplaceAppReviewSummary';
    /** Number of reviews for app */
    count?: Maybe<Scalars['Int']>;
    /** Rating of the app */
    rating?: Maybe<Scalars['Float']>;
    /**
     * Review score of the app
     *
     *
     * This field is **deprecated** and will be removed in the future
     * @deprecated Use field `rating`
     */
    score?: Maybe<Scalars['Float']>;
};
/** Version of App in Marketplace system */
export declare type MarketplaceAppVersion = {
    __typename?: 'MarketplaceAppVersion';
    /** A unique number for each version, higher value indicates more recent version of the app. */
    buildNumber: Scalars['ID'];
    /** All deployment related properties for this app version */
    deployment: MarketplaceAppDeployment;
    /** A URL where users can find version-specific or general documentation about the app. */
    documentationUrl?: Maybe<Scalars['URL']>;
    /** Link to the terms that give end users the right to use the app. */
    endUserLicenseAgreementUrl?: Maybe<Scalars['URL']>;
    /** Hero image to be displayed on this app's listing */
    heroImage?: Maybe<MarketplaceListingImage>;
    /** Feature highlights to be displayed on this app's listing */
    highlights?: Maybe<Array<MarketplaceListingHighlight>>;
    /** Tells whether this version has official support. */
    isSupported: Scalars['Boolean'];
    /** A URL where customers can access more information about this app. */
    learnMoreUrl?: Maybe<Scalars['URL']>;
    /** License type for this version of Marketplace app. */
    licenseType?: Maybe<MarketplaceAppVersionLicenseType>;
    /** Awards, customer testimonials, accolades, language support, or other details about this app. */
    moreDetails?: Maybe<Scalars['String']>;
    /** Payment model for integrating an app with an Atlassian product. */
    paymentModel: MarketplaceAppPaymentModel;
    /** List of Hosting types where compatible Atlassian product instances are installed. */
    productHostingOptions: Array<AtlassianProductHostingType>;
    /** A URL where customers can purchase this app. */
    purchaseUrl?: Maybe<Scalars['URL']>;
    /** Version release date */
    releaseDate: Scalars['DateTime'];
    /** Version release notes */
    releaseNotes?: Maybe<Scalars['String']>;
    /** URL with further details about this version release (link available for versions listed before October 2013) */
    releaseNotesUrl?: Maybe<Scalars['URL']>;
    /** Version release summary */
    releaseSummary?: Maybe<Scalars['String']>;
    /** Feature screenshots to be displayed on this app's listing */
    screenshots?: Maybe<Array<MarketplaceListingScreenshot>>;
    /** A URL to access the app's source code license agreement. This agreement governs how the app's source code is used. */
    sourceCodeLicenseUrl?: Maybe<Scalars['URL']>;
    /** This version identifier is for end users, more than one app versions can have same version value. */
    version: Scalars['String'];
    /** Visibility of this version of Marketplace app. */
    visibility: MarketplaceAppVersionVisibility;
    /** The ID of a YouTube video explaining the features of this app version. */
    youtubeId?: Maybe<Scalars['String']>;
};
export declare type MarketplaceAppVersionConnection = {
    __typename?: 'MarketplaceAppVersionConnection';
    edges?: Maybe<Array<Maybe<MarketplaceAppVersionEdge>>>;
    pageInfo: PageInfo;
    totalCount: Scalars['Int'];
};
export declare type MarketplaceAppVersionEdge = {
    __typename?: 'MarketplaceAppVersionEdge';
    cursor: Scalars['String'];
    node?: Maybe<MarketplaceAppVersion>;
};
export declare type MarketplaceAppVersionFilter = {
    /** Unique id of Cloud App's version */
    cloudAppVersionId?: Maybe<Scalars['ID']>;
    /** Excludes hidden versions as per Marketplace */
    excludeHiddenIn?: Maybe<MarketplaceLocation>;
    /** Options of Atlassian product instance hosting types for which app versions are available. */
    productHostingOptions?: Maybe<Array<AtlassianProductHostingType>>;
    /** Visibility of the version. */
    visibility?: Maybe<MarketplaceAppVersionVisibility>;
};
/** License type for an app version */
export declare type MarketplaceAppVersionLicenseType = {
    __typename?: 'MarketplaceAppVersionLicenseType';
    /** Unique ID for the license type. */
    id: Scalars['ID'];
    /** A URL where customers can see the license terms. */
    link?: Maybe<Scalars['URL']>;
    /** Display name for the license type. */
    name: Scalars['String'];
};
/** Visibility of the Marketplace app's version */
export declare enum MarketplaceAppVersionVisibility {
    Private = "PRIVATE",
    Public = "PUBLIC"
}
/** Information of watchers of a Marketplace app */
export declare type MarketplaceAppWatchersInfo = {
    __typename?: 'MarketplaceAppWatchersInfo';
    /** Tells if the user is subscribed to the app updates */
    isUserWatchingApp: Scalars['Boolean'];
    /** Number of users watching the app */
    watchersCount: Scalars['Int'];
};
/** Billing cycle for which pricing plan applies */
export declare enum MarketplaceBillingCycle {
    Annual = "ANNUAL",
    Monthly = "MONTHLY"
}
/** Cloud app deployment properties */
export declare type MarketplaceCloudAppDeployment = MarketplaceAppDeployment & {
    __typename?: 'MarketplaceCloudAppDeployment';
    /** Unique identifier for the Cloud app's production environment */
    cloudAppEnvironmentId: Scalars['ID'];
    /** Cloud App’s unique identifier */
    cloudAppId: Scalars['ID'];
    /** Unique identifier of Cloud App’s version */
    cloudAppVersionId: Scalars['ID'];
    /** All Atlassian Products this app version is compatible with */
    compatibleProducts: Array<CompatibleAtlassianProduct>;
    /** Level of access to an Atlassian product that this app can request */
    scopes: Array<CloudAppScope>;
};
export declare type MarketplaceCloudFortified = {
    __typename?: 'MarketplaceCloudFortified';
    status?: Maybe<MarketplaceCloudFortifiedStatus>;
};
export declare enum MarketplaceCloudFortifiedStatus {
    Approved = "APPROVED",
    NotAParticipant = "NOT_A_PARTICIPANT",
    Rejected = "REJECTED"
}
/** Connect app deployment properties */
export declare type MarketplaceConnectAppDeployment = MarketplaceAppDeployment & {
    __typename?: 'MarketplaceConnectAppDeployment';
    /** All Atlassian Products this app version is compatible with */
    compatibleProducts: Array<CompatibleAtlassianProduct>;
    /** Tells whether there Atlassian Connect app's descriptor file is available */
    isDescriptorFileAvailable: Scalars['Boolean'];
    /** Level of access to an Atlassian product that this app can request */
    scopes: Array<ConnectAppScope>;
};
/** Status of an entity in Marketplace system */
export declare enum MarketplaceEntityStatus {
    Active = "ACTIVE",
    Archived = "ARCHIVED"
}
/** An image file in Atlassian Marketplace system */
export declare type MarketplaceImageFile = {
    __typename?: 'MarketplaceImageFile';
    /** Height of the image */
    height: Scalars['Int'];
    /** Unique id of the file in Atlassian Marketplace system */
    id: Scalars['String'];
    /** Width of the image */
    width: Scalars['Int'];
};
/** Instructional app deployment properties */
export declare type MarketplaceInstructionalAppDeployment = MarketplaceAppDeployment & {
    __typename?: 'MarketplaceInstructionalAppDeployment';
    /** All Atlassian Products this app version is compatible with */
    compatibleProducts: Array<CompatibleAtlassianProduct>;
    /** Steps for installing the instructional app */
    instructions?: Maybe<Array<MarketplaceAppDeploymentStep>>;
    /** Tells whether this instructional app has a url for its binary */
    isBinaryUrlAvailable: Scalars['Boolean'];
};
export declare type MarketplaceListingHighlight = {
    __typename?: 'MarketplaceListingHighlight';
    /** Screenshot's explaination */
    caption?: Maybe<Scalars['String']>;
    /** Highlight's cropped screenshot */
    croppedScreenshot: MarketplaceListingImage;
    /** Highlight's screenshot */
    screenshot: MarketplaceListingScreenshot;
    /** Key feature summary. */
    summary?: Maybe<Scalars['String']>;
    /** A short action-oriented highlight title. */
    title?: Maybe<Scalars['String']>;
};
/** Image to be displayed on a listing in Marketplace */
export declare type MarketplaceListingImage = {
    __typename?: 'MarketplaceListingImage';
    /** High resolution image file */
    highResolution?: Maybe<MarketplaceImageFile>;
    /** Original image file uploaded */
    original: MarketplaceImageFile;
    /** Image scaled to get required size */
    scaled: MarketplaceImageFile;
};
export declare type MarketplaceListingScreenshot = {
    __typename?: 'MarketplaceListingScreenshot';
    /** Screenshot's explaination */
    caption?: Maybe<Scalars['String']>;
    /** Screenshot's image file */
    image: MarketplaceListingImage;
};
/** Status of app’s listing in Marketplace. */
export declare enum MarketplaceListingStatus {
    Private = "PRIVATE",
    Public = "PUBLIC",
    ReadyToLaunch = "READY_TO_LAUNCH",
    Rejected = "REJECTED",
    Submitted = "SUBMITTED"
}
/** Marketplace location */
export declare enum MarketplaceLocation {
    InProduct = "IN_PRODUCT",
    Website = "WEBSITE"
}
/** Marketplace Partners provide apps and integrations available for purchase on the Atlassian Marketplace that extend the power of Atlassian products. */
export declare type MarketplacePartner = {
    __typename?: 'MarketplacePartner';
    /** Marketplace Partner’s address */
    address?: Maybe<MarketplacePartnerAddress>;
    /** Marketplace Partner's contact details */
    contactDetails?: Maybe<MarketplacePartnerContactDetails>;
    /** Unique id of a Marketplace Partner. */
    id: Scalars['ID'];
    /** Name of Marketplace Partner */
    name: Scalars['String'];
    /** Tells if the Marketplace partner is an Atlassian’s internal one. */
    partnerType?: Maybe<MarketplacePartnerType>;
    /** Marketplace Programs that this Marketplace Partner has participated in. */
    programs?: Maybe<MarketplacePartnerPrograms>;
    /** An SEO-friendly URL pathname for this Marketplace Partner */
    slug: Scalars['String'];
    /** Marketplace Partner support information */
    support?: Maybe<MarketplacePartnerSupport>;
};
/** Marketplace Partner's address */
export declare type MarketplacePartnerAddress = {
    __typename?: 'MarketplacePartnerAddress';
    /** City of Marketplace Partner’s address */
    city?: Maybe<Scalars['String']>;
    /** Country of Marketplace Partner’s address */
    country?: Maybe<Scalars['String']>;
    /** Line 1 of Marketplace Partner’s address */
    line1?: Maybe<Scalars['String']>;
    /** Line 2 of Marketplace Partner’s address */
    line2?: Maybe<Scalars['String']>;
    /** Postal code of Marketplace Partner’s address */
    postalCode?: Maybe<Scalars['String']>;
    /** State of Marketplace Partner’s address */
    state?: Maybe<Scalars['String']>;
};
/** Marketplace Partner's contact information */
export declare type MarketplacePartnerContactDetails = {
    __typename?: 'MarketplacePartnerContactDetails';
    /** Marketplace Partner’s contact email id */
    emailId?: Maybe<Scalars['String']>;
    /** Marketplace Partner’s homepage URL */
    homepageUrl?: Maybe<Scalars['String']>;
    /** Marketplace Partner's other contact details */
    otherContactDetails?: Maybe<Scalars['String']>;
    /** Marketplace Partner’s contact phone number */
    phoneNumber?: Maybe<Scalars['String']>;
};
/** Marketplace Programs that this Marketplace Partner has participated in. */
export declare type MarketplacePartnerPrograms = {
    __typename?: 'MarketplacePartnerPrograms';
    isCloudAppSecuritySelfAssessmentDone?: Maybe<Scalars['Boolean']>;
};
/** Marketplace Partner's support information. */
export declare type MarketplacePartnerSupport = {
    __typename?: 'MarketplacePartnerSupport';
    /** Marketplace Partner’s support availability details */
    availability?: Maybe<MarketplacePartnerSupportAvailability>;
    /** Marketplace Partner’s support contact details */
    contactDetails?: Maybe<MarketplacePartnerSupportContact>;
};
/** Marketplace Partner's support availability information */
export declare type MarketplacePartnerSupportAvailability = {
    __typename?: 'MarketplacePartnerSupportAvailability';
    /** Days of week when Marketplace Partner support is available, as per ISO 8601 format for weekday, i.e. `1-7` for Monday - Sunday */
    daysOfWeek: Array<Scalars['Int']>;
    /** Support availability end time, in ISO time format `hh:mm` e.g, 23:25 */
    endTime?: Maybe<Scalars['String']>;
    /** Dates on which MarketplacePartner’s support is not available due to holiday */
    holidays: Array<MarketplacePartnerSupportHoliday>;
    /** Tells if the support is available for all 24 hours */
    isAvailable24Hours: Scalars['Boolean'];
    /** Support availability start time, in ISO time format `hh:mm` e.g, 23:25 */
    startTime?: Maybe<Scalars['String']>;
    /** Support availability timezone for startTime and endTime values. e.g, `America/Los_Angeles` */
    timezone: Scalars['String'];
    /** Support availability timezone in ISO 8601 format e.g. `+00:00`, `+05:30`, etc */
    timezoneOffset: Scalars['String'];
};
/** Marketplace Partner's support contact information */
export declare type MarketplacePartnerSupportContact = {
    __typename?: 'MarketplacePartnerSupportContact';
    /** Marketplace Partner’s support contact email id */
    emailId?: Maybe<Scalars['String']>;
    /** Marketplace Partner’s support contact phone number */
    phoneNumber?: Maybe<Scalars['String']>;
    /** Marketplace Partner’s support website URL */
    websiteUrl?: Maybe<Scalars['URL']>;
};
/** Marketplace Partner's support holiday */
export declare type MarketplacePartnerSupportHoliday = {
    __typename?: 'MarketplacePartnerSupportHoliday';
    /** Support holiday date, follows ISO date format `YYYY-MM-DD` e.g, 2020-08-12 */
    date: Scalars['String'];
    /** Tells whether it occurs one time or is annual. */
    holidayFrequency: MarketplacePartnerSupportHolidayFrequency;
    /** Holiday’s title */
    title: Scalars['String'];
};
/** Tells whether support is on holiday only one time or if it repeats annually. */
export declare enum MarketplacePartnerSupportHolidayFrequency {
    Annual = "ANNUAL",
    OneTime = "ONE_TIME"
}
/** Tells if the Marketplace partner is an Atlassian’s internal one. */
export declare enum MarketplacePartnerType {
    AtlassianInternal = "ATLASSIAN_INTERNAL"
}
/** Plugins1 app deployment properties */
export declare type MarketplacePlugins1AppDeployment = MarketplaceAppDeployment & {
    __typename?: 'MarketplacePlugins1AppDeployment';
    /** All Atlassian Products this app version is compatible with */
    compatibleProducts: Array<CompatibleAtlassianProduct>;
    /** Tells whether there is a deployment artifact */
    isDeploymentArtifactAvailable: Scalars['Boolean'];
};
/** Plugins2 app deployment properties */
export declare type MarketplacePlugins2AppDeployment = MarketplaceAppDeployment & {
    __typename?: 'MarketplacePlugins2AppDeployment';
    /** All Atlassian Products this app version is compatible with */
    compatibleProducts: Array<CompatibleAtlassianProduct>;
    /** Tells whether there is a deployment artifact */
    isDeploymentArtifactAvailable: Scalars['Boolean'];
};
/** Pricing items based on tiers */
export declare type MarketplacePricingItem = {
    __typename?: 'MarketplacePricingItem';
    /** The amount that a customer pays for a license at this tier */
    amount: Scalars['Float'];
    /** The upper limit for unit count (number of users of Jira, remote agents in Bamboo) defining this pricing tier. Null in case of highest tier */
    ceiling?: Maybe<Scalars['Int']>;
    /** The lower limit for unit count (number of users of Jira, remote agents in Bamboo) defining this pricing tier */
    floor: Scalars['Int'];
    /** Policy of the tier : BLOCK (FLAT) or PER_UNIT (PUP) */
    policy: MarketplacePricingTierPolicy;
};
/** Pricing plan for a marketplace entity */
export declare type MarketplacePricingPlan = {
    __typename?: 'MarketplacePricingPlan';
    /** Billing cycle of the marketplace entity */
    billingCycle: MarketplaceBillingCycle;
    /** Currency code for all items in the pricing plan. Defaults to USD */
    currency: Scalars['String'];
    /** Status of the plan : LIVE, PENDING or DRAFT */
    status: MarketplacePricingPlanStatus;
    /** Tiered Pricing for the plan */
    tieredPricing: MarketplaceTieredPricing;
};
/** Option parameters to fetch pricing plan for a marketplace entity */
export declare type MarketplacePricingPlanOptions = {
    /** Period for which Pricing Plan is to be fetched. Defaults to MONTHLY */
    billingCycle?: Maybe<MarketplaceBillingCycle>;
    /** Country code (ISO 3166-1 alpha-2) of the client. Either of currencyCode and countryCode is needed. If both are not present, fallback to default currency - USD */
    countryCode?: Maybe<Scalars['String']>;
    /** Currency code (ISO 4217) to return the amount in pricing items. Either of currencyCode and countryCode is needed. If currency code is not present, fallback to country code to fetch currency */
    currencyCode?: Maybe<Scalars['String']>;
    /** Fetch pricing plan with status: LIVE, PENDING, DRAFT. Unless, pricing plan will be fetched based on user access */
    planStatus?: Maybe<MarketplacePricingPlanStatus>;
};
/** Status of the plan : LIVE, PENDING or DRAFT */
export declare enum MarketplacePricingPlanStatus {
    Draft = "DRAFT",
    Live = "LIVE",
    Pending = "PENDING"
}
/** Mode of the tier : GRADUATED (progressive PUP), VOLUME (constant for all users) */
export declare enum MarketplacePricingTierMode {
    Graduated = "GRADUATED",
    Volume = "VOLUME"
}
/** Policy of the tier : BLOCK (FLAT) or PER_UNIT (PUP) */
export declare enum MarketplacePricingTierPolicy {
    Block = "BLOCK",
    PerUnit = "PER_UNIT"
}
/** Type of the tier */
export declare enum MarketplacePricingTierType {
    RemoteAgentTiered = "REMOTE_AGENT_TIERED",
    UserTiered = "USER_TIERED"
}
/** Atlassian Product for which apps are available in Marketplace */
export declare type MarketplaceSupportedAtlassianProduct = {
    __typename?: 'MarketplaceSupportedAtlassianProduct';
    /** Hosting options where the product is available */
    hostingOptions: Array<AtlassianProductHostingType>;
    /** Unique id of Atlassian product entity in marketplace system */
    id: Scalars['ID'];
    /** Name of Atlassian product */
    name: Scalars['String'];
};
/** Tiered pricing object for pricing plan */
export declare type MarketplaceTieredPricing = {
    __typename?: 'MarketplaceTieredPricing';
    /** List of pricing items */
    items: Array<MarketplacePricingItem>;
    /** Type of the tier */
    tierType: MarketplacePricingTierType;
    /** Mode of the tier : GRADUATED (progressive PUP), VOLUME (constant for all users) */
    tiersMode: MarketplacePricingTierMode;
};
/** Atlassian Marketplace User */
export declare type MarketplaceUser = {
    __typename?: 'MarketplaceUser';
    /** Permissions that a MarketplaceUser can have on MarketplaceApps */
    appPermissions: Array<MarketplaceAppPermission>;
    /** The accountId of the user. */
    id: Scalars['ID'];
};
/** Atlassian Marketplace User */
export declare type MarketplaceUserAppPermissionsArgs = {
    appId: Scalars['ID'];
};
/** Workflow app deployment properties */
export declare type MarketplaceWorkflowAppDeployment = MarketplaceAppDeployment & {
    __typename?: 'MarketplaceWorkflowAppDeployment';
    /** All Atlassian Products this app version is compatible with */
    compatibleProducts: Array<CompatibleAtlassianProduct>;
    /** Tells whether this workflow app has a JWB file */
    isWorkflowDataFileAvailable: Scalars['Boolean'];
};
export declare type MigrationKeys = {
    __typename?: 'MigrationKeys';
    confluence: Scalars['String'];
    jira: Scalars['String'];
};
/** Card mutations response */
export declare type MoveCardOutput = {
    __typename?: 'MoveCardOutput';
    clientMutationId?: Maybe<Scalars['ID']>;
    issuesWereTransitioned?: Maybe<Scalars['Boolean']>;
    message?: Maybe<Scalars['String']>;
    statusCode?: Maybe<Scalars['Int']>;
    success?: Maybe<Scalars['Boolean']>;
};
/** Move sprint down */
export declare type MoveSprintDownInput = {
    boardId: Scalars['ID'];
    sprintId: Scalars['ID'];
};
export declare type MoveSprintDownResponse = MutationResponse & {
    __typename?: 'MoveSprintDownResponse';
    boardScope?: Maybe<BoardScope>;
    message: Scalars['String'];
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
/** Move sprint up */
export declare type MoveSprintUpInput = {
    boardId: Scalars['ID'];
    sprintId: Scalars['ID'];
};
export declare type MoveSprintUpResponse = MutationResponse & {
    __typename?: 'MoveSprintUpResponse';
    boardScope?: Maybe<BoardScope>;
    message: Scalars['String'];
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
export declare type Mutation = {
    __typename?: 'Mutation';
    /**
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: AppEntityStorage` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    appStorage?: Maybe<AppStorageMutation>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    applyPolarisProjectTemplate?: Maybe<ApplyPolarisProjectTemplatePayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    archivePolarisInsights?: Maybe<ArchivePolarisInsightsPayload>;
    assignIssueParent?: Maybe<AssignIssueParentOutput>;
    /**
     * This mutation is currently in BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: boardCardMove` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    boardCardMove?: Maybe<MoveCardOutput>;
    /**
     * This API is currently in BETA. You must provide "X-ExperimentalApi:compass-beta" in your request header
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-beta` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    compass?: Maybe<CompassCatalogMutationApi>;
    completeSprint?: Maybe<CompleteSprintResponse>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    configurePolarisRefresh?: Maybe<ConfigurePolarisRefreshPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    copyPolarisInsights?: Maybe<CopyPolarisInsightsPayload>;
    /** Creates an application in Xen */
    createApp?: Maybe<CreateAppResponse>;
    createAppDeployment?: Maybe<CreateAppDeploymentResponse>;
    createAppDeploymentUrl?: Maybe<CreateAppDeploymentUrlResponse>;
    /**
     * Create multiple tunnels for an app
     *
     * This will allow api calls for this app to be tunnelled to a locally running
     * server to help with writing and debugging functions.
     *
     * This call covers both the FaaS tunnel as well as registering multiple Custom UI tunnels
     * that can then be used in the products instead of serving the usual CDN url.
     *
     * This call will fail if a tunnel already exists, unless the 'force' flag is set.
     *
     * Tunnels automatically expire after 30 minutes
     */
    createAppTunnels?: Maybe<CreateAppTunnelResponse>;
    createColumn?: Maybe<CreateColumnOutput>;
    createCustomFilter?: Maybe<CustomFilterCreateOutput>;
    /** Create a DevOps Service */
    createDevOpsService?: Maybe<CreateDevOpsServicePayload>;
    /** Creates a relationships between a DevOps Service and a Jira project */
    createDevOpsServiceAndJiraProjectRelationship?: Maybe<CreateDevOpsServiceAndJiraProjectRelationshipPayload>;
    /**
     * Create a relationship between a DevOps Service and an Opsgenie team.
     *
     * A DevOps Service can be related to no more than one team. If you attempt to relate more than one team
     * with a DevOps Service, this mutation will fail with a SERVICE_AND_OPSGENIE_TEAM_RELATIONSHIP_TOO_MANY_TEAMS error.
     *
     * A team can be related to no more than 1,000 DevOps Services. If you attempt to relate too many services
     * with a team, this mutation will fail with a SERVICE_AND_OPSGENIE_TEAM_RELATIONSHIP_TOO_MANY_SERVICES error.
     */
    createDevOpsServiceAndOpsgenieTeamRelationship?: Maybe<CreateDevOpsServiceAndOpsgenieTeamRelationshipPayload>;
    /**
     * Create a relationship between a DevOps Service and a Repository.
     *
     * A single service may be associated with at most 300 repositories. If too many repositories are associated with a
     * DevOps Service, this mutation will fail with a SERVICE_AND_REPOSITORY_RELATIONSHIP_TOO_MANY_REPOSITORIES error.
     *
     * A single Repository may be associated with at most 300 DevOps Services. If too many DevOps Services are associated with a
     * Repository, this mutation will fail with a SERVICE_AND_REPOSITORY_RELATIONSHIP_TOO_MANY_SERVICES error.
     */
    createDevOpsServiceAndRepositoryRelationship?: Maybe<CreateDevOpsServiceAndRepositoryRelationshipPayload>;
    /** Create a DevOps Service Relationship */
    createDevOpsServiceRelationship?: Maybe<CreateDevOpsServiceRelationshipPayload>;
    createHostedResourceUploadUrl?: Maybe<CreateHostedResourceUploadUrlPayload>;
    /** Create a relationship between a Jira project and an Opsgenie team. */
    createJiraProjectAndOpsgenieTeamRelationship?: Maybe<CreateJiraProjectAndOpsgenieTeamRelationshipPayload>;
    /**
     * Create a relationship between a Jira project and a repository.
     *
     * A single Jira project may be associated with at most 100 repositories. If too many repositories are associated with a
     * Jira project, this mutation will fail with a TOO_MANY_EXPLICIT_REPOSITORY_RELATIONSHIPS_FOR_PROJECT error.
     *
     * A single Repository may be associated with at most 100 Jira projects. If too many Jira projects are associated with a
     * repository, this mutation will fail with a TOO_MANY_EXPLICIT_PROJECT_RELATIONSHIPS_FOR_REPOSITORY error.
     */
    createJiraProjectAndRepositoryRelationship?: Maybe<CreateJiraProjectAndRepositoryRelationshipPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    createPolarisAnonymousVisitorHash?: Maybe<CreatePolarisAnonymousVisitorHashPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    createPolarisCalculatedField?: Maybe<CreatePolarisCalculatedFieldPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    createPolarisComment?: Maybe<CreatePolarisCommentPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    createPolarisDecoration?: Maybe<CreatePolarisDecorationPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    createPolarisInsight?: Maybe<CreatePolarisInsightPayload>;
    /**
     * Creates a new data point from a play contribution
     *
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    createPolarisInsightFromPlayContribution?: Maybe<CreatePolarisInsightPayload>;
    /**
     * Creates a new play.  A play will manifest as a field, and play
     * contributions will manifest as insights (data points) with
     * snippets associated with the play.
     *
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    createPolarisPlay?: Maybe<CreatePolarisPlayPayload>;
    /**
     * Creates or updates a contribution to a play.  The contribution
     * will manifest as an insight.  Returns an error if the contribution
     * is not acceptable to the parameters of the play, such as spending
     * more than the max amount in a BudgetAllocation ("$10 Game") play
     *
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    createPolarisPlayContribution?: Maybe<CreatePolarisPlayContributionPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    createPolarisStandardField?: Maybe<CreatePolarisStandardFieldPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    createPolarisView?: Maybe<CreatePolarisViewPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    createPolarisViewSet?: Maybe<CreatePolarisViewSetPayload>;
    createSprint?: Maybe<CreateSprintResponse>;
    /**
     * Creates a webtrigger URL. If webtrigger url is already created for given `input` the old url will be returned
     * unless `forceCreate` flag is set to true - in that case new url will be always created.
     */
    createWebTriggerUrl?: Maybe<CreateWebTriggerUrlResponse>;
    /** This API is a wrapper for all CSP support Request mutations */
    customerSupport?: Maybe<SupportRequestCatalogMutationApi>;
    /** Deletes an application from Xen */
    deleteApp?: Maybe<DeleteAppResponse>;
    /**
     * Deletes a key-value pair for a given environment.
     *
     * This operation is idempotent.
     */
    deleteAppEnvironmentVariable?: Maybe<GenericMutationResponse>;
    /**
     * Delete tunnels for an app
     *
     * All FaaS traffic for this app will return to invoking the deployed function
     * instead of the tunnel url.
     *
     * Same will be done for the Custom UI tunnels, where the normal CDN url will be
     * used instead of the tunnel url.
     */
    deleteAppTunnels?: Maybe<GenericMutationResponse>;
    deleteColumn?: Maybe<DeleteColumnOutput>;
    /** Delete the custom filter with the specified custom filter ID */
    deleteCustomFilter?: Maybe<GenericMutationResponse>;
    /** Remove arbitrary property keys associated with an entity (service or relationship) */
    deleteDevOpsContainerRelationshipEntityProperties?: Maybe<DeleteDevOpsContainerRelationshipEntityPropertiesPayload>;
    /** Delete a DevOps Service */
    deleteDevOpsService?: Maybe<DeleteDevOpsServicePayload>;
    /** Deletes the relationship between a DevOps Service and a Jira project */
    deleteDevOpsServiceAndJiraProjectRelationship?: Maybe<DeleteDevOpsServiceAndJiraProjectRelationshipPayload>;
    /** Delete a relationship between a DevOps Service and an Opsgenie team */
    deleteDevOpsServiceAndOpsgenieTeamRelationship?: Maybe<DeleteDevOpsServiceAndOpsgenieTeamRelationshipPayload>;
    /** Delete a relationship between a DevOps Service and a Repository */
    deleteDevOpsServiceAndRepositoryRelationship?: Maybe<DeleteDevOpsServiceAndRepositoryRelationshipPayload>;
    /** Remove arbitrary property keys associated with a DevOpsService */
    deleteDevOpsServiceEntityProperties?: Maybe<DeleteDevOpsServiceEntityPropertiesPayload>;
    /** Delete a DevOps Service Relationship */
    deleteDevOpsServiceRelationship?: Maybe<DeleteDevOpsServiceRelationshipPayload>;
    /** Delete a relationship between a Jira project and an Opsgenie team. */
    deleteJiraProjectAndOpsgenieTeamRelationship?: Maybe<DeleteJiraProjectAndOpsgenieTeamRelationshipPayload>;
    /** Delete a relationship between a Jira project and a repository. */
    deleteJiraProjectAndRepositoryRelationship?: Maybe<DeleteJiraProjectAndRepositoryRelationshipPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    deletePolarisAnonymousVisitorHash?: Maybe<DeletePolarisAnonymousVisitorHashPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    deletePolarisDecoration?: Maybe<DeletePolarisDecorationPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    deletePolarisField?: Maybe<DeletePolarisFieldPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    deletePolarisFieldOption?: Maybe<DeletePolarisFieldOptionPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    deletePolarisInsight?: Maybe<DeletePolarisInsightPayload>;
    /**
     * Deletes an existing contribution to a play.
     *
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    deletePolarisPlayContribution?: Maybe<DeletePolarisPlayContributionPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    deletePolarisView?: Maybe<DeletePolarisViewPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    deletePolarisViewSet?: Maybe<DeletePolarisViewSetPayload>;
    deleteSprint?: Maybe<MutationResponse>;
    /** Deletes a webtrigger URL. */
    deleteWebTriggerUrl?: Maybe<DeleteWebTriggerUrlResponse>;
    ecosystem?: Maybe<EcosystemMutation>;
    editSprint?: Maybe<SprintResponse>;
    /** Installs a given app + environment pair into a given installation context. */
    installApp?: Maybe<AppInstallationResponse>;
    /**
     * Invoke a function using the aux effects handling pipeline
     *
     * This includes some additional processing over normal invocations, including
     * validation and transformation, and expects functions to return payloads that
     * match the AUX effects spec.
     */
    invokeAuxEffects?: Maybe<InvokeAuxEffectsResponse>;
    /**
     * Invoke a function associated with a specific extension.
     *
     * This is intended to be the main way to interact with extension functions
     * created for apps
     */
    invokeExtension?: Maybe<InvokeExtensionResponse>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    invokePolarisObject?: Maybe<InvokePolarisObjectPayload>;
    /**
     * this field is added to enable self governed onboarding of Jira GraphQL types to AGG
     * see https://hello.atlassian.net/wiki/spaces/PSRV/pages/1010287708/Announcing+self+governed+APIs for more details
     */
    jira?: Maybe<JiraMutation>;
    moveSprintDown?: Maybe<MoveSprintDownResponse>;
    moveSprintUp?: Maybe<MoveSprintUpResponse>;
    rankColumn?: Maybe<RankColumnOutput>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    refreshPolarisSnippets?: Maybe<RefreshPolarisSnippetsPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    resolvePolarisObject?: Maybe<ResolvePolarisObjectPayload>;
    /**
     * Sets a key-value pair for a given environment.
     *
     * It will optionally support encryption of the provided pair for sensitive variables.
     * This operation is an upsert.
     */
    setAppEnvironmentVariable?: Maybe<GenericMutationResponse>;
    setColumnLimit?: Maybe<SetColumnLimitOutput>;
    setColumnName?: Maybe<SetColumnNameOutput>;
    /** Sets the estimation type for the board. Supported estimationTypes are STORY_POINTS and ORIGINAL_ESTIMATE */
    setEstimationType?: Maybe<GenericMutationResponse>;
    /**
     * Sets the outbound-auth service credentials in a specific environment for a given app.
     *
     * This makes the assumption that the environment (and hence container) was already created,
     * and the deploy containing the relevant outbound-auth service definition was already deployed.
     */
    setExternalAuthCredentials?: Maybe<SetExternalAuthCredentialsPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    setPolarisProjectOnboarded?: Maybe<SetPolarisProjectOnboardedPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    setPolarisSelectedDeliveryProject?: Maybe<SetPolarisSelectedDeliveryProjectPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    setPolarisSnippetPropertiesConfig?: Maybe<SetPolarisSnippetPropertiesConfigPayload>;
    /**
     * Sets the admin swimlane strategy for the board.  Use NONE is not using swimlanes.
     * Strategy effects everyone who views the board.
     */
    setSwimlaneStrategy?: Maybe<SetSwimlaneStrategyResponse>;
    /**
     * Sets the user swimlane strategy for the board.  Use NONE if not using swimlanes.
     * Strategy affects the current user alone.
     */
    setUserSwimlaneStrategy?: Maybe<SetSwimlaneStrategyResponse>;
    startSprint?: Maybe<SprintResponse>;
    subscribeToApp?: Maybe<AppSubscribePayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    unarchivePolarisInsights?: Maybe<UnarchivePolarisInsightsPayload>;
    unassignIssueParent?: Maybe<UnassignIssueParentOutput>;
    /** Uninstalls a given app + environment pair into a given installation context. */
    uninstallApp?: Maybe<AppUninstallationResponse>;
    unsubscribeFromApp?: Maybe<AppUnsubscribePayload>;
    /** Stop watching Marketplace App for updates */
    unwatchMarketplaceApp?: Maybe<UnwatchMarketplaceAppPayload>;
    updateAppDetails?: Maybe<UpdateAppDetailsResponse>;
    /** Update Atlassian OAuth Client details */
    updateAtlassianOAuthClient?: Maybe<UpdateAtlassianOAuthClientResponse>;
    updateCustomFilter?: Maybe<CustomFilterCreateOutput>;
    /** Add or change arbitrary (key, value) properties associated with an entity (service or relationship) */
    updateDevOpsContainerRelationshipEntityProperties?: Maybe<UpdateDevOpsContainerRelationshipEntityPropertiesPayload>;
    /** Update a DevOps Service */
    updateDevOpsService?: Maybe<UpdateDevOpsServicePayload>;
    /** Updates a relationship between a DevOps Service and a Jira project. */
    updateDevOpsServiceAndJiraProjectRelationship?: Maybe<UpdateDevOpsServiceAndJiraProjectRelationshipPayload>;
    /** Update description for a relationship between a DevOps Service and an Opsgenie team. */
    updateDevOpsServiceAndOpsgenieTeamRelationship?: Maybe<UpdateDevOpsServiceAndOpsgenieTeamRelationshipPayload>;
    /** Update a relationship between a DevOps Service and a repository */
    updateDevOpsServiceAndRepositoryRelationship?: Maybe<UpdateDevOpsServiceAndRepositoryRelationshipPayload>;
    /** Add or change arbitrary (key, value) properties associated with a DevOpsService */
    updateDevOpsServiceEntityProperties?: Maybe<UpdateDevOpsServiceEntityPropertiesPayload>;
    /** Update an DevOps Service Relationship */
    updateDevOpsServiceRelationship?: Maybe<UpdateDevOpsServiceRelationshipPayload>;
    /** Allows site admins to grant Forge log access to the app developer */
    updateDeveloperLogAccess?: Maybe<UpdateDeveloperLogAccessPayload>;
    /** Update a relationship between a Jira project and an Opsgenie team. */
    updateJiraProjectAndOpsgenieTeamRelationship?: Maybe<UpdateJiraProjectAndOpsgenieTeamRelationshipPayload>;
    /** Update a relationship between a Jira project and a repository. */
    updateJiraProjectAndRepositoryRelationship?: Maybe<UpdateJiraProjectAndRepositoryRelationshipPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    updatePolarisCalculatedField?: Maybe<UpdatePolarisCalculatedFieldPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    updatePolarisComment?: Maybe<UpdatePolarisCommentPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    updatePolarisDecoration?: Maybe<UpdatePolarisDecorationPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    updatePolarisFieldDescription?: Maybe<UpdatePolarisFieldDescriptionPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    updatePolarisFieldOptionWeight?: Maybe<UpdatePolarisFieldOptionWeightPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    updatePolarisIdea?: Maybe<UpdatePolarisIdeaPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    updatePolarisInsight?: Maybe<UpdatePolarisInsightPayload>;
    /**
     * Updates an existing contribution to a play.
     *
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    updatePolarisPlayContribution?: Maybe<UpdatePolarisPlayContributionPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    updatePolarisTermsConsent?: Maybe<UpdatePolarisTermsConsentPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    updatePolarisView?: Maybe<UpdatePolarisViewPayload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    updatePolarisViewRankV2?: Maybe<UpdatePolarisViewRankV2Payload>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    updatePolarisViewSet?: Maybe<UpdatePolarisViewSetPayload>;
    /** Upgrades a given app + environment pair into a given installation context. */
    upgradeApp?: Maybe<AppInstallationUpgradeResponse>;
    userAuthTokenForExtension: UserAuthTokenForExtensionResponse;
    /** Start watching Marketplace App for updates */
    watchMarketplaceApp?: Maybe<WatchMarketplaceAppPayload>;
};
export declare type MutationApplyPolarisProjectTemplateArgs = {
    input: ApplyPolarisProjectTemplateInput;
};
export declare type MutationArchivePolarisInsightsArgs = {
    containers?: Maybe<Array<Scalars['ID']>>;
    project: Scalars['ID'];
};
export declare type MutationAssignIssueParentArgs = {
    input?: Maybe<AssignIssueParentInput>;
};
export declare type MutationBoardCardMoveArgs = {
    input?: Maybe<BoardCardMoveInput>;
};
export declare type MutationCompleteSprintArgs = {
    input?: Maybe<CompleteSprintInput>;
};
export declare type MutationConfigurePolarisRefreshArgs = {
    input: ConfigurePolarisRefreshInput;
};
export declare type MutationCopyPolarisInsightsArgs = {
    input: CopyPolarisInsightsInput;
};
export declare type MutationCreateAppArgs = {
    input: CreateAppInput;
};
export declare type MutationCreateAppDeploymentArgs = {
    input: CreateAppDeploymentInput;
};
export declare type MutationCreateAppDeploymentUrlArgs = {
    input: CreateAppDeploymentUrlInput;
};
export declare type MutationCreateAppTunnelsArgs = {
    input: CreateAppTunnelsInput;
};
export declare type MutationCreateColumnArgs = {
    input?: Maybe<CreateColumnInput>;
};
export declare type MutationCreateCustomFilterArgs = {
    input?: Maybe<CreateCustomFilterInput>;
};
export declare type MutationCreateDevOpsServiceArgs = {
    input: CreateDevOpsServiceInput;
};
export declare type MutationCreateDevOpsServiceAndJiraProjectRelationshipArgs = {
    input: CreateDevOpsServiceAndJiraProjectRelationshipInput;
};
export declare type MutationCreateDevOpsServiceAndOpsgenieTeamRelationshipArgs = {
    input: CreateDevOpsServiceAndOpsgenieTeamRelationshipInput;
};
export declare type MutationCreateDevOpsServiceAndRepositoryRelationshipArgs = {
    input: CreateDevOpsServiceAndRepositoryRelationshipInput;
};
export declare type MutationCreateDevOpsServiceRelationshipArgs = {
    input: CreateDevOpsServiceRelationshipInput;
};
export declare type MutationCreateHostedResourceUploadUrlArgs = {
    input: CreateHostedResourceUploadUrlInput;
};
export declare type MutationCreateJiraProjectAndOpsgenieTeamRelationshipArgs = {
    input: CreateJiraProjectAndOpsgenieTeamRelationshipInput;
};
export declare type MutationCreateJiraProjectAndRepositoryRelationshipArgs = {
    input: CreateJiraProjectAndRepositoryRelationshipInput;
};
export declare type MutationCreatePolarisAnonymousVisitorHashArgs = {
    id: Scalars['ID'];
};
export declare type MutationCreatePolarisCalculatedFieldArgs = {
    input: CreatePolarisCalculatedField;
};
export declare type MutationCreatePolarisCommentArgs = {
    input: CreatePolarisCommentInput;
};
export declare type MutationCreatePolarisDecorationArgs = {
    input: CreatePolarisDecorationInput;
};
export declare type MutationCreatePolarisInsightArgs = {
    input: CreatePolarisInsightInput;
};
export declare type MutationCreatePolarisInsightFromPlayContributionArgs = {
    input?: Maybe<CreatePolarisInsightFromPlayContributionInput>;
};
export declare type MutationCreatePolarisPlayArgs = {
    input: CreatePolarisPlayInput;
};
export declare type MutationCreatePolarisPlayContributionArgs = {
    input: CreatePolarisPlayContribution;
};
export declare type MutationCreatePolarisStandardFieldArgs = {
    input: CreatePolarisStandardFieldInput;
};
export declare type MutationCreatePolarisViewArgs = {
    input: CreatePolarisViewInput;
};
export declare type MutationCreatePolarisViewSetArgs = {
    input: CreatePolarisViewSetInput;
};
export declare type MutationCreateSprintArgs = {
    input?: Maybe<CreateSprintInput>;
};
export declare type MutationCreateWebTriggerUrlArgs = {
    forceCreate?: Maybe<Scalars['Boolean']>;
    input: WebTriggerUrlInput;
};
export declare type MutationDeleteAppArgs = {
    input: DeleteAppInput;
};
export declare type MutationDeleteAppEnvironmentVariableArgs = {
    input: DeleteAppEnvironmentVariableInput;
};
export declare type MutationDeleteAppTunnelsArgs = {
    input: DeleteAppTunnelInput;
};
export declare type MutationDeleteColumnArgs = {
    input?: Maybe<DeleteColumnInput>;
};
export declare type MutationDeleteCustomFilterArgs = {
    input?: Maybe<DeleteCustomFilterInput>;
};
export declare type MutationDeleteDevOpsContainerRelationshipEntityPropertiesArgs = {
    input: DeleteDevOpsContainerRelationshipEntityPropertiesInput;
};
export declare type MutationDeleteDevOpsServiceArgs = {
    input: DeleteDevOpsServiceInput;
};
export declare type MutationDeleteDevOpsServiceAndJiraProjectRelationshipArgs = {
    input: DeleteDevOpsServiceAndJiraProjectRelationshipInput;
};
export declare type MutationDeleteDevOpsServiceAndOpsgenieTeamRelationshipArgs = {
    input: DeleteDevOpsServiceAndOpsgenieTeamRelationshipInput;
};
export declare type MutationDeleteDevOpsServiceAndRepositoryRelationshipArgs = {
    input: DeleteDevOpsServiceAndRepositoryRelationshipInput;
};
export declare type MutationDeleteDevOpsServiceEntityPropertiesArgs = {
    input: DeleteDevOpsServiceEntityPropertiesInput;
};
export declare type MutationDeleteDevOpsServiceRelationshipArgs = {
    input: DeleteDevOpsServiceRelationshipInput;
};
export declare type MutationDeleteJiraProjectAndOpsgenieTeamRelationshipArgs = {
    input: DeleteJiraProjectAndOpsgenieTeamRelationshipInput;
};
export declare type MutationDeleteJiraProjectAndRepositoryRelationshipArgs = {
    input: DeleteJiraProjectAndRepositoryRelationshipInput;
};
export declare type MutationDeletePolarisAnonymousVisitorHashArgs = {
    hash: Scalars['String'];
};
export declare type MutationDeletePolarisDecorationArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeletePolarisFieldArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeletePolarisFieldOptionArgs = {
    input: DeletePolarisFieldOptionInput;
};
export declare type MutationDeletePolarisInsightArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeletePolarisPlayContributionArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeletePolarisViewArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeletePolarisViewSetArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteSprintArgs = {
    input?: Maybe<DeleteSprintInput>;
};
export declare type MutationDeleteWebTriggerUrlArgs = {
    id: Scalars['ID'];
};
export declare type MutationEditSprintArgs = {
    input?: Maybe<EditSprintInput>;
};
export declare type MutationInstallAppArgs = {
    input: AppInstallationInput;
};
export declare type MutationInvokeAuxEffectsArgs = {
    input: InvokeAuxEffectsInput;
};
export declare type MutationInvokeExtensionArgs = {
    input: InvokeExtensionInput;
};
export declare type MutationInvokePolarisObjectArgs = {
    input: InvokePolarisObjectInput;
};
export declare type MutationMoveSprintDownArgs = {
    input?: Maybe<MoveSprintDownInput>;
};
export declare type MutationMoveSprintUpArgs = {
    input?: Maybe<MoveSprintUpInput>;
};
export declare type MutationRankColumnArgs = {
    input?: Maybe<RankColumnInput>;
};
export declare type MutationRefreshPolarisSnippetsArgs = {
    input: RefreshPolarisSnippetsInput;
};
export declare type MutationResolvePolarisObjectArgs = {
    input: ResolvePolarisObjectInput;
};
export declare type MutationSetAppEnvironmentVariableArgs = {
    input: SetAppEnvironmentVariableInput;
};
export declare type MutationSetColumnLimitArgs = {
    input?: Maybe<SetColumnLimitInput>;
};
export declare type MutationSetColumnNameArgs = {
    input?: Maybe<SetColumnNameInput>;
};
export declare type MutationSetEstimationTypeArgs = {
    input?: Maybe<SetEstimationTypeInput>;
};
export declare type MutationSetExternalAuthCredentialsArgs = {
    input: SetExternalAuthCredentialsInput;
};
export declare type MutationSetPolarisProjectOnboardedArgs = {
    input: SetPolarisProjectOnboardedInput;
};
export declare type MutationSetPolarisSelectedDeliveryProjectArgs = {
    input: SetPolarisSelectedDeliveryProjectInput;
};
export declare type MutationSetPolarisSnippetPropertiesConfigArgs = {
    input: SetPolarisSnippetPropertiesConfigInput;
};
export declare type MutationSetSwimlaneStrategyArgs = {
    input?: Maybe<SetSwimlaneStrategyInput>;
};
export declare type MutationSetUserSwimlaneStrategyArgs = {
    input?: Maybe<SetSwimlaneStrategyInput>;
};
export declare type MutationStartSprintArgs = {
    input?: Maybe<StartSprintInput>;
};
export declare type MutationSubscribeToAppArgs = {
    input: AppSubscribeInput;
};
export declare type MutationUnarchivePolarisInsightsArgs = {
    containers?: Maybe<Array<Scalars['ID']>>;
    project: Scalars['ID'];
};
export declare type MutationUnassignIssueParentArgs = {
    input?: Maybe<UnassignIssueParentInput>;
};
export declare type MutationUninstallAppArgs = {
    input: AppUninstallationInput;
};
export declare type MutationUnsubscribeFromAppArgs = {
    input: AppUnsubscribeInput;
};
export declare type MutationUnwatchMarketplaceAppArgs = {
    id: Scalars['ID'];
};
export declare type MutationUpdateAppDetailsArgs = {
    input: UpdateAppDetailsInput;
};
export declare type MutationUpdateAtlassianOAuthClientArgs = {
    input: UpdateAtlassianOAuthClientInput;
};
export declare type MutationUpdateCustomFilterArgs = {
    input?: Maybe<UpdateCustomFilterInput>;
};
export declare type MutationUpdateDevOpsContainerRelationshipEntityPropertiesArgs = {
    input: UpdateDevOpsContainerRelationshipEntityPropertiesInput;
};
export declare type MutationUpdateDevOpsServiceArgs = {
    input: UpdateDevOpsServiceInput;
};
export declare type MutationUpdateDevOpsServiceAndJiraProjectRelationshipArgs = {
    input: UpdateDevOpsServiceAndJiraProjectRelationshipInput;
};
export declare type MutationUpdateDevOpsServiceAndOpsgenieTeamRelationshipArgs = {
    input: UpdateDevOpsServiceAndOpsgenieTeamRelationshipInput;
};
export declare type MutationUpdateDevOpsServiceAndRepositoryRelationshipArgs = {
    input: UpdateDevOpsServiceAndRepositoryRelationshipInput;
};
export declare type MutationUpdateDevOpsServiceEntityPropertiesArgs = {
    input: UpdateDevOpsServiceEntityPropertiesInput;
};
export declare type MutationUpdateDevOpsServiceRelationshipArgs = {
    input: UpdateDevOpsServiceRelationshipInput;
};
export declare type MutationUpdateDeveloperLogAccessArgs = {
    input: UpdateDeveloperLogAccessInput;
};
export declare type MutationUpdateJiraProjectAndOpsgenieTeamRelationshipArgs = {
    input: UpdateJiraProjectAndOpsgenieTeamRelationshipInput;
};
export declare type MutationUpdateJiraProjectAndRepositoryRelationshipArgs = {
    input: UpdateJiraProjectAndRepositoryRelationshipInput;
};
export declare type MutationUpdatePolarisCalculatedFieldArgs = {
    input: UpdatePolarisCalculatedFieldInput;
};
export declare type MutationUpdatePolarisCommentArgs = {
    input: UpdatePolarisCommentInput;
};
export declare type MutationUpdatePolarisDecorationArgs = {
    delete?: Maybe<DeletePolarisDecorationInput>;
    id: Scalars['ID'];
    update?: Maybe<UpdatePolarisDecorationInput>;
};
export declare type MutationUpdatePolarisFieldDescriptionArgs = {
    input: UpdatePolarisFieldDescriptionInput;
};
export declare type MutationUpdatePolarisFieldOptionWeightArgs = {
    input: UpdatePolarisFieldOptionWeightInput;
};
export declare type MutationUpdatePolarisIdeaArgs = {
    idea: Scalars['ID'];
    project: Scalars['ID'];
    update: UpdatePolarisIdeaInput;
};
export declare type MutationUpdatePolarisInsightArgs = {
    id: Scalars['ID'];
    update: UpdatePolarisInsightInput;
};
export declare type MutationUpdatePolarisPlayContributionArgs = {
    id: Scalars['ID'];
    input: UpdatePolarisPlayContribution;
};
export declare type MutationUpdatePolarisTermsConsentArgs = {
    input: UpdatePolarisTermsConsentInput;
};
export declare type MutationUpdatePolarisViewArgs = {
    id: Scalars['ID'];
    input: UpdatePolarisViewInput;
};
export declare type MutationUpdatePolarisViewRankV2Args = {
    id: Scalars['ID'];
    input: UpdatePolarisViewRankInput;
};
export declare type MutationUpdatePolarisViewSetArgs = {
    input: UpdatePolarisViewSetInput;
};
export declare type MutationUpgradeAppArgs = {
    input: AppInstallationUpgradeInput;
};
export declare type MutationUserAuthTokenForExtensionArgs = {
    input: UserAuthTokenForExtensionInput;
};
export declare type MutationWatchMarketplaceAppArgs = {
    id: Scalars['ID'];
};
/** An error that has occurred in response to a mutation */
export declare type MutationError = {
    __typename?: 'MutationError';
    /** A list of extension properties to the error */
    extensions?: Maybe<MutationErrorExtension>;
    /** A human readable error message */
    message?: Maybe<Scalars['String']>;
};
/**
 * A error type that can be returned in response to a failed mutation
 *
 * This extension carries additional categorisation information about the error
 */
export declare type MutationErrorExtension = {
    /** Application specific error type */
    errorType?: Maybe<Scalars['String']>;
    /** A numerical code (such as a HTTP status code) representing the error category */
    statusCode?: Maybe<Scalars['Int']>;
};
/**
 * A mutation response interface.
 *
 * According to the Atlassian standards, all mutations should return a type which implements this interface.
 *
 * [Apollo GraphQL Documentation](https://www.apollographql.com/docs/apollo-server/essentials/schema#mutation-responses)
 */
export declare type MutationResponse = {
    /** A message for this mutation */
    message: Scalars['String'];
    /** A numerical code (such as a HTTP status code) representing the status of the mutation */
    statusCode: Scalars['Int'];
    /** Was this mutation successful */
    success: Scalars['Boolean'];
};
export declare type MyActivities = {
    __typename?: 'MyActivities';
    /**
     * get all activity for the currently logged in user
     * - filters - query filters for the activity stream
     * - first - show 1st <N> items of the response
     */
    all?: Maybe<ActivitiesConnection>;
    /**
     * get "viewed" activity for the currently logged in user
     * - filters - query filters for the activity stream
     * - first - show 1st <N> items of the response
     */
    viewed?: Maybe<ActivitiesConnection>;
    /**
     * get "worked on" activity for the currently logged in user
     * - filters - query filters for the activity stream
     * - first - show 1st <N> items of the response
     */
    workedOn?: Maybe<ActivitiesConnection>;
};
export declare type MyActivitiesAllArgs = {
    after?: Maybe<Scalars['String']>;
    filters?: Maybe<Array<ActivitiesFilter>>;
    first?: Maybe<Scalars['Int']>;
};
export declare type MyActivitiesViewedArgs = {
    after?: Maybe<Scalars['String']>;
    filters?: Maybe<Array<ActivitiesFilter>>;
    first?: Maybe<Scalars['Int']>;
};
export declare type MyActivitiesWorkedOnArgs = {
    after?: Maybe<Scalars['String']>;
    filters?: Maybe<Array<ActivitiesFilter>>;
    first?: Maybe<Scalars['Int']>;
};
/** This allows you to hydrate new values into fields */
export declare type NadelHydrationArgument = {
    name: Scalars['String'];
    value: Scalars['String'];
};
/**
 * From the [relay Node specification](https://relay.dev/graphql/objectidentification.htm#sec-Node-Interface)
 *
 * The server must provide an interface called `Node`. That interface must include exactly one field, called `id` that returns a non-null `ID`.
 *
 * This `id` should be a globally unique identifier for this object, and given just this `id`, the server should be able to refetch the object.
 */
export declare type Node = {
    id: Scalars['ID'];
};
export declare type OpsgenieAlertCountByPriority = {
    __typename?: 'OpsgenieAlertCountByPriority';
    countPerDay?: Maybe<Array<Maybe<OpsgenieAlertCountPerDay>>>;
    priority?: Maybe<Scalars['String']>;
};
export declare type OpsgenieAlertCountPerDay = {
    __typename?: 'OpsgenieAlertCountPerDay';
    count?: Maybe<Scalars['Int']>;
    day?: Maybe<Scalars['String']>;
};
export declare type OpsgenieQuery = {
    __typename?: 'OpsgenieQuery';
    allOpsgenieTeams?: Maybe<OpsgenieTeamConnection>;
    myOpsgenieSchedules?: Maybe<Array<Maybe<OpsgenieSchedule>>>;
    opsgenieTeam?: Maybe<OpsgenieTeam>;
    /** for hydration batching, restricted to 25. */
    opsgenieTeams?: Maybe<Array<Maybe<OpsgenieTeam>>>;
    opsgenieTeamsWithServiceModificationPermissions?: Maybe<OpsgenieTeamConnection>;
};
export declare type OpsgenieQueryAllOpsgenieTeamsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    cloudId: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
export declare type OpsgenieQueryMyOpsgenieSchedulesArgs = {
    cloudId: Scalars['ID'];
};
export declare type OpsgenieQueryOpsgenieTeamArgs = {
    id: Scalars['ID'];
};
export declare type OpsgenieQueryOpsgenieTeamsArgs = {
    ids: Array<Scalars['ID']>;
};
export declare type OpsgenieQueryOpsgenieTeamsWithServiceModificationPermissionsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    cloudId: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
export declare type OpsgenieSchedule = {
    __typename?: 'OpsgenieSchedule';
    enabled?: Maybe<Scalars['Boolean']>;
    finalTimeline?: Maybe<OpsgenieScheduleTimeline>;
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    timezone?: Maybe<Scalars['String']>;
};
export declare type OpsgenieScheduleFinalTimelineArgs = {
    endTime: Scalars['DateTime'];
    startTime: Scalars['DateTime'];
};
export declare type OpsgenieSchedulePeriod = {
    __typename?: 'OpsgenieSchedulePeriod';
    endDate?: Maybe<Scalars['DateTime']>;
    /**  Enum? */
    recipient?: Maybe<OpsgenieSchedulePeriodRecipient>;
    startDate?: Maybe<Scalars['DateTime']>;
    type?: Maybe<Scalars['String']>;
};
export declare type OpsgenieSchedulePeriodRecipient = {
    __typename?: 'OpsgenieSchedulePeriodRecipient';
    id?: Maybe<Scalars['ID']>;
    type?: Maybe<Scalars['String']>;
    user?: Maybe<User>;
};
export declare type OpsgenieScheduleRotation = {
    __typename?: 'OpsgenieScheduleRotation';
    id?: Maybe<Scalars['ID']>;
    name?: Maybe<Scalars['String']>;
    order?: Maybe<Scalars['Int']>;
    periods?: Maybe<Array<Maybe<OpsgenieSchedulePeriod>>>;
};
export declare type OpsgenieScheduleTimeline = {
    __typename?: 'OpsgenieScheduleTimeline';
    endDate?: Maybe<Scalars['DateTime']>;
    rotations?: Maybe<Array<Maybe<OpsgenieScheduleRotation>>>;
    startDate?: Maybe<Scalars['DateTime']>;
};
export declare type OpsgenieTeam = Node & {
    __typename?: 'OpsgenieTeam';
    alertCounts?: Maybe<Array<Maybe<OpsgenieAlertCountByPriority>>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    description?: Maybe<Scalars['String']>;
    /** The connection entity for DevOps Service relationships for this Opsgenie team. */
    devOpsServiceRelationships?: Maybe<DevOpsServiceAndOpsgenieTeamRelationshipConnection>;
    id: Scalars['ID'];
    /** The connection entity for Jira project relationships for this Opsgenie team. */
    jiraProjectRelationships?: Maybe<JiraProjectAndOpsgenieTeamRelationshipConnection>;
    members?: Maybe<OpsgenieTeamMemberConnection>;
    /**  ARI */
    name?: Maybe<Scalars['String']>;
    schedules?: Maybe<Array<Maybe<OpsgenieSchedule>>>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    url?: Maybe<Scalars['String']>;
};
export declare type OpsgenieTeamAlertCountsArgs = {
    endTime: Scalars['DateTime'];
    startTime: Scalars['DateTime'];
    tags?: Maybe<Array<Scalars['String']>>;
    timezone?: Maybe<Scalars['String']>;
};
export declare type OpsgenieTeamDevOpsServiceRelationshipsArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type OpsgenieTeamJiraProjectRelationshipsArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
};
export declare type OpsgenieTeamMembersArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
export declare type OpsgenieTeamConnection = {
    __typename?: 'OpsgenieTeamConnection';
    edges?: Maybe<Array<Maybe<OpsgenieTeamEdge>>>;
    pageInfo: PageInfo;
    totalCount?: Maybe<Scalars['Int']>;
};
export declare type OpsgenieTeamEdge = {
    __typename?: 'OpsgenieTeamEdge';
    cursor: Scalars['String'];
    node?: Maybe<OpsgenieTeam>;
};
export declare type OpsgenieTeamMember = {
    __typename?: 'OpsgenieTeamMember';
    user?: Maybe<User>;
};
export declare type OpsgenieTeamMemberConnection = {
    __typename?: 'OpsgenieTeamMemberConnection';
    edges?: Maybe<Array<Maybe<OpsgenieTeamMemberEdge>>>;
    pageInfo: PageInfo;
};
export declare type OpsgenieTeamMemberEdge = {
    __typename?: 'OpsgenieTeamMemberEdge';
    cursor: Scalars['String'];
    node?: Maybe<OpsgenieTeamMember>;
};
export declare type OriginalEstimate = {
    __typename?: 'OriginalEstimate';
    value?: Maybe<Scalars['Float']>;
    valueAsText?: Maybe<Scalars['String']>;
};
/**
 * Relay-style PageInfo type.
 *
 * See [PageInfo specification](https://relay.dev/assets/files/connections-932f4f2cdffd79724ac76373deb30dc8.htm#sec-undefined.PageInfo)
 */
export declare type PageInfo = {
    __typename?: 'PageInfo';
    /** endCursor must be the cursor corresponding to the last node in `edges`. */
    endCursor?: Maybe<Scalars['String']>;
    /**
     * `hasNextPage` is used to indicate whether more edges exist following the set defined by the clients arguments. If the client is paginating
     * with `first` / `after`, then the server must return true if further edges exist, otherwise false. If the client is paginating with `last` / `before`,
     * then the client may return true if edges further from before exist, if it can do so efficiently, otherwise may return false.
     */
    hasNextPage: Scalars['Boolean'];
    /**
     * `hasPreviousPage` is used to indicate whether more edges exist prior to the set defined by the clients arguments. If the client is paginating
     * with `last` / `before`, then the server must return true if prior edges exist, otherwise false. If the client is paginating with `first` / `after`,
     * then the client may return true if edges prior to after exist, if it can do so efficiently, otherwise may return false.
     */
    hasPreviousPage: Scalars['Boolean'];
    /** startCursor must be the cursor corresponding to the first node in `edges`. */
    startCursor?: Maybe<Scalars['String']>;
};
/** The general shape of a mutation response. */
export declare type Payload = {
    /** A list of errors if the mutation was not successful */
    errors?: Maybe<Array<MutationError>>;
    /** Was this mutation successful */
    success: Scalars['Boolean'];
};
export declare type PolarisAnonymousVisitorHash = PolarisAnonymousVisitorViewHash;
export declare type PolarisAnonymousVisitorViewHash = {
    __typename?: 'PolarisAnonymousVisitorViewHash';
    cloudId: Scalars['String'];
    hash: Scalars['String'];
    projectId: Scalars['Int'];
    projectKey: Scalars['String'];
    viewId: Scalars['Int'];
};
export declare type PolarisComment = {
    __typename?: 'PolarisComment';
    aaid: Scalars['String'];
    account?: Maybe<User>;
    content: Scalars['JSON'];
    created: Scalars['String'];
    id: Scalars['ID'];
    kind: PolarisCommentKind;
    subject: Scalars['ID'];
    updated: Scalars['String'];
};
export declare enum PolarisCommentKind {
    PlayContribution = "PLAY_CONTRIBUTION",
    View = "VIEW"
}
export declare type PolarisConnectApp = {
    __typename?: 'PolarisConnectApp';
    /**
     * appId is the CaaS app id.  Note that a single app may have
     * multiple oauth client ids, notably when deployed in different
     * environments such as staging and production
     */
    appId?: Maybe<Scalars['String']>;
    /** avatarUrl of CaaS app */
    avatarUrl: Scalars['String'];
    /**
     * the oauthClientId, which functions as the unique identifier id of CaaS app
     * for our purposes
     */
    id: Scalars['ID'];
    /** name of CaaS app */
    name: Scalars['String'];
    /** oauthClientId of CaaS app */
    oauthClientId: Scalars['String'];
    play?: Maybe<PolarisPlay>;
};
export declare type PolarisDecoration = {
    __typename?: 'PolarisDecoration';
    id: Scalars['ID'];
    /** The decoration to apply to a matched value. */
    valueDecoration: PolarisValueDecoration;
    /** The decoration can be applied when a value matches all rules in this array. */
    valueRules: Array<PolarisValueRule>;
};
export declare type PolarisDecorationScheme = {
    __typename?: 'PolarisDecorationScheme';
    fields: Array<PolarisIdeaField>;
    id: Scalars['ID'];
};
export declare type PolarisDelegationToken = {
    __typename?: 'PolarisDelegationToken';
    expires: Scalars['String'];
    token: Scalars['String'];
    url: Scalars['String'];
};
/** ##### Input ####### */
export declare enum PolarisFieldType {
    PolarisIdeaDateField = "PolarisIdeaDateField",
    PolarisIdeaDateTimeField = "PolarisIdeaDateTimeField",
    PolarisIdeaLabelsField = "PolarisIdeaLabelsField",
    PolarisIdeaNumberField = "PolarisIdeaNumberField",
    PolarisIdeaOptionField = "PolarisIdeaOptionField",
    PolarisIdeaOptionsField = "PolarisIdeaOptionsField",
    PolarisIdeaPlayField = "PolarisIdeaPlayField",
    PolarisIdeaStringField = "PolarisIdeaStringField",
    PolarisIdeaUserField = "PolarisIdeaUserField",
    PolarisIdeaUsersField = "PolarisIdeaUsersField"
}
export declare type PolarisFilterInput = {
    jql?: Maybe<Scalars['String']>;
};
export declare type PolarisGroupValue = {
    __typename?: 'PolarisGroupValue';
    /**  a label value (which has no identity besides its string value) */
    id?: Maybe<Scalars['String']>;
    label?: Maybe<Scalars['String']>;
};
export declare type PolarisGroupValueInput = {
    /**  a label value (which has no identity besides its string value) */
    id?: Maybe<Scalars['String']>;
    label?: Maybe<Scalars['String']>;
};
export declare type PolarisIdea = {
    __typename?: 'PolarisIdea';
    archived?: Maybe<Scalars['Boolean']>;
    id: Scalars['ID'];
    lastCommentsViewedTimestamp?: Maybe<Scalars['String']>;
    lastInsightsViewedTimestamp?: Maybe<Scalars['String']>;
};
export declare type PolarisIdeaArchivedByField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaArchivedByField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaArchivedField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaArchivedField';
    archivedOption: PolarisIdeaFieldOption;
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaArchivedOnField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaArchivedOnField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaDateField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaDateField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaDateTimeField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaDateTimeField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaDocumentField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaDocumentField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
/**
 * An PolarisIdeaField is a unit of information that can be instantiated
 * for an PolarisIdea.
 */
export declare type PolarisIdeaField = {
    /**
     * An identifier for fields built in to Jira or Polaris.  For example, "Key" and
     * "Delivery progress" are builtin fields.
     */
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    /**
     * Values stored in this field can be decorated with visual elements
     * (emojis, colors, backgrounds) for distinction. For discrete types
     * such as Single/Multi select these will typically be exact matches
     * on the static values allowed by the field. For orderable types
     * such as strings, dates, numbers, etc decorations will more
     * commonly be applied using ranges.
     */
    decorations?: Maybe<Array<PolarisDecoration>>;
    /**
     * What is the default sort order?  This is the order you get on
     * "first click" of the column, and also the semantics of "ORDER BY"
     * without an ASC or DESC qualifier.
     */
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    /** Description */
    description?: Maybe<Scalars['String']>;
    /**
     * Are values in this field directly editable?  Some integrations
     * might bring in data that is not directly editable.
     */
    editable: Scalars['Boolean'];
    /**
     * A short identifier suitable for at least within this project,
     * but only supplied for fields that are returned via an PolarisIdea's fields
     * attribute.  If not present, this field represents a builtin field
     * on PolarisIdea.
     *
     *
     * This field is **deprecated** and will be removed in the future
     * @deprecated Field no longer supported
     */
    fieldId?: Maybe<Scalars['Int']>;
    /**
     * The name of the field built in to PolarisIdea, if this field represents
     * a builtin field.
     *
     *
     * This field is **deprecated** and will be removed in the future
     * @deprecated Field no longer supported
     */
    fieldName?: Maybe<Scalars['String']>;
    /** The formula for calculated fields; null for regular (stored) fields */
    formula?: Maybe<Scalars['JSON']>;
    /**
     * Is this field suitable for grouping operations like Board view?
     * (i.e., may it appear in the groupBy field in a view?)
     */
    groupable: Scalars['Boolean'];
    /** The fully qualified globally unique id (ARI) for this field */
    id: Scalars['ID'];
    /**
     * The key of this field in the `fields` structure if it is a Jira
     * field.  Not set for things that don't appear in the fields section
     * of a Jira issue object, such as "key"
     */
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    /**
     * Is this field suitable for linear operations like plotting on an axis?
     * (i.e., may it appear in the x or y field in a view?)
     */
    linearizable: Scalars['Boolean'];
    /**
     * Refines how we should present the field.  For example, a number
     * field might be presented with a Rating picker.
     */
    presentation?: Maybe<PolarisPresentation>;
    /**
     * Can rows be sorted by this field?  Some fields are not commensurate
     * and hence can't be sorted.
     */
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaFieldOption = {
    __typename?: 'PolarisIdeaFieldOption';
    id: Scalars['ID'];
    label: Scalars['String'];
    weight: Scalars['Int'];
};
export declare type PolarisIdeaIssueCommentsField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaIssueCommentsField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaIssueIdField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaIssueIdField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    /**  null, since the issueid is not a jira field */
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaIssueTypeField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaIssueTypeField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaKeyField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaKeyField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    /**  null, since the key field is not a jira field */
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaLabelsField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaLabelsField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaLinkedIssuesField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaLinkedIssuesField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaLinkedIssuesProgressField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaLinkedIssuesProgressField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaNumberField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaNumberField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaOptionField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaOptionField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    options?: Maybe<Array<PolarisIdeaFieldOption>>;
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaOptionsField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaOptionsField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    options?: Maybe<Array<PolarisIdeaFieldOption>>;
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaPlayField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaPlayField';
    /**  the associated play */
    aspect?: Maybe<Scalars['String']>;
    /**  the aspect of the play does this field represent (null=default) */
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    /**  probably nothing here for now */
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    play?: Maybe<PolarisPlay>;
    /**  no formula support for now */
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
/**
 * this is obsolete, but needs to be removed in the opposite order of
 * being added (i.e., from JFE first, then AGG, and finally here)
 */
export declare type PolarisIdeaSpecialField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaSpecialField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
    specialType?: Maybe<Scalars['String']>;
};
export declare type PolarisIdeaStatusField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaStatusField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaStringField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaStringField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaType = {
    __typename?: 'PolarisIdeaType';
    description?: Maybe<Scalars['String']>;
    iconUrl?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    name: Scalars['String'];
};
export declare type PolarisIdeaUserField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaUserField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaUsersField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaUsersField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeaVotesField = PolarisIdeaField & {
    __typename?: 'PolarisIdeaVotesField';
    builtin?: Maybe<BuiltinPolarisIdeaField>;
    decorations?: Maybe<Array<PolarisDecoration>>;
    defaultSortOrder?: Maybe<PolarisSortOrder>;
    description?: Maybe<Scalars['String']>;
    editable: Scalars['Boolean'];
    fieldId?: Maybe<Scalars['Int']>;
    fieldName?: Maybe<Scalars['String']>;
    formula?: Maybe<Scalars['JSON']>;
    groupable: Scalars['Boolean'];
    id: Scalars['ID'];
    jiraFieldKey?: Maybe<Scalars['String']>;
    label: Scalars['String'];
    linearizable: Scalars['Boolean'];
    presentation?: Maybe<PolarisPresentation>;
    sortable: Scalars['Boolean'];
};
export declare type PolarisIdeas = {
    __typename?: 'PolarisIdeas';
    ideas?: Maybe<Array<PolarisRestIdea>>;
    total: Scalars['Int'];
};
export declare type PolarisInsight = {
    __typename?: 'PolarisInsight';
    /** AAID of the user who owns the insight */
    aaid: Scalars['String'];
    account?: Maybe<User>;
    /**
     * The ID of the object within the project which contains this data
     * point (nee insight), if any.  In the usual case, if not null, this
     * is an idea (issue) ARI
     */
    container?: Maybe<Scalars['ID']>;
    /**  if an insight is from a play, a link to the play */
    contribs?: Maybe<Array<PolarisPlayContribution>>;
    /** Creation time of data point in RFC3339 format */
    created: Scalars['String'];
    /**
     * Description in ADF format.  See
     * https://developer.atlassian.com/platform/atlassian-document-format/
     */
    description?: Maybe<Scalars['JSON']>;
    /**
     * ARI of the insight, for example:
     *
     *    `ari:cloud:cebeacbd-f85e-483c-96ac-fd432a12ad1c:polaris-insight/10004`
     */
    id: Scalars['ID'];
    play?: Maybe<PolarisPlay>;
    /** Array of snippets attached to this data point. */
    snippets: Array<PolarisSnippet>;
    /** Updated time of data point in RFC3339 format */
    updated: Scalars['String'];
};
export declare type PolarisIssueLinkType = {
    __typename?: 'PolarisIssueLinkType';
    datapoint: Scalars['Int'];
    delivery: Scalars['Int'];
    merge: Scalars['Int'];
};
export declare type PolarisPlay = {
    __typename?: 'PolarisPlay';
    contribution?: Maybe<PolarisPlayContribution>;
    /**  the parameters used to define the play */
    contributions?: Maybe<Array<PolarisPlayContribution>>;
    /**  if there is a specific view for this play */
    fields?: Maybe<Array<PolarisIdeaPlayField>>;
    id: Scalars['ID'];
    /**  the label for the play */
    kind: PolarisPlayKind;
    label: Scalars['String'];
    /**  if there are fields for this play */
    parameters?: Maybe<Scalars['JSON']>;
    /**  the kind of play this is */
    view?: Maybe<PolarisView>;
};
export declare type PolarisPlayContributionArgs = {
    id: Scalars['ID'];
};
export declare type PolarisPlayContribution = {
    __typename?: 'PolarisPlayContribution';
    /**  the item to which the contribution applies (the idea) */
    aaid: Scalars['String'];
    amount?: Maybe<Scalars['Int']>;
    /**  when this contribution was last updated */
    appearsIn?: Maybe<PolarisInsight>;
    /**  the author of the contribution */
    comment?: Maybe<PolarisComment>;
    created: Scalars['String'];
    id: Scalars['ID'];
    play: PolarisPlay;
    /**  the play that contains the contribution */
    subject: Scalars['ID'];
    /**  when this contribution was created */
    updated: Scalars['String'];
};
export declare enum PolarisPlayKind {
    PolarisBudgetAllocationPlay = "PolarisBudgetAllocationPlay"
}
export declare type PolarisPresentation = {
    __typename?: 'PolarisPresentation';
    parameters?: Maybe<Scalars['JSON']>;
    /**
     * The type of presentation.  Intended to select the UI control for this
     * field.
     */
    type: Scalars['String'];
};
export declare type PolarisPresentationInput = {
    parameters?: Maybe<Scalars['JSON']>;
    type: Scalars['String'];
};
export declare type PolarisProject = {
    __typename?: 'PolarisProject';
    /** Jira activation ID */
    activationId?: Maybe<Scalars['String']>;
    arjConfiguration: ArjConfiguration;
    arjHierarchyConfiguration?: Maybe<Array<ArjHierarchyConfigurationLevel>>;
    /** Project avatar URL */
    avatarUrls: ProjectAvatars;
    fields: Array<PolarisIdeaField>;
    /**
     * ARI of the project which is a polaris project, for example:
     *
     *    `ari:cloud:cebeacbd-f85e-483c-96ac-fd432a12ad1c:project/10004`
     */
    id: Scalars['ID'];
    /**
     * Initially only expect to have one idea type per project.  Defining
     * as a list here for future expandability.
     */
    ideaTypes: Array<PolarisIdeaType>;
    ideas: Array<PolarisIdea>;
    insights?: Maybe<Array<PolarisInsight>>;
    issueLinkType: PolarisIssueLinkType;
    /** Every Jira project has a key */
    key: Scalars['String'];
    /** Every Jira project has a name */
    name: Scalars['String'];
    onboarded: Scalars['Boolean'];
    play?: Maybe<PolarisPlay>;
    plays?: Maybe<Array<PolarisPlay>>;
    rankField?: Maybe<Scalars['ID']>;
    refreshing: PolarisRefreshStatus;
    selectedDeliveryProject?: Maybe<Scalars['ID']>;
    /**
     * OAuth clients (and potentially other data providers) that have access
     * to this project.
     */
    snippetProviders?: Maybe<Array<PolarisSnippetProvider>>;
    statusCategories?: Maybe<Array<PolarisStatusCategory>>;
    template?: Maybe<PolarisProjectTemplate>;
    views: Array<PolarisView>;
    /** The view sets associated with this project */
    viewsets?: Maybe<Array<PolarisViewSet>>;
};
export declare type PolarisProjectPlayArgs = {
    id: Scalars['ID'];
};
export declare type PolarisProjectTemplate = {
    __typename?: 'PolarisProjectTemplate';
    ideas?: Maybe<Scalars['JSON']>;
};
export declare enum PolarisRefreshError {
    InternalError = "INTERNAL_ERROR",
    InvalidSnippet = "INVALID_SNIPPET",
    NeedAuth = "NEED_AUTH",
    NotFound = "NOT_FOUND"
}
export declare type PolarisRefreshInfo = {
    __typename?: 'PolarisRefreshInfo';
    /**  (timestamp) when will next be refreshed */
    autoSeconds?: Maybe<Scalars['Int']>;
    error?: Maybe<Scalars['String']>;
    /**  an error message */
    errorCode?: Maybe<Scalars['Int']>;
    /**  an error code */
    errorType?: Maybe<PolarisRefreshError>;
    /**  (timestamp) when it was queued */
    last?: Maybe<Scalars['String']>;
    /**  (timestamp) when was last refreshed */
    next?: Maybe<Scalars['String']>;
    /**  enum version of errorCode */
    queued?: Maybe<Scalars['String']>;
    /**  auto refresh interval in seconds */
    timeToLiveSeconds?: Maybe<Scalars['Int']>;
};
export declare type PolarisRefreshJob = {
    __typename?: 'PolarisRefreshJob';
    progress?: Maybe<PolarisRefreshJobProgress>;
    /**
     * If this is a synchronous refresh, we can return the newly refreshed snippets
     * directly.
     */
    refreshedSnippets?: Maybe<Array<PolarisSnippet>>;
};
export declare type PolarisRefreshJobProgress = {
    __typename?: 'PolarisRefreshJobProgress';
    errorCount: Scalars['Int'];
    pendingCount: Scalars['Int'];
};
export declare type PolarisRefreshStatus = {
    __typename?: 'PolarisRefreshStatus';
    count: Scalars['Int'];
    errors: Scalars['Int'];
    last?: Maybe<Scalars['String']>;
    pending: Scalars['Int'];
};
export declare enum PolarisResolvedObjectAuthType {
    ApiKey = "API_KEY",
    Oauth2 = "OAUTH2"
}
export declare type PolarisRestIdea = {
    __typename?: 'PolarisRestIdea';
    fields: Scalars['JSON'];
    id: Scalars['String'];
    key: Scalars['String'];
};
export declare type PolarisSnippet = {
    __typename?: 'PolarisSnippet';
    appInfo?: Maybe<PolarisConnectApp>;
    /** Data in JSON format */
    data?: Maybe<Scalars['JSON']>;
    /**
     * ARI of the snippet, for example:
     *
     *    `ari:cloud:cebeacbd-f85e-483c-96ac-fd432a12ad1c:polaris-snippet/10004`
     */
    id: Scalars['ID'];
    /** OauthClientId of CaaS app */
    oauthClientId: Scalars['String'];
    /** Snippet-level properties in JSON format. */
    properties?: Maybe<Scalars['JSON']>;
    /**
     * Information about the refreshing of this snippet.  Null if the snippet
     * is not refreshable.
     */
    refresh?: Maybe<PolarisRefreshInfo>;
    /** Timestamp of when the snippet was last updated */
    updated: Scalars['String'];
    /** Snippet url that is source of data */
    url?: Maybe<Scalars['String']>;
};
export declare type PolarisSnippetGroupDecl = {
    __typename?: 'PolarisSnippetGroupDecl';
    id: Scalars['ID'];
    key: Scalars['String'];
    /**  must be unique per PolarisSnippetProvider */
    label?: Maybe<Scalars['String']>;
    properties?: Maybe<Array<PolarisSnippetPropertyDecl>>;
};
export declare type PolarisSnippetPropertiesConfig = {
    __typename?: 'PolarisSnippetPropertiesConfig';
    config: Scalars['JSON'];
};
export declare type PolarisSnippetPropertyDecl = {
    __typename?: 'PolarisSnippetPropertyDecl';
    id: Scalars['ID'];
    key: Scalars['String'];
    kind?: Maybe<PolarisSnippetPropertyKind>;
    /**  must be unique per PolarisSnippetProvider */
    label?: Maybe<Scalars['String']>;
};
export declare enum PolarisSnippetPropertyKind {
    /**  1-5 integer rating */
    Labels = "LABELS",
    Number = "NUMBER",
    /**  generic number */
    Rating = "RATING"
}
export declare type PolarisSnippetProvider = {
    __typename?: 'PolarisSnippetProvider';
    app?: Maybe<PolarisConnectApp>;
    groups?: Maybe<Array<PolarisSnippetGroupDecl>>;
    id: Scalars['ID'];
    properties?: Maybe<Array<PolarisSnippetPropertyDecl>>;
};
export declare type PolarisSortField = {
    __typename?: 'PolarisSortField';
    field: PolarisIdeaField;
    order?: Maybe<PolarisSortOrder>;
};
export declare type PolarisSortFieldInput = {
    field: Scalars['ID'];
    order?: Maybe<PolarisSortOrder>;
};
export declare enum PolarisSortOrder {
    Asc = "ASC",
    Desc = "DESC"
}
export declare type PolarisStatusCategory = {
    __typename?: 'PolarisStatusCategory';
    colorName: Scalars['String'];
    id: Scalars['Int'];
    key: Scalars['String'];
    name: Scalars['String'];
};
export declare type PolarisTermsConsent = {
    __typename?: 'PolarisTermsConsent';
    consented: Scalars['Boolean'];
    locale: Scalars['String'];
    requiresMarketingConsent: Scalars['Boolean'];
};
export declare type PolarisValueDecoration = {
    __typename?: 'PolarisValueDecoration';
    backgroundColor?: Maybe<Scalars['String']>;
    emoji?: Maybe<Scalars['String']>;
    highlightContainer?: Maybe<Scalars['Boolean']>;
};
export declare type PolarisValueDecorationInput = {
    backgroundColor?: Maybe<Scalars['String']>;
    emoji?: Maybe<Scalars['String']>;
    highlightContainer?: Maybe<Scalars['Boolean']>;
};
export declare enum PolarisValueOperator {
    Eq = "EQ",
    Gt = "GT",
    Gte = "GTE",
    Lt = "LT",
    Lte = "LTE"
}
export declare type PolarisValueRule = {
    __typename?: 'PolarisValueRule';
    operator: PolarisValueOperator;
    value: Scalars['String'];
};
export declare type PolarisValueRuleInput = {
    operator: PolarisValueOperator;
    value: Scalars['String'];
};
export declare type PolarisView = {
    __typename?: 'PolarisView';
    /** A token for talking to pf-collab-service */
    collabServiceDelegation?: Maybe<PolarisDelegationToken>;
    /** The comment stream */
    comments?: Maybe<Array<PolarisComment>>;
    /** View contains archived ideas */
    containsArchived: Scalars['Boolean'];
    description?: Maybe<Scalars['JSON']>;
    fields: Array<PolarisIdeaField>;
    filter?: Maybe<Array<PolarisViewFilter>>;
    groupBy?: Maybe<PolarisIdeaField>;
    groupValues?: Maybe<Array<PolarisGroupValue>>;
    hidden?: Maybe<Array<PolarisIdeaField>>;
    /**
     * ARI of the polaris view itself.  For example,
     *
     *    `ari:cloud:cebeacbd-f85e-483c-96ac-fd432a12ad1c:polaris-view/10003`
     */
    id: Scalars['ID'];
    /**
     * Can the view be changed in-place?  Immutable views can be the
     * source of a clone operation, but it is an error to try to update
     * one.
     */
    immutable?: Maybe<Scalars['Boolean']>;
    /**
     * The JQL that would produce the same set of issues as are returned by
     * the ideas connection
     */
    jql?: Maybe<Scalars['String']>;
    lastCommentsViewedTimestamp?: Maybe<Scalars['String']>;
    lastViewed?: Maybe<Array<Maybe<PolarisViewLastViewed>>>;
    name: Scalars['String'];
    projectId: Scalars['Int'];
    /** view rank / position */
    rank: Scalars['Int'];
    sort?: Maybe<Array<PolarisSortField>>;
    /** The user-supplied part of a JQL filter */
    userJql?: Maybe<Scalars['String']>;
    verticalGroupBy?: Maybe<PolarisIdeaField>;
    verticalGroupValues?: Maybe<Array<PolarisGroupValue>>;
    viewSetId: Scalars['ID'];
    /**
     * this is being flattened out from the visualization substructure;
     * these view attributes are all modelled as optional, and their
     * significance depends on the selected visualizationType
     */
    visualizationType: PolarisVisualizationType;
    x?: Maybe<PolarisIdeaField>;
    y?: Maybe<PolarisIdeaField>;
};
export declare type PolarisViewCommentsArgs = {
    limit?: Maybe<Scalars['Int']>;
};
export declare type PolarisViewJqlArgs = {
    filter?: Maybe<PolarisFilterInput>;
};
export declare type PolarisViewFilter = {
    __typename?: 'PolarisViewFilter';
    field?: Maybe<PolarisIdeaField>;
    kind: PolarisViewFilterKind;
    values: Array<PolarisViewFilterValue>;
};
export declare type PolarisViewFilterInput = {
    field?: Maybe<Scalars['ID']>;
    kind: PolarisViewFilterKind;
    values: Array<PolarisViewFilterValueInput>;
};
export declare enum PolarisViewFilterKind {
    FieldIdentity = "FIELD_IDENTITY",
    /**  a field being matched by identity */
    FieldNumeric = "FIELD_NUMERIC",
    /**  a field being matched by numeric comparison */
    Text = "TEXT"
}
export declare enum PolarisViewFilterOperator {
    Eq = "EQ",
    Gt = "GT",
    Gte = "GTE",
    Lt = "LT",
    Lte = "LTE",
    Neq = "NEQ"
}
export declare type PolarisViewFilterValue = {
    __typename?: 'PolarisViewFilterValue';
    numericValue?: Maybe<Scalars['Float']>;
    operator?: Maybe<PolarisViewFilterOperator>;
    stringValue?: Maybe<Scalars['String']>;
};
export declare type PolarisViewFilterValueInput = {
    operator?: Maybe<PolarisViewFilterOperator>;
    text?: Maybe<Scalars['String']>;
    value?: Maybe<Scalars['Float']>;
};
export declare type PolarisViewLastViewed = {
    __typename?: 'PolarisViewLastViewed';
    aaid: Scalars['String'];
    account?: Maybe<User>;
    timestamp: Scalars['String'];
};
export declare type PolarisViewSet = {
    __typename?: 'PolarisViewSet';
    /**
     * ARI of the polaris viewSet itself.  For example,
     *
     *    `ari:cloud:cebeacbd-f85e-483c-96ac-fd432a12ad1c:viewset/10001`
     */
    id: Scalars['ID'];
    name: Scalars['String'];
    /** view rank / position */
    rank: Scalars['Int'];
    type?: Maybe<PolarisViewSetType>;
    views: Array<PolarisView>;
    viewsets: Array<PolarisViewSet>;
};
export declare enum PolarisViewSetType {
    Capture = "CAPTURE",
    Custom = "CUSTOM",
    Deliver = "DELIVER",
    Prioritize = "PRIORITIZE",
    /**  for views that are used to manage the display of single ideas (e.g., Idea views) */
    Section = "SECTION",
    Single = "SINGLE",
    System = "SYSTEM"
}
export declare enum PolarisVisualizationType {
    Board = "BOARD",
    Table = "TABLE",
    Twoxtwo = "TWOXTWO"
}
export declare enum Product {
    Confluence = "Confluence",
    Jira = "Jira"
}
export declare type ProjectAvatars = {
    __typename?: 'ProjectAvatars';
    x16: Scalars['URL'];
    x24: Scalars['URL'];
    x32: Scalars['URL'];
    x48: Scalars['URL'];
};
export declare type Query = {
    __typename?: 'Query';
    /** Get user activities. */
    activities?: Maybe<Activities>;
    app?: Maybe<App>;
    /**
     * Returns the list of active tunnels for a given app-id and environment-key.
     *
     * The tunnels are active for 30min by default, if not requested to be terminated.
     */
    appActiveTunnels?: Maybe<AppTunnelDefinitions>;
    appDeployment?: Maybe<AppDeployment>;
    /** Returns information about all the scopes from different Atlassian products */
    appHostServices?: Maybe<Array<AppHostService>>;
    appInstallationTask?: Maybe<AppInstallationTask>;
    /**
     * `appLogLines()` returns an object for paging over the contents of a single
     * invocation's log lines, given by the `invocation` parameter (an ID
     * returned from a `appLogs()` query).
     *
     * Each `AppLogLine` consists of a `timestamp`, an optional `message`,
     * an optional `level`, and an `other` field that contains any
     * additional JSON fields included in the log line.  (Since
     * the app itself can control the schema of this JSON, we can't
     * use native GraphQL capabilities to describe the fields here.)
     *
     * The returned objects use the Relay naming/nesting style of
     * `AppLogLineConnection` &rarr; `[AppLogLineEdge]` &rarr;  `AppLogLine`.
     */
    appLogLines?: Maybe<AppLogLineConnection>;
    /**
     * `appLogs()` returns an object for paging over AppLog objects, each of which
     * represents one invocation of a function.
     *
     * The returned objects use the Relay naming/nesting style of
     * `AppLogConnection` &rarr; `[AppLogEdge]` &rarr;  `AppLog`.
     *
     * It takes parameters (`query: LogQueryInput`) to narrow down the invocations
     * being searched, requiring at least an app and environment.
     */
    appLogs?: Maybe<AppLogConnection>;
    /**
     * Get an list of untyped entity in a specific context, optional query parameters where condition, first and after
     *
     * where condition to filter
     * returns the first N entities when queried. Should not exceed 20
     * this is a cursor after which (exclusive) the data should be fetched from
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: AppEntityStorage` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    appStoredEntities?: Maybe<AppStoredEntityConnection>;
    /**
     * Get an list of untyped entity in a specific context, optional query parameters where condition, first and after
     * This endpoint should only be called by functions with cleanup: true, as it will be deprecated once a proper GDPR solution
     * is implemented.
     *
     * where condition to filter
     * returns the first N entities when queried. Should not exceed 100
     * this is a cursor after which (exclusive) the data should be fetched from
     *
     *
     * This field is **deprecated** and will be removed in the future
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: AppEntityStorage` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     * @deprecated This query is a temporary solution that will be removed
     */
    appStoredEntitiesForCleanup?: Maybe<AppStoredEntityConnection>;
    /**
     * Get an untyped entity in a specific context given a key
     *
     * Keys must be between 1-100 characters long and must match the following pattern /^[a-zA-Z0-9:._\s-]+$/
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: AppEntityStorage` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    appStoredEntity?: Maybe<AppStoredEntity>;
    apps?: Maybe<AppConnection>;
    bitbucket?: Maybe<BitbucketQuery>;
    /**
     * For the specified cloudId, retrieve the available Bitbucket repositories to link with a (new) service that has not been created yet.
     * If nameFilter is provided, only repositories with names containing this case-insensitive string will be returned.
     * With an existing service, the caller should use `devOpsService.bitbucketRepositoriesAvailableToLinkWith` field.
     */
    bitbucketRepositoriesAvailableToLinkWithNewDevOpsService?: Maybe<BitbucketRepositoryIdConnection>;
    boardScope?: Maybe<BoardScope>;
    codeInJira?: Maybe<CodeInJira>;
    /**
     * This API is currently in BETA. You must provide "X-ExperimentalApi:compass-beta" in your request header
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: compass-beta` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    compass?: Maybe<CompassCatalogQueryApi>;
    /** This API is a wrapper for all CSP support Request queries */
    customerSupport?: Maybe<SupportRequestCatalogQueryApi>;
    devOpsMetrics?: Maybe<DevOpsMetrics>;
    /** The DevOps Service with the specified ARI */
    devOpsService?: Maybe<DevOpsService>;
    /** Return the relationship between DevOps Service and Jira Project */
    devOpsServiceAndJiraProjectRelationship?: Maybe<DevOpsServiceAndJiraProjectRelationship>;
    /** Returns the relationship between DevOps Service and Opsgenie team with the specified id (graph service_and_opsgenie_team ARI) */
    devOpsServiceAndOpsgenieTeamRelationship?: Maybe<DevOpsServiceAndOpsgenieTeamRelationship>;
    /** Returns the relationship between DevOps Service and Repository */
    devOpsServiceAndRepositoryRelationship?: Maybe<DevOpsServiceAndRepositoryRelationship>;
    /** The DevOps Service Relationship with the specified ARI */
    devOpsServiceRelationship?: Maybe<DevOpsServiceRelationship>;
    /**
     * Return the connection entity for DevOps Service relationships for the specified Jira project, according to the specified
     * pagination, filtering and sorting.
     */
    devOpsServiceRelationshipsForJiraProject?: Maybe<DevOpsServiceAndJiraProjectRelationshipConnection>;
    /** Returns the service relationships linked to the Opsgenie team with the specified id (Opsgenie team ARI). */
    devOpsServiceRelationshipsForOpsgenieTeam?: Maybe<DevOpsServiceAndOpsgenieTeamRelationshipConnection>;
    /**
     * Returns the service relationships linked to the repository with the specified id.
     * The ID is either a Bitbucket repository ARI, or the ID of a third-party repository.
     */
    devOpsServiceRelationshipsForRepository?: Maybe<DevOpsServiceAndRepositoryRelationshipConnection>;
    /** Retrieve the list of DevOps Service Tiers for the specified site */
    devOpsServiceTiers?: Maybe<Array<DevOpsServiceTier>>;
    /** Retrieve all services for the site specified by cloudId. */
    devOpsServices?: Maybe<DevOpsServiceConnection>;
    /**
     * Retrieve DevOps Services for the specified ids, the ids can belong to different sites.
     * Services not found are simply not returned.
     * The maximum lookup limit is 100.
     */
    devOpsServicesById?: Maybe<Array<DevOpsService>>;
    /** Check if developer has access to logs */
    developerLogAccess?: Maybe<Array<Maybe<DeveloperLogAccessResult>>>;
    /**
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: IssueDevelopmentInformation` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    developmentInformation?: Maybe<IssueDevOpsDevelopmentInformation>;
    /**
     * This field will dump diagnostics information about currently executing graphql request.
     *
     * It is inspired in part by [https://httpbin.org/anything](https://httpbin.org/anything/)
     */
    diagnostics?: Maybe<Scalars['JSON']>;
    dvcs?: Maybe<DvcsQuery>;
    /** This field will echo back the word `echo`.  Its only useful for testing */
    echo?: Maybe<Scalars['String']>;
    ecosystem?: Maybe<EcosystemQuery>;
    extensionByKey?: Maybe<Extension>;
    extensionContexts?: Maybe<Array<ExtensionContext>>;
    extensionsEcho?: Maybe<Scalars['String']>;
    /** Return a list of installation contexts with forge logs access */
    installationContextsWithLogAccess?: Maybe<Array<InstallationContextWithLogAccess>>;
    /**
     * this field is added to enable self governed onboarding of Jira GraphQL types to AGG
     * see https://hello.atlassian.net/wiki/spaces/PSRV/pages/1010287708/Announcing+self+governed+APIs for more details
     */
    jira?: Maybe<JiraQuery>;
    /** Retrieve the specified Jira project and Opsgenie team relationship. */
    jiraProjectAndOpsgenieTeamRelationship?: Maybe<JiraProjectAndOpsgenieTeamRelationship>;
    /** The entity for the specified Jira project and repository relationship. */
    jiraProjectAndRepositoryRelationship?: Maybe<JiraProjectAndRepositoryRelationship>;
    /** Returns the Jira project relationships linked to the Opsgenie team with the specified id (Opsgenie team ARI). */
    jiraProjectRelationshipsForOpsgenieTeam?: Maybe<JiraProjectAndOpsgenieTeamRelationshipConnection>;
    /**
     * The connection entity for Jira project relationships for the specified repository, according to the specified
     * pagination, filtering and sorting.
     * The ID is either a Bitbucket repository ARI, or the ID of a third-party repository.
     */
    jiraProjectRelationshipsForRepository?: Maybe<JiraProjectAndRepositoryRelationshipConnection>;
    /**
     * Return the connection entity for Jira Project relationships for the specified DevOps Service, according to the specified
     * pagination, filtering and sorting.
     */
    jiraProjectRelationshipsForService?: Maybe<DevOpsServiceAndJiraProjectRelationshipConnection>;
    /**
     * Namespace for fields relating to issue releases in Jira.
     *
     * A "release" in this context can refer to a code deployment or a feature flag change.
     *
     * This field is currently in BETA.
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: jira-releases-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    jiraReleases?: Maybe<JiraReleases>;
    /** Get MarketplaceApp by appId. */
    marketplaceApp?: Maybe<MarketplaceApp>;
    /** Get MarketplaceApp by cloud app's Id. */
    marketplaceAppByCloudAppId?: Maybe<MarketplaceApp>;
    /** Get MarketplaceApp by appKey */
    marketplaceAppByKey?: Maybe<MarketplaceApp>;
    /** Get MarketplacePartner by id. */
    marketplacePartner?: Maybe<MarketplacePartner>;
    /** Get Pricing Plan for a marketplace entity */
    marketplacePricingPlan?: Maybe<MarketplacePricingPlan>;
    /** Get Atlassian marketplace user details */
    marketplaceUser?: Maybe<MarketplaceUser>;
    /**
     * This returns information about the currently logged in user.  If there is no logged in user
     * then there really wont be much information to show.
     */
    me: AuthenticationContext;
    movie?: Maybe<TestingMovie>;
    /** Relay-style lookup-individual-node-by-global-ID. */
    node?: Maybe<Node>;
    opsgenie?: Maybe<OpsgenieQuery>;
    /** Returns the Opsgenie Team relationship linked to the DevOps Service with the specified id (service ARI). */
    opsgenieTeamRelationshipForDevOpsService?: Maybe<DevOpsServiceAndOpsgenieTeamRelationship>;
    /** Returns the Opsgenie team relationships linked to the Jira project with the specified id (Jira project ARI). */
    opsgenieTeamRelationshipsForJiraProject?: Maybe<JiraProjectAndOpsgenieTeamRelationshipConnection>;
    polarisAPIVersion?: Maybe<Scalars['String']>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    polarisAnonymousVisitorHash?: Maybe<PolarisAnonymousVisitorHash>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    polarisAnonymousVisitorHashByID?: Maybe<PolarisAnonymousVisitorHash>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    polarisConnectAppByClientID?: Maybe<PolarisConnectApp>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    polarisIdeas?: Maybe<PolarisIdeas>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    polarisInsight?: Maybe<PolarisInsight>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    polarisInsights?: Maybe<Array<PolarisInsight>>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    polarisInsightsWithErrors?: Maybe<Array<PolarisInsight>>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    polarisLabels?: Maybe<Array<LabelUsage>>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    polarisLinkedDeliveryTickets?: Maybe<Array<Maybe<Scalars['JSON']>>>;
    /**
     * THIS QUERY IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    polarisProject?: Maybe<PolarisProject>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    polarisSnippetPropertiesConfig?: Maybe<PolarisSnippetPropertiesConfig>;
    /**
     * THIS OPERATION IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    polarisTermsConsent?: Maybe<PolarisTermsConsent>;
    /**
     * THIS QUERY IS IN BETA
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: polaris-v0` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    polarisView?: Maybe<PolarisView>;
    /** Returns the repository relationships linked to the service with the specified id (service ARI). */
    repositoryRelationshipsForDevOpsService?: Maybe<DevOpsServiceAndRepositoryRelationshipConnection>;
    /**
     * The connection entity for repository relationships for the specified Jira project, according to the specified
     * pagination, filtering and sorting.
     */
    repositoryRelationshipsForJiraProject?: Maybe<JiraProjectAndRepositoryRelationshipConnection>;
    /**
     * Query for grouping the roadmap queries
     *
     * ### Beta Field
     *
     * This field is currently in a beta phase and may change without notice.
     *
     * To use this field you must set a `X-ExperimentalApi: RoadmapsQuery` HTTP header.
     *
     * Use of this header indicates that they are opting into the experimental preview of this field.
     *
     * If you do not set this header then request will be rejected outright.
     *
     * Once the field moves out of the beta phase, then the header will no longer be required or checked.
     */
    roadmaps?: Maybe<RoadmapsQuery>;
    team?: Maybe<TeamQuery>;
    /**
     * A Jira or Confluence cloud instance, such as `hello.atlassian.net` has a backing
     * cloud ID such as `0ee6b491-5425-4f19-a71e-2486784ad694`
     *
     * This field allows you to look up the cloud IDs or host names of tenanted applications
     * such as Jira or Confluence.
     *
     * You MUST provide a list of cloud IDs or a list of host names to look up but not both
     * otherwise an error will be returned
     */
    tenantContexts?: Maybe<Array<Maybe<TenantContext>>>;
    /**
     * This field is useful for testing the graphql API.  In fact here at Atlassian we run synthetic checks
     * using this field ot help us ensure the graphql API is working as expected.
     */
    testing?: Maybe<Testing>;
    /**
     * Given an account id this will return user profile information with applied privacy controls of the caller.
     *
     * Its important to remember that privacy controls are applied in terms of the caller.  A user with
     * a certain accountId may exist but the current caller may not have the right to view their details.
     */
    user?: Maybe<User>;
    /**
     * Given a list of account ids this will return user profile information with applied privacy controls of the caller.
     *
     * Its important to remember that privacy controls are applied in terms of the caller.  A user with
     * a certain accountId may exist but the current caller may not have the right to view their details.
     *
     * A maximum of 90 `accountIds` can be asked for at the one time.
     */
    users: Array<User>;
    /** Gets all webtrigger URLs for an application in a specified context. */
    webTriggerUrlsByAppContext?: Maybe<Array<WebTriggerUrl>>;
};
export declare type QueryAppArgs = {
    id: Scalars['ID'];
};
export declare type QueryAppActiveTunnelsArgs = {
    appId: Scalars['ID'];
    environmentId: Scalars['ID'];
};
export declare type QueryAppDeploymentArgs = {
    appId: Scalars['ID'];
    environmentKey: Scalars['String'];
    id: Scalars['ID'];
};
export declare type QueryAppHostServicesArgs = {
    filter?: Maybe<AppServicesFilter>;
};
export declare type QueryAppInstallationTaskArgs = {
    id: Scalars['ID'];
};
export declare type QueryAppLogLinesArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    invocation: Scalars['ID'];
};
export declare type QueryAppLogsArgs = {
    after?: Maybe<Scalars['String']>;
    appId: Scalars['ID'];
    before?: Maybe<Scalars['String']>;
    environmentId: Array<Scalars['ID']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    query?: Maybe<LogQueryInput>;
};
export declare type QueryAppStoredEntitiesArgs = {
    after?: Maybe<Scalars['String']>;
    contextAri: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
    where?: Maybe<Array<AppStoredEntityFilter>>;
};
export declare type QueryAppStoredEntitiesForCleanupArgs = {
    after?: Maybe<Scalars['String']>;
    contextAri: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
    where?: Maybe<Array<AppStoredEntityFilter>>;
};
export declare type QueryAppStoredEntityArgs = {
    contextAri: Scalars['ID'];
    encrypted?: Maybe<Scalars['Boolean']>;
    key: Scalars['ID'];
};
export declare type QueryAppsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    filter?: Maybe<AppsFilter>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
};
export declare type QueryBitbucketRepositoriesAvailableToLinkWithNewDevOpsServiceArgs = {
    after?: Maybe<Scalars['String']>;
    cloudId: Scalars['ID'];
    first?: Maybe<Scalars['Int']>;
    nameFilter?: Maybe<Scalars['String']>;
};
export declare type QueryBoardScopeArgs = {
    boardId: Scalars['ID'];
};
export declare type QueryCodeInJiraArgs = {
    cloudId: Scalars['ID'];
};
export declare type QueryDevOpsServiceArgs = {
    id: Scalars['ID'];
};
export declare type QueryDevOpsServiceAndJiraProjectRelationshipArgs = {
    id: Scalars['ID'];
};
export declare type QueryDevOpsServiceAndOpsgenieTeamRelationshipArgs = {
    id: Scalars['ID'];
};
export declare type QueryDevOpsServiceAndRepositoryRelationshipArgs = {
    id: Scalars['ID'];
};
export declare type QueryDevOpsServiceRelationshipArgs = {
    id: Scalars['ID'];
};
export declare type QueryDevOpsServiceRelationshipsForJiraProjectArgs = {
    after?: Maybe<Scalars['String']>;
    filter?: Maybe<DevOpsServiceAndJiraProjectRelationshipFilter>;
    first?: Maybe<Scalars['Int']>;
    id: Scalars['ID'];
};
export declare type QueryDevOpsServiceRelationshipsForOpsgenieTeamArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    id: Scalars['ID'];
};
export declare type QueryDevOpsServiceRelationshipsForRepositoryArgs = {
    after?: Maybe<Scalars['String']>;
    filter?: Maybe<DevOpsServiceAndRepositoryRelationshipFilter>;
    first?: Maybe<Scalars['Int']>;
    id: Scalars['ID'];
    sort?: Maybe<DevOpsServiceAndRepositoryRelationshipSort>;
};
export declare type QueryDevOpsServiceTiersArgs = {
    cloudId: Scalars['String'];
};
export declare type QueryDevOpsServicesArgs = {
    after?: Maybe<Scalars['String']>;
    cloudId: Scalars['String'];
    filter?: Maybe<DevOpsServicesFilterInput>;
    first?: Maybe<Scalars['Int']>;
};
export declare type QueryDevOpsServicesByIdArgs = {
    ids: Array<Scalars['ID']>;
};
export declare type QueryDeveloperLogAccessArgs = {
    appId: Scalars['ID'];
    contextIds: Array<Scalars['ID']>;
    environmentType: AppEnvironmentType;
};
export declare type QueryDevelopmentInformationArgs = {
    issueId: Scalars['ID'];
};
export declare type QueryExtensionByKeyArgs = {
    contextId: Scalars['ID'];
    definitionId: Scalars['ID'];
    extensionKey: Scalars['String'];
};
export declare type QueryExtensionContextsArgs = {
    contextIds: Array<Scalars['ID']>;
};
export declare type QueryExtensionsEchoArgs = {
    text: Scalars['String'];
};
export declare type QueryInstallationContextsWithLogAccessArgs = {
    appId: Scalars['ID'];
};
export declare type QueryJiraProjectAndOpsgenieTeamRelationshipArgs = {
    id: Scalars['ID'];
};
export declare type QueryJiraProjectAndRepositoryRelationshipArgs = {
    id: Scalars['ID'];
};
export declare type QueryJiraProjectRelationshipsForOpsgenieTeamArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    id: Scalars['ID'];
};
export declare type QueryJiraProjectRelationshipsForRepositoryArgs = {
    after?: Maybe<Scalars['String']>;
    cloudId: Scalars['ID'];
    filter?: Maybe<JiraProjectAndRepositoryRelationshipFilter>;
    first?: Maybe<Scalars['Int']>;
    id: Scalars['ID'];
    sort?: Maybe<JiraProjectAndRepositoryRelationshipSort>;
};
export declare type QueryJiraProjectRelationshipsForServiceArgs = {
    after?: Maybe<Scalars['String']>;
    filter?: Maybe<DevOpsServiceAndJiraProjectRelationshipFilter>;
    first?: Maybe<Scalars['Int']>;
    id: Scalars['ID'];
};
export declare type QueryMarketplaceAppArgs = {
    appId: Scalars['ID'];
};
export declare type QueryMarketplaceAppByCloudAppIdArgs = {
    cloudAppId: Scalars['ID'];
};
export declare type QueryMarketplaceAppByKeyArgs = {
    appKey: Scalars['String'];
};
export declare type QueryMarketplacePartnerArgs = {
    id: Scalars['ID'];
};
export declare type QueryMarketplacePricingPlanArgs = {
    appId: Scalars['ID'];
    hostingType: AtlassianProductHostingType;
    pricingPlanOptions?: Maybe<MarketplacePricingPlanOptions>;
};
export declare type QueryMovieArgs = {
    id: Scalars['ID'];
};
export declare type QueryNodeArgs = {
    id: Scalars['ID'];
};
export declare type QueryOpsgenieTeamRelationshipForDevOpsServiceArgs = {
    id: Scalars['ID'];
};
export declare type QueryOpsgenieTeamRelationshipsForJiraProjectArgs = {
    after?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    id: Scalars['ID'];
};
export declare type QueryPolarisAnonymousVisitorHashArgs = {
    hash: Scalars['String'];
};
export declare type QueryPolarisAnonymousVisitorHashByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryPolarisConnectAppByClientIdArgs = {
    oauthClientID: Scalars['ID'];
};
export declare type QueryPolarisIdeasArgs = {
    expand?: Maybe<Array<Scalars['String']>>;
    fieldKeys?: Maybe<Array<Scalars['String']>>;
    jql?: Maybe<Scalars['String']>;
    project: Scalars['ID'];
};
export declare type QueryPolarisInsightArgs = {
    id: Scalars['ID'];
};
export declare type QueryPolarisInsightsArgs = {
    container?: Maybe<Scalars['ID']>;
    project: Scalars['ID'];
};
export declare type QueryPolarisInsightsWithErrorsArgs = {
    project: Scalars['ID'];
};
export declare type QueryPolarisLabelsArgs = {
    projectID: Scalars['ID'];
};
export declare type QueryPolarisLinkedDeliveryTicketsArgs = {
    issueIds?: Maybe<Array<Scalars['Int']>>;
    project: Scalars['ID'];
};
export declare type QueryPolarisProjectArgs = {
    id: Scalars['ID'];
    skipRefresh?: Maybe<Scalars['Boolean']>;
};
export declare type QueryPolarisSnippetPropertiesConfigArgs = {
    groupId: Scalars['String'];
    oauthClientId: Scalars['String'];
    project: Scalars['ID'];
};
export declare type QueryPolarisTermsConsentArgs = {
    cloudID: Scalars['ID'];
};
export declare type QueryPolarisViewArgs = {
    id: Scalars['ID'];
};
export declare type QueryRepositoryRelationshipsForDevOpsServiceArgs = {
    after?: Maybe<Scalars['String']>;
    filter?: Maybe<DevOpsServiceAndRepositoryRelationshipFilter>;
    first?: Maybe<Scalars['Int']>;
    id: Scalars['ID'];
    sort?: Maybe<DevOpsServiceAndRepositoryRelationshipSort>;
};
export declare type QueryRepositoryRelationshipsForJiraProjectArgs = {
    after?: Maybe<Scalars['String']>;
    filter?: Maybe<JiraProjectAndRepositoryRelationshipFilter>;
    first?: Maybe<Scalars['Int']>;
    id: Scalars['ID'];
    sort?: Maybe<JiraProjectAndRepositoryRelationshipSort>;
};
export declare type QueryTenantContextsArgs = {
    cloudIds?: Maybe<Array<Scalars['ID']>>;
    hostNames?: Maybe<Array<Scalars['String']>>;
};
export declare type QueryUserArgs = {
    accountId: Scalars['ID'];
};
export declare type QueryUsersArgs = {
    accountIds: Array<Scalars['ID']>;
};
export declare type QueryWebTriggerUrlsByAppContextArgs = {
    appId: Scalars['ID'];
    contextId: Scalars['ID'];
    envId: Scalars['ID'];
};
export declare type QueryError = {
    __typename?: 'QueryError';
    /** Contains extra data describing the error. */
    extensions?: Maybe<Array<QueryErrorExtension>>;
    /** The ID of the requested object, or null when the ID is not available. */
    identifier?: Maybe<Scalars['ID']>;
    /** A message describing the error. */
    message?: Maybe<Scalars['String']>;
};
export declare type QueryErrorExtension = {
    /** A code representing the type of error. See the CompassErrorType enum for possible values. */
    errorType?: Maybe<Scalars['String']>;
    /** A numerical code (such as an HTTP status code) representing the error category. */
    statusCode?: Maybe<Scalars['Int']>;
};
export declare type RankColumnInput = {
    boardId: Scalars['ID'];
    columnId: Scalars['ID'];
    position: Scalars['Int'];
};
export declare type RankColumnOutput = MutationResponse & {
    __typename?: 'RankColumnOutput';
    columns?: Maybe<Array<Column>>;
    message: Scalars['String'];
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
export declare enum RateLimitingCurrency {
    TestingService = "TESTING_SERVICE"
}
export declare type RefreshPolarisSnippetsInput = {
    project: Scalars['ID'];
    /**
     * Specifies a set of snippets to be refreshed for finer-grain control than
     * at the project level (a required property for this API).  This field
     * is optional, and if specified must refer to either an issue, an
     * insight, or a snippet.
     */
    subject?: Maybe<Scalars['ID']>;
    /**
     * An optional flag indicating whether or not the refresh should be performed
     * synchronously.  By default (if this flag is not included, or if its value
     * is false), the refresh is performed asynchronously.
     */
    synchronous?: Maybe<Scalars['Boolean']>;
};
export declare type RefreshPolarisSnippetsPayload = Payload & {
    __typename?: 'RefreshPolarisSnippetsPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisRefreshJob>;
    success: Scalars['Boolean'];
};
export declare type RefreshToken = {
    __typename?: 'RefreshToken';
    refreshTokenRotation: Scalars['Boolean'];
};
export declare type RefreshTokenInput = {
    refreshTokenRotation: Scalars['Boolean'];
};
/** Accepts input for removing labels from a component. */
export declare type RemoveCompassComponentLabelsInput = {
    /** The ID of the component to remove the labels from. */
    componentId: Scalars['ID'];
    /** The collection of labels to remove from the component. */
    labelNames: Array<Scalars['String']>;
};
/** The payload returned after removing labels from a component. */
export declare type RemoveCompassComponentLabelsPayload = Payload & {
    __typename?: 'RemoveCompassComponentLabelsPayload';
    /** The details of the component that was mutated. */
    componentDetails?: Maybe<CompassComponent>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** The collection of labels that were removed from the component. */
    removedLabelNames?: Maybe<Array<Scalars['String']>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** The payload returned from removing a scorecard from a component. */
export declare type RemoveCompassScorecardFromComponentPayload = Payload & {
    __typename?: 'RemoveCompassScorecardFromComponentPayload';
    /**
     * The details of the component that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    componentDetails?: Maybe<CompassComponent>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
export declare type RemovePolarisColumnInput = {
    /** The column position to be removed */
    column: Scalars['ID'];
};
/** Data for the reports overview page */
export declare type ReportsOverview = {
    __typename?: 'ReportsOverview';
    metadata: Array<Maybe<SoftwareReport>>;
};
export declare type ResolvePolarisObjectInput = {
    /** Custom auth token that will be used in unfurl request and saved if request was successful */
    authToken?: Maybe<Scalars['String']>;
    /** Issue ARI */
    issue: Scalars['ID'];
    /** Project ARI */
    project: Scalars['ID'];
    /** Resource url that will be used to unfurl data */
    resourceUrl: Scalars['String'];
};
export declare type ResolvePolarisObjectPayload = Payload & {
    __typename?: 'ResolvePolarisObjectPayload';
    errors?: Maybe<Array<MutationError>>;
    response?: Maybe<ResolvedPolarisObject>;
    success: Scalars['Boolean'];
};
export declare type ResolvedPolarisObject = {
    __typename?: 'ResolvedPolarisObject';
    auth?: Maybe<ResolvedPolarisObjectAuth>;
    body?: Maybe<Scalars['JSON']>;
    externalAuth?: Maybe<Array<ResolvedPolarisObjectExternalAuth>>;
    oauthClientId?: Maybe<Scalars['String']>;
    statusCode: Scalars['Int'];
};
export declare type ResolvedPolarisObjectAuth = {
    __typename?: 'ResolvedPolarisObjectAuth';
    hint?: Maybe<Scalars['String']>;
    type: PolarisResolvedObjectAuthType;
};
export declare type ResolvedPolarisObjectExternalAuth = {
    __typename?: 'ResolvedPolarisObjectExternalAuth';
    displayName: Scalars['String'];
    key: Scalars['String'];
    url: Scalars['String'];
};
/** Board specific configuration for a Roadmap */
export declare type RoadmapBoardConfiguration = {
    __typename?: 'RoadmapBoardConfiguration';
    /** Is the board's jql filtering out epics */
    isBoardJqlFilteringOutEpics?: Maybe<Scalars['Boolean']>;
    /** Is the current user a board admin */
    isUserBoardAdmin?: Maybe<Scalars['Boolean']>;
    /** The board's JQL */
    jql?: Maybe<Scalars['String']>;
    /** Sprints owned by the board associated to the roadmap */
    sprints?: Maybe<Array<RoadmapSprint>>;
};
export declare type RoadmapConfiguration = {
    __typename?: 'RoadmapConfiguration';
    /** Configuration specific to a board */
    boardConfiguration?: Maybe<RoadmapBoardConfiguration>;
    /** Dependency configuration for this roadmap */
    dependencies?: Maybe<RoadmapDependencyConfiguration>;
    /** External configuration details */
    externalConfiguration?: Maybe<RoadmapExternalConfiguration>;
    /** Is this roadmap cross project */
    isCrossProject: Scalars['Boolean'];
    /** Project information */
    projectConfigurations: Array<RoadmapProjectConfiguration>;
    /** Is the board backed with jql with Rank ASC in order by clause */
    rankIssuesSupported: Scalars['Boolean'];
    /** Is the roadmap feature enabled for this roadmap */
    roadmapFeatureEnabled: Scalars['Boolean'];
    /** Details of status categories */
    statusCategories: Array<RoadmapStatusCategory>;
    /** Configuration specific to the current user */
    userConfiguration?: Maybe<RoadmapUserConfiguration>;
};
export declare type RoadmapCreationPreferences = {
    __typename?: 'RoadmapCreationPreferences';
    projectId?: Maybe<Scalars['Long']>;
};
/** Details about dependency configuration for roadmaps */
export declare type RoadmapDependencyConfiguration = {
    __typename?: 'RoadmapDependencyConfiguration';
    /** The description to apply for inbound dependencies */
    inwardDependencyDescription?: Maybe<Scalars['String']>;
    /** Are dependencies enabled */
    isDependenciesEnabled: Scalars['Boolean'];
    /** The description to apply for outbound dependencies */
    outwardDependencyDescription?: Maybe<Scalars['String']>;
};
/** Details of a roadmap */
export declare type RoadmapDetails = {
    __typename?: 'RoadmapDetails';
    /** meta information surrounding the roadmap, such as issue limit breaches */
    metadata?: Maybe<RoadmapMetadata>;
    /** The configuration for this roadmap */
    roadmapConfiguration?: Maybe<RoadmapConfiguration>;
    /** The items in the roadmap */
    roadmapItems?: Maybe<RoadmapItemConnection>;
};
/** Configuration values for the external system(s) behind the roadmap data */
export declare type RoadmapExternalConfiguration = {
    __typename?: 'RoadmapExternalConfiguration';
    /** The identifier for the 'field' that represents color in the external system */
    colorFields?: Maybe<Array<Maybe<Scalars['ID']>>>;
    /** The identifier for the 'field' that represents due date in the external system */
    dueDateField?: Maybe<Scalars['ID']>;
    /** The identifier for the 'field' that represents epic link in the external system */
    epicLinkField?: Maybe<Scalars['ID']>;
    /** The identifier for the 'field' that represents epic name in the external system */
    epicNameField?: Maybe<Scalars['ID']>;
    /** ID of external system */
    externalSystem: Scalars['ID'];
    /** The identifier for the 'field' that represents rank in the external system */
    rankField?: Maybe<Scalars['ID']>;
    /** The identifier for the 'field' that represents sprint in the external system */
    sprintField?: Maybe<Scalars['ID']>;
    /** The identifier for the 'field' that represents start date in the external system */
    startDateField?: Maybe<Scalars['ID']>;
};
/** The roadmap item data */
export declare type RoadmapItem = {
    __typename?: 'RoadmapItem';
    /** The assignee of this item */
    assignee?: Maybe<User>;
    /** What color should be shown for this item */
    color?: Maybe<RoadmapPaletteColor>;
    /** When this item was created */
    createdDate?: Maybe<Scalars['DateTime']>;
    /** IDs of RoadmapItem dependencies for this item */
    dependencies?: Maybe<Array<Scalars['ID']>>;
    /** When this item is due, note this is a Date with no TZ */
    dueDate?: Maybe<Scalars['DateTime']>;
    /** The ID of this item */
    id: Scalars['ID'];
    /** The type of this item */
    itemType: RoadmapItemType;
    /** The key of this item */
    key: Scalars['String'];
    /** List of labels on this item */
    labels?: Maybe<Array<Scalars['String']>>;
    /** The ID of the parent */
    parentId?: Maybe<Scalars['ID']>;
    /** The id of the project for this item */
    projectId: Scalars['ID'];
    /** Lexorank value for the issue (used to determine issues ranking when receiving update events) */
    rank?: Maybe<Scalars['String']>;
    /** When this item was resolved */
    resolutionDate?: Maybe<Scalars['DateTime']>;
    /** List of sprint ids that exist on the item */
    sprintIds?: Maybe<Array<Scalars['ID']>>;
    /** When this item is set to start, note this is a Date with no TZ */
    startDate?: Maybe<Scalars['DateTime']>;
    /** The status of this item */
    status?: Maybe<RoadmapItemStatus>;
    /** The status category of this item */
    statusCategory?: Maybe<RoadmapItemStatusCategory>;
    /** The summary of this item */
    summary?: Maybe<Scalars['String']>;
    /** List of ids of the versions on this item */
    versionIds?: Maybe<Array<Scalars['ID']>>;
};
/** Relay connection definition for a roadmap item */
export declare type RoadmapItemConnection = {
    __typename?: 'RoadmapItemConnection';
    /** The edges for this connection */
    edges?: Maybe<Array<Maybe<RoadmapItemEdge>>>;
    /** The nodes for this connection */
    nodes: Array<Maybe<RoadmapItem>>;
    /** Details about this page */
    pageInfo: PageInfo;
};
/** Relay edge definition for a roadmap item */
export declare type RoadmapItemEdge = {
    __typename?: 'RoadmapItemEdge';
    /** Cursor position for this edge */
    cursor: Scalars['String'];
    /** The roadmap item for this edge */
    node?: Maybe<RoadmapItem>;
};
/** Details of the status an item has */
export declare type RoadmapItemStatus = {
    __typename?: 'RoadmapItemStatus';
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
    statusCategory?: Maybe<RoadmapItemStatusCategory>;
};
/** Details of the category that a status belongs to */
export declare type RoadmapItemStatusCategory = {
    __typename?: 'RoadmapItemStatusCategory';
    id: Scalars['ID'];
    key: Scalars['String'];
    name?: Maybe<Scalars['String']>;
};
/** Information about the type of a roadmap Item */
export declare type RoadmapItemType = {
    __typename?: 'RoadmapItemType';
    /** The avatar for this item type */
    avatarId?: Maybe<Scalars['ID']>;
    /** A description of this item type */
    description?: Maybe<Scalars['String']>;
    /** The url for the icon of the item type */
    iconUrl?: Maybe<Scalars['String']>;
    /** The identifier of this item type */
    id: Scalars['ID'];
    /** The display name of the item type */
    name?: Maybe<Scalars['String']>;
    /** Fields that are required for this item type */
    requiredFieldIds?: Maybe<Array<Scalars['ID']>>;
    /** Whether this item type represents a subtask */
    subtask: Scalars['Boolean'];
};
export declare type RoadmapMetadata = {
    __typename?: 'RoadmapMetadata';
    /** how many corrupted issues have we found while loading the roadmap */
    corruptedIssueCount: Scalars['Int'];
    /** has the roadmap exceeded the epic limit */
    hasExceededEpicLimit: Scalars['Boolean'];
    /** has the roadmap exceeded the overall limit of issues (epic + issues) */
    hasExceededIssueLimit: Scalars['Boolean'];
};
/** Supported colors in the Palette */
export declare enum RoadmapPaletteColor {
    Blue = "BLUE",
    DarkBlue = "DARK_BLUE",
    DarkGreen = "DARK_GREEN",
    DarkGrey = "DARK_GREY",
    DarkOrange = "DARK_ORANGE",
    DarkPurple = "DARK_PURPLE",
    DarkTeal = "DARK_TEAL",
    DarkYellow = "DARK_YELLOW",
    Green = "GREEN",
    Grey = "GREY",
    Orange = "ORANGE",
    Purple = "PURPLE",
    Teal = "TEAL",
    Yellow = "YELLOW"
}
/** Details of a project for a roadmap */
export declare type RoadmapProject = {
    __typename?: 'RoadmapProject';
    /** Does this project support dependencies between issues */
    areDependenciesSupported: Scalars['Boolean'];
    /** Color custom field ID; used to resolve raw fields data in Bento optimistic updates */
    colorCustomFieldId?: Maybe<Scalars['ID']>;
    /** The description of the project */
    description?: Maybe<Scalars['String']>;
    /** The issue type for epic, in future this will be replaced by using the hierarchy structures directly */
    epicIssueTypeId?: Maybe<Scalars['ID']>;
    /** Has the current user completed onboarding */
    hasCompletedOnboarding: Scalars['Boolean'];
    /** The identifier of the project */
    id: Scalars['ID'];
    /** The description for inward dependency links */
    inwardDependencyDescription?: Maybe<Scalars['String']>;
    /** The types of items that this project has */
    itemTypes?: Maybe<Array<RoadmapItemType>>;
    /** The short key of the project i.e. ABC */
    key?: Maybe<Scalars['String']>;
    /** The user who is leading the project */
    lead?: Maybe<User>;
    /** Lexo rank custom field ID; used in all ranking operations, in future should be replaced by mutations */
    lexoRankCustomFieldId?: Maybe<Scalars['ID']>;
    /** The display name of the project */
    name?: Maybe<Scalars['String']>;
    /** The description for outward dependency links */
    outwardDependencyDescription?: Maybe<Scalars['String']>;
    /** Permissions for the project */
    permissions?: Maybe<RoadmapProjectPermissions>;
    /** Start date custom field ID; used to resolve raw fields data in Bento optimistic updates */
    startDateCustomFieldId?: Maybe<Scalars['ID']>;
    /** Validation details for the project */
    validation?: Maybe<RoadmapProjectValidation>;
};
/** Configuration details specific to a project */
export declare type RoadmapProjectConfiguration = {
    __typename?: 'RoadmapProjectConfiguration';
    /** The item types at the child level */
    childItemTypes: Array<RoadmapItemType>;
    /** The id of the default item type */
    defaultItemTypeId?: Maybe<Scalars['String']>;
    /** The item types at the parent level */
    parentItemTypes: Array<RoadmapItemType>;
    /** Permission details for this project */
    permissions?: Maybe<RoadmapProjectPermissions>;
    /** The identifier of the project */
    projectId: Scalars['ID'];
    /** The short key of the project i.e. ABC */
    projectKey?: Maybe<Scalars['String']>;
    /** The name of the project i.e. ABC project */
    projectName?: Maybe<Scalars['String']>;
    /** Validation information for this project */
    validation?: Maybe<RoadmapProjectValidation>;
    /** List of versions for this project */
    versions?: Maybe<Array<RoadmapVersion>>;
};
/** Information about the permissions available for the roadmap project for the current user */
export declare type RoadmapProjectPermissions = {
    __typename?: 'RoadmapProjectPermissions';
    /** can the project be administered */
    canAdministerProjects: Scalars['Boolean'];
    /** can issues be created */
    canCreateIssues: Scalars['Boolean'];
    /** can issues be edited */
    canEditIssues: Scalars['Boolean'];
    /** can issues be scheduled */
    canScheduleIssues: Scalars['Boolean'];
};
/** Details about how valid the roadmap project is */
export declare type RoadmapProjectValidation = {
    __typename?: 'RoadmapProjectValidation';
    /** Are all the field associations correct for the project */
    hasAllFieldAssociations: Scalars['Boolean'];
    /** Has the epic issue type been setup */
    hasEpicIssueType: Scalars['Boolean'];
    /** Is the hierarchy for the project in a valid state */
    hasValidHierarchy: Scalars['Boolean'];
};
/** Details of a roadmap sprint */
export declare type RoadmapSprint = {
    __typename?: 'RoadmapSprint';
    /** The end date of the sprint, note this is a Date with no TZ */
    endDate: Scalars['String'];
    /** A unique identifier for the sprint */
    id: Scalars['ID'];
    /** The name of the sprint */
    name: Scalars['String'];
    /** The start date of the sprint, note this is a Date with no TZ */
    startDate: Scalars['String'];
    /** The state of the sprint */
    state: RoadmapSprintState;
};
/** States that a sprint can be in */
export declare enum RoadmapSprintState {
    /** A current sprint */
    Active = "ACTIVE",
    /** A sprint that was completed in the past */
    Closed = "CLOSED",
    /** A sprint that is planned for the future */
    Future = "FUTURE"
}
/** Details of the roadmap status category */
export declare type RoadmapStatusCategory = {
    __typename?: 'RoadmapStatusCategory';
    id: Scalars['ID'];
    key: Scalars['String'];
    name: Scalars['String'];
};
/** Defines the available timeline modes */
export declare enum RoadmapTimelineMode {
    /** Months */
    Months = "MONTHS",
    /** Quarters */
    Quarters = "QUARTERS",
    /** Weeks */
    Weeks = "WEEKS"
}
/** Any user specific configuration for the roadmap */
export declare type RoadmapUserConfiguration = {
    __typename?: 'RoadmapUserConfiguration';
    /** Issue Creation Preferences */
    creationPreferences: RoadmapCreationPreferences;
    /** Epic View - ALL, COMPLETED, INCOMPLETE */
    epicView: EpicView;
    /** Has the current user completed onboarding */
    hasCompletedOnboarding: Scalars['Boolean'];
    /** Should dependencies be visible in Roadmaps UI */
    isDependenciesVisible: Scalars['Boolean'];
    /** Should progress be visible in Roadmaps UI */
    isProgressVisible: Scalars['Boolean'];
    /** List Component width in UI */
    listWidth: Scalars['Long'];
    /** Timeline View - WEEKS, MONTHS or QUARTERS */
    timelineMode: RoadmapTimelineMode;
};
/** Details of a version */
export declare type RoadmapVersion = {
    __typename?: 'RoadmapVersion';
    /** A unique identifier for the version */
    id: Scalars['ID'];
    /** The name of the version */
    name: Scalars['String'];
    /** The status of the version */
    status: RoadmapVersionStatus;
};
/** Avaliable version statuses */
export declare enum RoadmapVersionStatus {
    /** version has been archived */
    Archived = "ARCHIVED",
    /** version has been released */
    Released = "RELEASED",
    /** version has not been released */
    Unreleased = "UNRELEASED"
}
/** Top level grouping of potential roadmap queries */
export declare type RoadmapsQuery = {
    __typename?: 'RoadmapsQuery';
    /** Lookup details of a roadmap. */
    roadmapForSource?: Maybe<RoadmapDetails>;
    /** Get multiple items. */
    roadmapItemByIds?: Maybe<Array<Maybe<RoadmapItem>>>;
};
/** Top level grouping of potential roadmap queries */
export declare type RoadmapsQueryRoadmapForSourceArgs = {
    locationARI?: Maybe<Scalars['ID']>;
    sourceARI: Scalars['ID'];
};
/** Top level grouping of potential roadmap queries */
export declare type RoadmapsQueryRoadmapItemByIdsArgs = {
    ids: Array<Scalars['ID']>;
    sourceARI: Scalars['ID'];
};
export declare type ScanPolarisProjectInput = {
    project: Scalars['ID'];
    refresh?: Maybe<Scalars['Boolean']>;
};
export declare enum Scope {
    /** outbound-auth */
    AdminContainer = "ADMIN_CONTAINER",
    AuthConfluenceUser = "AUTH_CONFLUENCE_USER",
    /** confluence */
    ConfluenceAtlassianExternal = "CONFLUENCE_ATLASSIAN_EXTERNAL",
    IdentityAtlassianExternal = "IDENTITY_ATLASSIAN_EXTERNAL",
    JiraAtlassianExternal = "JIRA_ATLASSIAN_EXTERNAL",
    /** ecosystem */
    ManageApp = "MANAGE_APP",
    ManageConfluenceConfiguration = "MANAGE_CONFLUENCE_CONFIGURATION",
    ManageDirectory = "MANAGE_DIRECTORY",
    ManageJiraConfiguration = "MANAGE_JIRA_CONFIGURATION",
    ManageJiraDataProvider = "MANAGE_JIRA_DATA_PROVIDER",
    ManageJiraProject = "MANAGE_JIRA_PROJECT",
    /** identity */
    ManageOrg = "MANAGE_ORG",
    ManageServicedeskCustomer = "MANAGE_SERVICEDESK_CUSTOMER",
    /** platform */
    MigrateConfluence = "MIGRATE_CONFLUENCE",
    /** compass */
    ReadCompassComponent = "READ_COMPASS_COMPONENT",
    ReadCompassEvent = "READ_COMPASS_EVENT",
    ReadCompassScorecard = "READ_COMPASS_SCORECARD",
    ReadConfluenceContentAll = "READ_CONFLUENCE_CONTENT_ALL",
    ReadConfluenceContentPermission = "READ_CONFLUENCE_CONTENT_PERMISSION",
    ReadConfluenceContentSummary = "READ_CONFLUENCE_CONTENT_SUMMARY",
    ReadConfluenceGroups = "READ_CONFLUENCE_GROUPS",
    ReadConfluenceProps = "READ_CONFLUENCE_PROPS",
    ReadConfluenceSpaceSummary = "READ_CONFLUENCE_SPACE_SUMMARY",
    ReadConfluenceUser = "READ_CONFLUENCE_USER",
    ReadContainer = "READ_CONTAINER",
    /** jira */
    ReadJiraUser = "READ_JIRA_USER",
    ReadJiraWork = "READ_JIRA_WORK",
    ReadMe = "READ_ME",
    /** notification-log */
    ReadNotifications = "READ_NOTIFICATIONS",
    /** jira-servicedesk */
    ReadServicedeskRequest = "READ_SERVICEDESK_REQUEST",
    SearchConfluence = "SEARCH_CONFLUENCE_",
    StorageApp = "STORAGE_APP",
    ViewUserprofile = "VIEW_USERPROFILE",
    WriteCompassComponent = "WRITE_COMPASS_COMPONENT",
    WriteCompassEvent = "WRITE_COMPASS_EVENT",
    WriteCompassScorecard = "WRITE_COMPASS_SCORECARD",
    WriteConfluenceContent = "WRITE_CONFLUENCE_CONTENT",
    WriteConfluenceFile = "WRITE_CONFLUENCE_FILE",
    WriteConfluenceGroups = "WRITE_CONFLUENCE_GROUPS",
    WriteConfluenceProps = "WRITE_CONFLUENCE_PROPS",
    WriteConfluenceSpace = "WRITE_CONFLUENCE_SPACE",
    WriteContainer = "WRITE_CONTAINER",
    WriteJiraWork = "WRITE_JIRA_WORK",
    WriteNotifications = "WRITE_NOTIFICATIONS",
    WriteServicedeskRequest = "WRITE_SERVICEDESK_REQUEST"
}
export declare type ScopeSprintIssue = {
    __typename?: 'ScopeSprintIssue';
    /** the estimate on the issue */
    estimate: Scalars['Float'];
    /** issue key */
    issueKey: Scalars['String'];
    /** issue description */
    issueSummary: Scalars['String'];
};
export declare type SetAppEnvironmentVariableInput = {
    environment: AppEnvironmentInput;
    /** The input identifying the environment variable to insert */
    environmentVariable: AppEnvironmentVariableInput;
};
export declare type SetAppStoredEntityMutationInput = {
    /** The ARI to store this entity within */
    contextAri: Scalars['ID'];
    /** Specify whether value should be encrypted */
    encrypted?: Maybe<Scalars['Boolean']>;
    /**
     * The identifier for the entity
     *
     * Keys must be between 1-100 characters long and must match the following pattern /^[a-zA-Z0-9:._\s-]+$/
     */
    key: Scalars['ID'];
    /**
     * Entities may be up to 2000 bytes long. Note that size within ESS may differ from
     * the size of the entity sent to this service. The entity size is counted within this service.
     */
    value: Scalars['JSON'];
};
/** Generic implementation of MutationResponse for responses that don't need any extra data */
export declare type SetAppStoredEntityPayload = Payload & {
    __typename?: 'SetAppStoredEntityPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type SetColumnLimitInput = {
    boardId: Scalars['ID'];
    columnId: Scalars['ID'];
    limit?: Maybe<Scalars['Int']>;
};
export declare type SetColumnLimitOutput = MutationResponse & {
    __typename?: 'SetColumnLimitOutput';
    columns?: Maybe<Array<Column>>;
    message: Scalars['String'];
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
export declare type SetColumnNameInput = {
    boardId: Scalars['ID'];
    columnId: Scalars['ID'];
    columnName: Scalars['String'];
};
export declare type SetColumnNameOutput = MutationResponse & {
    __typename?: 'SetColumnNameOutput';
    column?: Maybe<Column>;
    message: Scalars['String'];
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
/** Estimation Mutation */
export declare type SetEstimationTypeInput = {
    boardId: Scalars['ID'];
    estimationType: Scalars['String'];
};
export declare type SetExternalAuthCredentialsInput = {
    /** An object representing the credentials to set */
    credentials: ExternalAuthCredentialsInput;
    /** The input identifying what environment to set credentials for */
    environment: AppEnvironmentInput;
    /** The key for the service we're setting the credentials for (must already exist via previous deployment) */
    serviceKey: Scalars['String'];
};
export declare type SetExternalAuthCredentialsPayload = Payload & {
    __typename?: 'SetExternalAuthCredentialsPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type SetPolarisProjectOnboardedInput = {
    projectId: Scalars['ID'];
    value: Scalars['Boolean'];
};
export declare type SetPolarisProjectOnboardedPayload = Payload & {
    __typename?: 'SetPolarisProjectOnboardedPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type SetPolarisSelectedDeliveryProjectInput = {
    projectId: Scalars['ID'];
    selectedDeliveryProjectId: Scalars['ID'];
};
export declare type SetPolarisSelectedDeliveryProjectPayload = Payload & {
    __typename?: 'SetPolarisSelectedDeliveryProjectPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type SetPolarisSnippetPropertiesConfigInput = {
    /** Config */
    config?: Maybe<Scalars['JSON']>;
    /** Snippet group id */
    groupId: Scalars['String'];
    /** OauthClientId of CaaS app */
    oauthClientId: Scalars['String'];
    /** project ARI */
    project: Scalars['ID'];
};
export declare type SetPolarisSnippetPropertiesConfigPayload = Payload & {
    __typename?: 'SetPolarisSnippetPropertiesConfigPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
/** Swimlane Mutations */
export declare type SetSwimlaneStrategyInput = {
    boardId: Scalars['ID'];
    strategy: SwimlaneStrategy;
};
export declare type SetSwimlaneStrategyResponse = MutationResponse & {
    __typename?: 'SetSwimlaneStrategyResponse';
    message: Scalars['String'];
    statusCode: Scalars['Int'];
    strategy: SwimlaneStrategy;
    success: Scalars['Boolean'];
};
export declare type SoftwareBoard = {
    __typename?: 'SoftwareBoard';
    /** List of the assignees of all cards currently displayed on the board */
    assignees?: Maybe<Array<Maybe<User>>>;
    /** All issue children which are linked to the cards on the board */
    cardChildren?: Maybe<Array<Maybe<SoftwareCard>>>;
    /** Configuration for showing media previews on cards */
    cardMedia?: Maybe<CardMediaConfig>;
    /** [CardType]s which can be created in this column _outside of a swimlane_ (if any) */
    cardTypes: Array<Maybe<CardType>>;
    /** All cards on the board, optionally filtered by ID */
    cards?: Maybe<Array<Maybe<SoftwareCard>>>;
    /** The list of columns on the board */
    columns?: Maybe<Array<Maybe<Column>>>;
    /** Board edit config. Contains properties which dictate how to mutate the board data, e.g support for inline issue or column creation */
    editConfig?: Maybe<BoardEditConfig>;
    /** Whether any cards on the board are hidden due to board clearing logic (e.g. old cards in the done column are hidden) */
    hasClearedCards?: Maybe<Scalars['Boolean']>;
    id?: Maybe<Scalars['ID']>;
    /** Configuration for showing inline card create */
    inlineCardCreate?: Maybe<InlineCardCreateConfig>;
    /** List of all labels on all cards current displayed on the board */
    labels?: Maybe<Array<Maybe<Scalars['String']>>>;
    /** Name of the board */
    name?: Maybe<Scalars['String']>;
    /** Temporarily needed to support legacy write API */
    rankCustomFieldId?: Maybe<Scalars['String']>;
    /**
     * The current swimlane strategy for the board.  This is a board (not user) property.
     * All users of the board get the same strategy.
     */
    swimlaneStrategy?: Maybe<SwimlaneStrategy>;
    /**
     * Swimlanes on the board.  If swimlanes are set to "NONE" then this there will be a single swimlane object containing
     *  all cards on the board.
     */
    swimlanes: Array<Maybe<Swimlane>>;
    /**
     * User Swimlanes on the board.  If swimlanes are set to "NONE" then this there will be a single swimlane object containing
     *  all cards on the board.
     */
    userSwimlanes: Array<Maybe<Swimlane>>;
};
export declare type SoftwareBoardCardsArgs = {
    cardIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};
/** A card on the board */
export declare type SoftwareCard = {
    __typename?: 'SoftwareCard';
    assignee?: Maybe<User>;
    /** Child cards metadata */
    childCardsMetadata?: Maybe<ChildCardsMetadata>;
    /** List of children IDs for a card */
    childrenIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
    /** Details of the media to show on this card, null if the card has no media */
    coverMedia?: Maybe<CardCoverMedia>;
    /** Dev Status information for the card */
    devStatus?: Maybe<DevStatus>;
    /** Whether or not this card is considered done */
    done?: Maybe<Scalars['Boolean']>;
    /** Due date */
    dueDate?: Maybe<Scalars['String']>;
    /** Estimate of size of a card */
    estimate?: Maybe<Estimate>;
    /** IDs of the fix versions that this issue is related to */
    fixVersionsIds: Array<Scalars['ID']>;
    /** Whether or not this card is flagged */
    flagged?: Maybe<Scalars['Boolean']>;
    id?: Maybe<Scalars['ID']>;
    key?: Maybe<Scalars['String']>;
    labels?: Maybe<Array<Maybe<Scalars['String']>>>;
    /** ID of parent card */
    parentId?: Maybe<Scalars['ID']>;
    /** Card priority */
    priority?: Maybe<CardPriority>;
    status?: Maybe<CardStatus>;
    summary?: Maybe<Scalars['String']>;
    type?: Maybe<CardType>;
};
export declare type SoftwareCardChildrenInfo = {
    __typename?: 'SoftwareCardChildrenInfo';
    doneStats?: Maybe<SoftwareCardChildrenInfoStats>;
    inProgressStats?: Maybe<SoftwareCardChildrenInfoStats>;
    lastColumnIssueStats?: Maybe<SoftwareCardChildrenInfoStats>;
    todoStats?: Maybe<SoftwareCardChildrenInfoStats>;
};
export declare type SoftwareCardChildrenInfoStats = {
    __typename?: 'SoftwareCardChildrenInfoStats';
    cardCount?: Maybe<Scalars['Int']>;
};
/** Represents a specific transition between statuses that a card can make. */
export declare type SoftwareCardTransition = {
    __typename?: 'SoftwareCardTransition';
    /** Card type that this transition applies to */
    cardType: CardType;
    /** true if the transition has conditions */
    hasConditions?: Maybe<Scalars['Boolean']>;
    /** Identifier for the card's column in swimlane position, to be used as a target for card transitions */
    id?: Maybe<Scalars['ID']>;
    /** true if global transition (anything status can move to this location). */
    isGlobal?: Maybe<Scalars['Boolean']>;
    /** true if the transition is initial */
    isInitial?: Maybe<Scalars['Boolean']>;
    /** Name of the transition, as set in the workflow editor */
    name: Scalars['String'];
    /** statuses which can move to this location, null if global transition. */
    originStatus?: Maybe<CardStatus>;
    /** The status the card's issue will end up in after executing this CardTransition */
    status?: Maybe<CardStatus>;
};
export declare type SoftwareCardTypeTransition = {
    __typename?: 'SoftwareCardTypeTransition';
    /** Card type that this transition applies to */
    cardType: CardType;
    /** true if the transition has conditions */
    hasConditions?: Maybe<Scalars['Boolean']>;
    /** true if global transition (anything status can move to this location). */
    isGlobal?: Maybe<Scalars['Boolean']>;
    /** true if the transition is initial */
    isInitial?: Maybe<Scalars['Boolean']>;
    /** Name of the transition, as set in the workflow editor */
    name: Scalars['String'];
    /** statuses which can move to this location, null if global transition. */
    originStatus?: Maybe<CardStatus>;
    /** The status the card's issue will end up in after executing this SoftwareCardTypeTransition */
    status?: Maybe<CardStatus>;
    /** Non unique ID of the transition used as a target for card transitions */
    transitionId?: Maybe<Scalars['ID']>;
};
export declare type SoftwareCardsDestination = {
    destination?: Maybe<SoftwareCardsDestinationEnum>;
    sprintId?: Maybe<Scalars['ID']>;
};
export declare enum SoftwareCardsDestinationEnum {
    Backlog = "BACKLOG",
    ExistingSprint = "EXISTING_SPRINT",
    NewSprint = "NEW_SPRINT"
}
export declare type SoftwareOperation = {
    __typename?: 'SoftwareOperation';
    icon?: Maybe<Icon>;
    name?: Maybe<Scalars['String']>;
    styleClass?: Maybe<Scalars['String']>;
    tooltip?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
};
export declare type SoftwareProject = {
    __typename?: 'SoftwareProject';
    /**
     * List of card types available in the project
     * When on the board, these will NOT include Epics or Subtasks, but when in boardScope they will
     */
    cardTypes?: Maybe<Array<Maybe<CardType>>>;
    /** Project id */
    id?: Maybe<Scalars['ID']>;
    /** Project key */
    key?: Maybe<Scalars['String']>;
    /** Project name */
    name?: Maybe<Scalars['String']>;
};
export declare type SoftwareProjectCardTypesArgs = {
    hierarchyLevelType?: Maybe<CardHierarchyLevelEnumType>;
};
export declare type SoftwareReport = {
    __typename?: 'SoftwareReport';
    /** Which group this report should be shown in */
    group: Scalars['String'];
    id: Scalars['ID'];
    /** uri of the report's icon */
    imageUri: Scalars['String'];
    /** if not applicable - localised text as to why */
    inapplicableDescription?: Maybe<Scalars['String']>;
    /** if not applicable - localised text as to why */
    inapplicableReason?: Maybe<Scalars['String']>;
    /** whether or not this report is applicable (is enabled for) this board */
    isApplicable: Scalars['Boolean'];
    /** unique key identifying the report */
    key: Scalars['String'];
    /** the name of the report in the user's language */
    localisedDescription: Scalars['String'];
    /** the name of the report in the user's language */
    localisedName: Scalars['String'];
    /**
     * suffix to apply to the reports url to load this report.
     * e.g. https://tenant.com/secure/RapidBoard.jspa?rapidView=*boardId*&view=reports&report=*urlName*
     */
    urlName: Scalars['String'];
};
/** Node for querying any report page's data */
export declare type SoftwareReports = {
    __typename?: 'SoftwareReports';
    /** Data for the burndown chart report */
    burndownChart: BurndownChart;
    /** Data for the cumulative flow diagram report */
    cumulativeFlowDiagram?: Maybe<CumulativeFlowDiagram>;
    /** Data for the reports list overview */
    overview?: Maybe<ReportsOverview>;
};
export declare type SoftwareSprintMetadata = {
    __typename?: 'SoftwareSprintMetadata';
    /**  Number of Completed Issues in Sprint */
    numCompletedIssues?: Maybe<Scalars['Int']>;
    /**  Number of Open Issues in Sprint */
    numOpenIssues?: Maybe<Scalars['Int']>;
    /**  Keys of Unresolved Cards */
    top100CompletedCardKeysWithIncompleteChildren?: Maybe<Array<Maybe<Scalars['String']>>>;
};
/** The sort direction of the collection */
export declare enum SortDirection {
    /** Sort in ascending order */
    Asc = "ASC",
    /** Sort in descending order */
    Desc = "DESC"
}
export declare type Sprint = {
    __typename?: 'Sprint';
    cards: Array<Maybe<SoftwareCard>>;
    /** The number of days remaining */
    daysRemaining?: Maybe<Scalars['Int']>;
    /** The end date of the sprint, in ISO 8601 format */
    endDate?: Maybe<Scalars['DateTime']>;
    /** The sprint's goal, null if no goal is set */
    goal?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['ID']>;
    /** The sprint's name */
    name?: Maybe<Scalars['String']>;
    sprintMetadata?: Maybe<SoftwareSprintMetadata>;
    sprintState: SprintState;
    /** The start date of the sprint, in ISO 8601 format */
    startDate?: Maybe<Scalars['DateTime']>;
};
export declare type SprintCardsArgs = {
    cardIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type SprintEndData = {
    __typename?: 'SprintEndData';
    /** list of all issues that are in the sprint with their estimates */
    issueList: Array<Maybe<ScopeSprintIssue>>;
    /** scope remaining at the end of the sprint */
    remainingEstimate: Scalars['Float'];
    /** timestamp of when sprint was completed */
    timestamp: Scalars['DateTime'];
};
export declare enum SprintReportsEstimationStatisticType {
    IssueCount = "ISSUE_COUNT",
    OriginalEstimate = "ORIGINAL_ESTIMATE",
    StoryPoints = "STORY_POINTS"
}
export declare type SprintReportsFilters = {
    __typename?: 'SprintReportsFilters';
    /** Possible statistic that we want to track */
    estimationStatistic: Array<Maybe<SprintReportsEstimationStatisticType>>;
    /** List of sprints to select from */
    sprints: Array<Maybe<Sprint>>;
};
export declare type SprintResponse = MutationResponse & {
    __typename?: 'SprintResponse';
    message: Scalars['String'];
    sprint?: Maybe<Sprint>;
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
export declare type SprintScopeChangeData = {
    __typename?: 'SprintScopeChangeData';
    /** amount completed of the esimtation statistic */
    completion: Scalars['Float'];
    /** estimation of the issue after this change */
    estimate?: Maybe<Scalars['Float']>;
    /** type of event */
    eventType: Scalars['SprintScopeChangeEventType'];
    /** the issue involved in the change */
    issueKey: Scalars['String'];
    /** the issue description */
    issueSummary: Scalars['String'];
    /** the previous completed amount before this change */
    prevCompletion: Scalars['Float'];
    /** the previous estimation before this change */
    prevEstimate?: Maybe<Scalars['Float']>;
    /** the previous remaining amount before this change */
    prevRemaining: Scalars['Float'];
    /** the sprint scope before the change */
    prevScope: Scalars['Float'];
    /** amount remaining of the estimation statistic */
    remaining: Scalars['Float'];
    /** sprint scope after this change */
    scope: Scalars['Float'];
    /** timestamp of change */
    timestamp: Scalars['DateTime'];
};
export declare type SprintStartData = {
    __typename?: 'SprintStartData';
    /** list of all issues that are in the sprint with their estimates */
    issueList: Array<Maybe<ScopeSprintIssue>>;
    /** scope estimate for start of sprint */
    scopeEstimate: Scalars['Float'];
    timestamp: Scalars['DateTime'];
};
export declare enum SprintState {
    Active = "ACTIVE",
    Closed = "CLOSED",
    Future = "FUTURE"
}
/** Start sprint */
export declare type StartSprintInput = {
    boardId: Scalars['ID'];
    endDate: Scalars['String'];
    goal?: Maybe<Scalars['String']>;
    name: Scalars['String'];
    sprintId: Scalars['ID'];
    startDate: Scalars['String'];
};
export declare type SupportRequest = SupportRequestCommonRequest & {
    __typename?: 'SupportRequest';
    /** The comments that should be obtained for this request. */
    comments: SupportRequestComments;
    /** The date that the request was created in the format 'yyyy-MM-dd'T'HH:mm:ss.SSSX', for example 2019-10-10T10:10:10.1000Z. */
    createdDate: SupportRequestDisplayableDateTime;
    /** The full description for this request in wiki markup format (Jira format). */
    description: Scalars['String'];
    /** The public facing fields that are relevant to this request. There may be other fields internally that are not being exposed here. */
    fields: Array<SupportRequestField>;
    /** The unique identifier for this request. It will make it unique across multiple systems, for example 'GSAC-CA-1000' for GSAC requests. */
    id: Scalars['ID'];
    /** The users that are participants for this request */
    participants: Array<SupportRequestUser>;
    /** The public facing name for the project that this request is in, for example Customer Advocates. */
    projectName: Scalars['String'];
    /** The user that reported this request. This value can be null if the reporter has been removed from the request. */
    reporter: SupportRequestUser;
    /** The public facing name for this request type, for example Support Request. */
    requestTypeName: Scalars['String'];
    /** The flag whether request view should be routed to the customer support portal. */
    routeToSupportPortal: Scalars['Boolean'];
    /** The current status of the request, for example open. */
    status: SupportRequestStatus;
    /** Gets the status transitioned on the request ID. */
    statuses: SupportRequestStatuses;
    /** The short general description of the request. */
    summary?: Maybe<Scalars['String']>;
};
export declare type SupportRequestCommentsArgs = {
    offset?: Maybe<Scalars['Int']>;
    size?: Maybe<Scalars['Int']>;
};
export declare type SupportRequestStatusesArgs = {
    offset?: Maybe<Scalars['Int']>;
    size?: Maybe<Scalars['Int']>;
};
export declare type SupportRequestAddCommentInput = {
    /** unique key/id of the request ticket */
    issueKey: Scalars['String'];
    /** The comment message in wiki markup format (Jira format). */
    message: Scalars['String'];
};
/** The top level wrapper for the CSP Support Request Mutations API. */
export declare type SupportRequestCatalogMutationApi = {
    __typename?: 'SupportRequestCatalogMutationApi';
    /** Add customer comment on a issue */
    addComment?: Maybe<SupportRequestComment>;
};
/** The top level wrapper for the CSP Support Request Mutations API. */
export declare type SupportRequestCatalogMutationApiAddCommentArgs = {
    input?: Maybe<SupportRequestAddCommentInput>;
};
/** Top level wrapper for CSP Support Request queries API */
export declare type SupportRequestCatalogQueryApi = {
    __typename?: 'SupportRequestCatalogQueryApi';
    /** Get information about the current logged in user. This can be used to get the requests for the current user. */
    me?: Maybe<SupportRequestPage>;
    /** Obtain an individual request. */
    supportRequest?: Maybe<SupportRequest>;
};
/** Top level wrapper for CSP Support Request queries API */
export declare type SupportRequestCatalogQueryApiSupportRequestArgs = {
    key: Scalars['ID'];
};
/** A comment for the request. These are non-heirarchical comments and are only linked to a single request. */
export declare type SupportRequestComment = {
    __typename?: 'SupportRequestComment';
    /** The user that created this comment. */
    author: SupportRequestUser;
    /** The date that this comment was originally created */
    createdDate: SupportRequestDisplayableDateTime;
    /** The comment message in wiki markup format (Jira format). */
    message: Scalars['String'];
};
export declare type SupportRequestComments = {
    __typename?: 'SupportRequestComments';
    /** Indicates whether the current page returned is the last page of results. */
    lastPage: Scalars['Boolean'];
    /** Total number of items to return, subject to server enforced limits. */
    limit: Scalars['Int'];
    /** The item used as the first item in the page of results */
    offset: Scalars['Int'];
    /** Number of items to return per page */
    size: Scalars['Int'];
    /** List of comment. */
    values: Array<SupportRequestComment>;
};
/** All of the Queries that are available. */
export declare type SupportRequestCommonRequest = {
    /** The date that the request was created in the format 'yyyy-MM-dd'T'HH:mm:ss.SSSX', for example 2019-10-10T10:10:10.1000Z. */
    createdDate: SupportRequestDisplayableDateTime;
    /** The full description for this request in wiki markup format (Jira format). */
    description: Scalars['String'];
    /** The unique identifier for this request. It will make it unique across multiple systems, for example 'GSAC-CA-1000' for GSAC requests. */
    id: Scalars['ID'];
    /** The users that are participants for this request */
    participants: Array<SupportRequestUser>;
    /** The user that reported this request. This value can be null if the reporter has been removed from the request. */
    reporter: SupportRequestUser;
    /** The public facing name for this request type, for example Support Request. */
    requestTypeName: Scalars['String'];
    /** The current status of the request, for example open. */
    status: SupportRequestStatus;
    /** The short general description of the request. */
    summary?: Maybe<Scalars['String']>;
};
export declare type SupportRequestContactRelation = {
    __typename?: 'SupportRequestContactRelation';
    /** contact details of a user */
    contact?: Maybe<SupportRequestUser>;
    /** Open request tickets for a user */
    openRequest?: Maybe<SupportRequestTicket>;
};
/** A DateTime type for the request, this contains multiple formats of datetime */
export declare type SupportRequestDisplayableDateTime = {
    __typename?: 'SupportRequestDisplayableDateTime';
    /** Offset friendly date time */
    dateTime: Scalars['String'];
    /** Epoch milliseconds */
    epochMillis: Scalars['Long'];
    /** Display friendly date time. */
    friendly: Scalars['String'];
};
export declare type SupportRequestField = {
    __typename?: 'SupportRequestField';
    /** Unique Id of the field, for example description, custom_field_1234 */
    id: Scalars['String'];
    /** The public facing name of the field, for example Priority, Customer Timezone */
    label: Scalars['String'];
    /** The public facing value of the field. */
    value: SupportRequestFieldValue;
};
/** The value of the field. This has been kept as a seperate type for extensibility, such as including icons.  */
export declare type SupportRequestFieldValue = {
    __typename?: 'SupportRequestFieldValue';
    /** The value of the field, e.g. Priority 4. */
    value: Scalars['String'];
};
export declare type SupportRequestHierarchyRequest = SupportRequestCommonRequest & {
    __typename?: 'SupportRequestHierarchyRequest';
    /** child ticket(s) to this request  */
    children?: Maybe<Array<SupportRequestHierarchyRequest>>;
    /** The date that the request was created in the format 'yyyy-MM-dd'T'HH:mm:ss.SSSX', for example 2019-10-10T10:10:10.1000Z. */
    createdDate: SupportRequestDisplayableDateTime;
    /** The full description for this request in wiki markup format (Jira format). */
    description: Scalars['String'];
    /** The unique identifier for this request. It will make it unique across multiple systems, for example 'GSAC-CA-1000' for GSAC requests. */
    id: Scalars['ID'];
    /** Parent ticket to this Request */
    parent?: Maybe<SupportRequestHierarchyRequest>;
    /** The users that are participants for this request */
    participants: Array<SupportRequestUser>;
    /** The user that reported this request. This value can be null if the reporter has been removed from the request. */
    reporter: SupportRequestUser;
    /** The public facing name for this request type, for example Support Request. */
    requestTypeName: Scalars['String'];
    /** The current status of the request, for example open. */
    status: SupportRequestStatus;
    /** The short general description of the request. */
    summary?: Maybe<Scalars['String']>;
};
export declare type SupportRequestHierarchyRequests = {
    __typename?: 'SupportRequestHierarchyRequests';
    page: Array<SupportRequestHierarchyRequest>;
    total: Scalars['Int'];
};
export declare type SupportRequestNamedContactRelation = {
    __typename?: 'SupportRequestNamedContactRelation';
    /** List of named contacts relations for a user */
    contactRelations?: Maybe<Array<Maybe<SupportRequestContactRelation>>>;
    /** The unique id of the org in case of cloud enterprise */
    orgId?: Maybe<Scalars['String']>;
    /** Name of the org in case of cloud enterprise */
    orgName?: Maybe<Scalars['String']>;
    /** Support Entitlement Number. This is relevant only for premier support server business */
    sen?: Maybe<Scalars['String']>;
};
export declare type SupportRequestNamedContactRelations = {
    __typename?: 'SupportRequestNamedContactRelations';
    cloudEnterpriseRelations?: Maybe<Array<Maybe<SupportRequestNamedContactRelation>>>;
    premierSupportRelations?: Maybe<Array<Maybe<SupportRequestNamedContactRelation>>>;
};
/** A user (customer or agent) of the support system. */
export declare type SupportRequestPage = {
    __typename?: 'SupportRequestPage';
    /** Search for the migration requests that the user reported and/or participated in */
    migrationRequests?: Maybe<SupportRequestHierarchyRequests>;
    /** Search for the named contacts of the orgs/sens that user belongs to */
    namedContactRelations?: Maybe<SupportRequestNamedContactRelations>;
    profile?: Maybe<SupportRequestUser>;
    /** Search for the requests that the user reported and/or participated in */
    requests?: Maybe<SupportRequests>;
};
/** A user (customer or agent) of the support system. */
export declare type SupportRequestPageMigrationRequestsArgs = {
    offset?: Scalars['Int'];
    ownership?: Maybe<SupportRequestQueryOwnership>;
    size?: Scalars['Int'];
    status?: Maybe<SupportRequestQueryStatusCategory>;
};
/** A user (customer or agent) of the support system. */
export declare type SupportRequestPageRequestsArgs = {
    backend?: Maybe<Array<Scalars['String']>>;
    offset?: Scalars['Int'];
    ownership?: Maybe<SupportRequestQueryOwnership>;
    project?: Maybe<Scalars['String']>;
    requestType?: Maybe<Scalars['String']>;
    searchTerm?: Maybe<Scalars['String']>;
    size?: Scalars['Int'];
    status?: Maybe<SupportRequestQueryStatusCategory>;
};
/** Query parameter for how this user has access to the request, e.g. they were the reporter or added as a participant. */
export declare enum SupportRequestQueryOwnership {
    Participant = "PARTICIPANT",
    Reporter = "REPORTER"
}
/** The general category for the status of the ticket. */
export declare enum SupportRequestQueryStatusCategory {
    Done = "DONE",
    Open = "OPEN"
}
export declare type SupportRequestStatus = {
    __typename?: 'SupportRequestStatus';
    /** General category of request's status. */
    category: SupportRequestStatusCategory;
    /** The date at which the status change was done. */
    createdDate?: Maybe<SupportRequestDisplayableDateTime>;
    /** The descriptive, publically-facing text shown to customers for this request */
    text: Scalars['String'];
};
/** The general category for the status of the ticket. */
export declare enum SupportRequestStatusCategory {
    Done = "DONE",
    InProgress = "IN_PROGRESS",
    Open = "OPEN"
}
export declare type SupportRequestStatuses = {
    __typename?: 'SupportRequestStatuses';
    /** Indicates whether the current page returned is the last page of results. */
    lastPage: Scalars['Boolean'];
    /** Total number of items to return, subject to server enforced limits. */
    limit: Scalars['Int'];
    /** The item used as the first item in the page of results */
    offset: Scalars['Int'];
    /** Number of items to return per page */
    size: Scalars['Int'];
    /** List of status transitions. */
    values: Array<SupportRequestStatus>;
};
export declare type SupportRequestTicket = {
    __typename?: 'SupportRequestTicket';
    /** unique key/id of the request ticket */
    issueKey?: Maybe<Scalars['String']>;
};
export declare type SupportRequestUser = {
    __typename?: 'SupportRequestUser';
    /** The GSAC display name of user */
    displayName?: Maybe<Scalars['String']>;
    /** The GSAC email for this user */
    email?: Maybe<Scalars['String']>;
    /** Identity User */
    user?: Maybe<User>;
    /** The GSAC username for this user. */
    username?: Maybe<Scalars['String']>;
};
export declare type SupportRequests = {
    __typename?: 'SupportRequests';
    page: Array<SupportRequest>;
    total: Scalars['Int'];
};
export declare type Swimlane = {
    __typename?: 'Swimlane';
    /** The set of card types allowed in the swimlane */
    allowedCardTypes?: Maybe<Array<CardType>>;
    /** The column data */
    columnsInSwimlane?: Maybe<Array<Maybe<ColumnInSwimlane>>>;
    /** The icon to show for the swimlane */
    iconUrl?: Maybe<Scalars['String']>;
    /**
     * The swimlane ID.  This will match the id of the object the swimlane is grouping by.  e.g. Epic's it will be the
     * epic's issue Id.  For assignees it will be the assignee's atlassian account id.   For swimlanes which do not
     * represent a object (e.g. "Issues without assignee's" swimlane) the value will be "0".
     */
    id?: Maybe<Scalars['ID']>;
    /** The name of the swimlane */
    name?: Maybe<Scalars['String']>;
};
/** How to group cards on the board into swimlanes */
export declare enum SwimlaneStrategy {
    Assignee = "ASSIGNEE",
    Issuechildren = "ISSUECHILDREN",
    Issueparent = "ISSUEPARENT",
    None = "NONE"
}
export declare type Team = {
    __typename?: 'Team';
    displayName?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    largeAvatarImageUrl?: Maybe<Scalars['String']>;
    smallAvatarImageUrl?: Maybe<Scalars['String']>;
};
export declare type TeamQuery = {
    __typename?: 'TeamQuery';
    /** Returns the team with the given ARI */
    team?: Maybe<Team>;
};
export declare type TeamQueryTeamArgs = {
    id: Scalars['ID'];
};
export declare type TenantContext = {
    __typename?: 'TenantContext';
    /** This cloud id of a tenanted Jira or Confluence instance */
    cloudId?: Maybe<Scalars['ID']>;
    /** This host name of a tenanted Jira or Confluence instance */
    hostName?: Maybe<Scalars['String']>;
    /** The organization id for this tenant */
    orgId?: Maybe<Scalars['ID']>;
};
/**
 * ### OAuth Scopes
 *
 * The following scopes will need to be present on OAuth requests to get data from this field
 *
 * * __read:jira-work__
 */
export declare type Testing = {
    __typename?: 'Testing';
    /** Echos the message argument back to the caller */
    echo?: Maybe<Scalars['String']>;
    /**
     * This returns a hypothetical Movie by id for testing purposes
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:jira-work__
     */
    movie?: Maybe<TestingMovie>;
    /** This returns a list of hypothetical Movies for testing purposes */
    movies?: Maybe<Array<Maybe<TestingMovie>>>;
    /** Generates a new UUID */
    uuid?: Maybe<Scalars['String']>;
};
/**
 * ### OAuth Scopes
 *
 * The following scopes will need to be present on OAuth requests to get data from this field
 *
 * * __read:jira-work__
 */
export declare type TestingEchoArgs = {
    message?: Maybe<Scalars['String']>;
};
/**
 * ### OAuth Scopes
 *
 * The following scopes will need to be present on OAuth requests to get data from this field
 *
 * * __read:jira-work__
 */
export declare type TestingMovieArgs = {
    id: Scalars['ID'];
};
export declare type TestingCharacter = {
    __typename?: 'TestingCharacter';
    id: Scalars['ID'];
    name?: Maybe<Scalars['String']>;
};
export declare type TestingMovie = {
    __typename?: 'TestingMovie';
    characters?: Maybe<Array<Maybe<TestingCharacter>>>;
    id: Scalars['ID'];
    renamedName?: Maybe<Scalars['String']>;
};
/** The input for a Third Party Repository */
export declare type ThirdPartyRepositoryInput = {
    /** Avatar details for the third party repository. */
    avatar?: Maybe<AvatarInput>;
    /** The ID of the third party repository. */
    id: Scalars['ID'];
    /** The name of the third party repository. */
    name?: Maybe<Scalars['String']>;
    /** The URL of the third party repository. */
    webUrl?: Maybe<Scalars['String']>;
};
/**
 * General Report Types
 * ====================
 */
export declare type TimeSeriesPoint = {
    __typename?: 'TimeSeriesPoint';
    id: Scalars['ID'];
    x: Scalars['DateTime'];
    y: Scalars['Int'];
};
export declare type TunnelDefinitionsInput = {
    customUI?: Maybe<Array<Maybe<CustomUiTunnelDefinitionInput>>>;
    /** The URL to tunnel FaaS calls to */
    faasTunnelUrl?: Maybe<Scalars['URL']>;
};
export declare type UnarchivePolarisInsightsPayload = Payload & {
    __typename?: 'UnarchivePolarisInsightsPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type UnassignIssueParentInput = {
    boardId: Scalars['ID'];
    issueIds: Array<Scalars['ID']>;
};
export declare type UnassignIssueParentOutput = MutationResponse & {
    __typename?: 'UnassignIssueParentOutput';
    boardScope?: Maybe<BoardScope>;
    clientMutationId?: Maybe<Scalars['ID']>;
    message: Scalars['String'];
    statusCode: Scalars['Int'];
    success: Scalars['Boolean'];
};
/** Handles detaching a dataManager from a Component */
export declare type UnlinkExternalSourceInput = {
    cloudId: Scalars['ID'];
    /** The ID of the Forge App being uninstalled */
    ecosystemAppId: Scalars['ID'];
    /** The external source name of any ExternalAliases to be removed */
    externalSource: Scalars['String'];
};
export declare type UnlinkExternalSourcePayload = Payload & {
    __typename?: 'UnlinkExternalSourcePayload';
    /** A list of errors that occurred during the mutation */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation succeeded or not */
    success: Scalars['Boolean'];
};
export declare type UnwatchMarketplaceAppPayload = Payload & {
    __typename?: 'UnwatchMarketplaceAppPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type UpdateAppDetailsInput = {
    appId: Scalars['ID'];
    description?: Maybe<Scalars['String']>;
    name: Scalars['String'];
};
export declare type UpdateAppDetailsResponse = Payload & {
    __typename?: 'UpdateAppDetailsResponse';
    app?: Maybe<App>;
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
/** Input payload for enrolling scopes to an app environment */
export declare type UpdateAppHostServiceScopesInput = {
    /** A unique Id representing the app */
    appId: Scalars['ID'];
    /** The key of the app's environment to enrol the scopes */
    environmentKey: Scalars['String'];
    /** The scopes this app will be enrolled to after the request succeeds */
    scopes?: Maybe<Array<Scalars['String']>>;
    /** The Id of the service for which the scopes belong to */
    serviceId: Scalars['ID'];
};
/** Response from enrolling scopes into an app environment */
export declare type UpdateAppHostServiceScopesResponsePayload = Payload & {
    __typename?: 'UpdateAppHostServiceScopesResponsePayload';
    /** Details about the app */
    app?: Maybe<App>;
    /** Details about the version of the app */
    appEnvironmentVersion?: Maybe<AppEnvironmentVersion>;
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
/** Input payload for updating an Atlassian OAuth Client mutation */
export declare type UpdateAtlassianOAuthClientInput = {
    callbacks?: Maybe<Array<Scalars['String']>>;
    clientID: Scalars['ID'];
    refreshToken?: Maybe<RefreshTokenInput>;
};
/** Response from updating an oauth client */
export declare type UpdateAtlassianOAuthClientResponse = Payload & {
    __typename?: 'UpdateAtlassianOAuthClientResponse';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
/** Accepts input to update a data manager on a component. */
export declare type UpdateCompassComponentDataManagerMetadataInput = {
    /** The ID of the component to update a data manager on. */
    componentId: Scalars['ID'];
    /** A URL of the external source of the component's data. */
    externalSourceURL?: Maybe<Scalars['URL']>;
    /** Details about the last sync event to this component. */
    lastSyncEvent?: Maybe<ComponentSyncEventInput>;
};
/** The payload returned from updating a data manager of a component. */
export declare type UpdateCompassComponentDataManagerMetadataPayload = Payload & {
    __typename?: 'UpdateCompassComponentDataManagerMetadataPayload';
    /**
     * The details of the component that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    componentDetails?: Maybe<CompassComponent>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** Accepts input for updating an existing component. */
export declare type UpdateCompassComponentInput = {
    /** The description of the component. */
    description?: Maybe<Scalars['String']>;
    /** A collection of fields for storing data about the component. */
    fields?: Maybe<Array<UpdateCompassFieldInput>>;
    /** The ID of the component being updated. */
    id: Scalars['ID'];
    /** The name of the component. */
    name?: Maybe<Scalars['String']>;
    /** The unique identifier (ID) of the team that owns the component. */
    ownerId?: Maybe<Scalars['ID']>;
};
/** Accepts input for updating a component link. */
export declare type UpdateCompassComponentLinkInput = {
    /** The ID for the component to update the link. */
    componentId: Scalars['ID'];
    /** The link to be updated for the component. */
    link: UpdateCompassLinkInput;
};
/** The payload returned after updating a component link. */
export declare type UpdateCompassComponentLinkPayload = Payload & {
    __typename?: 'UpdateCompassComponentLinkPayload';
    /**
     * The details of the component that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    componentDetails?: Maybe<CompassComponent>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
    /** The newly updated component link. */
    updatedComponentLink?: Maybe<CompassLink>;
};
/** The payload returned from updating an existing component. */
export declare type UpdateCompassComponentPayload = Payload & {
    __typename?: 'UpdateCompassComponentPayload';
    /**
     * The details of the component that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:component:compass__
     */
    componentDetails?: Maybe<CompassComponent>;
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/** Accepts input to update a field. */
export declare type UpdateCompassFieldInput = {
    /** The ID of the field definition. */
    definition: Scalars['ID'];
    /** The value of the field. */
    value: CompassFieldValueInput;
};
export declare type UpdateCompassHasDescriptionScorecardCriteriaInput = {
    /** The ID of the scorecard criterion to update. */
    id: Scalars['ID'];
    /** The weight that will be used in determining the aggregate score. */
    weight?: Maybe<Scalars['Int']>;
};
export declare type UpdateCompassHasFieldScorecardCriteriaInput = {
    /** The ID for the field definition which is the target of a relationship. */
    fieldDefinitionId?: Maybe<Scalars['ID']>;
    /** ID of the scorecard criteria to update */
    id: Scalars['ID'];
    /** The weight that will be used in determining the aggregate score. */
    weight?: Maybe<Scalars['Int']>;
};
export declare type UpdateCompassHasLinkScorecardCriteriaInput = {
    /** ID of the scorecard criteria to update */
    id: Scalars['ID'];
    /** The type of link, for example, 'Repository' if 'Has Repository'. */
    linkType?: Maybe<CompassLinkType>;
    /** The weight that will be used in determining the aggregate score. */
    weight?: Maybe<Scalars['Int']>;
};
export declare type UpdateCompassHasOwnerScorecardCriteriaInput = {
    /** The ID of the scorecard criterion to update. */
    id: Scalars['ID'];
    /** The weight that will be used in determining the aggregate score. */
    weight?: Maybe<Scalars['Int']>;
};
/** Accepts details of the link to be updated. */
export declare type UpdateCompassLinkInput = {
    /** The unique identifier (ID) of the link. */
    id: Scalars['ID'];
    /** The name of the link. */
    name?: Maybe<Scalars['String']>;
    /** The type of the link. */
    type?: Maybe<CompassLinkType>;
    /** The URL of the link. */
    url?: Maybe<Scalars['URL']>;
};
export declare type UpdateCompassScorecardCriteriaInput = {
    hasDescription?: Maybe<UpdateCompassHasDescriptionScorecardCriteriaInput>;
    hasField?: Maybe<UpdateCompassHasFieldScorecardCriteriaInput>;
    hasLink?: Maybe<UpdateCompassHasLinkScorecardCriteriaInput>;
    hasOwner?: Maybe<UpdateCompassHasOwnerScorecardCriteriaInput>;
};
export declare type UpdateCompassScorecardCriteriasInput = {
    criterias: Array<UpdateCompassScorecardCriteriaInput>;
};
/** The payload returned from updating a scorecard criterion. */
export declare type UpdateCompassScorecardCriteriasPayload = Payload & {
    __typename?: 'UpdateCompassScorecardCriteriasPayload';
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /**
     * The scorecard that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:scorecard:compass__
     */
    scorecard?: Maybe<CompassScorecard>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
export declare type UpdateCompassScorecardInput = {
    componentType?: Maybe<CompassComponentType>;
    description?: Maybe<Scalars['String']>;
    importance?: Maybe<CompassScorecardImportance>;
    name?: Maybe<Scalars['String']>;
    ownerId?: Maybe<Scalars['ID']>;
};
/** The payload returned from updating a scorecard criterion. */
export declare type UpdateCompassScorecardPayload = Payload & {
    __typename?: 'UpdateCompassScorecardPayload';
    /** A list of errors that occurred during the mutation. */
    errors?: Maybe<Array<MutationError>>;
    /**
     * The scorecard that was mutated.
     *
     * ### OAuth Scopes
     *
     * The following scopes will need to be present on OAuth requests to get data from this field
     *
     * * __read:scorecard:compass__
     */
    scorecardDetails?: Maybe<CompassScorecard>;
    /** Whether the mutation was successful or not. */
    success: Scalars['Boolean'];
};
/**
 * Updates a custom filter with the given id in the board with the given boardId.
 * The update will update the entire filter (ie. not a partial update)
 */
export declare type UpdateCustomFilterInput = {
    boardId: Scalars['ID'];
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    jql: Scalars['String'];
    name: Scalars['String'];
};
/** The request input for updating relationship properties */
export declare type UpdateDevOpsContainerRelationshipEntityPropertiesInput = {
    /** The ARI of the relationship entity */
    id: Scalars['ID'];
    properties: Array<DevOpsContainerRelationshipEntityPropertyInput>;
};
/** The response payload of updating relationship properties */
export declare type UpdateDevOpsContainerRelationshipEntityPropertiesPayload = Payload & {
    __typename?: 'UpdateDevOpsContainerRelationshipEntityPropertiesPayload';
    /** The errors occurred during relationship properties update */
    errors?: Maybe<Array<MutationError>>;
    /** Look up JSON properties of the service by keys */
    properties?: Maybe<Scalars['JSON']>;
    /** The result of whether relationship properties have been successfully updated or not */
    success: Scalars['Boolean'];
};
/** The response payload of updating relationship properties */
export declare type UpdateDevOpsContainerRelationshipEntityPropertiesPayloadPropertiesArgs = {
    keys: Array<Scalars['String']>;
};
/** The request input for updating a relationship between a DevOps Service and Jira Project */
export declare type UpdateDevOpsServiceAndJiraProjectRelationshipInput = {
    description?: Maybe<Scalars['String']>;
    /** The DevOps Graph Service_And_Jira_Project relationship ARI */
    id: Scalars['ID'];
    /**
     * The revision that must be provided when updating a relationship between DevOps Service and Jira Project to prevent
     * simultaneous updates from overwriting each other.
     */
    revision: Scalars['ID'];
};
export declare type UpdateDevOpsServiceAndJiraProjectRelationshipPayload = Payload & {
    __typename?: 'UpdateDevOpsServiceAndJiraProjectRelationshipPayload';
    /** The list of errors occurred during create relationship */
    errors?: Maybe<Array<MutationError>>;
    /** The updated relationship */
    serviceAndJiraProjectRelationship?: Maybe<DevOpsServiceAndJiraProjectRelationship>;
    /** The result of whether the relationship is created successfully or not */
    success: Scalars['Boolean'];
};
/** The request input for updating a relationship between a DevOps Service and an Opsgenie Team */
export declare type UpdateDevOpsServiceAndOpsgenieTeamRelationshipInput = {
    /** The new description assigned to the relationship. */
    description?: Maybe<Scalars['String']>;
    /** The DevOps Graph Service_And_Opsgenie_Team relationship ARI */
    id: Scalars['ID'];
    /**
     * The revision that must be provided when updating a relationship between DevOps Service and Opsgenie Team to prevent
     * simultaneous updates from overwriting each other.
     */
    revision: Scalars['ID'];
};
/** The response payload of updating a relationship between a DevOps Service and an Opsgenie Team */
export declare type UpdateDevOpsServiceAndOpsgenieTeamRelationshipPayload = Payload & {
    __typename?: 'UpdateDevOpsServiceAndOpsgenieTeamRelationshipPayload';
    /** The list of errors occurred during update relationship */
    errors?: Maybe<Array<MutationError>>;
    /** The updated relationship between DevOps Service and Opsgenie Team */
    serviceAndOpsgenieTeamRelationship?: Maybe<DevOpsServiceAndOpsgenieTeamRelationship>;
    /** The result of whether the relationship is updated successfully or not */
    success: Scalars['Boolean'];
};
/** The request input for updating a relationship between a DevOps Service and a Repository */
export declare type UpdateDevOpsServiceAndRepositoryRelationshipInput = {
    /** The description of the relationship */
    description?: Maybe<Scalars['String']>;
    /** The ARI of the relationship */
    id: Scalars['ID'];
    /**
     * The revision that must be provided when updating a relationship between DevOps Service and a Repository to prevent
     * simultaneous updates from overwriting each other.
     */
    revision: Scalars['ID'];
};
export declare type UpdateDevOpsServiceAndRepositoryRelationshipPayload = Payload & {
    __typename?: 'UpdateDevOpsServiceAndRepositoryRelationshipPayload';
    /** The list of errors occurred during update of the relationship */
    errors?: Maybe<Array<MutationError>>;
    /** The updated relationship */
    serviceAndRepositoryRelationship?: Maybe<DevOpsServiceAndRepositoryRelationship>;
    /** The result of whether the relationship is updated successfully or not */
    success: Scalars['Boolean'];
};
/** The request input for updating DevOps Service Entity Properties */
export declare type UpdateDevOpsServiceEntityPropertiesInput = {
    /** The ARI of the DevOps Service */
    id: Scalars['ID'];
    properties: Array<DevOpsServiceEntityPropertyInput>;
};
/** The response payload of updating DevOps Service Entity Properties */
export declare type UpdateDevOpsServiceEntityPropertiesPayload = Payload & {
    __typename?: 'UpdateDevOpsServiceEntityPropertiesPayload';
    /** The errors occurred during DevOps Service Entity Properties update */
    errors?: Maybe<Array<MutationError>>;
    /** Look up JSON properties of the service by keys */
    properties?: Maybe<Scalars['JSON']>;
    /** The result of whether DevOps Service Entity Properties have been successfully updated or not */
    success: Scalars['Boolean'];
};
/** The response payload of updating DevOps Service Entity Properties */
export declare type UpdateDevOpsServiceEntityPropertiesPayloadPropertiesArgs = {
    keys: Array<Scalars['String']>;
};
/** The request input for updating a DevOps Service */
export declare type UpdateDevOpsServiceInput = {
    /** The new description assigned to the DevOps Service */
    description?: Maybe<Scalars['String']>;
    /** The DevOps Service ARI */
    id: Scalars['ID'];
    /** The new name assigned to the DevOps Service */
    name: Scalars['String'];
    /** The properties of the DevOps Service to be updated */
    properties?: Maybe<Array<DevOpsServiceEntityPropertyInput>>;
    /**
     * The revision that must be provided when updating a DevOps Service to prevent
     * simultaneous updates from overwriting each other.
     */
    revision: Scalars['ID'];
    /** The id of the Tier assigned to the Service */
    serviceTier: Scalars['ID'];
};
/** The response payload of updating a DevOps Service */
export declare type UpdateDevOpsServicePayload = Payload & {
    __typename?: 'UpdateDevOpsServicePayload';
    /** The list of errors occurred during DevOps Service update */
    errors?: Maybe<Array<MutationError>>;
    /** The updated DevOps Service */
    service?: Maybe<DevOpsService>;
    /** The result of whether the DevOps Service is updated successfully or not */
    success: Scalars['Boolean'];
};
/** The request input for updating a DevOps Service Relationship */
export declare type UpdateDevOpsServiceRelationshipInput = {
    /** The description of the DevOps Service Relationship */
    description?: Maybe<Scalars['String']>;
    /** The DevOps Service Relationship ARI */
    id: Scalars['ID'];
    /**
     * The revision that must be provided when updating a DevOps Service Relationship to prevent
     * simultaneous updates from overwriting each other.
     */
    revision: Scalars['ID'];
};
/** The response payload for updating a inter DevOps Service Relationship */
export declare type UpdateDevOpsServiceRelationshipPayload = Payload & {
    __typename?: 'UpdateDevOpsServiceRelationshipPayload';
    errors?: Maybe<Array<MutationError>>;
    /** The updated inter-service relationship */
    serviceRelationship?: Maybe<DevOpsServiceRelationship>;
    success: Scalars['Boolean'];
};
export declare type UpdateDeveloperLogAccessInput = {
    /** AppId as ARI */
    appId: Scalars['ID'];
    /** An array of context ARIs */
    contextIds: Array<Scalars['ID']>;
    /** App environment */
    environmentType: AppEnvironmentType;
    /** Boolean representing whether access should be granted or not */
    shouldHaveAccess: Scalars['Boolean'];
};
export declare type UpdateDeveloperLogAccessPayload = Payload & {
    __typename?: 'UpdateDeveloperLogAccessPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type UpdateJiraProjectAndOpsgenieTeamRelationshipInput = {
    description?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    revision: Scalars['ID'];
};
export declare type UpdateJiraProjectAndOpsgenieTeamRelationshipPayload = Payload & {
    __typename?: 'UpdateJiraProjectAndOpsgenieTeamRelationshipPayload';
    errors?: Maybe<Array<MutationError>>;
    /** The updated relationship */
    jiraProjectAndOpsgenieTeamRelationship?: Maybe<JiraProjectAndOpsgenieTeamRelationship>;
    success: Scalars['Boolean'];
};
/** The request input for updating a relationship between a Jira project and a repository */
export declare type UpdateJiraProjectAndRepositoryRelationshipInput = {
    /** An optional description of the relationship */
    description?: Maybe<Scalars['String']>;
    /** The relationship ARI */
    id: Scalars['ID'];
    /** Database object revision ID created for the relationship */
    revision: Scalars['ID'];
    /**
     * The third party repository details.
     * This parameter should be null when the relationship involves a Bitbucket repository.
     * When updating third party repository details, the repository ID must stay consistent with the original relationship.
     */
    thirdPartyRepository?: Maybe<ThirdPartyRepositoryInput>;
};
export declare type UpdateJiraProjectAndRepositoryRelationshipPayload = Payload & {
    __typename?: 'UpdateJiraProjectAndRepositoryRelationshipPayload';
    /** The list of errors occurred during relationship update */
    errors?: Maybe<Array<MutationError>>;
    /** The updated relationship */
    jiraProjectAndRepositoryRelationship?: Maybe<JiraProjectAndRepositoryRelationship>;
    /** The result of whether the relationship is updated successfully or not */
    success: Scalars['Boolean'];
};
export declare type UpdatePolarisCalculatedFieldInput = {
    field: Scalars['ID'];
    formula: Scalars['JSON'];
    label: Scalars['String'];
    presentation?: Maybe<PolarisPresentationInput>;
    project: Scalars['ID'];
};
export declare type UpdatePolarisCalculatedFieldPayload = Payload & {
    __typename?: 'UpdatePolarisCalculatedFieldPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisIdeaField>;
    success: Scalars['Boolean'];
};
export declare type UpdatePolarisCommentInput = {
    content?: Maybe<Scalars['JSON']>;
    delete?: Maybe<Scalars['Boolean']>;
    id: Scalars['ID'];
};
export declare type UpdatePolarisCommentPayload = Payload & {
    __typename?: 'UpdatePolarisCommentPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisComment>;
    success: Scalars['Boolean'];
};
export declare type UpdatePolarisDecorationInput = {
    /** The decoration to apply to a matched value. */
    valueDecoration: PolarisValueDecorationInput;
    /** The decoration can be applied when a value matches all rules in this array. */
    valueRules: Array<PolarisValueRuleInput>;
};
export declare type UpdatePolarisDecorationPayload = Payload & {
    __typename?: 'UpdatePolarisDecorationPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisDecoration>;
    success: Scalars['Boolean'];
};
export declare type UpdatePolarisFieldDescriptionInput = {
    description: Scalars['String'];
    field: Scalars['ID'];
    ideaType: Scalars['ID'];
};
export declare type UpdatePolarisFieldDescriptionPayload = Payload & {
    __typename?: 'UpdatePolarisFieldDescriptionPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisIdeaField>;
    success: Scalars['Boolean'];
};
export declare type UpdatePolarisFieldOptionWeightInput = {
    field: Scalars['ID'];
    option: Scalars['ID'];
    project: Scalars['ID'];
    weight: Scalars['Int'];
};
export declare type UpdatePolarisFieldOptionWeightPayload = Payload & {
    __typename?: 'UpdatePolarisFieldOptionWeightPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type UpdatePolarisIdeaInput = {
    archived?: Maybe<Scalars['Boolean']>;
    lastCommentsViewedTimestamp?: Maybe<Scalars['String']>;
    lastInsightsViewedTimestamp?: Maybe<Scalars['String']>;
};
export declare type UpdatePolarisIdeaPayload = Payload & {
    __typename?: 'UpdatePolarisIdeaPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisIdea>;
    success: Scalars['Boolean'];
};
export declare type UpdatePolarisInsightInput = {
    description?: Maybe<Scalars['JSON']>;
    snippets?: Maybe<Array<UpdatePolarisSnippetInput>>;
};
export declare type UpdatePolarisInsightPayload = Payload & {
    __typename?: 'UpdatePolarisInsightPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisInsight>;
    success: Scalars['Boolean'];
};
export declare type UpdatePolarisPlayContribution = {
    amount?: Maybe<Scalars['Int']>;
    /**  the extent of the contribution (null=drop value) */
    comment?: Maybe<Scalars['ID']>;
    /**  the comment (null=drop value, which is not permitted; delete the contribution if needed) */
    content?: Maybe<Scalars['JSON']>;
};
export declare type UpdatePolarisPlayContributionPayload = {
    __typename?: 'UpdatePolarisPlayContributionPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisPlayContribution>;
    success: Scalars['Boolean'];
};
export declare type UpdatePolarisSnippetInput = {
    /** Data in JSON format. It will be validated with JSON schema of Polaris Insights Data format. */
    data?: Maybe<Scalars['JSON']>;
    deleteProperties?: Maybe<Array<Scalars['String']>>;
    /**
     * The client can specify either a specific snippet id, or an
     * oauthClientId.  In the latter case, we will create a snippet on
     * this data point (nee insight) if one doesn't exist already, and it
     * is an error for there to be more than one snippet with the same
     * oauthClientId.
     */
    id?: Maybe<Scalars['ID']>;
    /** OauthClientId of CaaS app */
    oauthClientId?: Maybe<Scalars['String']>;
    setProperties?: Maybe<Scalars['JSON']>;
    /** Snippet url that is source of data */
    url?: Maybe<Scalars['String']>;
};
export declare type UpdatePolarisTermsConsentInput = {
    /** Cloud ID where the terms were displayed to the user */
    cloudID: Scalars['String'];
    /** The text accepted by user as terms of service */
    displayedText: Scalars['String'];
    /** Country code for the user locale */
    locale: Scalars['String'];
    /** Has the user granted general marketing consent */
    marketingConsent: Scalars['Boolean'];
    /** URL visited by user when terms of service were accepted */
    url: Scalars['URL'];
};
export declare type UpdatePolarisTermsConsentPayload = Payload & {
    __typename?: 'UpdatePolarisTermsConsentPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type UpdatePolarisViewInput = {
    /**  the name of the view */
    description?: Maybe<Scalars['JSON']>;
    /**  just the user filtering part of the JQL */
    fields?: Maybe<Array<Scalars['ID']>>;
    /**  a field to sort by */
    filter?: Maybe<Array<PolarisViewFilterInput>>;
    /**  the table columns list of fields (table viz) or fields to show */
    groupBy?: Maybe<Scalars['ID']>;
    /**  what field to group by (board viz) */
    groupValues?: Maybe<Array<PolarisGroupValueInput>>;
    /**  view filter congfiguration */
    hidden?: Maybe<Array<Scalars['ID']>>;
    /**  description of the view */
    jql?: Maybe<Scalars['String']>;
    lastCommentsViewedTimestamp?: Maybe<Scalars['String']>;
    /**  fields that are included in view but hidden */
    lastViewedTimestamp?: Maybe<Scalars['String']>;
    /**  view to update, if this is an UPDATE operation */
    name?: Maybe<Scalars['String']>;
    /**  the field controlling the ordinate (y coordinate) */
    sort?: Maybe<Array<PolarisSortFieldInput>>;
    /**  the JQL (sets filter and sorting) */
    userJql?: Maybe<Scalars['String']>;
    /**  what are the (ordered) grouping values */
    verticalGroupBy?: Maybe<Scalars['ID']>;
    /**  what field to vertical group by (board viz) */
    verticalGroupValues?: Maybe<Array<PolarisGroupValueInput>>;
    view?: Maybe<Scalars['ID']>;
    /**  what are the (ordered) vertical grouping values */
    x?: Maybe<Scalars['ID']>;
    /**  the field controlling the abcissa (x coordinate) */
    y?: Maybe<Scalars['ID']>;
};
export declare type UpdatePolarisViewPayload = Payload & {
    __typename?: 'UpdatePolarisViewPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisView>;
    success: Scalars['Boolean'];
};
export declare type UpdatePolarisViewRankInput = {
    container?: Maybe<Scalars['ID']>;
    /**  new container if needed */
    rank: Scalars['Int'];
};
export declare type UpdatePolarisViewRankV2Payload = Payload & {
    __typename?: 'UpdatePolarisViewRankV2Payload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisViewSet>;
    success: Scalars['Boolean'];
};
export declare type UpdatePolarisViewSetInput = {
    name?: Maybe<Scalars['String']>;
    viewSet: Scalars['ID'];
};
export declare type UpdatePolarisViewSetPayload = Payload & {
    __typename?: 'UpdatePolarisViewSetPayload';
    errors?: Maybe<Array<MutationError>>;
    node?: Maybe<PolarisViewSet>;
    success: Scalars['Boolean'];
};
/**
 * There are 3 types of accounts :
 *
 * * AtlassianAccountUser
 * * this represents a real person that has an account in a wide range of Atlassian products
 *
 * * CustomerUser
 * * This represents a real person who is a customer of an organisation who uses an Atlassian product to provide service to their customers.
 * Currently, this isused within Jira Service Desk for external service desks.
 *
 * * AppUser
 * * this does not represent a real person but rather the identity that backs an installed application
 */
export declare type User = {
    /** The account ID for the user. */
    accountId: Scalars['ID'];
    /** The lifecycle status of the account */
    accountStatus: AccountStatus;
    /**
     * The display name of the user. This should be used when rendering a user textually within content.
     * If the user has restricted visibility of their name, their nickname will be
     * displayed as a substitute value.
     */
    name: Scalars['String'];
    /**
     * The absolute URI (RFC3986) to the avatar name of the user. This should be used when rendering a user graphically within content.
     * If the user has restricted visibility of their avatar or has not set
     * an avatar, an alternative URI will be provided as a substitute value.
     */
    picture: Scalars['URL'];
};
export declare type UserAuthTokenForExtensionInput = {
    extensionId: Scalars['ID'];
};
export declare type UserAuthTokenForExtensionResponse = Payload & {
    __typename?: 'UserAuthTokenForExtensionResponse';
    authToken?: Maybe<AuthToken>;
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type UserConsentExtension = {
    __typename?: 'UserConsentExtension';
    appEnvironmentVersion: UserConsentExtensionAppEnvironmentVersion;
    consentedAt: Scalars['DateTime'];
    user: UserConsentExtensionUser;
};
export declare type UserConsentExtensionAppEnvironmentVersion = {
    __typename?: 'UserConsentExtensionAppEnvironmentVersion';
    id: Scalars['ID'];
};
export declare type UserConsentExtensionUser = {
    __typename?: 'UserConsentExtensionUser';
    aaid: Scalars['ID'];
};
export declare type UserGrant = {
    __typename?: 'UserGrant';
    accountId: Scalars['ID'];
    appDetails?: Maybe<UserGrantAppDetails>;
    appId: Scalars['ID'];
    id: Scalars['ID'];
    oauthClientId: Scalars['ID'];
    scopes: Array<Maybe<AppHostServiceScope>>;
};
export declare type UserGrantAppDetails = {
    __typename?: 'UserGrantAppDetails';
    avatarUrl?: Maybe<Scalars['String']>;
    contactLink?: Maybe<Scalars['String']>;
    description: Scalars['String'];
    name: Scalars['String'];
    privacyPolicyLink?: Maybe<Scalars['String']>;
    termsOfServiceLink?: Maybe<Scalars['String']>;
    vendorName?: Maybe<Scalars['String']>;
};
export declare type UserGrantConnection = {
    __typename?: 'UserGrantConnection';
    edges?: Maybe<Array<Maybe<UserGrantEdge>>>;
    nodes?: Maybe<Array<Maybe<UserGrant>>>;
    pageInfo: UserGrantPageInfo;
};
export declare type UserGrantEdge = {
    __typename?: 'UserGrantEdge';
    cursor: Scalars['String'];
    node?: Maybe<UserGrant>;
};
export declare type UserGrantPageInfo = {
    __typename?: 'UserGrantPageInfo';
    endCursor?: Maybe<Scalars['String']>;
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
    startCursor?: Maybe<Scalars['String']>;
};
export declare type WatchMarketplaceAppPayload = Payload & {
    __typename?: 'WatchMarketplaceAppPayload';
    errors?: Maybe<Array<MutationError>>;
    success: Scalars['Boolean'];
};
export declare type WebTriggerUrl = Node & {
    __typename?: 'WebTriggerUrl';
    appId: Scalars['ID'];
    contextId: Scalars['ID'];
    envId: Scalars['ID'];
    extensionId: Scalars['ID'];
    id: Scalars['ID'];
    /** Product extracted from the context id (e.g. jira, confulence). Only populated if context id is a valid cloud context. */
    product?: Maybe<Scalars['String']>;
    /** The tenant context for the cloud id. Only populated if context id is a valid cloud context. */
    tenantContext?: Maybe<TenantContext>;
    triggerKey: Scalars['String'];
    url: Scalars['URL'];
};
export declare type WebTriggerUrlInput = {
    /** Id of the application */
    appId: Scalars['ID'];
    /**
     * context in which function should run, usually a site context.
     * E.g.: ari:cloud:jira::site/{siteId}
     */
    contextId: Scalars['ID'];
    /** Environment id of the application */
    envId: Scalars['ID'];
    /** Web trigger module key */
    triggerKey: Scalars['String'];
};
/** An Applied Directive is an instances of a directive as applied to a schema element. This type is NOT specified by the graphql specification presently. */
export declare type _AppliedDirective = {
    __typename?: '_AppliedDirective';
    args: Array<_DirectiveArgument>;
    name: Scalars['String'];
};
/** Directive arguments can have names and values.  The values are in graphql SDL syntax printed as a string. This type is NOT specified by the graphql specification presently. */
export declare type _DirectiveArgument = {
    __typename?: '_DirectiveArgument';
    name: Scalars['String'];
    value: Scalars['String'];
};
