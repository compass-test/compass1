import React from 'react';

import { isCreditCardPaymentMethod } from '@atlassian/commerce-payment-methods';

import { FlowStep, FlowStepComponent } from '../../Flow/step';
import { SwappableStep } from '../../Flow/swappable-step';

import { addPaymentDetailsStep } from './add-payment-details-step';
import { displayPaymentDetailsStep } from './display-payment-method-step';
import { PaymentDetailsStepIn, PaymentDetailsStepOut } from './types';

const PaymentDetailsStep: FlowStepComponent<
  PaymentDetailsStepIn,
  PaymentDetailsStepOut
> = (props) => (
  <SwappableStep
    renderStepACondition={({
      isUpdatingPaymentMethod,
      paymentMethods,
      initialPaymentMethod,
    }) =>
      isUpdatingPaymentMethod ||
      (!initialPaymentMethod &&
        paymentMethods.filter(isCreditCardPaymentMethod).length <= 0)
    }
    StepA={addPaymentDetailsStep.component}
    StepB={displayPaymentDetailsStep.component}
    {...props}
  />
);

export const paymentDetailsStep: FlowStep<
  PaymentDetailsStepIn,
  PaymentDetailsStepOut
> = {
  caption: 'Payment',
  component: PaymentDetailsStep,
};
