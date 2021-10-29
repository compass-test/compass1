import './util/jestConfigReset.helper';

import { userType } from '../src';
import AnalyticsWebClient from '../src/analyticsWebClient';
import TestingCache from '../src/testingCache';

import { ACTION_EVENT, SCREEN_EVENT } from './util/commonTests';

declare let require: any;

const cookie = require('@segment/analytics.js-core/lib/cookie');

describe('testingCache', () => {
  const reset = () => {
    jest.useRealTimers();
    cookie.remove('atlassian_analytics_debug');
    if (window.testAnalytics) {
      window.testAnalytics.clear();
      window.testAnalytics = undefined;
    }
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    reset();
  });

  describe('cache', () => {
    let testingCache: any;

    describe('debugEnabled', () => {
      beforeEach(() => {
        cookie.set('atlassian_analytics_debug', true);
        testingCache = new TestingCache();
      });

      test('should save events in its cache', () => {
        testingCache.saveEvent({
          test: 'foo',
        });
        expect(window.testAnalytics.events().length).toBe(1);
      });

      test('can clear cookies', () => {
        testingCache.saveEvent({
          test: 'foo',
        });

        expect(window.testAnalytics.events().length).toBe(1);
        window.testAnalytics.clear();
        expect(window.testAnalytics.events().length).toBe(0);
      });

      test('clears local storage', () => {
        document.hasFocus = () => true;
        jest.clearAllTimers();

        // analyticsClient.startUIViewedEvent();
        jest.runTimersToTime(3000);
        localStorage.setItem('awc.ui.viewed.last.sent', JSON.stringify({}));
        localStorage.setItem(
          'awc-local.ui.viewed.last.sent',
          JSON.stringify({}),
        );
        localStorage.setItem('awc-dev.ui.viewed.last.sent', JSON.stringify({}));
        localStorage.setItem(
          'awc-staging.ui.viewed.last.sent',
          JSON.stringify({}),
        );

        window.testAnalytics.clear();
        expect(localStorage.getItem('awc.ui.viewed.last.sent')).toBeNull();
        expect(
          localStorage.getItem('awc-local.ui.viewed.last.sent'),
        ).toBeNull();
        expect(localStorage.getItem('awc-dev.ui.viewed.last.sent')).toBeNull();
        expect(
          localStorage.getItem('awc-staging.ui.viewed.last.sent'),
        ).toBeNull();
      });

      test('should not cache more than 100 events', () => {
        for (let i = 0; i < 101; i++) {
          testingCache.saveEvent({
            test: 'foo',
          });
        }
        expect(window.testAnalytics.events().length).toBe(100);
      });

      test('should support multiple analytics clients', () => {
        testingCache.saveEvent({
          test: 'foo',
        });
        const testingCacheTwo = new TestingCache();
        testingCacheTwo.saveEvent({
          test: 'foo2',
        });
        const testingCacheThree = new TestingCache();
        testingCacheThree.saveEvent({
          test: 'foo3',
        });
        expect(window.testAnalytics.events().length).toBe(3);
      });

      test('should tag synthetic events with no tags', () => {
        const event = {
          test: 'foo',
        };
        testingCache.saveEvent(event);
        expect(event).toHaveProperty('tags', ['synthetic']);
      });

      test('should tag synthetic events with existing tags', () => {
        const event = {
          test: 'foo',
          tags: ['existing-tag'],
        };
        testingCache.saveEvent(event);
        expect(event.tags).toEqual(['existing-tag', 'synthetic']);
      });
    });

    describe('debugDisabled', () => {
      beforeEach(() => {
        cookie.set('atlassian_analytics_debug', false);
        testingCache = new TestingCache();
      });

      test('should not save events if turned off', () => {
        testingCache.saveEvent({
          test: 'foo',
        });
        expect(window.testAnalytics).toBe(undefined);
      });

      test('should not tag synthetic events when debug cookie not set', () => {
        cookie.set('atlassian_analytics_debug', false);
        const event = {
          test: 'foo',
          tags: ['existing-tag'],
        };
        testingCache.saveEvent(event);
        expect(event.tags).toEqual(['existing-tag']);
      });
    });
  });

  describe('eventTypes', () => {
    let analyticsClient: AnalyticsWebClient;

    beforeEach(() => {
      cookie.set('atlassian_analytics_debug', true);
      analyticsClient = new AnalyticsWebClient({
        env: 'local',
        product: 'unit-test',
      });
      analyticsClient.setTenantInfo('cloudId', '123');
      analyticsClient.setUserInfo(userType.ATLASSIAN_ACCOUNT, 'abc');
    });

    test('works for track events', () => {
      analyticsClient.sendTrackEvent(ACTION_EVENT, () => {
        expect(window.testAnalytics.events().length).toBe(1);
        expect(window.testAnalytics.events()[0].eventType).toEqual('track');
      });

      jest.runOnlyPendingTimers();
    });

    test('works for ui events', () => {
      analyticsClient.sendUIEvent(ACTION_EVENT, () => {
        expect(window.testAnalytics.events().length).toBe(1);
        expect(window.testAnalytics.events()[0].eventType).toEqual('ui');
      });

      jest.runOnlyPendingTimers();
    });

    test('works for operational events', () => {
      analyticsClient.sendOperationalEvent(ACTION_EVENT, () => {
        expect(window.testAnalytics.events().length).toBe(1);
        expect(window.testAnalytics.events()[0].eventType).toEqual(
          'operational',
        );
      });

      jest.runOnlyPendingTimers();
    });

    test('works for screen events', () => {
      analyticsClient.sendScreenEvent(SCREEN_EVENT, () => {
        expect(window.testAnalytics.events().length).toBe(1);
        expect(window.testAnalytics.events()[0].eventType).toEqual('screen');
      });

      jest.runOnlyPendingTimers();
    });
  });
});
