import { useCallback } from 'react';

import { InvoiceId } from '@atlassian/commerce-billing-history';
import { GATEWAY_URL, useCommerceFetch } from '@atlassian/commerce-environment';
import { fetchPaymentMethod } from '@atlassian/commerce-payment-methods';
import {
  FetchServiceResult,
  HttpResponseError,
  rejectOnHttpError,
  useFetchService,
} from '@atlassian/commerce-service-hook';
import { TransactionAccountId } from '@atlassian/commerce-types';

import { InvoicePaymentDataError } from '../../common/utils/invoice-payment-data-error';

import { DetailedInvoicePaymentData, InvoicePaymentData } from './types';

export const INVOICES_URL = `${GATEWAY_URL}/ccp/api/v1/invoices`;

/**
 * gets information needed to confirm payment method
 * @param fetch
 * @param txaId
 * @param invoiceId
 * @throws {InvoicePaymentDataError}
 */
export const fetchInvoicePaymentData = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  invoiceId: InvoiceId,
): Promise<InvoicePaymentData> => {
  try {
    const response = await rejectOnHttpError(
      'post-invoice-confirm-payment',
      fetch(`${INVOICES_URL}/${invoiceId}/confirm-payment`, {
        headers: {
          'X-transaction-account': txaId,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }),
    );
    return response.json();
  } catch (error) {
    if (error instanceof HttpResponseError && error.statusCode === 409) {
      throw new InvoicePaymentDataError(error.body);
    }
    throw error;
  }
};

/**
 * gets detailed information for confirming a payment method along the complete payment
 * method object
 * @param fetch
 * @param txaId
 * @param invoiceId
 */
export const fetchDetailedInvoicePaymentData = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  invoiceId: InvoiceId,
): Promise<DetailedInvoicePaymentData> => {
  const invoicePaymentData = await fetchInvoicePaymentData(
    fetch,
    txaId,
    invoiceId,
  );
  const paymentMethod = await fetchPaymentMethod(
    fetch,
    txaId,
    invoicePaymentData.ccpPaymentMethodId,
  );

  return {
    paymentMethod,
    invoicePaymentData,
  };
};

/**
 * service hook for getting detailed payment information of an invoice by id and transaction account
 * @param txaId
 * @param invoiceId
 */
export const useDetailedInvoicePaymentData = (
  txaId: TransactionAccountId,
  invoiceId: InvoiceId,
): FetchServiceResult<
  DetailedInvoicePaymentData,
  InvoicePaymentDataError | Error | HttpResponseError
> => {
  const fetch = useCommerceFetch();
  return useFetchService(
    useCallback(async () => {
      return fetchDetailedInvoicePaymentData(fetch, txaId, invoiceId);
    }, [fetch, txaId, invoiceId]),
  );
};
