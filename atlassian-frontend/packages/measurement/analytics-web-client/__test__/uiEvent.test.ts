import AnalyticsWebClient, { eventType, tenantType, userType } from '../src';
import { buildActionEvent } from '../src/eventBuilder';
import getResilienceQueue, {
  IntermediateBatchableQueue,
} from '../src/integration/intermediateResilienceQueue';

import {
  ACTION_EVENT,
  commonActionEventTests,
  commonEventTests,
  ORG_ID,
  PRODUCT_INFO,
  TENANT_ID,
  USER_ID,
} from './util/commonTests';
import { waitForEventsToSend } from './util/commonUtil';
import { createDefaultMockXHR, getEventsFromMockXHR } from './util/mockXHR';
import { setSessionId, setTabId } from './util/storageTestUtil';

jest.mock('../src/integration/intermediateResilienceQueue', () => ({
  __esModule: true,
  ...jest.requireActual<any>('../src/integration/intermediateResilienceQueue'),
  default: jest.fn(),
}));

describe('AnalyticsWebClient', () => {
  const oldXMLHttpRequest = window.XMLHttpRequest;
  let mockXHR: any = null;
  let client: any = null;
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
    sessionStorage.clear();
    mockXHR = createDefaultMockXHR();
    // @ts-ignore
    window.XMLHttpRequest = jest.fn(() => mockXHR);

    client = new AnalyticsWebClient(PRODUCT_INFO);
  });

  afterEach(() => {
    jest.useRealTimers();
    client.clearUserInfo();
    window.XMLHttpRequest = oldXMLHttpRequest;
    intermediateResilienceQueue = undefined;
  });

  describe('sendUIEvent', () => {
    commonEventTests((commonClient: any) => {
      commonClient.sendUIEvent(ACTION_EVENT);
    });

    commonActionEventTests((commonClient: any, event: any) => {
      commonClient.sendUIEvent(event);
    });

    test('should send with only required fields', () => {
      const uiEvent = {
        source: 'dashboard',
        actionSubject: 'createIssueButton',
        action: 'clicked',
      };

      client.sendUIEvent(uiEvent);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.source).toEqual(uiEvent.source);
      expect(request.properties.actionSubject).toEqual(uiEvent.actionSubject);
      expect(request.properties.action).toEqual(uiEvent.action);
    });

    test('should send correct type and eventType', () => {
      client.sendUIEvent(ACTION_EVENT);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.type).toEqual('track');
      expect(request.properties.eventType).toEqual(eventType.UI);
    });

    test('should send correct subproduct', () => {
      let subproduct = 'newTestSub';

      client.setSubproduct(() => subproduct);
      client.sendUIEvent(ACTION_EVENT);

      subproduct = 'newNewTestSub';
      client.sendUIEvent(ACTION_EVENT);
      waitForEventsToSend();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const events = getEventsFromMockXHR(mockXHR, 2);
      const firstRequest = events[0];
      expect(firstRequest.properties.subproduct).toEqual('newTestSub');

      const secondRequest = events[1];
      expect(secondRequest.properties.subproduct).toEqual('newNewTestSub');
    });

    test('should override env when provided', () => {
      client.sendUIEvent({ ...ACTION_EVENT, env: 'newEnv' });
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.env).toEqual('newEnv');
    });

    test('should override product when provided', () => {
      client.sendUIEvent({ ...ACTION_EVENT, product: 'newProduct' });
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.product).toEqual('newProduct');
    });

    test('should override subproduct when provided', () => {
      client.sendUIEvent({ ...ACTION_EVENT, subproduct: 'newSubproduct' });
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.subproduct).toEqual('newSubproduct');
    });

    test('should override version when provided', () => {
      client.sendUIEvent({ ...ACTION_EVENT, version: 'newVersion' });
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.version).toEqual('newVersion');
    });

    test('should override product when provided', () => {
      client.sendUIEvent({ ...ACTION_EVENT, origin: 'newOrigin' });
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.origin).toEqual('newOrigin');
    });

    test('should override platform when provided', () => {
      client.sendUIEvent({ ...ACTION_EVENT, platform: 'newPlatform' });
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.platform).toEqual('newPlatform');
    });

    test('should call callback with builtEvent', () => {
      const callback = jest.fn();
      const sessionId = Date.now().toString();
      const taskSessions = {};

      setTabId('someTabId');
      setSessionId(sessionId);

      client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
      client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
      client.setOrgInfo(ORG_ID);
      client.sendUIEvent(ACTION_EVENT, callback);

      jest.runOnlyPendingTimers();

      const builtEvent = buildActionEvent(
        client._productInfo,
        {
          tenantIdType: tenantType.CLOUD_ID,
          tenantId: TENANT_ID,
        },
        {
          userIdType: userType.ATLASSIAN_ACCOUNT,
          userId: USER_ID,
        },
        ACTION_EVENT,
        eventType.UI,
        'someTabId',
        sessionId,
        taskSessions,
        {
          orgId: ORG_ID,
        },
        client._pageLoadId
      );

      // @ts-ignore Loosen types until buildActionEvent has better types
      builtEvent.transformUUID = expect.anything();

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(builtEvent);
    });

    test('should send attributes', () => {
      const attributes = { one: 'one', two: 'two' };
      client.sendUIEvent(ACTION_EVENT, 'callback', attributes);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.attributes).toEqual(attributes);
    });
    test('should send nonPrivacySafe', () => {
      const nonPrivacySafeAttributes = { foo: 'bar' };
      client.sendUIEvent(ACTION_EVENT);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.nonPrivacySafeAttributes).toEqual(
        nonPrivacySafeAttributes,
      );
    });

    test('should send pageLoadId', () => {
      client.sendUIEvent(ACTION_EVENT);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.pageLoadId).toBeDefined();
    });
  });
});
