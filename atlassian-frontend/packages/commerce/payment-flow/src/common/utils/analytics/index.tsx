import React, { FC, useCallback, useEffect } from 'react';

import { isSuccessful } from '@atlassian/commerce-credit-card-ccp';
import { withBreadcrumb } from '@atlassian/commerce-events-telemetry-react/breadcrumbs';
import { createEventChannel } from '@atlassian/commerce-events-telemetry-react/core';
import { TimingData } from '@atlassian/commerce-events-telemetry-react/timing';
import { PaymentMethod } from '@atlassian/commerce-payment-methods';
import { catalog } from '@atlassian/commerce-telemetry';
import {
  Breadcrumb,
  RepackageAtlaskitEvent,
  useGasV3TrackEventDispatch,
  useMetalDispatch,
} from '@atlassian/commerce-telemetry/dispatch-hooks';

import {
  BILLING_ADDRESS_SCREEN,
  OFFSESSION_CONFIRMATION_FLOW,
  PAYMENT_CAPTURE_FLOW,
} from '../../constants/breadcrumb-names';
import { useFlowStartTimeRef } from '../flow-start-time';

import {
  ConfirmedTrackEvent,
  OffsessionConfirmationNotAvailableSourceEvent,
  OffSessionConfirmationResultSourceEvent,
} from './types';

export { confirmedPaymentUpdateError, confirmedSuccessful } from './mocks';

export { Breadcrumb, RepackageAtlaskitEvent };

export const withPaymentDetailsBreadcrumb = <T extends unknown>(
  Component: FC<T>,
  name: string,
) => withBreadcrumb(Component, Breadcrumb, name);

export type SummarySubmitEventPayload = {
  paymentMethod: PaymentMethod;
  error?: Error;
};
const summarySubmitEventChannel = createEventChannel<
  TimingData<SummarySubmitEventPayload>
>();
export const {
  Listener: SummarySubmitListener,
  useEventDispatch: useBaseSummarySubmitEventDispatch,
} = summarySubmitEventChannel;

const SendTimeToInteractiveMetrics = () => {
  const dispatchMetal = useMetalDispatch();
  const startTimeRef = useFlowStartTimeRef();

  useEffect(() => {
    dispatchMetal({
      value: Date.now() - startTimeRef.current,
      name: catalog.performance.TIME_TO_INTERACTIVE,
      histogramBuckets: '10000',
    });
  }, [dispatchMetal, startTimeRef]);

  return null;
};

export const BillingAddressScreenBreadcrumb: FC = ({ children }) => {
  return (
    <Breadcrumb name={BILLING_ADDRESS_SCREEN}>
      <SendTimeToInteractiveMetrics />
      {children}
    </Breadcrumb>
  );
};

const BILLING_CONFIRMATION_ACTION_SUBJECT = 'billingConfirmation';

export const useSummarySubmitEventDispatch = () => {
  const dispatchMetal = useMetalDispatch();
  const dispatchGasV3TrackEvent = useGasV3TrackEventDispatch();

  const startTimeRef = useFlowStartTimeRef();

  const dispatchSummaryBaseEvent = useBaseSummarySubmitEventDispatch();

  return useCallback(
    (eventPayload) => {
      const { duration, timedPayload } = eventPayload;

      // TODO We can replace a lot of this with useTaskTracker
      const isSuccess = timedPayload.error === undefined;
      if (isSuccess) {
        dispatchMetal({
          name: catalog.userInteraction.TASK_TIME_TO_COMPLETE,
          task: BILLING_CONFIRMATION_ACTION_SUBJECT,
          value: Date.now() - startTimeRef.current,
        });
        dispatchMetal({
          name: catalog.userInteraction.TASK_DURATION,
          task: BILLING_CONFIRMATION_ACTION_SUBJECT,
          value: duration,
          histogramBuckets: '10000',
        });
      }

      dispatchGasV3TrackEvent(createConfirmedEventPayload(timedPayload.error));

      dispatchMetal({
        name: isSuccess
          ? catalog.userInteraction.TASK_SUCCESS
          : catalog.userInteraction.TASK_FAILURE,
        task: BILLING_CONFIRMATION_ACTION_SUBJECT,
        value: 1,
      });

      dispatchSummaryBaseEvent(eventPayload);
    },
    [
      dispatchMetal,
      dispatchGasV3TrackEvent,
      startTimeRef,
      dispatchSummaryBaseEvent,
    ],
  );
};

const SendPaymentCaptureFlowStart = () => {
  const dispatchMetal = useMetalDispatch();

  useEffect(() => {
    dispatchMetal({
      name: catalog.performance.FIRST_PAINT,
      // TODO: This is incorrect, but for now, we just want the # of paints
      value: 1,
    });
  }, [dispatchMetal]);

  return null;
};

export const PaymentCaptureFlowBreadcrumb: FC = ({ children }) => {
  return (
    <Breadcrumb name={PAYMENT_CAPTURE_FLOW}>
      <SendPaymentCaptureFlowStart />
      {children}
    </Breadcrumb>
  );
};

export const createConfirmedEventPayload = (
  error?: Error,
): ConfirmedTrackEvent => {
  return {
    action: 'confirmed',
    actionSubject: BILLING_CONFIRMATION_ACTION_SUBJECT,
    actionSubjectId: 'subscribe',
    attributes: {
      isSuccesfull: !error,
      nativeError: error,
    },
  };
};

export const offsessionConfirmationEventChannel = createEventChannel<
  OffSessionConfirmationResultSourceEvent
>();

export const offsessionConfirmationNotAvailableEventChannel = createEventChannel<
  OffsessionConfirmationNotAvailableSourceEvent
>();

export const {
  Listener: OffsessionConfirmationListener,
  useEventDispatch: useBaseOffsessionConfirmationEventDispatch,
} = offsessionConfirmationEventChannel;

export const useOffsessionConfirmationEventDispatch: typeof useBaseOffsessionConfirmationEventDispatch = () => {
  const dispatchMetalEvent = useMetalDispatch();
  const dispatchBaseEvent = useBaseOffsessionConfirmationEventDispatch();

  return useCallback(
    (payload) => {
      dispatchMetalEvent({
        name: isSuccessful(payload)
          ? catalog.userInteraction.TASK_SUCCESS
          : catalog.userInteraction.TASK_FAILURE,
        value: 1,
        task: 'offsession-payment-confirmation',
        page: OFFSESSION_CONFIRMATION_FLOW,
      });

      dispatchBaseEvent(payload);
    },
    [dispatchMetalEvent, dispatchBaseEvent],
  );
};

export const {
  Listener: OffsessionConfirmationNotAvailableListener,
  useEventDispatch: useBaseOffsessionConfirmationNotAvailableEventDispatch,
} = offsessionConfirmationNotAvailableEventChannel;

export const useOffsessionConfirmationNotAvailableEventDispatch = () => {
  const dispatchMetal = useMetalDispatch();
  const dispatchBaseEvent = useBaseOffsessionConfirmationNotAvailableEventDispatch();

  return useCallback(
    (eventPayload) => {
      dispatchMetal({
        name: catalog.error.COMPONENT,
        value: 1,
        component: 'offsession-payment-confirmation-edge-case',
      });
      dispatchBaseEvent(eventPayload);
    },
    [dispatchMetal, dispatchBaseEvent],
  );
};
