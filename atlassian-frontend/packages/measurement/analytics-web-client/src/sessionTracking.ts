import SafeLocalStorage from './storage/SafeLocalStorage';

const SESSION_ID_STORAGE_KEY = 'session.id';
const SESSION_EXPIRY_STORAGE_KEY = 'session.expiry';

const ONLY_NUMBERS_REGEX = /^\d+$/;

export const DEFAULT_SESSION_EXPIRY_TIME_MS = 30 * 60 * 1000; // 30 minutes
export const DEFAULT_EXPIRY_DEBOUNCE = 5 * 1000; // 5 seconds
export const DEFAULT_DEBOUNCE_THRESHOLD_PERCENTAGE = 0.9; // 90% of expiry

export type OptionsType = {
  sessionExpiryTime?: number;
  sessionExpiryDebounce?: number;
  sessionExpiryDebounceThresholdPercentage?: number;
};

export default class SessionTracking {
  _safeLocalStorage: SafeLocalStorage;

  _sessionExpiryTime: number;

  _sessionExpiryDebounce: number;

  _sessionExpiryDebounceThresholdPercentage: number;

  _sessionExpiryDebounceTimer?: number;

  constructor(options: OptionsType = {}) {
    this._sessionExpiryTime = options.sessionExpiryTime || DEFAULT_SESSION_EXPIRY_TIME_MS;
    this._sessionExpiryDebounce = options.sessionExpiryDebounce || DEFAULT_EXPIRY_DEBOUNCE;
    this._sessionExpiryDebounceThresholdPercentage =
      options.sessionExpiryDebounceThresholdPercentage
      || DEFAULT_DEBOUNCE_THRESHOLD_PERCENTAGE;

    this._safeLocalStorage = new SafeLocalStorage();
  }

  getCurrentSessionId() {
    const sessionId = this._safeLocalStorage.getItem(SESSION_ID_STORAGE_KEY);
    const sessionExpiry = parseInt(
      this._safeLocalStorage.getItem(SESSION_EXPIRY_STORAGE_KEY) || '0',
      10,
    ) || 0;

    this._debouncedUpdateSessionExpiry(sessionExpiry);

    if (!sessionId || sessionExpiry <= Date.now() || Number.isNaN(sessionExpiry)) {
      return this._generateNewSessionId();
    }

    // Old versions of sessionId were UUIDs which caused issues for Amplitude which only accepts
    // integers for this field. In these scenarios we want to regenerate the sessionId as an integer
    if (!ONLY_NUMBERS_REGEX.test(sessionId)) {
      return this._generateNewSessionId();
    }

    return sessionId;
  }

  _generateNewSessionId = () => {
    const newSessionId = Date.now().toString();
    this._safeLocalStorage.setItem(SESSION_ID_STORAGE_KEY, newSessionId);
    return newSessionId;
  };

  _updateSessionExpiry = () => {
    const expiry = Date.now() + this._sessionExpiryTime;
    this._safeLocalStorage.setItem(SESSION_EXPIRY_STORAGE_KEY, expiry.toString());
    return expiry;
  }

  _debouncedUpdateSessionExpiry = (currentExpiry: number) => {
    const { _updateSessionExpiry } = this;
    // If the current expiry is out of date by more than 10% of the expiry, update immediately
    if (currentExpiry < Date.now() + (this._sessionExpiryDebounceThresholdPercentage * this._sessionExpiryTime)) {
      return _updateSessionExpiry();
    } else {
      if (this._sessionExpiryDebounceTimer) {
        clearTimeout(this._sessionExpiryDebounceTimer);
      }
      // @ts-ignore Something wrong with our types... this is legit
      this._sessionExpiryDebounceTimer = setTimeout(() => {
        _updateSessionExpiry();
      }, this._sessionExpiryDebounce);
    }
  };
}
