import '../testUtil/jestConfigReset.helper';

import nock from 'nock';

import Fetcher from '../fetcher';
import FeatureFlagClient, {
  AnalyticsClientInterface,
  EnvironmentType,
} from '../index';
import generateChance from '../testUtil/chance';
import { fullFlagResponse } from '../testUtil/mockData';
import {
  mockServer200,
  mockServerCorsOptions,
  waitForFetch,
} from '../testUtil/mockNetwork';

// @ts-ignore Override the mock fetch with whatwg-fetch
fetch.dontMock();

describe('Exposure integration', () => {
  const chance = generateChance('Exposure');
  let analyticsWebClient: AnalyticsClientInterface;

  const createClient = (): FeatureFlagClient => {
    return new FeatureFlagClient(
      chance.string(),
      analyticsWebClient,
      chance.user(),
      {
        productKey: chance.string(),
        environment: chance.pickone(Object.values(EnvironmentType)),
      },
    );
  };

  beforeEach(() => {
    analyticsWebClient = { sendOperationalEvent: jest.fn() };
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('with valid feature flag data', () => {
    let fetchSpy: jest.SpyInstance;

    beforeEach(() => {
      fetchSpy = jest.spyOn(Fetcher.prototype as any, 'fetchFeatureFlags');
      mockServerCorsOptions();
    });

    afterEach(() => {
      jest.clearAllMocks();
      nock.abortPendingRequests();
      nock.cleanAll();
    });
    test('fires exposure events on successful call to getFlagValue with shouldSendExposureEvent set to true', async () => {
      const scope = mockServer200(fullFlagResponse);
      const client = createClient();
      client.setAutomaticExposuresEnabled(true);

      await waitForFetch(fetchSpy);
      scope.done();

      client.getFlagValue('flagBool', false, {
        shouldSendExposureEvent: true,
        exposureData: {
          attr1: 1,
          attr2: 'two',
        },
      });

      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(1);
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith({
        action: 'exposed',
        actionSubject: 'feature',
        attributes: {
          attr1: 1,
          attr2: 'two',
          flagKey: 'flagBool',
          reason: 'RULE_MATCH',
          ruleId: 'someRuleId',
          value: true,
        },
        tags: ['measurement', 'optInExposure'],
        source: '@atlassiansox/feature-flag-web-client',
        highPriority: true,
      });
    });

    test('fires exposure events on successful call to getFlagValue with automatic exposures enabled', async () => {
      const scope = mockServer200(fullFlagResponse);
      const client = createClient();
      client.setAutomaticExposuresEnabled(true);

      await waitForFetch(fetchSpy);
      scope.done();

      client.getFlagValue('flagBool', false, {
        exposureData: {
          attr1: 1,
          attr2: 'two',
        },
      });

      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(1);
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith({
        action: 'exposed',
        actionSubject: 'feature',
        attributes: {
          flagKey: 'flagBool',
          reason: 'RULE_MATCH',
          ruleId: 'someRuleId',
          value: true,
        },
        tags: ['measurement', 'autoExposure'],
        source: '@atlassiansox/feature-flag-web-client',
        highPriority: false,
      });
    });

    test('fires exposure events with error on getFlagValue with automatic exposures enabled when trackingInfo is available and enabled', async () => {
      const scope = mockServer200(fullFlagResponse);
      const client = createClient();
      client.setAutomaticExposuresEnabled(true);

      await waitForFetch(fetchSpy);
      scope.done();

      client.getFlagValue('flagBool', 'not a boolean');

      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(1);
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith({
        action: 'exposed',
        actionSubject: 'feature',
        attributes: {
          flagKey: 'flagBool',
          reason: 'ERROR',
          errorKind: 'WRONG_TYPE',
          value: 'not a boolean',
        },
        tags: ['measurement', 'autoExposure'],
        source: '@atlassiansox/feature-flag-web-client',
        highPriority: false,
      });
    });
  });

  describe('without any feature flag data', () => {
    test('still fires exposure events with an error reason if getFlagValue with shouldSendExposureEvent set to true', async () => {
      const client = createClient();
      client.getFlagValue('flagBool', false, {
        shouldSendExposureEvent: true,
      });

      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledTimes(1);
      expect(analyticsWebClient.sendOperationalEvent).toHaveBeenCalledWith({
        action: 'exposed',
        actionSubject: 'feature',
        attributes: {
          flagKey: 'flagBool',
          reason: 'ERROR',
          value: false,
          errorKind: 'CLIENT_NOT_READY',
        },
        tags: ['measurement', 'optInExposure'],
        source: '@atlassiansox/feature-flag-web-client',
        highPriority: true,
      });
    });

    test('does not fire exposure events if shouldSendExposureEvent is false', () => {
      const client = createClient();
      client.getFlagValue('flagBool', false, {
        shouldSendExposureEvent: false,
      });

      expect(analyticsWebClient.sendOperationalEvent).not.toHaveBeenCalled();
    });

    test('does not fire automatic exposure events with error on getFlagValue if the trackingInfo is not available', () => {
      const client = createClient();
      client.setAutomaticExposuresEnabled(true);
      client.getFlagValue('flagBool', false);
      expect(analyticsWebClient.sendOperationalEvent).not.toHaveBeenCalled();
    });
  });
});
