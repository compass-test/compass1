import React, { FC, useCallback } from 'react';

import { createEventChannel } from '@atlassian/commerce-events-telemetry-react/core';
import {
  InternalCommerceTelemetryIntegrations,
  useTaskTracker,
} from '@atlassian/commerce-telemetry';
import { useSentryExceptionDispatch } from '@atlassian/commerce-telemetry/dispatch-hooks';

import {
  AddressFieldsModified,
  AddressFormField,
  AddressFormValues,
} from '../../types';
import { ValidationError } from '../validation-errors';

import { AdditionUIEvent, BaseEventPayload, VerifiedTrackEvent } from './types';

export { useTaskTracker };

export type SubmissionErrorPayload = {
  data: AddressFormValues;
  error: ValidationError | Error;
};
export const {
  Listener: SubmissionListener,
  useEventDispatch: useBaseSubmissionEventDispatch,
} = createEventChannel<SubmissionErrorPayload>();

export const useSubmissionEventDispatch: typeof useBaseSubmissionEventDispatch = () => {
  const dispatchSentryEvent = useSentryExceptionDispatch();
  const dispatchBaseEvent = useBaseSubmissionEventDispatch();

  return useCallback(
    (payload) => {
      if (!(payload.error instanceof ValidationError)) {
        dispatchSentryEvent({ exception: payload.error });
      }

      dispatchBaseEvent(payload);
    },
    [dispatchSentryEvent, dispatchBaseEvent],
  );
};

export const TelemetryRoot: FC = ({ children }) => (
  <InternalCommerceTelemetryIntegrations>
    {children}
  </InternalCommerceTelemetryIntegrations>
);

export {
  additionUiEventNoNewFieldsModified,
  additionUiEventSomeFieldsModified,
  verifiedTrackEventAllFieldsValid,
  verifiedTrackEventFieldsInvalid,
  verifiedTrackEventUnsuccessfullNoInvalidFieldsDetected,
  verifiedTrackEventGeneralUpdateError,
} from './mocks';

const baseVerifiedEventPayload: BaseEventPayload = {
  action: 'verified',
  actionSubject: 'billingAddress',
  actionSubjectId: 'next',
  source: 'billingAddressScreen',
};

const baseAdditionEventPayload: BaseEventPayload = {
  action: 'clicked',
  actionSubject: 'button',
  actionSubjectId: 'next',
  source: 'billingAddressScreen',
};

const isValidationError = (
  error?: ValidationError | Error,
): error is ValidationError => error instanceof ValidationError;

const isFieldValid = (
  fieldKey: AddressFormField,
  error?: ValidationError | Error,
) => !(isValidationError(error) && fieldKey in error.fieldMessages);

// TODO: Old analytics spec analytics. Check if it's being used and remove if it's not
export const createVerifiedTrackEventPayload = (
  country?: string,
  error?: ValidationError | Error,
): VerifiedTrackEvent => {
  return {
    ...baseVerifiedEventPayload,
    attributes: {
      isSuccessful: !error,
      country,
      address1Valid: isFieldValid('address-line1', error),
      address2Valid: isFieldValid('address-line2', error),
      taxIdValid: isFieldValid('tax-id', error),
      cityValid: isFieldValid('address-level2', error),
      stateValid: isFieldValid('address-level1', error),
      postalCodeValid: isFieldValid('postal-code', error),
      nativeError: error,
    },
  };
};

// TODO: Old analytics spec analytics. Check if it's being used and remove if it's not
export const createBillingDetailsAddUIEventPayload = (
  dirtyFields: AddressFieldsModified,
): AdditionUIEvent => {
  return {
    ...baseAdditionEventPayload,
    attributes: {
      companyName: 'organization' in dirtyFields ? 'changed' : null,
      address1: 'address-line1' in dirtyFields ? 'changed' : null,
      address2: 'address-line2' in dirtyFields ? 'changed' : null,
      city: 'address-level2' in dirtyFields ? 'changed' : null,
      state: 'address-level1' in dirtyFields ? 'changed' : null,
      postalCode: 'postal-code' in dirtyFields ? 'changed' : null,
      taxId: 'tax-id' in dirtyFields ? 'changed' : null,
      addedAllRequiredFields: true,
    },
  };
};
