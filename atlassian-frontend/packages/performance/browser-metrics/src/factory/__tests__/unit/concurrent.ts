import { MetricState } from '../../../metric/base-metric';
import { interactionPerformanceConfigMock } from '../../../mocks';
import { concurrent } from '../../concurrent';

describe('concurrent metrics', () => {
  test('can run in parallel', () => {
    const con = concurrent.interaction(interactionPerformanceConfigMock());
    con(1).start({ startTime: 0 });
    con(2).start({ startTime: 10 });
    con(1).stop({ stopTime: 40 });
    con(2).stop({ stopTime: 60 });
    expect(con(1).getData()).toEqual(
      expect.objectContaining({
        state: MetricState.FINISHED,
        start: 0,
        stop: 40,
      }),
    );
    expect(con(2).getData()).toEqual(
      expect.objectContaining({
        state: MetricState.FINISHED,
        start: 10,
        stop: 60,
      }),
    );
  });
  test('can overlap other one', () => {
    const con = concurrent.interaction(interactionPerformanceConfigMock());
    con(1).start({ startTime: 0 });
    con(2).start({ startTime: 10 });
    con(2).stop({ stopTime: 60 });
    con(1).stop({ stopTime: 140 });
    expect(con(1).getData()).toEqual(
      expect.objectContaining({
        state: MetricState.FINISHED,
        start: 0,
        stop: 140,
      }),
    );
    expect(con(2).getData()).toEqual(
      expect.objectContaining({
        state: MetricState.FINISHED,
        start: 10,
        stop: 60,
      }),
    );
  });

  test('can run multiple times with same id one after another', () => {
    const con = concurrent.interaction(interactionPerformanceConfigMock());
    con(1).start({ startTime: 0 });
    con(1).stop({ stopTime: 40 });
    expect(con(1).getData()).toEqual(
      expect.objectContaining({
        state: MetricState.FINISHED,
        start: 0,
        stop: 40,
      }),
    );

    con(1).start({ startTime: 100 });
    con(1).stop({ stopTime: 440 });
    expect(con(1).getData()).toEqual(
      expect.objectContaining({
        state: MetricState.FINISHED,
        start: 100,
        stop: 440,
      }),
    );
  });
});
