import React from 'react';

import { InvoiceId } from '@atlassian/commerce-billing-history';
import { CommerceStartgateProxy } from '@atlassian/commerce-environment/mocks';

import { OffSessionPaymentMethodConfirm } from '../src';

const AddPaymentDetails = () => {
  return (
    <CommerceStartgateProxy>
      {(txa) => (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <OffSessionPaymentMethodConfirm
            txa={txa}
            invoiceId={'an-invoice-id' as InvoiceId}
            onSuccess={() => {
              alert('Hooray!');
            }}
          />
        </div>
      )}
    </CommerceStartgateProxy>
  );
};

export default AddPaymentDetails;
