import React from 'react';

import { CommerceStartgateProxy } from '@atlassian/commerce-environment/mocks';

import { PaymentDetailsFlow } from '../src';

const AddPaymentDetails = () => (
  <CommerceStartgateProxy>
    {(txa, ig) => (
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <PaymentDetailsFlow
          onCancel={() => alert('CANCEL')}
          onComplete={() => alert('HOORAY')}
          txa={txa}
          ig={ig}
        />
      </div>
    )}
  </CommerceStartgateProxy>
);

export default AddPaymentDetails;
