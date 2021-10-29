/* eslint-disable @atlassian/tangerine/import/no-parent-imports */
import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { BillingDocumentProps } from '../../common/types';
import {
  FetchInvoiceQuery,
  FetchInvoiceQueryVariables,
} from '../../common/utils/graph-types';

import InvoiceDetails from './invoice-details';
import { InvoiceContainer } from './styled';

export const Invoice = ({
  id,
  Header,
  BreadCrumbs,
  AuditTrail,
  LineItems,
  Details,
}: BillingDocumentProps) => {
  const { data } = useQuery<FetchInvoiceQuery, FetchInvoiceQueryVariables>(
    FetchInvoice,
    {
      variables: {
        id: id,
      },
    },
  );

  return (
    <InvoiceContainer>
      <div className="invoice">
        {BreadCrumbs}
        {Header}
        {Details ?? <InvoiceDetails invoice={data?.invoice} />}
        {LineItems}
        {AuditTrail}
      </div>
    </InvoiceContainer>
  );
};

export const FetchInvoice = gql`
  query fetchInvoice($id: ID!) {
    invoice(id: $id) {
      id
      invoiceNumber
      dueDate
      creditCardExpiryYear
      creditCardExpiryMonth
      creditCardHolderName
      creditCardExpiryYear
      creditCardMaskedNumber
      billTo {
        firstName
        lastName
        address1
        address2
        email
        phone
        postalCode
        companyName
        state
        country
        city
      }
      billingContactName
      shipTo {
        firstName
        lastName
        address1
        address2
        email
        phone
        postalCode
        companyName
        state
        country
        city
      }
      grandTotal
      itemsTotal
      itemsSubtotal
      taxes
      transactionAccountId
      status
      dueDate
      createdDate
      partnerAccountId
      partnerName
      paymentMethod
      paymentCurrency
      paypalAccountEmail
      sourceSystem
    }
  }
`;

export default Invoice;
