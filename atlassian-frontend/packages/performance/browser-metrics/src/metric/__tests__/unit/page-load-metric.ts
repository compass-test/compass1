import { Route } from '../../../route';
import { submitter } from '../../../submitter/submitter';
import { BMEventsType, PageLoadPerformanceEventConfig } from '../../../types';
import { MetricState } from '../../base-metric';
import { pageLoadMetaMetric } from '../../page-load-meta-metric';
import { PageLoadMetric } from '../../page-load-metric';

const makeMetric = (
  extraConfig: Partial<PageLoadPerformanceEventConfig> = {},
) => {
  return new PageLoadMetric({
    key: 'page-load',
    type: BMEventsType.PAGE_LOAD,
    ...extraConfig,
  });
};

jest.mock('../../../submitter/submitter', () => ({
  submitter: { queue: jest.fn(), config: {} },
}));

describe('PageLoadMetric', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('sets route on stop method', () => {
    Route.setRoute('home');
    const metric = makeMetric();
    metric.startPageLoad();
    metric.stop();
    expect(metric.getData()).toEqual(
      expect.objectContaining({
        route: 'home',
      }),
    );
  });

  test('proxy start to meta metric', () => {
    const metric = makeMetric();
    metric.startPageLoad();
    expect(pageLoadMetaMetric.getData()).toEqual(
      expect.objectContaining({
        state: MetricState.STARTED,
      }),
    );
  });

  test('merges data from meta metric', () => {
    pageLoadMetaMetric.startPageLoad();
    const metric = makeMetric();
    metric.stop();
    expect(metric.getData()).toEqual(
      expect.objectContaining({
        state: MetricState.FINISHED,
        start: expect.any(Number),
        stop: expect.any(Number),
      }),
    );
  });

  test('queues event when non-virtual', () => {
    const metric = makeMetric();
    metric.startPageLoad();
    metric.stop();
    expect(submitter.queue).toHaveBeenCalled();
  });

  test('does not queue event when virtual', () => {
    const metric = makeMetric({ virtual: true });
    metric.startPageLoad();
    metric.stop();
    expect(submitter.queue).not.toHaveBeenCalled();
  });

  test('resets marks when restarted', () => {
    const metric = makeMetric();
    metric.startPageLoad({ isInitial: true });
    metric.mark('custom', 200);
    metric.stop({ stopTime: 500 });
    expect(metric.getData().marks).toEqual({ custom: 200 });

    metric.startPageLoad({ isInitial: false, startTime: 1000 });
    metric.stop();
    expect(metric.getData().marks).toEqual({});
  });

  test('overrides meta metric when startTime provided', () => {
    const metric = makeMetric();
    metric.startPageLoad({ startTime: 100000, isInitial: false });
    expect(pageLoadMetaMetric.getData()).toEqual(
      expect.objectContaining({
        state: MetricState.STARTED,
        start: 100000,
      }),
    );
  });
});
