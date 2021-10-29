// eslint-disable-next-line import/no-extraneous-dependencies
import { useCallback } from 'react';

import {
  FetchServiceResult,
  rejectOnHttpError,
  useFetchService,
} from '@atlassian/commerce-service-hook';
import {
  InvoiceGroupId,
  TransactionAccountId,
} from '@atlassian/commerce-types';

import { GATEWAY_URL } from '../../common/constants';
import { Id, PagedList } from '../../common/types';
import { useCommerceFetch } from '../../controllers/use-commerce-fetch';

export const INVOICE_GROUP_URL = `${GATEWAY_URL}/ccp/api/v1/invoice-groups`;
export type InvoiceGroupServerResponse = PagedList<Id<InvoiceGroupId>>;

/**
 * Fetches invoice groups for given account
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/invoice-group-resource/getInvoiceGroups}
 *
 * Account receivable (AR):;
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/invoice-group-resource/getInvoiceGroups}
 *
 * @param fetch
 * @param txaId
 */
export const fetchInvoiceGroups = async (
  txaId: TransactionAccountId,
  fetch: typeof window.fetch,
): Promise<InvoiceGroupId[]> => {
  const response = await rejectOnHttpError(
    'invoice-groups',
    fetch(INVOICE_GROUP_URL, {
      headers: {
        'X-transaction-account': txaId,
      },
    }),
  );
  const page: InvoiceGroupServerResponse = await response.json();
  return page.data.map((it) => it.id);
};

export const useInvoiceGroupService = (
  txa: TransactionAccountId,
): FetchServiceResult<InvoiceGroupId[]> => {
  const fetch = useCommerceFetch();
  return useFetchService(
    useCallback(() => fetchInvoiceGroups(txa, fetch), [txa, fetch]),
  );
};
