import SafeLocalStorage from '../storage/SafeLocalStorage';

import { CookieLike } from './types';

export default class LocalStorageAlt implements CookieLike {

  private safeStorage: SafeLocalStorage;

  constructor() {
    this.safeStorage = new SafeLocalStorage({
      useStoragePrefix: false,
    });
  }

  set(name: string, value: string): string | undefined {
    this.safeStorage.setItem(name, value);
    return value;
  }

  get(name: string): string | undefined {
    const value = this.safeStorage.getItem(name);
    return value || undefined;
  }

  remove(name: string): void {
    this.safeStorage.removeItem(name);
  }
}
