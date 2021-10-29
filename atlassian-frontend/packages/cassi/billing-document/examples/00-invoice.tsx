import React from 'react';

import { MockedProvider } from '@apollo/client/testing';

import { FetchDirectMatch } from '../src/common/utils/direct-match';
import { BillingDocument } from '../src/ui';
import { FetchInvoice } from '../src/ui/invoice';

const mocks = [
  {
    request: {
      query: FetchDirectMatch,
      variables: {
        query: '013a7179-da75-4fdf-860c-9f6dbffe7e13',
      },
    },
    result: {
      data: {
        searchForDirectMatch: {
          entity: 'INVOICE',
        },
      },
    },
  },
  {
    request: {
      query: FetchInvoice,
      variables: {
        id: '013a7179-da75-4fdf-860c-9f6dbffe7e13',
      },
    },
    result: {
      data: {
        invoice: {
          id: '013a7179-da75-4fdf-860c-9f6dbffe7e13',
          invoiceNumber: 'IN-000-129-208',
          dueDate: '2020-12-10T01:37:55Z',
          creditCardExpiryYear: null,
          creditCardExpiryMonth: null,
          creditCardHolderName: 'Why Not Donut',
          creditCardMaskedNumber: '**** **** **** 1234',
          billTo: {
            firstName: 'Charlie',
            lastName: 'Atlas',
            address1: '101 Freds Place',
            address2: null,
            email: 'catlas@atlassian.com',
            phone: '210-555-9021',
            postalCode: '78701',
            companyName: 'Software Co.',
            state: 'TX',
            country: 'US',
            city: 'Austin',
          },
          billingContactName: 'Charlie Atlas',
          shipTo: {
            firstName: 'Charlie',
            lastName: 'Atlas',
            address1: '101 Freds Place',
            address2: null,
            email: 'catlas@atlassian.com',
            phone: '210-555-9021',
            postalCode: '78701',
            companyName: 'Software Co.',
            state: 'TX',
            country: 'US',
            city: 'Austin',
          },
          grandTotal: 200.0,
          itemsTotal: 190.0,
          itemsSubtotal: 190.0,
          taxes: '8.28',
          transactionAccountId: '013a7179-da75-4fdf-860c-9f6dbffe7e13',
          status: 'PAID',
          createdDate: '2020-12-10T01:37:54Z',
          partnerAccountId: null,
          partnerName: null,
          paymentMethod: 'STRIPE_CARD',
          paymentCurrency: 'USD',
          paypalAccountEmail: null,
          sourceSystem: 'CCP',
        },
      },
    },
  },
];

export default function Basic() {
  return (
    <>
      <MockedProvider mocks={mocks}>
        <BillingDocument id={'013a7179-da75-4fdf-860c-9f6dbffe7e13'} />
      </MockedProvider>
    </>
  );
}
