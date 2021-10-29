import { pageLoadPerformanceConfigMock } from '../../../mocks';
import {
  BMEventsType,
  PageLoadPerformanceEventConfig,
  PageSegmentLoadPerformanceEventConfig,
} from '../../../types';
import { MetricState } from '../../base-metric';
import { BasePageLoadMetric } from '../../base-page-load-metric';
import { PageSegmentLoadMetric } from '../../page-segment-load';

const makeMetric = (
  extraConfig: Partial<PageLoadPerformanceEventConfig> = {},
) => {
  return new BasePageLoadMetric(pageLoadPerformanceConfigMock(extraConfig));
};

const makeUntilMetric = (
  extraConfig: Omit<PageSegmentLoadPerformanceEventConfig, 'type'>,
) => {
  return new PageSegmentLoadMetric({
    ...extraConfig,
    type: BMEventsType.PAGE_SEGMENT_LOAD,
  });
};

describe('BasePageLoadMetric', () => {
  test('uses startPageLoad to start metric', () => {
    const metric = makeMetric();
    metric.start();
    expect(metric.getData()).toEqual(
      expect.objectContaining({
        state: MetricState.NOT_STARTED,
      }),
    );
    metric.startPageLoad();
    expect(metric.getData()).toEqual(
      expect.objectContaining({
        state: MetricState.STARTED,
      }),
    );
  });
  describe('fmp mark', () => {
    test('is accessible via markFMP', () => {
      const metric = makeMetric();
      metric.start();
      metric.markFMP();
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          marks: { fmp: expect.any(Number) },
        }),
      );
    });
    test('is not accessible via mark', () => {
      const metric = makeMetric();
      metric.start();
      metric.mark('fmp');
      expect(metric.getData()).toEqual(
        expect.objectContaining({
          marks: {},
        }),
      );
    });
    test('FMP is derived from until metrics if FMP was not previously marked', () => {
      const until1 = makeUntilMetric({ key: 'until1' });
      const until2 = makeUntilMetric({ key: 'until2' });
      const until3 = makeUntilMetric({ key: 'until3' });
      const metric = makeMetric({
        until: [until1, until2, until3],
      });

      metric.startPageLoad();

      until1.start();
      until1.markFMP(111);
      until2.start();
      until2.markFMP(222);
      until3.start();
      until3.markFMP(333);

      // Ensure FMP not previously marked
      let metricFMP = metric.getData().marks[BasePageLoadMetric.FMP];
      expect(metricFMP).toBeUndefined();

      until3.stop();
      until2.stop();
      until1.stop();

      metricFMP = metric.getData().marks[BasePageLoadMetric.FMP];
      expect(metricFMP).toEqual(333);
    });
    test('only derives FMP if all until metrics have FMP marked', () => {
      const until1 = makeUntilMetric({ key: 'until1' });
      const until2 = makeUntilMetric({ key: 'until2' });
      const metric = makeMetric({
        until: [until1, until2],
      });
      metric.startPageLoad();

      until1.start();
      until1.stop(); // FMP = undefined

      until2.start();
      until2.markFMP(123);
      until2.stop();

      expect(metric.getData()).toEqual(
        expect.objectContaining({
          marks: {}, // Indeterminate FMP
        }),
      );
    });
    test('FMP is not derived from until metrics if already marked previously', () => {
      const until1 = makeUntilMetric({ key: 'until1' });
      const until2 = makeUntilMetric({ key: 'until2' });
      const metric = makeMetric({
        until: [until1, until2],
      });
      metric.startPageLoad();
      metric.markFMP(50);

      until1.start();
      until1.markFMP(111);
      until1.stop();

      until2.start();
      until2.markFMP(222);
      until2.stop();

      const metricFMP = metric.getData().marks[BasePageLoadMetric.FMP];
      expect(metricFMP).toBe(50);
    });
  });
});
