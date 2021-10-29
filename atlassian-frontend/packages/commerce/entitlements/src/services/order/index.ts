import { useCallback } from 'react';

import { v4 as uuidv4 } from 'uuid';

import {
  GATEWAY_URL,
  useCommerceFetch,
  useCommerceOverride,
} from '@atlassian/commerce-environment';
import {
  autoRetry,
  HttpResponseError,
  rejectOnHttpError,
  UpdateServiceResult,
  useUpdateService,
} from '@atlassian/commerce-service-hook';
import { TransactionAccountId } from '@atlassian/commerce-types';

import {
  AmendmentOrderItemRequest,
  CancellationOrderItemRequest,
  Entitlement,
  EntitlementId,
  ExpandedEntitlement,
  OrderId,
  OrderItemOptedUsageOptions,
  OrderRequest,
  OrderResponse,
  ReactivationOrderItemRequest,
} from '../../common/types';

// `search/search` as we call 'search' path on search service which is under 'search' alias on ccp-gateway
export const SEARCH_URL = `${GATEWAY_URL}/ccp/api/v1/search`;
export const ORDERS_URL = `${GATEWAY_URL}/ccp/api/v1/orders`;

export const generateOrderId: () => OrderId = () => uuidv4();
export const generateCancellationOrderId = () => uuidv4();
export const generateReactivationOrderId = () => uuidv4();
export const generateCancelDeactivationOrderId = () => uuidv4();

/**
 * Place entitlements order (CREATE, DEACTIVATE, CANCEL, AMEND)
 *
 * @param fetch
 * @param orderRequest
 *
 * CCP api gateaway (CCP API):
 *  - Api docs - {@link https://developer.atlassian.com/platform/commerce-cloud-platform/how-to/order/place-order/}
 */
export const placeOrder = async (
  fetch: typeof window.fetch,
  orderRequest: OrderRequest,
) => {
  const { transactionAccountId, orderId, invoiceGroupId, items } = orderRequest;
  await rejectOnHttpError(
    'entitlements-orders',
    fetch(ORDERS_URL, {
      headers: {
        'X-transaction-account': transactionAccountId,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        orderId,
        invoiceGroupId,
        items,
      }),
    }),
  );
};

/**
 * Fetches an order with specified id.
 * @param fetch
 * @param txaId
 * @param entitlementId
 */
export const fetchOrder = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  orderId: OrderId,
): Promise<OrderResponse> => {
  const response = await rejectOnHttpError(
    'order-fetch',
    fetch(`${ORDERS_URL}/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-transaction-account': txaId,
      },
    }),
  );

  const order = (await response.json()) as OrderResponse;

  return order;
};

/**
 * Creating an order is async - Client is expected to poll on orderId to validate if the order is processed successfully.
 *
 * CCP api gateaway (CCP API):
 * - Api docs - {@link https://developer.atlassian.com/platform/commerce-cloud-platform/how-to/order/place-order/}
 *
 * @param fetch
 * @param txaId
 * @param orderId
 * @param retryInterval
 * @param maxRetries
 */
export const waitUntilOrderSucceeds = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  orderId: OrderId,
  retryInterval = 2500,
  maxRetries = 8,
): Promise<void> => {
  const isOrderProcessing = (order: OrderResponse): boolean =>
    order.items.some((item) => item.processingInfo.status === 'PROCESSING');

  const orderResponse = await autoRetry<OrderResponse>(
    () => fetchOrder(fetch, txaId, orderId),
    (order) => isOrderProcessing(order),
    retryInterval,
    maxRetries,
  );

  if (isOrderProcessing(orderResponse)) {
    throw new HttpResponseError(
      'order-poll',
      504, // timeout code
      `Polling for order "${orderId}" timed out after ${maxRetries} retries`,
    );
  }
};

const getVersionMapForOrderEntitlements = (
  orderRequest: OrderRequest,
): Map<EntitlementId, number> => {
  return new Map(
    orderRequest.items.map((item) => [
      item.entitlement.id,
      item.entitlement.version,
    ]),
  );
};

const getVersionMapForEntitlementsList = (
  entitlements: Entitlement[],
): Map<EntitlementId, number> => {
  return new Map(
    entitlements.map(({ entitlementId, version }) => [entitlementId, version]),
  );
};

/**
 * Returns if an order has entitlements pending to be updated in Search service, by comparing the versions of the entitlements
 * in the order agains the ones returned by Search.
 *
 * TODO: The comparison logic can be replaced by a single count query to Search once nested bools are supported:
 * https://hello.atlassian.net/browse/CASGARD01-458
 *
 * @param fetch
 * @param orderRequest
 */
export const hasOrderEntitlementsPendingUpdate = async (
  fetch: typeof window.fetch,
  orderRequest: OrderRequest,
): Promise<boolean> => {
  const currentVersionsMap = getVersionMapForOrderEntitlements(orderRequest);

  const entitlementsResponse = await rejectOnHttpError(
    'entitlements-search',
    fetch(`${SEARCH_URL}`, {
      method: 'post',
      headers: {
        'X-transaction-account': orderRequest.transactionAccountId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        class: 'entitlement',
        expand: ['subscriptionId'],
        payload: {
          query: {
            term: {
              'order.id': orderRequest.orderId,
            },
          },
        },
      }),
    }),
  );

  const entitlements = (await entitlementsResponse.json())
    .results as Entitlement[];

  const newVersionsMap = getVersionMapForEntitlementsList(entitlements);

  // return as soon as one version is the same (meaning it hasn't been updated), or
  // as soon as the response doesn't have an entitlement (meaning search doesn't have the new entitlement yet)
  for (let [id, version] of currentVersionsMap) {
    if (!newVersionsMap.has(id) || version === newVersionsMap.get(id)) {
      return true;
    }
  }

  return false;
};

/**
 * Retries getting the count of entitlements in an order that haven't been updated.
 *
 * @param fetch
 * @param orderRequest
 * @param retryInterval
 * @param maxRetries
 */
export const waitUntilAllOrderEntitlementsAreUpdated = async (
  fetch: typeof window.fetch,
  orderRequest: OrderRequest,
  retryInterval = 2500,
  maxRetries = 8,
) => {
  const hasPendingUpdates = await autoRetry<boolean>(
    () => hasOrderEntitlementsPendingUpdate(fetch, orderRequest),
    (_hasPendingUpdates) => _hasPendingUpdates,
    retryInterval,
    maxRetries,
  );

  if (hasPendingUpdates) {
    throw new HttpResponseError(
      'order-entitlements-poll',
      504, // timeout code
      `Polling for entitlements in order "${orderRequest.orderId}" timed out after ${maxRetries} retries`,
    );
  }
};

/**
 * Place entitlements order (CREATE, DEACTIVATE, CANCEL, AMEND), waits until it's SUCESS,
 * and waits for all entitlements to be updated
 *
 * @param fetch
 * @param orderRequest
 *
 * CCP api gateaway (CCP API):
 *  - Api docs - {@link https://developer.atlassian.com/platform/commerce-cloud-platform/how-to/order/place-order/}
 */
export const placeOrderAndWaitForEntitlementsUpdate = async (
  fetch: typeof window.fetch,
  orderRequest: OrderRequest,
  retryInterval?: number,
  maxRetries?: number,
) => {
  await placeOrder(fetch, orderRequest);
  await waitUntilOrderSucceeds(
    fetch,
    orderRequest.transactionAccountId,
    orderRequest.orderId,
    retryInterval,
    maxRetries,
  );
  await waitUntilAllOrderEntitlementsAreUpdated(
    fetch,
    orderRequest,
    retryInterval,
    maxRetries,
  );
};

/**
 * service hook for {@link placeOrderAndWaitEntitlementsUpdate}

 * @param txaId
 */
export const usePlaceOrderAndWaitEntitlementsUpdate = (
  txaId: TransactionAccountId,
  retryInterval?: number,
  maxRetries?: number,
): UpdateServiceResult<
  void,
  [Omit<OrderRequest, 'transactionAccountId' | 'orderId'>]
> => {
  const fetch = useCommerceFetch();
  const _generateOrderId = useCommerceOverride(generateOrderId);
  return useUpdateService(
    useCallback(
      (orderRequest) =>
        placeOrderAndWaitForEntitlementsUpdate(
          fetch,
          {
            ...orderRequest,
            transactionAccountId: txaId,
            orderId: _generateOrderId(),
          },
          retryInterval,
          maxRetries,
        ),
      [fetch, _generateOrderId, txaId, retryInterval, maxRetries],
    ),
  );
};

/**
 * Using the entitlement information, it returns an optedUsageOptions object if possible or undefined.
 *
 * @param entitlement
 */
const getOptedUsageFromEntitlement = (
  entitlement: ExpandedEntitlement,
): OrderItemOptedUsageOptions | undefined =>
  entitlement.subscription &&
  entitlement.subscription.pricingPlanId && {
    trial: {
      skipTrial: true,
    },
    chargingDetails: {
      pricingPlanId: entitlement.subscription.pricingPlanId,
      chargeQuantities: entitlement.subscription.chargeQuantities,
    },
  };

/**
 * Given an expanded entitlement, returns a CANCELLATION_ORDER item with the information from the entitlement
 *
 * @param entitlement
 */
export const createCancellationOrderItem = (
  entitlement: ExpandedEntitlement,
): CancellationOrderItemRequest => ({
  entitlement: {
    id: entitlement.entitlementId,
    version: entitlement.version,
  },
  itemId: 1,
  type: 'CANCELLATION_ORDER',
});

/**
 * Given an expanded entitlement, returns a REACTIVATION_ORDER item with the information from the entitlement
 *
 * @param entitlement
 */
export const createReactivationOrderItem = (
  entitlement: ExpandedEntitlement,
): ReactivationOrderItemRequest => ({
  entitlement: {
    id: entitlement.entitlementId,
    version: entitlement.version,
  },
  itemId: 1,
  offeringId: entitlement.offering.key,
  optedUsageOptions: getOptedUsageFromEntitlement(entitlement),
  type: 'REACTIVATION_ORDER',
});

/**
 * Given an expanded entitlement, returns a AMENDMENT_ORDER item with the information from the entitlement
 *
 * @param entitlement
 * @param orderItemToMerge (optional) partial order item to be shallow merged to the final order item created from the entitlement
 */
export const createAmendmentOrderItem = (
  entitlement: ExpandedEntitlement,
  orderItemToMerge: Partial<Exclude<AmendmentOrderItemRequest, 'type'>> = {},
): AmendmentOrderItemRequest => ({
  entitlement: {
    id: entitlement.entitlementId,
    version: entitlement.version,
  },
  itemId: 1,
  offeringId: entitlement.offering.key,
  optedUsageOptions: getOptedUsageFromEntitlement(entitlement),
  ...orderItemToMerge,
  type: 'AMENDMENT_ORDER',
});
