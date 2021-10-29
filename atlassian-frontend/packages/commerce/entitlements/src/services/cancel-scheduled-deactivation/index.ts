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
  createAmendmentOrderItem,
  generateCancelDeactivationOrderId,
  placeOrderAndWaitForEntitlementsUpdate,
} from '../order';

/**
 * Cancel a scheduled deactivation by:
 * 1. Placing an 'AMENDMENT_ORDER' with the same offering and pricing plan
 * 2. Polling to check if the order succeeds and entitlement updates
 * An error is thrown if the entitlement does not have the required fields to make the amendment order
 *
 * @param fetch
 * @param txaId
 * @param entitlement
 * @param orderId
 */
export const cancelScheduledDeactivation = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  entitlement: ExpandedEntitlement,
  orderId: OrderId,
): Promise<void> => {
  if (!entitlement.subscription || !entitlement.subscription.pricingPlanId) {
    throw new Error('No subscription or pricingPlanId found in entitlement');
  }
  const orderItem = createAmendmentOrderItem(entitlement);
  await placeOrderAndWaitForEntitlementsUpdate(fetch, {
    transactionAccountId: txaId,
    invoiceGroupId: entitlement.subscription.invoiceGroupId,
    orderId,
    items: [orderItem],
  });
};

/**
 * service hook for {@link cancelScheduledDeactivation}
 * @param txaId
 */
export const useCancelScheduledDeactivation = (
  txaId: TransactionAccountId,
): UpdateServiceResult<void, [ExpandedEntitlement]> => {
  const fetch = useCommerceFetch();
  const generateOrderId = useCommerceOverride(
    generateCancelDeactivationOrderId,
  );
  return useUpdateService(
    useCallback(
      (entitlement: ExpandedEntitlement) =>
        cancelScheduledDeactivation(
          fetch,
          txaId,
          entitlement,
          generateOrderId(),
        ),
      [fetch, generateOrderId, txaId],
    ),
  );
};
