import { CookieAttributes } from 'js-cookie';

export type CookieLike = {
  /**
  * Create a cookie
  */
  set(name: string, value: string, options?: CookieAttributes): string | undefined;

  /**
  * Read cookie
  */
  get(name: string): string | undefined;

  /**
  * Delete cookie
  */
  remove(name: string, options?: CookieAttributes): void;
}
