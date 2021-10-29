import React, { ReactNode, useState } from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/custom-theme-button';
import { FormFooter } from '@atlaskit/form';
import { FieldContainer } from '@atlassian/commerce-final-form';
import {
  Breadcrumb,
  useGasV3TrackEventDispatch,
  useGasV3UIEventDispatch,
} from '@atlassian/commerce-telemetry/dispatch-hooks';

import { BILLING_DETAILS_FORM } from '../../common/constants/breadcrumb-names';
import {
  AddressFieldErrorMessages,
  BillingCountry,
  BillingCountryStateLookup,
  BillingDetails,
} from '../../common/types';
import {
  AddressFieldsList,
  AddressFormFrame,
} from '../../common/ui/address-form';
import { anyFieldModified } from '../../common/utils';
import {
  createBillingDetailsAddUIEventPayload,
  createVerifiedTrackEventPayload,
  TelemetryRoot,
  useSubmissionEventDispatch,
} from '../../common/utils/analytics';

import {
  mapFromBillingDetailsToForm,
  mapFromFormToBillingDetails,
} from './utils';

type BillingDetailsFieldsProps = {
  countries: BillingCountry[];
  sharedCountryStates: BillingCountryStateLookup;
};

export const BillingDetailsFieldsList: React.FC<BillingDetailsFieldsProps> = ({
  countries,
  sharedCountryStates,
}) => (
  <AddressFieldsList
    countries={countries}
    sharedCountryStates={sharedCountryStates}
  />
);

export const BillingDetailsFields: React.FC<BillingDetailsFieldsProps> = ({
  countries,
  sharedCountryStates,
}) => (
  <FieldContainer>
    <BillingDetailsFieldsList
      countries={countries}
      sharedCountryStates={sharedCountryStates}
    />
  </FieldContainer>
);

type BillingDetailsSubmitHandler = (
  data: BillingDetails,
  meta: { dirty: boolean },
) =>
  | void
  | AddressFieldErrorMessages
  | Promise<AddressFieldErrorMessages | void>;

type FormFrameProps = {
  onSubmit: BillingDetailsSubmitHandler;
  children: ReactNode;
  initialValues?: BillingDetails;
};

export const BillingDetailsFormFrame: React.FC<FormFrameProps> = ({
  onSubmit,
  children,
  initialValues,
}) => {
  // FIXME: This should be a trac event
  const dispatchUIEvent = useGasV3UIEventDispatch();
  const dispatchTrackEvent = useGasV3TrackEventDispatch();
  const dispatchSubmissionErrorEvent = useSubmissionEventDispatch();

  const mappedBillingDetails = initialValues
    ? mapFromBillingDetailsToForm(initialValues)
    : undefined;
  return (
    <AddressFormFrame
      initialValues={mappedBillingDetails}
      onSubmit={async (data, { fieldsModified }) => {
        try {
          dispatchUIEvent(
            createBillingDetailsAddUIEventPayload(fieldsModified),
          );

          const submissionResult = await onSubmit(
            mapFromFormToBillingDetails(data),
            { dirty: anyFieldModified(fieldsModified) },
          );
          // TODO: Use dedicated submission channels
          dispatchTrackEvent(createVerifiedTrackEventPayload(data.country));
          return submissionResult;
        } catch (err) {
          // TODO: Use dedicated submission channels
          dispatchTrackEvent(
            createVerifiedTrackEventPayload(data.country, err),
          );
          dispatchSubmissionErrorEvent({
            data,
            error: err,
          });
          throw err;
        }
      }}
    >
      {children}
    </AddressFormFrame>
  );
};

type FormProps = {
  countries: BillingCountry[];
  countryStates: BillingCountryStateLookup;
  initialValues?: BillingDetails;
  onSubmit: BillingDetailsSubmitHandler;
};

const BillingDetailsFormWithoutTelemetryRoot: React.FC<FormProps> = ({
  countries,
  countryStates,
  onSubmit,
  initialValues,
}) => {
  const [updating, setUpdating] = useState(false);
  return (
    <Breadcrumb name={BILLING_DETAILS_FORM}>
      <BillingDetailsFormFrame
        initialValues={initialValues}
        onSubmit={async (data, dirty) => {
          setUpdating(true);
          const result = await onSubmit(data, dirty);
          setUpdating(false);
          return result;
        }}
      >
        <BillingDetailsFields
          countries={countries}
          sharedCountryStates={countryStates}
        />
        <FormFooter>
          <ButtonGroup>
            <Button
              testId="commerce.billing-details.submit-button"
              type="submit"
              isDisabled={updating}
            >
              Submit
            </Button>
          </ButtonGroup>
        </FormFooter>
      </BillingDetailsFormFrame>
    </Breadcrumb>
  );
};

export const BillingDetailsForm: typeof BillingDetailsFormWithoutTelemetryRoot = (
  props,
) => (
  <TelemetryRoot>
    <BillingDetailsFormWithoutTelemetryRoot {...props} />
  </TelemetryRoot>
);
