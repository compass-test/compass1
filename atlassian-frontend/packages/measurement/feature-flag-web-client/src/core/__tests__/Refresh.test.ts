/* eslint-disable import/order */
import MetadataManager from '../MetadataManager';
import Refresh, {
  NO_CACHE_RETRY_OPTIONS_DEFAULT,
  SCHEDULER_OPTIONS_DEFAULT,
} from '../Refresh';
import { PollingConfig, RefreshStatus } from '../types';
import 'jest-extended'; // to use toHaveBeenCalledBefore on jest.Matchers
import Fetcher from '../../fetcher';
import {
  ClientCauseReason,
  ClientUserState,
  FeatureFlagResponse,
} from '../../fetcher/types';
import { EnvironmentType, FeatureFlagUserWithIdentifier } from '../../index';
import generateChance, {
  mockGlobalMath,
  restoreGlobalMath,
} from '../../testUtil/chance';
import {
  fullMetadata,
  fullUser,
  minFlagResponse,
  minimalPollingConfig,
  minimalUser,
} from '../../testUtil/mockData';
import { responseErrorWithStatusCode } from '../../testUtil/mockNetwork';
import mockGetLogger from '../../logger';

jest.mock('../../fetcher');
jest.mock('../../logger');

const THIRTY_MINUTES = 1800000;
const ONE_HOUR = 3600000;
const TWO_HOURS = 7200000;

describe('Core - Refresh', () => {
  const chance = generateChance('Client');

  let mockOnFeatureFlagUpdate: jest.Mock;
  let apiKey: string;
  let env: EnvironmentType;
  let version: string;
  let oldTimestamp: number;
  let refresh: Refresh;
  let fetchAndRescheduleSpy: jest.SpyInstance;
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;
  let fetcherFetchFeatureFlagsSpy: jest.SpyInstance;
  let fetcherFetchFeatureFlagsSuccessPromise: Promise<FeatureFlagResponse>;
  let mockOnError: jest.Mock;

  const setupRefreshForFetch = (): void => {
    (refresh as any).lastUpdateTimestamp =
      Date.now() - SCHEDULER_OPTIONS_DEFAULT.interval;
  };

  beforeEach(() => {
    jest.useFakeTimers();
    (mockGetLogger as jest.Mock).mockReturnValue({
      debug: jest.fn(),
      info: jest.fn(),
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    });

    mockOnFeatureFlagUpdate = jest.fn();
    apiKey = chance.string();
    version = chance.string();
    oldTimestamp = chance.timestamp();
    env = chance.environment();
    mockOnError = jest.fn();
    refresh = new Refresh(
      apiKey,
      env,
      minimalUser,
      mockOnFeatureFlagUpdate,
      {},
      undefined,
      undefined,
      mockOnError,
    );
    addEventListenerSpy = jest
      .spyOn(document, 'addEventListener')
      .mockImplementation(() => {});
    removeEventListenerSpy = jest
      .spyOn(document, 'removeEventListener')
      .mockImplementation(() => {});
    fetchAndRescheduleSpy = jest
      .spyOn(Refresh.prototype as any, 'fetchAndReschedule')
      .mockImplementation(() => {});
    fetcherFetchFeatureFlagsSuccessPromise = Promise.resolve(minFlagResponse);
    // fetcherFetchFeatureFlagsSpy is NOT possible to be restored by jest.restoreAllMocks()
    // but can be restored by fetcherFetchFeatureFlagsSpy.mockRestore()
    // since we jest.mock('../../src/fetcher');
    fetcherFetchFeatureFlagsSpy = jest
      .spyOn(Fetcher.prototype as any, 'fetchFeatureFlags')
      .mockImplementation(() => fetcherFetchFeatureFlagsSuccessPromise);

    mockGlobalMath(chance);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    restoreGlobalMath();
  });

  test('has been initialised correctly', () => {
    expect(Fetcher).toHaveBeenCalledTimes(1);
    expect(Fetcher).toHaveBeenCalledWith(apiKey, env);
    expect((refresh as any).pollingConfig).toEqual(SCHEDULER_OPTIONS_DEFAULT);
    expect((refresh as any).failureCount).toEqual(0);
    expect((refresh as any).timerId).toEqual(undefined);
    expect((refresh as any).user).toEqual(minimalUser);
    const expectedMetadata = new MetadataManager(SCHEDULER_OPTIONS_DEFAULT);
    expectedMetadata.updateClientCauseReason(ClientCauseReason.INITIALIZATION);
    expectedMetadata.updateClientUserState(ClientUserState.NEW);
    expect((refresh as any).metadataManager).toEqual(expectedMetadata);
    expect((refresh as any).version).toEqual(undefined);
    expect((refresh as any).lastUpdateTimestamp).toEqual(0);
    expect((refresh as any).onFeatureFlagUpdate).toEqual(
      mockOnFeatureFlagUpdate,
    );
    expect(refresh.getStatus()).toBe(RefreshStatus.INITIALISED);
  });

  test('initialised with partial polling config', () => {
    refresh = new Refresh(
      apiKey,
      env,
      minimalUser,
      mockOnFeatureFlagUpdate,
      minimalPollingConfig,
    );
    const expectPollingConfig = {
      ...SCHEDULER_OPTIONS_DEFAULT,
      ...minimalPollingConfig,
    };
    expect((refresh as any).pollingConfig).toEqual(expectPollingConfig);
  });

  test('cannot override the cached polling config maxInstantRetryTimes', () => {
    const pollingConfig = {
      ...minimalPollingConfig,
      maxInstantRetryTimes: 3,
    };
    refresh = new Refresh(
      apiKey,
      env,
      minimalUser,
      mockOnFeatureFlagUpdate,
      pollingConfig,
    );
    const expectPollingConfig = {
      ...SCHEDULER_OPTIONS_DEFAULT,
      ...pollingConfig,
      maxInstantRetryTimes: 0,
    };
    expect((refresh as any).pollingConfig).toEqual(expectPollingConfig);
  });

  test('initialised with bad polling config', () => {
    const badPollingConfig: Partial<PollingConfig> = {
      interval: undefined,
    };
    refresh = new Refresh(
      apiKey,
      env,
      minimalUser,
      mockOnFeatureFlagUpdate,
      badPollingConfig,
    );
    expect((refresh as any).pollingConfig).toEqual(SCHEDULER_OPTIONS_DEFAULT);
  });

  test('initialised with optional params', () => {
    refresh = new Refresh(
      apiKey,
      env,
      minimalUser,
      mockOnFeatureFlagUpdate,
      minimalPollingConfig,
      version,
      oldTimestamp,
      mockOnError,
    );
    expect((refresh as any).version).toEqual(version);
    expect((refresh as any).lastUpdateTimestamp).toEqual(oldTimestamp);
    expect((refresh as any).onError).toEqual(mockOnError);
  });

  test('start multiple time only have one active timer', async () => {
    fetchAndRescheduleSpy.mockRestore();
    const scheduleSpy = jest.spyOn(Refresh.prototype as any, 'schedule');
    (refresh as any).lastUpdateTimestamp = new Date().getTime();

    refresh.start();
    refresh.start();
    refresh.start();
    refresh.start();

    (refresh as any).lastUpdateTimestamp =
      new Date().getTime() - SCHEDULER_OPTIONS_DEFAULT.interval;
    expect(scheduleSpy).toHaveBeenCalledTimes(4);
    jest.runOnlyPendingTimers();
    await fetcherFetchFeatureFlagsSuccessPromise;
    expect(mockOnFeatureFlagUpdate).toHaveBeenCalledTimes(1);
  });

  test('start is setting timeout via fetchAndReschedule', () => {
    fetchAndRescheduleSpy.mockRestore();
    fetchAndRescheduleSpy = jest.spyOn(
      Refresh.prototype as any,
      'fetchAndReschedule',
    );
    const calculateIntervalSpy = jest.spyOn(
      Refresh.prototype as any,
      'calculateInterval',
    );
    (refresh as any).lastUpdateTimestamp = new Date().getTime();
    refresh.start();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect((refresh as any).timerId).not.toEqual(undefined);
    expect(calculateIntervalSpy).toHaveBeenCalledTimes(1);
    expect(fetchAndRescheduleSpy).toHaveBeenCalled();
  });

  test('start calls stop before fetchAndReschedule', () => {
    const stopSpy = jest.spyOn(Refresh.prototype as any, 'stop');
    (refresh as any).lastUpdateTimestamp = new Date().getTime();
    refresh.start();
    expect(stopSpy).toHaveBeenCalledBefore(
      (setTimeout as unknown) as jest.Mock,
    );
    expect(fetchAndRescheduleSpy).toHaveBeenCalled();
  });

  test('start calls fetchAndReschedule, schedule if on last updated timestamp is fresh', () => {
    fetchAndRescheduleSpy.mockRestore();
    const scheduleSpy = jest.spyOn(Refresh.prototype as any, 'schedule');

    // timestamp is fairly new
    (refresh as any).lastUpdateTimestamp = new Date().getTime();
    (refresh as any).start();
    expect(scheduleSpy).toHaveBeenCalled();
  });

  describe('with cached results', () => {
    const pollingConfig: PollingConfig = {
      ...SCHEDULER_OPTIONS_DEFAULT,
      backOffJitter: 0, // Remove randomness from test
      maxWaitInterval: ONE_HOUR,
    };

    beforeEach(() => {
      refresh = new Refresh(
        apiKey,
        env,
        minimalUser,
        mockOnFeatureFlagUpdate,
        pollingConfig,
        version,
        oldTimestamp,
      );
    });

    test('calculateInterval should return correct interval when no failure', () => {
      let res = (refresh as any).calculateInterval();
      expect(res).toEqual(SCHEDULER_OPTIONS_DEFAULT.interval);

      (refresh as any).pollingConfig.interval = 100;
      res = (refresh as any).calculateInterval();
      expect(res).toEqual(100);
    });

    it.each`
      failureCount | expectedInterval
      ${1}         | ${SCHEDULER_OPTIONS_DEFAULT.minWaitInterval}
      ${2}         | ${SCHEDULER_OPTIONS_DEFAULT.minWaitInterval * 2}
      ${4}         | ${SCHEDULER_OPTIONS_DEFAULT.minWaitInterval * 8}
      ${20}        | ${ONE_HOUR}
    `(
      'calculateInterval returns interval: $expectedInterval when failure count is $failureCount, max 1 hour cap applied',
      ({ failureCount, expectedInterval }) => {
        (refresh as any).failureCount = failureCount;
        const res = (refresh as any).calculateInterval();
        expect(res).toEqual(expectedInterval);
      },
    );

    // 4800000 backoff is calculated by minWaitInterval * backOffFactor ** (failureCount - 1)
    it.each`
      jitter | expectedMin                                  | expectedMax
      ${0.1} | ${4800000 * (1 - 0.1)}                       | ${4800000 * (1 + 0.1)}
      ${0.2} | ${4800000 * (1 - 0.2)}                       | ${4800000 * (1 + 0.2)}
      ${0.5} | ${4800000 * (1 - 0.5)}                       | ${4800000 * (1 + 0.5)}
      ${1}   | ${SCHEDULER_OPTIONS_DEFAULT.minWaitInterval} | ${TWO_HOURS}
    `(
      'calculateInterval uses backoff jitter: $jitter within range [$expectedMin, $expectedMax]',
      ({ jitter, expectedMin, expectedMax }) => {
        (refresh as any).pollingConfig.maxWaitInterval = TWO_HOURS;
        (refresh as any).pollingConfig.backOffJitter = jitter;
        (refresh as any).failureCount = 5;
        for (let index = 0; index < 100; index++) {
          const res = (refresh as any).calculateInterval();
          expect(res).toBeGreaterThanOrEqual(expectedMin);
          expect(res).toBeLessThanOrEqual(expectedMax);
        }
      },
    );
  });

  describe('without cached results', () => {
    const pollingConfig: PollingConfig = {
      ...SCHEDULER_OPTIONS_DEFAULT,
      backOffJitter: 0, // Remove randomness from test
      maxWaitInterval: ONE_HOUR,
    };

    const noCachePollingConfig: PollingConfig = {
      ...NO_CACHE_RETRY_OPTIONS_DEFAULT,
      backOffJitter: 0, // Remove randomness from test
    };

    beforeEach(() => {
      refresh = new Refresh(
        apiKey,
        env,
        minimalUser,
        mockOnFeatureFlagUpdate,
        pollingConfig,
        undefined,
        undefined,
        mockOnError,
        noCachePollingConfig,
      );
    });

    test('calculateInterval should return correct interval when no failure', () => {
      const res = (refresh as any).calculateInterval();
      expect(res).toEqual(0);
    });

    it.each`
      failureCount | expectedInterval
      ${1}         | ${0}
      ${2}         | ${NO_CACHE_RETRY_OPTIONS_DEFAULT.minWaitInterval * 2}
      ${4}         | ${NO_CACHE_RETRY_OPTIONS_DEFAULT.minWaitInterval * 8}
      ${20}        | ${NO_CACHE_RETRY_OPTIONS_DEFAULT.maxWaitInterval}
    `(
      'calculateInterval returns interval: $expectedInterval when failure count is $failureCount, max 1 hour cap applied',
      ({ failureCount, expectedInterval }) => {
        (refresh as any).failureCount = failureCount;
        const res = (refresh as any).calculateInterval();
        expect(res).toEqual(expectedInterval);
      },
    );

    // 1024000 backoff is calculated by minWaitInterval * backOffFactor ** (failureCount - 1)
    it.each`
      jitter | expectedMin                                       | expectedMax
      ${0.1} | ${1024000 * (1 - 0.1)}                            | ${1024000 * (1 + 0.1)}
      ${0.2} | ${1024000 * (1 - 0.2)}                            | ${1024000 * (1 + 0.2)}
      ${0.5} | ${1024000 * (1 - 0.5)}                            | ${1024000 * (1 + 0.5)}
      ${1}   | ${NO_CACHE_RETRY_OPTIONS_DEFAULT.minWaitInterval} | ${THIRTY_MINUTES}
    `(
      'calculateInterval uses backoff jitter: $jitter within range [$expectedMin, $expectedMax]',
      ({ jitter, expectedMin, expectedMax }) => {
        (refresh as any).noCachePollingConfig.maxWaitInterval = THIRTY_MINUTES;
        (refresh as any).noCachePollingConfig.backOffJitter = jitter;
        (refresh as any).failureCount = 12;
        for (let index = 0; index < 100; index++) {
          const res = (refresh as any).calculateInterval();
          expect(res).toBeGreaterThanOrEqual(expectedMin);
          expect(res).toBeLessThanOrEqual(expectedMax);
        }
      },
    );
  });

  test('start calls fetchAndReschedule, schedule if on last updated timestamp is old', () => {
    fetchAndRescheduleSpy.mockRestore();
    const scheduleSpy = jest.spyOn(Refresh.prototype as any, 'schedule');

    // timestamp is too old
    (refresh as any).lastUpdateTimestamp =
      new Date().getTime() - SCHEDULER_OPTIONS_DEFAULT.interval;
    (refresh as any).start();
    expect(scheduleSpy).not.toHaveBeenCalled();
  });

  test('stop cancels pending timer', () => {
    (refresh as any).timerId = 5;
    refresh.stop();
    expect(clearTimeout).toHaveBeenCalled();
    expect((refresh as any).timerId).toBeUndefined();
  });

  test('updateUserContext sets user', () => {
    refresh.updateUserContext(fullUser);
    expect((refresh as any).user).toEqual(fullUser);
  });

  test('updateUserContext resets failure count', () => {
    (refresh as any).failureCount = 5;
    refresh.updateUserContext(fullUser);
    expect((refresh as any).failureCount).toEqual(0);
  });

  test('updateUserContext sets version and timestamp', () => {
    expect((refresh as any).version).not.toEqual(version);
    refresh.updateUserContext(fullUser, version, oldTimestamp);
    expect((refresh as any).version).toEqual(version);
    expect((refresh as any).lastUpdateTimestamp).toEqual(oldTimestamp);
  });

  test('setVersionAndTimestamp sets version and timestamp', () => {
    expect((refresh as any).version).not.toEqual(version);
    refresh.setVersionAndTimestamp(version, oldTimestamp);
    expect((refresh as any).version).toEqual(version);
    expect((refresh as any).lastUpdateTimestamp).toEqual(oldTimestamp);
  });

  describe('fetchAndReschedule', () => {
    beforeEach(() => {
      // restore the mock implementation so we can hit fetchAndReschedule code
      fetchAndRescheduleSpy.mockRestore();
    });

    test('schedule again', () => {
      (refresh as any).lastUpdateTimestamp = new Date().getTime();
      const scheduleSpy = jest.spyOn(Refresh.prototype as any, 'schedule');

      (refresh as any).fetchAndReschedule();
      expect(scheduleSpy).toHaveBeenCalled();
    });

    test('calls fetcher to fetchFeatureFlags', () => {
      (refresh as any).fetchAndReschedule();
      expect(fetcherFetchFeatureFlagsSpy).toHaveBeenCalled();
    });

    test('pass correct params to fetcher', () => {
      (refresh as any).lastUpdateTimestamp =
        new Date().getTime() - SCHEDULER_OPTIONS_DEFAULT.interval;
      (refresh as any).version = version;
      const metadataManagerGetSpy = jest
        .spyOn(MetadataManager.prototype as any, 'get')
        .mockReturnValue(JSON.parse(JSON.stringify(fullMetadata)));
      (refresh as any).fetchAndReschedule();
      expect(metadataManagerGetSpy).toHaveBeenCalled();
      expect(fetcherFetchFeatureFlagsSpy).toHaveBeenCalledWith(
        minimalUser,
        fullMetadata,
        version,
      );
    });

    test('handles success resp from fetcher', async () => {
      (refresh as any).failureCount = 1;
      const scheduleSpy = jest.spyOn(Refresh.prototype as any, 'schedule');
      setupRefreshForFetch();
      refresh.start();
      await fetcherFetchFeatureFlagsSuccessPromise;
      expect((refresh as any).failureCount).toEqual(0);
      expect(scheduleSpy).toHaveBeenCalled();
      expect(mockOnFeatureFlagUpdate).toHaveBeenCalled();
      expect(setTimeout).toHaveBeenCalled();
      expect(setTimeout).toHaveBeenCalledWith(
        expect.anything(),
        SCHEDULER_OPTIONS_DEFAULT.interval,
      );
    });

    test('handles error resp from fetcher', async () => {
      const fetcherFetchFeatureFlagsErrorPromise = Promise.reject(
        responseErrorWithStatusCode(429),
      );
      (refresh as any).failureCount = 1;
      (refresh as any).pollingConfig.backOffJitter = 0;
      (refresh as any).lastUpdateTimestamp = oldTimestamp;
      (refresh as any).version = version;
      const startSpy = jest.spyOn(Refresh.prototype as any, 'start');
      fetcherFetchFeatureFlagsSpy = jest
        .spyOn(Fetcher.prototype as any, 'fetchFeatureFlags')
        .mockImplementation(() => fetcherFetchFeatureFlagsErrorPromise);
      setupRefreshForFetch();
      refresh.start();

      await expect(fetcherFetchFeatureFlagsErrorPromise).rejects.toThrow(
        responseErrorWithStatusCode(429),
      );
      expect((refresh as any).failureCount).toEqual(2);
      expect(startSpy).toHaveBeenCalled();
      expect(mockOnFeatureFlagUpdate).not.toHaveBeenCalled();
      expect(setTimeout).toHaveBeenCalled();
      expect(setTimeout).toHaveBeenCalledWith(
        expect.anything(),
        SCHEDULER_OPTIONS_DEFAULT.minWaitInterval * 2,
      );
    });

    test('handles multiple error resp from fetcher, finally success after retries', async () => {
      const fetcherFetchFeatureFlagsErrorPromise = Promise.reject(
        responseErrorWithStatusCode(429),
      );
      const fetcherFetchFeatureFlagsErrorPromise2 = Promise.reject(
        responseErrorWithStatusCode(428),
      );
      (refresh as any).failureCount = 1;
      (refresh as any).pollingConfig.backOffJitter = 0;
      (refresh as any).lastUpdateTimestamp = oldTimestamp;
      (refresh as any).version = version;
      const scheduleSpy = jest.spyOn(Refresh.prototype as any, 'schedule');
      jest
        .spyOn(Fetcher.prototype as any, 'fetchFeatureFlags')
        .mockImplementationOnce(() => fetcherFetchFeatureFlagsErrorPromise)
        .mockImplementationOnce(() => fetcherFetchFeatureFlagsErrorPromise2)
        .mockImplementationOnce(() => fetcherFetchFeatureFlagsSuccessPromise);

      (refresh as any).fetchAndReschedule();
      expect(scheduleSpy).toHaveBeenCalledTimes(0);

      await expect(fetcherFetchFeatureFlagsErrorPromise).rejects.toThrow(
        responseErrorWithStatusCode(429),
      );
      expect((refresh as any).failureCount).toEqual(2);
      expect(scheduleSpy).toHaveBeenCalledTimes(1);
      expect(mockOnFeatureFlagUpdate).not.toHaveBeenCalled();
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(
        expect.anything(),
        SCHEDULER_OPTIONS_DEFAULT.minWaitInterval * 2,
      );

      jest.clearAllMocks();
      jest.runOnlyPendingTimers();
      await expect(fetcherFetchFeatureFlagsErrorPromise2).rejects.toThrow(
        responseErrorWithStatusCode(428),
      );
      expect((refresh as any).failureCount).toEqual(3);
      expect(scheduleSpy).toHaveBeenCalledTimes(1);
      expect(mockOnFeatureFlagUpdate).not.toHaveBeenCalled();
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(
        expect.anything(),
        SCHEDULER_OPTIONS_DEFAULT.minWaitInterval * 4,
      );

      jest.clearAllMocks();
      jest.runOnlyPendingTimers();
      await fetcherFetchFeatureFlagsSuccessPromise;
      expect((refresh as any).failureCount).toEqual(0);
      expect(scheduleSpy).toHaveBeenCalledTimes(1);
      expect(mockOnFeatureFlagUpdate).toHaveBeenCalled();
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(
        expect.anything(),
        SCHEDULER_OPTIONS_DEFAULT.interval,
      );
    });

    test('handles 400 error resp from fetcher, clear versionData and reschedule for a retry', async () => {
      const fetcherFetchFeatureFlagsErrorPromise = Promise.reject(
        responseErrorWithStatusCode(400),
      );
      (refresh as any).failureCount = 0;
      (refresh as any).version = 'test';
      fetcherFetchFeatureFlagsSpy = jest
        .spyOn(Fetcher.prototype as any, 'fetchFeatureFlags')
        .mockImplementation(() => fetcherFetchFeatureFlagsErrorPromise);
      setupRefreshForFetch();
      refresh.start();

      await expect(fetcherFetchFeatureFlagsErrorPromise).rejects.toThrow(
        responseErrorWithStatusCode(400),
      );
      expect((refresh as any).failureCount).toEqual(1);
      expect((refresh as any).version).toEqual(undefined);
      expect((refresh as any).lastUpdateTimestamp).toEqual(0);
      expect(mockOnFeatureFlagUpdate).not.toHaveBeenCalled();
      expect(setTimeout).toHaveBeenCalledTimes(1);
    });

    test('handles 400 error resp from fetcher, no retry if versionData is undefinded', async () => {
      const fetcherFetchFeatureFlagsErrorPromise = Promise.reject(
        responseErrorWithStatusCode(400),
      );
      (refresh as any).failureCount = 0;
      fetcherFetchFeatureFlagsSpy = jest
        .spyOn(Fetcher.prototype as any, 'fetchFeatureFlags')
        .mockImplementation(() => fetcherFetchFeatureFlagsErrorPromise);
      setupRefreshForFetch();
      refresh.start();

      await expect(fetcherFetchFeatureFlagsErrorPromise).rejects.toThrow(
        responseErrorWithStatusCode(400),
      );
      expect(mockOnFeatureFlagUpdate).not.toHaveBeenCalled();
      expect(setTimeout).toHaveBeenCalledTimes(0);
    });

    test('calls onError callback on second call if response is client 400 error', async () => {
      const fetcherFetchFeatureFlagsErrorPromise = Promise.reject(
        responseErrorWithStatusCode(400),
      );
      (refresh as any).failureCount = 1;
      (refresh as any).version = 'test';
      fetcherFetchFeatureFlagsSpy = jest
        .spyOn(Fetcher.prototype as any, 'fetchFeatureFlags')
        .mockImplementation(() => fetcherFetchFeatureFlagsErrorPromise);
      setupRefreshForFetch();
      refresh.start();

      await expect(fetcherFetchFeatureFlagsErrorPromise).rejects.toThrow(
        responseErrorWithStatusCode(400),
      );
      expect(mockOnError).toHaveBeenCalledTimes(1);
      expect((refresh as any).version).toEqual(undefined);
      expect((refresh as any).lastUpdateTimestamp).toEqual(0);
      expect(setTimeout).toHaveBeenCalledTimes(1);
    });

    test('handles 401 error resp from fetcher', async () => {
      const fetcherFetchFeatureFlagsErrorPromise = Promise.reject(
        responseErrorWithStatusCode(401),
      );
      (refresh as any).failureCount = 1;
      fetcherFetchFeatureFlagsSpy = jest
        .spyOn(Fetcher.prototype as any, 'fetchFeatureFlags')
        .mockImplementation(() => fetcherFetchFeatureFlagsErrorPromise);
      setupRefreshForFetch();
      refresh.start();

      await expect(fetcherFetchFeatureFlagsErrorPromise).rejects.toThrow(
        responseErrorWithStatusCode(401),
      );
      expect((refresh as any).failureCount).toEqual(1);
      expect(mockOnFeatureFlagUpdate).not.toHaveBeenCalled();
      expect(setTimeout).not.toHaveBeenCalled();
    });

    test('calls onError callback on first call if response is user error', async () => {
      const fetcherFetchFeatureFlagsErrorPromise = Promise.reject(
        responseErrorWithStatusCode(401),
      );
      (refresh as any).failureCount = 0;
      fetcherFetchFeatureFlagsSpy = jest
        .spyOn(Fetcher.prototype as any, 'fetchFeatureFlags')
        .mockImplementation(() => fetcherFetchFeatureFlagsErrorPromise);
      setupRefreshForFetch();
      refresh.start();

      await expect(fetcherFetchFeatureFlagsErrorPromise).rejects.toThrow(
        responseErrorWithStatusCode(401),
      );
      expect(mockOnError).toHaveBeenCalledTimes(1);
    });

    test('calls onError callback on second call if response is 5XX error', async () => {
      const fetcherFetchFeatureFlagsErrorPromise = Promise.reject(
        responseErrorWithStatusCode(500),
      );
      (refresh as any).failureCount = 1;
      fetcherFetchFeatureFlagsSpy = jest
        .spyOn(Fetcher.prototype as any, 'fetchFeatureFlags')
        .mockImplementation(() => fetcherFetchFeatureFlagsErrorPromise);
      setupRefreshForFetch();
      refresh.start();

      await expect(fetcherFetchFeatureFlagsErrorPromise).rejects.toThrow(
        responseErrorWithStatusCode(500),
      );
      expect((refresh as any).failureCount).toEqual(2);
      expect(mockOnError).toHaveBeenCalledTimes(1);
    });

    test('does not process response if user was switched', async () => {
      // Start the fetch
      setupRefreshForFetch();
      refresh.start();

      // Update the user context before the fetch is finished
      refresh.updateUserContext(chance.user());

      // Wait for the fetch to finish
      await fetcherFetchFeatureFlagsSuccessPromise;

      // Fetch was for the previous use so should not trigger updated
      expect(mockOnFeatureFlagUpdate).not.toHaveBeenCalled();
    });
  });

  describe('status', () => {
    beforeEach(() => {
      fetchAndRescheduleSpy.mockRestore();
    });

    test('is set to SUCCESS when fetch is successful', async () => {
      refresh.start();
      await fetcherFetchFeatureFlagsSuccessPromise;
      expect(refresh.getStatus()).toBe(RefreshStatus.SUCCESS);
    });

    test('is set to SUCCESS when fetch is not required', () => {
      refresh.setVersionAndTimestamp(undefined, Date.now());
      refresh.start();
      expect(refresh.getStatus()).toBe(RefreshStatus.SUCCESS);
    });

    test('is set to ERROR when fetch errors', async () => {
      const fetcherFetchFeatureFlagsErrorPromise = Promise.reject(
        responseErrorWithStatusCode(429),
      );
      jest
        .spyOn(Fetcher.prototype as any, 'fetchFeatureFlags')
        .mockImplementationOnce(() => fetcherFetchFeatureFlagsErrorPromise);

      refresh.start();
      await expect(fetcherFetchFeatureFlagsErrorPromise).rejects.toThrow();
      expect(refresh.getStatus()).toBe(RefreshStatus.ERROR);
    });

    test('is overridden on next fetch', async () => {
      const fetcherFetchFeatureFlagsErrorPromise = Promise.reject(
        responseErrorWithStatusCode(429),
      );
      jest
        .spyOn(Fetcher.prototype as any, 'fetchFeatureFlags')
        .mockImplementationOnce(() => fetcherFetchFeatureFlagsErrorPromise)
        .mockImplementationOnce(() => fetcherFetchFeatureFlagsSuccessPromise);

      refresh.start();
      await expect(fetcherFetchFeatureFlagsErrorPromise).rejects.toThrow();
      expect(refresh.getStatus()).toBe(RefreshStatus.ERROR);

      jest.runOnlyPendingTimers();
      await fetcherFetchFeatureFlagsSuccessPromise;
      expect(refresh.getStatus()).toBe(RefreshStatus.SUCCESS);
    });
  });

  describe('metadata', () => {
    let user: FeatureFlagUserWithIdentifier;
    let isFetchRequiredSpy: jest.SpyInstance;

    beforeEach(() => {
      user = chance.user();
      isFetchRequiredSpy?.mockRestore();
      fetchAndRescheduleSpy.mockRestore();
    });

    test('user state is set to "same" if we have cache', () => {
      refresh = new Refresh(
        apiKey,
        env,
        user,
        mockOnFeatureFlagUpdate,
        minimalPollingConfig,
        version,
        Date.now(),
      );
      expect((refresh as any).metadataManager.get().state.userContext).toEqual(
        ClientUserState.SAME,
      );
    });

    test('user state is set to "new" if we dont have cache', () => {
      refresh = new Refresh(apiKey, env, user, mockOnFeatureFlagUpdate);
      expect((refresh as any).metadataManager.get().state.userContext).toEqual(
        ClientUserState.NEW,
      );
    });

    test('user state is set to "same" from "new" after init fetch', async () => {
      jest
        .spyOn(Fetcher.prototype as any, 'fetchFeatureFlags')
        .mockImplementationOnce(() => fetcherFetchFeatureFlagsSuccessPromise);
      refresh = new Refresh(apiKey, env, user, mockOnFeatureFlagUpdate);
      refresh.start();

      await fetcherFetchFeatureFlagsSuccessPromise;
      expect((refresh as any).metadataManager.get().state.userContext).toEqual(
        ClientUserState.SAME,
      );
    });

    test('user state is set to "switch" when update user', () => {
      refresh = new Refresh(apiKey, env, user, mockOnFeatureFlagUpdate);
      refresh.updateUserContext(chance.user());
      expect((refresh as any).metadataManager.get().state.userContext).toEqual(
        ClientUserState.SWITCHED,
      );
    });

    test('cause reason is set to "init" when init trigger a fetch', () => {
      isFetchRequiredSpy = jest
        .spyOn(Refresh.prototype as any, 'isFetchRequired')
        .mockReturnValue(true);
      refresh = new Refresh(apiKey, env, user, mockOnFeatureFlagUpdate);
      expect((refresh as any).metadataManager.get().state.cause).toEqual(
        ClientCauseReason.INITIALIZATION,
      );
    });

    test('cause reason is set to "polling" when triggered after init', () => {
      isFetchRequiredSpy = jest
        .spyOn(Refresh.prototype as any, 'isFetchRequired')
        .mockReturnValue(false);
      refresh = new Refresh(apiKey, env, user, mockOnFeatureFlagUpdate);
      expect((refresh as any).metadataManager.get().state.cause).toEqual(
        ClientCauseReason.POLLING,
      );
    });

    test('cause reason is set to "retry" when previous request failed', async () => {
      const fetcherFetchFeatureFlagsErrorPromise = Promise.reject(
        responseErrorWithStatusCode(429),
      );
      jest
        .spyOn(Fetcher.prototype as any, 'fetchFeatureFlags')
        .mockImplementationOnce(() => fetcherFetchFeatureFlagsErrorPromise);

      refresh = new Refresh(apiKey, env, user, mockOnFeatureFlagUpdate);
      refresh.start();

      await expect(fetcherFetchFeatureFlagsErrorPromise).rejects.toThrow(
        responseErrorWithStatusCode(429),
      );
      expect((refresh as any).metadataManager.get().state.cause).toEqual(
        ClientCauseReason.RETRY,
      );
    });

    test('cause reason is set back to "polling" after success retry', async () => {
      jest
        .spyOn(Fetcher.prototype as any, 'fetchFeatureFlags')
        .mockImplementationOnce(() => fetcherFetchFeatureFlagsSuccessPromise);
      refresh = new Refresh(apiKey, env, user, mockOnFeatureFlagUpdate);
      refresh.start();
      (refresh as any).metadataManager.updateClientCauseReason(
        ClientCauseReason.RETRY,
      );

      await fetcherFetchFeatureFlagsSuccessPromise;
      expect((refresh as any).metadataManager.get().state.cause).toEqual(
        ClientCauseReason.POLLING,
      );
    });
  });

  describe('tab hidden', () => {
    let bindVisibilityChangeSpy: jest.SpyInstance;
    let unbindVisibilityChangeSpy: jest.SpyInstance;
    let visibilityChangeHandlerSpy: jest.SpyInstance;
    // let isFetchRequiredSpy: jest.SpyInstance;
    // let scheduleSpy: jest.SpyInstance;
    const isTabHiddenOriginal = (Refresh as any).isTabHidden;

    beforeEach(() => {
      fetchAndRescheduleSpy.mockRestore();
      bindVisibilityChangeSpy = jest.spyOn(
        refresh as any,
        'bindVisibilityChange',
      );
      unbindVisibilityChangeSpy = jest.spyOn(
        refresh as any,
        'unbindVisibilityChange',
      );
      jest.spyOn(refresh as any, 'isFetchRequired').mockReturnValue(false);
    });

    afterEach(() => {
      refresh.stop();
      // restore isTabHidden static function
      (Refresh as any).isTabHidden = isTabHiddenOriginal;
    });

    test('start refresh will bind listener on visibilitychange', () => {
      refresh.start();
      expect(bindVisibilityChangeSpy).toHaveBeenCalledTimes(1);
    });

    test('stop refresh will unbind listener on visibilitychange', () => {
      refresh.start();
      refresh.stop();
      expect(unbindVisibilityChangeSpy).toHaveBeenCalledTimes(1);
    });

    test('restart refresh will rebind listener on visibilitychange', () => {
      refresh.start();
      expect(bindVisibilityChangeSpy).toHaveBeenCalledTimes(1);
      refresh.stop();
      expect(unbindVisibilityChangeSpy).toHaveBeenCalledTimes(1);
      refresh.start();
      expect(bindVisibilityChangeSpy).toHaveBeenCalledTimes(2);
    });

    test('visibility change trigger handler on active refresh', () => {
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
      visibilityChangeHandlerSpy = jest.spyOn(
        refresh as any,
        'visibilityChangeHandler',
      );
      refresh.start();
      document.dispatchEvent(new Event('visibilitychange'));
      expect(visibilityChangeHandlerSpy).toHaveBeenCalledTimes(1);
    });

    test('visibility change doesnt trigger handler on inactive refresh', () => {
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
      visibilityChangeHandlerSpy = jest.spyOn(
        refresh as any,
        'visibilityChangeHandler',
      );
      document.dispatchEvent(new Event('visibilitychange'));
      expect(visibilityChangeHandlerSpy).toHaveBeenCalledTimes(0);
    });

    test('visibility change doesnt trigger handler on stopped refresh', () => {
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
      visibilityChangeHandlerSpy = jest.spyOn(
        refresh as any,
        'visibilityChangeHandler',
      );
      refresh.start();
      refresh.stop();
      document.dispatchEvent(new Event('visibilitychange'));
      expect(visibilityChangeHandlerSpy).toHaveBeenCalledTimes(0);
    });

    test('visibility change cancel current schedule', () => {
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
      const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
      refresh.start();
      document.dispatchEvent(new Event('visibilitychange'));
      expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    });

    test('visibility change do a schedule if tab is hidden', () => {
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
      const scheduleSpy = jest.spyOn(refresh as any, 'schedule');
      refresh.start();
      // schedule a normal interval poll
      expect(scheduleSpy).toHaveBeenCalledTimes(1);
      (Refresh as any).isTabHidden = jest.fn().mockReturnValue(true);
      document.dispatchEvent(new Event('visibilitychange'));
      // schedule a long interval poll
      expect(scheduleSpy).toHaveBeenCalledTimes(2);
    });

    test('visibility change do a fetchAndReschedule if tab is active', () => {
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
      fetchAndRescheduleSpy = jest.spyOn(refresh as any, 'fetchAndReschedule');
      refresh.start();
      // on start, do a fetchAndReschedule
      expect(fetchAndRescheduleSpy).toHaveBeenCalledTimes(1);
      (Refresh as any).isTabHidden = jest.fn().mockReturnValue(false);
      document.dispatchEvent(new Event('visibilitychange'));
      // on tab back to active, do another fetchAndReschedule
      expect(fetchAndRescheduleSpy).toHaveBeenCalledTimes(2);
    });
  });
});
