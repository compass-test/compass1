import React, { useCallback } from 'react';

import {
  BillingCountry,
  BillingCountryStateLookup,
  BillingDetails,
  BillingDetailsFields,
  FormErrorMessage as BillingDetailsFormError,
  BillingDetailsFormFrame,
  useBillingDetailsUpdateService,
} from '@atlassian/commerce-billing-details';
import { TaskLayout } from '@atlassian/commerce-layout';
import { TransactionAccountId } from '@atlassian/commerce-types';

import { BillingAddressScreenBreadcrumb } from '../../../utils/analytics';
import { FlowControlButtons } from '../../Flow/flow-control-buttons';
import { FlowStep, FlowStepComponent } from '../../Flow/step';

interface BillingStepIn {
  txa: TransactionAccountId;
  billingCountries: BillingCountry[];
  billingDetails?: BillingDetails;
  countryStates: BillingCountryStateLookup;
}

export interface BillingStepOut {
  billingDetails: BillingDetails;
  billingDetailsChanged: boolean;
}

export const BillingDetailsStep: FlowStepComponent<
  BillingStepIn,
  BillingStepOut
> = ({
  flowControl,
  flowState: { billingCountries, countryStates, billingDetails, txa },
}) => {
  const {
    error: billingDetailsUpdateError,
    update,
    loading: updating,
  } = useBillingDetailsUpdateService(txa);

  const onSubmit = useCallback(
    async (billingDetails: BillingDetails, { dirty }: { dirty: boolean }) => {
      if (dirty) {
        await update(billingDetails);
      }
      // FIXME: we are postponing moveForward until other onSumbit hooks are executed
      setImmediate(() => {
        flowControl.moveForward({
          billingDetails,
          billingDetailsChanged: dirty,
        });
      });
    },
    [flowControl, update],
  );

  return (
    <BillingDetailsFormFrame initialValues={billingDetails} onSubmit={onSubmit}>
      <TaskLayout
        title={
          billingDetails
            ? 'Update your billing address'
            : 'Add your billing address'
        }
        actions={
          <FlowControlButtons
            flowControl={flowControl}
            loading={updating}
            failed={Boolean(billingDetailsUpdateError)}
            onNext={() => {
              // it is handled by the the onSubmit listener
            }}
            entityName="BillingDetails"
            nextButtonTestId="commerce.billing-details.submit-button"
          />
        }
        actionError={
          <BillingDetailsFormError error={billingDetailsUpdateError} />
        }
      >
        <BillingDetailsFields
          countries={billingCountries}
          sharedCountryStates={countryStates}
        />
      </TaskLayout>
    </BillingDetailsFormFrame>
  );
};

const BreadcrumbedBillingDetailsStep: typeof BillingDetailsStep = (props) => (
  <BillingAddressScreenBreadcrumb>
    <BillingDetailsStep {...props} />
  </BillingAddressScreenBreadcrumb>
);

export const billingDetailsStep: FlowStep<BillingStepIn, BillingStepOut> = {
  caption: 'Billing details',
  component: BreadcrumbedBillingDetailsStep,
};

export { BillingStepLoadingState } from './loading-state';
