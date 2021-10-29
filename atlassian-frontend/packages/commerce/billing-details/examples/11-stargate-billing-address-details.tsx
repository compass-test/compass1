import React from 'react';

import { CommerceStartgateProxy } from '@atlassian/commerce-environment/mocks';
import { TransactionAccountId } from '@atlassian/commerce-types';

import { BillingAddressDetails, useBillingDetailsService } from '../src';

const Example = ({ txa }: { txa: TransactionAccountId }) => {
  const { data } = useBillingDetailsService(txa);
  return (
    <div style={{ width: '400px' }}>
      {data && <BillingAddressDetails {...data} />}
    </div>
  );
};

export default () => (
  <CommerceStartgateProxy>
    {(txa) => <Example txa={txa} />}
  </CommerceStartgateProxy>
);
