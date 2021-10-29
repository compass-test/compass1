import { renderHook } from '@testing-library/react-hooks';

import { useExperiment } from '../../core';
import { ExperimentAnalytics } from '../../abstract/analytics';
import { usePluginAutoExposureEvent } from '../autoExposureEvent';

const FLAG_NAME = 'experiment.featureFlag';

const mockPipeline = {
  analytics: {
    sendTrackEvent: jest.fn(),
    sendUIEvent: jest.fn(),
    sendScreenEvent: jest.fn(),
    sendOperationalEvent: jest.fn(),
    fireExperimentError: jest.fn(),
  },
} as ExperimentAnalytics;

describe('useAutoExposureEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fire exposure event', () => {
    renderHook(() =>
      useExperiment(
        () => mockPipeline,
        () => ({
          cohort: 'experiment',
          ineligibilityReasons: [],
          featureFlag: {
            name: FLAG_NAME,
            value: 'experiment',
          },
        }),
        usePluginAutoExposureEvent(),
      ),
    );

    expect(mockPipeline.analytics.sendTrackEvent).not.toHaveBeenCalled();
    expect(mockPipeline.analytics.sendOperationalEvent).toBeCalledWith({
      action: 'exposed',
      actionSubject: 'feature',
      attributes: {
        cohort: 'experiment',
        value: 'experiment',
        flagKey: FLAG_NAME,
        ineligibilityReasons: [],
      },
    });
  });

  test('should not fire exposure event if unmet dependency', () => {
    renderHook(() =>
      useExperiment(
        () => mockPipeline,
        () => ({
          cohort: 'experiment',
          ineligibilityReasons: [],
          featureFlag: {
            name: FLAG_NAME,
            value: 'experiment',
          },
          unmetEnrollmentRequirements: true,
        }),
        usePluginAutoExposureEvent(),
      ),
    );

    expect(mockPipeline.analytics.sendTrackEvent).not.toHaveBeenCalled();
    expect(mockPipeline.analytics.sendOperationalEvent).not.toHaveBeenCalled();
  });

  test('should fire a analytics track event instead if set', () => {
    renderHook(() =>
      useExperiment(
        () => mockPipeline,
        () => ({
          cohort: 'experiment',
          ineligibilityReasons: [],
          featureFlag: {
            name: FLAG_NAME,
            value: 'experiment',
          },
        }),
        usePluginAutoExposureEvent({
          eventType: 'track',
        }),
      ),
    );

    expect(mockPipeline.analytics.sendOperationalEvent).not.toHaveBeenCalled();
    expect(mockPipeline.analytics.sendTrackEvent).toBeCalledWith({
      action: 'exposed',
      actionSubject: 'feature',
      attributes: {
        cohort: 'experiment',
        value: 'experiment',
        flagKey: FLAG_NAME,
        ineligibilityReasons: [],
      },
    });
  });

  test('should allow for passing custom event payload with an object', () => {
    renderHook(() =>
      useExperiment(
        () => mockPipeline,
        () => ({
          cohort: 'experiment',
          ineligibilityReasons: [],
          featureFlag: {
            name: FLAG_NAME,
            value: 'experiment',
          },
        }),
        usePluginAutoExposureEvent({
          payload: {
            actionSubjectId: 'myExperiment',
            attributes: {
              extra: 'anExtraAttribute',
            },
          },
        }),
      ),
    );

    expect(mockPipeline.analytics.sendTrackEvent).not.toHaveBeenCalled();
    expect(mockPipeline.analytics.sendOperationalEvent).toBeCalledWith({
      action: 'exposed',
      actionSubject: 'feature',
      actionSubjectId: 'myExperiment',
      attributes: {
        cohort: 'experiment',
        value: 'experiment',
        flagKey: FLAG_NAME,
        ineligibilityReasons: [],
        extra: 'anExtraAttribute',
      },
    });
  });

  test('should allow for passing custom event payload from a function', () => {
    renderHook(() =>
      useExperiment(
        () => mockPipeline,
        () => ({
          cohort: 'experiment',
          ineligibilityReasons: [],
          featureFlag: {
            name: FLAG_NAME,
            value: 'experiment',
          },
        }),
        usePluginAutoExposureEvent({
          payload: () => ({
            actionSubjectId: 'myExperiment',
            attributes: {
              extra: 'anExtraAttribute',
            },
          }),
        }),
      ),
    );

    expect(mockPipeline.analytics.sendTrackEvent).not.toHaveBeenCalled();
    expect(mockPipeline.analytics.sendOperationalEvent).toBeCalledWith({
      action: 'exposed',
      actionSubject: 'feature',
      actionSubjectId: 'myExperiment',
      attributes: {
        cohort: 'experiment',
        value: 'experiment',
        flagKey: FLAG_NAME,
        ineligibilityReasons: [],
        extra: 'anExtraAttribute',
      },
    });
  });

  test('should include previousCohort if cohort flipped between renders', () => {
    const hook = renderHook(
      ({ cohort }) =>
        useExperiment(
          () => mockPipeline,
          () => ({
            cohort,
            ineligibilityReasons: [],
            featureFlag: {
              name: FLAG_NAME,
              value: 'ld-experiment',
            },
          }),
          usePluginAutoExposureEvent(),
        ),
      {
        initialProps: { cohort: 'experiment' },
      },
    );

    expect(mockPipeline.analytics.sendTrackEvent).not.toHaveBeenCalled();
    expect(mockPipeline.analytics.sendOperationalEvent).toBeCalledWith({
      action: 'exposed',
      actionSubject: 'feature',
      attributes: {
        cohort: 'experiment',
        value: 'ld-experiment',
        flagKey: FLAG_NAME,
        ineligibilityReasons: [],
      },
    });

    jest.clearAllMocks();
    hook.rerender({ cohort: 'not-enrolled' });

    expect(mockPipeline.analytics.sendTrackEvent).not.toHaveBeenCalled();
    expect(mockPipeline.analytics.sendOperationalEvent).toBeCalledWith({
      action: 'exposed',
      actionSubject: 'feature',
      attributes: {
        cohort: 'not-enrolled',
        value: 'ld-experiment',
        previousCohort: 'experiment',
        flagKey: FLAG_NAME,
        ineligibilityReasons: [],
      },
    });
  });

  test('should send event when cohort is not not-enrolled even when excludeNotEnrolled is set', () => {
    renderHook(() =>
      useExperiment(
        () => mockPipeline,
        () => ({
          cohort: 'experiment',
          ineligibilityReasons: [],
          featureFlag: {
            name: FLAG_NAME,
            value: 'experiment',
          },
        }),
        usePluginAutoExposureEvent({
          excludeNotEnrolled: true,
        }),
      ),
    );

    expect(mockPipeline.analytics.sendTrackEvent).not.toHaveBeenCalled();
    expect(mockPipeline.analytics.sendOperationalEvent).toBeCalledWith({
      action: 'exposed',
      actionSubject: 'feature',
      attributes: {
        cohort: 'experiment',
        value: 'experiment',
        flagKey: FLAG_NAME,
        ineligibilityReasons: [],
      },
    });
  });

  test('should not send event when cohort is not-enrolled when excludeNotEnrolled is set', () => {
    renderHook(() =>
      useExperiment(
        () => mockPipeline,
        () => ({
          cohort: 'not-enrolled',
          ineligibilityReasons: [],
          featureFlag: {
            name: FLAG_NAME,
            value: 'experiment',
          },
        }),
        usePluginAutoExposureEvent({
          excludeNotEnrolled: true,
        }),
      ),
    );

    expect(mockPipeline.analytics.sendTrackEvent).not.toHaveBeenCalled();
    expect(mockPipeline.analytics.sendOperationalEvent).not.toHaveBeenCalled();
  });
});
