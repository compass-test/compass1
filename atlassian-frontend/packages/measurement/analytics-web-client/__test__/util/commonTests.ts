import AnalyticsWebClient, {
  envType,
  originType,
  platformType,
  tenantType,
  userType,
} from '../../src';
import { ProductInfoType } from '../../src/types';

import { waitForEventsToSend } from './commonUtil';
import { createDefaultMockXHR, getEventsFromMockXHR } from './mockXHR';
import UUID_V4_REGEX from './uuidTestUtil';

const libraryVersion = process.env._PACKAGE_VERSION_ as string;

export const PRODUCT_INFO: ProductInfoType = {
  env: envType.DEV,
  product: 'test',
  subproduct: 'testSub',
  version: '1.0.0',
  origin: originType.WEB,
  platform: undefined,
};

export const PAGE_NAME = 'home';

export const USER_ID = '61234:a1e49d04-2867-436d-a9d2-8627699044e2';
export const TENANT_ID = 'a1e49d04-2867-436d-a9d2-8627699044e2';
export const ORG_ID = '137c12f9-b892-494d-a682-20d6483f1d33';

export const ACTION_EVENT = {
  source: 'roomChat',
  containerType: 'conversation',
  containerId: '836e0f2e-6b13-45b5-840a-55ce50578574',
  containers: {
    containerKey: {
      id: '1234',
      type: 'project',
    },
    containerKey2: {
      id: '0987',
    },
  },
  objectType: 'message',
  objectId: 'ea9db061-6ae1-46c9-a46d-e0033e8bd3af',

  actionSubject: 'message',
  action: 'created',

  actionSubjectId: 'fe5b46eb-d918-4f3b-ba94-2c269d99a434',
  attributes: {
    one: 'one',
    two: 'two',
  },
  nonPrivacySafeAttributes: {
    foo: 'bar',
  },
  tags: ['tagOne', 'tagTwo'],
};

export const SCREEN_EVENT = {
  name: PAGE_NAME,
  attributes: {
    one: 'one',
    two: 'two',
  },
  containers: {
    containerKey: {
      id: '1234',
      type: 'project',
    },
    containerKey2: {
      id: '0987',
    },
  },
  nonPrivacySafeAttributes: {
    foo: 'bar',
  },
  tags: ['foo', 'bar'],
};

// eslint-disable-next-line no-console
const consoleError = console.error;

export function commonEventTests(sendEvent: any) {
  describe('(commonEventTests)', () => {
    const oldXMLHttpRequest = window.XMLHttpRequest;

    let mockXHR: any;
    let client: any;

    beforeEach(() => {
      sessionStorage.clear();
      mockXHR = createDefaultMockXHR();
      // @ts-ignore
      window.XMLHttpRequest = jest.fn(() => mockXHR);
      client = new AnalyticsWebClient(PRODUCT_INFO);
      // eslint-disable-next-line no-console
      console.error = jest.fn();

      // @ts-ignore
      window.devicePixelRatio = 2;
      Object.defineProperty(window.screen, 'width', {
        configurable: true,
        writable: true,
        value: 100,
      });

      Object.defineProperty(window.screen, 'height', {
        configurable: true,
        writable: true,
        value: 200,
      });
      jest.useFakeTimers();
    });

    afterEach(() => {
      client.clearUserInfo();
      window.XMLHttpRequest = oldXMLHttpRequest;
      // eslint-disable-next-line no-console
      console.error = consoleError;
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    test('should not send tenantInfo if not set', () => {
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.tenantIdType).toBeUndefined();
      expect(request.properties.tenantId).toBeUndefined();
    });

    test('should send tenantInfo if set', () => {
      client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.tenantIdType).toEqual(tenantType.CLOUD_ID);
      expect(request.properties.tenantId).toEqual(TENANT_ID);
    });

    test('should not send tenantInfo if cleared', () => {
      client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
      client.clearTenantInfo();
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.tenantIdType).toBeUndefined();
      expect(request.properties.tenantId).toBeUndefined();
    });

    test('should not send orgInfo if not set', () => {
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.orgId).toBeUndefined();
    });

    test('should send orgInfo if set', () => {
      client.setOrgInfo(ORG_ID);
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.orgId).toEqual(ORG_ID);
    });

    test('should not send orgInfo if cleared', () => {
      client.setOrgInfo(ORG_ID);
      client.clearOrgInfo();
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.orgId).toBeUndefined();
    });

    test('should not send userInfo if not set', () => {
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.userIdType).toBeUndefined();
      expect(request.userId).toBeNull();
    });

    test('should send userInfo if set', () => {
      client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.userIdType).toEqual(userType.ATLASSIAN_ACCOUNT);
      expect(request.userId).toEqual(USER_ID);
    });

    test('should not send userInfo if cleared', () => {
      client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
      client.clearUserInfo();
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.userIdType).toBeUndefined();
      expect(request.userId).toBeNull();
    });

    test('should send propertyInfo', () => {
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.env).toEqual(envType.DEV);
      expect(request.properties.product).toEqual('test');
      expect(request.properties.subproduct).toEqual('testSub');
      expect(request.properties.version).toEqual('1.0.0');
      expect(request.properties.origin).toEqual(originType.WEB);
    });

    test('should send changed subproduct', () => {
      client.setSubproduct('newTestSub');
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.env).toEqual(envType.DEV);
      expect(request.properties.product).toEqual('test');
      expect(request.properties.subproduct).toEqual('newTestSub');
      expect(request.properties.version).toEqual('1.0.0');
      expect(request.properties.origin).toEqual(originType.WEB);
    });

    test('should send auto-generated fields', () => {
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.messageId).toBeTruthy();
      expect(request.anonymousId).toBeTruthy();
      expect(request.context.userAgent).toBeTruthy();
      expect(request.timestamp).toBeTruthy();
    });

    test('should not contain any page context', () => {
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.context.page).toBeUndefined();
    });

    test('should send locale if set', () => {
      const productInfoWithLocale = {
        locale: 'en-US',
        ...PRODUCT_INFO,
      };
      const clientWithLocale = new AnalyticsWebClient(productInfoWithLocale);

      sendEvent(clientWithLocale);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.context.locale).toEqual('en-US');
    });

    test('should not send locale if not set', () => {
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.context.locale).toBeUndefined();
    });

    test('should send all events even if subproduct getter throws', () => {
      client.setSubproduct(() => {
        throw new Error('Oops');
      });

      sendEvent(client);

      client.setSubproduct('good-one');

      sendEvent(client);
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const events = getEventsFromMockXHR(mockXHR, 3);
      const request1 = events[0];
      expect(request1.properties.subproduct).toBeUndefined();

      const request2 = events[1];
      expect(request2.properties.subproduct).toBe('good-one');

      const request3 = events[2];
      expect(request3.properties.subproduct).toBe('good-one');

      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledTimes(1);
      // eslint-disable-next-line no-console
      expect(console.error).toBeCalledWith(
        'Cannot get subproduct from the callback. Proceeding without it. - Oops',
      );
    });

    test('should send platform', () => {
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.platform).toEqual(platformType.WEB);
    });

    test('should send screen sizes', () => {
      sendEvent(client);
      waitForEventsToSend();
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.context.screen.width).toEqual(100);
      expect(request.context.screen.height).toEqual(200);
      expect(request.context.screen.density).toEqual(2);
    });

    test('should send correct library version', () => {
      sendEvent(client);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.context.library.version).toEqual(libraryVersion);
    });

    test('should send with tabId', () => {
      sendEvent(client);
      waitForEventsToSend();
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.tabId).toMatch(UUID_V4_REGEX);
    });
  });
}

export function commonActionEventTests(sendActionEvent: any) {
  describe('(commonActionEventTests)', () => {
    const oldXMLHttpRequest = window.XMLHttpRequest;
    let mockXHR: any;
    let client: any;

    beforeEach(() => {
      mockXHR = createDefaultMockXHR();
      // @ts-ignore
      window.XMLHttpRequest = jest.fn(() => mockXHR);
      client = new AnalyticsWebClient(PRODUCT_INFO);
      jest.useFakeTimers();
    });

    afterEach(() => {
      client.clearUserInfo();
      window.XMLHttpRequest = oldXMLHttpRequest;
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    test('should throw if `event` is missing', () => {
      expect(() => {
        sendActionEvent(client);
      }).toThrow('Missing event');
    });

    test('should throw if `event.source` is missing', () => {
      expect(() => {
        sendActionEvent(client, {
          actionSubject: ACTION_EVENT.actionSubject,
          action: ACTION_EVENT.action,
        });
      }).toThrow('Missing event.source');
    });

    test('should throw if `event.actionSubject` is missing', () => {
      expect(() => {
        sendActionEvent(client, {
          source: ACTION_EVENT.source,
          action: ACTION_EVENT.action,
        });
      }).toThrow('Missing event.actionSubject');
    });

    test('should throw if `event.action` is missing', () => {
      expect(() => {
        sendActionEvent(client, {
          source: ACTION_EVENT.source,
          actionSubject: ACTION_EVENT.actionSubject,
        });
      }).toThrow('Missing event.action');
    });

    test('should send action event fields', () => {
      sendActionEvent(client, ACTION_EVENT);

      const expectedContainers = {
        containerKey: {
          id: '1234',
          type: 'project',
        },
        containerKey2: {
          id: '0987',
        },
      };
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.event).toEqual('message created');
      expect(request.properties.source).toEqual('roomChat');
      expect(request.properties.containerType).toEqual('conversation');
      expect(request.properties.containerId).toEqual(
        '836e0f2e-6b13-45b5-840a-55ce50578574',
      );
      expect(request.properties.containers).toEqual(expectedContainers);
      expect(request.properties.objectType).toEqual('message');
      expect(request.properties.objectId).toEqual(
        'ea9db061-6ae1-46c9-a46d-e0033e8bd3af',
      );
      expect(request.properties.actionSubject).toEqual('message');
      expect(request.properties.action).toEqual('created');
      expect(request.properties.actionSubjectId).toEqual(
        'fe5b46eb-d918-4f3b-ba94-2c269d99a434',
      );
      expect(request.properties.attributes).toEqual({ one: 'one', two: 'two' });
      expect(request.properties.tags).toEqual(['tagOne', 'tagTwo']);
    });
  });
}
