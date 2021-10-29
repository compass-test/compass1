/*
 * Code heavily influenced by Segment's Store https://github.com/segmentio/localstorage-retry/blob/master/lib/store.js
 * and Engine https://github.com/segmentio/localstorage-retry/blob/master/lib/engine.js
 * But is not used because it's not public API and is too restrictive in the way it sets keys and does JSON parsing and stringify
 */
import { envType } from '../analyticsWebTypes';

import InMemoryStorage from './InMemoryStorage';
import { Options } from './types';

export const AWC_STORAGE_PREFIX = 'awc';
export const GLOBAL_IN_MEMORY_NAME = 'awcInMemoryStorageFallback';

declare global {
  interface Window {
    [GLOBAL_IN_MEMORY_NAME]: any;
  }
}

export function isSupported(store: Storage) {
  const TEST_VALUE = 'test_value';
  if (!store) {
    return false;
  }
  try {
    const key = 'awc.storage.support';
    store.setItem(key, TEST_VALUE);
    const value = store.getItem(key);
    store.removeItem(key);

    // handle localStorage silently failing
    return value === TEST_VALUE;
  } catch (e) {
    // Can throw if localStorage is disabled
    return false;
  }
}

export function isQuotaExceeded(e: any) {
  let quotaExceeded = false;
  if (e.code) {
    switch (e.code) {
      case 22:
        quotaExceeded = true;
        break;
      case 1014:
        // Firefox
        if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
          quotaExceeded = true;
        }
        break;
      default:
        break;
    }
  } else if (e.number === -2147024882) {
    // Internet Explorer 8
    quotaExceeded = true;
  }
  return quotaExceeded;
}

export default class SafeStorage {
  _prefix: string;
  _store!: Storage;

  options: Options;

  constructor(storageToUse: Storage, options: Options = {}) {
    this.options = options;

    const prefixes: string[] = [];
    if (options.useStoragePrefix === undefined || options.useStoragePrefix) {
      prefixes.push(AWC_STORAGE_PREFIX);
    }
    if (options.envPrefix && options.envPrefix !== envType.PROD) {
      prefixes.push(options.envPrefix);
    }

    this._prefix = prefixes.join('-');

    if (isSupported(storageToUse)) {
      this._store = storageToUse;
    } else {
      this.swapToInMemory();
    }
  }

  getStore = () => this._store;

  getItem = (key: string): string | null => this._store.getItem(this.createKey(key));

  removeItem = (key: string) => this._store.removeItem(this.createKey(key));

  setItem = (key: string, value: string) => {
    try {
      this._store.setItem(this.createKey(key), value);
    } catch (err) {
      if (isQuotaExceeded(err)) {
        this.swapToInMemory();
        this._store.setItem(this.createKey(key), value);
      }
    }
  };

  swapToInMemory = () => {
    if (this._store === InMemoryStorage) {
      return;
    }

    const keys: string[] = Object.keys(this._store || {});

    let inMemoryStorage: Storage;
    if (isSupported(window[GLOBAL_IN_MEMORY_NAME])) {
      inMemoryStorage = window[GLOBAL_IN_MEMORY_NAME];
    } else {
      inMemoryStorage = InMemoryStorage;
      if (!window[GLOBAL_IN_MEMORY_NAME]) {
        // If not already attached to window then attach our instance of InMemoryStorage
        // We need to do this because if there are multiple instances of Analytics Client in multiple scopes,
        // there is no way to guarantee the throttling behaviour of the UI viewed event across those instances without a global singleton
        window[GLOBAL_IN_MEMORY_NAME] = InMemoryStorage;
      }
    }

    keys.forEach((key: string) => {
      if (key.indexOf(this.getPrefix()) === 0) {
        const value = this._store.getItem(key);
        if (value) {
          inMemoryStorage.setItem(key, value);
        }
      }
    });

    this._store = inMemoryStorage;
  };

  clear = () => this._store.clear();

  key = (index: number) => this._store.key(index);

  getPrefix = () => this._prefix;

  createKey = (key: string) => {
    if (this._prefix) {
      return `${this.getPrefix()}.${key}`;
    }
    return key;
  }
}
