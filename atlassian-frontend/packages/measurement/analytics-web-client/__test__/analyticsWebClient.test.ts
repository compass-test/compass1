import './util/jestConfigReset.helper';

import * as XIDLib from '@atlassian/atl-cross-domain-tracking/dist/esm';

import AnalyticsWebClient, {
  envType,
  eventType,
  originType,
  userType,
} from '../src';
import { platformType } from '../src/analyticsWebTypes';
import getResilienceQueue, {
  IntermediateBatchableQueue,
} from '../src/integration/intermediateResilienceQueue';
import * as WrapCallback from '../src/wrapCallback';

import { ACTION_EVENT, PRODUCT_INFO, USER_ID } from './util/commonTests';
import { waitForEventsToSend } from './util/commonUtil';
import {
  createDefaultMockXHR,
  createMockXHR,
  getEventsFromMockXHR,
} from './util/mockXHR';

declare let require: any;

const Analytics = require('@segment/analytics.js-core/lib/analytics');
const AnalyticsUser = require('@segment/analytics.js-core/lib/user');

jest.mock('../src/integration/intermediateResilienceQueue', () => ({
  __esModule: true,
  ...jest.requireActual<any>('../src/integration/intermediateResilienceQueue'),
  default: jest.fn(),
}));

const emptyFunction = () => {
  // do nothing
};

// eslint-disable-next-line no-console
const consoleError = console.error;

describe('AnalyticsWebClient', () => {
  let intermediateResilienceQueue: IntermediateBatchableQueue | undefined;

  beforeEach(() => {
    jest.useFakeTimers();
    // Provides a way to get a new queue every test
    (getResilienceQueue as jest.Mock).mockImplementation((
      retryQueuePrefix: string,
      product: string,
      queueOptions: any
    ) => {
      if (!intermediateResilienceQueue) {
        intermediateResilienceQueue = new IntermediateBatchableQueue(retryQueuePrefix, product, queueOptions);
      }
      return intermediateResilienceQueue;
    });
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  afterEach(() => {
    // The user object in Segment analytics persists state between tests.
    // We need to reset it to null to ensure it doesnt pollute other tests.
    AnalyticsUser.id(null);
    intermediateResilienceQueue = undefined;
    // eslint-disable-next-line no-console
    console.error = consoleError;
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    test('should not throw if minimum required values are passed', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new AnalyticsWebClient({
          env: envType.DEV,
          product: 'test',
        });
      }).not.toThrow();
    });

    test('should throw if `productInfo` is missing', () => {
      expect(() => {
        // @ts-ignore Running a test on misconfigured API
        new AnalyticsWebClient(); // eslint-disable no-new
      }).toThrow('Missing productInfo');
    });

    test('should throw if `productInfo.env` is missing', () => {
      expect(() => {
        // @ts-ignore Running a test on misconfigured API
        // eslint-disable-next-line no-new
        new AnalyticsWebClient({
          product: 'test',
        });
      }).toThrow('Missing productInfo.env');
    });

    test('should throw if `productInfo.env` is invalid', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new AnalyticsWebClient({
          env: 'blah',
          product: 'test',
        });
      }).toThrow(
        "Invalid productInfo.env 'blah', must be an envType: [local,dev,staging,prod]",
      );
    });

    test('should throw if `productInfo.product` is missing', () => {
      expect(() => {
        // @ts-ignore Running a test on misconfigured API
        // eslint-disable-next-line no-new
        new AnalyticsWebClient({
          env: envType.DEV,
        });
      }).toThrow('Missing productInfo.product');
    });

    test('should default `origin` to `originType.WEB` if `productInfo.origin` is not passed in', () => {
      const client = new AnalyticsWebClient({
        env: envType.DEV,
        product: 'test',
        // @ts-ignore checking weird configurations
        origin: null,
      });
      // eslint-disable-next-line no-underscore-dangle
      expect(client._productInfo.origin).toEqual(originType.WEB);
    });

    test('should throw if `productInfo.origin` is invalid', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new AnalyticsWebClient({
          env: envType.DEV,
          product: 'test',
          origin: 'blah',
        });
      }).toThrow(
        "Invalid productInfo.origin 'blah', must be an originType: [desktop,web]",
      );
    });

    test('should default `platform` to origin if `productInfo.platform` is not passed in', () => {
      const webClient = new AnalyticsWebClient({
        env: envType.DEV,
        product: 'test',
        origin: originType.WEB,
      });
      // eslint-disable-next-line no-underscore-dangle
      expect(webClient._productInfo.platform).toEqual(platformType.WEB);

      const desktopClient = new AnalyticsWebClient({
        env: envType.DEV,
        product: 'test',
        origin: originType.DESKTOP,
      });
      // eslint-disable-next-line no-underscore-dangle
      expect(desktopClient._productInfo.platform).toEqual(platformType.DESKTOP);
    });

    test('should throw if `productInfo.platform` is invalid', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new AnalyticsWebClient({
          env: envType.DEV,
          product: 'test',
          origin: originType.WEB,
          platform: 'blah',
        });
      }).toThrow(
        "Invalid productInfo.platform 'blah', must be a platformType: [mac,linux,windows,desktop,web,mobileWeb]",
      );
    });
    test('should throw if `productInfo.platform` does not match `productInfo.origin`', () => {
      expect(() => {
        // eslint-disable-next-line no-new
        new AnalyticsWebClient({
          env: envType.DEV,
          product: 'test',
          origin: originType.WEB,
          platform: platformType.LINUX,
        });
      }).toThrow(
        "Invalid productInfo.platform 'linux', must be one of [web, mobileWeb]",
      );

      expect(() => {
        // eslint-disable-next-line no-new
        new AnalyticsWebClient({
          env: envType.DEV,
          product: 'test',
          origin: originType.DESKTOP,
          platform: platformType.WEB,
        });
      }).toThrow(
        "Invalid productInfo.platform 'web', must be one of [mac, linux, windows]",
      );
    });
    test('should convert `productInfo.subproduct` to getter', () => {
      const client = new AnalyticsWebClient({
        ...PRODUCT_INFO,
        subproduct: 'whatever',
      });
      // eslint-disable-next-line no-underscore-dangle
      expect(client._productInfo.subproduct()).toEqual('whatever');
    });
    test('should create a function which returns `undefined` when passed getter throws', () => {
      const client = new AnalyticsWebClient({
        ...PRODUCT_INFO,
        subproduct: () => {
          throw new Error('Oops');
        },
      });
      // eslint-disable-next-line no-underscore-dangle
      expect(client._productInfo.subproduct()).toBeUndefined();
      // eslint-disable-next-line no-console
      expect(console.error).toBeCalledWith(
        'Cannot get subproduct from the callback. Proceeding without it. - Oops',
      );
    });
  });

  describe('retries', () => {
    const oldXMLHttpRequest = window.XMLHttpRequest;
    let mockXHR: any;
    let client: any;

    beforeEach(() => {
      mockXHR = createMockXHR({
        success: false,
      });

      mockXHR.send = jest.fn(() => {
        mockXHR.status = 429;
        mockXHR.onreadystatechange();
      });

      // @ts-ignore
      window.XMLHttpRequest = jest.fn(() => mockXHR);
      client = new AnalyticsWebClient(PRODUCT_INFO, {
        maxRetryAttempts: 1,
      });
      jest.useFakeTimers();
    });

    afterEach(() => {
      client.clearUserInfo();
      waitForEventsToSend();
      window.XMLHttpRequest = oldXMLHttpRequest;
    });

    test('should retry the event the correct number of times', () => {
      const event = { ...ACTION_EVENT, eventType: eventType.TRACK };
      client.onEvent('analyticsId', event);

      jest.runTimersToTime(10000);
      expect(mockXHR.send).toHaveBeenCalledTimes(2);
    });
  });

  describe('onEvent', () => {
    const oldXMLHttpRequest = window.XMLHttpRequest;
    let mockXHR: any;
    let client: any;

    beforeEach(() => {
      mockXHR = createDefaultMockXHR();
      // @ts-ignore
      window.XMLHttpRequest = jest.fn(() => mockXHR);
      client = new AnalyticsWebClient(PRODUCT_INFO);
    });

    afterEach(() => {
      waitForEventsToSend();
      client.clearUserInfo();
      // @ts-ignore
      window.XMLHttpRequest = oldXMLHttpRequest;
    });

    test('should throw if `analyticsData` is missing', () => {
      expect(() => {
        client.onEvent();
      }).toThrow('Missing analyticsData');
    });

    test('should throw if `analyticsData.eventType` is missing', () => {
      expect(() => {
        client.onEvent('analyticsId', ACTION_EVENT);
      }).toThrow('Missing analyticsData.eventType');
    });

    test('should throw if `analyticsData.eventType` is invalid', () => {
      expect(() => {
        client.onEvent('analyticsId', { ...ACTION_EVENT, eventType: 'blah' });
      }).toThrow(
        "Invalid analyticsData.eventType 'blah', must be an eventType: [track,ui,operational,screen,identify]",
      );
    });

    test('should send track event', () => {
      const spy = jest.spyOn(client, 'sendTrackEvent');
      const event = { ...ACTION_EVENT, eventType: eventType.TRACK };
      client.onEvent('analyticsId', event);

      expect(spy).toHaveBeenCalledTimes(1);

      expect(spy).toHaveBeenCalledWith(event);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.eventType).toEqual(eventType.TRACK);
      expect(request.type).toEqual('track');
    });

    test('should send ui event', () => {
      const spy = jest.spyOn(client, 'sendUIEvent');
      const event = { ...ACTION_EVENT, eventType: eventType.UI };
      client.onEvent('analyticsId', event);

      expect(spy).toHaveBeenCalledTimes(1);

      expect(spy).toHaveBeenCalledWith(event);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.eventType).toEqual(eventType.UI);
      expect(request.type).toEqual('track');
    });

    test('should send operational event', () => {
      const spy = jest.spyOn(client, 'sendOperationalEvent');
      const event = { ...ACTION_EVENT, eventType: eventType.OPERATIONAL };
      client.onEvent('analyticsId', event);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(event);

      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.eventType).toEqual(eventType.OPERATIONAL);
      expect(request.type).toEqual('track');
    });

    test('should send all events even if subproduct getter throws', () => {
      client.setSubproduct(() => {
        throw new Error('Oops');
      });

      client.onEvent('analyticsId', {
        ...ACTION_EVENT,
        eventType: eventType.UI,
      });

      client.setSubproduct('good-one');

      client.onEvent('analyticsId', {
        ...ACTION_EVENT,
        eventType: eventType.UI,
      });
      client.onEvent('analyticsId', {
        ...ACTION_EVENT,
        eventType: eventType.OPERATIONAL,
      });
      client.onEvent('analyticsId', {
        ...ACTION_EVENT,
        eventType: eventType.TRACK,
      });

      waitForEventsToSend();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const events = getEventsFromMockXHR(mockXHR, 4);

      const ui1Request = events[0];
      expect(ui1Request.properties.subproduct).toBeUndefined();
      expect(ui1Request.properties.eventType).toEqual(eventType.UI);

      expect(ui1Request.type).toEqual('track');
      const ui2Request = events[1];
      expect(ui2Request.properties.eventType).toEqual(eventType.UI);
      expect(ui2Request.type).toEqual('track');

      const operationalRequest = events[2];
      expect(operationalRequest.properties.eventType).toEqual(
        eventType.OPERATIONAL,
      );

      expect(operationalRequest.type).toEqual('track');
      const trackRequest = events[3];
      expect(trackRequest.properties.eventType).toEqual(eventType.TRACK);
      expect(trackRequest.type).toEqual('track');

      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line no-console
      expect(console.error).toBeCalledWith(
        'Cannot get subproduct from the callback. Proceeding without it. - Oops',
      );
    });
  });

  describe('apiHost', () => {
    const STARGATE_PROXY_PATH = '/gateway/api/gasv3/api/v1';

    const PROD_BASE_URL = 'https://as.atlassian.com/api/v1';
    const STAGING_BASE_URL = 'https://as.staging.atl-paas.net/api/v1';
    const STARGATE_PROD_BASE_URL = 'https://api-private.atlassian.com/gasv3/api/v1';
    const STARGATE_STAGING_BASE_URL = 'https://api-private.stg.atlassian.com/gasv3/api/v1';

    const oldXMLHttpRequest = window.XMLHttpRequest;
    const oldLocation = window.location;
    let mockXHR: any;

    beforeEach(() => {
      mockXHR = createDefaultMockXHR();
      // @ts-ignore
      window.XMLHttpRequest = jest.fn(() => mockXHR);
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          host: 'test.atlassian.net',
        },
      });
    });

    afterEach(() => {
      // @ts-ignore
      window.XMLHttpRequest = oldXMLHttpRequest;
      window.location = oldLocation;
    });

    function testHost(client: any, expectedBaseUrl: string) {
      client.sendScreenEvent('page');
      client.sendTrackEvent(ACTION_EVENT);
      client.sendUIEvent(ACTION_EVENT);
      client.sendOperationalEvent(ACTION_EVENT);
      client.sendIdentifyEvent(userType.ATLASSIAN_ACCOUNT, USER_ID);
      waitForEventsToSend();

      expect(mockXHR.open).toHaveBeenCalledTimes(1);
      expect(mockXHR.open.mock.calls[0][1]).toEqual(`${expectedBaseUrl}/batch`);
    }

    test('should be set to staging for `envType.LOCAL`', () => {
      const client = new AnalyticsWebClient(
        {
          env: envType.LOCAL,
          product: 'test',
        },
        {
          useStargate: false,
        },
      );

      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          href: STAGING_BASE_URL,
          hash: '',
          host: STAGING_BASE_URL,
        },
      });

      testHost(client, STAGING_BASE_URL);
    });

    test('should be set to staging for `envType.DEV`', () => {
      const client = new AnalyticsWebClient(
        {
          env: envType.DEV,
          product: 'test',
        },
        {
          useStargate: false,
        },
      );

      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          href: STAGING_BASE_URL,
          hash: '',
          host: STAGING_BASE_URL,
        },
      });

      testHost(client, STAGING_BASE_URL);
    });

    test('should be set to staging for `envType.STAGING`', () => {
      const client = new AnalyticsWebClient(
        {
          env: envType.STAGING,
          product: 'test',
        },
        {
          useStargate: false,
        },
      );

      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          href: STAGING_BASE_URL,
          hash: '',
          host: STAGING_BASE_URL,
        },
      });

      testHost(client, STAGING_BASE_URL);
    });

    test('should be set to prod for `envType.PROD`', () => {
      const client = new AnalyticsWebClient(
        {
          env: envType.PROD,
          product: 'test',
        },
        {
          useStargate: false,
        }
      );

      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          href: PROD_BASE_URL,
          hash: '',
          host: PROD_BASE_URL,
        },
      });

      testHost(client, PROD_BASE_URL);
    });

    test('should be set to staging stargate if useLegacyUrl is true', () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          href: 'test.net',
          hash: '',
          host: 'test.net',
        },
      });

      const client = new AnalyticsWebClient({
        env: envType.STAGING,
        product: 'test',
      },
      {
        useLegacyUrl: true,
      });

      testHost(client, STARGATE_STAGING_BASE_URL);
    });

    test('should be set to prod stargate if useLegacyUrl is true', () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          href: 'test.net',
          hash: '',
          host: 'test.net',
        },
      });

      const client = new AnalyticsWebClient({
        env: envType.PROD,
        product: 'test',
      },
      {
        useLegacyUrl: true,
      });

      testHost(client, STARGATE_PROD_BASE_URL);
    });

    test('should use stargate proxy urls by default', () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          href: 'test.net',
          hash: '',
          host: 'test.net',
        },
      });

      const client = new AnalyticsWebClient({
        env: envType.PROD,
        product: 'test',
      });

      testHost(client, `https://test.net${STARGATE_PROXY_PATH}`);
    });

    test('should use `settings.apiHost` if provided', () => {
      const client = new AnalyticsWebClient(PRODUCT_INFO, {
        apiHost: 'example.com',
      });
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          host: 'example.com',
          href: 'example.com',
          hash: '',
        },
      });

      testHost(client, 'https://example.com');
    });
  });

  describe('xidConsent', () => {
    const oldXMLHttpRequest = window.XMLHttpRequest;
    const dummyXid = [{ type: 'xc', state: 'ERROR' }];
    const timeoutXid = [
      { type: 'xc', state: 'TIMEOUT' },
      { type: 'uid', state: 'TIMEOUT' },
    ];
    const unknownXid = [
      { type: 'xc', state: 'UNKNOWN' },
      { type: 'uid', state: 'UNKNOWN' },
    ];
    const xidResolver = new Promise((resolve) => resolve(() => dummyXid));
    let mockXHR: any;
    let client;
    const spyXid: any = jest.spyOn(XIDLib, 'XID');

    beforeEach(() => {
      mockXHR = createDefaultMockXHR();
      // @ts-ignore
      window.XMLHttpRequest = jest.fn(() => mockXHR);
      spyXid.mockImplementation(() => ({
        getXidCallbackForPromise: () => xidResolver,
      }));
    });

    afterEach(() => {
      window.XMLHttpRequest = oldXMLHttpRequest;
      jest.clearAllMocks();
    });

    test('should NOT send requests with xid by default', () => {
      client = new AnalyticsWebClient(PRODUCT_INFO);
      client.sendScreenEvent('page');

      waitForEventsToSend();

      expect(mockXHR.open).toHaveBeenCalledTimes(1);
      const events = getEventsFromMockXHR(mockXHR, 1);
      const pageRequest = events[0];

      expect(pageRequest.properties.xid).toEqual(undefined);
    });

    test('should NOT send requests with xid when xidConsent is falsy', () => {
      client = new AnalyticsWebClient(PRODUCT_INFO, { xidConsent: false });
      client.sendScreenEvent('page');

      waitForEventsToSend();

      expect(mockXHR.open).toHaveBeenCalledTimes(1);
      const events = getEventsFromMockXHR(mockXHR, 1);
      const pageRequest = events[0];

      expect(pageRequest.properties.xid).toEqual(undefined);
    });

    test('should send unknown xid when error throw from xidPromise', async (done: any) => {
      spyXid.mockImplementation(() => ({
        getXidCallbackForPromise: () => Promise.reject(),
      }));

      client = new AnalyticsWebClient(PRODUCT_INFO, { xidConsent: true });
      client.sendScreenEvent('page');

      waitForEventsToSend();
      // @ts-ignore
      setImmediate(() => {
        expect(mockXHR.open).toHaveBeenCalledTimes(1);

        const events = getEventsFromMockXHR(mockXHR, 1);
        const pageRequest = events[0];
        expect(pageRequest.properties.xid).toEqual(unknownXid);
        done();
      });
    });

    test('should send timeout xid when xidPromise fail to resolve in time', async (done: any) => {
      spyXid.mockImplementation(() => ({
        getXidCallbackForPromise: () => new Promise((resolve) => resolve(emptyFunction)),
      }));

      client = new AnalyticsWebClient(PRODUCT_INFO, { xidConsent: true });
      client.sendScreenEvent('page');

      waitForEventsToSend();
      jest.runTimersToTime(5000);
      // @ts-ignore
      setImmediate(() => {
        expect(mockXHR.open).toHaveBeenCalledTimes(1);

        const events = getEventsFromMockXHR(mockXHR, 1);
        const pageRequest = events[0];

        expect(pageRequest.properties.xid).toEqual(timeoutXid);
        done();
      });
    });

    test('should send single request with xid', async (done: any) => {
      client = new AnalyticsWebClient(PRODUCT_INFO, { xidConsent: true });
      client.sendScreenEvent('page');

      waitForEventsToSend();
      // @ts-ignore
      setImmediate(() => {
        expect(mockXHR.open).toHaveBeenCalledTimes(1);
        const events = getEventsFromMockXHR(mockXHR, 1);
        const pageRequest = events[0];
        expect(pageRequest.properties.xid).toEqual(dummyXid);
        done();
      });
    });

    test('should send batch requests with xid', async (done: any) => {
      client = new AnalyticsWebClient(PRODUCT_INFO, { xidConsent: true });
      client.sendScreenEvent('page');
      client.sendTrackEvent(ACTION_EVENT);
      client.sendUIEvent(ACTION_EVENT);
      client.sendOperationalEvent(ACTION_EVENT);
      client.sendIdentifyEvent(userType.ATLASSIAN_ACCOUNT, USER_ID);

      waitForEventsToSend();
      // @ts-ignore
      setImmediate(() => {
        expect(mockXHR.open).toHaveBeenCalledTimes(1);

        const events = getEventsFromMockXHR(mockXHR, 5);
        const pageRequest = events[0];
        const trackRequest = events[1];
        const uiRequest = events[2];
        const operationalRequest = events[3];
        const identifyRequest = events[4];

        expect(pageRequest.properties.xid).toEqual(dummyXid);
        expect(trackRequest.properties.xid).toEqual(dummyXid);
        expect(uiRequest.properties.xid).toEqual(dummyXid);
        expect(operationalRequest.properties.xid).toEqual(dummyXid);
        expect(identifyRequest.traits.xid).toEqual(dummyXid);
        done();
      });
    });
  });

  describe('metadata', () => {
    const oldXMLHttpRequest = window.XMLHttpRequest;
    let mockXHR: any;
    let client: any;

    beforeEach(() => {
      localStorage.clear();
      mockXHR = createDefaultMockXHR();
      // @ts-ignore
      window.XMLHttpRequest = jest.fn(() => mockXHR);
      client = new AnalyticsWebClient(PRODUCT_INFO);
    });

    afterEach(() => {
      // @ts-ignore
      window.XMLHttpRequest = oldXMLHttpRequest;
      localStorage.clear();
    });

    test('should send requests with metadata', () => {
      client.sendScreenEvent('page');
      client.sendTrackEvent(ACTION_EVENT);
      client.sendUIEvent(ACTION_EVENT);
      client.sendOperationalEvent(ACTION_EVENT);
      client.sendIdentifyEvent(userType.ATLASSIAN_ACCOUNT, USER_ID);

      const expectedMetadata = {
        bundled: ['BeforeSend', 'Segment.io'],
        unbundled: ['Amplitude'],
      };

      waitForEventsToSend();

      expect(mockXHR.open).toHaveBeenCalledTimes(1);
      const request = JSON.parse(mockXHR.send.mock.calls[0][0]);
      const batchMetadata = request.metadata;

      const events = getEventsFromMockXHR(mockXHR, 5);
      const pageRequest = events[0];
      const trackRequest = events[1];
      const uiRequest = events[2];
      const operationalRequest = events[3];
      const identifyRequest = events[4];

      /* eslint-disable no-underscore-dangle */
      expect(pageRequest._metadata).toEqual(expectedMetadata);
      expect(trackRequest._metadata).toEqual(expectedMetadata);
      expect(uiRequest._metadata).toEqual(expectedMetadata);
      expect(operationalRequest._metadata).toEqual(expectedMetadata);
      expect(identifyRequest._metadata).toEqual(expectedMetadata);
      /* eslint-enable no-underscore-dangle */

      expect(batchMetadata).toEqual({
        eventCount: 5,
        resilienceMechanism: '@segment/localstorage-retry'
      });
    });

    test('should update metadata on requests with each failed attempt', () => {
      mockXHR.send
        .mockImplementationOnce(() => {
          mockXHR.status = 429;
          mockXHR.onreadystatechange();
        })
        .mockImplementation(() => {
          mockXHR.status = 200;
          mockXHR.onreadystatechange();
        });

      const expectedMetadata = {
        bundled: ['BeforeSend', 'Segment.io'],
        unbundled: ['Amplitude'],
        failedAttempts: 1,
      };

      client.sendScreenEvent('page');
      client.sendTrackEvent(ACTION_EVENT);
      client.sendUIEvent(ACTION_EVENT);

      waitForEventsToSend();
      jest.runTimersToTime(5000);

      expect(mockXHR.send).toHaveBeenCalledTimes(2);
      const request = JSON.parse(mockXHR.send.mock.calls[1][0]);
      const batchMetadata = request.metadata;

      const events = request.batch;
      const pageRequest = events[0];
      const trackRequest = events[1];
      const uiRequest = events[2];

      /* eslint-disable no-underscore-dangle */
      expect(pageRequest._metadata).toEqual(expectedMetadata);
      expect(trackRequest._metadata).toEqual(expectedMetadata);
      expect(uiRequest._metadata).toEqual(expectedMetadata);
      /* eslint-enable no-underscore-dangle */

      expect(batchMetadata).toEqual({
        eventCount: 3,
        httpRetryCount: 1,
        resilienceMechanism: '@segment/localstorage-retry'
      });
    });

    test('should update batch metadata on requests with droped events from retry', () => {
      let fetchCounter = 0;
      const fetchFixAfter = 5;
      mockXHR.send.mockImplementation(() => {
        mockXHR.status = fetchCounter > fetchFixAfter ? 200 : 429;
        mockXHR.onreadystatechange();
        fetchCounter++;
      });

      client.sendScreenEvent('page');

      jest.runTimersToTime(35000);
      expect(mockXHR.send).toHaveBeenCalledTimes(5);
      client.sendTrackEvent(ACTION_EVENT);
      jest.runTimersToTime(30000);

      expect(mockXHR.send).toHaveBeenCalledTimes(6);
      const request = JSON.parse(mockXHR.send.mock.calls[5][0]);
      const batchMetadata = request.metadata;

      expect(batchMetadata).toEqual({
        eventCount: 2,
        httpRetryCount: 5,
        itemsDiscardedByRetry: 1,
        resilienceMechanism: '@segment/localstorage-retry'
      });
    });
  });

  describe('additional attributes', () => {
    let spy: any;

    beforeEach(() => {
      spy = jest.spyOn(Analytics.prototype, 'page');
    });

    afterEach(() => {
      spy.mockRestore();
    });

    const createClient = () => {
      const client = new AnalyticsWebClient({
        env: envType.LOCAL,
        product: 'test',
      });
      return client;
    };

    test('should support passing attributes with correct types', () => {
      const client = createClient();
      client.sendScreenEvent('page', emptyFunction, { attribute1: 1 });

      expect(spy).toHaveBeenCalledTimes(1);
      const [name, event] = spy.mock.calls[0];
      expect(name).toBe('page');
      expect(event).toHaveProperty('attributes', { attribute1: 1 });
    });
    [null, 'wrong attribute type', undefined, [], [100, 200], {}].forEach(
      (wrongType) => {
        test('should ignore attributes if there are not of type object with map shape {key: value}', () => {
          const client = createClient();
          client.sendScreenEvent('page', emptyFunction, wrongType);
          expect(spy).toHaveBeenCalledTimes(1);
          const [name, event] = spy.mock.calls[0];
          expect(name).toBe('page');
          expect(event).not.toHaveProperty('attributes');
        });
      },
    );
  });

  describe('setSubproduct', () => {
    test('should be converted to getter', () => {
      const client = new AnalyticsWebClient(PRODUCT_INFO);
      client.setSubproduct('strValue');
      // eslint-disable-next-line no-underscore-dangle
      expect(client._productInfo.subproduct()).toEqual('strValue');
    });

    test('should create a function which returns `undefined` when passed getter throws', () => {
      const client = new AnalyticsWebClient(PRODUCT_INFO);
      client.setSubproduct(() => {
        throw new Error('Oops');
      });
      // eslint-disable-next-line no-underscore-dangle
      expect(client._productInfo.subproduct()).toBeUndefined();
      // eslint-disable-next-line no-console
      expect(console.error).toBeCalledWith(
        'Cannot get subproduct from the callback. Proceeding without it. - Oops',
      );
    });
  });

  describe('wrapCallback', () => {
    const spy: any = jest.spyOn(WrapCallback, 'default');
    const createClient = () => {
      const client = new AnalyticsWebClient({
        env: envType.LOCAL,
        product: 'test',
      });
      return client;
    };

    test('should pass in screen event with name attached to wrapCallback', () => {
      const client = createClient();
      const eventAttributes = { attribute1: 1 };
      client.sendScreenEvent('page', emptyFunction, eventAttributes);
      expect(spy).toHaveBeenCalledTimes(1);
      // First argument of wrapCallback is `callback`, we want to assert on the second argument which is the event
      const builtEventWithName = spy.mock.calls[0][1];
      expect(builtEventWithName).toHaveProperty('name', 'page');
    });
  });

  describe('setUiViewedAttributes', () => {
    let client: any;

    beforeEach(() => {
      client = new AnalyticsWebClient(PRODUCT_INFO);
    });

    test('should set uiViewedAttributes', () => {
      const exampleExtraAttributes = {
        sampleAttribute1: '123',
        sampleAttribute2: ['A', 'B', 'C'],
      };

      client.setUIViewedAttributes(exampleExtraAttributes);
      // eslint-disable-next-line no-underscore-dangle
      expect(client._uiViewedAttributes).toEqual(exampleExtraAttributes);
    });

    test('should clear uiViewedAttributes', () => {
      const exampleExtraAttributes = {
        sampleAttribute1: '123',
        sampleAttribute2: ['A', 'B', 'C'],
      };

      client.setUIViewedAttributes(exampleExtraAttributes);
      // eslint-disable-next-line no-underscore-dangle
      expect(client._uiViewedAttributes).toEqual(exampleExtraAttributes);

      client.clearUIViewedAttributes();
      // eslint-disable-next-line no-underscore-dangle
      expect(client._uiViewedAttributes).toEqual({});
    });

    test('should error when attributes is not an object', () => {
      expect(() => client.setUIViewedAttributes(1)).toThrow(
        'Invalid uiViewedAttributes type, should be a non array object',
      );
      expect(() => client.setUIViewedAttributes(true)).toThrow(
        'Invalid uiViewedAttributes type, should be a non array object',
      );
      expect(() => client.setUIViewedAttributes('a')).toThrow(
        'Invalid uiViewedAttributes type, should be a non array object',
      );
    });

    test('should error when attributes is an array', () => {
      expect(() => client.setUIViewedAttributes([])).toThrow(
        'Invalid uiViewedAttributes type, should be a non array object',
      );
    });

    test('should error when attributes is null', () => {
      expect(() => client.setUIViewedAttributes(null)).toThrow(
        new Error('Missing uiViewedAttributes'),
      );
    });
  });
});
