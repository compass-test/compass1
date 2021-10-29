import React from 'react';

import { IG_ID, TXA_ID } from '@atlassian/commerce-environment/mocks';
import { NarrowLayout } from '@atlassian/commerce-layout';
import { visaPaymentMethod } from '@atlassian/commerce-payment-methods/mocks';

import { defineFlow } from '../../../Flow';
import { TestFlow } from '../../../Flow/mocks';

import { displayPaymentDetailsStep } from './index';

export const display = () => (
  <NarrowLayout>
    <TestFlow
      definition={defineFlow(
        {
          txa: TXA_ID,
          ig: IG_ID,
          paymentMethod: visaPaymentMethod,
          paymentMethods: [visaPaymentMethod],
        },
        displayPaymentDetailsStep,
      )}
    />
  </NarrowLayout>
);
