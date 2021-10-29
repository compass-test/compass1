import {
  fetchMock,
  IG_ID,
  scenarioToRequestPredicate,
  scenarioToResponse,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';

import {
  MIXED_ORDER_ID,
  SP_ENTITLEMENT_1,
  SP_ENTITLEMENT_2,
  SP_ENTITLEMENT_3,
} from '../../common/mocks';
import { scenarios as entitlementScenarios } from '../fetch-entitlements/mocks';
import {
  createAmendmentOrderItem,
  createCancellationOrderItem,
  createReactivationOrderItem,
  placeOrderAndWaitForEntitlementsUpdate,
  waitUntilAllOrderEntitlementsAreUpdated,
  waitUntilOrderSucceeds,
} from '../order';
import { scenarios as orderScenarios } from '../order/mocks';

const placeOrderRequest = scenarioToRequestPredicate(
  orderScenarios.placeOrderSuccess,
);
const placeOrderSuccessResponse = scenarioToResponse(
  orderScenarios.placeOrderSuccess,
);
const placeOrderFailureResponse = scenarioToResponse(
  orderScenarios.placeOrderServerFailure,
);

const fetchOrderRequest = scenarioToRequestPredicate(
  orderScenarios.fetchMixedOrderSuccess,
);
const fetchOrderSuccessResponse = scenarioToResponse(
  orderScenarios.fetchMixedOrderSuccess,
);
const fetchOrderAllProcessingResponse = scenarioToResponse(
  orderScenarios.fetchMixedOrderAllProcessing,
);
const fetchOrderSomeProcessingResponse = scenarioToResponse(
  orderScenarios.fetchMixedOrderSomeProcessing,
);
const fetchOrderFailureResponse = scenarioToResponse(
  orderScenarios.fetchMixedOrderFailure,
);

const fetchOrderEntitlementsRequest = scenarioToRequestPredicate(
  entitlementScenarios.fetchEntitlementsForOrderIdSuccess,
);
const fetchOrderEntitlementsSuccessResponse = scenarioToResponse(
  entitlementScenarios.fetchEntitlementsForOrderIdSuccess,
);
const fetchOrderEntitlementsUpdatedSuccessResponse = scenarioToResponse(
  entitlementScenarios.fetchEntitlementsForOrderIdUpdatedSuccess,
);
const fetchOrderEntitlementsFailureResponse = scenarioToResponse(
  entitlementScenarios.fetchEntitlementsForOrderIdFailure,
);

const orderRequest = {
  transactionAccountId: TXA_ID,
  invoiceGroupid: IG_ID,
  orderId: MIXED_ORDER_ID,
  items: [
    createReactivationOrderItem(SP_ENTITLEMENT_1),
    createCancellationOrderItem(SP_ENTITLEMENT_2),
    createAmendmentOrderItem(SP_ENTITLEMENT_3),
  ],
};

describe('poll order status', () => {
  test('succeeds on first try', async () => {
    const fetch = fetchMock([
      {
        request: fetchOrderRequest,
        response: fetchOrderSuccessResponse,
      },
    ]);

    const result = waitUntilOrderSucceeds(fetch, TXA_ID, MIXED_ORDER_ID);

    await expect(result).resolves.toEqual(undefined);
  });

  test('succeeds on last try ', async () => {
    const fetch = fetchMock([
      {
        request: fetchOrderRequest,
        response: [
          fetchOrderAllProcessingResponse,
          fetchOrderAllProcessingResponse,
          fetchOrderSomeProcessingResponse,
          fetchOrderSomeProcessingResponse,
          fetchOrderSuccessResponse,
        ],
      },
    ]);

    const result = waitUntilOrderSucceeds(
      fetch,
      TXA_ID,
      MIXED_ORDER_ID,
      300,
      4,
    );

    await expect(result).resolves.toEqual(undefined);
  });

  test('fails after exceeding max retries', async () => {
    const fetch = fetchMock([
      {
        request: fetchOrderRequest,
        response: [
          fetchOrderAllProcessingResponse,
          fetchOrderAllProcessingResponse,
          fetchOrderSomeProcessingResponse,
          fetchOrderSomeProcessingResponse,
          fetchOrderSuccessResponse,
        ],
      },
    ]);

    const result = waitUntilOrderSucceeds(
      fetch,
      TXA_ID,
      MIXED_ORDER_ID,
      300,
      3,
    );

    await expect(result).rejects.toBeInstanceOf(Error);
  });

  test('fails after server error', async () => {
    const fetch = fetchMock([
      {
        request: fetchOrderRequest,
        response: fetchOrderFailureResponse,
      },
    ]);

    const result = waitUntilOrderSucceeds(fetch, TXA_ID, MIXED_ORDER_ID);

    await expect(result).rejects.toBeInstanceOf(Error);
  });
});

describe('poll order entitlements status', () => {
  test('succeeds on first try', async () => {
    const fetch = fetchMock([
      {
        request: fetchOrderEntitlementsRequest,
        response: fetchOrderEntitlementsUpdatedSuccessResponse,
      },
    ]);

    const result = waitUntilAllOrderEntitlementsAreUpdated(fetch, orderRequest);

    await expect(result).resolves.toEqual(undefined);
  });

  test('succeeds on last try ', async () => {
    const fetch = fetchMock([
      {
        request: fetchOrderEntitlementsRequest,
        response: [
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsUpdatedSuccessResponse,
        ],
      },
    ]);

    const result = waitUntilAllOrderEntitlementsAreUpdated(
      fetch,
      orderRequest,
      300,
      4,
    );

    await expect(result).resolves.toEqual(undefined);
  });

  test('fails after exceeding max retries', async () => {
    const fetch = fetchMock([
      {
        request: fetchOrderEntitlementsRequest,
        response: [
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsUpdatedSuccessResponse,
        ],
      },
    ]);

    const result = waitUntilAllOrderEntitlementsAreUpdated(
      fetch,
      orderRequest,
      300,
      3,
    );

    await expect(result).rejects.toBeInstanceOf(Error);
  });

  test('fails after server error', async () => {
    const fetch = fetchMock([
      {
        request: fetchOrderEntitlementsRequest,
        response: fetchOrderEntitlementsFailureResponse,
      },
    ]);

    const result = waitUntilAllOrderEntitlementsAreUpdated(fetch, orderRequest);

    await expect(result).rejects.toBeInstanceOf(Error);
  });
});

describe('place order and wait entitlements update', () => {
  test('succeeds on first try', async () => {
    const fetch = fetchMock([
      {
        request: placeOrderRequest,
        response: placeOrderSuccessResponse,
      },
      {
        request: fetchOrderRequest,
        response: fetchOrderSuccessResponse,
      },
      {
        request: fetchOrderEntitlementsRequest,
        response: fetchOrderEntitlementsUpdatedSuccessResponse,
      },
    ]);

    const result = placeOrderAndWaitForEntitlementsUpdate(fetch, orderRequest);

    await expect(result).resolves.toEqual(undefined);
  });

  test('succeeds on last try', async () => {
    const fetch = fetchMock([
      {
        request: placeOrderRequest,
        response: placeOrderSuccessResponse,
      },
      {
        request: fetchOrderRequest,
        response: [
          fetchOrderAllProcessingResponse,
          fetchOrderAllProcessingResponse,
          fetchOrderSomeProcessingResponse,
          fetchOrderSomeProcessingResponse,
          fetchOrderSuccessResponse,
        ],
      },
      {
        request: fetchOrderEntitlementsRequest,
        response: [
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsUpdatedSuccessResponse,
        ],
      },
    ]);

    const result = placeOrderAndWaitForEntitlementsUpdate(
      fetch,
      orderRequest,
      300,
      4,
    );

    await expect(result).resolves.toEqual(undefined);
  });

  test('fails after server error', async () => {
    const fetch = fetchMock([
      {
        request: placeOrderRequest,
        response: placeOrderFailureResponse,
      },
      {
        request: fetchOrderRequest,
        response: fetchOrderSuccessResponse,
      },
      {
        request: fetchOrderEntitlementsRequest,
        response: fetchOrderEntitlementsUpdatedSuccessResponse,
      },
    ]);

    const result = placeOrderAndWaitForEntitlementsUpdate(fetch, orderRequest);

    await expect(result).rejects.toBeInstanceOf(Error);
  });

  test('fails after exceeding max retries on order status poll', async () => {
    const fetch = fetchMock([
      {
        request: placeOrderRequest,
        response: placeOrderSuccessResponse,
      },
      {
        request: fetchOrderRequest,
        response: [
          fetchOrderAllProcessingResponse,
          fetchOrderAllProcessingResponse,
          fetchOrderSomeProcessingResponse,
          fetchOrderSomeProcessingResponse,
          fetchOrderSuccessResponse,
        ],
      },
      {
        request: fetchOrderEntitlementsRequest,
        response: fetchOrderEntitlementsUpdatedSuccessResponse,
      },
    ]);

    const result = placeOrderAndWaitForEntitlementsUpdate(
      fetch,
      orderRequest,
      300,
      3,
    );

    await expect(result).rejects.toBeInstanceOf(Error);
  });

  test('fails after exceeding max retries on entitlements status poll', async () => {
    const fetch = fetchMock([
      {
        request: placeOrderRequest,
        response: placeOrderSuccessResponse,
      },
      {
        request: fetchOrderRequest,
        response: fetchOrderSuccessResponse,
      },
      {
        request: fetchOrderEntitlementsRequest,
        response: [
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsSuccessResponse,
          fetchOrderEntitlementsUpdatedSuccessResponse,
        ],
      },
    ]);

    const result = placeOrderAndWaitForEntitlementsUpdate(
      fetch,
      orderRequest,
      300,
      3,
    );

    await expect(result).rejects.toBeInstanceOf(Error);
  });
});
