import { FlagProps } from '@atlaskit/flag';

export type AccountInfo = {
  account_id: string;
  email: string;
};

export type OpenInviteInfo = {
  mode: 'DIRECT_ACCESS' | 'REQUEST_ACCESS';
  resource?: string;
};

export type GetOpenInviteStateResponse = {
  response: GetOpenInviteInfo;
  cached: boolean;
};

export type GetOpenInviteInfo = OpenInviteInfo & {
  getOpenInvite: true;
};

export type UpdateOpenInviteResponse = {
  success: boolean;
  // Used for type guarding
  enableOpenInvite: true;
};
export interface UpdateOpenInviteFailureResponse {
  errorMessage: string;
  error?: Error;
  responseCode?: number;
  updateOpenInviteSettingFailure: true;
}

export type UserRecommendationsCohort =
  | 'control'
  | 'not-enrolled-control'
  | 'invite-people'
  | 'not-enrolled-invite-people'
  | 'people-menu'
  | 'not-enrolled-people-menu'
  | 'both-touch-points'
  | 'not-enrolled-both-touch-points';

export interface ViralSettingsByDomainValue {
  isChecked: boolean;
  desPromotionEligible: boolean | undefined;
}
export interface ViralSettingsByDomainValueObject {
  key: string;
  value: ViralSettingsByDomainValue;
}
export interface ViralSettingsByDomain {
  [key: string]: ViralSettingsByDomainValue;
}
export interface ViralSettingsHookProps {
  domains: string[];
  productId: string;
  products: string[];
  cloudId: string;
  viralSettingsCohort?: string;
  viralOptionsDefaultToCheckedFeatureFlagEnabled?: boolean;
  role: string;
  focusedSelect: boolean;
  selectEnabled: boolean;
}
export interface InvitePeopleProps {
  // Temporary flag to use EXUS as 3rd party API
  thirdPartyApiV2?: boolean;
  // A custom label to the Add more people button
  addMoreButtonLabel?: React.ReactNode;
  // alignment of send and cancel buttons
  alignButtons?: AlignButtons;
  // will show/hide the Add more button, defaults to true
  allowAddMoreFields?: boolean;
  // A custom label to the Cancel button
  cancelButtonLabel?: React.ReactNode;
  // The URL where the invited users will land once they join the product
  continueUrl: string;
  hideCancelButton?: boolean;
  // A custom title to the invite form
  formTitle?: React.ReactNode;
  // A custom description to the invite form
  formDescription?: React.ReactNode;
  // Will provide a custom label to the button Send invite
  sendButtonLabel?: React.ReactNode;
  // use custom product select, showing comma-separated product names
  enableCustomizedProductSelect?: boolean;
  // name of the sub-product, for jira users only
  subProduct?: SubProduct;
  // Override the list of available products to select from
  productOptions?: ProductSelectOption[];
  // Enable invitee list
  enableInviteeList?: boolean;
  // Enable third party integration searching
  enableThirdParty?: boolean;
  // Third party invites cohort in product
  thirdPartyInvitesCohort?: 'experiment' | 'control' | 'not-enrolled';
  // Slack v2 for 3rd party invites
  thirdPartySlackv2Enabled?: boolean;
  // User Recommendations cohort in product
  userRecommendationsCohort?: UserRecommendationsCohort;
  // Viral Settings cohort in product
  viralSettingsCohort?: 'variation' | 'control' | 'not-enrolled';
  // Viral options default to checked feature flag data
  viralOptionsDefaultToCheckedFeatureFlag?: {
    value: boolean;
    explanation?: FlagExplanation;
  };
  // Invite people drawer migration in people menu cohort
  invitePeopleDrawerMigrationCohort?: 'variation' | 'control' | 'not-enrolled';
  // Callback function for showing successful or error flags
  showFlag?: GenericShowFlag<any>;
  // Source where the invite people component is triggered
  source?: string;
  // jira project name if the invite people component is triggered in a jira project
  jiraProjectName?: string;
  // jira project key if the invite people component is triggered in a jira project
  jiraProjectKey?: string;
  // We use this prop to test robot screen inside People menu and you should not use in production.
  _hasError?: boolean;
  // Number of text fields available on the invite form, defaults to 3
  defaultNumberOfInputs?: number;
  // Max number of text fields (up to 10) on the invite form
  maxNumberOfInputs?: number;
  // Function to handle post send
  onSendHandler?: () => void;
  // Function to handle post cancel
  onCancelHandler?: () => void;
  // Function to handle post invite, it will pass through the invite api response
  experimental_onInviteCompletedHandler?: (
    inviteResponse: BulkInviteResponse,
  ) => void;
  // Site ARI: ari:cloud:confluence::site/<id>
  resourceAri: string;
  // Describe if the current user is an admin, a trusted user or a basic user
  userRole?: UserRole;
}

export type SubProduct = 'core' | 'software' | 'servicedesk';

export type JiraSubProduct = 'jira-core' | 'jira-software' | 'jira-servicedesk';

export type UserRole = 'admin' | 'trusted' | 'basic';

export type AlignButtons = 'left' | 'right';

export interface GenericShowFlag<T> {
  (arg: T): T;
}

// These get passed into data prop for Option
export type ProductSelectOption = {
  label: string;
  value: string;
};
export declare type Reason =
  | 'OFF'
  | 'FALLTHROUGH'
  | 'RULE_MATCH'
  | 'TARGET_MATCH'
  | 'INELIGIBLE'
  | 'SIMPLE_EVAL'
  | 'ERROR';
export declare type ErrorKind =
  | 'WRONG_TYPE'
  | 'FLAG_NOT_FOUND'
  | 'VALIDATION_ERROR';
export declare type RuleId = string;
export declare type FlagExplanation = {
  kind: Reason;
  ruleId?: RuleId;
  ruleIndex?: number;
  errorKind?: ErrorKind;
};
export type InvitePeopleComponentProps = Omit<
  InvitePeopleProps,
  | 'defaultNumberOfInputs'
  | 'maxNumberOfInputs'
  | 'onSendHandler'
  | 'onCancelHandler'
  | 'experimental_onInviteCompletedHandler'
  | 'resourceAri'
  | 'userRole'
>;
export interface InvitedUser {
  email: string;
  id?: string;
}

export type ResourceAri = string;

export type InviteResponseStatus =
  | 'INVITED'
  | 'INVITED_PENDING_APPROVAL'
  | 'USER_EXISTS'
  | 'PENDING_INVITE_EXISTS'
  | 'NOT_INVITED'
  | 'ERROR';

export type InviteApiRequest = {
  users: InvitedUser[];
  continueUrl: string;
  resources: ResourceAri[];
  suppressInviteEmail?: boolean;
};

export interface InviteApiFailureResponse {
  message: string;
  code?: string;
  description?: string;
  reason?: string;
  status: number;
}

export type InviteApiSuccessResponse = InvitedUser & {
  results: {
    [resourceAri: string]: InviteResponseStatus;
  };
  errorReasons: {
    [resourceAri: string]: Pick<InviteApiFailureResponse, 'code' | 'message'>;
  };
};

export interface BulkInviteSuccessResponse {
  invited: InvitedUser[];
  accessRequested: InvitedUser[];
  error: (InvitedUser & {
    error?: Pick<InviteApiFailureResponse, 'code' | 'message'>;
  })[];
}

export interface BulkInviteFailureResponse {
  failure: InviteApiFailureResponse;
}

export type BulkInviteResponse =
  | BulkInviteSuccessResponse
  | BulkInviteFailureResponse;

export interface GetDirectAccessSettingRequest {
  domain: string;
  productAri: string;
  setting: 'DIRECT_ACCESS' | 'REQUEST_ACCESS';
  roleAri?: string;
}

export type GetDirectAccessSettingResponse =
  | GetDirectAccessSettingSuccessResponse
  | GetDirectAccessSettingFailureResponse;
export interface GetDirectAccessSettingSuccessResponse {
  response: GetDirectAccessSettingSuccessResponseValue;
  cached: boolean;
}
export interface GetDirectAccessSettingSuccessResponseValue {
  domain: string;
  desPromotionEligible: boolean;
  role: string;
  getAccessSuccessReponse: true;
}

export interface GetDirectAccessSettingFailureResponse {
  domain: string;
  errorMessage: string;
  error?: Error;
  responseCode?: number;
}

export type UpdateDirectAccessSettingResponse =
  | UpdateDirectAccessSettingSuccessResponse
  | UpdateDirectAccessSettingFailureResponse;

export type UpdateDirectAccessSettingSuccessResponse = {
  success: boolean;
  updateDirectAccessSettings: true;
};

export interface UpdateDirectAccessSettingFailureResponse {
  errorMessage: string;
  error?: Error;
  responseCode?: number;
  updateDirectAccessSettingsFailure: true;
}

export type UpdateDirectAccessSettingRequest = {
  product: string;
  cloudId: string;
  domains: string[];
  location: string;
};

export interface Resource {
  resourceOwner: string;
  resourceType: string;
  resourceId: string;
}

export type PermissionId = 'invite-users' | 'manage';

export type PermsApiRequest = {
  permissionId: PermissionId;
  cloudId: string;
};
export type PermsApiResponse = {
  permitted: boolean;
};

export interface PermsApiResponseInterface {
  role: UserRole;
  isInviteUsersPermitted?: boolean;
  isManagePermitted?: boolean;
  errorMessage?: string;
}

export type Flag = Pick<
  FlagProps,
  'appearance' | 'title' | 'description' | 'actions' | 'icon'
>;

export enum AnalyticsActionSubject {
  INVITE_FORM = 'inviteForm',
  ERROR_BOUNDARY = 'errorBoundary',
  USER = 'user',
  PRODUCT_ACCESS = 'productAccess',
  INVITE = 'invite',
  INVITE_REQUEST = 'inviteRequest',
  SLO_INVITE_REQUEST = 'sloInviteRequest',
  SLO_THIRD_PARTY_INIT = 'sloThirdPartyInit',
  LINK = 'link',
  BUTTON = 'button',
  PERMS = 'permissions',
  INVITE_CAPABILITIES = 'inviteCapabilities',
  INVITE_PEOPLE_FEATURE = 'feature',
  DROPDOWN_ITEM = 'dropdownItem',
  DROPDOWN = 'dropdown',
  INVITEE_LIST = 'inviteeList',
  INVITEE_LIST_ITEM = 'inviteeListItem',
  USER_PICKER = 'userPicker',
  CHECKBOX = 'checkbox',
  SETTINGS = 'settings',
  MODAL = 'modal',
  THIRD_PARTY_INVITES = 'thirdPartyInvites',
  THIRD_PARTY_INTEGRATIION = 'thirdPartyIntegration',
  EMAIL_INPUT = 'emailInput',
  GET_USER_INVITES_SETTINGS = 'getUserInvitesSettings',
  GET_DIRECT_ACCESS_SETTING = 'getDirectAccessSetting',
  APPROVED_DOMAIN_SETTINGS = 'approvedDomainsSettings',
  USER_INVITE_SETTINGS = 'userInvitesSettings',
  CORE_INVITE_COMPONENT = 'coreInviteComponent',
  USER_INVITE_SETTINGS_HISI = 'userInvitesSettingsHISI',
}

export enum AnalyticsAction {
  LOADED = 'loaded',
  CLICKED = 'clicked',
  ADDED = 'added',
  INVITED = 'invited',
  REQUESTED = 'requested',
  FAILED = 'failed',
  SUCCEEDED = 'succeeded',
  EXPOSED = 'exposed',
  OPENED = 'opened',
  CLOSED = 'closed',
  SKIPPED = 'skipped',
  CONNECTED = 'connected',
  CHANGED = 'changed',
  RENDERED = 'rendered',
  UPDATED = 'updated',
  UPDATE_FAILED = 'updateFailed',
  CREATED = 'created',
  CREATE_FAILED = 'createFailed',
  FETCHED = 'fetched',
  FETCH_FAILED = 'fetchFailed',
}

export enum AnalyticsSource {
  ADD_PEOPLE = 'addPeople',
  SLACK_CONNECT_MODAL = 'slackConnectModal',
}

interface InviteCapability {
  mode: string;
  permittedResources?: Array<string>;
}

export interface InviteCapabilitiesResponse {
  directInvite: InviteCapability;
  invitePendingApproval: InviteCapability;
}

export interface InviteProduct {
  name: string;
  id: string;
  ari: string;
}

export type SlackWorkspace = {
  id: string;
  name: string;
  avatar: string;
};

export type GetFlagResponse = {
  response: HaveISeenItFlag;
  cached: boolean;
};

export type HaveISeenItFlag = {
  status: boolean;
  lastSeenDate: string | null;
};

export enum Cohort {
  EXPERIMENT = 'experiment',
  CONTROL = 'control',
  NOT_ENROLLED = 'not-enrolled',
}

export enum ViralSettingsCohort {
  VARIATION = 'variation',
  CONTROL = 'control',
  NOT_ENROLLED = 'not-enrolled',
}
