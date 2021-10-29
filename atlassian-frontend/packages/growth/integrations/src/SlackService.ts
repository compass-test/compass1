import type {
  GetSlackTeamsResult,
  GetSlackUsersResult,
  IsSlackEnabledResult,
} from './types';

export interface SlackService {
  /**
   * Abort any ongoing request in slack service.
   */
  abort(): void;

  /**
   * Check if the Slack integration is enabled.
   */
  getConsent(onSuccess: () => void): void;

  /**
   * Check if the Slack integration is enabled.
   */
  isSlackEnabled(): Promise<IsSlackEnabledResult>;

  /**
   * Fetch the list of connected Slack teams.
   */
  getTeams(): Promise<GetSlackTeamsResult>;

  /**
   * Fetch the specified Slack team's conversations, including all public and
   * private groups and private chats.
   */
  getUsers(teamId: string): Promise<GetSlackUsersResult>;
}
