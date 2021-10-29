import AnalyticsWebClient from '../src';
import SessionTracking, {
  DEFAULT_SESSION_EXPIRY_TIME_MS,
} from '../src/sessionTracking';
import uuidv4 from '../src/uuid';

import { ACTION_EVENT, PRODUCT_INFO, SCREEN_EVENT } from './util/commonTests';
import { waitForEventsToSend } from './util/commonUtil';
import { advanceBy, clear as clearDate } from './util/mockDateHelper';
import { createDefaultMockXHR, getEventsFromMockXHR } from './util/mockXHR';
import {
  SESSION_EXPIRY_STORAGE_KEY,
  SESSION_ID_STORAGE_KEY,
  setSessionId,
} from './util/storageTestUtil';

const INTEGER_REGEX = new RegExp(/^\d+$/);
const STAGING_BASE_URL = 'https://as.staging.atl-paas.net/api/v1';

describe('SessionTracking', () => {
  describe('getCurrentSessionId', () => {

    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllMocks();

      localStorage.clear();
      clearDate();
    });

    test('should generate new sessionId if none exists', () => {
      const sessionTracking = new SessionTracking();
      expect(sessionTracking.getCurrentSessionId()).toMatch(INTEGER_REGEX);
    });

    test('should return the same session id after creating one', () => {
      const sessionTracking = new SessionTracking();

      const id = sessionTracking.getCurrentSessionId();
      expect(sessionTracking.getCurrentSessionId()).toMatch(id);
    });

    test('should eventually override the expiry if the session id is null but expiry exists', () => {
      const currentExpiry = Math.floor(Date.now() + (DEFAULT_SESSION_EXPIRY_TIME_MS * 0.95));
      localStorage.setItem(SESSION_EXPIRY_STORAGE_KEY, currentExpiry.toString());
      const sessionTracking = new SessionTracking();
      expect(sessionTracking.getCurrentSessionId()).toMatch(INTEGER_REGEX);
      expect(localStorage.getItem(SESSION_EXPIRY_STORAGE_KEY)).toEqual(
        currentExpiry.toString(),
      );
      jest.runOnlyPendingTimers();
      expect(localStorage.getItem(SESSION_EXPIRY_STORAGE_KEY)).toEqual(
        (Date.now() + DEFAULT_SESSION_EXPIRY_TIME_MS).toString(),
      );
    });

    test('should immediately override the expiry if the session id is null but expiry exists', () => {
      const currentExpiry = Math.floor(Date.now() + (DEFAULT_SESSION_EXPIRY_TIME_MS * 0.8));
      localStorage.setItem(SESSION_EXPIRY_STORAGE_KEY, currentExpiry.toString());
      const sessionTracking = new SessionTracking();
      expect(sessionTracking.getCurrentSessionId()).toMatch(INTEGER_REGEX);
      expect(localStorage.getItem(SESSION_EXPIRY_STORAGE_KEY)).toEqual(
        (Date.now() + DEFAULT_SESSION_EXPIRY_TIME_MS).toString(),
      );
    });

    test('should update the session if the expiry is not present', () => {
      localStorage.setItem(SESSION_ID_STORAGE_KEY, 'abc-123');
      const sessionTracking = new SessionTracking();
      expect(sessionTracking.getCurrentSessionId()).toMatch(INTEGER_REGEX);
      expect(localStorage.getItem(SESSION_EXPIRY_STORAGE_KEY)).toEqual(
        (Date.now() + DEFAULT_SESSION_EXPIRY_TIME_MS).toString(),
      );
    });

    test('should update the session if the expiry is NaN', () => {
      localStorage.setItem(SESSION_ID_STORAGE_KEY, 'abc-123');
      localStorage.setItem(SESSION_EXPIRY_STORAGE_KEY, 'I am not a number');
      const sessionTracking = new SessionTracking();
      expect(sessionTracking.getCurrentSessionId()).toMatch(INTEGER_REGEX);
      expect(localStorage.getItem(SESSION_EXPIRY_STORAGE_KEY)).toEqual(
        (Date.now() + DEFAULT_SESSION_EXPIRY_TIME_MS).toString(),
      );
    });

    test('should generate new sessionId if the time has expired', () => {
      const sessionTracking = new SessionTracking();
      const id = sessionTracking.getCurrentSessionId();
      advanceBy(DEFAULT_SESSION_EXPIRY_TIME_MS);

      expect(sessionTracking.getCurrentSessionId()).not.toEqual(id);
    });

    test('expiry time should be configurable', () => {
      const sessionTracking = new SessionTracking({ sessionExpiryTime: 100 });
      const id = sessionTracking.getCurrentSessionId();
      advanceBy(100);

      expect(sessionTracking.getCurrentSessionId()).not.toEqual(id);
    });

    test('sets the expired time on refresh', () => {
      const sessionTracking = new SessionTracking();
      // eslint-disable-next-line no-underscore-dangle
      sessionTracking._updateSessionExpiry();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        SESSION_EXPIRY_STORAGE_KEY,
        (Date.now() + DEFAULT_SESSION_EXPIRY_TIME_MS).toString(),
      ); // 30 Minutes
    });

    test('migrates uuid sessionId to integer', () => {
      setSessionId(uuidv4());
      const sessionTracking = new SessionTracking();
      expect(sessionTracking.getCurrentSessionId()).toMatch(INTEGER_REGEX);
    });

    test('avoids parseInt wackiness with uuids', () => {
      setSessionId('12341-fe9e-455a-abc6-42aea7613343');
      const sessionTracking = new SessionTracking();
      expect(sessionTracking.getCurrentSessionId()).toMatch(INTEGER_REGEX);
    });
  });

  describe('AnalyticsWebClient', () => {
    let mockXHR: any = null;
    let client: any = null;
    let oldXMLHttpRequest: any = null;

    const oldLocation = window.location;

    function assertMockXHR(mockXHRRequest: any) {
      const events = getEventsFromMockXHR(mockXHRRequest, 4);
      const request1 = events[0];
      const request2 = events[1];
      const request3 = events[2];
      const request4 = events[3];

      expect(request1.properties.sessionId).toMatch(INTEGER_REGEX);
      expect(request2.properties.sessionId).toMatch(INTEGER_REGEX);
      expect(request3.properties.sessionId).toMatch(INTEGER_REGEX);
      expect(request4.properties.sessionId).toMatch(INTEGER_REGEX);
      expect(request2.properties.sessionId).toEqual(
        request1.properties.sessionId,
      );
      expect(request4.properties.sessionId).toEqual(
        request3.properties.sessionId,
      );
      expect(request2.properties.sessionId).not.toEqual(
        request4.properties.sessionId,
      );
    }

    beforeEach(() => {
      oldXMLHttpRequest = window.XMLHttpRequest;
      // @ts-ignore
      window.location = Object.assign(new URL(STAGING_BASE_URL), {
        ancestorOrigins: "",
        assign: jest.fn(),
        reload: jest.fn(),
        replace: jest.fn()
      });
      mockXHR = createDefaultMockXHR();

      // @ts-ignore
      window.XMLHttpRequest = jest.fn(() => mockXHR);

      client = new AnalyticsWebClient(PRODUCT_INFO);
      jest.useFakeTimers();
    });

    afterEach(() => {
      client.clearUserInfo();
      jest.useRealTimers();
      jest.clearAllMocks();
      localStorage.clear();
      window.XMLHttpRequest = oldXMLHttpRequest;
    });

    afterAll(() => {
      window.location = oldLocation;
    });

    test('sends same sessionId for all events', () => {
      client.sendScreenEvent(SCREEN_EVENT);
      client.sendTrackEvent(ACTION_EVENT);
      client.sendUIEvent(ACTION_EVENT);
      client.sendOperationalEvent(ACTION_EVENT);

      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const events = getEventsFromMockXHR(mockXHR, 4);
      const request1 = events[0];
      const request2 = events[1];
      const request3 = events[2];
      const request4 = events[3];

      expect(request1.properties.sessionId).toMatch(INTEGER_REGEX);
      expect(request2.properties.sessionId).toMatch(INTEGER_REGEX);
      expect(request3.properties.sessionId).toMatch(INTEGER_REGEX);
      expect(request4.properties.sessionId).toMatch(INTEGER_REGEX);
      expect(request2.properties.sessionId).toEqual(
        request1.properties.sessionId,
      );
      expect(request3.properties.sessionId).toEqual(
        request1.properties.sessionId,
      );
      expect(request4.properties.sessionId).toEqual(
        request1.properties.sessionId,
      );
    });

    test('sends different sessionIds after reset', () => {
      Date.now = jest.fn(() => 0);
      client.sendScreenEvent(SCREEN_EVENT);
      client.sendTrackEvent(ACTION_EVENT);

      localStorage.clear();

      Date.now = jest.fn(() => 1);
      client.sendUIEvent(ACTION_EVENT);
      client.sendOperationalEvent(ACTION_EVENT);

      waitForEventsToSend();
      jest.runOnlyPendingTimers();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      assertMockXHR(mockXHR);
    });

    test('sends different sessionIds after expiry', () => {
      Date.now = jest.fn(() => 0);
      client.sendScreenEvent(SCREEN_EVENT);
      client.sendTrackEvent(ACTION_EVENT);

      Date.now = jest.fn(() => 1800000); // 30 Minutes

      client.sendUIEvent(ACTION_EVENT);
      client.sendOperationalEvent(ACTION_EVENT);

      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      assertMockXHR(mockXHR);
    });

    test('expiry time should be configurable', () => {
      client = new AnalyticsWebClient(PRODUCT_INFO, {
        sessionExpiryTime: 1,
      });
      Date.now = jest.fn(() => 0);
      client.sendScreenEvent(SCREEN_EVENT);
      client.sendTrackEvent(ACTION_EVENT);

      Date.now = jest.fn(() => 1);

      client.sendUIEvent(ACTION_EVENT);
      client.sendOperationalEvent(ACTION_EVENT);

      waitForEventsToSend();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      assertMockXHR(mockXHR);
    });
  });
});
