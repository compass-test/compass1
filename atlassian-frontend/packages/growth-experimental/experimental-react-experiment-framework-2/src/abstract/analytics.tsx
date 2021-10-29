import React from 'react';
import {
  ExperimentCore,
  ExperimentError,
  ExperimentErrorType,
} from '../core/types';
import { markPipelineEndListener } from '../helpers/markPipelineEndListener';
import { ExperimentErrorHandler } from '../portable/errorHandler';
import { markError } from '../helpers/markError';

export interface AnalyticsEvent {
  action: string;
  actionSubject: string;
  actionSubjectId?: string;
  attributes?: Record<string, any>;
  source?: string;
}

export interface AnalyticsScreenEvent {
  name: string;
  attributes?: Record<string, any>;
  source?: string;
}

export type AnalyticsEventType = AnalyticsEvent | AnalyticsScreenEvent;

export type AnalyticsImplementation = {
  sendScreenEvent: (event: AnalyticsScreenEvent) => void;
  sendUIEvent: (event: AnalyticsEvent) => void;
  sendTrackEvent: (event: AnalyticsEvent) => void;
  sendOperationalEvent: (event: AnalyticsEvent) => void;
};

export type AnalyticsMethodName = keyof AnalyticsImplementation;

export interface ExperimentAnalytics {
  analytics: AnalyticsImplementation & {
    fireExperimentError: (error: Error | ExperimentErrorType) => void;
  };
}

export const useDelegateAnalytics = <
  Upstream extends ExperimentCore &
    Partial<ExperimentGetAnalyticsDefaults<Upstream>>
>(
  analyticsImplementation: AnalyticsImplementation,
) =>
  function useAnalytics(
    pipeline: Upstream,
  ): ExperimentAnalytics & ExperimentErrorHandler {
    const implementation = analyticsImplementation;
    const memoizedDelegate = React.useMemo(
      () => createAnalyticsDelegate<Upstream>(implementation),
      [implementation],
    );
    memoizedDelegate.startRecording();

    return {
      ...markPipelineEndListener(memoizedDelegate.startSending, pipeline),
      analytics: memoizedDelegate.analytics,
      errorHandler: useHandlerErrorAnalytics<any>(),
    };
  };

const createAnalyticsDelegate = <
  Upstream extends ExperimentCore &
    Partial<ExperimentGetAnalyticsDefaults<Upstream>>
>(
  implementation: AnalyticsImplementation,
) => {
  const recordedEvents: Array<{
    method: AnalyticsMethodName;
    event: AnalyticsEventType;
  }> = [];
  let recording = true;
  let lastPipeline: Upstream | null = null;

  const sendOrRecordEvent = (
    method: AnalyticsMethodName,
    event: AnalyticsEventType,
  ) => {
    if (recording) {
      recordedEvents.push({ method, event });
    } else {
      const defaults =
        lastPipeline && lastPipeline.getAnalyticsDefaults
          ? lastPipeline.getAnalyticsDefaults!(lastPipeline, method)
          : {};
      const mergedAttributes =
        defaults.attributes || event.attributes
          ? {
              attributes: {
                ...defaults.attributes,
                ...event.attributes,
              },
            }
          : {};
      implementation[method]({
        ...defaults,
        ...event,
        ...mergedAttributes,
      } as any);
    }
  };

  const analytics: ExperimentAnalytics['analytics'] = {
    sendScreenEvent: (event: AnalyticsScreenEvent) =>
      sendOrRecordEvent('sendScreenEvent', event),

    sendUIEvent: (event: AnalyticsEvent) =>
      sendOrRecordEvent('sendUIEvent', event),

    sendTrackEvent: (event: AnalyticsEvent) =>
      sendOrRecordEvent('sendTrackEvent', event),

    sendOperationalEvent: (event: AnalyticsEvent) =>
      sendOrRecordEvent('sendOperationalEvent', event),

    fireExperimentError: (error: Error | ExperimentErrorType) => {
      let attributes =
        'rawError' in error
          ? toExperimentErrorAttributes(error as ExperimentErrorType)
          : { name: (error as Error).name };
      analytics.sendOperationalEvent({
        actionSubject: 'experiment',
        action: 'error',
        attributes,
      });
    },
  };
  return {
    analytics,
    startRecording() {
      recording = true;
    },
    startSending(pipeline: Upstream) {
      recording = false;
      lastPipeline = pipeline;
      for (const { method, event } of recordedEvents) {
        sendOrRecordEvent(method, event);
      }
      recordedEvents.length = 0;
    },
  };
};

export const useDelegateAsyncAnalytics = <
  Upstream extends ExperimentCore &
    Partial<ExperimentGetAnalyticsDefaults<Upstream>>
>(
  analyticsImplementationPromise: Promise<AnalyticsImplementation>,
) =>
  function useAnalytics(
    pipeline: Upstream,
  ): ExperimentAnalytics & ExperimentErrorHandler & ExperimentError {
    const implementationPromise = analyticsImplementationPromise;
    const [firstError, setFirstError] = React.useState(null);

    const awaitingImplementation: AnalyticsImplementation = React.useMemo(() => {
      const asyncSender = <M extends AnalyticsMethodName>(method: M) => async (
        event: Parameters<AnalyticsImplementation[M]>[0],
      ) => {
        try {
          return (await implementationPromise)[method](event as any);
        } catch (caughtError) {
          if (!firstError) {
            setFirstError(caughtError);
          }
        }
      };

      return {
        sendScreenEvent: asyncSender('sendScreenEvent'),
        sendUIEvent: asyncSender('sendUIEvent'),
        sendTrackEvent: asyncSender('sendTrackEvent'),
        sendOperationalEvent: asyncSender('sendOperationalEvent'),
      };
    }, [firstError, implementationPromise]);

    return {
      ...useDelegateAnalytics<Upstream>(awaitingImplementation)(pipeline),
      error: markError(firstError, pipeline).error,
    };
  };

const toExperimentErrorAttributes = (error: ExperimentErrorType) => ({
  type: error.rawError && error.rawError.name,
  pluginIndex: error.pluginIndex,
  error: error.safeMessage,
});

export const useHandlerErrorAnalytics = <
  Upstream extends ExperimentAnalytics
>() => {
  const [errorsFiredCount, setErrorsFiredCount] = React.useState(0);
  return (error: ExperimentErrorType, pipeline: Upstream) => {
    if (errorsFiredCount === 0) {
      pipeline.analytics.fireExperimentError(error);
      setErrorsFiredCount((errorsFiredCount) => errorsFiredCount + 1);
    }
    return {};
  };
};

type ExperimentGetAnalyticsDefaultsType<Upstream> = (
  pipeline: Upstream,
  method: AnalyticsMethodName,
) => Partial<AnalyticsEventType>;

type ExperimentGetAnalyticsDefaults<Upstream extends ExperimentCore> = {
  getAnalyticsDefaults: ExperimentGetAnalyticsDefaultsType<Upstream>;
};

export const usePluginAnalyticsDefaults = <Upstream extends ExperimentCore>(
  getAnalyticsDefaults: ExperimentGetAnalyticsDefaultsType<Upstream>,
) =>
  function useAnalyticsDefaults(
    pipeline: Upstream,
  ): ExperimentGetAnalyticsDefaults<Upstream> {
    return {
      getAnalyticsDefaults,
    };
  };
