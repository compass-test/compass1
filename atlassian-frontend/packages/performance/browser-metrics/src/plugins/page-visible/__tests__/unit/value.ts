import { PageLoadMetric } from '../../../../index';
import {
  pageLoadMetricMock,
  pageLoadPerformanceConfigMock,
  shareableGlobalConfigMock,
} from '../../../../mocks';
import { visibilityChangeObserver } from '../../../../observer/visibility-change-observer';
import {
  BasePageLoadMetricDataWithStartAndStop,
  PageVisibleValueOrigin,
  PerformanceEventConfig,
} from '../../../../types';
import { pageVisibleValue } from '../../value';

jest.mock('../../../..//observer/visibility-change-observer', () => ({
  __esModule: true,
  visibilityChangeObserver: {
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  },
}));

describe('page visible plugin', () => {
  describe('when documentHidden origin is chosen', () => {
    let metric: PageLoadMetric;
    beforeEach(() => {
      metric = pageLoadMetricMock();
      metric.startPageLoad({ isInitial: true });
      metric.stop({ stopTime: 100 });
    });

    test('should return true when page is not hidden', () => {
      Object.defineProperty(document, 'hidden', {
        configurable: true,
        get() {
          return false;
        },
      });
      expect(
        pageVisibleValue(
          pageLoadPerformanceConfigMock() as PerformanceEventConfig,
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock({
            pageVisibleValueOrigin: PageVisibleValueOrigin.documentHidden,
          }),
        ),
      ).toEqual({ 'pageVisible:value': true });
    });

    test('should return false when page is hidden', () => {
      Object.defineProperty(document, 'hidden', {
        configurable: true,
        get() {
          return true;
        },
      });
      expect(
        pageVisibleValue(
          pageLoadPerformanceConfigMock() as PerformanceEventConfig,
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock({
            pageVisibleValueOrigin: PageVisibleValueOrigin.documentHidden,
          }),
        ),
      ).toEqual({ 'pageVisible:value': false });
    });
  });

  describe('when pageVisibleState is chosen', () => {
    let callbacks: Function[] = [];
    beforeEach(() => {
      callbacks = [];
      (visibilityChangeObserver.subscribe as any).mockImplementation(
        (callback: Function) => {
          callbacks.push(callback);
        },
      );
    });

    test('should return true when page is always visible', () => {
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get() {
          return 'visible';
        },
      });

      const metric = pageLoadMetricMock();
      metric.startPageLoad({ isInitial: true });
      metric.stop({ stopTime: 100 });

      expect(
        pageVisibleValue(
          pageLoadPerformanceConfigMock() as PerformanceEventConfig,
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock({
            pageVisibleValueOrigin: PageVisibleValueOrigin.pageVisibleState,
          }),
        ),
      ).toEqual({ 'pageVisible:value': true });
    });

    test('should return false when page is always hidden', () => {
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get() {
          return 'hidden';
        },
      });

      const metric = pageLoadMetricMock();
      metric.startPageLoad({ isInitial: true });
      metric.stop({ stopTime: 100 });

      expect(
        pageVisibleValue(
          pageLoadPerformanceConfigMock() as PerformanceEventConfig,
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock({
            pageVisibleValueOrigin: PageVisibleValueOrigin.pageVisibleState,
          }),
        ),
      ).toEqual({ 'pageVisible:value': false });
    });

    test('should return false when page is mixed', () => {
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get() {
          return 'visible';
        },
      });

      const metric = pageLoadMetricMock();
      metric.startPageLoad({ isInitial: true });
      callbacks.forEach((callback) => callback());
      metric.stop({ stopTime: 100 });

      expect(
        pageVisibleValue(
          pageLoadPerformanceConfigMock() as PerformanceEventConfig,
          metric.getData() as BasePageLoadMetricDataWithStartAndStop,
          shareableGlobalConfigMock({
            pageVisibleValueOrigin: PageVisibleValueOrigin.pageVisibleState,
          }),
        ),
      ).toEqual({ 'pageVisible:value': false });
    });
  });
});
