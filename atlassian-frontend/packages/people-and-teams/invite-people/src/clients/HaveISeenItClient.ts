import { HaveISeenItFlag, GetFlagResponse } from '../types';
import { HAVE_I_SEEN_IT_URL, DEFAULT_STARGATE_SERVICE_URL } from './common';
import { tryCacheWithClear } from '../utils';
const OPEN_INVITE_TYPE = 'open-invite';
const DOMAIN_TYPE = 'domain';
export const PROJECT = 'viral-options-default-to-checked';
export const createHISIDomainFlagKey = (
  product: string,
  cloudId: string,
  domain: string,
): string => {
  return `${cloudId}-${product}-${PROJECT}-${DOMAIN_TYPE}-${domain}`;
};
export const createHISIOpenInviteFlagKey = (
  product: string,
  cloudId: string,
): string => {
  return `${cloudId}-${product}-${PROJECT}-${OPEN_INVITE_TYPE}`;
};

export interface HaveISeenItClientInterface {
  getFlag(flagKey: string): Promise<GetFlagResponse>;
  postFlag(flagKey: string): Promise<string>;
}
export class HaveISeenItClient implements HaveISeenItClientInterface {
  flagsCache: Map<string, HaveISeenItFlag>;
  constructor() {
    this.flagsCache = new Map();
  }
  public clearCache = () => {
    this.flagsCache.clear();
  };
  public async getFlag(flagKey: string): Promise<GetFlagResponse> {
    try {
      const cacheValue = this.flagsCache.get(flagKey);
      if (this.flagsCache.has(flagKey) && cacheValue) {
        return { response: cacheValue, cached: true };
      }
      const path = `${DEFAULT_STARGATE_SERVICE_URL}${HAVE_I_SEEN_IT_URL}?flagKey=${flagKey}`;
      const resp = await fetch(path);
      // exception case for when HISI responds with cached version
      if (resp.status === 304) {
        const response = await resp.json();
        tryCacheWithClear(this.flagsCache, flagKey, response, 50);
        const returnValue = { response, cached: false };
        return returnValue;
      }
      if (!resp.ok) {
        return Promise.reject('Received error response when fetching flag');
      }
      const response = await resp.json();
      tryCacheWithClear(this.flagsCache, flagKey, response, 50);
      const returnValue = { response, cached: false };
      return returnValue;
    } catch (err) {
      return Promise.reject('Error while fetching flag');
    }
  }

  public async postFlag(flagKey: string): Promise<string> {
    try {
      const path = `${DEFAULT_STARGATE_SERVICE_URL}${HAVE_I_SEEN_IT_URL}`;
      const resp = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flagKey,
        }),
      });
      if (!resp.ok) {
        return Promise.reject('Received error response when posting flag');
      }
      return '';
    } catch (err) {
      return Promise.reject('Error while posting flag');
    }
  }
}
