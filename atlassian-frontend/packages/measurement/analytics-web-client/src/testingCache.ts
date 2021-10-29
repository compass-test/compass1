declare global {
  interface Window {
    testAnalytics?: any;
  }
}

const cookie = require('@segment/analytics.js-core/lib/cookie');

const MAX_CACHE_SIZE = 100;
const COOKIE_NAME = 'atlassian_analytics_debug';
const DEBUG_TAG = 'synthetic';

class TestingCache {
  private readonly _isDebugCookieEnabled: boolean;

  constructor() {
    this._isDebugCookieEnabled = !!cookie.get(COOKIE_NAME);
    if (this._isDebugCookieEnabled) {
      this._bind();
    }
  }

  _bind = () => {
    if (window.testAnalytics) {
      return;
    }

    window.testAnalytics = {
      eventCache: [],
      events: () => window.testAnalytics.eventCache,
      clear: () => {
        window.testAnalytics.eventCache = [];
        localStorage.removeItem('awc.ui.viewed.last.sent');
        localStorage.removeItem('awc-staging.ui.viewed.last.sent');
        localStorage.removeItem('awc-dev.ui.viewed.last.sent');
        localStorage.removeItem('awc-local.ui.viewed.last.sent');
      },
    };
  };

  _cache = (event: any) => {
    if (window.testAnalytics.eventCache.length >= MAX_CACHE_SIZE) {
      window.testAnalytics.eventCache = window.testAnalytics.eventCache.slice(
        1,
        window.testAnalytics.eventCache.length,
      );
    }
    window.testAnalytics.eventCache.push(event);
  };

  _shouldCacheEvent = () => this._isDebugCookieEnabled;

  saveEvent = (event?: any) => {
    if (event && this._shouldCacheEvent()) {
      if (!window.testAnalytics) {
        this._bind();
      }
      if (event.tags instanceof Array) {
        event.tags.push(DEBUG_TAG);
      } else {
        event.tags = [DEBUG_TAG];
      }
      this._cache(event);
    }
  };
}

export default TestingCache;
