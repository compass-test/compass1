import React from 'react';

import {
  australiaStates,
  billingCountries,
  fullBillingDetails,
  successScenariosForDefaultCountries,
} from '@atlassian/commerce-billing-details/mocks';
import {
  CommerceMockedEnvironment,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';

import { defineFlow } from '../../Flow';
import { TestFlow } from '../../Flow/mocks';

import { billingDetailsStep } from './index';

export const billingDetails = () => (
  <CommerceMockedEnvironment
    scenarios={[...successScenariosForDefaultCountries]}
  >
    <TestFlow
      definition={defineFlow(
        {
          txa: TXA_ID,
          billingDetails: fullBillingDetails,
          billingCountries: billingCountries,
          countryStates: australiaStates,
        },
        billingDetailsStep,
      )}
    />
    ship-to-details-form/index.tsx
  </CommerceMockedEnvironment>
);
