import { EpochDateTime } from '@atlassian/commerce-types';

import { ExpandedEntitlement } from '../types';

export const getPendingCancellationDate = (
  entitlement: ExpandedEntitlement,
): EpochDateTime | undefined => {
  if (
    entitlement.status === 'ACTIVE' &&
    entitlement.order.item?.type === 'CANCELLATION_ORDER' &&
    entitlement.subscription?.status === 'ACTIVE' &&
    entitlement.subscription?.endTimestamp
  ) {
    return entitlement.subscription.endTimestamp;
  }

  return undefined;
};
