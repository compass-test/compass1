import sortBy from 'lodash/sortBy';
import { v4 as uuid } from 'uuid';

import { ExternalUser } from '@atlaskit/user-picker';

import { DEFAULT_SLACK_SERVICE_URL } from './constants';
import popupWindowParams from './popupWindowParams';
import type { SlackService } from './SlackService';
import type {
  AtlassianSlackProduct,
  GetSlackTeamsResult,
  GetSlackUsersResult,
  IsSlackEnabledResult,
  SlackTeam,
  SlackTeamsServiceResponse,
  SlackUser,
  SlackUsersResponse,
} from './types';
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
  onFetchUsersSucceeded: (params: {
    teamId: string;
    users: number;
    pages: number;
  }) => void;
  onFetchUsersFailed: (params: PaginatedError & { teamId: string }) => void;
};

export default abstract class AbstractSlackService implements SlackService {
  private readonly baseUrl: string;
  private readonly windowName = uuid();
  protected readonly abortController = new AbortController();
  private popupWindow?: WindowProxy;
  protected consentUrl?: string;
  private onSuccess?: () => void;

  protected constructor(
    protected readonly cloudId: string,
    protected readonly product: AtlassianSlackProduct,
    protected readonly analytics: SlackServiceAnalytics,
  ) {
    this.baseUrl = `${DEFAULT_SLACK_SERVICE_URL}/${product}`;
  }

  // Handle Slack authorization success message from popup window
  private onMessage = ({ data, target, source }: MessageEvent) => {
    if (!source || target !== window || data !== 'success') {
      return;
    }

    window.removeEventListener('message', this.onMessage);
    const popupWindow = source as WindowProxy;

    if (!this.popupWindow) {
      return;
    }

    popupWindow.close();
    this.popupWindow = undefined;

    this.onSuccess?.();
  };

  abort() {
    this.abortController.abort();
  }

  abstract primeConsentUrl(): Promise<void>;

  async getConsent(onSuccess: () => void) {
    await this.primeConsentUrl();

    this.onSuccess = onSuccess;
    window.addEventListener('message', this.onMessage);

    const popupWindow = window.open(
      this.consentUrl,
      this.windowName,
      popupWindowParams(POPUP_WIDTH, POPUP_HEIGHT),
    );

    if (popupWindow) {
      this.popupWindow = popupWindow;
    }
  }

  async isSlackEnabled(): Promise<IsSlackEnabledResult> {
    const result = await retryFetch<boolean>({
      request: () =>
        fetch(`${this.baseUrl}/enabled?cloudId=${this.cloudId}`, {
          signal: this.abortController.signal,
        }),
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

  async getTeams(): Promise<GetSlackTeamsResult> {
    const response = await fetchItemsWithCursor<
      SlackTeamsServiceResponse,
      SlackTeam
    >({
      url: `${this.baseUrl}/teams`,
      queryParams: { cloudId: this.cloudId },
      signal: this.abortController.signal,
      getItems: (response) => response.teams,
      getCursor: (response) => response.nextCursor,
      canRetryCheck: httpRetryPolicy(retryOptions),
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

  async getUsers(teamId: string): Promise<GetSlackUsersResult> {
    const response = await fetchItemsWithCursor<SlackUsersResponse, SlackUser>({
      url: `${this.baseUrl}/recipients`,
      queryParams: { cloudId: this.cloudId, teamId },
      signal: this.abortController.signal,
      getItems: (response) => response.recipients,
      getCursor: (response) => response.nextCursor,
      canRetryCheck: httpRetryPolicy(retryOptions),
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
        result: users.map((d) => {
          return {
            id: d.email,
            email: d.email,
            name: d.name,
            publicName: d.displayName,
            avatarUrl: d.avatarUrl,
            type: 'user',
            isExternal: true,
            sources: ['slack'],
          } as ExternalUser;
        }),
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
}
