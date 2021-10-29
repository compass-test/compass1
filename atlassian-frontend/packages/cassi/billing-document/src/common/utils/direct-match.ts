/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @atlassian/tangerine/import/no-parent-imports */
/*
  Direct Match takes an id. Queries the graph 4 times for each type of billing document.
  If there is a match we check the type. That is the BillingDocumentType.
*/

import { gql, useQuery } from '@apollo/client';

import { BillingDocumentType } from '../types';

import {
  FetchDirectMatchForInvoiceQuery,
  FetchDirectMatchForInvoiceQueryVariables,
} from './graph-types';

export const GetDocumentType = (query: string) => {
  const { data } = useQuery<
    FetchDirectMatchForInvoiceQuery,
    FetchDirectMatchForInvoiceQueryVariables
  >(FetchDirectMatch, {
    variables: {
      query: query,
    },
  });

  const entity = data?.searchForDirectMatch?.entity;
  if (entity === BillingDocumentType.INVOICE) {
    return BillingDocumentType.INVOICE;
  } else if (entity === BillingDocumentType.QUOTE) {
    return BillingDocumentType.QUOTE;
  } else if (entity === BillingDocumentType.REFUND) {
    return BillingDocumentType.REFUND;
  }
};

export const FetchDirectMatch = gql`
  query fetchDirectMatchForInvoice($query: String) {
    searchForDirectMatch(query: $query) {
      entity
    }
  }
`;
