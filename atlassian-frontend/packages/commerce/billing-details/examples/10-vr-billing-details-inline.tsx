import React from 'react';

import { VrExample } from '@atlassian/commerce-test-library/vr';

import {
  BareBonesBillingDetailsInline,
  EmptyBillingDetailsInline,
  FullBillingDetailsInline,
  MinimalBillingDetailsInline,
} from '../src/ui/billing-details-panel/examples';

export const Example = () => (
  <VrExample>
    <FullBillingDetailsInline />
    <MinimalBillingDetailsInline />
    <BareBonesBillingDetailsInline />
    <EmptyBillingDetailsInline />
  </VrExample>
);

export default Example;
