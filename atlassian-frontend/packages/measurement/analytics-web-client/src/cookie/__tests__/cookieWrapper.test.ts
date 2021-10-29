import Cookie from 'js-cookie';

import generateChance from '../../../__test__/util/chance';
import CookieWrapper from '../cookieWrapper';
import {
  COOKIE_OPTIONS,
} from '../defaults';
import {
  canUseCookie,
  getTld,
} from '../util';

const chance = generateChance('cookie/cookieWrapper');

jest.mock('js-cookie');
jest.mock('../util');

describe('cookie/cookieWrapper', () => {
  let cookie: CookieWrapper;

  beforeEach(() => {
    (canUseCookie as jest.Mock).mockReturnValue(true);
    (getTld as jest.Mock).mockReturnValue('.atlassian.net');
    cookie = new CookieWrapper;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should set cookie with attributes', () => {
    const cookieKey = chance.string();
    const cookieValue = chance.string();

    expect(() => cookie.set(cookieKey, cookieValue)).not.toThrow();

    expect(Cookie.set).toHaveBeenCalledTimes(1);
    expect(Cookie.set).toHaveBeenCalledWith(
      cookieKey,
      cookieValue,
      {
        ...COOKIE_OPTIONS,
        domain: '.atlassian.net'
      }
    );
  });

  test('should only run getTld when needed', () => {
    const cookieKey = chance.string();
    const cookieValue = chance.string();
    expect(getTld).not.toHaveBeenCalled();

    cookie.set(cookieKey, cookieValue);

    expect(getTld).toHaveBeenCalledTimes(1);
  });

  test('should get cookie', () => {
    const cookieKey = chance.string();
    const cookieValue = chance.string();

    (Cookie.get as jest.Mock).mockReturnValue(cookieValue);

    expect(cookie.get(cookieKey)).toEqual(cookieValue);
    expect(Cookie.get).toHaveBeenCalledTimes(1);
    expect(Cookie.get).toHaveBeenCalledWith(cookieKey);
  });
});
