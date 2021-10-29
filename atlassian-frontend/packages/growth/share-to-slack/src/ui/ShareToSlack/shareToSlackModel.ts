import type OriginTracer from '@atlassiansox/origin-tracing';
import noop from 'lodash/noop';

import { SlackService } from '../../common/SlackService';
import {
  Feedback,
  Page,
  ShareToSlackActions,
  ShareToSlackState,
  SlackConversation,
  SlackTeam,
} from '../../common/types';

export type EventHandler = () => void;

export type ValueEventHandler<V> = (value: V) => void;

export type Unsubscribe = () => void;

export type Share = {
  link: string;
  message: string;
};

type Services = {
  slackService: SlackService;
  location?: Pick<Location, 'hostname' | 'pathname'>;
  showFeedback: (feedback: Feedback) => void;
};

type Analytics = {
  onSlackTeamConnected: (slackTeamId: string) => void;
  onShared: (origin: OriginTracer) => void;
};

export type ShareToSlackModel = ShareToSlackActions & {
  subscribe: (onState: ValueEventHandler<ShareToSlackState>) => Unsubscribe;
  abort: () => void;
};

/**
 * Share to Slack state machine.
 *
 * Note: This model won’t provide the initial state to the subscriber. The
 * subscriber should call <code>getInitialShareToSlackState()</code> to get the
 * initial state.
 *
 * @param slackService         - Slack sharing API
 * @param location             - the location of the page to share (required client-side)
 * @param showFeedback         - show a feedback message
 * @param onSlackTeamConnected - analytics callback - Slack team connected
 * @param onShared             - analytics callback - shared successfully
 */
export function shareToSlackModel({
  slackService,
  location,
  showFeedback,
  onSlackTeamConnected,
  onShared,
}: Services & Analytics): ShareToSlackModel {
  let consentUrl: string | undefined;
  let isSubscribed = false;
  let updateState: ((state: ShareToSlackState) => void) | undefined;
  let state = getInitialShareToSlackState();

  const abortController = new AbortController();
  const signal = abortController.signal;

  function abort() {
    abortController.abort();
  }

  function setState(partialState: Partial<ShareToSlackState>) {
    state = { ...state, ...partialState };
    updateState?.(state);
  }

  /**
   * Subscribe to this state machine, which also starts it.
   *
   * Only one subscription is allowed.
   */
  function subscribe(onState: (state: ShareToSlackState) => void) {
    if (isSubscribed) {
      return noop;
    }

    isSubscribed = true;
    updateState = onState;
    slackService.start();
    start().then(noop);

    return () => {
      slackService.stop();
      updateState = undefined;
      isSubscribed = false;
    };
  }

  /**
   * User clicks "Share to Slack" button, starting the workflow
   */
  async function start() {
    const [isSlackEnabledResult, consentUrlResult] = await Promise.all([
      // Check that the integration is enabled.
      slackService.isSlackEnabled(signal),

      // Eagerly acquire the consent URL to avoid a delay which would prevent
      // the Slack consent popup window opening.
      slackService.getConsentUrl(location!, signal),
    ]);

    if (!isSlackEnabledResult.ok || !consentUrlResult.ok) {
      setState({ page: 'none' });

      if (
        (!isSlackEnabledResult.ok && !isSlackEnabledResult.aborted) ||
        (!consentUrlResult.ok && !consentUrlResult.aborted)
      ) {
        showFeedback('initError');
      }

      return;
    }

    consentUrl = consentUrlResult.result;

    if (isSlackEnabledResult.result) {
      let teams: SlackTeam[] | undefined;
      const teamsResult = await slackService.getTeams(signal);

      if (teamsResult.ok) {
        teams = teamsResult.result;
      } else {
        // Bail out of the request was aborted
        if (teamsResult.aborted) {
          setState({ page: 'none' });

          return;
        }

        // Rather than bailing out, proceed to the consent primer and buy some time.
        teams = [];
      }

      if (teams?.length) {
        // Select the default or first team
        const defaultTeamId = await slackService.getDefaultTeamId();

        const selectedTeam = defaultTeamId
          ? teams!.find(({ id }) => id === defaultTeamId) ?? teams![0]
          : teams![0];

        // Load conversations
        const conversationsResult = await slackService.getConversations(
          selectedTeam.id,
          signal,
        );

        if (!conversationsResult.ok) {
          setState({ page: 'none' });

          if (!conversationsResult.aborted) {
            showFeedback('initError');
          }

          return;
        }

        const conversations = conversationsResult.result;

        // Select the first conversation
        const selectedConversation =
          conversations.channels[0] ?? conversations.directMessages[0];

        setState({
          page: 'share',
          isLoadingTeams: false,
          teams,
          selectedTeam,
          isLoadingConversations: false,
          conversations,
          selectedConversation,
        });
      } else {
        setState({ page: 'consentPrimer' });
      }
    } else {
      setState({ page: 'slackDisabled' });
    }
  }

  async function onSlackConsentSuccess() {
    const oldTeams = state.teams;
    const oldSelectedTeam = state.selectedTeam;

    // Show the loading page except when the share page is already open.
    const page: Page = state.page === 'share' ? 'share' : 'loading';

    setState({
      page,
      isLoadingTeams: true,
    });

    const teamsResult = await slackService.getTeams(signal);

    if (!teamsResult.ok) {
      if (!teamsResult.aborted) {
        // Stay on the share screen and show an error message
        showFeedback('errorLoadingTeams');
      }

      return;
    }

    const teams = teamsResult.result;

    // Shouldn't happen
    if (teams.length === 0) {
      setState({ page: 'none' });
      showFeedback('errorLoadingTeams');

      return;
    }

    const previousSelectedTeam = oldSelectedTeam
      ? teams.find(({ id }) => id === oldSelectedTeam!.id)
      : undefined;

    let selectedTeam: SlackTeam | undefined;

    // If some teams were already loaded, find and select the new team.
    if (oldTeams) {
      const oldTeamIds = new Set(oldTeams.map(({ id }) => id));

      selectedTeam = teams.find(({ id }) => !oldTeamIds.has(id));
    }

    if (selectedTeam) {
      onSlackTeamConnected(selectedTeam.id);
    } else {
      // Fall back to the default, previously selected, or first team.
      const defaultTeamId = await slackService.getDefaultTeamId();

      selectedTeam = defaultTeamId
        ? teams.find(({ id }) => id === defaultTeamId) ??
          previousSelectedTeam ??
          teams[0]
        : teams[0];
    }

    // Load conversations
    const conversationsResult = await slackService.getConversations(
      selectedTeam.id,
      signal,
    );

    if (!conversationsResult.ok) {
      if (!conversationsResult.aborted) {
        showFeedback('errorLoadingConversations');
      }

      return;
    }

    const conversations = conversationsResult.result;

    // Select the first conversation
    const selectedConversation =
      conversations.channels[0] ?? conversations.directMessages[0];

    setState({
      page: 'share',
      isLoadingTeams: false,
      teams,
      selectedTeam,
      isLoadingConversations: false,
      conversations,
      selectedConversation,
    });
  }

  /**
   * User clicks "Add new workspace" in the share form
   */
  function onAddTeam() {
    if (!isSubscribed) {
      return;
    }

    slackService.getConsent(consentUrl!, onSlackConsentSuccess);
  }

  /**
   * User selects a team
   *
   * @param team - the selected team
   */
  async function onChangeSelectedTeam(team: SlackTeam) {
    if (!isSubscribed) {
      return;
    }

    const existingTeam = state.teams?.find(({ id }) => id === team.id);

    if (existingTeam) {
      const selectedTeam = existingTeam;

      // Save the selected team
      await slackService.setDefaultTeamId(selectedTeam.id);

      setState({
        selectedTeam,
        isLoadingConversations: true,
        selectedConversation: undefined,
      });

      // Load conversations
      const conversationsResult = await slackService.getConversations(
        selectedTeam.id,
        signal,
      );

      if (!conversationsResult.ok) {
        if (!conversationsResult.aborted) {
          showFeedback('errorLoadingConversations');
        }

        return;
      }

      const conversations = conversationsResult.result;

      // Select the first conversation
      const selectedConversation =
        conversations.channels[0] ?? conversations.directMessages[0];

      setState({
        isLoadingConversations: false,
        conversations,
        selectedConversation,
      });
    }
  }

  function onChangeSelectedConversation(conversation: SlackConversation) {
    if (!isSubscribed) {
      return;
    }

    const { conversations } = state;
    const existingConversation =
      conversation.type === 'directMessage'
        ? conversations?.directMessages.find(({ id }) => id === conversation.id)
        : conversations?.channels.find(({ id }) => id === conversation.id);

    if (existingConversation) {
      setState({ selectedConversation: existingConversation });
    }
  }

  /**
   * User submits share form
   *
   * @param link - the link to share
   * @param message - an accompanying message (optional)
   * @returns a new OriginTracer if the link has been shared successfully
   */
  async function shareToSlack({
    link,
    message,
  }: Share): Promise<OriginTracer | undefined> {
    if (!isSubscribed) {
      return;
    }

    setState({ isSharing: true });

    const shareToSlackResult = await slackService.share({
      teamId: state.selectedTeam!.id,
      conversationId: state.selectedConversation!.id,
      conversationType: state.selectedConversation!.type,
      link,
      message,
      signal,
    });

    if (!shareToSlackResult.ok) {
      if (!shareToSlackResult.aborted) {
        setState({ isSharing: false });
        showFeedback('shareError');
      }

      return;
    }

    setState({ page: 'none', isSharing: false });
    showFeedback('shareSuccess');

    return shareToSlackResult.result;
  }

  function share(params: Share) {
    shareToSlack(params).then((origin) => {
      if (origin) {
        onShared(origin);
      }
    });
  }

  return {
    subscribe,
    abort,
    onAddTeam,
    onChangeSelectedTeam,
    onChangeSelectedConversation,
    share,
  };
}

export function getInitialShareToSlackState(): ShareToSlackState {
  return {
    page: 'loading',
    isLoadingTeams: true,
    teams: undefined,
    selectedTeam: undefined,
    isLoadingConversations: true,
    conversations: undefined,
    selectedConversation: undefined,
    isSharing: false,
  };
}
