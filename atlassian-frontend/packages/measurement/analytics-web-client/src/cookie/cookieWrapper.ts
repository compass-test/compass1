import Cookie from 'js-cookie';

import { COOKIE_OPTIONS } from './defaults';
import LocalStorageAlt from './localStorageAlt';
import { CookieLike } from './types';
import {
  canUseCookie,
  getTld,
} from './util';

export default class CookieWrapper implements CookieLike {

  private cookieLike: CookieLike;

  constructor() {
    this.cookieLike = canUseCookie() ? Cookie : new LocalStorageAlt();
  }

  set(name: string, value: string, options?: Cookie.CookieAttributes | undefined): string | undefined {
    return this.cookieLike.set(name, value, {
      ...COOKIE_OPTIONS,
      // Function is memoized so we only calculate this once per page load
      domain: getTld(),
      ...options,
    });
  }

  get(name: string): string | undefined {
    return this.cookieLike.get(name);
  }

  remove(name: string, options?: Cookie.CookieAttributes | undefined): void {
    this.cookieLike.remove(name, {
      ...options,
    });
  }
}
