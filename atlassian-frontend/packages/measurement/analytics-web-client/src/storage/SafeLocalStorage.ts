import InMemoryStorage from './InMemoryStorage';
import SafeStorage from './SafeStorage';
import { Options } from './types';
// eslint-disable-next-line import/no-anonymous-default-export
export default class extends SafeStorage {
  constructor(options?: Options) {
    let storageToUse;
    try {
      storageToUse = window.localStorage || InMemoryStorage;
    } catch (err) {
      storageToUse = InMemoryStorage;
    }
    super(storageToUse, options);
  }
}
