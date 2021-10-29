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
  createReactivationOrderItem,
  generateReactivationOrderId,
  placeOrderAndWaitForEntitlementsUpdate,
} from '../order';
/**
 *
 * Reactivates an entitlement by:
 * 1. Creating a 'REACTIVATION_ORDER'
 * 2. Polling to check if the order succeeds / throws error on timeout.
 *
 * CCP Order Controller API: https://ccp-api-gateway.staging.atl-paas.net/webjars/swagger-ui/index.html?configUrl=/openapi/swagger-config#/order-controller/create
 * How to reactivate an entitlement DOCS: https://developer.atlassian.com/platform/commerce-cloud-platform/how-to/order/place-order/#user-wants-to--reactivate-of-cancelled-entitlement
 * @param fetch
 * @param txaId
 * @param entitlement
 * @param orderId
 * @returns
 */
export const reactivateEntitlement = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  entitlement: ExpandedEntitlement,
  orderId: OrderId,
): Promise<void> => {
  const orderItem = createReactivationOrderItem(entitlement);

  await placeOrderAndWaitForEntitlementsUpdate(fetch, {
    transactionAccountId: txaId,
    invoiceGroupId:
      entitlement.subscription && entitlement.subscription.invoiceGroupId,
    orderId,
    items: [orderItem],
  });
};

/**
 * service hook for {@link reactivateEntitlement}
 * @param txaId
 */
export const useReactivateEntitlement = (
  txaId: TransactionAccountId,
): UpdateServiceResult<void, [ExpandedEntitlement]> => {
  const fetch = useCommerceFetch();
  const generateOrderId = useCommerceOverride(generateReactivationOrderId);
  return useUpdateService(
    useCallback(
      (entitlement: ExpandedEntitlement) =>
        reactivateEntitlement(fetch, txaId, entitlement, generateOrderId()),
      [fetch, generateOrderId, txaId],
    ),
  );
};
