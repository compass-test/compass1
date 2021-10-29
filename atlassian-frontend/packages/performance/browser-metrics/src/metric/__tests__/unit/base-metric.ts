import { interactionPerformanceConfigMock } from '../../../mocks';
import { visibilityChangeObserver } from '../../../observer/visibility-change-observer';
import { BMEventsType, PerformanceEventConfig } from '../../../types';
import { BaseMetric, MetricState, PageVisibleState } from '../../base-metric';

const makeMetric = (extraConfig: Partial<PerformanceEventConfig> = {}) => {
  return new BaseMetric(interactionPerformanceConfigMock(extraConfig));
};

describe('BaseMetric', () => {
  test('replaces spaces in key', () => {
    const metric = makeMetric({ key: 'local key 2' });
    expect(metric.getData().key).toBe('local-key-2');
  });
  describe('returns correctly data', () => {
    test('with both start and stop', () => {
      const metric = makeMetric();
      metric.start();
      metric.stop();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          start: expect.any(Number),
          stop: expect.any(Number),
        }),
      );
    });
    test('with start only', () => {
      const metric = makeMetric();
      metric.start();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          start: expect.any(Number),
          stop: null,
        }),
      );
    });
    test('without start and stop when only stop triggered', () => {
      const metric = makeMetric();
      metric.stop();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          start: null,
          stop: null,
        }),
      );
    });
  });
  test('stops when "until" metric stops and waitUntil triggered', () => {
    const submetric = makeMetric({ key: 'submetric' });
    const metric = makeMetric({ until: submetric });
    metric.start();
    submetric.start();
    submetric.stop();
    expect(metric.getData()).toEqual(
      expect.objectContaining({
        start: expect.any(Number),
        stop: expect.any(Number),
        state: MetricState.FINISHED,
      }),
    );
  });
  test('doesn\'t stop when "until" metric stops but wait hasn\'t been triggered', () => {
    const submetric = makeMetric();
    const metric = makeMetric({ until: submetric });
    submetric.start();
    submetric.stop();
    expect(metric.getData()).toEqual(
      expect.objectContaining({
        start: null,
        stop: null,
        state: MetricState.NOT_STARTED,
      }),
    );
  });
  describe('multiple "until" metrics', () => {
    test('stops only when all "until" metrics stop', () => {
      const submetric1 = makeMetric({ key: 'submetric1' });
      const submetric2 = makeMetric({ key: 'submetric2' });
      const submetric3 = makeMetric({ key: 'submetric3' });
      const metric = makeMetric({
        until: [submetric1, submetric2, submetric3],
      });
      metric.start();
      submetric1.start();
      submetric1.stop();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          start: expect.any(Number),
          stop: null,
          state: MetricState.STARTED,
        }),
      );
      submetric2.start();
      submetric2.stop();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          start: expect.any(Number),
          stop: null,
          state: MetricState.STARTED,
        }),
      );
      submetric3.start();
      submetric3.stop();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          start: expect.any(Number),
          stop: expect.any(Number),
          state: MetricState.FINISHED,
        }),
      );
    });

    test('latest "until" time determines overall stop time', () => {
      const submetric1 = makeMetric({ key: 'submetric1' });
      const submetric2 = makeMetric({ key: 'submetric2' });
      const submetric3 = makeMetric({ key: 'submetric3' });
      const metric = makeMetric({
        until: [submetric1, submetric2, submetric3],
      });
      metric.start({ startTime: 0 });
      submetric1.start({ startTime: 1 });
      submetric2.start({ startTime: 2 });
      submetric3.start({ startTime: 3 });
      submetric1.stop({ stopTime: 1000 });
      submetric2.stop({ stopTime: 200 });
      submetric3.stop({ stopTime: 30 });
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          start: 0,
          stop: 1000,
          state: MetricState.FINISHED,
        }),
      );
    });

    test('all until custom data is accumulated onto dependent metric', () => {
      const submetric1 = makeMetric({ key: 'submetric1' });
      const submetric2 = makeMetric({ key: 'submetric2' });
      const submetric3 = makeMetric({ key: 'submetric3' });
      const submetric4 = makeMetric({ key: 'submetric4' });
      const submetric5 = makeMetric({ key: 'submetric5' });
      const metric = makeMetric({
        until: [submetric1, submetric2, submetric3, submetric4, submetric5],
      });
      metric.start();
      submetric1.start();
      submetric2.start();
      submetric3.start();
      submetric4.start();
      submetric5.start();
      submetric1.stop({ customData: { num: 1, collision: 'first' } });
      submetric2.stop({ customData: { bool: true, collision: 'second' } });
      submetric3.stop({ customData: { string: 'foo', collision: 'third' } });
      submetric4.stop({ customData: undefined });
      submetric5.stop({ customData: { collision: 'last-stopped-wins' } });
      expect(metric.getData().custom).toEqual(
        expect.objectContaining({
          num: 1,
          bool: true,
          string: 'foo',
          collision: 'last-stopped-wins',
        }),
      );
    });

    test('starting a metric multiple times does not interfere with until tracking', () => {
      const submetric1 = makeMetric({ key: 'submetric1' });
      const submetric2 = makeMetric({ key: 'submetric2' });
      const metric = makeMetric({
        until: [submetric1, submetric2],
      });
      metric.start({ startTime: 0 });
      submetric1.start();
      submetric1.stop();
      submetric2.start();

      // restart a few times
      submetric2.start();
      submetric2.start();

      expect(metric.getData()).toEqual(
        expect.objectContaining({
          start: 0,
          stop: null,
          state: MetricState.STARTED,
        }),
      );

      submetric2.stop();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          start: 0,
          stop: expect.any(Number),
          state: MetricState.FINISHED,
        }),
      );
    });

    test('finishes immediately if all until metrics are already stopped', () => {
      const submetric1 = makeMetric({ key: 'submetric1' });
      const submetric2 = makeMetric({ key: 'submetric2' });
      const metric = makeMetric({
        until: [submetric1, submetric2],
      });

      submetric1.start({ startTime: 1 });
      submetric1.stop({ stopTime: 11 });
      submetric2.start({ startTime: 2 });
      submetric2.stop({ stopTime: 22 });

      metric.start({ startTime: 0 });

      expect(metric.getData()).toEqual(
        expect.objectContaining({
          start: expect.any(Number),
          stop: expect.any(Number),
          state: MetricState.FINISHED,
        }),
      );
    });
  });

  test('merges data from other metric', () => {
    const metric1 = makeMetric();
    const metric2 = makeMetric();
    metric1.start();
    metric1.stop();
    metric2.merge(metric1.getDataToMerge());
    expect(metric2.getData()).toEqual(
      expect.objectContaining({
        start: expect.any(Number),
        stop: expect.any(Number),
        state: MetricState.FINISHED,
      }),
    );
  });

  test('merges onStop callbacks from other metric', () => {
    const metric1 = makeMetric();
    const metric2 = makeMetric();
    const stop = jest.fn();
    metric1.onStop(stop, () => {});
    metric2.merge(metric1.getDataToMerge());
    metric2.start();
    metric2.stop();
    expect(stop).toHaveBeenCalled();
  });

  describe('includes marks which happened after start', () => {
    const metric = makeMetric();
    metric.mark('mark_one');
    metric.start();
    metric.mark('mark_two');
    expect(metric.getData()).toEqual(
      expect.objectContaining({
        marks: { mark_two: expect.any(Number) },
      }),
    );
  });

  test('includes submetrics into data', () => {
    const submetric = makeMetric({ key: 'submetric' });
    const metric = makeMetric({ include: [submetric] });
    metric.start();
    submetric.start();
    submetric.stop();
    metric.stop();
    expect(metric.getData()).toEqual(
      expect.objectContaining({
        submetrics: expect.arrayContaining([
          expect.objectContaining({
            key: 'submetric',
            config: expect.objectContaining({
              type: BMEventsType.INLINE_RESULT,
            }),
          }),
        ]),
      }),
    );
  });
  describe('cancel method', () => {
    test('cancels metric', () => {
      const metric = makeMetric();
      metric.start();
      metric.cancel();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          state: MetricState.CANCELLED,
        }),
      );
    });
    test("sets cancel state which can't be overriden by stop", () => {
      const metric = makeMetric();
      metric.start();
      metric.cancel();
      metric.stop();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          state: MetricState.CANCELLED,
        }),
      );
    });
    test('cancels dependent metric', () => {
      const submetric = makeMetric({ key: 'submetric' });
      const metric = makeMetric({ until: submetric });
      metric.start();
      submetric.start();
      submetric.cancel();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          state: MetricState.CANCELLED,
        }),
      );
    });
    test("sets cancel state which can't be overriden by stop from until metric", () => {
      const submetric = makeMetric({ key: 'submetric' });
      const metric = makeMetric({ until: submetric });
      metric.start();
      submetric.start();
      metric.cancel();
      submetric.stop();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          state: MetricState.CANCELLED,
        }),
      );
    });
    test('with both start and stop', () => {
      const metric = makeMetric({
        timings: [{ key: 'ssr', startMark: 'test' }],
      });
      metric.start();
      metric.stop();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          config: expect.objectContaining({
            timings: [{ key: 'custom__ssr', startMark: 'test' }],
          }),
        }),
      );
    });
  });
  describe('should return correct pageVisibleState', () => {
    test("should return 'visible' pageVisibleState", () => {
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: function () {
          return 'visible';
        },
      });
      const metric = makeMetric();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          pageVisibleState: PageVisibleState.VISIBLE,
        }),
      );
    });
    test("should return 'hidden' pageVisibleState", () => {
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: function () {
          return 'hidden';
        },
      });
      const metric = makeMetric();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          pageVisibleState: PageVisibleState.HIDDEN,
        }),
      );
    });
    test("should return 'mixed' pageVisibleState", () => {
      Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        get: function () {
          return 'hidden';
        },
      });
      visibilityChangeObserver.start();
      const metric = makeMetric();
      metric.start();
      document.dispatchEvent(new Event('visibilitychange'));
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          pageVisibleState: PageVisibleState.MIXED,
        }),
      );
    });
  });
});
