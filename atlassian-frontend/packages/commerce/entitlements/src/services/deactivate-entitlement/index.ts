import { useCallback } from 'react';

import {
  useCommerceFetch,
  useCommerceOverride,
} from '@atlassian/commerce-environment';
import {
  UpdateServiceResult,
  useUpdateService,
} from '@atlassian/commerce-service-hook';
import { TransactionAccountId } from '@atlassian/commerce-types';

import { ExpandedEntitlement, OrderId } from '../../common/types';
import {
  createCancellationOrderItem,
  generateCancellationOrderId,
  placeOrderAndWaitForEntitlementsUpdate,
} from '../order';
/**
 *
 * Deactivates an entitlement by:
 * 1. Creating a 'CANCELLATION_ORDER' (async)
 * 2. Polling to check if the order succeeds / throws error on timeout.
 *
 * CCP Order Controller API: https://ccp-api-gateway.staging.atl-paas.net/webjars/swagger-ui/index.html?configUrl=/openapi/swagger-config#/order-controller/create
 * How to deactivate an entitlement DOCS: https://developer.atlassian.com/platform/commerce-cloud-platform/how-to/order/place-order/#user-cancelling-existing-entitlement
 * @param fetch
 * @param txaId
 * @param entitlement
 * @param orderId
 * @returns
 */
export const deactivateEntitlement = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  entitlement: ExpandedEntitlement,
  orderId: OrderId,
): Promise<void> => {
  const orderItem = createCancellationOrderItem(entitlement);

  await placeOrderAndWaitForEntitlementsUpdate(fetch, {
    transactionAccountId: txaId,
    invoiceGroupId:
      entitlement.subscription && entitlement.subscription.invoiceGroupId,
    orderId,
    items: [orderItem],
  });
};

/**
 * service hook for {@link deactivateEntitlement}
 * @param txaId
 */
export const useDeactivateEntitlement = (
  txaId: TransactionAccountId,
): UpdateServiceResult<void, [ExpandedEntitlement]> => {
  const fetch = useCommerceFetch();
  const generateOrderId = useCommerceOverride(generateCancellationOrderId);
  return useUpdateService(
    useCallback(
      (entitlement: ExpandedEntitlement) =>
        deactivateEntitlement(fetch, txaId, entitlement, generateOrderId()),
      [fetch, generateOrderId, txaId],
    ),
  );
};
