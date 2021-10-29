import { customMetricMock } from '../../../mocks';
import { BMEventsType } from '../../../types';
import { MetricState } from '../../base-metric';
import { PageLoadMetaMetric } from '../../page-load-meta-metric';

const makeNewMetric = () =>
  new PageLoadMetaMetric({
    type: BMEventsType.PAGE_LOAD,
    key: 'page_load_meta_metric',
  });

describe('PageLoadMetaMetric', () => {
  let metric = makeNewMetric();
  beforeEach(() => {
    metric = makeNewMetric();
  });
  test("set metric to STARTED when metric wasn't started yet", () => {
    metric.startPageLoad({ startTime: 10, isInitial: false });
    expect(metric.getData().state).toBe(MetricState.STARTED);
  });
  test('reset metric in STARTED mode when cancel flag was set', () => {
    metric.startPageLoad({ startTime: 10, isInitial: false });
    metric.startPageLoad({
      startTime: 20,
      isInitial: false,
      cancelStarted: true,
    });
    expect(metric.getData()).toMatchObject({
      state: MetricState.STARTED,
      start: 20,
    });
  });

  test('does not reset metric in STARTED mode when cancel flag was not set', () => {
    metric.startPageLoad({ startTime: 10, isInitial: false });
    metric.startPageLoad({ startTime: 20, isInitial: false });
    expect(metric.getData()).toMatchObject({
      state: MetricState.STARTED,
      start: 10,
    });
  });

  test('adds included metric to generated submetrics', () => {
    const submetric = customMetricMock();
    metric.startPageLoad({ startTime: 10, isInitial: false });
    metric.include(submetric);
    submetric.start({ startTime: 20 });
    submetric.stop({ stopTime: 40 });
    metric.stop({ stopTime: 60 });
    expect(metric.getData().config.include).toContainEqual(submetric);
  });
});
