import AnalyticsWebClient from '../src';

import {
  commonEventTests,
  PAGE_NAME,
  PRODUCT_INFO,
  SCREEN_EVENT,
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

  describe('sendScreenEvent', () => {
    commonEventTests((commonClient: any) => {
      commonClient.sendScreenEvent(PAGE_NAME);
    });

    test('should throw if `name` is missing', () => {
      expect(() => {
        client.sendScreenEvent();
      }).toThrow('Missing name');
    });

    test('should not send potential user generated content', () => {
      client.sendScreenEvent(PAGE_NAME);
      waitForEventsToSend();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.title).toEqual('');
      expect(request.properties.path).toEqual('');
      expect(request.properties.url).toEqual('');
      expect(request.properties.referrer).toEqual('');
      expect(request.properties.search).toEqual('');
    });

    test('should send page event fields', () => {
      client.sendScreenEvent(PAGE_NAME);
      waitForEventsToSend();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.name).toEqual(PAGE_NAME);
      expect(request.type).toEqual('page');
    });
    test('should send attributes', () => {
      const attributes = { one: 'one', two: 'two' };
      client.sendScreenEvent(SCREEN_EVENT);
      waitForEventsToSend();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.attributes).toEqual(attributes);
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
      client.sendScreenEvent(SCREEN_EVENT);
      waitForEventsToSend();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.containers).toEqual(containers);
    });
    test('should send containers object, ignoring extra fields', () => {
      const screenEventWithAdditionalContainerFields = {
        name: SCREEN_EVENT.name,
        containers: {
          containerKey1: {
            id: '1234',
            additional: 'test',
          },
          containerKey2: {
            id: '1234',
            type: 'project',
          },
        },
        actionSubject: (SCREEN_EVENT as any).containerType,
        action: (SCREEN_EVENT as any).action,
      };
      const expectedContainers = {
        containerKey1: {
          id: '1234',
        },
        containerKey2: {
          id: '1234',
          type: 'project',
        },
      };
      client.sendScreenEvent(screenEventWithAdditionalContainerFields);
      waitForEventsToSend();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.containers).toEqual(expectedContainers);
    });

    test('should throw error if containers object is invalid', () => {
      const invalidEvent = {
        name: SCREEN_EVENT.name,
        containers: {
          containerKey1: {
            noid: true,
          },
        },
        actionSubject: (SCREEN_EVENT as any).containerType,
        action: (SCREEN_EVENT as any).action,
      };
      expect(mockXHR.send).toHaveBeenCalledTimes(0);
      expect(() => client.sendScreenEvent(invalidEvent)).toThrow(
        "properties.containers is missing field 'id'",
      );
    });
    test('should send nonPrivacySafe', () => {
      const nonPrivacySafeAttributes = { foo: 'bar' };
      client.sendScreenEvent(SCREEN_EVENT);
      waitForEventsToSend();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.nonPrivacySafeAttributes).toEqual(
        nonPrivacySafeAttributes,
      );
    });

    test('should send tags', () => {
      const tags = ['foo', 'bar'];
      client.sendScreenEvent(SCREEN_EVENT);
      waitForEventsToSend();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.tags).toEqual(tags);
    });

    test('should default to no tags when using event name', () => {
      client.sendScreenEvent(PAGE_NAME);
      waitForEventsToSend();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.tags).toBeUndefined();
    });

    test('should send pageLoadId', () => {
      client.sendScreenEvent(SCREEN_EVENT);
      waitForEventsToSend();

      expect(mockXHR.send).toHaveBeenCalledTimes(1);
      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.properties.pageLoadId).toBeDefined();
    });
  });
});
