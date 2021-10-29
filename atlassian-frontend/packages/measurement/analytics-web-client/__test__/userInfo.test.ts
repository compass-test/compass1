import AnalyticsWebClient, { userType } from '../src';

import { PRODUCT_INFO, USER_ID } from './util/commonTests';

declare const require: any;

const cookie = require('@segment/analytics.js-core/lib/cookie');

describe('UserInfo - AnalyticsWebClient', () => {
  let client: any = null;
  let anonymousId: any = null;

  beforeEach(() => {
    client = new AnalyticsWebClient(PRODUCT_INFO);
    // eslint-disable-next-line no-underscore-dangle
    anonymousId = client._analytics.user().anonymousId();
  });

  afterEach(() => {
    client.clearUserInfo();
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('setUserInfo', () => {
    test('should throw if userIdType is not provided', () => {
      expect(() => {
        client.setUserInfo();
      }).toThrow('Missing userIdType');
    });

    test('should throw if userId is not provided', () => {
      expect(() => {
        client.setUserInfo(userType.ATLASSIAN_ACCOUNT);
      }).toThrow('Missing userId');
    });

    test('should throw if userIdType is invalid', () => {
      expect(() => {
        client.setUserInfo('blah', USER_ID);
      }).toThrow(
        "Invalid userIdType 'blah', must be an userType: [atlassianAccount,hashedEmail,trello,opsgenie,halp]",
      );
    });

    test('should set userInfo if valid Atlassian Account', () => {
      client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
      // eslint-disable-next-line no-underscore-dangle
      expect(client._userInfo).toEqual({
        userIdType: userType.ATLASSIAN_ACCOUNT,
        userId: USER_ID,
        anonymousId,
      });
    });

    test('should set userInfo if valid Trello', () => {
      client.setUserInfo(userType.TRELLO, USER_ID);
      // eslint-disable-next-line no-underscore-dangle
      expect(client._userInfo).toEqual({
        userIdType: userType.TRELLO,
        userId: USER_ID,
        anonymousId,
      });
    });

    test('should change internal userId', () => {
      // eslint-disable-next-line no-underscore-dangle
      const spy = jest.spyOn(client._analytics.user(), 'id');
      client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);

      // Calls `id` twice, first to get the id and second to set the `id`
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).lastCalledWith(USER_ID);

      // eslint-disable-next-line no-underscore-dangle
      expect(client._analytics.user().id()).toEqual(USER_ID);

      spy.mockReset();
      spy.mockRestore();
    });

    test('should not change internal userId if the same', () => {
      client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);

      // eslint-disable-next-line no-underscore-dangle
      const spy = jest.spyOn(client._analytics.user(), 'id');
      client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);

      // Calls `id` once with no args to get the id
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith();

      // eslint-disable-next-line no-underscore-dangle
      expect(client._analytics.user().id()).toEqual(USER_ID);

      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('clearUserInfo', () => {
    test('should clear userInfo', () => {
      client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);
      client.clearUserInfo();

      // eslint-disable-next-line no-underscore-dangle
      expect(client._userInfo).toEqual({ anonymousId });

      // eslint-disable-next-line no-underscore-dangle
      expect(client._analytics.user().id()).toEqual(null);
    });
  });

  describe('userId should not be contaminated by other Segment analytics clients', () => {
    afterEach(() => {
      cookie.remove('ajs_user_id', USER_ID);
    });

    test('should not be loaded from cookie', () => {
      cookie.set('ajs_user_id', USER_ID);
      client = new AnalyticsWebClient(PRODUCT_INFO);

      // eslint-disable-next-line no-underscore-dangle
      expect(client._analytics.user().id()).toEqual(null);
    });

    test('should not be loaded from localStorage', () => {
      cookie.remove('ajs_user_id');
      localStorage.setItem('ajs_user_id', USER_ID);
      client = new AnalyticsWebClient(PRODUCT_INFO);

      // eslint-disable-next-line no-underscore-dangle
      expect(client._analytics.user().id()).toEqual(null);
    });
  });

  describe('userId should contaminate other Segment analytics clients', () => {
    test('should not set userId in cookie', () => {
      const spy = jest.spyOn(cookie, 'set');

      client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);

      expect(spy).not.toHaveBeenCalledWith('ajs_user_id', expect.any(String));

      spy.mockRestore();
    });

    test('should not set userId in localStorage', () => {
      const spy = jest.spyOn(localStorage, 'setItem');
      cookie.remove('ajs_user_id');

      client.setUserInfo(userType.ATLASSIAN_ACCOUNT, USER_ID);

      expect(spy).not.toHaveBeenCalledWith('ajs_user_id', expect.any(String));

      spy.mockRestore();
    });
  });
});
