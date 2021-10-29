import {
  created,
  IG_ID,
  networksScenarios,
  notFound,
  ok,
  serverFailure,
  TXA_ID,
  url,
} from '@atlassian/commerce-environment/mocks';

import {
  CANCEL_DEACTIVATION_ORDER_ID,
  CANCELLATION_ORDER_ID,
  MIXED_ORDER_ID,
  REACTIVATION_ORDER_ID,
  SP_ENTITLEMENT_1,
  SP_ENTITLEMENT_2,
  SP_ENTITLEMENT_3,
} from '../../common/mocks';
import {
  ExpandedEntitlement,
  OrderHumanReadableId,
  OrderItemId,
  OrderItemResponse,
  OrderItemType,
  OrderResponse,
  OrderStatus,
} from '../../common/types';

import { ORDERS_URL } from './index';

export const createMockedCancellationOrderIdGenerator = () => {
  return CANCELLATION_ORDER_ID;
};
export const createMockedReactivationOrderIdGenerator = () => {
  return REACTIVATION_ORDER_ID;
};
export const createMockedCancelDeactivationOrderIdGenerator = () => {
  return CANCEL_DEACTIVATION_ORDER_ID;
};

const createMockedOrderSlug = (modifier: string) =>
  `${modifier}-order-slug` as OrderHumanReadableId;

export const createOrderItemResponse = (
  entitlement: ExpandedEntitlement,
  type: OrderItemType,
  status: OrderStatus,
): OrderItemResponse => ({
  type,
  orderItemId: `${type}-order-item-id` as OrderItemId,
  offeringId: entitlement.offering.key,
  processingInfo: {
    entitlement: {
      id: entitlement.entitlementId,
      // ORDER service returns the version as a String, SEARCH service returns the version as number.
      // TODO: change to either string or number in the OrderItemResponse interface once both services agree on a response.
      version: entitlement.version.toString() as any,
    },
    status,
  },
});

export const SP_CANCELLATION_ORDER_RESPONSE_SUCCESS: OrderResponse = {
  transactionAccountId: TXA_ID,
  orderId: CANCELLATION_ORDER_ID,
  invoiceGroupId: IG_ID,
  slug: createMockedOrderSlug('CANCELLATION_ORDER'),
  items: [
    createOrderItemResponse(SP_ENTITLEMENT_1, 'CANCELLATION_ORDER', 'SUCCESS'),
  ],
};

export const SP_CANCELLATION_ORDER_RESPONSE_PROCESSING: OrderResponse = {
  transactionAccountId: TXA_ID,
  orderId: CANCELLATION_ORDER_ID,
  invoiceGroupId: IG_ID,
  slug: createMockedOrderSlug('CANCELLATION_ORDER'),
  items: [
    createOrderItemResponse(
      SP_ENTITLEMENT_1,
      'CANCELLATION_ORDER',
      'PROCESSING',
    ),
  ],
};

export const SP_REACTIVATION_ORDER_RESPONSE_SUCCESS: OrderResponse = {
  transactionAccountId: TXA_ID,
  orderId: REACTIVATION_ORDER_ID,
  invoiceGroupId: IG_ID,
  slug: createMockedOrderSlug('REACTIVATION_ORDER'),
  items: [
    createOrderItemResponse(SP_ENTITLEMENT_1, 'REACTIVATION_ORDER', 'SUCCESS'),
  ],
};

export const SP_REACTIVATION_ORDER_RESPONSE_PROCESSING: OrderResponse = {
  transactionAccountId: TXA_ID,
  orderId: REACTIVATION_ORDER_ID,
  invoiceGroupId: IG_ID,
  slug: createMockedOrderSlug('REACTIVATION_ORDER'),
  items: [
    createOrderItemResponse(
      SP_ENTITLEMENT_1,
      'REACTIVATION_ORDER',
      'PROCESSING',
    ),
  ],
};

export const SP_CANCEL_DEACTIVATION_ORDER_RESPONSE_SUCCESS: OrderResponse = {
  transactionAccountId: TXA_ID,
  orderId: CANCEL_DEACTIVATION_ORDER_ID,
  invoiceGroupId: IG_ID,
  slug: createMockedOrderSlug('CANCEL_DEACTIVATION_ORDER'),
  items: [
    createOrderItemResponse(SP_ENTITLEMENT_1, 'AMENDMENT_ORDER', 'SUCCESS'),
  ],
};

export const SP_CANCEL_DEACTIVATION_ORDER_RESPONSE_PROCESSING: OrderResponse = {
  transactionAccountId: TXA_ID,
  orderId: CANCEL_DEACTIVATION_ORDER_ID,
  invoiceGroupId: IG_ID,
  slug: createMockedOrderSlug('CANCEL_DEACTIVATION_ORDER'),
  items: [
    createOrderItemResponse(SP_ENTITLEMENT_1, 'AMENDMENT_ORDER', 'PROCESSING'),
  ],
};

export const MIXED_ITEMS_ORDER_RESPONSE_SUCCESS: OrderResponse = {
  transactionAccountId: TXA_ID,
  orderId: MIXED_ORDER_ID,
  invoiceGroupId: IG_ID,
  slug: createMockedOrderSlug('MIXED_ORDER'),
  items: [
    createOrderItemResponse(SP_ENTITLEMENT_1, 'REACTIVATION_ORDER', 'SUCCESS'),
    createOrderItemResponse(SP_ENTITLEMENT_2, 'CANCELLATION_ORDER', 'SUCCESS'),
    createOrderItemResponse(SP_ENTITLEMENT_3, 'AMENDMENT_ORDER', 'SUCCESS'),
  ],
};

export const MIXED_ITEMS_ORDER_RESPONSE_ALL_PROCESSING: OrderResponse = {
  transactionAccountId: TXA_ID,
  orderId: MIXED_ORDER_ID,
  invoiceGroupId: IG_ID,
  slug: createMockedOrderSlug('MIXED_ORDER'),
  items: [
    createOrderItemResponse(
      SP_ENTITLEMENT_1,
      'REACTIVATION_ORDER',
      'PROCESSING',
    ),
    createOrderItemResponse(
      SP_ENTITLEMENT_2,
      'CANCELLATION_ORDER',
      'PROCESSING',
    ),
    createOrderItemResponse(SP_ENTITLEMENT_3, 'AMENDMENT_ORDER', 'PROCESSING'),
  ],
};

export const MIXED_ITEMS_ORDER_RESPONSE_SOME_PROCESSING: OrderResponse = {
  transactionAccountId: TXA_ID,
  orderId: MIXED_ORDER_ID,
  invoiceGroupId: IG_ID,
  slug: createMockedOrderSlug('MIXED_ORDER'),
  items: [
    createOrderItemResponse(SP_ENTITLEMENT_1, 'REACTIVATION_ORDER', 'SUCCESS'),
    createOrderItemResponse(SP_ENTITLEMENT_2, 'CANCELLATION_ORDER', 'SUCCESS'),
    createOrderItemResponse(SP_ENTITLEMENT_3, 'AMENDMENT_ORDER', 'PROCESSING'),
  ],
};

export const scenarios = networksScenarios({
  placeOrderSuccess: {
    request: url(ORDERS_URL, 'POST'),
    response: created<undefined>(undefined),
  },
  placeOrderNotFoundFailure: {
    request: url(ORDERS_URL, 'POST'),
    response: notFound(),
  },
  placeOrderServerFailure: {
    request: url(ORDERS_URL, 'POST'),
    response: serverFailure(),
  },
  fetchCancellationOrderSuccess: {
    request: url(`${ORDERS_URL}/${CANCELLATION_ORDER_ID}`, 'GET'),
    response: ok<OrderResponse>(SP_CANCELLATION_ORDER_RESPONSE_SUCCESS),
  },
  fetchCancellationOrderProcessing: {
    request: url(`${ORDERS_URL}/${CANCELLATION_ORDER_ID}`, 'GET'),
    response: ok<OrderResponse>(SP_CANCELLATION_ORDER_RESPONSE_PROCESSING),
  },
  fetchCancellationOrderServerFailure: {
    request: url(`${ORDERS_URL}/${CANCELLATION_ORDER_ID}`, 'GET'),
    response: serverFailure(),
  },
  fetchReactivationOrderSuccess: {
    request: url(`${ORDERS_URL}/${REACTIVATION_ORDER_ID}`, 'GET'),
    response: ok<OrderResponse>(SP_REACTIVATION_ORDER_RESPONSE_SUCCESS),
  },
  fetchReactivationOrderProcessing: {
    request: url(`${ORDERS_URL}/${REACTIVATION_ORDER_ID}`, 'GET'),
    response: ok<OrderResponse>(SP_REACTIVATION_ORDER_RESPONSE_PROCESSING),
  },
  fetchReactivationOrderServerFailure: {
    request: url(`${ORDERS_URL}/${REACTIVATION_ORDER_ID}`, 'GET'),
    response: serverFailure(),
  },
  fetchCancelDeactivationOrderSuccess: {
    request: url(`${ORDERS_URL}/${CANCEL_DEACTIVATION_ORDER_ID}`, 'GET'),
    response: ok<OrderResponse>(SP_CANCEL_DEACTIVATION_ORDER_RESPONSE_SUCCESS),
  },
  fetchCancelDeactivationOrderProcessing: {
    request: url(`${ORDERS_URL}/${CANCEL_DEACTIVATION_ORDER_ID}`, 'GET'),
    response: ok<OrderResponse>(
      SP_CANCEL_DEACTIVATION_ORDER_RESPONSE_PROCESSING,
    ),
  },
  fetchCancelDeactivationOrderServerFailure: {
    request: url(`${ORDERS_URL}/${CANCEL_DEACTIVATION_ORDER_ID}`, 'GET'),
    response: serverFailure(),
  },
  fetchMixedOrderSuccess: {
    request: url(`${ORDERS_URL}/${MIXED_ORDER_ID}`, 'GET'),
    response: ok<OrderResponse>(MIXED_ITEMS_ORDER_RESPONSE_SUCCESS),
  },
  fetchMixedOrderAllProcessing: {
    request: url(`${ORDERS_URL}/${MIXED_ORDER_ID}`, 'GET'),
    response: ok<OrderResponse>(MIXED_ITEMS_ORDER_RESPONSE_ALL_PROCESSING),
  },
  fetchMixedOrderSomeProcessing: {
    request: url(`${ORDERS_URL}/${MIXED_ORDER_ID}`, 'GET'),
    response: ok<OrderResponse>(MIXED_ITEMS_ORDER_RESPONSE_SOME_PROCESSING),
  },
  fetchMixedOrderFailure: {
    request: url(`${ORDERS_URL}/${MIXED_ORDER_ID}`, 'GET'),
    response: serverFailure(),
  },
});
