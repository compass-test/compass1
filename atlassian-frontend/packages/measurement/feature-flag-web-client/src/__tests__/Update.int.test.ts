import '../testUtil/jestConfigReset.helper';

import nock from 'nock';

import Client from '../core';
import { CURRENT_FFS_API_VERSION } from '../core/constants';
import { READY_CACHE, READY_FETCH } from '../core/Ready';
import Refresh, { SCHEDULER_OPTIONS_DEFAULT } from '../core/Refresh';
import Fetcher from '../fetcher';
import {
  ClientCauseReason,
  ClientStorageState,
  ClientUserState,
  ClientVisibilityState,
  FeatureFlagRequest,
} from '../fetcher/types';
import { EnvironmentType, FeatureFlagUser } from '../index';
import Storage from '../storage';
import generateChance, {
  mockGlobalMath,
  restoreGlobalMath,
} from '../testUtil/chance';
import {
  addFlagResponse,
  deleteFlagResponse,
  featureFlagState,
  fullFlagResponse,
  minFlagResponse,
  modifyFlagResponse,
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
import hashObject from '../util/hash';
import { version } from '../util/version';

// @ts-ignore Override the mock fetch with whatwg-fetch
fetch.dontMock();

describe('Update integration', () => {
  const chance = generateChance('Update');
  let client: Client;
  let apiKey: string;
  let user: FeatureFlagUser;
  let productKey: string;
  let environment: EnvironmentType;
  let storageKey: string;
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    apiKey = chance.string();
    user = chance.user();
    productKey = chance.string();
    environment = chance.environment();
    // prettier-ignore
    storageKey = `feature-flags-atl.${CURRENT_FFS_API_VERSION}.flags.${environment}.${productKey}.${apiKey}.${hashObject(
      user
    )}`;
    jest.useFakeTimers();
    fetchSpy = jest.spyOn(Fetcher.prototype as any, 'fetchFeatureFlags');

    // set some data in localstorage so we can bootstrap client with less mocking requests
    localStorage.setItem(storageKey, JSON.stringify(featureFlagState));
    // prettier-ignore
    jest
      .spyOn(Storage, 'getStorageStatus')
      .mockReturnValue(ClientStorageState.AVAILABLE);

    mockGlobalMath(chance);
    mockServerCorsOptions();

    // Invalidates the localstorage cache and forces a fetch request to refresh flags
    advanceBy(SCHEDULER_OPTIONS_DEFAULT.interval);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    // don't reset all mocks https://github.com/clarkbw/jest-localstorage-mock/issues/83
    // it will reset localstorage mockImplementation
    // jest.resetAllMocks()
    localStorage.clear();
    nock.abortPendingRequests();
    nock.cleanAll();
    clearDateMock();
    restoreGlobalMath();
  });

  describe('client handles tab hidden/unhidden event and continue polling', () => {
    beforeEach(() => {
      createClient(apiKey, user, productKey, environment);
    });

    test('keep polling with longer interval after tab become hidden', async () => {
      const scope200 = mockServer200(fullFlagResponse);
      await waitForFetch(fetchSpy, 0);
      scope200.done();

      (Refresh as any).isTabHidden = jest.fn().mockReturnValue(true);
      document.dispatchEvent(new Event('visibilitychange'));

      // after a normal interval passed, no fetch should be called because tab is hidden
      advanceBy(SCHEDULER_OPTIONS_DEFAULT.interval);
      jest.advanceTimersByTime(SCHEDULER_OPTIONS_DEFAULT.interval);
      expect(() => {
        waitForFetch(fetchSpy, 1);
      }).toThrow();

      // after a long interval passed, fetch should be called
      // prettier-ignore
      advanceBy(
        SCHEDULER_OPTIONS_DEFAULT.interval *
          (SCHEDULER_OPTIONS_DEFAULT.tabHiddenPollingFactor - 1),
      );
      jest.advanceTimersByTime(
        SCHEDULER_OPTIONS_DEFAULT.interval *
          (SCHEDULER_OPTIONS_DEFAULT.tabHiddenPollingFactor - 1),
      );
      const scopeNext200 = mockServer200(fullFlagResponse);
      await waitForFetch(fetchSpy, 1);
      scopeNext200.done();
    });

    test('instantly do a fetch when data is out of date after tab become unhidden', async () => {
      const scope200 = mockServer200(fullFlagResponse);
      await waitForFetch(fetchSpy, 0);
      scope200.done();

      (Refresh as any).isTabHidden = jest.fn().mockReturnValue(true);
      document.dispatchEvent(new Event('visibilitychange'));

      // after a normal interval passed, no fetch should be called because tab is hidden
      advanceBy(SCHEDULER_OPTIONS_DEFAULT.interval);
      jest.advanceTimersByTime(SCHEDULER_OPTIONS_DEFAULT.interval);
      expect(() => {
        waitForFetch(fetchSpy, 1);
      }).toThrow();

      (Refresh as any).isTabHidden = jest.fn().mockReturnValue(false);
      document.dispatchEvent(new Event('visibilitychange'));

      // tab is switched back to active, instantly do a fetch
      const scopeNext200 = mockServer200(fullFlagResponse);
      await waitForFetch(fetchSpy, 1);
      scopeNext200.done();
    });

    test('switch back to shorter polling period after tab become unhidden', async () => {
      const scope200 = mockServer200(fullFlagResponse);
      await waitForFetch(fetchSpy, 0);
      expect(() => {
        waitForFetch(fetchSpy, 0);
      }).not.toThrow();
      scope200.done();

      (Refresh as any).isTabHidden = jest.fn().mockReturnValue(true);
      document.dispatchEvent(new Event('visibilitychange'));

      advanceBy(SCHEDULER_OPTIONS_DEFAULT.interval / 2);
      jest.advanceTimersByTime(SCHEDULER_OPTIONS_DEFAULT.interval / 2);

      // tab is back to active but data is not out of date,
      // should schedule a fetch in SCHEDULER_OPTIONS_DEFAULT.interval seconds
      (Refresh as any).isTabHidden = jest.fn().mockReturnValue(false);
      document.dispatchEvent(new Event('visibilitychange'));

      advanceBy(SCHEDULER_OPTIONS_DEFAULT.interval);
      jest.advanceTimersByTime(SCHEDULER_OPTIONS_DEFAULT.interval);

      const scopeNext200 = mockServer200(fullFlagResponse);
      await waitForFetch(fetchSpy, 1);
      scopeNext200.done();
      expect(() => {
        waitForFetch(fetchSpy, 1);
      }).not.toThrow();
    });
  });

  describe('client constantly check flag updates', () => {
    test('handle retryable error, schedule fetch and can get flag', async () => {
      client = createClient(apiKey, user, productKey, environment);
      await expect(client.ready()).resolves.toBe(READY_CACHE);

      const scope429 = mockServer4xx(429);
      await expect(waitForFetch(fetchSpy)).rejects.toThrow(serverError4xx(429));
      scope429.done();

      const scope200 = mockServer200(fullFlagResponse);
      jest.runOnlyPendingTimers();

      await waitForFetch(fetchSpy, 1);
      scope200.done();

      // getting flag value (deleted)
      const flagString = client.getFlagValue('flagString', 'off');
      expect(flagString).toEqual('off');

      // getting flag value (deleted)
      const flagObjStale = client.getFlagValue('flagObj', {});
      expect(flagObjStale).toEqual({});

      // getting flag value (added)
      const flagNumber = client.getFlagValue('flagNumber', 100);
      expect(flagNumber).toEqual(1);

      // getting flag value (added)
      const flagBool = client.getFlagValue('flagBool', false);
      expect(flagBool).toEqual(true);

      // storage updated correctly
      expect(localStorage.setItem).toHaveBeenCalledTimes(3);
      expect(localStorage.__STORE__[storageKey]).not.toBeUndefined();
      const flagState = JSON.parse(localStorage.__STORE__[storageKey]);
      expect(flagState.timestamp).toEqual(Date.now());
      expect(flagState.version).toEqual(fullFlagResponse.versionData);
      expect(flagState.flags.flagString).toBeUndefined();
      expect(flagState.flags.flagObj).toBeUndefined();
    });

    test('handle non-retryable error, not schedule but can get stale flag', async () => {
      client = createClient(apiKey, user, productKey, environment);
      await expect(client.ready()).resolves.toBe(READY_CACHE);

      const scope401 = mockServer4xx(401);
      await expect(waitForFetch(fetchSpy)).rejects.toThrow(serverError4xx(401));
      scope401.done();

      const scope200 = mockServer200(fullFlagResponse);
      jest.runOnlyPendingTimers();

      // no retry happen
      expect(scope200.isDone()).toEqual(false);

      // getting flag value (stale)
      const flagString = client.getFlagValue('flagString', 'off');
      expect(flagString).toEqual('on');

      // getting flag value (stale)
      const flagObjStale = client.getFlagValue('flagObj', {});
      expect(flagObjStale).toEqual({
        english: 'on',
        'non-english': 'off',
      });
    });

    test('handle retryable error 400, schedule fetch and can get flag', async () => {
      client = createClient(apiKey, user, productKey, environment);
      await expect(client.ready()).resolves.toBe(READY_CACHE);

      const scope400 = mockServer4xx(400);
      await expect(waitForFetch(fetchSpy)).rejects.toThrow(serverError4xx(400));
      scope400.done();

      const scope200 = mockServer200(fullFlagResponse);
      jest.advanceTimersByTime(0);
      await waitForFetch(fetchSpy, 1);
      scope200.done();

      // getting flag value (deleted)
      const flagString = client.getFlagValue('flagString', 'off');
      expect(flagString).toEqual('off');

      // getting flag value (deleted)
      const flagObjStale = client.getFlagValue('flagObj', {});
      expect(flagObjStale).toEqual({});

      // getting flag value (added)
      const flagNumber = client.getFlagValue('flagNumber', 100);
      expect(flagNumber).toEqual(1);

      // getting flag value (added)
      const flagBool = client.getFlagValue('flagBool', false);
      expect(flagBool).toEqual(true);

      // storage updated correctly
      expect(localStorage.setItem).toHaveBeenCalledTimes(3);
      expect(localStorage.__STORE__[storageKey]).not.toBeUndefined();
      const flagState = JSON.parse(localStorage.__STORE__[storageKey]);
      expect(flagState.timestamp).toEqual(Date.now());
      expect(flagState.version).toEqual(fullFlagResponse.versionData);
      expect(flagState.flags.flagString).toBeUndefined();
      expect(flagState.flags.flagObj).toBeUndefined();
    });

    test('handle non-retryable 400 error, not schedule but can get stale flag', async () => {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ ...featureFlagState, version: undefined }),
      );
      client = createClient(apiKey, user, productKey, environment);
      await expect(client.ready()).resolves.toBe(READY_CACHE);

      const scope400 = mockServer4xx(400);
      await expect(waitForFetch(fetchSpy)).rejects.toThrow(serverError4xx(400));
      scope400.done();

      const scope200 = mockServer200(fullFlagResponse);
      jest.runOnlyPendingTimers();

      // no retry happen
      expect(scope200.isDone()).toEqual(false);

      // getting flag value (stale)
      const flagString = client.getFlagValue('flagString', 'off');
      expect(flagString).toEqual('on');

      // getting flag value (stale)
      const flagObjStale = client.getFlagValue('flagObj', {});
      expect(flagObjStale).toEqual({
        english: 'on',
        'non-english': 'off',
      });
    });
  });

  describe('client correctly receives and handles flag updates', () => {
    test('some flags updated, update internal and storage state, can get flag', async () => {
      mockServer200(modifyFlagResponse);
      client = createClient(apiKey, user, productKey, environment);

      // getting flag value (stale)
      let flagString = client.getFlagValue('flagString', 'off');
      expect(flagString).toEqual('on');

      // getting flag value (stale)
      let flagObjStale = client.getFlagValue('flagObj', {});
      expect(flagObjStale).toEqual({
        english: 'on',
        'non-english': 'off',
      });

      await waitForFetch(fetchSpy);
      await expect(client.ready()).resolves.toBe(READY_CACHE);

      // getting flag value (updated)
      flagString = client.getFlagValue('flagString', 'off');
      expect(flagString).toEqual('off');

      // getting flag value (updated)
      flagObjStale = client.getFlagValue('flagObj', {});
      expect(flagObjStale).toEqual({
        english: 'skip',
        'non-english': 'skip',
      });

      // storage updated correctly
      expect(localStorage.setItem).toHaveBeenCalledTimes(3);
      expect(localStorage.__STORE__[storageKey]).not.toBeUndefined();
      const flagState = JSON.parse(localStorage.__STORE__[storageKey]);
      expect(flagState.timestamp).toEqual(Date.now());
      expect(flagState.version).toEqual(modifyFlagResponse.versionData);
      expect(flagState.flags.flagString.value).toEqual('off');
      expect(flagState.flags.flagObj.value).toEqual({
        english: 'skip',
        'non-english': 'skip',
      });
    });

    test('some flags added, update internal and storage state, can get flag', async () => {
      mockServer200(addFlagResponse);
      client = createClient(apiKey, user, productKey, environment);

      // getting default flag value (not exist)
      let flagNumber = client.getFlagValue('flagNumber', 100);
      expect(flagNumber).toEqual(100);

      await waitForFetch(fetchSpy);
      await expect(client.ready()).resolves.toBe(READY_CACHE);

      // getting flag value (added)
      flagNumber = client.getFlagValue('flagNumber', 100);
      expect(flagNumber).toEqual(1);

      // storage updated correctly
      expect(localStorage.setItem).toHaveBeenCalledTimes(3);
      expect(localStorage.__STORE__[storageKey]).not.toBeUndefined();
      const flagState = JSON.parse(localStorage.__STORE__[storageKey]);
      expect(flagState.timestamp).toEqual(Date.now());
      expect(flagState.version).toEqual(addFlagResponse.versionData);
      expect(flagState.flags.flagString.value).toEqual('on');
      expect(flagState.flags.flagObj.value).toEqual({
        english: 'on',
        'non-english': 'off',
      });
      expect(flagState.flags.flagNumber.value).toEqual(1);
    });

    test('some flags deleted, update internal and storage state, can get flag', async () => {
      mockServer200(deleteFlagResponse);
      client = createClient(apiKey, user, productKey, environment);

      // getting flag value (stale)
      let flagString = client.getFlagValue('flagString', 'off');
      expect(flagString).toEqual('on');

      // getting flag value (stale)
      let flagObjStale = client.getFlagValue('flagObj', {});
      expect(flagObjStale).toEqual({
        english: 'on',
        'non-english': 'off',
      });

      await waitForFetch(fetchSpy);
      await expect(client.ready()).resolves.toBe(READY_CACHE);

      // getting flag value (deleted)
      flagString = client.getFlagValue('flagString', 'off');
      expect(flagString).toEqual('off');

      // getting flag value (deleted)
      flagObjStale = client.getFlagValue('flagObj', {});
      expect(flagObjStale).toEqual({});

      // storage updated correctly
      expect(localStorage.setItem).toHaveBeenCalledTimes(3);
      expect(localStorage.__STORE__[storageKey]).not.toBeUndefined();
      const flagState = JSON.parse(localStorage.__STORE__[storageKey]);
      expect(flagState.timestamp).toEqual(Date.now());
      expect(flagState.version).toEqual(deleteFlagResponse.versionData);
      expect(flagState.flags.flagString).toBeUndefined();
      expect(flagState.flags.flagObj).toBeUndefined();
    });

    test('no flags change, update latest updated timestamp, can get flag', async () => {
      mockServer200(minFlagResponse);
      client = createClient(apiKey, user, productKey, environment);

      // getting flag value (stale)
      let flagString = client.getFlagValue('flagString', 'off');
      expect(flagString).toEqual('on');

      // getting flag value (stale)
      let flagObjStale = client.getFlagValue('flagObj', {});
      expect(flagObjStale).toEqual({
        english: 'on',
        'non-english': 'off',
      });

      await waitForFetch(fetchSpy);
      await expect(client.ready()).resolves.toBe(READY_CACHE);

      // getting flag value (refreshed)
      flagString = client.getFlagValue('flagString', 'off');
      expect(flagString).toEqual('on');

      // getting flag value (refreshed)
      flagObjStale = client.getFlagValue('flagObj', {});
      expect(flagObjStale).toEqual({
        english: 'on',
        'non-english': 'off',
      });

      // storage updated correctly
      expect(localStorage.setItem).toHaveBeenCalledTimes(3);
      expect(localStorage.__STORE__[storageKey]).not.toBeUndefined();
      const flagState = JSON.parse(localStorage.__STORE__[storageKey]);
      expect(flagState.timestamp).toEqual(Date.now());
      expect(flagState.version).toEqual(featureFlagState.version);
      expect(flagState.flags.flagString.value).toEqual('on');
      expect(flagState.flags.flagObj.value).toEqual({
        english: 'on',
        'non-english': 'off',
      });
    });
  });

  describe('metadata', () => {
    beforeEach(() => {
      jest.spyOn(global.Date, 'now').mockRestore();
      jest.spyOn(Storage, 'getStorageStatus').mockRestore();
    });

    test('sent with flag request, on init and poll', async () => {
      const requestBodyCallback = jest.fn();
      const scope = mockServer200(fullFlagResponse, requestBodyCallback);
      client = createClient(apiKey, user, productKey, environment);

      await waitForFetch(fetchSpy);
      await expect(client.ready()).resolves.toBe(READY_CACHE);
      scope.done();

      expect(
        (requestBodyCallback.mock.calls[0][0] as FeatureFlagRequest).metadata,
      ).toEqual({
        client: {
          name: 'feature-flag-web-client',
          version,
        },
        config: {
          pollingSeconds: 300,
        },
        state: {
          visibility: ClientVisibilityState.VISIBLE,
          cause: ClientCauseReason.INITIALIZATION,
          storage: ClientStorageState.AVAILABLE,
          userContext: ClientUserState.SAME,
        },
      });

      const scope1 = mockServer200(fullFlagResponse, requestBodyCallback);
      advanceBy(SCHEDULER_OPTIONS_DEFAULT.interval);
      jest.runOnlyPendingTimers();
      await waitForFetch(fetchSpy, 1);
      scope1.done();

      expect(
        (requestBodyCallback.mock.calls[1][0] as FeatureFlagRequest).metadata
          ?.state,
      ).toEqual({
        visibility: ClientVisibilityState.VISIBLE,
        cause: ClientCauseReason.POLLING,
        storage: ClientStorageState.AVAILABLE,
        userContext: ClientUserState.SAME,
      });
    });

    test('sent with flag request, for new and switched user', async () => {
      // WARNING
      // this test breaks localstorage by mockImplementation getItem from now on (for the current test file)
      // note the localstorage can't be mockRestore due to https://github.com/clarkbw/jest-localstorage-mock/issues/83
      // so it has to be the last test of this file
      const requestBodyCallback = jest.fn();
      const scope = mockServer200(fullFlagResponse, requestBodyCallback);
      client = createClient(apiKey, chance.user(), productKey, environment);

      await waitForFetch(fetchSpy);
      await expect(client.ready()).resolves.toBe(READY_FETCH);
      scope.done();

      expect(
        (requestBodyCallback.mock.calls[0][0] as FeatureFlagRequest).metadata
          ?.state,
      ).toEqual({
        visibility: ClientVisibilityState.VISIBLE,
        cause: ClientCauseReason.INITIALIZATION,
        storage: ClientStorageState.AVAILABLE,
        userContext: ClientUserState.NEW,
      });

      const scope1 = mockServer200(fullFlagResponse, requestBodyCallback);
      advanceBy(SCHEDULER_OPTIONS_DEFAULT.interval);
      jest.runOnlyPendingTimers();
      await waitForFetch(fetchSpy, 1);
      scope1.done();

      expect(
        (requestBodyCallback.mock.calls[1][0] as FeatureFlagRequest).metadata
          ?.state,
      ).toEqual({
        visibility: ClientVisibilityState.VISIBLE,
        cause: ClientCauseReason.POLLING,
        storage: ClientStorageState.AVAILABLE,
        userContext: ClientUserState.SAME,
      });

      const scope2 = mockServer200(fullFlagResponse, requestBodyCallback);
      jest.spyOn(localStorage, 'getItem').mockReturnValue('{}');
      const ready = client.updateFeatureFlagUser(chance.user());
      await waitForFetch(fetchSpy, 2);
      await expect(ready).resolves.toBe(READY_CACHE);
      scope2.done();

      expect(
        (requestBodyCallback.mock.calls[2][0] as FeatureFlagRequest).metadata
          ?.state,
      ).toEqual({
        visibility: ClientVisibilityState.VISIBLE,
        cause: ClientCauseReason.INITIALIZATION,
        storage: ClientStorageState.ERRORED,
        userContext: ClientUserState.SWITCHED,
      });
    });
  });
});
