import React from 'react';

import {
  CommerceMockedEnvironment,
  IG_ID,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';

import { PaymentMethodPanel, useDefaultPaymentMethodService } from '../src';
import { isCreditCardPaymentMethod } from '../src/common/types';
import { paymentMethodSuccessScenarios } from '../src/mocks';

const PaymentMethodIntegrationDemo = () => {
  const { data: paymentMethod } = useDefaultPaymentMethodService(TXA_ID, IG_ID);

  if (paymentMethod && isCreditCardPaymentMethod(paymentMethod)) {
    return (
      <div style={{ maxWidth: 400 }}>
        <PaymentMethodPanel
          paymentMethod={{
            ...paymentMethod,
            card: { ...paymentMethod.card, name: 'John Doe' },
          }}
          onEdit={() => alert('editing your credit card')}
        />
      </div>
    );
  }
  return <>Loading...</>;
};
export default () => (
  <CommerceMockedEnvironment scenarios={paymentMethodSuccessScenarios}>
    <PaymentMethodIntegrationDemo />
  </CommerceMockedEnvironment>
);
