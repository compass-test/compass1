// eslint-disable-next-line import/no-extraneous-dependencies
import { useCallback } from 'react';

import {
  FetchServiceResult,
  rejectOnHttpError,
  useFetchService,
} from '@atlassian/commerce-service-hook';
import {
  HumanReadableTransactionAccountId,
  TransactionAccountId,
} from '@atlassian/commerce-types';

import { GATEWAY_URL } from '../../common/constants';
import { PagedList } from '../../common/types';
import { useCommerceFetch } from '../../controllers/use-commerce-fetch';

export const TRANSACTION_ACCOUNTS_URL = `${GATEWAY_URL}/ccp/api/v1/transaction-accounts`;
export type TransactionAccountsServerResponse = PagedList<{
  id: TransactionAccountId;
  number?: HumanReadableTransactionAccountId;
}>;

/**
 * Fetches all transactions accounts that user has billing admin permissions to
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/transaction-account-resource/getTransactionAccounts}
 *
 * Account receivable (AR):;
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/transaction-account-resource/getTransactionAccounts}
 *
 * @param fetch
 */
export const fetchTransactionAccounts = async (
  fetch: typeof window.fetch,
): Promise<TransactionAccountId[]> => {
  const response = await rejectOnHttpError(
    'transaction-accounts',
    fetch(TRANSACTION_ACCOUNTS_URL),
  );
  const page: TransactionAccountsServerResponse = await response.json();
  return page.data.map((it) => it.id);
};

export const useTransactionAccountsService = (): FetchServiceResult<
  TransactionAccountId[]
> => {
  const fetch = useCommerceFetch();
  return useFetchService(
    useCallback(() => fetchTransactionAccounts(fetch), [fetch]),
  );
};
