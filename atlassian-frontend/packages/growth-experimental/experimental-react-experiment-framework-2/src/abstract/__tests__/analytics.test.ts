import { renderHook } from '@testing-library/react-hooks';
import {
  AnalyticsImplementation,
  AnalyticsMethodName,
  useDelegateAnalytics,
  useDelegateAsyncAnalytics,
  usePluginAnalyticsDefaults,
} from '../analytics';
import { useExperiment } from '../../core/useExperiment';

const methodNames: AnalyticsMethodName[] = [
  'sendTrackEvent',
  'sendOperationalEvent',
  'sendScreenEvent',
  'sendUIEvent',
];

const mockEvent = {
  actionSubject: 'something',
  action: 'happened',
  name: 'someScreen',
};

const createMockImplementation = (): AnalyticsImplementation => ({
  sendTrackEvent: jest.fn(),
  sendOperationalEvent: jest.fn(),
  sendScreenEvent: jest.fn(),
  sendUIEvent: jest.fn(),
});

let mockImplementation: AnalyticsImplementation;

beforeEach(() => {
  mockImplementation = createMockImplementation();
});

test('calls the implementation functions', () => {
  const { result } = renderHook(() =>
    useDelegateAnalytics(mockImplementation)({}),
  );

  const analytics = result.current.analytics;

  for (const method of methodNames) {
    const specificEvent = { ...mockEvent, source: method };
    expect(mockImplementation[method]).not.toHaveBeenCalled();
    analytics[method](specificEvent);
    expect(mockImplementation[method]).toHaveBeenCalledWith(specificEvent);
  }
});

test('fires events at the end of the pipeline, with defaults built from final pipeline', () => {
  let analyticsSentImmediately = false;

  const { rerender } = renderHook(
    (props) =>
      useExperiment(
        useDelegateAnalytics(mockImplementation),
        (pipeline) => ({
          cohort: props.cohort,
          someProp: 42,
        }),

        (pipeline) => {
          pipeline.analytics.sendOperationalEvent(mockEvent);
          analyticsSentImmediately =
            (mockImplementation.sendOperationalEvent as jest.Mock).mock.calls
              .length > 0;
          return {};
        },
        usePluginAnalyticsDefaults((pipeline) => ({
          attributes: {
            cohort: pipeline.cohort,
            otherPipelineProp: pipeline.someProp,
          },
        })),
      ),
    { initialProps: { cohort: 'experiment' } },
  );

  expect(analyticsSentImmediately).toBe(false);
  expect(mockImplementation.sendOperationalEvent).toHaveBeenCalledWith({
    ...mockEvent,
    attributes: {
      cohort: 'experiment',
      otherPipelineProp: 42,
    },
  });

  (mockImplementation.sendOperationalEvent as jest.Mock).mockReset();
  rerender({ cohort: 'control' });

  expect(analyticsSentImmediately).toBe(false);
  expect(mockImplementation.sendOperationalEvent).toHaveBeenCalledWith({
    ...mockEvent,
    attributes: {
      cohort: 'control',
      otherPipelineProp: 42,
    },
  });
});

describe('async delegate', () => {
  test('accepts a promise resolving to the analytics implementation', async () => {
    const { result } = renderHook(() =>
      useDelegateAsyncAnalytics(Promise.resolve(mockImplementation))({}),
    );

    const analytics = result.current.analytics;

    for (const method of methodNames) {
      const specificEvent = { ...mockEvent, source: method };
      analytics[method](specificEvent);

      expect(mockImplementation[method]).not.toHaveBeenCalled();
      await Promise.resolve();
      expect(mockImplementation[method]).toHaveBeenCalledWith(specificEvent);
    }
  });

  test('reports error on the pipeline if the analytics implementation fails', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useExperiment(
        useDelegateAsyncAnalytics(
          Promise.reject(new Error('mock analytics not loaded')),
        ),
      ),
    );
    result.current.analytics.sendOperationalEvent(mockEvent);

    await waitForNextUpdate();
    expect(result.current.error).not.toBeNull();
  });

  test('changes the implementation if the promise changes', async () => {
    const { result, rerender } = renderHook(
      (props) => useDelegateAsyncAnalytics(props.mockImplementationPromise)({}),
      {
        initialProps: {
          mockImplementationPromise: Promise.resolve(mockImplementation),
        },
      },
    );

    result.current.analytics.sendOperationalEvent(mockEvent);
    await Promise.resolve();
    expect(mockImplementation.sendOperationalEvent).toHaveBeenCalledWith(
      mockEvent,
    );

    const mockImplementation2 = createMockImplementation();
    rerender({
      mockImplementationPromise: Promise.resolve(mockImplementation2),
    });

    const mockEvent2 = { ...mockEvent, source: '2' };
    result.current.analytics.sendOperationalEvent(mockEvent2);
    await Promise.resolve();
    expect(mockImplementation2.sendOperationalEvent).toHaveBeenCalledWith(
      mockEvent2,
    );
  });
});
