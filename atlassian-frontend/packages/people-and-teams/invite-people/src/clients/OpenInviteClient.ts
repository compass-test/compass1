import {
  OpenInviteInfo,
  UpdateOpenInviteResponse,
  GetOpenInviteInfo,
  GetOpenInviteStateResponse,
} from '../types';
import { tryCacheWithClear } from '../utils';
import { OPEN_INVITE_URL, DEFAULT_STARGATE_SERVICE_URL } from './common';

export interface OpenInviteClientInterface {
  getOpenInviteState(
    product: string,
    cloudId: string,
  ): Promise<GetOpenInviteStateResponse>;
  enableOpenInvite(
    product: string,
    cloudId: string,
  ): Promise<UpdateOpenInviteResponse>;
}

export class OpenInviteClient implements OpenInviteClientInterface {
  openInviteCache: Map<string, GetOpenInviteInfo>;
  constructor() {
    this.openInviteCache = new Map();
  }
  public async getOpenInviteState(
    product: string,
    cloudId: string,
  ): Promise<GetOpenInviteStateResponse> {
    const resourceARI = `ari:cloud:${product}::site/${cloudId}`;
    const path = `${DEFAULT_STARGATE_SERVICE_URL}${OPEN_INVITE_URL}?resource=${resourceARI}`;
    try {
      const cacheValue = this.openInviteCache.get(resourceARI);
      if (this.openInviteCache.has(resourceARI) && cacheValue) {
        return { response: cacheValue, cached: true };
      }
      const resp = await fetch(path);
      if (!resp.ok) {
        return Promise.reject(
          'Received error response when getting open invite setting',
        );
      }
      const responseJson = await resp.json();
      const response = {
        ...responseJson,
        getOpenInvite: true,
      };
      tryCacheWithClear(this.openInviteCache, resourceARI, response, 50);
      const returnValue = {
        response,
        cached: false,
      };
      return returnValue;
    } catch (err) {
      throw new Error('Error while fetching open invite state');
    }
  }
  public clearCache = () => {
    this.openInviteCache.clear();
  };
  // Will only update to DIRECT_ACCESS for open invite settings.
  public async enableOpenInvite(
    product: string,
    cloudId: string,
  ): Promise<UpdateOpenInviteResponse> {
    const resource = `ari:cloud:${product}::site/${cloudId}`;
    // only need to enable OPEN_INVITE (DIRECT_ACCESS) for our experiment
    const mode = 'DIRECT_ACCESS';
    const path = `${DEFAULT_STARGATE_SERVICE_URL}${OPEN_INVITE_URL}`;
    const request: OpenInviteInfo = {
      resource,
      mode,
    };
    try {
      const resp = await fetch(path, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      if (!resp.ok) {
        return Promise.reject({
          errorMesasge:
            'Received error response when updating open invite setting',
          responseCode: resp.status,
          updateOpenInviteSettingFailure: true,
        });
      }
      return {
        success: true,
        enableOpenInvite: true,
      };
    } catch (err) {
      return Promise.reject({
        errorMessage: 'Error while updating open invite state',
        error: err,
        updateOpenInviteSettingFailure: true,
      });
    }
  }
}
