import Cookie from 'js-cookie';
import memoize from 'memoize-one';

import { moveToUrl } from '../../../__test__/util/commonUtil';
import {
  canUseCookie,
  COOKIE_NAME,
  COOKIE_VALUE,
} from '../util';

jest.mock('memoize-one');
jest.mock('js-cookie');

const oldWindowLocation = window.location
describe('cookie/util', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    // restore `window.location` to the `jsdom` `Location` object
    window.location = oldWindowLocation;
  });

  describe('canUseCookie', () => {

    test('should return true when protocol is https', () => {
      moveToUrl("https://example.org");
      expect(canUseCookie()).toBe(true);
    });

    test('should return true when protocol is http', () => {
      moveToUrl("http://example.org");
      expect(canUseCookie()).toBe(true);
    });

    test('should return false when protocol is file', () => {
      moveToUrl("file://example.org");
      expect(canUseCookie()).toBe(false);
    });

    test('should return false when protocol is chrome-extension', () => {
      moveToUrl("chrome-extension://example.org");
      expect(canUseCookie()).toBe(false);
    });
  });

  describe('getTld', () => {
    const tldFunction = (memoize as jest.Mock).mock.calls[0][0];

    test('should return full domain if cookies do not work', () => {
      const domain = 'some.really.long.domain.com';
      moveToUrl(`https://${domain}/`);

      (Cookie.get as jest.Mock).mockReturnValue(undefined);

      expect(tldFunction()).toEqual(domain);
      expect(Cookie.set).toHaveBeenCalledTimes(5);
      expect(Cookie.set).toHaveBeenCalledWith(
        COOKIE_NAME,
        COOKIE_VALUE,
        {
          domain: '.com',
        }
      );
      const calls = (Cookie.set as jest.Mock).mock.calls;
      expect(calls[1][2]).toEqual({
        domain: '.domain.com'
      });
      expect(calls[2][2]).toEqual({
        domain: '.long.domain.com'
      });
      expect(calls[3][2]).toEqual({
        domain: '.really.long.domain.com'
      });
      expect(calls[4][2]).toEqual({
        domain: '.some.really.long.domain.com'
      });
    });

    test('should return first domain if first cookie is set', () => {
      const domain = 'some.really.long.domain.com';
      moveToUrl(`https://${domain}/`);

      (Cookie.get as jest.Mock).mockReturnValue(COOKIE_VALUE);

      expect(tldFunction()).toEqual('.com');
      expect(Cookie.set).toHaveBeenCalledTimes(1);
      expect(Cookie.set).toHaveBeenCalledWith(
        COOKIE_NAME,
        COOKIE_VALUE,
        {
          domain: '.com',
        }
      );
    });

    test('should return middle domain if some cookies dont work', () => {
      const domain = 'some.really.long.domain.com';
      moveToUrl(`https://${domain}/`);

      (Cookie.get as jest.Mock)
        .mockReturnValueOnce(undefined)
        .mockReturnValueOnce(undefined)
        .mockReturnValue(COOKIE_VALUE);

      expect(tldFunction()).toEqual('.long.domain.com');
      expect(Cookie.set).toHaveBeenCalledTimes(3);
      expect(Cookie.set).toHaveBeenCalledWith(
        COOKIE_NAME,
        COOKIE_VALUE,
        {
          domain: '.com',
        }
      );
      const calls = (Cookie.set as jest.Mock).mock.calls;
      expect(calls[1][2]).toEqual({
        domain: '.domain.com'
      });
      expect(calls[2][2]).toEqual({
        domain: '.long.domain.com'
      });
    });
  });
});
