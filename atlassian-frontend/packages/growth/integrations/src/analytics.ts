import { OPERATIONAL_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import {
  createAndFireEvent,
  CreateUIAnalyticsEvent,
} from '@atlaskit/analytics-next';

import { SlackServiceAnalytics } from './AbstractSlackService';
import { ConfluenceSlackServiceAnalytics } from './types';

export type OperationalError = {
  status: number;
  errorMessage?: string;
};

const ANALYTICS_CHANNEL = 'peopleTeams';

const createAndFireEventOnPeopleTeams = createAndFireEvent(ANALYTICS_CHANNEL);

enum AnalyticsActionSubject {
  INTEGRATION_SUCCEEDED = 'integrationEnabled',
  INTEGRATION_TEAMS = 'integrationTeams',
  INTEGRATION_CONVERSATIONS = 'integrationConversations',
  INTEGRATION_METADATA = 'integrationMetadata',
  INTEGRATION_TOKEN = 'integrationCsrfToken',
}

enum AnalyticsAction {
  FAILED = 'failed',
  SUCCEEDED = 'succeeded',
}

export const triggerAnalyticsForSlackEnabledSucceeded = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INTEGRATION_SUCCEEDED,
    action: AnalyticsAction.SUCCEEDED,
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForSlackEnabledFailed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  { status, errorMessage }: OperationalError,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INTEGRATION_SUCCEEDED,
    action: AnalyticsAction.FAILED,
    attributes: {
      status,
      errorMessage,
    },
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForFetchTeamsSucceeded = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  { teams, pages }: { teams: number; pages: number },
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INTEGRATION_TEAMS,
    action: AnalyticsAction.SUCCEEDED,
    attributes: { teams, pages },
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForFetchTeamsFailed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  { page, status, errorMessage }: OperationalError & { page: number },
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INTEGRATION_TEAMS,
    action: AnalyticsAction.FAILED,
    attributes: { page, status, errorMessage },
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForFetchUsersSucceeded = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  {
    slackTeamId,
    conversationTypes,
    conversations,
    pages,
  }: {
    slackTeamId: string;
    conversationTypes: ['public', 'private'] | ['directMessage'];
    conversations: number;
    pages: number;
  },
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INTEGRATION_CONVERSATIONS,
    action: AnalyticsAction.SUCCEEDED,
    attributes: {
      integrationTeamId: slackTeamId,
      conversationTypes,
      conversations,
      pages,
    },
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForFetchUsersFailed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  {
    slackTeamId,
    conversationTypes,
    page,
    status,
    errorMessage,
  }: OperationalError & {
    slackTeamId: string;
    conversationTypes: ['public', 'private'] | ['directMessage'];
    page: number;
  },
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INTEGRATION_CONVERSATIONS,
    action: AnalyticsAction.FAILED,
    attributes: {
      integrationTeamId: slackTeamId,
      conversationTypes,
      page,
      status,
      errorMessage,
    },
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForFetchConnectMetadataSucceeded = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INTEGRATION_METADATA,
    action: AnalyticsAction.SUCCEEDED,
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForFetchConnectMetadataFailed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  params: OperationalError,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INTEGRATION_METADATA,
    action: AnalyticsAction.FAILED,
    attributes: {
      ...params,
    },
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForCsrfSucceeded = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INTEGRATION_METADATA,
    action: AnalyticsAction.SUCCEEDED,
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const triggerAnalyticsForCsrfFailed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INTEGRATION_TOKEN,
    action: AnalyticsAction.FAILED,
  });
  fireEventWithPayload(createAnalyticsEvent);
};

export const getSlackServiceAnalytics = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
): SlackServiceAnalytics => ({
  onGetEnabledSucceeded: () =>
    triggerAnalyticsForSlackEnabledSucceeded(createAnalyticsEvent),
  onGetEnabledFailed: (params) =>
    triggerAnalyticsForSlackEnabledFailed(createAnalyticsEvent, params),
  onFetchTeamsSucceeded: (params) =>
    triggerAnalyticsForFetchTeamsSucceeded(createAnalyticsEvent, params),
  onFetchTeamsFailed: (params) =>
    triggerAnalyticsForFetchTeamsFailed(createAnalyticsEvent, params),
  onFetchUsersSucceeded: ({ teamId, users, pages }) =>
    triggerAnalyticsForFetchUsersSucceeded(createAnalyticsEvent, {
      slackTeamId: teamId || '',
      conversationTypes: ['directMessage'],
      conversations: users || 0,
      pages,
    }),
  onFetchUsersFailed: ({ teamId, page, status, errorMessage }) =>
    triggerAnalyticsForFetchUsersFailed(createAnalyticsEvent, {
      slackTeamId: teamId,
      conversationTypes: ['directMessage'],
      page,
      status,
      errorMessage,
    }),
});

export const getConfluenceSlackServiceAnalytics = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
): ConfluenceSlackServiceAnalytics => ({
  onFetchConnectMetadataSucceeded: () =>
    triggerAnalyticsForFetchConnectMetadataSucceeded(createAnalyticsEvent),
  onFetchConnectMetadataFailed: (params) =>
    triggerAnalyticsForFetchConnectMetadataFailed(createAnalyticsEvent, params),
  onRefreshIntegrationCsrfTokenSucceeded: () =>
    triggerAnalyticsForCsrfSucceeded(createAnalyticsEvent),
  onRefreshIntegrationCsrfTokenFailed: () =>
    triggerAnalyticsForCsrfFailed(createAnalyticsEvent),
});
