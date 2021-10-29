import { useCallback } from 'react';

import { catalog } from '@atlassiansox/metal-client';

import type { TrackEventPayload } from '@atlassian/commerce-events-telemetry-react/gasv3-bridge';
import type { UserMetric } from '@atlassian/commerce-events-telemetry-react/metal-bridge';

import {
  internalGasV3TrackEventChannel,
  internalMetalChannel,
  internalSentryExceptionChannel,
} from '../channels';
import { GUARANTEED, MAYBE, NONE } from '../probability-of-bug';
import {
  SetTelemetryExceptionSentryTagsInput,
  withTelemetryInfoScopeContext,
} from '../sentry/tags';
import { CommerceService, UNKNOWN } from '../service';
import { responsibleServiceIncludesCommerceLibraries } from '../service/utils';

export type ShareTaskData<ServiceType> = {
  /**
   * If you 100% know for sure which service is responsible for causing the failure
   * specify it using this field.
   */
  responsibleService?: ServiceType;
};

export type GuarenteedBugFailureData<ServiceType> = {
  probabilityOfBug: typeof GUARANTEED;
  // You MUST provide an payload to record if it's a bug
  loggablePayload: any;
  metalTaskId?: string;
} & ShareTaskData<ServiceType>;

export type MaybeBugFailureData<ServiceType> = {
  probabilityOfBug?: typeof MAYBE;
  loggablePayload?: any;
  metalTaskId?: string;
} & ShareTaskData<ServiceType>;

export type NoneBugFailureData<ServiceType> = {
  probabilityOfBug?: typeof NONE;
  loggablePayload?: any;
  metalTaskId?: string;
} & ShareTaskData<ServiceType>;

export type FailureData<ServiceType> =
  | NoneBugFailureData<ServiceType>
  | MaybeBugFailureData<ServiceType>
  | GuarenteedBugFailureData<ServiceType>;

export type SuccessData<ServiceType> = {
  loggablePayload?: any;
  metalTaskId?: string;
} & ShareTaskData<ServiceType>;

// TODO: This probably doesn't belong here. Move.
export const capitalize = (actionSubject: string): string => {
  return actionSubject.charAt(0).toUpperCase() + actionSubject.substring(1);
};

export type SubmitSuccessTaskFn<ServiceType> = (
  data?: SuccessData<ServiceType>,
) => void;
export type SubmitFailureTaskFn<ServiceType> = (
  data?: FailureData<ServiceType>,
) => void;
export type TaskOptions<ServiceType> = {
  succeed: SubmitSuccessTaskFn<ServiceType>;
  fail: SubmitFailureTaskFn<ServiceType>;
};
export type BaseStartTaskCallback<ServiceType> = (
  sharedInfo: SharedTaskEventData,
) => TaskOptions<ServiceType>;
export type UseBaseTaskTrackerHook<ServiceType> = (
  taskInfo: BaseTaskInfo,
) => BaseStartTaskCallback<ServiceType>;

export type BaseTaskInfo = Pick<TrackEventPayload, 'actionSubject' | 'action'> &
  Partial<Pick<UserMetric, 'histogramBuckets'>>;

export type SharedTaskEventData = Omit<
  TrackEventPayload,
  'source' | keyof BaseTaskInfo
>;

/**
 * This is a lower level API version of {@link useTaskTracker}. Use this if the higher level hook does not
 * suit your needs. The disadvantage of using this version of the hook is that it is technically possible to fail
 * or succeed a task more than once, which, generally is not desireable.
 */
export const useBaseTaskTracker: UseBaseTaskTrackerHook<CommerceService> = ({
  action,
  actionSubject,
  histogramBuckets = '4000',
}: BaseTaskInfo) => {
  const dispatchGasV3Track = internalGasV3TrackEventChannel.useBreadcrumbedEventDispatch();
  const dispatchSentry = internalSentryExceptionChannel.useBreadcrumbedEventDispatch();
  const dispatchMetal = internalMetalChannel.useBreadcrumbedEventDispatch();

  const task = `${action}${capitalize(actionSubject)}`;

  return useCallback(
    (payload) => {
      const startTime = Date.now();

      const sharedGasV3Payload = {
        action,
        actionSubject,
        ...payload,
      };

      const sharedMetalInfo = {
        task,
      };

      const sendSentryEvent = (
        loggablePayload: any,
        metalName: string,
        metalTaskId: string | undefined,
        exceptionTags: SetTelemetryExceptionSentryTagsInput,
      ): void => {
        if (
          loggablePayload === undefined &&
          [MAYBE, NONE].includes(exceptionTags.probabilityOfBug)
        ) {
          // Don't bother sending a payload if it's undefined and the probability of bug isn't guaranteed
          // TODO: Should enforce that it's never undefined for ProbabilityOfBug.GUARANTEED
          return;
        }

        dispatchSentry({
          exception: loggablePayload,
          scopeContext: withTelemetryInfoScopeContext({
            tags: {
              task,
              metalName,
              ...exceptionTags,
              ...(metalTaskId !== undefined ? { metalTaskId } : undefined),
              ...(payload.actionSubjectId !== undefined
                ? { actionSubjectId: payload.actionSubjectId }
                : undefined),
            },
          }),
        });
      };

      const sendMetalEvent = (
        metalName: UserMetric['name'],
        metalTaskId: string | undefined,
      ): void => {
        dispatchMetal({
          name: catalog.userInteraction.TASK_DURATION,
          ...(metalTaskId === undefined ? null : { taskId: metalTaskId }),
          ...sharedMetalInfo,
          value: Date.now() - startTime,
          histogramBuckets,
        });

        dispatchMetal({
          name: metalName,
          ...(metalTaskId === undefined ? null : { taskId: metalTaskId }),
          ...sharedMetalInfo,
          value: 1,
        });
      };

      const fail = ({
        loggablePayload,
        probabilityOfBug = MAYBE,
        metalTaskId: baseMetalTaskId,
        responsibleService = UNKNOWN,
      }: FailureData<CommerceService> = {}): void => {
        const metalTaskId = (() => {
          if (baseMetalTaskId !== undefined) {
            return baseMetalTaskId;
          }

          if (probabilityOfBug === GUARANTEED) {
            if (
              responsibleServiceIncludesCommerceLibraries(responsibleService)
            ) {
              return 'guaranteed-bug';
            }

            return 'external-bug';
          }

          // Not sending any other values in fear of cardinality problems
          return undefined;
        })();

        sendMetalEvent(catalog.userInteraction.TASK_FAILURE, metalTaskId);

        sendSentryEvent(
          loggablePayload,
          catalog.userInteraction.TASK_FAILURE,
          metalTaskId,
          {
            probabilityOfBug,
            responsibleService,
          },
        );
        // TODO: Consider sending some sort of GasV3 failure information
      };

      const succeed = ({
        loggablePayload,
        metalTaskId,
        responsibleService = UNKNOWN,
      }: SuccessData<CommerceService> = {}): void => {
        sendMetalEvent(catalog.userInteraction.TASK_SUCCESS, metalTaskId);

        sendSentryEvent(
          loggablePayload,
          catalog.userInteraction.TASK_SUCCESS,
          metalTaskId,
          {
            probabilityOfBug: NONE,
            responsibleService,
          },
        );

        dispatchGasV3Track(sharedGasV3Payload);
      };

      return {
        fail,
        succeed,
      };
    },
    [
      dispatchGasV3Track,
      dispatchMetal,
      dispatchSentry,
      task,
      histogramBuckets,
      action,
      actionSubject,
    ],
  );
};

export type TaskCallbackSharedInfo<P> = { payload: P };
export interface TaskCallbackBugFailureInfo<P, ServiceType>
  extends GuarenteedBugFailureData<ServiceType>,
    TaskCallbackSharedInfo<P> {}

export interface TaskCallbackNoneBugFailureInfo<P, ServiceType>
  extends NoneBugFailureData<ServiceType>,
    TaskCallbackSharedInfo<P> {}
export interface TaskCallbackMaybeBugFailureInfo<P, ServiceType>
  extends MaybeBugFailureData<ServiceType>,
    TaskCallbackSharedInfo<P> {}
export interface TaskCallbackSuccessInfo<P, ServiceType>
  extends SuccessData<ServiceType>,
    TaskCallbackSharedInfo<P> {}

export type TaskCallbackFailureInfo<P, ServiceType> =
  | TaskCallbackBugFailureInfo<P, ServiceType>
  | TaskCallbackMaybeBugFailureInfo<P, ServiceType>
  | TaskCallbackNoneBugFailureInfo<P, ServiceType>;

export type TaskCallbackFailureResult<P, ServiceType> = {
  fail: TaskCallbackFailureInfo<P, ServiceType>;
  succeed?: undefined;
};
export type TaskCallbackSuccessResult<P, ServiceType> = {
  succeed: TaskCallbackSuccessInfo<P, ServiceType>;
  fail?: undefined;
};

export type TaskCallbackResult<S, F, ServiceType> =
  | TaskCallbackSuccessResult<S, ServiceType>
  | TaskCallbackFailureResult<F, ServiceType>;
export type TaskCallback<S, F, ServiceType> = () => Promise<
  TaskCallbackResult<S, F, ServiceType>
>;
export type StartTaskCallback<ServiceType> = <S = void, F = void>(
  taskCallback: TaskCallback<S, F, ServiceType>,
  payload?: SharedTaskEventData,
) => Promise<TaskCallbackResult<S, F, ServiceType>>;
export type UseTaskTrackerHook<ServiceType> = (
  taskInfo: BaseTaskInfo,
) => StartTaskCallback<ServiceType>;

export const isSuccessfulTaskResult = <S, F, ServiceType>(
  x: TaskCallbackResult<S, F, ServiceType>,
): x is TaskCallbackSuccessResult<S, ServiceType> => x.succeed !== undefined;

/**
 * This hook is a high level hook designed to make it easy to send telemetry related to
 * running processes in response to a user action. We call this a "task" (a definition taken from Metal).
 *
 * Depending on what you provide to this hook, it will send to:
 *  - GasV3
 *  - Metal
 *  - Sentry
 *
 * @param taskInfo Inputs that define the task. Should generally speaking be pretty static.
 * Having these fields here also makes debugging what a given task tracker sends at runtime easier.
 *
 * @returns A function that records the executes a task, measuring its duration and tracking whether it suceeds or fails.
 *
 * @see {@link useBaseTaskTracker} A lower level version of this hook. Disadvantage is that it's possible to fail/suceed more than once in the lower level API.
 */
export const useTaskTracker: UseTaskTrackerHook<CommerceService> = (
  taskInfo: BaseTaskInfo,
): StartTaskCallback<CommerceService> => {
  const startTask = useBaseTaskTracker(taskInfo);

  const higherLevelStartTask = useCallback(
    /**
     * Please note that thrown errors will be interpreted as guaranteed buggy failures.
     * @param payload This data passed into this function will be shared between both failure and successful tasks
     */
    async <S extends unknown = void, F extends unknown = void>(
      callback: TaskCallback<S, F, CommerceService>,
      payload: SharedTaskEventData = {},
    ): Promise<TaskCallbackResult<S, F, CommerceService>> => {
      const { fail, succeed } = startTask(payload);

      try {
        const result = await callback();

        if (result.succeed !== undefined) {
          succeed(result.succeed);
        } else if (result.fail !== undefined) {
          fail(result.fail);
        } else {
          fail({
            probabilityOfBug: GUARANTEED,
            loggablePayload: {
              result,
              error: new Error('Could not find succeed nor fail'),
            },
          });
        }

        return result;
      } catch (err) {
        if (err instanceof TypeError && err.message === 'Failed to fetch') {
          fail({
            probabilityOfBug: MAYBE,
            loggablePayload: err,
          });
        } else {
          fail({
            probabilityOfBug: GUARANTEED,
            loggablePayload: err,
          });
        }

        throw err;
      }
    },
    [startTask],
  );

  return higherLevelStartTask;
};
