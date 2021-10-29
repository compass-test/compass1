import OriginTracer from '@atlassiansox/origin-tracing';
import sortBy from 'lodash/sortBy';
import { v4 as uuid } from 'uuid';

import {
  getDefaultSlackWorkSpace,
  setDefaultSlackWorkSpace,
} from '../localStorageUtils';
import type { SlackService } from '../SlackService';
import type {
  AbortedResult,
  AtlassianProduct,
  FailureResult,
  GetSlackChannelsResult,
  GetSlackConsentUrlResult,
  GetSlackConversationsResult,
  GetSlackTeamsResult,
  GetSlackUsersResult,
  IsSlackEnabledResult,
  Result,
  ShareToSlackRequest,
  ShareToSlackResult,
  SlackChannel,
  SlackChannelsResponse,
  SlackTeam,
  SlackTeamsServiceResponse,
  SlackUser,
  SlackUsersResponse,
} from '../types';

import { DEFAULT_SHARE_TO_SLACK_SERVICE_URL } from './constants';
import popupWindowParams from './popupWindowParams';
import { fetchItemsWithCursor, httpRetryPolicy, retryFetch } from './util';

const POPUP_WIDTH = 500;
const POPUP_HEIGHT = 900;

const retryOptions = {
  maxAttempts: 3,
  backoffTimeMs: 200,
  rateLimitBackoffTimeMs: 1000,
};

type HttpError = {
  status: number;
  errorMessage?: string;
};

type PaginatedError = HttpError & {
  page: number;
};

export type SlackServiceAnalytics = {
  onGetEnabledSucceeded: () => void;
  onGetEnabledFailed: (error: HttpError) => void;
  onFetchTeamsSucceeded: (params: { teams: number; pages: number }) => void;
  onFetchTeamsFailed: (params: PaginatedError) => void;
  onFetchChannelsSucceeded: (params: {
    teamId: string;
    channels: number;
    pages: number;
  }) => void;
  onFetchChannelsFailed: (params: PaginatedError & { teamId: string }) => void;
  onFetchUsersSucceeded: (params: {
    teamId: string;
    users: number;
    pages: number;
  }) => void;
  onFetchUsersFailed: (params: PaginatedError & { teamId: string }) => void;
  onShareSucceeded: (params: {
    product: AtlassianProduct;
    teamId: string;
    conversationType: SlackChannel['type'] | SlackUser['type'];
    conversationId: string;
  }) => void;
  onShareFailed: (
    params: HttpError & {
      product: AtlassianProduct;
      teamId: string;
      conversationType: SlackChannel['type'] | SlackUser['type'];
      conversationId: string;
    },
  ) => void;
};

export default abstract class AbstractSlackService implements SlackService {
  private readonly baseUrl: string;
  private readonly windowName = uuid();
  private popupWindow?: WindowProxy;
  private onSuccess?: () => void;
  private cloudId?: string;

  protected constructor(
    protected readonly product: AtlassianProduct,
    protected readonly analytics: SlackServiceAnalytics,
  ) {
    this.baseUrl = `${DEFAULT_SHARE_TO_SLACK_SERVICE_URL}/${product}`;
  }

  // Handle Slack authorization success message from popup window
  private onMessage = ({ data, target, source }: MessageEvent) => {
    if (!source || target !== window || data !== 'success') {
      return;
    }

    const popupWindow = source as WindowProxy;

    if (!this.popupWindow) {
      return;
    }

    popupWindow.close();
    this.popupWindow = undefined;

    this.onSuccess?.();
  };

  protected async getCloudId(signal?: AbortSignal): Promise<Result<string>> {
    if (this.cloudId) {
      return {
        ok: true,
        result: this.cloudId,
      };
    }

    const response = await retryFetch<string>({
      request: () => fetch('/_edge/tenant_info', { signal }),
      mapResult: (response) =>
        response.json().then((json) => (json as { cloudId: string }).cloudId),
      canRetry: httpRetryPolicy(retryOptions),
      signal,
    });

    if (response.ok) {
      this.cloudId = response.result;
    }

    return response;
  }

  start() {
    window.addEventListener('message', this.onMessage);
  }

  stop() {
    window.removeEventListener('message', this.onMessage);
  }

  abstract getConsentUrl(
    location: Pick<Location, 'hostname' | 'pathname'>,
    signal?: AbortSignal,
  ): Promise<GetSlackConsentUrlResult>;

  getConsent(url: string, onSuccess: () => void) {
    this.onSuccess = onSuccess;

    const popupWindow = window.open(
      url,
      this.windowName,
      popupWindowParams(POPUP_WIDTH, POPUP_HEIGHT),
    );

    if (popupWindow) {
      this.popupWindow = popupWindow;
    }
  }

  async isSlackEnabled(signal?: AbortSignal): Promise<IsSlackEnabledResult> {
    const cloudIdResponse = await this.getCloudId(signal);

    if (!cloudIdResponse.ok) {
      return cloudIdResponse;
    }

    const cloudId = cloudIdResponse.result;

    const result = await retryFetch<boolean>({
      request: () =>
        fetch(`${this.baseUrl}/enabled?cloudId=${cloudId}`, { signal }),
      mapResult: (response) => response.json().then(({ enabled }) => enabled),
      mapError: (response) =>
        response.json().then((obj: { code?: string; message?: string }) => {
          const { code, message } = obj;

          return {
            code: code ?? '',
            message: message ?? '',
          };
        }),
    });

    if (result.ok) {
      this.analytics.onGetEnabledSucceeded();
    } else if (!result.aborted) {
      this.analytics.onGetEnabledFailed({
        status: result.status,
        errorMessage: result.message,
      });
    }

    return result;
  }

  async getTeams(signal?: AbortSignal): Promise<GetSlackTeamsResult> {
    const cloudIdResponse = await this.getCloudId(signal);

    if (!cloudIdResponse.ok) {
      return cloudIdResponse;
    }

    const cloudId = cloudIdResponse.result;

    const response = await fetchItemsWithCursor<
      SlackTeamsServiceResponse,
      SlackTeam
    >({
      url: `${this.baseUrl}/teams`,
      queryParams: { cloudId },
      signal,
      getItems: (response) => response.teams,
      getCursor: (response) => response.nextCursor,
      canRetry: httpRetryPolicy(retryOptions),
    });

    if (response.ok) {
      this.analytics.onFetchTeamsSucceeded({
        teams: response.items.length,
        pages: response.pages,
      });

      return {
        ok: true,
        result: sortBy(response.items, [({ name }) => name.toLowerCase()]),
      };
    } else if (response.aborted) {
      return response;
    } else {
      this.analytics.onFetchTeamsFailed({
        page: response.page,
        status: response.status,
        errorMessage: response.message,
      });

      return response;
    }
  }

  getDefaultTeamId(): Promise<string | undefined> {
    return Promise.resolve(getDefaultSlackWorkSpace(this.product) ?? undefined);
  }

  setDefaultTeamId(defaultTeamId: string): Promise<void> {
    return Promise.resolve(
      setDefaultSlackWorkSpace(this.product, defaultTeamId),
    );
  }

  private async getChannels(
    teamId: string,
    signal?: AbortSignal,
  ): Promise<GetSlackChannelsResult> {
    const cloudIdResponse = await this.getCloudId(signal);

    if (!cloudIdResponse.ok) {
      return cloudIdResponse;
    }

    const cloudId = cloudIdResponse.result;

    const response = await fetchItemsWithCursor<
      SlackChannelsResponse,
      SlackChannel
    >({
      url: `${this.baseUrl}/channels`,
      queryParams: { cloudId, teamId },
      signal,
      getItems: (response) => response.channels,
      getCursor: (response) => response.nextCursor,
      canRetry: httpRetryPolicy(retryOptions),
    });

    if (response.ok) {
      this.analytics.onFetchChannelsSucceeded({
        teamId,
        channels: response.items.length,
        pages: response.pages,
      });

      const channels = sortBy(response.items, [
        ({ name }) => name.toLowerCase(),
      ]);

      return {
        ok: true,
        result: channels,
      };
    } else if (response.aborted) {
      return response;
    } else {
      this.analytics.onFetchChannelsFailed({
        teamId,
        page: response.page,
        status: response.status,
        errorMessage: response.message,
      });

      return response;
    }
  }

  private async getUsers(
    teamId: string,
    signal?: AbortSignal,
  ): Promise<GetSlackUsersResult> {
    const cloudIdResponse = await this.getCloudId(signal);

    if (!cloudIdResponse.ok) {
      return cloudIdResponse;
    }

    const cloudId = cloudIdResponse.result;

    const response = await fetchItemsWithCursor<SlackUsersResponse, SlackUser>({
      url: `${this.baseUrl}/recipients`,
      queryParams: { cloudId, teamId },
      signal,
      getItems: (response) => response.recipients,
      getCursor: (response) => response.nextCursor,
      canRetry: httpRetryPolicy(retryOptions),
    });

    if (response.ok) {
      this.analytics.onFetchUsersSucceeded({
        teamId,
        users: response.items.length,
        pages: response.pages,
      });

      const users = sortBy(response.items, [({ name }) => name.toLowerCase()]);

      return {
        ok: true,
        result: users,
      };
    } else if (response.aborted) {
      return response;
    } else {
      this.analytics.onFetchUsersFailed({
        teamId,
        page: response.page,
        status: response.status,
        errorMessage: response.message,
      });

      return response;
    }
  }

  async getConversations(
    teamId: string,
    signal?: AbortSignal,
  ): Promise<GetSlackConversationsResult> {
    const [channelsResult, directMessagesResult] = await Promise.all([
      this.getChannels(teamId, signal),
      this.getUsers(teamId, signal),
    ]);

    if (channelsResult.ok && directMessagesResult.ok) {
      const conversations = {
        channels: channelsResult.result,
        directMessages: directMessagesResult.result,
      };

      return {
        ok: true,
        result: conversations,
      };
    } else if (!channelsResult.ok) {
      return channelsResult;
    } else {
      return directMessagesResult as FailureResult | AbortedResult;
    }
  }

  async share({
    teamId,
    conversationId,
    conversationType,
    link,
    message,
    signal,
  }: ShareToSlackRequest & { signal?: AbortSignal }): Promise<
    ShareToSlackResult
  > {
    const origin = new OriginTracer({ product: this.product });

    const cloudIdResponse = await this.getCloudId(signal);

    if (!cloudIdResponse.ok) {
      return cloudIdResponse;
    }

    const cloudId = cloudIdResponse.result;

    const response = await retryFetch<void>({
      request: () =>
        fetch(`${this.baseUrl}/share`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cloudId,
            teamId,
            conversation: {
              id: conversationId,
              type: conversationType,
            },
            link: origin.addToUrl(link),
            message,
          }),
          signal,
        }),
      mapResult: () => Promise.resolve(),
      mapError: (response) =>
        response.json().then((obj: { code?: string; message?: string }) => {
          const { code, message } = obj;

          return {
            code: code ?? '',
            message: message ?? '',
          };
        }),
      signal,
    });

    // Analytics
    if (response.ok) {
      this.analytics.onShareSucceeded({
        product: this.product,
        teamId,
        conversationType,
        conversationId,
      });
    } else if (!response.aborted) {
      this.analytics.onShareFailed({
        product: this.product,
        teamId,
        conversationType,
        conversationId,
        status: response.status,
        errorMessage: message,
      });
    }

    return response.ok
      ? {
          ok: true,
          result: origin,
        }
      : response;
  }
}
