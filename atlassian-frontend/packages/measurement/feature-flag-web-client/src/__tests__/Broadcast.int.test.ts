import '../testUtil/jestConfigReset.helper';

/* eslint-disable no-underscore-dangle */
import nock from 'nock';

import { CURRENT_FFS_API_VERSION } from '../core/constants';
import { READY_CACHE, READY_FETCH } from '../core/Ready';
import { SCHEDULER_OPTIONS_DEFAULT } from '../core/Refresh';
import Fetcher from '../fetcher';
import { ClientStorageState } from '../fetcher/types';
import { EnvironmentType, FeatureFlagUserWithIdentifier } from '../index';
import Storage from '../storage';
import FakeBroadcastChannel from '../testUtil/broadcastChannel';
import generateChance from '../testUtil/chance';
import {
  deleteFlagResponse,
  featureFlagState,
  fullFlagResponse,
  initialFlagResponse,
  modifyFlagResponse,
} from '../testUtil/mockData';
import { advanceBy, clear as clearDateMock } from '../testUtil/mockDateHelper';
import { createClient } from '../testUtil/mockGenerator';
import {
  mockServer200,
  mockServerCorsOptions,
  waitForFetch,
} from '../testUtil/mockNetwork';
import hashUser from '../util/hash';

// @ts-ignore Override the mock fetch with whatwg-fetch
fetch.dontMock();

describe('Broadcast integration', () => {
  const chance = generateChance('Broadcast');
  let apiKey: string;
  let user: FeatureFlagUserWithIdentifier;
  let productKey: string;
  let environment: EnvironmentType;
  let storageKey: string;
  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    apiKey = chance.string();
    user = chance.user();
    productKey = chance.string();
    environment = chance.environment();
    storageKey = `feature-flags-atl.${CURRENT_FFS_API_VERSION}.flags.${environment}.${productKey}.${apiKey}.${hashUser(
      user,
    )}`;
    jest.useFakeTimers();
    fetchSpy = jest.spyOn(Fetcher.prototype as any, 'fetchFeatureFlags');

    // set some data in localstorage so we can bootstrap client with less mocking requests
    localStorage.setItem(storageKey, JSON.stringify(featureFlagState));
    jest
      .spyOn(Storage, 'getStorageStatus')
      .mockReturnValue(ClientStorageState.AVAILABLE);
    (global as any).BroadcastChannel = FakeBroadcastChannel;
    mockServerCorsOptions();
    jest.clearAllMocks();
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
  });

  test('clients for same users, broadcast update', async () => {
    const scope = mockServer200(initialFlagResponse);
    user = chance.user();
    const client = createClient(apiKey, user, productKey, environment);

    await waitForFetch(fetchSpy);
    await expect(client.ready()).resolves.toBe(READY_FETCH);
    scope.done();
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);

    // forward time by 5 seconds to delay clientForSameUser init
    // so later only client perform poll, not clientForSameUser
    advanceBy(5000);
    jest.advanceTimersByTime(5000);

    const clientForSameUser = createClient(
      apiKey,
      user,
      productKey,
      environment,
    );
    await expect(clientForSameUser.ready()).resolves.toBe(READY_CACHE);

    // getting flag value (before update)
    let flagString = client.getFlagValue('flagString', 'default');
    expect(flagString).toEqual('on');
    flagString = clientForSameUser.getFlagValue('flagString', 'default');
    expect(flagString).toEqual('on');

    // getting flag value (before update)
    let flagObj = client.getFlagValue('flagObj', {});
    expect(flagObj).toEqual({
      english: 'on',
      'non-english': 'off',
    });
    flagObj = clientForSameUser.getFlagValue('flagObj', {});
    expect(flagObj).toEqual({
      english: 'on',
      'non-english': 'off',
    });

    const scope1 = mockServer200(modifyFlagResponse);
    advanceBy(SCHEDULER_OPTIONS_DEFAULT.interval - 5000);
    jest.advanceTimersByTime(SCHEDULER_OPTIONS_DEFAULT.interval - 5000);
    await waitForFetch(fetchSpy, 1);
    scope1.done();

    // getting flag value (updated)
    flagString = client.getFlagValue('flagString', 'default');
    expect(flagString).toEqual('off');
    flagString = clientForSameUser.getFlagValue('flagString', 'default');
    expect(flagString).toEqual('off');

    // getting flag value (updated)
    flagObj = client.getFlagValue('flagObj', {});
    expect(flagObj).toEqual({
      english: 'skip',
      'non-english': 'skip',
    });
    flagObj = clientForSameUser.getFlagValue('flagObj', {});
    expect(flagObj).toEqual({
      english: 'skip',
      'non-english': 'skip',
    });

    // storage updated correctly
    expect(localStorage.setItem).toHaveBeenCalledTimes(6);
    storageKey = `feature-flags-atl.${CURRENT_FFS_API_VERSION}.flags.${environment}.${productKey}.${apiKey}.${hashUser(
      user,
    )}`;
    expect(localStorage.__STORE__[storageKey]).not.toBeUndefined();
    const flagState = JSON.parse(localStorage.__STORE__[storageKey]);
    expect(flagState.version).toEqual(modifyFlagResponse.versionData);
    expect(flagState.flags.flagString.value).toEqual('off');
    expect(flagState.flags.flagObj.value).toEqual({
      english: 'skip',
      'non-english': 'skip',
    });
  });

  test('clients for different users, broadcast not affect each other', async () => {
    const client = createClient(apiKey, user, productKey, environment);
    await expect(client.ready()).resolves.toBe(READY_CACHE);

    // forward time by 5 seconds to delay clientForSameUser init
    // so later only client perform poll, not clientForSameUser
    advanceBy(5000);
    jest.advanceTimersByTime(5000);

    const scope = mockServer200(fullFlagResponse);
    const newUser = chance.user();
    const clientForDiffUser = createClient(
      apiKey,
      newUser,
      productKey,
      environment,
    );
    await waitForFetch(fetchSpy);
    await expect(clientForDiffUser.ready()).resolves.toBe(READY_FETCH);
    scope.done();
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);

    // getting flag value (before broadcast)
    let flagBool = clientForDiffUser.getFlagValue('flagBool', false);
    expect(flagBool).toEqual(true);

    // getting flag value (before broadcast)
    let flagNumber = clientForDiffUser.getFlagValue('flagNumber', 0);
    expect(flagNumber).toEqual(1);

    const scope1 = mockServer200(deleteFlagResponse);
    advanceBy(SCHEDULER_OPTIONS_DEFAULT.interval - 5000);
    jest.advanceTimersByTime(SCHEDULER_OPTIONS_DEFAULT.interval - 5000);
    await waitForFetch(fetchSpy, 1);
    scope1.done();
    expect(localStorage.setItem).toHaveBeenCalledTimes(4);

    // getting flag value (no change)
    flagBool = clientForDiffUser.getFlagValue('flagBool', false);
    expect(flagBool).toEqual(true);

    // getting flag value (no change)
    flagNumber = clientForDiffUser.getFlagValue('flagNumber', 0);
    expect(flagNumber).toEqual(1);

    // clientForDiffUser storage not changed
    storageKey = `feature-flags-atl.${CURRENT_FFS_API_VERSION}.flags.${environment}.${productKey}.${apiKey}.${hashUser(
      newUser,
    )}`;
    expect(localStorage.__STORE__[storageKey]).not.toBeUndefined();
    const flagState = JSON.parse(localStorage.__STORE__[storageKey]);
    expect(flagState.version).toEqual(fullFlagResponse.versionData);
    expect(flagState.flags.flagBool.value).toEqual(true);
    expect(flagState.flags.flagNumber.value).toEqual(1);
  });

  test('clients for same users, one changes context, broadcast not affect each other', async () => {
    const clientUserToBeChanged = createClient(
      apiKey,
      user,
      productKey,
      environment,
    );
    await expect(clientUserToBeChanged.ready()).resolves.toBe(READY_CACHE);

    const clientUserNoChange = createClient(
      apiKey,
      user,
      productKey,
      environment,
    );
    await expect(clientUserNoChange.ready()).resolves.toBe(READY_CACHE);

    const scope = mockServer200(modifyFlagResponse);
    const newUser = chance.user();
    const ready = clientUserToBeChanged.updateFeatureFlagUser(newUser);
    await expect(ready).resolves.toBe(READY_FETCH);
    await waitForFetch(fetchSpy);
    scope.done();

    // getting flag value (updated for clientUserToBeChanged)
    let flagString = clientUserToBeChanged.getFlagValue(
      'flagString',
      'default',
    );
    expect(flagString).toEqual('off');
    // getting flag value (not updated for clientUserNoChange yet)
    flagString = clientUserNoChange.getFlagValue('flagString', 'default');
    expect(flagString).toEqual('on');

    // getting flag value (updated for clientUserToBeChanged)
    let flagObj = clientUserToBeChanged.getFlagValue('flagObj', {});
    expect(flagObj).toEqual({
      english: 'skip',
      'non-english': 'skip',
    });
    // getting flag value (not updated for clientUserNoChange yet)
    flagObj = clientUserNoChange.getFlagValue('flagObj', {});
    expect(flagObj).toEqual({
      english: 'on',
      'non-english': 'off',
    });

    // clientUserToBeChanged storage updated correctly
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    storageKey = `feature-flags-atl.${CURRENT_FFS_API_VERSION}.flags.${environment}.${productKey}.${apiKey}.${hashUser(
      newUser,
    )}`;
    expect(localStorage.__STORE__[storageKey]).not.toBeUndefined();
    let flagState = JSON.parse(localStorage.__STORE__[storageKey]);
    expect(flagState.version).toEqual(modifyFlagResponse.versionData);
    expect(flagState.flags.flagString.value).toEqual('off');
    expect(flagState.flags.flagObj.value).toEqual({
      english: 'skip',
      'non-english': 'skip',
    });

    // clientUserNoChange storage not updated yet
    storageKey = `feature-flags-atl.${CURRENT_FFS_API_VERSION}.flags.${environment}.${productKey}.${apiKey}.${hashUser(
      user,
    )}`;
    expect(localStorage.__STORE__[storageKey]).not.toBeUndefined();
    flagState = JSON.parse(localStorage.__STORE__[storageKey]);
    expect(flagState.version).toEqual(initialFlagResponse.versionData);
    expect(flagState.flags.flagString.value).toEqual('on');
    expect(flagState.flags.flagObj.value).toEqual({
      english: 'on',
      'non-english': 'off',
    });
  });
  test('clients for same users, one client stopped should not receive broadcast anymore', async () => {
    const clientUserToStop = createClient(
      apiKey,
      user,
      productKey,
      environment,
    );
    await expect(clientUserToStop.ready()).resolves.toBe(READY_CACHE);

    const clientUserNoChange = createClient(
      apiKey,
      user,
      productKey,
      environment,
    );
    await expect(clientUserNoChange.ready()).resolves.toBe(READY_CACHE);

    const scope = mockServer200(modifyFlagResponse);
    clientUserToStop.destroy();
    advanceBy(SCHEDULER_OPTIONS_DEFAULT.interval);
    jest.advanceTimersByTime(SCHEDULER_OPTIONS_DEFAULT.interval);
    await waitForFetch(fetchSpy);
    scope.done();

    // getting flag value (no change for clientUserToStop)
    let flagString = clientUserToStop.getFlagValue('flagString', 'default');
    expect(flagString).toEqual('on');
    // getting flag value (updated for clientUserNoChange)
    flagString = clientUserNoChange.getFlagValue('flagString', 'default');
    expect(flagString).toEqual('off');

    // getting flag value (no change for clientUserToStop)
    let flagObj = clientUserToStop.getFlagValue('flagObj', {});
    expect(flagObj).toEqual({
      english: 'on',
      'non-english': 'off',
    });
    // getting flag value (updated for clientUserNoChange)
    flagObj = clientUserNoChange.getFlagValue('flagObj', {});
    expect(flagObj).toEqual({
      english: 'skip',
      'non-english': 'skip',
    });

    // storage updated correctly
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    storageKey = `feature-flags-atl.${CURRENT_FFS_API_VERSION}.flags.${environment}.${productKey}.${apiKey}.${hashUser(
      user,
    )}`;
    expect(localStorage.__STORE__[storageKey]).not.toBeUndefined();
    const flagState = JSON.parse(localStorage.__STORE__[storageKey]);
    expect(flagState.version).toEqual(modifyFlagResponse.versionData);
    expect(flagState.flags.flagString.value).toEqual('off');
    expect(flagState.flags.flagObj.value).toEqual({
      english: 'skip',
      'non-english': 'skip',
    });
  });
});
