import AnalyticsWebClient, { eventType } from '../src';

import {
  ACTION_EVENT,
  commonActionEventTests,
  commonEventTests,
  PRODUCT_INFO,
} from './util/commonTests';
import { waitForEventsToSend } from './util/commonUtil';
import { createDefaultMockXHR, getEventsFromMockXHR } from './util/mockXHR';

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

  describe('sendOperationalEvent', () => {
    commonEventTests((commonClient: any) => {
      commonClient.sendOperationalEvent(ACTION_EVENT);
    });

    commonActionEventTests((commonClient: any, event: any) => {
      commonClient.sendOperationalEvent(event);
    });

    test('should send with only required fields', () => {
      const operationalEvent = {
        source: 'dashboard',
        actionSubject: 'editorContainer',
        action: 'initialised',
      };

      client.sendOperationalEvent(operationalEvent);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.source).toEqual(operationalEvent.source);
      expect(request.properties.actionSubject).toEqual(
        operationalEvent.actionSubject,
      );
      expect(request.properties.action).toEqual(operationalEvent.action);
    });

    test('should send correct type and eventType', () => {
      client.sendOperationalEvent(ACTION_EVENT);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.type).toEqual('track');
      expect(request.properties.eventType).toEqual(eventType.OPERATIONAL);
    });

    test('should send pageLoadId', () => {
      client.sendOperationalEvent(ACTION_EVENT);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.pageLoadId).toBeDefined();
    });
  });
});
