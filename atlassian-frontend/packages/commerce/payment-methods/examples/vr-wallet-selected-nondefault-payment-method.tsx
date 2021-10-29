import React from 'react';

import { VrExample } from '@atlassian/commerce-test-library/vr';

import { WalletExampleWithAmexSelectedMethod } from '../src/ui/examples';

const PaymentMethodsWalletDemo = () => (
  <VrExample>
    <WalletExampleWithAmexSelectedMethod />
  </VrExample>
);

export default PaymentMethodsWalletDemo;
