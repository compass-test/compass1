import React, { FC } from 'react';

import {
  CommerceMockedEnvironment,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';

import { billingFlowSuccessScenarios } from './mocks';

import { BillingDetailsFlow } from './index';

const displayAlert = (data: any) => {
  // eslint-disable-next-line no-console
  console.log(data);
  alert('success');
};

export const BillingFlowExample: FC<{ onComplete?(payload: any): void }> = ({
  onComplete = displayAlert,
}) => (
  <div data-testid="billing-flow">
    <CommerceMockedEnvironment scenarios={billingFlowSuccessScenarios}>
      <BillingDetailsFlow onComplete={onComplete} txa={TXA_ID} />
    </CommerceMockedEnvironment>
  </div>
);
