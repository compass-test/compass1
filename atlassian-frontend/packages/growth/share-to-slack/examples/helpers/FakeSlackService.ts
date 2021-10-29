import OriginTracer from '@atlassiansox/origin-tracing';

import {
  slackConversationsData,
  slackWorkspacesData,
} from '@atlaskit/util-data-test/slack-data';

import type { SlackService } from '../../src/common/SlackService';
import type {
  GetSlackConsentUrlResult,
  GetSlackConversationsResult,
  GetSlackTeamsResult,
  IsSlackEnabledResult,
  ShareToSlackRequest,
  ShareToSlackResult,
  SlackChannel,
  SlackTeam,
} from '../../src/common/types';

const slackChannels = slackConversationsData.channels.map(
  (channel: SlackChannel, index: number) =>
    index === 0 ? { ...channel, type: 'private' } : channel,
);

/**
 * Fake Slack service used by examples
 */
export default class FakeSlackService implements SlackService {
  private teams: SlackTeam[] = [];
  private defaultTeamId?: string;

  constructor(private readonly isEnabled = true) {}

  /**
   * Add a Slack team for example/testing purposes
   */
  addSlackTeam() {
    if (this.teams.length < slackWorkspacesData.teams.length) {
      this.teams.push(slackWorkspacesData.teams[this.teams.length]);
    }
  }

  start(): void {
    console.log('[SlackService] start');
  }

  stop(): void {
    console.log('[SlackService] stop');
  }

  getConsentUrl(
    location: Pick<Location, 'hostname' | 'pathname'>,
  ): Promise<GetSlackConsentUrlResult> {
    console.log('[SlackService] getConsentUrl', { location });

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('[SlackService] getConsentUrl (resolved)');
        resolve({ ok: true, result: 'fake-consent-url' });
      }, 1000);
    });
  }

  getConsent(url: string, onSuccess: () => void): void {
    console.log('[SlackService] getConsent', { url });

    setTimeout(() => {
      // Add the next Slack team
      this.addSlackTeam();

      console.log('[SlackService] getConsent - onSuccess()');
      onSuccess();
    }, 1000);
  }

  isSlackEnabled(): Promise<IsSlackEnabledResult> {
    console.log('[SlackService] isSlackEnabled (waiting)');

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('[SlackService] isSlackEnabled (completed)', {
          isEnabled: this.isEnabled,
        });
        resolve({
          ok: true,
          result: this.isEnabled,
        });
      }, 1000);
    });
  }

  getTeams(): Promise<GetSlackTeamsResult> {
    console.log('[SlackService] getTeams (waiting)');

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('[SlackService] getTeams (completed)');
        resolve({
          ok: true,
          result: [...this.teams],
        });
      }, 1000);
    });
  }

  getDefaultTeamId(): Promise<string | undefined> {
    return Promise.resolve(this.defaultTeamId);
  }

  setDefaultTeamId(defaultTeamId: string): Promise<void> {
    this.defaultTeamId = defaultTeamId;

    return Promise.resolve();
  }

  getConversations(
    teamId: string,
    signal?: AbortSignal,
  ): Promise<GetSlackConversationsResult> {
    console.log('[SlackService] getConversations (waiting)', { teamId });

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('[SlackService] getConversations (completed)');

        resolve({
          ok: true,
          result: {
            channels: slackChannels,
            directMessages: slackConversationsData.dms,
          },
        });
      }, 1000);
    });
  }

  share(request: ShareToSlackRequest): Promise<ShareToSlackResult> {
    console.log('[SlackService] share (waiting)', request);

    return new Promise<ShareToSlackResult>((resolve) => {
      setTimeout(() => {
        console.log('[SlackService] share (completed)');
        resolve({
          ok: true,
          result: new OriginTracer({ product: 'fake' }),
        });
      }, 1000);
    });
  }
}
