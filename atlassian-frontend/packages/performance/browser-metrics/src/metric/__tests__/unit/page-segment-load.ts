import { Route } from '../../../route';
import { submitter } from '../../../submitter/submitter';
import {
  BMEventsType,
  PageSegmentLoadPerformanceEventConfig,
  PageSegmentPageLoadMetricsOptions,
} from '../../../types';
import { MetricState } from '../../base-metric';
import { pageLoadMetaMetric } from '../../page-load-meta-metric';
import { PageSegmentLoadMetric } from '../../page-segment-load';

const makeMetric = (
  extraConfig: Partial<PageSegmentLoadPerformanceEventConfig> = {},
) => {
  return new PageSegmentLoadMetric({
    key: 'top-nav',
    type: BMEventsType.PAGE_SEGMENT_LOAD,
    ...extraConfig,
  });
};

jest.mock('../../../submitter/submitter', () => ({
  submitter: { queue: jest.fn() },
}));

jest.mock('../../../helper/ssr-get-done-mark', () => ({
  SSRGetDoneMark: {
    getDoneMark: () => 123,
  },
}));

describe('Page Segment Load Metric', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('sets route on start method', () => {
    Route.setRoute('home');
    const metric = makeMetric();
    metric.start();
    expect(metric.getData()).toEqual(
      expect.objectContaining({
        route: 'home',
      }),
    );
  });
  test('queues event when non-virtual', () => {
    const metric = makeMetric();
    metric.start();
    metric.stop();
    expect(submitter.queue).toHaveBeenCalled();
  });
  test('does not queue event when virtual', () => {
    const metric = makeMetric({ virtual: true });
    metric.start();
    metric.stop();
    expect(submitter.queue).not.toHaveBeenCalled();
  });
  test('starts properly from the page load', () => {
    const metric = makeMetric();
    pageLoadMetaMetric.startPageLoad({ startTime: 0, isInitial: false });
    metric.startFromPageLoad();
    metric.stop();
    expect(submitter.queue).toHaveBeenCalled();
  });
  describe('when include page stats is set to WAIT_UNTIL_PRESENT', () => {
    test('waits for the page load when page load is started', () => {
      const metric = makeMetric({
        includePageLoadTimings:
          PageSegmentPageLoadMetricsOptions.WAIT_UNTIL_PRESENT,
      });
      pageLoadMetaMetric.startPageLoad({ startTime: 0, isInitial: false });
      metric.startFromPageLoad();
      metric.stop();
      expect(submitter.queue).not.toHaveBeenCalled();
      pageLoadMetaMetric.stop();
      expect(submitter.queue).toHaveBeenCalled();
    });
    test('triggers submitter when page load is done', () => {
      const metric = makeMetric({
        includePageLoadTimings:
          PageSegmentPageLoadMetricsOptions.WAIT_UNTIL_PRESENT,
      });
      pageLoadMetaMetric.startPageLoad({ startTime: 0, isInitial: false });
      metric.startFromPageLoad();
      pageLoadMetaMetric.stop();
      metric.stop();
      expect(submitter.queue).toHaveBeenCalled();
    });
  });
  test('sets FMP mark to the SSRDoneMark on initial load when doneAsFmp is configured', () => {
    const metric = makeMetric({
      ssr: { doneAsFmp: true },
    });
    pageLoadMetaMetric.startPageLoad({ isInitial: true });
    metric.startFromPageLoad();
    metric.stop();
    const { marks } = metric.getData();
    expect(marks).toEqual({ [PageSegmentLoadMetric.FMP]: 123 });
  });

  test('clears old metric data when re-started from the page load', () => {
    // Start the segment from the page load, add some marks then stop
    const segmentMetric = makeMetric();
    pageLoadMetaMetric.startPageLoad({ isInitial: true });
    segmentMetric.startFromPageLoad();
    segmentMetric.markFMP(10);
    segmentMetric.mark('mark', 15);
    segmentMetric.stop({ stopTime: 20 });
    expect(segmentMetric.getData()).toMatchObject({
      start: 0,
      stop: 20,
      state: MetricState.FINISHED,
      isInitial: true,
      marks: { [PageSegmentLoadMetric.FMP]: 10, mark: 15 },
    });

    // Start the segment again
    pageLoadMetaMetric.startPageLoad({
      cancelStarted: true,
      startTime: 777,
      isInitial: false,
    });
    segmentMetric.startFromPageLoad();

    // Restarting should have clear out the previous stop time and markings
    const data = segmentMetric.getData();
    expect(data).toMatchObject({
      start: 777,
      stop: null,
      state: MetricState.STARTED,
      isInitial: false,
    });
    expect(data.marks).toEqual({});
  });
});
