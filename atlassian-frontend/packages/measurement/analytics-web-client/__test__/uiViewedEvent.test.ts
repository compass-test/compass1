/* eslint-disable no-underscore-dangle */
import AnalyticsWebClient, { eventType, tenantType, userType } from '../src';
import { buildActionEvent } from '../src/eventBuilder';
import UIViewedEvent from '../src/uiViewedEvent';

import {
  ORG_ID,
  PRODUCT_INFO,
  TENANT_ID,
  USER_ID,
} from './util/commonTests';
import { waitForEventsToSend } from './util/commonUtil';
import {
  createDefaultMockXHR,
  getEventsFromMockXHR,
  getEventsFromMockXHRForIndex,
} from './util/mockXHR';
import { setSessionId, setTabId } from './util/storageTestUtil';

const AnalyticsUser = require('@segment/analytics.js-core/lib/user');

const emptyFunction = () => {
  // do nothing
};

const eventBlur = new Event('blur', {
  bubbles: false,
  cancelable: true,
});

const eventFocus = new Event('focus', {
  bubbles: false,
  cancelable: true,
});

// eslint-disable-next-line no-console
const consoleError = console.error;
const throttle = 1000 * 60 * 60; // 1 hour
const storageKey = 'awc-dev.ui.viewed.last.sent';

describe('UIViewedEvent.test.ts', () => {

  beforeEach(() => {
    // Since segment user gets defined on an imported object, we have to reset it between tests
    AnalyticsUser.id(null);
  });

  describe('UIViewedEvent', () => {
    beforeEach(() => {
      // eslint-disable-next-line no-console
      console.error = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();

      // eslint-disable-next-line no-console
      console.error = consoleError;
      localStorage.clear();
    });

    describe('storage', () => {
      const originalDateNow = Date.now;
      let event: any;

      beforeEach(() => {
        event = new UIViewedEvent(PRODUCT_INFO, emptyFunction, emptyFunction);
      });

      afterEach(() => {
        Date.now = originalDateNow;
        localStorage.clear();
      });

      test('should handle one user, tenant, and productKey', () => {
        const timestamp = Date.now();
        Date.now = jest.fn(() => timestamp);

        event._setLastSentTimestamp(PRODUCT_INFO.product, TENANT_ID, USER_ID);

        const storedTimestamp = event._getLastSentTimestamp(
          PRODUCT_INFO.product,
          TENANT_ID,
          USER_ID,
        );
        expect(storedTimestamp).toEqual(timestamp);
      });

      test('should handle multiple users', () => {
        const firstTimestamp = Date.now();
        const secondTimestamp = firstTimestamp + 1;

        Date.now = jest.fn(() => firstTimestamp);
        event._setLastSentTimestamp(PRODUCT_INFO.product, TENANT_ID, USER_ID);

        Date.now = jest.fn(() => secondTimestamp);
        event._setLastSentTimestamp(PRODUCT_INFO.product, TENANT_ID, 'newUser');

        const firstStoredTimestamp = event._getLastSentTimestamp(
          PRODUCT_INFO.product,
          TENANT_ID,
          USER_ID,
        );
        const secondStoredTimestamp = event._getLastSentTimestamp(
          PRODUCT_INFO.product,
          TENANT_ID,
          'newUser',
        );
        expect(firstStoredTimestamp).toEqual(firstTimestamp);
        expect(secondStoredTimestamp).toEqual(secondTimestamp);
      });

      test('should handle multiple tenants', () => {
        const firstTimestamp = Date.now();
        const secondTimestamp = firstTimestamp + 1;

        Date.now = jest.fn(() => firstTimestamp);
        event._setLastSentTimestamp(PRODUCT_INFO.product, TENANT_ID, USER_ID);

        Date.now = jest.fn(() => secondTimestamp);
        event._setLastSentTimestamp(PRODUCT_INFO.product, 'newTenant', USER_ID);

        const firstStoredTimestamp = event._getLastSentTimestamp(
          PRODUCT_INFO.product,
          TENANT_ID,
          USER_ID,
        );
        const secondStoredTimestamp = event._getLastSentTimestamp(
          PRODUCT_INFO.product,
          'newTenant',
          USER_ID,
        );
        expect(firstStoredTimestamp).toEqual(firstTimestamp);
        expect(secondStoredTimestamp).toEqual(secondTimestamp);
      });

      test('should handle multiple productKeys', () => {
        const event2 = new UIViewedEvent(
          {
            product: 'prod2',
            env: 'test',
          },
          emptyFunction,
          emptyFunction,
        );

        const firstTimestamp = Date.now();
        const secondTimestamp = firstTimestamp + 1;

        Date.now = jest.fn(() => firstTimestamp);
        event._setLastSentTimestamp(PRODUCT_INFO.product, TENANT_ID, USER_ID);

        Date.now = jest.fn(() => secondTimestamp);
        event2._setLastSentTimestamp('differentProductKey', TENANT_ID, USER_ID);

        const firstStoredTimestamp = event._getLastSentTimestamp(
          PRODUCT_INFO.product,
          TENANT_ID,
          USER_ID,
        );
        const secondStoredTimestamp = event2._getLastSentTimestamp(
          'differentProductKey',
          TENANT_ID,
          USER_ID,
        );
        expect(firstStoredTimestamp).toEqual(firstTimestamp);
        expect(secondStoredTimestamp).toEqual(secondTimestamp);
      });

      describe('storage problems', () => {
        test('should replace data if corrupt', () => {
          localStorage.setItem(storageKey, 'abcdef');

          event._getLastSentTimestamp(PRODUCT_INFO.product, TENANT_ID, USER_ID);

          expect(localStorage.getItem(storageKey)).toBeNull();
        });
      });
    });
  });

  describe('AnalyticsWebClient', () => {
    const originalHasFocus = document.hasFocus;
    const originalDateNow = Date.now;
    const originalXHR = window.XMLHttpRequest;

    let mockXHR: any = null;
    let client: any = null;

    beforeEach(() => {
      sessionStorage.clear();
      localStorage.clear();

      mockXHR = createDefaultMockXHR();
      // @ts-ignore
      window.XMLHttpRequest = jest.fn(() => mockXHR);
      jest.useFakeTimers();
      // eslint-disable-next-line no-console
      console.error = jest.fn();
    });

    afterEach(() => {
      client.stopUIViewedEvent();
      client = null;

      waitForEventsToSend();

      jest.clearAllMocks();

      mockXHR.send.mockClear();
      // @ts-ignore
      window.XMLHttpRequest.mockClear();

      localStorage.clear();
      sessionStorage.clear();

      jest.useRealTimers();
      Date.now = originalDateNow;
      document.hasFocus = originalHasFocus;
      window.XMLHttpRequest = originalXHR;
      // eslint-disable-next-line no-console
      console.error = consoleError;
    });

    describe('UIViewedEvent', () => {
      function getOverrideOrDefault(overrides: any, field: any, def: any) {
        if (Object.prototype.hasOwnProperty.call(overrides, field)) {
          return overrides[field];
        }
        return def;
      }

      function expectCallIsUIViewedEvent(request: any, overrides = {}) {
        expect(request.type).toEqual('track');
        expect(request.properties.eventType).toEqual(eventType.UI);
        expect(request.properties.product).toEqual('test');
        expect(request.properties.subproduct).toEqual(
          getOverrideOrDefault(overrides, 'subproduct', 'testSub'),
        );
        expect(request.properties.source).toEqual('ui');
        expect(request.properties.actionSubject).toEqual('ui');
        expect(request.properties.action).toEqual('viewed');
        expect(request.properties.tenantIdType).toEqual(
          getOverrideOrDefault(overrides, 'tenantIdType', 'cloudId'),
        );
        expect(request.properties.tenantId).toEqual(
          getOverrideOrDefault(overrides, 'tenantId', TENANT_ID),
        );
        expect(request.properties.userIdType).toEqual('atlassianAccount');
        expect(request.userId).toEqual(
          getOverrideOrDefault(overrides, 'userId', USER_ID),
        );
      }

      test('should send on first load', () => {
        document.hasFocus = () => true;

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        expectCallIsUIViewedEvent(getEventsFromMockXHR(mockXHR, 1)[0]);
      });

      test('should call callback after event', () => {
        document.hasFocus = () => true;
        const mockFn = jest.fn();
        const sessionId = Date.now().toString();
        const taskSessions = {};

        setTabId('someTabId');
        setSessionId(sessionId);

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setOrgInfo(ORG_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent(mockFn);

        jest.runOnlyPendingTimers();

        // Callback is queued on next tick using setTimeout after the event has already fired
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
          {
            source: 'ui',
            actionSubject: 'ui',
            action: 'viewed',
            attributes: {},
          },
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

        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith(builtEvent);
      });

      test('should not call callback in the same tick', () => {
        document.hasFocus = () => true;
        const mockFn = jest.fn();

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent(mockFn);

        jest.runOnlyPendingTimers();

        expect(mockFn).not.toHaveBeenCalled();
      });

      test('should send if tenantType is NONE', () => {
        document.hasFocus = () => true;

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.NONE);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        expectCallIsUIViewedEvent(getEventsFromMockXHR(mockXHR, 1)[0], {
          tenantIdType: tenantType.NONE,
          tenantId: undefined,
        });
      });

      test('should not send if no user', () => {
        document.hasFocus = () => true;

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        expect(mockXHR.send).toHaveBeenCalledTimes(0);
      });

      test('should not send if no tenant', () => {
        document.hasFocus = () => true;

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        expect(mockXHR.send).toHaveBeenCalledTimes(0);
      });

      test('should not send if not focused', () => {
        document.hasFocus = () => false;

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        expect(mockXHR.send).toHaveBeenCalledTimes(0);
      });

      test('should not send on second loop', () => {
        document.hasFocus = () => true;

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        mockXHR.send.mockClear();
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(0);
      });

      test('should not send before throttle time', () => {
        document.hasFocus = () => true;

        const firstLoopTime = Date.now();
        Date.now = jest.fn(() => firstLoopTime);

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        mockXHR.send.mockClear();

        Date.now = jest.fn(() => firstLoopTime + throttle);
        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        expect(mockXHR.send).toHaveBeenCalledTimes(0);
      });

      test('should should send after throttle time', () => {
        document.hasFocus = () => true;

        const firstLoopTime = Date.now();
        Date.now = jest.fn(() => firstLoopTime);

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        mockXHR.send.mockClear();

        Date.now = jest.fn(() => firstLoopTime + throttle + 1);
        jest.runOnlyPendingTimers();

        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        expectCallIsUIViewedEvent(getEventsFromMockXHR(mockXHR, 1)[0]);
      });

      test('should send if tenant changes', () => {
        document.hasFocus = () => true;

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);

        client.startUIViewedEvent();
        jest.runOnlyPendingTimers();
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        expectCallIsUIViewedEvent(getEventsFromMockXHR(mockXHR, 1)[0]);
        mockXHR.send.mockClear();

        client.setTenantInfo(tenantType.CLOUD_ID, 'newTenant');
        jest.runOnlyPendingTimers();
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        expectCallIsUIViewedEvent(getEventsFromMockXHR(mockXHR, 1)[0], {
          tenantId: 'newTenant',
        });
      });

      test('should not send if switching back to original tenant', () => {
        document.hasFocus = () => true;

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        mockXHR.send.mockClear();

        client.setTenantInfo(tenantType.CLOUD_ID, 'newTenant');
        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        mockXHR.send.mockClear();

        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        jest.runOnlyPendingTimers();
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(0);
      });

      test('should send if user changes', () => {
        document.hasFocus = () => true;

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        mockXHR.send.mockClear();

        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, 'newUser');
        jest.runOnlyPendingTimers();
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        expectCallIsUIViewedEvent(getEventsFromMockXHR(mockXHR, 1)[0], {
          userId: 'newUser',
        });
      });

      test('should not send if switching back to original user', () => {
        document.hasFocus = () => true;

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        mockXHR.send.mockClear();

        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, 'newUser');
        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        mockXHR.send.mockClear();

        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        jest.runOnlyPendingTimers();
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(0);
      });

      test('should send if subproduct changes', () => {
        document.hasFocus = () => true;

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        mockXHR.send.mockClear();

        client.setSubproduct('newTestSub');
        jest.runOnlyPendingTimers();
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        expectCallIsUIViewedEvent(getEventsFromMockXHR(mockXHR, 1)[0], {
          subproduct: 'newTestSub',
        });
      });

      test('should reset timers if subproduct changes', () => {
        document.hasFocus = () => true;

        const callback = jest.fn();

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent(callback);
        jest.runTimersToTime(1000);

        // This should have resetTimers back to 0
        client.setSubproduct('newTestSub');

        // 1 second has elapsed since reset but 2 seconds since startUIViewedEvent was called
        // no event should fire
        jest.runTimersToTime(1000);
        expect(callback).toHaveBeenCalledTimes(0);

        // 2 seconds has elapsed since the reset, event should have been sent
        jest.runTimersToTime(1300);
        // Callback only called once event has been sent
        waitForEventsToSend();

        expect(callback).toHaveBeenCalledTimes(1);
        expect(mockXHR.send).toHaveBeenCalledTimes(1);

        expectCallIsUIViewedEvent(getEventsFromMockXHR(mockXHR, 1)[0], {
          subproduct: 'newTestSub',
        });
      });

      test('should send if subproduct return value changes', () => {
        document.hasFocus = () => true;

        let subproduct = 'whatever';
        const NEW_PRODUCT_INFO = {
          ...PRODUCT_INFO,
          subproduct: () => subproduct,
        };

        client = new AnalyticsWebClient(NEW_PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        mockXHR.send.mockClear();

        subproduct = 'newTestSub';
        jest.runOnlyPendingTimers();
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        expectCallIsUIViewedEvent(getEventsFromMockXHR(mockXHR, 1)[0], {
          subproduct: 'newTestSub',
        });
      });

      test('should send all events even if subproduct getter throws', () => {
        document.hasFocus = () => true;

        let getSubproduct = (): string => {
          throw new Error('Oops');
        };

        const NEW_PRODUCT_INFO = {
          ...PRODUCT_INFO,
          subproduct: () => getSubproduct(),
        };

        client = new AnalyticsWebClient(NEW_PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();

        getSubproduct = () => 'newTestSub1';
        jest.runOnlyPendingTimers();
        waitForEventsToSend();

        getSubproduct = () => 'newTestSub2';
        jest.runOnlyPendingTimers();
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(3);
        expectCallIsUIViewedEvent(
          JSON.parse(mockXHR.send.mock.calls[0][0]).batch[0],
          { subproduct: undefined },
        );
        expectCallIsUIViewedEvent(
          JSON.parse(mockXHR.send.mock.calls[1][0]).batch[0],
          { subproduct: 'newTestSub1' },
        );
        expectCallIsUIViewedEvent(
          JSON.parse(mockXHR.send.mock.calls[2][0]).batch[0],
          { subproduct: 'newTestSub2' },
        );

        // eslint-disable-next-line no-console
        expect(console.error).toBeCalledWith(
          'Cannot get subproduct from the callback. Proceeding without it. - Oops',
        );
      });

      test('should not send if switching back to original subproduct', () => {
        document.hasFocus = () => true;

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        mockXHR.send.mockClear();

        client.setSubproduct(() => 'newTestSub');
        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        mockXHR.send.mockClear();

        client.setSubproduct(PRODUCT_INFO.subproduct);
        jest.runOnlyPendingTimers();
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(0);
      });

      test('should not send if stopped', () => {
        document.hasFocus = () => true;

        const firstLoopTime = Date.now();
        Date.now = jest.fn(() => firstLoopTime);

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        mockXHR.send.mockClear();

        client.stopUIViewedEvent();
        Date.now = jest.fn(() => firstLoopTime + throttle + 1);
        jest.runOnlyPendingTimers();
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(0);
      });

      test('should not send if window blurred', () => {
        document.hasFocus = () => true;

        const firstLoopTime = Date.now();
        Date.now = jest.fn(() => firstLoopTime);

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        mockXHR.send.mockClear();

        window.dispatchEvent(eventBlur);
        Date.now = jest.fn(() => firstLoopTime + throttle + 1);
        jest.runOnlyPendingTimers();
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(0);
      });

      test('should send if window is refocused', () => {
        document.hasFocus = () => true;

        const firstLoopTime = Date.now();
        Date.now = jest.fn(() => firstLoopTime);

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        mockXHR.send.mockClear();

        window.dispatchEvent(eventBlur);
        const secondLoopTime = firstLoopTime + throttle + 1;
        Date.now = jest.fn(() => secondLoopTime);
        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        mockXHR.send.mockClear();

        window.dispatchEvent(eventFocus);
        Date.now = jest.fn(() => secondLoopTime + throttle + 1);

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        expectCallIsUIViewedEvent(getEventsFromMockXHR(mockXHR, 1)[0]);
      });

      test('should set interval on start', () => {
        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        expect(client._uiViewedEvent._intervalId).not.toEqual(null);
      });

      test('should clear interval on window.blur()', () => {
        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        window.dispatchEvent(eventBlur);
        expect(client._uiViewedEvent._intervalId).toEqual(null);
      });

      test('should set interval on focus', () => {
        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        window.dispatchEvent(eventBlur);
        window.dispatchEvent(eventFocus);

        expect(client._uiViewedEvent._intervalId).not.toEqual(null);
      });

      test('should clear interval on stop', () => {
        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        // Can't check intervalId as _uiViewedEvent is nulled on stop
        const spy = jest.spyOn(client._uiViewedEvent, '_stopInterval');
        client.stopUIViewedEvent();
        expect(spy).toHaveBeenCalledTimes(1);
      });

      test('should add listeners on start', () => {
        const spy = jest.spyOn(window, 'addEventListener');

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy.mock.calls[0][0]).toBe('focus');
        expect(spy.mock.calls[1][0]).toBe('blur');
      });

      test('should remove listeners on stop', () => {
        const spy = jest.spyOn(window, 'removeEventListener');

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();
        client.stopUIViewedEvent();

        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy.mock.calls[0][0]).toBe('focus');
        expect(spy.mock.calls[1][0]).toBe('blur');
      });
    });

    describe('LastScreenEvent', () => {
      let getItemSpy: any;
      let removeItemSpy: any;

      beforeEach(() => {
        document.hasFocus = () => true;

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);

        client.sendScreenEvent({
          name: 'foo',
          attributes: {
            foo: 'bar',
          },
        });

        getItemSpy = jest.spyOn(client._safeSessionStorage, 'getItem');
        removeItemSpy = jest.spyOn(client._safeSessionStorage, 'removeItem');
      });

      afterEach(() => {
        jest.clearAllMocks();
        sessionStorage.clear();
        getItemSpy.mockRestore();
        removeItemSpy.mockRestore();
      });

      const expectedScreenEvent = {
        name: 'foo',
        attributes: {
          foo: 'bar',
        },
      };

      test('should include the last screen event fired', () => {
        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        expect(mockXHR.send).toHaveBeenCalledTimes(2);
        const request = JSON.parse(mockXHR.send.mock.calls[1][0]);

        expect(request.batch[0].properties.attributes.lastScreenEvent).toEqual(
          expectedScreenEvent,
        );
      });

      test('should use session storage to save the last screen event', () => {
        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);

        client.startUIViewedEvent();

        jest.runOnlyPendingTimers();
        waitForEventsToSend();
        expect(mockXHR.send).toHaveBeenCalledTimes(2);
        const request = JSON.parse(mockXHR.send.mock.calls[1][0]);
        expect(request.batch[0].properties.attributes.lastScreenEvent).toEqual(
          expectedScreenEvent,
        );
      });

      test('should stringify the last screen event', () => {
        const setItemSpy = jest.spyOn(client._safeSessionStorage, 'setItem');

        client._setLastScreenEvent({
          name: 'testScreenEvent',
          attributes: {
            foo: 'bar',
          },
        });
        expect(setItemSpy).toHaveBeenCalledWith(
          'last.screen.event',
          '{"name":"testScreenEvent","attributes":{"foo":"bar"}}',
        );

        setItemSpy.mockRestore();
      });

      test('should delete the screen event if it isnt valid json', () => {
        getItemSpy.mockReturnValueOnce('bananas');

        client._getLastScreenEvent();

        jest.runOnlyPendingTimers();
        jest.runTimersToTime(2000);
        waitForEventsToSend();

        expect(getItemSpy).toHaveBeenCalledWith('last.screen.event');
        expect(removeItemSpy).toHaveBeenCalledWith('last.screen.event');
      });
    });

    describe('EmbeddedExperiences', () => {
      beforeEach(() => {
        document.hasFocus = () => true;
        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
      });

      const expectParentProductEvent = (request: any) => {
        expect(request.event).toBe('ui viewed');
        expect(request.properties.product).toBe('test');
        expect(request.properties.subproduct).toBe('testSub');
        expect(request.properties.version).toBe(PRODUCT_INFO.version);
        expect(request.properties.attributes).toEqual({});
      };

      const expectEmbeddedProductEvent = (request: any) => {
        expect(request.event).toBe('ui viewed');
        expect(request.properties.product).toBe('someEmbeddedProduct');
        expect(request.properties.subproduct).toBe(null);
        expect(request.properties.version).toBe(null);
        expect(request.properties.attributes).toEqual({
          embeddedInEnv: PRODUCT_INFO.env,
          embeddedInProduct: PRODUCT_INFO.product,
          embeddedInSubproduct: 'testSub',
          embeddedInVersion: PRODUCT_INFO.version,
          embeddedInOrigin: PRODUCT_INFO.origin,
          embeddedInPlatform: PRODUCT_INFO.platform,
        });
      };

      test('should send event for both parent and embedded product', () => {
        client.startUIViewedEvent();
        client.setEmbeddedProduct('someEmbeddedProduct');

        jest.runTimersToTime(2000);
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(1);

        const events = getEventsFromMockXHR(mockXHR, 2);
        expectParentProductEvent(events[0]);
        expectEmbeddedProductEvent(events[1]);
      });

      test('should send event when provided with embeddedProduct callback', () => {
        client.startUIViewedEvent();
        client.setEmbeddedProduct(() => 'someEmbeddedProduct');

        jest.runTimersToTime(2000);
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(1);

        const events = getEventsFromMockXHR(mockXHR, 2);
        expectParentProductEvent(events[0]);
        expectEmbeddedProductEvent(events[1]);
      });

      test('should send event for parent product even if callback fails', () => {
        client.startUIViewedEvent();
        client.setEmbeddedProduct(() => {
          throw new Error('Oops');
        });

        jest.runTimersToTime(2000);
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        const events = getEventsFromMockXHR(mockXHR, 1);
        expectParentProductEvent(events[0]);
      });

      test('should not send event if embeddedProduct cleared', () => {
        const firstLoopTime = Date.now();
        Date.now = jest.fn(() => firstLoopTime);

        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.startUIViewedEvent();

        client.setEmbeddedProduct('someEmbeddedProduct');
        jest.runTimersToTime(2000);
        waitForEventsToSend();
        mockXHR.send.mockClear();

        client.clearEmbeddedProduct();
        Date.now = jest.fn(() => firstLoopTime + throttle + 1);
        jest.runTimersToTime(2000);
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        const events = getEventsFromMockXHR(mockXHR, 1);
        expectParentProductEvent(events[0]);
      });

      test('should reset timers when embeddedProduct is set', () => {
        const callback = jest.fn();
        client.startUIViewedEvent(callback);
        jest.runTimersToTime(1000);

        // This should have resetTimers back to 0
        client.setEmbeddedProduct('someEmbeddedProduct');

        // 1 second has elapsed since reset but 2 seconds since startUIViewedEvent was called
        // no event should fire
        jest.runTimersToTime(1000);
        expect(callback).toHaveBeenCalledTimes(0);

        // 2 seconds has elapsed since the reset, event should have been sent
        jest.runTimersToTime(1000);
        // Callback is only called when the event is sent
        waitForEventsToSend();

        expect(callback).toHaveBeenCalledTimes(2);
        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        const events = getEventsFromMockXHR(mockXHR, 2);
        expectParentProductEvent(events[0]);
        expectEmbeddedProductEvent(events[1]);
      });
    });

    describe('UIViewedAttributes', () => {
      const exampleExtraAttributes = {
        sampleAttribute1: '123',
        sampleAttribute2: ['A', 'B', 'C'],
      };

      beforeEach(() => {
        document.hasFocus = () => true;
        client = new AnalyticsWebClient(PRODUCT_INFO);
        client.setTenantInfo(tenantType.CLOUD_ID, TENANT_ID);
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
        client.setUIViewedAttributes(exampleExtraAttributes);
      });

      afterEach(() => {
        jest.clearAllMocks();
        sessionStorage.clear();
        localStorage.clear();
      });

      const expectedScreenEvent = {
        name: 'foo',
        attributes: {
          foo: 'bar',
        },
      };

      const expectProductEventWithExtraAttributes = (
        request: any,
        extraAttributes: any,
        expectedAttributesOverride?: any,
      ) => {
        expect(request.event).toBe('ui viewed');
        expect(request.properties.product).toBe('test');
        expect(request.properties.subproduct).toBe('testSub');
        expect(request.properties.version).toBe(PRODUCT_INFO.version);
        expect(request.properties.attributes).toEqual({
          ...extraAttributes,
          ...expectedAttributesOverride,
        });
      };

      const expectEmbeddedProductEventWithExtraAttributes = (
        request: any,
        extraAttributes?: any,
        expectedAttributesOverride?: any,
      ) => {
        expect(request.event).toBe('ui viewed');
        expect(request.properties.product).toBe('someEmbeddedProduct');
        expect(request.properties.subproduct).toBe(null);
        expect(request.properties.version).toBe(null);
        expect(request.properties.attributes).toEqual({
          ...extraAttributes,
          embeddedInEnv: PRODUCT_INFO.env,
          embeddedInProduct: PRODUCT_INFO.product,
          embeddedInSubproduct: 'testSub',
          embeddedInVersion: PRODUCT_INFO.version,
          embeddedInOrigin: PRODUCT_INFO.origin,
          embeddedInPlatform: PRODUCT_INFO.platform,
          ...expectedAttributesOverride,
        });
      };

      test('should send event for product with additional attributes', () => {
        client.startUIViewedEvent();

        jest.runTimersToTime(2000);
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(1);
        const events = getEventsFromMockXHR(mockXHR, 1);
        expectProductEventWithExtraAttributes(events[0], exampleExtraAttributes);
      });

      test('should send event for product with additional attributes and screen event', () => {
        client.sendScreenEvent({
          name: 'foo',
          attributes: {
            foo: 'bar',
          },
        });

        client.startUIViewedEvent();

        jest.runTimersToTime(2000);
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(2);

        const events = getEventsFromMockXHRForIndex(1, mockXHR, 1);
        expectProductEventWithExtraAttributes(events[0], exampleExtraAttributes, {
          lastScreenEvent: expectedScreenEvent,
        });
        mockXHR.send.mockClear();
      });

      test('should send event for both parent and embedded product with additional attributes', () => {
        client.startUIViewedEvent();
        client.setEmbeddedProduct('someEmbeddedProduct');

        jest.runTimersToTime(2000);
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(1);

        const events = getEventsFromMockXHR(mockXHR, 2);
        expectProductEventWithExtraAttributes(events[0], exampleExtraAttributes);
        expectEmbeddedProductEventWithExtraAttributes(
          events[1],
          exampleExtraAttributes,
        );
      });

      test('should send event for both parent and embedded product with additional attributes and screen event', () => {
        client.sendScreenEvent({
          name: 'foo',
          attributes: {
            foo: 'bar',
          },
        });

        client.startUIViewedEvent();
        client.setEmbeddedProduct('someEmbeddedProduct');

        jest.runTimersToTime(2000);
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(2);

        const events = getEventsFromMockXHRForIndex(1, mockXHR, 2);
        expectProductEventWithExtraAttributes(events[0], exampleExtraAttributes, {
          lastScreenEvent: expectedScreenEvent,
        });
        expectEmbeddedProductEventWithExtraAttributes(
          events[1],
          exampleExtraAttributes,
          { lastScreenEvent: expectedScreenEvent },
        );
      });

      test('should not override client populated attributes', () => {
        client.setUIViewedAttributes({
          lastScreenEvent: {
            name: 'random',
            attributes: {
              A: 'a',
            },
          },
          embeddedInEnv: 'NONE',
        });

        client.sendScreenEvent({
          name: 'foo',
          attributes: {
            foo: 'bar',
          },
        });

        client.startUIViewedEvent();
        client.setEmbeddedProduct('someEmbeddedProduct');

        jest.runTimersToTime(2000);
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(2);

        const events = getEventsFromMockXHRForIndex(1, mockXHR, 2);
        expectProductEventWithExtraAttributes(events[0], null, {
          lastScreenEvent: expectedScreenEvent,
          embeddedInEnv: 'NONE',
        });
        expectEmbeddedProductEventWithExtraAttributes(events[1], null, {
          lastScreenEvent: expectedScreenEvent,
        });
      });

      test('should send event if attributes object is empty', () => {
        client.setUIViewedAttributes({});

        client.sendScreenEvent({
          name: 'foo',
          attributes: {
            foo: 'bar',
          },
        });

        client.startUIViewedEvent();
        client.setEmbeddedProduct('someEmbeddedProduct');

        jest.runTimersToTime(2000);
        waitForEventsToSend();

        expect(mockXHR.send).toHaveBeenCalledTimes(2);

        const events = getEventsFromMockXHRForIndex(1, mockXHR, 2);
        expectProductEventWithExtraAttributes(
          events[0],
          {},
          { lastScreenEvent: expectedScreenEvent },
        );
        expectEmbeddedProductEventWithExtraAttributes(
          events[1],
          {},
          { lastScreenEvent: expectedScreenEvent },
        );
      });
    });
  });

});
