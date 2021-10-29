import {
  EpochDateTime,
  InvoiceGroupId,
  Opaque,
  TransactionAccountId,
} from '@atlassian/commerce-types';

export type ProductKey = Opaque<string>;
export type Product = {
  key: ProductKey;
  name: string;
};

export type OfferingKey = Opaque<string>;
export type Offering = {
  key: OfferingKey;
  name: string;
  productKey: ProductKey;
  pricingType: 'PAID' | 'FREE' | 'LIMITED_FREE';
  type: 'PARENT' | 'CHILDREN';
};

export type ExpandedOffering = Offering & {
  product: Product;
};
export type PricingPlan = {
  primaryCycle: {
    name: string;
    interval: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
    count?: number; // 1 if not set
  };
};

/**
 * Note: startDate field is due to change to nextCycleChange.changeTimestamp at subscription_search_event_v2.0
 * https://hello.atlassian.net/wiki/spaces/tintin/pages/1290502945/Subscription+Events+-+Search+Events
 */
export type ScheduledChange = {
  subscriptionScheduleAction: 'CANCEL' | 'UPDATE' | string;
};
export type SubscriptionId = Opaque<string>;
export type SubscriptionStatus = 'CREATING' | 'ACTIVE' | 'CANCELLED';
export type PricingPlanId = Opaque<string>;
export type TrialScheduled = {
  startTimestamp: EpochDateTime;
  endTimestamp: EpochDateTime;
};
export type TrialNull = {
  startTimestamp: null;
  endTimestamp: null;
};
export type Trial = TrialScheduled | TrialNull;

/**
 * Note: schedule field is due to change to scheduledChanges at subscription_search_event_v2.0
 * https://hello.atlassian.net/wiki/spaces/tintin/pages/1290502945/Subscription+Events+-+Search+Events
 */
export type Subscription = {
  id: SubscriptionId;
  nextBillingTimestamp: EpochDateTime;
  endTimestamp: EpochDateTime;
  invoiceGroupId: InvoiceGroupId;
  status: SubscriptionStatus;
  scheduledChanges?: ScheduledChange;
  pricingPlanId?: PricingPlanId;
  chargeQuantities: ChargeQuantity[];
};
export type ExpandedSubscription = Subscription & {
  pricingPlan: PricingPlan;
  trial?: Trial;
};
export type ChargeElement = 'unit' | 'user';
export type ChargeQuantity = {
  quantity: number;
  chargeElement: ChargeElement;
};

export type EntitlementId = Opaque<string>;
export type EntitlementHumanReadableId = Opaque<string>;
export type EntitlementStatus = 'ACTIVE' | 'INACTIVE';
export type Entitlement = {
  changeReason: 'CANCELLATION_ORDER' | string;
  entitlementId: EntitlementId;
  transactionAccountId: TransactionAccountId;
  slug: EntitlementHumanReadableId;
  status: EntitlementStatus;
  version: number;
  order: {
    id: OrderId;
  };
};
export type ExpandedEntitlement = Entitlement & {
  offering: ExpandedOffering;
  subscription?: ExpandedSubscription;
  order: {
    item: OrderItemResponse;
  };
};

export type OrderId = Opaque<string>;
export type OrderHumanReadableId = Opaque<string>;
export type OrderItemId = Opaque<string>;
export type OrderItemType =
  | 'CREATION_ORDER'
  | 'AMENDMENT_ORDER'
  | 'CANCELLATION_ORDER'
  | 'REACTIVATION_ORDER';
export type OrderStatus = 'SUCCESS' | 'PROCESSING';
export type OrderEntitlement = {
  id: EntitlementId;
  version: number;
};
export type OrderItemOptedUsageOptions = {
  trial: {
    skipTrial: boolean;
  };
  chargingDetails?: {
    pricingPlanId: PricingPlanId;
    chargeQuantities?: ChargeQuantity[];
  };
};

export type OrderItemResponse = {
  type: OrderItemType;
  orderItemId: OrderItemId;
  offeringId: OfferingKey;
  processingInfo: {
    entitlement: OrderEntitlement;
    status: OrderStatus;
  };
};
export type OrderResponse = {
  orderId: OrderId;
  slug: OrderHumanReadableId;
  transactionAccountId: TransactionAccountId;
  invoiceGroupId?: InvoiceGroupId;
  items: OrderItemResponse[];
};

interface OrderItemRequestBase {
  type: OrderItemType;
  entitlement: OrderEntitlement;
  itemId: number;
}

export interface CancellationOrderItemRequest extends OrderItemRequestBase {
  type: 'CANCELLATION_ORDER';
}

export interface CreationOrderItemRequest extends OrderItemRequestBase {
  type: 'CREATION_ORDER';
  offeringId: OfferingKey;
  optedUsageOptions?: OrderItemOptedUsageOptions;
}

export interface ReactivationOrderItemRequest extends OrderItemRequestBase {
  type: 'REACTIVATION_ORDER';
  offeringId: OfferingKey;
  optedUsageOptions?: OrderItemOptedUsageOptions;
}

export interface AmendmentOrderItemRequest extends OrderItemRequestBase {
  type: 'AMENDMENT_ORDER';
  offeringId: OfferingKey;
  optedUsageOptions?: OrderItemOptedUsageOptions;
}

export type OrderItemRequest =
  | CreationOrderItemRequest
  | CancellationOrderItemRequest
  | ReactivationOrderItemRequest
  | AmendmentOrderItemRequest;

export type OrderRequest = {
  orderId: OrderId;
  transactionAccountId: TransactionAccountId;
  invoiceGroupId?: InvoiceGroupId;
  items: OrderItemRequest[];
};
