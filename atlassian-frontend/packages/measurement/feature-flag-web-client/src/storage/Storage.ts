import { CURRENT_FFS_API_VERSION } from '../core/constants';
import { ClientStorageState } from '../fetcher/types';
import { EnvironmentType, FeatureFlagUserWithIdentifier } from '../index';
import hashUser from '../util/hash';

import { IE8Exception, ObjectWithTimestamp, OldUserValue } from './types';

export const STORAGE_KEY_PREFIX = `feature-flags-atl`;
const VERSIONED_STORAGE_KEY_PREFIX = `${STORAGE_KEY_PREFIX}.${CURRENT_FFS_API_VERSION}`;
const STORAGE_KEY_FLAG_STATE_PREFIX = `${VERSIONED_STORAGE_KEY_PREFIX}.flags`;
const STORAGE_KEY_USER_LAST_KEY_PREFIX = `${VERSIONED_STORAGE_KEY_PREFIX}.last-user`;
const STORAGE_KEY_ANON_ID = `${STORAGE_KEY_PREFIX}.anonId`;
const STORAGE_KEY_DETECT_SUPPORT = `${STORAGE_KEY_PREFIX}.storage.support`;
let StorageExceedQuota = false;

// Expire after 7 days
export const FLAG_STATE_EXPIRY_PERIOD = 1000 * 60 * 60 * 24 * 7;

export default class Storage<T extends ObjectWithTimestamp> {
  private key: string;

  private user: FeatureFlagUserWithIdentifier;
  private lastUserUpdateKey: string;

  private readonly env: EnvironmentType;

  private readonly product: string;

  private readonly apiKey: string;

  constructor(
    env: EnvironmentType,
    product: string,
    apiKey: string,
    user: FeatureFlagUserWithIdentifier,
  ) {
    this.env = env;
    this.product = product;
    this.apiKey = apiKey;
    this.user = user;
    this.key = this.getKey();
    this.lastUserUpdateKey = this.getLastUpdatedKey();
  }

  updateUserContext(user: FeatureFlagUserWithIdentifier): void {
    this.user = user;
    this.key = this.getKey();
    this.lastUserUpdateKey = this.getLastUpdatedKey();
  }

  getFlagsState(): T | null {
    return this.getObjectFromLocalstorage<T>(this.key);
  }

  getFlagsFromOldState(): T | null {
    const oldKey = this.getObjectFromLocalstorage<OldUserValue>(
      this.lastUserUpdateKey,
    );
    if (oldKey) {
      return this.getObjectFromLocalstorage<T>(oldKey.value);
    }
    return null;
  }

  setFlagsState(data: T): void {
    Storage.setItem(this.key, JSON.stringify(data), () =>
      this.setLastUpdatedPrimaryKey(),
    );
  }

  purgeStaleFlagState(): void {
    try {
      Object.keys(window.localStorage)
        .filter(
          (key) =>
            (key.startsWith(STORAGE_KEY_FLAG_STATE_PREFIX) &&
              key !== this.key) ||
            (key.startsWith(STORAGE_KEY_USER_LAST_KEY_PREFIX) &&
              key !== this.lastUserUpdateKey),
        )
        .forEach((key) => {
          const value = this.getObjectFromLocalstorage(key);
          if (
            value &&
            Date.now() - value.timestamp >= FLAG_STATE_EXPIRY_PERIOD
          ) {
            Storage.removeItem(key);
          }
        });
    } catch (error) {
      // This could fail due to localstorage permissions being restricted, in this case do nothing
    }
  }

  private getObjectFromLocalstorage<O extends ObjectWithTimestamp>(
    key: string,
  ): O | null {
    const rawData = Storage.getItem(key);
    if (!rawData) {
      return null;
    }
    return JSON.parse(rawData);
  }

  public static getAnonymousId(): string | null {
    return Storage.getItem(STORAGE_KEY_ANON_ID);
  }

  public static setAnonymousId(anonymousId: string): void {
    Storage.setItem(STORAGE_KEY_ANON_ID, anonymousId);
  }

  private static setItem(
    key: string,
    value: string,
    callbackIfSuccessful?: () => void,
  ): void {
    try {
      window.localStorage.setItem(key, value);
      StorageExceedQuota = false;
      callbackIfSuccessful && callbackIfSuccessful();
    } catch (error) {
      if (Storage.isQuotaExceeded(error)) {
        StorageExceedQuota = true;
      }
      // This could fail due to localstorage being full or localstorage permissions being restricted.
      // In either case, we do nothing.
    }
  }

  private static getItem(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      // This could fail due to localstorage permissions being restricted, in this case do nothing
      return null;
    }
  }

  private static removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      // This could fail due to localstorage permissions being restricted, in this case do nothing
    }
  }

  private setLastUpdatedPrimaryKey(): void {
    const value: OldUserValue = {
      value: this.key,
      timestamp: Date.now(),
    };
    Storage.setItem(this.lastUserUpdateKey, JSON.stringify(value));
  }

  private getLastUpdatedKey(): string {
    const partialUser = {
      identifier: this.user.identifier,
    };
    return `${STORAGE_KEY_USER_LAST_KEY_PREFIX}.${this.env}.${
      this.product
    }.${hashUser(partialUser)}`;
  }

  private getKey(): string {
    return `${STORAGE_KEY_FLAG_STATE_PREFIX}.${this.env}.${this.product}.${
      this.apiKey
    }.${hashUser(this.user)}`;
  }

  public static isQuotaExceeded(e: DOMException | IE8Exception): boolean {
    // according to https://developer.mozilla.org/en-US/docs/Web/API/DOMException
    // DOMException.code is deprecated API should no longer be used
    if (e instanceof DOMException) {
      switch (e.name) {
        case 'QUOTA_EXCEEDED_ERR':
          // Safari
          return true;
        case 'QuotaExceededError':
          // Chrome
          return true;
        case 'NS_ERROR_DOM_QUOTA_REACHED':
          // Firefox
          return true;
        default:
          return false;
      }
    }
    // Internet Explorer 8
    return e.number === -2147024882;
  }

  public static getStorageStatus(): ClientStorageState {
    const TEST_VALUE = 'test_value';
    try {
      if (!window.localStorage) {
        return ClientStorageState.NOT_AVAILABLE;
      }
      if (StorageExceedQuota) {
        return ClientStorageState.FULL;
      }
      window.localStorage.setItem(STORAGE_KEY_DETECT_SUPPORT, TEST_VALUE);
      const value = window.localStorage.getItem(STORAGE_KEY_DETECT_SUPPORT);
      window.localStorage.removeItem(STORAGE_KEY_DETECT_SUPPORT);

      // handle localStorage silently failing
      return value === TEST_VALUE
        ? ClientStorageState.AVAILABLE
        : ClientStorageState.ERRORED;
    } catch (e) {
      if (Storage.isQuotaExceeded(e)) {
        return ClientStorageState.FULL;
      }
      // permission issue or localStorage disabled
      return ClientStorageState.NOT_AVAILABLE;
    }
  }
}
