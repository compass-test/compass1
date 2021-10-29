import React from 'react';

import { VrExample } from '@atlassian/commerce-test-library/vr';

import {
  BareBonesBillingDetailsPanel,
  EditableBillingDetailsPanel,
  EmptyBillingDetailsPanel,
  FullBillingDetailsPanel,
  MinimalBillingDetailsPanel,
} from '../src/ui/billing-details-panel/examples';

export const Example = () => (
  <VrExample>
    <FullBillingDetailsPanel />
    <MinimalBillingDetailsPanel />
    <BareBonesBillingDetailsPanel />
    <EmptyBillingDetailsPanel />
    <EditableBillingDetailsPanel />
  </VrExample>
);

export default Example;
