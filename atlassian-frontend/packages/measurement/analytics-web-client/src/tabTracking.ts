import SafeSessionStorage from './storage/SafeSessionStorage';
import uuidv4 from './uuid';

const STORAGE_KEY = 'tab.id';

export default class TabTracking {
  _safeSessionStorage: SafeSessionStorage;

  constructor() {
    this._safeSessionStorage = new SafeSessionStorage();
  }

  getCurrentTabId() {
    let tabId = this._safeSessionStorage.getItem(STORAGE_KEY);
    if (!tabId) {
      tabId = this._generateNewTabId();
    }
    return tabId;
  }

  _generateNewTabId = () => {
    const newTabId = uuidv4();
    this._safeSessionStorage.setItem(STORAGE_KEY, newTabId);
    return newTabId;
  };
}
