import React from 'react';

import {
  BillingDetailsFields,
  BillingDetailsFormFrame,
} from '@atlassian/commerce-billing-details';
import { australiaStates } from '@atlassian/commerce-billing-details/mocks';
import { MetalIntegration as BillingDetailsMetalIntegration } from '@atlassian/commerce-billing-details/telemetry-integrations';
import {
  CCPCreditCardFormState,
  CreditCardForm,
} from '@atlassian/commerce-credit-card-ccp';
import { MetalIntegration as CreditCardMetalIntegration } from '@atlassian/commerce-credit-card-ccp/telemetry-integrations';
import { TXA_ID } from '@atlassian/commerce-environment/mocks';

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
  <>
    <BillingDetailsMetalIntegration client={mockMetalCLient}>
      <BillingDetailsFormFrame onSubmit={console.log}>
        <BillingDetailsFields
          countries={[] as any[]}
          sharedCountryStates={australiaStates}
        />
      </BillingDetailsFormFrame>
    </BillingDetailsMetalIntegration>
    <CreditCardMetalIntegration client={mockMetalCLient}>
      <CCPCreditCardFormState accountId={TXA_ID}>
        <CreditCardForm frameEmbeddingMitigation={false} />
      </CCPCreditCardFormState>
    </CreditCardMetalIntegration>
  </>
);
