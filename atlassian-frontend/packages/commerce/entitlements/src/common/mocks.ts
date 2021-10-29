import { IG_ID, IG_ID_2, TXA_ID } from '@atlassian/commerce-environment/mocks';
import { EpochDateTime, InvoiceGroupId } from '@atlassian/commerce-types';

import {
  Entitlement,
  EntitlementHumanReadableId,
  EntitlementId,
  ExpandedEntitlement,
  ExpandedOffering,
  OfferingKey,
  OrderId,
  OrderItemId,
  OrderItemType,
  OrderStatus,
  PricingPlan,
  PricingPlanId,
  Product,
  ProductKey,
  SubscriptionId,
  Trial,
} from './types';

export const MAY_20_2022_EPOCH = 1652176800000 as EpochDateTime; // Thu May 20 2022 10:00:00 GMT+0
export const JULY_10_2022_EPOCH = 1657447200000 as EpochDateTime; // Sun July 10 2022 10:00:00 GMT+0
export const JAN_01_2050_EPOCH = 2524644000000 as EpochDateTime; // Sat Jan 01 2050 10:00:00 GMT+0
const ZERO_EPOCH = 0 as EpochDateTime;

export const CANCELLATION_ORDER_ID = 'cancellation-order-uuid' as OrderId;
export const REACTIVATION_ORDER_ID = 'reactivation-order-uuid' as OrderId;
export const CANCEL_DEACTIVATION_ORDER_ID = '' as OrderId;
export const MIXED_ORDER_ID = 'mixed-order-uuid' as OrderId;

export const MOCKED_CHANGE_REASON = 'MOCKED_CHANGE_REASON';
export const CANCELLATION_CHANGE_REASON = 'CANCELLATION_ORDER';

// This is a real status page product key temporarily put here.
// We use a real value only because billing console needs display extra data depending on the product like a product logo.
// Long term product data would be fetch dynamically and we could have scenario that would match same "fake" product keys
// Or alternatively the component that would display the product information could be defined in this package and the product data could be hardcoded here
const statusPageProductKey = '0b8ea1e2-52df-11ea-8d77-2e728ce88125' as ProductKey;

const SP_PRICING_PLAN_ID = 'statuspage-pricing-plan-uuid' as PricingPlanId;
const LIRA_PRICING_PLAN_ID = 'lira-pricing-plan-uuid' as PricingPlanId;

const statusPageProduct: Product = {
  key: statusPageProductKey,
  name: 'Statuspage',
};

const statusPagePricingPlan: PricingPlan = {
  primaryCycle: {
    name: 'YEARLY',
    interval: 'YEAR',
  },
};

const statusPageFreeOffering: ExpandedOffering = {
  key: 'statuspage-free-uuid' as OfferingKey,
  name: 'Free',
  productKey: statusPageProductKey,
  pricingType: 'FREE',
  type: 'PARENT',
  product: statusPageProduct,
};

const statusPageOffering: ExpandedOffering = {
  key: 'statuspage-team-members-uuid' as OfferingKey,
  name: 'Team Members',
  productKey: statusPageProductKey,
  pricingType: 'PAID',
  type: 'PARENT',
  product: statusPageProduct,
};
const liraProductKey = 'lira-uuid' as ProductKey; // fake product

const liraPricingPlan: PricingPlan = {
  primaryCycle: {
    name: 'MONTHLY',
    interval: 'MONTH',
  },
};

const liraProduct: Product = {
  key: liraProductKey,
  name: 'Lira',
};

const liraOffering: ExpandedOffering = {
  key: 'lira-standard-uuid' as OfferingKey,
  name: 'Standard',
  productKey: liraProductKey,
  pricingType: 'LIMITED_FREE',
  type: 'PARENT',
  product: liraProduct,
};

const trial: Trial = {
  startTimestamp: MAY_20_2022_EPOCH,
  endTimestamp: JAN_01_2050_EPOCH,
};

const createExpandedOfferingAndOrder = (
  entitlement: Entitlement | ExpandedEntitlement,
  offering: ExpandedOffering,
  orderType: OrderItemType = 'CREATION_ORDER',
) => ({
  offering,
  order: {
    id: entitlement.order.id,
    item: {
      type: orderType,
      orderItemId: `${entitlement.order.id}-${entitlement.version}` as OrderItemId,
      offeringId: offering.key,
      processingInfo: {
        entitlement: {
          id: entitlement.entitlementId,
          version: entitlement.version,
        },
        status: 'SUCCESS' as OrderStatus,
      },
    },
  },
});

const entitlementIdModifier = (
  numberToMakeIdsUnique: number,
  entitlementStatusActive: boolean,
): string => `${numberToMakeIdsUnique}${entitlementStatusActive ? '' : '-I'}`;

export const createStatusPageEntitlement = (
  numberToMakeIdsUnique: number,
  version = 1,
  entitlementStatusActive = true,
): Entitlement => {
  const modifier = entitlementIdModifier(
    numberToMakeIdsUnique,
    entitlementStatusActive,
  );
  return {
    entitlementId: `statuspage-entitlement-uuid-${modifier}` as EntitlementId,
    transactionAccountId: TXA_ID,
    slug: `E-123-123-123-${modifier}` as EntitlementHumanReadableId,
    status: entitlementStatusActive ? 'ACTIVE' : 'INACTIVE',
    version: version,
    changeReason: MOCKED_CHANGE_REASON,
    order: {
      id: `statuspage-order-uuid-${modifier}` as OrderId,
    },
  };
};

export const createStatusPageExpandedEntitlement = (
  numberToMakeIdsUnique: number,
  nextBillingTimestamp: EpochDateTime,
  invoiceGroupId: InvoiceGroupId,
  entitlementStatusActive = true,
  subscriptionStatusActive = true,
  version = 1,
): ExpandedEntitlement => {
  const entitlement = createStatusPageEntitlement(
    numberToMakeIdsUnique,
    version,
    entitlementStatusActive,
  );
  return {
    ...entitlement,
    ...createExpandedOfferingAndOrder(entitlement, statusPageOffering),
    subscription: {
      id: `statuspage-subscription-uuid-${numberToMakeIdsUnique}` as SubscriptionId,
      nextBillingTimestamp,
      endTimestamp: ZERO_EPOCH,
      invoiceGroupId,
      status: subscriptionStatusActive ? 'ACTIVE' : 'CANCELLED',
      pricingPlan: statusPagePricingPlan,
      pricingPlanId: SP_PRICING_PLAN_ID,
      chargeQuantities: [
        {
          quantity: 1,
          chargeElement: 'unit',
        },
      ],
    },
  };
};

export const createStatusPageFreeEntitlement = (
  numberToMakeIdsUnique: number,
  active = true,
  version = 1,
): ExpandedEntitlement => {
  const modifier = entitlementIdModifier(numberToMakeIdsUnique, active);
  const entitlement: Entitlement = {
    entitlementId: `statuspage-free-entitlement-uuid-${modifier}` as EntitlementId,
    transactionAccountId: TXA_ID,
    slug: `E-123-123-123-${modifier}` as EntitlementHumanReadableId,
    status: active ? 'ACTIVE' : 'INACTIVE',
    version: version,
    changeReason: MOCKED_CHANGE_REASON,
    order: {
      id: `statuspage-order-uuid-${numberToMakeIdsUnique}` as OrderId,
    },
  };
  return {
    ...entitlement,
    ...createExpandedOfferingAndOrder(entitlement, statusPageFreeOffering),
  };
};

export const createLiraEntitlement = (
  numberToMakeIdsUnique: number,
  nextBillingTimestamp: EpochDateTime,
  invoiceGroupId: InvoiceGroupId,
  entitlementStatusActive = true,
  subscriptionStatusActive = true,
  version = 1,
): ExpandedEntitlement => {
  const modifier = entitlementIdModifier(
    numberToMakeIdsUnique,
    entitlementStatusActive,
  );
  const entitlement: Entitlement = {
    entitlementId: `lira-entitlement-uuid-${modifier}` as EntitlementId,
    transactionAccountId: TXA_ID,
    changeReason: MOCKED_CHANGE_REASON,
    slug: `E-123-123-123-${modifier}` as EntitlementHumanReadableId,
    status: entitlementStatusActive ? 'ACTIVE' : 'INACTIVE',
    version: version,
    order: {
      id: `lira-order-uuid-${modifier}` as OrderId,
    },
  };
  return {
    ...entitlement,
    ...createExpandedOfferingAndOrder(entitlement, liraOffering),
    subscription: {
      id: `lira-subscription-uuid-${modifier}` as SubscriptionId,
      nextBillingTimestamp,
      endTimestamp: ZERO_EPOCH,
      invoiceGroupId,
      status: subscriptionStatusActive ? 'ACTIVE' : 'CANCELLED',
      pricingPlan: liraPricingPlan,
      pricingPlanId: LIRA_PRICING_PLAN_ID,
      chargeQuantities: [
        {
          quantity: 1,
          chargeElement: 'unit',
        },
      ],
    },
  };
};

export const createPendingCancellationEntitlement = (
  entitlement: ExpandedEntitlement,
): ExpandedEntitlement => ({
  ...entitlement,
  entitlementId: `${entitlement.entitlementId}-C` as EntitlementId,
  slug: `${entitlement.slug}-C` as EntitlementHumanReadableId,
  changeReason: CANCELLATION_CHANGE_REASON,
  version: entitlement.version + 1,
  subscription: entitlement.subscription && {
    ...entitlement.subscription,
    endTimestamp: entitlement.subscription.nextBillingTimestamp,
    scheduledChanges: {
      subscriptionScheduleAction: 'CANCEL',
    },
  },
  order: {
    ...entitlement.order,
    item: {
      ...entitlement.order.item,
      type: 'CANCELLATION_ORDER',
    },
  },
});

export const createCancelledEntitlement = (
  entitlement: ExpandedEntitlement,
): ExpandedEntitlement => ({
  ...createPendingCancellationEntitlement(entitlement),
  entitlementId: `CANCELLED-${entitlement.entitlementId}` as EntitlementId,
  slug: `CANCELLED-${entitlement.slug}` as EntitlementHumanReadableId,
  subscription: entitlement.subscription && {
    ...entitlement.subscription,
    status: 'CANCELLED',
  },
});

export const createTrialForEntitlement = (
  entitlement: ExpandedEntitlement,
  trial: Trial,
): ExpandedEntitlement => ({
  ...entitlement,
  entitlementId: `TRIAL-${entitlement.entitlementId}` as EntitlementId,
  slug: `TRIAL-${entitlement.slug}` as EntitlementHumanReadableId,
  subscription: entitlement.subscription && {
    ...entitlement.subscription,
    trial,
  },
});

export const SP_ENTITLEMENT_1 = createStatusPageExpandedEntitlement(
  1,
  MAY_20_2022_EPOCH,
  IG_ID,
);
export const SP_ENTITLEMENT_1_UPDATED = {
  ...SP_ENTITLEMENT_1,
  version: SP_ENTITLEMENT_1.version + 1,
};
export const SP_ENTITLEMENT_INACTIVE = createStatusPageExpandedEntitlement(
  1,
  MAY_20_2022_EPOCH,
  IG_ID,
  false,
  false,
);
export const SP_ENTITLEMENT_PENDING_CANCELLATION = createPendingCancellationEntitlement(
  SP_ENTITLEMENT_1,
);

export const SP_ENTITLEMENT_CANCELLED = createCancelledEntitlement(
  SP_ENTITLEMENT_1,
);

export const SP_ENTITLEMENT_2 = createStatusPageExpandedEntitlement(
  2,
  JULY_10_2022_EPOCH,
  IG_ID,
);
export const SP_ENTITLEMENT_2_UPDATED = {
  ...SP_ENTITLEMENT_2,
  version: SP_ENTITLEMENT_2.version + 1,
};
export const SP_ENTITLEMENT_3 = createStatusPageExpandedEntitlement(
  4,
  JULY_10_2022_EPOCH,
  IG_ID_2,
);
export const SP_ENTITLEMENT_3_UPDATED: ExpandedEntitlement = {
  ...SP_ENTITLEMENT_3,
  version: SP_ENTITLEMENT_3.version + 1,
};

export const FREE_SP_ENTITLEMENT = createStatusPageFreeEntitlement(5);
export const FREE_SP_ENTITLEMENT_INACTIVE = createStatusPageFreeEntitlement(
  5,
  false,
);
export const LIRA_ENTITLEMENT = createLiraEntitlement(
  3,
  MAY_20_2022_EPOCH,
  IG_ID,
);
export const LIRA_ENTITLEMENT_INACTIVE = createLiraEntitlement(
  6,
  MAY_20_2022_EPOCH,
  IG_ID,
  false,
  false,
);
export const LIRA_ENTITLEMENT_PENDING_CANCELLATION = createPendingCancellationEntitlement(
  LIRA_ENTITLEMENT,
);
export const LIRA_ENTITLEMENT_CANCELLED = createCancelledEntitlement(
  LIRA_ENTITLEMENT,
);
export const LIRA_ENTITLEMENT_TRIAL = createTrialForEntitlement(
  LIRA_ENTITLEMENT,
  trial,
);
