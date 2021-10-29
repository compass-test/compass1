import React, { FC, PropsWithChildren, useCallback, useEffect } from 'react';

import type {
  PaymentIntent,
  PaymentMethod,
  SetupIntent,
  StripeError,
} from '@stripe/stripe-js';

import {
  createEventChannel,
  UseEventDispatchHook,
} from '@atlassian/commerce-events-telemetry-react/core';
import { FullCaptureExceptionPayload } from '@atlassian/commerce-events-telemetry-react/sentry-browser-transformer';
import { TimingData } from '@atlassian/commerce-events-telemetry-react/timing';
import {
  FailureResult,
  isError,
  isException,
  isFailure,
  isSuccessful,
} from '@atlassian/commerce-resultful';
import { ProbabilityOfBug } from '@atlassian/commerce-telemetry';
import { catalog } from '@atlassian/commerce-telemetry-clients';
import {
  Breadcrumb,
  useGasV3TrackEventDispatch,
  useMetalDispatch,
  useSentryExceptionDispatch,
  // TODO: Unify method name terminology
  useGasV3UIEventDispatch as useUIEventDispatch,
} from '@atlassian/commerce-telemetry/dispatch-hooks';

import { CC_FORM } from '../../constants/breadcrumb-names';
import { ELEMENT_TIMEOUT } from '../../constants/timeouts';
import {
  ConfirmedCardPaymentPayload,
  ConfirmedCardSetupPayload,
  CreatePaymentMethodPayload,
  SubmissionResult,
} from '../../types/submit-results';
import {
  calcTextFieldActionSubjectId,
  capitalizeFirstLetter,
} from '../action-subject-id';
import {
  CreditCardError,
  ErrorTypes,
  isPaymentAuthenticationFailureResult,
  isSystemErrorResult,
} from '../errors';
import { useFormStartTimeRef } from '../start-time';

export { Breadcrumb, useUIEventDispatch };

export type { UseEventDispatchHook } from '@atlassian/commerce-events-telemetry-react/core';

const fieldErrorEventChannel = createEventChannel<string>();
export const {
  Listener: FieldErrorEventListener,
  useEventDispatch: useBaseFieldErrorEventDispatch,
} = fieldErrorEventChannel;

export const {
  Listener: ConfirmCardSetupResultListener,
  useEventDispatch: useBaseConfirmCardSetupResultEventDispatch,
} = createEventChannel<
  TimingData<SubmissionResult<ConfirmedCardSetupPayload>>
>();

export const {
  Listener: ConfirmCardPaymentResultListener,
  useEventDispatch: useBaseConfirmCardPaymentResultEventDispatch,
} = createEventChannel<
  TimingData<SubmissionResult<ConfirmedCardPaymentPayload>>
>();

export const {
  Listener: CreatePaymentMethodResultListener,
  useEventDispatch: useBaseCreatePaymentMethodEventDispatch,
} = createEventChannel<
  TimingData<SubmissionResult<CreatePaymentMethodPayload>>
>();

const errorBoundaryEventChannel = createEventChannel<Error>();
export const {
  Listener: ErrorBoundaryListener,
  useEventDispatch: useBaseErrorBoundaryEventDispatch,
} = errorBoundaryEventChannel;

const getSentryExceptionFromResult = (
  result: FailureResult<CreditCardError>,
) => {
  if (isError(result)) {
    return result.error;
  } else if (isException(result)) {
    return result.exception;
  } else {
    return {
      actualValue: result,
      message: 'Sentry telemetry error: Result was not an error/exception',
    };
  }
};

const mapPaymentIntentToTags = (paymentIntent: PaymentIntent) => ({
  'paymentIntent.id': paymentIntent.id,
  'paymentIntent.amount': `${paymentIntent.amount}`,
  'paymentIntent.cancellationReason': `${paymentIntent.cancellation_reason}`,
  'paymentIntent.captureMethod': paymentIntent.capture_method,
  'paymentIntent.clientToken': `${paymentIntent.client_secret}`,
  'paymentIntent.confirmationMethod': paymentIntent.confirmation_method,
  'paymentIntent.currency': paymentIntent.currency,
  'paymentIntent.status': paymentIntent.status,
});

const mapSetupIntentToSentryTags = (setupIntent: SetupIntent) => ({
  'setupIntent.id': setupIntent.id,
  'setupIntent.cancellationReason': `${setupIntent.cancellation_reason}`,
  'setupIntent.clientToken': `${setupIntent.client_secret}`,
  'setupIntent.nextAction.type': `${setupIntent.next_action?.type}`,
  'setupIntent.status': setupIntent.status,
  'setupIntent.usage': setupIntent.usage,
});

const mapStripeErrorToSentryTags = (stripeError: StripeError) => ({
  'stripeError.code': `${stripeError.code}`,

  ...(stripeError.setup_intent !== undefined
    ? mapSetupIntentToSentryTags(stripeError.setup_intent)
    : undefined),

  ...(stripeError.payment_intent !== undefined
    ? mapPaymentIntentToTags(stripeError.payment_intent)
    : undefined),

  ...(stripeError.payment_method !== undefined
    ? mapPaymentMethodToSentryTags(stripeError.payment_method)
    : undefined),
});

const mapPaymentMethodToSentryTags = (paymentMethod: PaymentMethod) =>
  paymentMethod.card !== undefined
    ? {
        'paymentMethod.card.brand': paymentMethod.card.brand,
        'paymentMethod.card.country': `${paymentMethod.card.country}`,
        'paymentMethod.card.threeDSecureUsage.supported': `${paymentMethod.card.three_d_secure_usage?.supported}`,
        'paymentMethod.card.funding': paymentMethod.card.funding,
      }
    : {};

export type ResultTransformProps<T> = PropsWithChildren<{
  action: string;
  actionSubject: string;
  addExtraSentryData?: (
    sentryPayload: FullCaptureExceptionPayload,
    payload: TimingData<SubmissionResult<T>>,
  ) => void;
  useBaseEventDispatch: UseEventDispatchHook<TimingData<SubmissionResult<T>>>;
}>;

const createUseSubmissionTelemetryDispatch = <T extends unknown>({
  useBaseEventDispatch,
  action,
  actionSubject,
}: ResultTransformProps<T>) => {
  const task = `${action}${capitalizeFirstLetter(actionSubject)}`;

  const useSubmissionTelemetryDispatch: typeof useBaseEventDispatch = () => {
    const dispatchSentryEvent = useSentryExceptionDispatch();
    const dispatchGasV3TrackEvent = useGasV3TrackEventDispatch();
    const dispatchMetalEvent = useMetalDispatch();
    const startTimeRef = useFormStartTimeRef();

    const eventDispatch = useBaseEventDispatch();

    const telemetryDispatch = useCallback(
      (eventPayload: TimingData<SubmissionResult<any>>) => {
        const { timedPayload: result, duration } = eventPayload;

        // TODO: Rename this to isSuccess once https://atlassian.slack.com/archives/C016U73MTC1/p1617695955289900 Stripe issue is resolved. Required to gather impact of this bug.
        const isSuccessWithoutAccountingForNextActionBug = isSuccessful(result);
        // TODO: Remove once https://atlassian.slack.com/archives/C016U73MTC1/p1617695955289900 is fixed
        // It should be impossible to have next_action since handleActions is set to true in our package but it's still happening because of
        const isImpossibleSuccessState =
          isSuccessWithoutAccountingForNextActionBug &&
          !!result.payload?.next_action;
        const isSuccess =
          isSuccessWithoutAccountingForNextActionBug &&
          !isImpossibleSuccessState;

        dispatchGasV3TrackEvent({
          action,
          actionSubject,
          attributes: {
            success: isSuccess,
          },
        });

        const taskId = (() => {
          if (isPaymentAuthenticationFailureResult(result)) {
            // Need this because it's hard to know whether 3DS working in certain countries
            return 'authentication';
          } else if (
            isException(result) ||
            isSystemErrorResult(result) ||
            isImpossibleSuccessState
          ) {
            return 'guaranteed-bug';
          } else {
            return 'other';
          }
        })();

        if (isFailure(result) || isImpossibleSuccessState) {
          const probabilityOfBug =
            isException(result) ||
            isSystemErrorResult(result) ||
            isImpossibleSuccessState
              ? ProbabilityOfBug.GUARANTEED
              : ProbabilityOfBug.MAYBE;

          const resultType = (() => {
            if (isSuccessful(result)) {
              return 'success';
            } else if (isException(result)) {
              return 'exception';
            } else if (isError(result)) {
              return 'error';
            } else {
              return 'unknown';
            }
          })();

          const stripeErrorTags =
            isError(result) && result.error.type === ErrorTypes.STRIPE_ERROR
              ? mapStripeErrorToSentryTags(result.error.stripeError)
              : null;

          const tags = {
            // Both of these will make life easier when linking Sentry to Metal events
            task,
            taskId,

            probabilityOfBug,

            resultType,

            package: '@atlassian/commerce-credit-card-base',

            ...stripeErrorTags,
          };

          dispatchSentryEvent({
            exception: isImpossibleSuccessState
              ? result.payload
              : getSentryExceptionFromResult(result),
            hint: undefined,
            scopeContext: {
              tags,
            },
          });
        }

        dispatchMetalEvent({
          name: isSuccess
            ? catalog.userInteraction.TASK_SUCCESS
            : catalog.userInteraction.TASK_FAILURE,
          taskId,
          task,
          value: 1,
        });

        if (isSuccess) {
          dispatchMetalEvent({
            name: catalog.userInteraction.TASK_DURATION,
            value: duration,
            taskId,
            task,
            histogramBuckets: '10000',
          });

          if (!Number.isNaN(startTimeRef.current)) {
            dispatchMetalEvent({
              name: catalog.userInteraction.TASK_TIME_TO_COMPLETE,
              taskId,
              task,
              value: Date.now() - startTimeRef.current,
              // TODO: Decide on this: histogramBuckets: '10000',
            });
          }
        }

        eventDispatch(eventPayload);
      },
      [
        dispatchSentryEvent,
        dispatchGasV3TrackEvent,
        dispatchMetalEvent,
        eventDispatch,
        startTimeRef,
      ],
    );

    return telemetryDispatch;
  };

  return useSubmissionTelemetryDispatch;
};

export const useErrorBoundaryEventDispatch: typeof useBaseErrorBoundaryEventDispatch = () => {
  const dispatchMetal = useMetalDispatch();
  const dispatchSentry = useSentryExceptionDispatch();
  const dispatchBaseEvent = useBaseErrorBoundaryEventDispatch();

  return useCallback(
    (error) => {
      dispatchMetal({
        name: catalog.error.COMPONENT_BOUNDARY,
        component: CC_FORM,
      });
      dispatchSentry({
        exception: error,
      });
      dispatchBaseEvent(error);
    },
    [dispatchMetal, dispatchSentry, dispatchBaseEvent],
  );
};

const SendTimeToInteractiveMetrics = () => {
  const dispatchMetal = useMetalDispatch();
  const startTimeRef = useFormStartTimeRef();

  useEffect(() => {
    dispatchMetal({
      value: Date.now() - startTimeRef.current,
      name: catalog.performance.TIME_TO_INTERACTIVE,
      histogramBuckets: `${ELEMENT_TIMEOUT}`,
    });
  }, [dispatchMetal, startTimeRef]);

  return null;
};

export const CreditCardFormBreadcrumb: FC = ({ children }) => (
  <Breadcrumb name={CC_FORM}>
    <SendTimeToInteractiveMetrics />
    {children}
  </Breadcrumb>
);

export const useFieldErrorEventDispatch: typeof useBaseFieldErrorEventDispatch = () => {
  const dispatchBaseEvent = useBaseFieldErrorEventDispatch();
  const dispatchMetal = useMetalDispatch();
  const dispatchGasV3 = useGasV3TrackEventDispatch();

  return useCallback(
    (fieldName) => {
      dispatchBaseEvent(fieldName);
      dispatchMetal({
        name: catalog.userInteraction.TASK_FAILURE,
        task: 'cc-field-error',
        taskId: fieldName,
        value: 1,
      });
      dispatchGasV3({
        action: 'invalidated',
        actionSubject: 'textField',
        actionSubjectId: calcTextFieldActionSubjectId(fieldName),
      });
    },
    [dispatchBaseEvent, dispatchMetal, dispatchGasV3],
  );
};

export const useCreatePaymentMethodEventDispatch = createUseSubmissionTelemetryDispatch(
  {
    useBaseEventDispatch: useBaseCreatePaymentMethodEventDispatch,
    action: 'create',
    actionSubject: 'paymentMethod',
  },
);

export const useConfirmCardPaymentResultEventDispatch = createUseSubmissionTelemetryDispatch(
  {
    useBaseEventDispatch: useBaseConfirmCardPaymentResultEventDispatch,
    action: 'confirm',
    actionSubject: 'cardPayment',
  },
);

export const useConfirmCardSetupResultEventDispatch = createUseSubmissionTelemetryDispatch(
  {
    useBaseEventDispatch: useBaseConfirmCardSetupResultEventDispatch,
    action: 'confirm',
    actionSubject: 'cardSetup',
  },
);
