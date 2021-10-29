export const ALL_USERS_FROM_G_SYNC = 'All users from G Suite';
export const GOOGLE_WORKSPACE_PROJECT = 'Team Inflow from Google Workspace';
export const ANALYTICS_PACKAGE_NAME = 'googleWorkspaceModals';
export const ACTION_FAILED = 'failed';
export const ACTION_CALLED = 'called';
export const ACTION_SUCCEEDED = 'succeeded';
export const STANDARD_PLAN = 'standardPlan';
export const PLAN_PRICING = 'planPricing';
export const CONTACT_SUPPORT = 'contactSupport';
export const MANUALLY_GIVE_ACCESS = 'manuallyGiveAccess';
export const AUTOMATICALLY_REQUEST_ACCESS = 'automaticallyRequestAccess';
export const ANALYTICS_SOURCE_NAME = 'chromaModals';
export const ANALYTICS_X_CLOSE_BUTTON_ID = 'xCloseButton';
export const ANALYTICS_CLOSE_BUTTON_ID = 'CloseButton';
export const ANALYTICS_OK_BUTTON_ID = 'OkButton';
export const ANALYTICS_NOT_NOW_BUTTON_ID = 'NotNowButton';
export const ANALYTICS_ADD_PAYMENT_BUTTON_ID = 'AddPaymentButton';
export const ANALYTICS_LEARN_MORE_BUTTON_ID = 'LearnMoreButton';
export const ANALYTICS_ADDON_PRODUCT_LINK = 'AddonProductLinkButton';
export const MODERNIZED_PLAN_SELECTION_PROJECT =
  'Modernized Plan Selection Project';
export const CHROMA_MODALS = 'Chroma Modals';
export const MULTIPLE_PRODUCT_UPGRADE = 'Multiple product upgrade';

//error constants
export const NO_USER_GROUP_FOR_G_SYNC = 'no user group for G Suite';
export const NO_CLOUD_ID_GROUP_ID = 'no cloud id or group id';
export const MISSING_REQUIRED_FIELDS = 'Missing Required Fields';

//links
export const CONTACT_SUPPORT_LINK = 'https://support.atlassian.com/';
export const JSW_PRICING_LINK =
  'https://www.atlassian.com/software/jira/pricing';
export const CONF_PRICING_LINK =
  'https://www.atlassian.com/software/confluence/pricing';

//enums
export enum ScreenType {
  GOOGLE_WORKSPACE_PRODUCT_ACCESS_SELECTION = 'googleWorkspaceProductAccessSelection',
  GOOGLE_WORKSPACE_LOADING = 'googleWorkspaceLoading',
  GOOGLE_WORKSPACE_ERROR = 'googleWorkspaceError',
  GOOGLE_WORKSPACE_TRIAL_ERROR = 'googleWorkspaceTrialError',
  GOOGLE_WORKSPACE_ACCESS_ERROR = 'googleWorkspaceAccessError',
  GOOGLE_WORKSPACE_PRODUCT_CONFIRMATION = 'googleWorkspaceProductConfirmation',
  MODERNIZED_PLAN_SELECTION_MODAL = 'modernizedPlanSelectionModal',
  MPU_BETTER_TOGETHER_OVERLAY_SCREEN = 'betterTogetherOverlayScreen',
  MPU_BETTER_TOGETHER_PRODUCT_INFO_SCREEN = 'betterTogetherProductInfoScreen',
  MPU_ADD_PAYMENT_SCREEN = 'addPaymentScreen',
}

export enum APIType {
  ACCESS_GET_GROUP_ID = 'access_getGroupId',
  ACCESS_GRANT_GROUP_PERMISSION = 'access_grantGroupPermission',
  BUX_SET_EDITION = 'bux_editionSelect',
  BUX_GET_ENTITLEMENT_GROUP = 'bux_getEntitlementGroup',
}

export enum ErrorType {
  GENERIC = 'generic',
  TRIAL = 'trial',
  ACCESS = 'access',
}

export enum ErrorActionSubjectId {
  GENERIC = 'googleWorkspaceErrorModal',
  TRIAL = 'googleWorkspaceTrialErrorModal',
  ACCESS = 'googleWorkspaceAccessErrorModal',
}

export enum Editions {
  FREE = 'free',
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

export enum ProductKeys {
  CONFLUENCE = 'confluence.ondemand',
  JIRA_CORE = 'jira-core.ondemand',
  JIRA_SERVICE_DESK = 'jira-servicedesk.ondemand',
  JIRA_SOFTWARE = 'jira-software.ondemand',
  TRELLO = 'trello',
  OPSGENIE = 'opsgenie',
  BITBUCKET = 'bitbucket.ondemand',
  STATUSPAGE = 'statuspage',
  UNDEFINED = 'undefined',
}

export enum ProductNames {
  CONFLUENCE = 'Confluence',
  JIRA_CORE = 'Jira Core',
  JIRA_SERVICE_MANAGEMENT = 'Jira Service Management',
  JIRA_SOFTWARE = 'Jira Software',
  JIRA_FAMILY = 'Jira',
  TRELLO = 'Trello',
  OPSGENIE = 'Opsgenie',
  BITBUCKET = 'Bitbucket',
  STATUSPAGE = 'Statuspage',
  JIRA_SERVICE_DESK = 'Jira Service Desk',
  AVOCADO = 'Avocado',
  TEAM_CENTRAL = 'Team Central (Beta)',
  UNDEFINED = '',
}

export const ProductNameFromProductKeyMap = {
  [ProductKeys.CONFLUENCE]: ProductNames.CONFLUENCE,
  [ProductKeys.JIRA_CORE]: ProductNames.JIRA_CORE,
  [ProductKeys.JIRA_SERVICE_DESK]: ProductNames.JIRA_SERVICE_MANAGEMENT,
  [ProductKeys.JIRA_SOFTWARE]: ProductNames.JIRA_SOFTWARE,
  [ProductKeys.TRELLO]: ProductNames.TRELLO,
  [ProductKeys.OPSGENIE]: ProductNames.OPSGENIE,
  [ProductKeys.BITBUCKET]: ProductNames.BITBUCKET,
  [ProductKeys.STATUSPAGE]: ProductNames.STATUSPAGE,
  [ProductKeys.UNDEFINED]: ProductNames.UNDEFINED,
};

export enum Permission {
  READ,
  WRITE,
  MANAGE,
}

export enum AccessProductId {
  JIRA_SOFTWARE = 'jira-software',
  CONFLUENCE = 'conf',
  JIRA_CORE = 'jira-core',
  JIRA_SERVICEDESK = 'jira-servicedesk',
}

export enum OriginProduct {
  ADMINHUB = 'admin',
  BITBUCKET = 'bitbucket',
  CONFLUENCE = 'confluence',
  JIRA_CORE = 'jira-core',
  JIRA_SERVICE_DESK = 'jira-servicedesk',
  JIRA_SOFTWARE = 'jira-software',
  JIRA_FAMILY = 'jira',
  TRELLO = 'trello',
  OPSGENIE = 'opsgenie',
  STATUSPAGE = 'statuspage',
  START = 'start',
}

export const getProductNameFromProductKeyMap = {
  [ProductKeys.CONFLUENCE]: ProductNames.CONFLUENCE,
  [ProductKeys.JIRA_CORE]: ProductNames.JIRA_CORE,
  [ProductKeys.JIRA_SERVICE_DESK]: ProductNames.JIRA_SERVICE_MANAGEMENT,
  [ProductKeys.JIRA_SOFTWARE]: ProductNames.JIRA_SOFTWARE,
  [ProductKeys.TRELLO]: ProductNames.TRELLO,
  [ProductKeys.OPSGENIE]: ProductNames.OPSGENIE,
  [ProductKeys.BITBUCKET]: ProductNames.BITBUCKET,
  [ProductKeys.STATUSPAGE]: ProductNames.STATUSPAGE,
  [ProductKeys.UNDEFINED]: ProductNames.UNDEFINED,
};
