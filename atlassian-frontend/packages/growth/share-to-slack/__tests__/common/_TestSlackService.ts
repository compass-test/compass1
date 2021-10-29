import OriginTracer from '@atlassiansox/origin-tracing';

import type { SlackService } from '../../src/common/SlackService';
import type {
  FailureResult,
  GetSlackConsentUrlResult,
  GetSlackConversationsResult,
  GetSlackTeamsResult,
  IsSlackEnabledResult,
  ShareToSlackRequest,
  ShareToSlackResult,
  SlackConsentParams,
  SlackTeam,
  SuccessResult,
} from '../../src/common/types';

import { conversations } from './_slack-test-data';

export default class TestSlackService implements SlackService {
  private readonly teams: SlackTeam[] = [];
  private isEnabled = true;
  private defaultTeamId?: string;
  private onSuccess?: SlackConsentParams['onSuccess'];
  private _errorCheckingEnabledStatus = false;
  private _errorObtainingConsentUrl = false;
  private _errorOnLoadingTeams = false;
  private _errorOnLoadingConversations = false;
  private _errorOnShare = false;

  reset() {
    this.teams.length = 0;
    this.isEnabled = true;
    this.defaultTeamId = undefined;
    this.onSuccess = undefined;
    this.errorOnLoadingTeams = false;
    this.errorOnLoadingConversations = false;
    this.errorOnShare = false;
  }

  addSlackTeams(...teams: SlackTeam[]) {
    this.teams.push.apply(this.teams, teams);
  }

  fireConsentSuccess(team: SlackTeam) {
    this.addSlackTeams(team);
    this.onSuccess?.();
    this.onSuccess = undefined;
  }

  enable() {
    this.isEnabled = true;
  }

  disable() {
    this.isEnabled = false;
  }

  set errorCheckingEnabledStatus(value: boolean) {
    this._errorCheckingEnabledStatus = value;
  }

  set errorObtainingConsentUrl(value: boolean) {
    this._errorObtainingConsentUrl = value;
  }

  set errorOnLoadingTeams(value: boolean) {
    this._errorOnLoadingTeams = value;
  }

  set errorOnLoadingConversations(value: boolean) {
    this._errorOnLoadingConversations = value;
  }

  set errorOnShare(value: boolean) {
    this._errorOnShare = value;
  }

  start(): void {}

  stop(): void {}

  getConsentUrl(
    location: Pick<Location, 'hostname' | 'pathname'>,
  ): Promise<GetSlackConsentUrlResult> {
    return Promise.resolve(
      this._errorObtainingConsentUrl
        ? {
            ok: false,
            aborted: false,
            status: 500,
            code: '500',
            message: 'Internal server error',
          }
        : {
            ok: true,
            result: 'fake-consent-url',
          },
    );
  }

  getConsent(url: string, onSuccess: () => void): void {
    this.onSuccess = onSuccess;
  }

  isSlackEnabled(): Promise<IsSlackEnabledResult> {
    return this._errorCheckingEnabledStatus
      ? failure({
          status: 500,
          code: '500',
          message: 'Internal server error',
        })
      : success(() => this.isEnabled);
  }

  getTeams(signal?: AbortSignal): Promise<GetSlackTeamsResult> {
    return this._errorOnLoadingTeams
      ? failure({
          status: 500,
          code: '500',
          message: 'Internal server error',
        })
      : success([...this.teams]);
  }

  getDefaultTeamId(): Promise<string | undefined> {
    return Promise.resolve(this.defaultTeamId);
  }

  setDefaultTeamId(defaultTeamId: string): Promise<void> {
    this.defaultTeamId = defaultTeamId;

    return Promise.resolve();
  }

  async getConversations(
    teamId: string,
    signal?: AbortSignal,
  ): Promise<GetSlackConversationsResult> {
    return this._errorOnLoadingConversations
      ? await failure({
          status: 500,
          code: '500',
          message: 'Internal server error',
        })
      : await success(conversations.get(teamId)!);
  }

  share({
    teamId,
    conversationId,
    conversationType,
    link,
    message,
  }: ShareToSlackRequest): Promise<ShareToSlackResult> {
    return this._errorOnShare
      ? failure({
          status: 403,
          code: 'CANNOT_SHARE',
          message: 'You don’t have write access to the conversation',
        })
      : success(new OriginTracer({ product: 'fake' }));
  }
}

function success<V>(value: V | (() => V)): Promise<SuccessResult<V>> {
  return new Promise<SuccessResult<V>>((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        result: typeof value === 'function' ? (value as () => V)() : value,
      });
    });
  });
}

function failure<V>(
  error: Omit<FailureResult, 'ok' | 'aborted'>,
): Promise<FailureResult> {
  return new Promise<FailureResult>((resolve) => {
    setTimeout(() => {
      resolve({
        ...error,
        ok: false,
        aborted: false,
      });
    });
  });
}
