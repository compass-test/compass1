import {
  BulkInviteFailureResponse,
  BulkInviteResponse,
  BulkInviteSuccessResponse,
  InviteApiFailureResponse,
  InviteApiRequest,
  InviteApiSuccessResponse,
  InvitedUser,
  InviteCapabilitiesResponse,
  InviteProduct,
  GetDirectAccessSettingRequest,
  GetDirectAccessSettingResponse,
  GetDirectAccessSettingSuccessResponseValue,
  UpdateDirectAccessSettingRequest,
  UpdateDirectAccessSettingResponse,
} from './../types';

import {
  BULK_INVITE_URL,
  DEFAULT_STARGATE_SERVICE_URL,
  INVITE_CAPABILITIES,
  DIRECT_ACCESS_URL,
} from './common';
import {
  getProductTitleFromAri,
  getProductIdFromResource,
  tryCacheWithClear,
} from '../utils';

export interface InviteApiClient {
  inviteUsers(request: InviteApiRequest): Promise<BulkInviteResponse>;
  inviteCapabilities(cloudId: string): Promise<Array<InviteProduct>>;
  getDirectAccessSetting(
    request: GetDirectAccessSettingRequest,
  ): Promise<GetDirectAccessSettingResponse>;
  updateDirectAccessSettings(
    request: UpdateDirectAccessSettingRequest,
  ): Promise<UpdateDirectAccessSettingResponse>;
}

export class InviteApiClientImpl implements InviteApiClient {
  directAccessSettingsCache: Map<
    string,
    GetDirectAccessSettingSuccessResponseValue
  >;
  constructor() {
    this.directAccessSettingsCache = new Map();
  }
  public async inviteUsers(
    request: InviteApiRequest,
  ): Promise<BulkInviteResponse> {
    try {
      const response = await fetch(
        DEFAULT_STARGATE_SERVICE_URL + BULK_INVITE_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        },
      );

      const inviteApiResponse = await response.json();

      if (!response.ok) {
        return this.handleInviteUsersFailureResponse(
          inviteApiResponse as InviteApiFailureResponse,
        );
      }
      return this.handleInviteUsersSuccessResponse(
        inviteApiResponse as Array<InviteApiSuccessResponse>,
      );
    } catch (err) {
      err.message = `Error while inviting users: ${err.message}!`;
      throw err;
    }
  }
  public clearDESCache = () => {
    this.directAccessSettingsCache.clear();
  };

  public async inviteCapabilities(
    cloudId: string,
  ): Promise<Array<InviteProduct>> {
    const resource = `ari:cloud:platform::site/${cloudId}`;
    const url = `${DEFAULT_STARGATE_SERVICE_URL}${INVITE_CAPABILITIES}?resource=${resource}`;

    try {
      const response = await fetch(url);

      const capabilitiesResponse = await response.json();

      if (response.ok) {
        return this.handleCapabilitiesResponse(capabilitiesResponse);
      } else {
        return [];
      }
    } catch (err) {
      err.message = `Error while getting product list: ${err.message}!`;
      throw err;
    }
  }

  private handleCapabilitiesResponse(
    response: InviteCapabilitiesResponse,
  ): Array<InviteProduct> {
    let products: Array<string> = [];
    if (response.directInvite.permittedResources) {
      products.push(...response.directInvite.permittedResources);
    }
    if (response.invitePendingApproval.permittedResources) {
      products.push(...response.invitePendingApproval.permittedResources);
    }

    return Array.from(new Set(products)).map((p) => ({
      name: getProductTitleFromAri(p),
      id: getProductIdFromResource(p) || '',
      ari: p,
    }));
  }

  private handleInviteUsersFailureResponse(
    errorResponse: InviteApiFailureResponse,
  ): BulkInviteFailureResponse {
    return {
      failure: errorResponse as InviteApiFailureResponse,
    };
  }

  private hasUser(users: InvitedUser[], invitedUser: InvitedUser): boolean {
    return users.some((user: InvitedUser) => user.email === invitedUser.email);
  }

  private handleInviteUsersSuccessResponse(
    response: InviteApiSuccessResponse[],
  ): BulkInviteSuccessResponse {
    return response.reduce(
      (accumulator, userResponse) => {
        const user: InvitedUser = {
          id: userResponse.id,
          email: userResponse.email,
        };

        Object.keys(userResponse.results).forEach((resource) => {
          switch (userResponse.results[resource]) {
            case 'INVITED':
            case 'USER_EXISTS':
              if (!this.hasUser(accumulator.invited, user)) {
                accumulator.invited.push(user);
              }
              break;
            case 'INVITED_PENDING_APPROVAL':
            case 'PENDING_INVITE_EXISTS':
              if (!this.hasUser(accumulator.accessRequested, user)) {
                accumulator.accessRequested.push(user);
              }
              break;
            case 'NOT_INVITED':
            case 'ERROR':
              accumulator.error.push({
                ...user,
                error: userResponse.errorReasons[resource],
              });
              break;
          }
        });
        return accumulator;
      },
      {
        invited: [],
        accessRequested: [],
        error: [],
      } as BulkInviteSuccessResponse,
    );
  }

  public async updateDirectAccessSettings({
    product,
    cloudId,
    location,
    domains,
  }: UpdateDirectAccessSettingRequest): Promise<
    UpdateDirectAccessSettingResponse
  > {
    const resource = `ari:cloud:${product}::site/${cloudId}`;
    const url = `${DEFAULT_STARGATE_SERVICE_URL}${DIRECT_ACCESS_URL}`;
    const request = {
      resource,
      domains,
      location,
      action: 'ACCEPT',
      setting: 'DIRECT_ACCESS',
    };
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        method: 'POST',
      });
      if (!response.ok) {
        return Promise.reject({
          errorMessage: `Received error response when updating direct access setting: ${response.statusText}`,
          responseCode: response.status,
          updateDirectAccessSettingsFailure: true,
        });
      }
      return { success: true, updateDirectAccessSettings: true };
    } catch (err) {
      return Promise.reject({
        errorMessage: `Error updating direct access setting.`,
        error: err,
        updateDirectAccessSettingsFailure: true,
      });
    }
  }
  public async getDirectAccessSetting(
    request: GetDirectAccessSettingRequest,
  ): Promise<GetDirectAccessSettingResponse> {
    const performFetch = () => {
      const url = `${DEFAULT_STARGATE_SERVICE_URL}${DIRECT_ACCESS_URL}`;
      const queryParams = `resource=${request.productAri}&domain=${
        request.domain
      }&setting=${request.setting}${
        request.roleAri ? '&role=' + request.roleAri : ''
      }`;

      return fetch(`${url}?${queryParams}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };

    try {
      const cacheValue = this.directAccessSettingsCache.get(request.domain);
      if (this.directAccessSettingsCache.has(request.domain) && cacheValue) {
        return { response: cacheValue, cached: true };
      }
      const response = await performFetch();
      if (!response.ok) {
        return {
          domain: request.domain,
          errorMessage: `Received error response when getting direct access setting: ${response.statusText}`,
          responseCode: response.status,
        };
      }
      const responseJson = await response.json();
      const responseValue = { ...responseJson, getAccessSuccessReponse: true };
      tryCacheWithClear(
        this.directAccessSettingsCache,
        request.domain,
        responseValue,
      );
      const returnValue = { response: responseValue, cached: false };
      return returnValue;
    } catch (err) {
      return {
        domain: request.domain,
        errorMessage: `Error getting direct access setting.`,
        error: err,
      };
    }
  }
}
