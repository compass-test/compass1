import { Route } from '../../../route';
import { submitter } from '../../../submitter/submitter';
import { BMEventsType, PageLoadPerformanceEventConfig } from '../../../types';
import { PageLoadMetric } from '../../page-load-metric';

const nextTick = () => Promise.resolve();

const makeMetric = (
  extraConfig: Partial<PageLoadPerformanceEventConfig> = {},
) => {
  return new PageLoadMetric({
    key: 'home-page',
    type: BMEventsType.PAGE_LOAD,
    ...extraConfig,
  });
};

const mockEvent = BMEventsType.WEB_VITALS;
jest.mock('../../../submitter/submitter', () => ({
  submitter: {
    queue: jest.fn(),
    config: {
      configChunk: Promise.resolve({
        [mockEvent]: {
          webVitals: {
            enabled: false,
          },
        },
      }),
    },
  },
}));

describe('WebVitalsMetric', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('does not enqueue a web vital metric when non-virtual, not initial, and config disabled', async () => {
    const metric = makeMetric();
    metric.startPageLoad();
    metric.stop();
    await nextTick();
    expect(submitter.queue).toHaveBeenCalledTimes(1);
  });

  test('does not enqueue a web vital metric when not virtual and is initial, but config disabled', async () => {
    submitter.config = {
      // @ts-ignore PageLoadEnd only needs to mock `webVitalsEnabled`
      configChunk: Promise.resolve({
        [mockEvent]: {
          webVitals: {
            enabled: false,
          },
        },
      }),
    };
    const metric = makeMetric({ virtual: false });
    metric.startPageLoad({ isInitial: true });
    metric.stop();
    await nextTick();
    expect(submitter.queue).toHaveBeenCalledTimes(1);
  });

  test('enqueues a web vitals metric when non-virtual, is initial, and config enabled', async () => {
    submitter.config = {
      // @ts-ignore PageLoadEnd only needs to mock `webVitalsEnabled`
      configChunk: Promise.resolve({
        [mockEvent]: {
          webVitals: {
            enabled: true,
          },
        },
      }),
    };
    Route.setRoute('home');

    const metric = makeMetric({ virtual: false });
    metric.startPageLoad({ isInitial: true });
    metric.stop();
    await nextTick();

    expect(submitter.queue).toHaveBeenCalledTimes(2);

    // @ts-ignore
    const call1 = submitter.queue.mock.calls[0][0];
    expect(call1.key).toEqual('home-page');
    expect(call1.route).toEqual('home');
    expect(call1.config).toEqual({
      type: 'PAGE_LOAD',
      key: 'home-page',
      virtual: false,
    });

    // @ts-ignore
    const call2 = submitter.queue.mock.calls[1][0];
    expect(call2.key).toEqual('home-page');
    expect(call2.route).toEqual('home');
    expect(call2.config).toEqual({
      type: 'WEB_VITALS',
      key: 'home-page',
    });
  });
});
