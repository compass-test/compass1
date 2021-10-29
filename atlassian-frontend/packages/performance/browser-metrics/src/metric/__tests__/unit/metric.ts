import { Route } from '../../../route';
import { submitter } from '../../../submitter/submitter';
import { BMEventsType, PerformanceEventConfig } from '../../../types';
import { Metric } from '../../metric';

const makeMetric = (extraConfig: Partial<PerformanceEventConfig> = {}) => {
  return new Metric({
    key: 'open issue',
    type: BMEventsType.INLINE_RESULT,
    ...extraConfig,
  });
};

jest.mock('../../../submitter/submitter', () => ({
  submitter: { queue: jest.fn() },
}));

describe('Metric', () => {
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
});
