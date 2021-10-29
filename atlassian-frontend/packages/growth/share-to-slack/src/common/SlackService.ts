import type {
  GetSlackConsentUrlResult,
  GetSlackConversationsResult,
  GetSlackTeamsResult,
  IsSlackEnabledResult,
  ShareToSlackRequest,
  ShareToSlackResult,
} from './types';

export interface SlackService {
  start(): void;

  stop(): void;

  getConsentUrl(
    location: Pick<Location, 'hostname' | 'pathname'>,
    signal?: AbortSignal,
  ): Promise<GetSlackConsentUrlResult>;

  getConsent(url: string, onSuccess: () => void): void;

  /**
   * Check if the Slack integration is enabled.
   */
  isSlackEnabled(signal?: AbortSignal): Promise<IsSlackEnabledResult>;

  /**
   * Fetch the list of connected Slack teams.
   */
  getTeams(signal?: AbortSignal): Promise<GetSlackTeamsResult>;

  /**
   * Get the default Slack team.
   */
  getDefaultTeamId(): Promise<string | undefined>;

  /**
   * Set the default Slack team.
   */
  setDefaultTeamId(defaultTeamId: string): Promise<void>;

  /**
   * Fetch the specified Slack team's conversations, including all public and
   * private groups and private chats.
   */
  getConversations(
    teamId: string,
    signal?: AbortSignal,
  ): Promise<GetSlackConversationsResult>;

  /**
   * Share a link with a Slack conversation.
   */
  share({
    teamId,
    conversationId,
    conversationType,
    link,
    message,
    signal,
  }: ShareToSlackRequest & { signal?: AbortSignal }): Promise<
    ShareToSlackResult
  >;
}
