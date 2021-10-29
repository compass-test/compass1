import AnalyticsWebClient from '../src';
import TabTracking from '../src/tabTracking';

import { ACTION_EVENT, PRODUCT_INFO, SCREEN_EVENT } from './util/commonTests';
import { waitForEventsToSend } from './util/commonUtil';
import { createDefaultMockXHR, getEventsFromMockXHR } from './util/mockXHR';
import UUID_V4_REGEX from './util/uuidTestUtil';

describe('TabTracking', () => {
  describe('getCurrentTabId', () => {
    beforeEach(() => {
      sessionStorage.clear();
    });

    test('should generate new tabId if none exists', () => {
      const tabTracking = new TabTracking();
      expect(tabTracking.getCurrentTabId()).toMatch(UUID_V4_REGEX);
    });

    test('should return same tabId if previously set', () => {
      const tabTracking = new TabTracking();
      const tabId1 = tabTracking.getCurrentTabId();
      const tabId2 = tabTracking.getCurrentTabId();
      expect(tabId2).toMatch(UUID_V4_REGEX);
      expect(tabId2).toEqual(tabId1);
    });

    test('should return different tabId if reset', () => {
      const tabTracking = new TabTracking();
      const tabId1 = tabTracking.getCurrentTabId();

      // mimic new tab by clearing sessionStorage
      sessionStorage.clear();
      const tabId2 = tabTracking.getCurrentTabId();

      expect(tabId2).toMatch(UUID_V4_REGEX);
      expect(tabId2).not.toEqual(tabId1);
    });

    test('should return same tabId for different instances', () => {
      const tabTracking1 = new TabTracking();
      const tabId1 = tabTracking1.getCurrentTabId();

      const tabTracking2 = new TabTracking();
      const tabId2 = tabTracking2.getCurrentTabId();

      expect(tabId1).toMatch(UUID_V4_REGEX);
      expect(tabId2).toMatch(UUID_V4_REGEX);
      expect(tabId1).toEqual(tabId2);
    });
  });

  describe('AnalyticsWebClient', () => {
    const oldXMLHttpRequest = window.XMLHttpRequest;
    let mockXHR: any = null;
    let client: any = null;

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
      jest.useRealTimers();
    });

    test('sends same tabId for all events', () => {
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

      expect(request1.properties.tabId).toMatch(UUID_V4_REGEX);
      expect(request2.properties.tabId).toMatch(UUID_V4_REGEX);
      expect(request3.properties.tabId).toMatch(UUID_V4_REGEX);
      expect(request4.properties.tabId).toMatch(UUID_V4_REGEX);

      expect(request2.properties.tabId).toEqual(request1.properties.tabId);
      expect(request3.properties.tabId).toEqual(request1.properties.tabId);
      expect(request4.properties.tabId).toEqual(request1.properties.tabId);
    });

    test('sends different tabId after reset', () => {
      client.sendScreenEvent(SCREEN_EVENT);
      client.sendTrackEvent(ACTION_EVENT);

      sessionStorage.clear();

      client.sendUIEvent(ACTION_EVENT);
      client.sendOperationalEvent(ACTION_EVENT);

      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const events = getEventsFromMockXHR(mockXHR, 4);
      const request1 = events[0];
      const request2 = events[1];
      const request3 = events[2];
      const request4 = events[3];

      expect(request1.properties.tabId).toMatch(UUID_V4_REGEX);
      expect(request2.properties.tabId).toMatch(UUID_V4_REGEX);
      expect(request3.properties.tabId).toMatch(UUID_V4_REGEX);
      expect(request4.properties.tabId).toMatch(UUID_V4_REGEX);

      expect(request2.properties.tabId).toEqual(request1.properties.tabId);
      expect(request4.properties.tabId).toEqual(request3.properties.tabId);
      expect(request2.properties.tabId).not.toEqual(request4.properties.tabId);
    });
  });
});
