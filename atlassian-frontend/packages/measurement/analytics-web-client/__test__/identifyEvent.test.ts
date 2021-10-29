import AnalyticsWebClient, { userType } from '../src';

import { PRODUCT_INFO, USER_ID } from './util/commonTests';
import { waitForEventsToSend } from './util/commonUtil';
import { createDefaultMockXHR, getEventsFromMockXHR } from './util/mockXHR';

describe('IdentifyEvent - AnalyticsWebClient', () => {
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

  describe('sendIdentifyEvent', () => {
    test('should throw if userIdType is not provided', () => {
      expect(() => {
        client.sendIdentifyEvent();
      }).toThrow('Missing userIdType');
    });

    test('should throw if userId is not provided', () => {
      expect(() => {
        client.sendIdentifyEvent(userType.ATLASSIAN_ACCOUNT);
      }).toThrow('Missing userId');
    });

    test('should throw if userIdType is invalid', () => {
      expect(() => {
        client.sendIdentifyEvent('blah', USER_ID);
      }).toThrow(
        "Invalid userIdType 'blah', must be an userType: [atlassianAccount,hashedEmail,trello,opsgenie,halp]",
      );
    });

    test('should send identify event fields', () => {
      client.sendIdentifyEvent(userType.ATLASSIAN_ACCOUNT, USER_ID);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request.traits.userIdType).toEqual(userType.ATLASSIAN_ACCOUNT);
      expect(request.userId).toEqual(USER_ID);

      expect(request.messageId).toBeTruthy();
      expect(request.anonymousId).toBeTruthy();
      expect(request.context.userAgent).toBeTruthy();
      expect(request.timestamp).toBeTruthy();

      expect(request.type).toEqual('identify');
    });

    test('should not include pageLoadId', () => {
      client.sendIdentifyEvent(userType.ATLASSIAN_ACCOUNT, USER_ID);
      waitForEventsToSend();
      expect(mockXHR.send).toHaveBeenCalledTimes(1);

      const request = getEventsFromMockXHR(mockXHR, 1)[0];
      expect(request?.properties?.pageLoadId).not.toBeDefined();
    });
  });
});
