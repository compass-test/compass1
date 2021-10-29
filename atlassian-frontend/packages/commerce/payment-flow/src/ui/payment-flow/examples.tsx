import React from 'react';

import {
  CommerceMockedEnvironment,
  IG_ID,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';

import {
  deferredPaymentFlowUpdateSuccessScenarios,
  paymentFlowAddPaymentUpdatePaymentErrorScenarios,
  paymentFlowAddSuccessScenarios,
  paymentFlowOverrides,
  paymentFlowStripeErrorOverrides,
  paymentFlowUpdateNoDefaultAtInvoiceGroupSuccessScenarios,
  paymentFlowUpdateSuccessScenarios,
} from './mocks';

import { PaymentDetailsFlow } from './index';

export const ErrorLoadingFlowData = () => (
  <CommerceMockedEnvironment scenarios={[]} overrides={paymentFlowOverrides}>
    <PaymentDetailsFlow
      onComplete={() => alert('success')}
      txa={TXA_ID}
      ig={IG_ID}
    />
  </CommerceMockedEnvironment>
);

export const AddPaymentDetailsFlow = () => {
  return (
    <CommerceMockedEnvironment
      scenarios={paymentFlowAddSuccessScenarios}
      overrides={paymentFlowOverrides}
    >
      <PaymentDetailsFlow
        onComplete={() => alert('success')}
        txa={TXA_ID}
        ig={IG_ID}
      />
    </CommerceMockedEnvironment>
  );
};

export const AddPaymentDetailsFlowUpdatePaymentError = () => (
  <CommerceMockedEnvironment
    scenarios={paymentFlowAddPaymentUpdatePaymentErrorScenarios}
    overrides={paymentFlowOverrides}
  >
    <PaymentDetailsFlow
      onComplete={() => alert('success')}
      txa={TXA_ID}
      ig={IG_ID}
    />
  </CommerceMockedEnvironment>
);

export const AddPaymentDetailsFlowStripeCardConfirmationError = () => (
  <CommerceMockedEnvironment
    scenarios={paymentFlowAddSuccessScenarios}
    overrides={paymentFlowStripeErrorOverrides}
  >
    <PaymentDetailsFlow
      onComplete={() => alert('success')}
      txa={TXA_ID}
      ig={IG_ID}
    />
  </CommerceMockedEnvironment>
);

export const UpdatePaymentDetailsFlow = () => (
  <CommerceMockedEnvironment
    scenarios={paymentFlowUpdateSuccessScenarios}
    overrides={paymentFlowOverrides}
  >
    <PaymentDetailsFlow
      onComplete={() => alert('success')}
      txa={TXA_ID}
      ig={IG_ID}
    />
  </CommerceMockedEnvironment>
);

export const UpdatePaymentDetailsFlowNoDefaultForInvoiceGroup = () => (
  <CommerceMockedEnvironment
    scenarios={paymentFlowUpdateNoDefaultAtInvoiceGroupSuccessScenarios}
    overrides={paymentFlowOverrides}
  >
    <PaymentDetailsFlow
      onComplete={() => alert('success')}
      txa={TXA_ID}
      ig={IG_ID}
    />
  </CommerceMockedEnvironment>
);

export const UpdatePaymentDetailsFlowStripeCardConfirmationError = () => (
  <CommerceMockedEnvironment
    scenarios={paymentFlowUpdateSuccessScenarios}
    overrides={paymentFlowStripeErrorOverrides}
  >
    <PaymentDetailsFlow
      onComplete={() => alert('success')}
      txa={TXA_ID}
      ig={IG_ID}
    />
  </CommerceMockedEnvironment>
);

export const AddPaymentDetailsFlowForCassie = () => {
  return (
    <CommerceMockedEnvironment
      scenarios={paymentFlowAddSuccessScenarios}
      overrides={paymentFlowOverrides}
    >
      <PaymentDetailsFlow
        onComplete={() => alert('success')}
        txa={TXA_ID}
        ig={IG_ID}
        manualSubscription={true}
        renewalFrequency="annual"
      />
    </CommerceMockedEnvironment>
  );
};

export const UpdateDeferredPaymentDetailsFlow = () => (
  <CommerceMockedEnvironment
    scenarios={deferredPaymentFlowUpdateSuccessScenarios}
    overrides={paymentFlowOverrides}
  >
    <PaymentDetailsFlow
      onComplete={() => alert('success')}
      txa={TXA_ID}
      ig={IG_ID}
    />
  </CommerceMockedEnvironment>
);
