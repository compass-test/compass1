import { useCallback } from 'react';

import { GATEWAY_URL, useCommerceFetch } from '@atlassian/commerce-environment';
import {
  autoRetry,
  FetchServiceResult,
  HttpResponseError,
  rejectOnHttpError,
  ServiceResult,
  useFetchService,
  useService,
} from '@atlassian/commerce-service-hook';
import { TransactionAccountId } from '@atlassian/commerce-types';

import {
  Entitlement,
  EntitlementId,
  ExpandedEntitlement,
} from '../../common/types';

// `search/search` as we call 'search' path on search service which is under 'search' alias on ccp-gateway
export const SEARCH_URL = `${GATEWAY_URL}/ccp/api/v1/search`;
export const ENTITLEMENTS_URL = `${GATEWAY_URL}/ccp/api/v1/entitlements`;

export type EntitlementsExpandedSearchResponse = {
  results: ExpandedEntitlement[];
};
export type EntitlementsSearchResponse = {
  results: Entitlement[];
};

/**
 * Fetch ALL entitlements with product and subscription data.
 *
 * Confluence spec https://hello.atlassian.net/wiki/spaces/tintin/pages/954898014/Search+service+APIs
 *
 * @param fetch
 * @param txaId
 */
export const fetchEntitlements = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
): Promise<ExpandedEntitlement[]> => {
  const response = await rejectOnHttpError(
    'entitlements-search',
    fetch(SEARCH_URL, {
      method: 'post',
      headers: {
        'X-transaction-account': txaId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: {
          query: {
            term: {
              transactionAccountId: txaId,
            },
          },
        },
        class: 'entitlement',
        expand: [
          'subscriptionId',
          'offeringKey',
          'offeringKey.productKey',
          'subscriptionId.pricingPlanId',
          'order.itemId',
        ],
        // TODO: Exclude unecessary information when 'exclude' is avaliable
      }),
    }),
  );
  return ((await response.json()) as EntitlementsExpandedSearchResponse)
    .results;
};

/**
 * service hook for {@link fetchEntitlements}
 * @param txaId
 */
export const useEntitlementsService = (
  txaId: TransactionAccountId,
): FetchServiceResult<ExpandedEntitlement[]> => {
  const fetch = useCommerceFetch();
  return useFetchService(
    useCallback(() => fetchEntitlements(fetch, txaId), [fetch, txaId]),
  );
};

/**
 * Fetch ONE entitlement from search service
 *
 * Confluence spec https://hello.atlassian.net/wiki/spaces/tintin/pages/954898014/Search+service+APIs
 *
 * @param fetch
 * @param txaId
 */
export const fetchEntitlement = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  entitlementId: EntitlementId,
): Promise<Entitlement> => {
  const response = await rejectOnHttpError(
    'entitlements-search',
    fetch(SEARCH_URL, {
      method: 'post',
      headers: {
        'X-transaction-account': txaId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: {
          query: {
            term: {
              entitlementId: entitlementId,
            },
          },
        },
        class: 'entitlement',
        expand: ['subscriptionId'],
      }),
    }),
  );
  return ((await response.json()) as EntitlementsSearchResponse).results[0];
};

/**
 * service hook for {@link fetchEntitlement}
 * @param txaId
 */
export const useEntitlementService = (
  txaId: TransactionAccountId,
): ServiceResult<Entitlement, [EntitlementId]> => {
  const fetch = useCommerceFetch();
  return useService(
    useCallback(
      (entitlementId: EntitlementId) =>
        fetchEntitlement(fetch, txaId, entitlementId),
      [fetch, txaId],
    ),
  );
};

/**
 * Fetches details for an entitlement with specified id.
 *
 * CCP API: https://ccp-api-gateway.staging.atl-paas.net/webjars/swagger-ui/index.html?configUrl=/openapi/swagger-config#/Entitlement%20Details%20API/getEntitlementDetails
 * @param fetch
 * @param txaId
 * @param entitlementId
 * @returns
 */
export const fetchEntitlementDetails = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  entitlementId: EntitlementId,
): Promise<ExpandedEntitlement> => {
  const response = await rejectOnHttpError(
    'entitlements-details',
    fetch(`${ENTITLEMENTS_URL}/${entitlementId}/details`, {
      method: 'GET',
      headers: {
        'X-transaction-account': txaId,
        'Content-Type': 'application/json',
      },
    }),
  );
  return await response.json();
};

/**
 * service hook for {@link fetchEntitlementDetails}
 * @param txaId
 */
export const useEntitlementDetailsService = (
  txaId: TransactionAccountId,
): ServiceResult<ExpandedEntitlement, [EntitlementId]> => {
  const fetch = useCommerceFetch();
  return useService(
    useCallback(
      (entitlementId: EntitlementId) =>
        fetchEntitlementDetails(fetch, txaId, entitlementId),
      [fetch, txaId],
    ),
  );
};
/*
  Polls search service to see if an entitlement (given its id), is updated (by checking the version)
  General update operations should be under 10 seconds
*/
export const waitUntilEntitlementUpdates = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  entitlementId: EntitlementId,
  prevVersion: number,
  retryInterval = 2500,
  maxRetries = 8,
): Promise<void> => {
  const response = await autoRetry<Entitlement>(
    () => fetchEntitlement(fetch, txaId, entitlementId),
    (data) => data.version <= prevVersion,
    retryInterval,
    maxRetries,
  );
  if (response.version <= prevVersion) {
    throw new HttpResponseError(
      'entitlement-poll',
      504, // timeout code
      `Polling for entitlement "${entitlementId}" update timed out after ${maxRetries} retires`,
    );
  }
};
