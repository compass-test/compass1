import {
  UI_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';
import {
  createAndFireEvent,
  CreateUIAnalyticsEvent,
} from '@atlaskit/analytics-next';
import { AuthError } from '@atlaskit/outbound-auth-flow-client';
import { OriginAnalyticsAttributes } from '@atlassiansox/origin-tracing/types';
import {
  AnalyticsActionSubject,
  AnalyticsAction,
  ProductSelectOption,
  UserRole,
  GetDirectAccessSettingRequest,
  ViralSettingsCohort,
  FlagExplanation,
} from '../../types';

export const ANALYTICS_CHANNEL = 'peopleTeams';

export type InviteeListId = 'CreateableSelect' | 'UserPicker';
export const CREATEABLE_SELECT_ID: InviteeListId = 'CreateableSelect';
export const USER_PICKER_ID: InviteeListId = 'UserPicker';

const createAndFireEventOnPeopleTeams = createAndFireEvent(ANALYTICS_CHANNEL);

export const triggerAnalyticsForSelectAll = async (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  product?: string,
  productsSelected?: string[],
  userRole?: string,
  source?: string,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.DROPDOWN_ITEM,
    action: AnalyticsAction.CLICKED,
    actionSubjectId: 'selectAll',
    attributes: {
      integration: source,
      source,
      product,
      productsSelected,
      permissionLevel: userRole,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForClickAddMoreButton = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  product?: string,
  source?: string,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.BUTTON,
    actionSubjectId: 'addMoreEmailsButton',
    action: AnalyticsAction.CLICKED,
    attributes: {
      integration: source,
      source,
      product,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForClickCancelButton = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  product?: string,
  source?: string,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.BUTTON,
    actionSubjectId: 'cancelButton',
    action: AnalyticsAction.CLICKED,
    attributes: {
      integration: source,
      source,
      product,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForClickInviteButton = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  attributes: {
    product?: string;
    numberOfEmails?: number;
    numberOfUniqueEmails?: number;
    formError?: string;
    invitedProducts?: string[];
    source?: string;
  },
) => {
  const {
    product,
    numberOfEmails,
    numberOfUniqueEmails,
    formError,
    invitedProducts,
    source,
  } = attributes;
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.BUTTON,
    actionSubjectId: 'inviteButton',
    action: AnalyticsAction.CLICKED,
    attributes: {
      integration: source,
      source,
      product,
      numberOfEmails,
      numberOfUniqueEmails,
      formError,
      invitedProducts,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForRenderProductSelect = (
  attributes: {
    userRole?: string;
    productOptions?: ProductSelectOption[];
    source?: string;
  },
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  actionSubjectId = 'productSelect',
) => {
  const { productOptions, userRole, source } = attributes;
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.DROPDOWN,
    actionSubjectId: actionSubjectId,
    action: AnalyticsAction.RENDERED,
    attributes: {
      integration: source,
      source,
      userRole,
      productOptions,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForRenderUserInvitesCheckbox = (
  attributes: { container: string; value: boolean },
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.CHECKBOX,
    actionSubjectId: 'userInvitesCheckbox',
    action: AnalyticsAction.RENDERED,
    attributes: {
      ...attributes,
      flow: 'core-invites',
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForRenderDirectAccessCheckbox = (
  attributes: { domain: string; container: string; value: boolean },
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.CHECKBOX,
    actionSubjectId: 'directAccessCheckbox',
    action: AnalyticsAction.RENDERED,
    attributes: {
      ...attributes,
      flow: 'core-invites',
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};
export const triggerAnalyticsForClickedUserInvitesCheckbox = (
  attributes: { value: boolean; container: string },
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.CHECKBOX,
    action: AnalyticsAction.CLICKED,
    // To match naming of checkbox clicked event from admin hub
    actionSubjectId: 'userInvitesCheckbox',
    attributes: {
      ...attributes,
      flow: 'core-invites',
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};
export const triggerAnalyticsForClickedDirectAccessCheckbox = (
  attributes: { value: boolean; domain: string; container: string },
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.CHECKBOX,
    action: AnalyticsAction.CLICKED,
    actionSubjectId: 'directAccessCheckbox',
    attributes: {
      ...attributes,
      flow: 'core-invites',
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};
export const triggerAnalyticsForClickedInfoModalButton = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.BUTTON,
    action: AnalyticsAction.CLICKED,
    actionSubjectId: 'viralSettingsModalInfoButton',
  });

  fireEventWithPayload(createAnalyticsEvent);
};
export const triggerAnalyticsForClickedInfoModalCloseButton = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.BUTTON,
    action: AnalyticsAction.CLICKED,
    actionSubjectId: 'viralSettingsModalCloseButton',
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForClickedInfoModalClosed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.MODAL,
    action: AnalyticsAction.CLOSED,
    actionSubjectId: 'viralSettingsModal',
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForOpenProductSelectDropdown = (
  attributes: {
    userRole?: string;
    selectedProducts?: string[];
    productOptions?: string[];
    source?: string;
  },
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const { productOptions, selectedProducts, userRole, source } = attributes;
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.DROPDOWN,
    actionSubjectId: 'productSelect',
    action: AnalyticsAction.OPENED,
    attributes: {
      integration: source,
      source,
      userRole,
      productOptions,
      selectedProducts,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForUserInvited = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  integration: string,
  originAttributes: OriginAnalyticsAttributes,
  userId: string,
  products: string[],
  userRole: UserRole,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: TRACK_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.USER,
    actionSubjectId: userId,
    action: AnalyticsAction.INVITED,
    attributes: {
      ...originAttributes,
      permissionLevel: userRole,
      products,
      integration,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForAccessRequested = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  integration: string,
  originAttributes: OriginAnalyticsAttributes,
  userId: string,
  products: string[],
  userRole: UserRole,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: TRACK_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.PRODUCT_ACCESS,
    actionSubjectId: userId,
    action: AnalyticsAction.REQUESTED,
    attributes: {
      ...originAttributes,
      permissionLevel: userRole,
      products,
      requestedForUserId: userId,
      integration,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForFailedInviteRequest = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  integration: string,
  products: string[],
  userRole: UserRole,
  code?: string,
  message?: string,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_REQUEST,
    action: AnalyticsAction.FAILED,
    attributes: {
      code,
      message,
      permissionLevel: userRole,
      products,
      integration,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsSLOInviteFail = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  integration: string,
  code?: string,
  message?: string,
  status?: number,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.SLO_INVITE_REQUEST,
    action: AnalyticsAction.FAILED,
    attributes: {
      status,
      code,
      message,
      integration,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsSLOInviteSuccess = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  integration: string,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.SLO_INVITE_REQUEST,
    action: AnalyticsAction.SUCCEEDED,
    attributes: {
      integration,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsSLOThirdPartyInitFail = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  error: string | undefined,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.SLO_THIRD_PARTY_INIT,
    action: AnalyticsAction.FAILED,
    attributes: {
      error,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsSLOThirdPartyInitSuccess = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.SLO_THIRD_PARTY_INIT,
    action: AnalyticsAction.SUCCEEDED,
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForInviteFormLoaded = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  integration: string,
  duration: number,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_FORM,
    action: AnalyticsAction.LOADED,
    attributes: {
      integration,
      duration,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForInviteFormFailedToLoad = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  integration: string,
  error: {
    message: string;
    stack: string | undefined;
  },
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_FORM,
    action: AnalyticsAction.FAILED,
    attributes: {
      integration,
      error,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

interface InviteResponseDetails {
  invited?: string[];
  accessRequested?: string[];
  error?: {
    message: string;
    code?: string;
  }[];
}

export const triggerAnalyticsForSucceededInviteRequest = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  integration: string,
  products: string[],
  userRole: UserRole,
  response: InviteResponseDetails,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_REQUEST,
    action: AnalyticsAction.SUCCEEDED,
    attributes: {
      integration,
      permissionLevel: userRole,
      products,
      invited: response.invited,
      accessRequested: response.accessRequested,
      error: response.error,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForFailedGetPerms = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  resourceId: string,
  message: string,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.PERMS,
    actionSubjectId: resourceId,
    action: AnalyticsAction.FAILED,
    attributes: {
      message,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForSucceededGetPerms = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  resourceId: string,
  isInviteUsersPermitted?: boolean,
  isManagePermitted?: boolean,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.PERMS,
    actionSubjectId: resourceId,
    action: AnalyticsAction.SUCCEEDED,
    attributes: {
      isInviteUsersPermitted,
      isManagePermitted,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForSucceededGetAvailableProducts = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  resourceAri: string,
  availableResourcesAri: string[],
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_CAPABILITIES,
    actionSubjectId: resourceAri,
    action: AnalyticsAction.SUCCEEDED,
    attributes: {
      availableResourcesAri,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForFailedGetAvailableProducts = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  resourceAri: string,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_CAPABILITIES,
    actionSubjectId: resourceAri,
    action: AnalyticsAction.FAILED,
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForInviteeListItemAdded = (
  attributes: { domains: string[] },
  id: InviteeListId,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const { domains } = attributes;
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITEE_LIST_ITEM,
    actionSubjectId: AnalyticsActionSubject.INVITEE_LIST_ITEM + id,
    action: AnalyticsAction.ADDED,
    attributes: { domains },
  });

  fireEventWithPayload(createAnalyticsEvent);
};
export const triggerAnalyticsForInviteeListFocused = (
  id: InviteeListId,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITEE_LIST,
    actionSubjectId: AnalyticsActionSubject.INVITEE_LIST + id,
    action: AnalyticsAction.CLICKED,
    attributes: {},
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForExposedInviteInviteeList = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  value?: boolean,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: TRACK_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITEE_LIST,
    action: AnalyticsAction.EXPOSED,
    attributes: {
      enabled: value,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForExposedINFI = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  product: string,
  cohort: string,
  value: string,
  enabledIntegrations: string[],
  slackTeams: string[],
  enableSlackv2?: boolean,
  ineligibilityReasons?: string[],
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: TRACK_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_PEOPLE_FEATURE,
    action: AnalyticsAction.EXPOSED,
    attributes: {
      flagKey:
        product === 'jira'
          ? 'jira.frontend.growth.experiments.infi.enabled'
          : 'confluence.frontend.invite.from.integrations',
      value,
      cohort,
      growthInitiative: 'virality',
      experimentName: 'Invite From Any Integration',
      ineligibilityReasons,
      enabledIntegrations,
      slackTeams,
      enableSlackv2,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForExposedViralSettings = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  product: string,
  value: string,
  integration: string,
  ineligibilityReasons?: string[],
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_PEOPLE_FEATURE,
    action: AnalyticsAction.EXPOSED,
    attributes: {
      flagKey: 'confluence.frontend.viral.settings.in.core.invites',
      value,
      product,
      growthInitiative: 'virality',
      experimentName: 'Viral settings in core invites',
      integration: integration,
      ineligibilityReasons,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const qualifiesForViralSettings = (
  cohort: string | undefined,
  role: string,
) => cohort === ViralSettingsCohort.VARIATION && role === 'admin';

export const triggerAnalyticsForExposedViralOptionsDefaultToChecked = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  product: string,
  reasons: string[],
  value: boolean,
  explanation?: FlagExplanation, // OFF | FALLTHROUGH | RULE_MATCH | TARGET_MATCH | INELIGIBLE | PREREQUISITE_FAILED | ERROR | OVERRIDE | SIMPLE_EVAL
  source?: string,
) => {
  const finalReason = reasons.length >= 1 ? 'INELIGIBLE' : explanation?.kind;
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_PEOPLE_FEATURE,
    action: AnalyticsAction.EXPOSED,
    attributes: {
      flagKey: 'confluence.frontend.viral.options.default.to.checked',
      product,
      value,
      source,
      reason: finalReason,
      reasons,
      ruleId: explanation?.ruleId,
      growthInitiative: 'virality',
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

const HISIAnalyticsFactory = (eventType: string, action: string) => async (
  attributes: {
    flagKey: string;
    product: string;
    cloudId: string;
    domain?: string;
    value?: boolean;
  },
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: eventType,
    actionSubject: AnalyticsActionSubject.USER_INVITE_SETTINGS_HISI,
    action: action,
    attributes,
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForHISIFlagCreateFailed = HISIAnalyticsFactory(
  OPERATIONAL_EVENT_TYPE,
  AnalyticsAction.CREATE_FAILED,
);
export const triggerAnalyticsForHISIFlagCreated = HISIAnalyticsFactory(
  TRACK_EVENT_TYPE,
  AnalyticsAction.CREATED,
);
export const triggerAnalyticsForHISIFlagFetchFailed = HISIAnalyticsFactory(
  OPERATIONAL_EVENT_TYPE,
  AnalyticsAction.FETCH_FAILED,
);
export const triggerAnalyticsForHISIFlagFetched = HISIAnalyticsFactory(
  TRACK_EVENT_TYPE,
  AnalyticsAction.FETCHED,
);

export const triggerAnalyticsForClickConnectButton = (
  serviceKey: string,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.BUTTON,
    actionSubjectId: 'connect',
    action: AnalyticsAction.CLICKED,
    attributes: {
      integration: serviceKey,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForIntegrationConnected = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  serviceKey: string,
  teamId?: string,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.THIRD_PARTY_INTEGRATIION,
    action: AnalyticsAction.CONNECTED,
    attributes: {
      integration: serviceKey,
      teamId,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForIntegrationFailed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  serviceKey: string,
  error?: AuthError,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.THIRD_PARTY_INTEGRATIION,
    action: AnalyticsAction.FAILED,
    attributes: {
      integration: serviceKey,
      errorType: error ? error.type : undefined,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForClickIntegrationSettingsButton = (
  serviceKey: string,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.BUTTON,
    actionSubjectId: 'integrationSettings',
    action: AnalyticsAction.CLICKED,
    attributes: {
      integration: serviceKey,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForSlackConnectModal = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: SCREEN_EVENT_TYPE,
    name: 'slackConnectModal',
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForClickSlackDoneButton = (
  teamId: string,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.BUTTON,
    actionSubjectId: 'done',
    action: AnalyticsAction.CLICKED,
    attributes: {
      selectedTeamId: teamId,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForClickSlackCloseButton = (
  teamId: string | null,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.BUTTON,
    actionSubjectId: 'close',
    action: AnalyticsAction.CLICKED,
    attributes: {
      selectedTeamId: teamId,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForClickSlackDisconnectButton = (
  teamId: string,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.BUTTON,
    actionSubjectId: 'disconnect',
    action: AnalyticsAction.CLICKED,
    attributes: {
      selectedTeamId: teamId,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForClickSlackDisconnectConfirmButton = (
  teamId: string,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.BUTTON,
    actionSubjectId: 'disconnectConfirm',
    action: AnalyticsAction.CLICKED,
    attributes: {
      selectedTeamId: teamId,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForClickSlackDisconnectCancelButton = (
  teamId: string,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.BUTTON,
    actionSubjectId: 'disconnectCancel',
    action: AnalyticsAction.CLICKED,
    attributes: {
      selectedTeamId: teamId,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForEmailInputChange = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  inputIndex: number,
  source?: string,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.EMAIL_INPUT,
    action: AnalyticsAction.CHANGED,
    attributes: {
      source,
      inputIndex,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForGetUserInvitesSettingsSucceeded = (
  ari: string,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.GET_USER_INVITES_SETTINGS,
    action: AnalyticsAction.SUCCEEDED,
    attributes: {
      ari,
    },
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForGetUserInvitesSettingsFailure = (
  ari: string,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.GET_USER_INVITES_SETTINGS,
    action: AnalyticsAction.FAILED,
    attributes: {
      ari,
    },
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForGetDirectAccessSettingSucceeded = (
  request: GetDirectAccessSettingRequest,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.GET_DIRECT_ACCESS_SETTING,
    action: AnalyticsAction.SUCCEEDED,
    attributes: {
      ...request,
    },
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForGetDirectAccessSettingFailure = (
  request: GetDirectAccessSettingRequest,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.GET_DIRECT_ACCESS_SETTING,
    action: AnalyticsAction.FAILED,
    attributes: {
      ...request,
    },
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForApprovedDomainsSettingsSuccess = (
  attributes: { addedDomains: string[] },
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: TRACK_EVENT_TYPE,
    // Matches naming from admin hub
    actionSubject: AnalyticsActionSubject.APPROVED_DOMAIN_SETTINGS,
    action: AnalyticsAction.UPDATED,
    attributes: {
      flow: 'core-invites',
      ...attributes,
    },
  });
  // Fire duplicate operational event for TOME usage.
  const fireEventWithPayloadOperational = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    // Matches naming from admin hub
    actionSubject: AnalyticsActionSubject.APPROVED_DOMAIN_SETTINGS,
    action: AnalyticsAction.UPDATED,
    attributes: {
      flow: 'core-invites',
      ...attributes,
    },
  });
  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
    fireEventWithPayloadOperational(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForApprovedDomainsSettingsFailed = (
  attributes: { proposedDomains: string[] },
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.APPROVED_DOMAIN_SETTINGS,
    action: AnalyticsAction.UPDATE_FAILED,
    attributes: {
      flow: 'core-invites',
      ...attributes,
    },
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForUserInviteSettingsSuccess = (
  attributes: { newState: string },
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: TRACK_EVENT_TYPE,
    // Matches naming from admin hub
    actionSubject: AnalyticsActionSubject.USER_INVITE_SETTINGS,
    action: AnalyticsAction.UPDATED,
    attributes: {
      flow: 'core-invites',
      ...attributes,
    },
  });
  // Fire duplicate operational event for TOME usage.
  const fireEventWithPayloadOperational = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    // Matches naming from admin hub
    actionSubject: AnalyticsActionSubject.USER_INVITE_SETTINGS,
    action: AnalyticsAction.UPDATED,
    attributes: {
      flow: 'core-invites',
      ...attributes,
    },
  });
  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
    fireEventWithPayloadOperational(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForUserInviteSettingsFailure = (
  attributes: { proposedNewState: string },
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.USER_INVITE_SETTINGS,
    action: AnalyticsAction.UPDATE_FAILED,
    attributes: {
      flow: 'core-invites',
      ...attributes,
    },
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForDropdownMenuItemClick = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.DROPDOWN_ITEM,
    actionSubjectId: 'manageAccessSettingsLink',
    action: AnalyticsAction.CLICKED,
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForViralSettingsModalViewed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: SCREEN_EVENT_TYPE,
    name: 'viralSettingsModal',
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForInvitePeopleDrawerMigration = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  invitePeopleDrawerMigrationCohort?: string,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_PEOPLE_FEATURE,
    action: AnalyticsAction.EXPOSED,
    attributes: {
      flagKey: 'confluence.frontend.people-menu.invite-people-drawer-migration',
      value: invitePeopleDrawerMigrationCohort,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForInviteComponentViewed = (
  userRole: string | undefined,
  source: string | undefined,
  product: string,
  viralSettingsCohort: string | undefined,
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  viralOptionsDefaultToCheckedFeatureFlag?: {
    value: boolean;
    explanation?: FlagExplanation;
  },
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: SCREEN_EVENT_TYPE,
    name: AnalyticsActionSubject.CORE_INVITE_COMPONENT,
    attributes: {
      userRole,
      source,
      product,
      viralSettingsCohort,
      viralOptionsDefaultToCheckedFeatureFlag,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForErrorBoundaryRendered = (
  attributes: {
    product: string;
    source: string;
    error: {
      message: string;
      stack: string | undefined;
    };
  },
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.ERROR_BOUNDARY,
    action: AnalyticsAction.RENDERED,
    attributes,
  });

  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForExposedUserRecommendations = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  product: string,
  value: string,
  source: string | undefined,
  reasons: string[],
  userRole: string | undefined,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_PEOPLE_FEATURE,
    action: AnalyticsAction.EXPOSED,
    attributes: {
      flagKey: 'confluence.frontend.user.recommendations',
      value,
      product,
      source,
      reasons,
      growthInitiative: 'virality',
      experimentName: 'User recommendations',
      experience: 'invite-people',
      userRole,
    },
  });

  fireEventWithPayload(createAnalyticsEvent);
};
