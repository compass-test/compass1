import React from 'react';

import { renderHook } from '@testing-library/react-hooks';

import {
  CommerceMockedEnvironment,
  fetchMock,
  scenarioToRequestPredicate,
  scenarioToResponse,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';

import { CANCELLATION_ORDER_ID, SP_ENTITLEMENT_1 } from '../../common/mocks';
import { orderIdGeneratorOverrides } from '../../mocks';
import { scenarios as entitlementScenarios } from '../fetch-entitlements/mocks';
import { scenarios as orderScenarios } from '../order/mocks';

import { deactivateEntitlement, useDeactivateEntitlement } from './index';

describe('deactivation service', () => {
  const placeCancellationOrderRequest = scenarioToRequestPredicate(
    orderScenarios.placeOrderSuccess,
  );
  const fetchCancellationOrderRequest = scenarioToRequestPredicate(
    orderScenarios.fetchCancellationOrderSuccess,
  );

  const placeCancellationOrderSuccessResponse = scenarioToResponse(
    orderScenarios.placeOrderSuccess,
  );
  const placeCancellationOrderFailureResponse = scenarioToResponse(
    orderScenarios.placeOrderNotFoundFailure,
  );
  const fetchCancellationOrderSuccessResponse = scenarioToResponse(
    orderScenarios.fetchCancellationOrderSuccess,
  );
  const fetchCancellationOrderFailureResponse = scenarioToResponse(
    orderScenarios.fetchCancellationOrderServerFailure,
  );

  const fetchOrderEntitlementsRequest = scenarioToRequestPredicate(
    entitlementScenarios.fetchEntitlementsForOrderIdSuccess,
  );
  const fetchOrderEntitlementsUpdatedSuccessResponse = scenarioToResponse(
    entitlementScenarios.fetchEntitlementsForOrderIdUpdatedSuccess,
  );
  const fetchOrderEntitlementsFailureResponse = scenarioToResponse(
    entitlementScenarios.fetchEntitlementsForOrderIdFailure,
  );

  test('succeeds', async () => {
    const fetch = fetchMock([
      {
        request: placeCancellationOrderRequest,
        response: placeCancellationOrderSuccessResponse,
      },
      {
        request: fetchCancellationOrderRequest,
        response: fetchCancellationOrderSuccessResponse,
      },
      {
        request: fetchOrderEntitlementsRequest,
        response: fetchOrderEntitlementsUpdatedSuccessResponse,
      },
    ]);
    // Note: as long as mocked version is higher, it will pass
    const result = deactivateEntitlement(
      fetch,
      TXA_ID,
      SP_ENTITLEMENT_1,
      CANCELLATION_ORDER_ID,
    );

    await expect(result).resolves.toEqual(undefined);
  });

  test('fails on order creation', async () => {
    const fetch = fetchMock([
      {
        request: placeCancellationOrderRequest,
        response: placeCancellationOrderFailureResponse,
      },
    ]);

    const result = deactivateEntitlement(
      fetch,
      TXA_ID,
      SP_ENTITLEMENT_1,
      CANCELLATION_ORDER_ID,
    );

    await expect(result).rejects.toBeInstanceOf(Error);
  });

  test('fails on fetch order processing', async () => {
    const fetch = fetchMock([
      {
        request: placeCancellationOrderRequest,
        response: placeCancellationOrderSuccessResponse,
      },
      {
        request: fetchCancellationOrderRequest,
        response: fetchCancellationOrderFailureResponse,
      },
    ]);

    const result = deactivateEntitlement(
      fetch,
      TXA_ID,
      SP_ENTITLEMENT_1,
      CANCELLATION_ORDER_ID,
    );

    await expect(result).rejects.toBeInstanceOf(Error);
  });

  test('fails on fetch entitlement', async () => {
    const fetch = fetchMock([
      {
        request: placeCancellationOrderRequest,
        response: placeCancellationOrderSuccessResponse,
      },
      {
        request: fetchCancellationOrderRequest,
        response: fetchCancellationOrderSuccessResponse,
      },
      {
        request: fetchOrderEntitlementsRequest,
        response: fetchOrderEntitlementsFailureResponse,
      },
    ]);

    const result = deactivateEntitlement(
      fetch,
      TXA_ID,
      SP_ENTITLEMENT_1,
      CANCELLATION_ORDER_ID,
    );

    await expect(result).rejects.toBeInstanceOf(Error);
  });
});

test('use deactivation service succeeds', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useDeactivateEntitlement(TXA_ID),
    {
      wrapper: ({ children }) => (
        <CommerceMockedEnvironment
          scenarios={[
            orderScenarios.placeOrderSuccess,
            orderScenarios.fetchCancellationOrderSuccess,
            entitlementScenarios.fetchEntitlementsForOrderIdUpdatedSuccess,
          ]}
          overrides={orderIdGeneratorOverrides}
        >
          {children}
        </CommerceMockedEnvironment>
      ),
    },
  );

  result.current.update(SP_ENTITLEMENT_1);

  await waitForNextUpdate();

  expect(result.current.data).toEqual(undefined);
});
