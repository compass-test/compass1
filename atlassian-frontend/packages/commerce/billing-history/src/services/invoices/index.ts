import { useCallback } from 'react';

import { GATEWAY_URL, useCommerceFetch } from '@atlassian/commerce-environment';
import {
  FetchServiceResult,
  rejectOnHttpError,
  useFetchService,
  withQueryParams,
} from '@atlassian/commerce-service-hook';
import {
  InvoiceGroupId,
  TransactionAccountId,
} from '@atlassian/commerce-types';

import { Invoice, InvoiceId, InvoiceList } from '../../common/types';

export const INVOICES_URL = `${GATEWAY_URL}/ccp/api/v1/invoices`;

/**
 * Fetches invoice history for given account
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/bill-to-party-resource/update}
 *
 * Account receivable (AR):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/bill-to-party-resource/update}
 *
 * @param fetch
 * @param txaId
 * @param igId
 * @param after
 * @param limit
 */
export const fetchInvoices = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  igId?: InvoiceGroupId,
  after?: InvoiceId,
  limit?: number,
): Promise<InvoiceList> => {
  const response = await rejectOnHttpError(
    'invoices',
    fetch(
      withQueryParams(INVOICES_URL, {
        invoiceGroup: igId,
        convertAmount: true,
        limit,
        after,
      }),
      {
        headers: { 'X-transaction-account': txaId },
      },
    ),
  );
  return response.json();
};

/**
 * Fetches a single invoice
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/invoice-resource/getInvoice}
 *
 * Account receivable (AR):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/invoice-resource/getInvoices}
 *
 * @param fetch
 * @param txaId
 * @param invoiceId
 */
export const fetchInvoice = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  invoiceId: string,
): Promise<Invoice> => {
  const response = await rejectOnHttpError(
    'invoices',
    fetch(`${INVOICES_URL}/${invoiceId}`, {
      headers: { 'X-transaction-account': txaId },
    }),
  );
  return response.json();
};

/**
 * service hook for {@link fetchInvoices}
 * @param txaId
 * @param igId
 * @param after
 * @param limit
 */
export const useInvoicesService = (
  txaId: TransactionAccountId,
  igId?: InvoiceGroupId,
  after?: InvoiceId,
  limit?: number,
): FetchServiceResult<InvoiceList> => {
  const fetch = useCommerceFetch();
  return useFetchService(
    useCallback(() => fetchInvoices(fetch, txaId, igId, after, limit), [
      after,
      fetch,
      igId,
      limit,
      txaId,
    ]),
  );
};

/**
 * service hook for {@link fetchInvoice}
 * @param txaId
 * @param invoiceId
 */
export const useInvoiceService = (
  txaId: TransactionAccountId,
  invoiceId: InvoiceId,
): FetchServiceResult<Invoice> => {
  const fetch = useCommerceFetch();
  return useFetchService(
    useCallback(() => fetchInvoice(fetch, txaId, invoiceId), [
      fetch,
      invoiceId,
      txaId,
    ]),
  );
};
