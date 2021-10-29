import '../testUtil/jestConfigReset.helper';

import nock from 'nock';

import { SCHEDULER_OPTIONS_DEFAULT } from '../core/Refresh';
import Fetcher from '../fetcher';
import { FeatureFlagResponse } from '../fetcher/types';
import FeatureFlagClient, {
  AnalyticsClientInterface,
  EnvironmentType,
  FeatureFlagUserWithIdentifier,
} from '../index';
import generateChance from '../testUtil/chance';
import {
  deleteFlagResponse,
  fullFlagResponse,
  initialFlagResponse,
  modifyFlagResponse,
} from '../testUtil/mockData';
import { advanceBy, clear as clearDateMock } from '../testUtil/mockDateHelper';
import {
  mockServer200,
  mockServerCorsOptions,
  waitForFetch,
} from '../testUtil/mockNetwork';

// @ts-ignore Override the mock fetch with whatwg-fetch
fetch.dontMock();

describe('Subscription integration', () => {
  const chance = generateChance('Subscription');

  let client: FeatureFlagClient;
  let analyticsWebClient: AnalyticsClientInterface;
  let fetchSpy: jest.SpyInstance;
  let callback: () => void;
  let user: FeatureFlagUserWithIdentifier;

  const createClient = async (
    flagUser: FeatureFlagUserWithIdentifier,
  ): Promise<FeatureFlagClient> => {
    const initialResponse = mockServer200(initialFlagResponse);

    const featureFlagClient = new FeatureFlagClient(
      chance.string(),
      analyticsWebClient,
      flagUser,
      {
        productKey: chance.string(),
        environment: chance.pickone(Object.values(EnvironmentType)),
      },
    );

    await waitForFetch(fetchSpy);
    fetchSpy.mockClear();
    initialResponse.done();

    return featureFlagClient;
  };

  const triggerUpdate = async (
    response: FeatureFlagResponse,
  ): Promise<void> => {
    const updateResponse = mockServer200(response);
    advanceBy(SCHEDULER_OPTIONS_DEFAULT.interval);
    jest.advanceTimersByTime(SCHEDULER_OPTIONS_DEFAULT.interval);
    await waitForFetch(fetchSpy);
    fetchSpy.mockClear();
    updateResponse.done();
  };

  beforeEach(async () => {
    jest.useFakeTimers();

    fetchSpy = jest.spyOn(Fetcher.prototype as any, 'fetchFeatureFlags');
    analyticsWebClient = { sendOperationalEvent: jest.fn() };
    user = chance.user();

    mockServerCorsOptions();

    client = await createClient(user);
    callback = jest.fn();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();

    jest.clearAllMocks();
    jest.restoreAllMocks();

    localStorage.clear();

    nock.abortPendingRequests();
    nock.cleanAll();

    clearDateMock();
  });

  describe('single flag subscription', () => {
    test('triggers callback if flag value changed', async () => {
      client.on('flagString', 'on', callback);

      await triggerUpdate(modifyFlagResponse);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('off');
    });

    test('does not trigger callback if flag value not changed', async () => {
      client.on('flagStringNoReason', 'off', callback);

      await triggerUpdate(modifyFlagResponse);

      expect(callback).toHaveBeenCalledTimes(0);
    });

    test('does not trigger callback if unsubscribed', async () => {
      const unsubscribed = client.on('flagString', 'on', callback);

      unsubscribed();
      await triggerUpdate(modifyFlagResponse);

      expect(callback).toHaveBeenCalledTimes(0);
    });

    test('fires exposure events if shouldSendExposureEvent is true', async () => {
      client.on('flagString', 'on', callback, {
        shouldSendExposureEvent: true,
        exposureData: {
          attr1: 'one',
          attr2: 2,
        },
      });

      await triggerUpdate(modifyFlagResponse);

      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(1);
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith({
        action: 'exposed',
        actionSubject: 'feature',
        attributes: {
          attr1: 'one',
          attr2: 2,
          flagKey: 'flagString',
          reason: 'RULE_MATCH',
          ruleId: 'someOtherRuleId',
          value: 'off',
        },
        tags: ['measurement', 'optInExposure'],
        source: '@atlassiansox/feature-flag-web-client',
        highPriority: true,
      });
    });

    test('fires exposure events if automatic exposures are enabled and shouldSendExposureEvent is default', async () => {
      client.setAutomaticExposuresEnabled(true);
      client.on('flagObj', {}, callback, {
        exposureData: {
          attr1: 'one',
          attr2: 2,
        },
      });

      await triggerUpdate(modifyFlagResponse);

      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(1);
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith({
        action: 'exposed',
        actionSubject: 'feature',
        attributes: {
          flagKey: 'flagObj',
          value: {
            english: 'skip',
            'non-english': 'skip',
          },
        },
        tags: ['measurement', 'autoExposure'],
        source: '@atlassiansox/feature-flag-web-client',
        highPriority: false,
      });
    });

    test('does not fire exposure events if shouldSendExposureEvent is false', async () => {
      client.on('flagString', 'on', callback, {
        shouldSendExposureEvent: false,
      });
      await triggerUpdate(modifyFlagResponse);

      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(0);
    });

    test('triggers subscriptions on updateFeatureFlagUser with cached flags', async () => {
      // Load flags for another users
      const anotherUser = chance.user();
      const anotherUserResponse = mockServer200(fullFlagResponse);
      await client.updateFeatureFlagUser(anotherUser);
      anotherUserResponse.done();

      client.on('flagString', 'off', callback);
      await client.updateFeatureFlagUser(user);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith('on');
    });
  });

  describe('all flags subscription', () => {
    test('triggers callback if any flag value changed', async () => {
      client.onAnyFlagUpdated(callback);

      await triggerUpdate(modifyFlagResponse);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('triggers callback even if flags are only deleted', async () => {
      client.onAnyFlagUpdated(callback);

      await triggerUpdate(deleteFlagResponse);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('does not trigger callback if no flag values change', async () => {
      client.onAnyFlagUpdated(callback);

      await triggerUpdate(initialFlagResponse);

      expect(callback).not.toHaveBeenCalled();
    });

    test('does not trigger callback if unsubscribed', async () => {
      const unsubscribe = client.onAnyFlagUpdated(callback);
      unsubscribe();

      await triggerUpdate(modifyFlagResponse);

      expect(callback).not.toHaveBeenCalled();
    });
  });
});
