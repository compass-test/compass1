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
    jest.useFakeTimers();
    mockXHR = createDefaultMockXHR();
    // @ts-ignore
    window.XMLHttpRequest = jest.fn(() => mockXHR);

    client = new AnalyticsWebClient(PRODUCT_INFO);
  });

  afterEach(() => {
    jest.useRealTimers();
    client.clearUserInfo();
    window.XMLHttpRequest = oldXMLHttpRequest;
  });

  describe('sendTrackEvent', () => {
    commonEventTests((commonClient: any) => {
      commonClient.sendTrackEvent(ACTION_EVENT);
    });

    commonActionEventTests((commonClient: any, event: any) => {
      commonClient.sendTrackEvent(event);
    });

    test('should send container-level action', () => {
      client.sendTrackEvent({
        source: ACTION_EVENT.source,
        containerType: ACTION_EVENT.containerType,
        containerId: ACTION_EVENT.containerId,
        actionSubject: ACTION_EVENT.containerType,
        action: ACTION_EVENT.action,
      });
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.containerType).toEqual('conversation');
      expect(request.properties.containerId).toEqual(
        '836e0f2e-6b13-45b5-840a-55ce50578574',
      );
      expect(request.properties.actionSubject).toEqual('conversation');
      expect(request.properties.action).toEqual('created');
    });

    test('should send containers object', () => {
      const containers = {
        containerKey: {
          id: '1234',
          type: 'project',
        },
        containerKey2: {
          id: '0987',
        },
      };
      client.sendTrackEvent({
        source: ACTION_EVENT.source,
        containers: ACTION_EVENT.containers,
        actionSubject: ACTION_EVENT.containerType,
        action: ACTION_EVENT.action,
      });
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.containers).toEqual(containers);
    });

    test('should throw error if containers object is invalid', () => {
      const invalidEvent = {
        source: ACTION_EVENT.source,
        containers: {
          containerKey1: {
            noid: true,
          },
        },
        actionSubject: ACTION_EVENT.containerType,
        action: ACTION_EVENT.action,
      };
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(0);
      expect(() => client.sendTrackEvent(invalidEvent)).toThrow(
        "properties.containers is missing field 'id'",
      );
    });

    test('should send object-level action', () => {
      client.sendTrackEvent({
        source: ACTION_EVENT.source,
        objectType: ACTION_EVENT.objectType,
        objectId: ACTION_EVENT.objectId,
        actionSubject: ACTION_EVENT.containerType,
        action: ACTION_EVENT.action,
      });
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.objectType).toEqual('message');
      expect(request.properties.objectId).toEqual(
        'ea9db061-6ae1-46c9-a46d-e0033e8bd3af',
      );
      expect(request.properties.actionSubject).toEqual('conversation');
      expect(request.properties.action).toEqual('created');
    });

    test('should send action with no container or object', () => {
      client.sendTrackEvent({
        source: ACTION_EVENT.source,
        actionSubject: ACTION_EVENT.containerType,
        action: ACTION_EVENT.action,
      });
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.actionSubject).toEqual('conversation');
      expect(request.properties.action).toEqual('created');
    });

    test('should send correct type and eventType', () => {
      client.sendTrackEvent(ACTION_EVENT);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.type).toEqual('track');
      expect(request.properties.eventType).toEqual(eventType.TRACK);
    });

    test('should send attributes', () => {
      const attributes = { one: 'one', two: 'two' };
      client.sendTrackEvent(ACTION_EVENT, 'callback');
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.attributes).toEqual(attributes);
    });

    test('should send nonPrivacySafe', () => {
      const nonPrivacySafeAttributes = { foo: 'bar' };
      client.sendTrackEvent(
        ACTION_EVENT,
        'callback',
        {},
        nonPrivacySafeAttributes,
      );
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.nonPrivacySafeAttributes).toEqual(
        nonPrivacySafeAttributes,
      );
    });

    test('should send pageLoadId', () => {
      client.sendTrackEvent(ACTION_EVENT);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.pageLoadId).toBeDefined();
    });
  });
});
