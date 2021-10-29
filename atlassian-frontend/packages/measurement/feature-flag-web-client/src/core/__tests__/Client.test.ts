import { mocked } from 'ts-jest/utils';

import { LoggerType, ReadyReason, ReadyResponse } from '../../api/types';
import ExposureEvents from '../../exposureEvents';
import {
  EnvironmentType,
  EvaluationErrorKind,
  EvaluationReason,
  FeatureFlagUserWithIdentifier,
  Identifiers,
  RawFlag,
  RawFlags,
} from '../../index';
import mockGetLogger from '../../logger';
import Storage from '../../storage';
import Subscriptions, { Broadcast } from '../../subscriptions';
import generateChance from '../../testUtil/chance';
import {
  addFlagUpdate,
  anonymousUser,
  deleteFlagUpdate,
  featureFlagState,
  fullFlagUpdate,
  fullGetValueOptions,
  initialFlagUpdate,
  minFlagUpdate,
  minimalGetValueOptions,
  modifyFlagUpdate,
  validAnalyticsWebClient,
} from '../../testUtil/mockData';
import { createClient } from '../../testUtil/mockGenerator';
import Anonymous from '../Anonymous';
import Client from '../index';
import Ready from '../Ready';
import Refresh from '../Refresh';
import { FeatureFlagUpdate, RefreshStatus } from '../types';

jest.mock('../Refresh');
jest.mock('../Anonymous');
jest.mock('../Ready');
jest.mock('../../storage');
jest.mock('../../logger');
jest.mock('../../subscriptions');
jest.mock('../../exposureEvents');

const mockedRefresh = mocked(Refresh);
const mockedAnonymous = mocked(Anonymous);
const mockedReady = mocked(Ready);
const mockedStorage = mocked(Storage);
const mockedSubscriptions = mocked(Subscriptions);
const mockedExposureEvents = mocked(ExposureEvents);
const mockedBroadcast = mocked(Broadcast);

describe('Core - Client', () => {
  const chance = generateChance('Client');

  let client: Client;
  let apiKey: string;
  let user: FeatureFlagUserWithIdentifier;
  let productKey: string;
  let environment: EnvironmentType;
  let mockLogger: LoggerType = {
    debug: jest.fn(),
    info: jest.fn(),
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(() => {
    (mockGetLogger as jest.Mock).mockReturnValue(mockLogger);
    apiKey = chance.string();
    user = chance.user();
    productKey = chance.string();
    environment = chance.environment();
    jest
      .spyOn(mockedAnonymous, 'processAnonymousUser')
      .mockImplementation(() => user);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    test('initialises correctly when nothing in storage', () => {
      client = createClient(apiKey, user, productKey, environment);
      expect(mockedStorage).toHaveBeenCalledWith(
        environment,
        productKey,
        apiKey,
        user,
      );
      expect(mockedRefresh).toHaveBeenCalledWith(
        apiKey,
        environment,
        user,
        (client as any).featureFlagUpdateHttpHandler,
        {
          interval: undefined,
        },
        undefined,
        0,
        expect.any(Function),
      );
      expect(mockedRefresh.mock.instances[0].start).toHaveBeenCalledTimes(1);

      expect((client as any).flags).toEqual({});
      expect((client as any).lastUpdatedTimestamp).toEqual(0);
      expect((client as any).dataVersion).toEqual(undefined);
      expect((client as any).userData).toEqual(user);
    });

    test('original user obj update doesnt affect client userData set by constructor', () => {
      mockedAnonymous.processAnonymousUser.mockReset();
      jest
        .spyOn(mockedAnonymous, 'processAnonymousUser')
        .mockImplementation((u) => (u as any) as FeatureFlagUserWithIdentifier);

      client = createClient(apiKey, user, productKey, environment);
      const userSnapshot = JSON.parse(JSON.stringify((client as any).userData));
      expect((client as any).userData).toEqual(userSnapshot);
      user.custom = [{ newKey: 'newValue' }];
      user.identifier.value = 'changedValue';
      expect((client as any).userData).toEqual(userSnapshot);
    });

    test('initialises correctly when storage has data', () => {
      const timestamp = chance.minute();
      const version = chance.string();
      const flags: RawFlags = {
        flag1: {
          value: true,
          evaluationDetail: {
            reason: EvaluationReason.RULE_MATCH,
            ruleId: chance.string(),
          },
        },
      };

      jest
        .spyOn(mockedStorage.prototype as any, 'getFlagsState')
        .mockImplementation(() => {
          return { flags, timestamp, version };
        });

      client = createClient(apiKey, user, productKey, environment);

      expect(mockedStorage).toHaveBeenCalledWith(
        environment,
        productKey,
        apiKey,
        user,
      );
      expect(mockedRefresh).toHaveBeenCalledWith(
        apiKey,
        environment,
        user,
        (client as any).featureFlagUpdateHttpHandler,
        {
          interval: undefined,
        },
        version,
        timestamp,
        expect.any(Function),
      );
      expect(mockedRefresh.mock.instances[0].start).toHaveBeenCalledTimes(1);

      expect((client as any).flags).toEqual(flags);
      expect((client as any).lastUpdatedTimestamp).toEqual(timestamp);
      expect((client as any).dataVersion).toEqual(version);
      expect((client as any).userData).toEqual(user);
    });

    test('uses polling config from options', () => {
      const pollingInterval = chance.integer({ min: 60000 });

      client = new Client(
        apiKey,
        { sendOperationalEvent: (): void => {} },
        user,
        {
          productKey,
          environment,
          pollingInterval,
        },
      );

      expect(mockedRefresh).toHaveBeenCalledWith(
        apiKey,
        environment,
        user,
        (client as any).featureFlagUpdateHttpHandler,
        {
          interval: pollingInterval,
        },
        undefined,
        0,
        expect.any(Function),
      );
    });

    test('initialise should process anonymous user', () => {
      client = createClient(apiKey, anonymousUser, productKey, environment);
      expect(mockedAnonymous.processAnonymousUser).toHaveBeenCalledWith(
        anonymousUser,
      );
    });

    test.each`
      variation      | testApiKey
      ${'undefined'} | ${undefined}
      ${'null'}      | ${null}
      ${'empty'}     | ${''}
      ${'blank'}     | ${' '}
    `('throws error when apiKey is $variation', ({ testApiKey }) => {
      expect(
        () =>
          new Client(testApiKey, validAnalyticsWebClient, user, {
            productKey,
            environment,
          }),
      ).toThrow('apiKey is missing');
    });

    test.each`
      variation      | testAnalyticsWebClient
      ${'undefined'} | ${undefined}
      ${'null'}      | ${null}
    `(
      'throws error when analyticsWebClient is $variation',
      ({ testAnalyticsWebClient }) => {
        expect(
          () =>
            new Client(chance.string(), testAnalyticsWebClient, user, {
              productKey,
              environment,
            }),
        ).toThrow(
          'analyticsWebClient.sendOperationalEvent is missing or not a function',
        );
      },
    );

    test.each`
      variation      | testAnalyticsWebClient
      ${'undefined'} | ${{}}
      ${'null'}      | ${{ sendOperationalEvent: null }}
      ${'invalid'}   | ${{ sendOperationalEvent: '' }}
    `(
      'throws error when analyticsWebClient.sendOperationalEvent is $variation',
      ({ testAnalyticsWebClient }) => {
        expect(
          () =>
            new Client(chance.string(), testAnalyticsWebClient, user, {
              productKey,
              environment,
            }),
        ).toThrow(
          'analyticsWebClient.sendOperationalEvent is missing or not a function',
        );
      },
    );

    test.each`
      variation      | testFeatureFlagUser
      ${'undefined'} | ${undefined}
      ${'null'}      | ${null}
    `(
      'throws error when featureFlagUser is $variation',
      ({ testFeatureFlagUser }) => {
        expect(
          () =>
            new Client(
              chance.string(),
              validAnalyticsWebClient,
              testFeatureFlagUser,
              {
                productKey,
                environment,
              },
            ),
        ).toThrow('featureFlagUser is missing');
      },
    );

    test.each`
      variation      | testOptions
      ${'undefined'} | ${undefined}
      ${'null'}      | ${null}
    `('throws error when options is $variation', ({ testOptions }) => {
      expect(
        () =>
          new Client(
            chance.string(),
            validAnalyticsWebClient,
            user,
            testOptions,
          ),
      ).toThrow('options.productKey is missing');
    });

    test.each`
      variation      | testProductKey
      ${'undefined'} | ${undefined}
      ${'null'}      | ${null}
      ${'empty'}     | ${''}
      ${'blank'}     | ${' '}
    `('throws error when productKey is $variation', ({ testProductKey }) => {
      expect(
        () =>
          new Client(chance.string(), validAnalyticsWebClient, user, {
            productKey: testProductKey,
            environment,
          }),
      ).toThrow('options.productKey is missing');
    });

    test.each`
      variation      | testEnvironment
      ${'undefined'} | ${undefined}
      ${'null'}      | ${null}
      ${'empty'}     | ${''}
      ${'invalid'}   | ${chance.string()}
    `('throws error when environment is $variation', ({ testEnvironment }) => {
      expect(
        () =>
          new Client(chance.string(), validAnalyticsWebClient, user, {
            productKey,
            environment: testEnvironment,
          }),
      ).toThrow('options.environment is missing or invalid');
    });

    test.each`
      testEnvironment            | maxPollingInterval
      ${EnvironmentType.LOCAL}   | ${1000}
      ${EnvironmentType.DEV}     | ${1000}
      ${EnvironmentType.STAGING} | ${1000}
    `(
      'throws error when pollingInterval is below $maxPollingInterval in $testEnvironment',
      ({ testEnvironment, maxPollingInterval }) => {
        expect(
          () =>
            new Client(chance.string(), validAnalyticsWebClient, user, {
              productKey,
              environment: testEnvironment,
              pollingInterval: maxPollingInterval - 1,
            }),
        ).toThrow(
          `options.pollingInterval needs to be greater than ${maxPollingInterval}`,
        );
      },
    );

    test.each`
      testEnvironment            | pollingInterval
      ${EnvironmentType.LOCAL}   | ${10000}
      ${EnvironmentType.DEV}     | ${20000}
      ${EnvironmentType.STAGING} | ${50000}
    `(
      'console.log when pollingInterval is $pollingInterval in $testEnvironment',
      ({ testEnvironment, pollingInterval }) => {
        expect(
          () =>
            new Client(chance.string(), validAnalyticsWebClient, user, {
              productKey,
              environment: testEnvironment,
              pollingInterval: pollingInterval - 1,
            }),
        ).not.toThrow();
        expect(mockLogger.log).toHaveBeenCalledWith(
          'options.pollingInterval needs to be greater than 60000 in Production',
        );
      },
    );

    test(`console.warn and correct pollingInterval when it is below 60000 in ${EnvironmentType.PROD}`, () => {
      const maxPollingInterval = 60000;
      expect(
        () =>
          new Client(chance.string(), validAnalyticsWebClient, user, {
            productKey,
            environment: EnvironmentType.PROD,
            pollingInterval: maxPollingInterval - 1,
          }),
      ).not.toThrow();
      expect(mockLogger.log).toHaveBeenCalledWith(
        `options.pollingInterval needs to be greater than ${maxPollingInterval}`,
      );
      expect(mockedRefresh).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        expect.anything(),
        {
          interval: 60000,
        },
        undefined,
        expect.anything(),
        expect.anything(),
      );
    });
  });

  describe('updateFeatureFlagUser', () => {
    let readySpy: jest.SpyInstance;
    let promise: Promise<ReadyResponse>;

    beforeEach(() => {
      client = createClient(apiKey, user, productKey, environment);
      promise = new Promise(() => {});
      readySpy = jest.spyOn(client, 'ready').mockReturnValue(promise);
    });

    test('update internal user data', () => {
      user = chance.user();
      const oldUserData = (client as any).userData;
      client.updateFeatureFlagUser(user);
      const newUserData = (client as any).userData;

      expect(oldUserData).not.toEqual(newUserData);
      expect(newUserData).toEqual(user);
    });

    test('original user obj update doesnt affect client userData set by updateFeatureFlagUser', () => {
      mockedAnonymous.processAnonymousUser.mockReset();
      jest
        .spyOn(mockedAnonymous, 'processAnonymousUser')
        .mockImplementation((u) => (u as any) as FeatureFlagUserWithIdentifier);

      user = chance.user();
      client.updateFeatureFlagUser(user);
      const userSnapshot = JSON.parse(JSON.stringify((client as any).userData));
      expect((client as any).userData).toEqual(userSnapshot);
      user.custom = [{ newKey: 'newValue' }];
      user.identifier.value = 'changedValue';
      expect((client as any).userData).toEqual(userSnapshot);
    });

    test('update storage user context and restore flag state', () => {
      expect(
        mockedStorage.mock.instances[0].getFlagsState,
      ).toHaveBeenCalledTimes(1);
      user = chance.user();
      client.updateFeatureFlagUser(user);

      expect(
        mockedStorage.mock.instances[0].updateUserContext,
      ).toHaveBeenCalledWith(user);
      // Ensure getFlagsState is called again when update feature flag user
      expect(
        mockedStorage.mock.instances[0].getFlagsState,
      ).toHaveBeenCalledTimes(2);
    });

    test('update refresh user context and restart polling', () => {
      expect(mockedRefresh.mock.instances[0].start).toHaveBeenCalledTimes(1);
      user = chance.user();
      client.updateFeatureFlagUser(user);

      expect(
        mockedRefresh.mock.instances[0].updateUserContext,
      ).toHaveBeenCalledWith(user, undefined, 0);
      // Ensure start is called again when update feature flag user
      expect(mockedRefresh.mock.instances[0].start).toHaveBeenCalledTimes(2);
    });

    test('return a ready promise', () => {
      user = chance.user();
      const res = client.updateFeatureFlagUser(user);

      expect(readySpy).toHaveBeenCalledWith();
      expect(res).toEqual(promise);
    });

    test('no-op when user data not changed', () => {
      expect(
        mockedStorage.mock.instances[0].getFlagsState,
      ).toHaveBeenCalledTimes(1);
      expect(mockedRefresh.mock.instances[0].start).toHaveBeenCalledTimes(1);

      client.updateFeatureFlagUser(user);

      expect(
        mockedStorage.mock.instances[0].updateUserContext,
      ).not.toHaveBeenCalled();
      expect(
        mockedRefresh.mock.instances[0].updateUserContext,
      ).not.toHaveBeenCalled();
      // Ensure there have been no more calls to getFlagsState, start besides the one on client init
      expect(
        mockedStorage.mock.instances[0].getFlagsState,
      ).toHaveBeenCalledTimes(1);
      expect(mockedRefresh.mock.instances[0].start).toHaveBeenCalledTimes(1);
    });

    test('can be updated with anonymous user', () => {
      const finalUser = {
        identifier: {
          type: Identifiers.FF_CLIENT_ANONYMOUS_ID,
          value: chance.string(),
        },
        ...anonymousUser,
      };
      // Reset required as this is called during constructor and update
      mockedAnonymous.processAnonymousUser.mockReset();
      jest
        .spyOn(mockedAnonymous, 'processAnonymousUser')
        .mockReturnValue(finalUser);
      client.updateFeatureFlagUser(anonymousUser);

      const newUserData = (client as any).userData;
      expect(newUserData).toEqual(finalUser);
      expect(mockedAnonymous.processAnonymousUser).toHaveBeenCalledTimes(1);
      expect(mockedAnonymous.processAnonymousUser).toHaveBeenCalledWith(
        anonymousUser,
      );
    });
  });

  describe('featureFlagUpdate via http', () => {
    test('handles first update', () => {
      const timestamp = Date.now();
      jest.spyOn(global.Date, 'now').mockImplementation(() => {
        return timestamp;
      });

      const expectedRawFlags: RawFlags = {
        flagBool: {
          value: true,
          evaluationDetail: {
            ruleId: 'someRuleId',
            reason: EvaluationReason.RULE_MATCH,
          },
          trackingInfo: {
            samplingRate: 1,
          },
        },
        flagNumber: {
          value: 1,
          trackingInfo: {
            samplingRate: 0,
          },
        },
      };

      client = createClient(apiKey, user, productKey, environment);
      (client as any).featureFlagUpdateHttpHandler(fullFlagUpdate);

      expect((client as any).flags).toEqual(expectedRawFlags);
      expect((client as any).lastUpdatedTimestamp).toEqual(timestamp);
      expect((client as any).dataVersion).toEqual(fullFlagUpdate.versionData);

      expect(
        mockedRefresh.mock.instances[0].setVersionAndTimestamp,
      ).toHaveBeenCalledWith(fullFlagUpdate.versionData, timestamp);

      expect(
        mockedStorage.mock.instances[0].setFlagsState,
      ).toHaveBeenCalledWith({
        timestamp,
        version: fullFlagUpdate.versionData,
        flags: expectedRawFlags,
      });
    });

    test('handles partial update', () => {
      // Set up existing data
      const existingRuleId = chance.string();
      const existingFlags: RawFlags = {
        flagToKeep: {
          value: true,
          evaluationDetail: {
            reason: EvaluationReason.RULE_MATCH,
            ruleId: existingRuleId,
          },
        },
        flagToUpdate: {
          value: 1,
        },
        flagToDelete: {
          value: 'test',
        },
      };

      jest
        .spyOn(mockedStorage.prototype as any, 'getFlagsState')
        .mockImplementation(() => {
          return {
            flags: existingFlags,
            timestamp: chance.minute(),
            version: chance.string(),
          };
        });

      // Set up update data
      const timestamp = Date.now();
      const version = chance.string();

      jest.spyOn(global.Date, 'now').mockImplementation(() => {
        return timestamp;
      });

      const update: FeatureFlagUpdate = {
        flags: {
          flagToUpdate: {
            value: 2,
            evaluationDetail: {
              ruleId: 'newRuleId',
              reason: EvaluationReason.TARGET_MATCH,
            },
          },
          flagToAdd: {
            value: 'someFlagValue',
          },
        },
        deletedFlags: ['flagToDelete'],
        versionData: version,
      };

      // Test
      const expectedRawFlags: RawFlags = {
        flagToKeep: {
          value: true,
          evaluationDetail: {
            reason: EvaluationReason.RULE_MATCH,
            ruleId: existingRuleId,
          },
        },
        flagToUpdate: {
          value: 2,
          evaluationDetail: {
            ruleId: 'newRuleId',
            reason: EvaluationReason.TARGET_MATCH,
          },
        },
        flagToAdd: {
          value: 'someFlagValue',
        },
      };

      client = createClient(apiKey, user, productKey, environment);
      (client as any).featureFlagUpdateHttpHandler(update);

      expect((client as any).flags).toEqual(expectedRawFlags);
      expect((client as any).lastUpdatedTimestamp).toEqual(timestamp);
      expect((client as any).dataVersion).toEqual(version);

      expect(
        mockedRefresh.mock.instances[0].setVersionAndTimestamp,
      ).toHaveBeenCalledWith(version, timestamp);

      expect(
        mockedStorage.mock.instances[0].setFlagsState,
      ).toHaveBeenCalledWith({
        timestamp,
        version,
        flags: expectedRawFlags,
      });
    });

    test('handles empty update', () => {
      jest
        .spyOn(mockedStorage.prototype as any, 'getFlagsState')
        .mockImplementation(() => {
          // deep copy featureFlagState to avoid any modification
          return JSON.parse(JSON.stringify(featureFlagState));
        });

      // Set up update data
      const timestamp = Date.now();
      jest.spyOn(global.Date, 'now').mockImplementation(() => {
        return timestamp;
      });

      // Test
      client = createClient(apiKey, user, productKey, environment);
      (client as any).featureFlagUpdateHttpHandler(minFlagUpdate);

      expect((client as any).flags).toEqual(featureFlagState.flags);
      expect((client as any).dataVersion).toEqual(featureFlagState.version);
      expect((client as any).lastUpdatedTimestamp).toEqual(timestamp);

      expect(
        mockedRefresh.mock.instances[0].setVersionAndTimestamp,
      ).toHaveBeenCalledWith(featureFlagState.version, timestamp);

      expect(
        mockedStorage.mock.instances[0].setFlagsState,
      ).toHaveBeenCalledWith({
        timestamp,
        version: featureFlagState.version,
        flags: featureFlagState.flags,
      });
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).not.toHaveBeenCalled();
      expect(
        mockedSubscriptions.mock.instances[0].anyFlagUpdated,
      ).not.toHaveBeenCalled();
    });

    test('notify subscriptions on flag add/update', () => {
      jest
        .spyOn(mockedStorage.prototype as any, 'getFlagsState')
        .mockImplementation(() => {
          // deep copy featureFlagState to avoid any modification
          return JSON.parse(JSON.stringify(featureFlagState));
        });

      // Test
      client = createClient(apiKey, user, productKey, environment);
      (client as any).featureFlagUpdateHttpHandler(addFlagUpdate);
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).toHaveBeenCalledWith('flagNumber');
      expect(
        mockedSubscriptions.mock.instances[0].anyFlagUpdated,
      ).toHaveBeenCalledTimes(1);

      (client as any).featureFlagUpdateHttpHandler(modifyFlagUpdate);
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).toHaveBeenCalledWith('flagString');
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).toHaveBeenCalledWith('flagObj');
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).not.toHaveBeenCalledWith('flagStringNoReason');
      expect(
        mockedSubscriptions.mock.instances[0].anyFlagUpdated,
      ).toHaveBeenCalledTimes(2);
    });

    test('notify subscriptions on flag deletion', () => {
      jest
        .spyOn(mockedStorage.prototype as any, 'getFlagsState')
        .mockImplementation(() => {
          // deep copy featureFlagState to avoid any modification
          return JSON.parse(JSON.stringify(featureFlagState));
        });

      // Test
      client = createClient(apiKey, user, productKey, environment);
      (client as any).featureFlagUpdateHttpHandler(deleteFlagUpdate);
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).toHaveBeenCalledWith('flagString');
      expect(
        mockedSubscriptions.mock.instances[0].anyFlagUpdated,
      ).toHaveBeenCalledTimes(1);
    });

    test('not notify subscriptions when no flag change', () => {
      jest
        .spyOn(mockedStorage.prototype as any, 'getFlagsState')
        .mockImplementation(() => {
          // deep copy featureFlagState to avoid any modification
          return JSON.parse(JSON.stringify(featureFlagState));
        });

      // Test
      client = createClient(apiKey, user, productKey, environment);
      (client as any).featureFlagUpdateHttpHandler(modifyFlagUpdate);
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).toHaveBeenCalledTimes(2);
      expect(
        mockedSubscriptions.mock.instances[0].anyFlagUpdated,
      ).toHaveBeenCalledTimes(1);

      (client as any).featureFlagUpdateHttpHandler(
        JSON.parse(JSON.stringify(modifyFlagUpdate)),
      );
      // Ensure there have been no more calls to flagValueUpdated besides the initial 2
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).toHaveBeenCalledTimes(2);
      expect(
        mockedSubscriptions.mock.instances[0].anyFlagUpdated,
      ).toHaveBeenCalledTimes(1);
    });

    test('broadcast current state to other tabs', () => {
      jest
        .spyOn(global.Date, 'now')
        .mockReturnValue(featureFlagState.timestamp);

      // Test
      client = createClient(apiKey, user, productKey, environment);
      const clientGetStateSpy = jest.spyOn(
        client as any,
        'getCurrentFeatureFlagState',
      );
      (client as any).featureFlagUpdateHttpHandler(initialFlagUpdate);
      expect(clientGetStateSpy).toHaveBeenCalledWith();
      expect(
        mockedBroadcast.mock.instances[0].sendFeatureFlagState,
      ).toHaveBeenCalledWith(featureFlagState);
    });
  });

  describe('featureFlagUpdate via broadcast', () => {
    beforeEach(() => {
      jest
        .spyOn(global.Date, 'now')
        .mockReturnValue(featureFlagState.timestamp);
      jest
        .spyOn(mockedStorage.prototype as any, 'getFlagsState')
        .mockImplementation(() => {
          // deep copy featureFlagState to avoid any modification
          return JSON.parse(JSON.stringify(featureFlagState));
        });
      client = createClient(apiKey, user, productKey, environment);
    });

    test('ignore broadcast flag state with older timestamp', () => {
      const processFeatureFlagUpdateSpy = jest.spyOn(
        client as any,
        'processFeatureFlagUpdate',
      );
      const oldState = JSON.parse(JSON.stringify(featureFlagState));
      oldState.timestamp = 0;

      // Test
      (client as any).featureFlagUpdateBroadcastHandler(oldState);
      expect(processFeatureFlagUpdateSpy).not.toHaveBeenCalled();
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).not.toHaveBeenCalled();
      expect(
        mockedStorage.mock.instances[0].setFlagsState,
      ).not.toHaveBeenCalled();
    });

    test('handles broadcast flag state with change', () => {
      // Test
      (client as any).featureFlagUpdateBroadcastHandler(featureFlagState);
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).not.toHaveBeenCalled();
      expect(
        mockedStorage.mock.instances[0].setFlagsState,
      ).toHaveBeenCalledWith(featureFlagState);
    });

    test('handles broadcast flag state with add/update flags', () => {
      const newState = JSON.parse(JSON.stringify(featureFlagState));
      newState.flags.flagNumber = { value: 1 }; // add
      newState.flags.flagString = { value: 'off' }; // update

      // Test
      (client as any).featureFlagUpdateBroadcastHandler(newState);
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).toHaveBeenCalledWith('flagNumber');
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).toHaveBeenCalledWith('flagString');
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).toHaveBeenCalledTimes(2);
      expect(
        mockedStorage.mock.instances[0].setFlagsState,
      ).toHaveBeenCalledWith(newState);
    });

    test('handles broadcast flag state with delete flags', () => {
      const newState = JSON.parse(JSON.stringify(featureFlagState));
      delete newState.flags.flagString; // delete
      delete newState.flags.flagObj; // delete

      // Test
      (client as any).featureFlagUpdateBroadcastHandler(newState);
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).toHaveBeenCalledWith('flagString');
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).toHaveBeenCalledWith('flagObj');
      expect(
        mockedSubscriptions.mock.instances[0].flagValueUpdated,
      ).toHaveBeenCalledTimes(2);
      expect(
        mockedStorage.mock.instances[0].setFlagsState,
      ).toHaveBeenCalledWith(newState);
    });
  });

  describe('getFlagValue', () => {
    beforeEach(() => {
      client = createClient(apiKey, user, productKey, environment);
    });

    test('returns value if available', () => {
      client.addFlag('someFlagKey', { value: 'someValue' });

      const value: string = client.getFlagValue(
        'someFlagKey',
        'someDefaultValue',
      );
      expect(value).toEqual('someValue');
    });

    test('returns value if flag matches oneOf', () => {
      client.addFlag('someFlagKey', { value: 'someValue' });

      const value: string = client.getFlagValue(
        'someFlagKey',
        'someDefaultValue',
        { oneOf: ['someValue'] },
      );
      expect(value).toEqual('someValue');
    });

    test('returns value if oneOf is empty', () => {
      client.addFlag('someFlagKey', { value: 'someValue' });

      const value: string = client.getFlagValue(
        'someFlagKey',
        'someDefaultValue',
        { oneOf: [] },
      );
      expect(value).toEqual('someValue');
    });

    test('returns defaultValue if flag unavailable', () => {
      const value: string = client.getFlagValue(
        'someFlagKey',
        'someDefaultValue',
      );
      expect(value).toEqual('someDefaultValue');
    });

    test('returns defaultValue if flag does not match oneOf', () => {
      client.addFlag('someFlagKey', { value: 'someValue' });

      const value: string = client.getFlagValue(
        'someFlagKey',
        'someDefaultValue',
        { oneOf: ['someOneOf'] },
      );
      expect(value).toEqual('someDefaultValue');
    });

    test('returns defaultValue if flag types do not match', () => {
      client.addFlag('someFlagKey', { value: true });

      const value: string = client.getFlagValue('someFlagKey', 'defaultValue');
      expect(value).toEqual('defaultValue');
    });

    test('returns boolean value', () => {
      client.addFlag('someFlagKey', { value: true });

      const value: boolean = client.getFlagValue('someFlagKey', false);
      expect(value).toEqual(true);
    });

    test('returns number value', () => {
      client.addFlag('someFlagKey', { value: 1 });

      const value: number = client.getFlagValue('someFlagKey', 2);
      expect(value).toEqual(1);
    });

    test('returns array value', () => {
      client.addFlag('someFlagKey', { value: [1, 2, 3] });

      const value: Array<number> = client.getFlagValue('someFlagKey', [
        4,
        5,
        6,
      ]);
      expect(value).toEqual([1, 2, 3]);
    });

    test('returns map value', () => {
      client.addFlag('someFlagKey', { value: { someFlagValue: true } });

      const value: {
        [key: string]: boolean;
      } = client.getFlagValue('someFlagKey', { someFlagValue: false });
      expect(value).toEqual({ someFlagValue: true });
    });

    test.each`
      variation      | defaultValue
      ${'undefined'} | ${undefined}
      ${'null'}      | ${null}
    `('throws error when defaultValue is $variation', ({ defaultValue }) => {
      expect(() => client.getFlagValue('someFlagKey', defaultValue)).toThrow(
        'defaultValue is missing',
      );
    });
  });

  describe('getFlagDetails', () => {
    const stringRawFlag: RawFlag<string> = {
      value: 'someValue',
      evaluationDetail: {
        reason: EvaluationReason.RULE_MATCH,
        ruleId: chance.string(),
      },
    };

    const booleanRawFlag: RawFlag<boolean> = {
      value: true,
      evaluationDetail: {
        reason: EvaluationReason.TARGET_MATCH,
      },
    };

    beforeEach(() => {
      client = createClient(apiKey, user, productKey, environment);
    });

    test('returns flag if available', () => {
      client.addFlag('someFlagKey', stringRawFlag);

      const returnedFlag: RawFlag<string> = client.getFlagDetails(
        'someFlagKey',
        'someDefaultValue',
      );
      expect(returnedFlag).toEqual(stringRawFlag);
    });

    test('returns flag without evaluationDetail if available', () => {
      const basicRawFlag: RawFlag<boolean> = {
        value: true,
      };
      client.addFlag('someFlagKey', basicRawFlag);

      const returnedFlag: RawFlag<boolean> = client.getFlagDetails(
        'someFlagKey',
        false,
      );
      expect(returnedFlag).toEqual(basicRawFlag);
    });

    test('returns flag if flag matches oneOf', () => {
      client.addFlag('someFlagKey', stringRawFlag);

      const returnedFlag: RawFlag<string> = client.getFlagDetails(
        'someFlagKey',
        'someDefaultValue',
        {
          oneOf: ['someValue'],
        },
      );
      expect(returnedFlag).toEqual(stringRawFlag);
    });

    test('returns flag if oneOf is empty', () => {
      client.addFlag('someFlagKey', stringRawFlag);

      const returnedFlag: RawFlag<string> = client.getFlagDetails(
        'someFlagKey',
        'someDefaultValue',
        { oneOf: [] },
      );
      expect(returnedFlag).toEqual(stringRawFlag);
    });

    test('returns flag with defaultValue and error reason if flag unavailable', () => {
      const defaultRawFlag: RawFlag<string> = {
        value: 'someDefaultValue',
        evaluationDetail: {
          reason: EvaluationReason.ERROR,
          errorKind: EvaluationErrorKind.OTHER,
        },
      };

      const returnedFlag: RawFlag<string> = client.getFlagDetails(
        'someFlagKey',
        'someDefaultValue',
      );
      expect(returnedFlag).toEqual(defaultRawFlag);
    });

    test('returns flag with defaultValue and error reason if flag does not match oneOf', () => {
      client.addFlag('someFlagKey', stringRawFlag);

      const defaultRawFlag: RawFlag<string> = {
        value: 'someDefaultValue',
        evaluationDetail: {
          reason: EvaluationReason.ERROR,
          errorKind: EvaluationErrorKind.VALIDATION_ERROR,
        },
      };

      const returnedFlag: RawFlag<string> = client.getFlagDetails(
        'someFlagKey',
        'someDefaultValue',
        {
          oneOf: ['someOneOf'],
        },
      );
      expect(returnedFlag).toEqual(defaultRawFlag);
    });

    test('returns flag with defaultValue if flag types do not match', () => {
      client.addFlag('someFlagKey', booleanRawFlag);

      const defaultRawFlag: RawFlag<string> = {
        value: 'someDefaultValue',
        evaluationDetail: {
          reason: EvaluationReason.ERROR,
          errorKind: EvaluationErrorKind.WRONG_TYPE,
        },
      };

      const returnedFlag: RawFlag<string> = client.getFlagDetails(
        'someFlagKey',
        'someDefaultValue',
      );
      expect(returnedFlag).toEqual(defaultRawFlag);
    });

    test('returns boolean flag', () => {
      client.addFlag('someFlagKey', booleanRawFlag);

      const returnedFlag: RawFlag<boolean> = client.getFlagDetails(
        'someFlagKey',
        false,
      );
      expect(returnedFlag).toEqual(booleanRawFlag);
    });

    test('returns number flag', () => {
      const numberRawFlag: RawFlag<number> = {
        value: 1,
        evaluationDetail: {
          reason: EvaluationReason.OFF,
        },
      };

      client.addFlag('someFlagKey', numberRawFlag);

      const returnedFlag: RawFlag<number> = client.getFlagDetails(
        'someFlagKey',
        2,
      );
      expect(returnedFlag).toEqual(numberRawFlag);
    });

    test('returns array flag', () => {
      const arrayRawFlag: RawFlag<number[]> = {
        value: [1, 2, 3],
        evaluationDetail: {
          reason: EvaluationReason.OFF,
        },
      };

      client.addFlag('someFlagKey', arrayRawFlag);

      const returnedFlag: RawFlag<
        number[]
      > = client.getFlagDetails('someFlagKey', [4, 5, 6]);
      expect(returnedFlag).toEqual(arrayRawFlag);
    });

    test('returns map flag', () => {
      const mapRawFlag: RawFlag<{ [key: string]: boolean }> = {
        value: { someFlagValue: true },
        evaluationDetail: {
          reason: EvaluationReason.OFF,
        },
      };

      client.addFlag('someFlagKey', mapRawFlag);

      const returnedFlag: RawFlag<{
        [key: string]: boolean;
      }> = client.getFlagDetails('someFlagKey', {
        someFlagValue: false,
      });
      expect(returnedFlag).toEqual(mapRawFlag);
    });

    test.each`
      variation      | defaultValue
      ${'undefined'} | ${undefined}
      ${'null'}      | ${null}
    `('throws error when defaultValue is $variation', ({ defaultValue }) => {
      expect(() => client.getFlagDetails('someFlagKey', defaultValue)).toThrow(
        'defaultValue is missing',
      );
    });
  });

  describe('getFlags', () => {
    beforeEach(() => {
      client = createClient(apiKey, user, productKey, environment);
      client.addFlag(chance.string(), chance.rawFlag());
      client.addFlag(chance.string(), chance.rawFlag());
      client.addFlag(chance.string(), chance.rawFlag());
      client.addFlag(chance.string(), chance.rawFlag());
      client.addFlag(chance.string(), chance.rawFlag());
    });

    test('returns all feature flags in memory', () => {
      const featureFlags = client.getFlags();
      const realFlags = (client as any).flags;

      expect(featureFlags).toEqual(realFlags);
    });

    test('changes to flags does not alter what is stored in memory', () => {
      const featureFlags = client.getFlags();
      const firstFlag = Object.values(featureFlags)[0];
      firstFlag.value = chance.integer(); // Flags are all strings so we dont expect a number
      const realFlags = (client as any).flags;

      expect(featureFlags).not.toEqual(realFlags);
    });
  });

  describe('ready', () => {
    beforeEach(() => {
      client = createClient(apiKey, user, productKey, environment);
    });

    test('triggerReady is not called when there is no data in storage', () => {
      expect(mockedReady.mock.instances[0].triggerReady).not.toHaveBeenCalled();
    });

    test('triggerReady gets called when featureFlagUpdate is triggered', () => {
      (client as any).processFeatureFlagUpdate(fullFlagUpdate);
      expect(mockedReady.mock.instances[0].triggerReady).toHaveBeenCalledTimes(
        1,
      );
    });

    test('triggerReady is called if flag data is cached', () => {
      mockedReady.mockClear();
      const timestamp = chance.minute();
      const version = chance.string();
      const flags: RawFlags = {
        flag1: {
          value: true,
          evaluationDetail: {
            reason: EvaluationReason.RULE_MATCH,
            ruleId: chance.string(),
          },
        },
      };

      jest
        .spyOn(mockedStorage.prototype as any, 'getFlagsState')
        .mockImplementation(() => {
          return { flags, timestamp, version };
        });

      client = createClient(apiKey, user, productKey, environment);

      expect(mockedReady.mock.instances[0].triggerReady).toHaveBeenCalledTimes(
        1,
      );
    });

    test('triggerReady is called if empty flags object is cached', () => {
      mockedReady.mockClear();
      const timestamp = chance.minute();
      const version = chance.string();
      const flags: RawFlags = {};

      jest
        .spyOn(mockedStorage.prototype as any, 'getFlagsState')
        .mockImplementation(() => {
          return { flags, timestamp, version };
        });

      client = createClient(apiKey, user, productKey, environment);

      expect(mockedReady.mock.instances[0].triggerReady).toHaveBeenCalledTimes(
        1,
      );
    });

    test('reset should be called on updateFeatureFlagUser with different user', () => {
      expect(mockedReady.mock.instances[0].reset).not.toHaveBeenCalled();
      user = chance.user();
      client.updateFeatureFlagUser(user);
      expect(mockedReady.mock.instances[0].reset).toHaveBeenCalledTimes(1);
    });

    test('reset should not be called on updateFeatureFlagUser with the same user', () => {
      client.updateFeatureFlagUser(user);
      expect(mockedReady.mock.instances[0].reset).not.toHaveBeenCalled();
    });

    describe('reasons from fetch should ready with correct response', () => {
      test('server 400 status code', () => {
        (client as any).featureFlagUpdateFailedHandler(400);
        expect(
          mockedReady.mock.instances[0].triggerReady,
        ).toHaveBeenCalledTimes(1);
        expect(mockedReady.mock.instances[0].triggerReady).toHaveBeenCalledWith(
          {
            message:
              'Service returned bad request response code. The version data maybe malformed or out of sync with the server.',
            reason: ReadyReason.CLIENT_ERROR,
          },
        );
      });

      test('server 401 status code', () => {
        (client as any).featureFlagUpdateFailedHandler(401);
        expect(
          mockedReady.mock.instances[0].triggerReady,
        ).toHaveBeenCalledTimes(1);
        expect(mockedReady.mock.instances[0].triggerReady).toHaveBeenCalledWith(
          {
            message:
              'Service returned unauthorized response code. Ensure that the API token is valid for this environment.',
            reason: ReadyReason.CLIENT_ERROR,
          },
        );
      });
      test('server 429 status code', () => {
        (client as any).featureFlagUpdateFailedHandler(429);
        expect(
          mockedReady.mock.instances[0].triggerReady,
        ).toHaveBeenCalledTimes(1);
        expect(mockedReady.mock.instances[0].triggerReady).toHaveBeenCalledWith(
          {
            message: 'Service rate limit exceeded.',
            reason: ReadyReason.CLIENT_ERROR,
          },
        );
      });

      test('server 500 status code', () => {
        (client as any).featureFlagUpdateFailedHandler(500);
        expect(
          mockedReady.mock.instances[0].triggerReady,
        ).toHaveBeenCalledTimes(1);
        expect(mockedReady.mock.instances[0].triggerReady).toHaveBeenCalledWith(
          {
            message: 'Service is unavailable, status code: 500',
            reason: ReadyReason.SERVER_ERROR,
          },
        );
      });

      test('server 418 status code', () => {
        (client as any).featureFlagUpdateFailedHandler(418);
        expect(
          mockedReady.mock.instances[0].triggerReady,
        ).toHaveBeenCalledTimes(1);
        expect(mockedReady.mock.instances[0].triggerReady).toHaveBeenCalledWith(
          {
            message: 'Unsure what went wrong, status code: 418',
            reason: ReadyReason.CLIENT_ERROR,
          },
        );
      });
    });
  });

  describe('exposureEvents', () => {
    beforeEach(() => {
      client = createClient(apiKey, user, productKey, environment);
    });

    test('sends cached flag details', () => {
      const flagKey = chance.string();
      const value = chance.string();
      const reason = chance.pickone(Object.values(EvaluationReason));
      const ruleId = chance.string();
      const evaluationDetail = {
        reason,
        ruleId,
      };

      const flag = {
        value,
        evaluationDetail,
      };
      const exposureData = {
        someData: chance.string(),
      };

      client.addFlag(flagKey, flag);
      client.getFlagValue(flagKey, chance.string(), {
        shouldSendExposureEvent: true,
        exposureData,
      });
      expect(
        mockedExposureEvents.mock.instances[0].sendExposureEvent,
      ).toHaveBeenCalledWith(
        flagKey,
        { value, evaluationDetail },
        true,
        exposureData,
      );
    });

    it.each`
      refreshStatus                | expectedErrorKind
      ${RefreshStatus.INITIALISED} | ${EvaluationErrorKind.CLIENT_NOT_READY}
      ${RefreshStatus.ERROR}       | ${EvaluationErrorKind.SERVER_ERROR}
      ${RefreshStatus.SUCCESS}     | ${EvaluationErrorKind.FLAG_NOT_FOUND}
    `(
      'sends correct error when flag is missing and refreshStatus is $refreshStatus',
      ({ refreshStatus, expectedErrorKind }) => {
        const flagKey = chance.string();
        const defaultValue = chance.string();

        jest
          .spyOn(Refresh.prototype, 'getStatus')
          .mockReturnValueOnce(refreshStatus);

        client.getFlagValue(flagKey, defaultValue, {
          shouldSendExposureEvent: true,
        });
        expect(
          mockedExposureEvents.mock.instances[0].sendExposureEvent,
        ).toHaveBeenCalledWith(
          flagKey,
          {
            value: defaultValue,
            evaluationDetail: {
              reason: EvaluationReason.ERROR,
              errorKind: expectedErrorKind,
            },
          },
          true,
          undefined,
        );
      },
    );

    test('sends WRONG_TYPE error when value and default types do not match', () => {
      const flagKey = chance.string();
      const flag = {
        value: chance.string(),
      };
      client.addFlag(flagKey, flag);

      client.getFlagValue(flagKey, true, { shouldSendExposureEvent: true });
      expect(
        mockedExposureEvents.mock.instances[0].sendExposureEvent,
      ).toHaveBeenCalledWith(
        flagKey,
        {
          value: true,
          evaluationDetail: {
            reason: EvaluationReason.ERROR,
            errorKind: EvaluationErrorKind.WRONG_TYPE,
          },
        },
        true,
        undefined,
      );
    });

    test('sends VALIDATION_ERROR error when value not in oneOf', () => {
      const flagKey = chance.string();

      // Ensure the values have different lengths so we avoid any collisions
      const value = chance.string({ length: 7 });
      const defaultValue = chance.string({ length: 6 });
      const oneOfValue = chance.string({ length: 5 });

      client.addFlag(flagKey, { value });

      client.getFlagValue(flagKey, defaultValue, {
        oneOf: [oneOfValue],
        shouldSendExposureEvent: true,
      });
      expect(
        mockedExposureEvents.mock.instances[0].sendExposureEvent,
      ).toHaveBeenCalledWith(
        flagKey,
        {
          value: defaultValue,
          evaluationDetail: {
            reason: EvaluationReason.ERROR,
            errorKind: EvaluationErrorKind.VALIDATION_ERROR,
          },
        },
        true,
        undefined,
      );
    });
  });

  describe('on', () => {
    beforeEach(() => {
      client = createClient(apiKey, user, productKey, environment);
    });

    test.each`
      variation           | option
      ${'no option'}      | ${undefined}
      ${'minimal option'} | ${minimalGetValueOptions}
      ${'full option'}    | ${fullGetValueOptions}
    `('should make subscription with $variation', ({ option }) => {
      const callback = jest.fn();
      client.on('someFlagKey', 'someDefaultValue', callback, option);
      expect(mockedSubscriptions.mock.instances[0].on).toHaveBeenCalledWith(
        'someFlagKey',
        'someDefaultValue',
        callback,
        expect.any(Function),
        option,
      );
    });

    test.each`
      variation      | defaultValue
      ${'undefined'} | ${undefined}
      ${'null'}      | ${null}
    `('throws error when defaultValue is $variation', ({ defaultValue }) => {
      expect(() =>
        client.on('someFlagKey', defaultValue, (): void => {}),
      ).toThrow('defaultValue is missing');
    });
  });

  describe('destroy', () => {
    test('should stop refresher and subscriptions', () => {
      client = createClient(apiKey, user, productKey, environment);
      client.destroy();
      expect(mockedRefresh.mock.instances[0].stop).toHaveBeenCalled();
      expect(mockedSubscriptions.mock.instances[0].stop).toHaveBeenCalled();
    });
  });
});
