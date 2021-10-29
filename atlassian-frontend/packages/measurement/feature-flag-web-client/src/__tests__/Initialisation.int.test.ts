import '../testUtil/jestConfigReset.helper';

import nock from 'nock';

import { FeatureFlagUserWithIdentifier, ReadyReason } from '../api/types';
import Client from '../core';
import { STORAGE_PURGE_TIMEOUT } from '../core/Client';
import { CURRENT_FFS_API_VERSION } from '../core/constants';
import { READY_CACHE, READY_FETCH } from '../core/Ready';
import { SCHEDULER_OPTIONS_DEFAULT } from '../core/Refresh';
import Fetcher from '../fetcher';
import {
  ClientCauseReason,
  ClientMetadata,
  ClientStorageState,
  ClientUserState,
  ClientVisibilityState,
} from '../fetcher/types';
import { EnvironmentType, FeatureFlagUser, Identifiers } from '../index';
import Storage from '../storage';
import { FLAG_STATE_EXPIRY_PERIOD } from '../storage/Storage';
import generateChance from '../testUtil/chance';
import {
  anonymousUser,
  featureFlagState,
  fullFlagResponse,
  updateUserFlagResponse,
  updateUserFlagState,
} from '../testUtil/mockData';
import { advanceBy, clear as clearDateMock } from '../testUtil/mockDateHelper';
import { createClient } from '../testUtil/mockGenerator';
import {
  mockServer200,
  mockServer4xx,
  mockServerCorsOptions,
  serverError4xx,
  waitForFetch,
} from '../testUtil/mockNetwork';
import hashUser from '../util/hash';

// @ts-ignore Override the mock fetch with whatwg-fetch
fetch.dontMock();

describe('Initialisation integration', () => {
  const chance = generateChance('Initialisation');
  let client: Client;
  let apiKey: string;
  let user: FeatureFlagUserWithIdentifier;
  let productKey: string;
  let environment: EnvironmentType;
  let storageKey: string;
  let lastUpdatedUserKey: string;
  let fetchSpy: jest.SpyInstance;
  let fetchMetadata: ClientMetadata;

  beforeEach(() => {
    apiKey = chance.string();
    user = chance.user();
    productKey = chance.string();
    environment = chance.environment();
    storageKey = `feature-flags-atl.${CURRENT_FFS_API_VERSION}.flags.${environment}.${productKey}.${apiKey}.${hashUser(
      user,
    )}`;
    lastUpdatedUserKey = `feature-flags-atl.${CURRENT_FFS_API_VERSION}.last-user.${environment}.${productKey}.${hashUser(
      { identifier: user.identifier },
    )}`;
    jest.useFakeTimers();
    fetchSpy = jest.spyOn(Fetcher.prototype as any, 'fetchFeatureFlags');
    jest
      .spyOn(Storage, 'getStorageStatus')
      .mockReturnValue(ClientStorageState.AVAILABLE);
    fetchMetadata = {
      client: {
        name: 'feature-flag-web-client',
        version: '0.0.0',
      },
      config: {
        pollingSeconds: 300,
      },
      state: {
        cause: ClientCauseReason.INITIALIZATION,
        storage: ClientStorageState.AVAILABLE,
        userContext: ClientUserState.NEW,
        visibility: ClientVisibilityState.VISIBLE,
      },
    };
    mockServerCorsOptions();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    // don't reset all mocks https://github.com/clarkbw/jest-localstorage-mock/issues/83
    // it will reset localstorage mockImplementation
    // jest.resetAllMocks()
    localStorage.clear();
    nock.abortPendingRequests();
    nock.cleanAll();
    clearDateMock();
  });

  describe('localstorage has NO flag state', () => {
    test('client init, failed fetch, it gets default flag', async () => {
      const scope = mockServer4xx(403);

      client = createClient(apiKey, user, productKey, environment);
      await expect(waitForFetch(fetchSpy)).rejects.toThrow(serverError4xx(403));
      scope.done();

      // getting default because of not exist
      const flagBool = client.getFlagValue('flagBool', false);
      expect(flagBool).toEqual(false);

      // getting default because of not exist
      const flagNumber = client.getFlagValue('flagNumber', 3);
      expect(flagNumber).toEqual(3);

      // getting default because of not exist
      const flagNotExist = client.getFlagValue('flagNotExist', 1);
      expect(flagNotExist).toEqual(1);
      expect((client as any).refresh.failureCount).toEqual(1);
    });

    test('client init, until fetch finish it gets default flag, can get flag afterwards', async () => {
      const startTime = Date.now();
      const scope = mockServer200(fullFlagResponse);
      client = createClient(apiKey, user, productKey, environment);

      // getting default because of not exist
      let flagBool = client.getFlagValue('flagBool', false);
      expect(flagBool).toEqual(false);

      // getting default because of not exist
      const flagNumber = client.getFlagValue('flagNumber', 3);
      expect(flagNumber).toEqual(3);

      // getting default because of not exist
      let flagNotExist = client.getFlagValue('flagNotExist', 1);
      expect(flagNotExist).toEqual(1);

      await waitForFetch(fetchSpy);
      await expect(client.ready()).resolves.toBe(READY_FETCH);
      scope.done();

      // getting flag value
      flagBool = client.getFlagValue('flagBool', false);
      expect(flagBool).toEqual(true);

      // getting default flag value because of invalid value
      const flagNumber1 = client.getFlagValue('flagNumber', 'string');
      expect(flagNumber1).toEqual('string');

      // getting default flag value because of not exist
      flagNotExist = client.getFlagValue('flagNotExist', 1);
      expect(flagNotExist).toEqual(1);

      // storage updated correctly
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);

      expect(localStorage.__STORE__[storageKey]).not.toBeUndefined();
      const flagState = JSON.parse(localStorage.__STORE__[storageKey]);
      expect(flagState.timestamp).toBeGreaterThanOrEqual(startTime);
      expect(flagState.version).toEqual(fullFlagResponse.versionData);
      expect(flagState.flags.flagBool.value).toEqual(true);
      expect(flagState.flags.flagNumber.value).toEqual(1);
      expect(flagState.flags.flagString).toBeUndefined();
      expect(flagState.flags.flagObj).toBeUndefined();
    });

    test('resolves ready when service returns with 400 response', async () => {
      const scope = mockServer4xx(400);
      client = createClient(apiKey, user, productKey, environment);
      await expect(client.ready()).resolves.toEqual({
        message:
          'Service returned bad request response code. The version data maybe malformed or out of sync with the server.',
        reason: ReadyReason.CLIENT_ERROR,
        serverResponse: '',
      });
      scope.done();
    });

    test('resolves ready when service returns with 401 response', async () => {
      const scope = mockServer4xx(401);
      client = createClient(apiKey, user, productKey, environment);
      await expect(client.ready()).resolves.toEqual({
        message:
          'Service returned unauthorized response code. Ensure that the API token is valid for this environment.',
        reason: ReadyReason.CLIENT_ERROR,
        serverResponse: '',
      });
      scope.done();
    });

    test('resolves ready when first request timeout then aborted, followed up second request success', async () => {
      mockServer200(fullFlagResponse, () => {}, 5000);
      client = createClient(apiKey, user, productKey, environment);
      jest.advanceTimersByTime(2000);
      await expect(waitForFetch(fetchSpy)).rejects.toThrow();
      jest.advanceTimersByTime(0);

      nock.abortPendingRequests();
      nock.cleanAll();
      mockServerCorsOptions();
      const scopeNext = mockServer200(fullFlagResponse);
      await waitForFetch(fetchSpy, 1);

      await expect(client.ready()).resolves.toEqual({
        reason: ReadyReason.FETCH,
      });
      scopeNext.done();
    });

    test('resolves ready when first request fail, followed up second request timeout and aborted', async () => {
      const scope = mockServer4xx(403);
      client = createClient(apiKey, user, productKey, environment);
      await expect(waitForFetch(fetchSpy)).rejects.toThrow();
      jest.advanceTimersByTime(0);
      scope.done();

      const scopeNext = mockServer200(fullFlagResponse, () => {}, 5000);
      jest.advanceTimersByTime(2000);
      await expect(client.ready()).resolves.toEqual({
        message: 'Request took too long to finish, client aborted the request.',
        reason: ReadyReason.CLIENT_ERROR,
      });
      expect(scopeNext.isDone()).toBe(false);
    });
  });

  describe('localstorage has flag state', () => {
    beforeEach(() => {
      localStorage.setItem(storageKey, JSON.stringify(featureFlagState));
      localStorage.setItem(
        lastUpdatedUserKey,
        JSON.stringify({
          value: storageKey,
          timestamp: Date.now(),
        }),
      );
    });

    test('client bootstrap from storage, able to get flag', async () => {
      const scope = mockServer200(fullFlagResponse);
      client = createClient(apiKey, user, productKey, environment);
      await expect(client.ready()).resolves.toBe(READY_CACHE);

      // getting flag value
      const flagString = client.getFlagValue('flagString', 'off');
      expect(flagString).toEqual('on');

      // getting default flag value because of invalid value
      const flagObj = client.getFlagValue('flagObj', 'string');
      expect(flagObj).toEqual('string');

      // getting default flag value because of not exist
      const flagNotExist = client.getFlagValue('flagNotExist', 1);
      expect(flagNotExist).toEqual(1);

      expect(scope.isDone()).toEqual(false);
    });

    test('client bootstrap from storage, fetch data because state is stale, able to get flag', async () => {
      const scope = mockServer200(fullFlagResponse);

      // fast forward time by 300000 millisecond so the localstorage data becomes stale
      advanceBy(SCHEDULER_OPTIONS_DEFAULT.interval);
      jest.advanceTimersByTime(SCHEDULER_OPTIONS_DEFAULT.interval);

      client = createClient(apiKey, user, productKey, environment);
      await expect(client.ready()).resolves.toBe(READY_CACHE);

      // getting default flag value because of not exist
      const flagBoolStale = client.getFlagValue('flagBool', false);
      expect(flagBoolStale).toEqual(false);

      // getting flag value (stale)
      const flagObjStale = client.getFlagValue('flagObj', {});
      expect(flagObjStale).toEqual({
        english: 'on',
        'non-english': 'off',
      });

      // getting default flag value because of not exist
      const flagNotExistStale = client.getFlagValue('flagNotExist', 1);
      expect(flagNotExistStale).toEqual(1);

      await waitForFetch(fetchSpy);
      await expect(client.ready()).resolves.toBe(READY_CACHE);
      scope.done();

      // getting flag value
      const flagBool = client.getFlagValue('flagBool', false);
      expect(flagBool).toEqual(true);

      // getting default flag value because of invalid value
      const flagObj = client.getFlagValue('flagObj', { default: 1 });
      expect(flagObj).toEqual({ default: 1 });

      // getting default flag value because of not exist
      const flagNotExist = client.getFlagValue('flagNotExist', 1);
      expect(flagNotExist).toEqual(1);

      // storage updated correctly
      expect(localStorage.setItem).toHaveBeenCalledTimes(4);
      expect(localStorage.__STORE__[storageKey]).not.toBeUndefined();
      const flagState = JSON.parse(localStorage.__STORE__[storageKey]);
      expect(flagState.timestamp).toEqual(Date.now());
      expect(flagState.version).toEqual(fullFlagResponse.versionData);
      expect(flagState.flags.flagBool.value).toEqual(true);
      expect(flagState.flags.flagNumber.value).toEqual(1);
      expect(flagState.flags.flagString).toBeUndefined();
      expect(flagState.flags.flagObj).toBeUndefined();
    });

    test('given client is being started with same identifier but new attributes, when initialising the client, then use old flags state and fetch new flags', async () => {
      const scope = mockServer200(fullFlagResponse);

      const updatedUser = chance.newUserWithSameIdentifier(user);
      const updatedStorageKey = `feature-flags-atl.${CURRENT_FFS_API_VERSION}.flags.${environment}.${productKey}.${apiKey}.${hashUser(
        updatedUser,
      )}`;

      // No cache is set for updated user
      client = createClient(apiKey, updatedUser, productKey, environment);
      await expect(client.ready()).resolves.toBe(READY_CACHE);

      // getting flag value (stale)
      const flagObjStale = client.getFlagValue('flagObj', {});
      expect(flagObjStale).toEqual({
        english: 'on',
        'non-english': 'off',
      });

      await waitForFetch(fetchSpy);
      scope.done();

      // The versionData must be undefined otherwise
      expect(fetchSpy).toHaveBeenCalledWith(
        updatedUser,
        fetchMetadata,
        undefined,
      );

      // getting flag value
      const flagBool = client.getFlagValue('flagBool', false);
      expect(flagBool).toEqual(true);

      // getting default flag value because of invalid value
      const flagObj = client.getFlagValue('flagObj', { default: 1 });
      expect(flagObj).toEqual({ default: 1 });

      // getting default flag value because of not exist
      const flagNotExist = client.getFlagValue('flagNotExist', 1);
      expect(flagNotExist).toEqual(1);

      // storage updated correctly
      expect(localStorage.setItem).toHaveBeenCalledTimes(4);
      expect(localStorage.__STORE__[updatedStorageKey]).not.toBeUndefined();
      const flagState = JSON.parse(localStorage.__STORE__[updatedStorageKey]);
      expect(flagState.timestamp).toEqual(Date.now());
      expect(flagState.version).toEqual(fullFlagResponse.versionData);
      expect(flagState.flags.flagBool.value).toEqual(true);
      expect(flagState.flags.flagNumber.value).toEqual(1);
      expect(flagState.flags.flagString).toBeUndefined();
      expect(flagState.flags.flagObj).toBeUndefined();

      const lastUpdatedUserState = JSON.parse(
        localStorage.__STORE__[lastUpdatedUserKey],
      );
      expect(lastUpdatedUserState.value).toEqual(updatedStorageKey);
      expect(lastUpdatedUserState.timestamp).toEqual(Date.now());
    });
  });

  describe('update user context', () => {
    let switchedUser: FeatureFlagUser;
    let switchedUserStorageKey: string;

    beforeEach(() => {
      localStorage.setItem(storageKey, JSON.stringify(featureFlagState));
      switchedUser = chance.user();
      switchedUserStorageKey = `feature-flags-atl.${CURRENT_FFS_API_VERSION}.flags.${environment}.${productKey}.${apiKey}.${hashUser(
        switchedUser,
      )}`;
      localStorage.setItem(
        switchedUserStorageKey,
        JSON.stringify(updateUserFlagState),
      );
      jest.clearAllMocks();
    });

    test('client ready, switch to a fresh new user, can get flags', async () => {
      localStorage.removeItem(switchedUserStorageKey);
      const scope = mockServer200(updateUserFlagResponse);
      client = createClient(apiKey, user, productKey, environment);

      // Test
      const ready = client.updateFeatureFlagUser(switchedUser);
      await waitForFetch(fetchSpy);
      await expect(ready).resolves.toBe(READY_FETCH);
      scope.done();

      // get flag added from last update
      const someOtherFlagNameWithNoReason = client.getFlagValue(
        'someOtherFlagNameWithNoReason',
        'off',
      );
      expect(someOtherFlagNameWithNoReason).toEqual('on');

      // check flag is removed from last attempt
      const flagStringNoReason = client.getFlagValue(
        'flagStringNoReason',
        'off',
      );
      expect(flagStringNoReason).toEqual('off');

      // storage updated correctly
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
      expect(
        localStorage.__STORE__[switchedUserStorageKey],
      ).not.toBeUndefined();
      const flagState = JSON.parse(
        localStorage.__STORE__[switchedUserStorageKey],
      );
      expect(flagState.timestamp).toBeGreaterThanOrEqual(
        updateUserFlagState.timestamp,
      );
      expect(flagState.version).toEqual(updateUserFlagResponse.versionData);
      expect(flagState.flags).toEqual(updateUserFlagState.flags);
      // Test flags in memory represents what we should expect
      expect(client.getFlags()).toEqual(updateUserFlagState.flags);
    });

    test('client ready, switch to an existing user with fresh cache, can get flags', async () => {
      client = createClient(apiKey, user, productKey, environment);

      // Test
      const ready = client.updateFeatureFlagUser(switchedUser);
      await expect(ready).resolves.toBe(READY_CACHE);

      // getting flag value
      const flagString = client.getFlagValue(
        'someOtherFlagNameWithNoReason',
        'off',
      );
      expect(flagString).toEqual('on');

      // check flag is removed from last attempt
      const flagStringNoReason = client.getFlagValue(
        'flagStringNoReason',
        'off',
      );
      expect(flagStringNoReason).toEqual('off');

      // storage updated correctly
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
      // Test flags in memory represents what we should expect
      expect(client.getFlags()).toEqual(updateUserFlagState.flags);
    });

    test('client ready, switch to an existing user with stale cache, can get flags', async () => {
      client = createClient(apiKey, user, productKey, environment);
      advanceBy(SCHEDULER_OPTIONS_DEFAULT.interval);
      const scope = mockServer200(fullFlagResponse);

      // Test
      const ready = client.updateFeatureFlagUser(switchedUser);
      await waitForFetch(fetchSpy);
      await expect(ready).resolves.toBe(READY_CACHE);
      scope.done();

      // getting flag value
      const flagBool = client.getFlagValue('flagBool', false);
      expect(flagBool).toEqual(true);

      // getting default flag value because of not exist
      const flagNotExist = client.getFlagValue('flagNotExist', 1);
      expect(flagNotExist).toEqual(1);

      // storage updated correctly
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
      expect(
        localStorage.__STORE__[switchedUserStorageKey],
      ).not.toBeUndefined();
      const flagState = JSON.parse(
        localStorage.__STORE__[switchedUserStorageKey],
      );
      expect(flagState.timestamp).toBeGreaterThan(featureFlagState.timestamp);
      expect(flagState.version).toEqual(fullFlagResponse.versionData);
      expect(flagState.flags.flagBool.value).toEqual(true);
      expect(flagState.flags.flagNumber.value).toEqual(1);
      expect(flagState.flags.flagString).toBeUndefined();
      expect(flagState.flags.flagObj).toBeUndefined();
    });

    test('client ready, switch to identical user, can get flags', async () => {
      client = createClient(apiKey, user, productKey, environment);

      // Test
      const ready = client.updateFeatureFlagUser(user);
      await expect(ready).resolves.toBe(READY_CACHE);

      // getting flag value
      const flagString = client.getFlagValue('flagString', 'default');
      expect(flagString).toEqual('on');

      // getting default flag value because of not exist
      const flagNotExist = client.getFlagValue('flagNotExist', 1);
      expect(flagNotExist).toEqual(1);

      // storage updated correctly
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });

    test('client ready resolves when switching user causes 400 response', async () => {
      const scope = mockServer4xx(400);
      client = createClient(apiKey, user, productKey, environment);
      const ready = client.updateFeatureFlagUser(chance.user());

      await expect(ready).resolves.toEqual({
        message:
          'Service returned bad request response code. The version data maybe malformed or out of sync with the server.',
        reason: ReadyReason.CLIENT_ERROR,
        serverResponse: '',
      });
      scope.done();
    });

    test('client ready resolves when switching user causes 401 response', async () => {
      const scope = mockServer4xx(401);
      client = createClient(apiKey, user, productKey, environment);
      const ready = client.updateFeatureFlagUser(chance.user());

      await expect(ready).resolves.toEqual({
        message:
          'Service returned unauthorized response code. Ensure that the API token is valid for this environment.',
        reason: ReadyReason.CLIENT_ERROR,
        serverResponse: '',
      });
      scope.done();
    });
  });

  describe('anonymous user', () => {
    test('generates anonymous identifier if none provided', async () => {
      const requestBodyCallback = jest.fn();
      const scope = mockServer200(fullFlagResponse, requestBodyCallback);

      client = createClient(apiKey, anonymousUser, productKey, environment);
      await waitForFetch(fetchSpy);
      await expect(client.ready()).resolves.toBe(READY_FETCH);
      scope.done();

      const anonymousId = Storage.getAnonymousId();
      expect(anonymousId).toBeTruthy();
      expect(requestBodyCallback.mock.calls[0][0].identifier).toEqual({
        type: Identifiers.FF_CLIENT_ANONYMOUS_ID,
        value: anonymousId,
      });
    });

    test('reuses anonymous identifier if already saved', async () => {
      const scope1 = mockServer200(fullFlagResponse);
      const client1 = createClient(
        apiKey,
        anonymousUser,
        productKey,
        environment,
      );
      await waitForFetch(fetchSpy);
      await expect(client1.ready()).resolves.toBe(READY_FETCH);
      scope1.done();

      const firstAnonymousId = Storage.getAnonymousId();
      client1.destroy();

      const requestBodyCallback = jest.fn();
      const scope2 = mockServer200(fullFlagResponse, requestBodyCallback);
      const client2 = createClient(
        apiKey,
        anonymousUser,
        productKey,
        environment,
      );

      advanceBy(SCHEDULER_OPTIONS_DEFAULT.interval);
      jest.advanceTimersByTime(SCHEDULER_OPTIONS_DEFAULT.interval);
      await waitForFetch(fetchSpy, 1);
      await expect(client2.ready()).resolves.toBe(READY_CACHE);
      scope2.done();

      expect(firstAnonymousId).toEqual(Storage.getAnonymousId());
      expect(requestBodyCallback.mock.calls[0][0].identifier).toEqual({
        type: Identifiers.FF_CLIENT_ANONYMOUS_ID,
        value: firstAnonymousId,
      });
    });

    test('does not generate anonymous identifier if provided', async () => {
      const identifier = {
        type: Identifiers.FF_CLIENT_ANONYMOUS_ID,
        value: chance.string(),
      };
      const anonymousUserWithIdentifier = { ...anonymousUser, identifier };

      const requestBodyCallback = jest.fn();
      const scope = mockServer200(fullFlagResponse, requestBodyCallback);
      client = createClient(
        apiKey,
        anonymousUserWithIdentifier,
        productKey,
        environment,
      );
      await waitForFetch(fetchSpy);
      scope.done();

      expect(Storage.getAnonymousId()).toBeNull();
      expect(requestBodyCallback.mock.calls[0][0].identifier).toEqual(
        identifier,
      );
    });
  });

  describe('storage', () => {
    test('purges old flag state', async () => {
      // Load up the client once to set localStorage data
      const scope1 = mockServer200(fullFlagResponse);
      const client1 = createClient(apiKey, user, productKey, environment);
      await expect(client1.ready()).resolves.toBe(READY_FETCH);
      await waitForFetch(fetchSpy);

      scope1.done();
      client1.destroy();

      expect(localStorage.getItem(storageKey)).not.toBeNull();

      advanceBy(FLAG_STATE_EXPIRY_PERIOD);
      jest.advanceTimersByTime(FLAG_STATE_EXPIRY_PERIOD);

      // Load up the client a second time but this time with a different user
      const scope2 = mockServer200(fullFlagResponse);
      const client2 = createClient(
        apiKey,
        chance.user(),
        productKey,
        environment,
      );
      await expect(client2.ready()).resolves.toBe(READY_FETCH);
      await waitForFetch(fetchSpy, 1);

      jest.advanceTimersByTime(STORAGE_PURGE_TIMEOUT);

      scope2.done();
      client2.destroy();

      // Should have deleted old flag state
      expect(localStorage.getItem(storageKey)).toBeNull();
    });

    test('purges old user keys', async () => {
      // Load up the client once to set localStorage data
      const scope1 = mockServer200(fullFlagResponse);
      const client1 = createClient(apiKey, user, productKey, environment);
      await expect(client1.ready()).resolves.toBe(READY_FETCH);
      await waitForFetch(fetchSpy);

      scope1.done();
      client1.destroy();

      expect(localStorage.getItem(storageKey)).not.toBeNull();

      advanceBy(FLAG_STATE_EXPIRY_PERIOD);
      jest.advanceTimersByTime(FLAG_STATE_EXPIRY_PERIOD);

      // Load up the client a second time but this time with a different user
      const scope2 = mockServer200(fullFlagResponse);
      const client2 = createClient(
        apiKey,
        chance.user(),
        productKey,
        environment,
      );
      await expect(client2.ready()).resolves.toBe(READY_FETCH);
      await waitForFetch(fetchSpy, 1);

      jest.advanceTimersByTime(STORAGE_PURGE_TIMEOUT);

      scope2.done();
      client2.destroy();

      // Should have deleted old flag state
      expect(localStorage.getItem(lastUpdatedUserKey)).toBeNull();
    });
  });
});
