import React from 'react';

import {
  BillingDetailsFields,
  BillingDetailsFormFrame,
} from '../src/billing-details';
import { CCPCreditCardFormState, CreditCardForm } from '../src/credit-card-ccp';
import { billingDetails, environment } from '../src/mocks';
import { MetalIntegration } from '../src/telemetry-integrations';

const mockMetalCLient = {
  metric: {
    submit: (event: any) => {
      console.log(
        'You can safely submit this event to SignalFX via your @atlassiansox/metal-client client.',
        'https://developer.atlassian.com/platform/metal/',
        event,
      );
    },
  },
};

export default () => (
  <MetalIntegration client={mockMetalCLient}>
    <BillingDetailsFormFrame onSubmit={console.log}>
      <BillingDetailsFields
        countries={[] as any[]}
        sharedCountryStates={billingDetails.australiaStates}
      />
    </BillingDetailsFormFrame>
    <CCPCreditCardFormState accountId={environment.TXA_ID}>
      <CreditCardForm frameEmbeddingMitigation={false} />
    </CCPCreditCardFormState>
  </MetalIntegration>
);
