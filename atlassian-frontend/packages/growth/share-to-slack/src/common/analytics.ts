import { useCallback } from 'react';

import type OriginTracer from '@atlassiansox/origin-tracing';

import {
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';

const name = process.env._PACKAGE_NAME_;
const version = process.env._PACKAGE_VERSION_;

import type { AtlassianProduct, SlackChannel, SlackUser } from './types';
import useAnalyticsChannel from './useAnalyticsChannel';

type EventType =
  | typeof OPERATIONAL_EVENT_TYPE
  | typeof SCREEN_EVENT_TYPE
  | typeof TRACK_EVENT_TYPE
  | typeof UI_EVENT_TYPE;

type AnalyticsEventType = 'SCREEN' | 'TRACK' | 'UI' | 'OPERATIONAL';

type EventCommand =
  | 'sendScreenEvent'
  | 'sendTrackEvent'
  | 'sendUIEvent'
  | 'sendOperationalEvent';

type UiEventActionType = 'clicked' | 'changed';

type TrackEventActionType = 'connected' | 'shared';

type OperationalEventActionType = 'succeeded' | 'failed';

type UiEventActionSubjectType =
  | 'button'
  | 'selectField'
  | 'option'
  | 'textField';

type TrackEventActionSubjectType = 'integrationTeam' | 'issue' | 'page';

type OperationalEventSubjectType =
  | 'integrationEnabled'
  | 'integrationMetadata'
  | 'integrationCsrfToken'
  | 'integrationTeams'
  | 'integrationConversations'
  | 'share';

type ActionSubjectId =
  | 'addIntegrationTeam'
  | 'closeDialog'
  | 'copyLink'
  | 'shareToIntegration'
  | 'selectIntegrationTeam'
  | 'selectIntegrationConversation'
  | 'integrationComment';

export type CloseModalMethod = 'button' | 'escape' | 'clickOutside';

type ScreenName =
  | 'consentDialog'
  | 'integrationDisabledDialog'
  | 'shareToIntegrationDialog';

type Source =
  | 'integrationLoadingDialog'
  | 'integrationDisabledDialog'
  | 'integrationConsentPrimer'
  | 'integrationShareDialog';

type AnalyticsScreenEvent = {
  eventType: typeof SCREEN_EVENT_TYPE;
  name: ScreenName;
  attributes?: Record<string, unknown>;
};

type AnalyticsUiEvent = {
  eventType: typeof UI_EVENT_TYPE;
  action: UiEventActionType;
  actionSubject: UiEventActionSubjectType;
  actionSubjectId?: ActionSubjectId;
  attributes?: Record<string, unknown>;
  source: Source;
  tags?: string[];
};

type AnalyticsTrackEvent = {
  eventType: typeof TRACK_EVENT_TYPE;
  action: TrackEventActionType;
  actionSubject: TrackEventActionSubjectType;
  actionSubjectId?: string;
  attributes?: Record<string, unknown>;
  source: Source;
  tags?: string[];
};

type AnalyticsOperationalEvent = {
  eventType: typeof OPERATIONAL_EVENT_TYPE;
  action: OperationalEventActionType;
  actionSubject: OperationalEventSubjectType;
  actionSubjectId?: string;
  attributes?: Record<string, unknown>;
  source: Source;
  tags?: string[];
};

type AnalyticsEvent =
  | AnalyticsScreenEvent
  | AnalyticsUiEvent
  | AnalyticsTrackEvent
  | AnalyticsOperationalEvent;

type OperationalError = {
  status: number;
  errorMessage?: string;
};

type PagedOperationalError = OperationalError & {
  page: number;
};

const eventTypeAnalyticsType: { [key in EventType]: AnalyticsEventType } = {
  [SCREEN_EVENT_TYPE]: 'SCREEN',
  [TRACK_EVENT_TYPE]: 'TRACK',
  [UI_EVENT_TYPE]: 'UI',
  [OPERATIONAL_EVENT_TYPE]: 'OPERATIONAL',
};

const eventTypeCommand: { [key in EventType]: EventCommand } = {
  [SCREEN_EVENT_TYPE]: 'sendScreenEvent',
  [TRACK_EVENT_TYPE]: 'sendTrackEvent',
  [UI_EVENT_TYPE]: 'sendUIEvent',
  [OPERATIONAL_EVENT_TYPE]: 'sendOperationalEvent',
};

const baseAttributes = {
  integrationType: 'slack',
};

const packageAttributes = {
  packageName: name,
  packageVersion: version,
  componentName: 'ShareToSlack',
};

function useEvents(
  eventType: EventType,
): (event: Omit<AnalyticsEvent, 'eventType'>) => void {
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const { channel } = useAnalyticsChannel();

  return useCallback(
    (analyticsEvent: Omit<AnalyticsEvent, 'eventType'>) => {
      const analyticsType = eventTypeAnalyticsType[eventType];
      const type = eventTypeCommand[eventType];

      // Decorate attributes based on event type to avoid repetition.
      const attributes =
        eventType === SCREEN_EVENT_TYPE
          ? { ...baseAttributes, ...analyticsEvent.attributes }
          : {
              ...baseAttributes,
              ...packageAttributes,
              ...analyticsEvent.attributes,
            };

      const data = {
        ...analyticsEvent,
        eventType,
        analyticsType,
        type,
        attributes,
      };

      createAnalyticsEvent({ data, ...data }).fire(channel);
    },
    [channel, createAnalyticsEvent, eventType],
  );
}

function createEventHook(
  eventType: EventType,
  event: Omit<AnalyticsEvent, 'eventType'>,
) {
  return () => {
    const fireEvent = useEvents(eventType);

    return useCallback(() => fireEvent(event), [fireEvent]);
  };
}

function createDynamicEventHook<ARGS extends unknown[]>(
  eventType: EventType,
  createEvent: (...args: ARGS) => Omit<AnalyticsEvent, 'eventType'>,
) {
  return () => {
    const fireEvent = useEvents(eventType);

    return useCallback((...args: ARGS) => fireEvent(createEvent(...args)), [
      fireEvent,
    ]);
  };
}

function screenEventHook(event: Omit<AnalyticsScreenEvent, 'eventType'>) {
  return createEventHook(SCREEN_EVENT_TYPE, event);
}

function uiEventHook(event: Omit<AnalyticsUiEvent, 'eventType'>) {
  return createEventHook(UI_EVENT_TYPE, event);
}

function dynamicUiEventHook<ARGS extends unknown[]>(
  createEvent: (...args: ARGS) => Omit<AnalyticsUiEvent, 'eventType'>,
) {
  return createDynamicEventHook(UI_EVENT_TYPE, createEvent);
}

function dynamicTrackEventHook<ARGS extends unknown[]>(
  createEvent: (...args: ARGS) => Omit<AnalyticsTrackEvent, 'eventType'>,
) {
  return createDynamicEventHook(TRACK_EVENT_TYPE, createEvent);
}

function operationalEventHook(
  event: Omit<AnalyticsOperationalEvent, 'eventType'>,
) {
  return createEventHook(OPERATIONAL_EVENT_TYPE, event);
}

function dynamicOperationalEventHook<ARGS extends unknown[]>(
  createEvent: (...args: ARGS) => Omit<AnalyticsOperationalEvent, 'eventType'>,
) {
  return createDynamicEventHook(OPERATIONAL_EVENT_TYPE, createEvent);
}

//#region Check if integration is enabled

// 1a. Check if Slack integration is enabled succeeded.
export const useSlackEnabledSucceededOperationalEvent = operationalEventHook({
  action: 'succeeded',
  actionSubject: 'integrationEnabled',
  source: 'integrationLoadingDialog',
});

// 1b. Check if Slack integration is enabled failed.
export const useSlackEnabledFailedOperationalEvent = dynamicOperationalEventHook(
  ({ status, errorMessage }: OperationalError) => ({
    action: 'failed',
    actionSubject: 'integrationEnabled',
    attributes: { status, errorMessage },
    source: 'integrationLoadingDialog',
  }),
);

//#region Scenario #1: Slack integration disabled

// 1. Slack disabled message shown
export const useSlackDisabledMessageOpenedEvent = screenEventHook({
  name: 'integrationDisabledDialog',
});

// 2. Slack disabled message dismissed
export const useSlackDisabledDialogCloseButtonClickedEvent = uiEventHook({
  action: 'clicked',
  actionSubject: 'button',
  actionSubjectId: 'closeDialog',
  attributes: {
    dialog: 'integrationDisabled',
  },
  source: 'integrationDisabledDialog',
});

//#region Scenario #2: Slack integration enabled

// 1a. Fetch /dialog metadata (JWT and Slack integration iframe URL) from Confluence Slack integration succeeded.
export const useIntegrationMetadataSucceededOperationalEvent = operationalEventHook(
  {
    action: 'succeeded',
    actionSubject: 'integrationMetadata',
    source: 'integrationLoadingDialog',
  },
);

// 1b. Fetch /dialog metadata (JWT and Slack integration iframe URL) from Confluence Slack integration failed.
export const useIntegrationMetadataFailedOperationalEvent = dynamicOperationalEventHook(
  ({ status, errorMessage }: OperationalError) => ({
    action: 'failed',
    actionSubject: 'integrationMetadata',
    attributes: { status, errorMessage },
    source: 'integrationLoadingDialog',
  }),
);

// 2a. Confluence Slack integration CSRF token obtained successfully.
export const useIntegrationCsrfSucceededOperationalEvent = operationalEventHook(
  {
    action: 'succeeded',
    actionSubject: 'integrationCsrfToken',
    source: 'integrationLoadingDialog',
  },
);

// 2b. Timed out while acquiring a CSRF token from the Confluence Slack integration.
export const useIntegrationCsrfFailedOperationalEvent = operationalEventHook({
  action: 'failed',
  actionSubject: 'integrationCsrfToken',
  source: 'integrationLoadingDialog',
});

// 3. User viewed the Slack consent primer
export const useSlackConsentPrimerOpenedEvent = screenEventHook({
  name: 'consentDialog',
});

// 4a. User clicked the cancel button in the Slack consent primer.
export const useSlackConsentPrimerCloseButtonClickedEvent = uiEventHook({
  action: 'clicked',
  actionSubject: 'button',
  actionSubjectId: 'closeDialog',
  source: 'integrationConsentPrimer',
});

// 4b. User clicked the OK button in the Slack consent primer.
export const useSlackConsentPrimerAddSlackTeamClickedEvent = uiEventHook({
  action: 'clicked',
  actionSubject: 'button',
  actionSubjectId: 'addIntegrationTeam',
  source: 'integrationConsentPrimer',
});

// 5. User connected a Slack team.
export const useSlackTeamConnectedFromConsentPrimerEvent = dynamicTrackEventHook(
  (slackTeamId: string) => ({
    action: 'connected',
    actionSubject: 'integrationTeam',
    actionSubjectId: slackTeamId,
    source: 'integrationConsentPrimer',
  }),
);

// 6a. Teams fetched successfully.
export const useSlackTeamsFetchSucceededOperationalEvent = dynamicOperationalEventHook(
  ({ teams, pages }: { teams: number; pages: number }) => ({
    action: 'succeeded',
    actionSubject: 'integrationTeams',
    attributes: { teams, pages },
    source: 'integrationLoadingDialog',
  }),
);

// 6b. Failed to fetch teams.
export const useSlackTeamsFetchFailedOperationalEvent = dynamicOperationalEventHook(
  ({ page, status, errorMessage }: PagedOperationalError) => ({
    action: 'succeeded',
    actionSubject: 'integrationTeams',
    attributes: { page, status, errorMessage },
    source: 'integrationLoadingDialog',
  }),
);

// 7a. Channels fetched successfully.
// 8a. Users fetched successfully.
// 15a. Channels fetched successfully.
// 16a. Users fetched successfully.
export const useSlackConversationsFetchSucceededOperationalEvent = dynamicOperationalEventHook(
  ({
    slackTeamId,
    conversationTypes,
    conversations,
    pages,
  }: {
    slackTeamId: string;
    conversationTypes: ['public', 'private'] | ['directMessage'];
    conversations: number;
    pages: number;
  }) => ({
    action: 'succeeded',
    actionSubject: 'integrationConversations',
    attributes: {
      integrationTeamId: slackTeamId,
      conversationTypes,
      conversations,
      pages,
    },
    source: 'integrationShareDialog',
  }),
);

// 7b. Failed to fetch channels.
// 8b. Failed to fetch users.
// 15b. Failed to fetch channels.
// 16b. Failed to fetch users.
export const useSlackConversationsFetchFailedOperationalEvent = dynamicOperationalEventHook(
  ({
    slackTeamId,
    conversationTypes,
    page,
    status,
    errorMessage,
  }: PagedOperationalError & {
    slackTeamId: string;
    conversationTypes: ['public', 'private'] | ['directMessage'];
  }) => ({
    action: 'failed',
    actionSubject: 'integrationConversations',
    attributes: {
      integrationTeamId: slackTeamId,
      conversationTypes,
      page,
      status,
      errorMessage,
    },
    source: 'integrationShareDialog',
  }),
);

// 9. User viewed the Share to Slack dialog.
export const useShareToSlackDialogOpenedEvent = screenEventHook({
  name: 'shareToIntegrationDialog',
});

// 10. User clicked the Copy Link button in the Share dialog.
export const useCopyLinkButtonClickedEvent = uiEventHook({
  action: 'clicked',
  actionSubject: 'button',
  actionSubjectId: 'copyLink',
  source: 'integrationShareDialog',
});

// 11. User clicked the Team select field in the Share dialog.
export const useSlackTeamSelectClickedEvent = uiEventHook({
  action: 'clicked',
  actionSubject: 'selectField',
  actionSubjectId: 'selectIntegrationTeam',
  source: 'integrationShareDialog',
});

// 12. User clicked the Add New Team button in the Share dialog.
export const useAddNewTeamOptionClickedEvent = uiEventHook({
  action: 'clicked',
  actionSubject: 'option',
  actionSubjectId: 'addIntegrationTeam',
  source: 'integrationShareDialog',
});

// 13. User connected a Slack team.
export const useSlackTeamConnectedFromShareDialogEvent = dynamicTrackEventHook(
  (slackTeamId: string) => ({
    action: 'connected',
    actionSubject: 'integrationTeam',
    actionSubjectId: slackTeamId,
    source: 'integrationShareDialog',
  }),
);

// 14. User selected a team in the Teams field in the Share dialog.
export const useSlackTeamSelectedEvent = uiEventHook({
  action: 'changed',
  actionSubject: 'selectField',
  actionSubjectId: 'selectIntegrationTeam',
  source: 'integrationShareDialog',
});

// 15a - 16b already implemented above

// 17. User clicked the Conversation field in the Share dialog.
export const useSlackConversationSelectClickedEvent = uiEventHook({
  action: 'clicked',
  actionSubject: 'selectField',
  actionSubjectId: 'selectIntegrationConversation',
  source: 'integrationShareDialog',
});

// 18. User selected a conversation within the Conversation select in the Share dialog.
export const useSlackConversationSelectedEvent = dynamicUiEventHook(
  (conversationType: SlackChannel['type'] | SlackUser['type']) => ({
    action: 'changed',
    actionSubject: 'selectField',
    actionSubjectId: 'selectIntegrationConversation',
    attributes: {
      conversationType,
    },
    source: 'integrationShareDialog',
  }),
);

// 19. User clicked the Comment editor.
export const useSlackMessageClickedEvent = uiEventHook({
  action: 'clicked',
  actionSubject: 'textField',
  actionSubjectId: 'integrationComment',
  source: 'integrationShareDialog',
});

// 20. User clicked the Share button in the Share dialog.
export const useShareButtonClickedEvent = uiEventHook({
  action: 'clicked',
  actionSubject: 'button',
  actionSubjectId: 'shareToIntegration',
  source: 'integrationShareDialog',
});

// 21a. Shared successfully.
type ShareToSlackOperationalEventType = {
  product: AtlassianProduct;
  slackTeamId: string;
  conversationType: SlackChannel['type'] | SlackUser['type'];
  conversationId: string;
};

const productActionSubjectId: {
  [key in AtlassianProduct]: TrackEventActionSubjectType;
} = {
  jira: 'issue',
  confluence: 'page',
};

export const useShareToSlackSucceededOperationalEvent = dynamicOperationalEventHook(
  ({
    product,
    slackTeamId,
    conversationType,
    conversationId,
  }: ShareToSlackOperationalEventType) => ({
    action: 'succeeded',
    actionSubject: 'share',
    actionSubjectId: productActionSubjectId[product],
    attributes: {
      integrationTeamId: slackTeamId,
      integrationConversationType: conversationType,
      integrationConversationId: conversationId,
    },
    source: 'integrationShareDialog',
  }),
);

// 21b. Sharing failed.
type ShareToSlackFailedOperationalEventType = ShareToSlackOperationalEventType &
  OperationalError;

export const useShareToSlackFailedOperationalEvent = dynamicOperationalEventHook(
  ({
    product,
    slackTeamId,
    conversationType,
    conversationId,
    status,
    errorMessage,
  }: ShareToSlackFailedOperationalEventType) => ({
    action: 'failed',
    actionSubject: 'share',
    actionSubjectId: productActionSubjectId[product],
    attributes: {
      integrationTeamId: slackTeamId,
      integrationConversationType: conversationType,
      integrationConversationId: conversationId,
      status,
      errorMessage,
    },
    source: 'integrationShareDialog',
  }),
);

// 22. User shared a Jira issue or Confluence page to a Slack user
type ShareToSlackEventType = {
  product: AtlassianProduct;
  slackTeamId: string;
  origin: OriginTracer;
  conversationType: SlackChannel['type'] | SlackUser['type'];
  conversationId: string;
};

const productActionSubject: {
  [key in AtlassianProduct]: TrackEventActionSubjectType;
} = {
  jira: 'issue',
  confluence: 'page',
};

export const useSharedToSlackEvent = dynamicTrackEventHook(
  ({
    product,
    slackTeamId,
    conversationType,
    conversationId,
    origin,
  }: ShareToSlackEventType) => ({
    action: 'shared',
    actionSubject: productActionSubject[product],
    attributes: {
      integrationTeamId: slackTeamId,
      integrationConversationType: conversationType,
      integrationConversationId: conversationId,
      ...origin.toAnalyticsAttributes({
        hasGeneratedId: true,
      }),
    },
    source: 'integrationShareDialog',
  }),
);
