import { CURRENT_FFS_API_VERSION } from '../../core/constants';
import { ClientStorageState } from '../../fetcher/types';
import {
  EnvironmentType,
  FeatureFlagUserWithIdentifier,
  Identifiers,
} from '../../index';
import generateChance from '../../testUtil/chance';
import { featureFlagState } from '../../testUtil/mockData';
import hashUser from '../../util/hash';
import { FeatureFlagState } from '../../util/types';
import Storage from '../index';
import { FLAG_STATE_EXPIRY_PERIOD, STORAGE_KEY_PREFIX } from '../Storage';
import { IE8Exception } from '../types';

describe('Storage', () => {
  const chance = generateChance('Storage');

  const originalLocalStorage = window.localStorage;

  const errorLocalStorage = {
    setItem: jest.fn(() => {
      throw new Error('I am a teapot');
    }),
    getItem: jest.fn(() => {
      throw new Error('I am a teapot');
    }),
  };

  const quotaFullLocalStorage = (errorName: string): any => {
    return {
      setItem: jest.fn(() => {
        throw new DOMException('I am a teapot', errorName);
      }),
    };
  };

  const inconsistentLocalStorage = {
    setItem: jest.fn(() => {}),
    removeItem: jest.fn(() => {}),
    getItem: jest.fn(() => {
      return 'dsad';
    }),
  };

  const ie8Exception = new IE8Exception('I am a teapot');
  ie8Exception.number = -2147024882;
  const quotaFullLocalStorageIE8 = {
    setItem: jest.fn(() => {
      throw ie8Exception;
    }),
  };

  let env: EnvironmentType;
  let product: string;
  let apiKey: string;
  let user: FeatureFlagUserWithIdentifier;
  let storageKey: string;
  let lastUserKey: string;

  let storage: Storage<any>;

  let flagState: FeatureFlagState;

  const setLocalStorage = (localStorage: any): void => {
    jest.spyOn(window, 'localStorage', 'get').mockReturnValue(localStorage);
  };

  beforeEach(() => {
    env = chance.environment();
    product = chance.string();
    apiKey = chance.string();
    user = chance.user();
    storageKey = `feature-flags-atl.${CURRENT_FFS_API_VERSION}.flags.${env}.${product}.${apiKey}.${hashUser(
      user,
    )}`;
    const partialUser = {
      identifier: user.identifier,
    };
    lastUserKey = `feature-flags-atl.${CURRENT_FFS_API_VERSION}.last-user.${env}.${product}.${hashUser(
      partialUser,
    )}`;

    storage = new Storage(env, product, apiKey, user);

    flagState = {
      flags: {},
      timestamp: chance.date().getTime(),
      version: chance.string(),
    };
  });

  afterEach(() => {
    setLocalStorage(originalLocalStorage);
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('flagState', () => {
    test('sets and gets successfully', () => {
      storage.setFlagsState(flagState);
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        storageKey,
        JSON.stringify(flagState),
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        lastUserKey,
        JSON.stringify({
          value: storageKey,
          timestamp: Date.now(),
        }),
      );

      expect(storage.getFlagsState()).toEqual(flagState);
      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem).toHaveBeenCalledWith(storageKey);
    });

    test('saves and gets undefined version', () => {
      storage.setFlagsState({
        flags: {},
        timestamp: chance.date().getTime(),
        version: undefined,
      });

      const state = storage.getFlagsState();
      expect(state).toBeTruthy();
      expect(state?.version).toBeUndefined();
    });

    test('storage key updated when update user context', () => {
      const oldKey = (storage as any).key;
      user = chance.user();
      storageKey = `feature-flags-atl.${CURRENT_FFS_API_VERSION}.flags.${env}.${product}.${apiKey}.${hashUser(
        user,
      )}`;
      storage.updateUserContext(user);
      const newKey = (storage as any).key;

      expect(oldKey).not.toEqual(newKey);
      expect(newKey).toEqual(storageKey);
    });

    test('generates storage key consistently', () => {
      const user1: FeatureFlagUserWithIdentifier = {
        identifier: {
          type: Identifiers.ATLASSIAN_ACCOUNT_ID,
          value: 'someAtlassianAccountId',
        },
        additionalIdentifiers: {
          trelloAnonymousId: 'sometrelloAnonymousId',
          tenantId: 'someTenantId',
        },
        custom: {
          attr1: 'one',
          attr2: 2,
        },
      };

      // Same user with values in different order
      const user2: FeatureFlagUserWithIdentifier = {
        identifier: {
          type: Identifiers.ATLASSIAN_ACCOUNT_ID,
          value: 'someAtlassianAccountId',
        },
        additionalIdentifiers: {
          tenantId: 'someTenantId',
          trelloAnonymousId: 'sometrelloAnonymousId',
        },
        custom: {
          attr2: 2,
          attr1: 'one',
        },
      };

      const storage1 = new Storage(env, product, apiKey, user1);
      const storage2 = new Storage(env, product, apiKey, user2);

      expect((storage1 as any).key).toEqual((storage2 as any).key);
    });

    describe('catches errors', () => {
      test('when saving data', () => {
        setLocalStorage(errorLocalStorage);
        storage.setFlagsState(flagState);
        expect(errorLocalStorage.setItem).toHaveBeenCalledTimes(1);
      });

      test('when getting data', () => {
        setLocalStorage(errorLocalStorage);
        const actualFlagData = storage.getFlagsState();
        expect(errorLocalStorage.getItem).toHaveBeenCalledTimes(1);
        expect(actualFlagData).toBeNull();
      });
    });
  });

  describe('anonymousId', () => {
    test('sets and gets successfully', () => {
      const expectedKey = `feature-flags-atl.anonId`;
      const anonymousId = chance.string();

      Storage.setAnonymousId(anonymousId);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        expectedKey,
        anonymousId,
      );

      expect(Storage.getAnonymousId()).toBe(anonymousId);
      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem).toHaveBeenCalledWith(expectedKey);
    });

    test('ignores errors', () => {
      const expectedKey = `feature-flags-atl.anonId`;
      setLocalStorage(errorLocalStorage);

      const anonymousId = chance.string();
      Storage.setAnonymousId(anonymousId);
      expect(errorLocalStorage.setItem).toHaveBeenCalledTimes(1);
      expect(errorLocalStorage.setItem).toHaveBeenCalledWith(
        expectedKey,
        anonymousId,
      );

      expect(Storage.getAnonymousId()).toBe(null);
      expect(errorLocalStorage.getItem).toHaveBeenCalledTimes(1);
      expect(errorLocalStorage.getItem).toHaveBeenCalledWith(expectedKey);
    });
  });

  describe('purgeStaleFlagState', () => {
    test('removes stale flagState', () => {
      const freshFlagState = { ...flagState, timestamp: Date.now() };
      const staleFlagState = {
        ...flagState,
        timestamp: Date.now() - FLAG_STATE_EXPIRY_PERIOD,
      };

      const oldStaleStorage1 = new Storage(env, product, apiKey, chance.user());
      oldStaleStorage1.setFlagsState(staleFlagState);

      const oldStaleStorage2 = new Storage(env, product, apiKey, chance.user());
      oldStaleStorage2.setFlagsState(staleFlagState);

      // Control state - this should not be removed
      const oldFreshStorage = new Storage(env, product, apiKey, chance.user());
      oldFreshStorage.setFlagsState(freshFlagState);

      // Control localStorage data - this should not be removed
      const controlLocalStorageData = chance.string();
      localStorage.setItem(controlLocalStorageData, controlLocalStorageData);

      storage.purgeStaleFlagState();

      expect(oldStaleStorage1.getFlagsState()).toEqual(null);
      expect(oldStaleStorage2.getFlagsState()).toEqual(null);
      expect(oldFreshStorage.getFlagsState()).toEqual(freshFlagState);
      expect(localStorage.getItem(controlLocalStorageData)).toEqual(
        controlLocalStorageData,
      );
    });

    test('does not remove the current users data', () => {
      const staleFlagState = {
        ...flagState,
        timestamp: Date.now() - FLAG_STATE_EXPIRY_PERIOD,
      };
      storage.setFlagsState(staleFlagState);
      storage.purgeStaleFlagState();
      expect(storage.getFlagsState()).toEqual(staleFlagState);
    });
  });

  describe('maintain status', () => {
    test('detects local storage available', () => {
      expect(Storage.getStorageStatus()).toEqual(ClientStorageState.AVAILABLE);
      expect(originalLocalStorage.setItem).toHaveBeenCalledWith(
        `${STORAGE_KEY_PREFIX}.storage.support`,
        'test_value',
      );
      expect(originalLocalStorage.getItem).toHaveBeenCalledWith(
        `${STORAGE_KEY_PREFIX}.storage.support`,
      );
      expect(originalLocalStorage.removeItem).toHaveBeenCalledWith(
        `${STORAGE_KEY_PREFIX}.storage.support`,
      );
    });

    test('correctly handles quota exceeded error', () => {
      const isQuotaExceededSpy = jest.spyOn(Storage, 'isQuotaExceeded');

      setLocalStorage(quotaFullLocalStorage('SOME_RANDOM_ERR'));
      storage.setFlagsState(featureFlagState);
      expect(isQuotaExceededSpy).toHaveNthReturnedWith(1, false);

      setLocalStorage(quotaFullLocalStorage('QUOTA_EXCEEDED_ERR'));
      storage.setFlagsState(featureFlagState);
      expect(isQuotaExceededSpy).toHaveNthReturnedWith(2, true);

      setLocalStorage(quotaFullLocalStorage('QuotaExceededError'));
      Storage.setAnonymousId('111111');
      expect(isQuotaExceededSpy).toHaveNthReturnedWith(3, true);

      setLocalStorage(quotaFullLocalStorage('NS_ERROR_DOM_QUOTA_REACHED'));
      Storage.setAnonymousId('222222');
      expect(isQuotaExceededSpy).toHaveNthReturnedWith(4, true);

      setLocalStorage(quotaFullLocalStorageIE8);
      storage.setFlagsState(featureFlagState);
      expect(isQuotaExceededSpy).toHaveNthReturnedWith(5, true);
    });

    test('updates global StorageExceedQuota when set item', () => {
      setLocalStorage(quotaFullLocalStorage('QUOTA_EXCEEDED_ERR'));
      storage.setFlagsState(featureFlagState);
      expect(Storage.getStorageStatus()).toEqual(ClientStorageState.FULL);

      setLocalStorage(originalLocalStorage);
      storage.setFlagsState(featureFlagState);
      expect(Storage.getStorageStatus()).toEqual(ClientStorageState.AVAILABLE);
    });

    test('detects local storage not available', () => {
      setLocalStorage(errorLocalStorage);
      expect(Storage.getStorageStatus()).toEqual(
        ClientStorageState.NOT_AVAILABLE,
      );

      setLocalStorage(undefined);
      expect(Storage.getStorageStatus()).toEqual(
        ClientStorageState.NOT_AVAILABLE,
      );
    });

    test('detects local storage error', () => {
      setLocalStorage(inconsistentLocalStorage);
      expect(Storage.getStorageStatus()).toEqual(ClientStorageState.ERRORED);
    });

    test('detects local storage full on spot', () => {
      setLocalStorage(quotaFullLocalStorage('QUOTA_EXCEEDED_ERR'));
      expect(Storage.getStorageStatus()).toEqual(ClientStorageState.FULL);
    });

    test('detects local storage full by previous set item failure', () => {
      setLocalStorage(quotaFullLocalStorage('QUOTA_EXCEEDED_ERR'));
      storage.setFlagsState(featureFlagState);
      expect(Storage.getStorageStatus()).toEqual(ClientStorageState.FULL);
    });
  });
});
