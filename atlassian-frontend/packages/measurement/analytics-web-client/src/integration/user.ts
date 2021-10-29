import { v4 as uuid } from 'uuid';

import Cookie from '../cookie';
import SafeLocalStorage from '../storage/SafeLocalStorage';

export const ANONYMOUS_ID_KEY = 'ajs_anonymous_id';

export default class User {
  private store: SafeLocalStorage;
  private cookie: Cookie;

  private userId?: string;

  constructor() {
    this.store = new SafeLocalStorage({
      useStoragePrefix: false,
    });
    this.cookie = new Cookie();
  }

  getUserId(): string | null {
    return this.userId || null;
  }

  setUserId(userId?: string) {
    this.userId = userId;
  }

  getAnonymousId(): string {
    const anonId = this.cookie.get(ANONYMOUS_ID_KEY);
    if (anonId) {
      return JSON.parse(anonId);
    } else {
      const localstorageAnonid = this.store.getItem(ANONYMOUS_ID_KEY);
      if (localstorageAnonid) {
        const parsedAnonId = JSON.parse(localstorageAnonid);
        this.setAnonymousId(parsedAnonId);
        return parsedAnonId;
      }
    }
    const newAnonId = uuid();
    this.setAnonymousId(newAnonId);
    return newAnonId;
  }

  setAnonymousId(userId: string) {
    this.cookie.set(ANONYMOUS_ID_KEY, JSON.stringify(userId));
    return this.store.setItem(ANONYMOUS_ID_KEY, JSON.stringify(userId));
  }
}
