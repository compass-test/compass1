import React from 'react';

import { VrExample } from '@atlassian/commerce-test-library/vr';

import { WalletExampleWithoutSelectedMethod } from '../src/ui/examples';

const PaymentMethodsWalletDemo = () => (
  <VrExample>
    <WalletExampleWithoutSelectedMethod />
  </VrExample>
);

export default PaymentMethodsWalletDemo;
