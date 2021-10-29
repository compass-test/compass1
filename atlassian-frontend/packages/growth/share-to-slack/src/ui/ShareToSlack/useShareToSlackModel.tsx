import { useEffect, useState } from 'react';

import type OriginTracer from '@atlassiansox/origin-tracing';
import { useCallbackOne, useMemoOne } from 'use-memo-one';

import {
  useIntegrationCsrfFailedOperationalEvent,
  useIntegrationCsrfSucceededOperationalEvent,
  useIntegrationMetadataFailedOperationalEvent,
  useIntegrationMetadataSucceededOperationalEvent,
  useSharedToSlackEvent,
  useShareToSlackDialogOpenedEvent,
  useShareToSlackFailedOperationalEvent,
  useShareToSlackSucceededOperationalEvent,
  useSlackConsentPrimerOpenedEvent,
  useSlackConversationsFetchFailedOperationalEvent,
  useSlackConversationsFetchSucceededOperationalEvent,
  useSlackDisabledMessageOpenedEvent,
  useSlackEnabledFailedOperationalEvent,
  useSlackEnabledSucceededOperationalEvent,
  useSlackTeamConnectedFromConsentPrimerEvent,
  useSlackTeamConnectedFromShareDialogEvent,
  useSlackTeamsFetchFailedOperationalEvent,
  useSlackTeamsFetchSucceededOperationalEvent,
} from '../../common/analytics';
import ShareToSlackConfig from '../../common/ShareToSlackConfig';
import { SlackServiceAnalytics } from '../../common/slack-service/AbstractSlackService';
import ConfluenceSlackService from '../../common/slack-service/ConfluenceSlackService';
import JiraSlackService from '../../common/slack-service/JiraSlackService';
import { ConfluenceSlackServiceAnalytics } from '../../common/slack-service/types';
import { AtlassianProduct, ShareToSlackState } from '../../common/types';
import useSyncRef from '../../common/useSyncRef';

import {
  getInitialShareToSlackState,
  shareToSlackModel,
} from './shareToSlackModel';
import useFeedback from './useFeedback';

/**
 * Share to Slack hook that wraps <code>shareToSlackModel</code> and provides it with
 * service and handler implementations.
 *
 * @param product                   - the product to share from
 * @param createSlackService        - alternative Slack sharing client (optional)
 */
export default function useShareToSlackModel({
  product,
  createSlackService: optionalCreateSlackService,
}: Omit<ShareToSlackConfig, 'showFlag'>) {
  const fireSlackEnabledSucceededOperationalEvent = useSyncRef(
    useSlackEnabledSucceededOperationalEvent(),
  );
  const fireSlackEnabledFailedOperationalEvent = useSyncRef(
    useSlackEnabledFailedOperationalEvent(),
  );
  const fireIntegrationMetadataSucceededOperationalEvent = useSyncRef(
    useIntegrationMetadataSucceededOperationalEvent(),
  );
  const fireIntegrationMetadataFailedOperationalEvent = useSyncRef(
    useIntegrationMetadataFailedOperationalEvent(),
  );
  const fireIntegrationCsrfSucceededOperationalEvent = useSyncRef(
    useIntegrationCsrfSucceededOperationalEvent(),
  );
  const fireIntegrationCsrfFailedOperationalEvent = useSyncRef(
    useIntegrationCsrfFailedOperationalEvent(),
  );
  const fireSlackTeamsFetchSucceededOperationalEvent = useSyncRef(
    useSlackTeamsFetchSucceededOperationalEvent(),
  );
  const fireSlackTeamsFetchFailedOperationalEvent = useSyncRef(
    useSlackTeamsFetchFailedOperationalEvent(),
  );
  const fireSlackConversationsFetchSucceededOperationalEvent = useSyncRef(
    useSlackConversationsFetchSucceededOperationalEvent(),
  );
  const fireSlackConversationsFetchFailedOperationalEvent = useSyncRef(
    useSlackConversationsFetchFailedOperationalEvent(),
  );
  const fireShareToSlackSucceededOperationalEvent = useSyncRef(
    useShareToSlackSucceededOperationalEvent(),
  );
  const fireShareToSlackFailedOperationalEvent = useSyncRef(
    useShareToSlackFailedOperationalEvent(),
  );

  const slackServiceAnalytics: SlackServiceAnalytics = useMemoOne(
    () => ({
      onGetEnabledSucceeded: () => {
        fireSlackEnabledSucceededOperationalEvent.current();
      },
      onGetEnabledFailed: (params) => {
        fireSlackEnabledFailedOperationalEvent.current(params);
      },
      onFetchTeamsSucceeded: (params) => {
        fireSlackTeamsFetchSucceededOperationalEvent.current(params);
      },
      onFetchTeamsFailed: (params) => {
        fireSlackTeamsFetchFailedOperationalEvent.current(params);
      },
      onFetchChannelsSucceeded: ({ teamId, channels, pages }) => {
        fireSlackConversationsFetchSucceededOperationalEvent.current({
          slackTeamId: teamId,
          conversationTypes: ['public', 'private'],
          conversations: channels,
          pages,
        });
      },
      onFetchChannelsFailed: ({ teamId, page, status, errorMessage }) => {
        fireSlackConversationsFetchFailedOperationalEvent.current({
          slackTeamId: teamId,
          conversationTypes: ['public', 'private'],
          page,
          status,
          errorMessage,
        });
      },
      onFetchUsersSucceeded: ({ teamId, users, pages }) => {
        fireSlackConversationsFetchSucceededOperationalEvent.current({
          slackTeamId: teamId,
          conversationTypes: ['directMessage'],
          conversations: users,
          pages,
        });
      },
      onFetchUsersFailed: ({ teamId, page, status, errorMessage }) => {
        fireSlackConversationsFetchFailedOperationalEvent.current({
          slackTeamId: teamId,
          conversationTypes: ['directMessage'],
          page,
          status,
          errorMessage,
        });
      },
      onShareSucceeded: ({
        product,
        teamId,
        conversationType,
        conversationId,
      }) => {
        fireShareToSlackSucceededOperationalEvent.current({
          product,
          slackTeamId: teamId,
          conversationType,
          conversationId,
        });
      },
      onShareFailed: ({
        product,
        teamId,
        conversationType,
        conversationId,
        status,
        errorMessage,
      }) => {
        fireShareToSlackFailedOperationalEvent.current({
          product,
          slackTeamId: teamId,
          conversationType,
          conversationId,
          status,
          errorMessage,
        });
      },
    }),
    [],
  );

  const confluenceSlackServiceAnalytics: ConfluenceSlackServiceAnalytics = useMemoOne(
    () => ({
      onFetchConnectMetadataSucceeded: () => {
        fireIntegrationMetadataSucceededOperationalEvent.current();
      },
      onFetchConnectMetadataFailed: (params) => {
        fireIntegrationMetadataFailedOperationalEvent.current(params);
      },
      onRefreshIntegrationCsrfTokenSucceeded: () => {
        fireIntegrationCsrfSucceededOperationalEvent.current();
      },
      onRefreshIntegrationCsrfTokenFailed: () => {
        fireIntegrationCsrfFailedOperationalEvent.current();
      },
    }),
    [],
  );

  const defaultCreateSlackService = useCallbackOne(
    (product: AtlassianProduct) => {
      switch (product) {
        case 'jira':
          return new JiraSlackService(slackServiceAnalytics);
        case 'confluence':
          return new ConfluenceSlackService(
            slackServiceAnalytics,
            confluenceSlackServiceAnalytics,
          );
      }
    },
    [slackServiceAnalytics, confluenceSlackServiceAnalytics],
  );

  const createSlackService =
    optionalCreateSlackService ?? defaultCreateSlackService;

  const createSlackServiceRef = useSyncRef(createSlackService);

  const [state, setState] = useState<ShareToSlackState>(
    getInitialShareToSlackState,
  );

  // Make state accessible to callbacks without changing their identity.
  const stateRef = useSyncRef(state);

  const location = typeof window === 'undefined' ? undefined : window.location;
  const showFeedback = useSyncRef(useFeedback());

  // Analytics
  const fireSlackTeamConnectedFromConsentPrimerEvent = useSyncRef(
    useSlackTeamConnectedFromConsentPrimerEvent(),
  );
  const fireSlackTeamConnectedFromShareDialogEvent = useSyncRef(
    useSlackTeamConnectedFromShareDialogEvent(),
  );
  const fireSharedToSlackEvent = useSyncRef(useSharedToSlackEvent());
  const fireConsentPrimerOpenedEvent = useSyncRef(
    useSlackConsentPrimerOpenedEvent(),
  );
  const fireSlackDisabledMessageOpenedEvent = useSyncRef(
    useSlackDisabledMessageOpenedEvent(),
  );
  const fireShareToSlackDialogOpenedEvent = useSyncRef(
    useShareToSlackDialogOpenedEvent(),
  );

  // Slack teams can be connected from more than one context, so select the appropriate track event.
  const onSlackTeamConnected = useCallbackOne((slackTeamId: string) => {
    if (stateRef.current.page === 'consentPrimer') {
      fireSlackTeamConnectedFromConsentPrimerEvent.current(slackTeamId);
    } else if (stateRef.current.page === 'share') {
      fireSlackTeamConnectedFromShareDialogEvent.current(slackTeamId);
    }
  }, []);

  const onShared = useCallbackOne(
    (origin: OriginTracer) => {
      if (
        !stateRef.current.selectedTeam ||
        !stateRef.current.selectedConversation ||
        !location
      ) {
        // Shouldn’t happen
        return;
      }

      const slackTeamId = stateRef.current.selectedTeam.id;
      const conversationId = stateRef.current.selectedConversation.id;

      fireSharedToSlackEvent.current({
        product,
        slackTeamId,
        conversationType: stateRef.current.selectedConversation.type,
        conversationId,
        origin,
      });
    },
    [location, product],
  );

  useEffect(() => {
    switch (state.page) {
      case 'consentPrimer':
        fireConsentPrimerOpenedEvent.current();
        break;
      case 'slackDisabled':
        fireSlackDisabledMessageOpenedEvent.current();
        break;
      case 'share':
        fireShareToSlackDialogOpenedEvent.current();
        break;
    }
  }, [state.page]); // eslint-disable-line react-hooks/exhaustive-deps

  // Maintenance note: Keep subscribe and actions stable to avoid peppering the
  // Slack API with redundant requests.
  const { subscribe, ...actions } = useMemoOne(
    () =>
      shareToSlackModel({
        slackService: createSlackServiceRef.current(product),
        location,
        showFeedback: showFeedback.current,
        onSlackTeamConnected,
        onShared,
      }),
    [product, location, onSlackTeamConnected, onShared],
  );

  // Sync sharing model to state
  useEffect(() => subscribe((state) => setState(state)), [subscribe]);

  return { ...state, ...actions };
}
