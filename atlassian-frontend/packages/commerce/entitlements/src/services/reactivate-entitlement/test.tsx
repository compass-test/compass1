import React from 'react';

import { renderHook } from '@testing-library/react-hooks';

import {
  CommerceMockedEnvironment,
  fetchMock,
  scenarioToRequestPredicate,
  scenarioToResponse,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';

import { REACTIVATION_ORDER_ID, SP_ENTITLEMENT_1 } from '../../common/mocks';
import { orderIdGeneratorOverrides } from '../../mocks';
import { scenarios as entitlementScenarios } from '../fetch-entitlements/mocks';
import { scenarios as orderScenarios } from '../order/mocks';

import { reactivateEntitlement, useReactivateEntitlement } from './index';

describe('reactivation service', () => {
  const placeReactivationOrderRequest = scenarioToRequestPredicate(
    orderScenarios.placeOrderSuccess,
  );
  const fetchReactivationOrderRequest = scenarioToRequestPredicate(
    orderScenarios.fetchReactivationOrderSuccess,
  );

  const placeReactivationOrderSuccessResponse = scenarioToResponse(
    orderScenarios.placeOrderSuccess,
  );
  const placeReactivationOrderFailureResponse = scenarioToResponse(
    orderScenarios.placeOrderNotFoundFailure,
  );
  const fetchReactivationOrderSuccessResponse = scenarioToResponse(
    orderScenarios.fetchReactivationOrderSuccess,
  );
  const fetchReactivationOrderFailureResponse = scenarioToResponse(
    orderScenarios.fetchReactivationOrderServerFailure,
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

  test('reactivation succeeds', async () => {
    const fetch = fetchMock([
      {
        request: placeReactivationOrderRequest,
        response: placeReactivationOrderSuccessResponse,
      },
      {
        request: fetchReactivationOrderRequest,
        response: fetchReactivationOrderSuccessResponse,
      },
      {
        request: fetchOrderEntitlementsRequest,
        response: fetchOrderEntitlementsUpdatedSuccessResponse,
      },
    ]);

    const result = reactivateEntitlement(
      fetch,
      TXA_ID,
      SP_ENTITLEMENT_1,
      REACTIVATION_ORDER_ID,
    );

    await expect(result).resolves.toEqual(undefined);
  });

  test('reactivation fails on order creation', async () => {
    const fetch = fetchMock([
      {
        request: placeReactivationOrderRequest,
        response: placeReactivationOrderFailureResponse,
      },
    ]);

    const result = reactivateEntitlement(
      fetch,
      TXA_ID,
      SP_ENTITLEMENT_1,
      REACTIVATION_ORDER_ID,
    );

    await expect(result).rejects.toBeInstanceOf(Error);
  });

  test('reactivation fails on fetch order processing', async () => {
    const fetch = fetchMock([
      {
        request: placeReactivationOrderRequest,
        response: placeReactivationOrderSuccessResponse,
      },
      {
        request: fetchReactivationOrderRequest,
        response: fetchReactivationOrderFailureResponse,
      },
    ]);

    const result = reactivateEntitlement(
      fetch,
      TXA_ID,
      SP_ENTITLEMENT_1,
      REACTIVATION_ORDER_ID,
    );

    await expect(result).rejects.toBeInstanceOf(Error);
  });

  test('reactivation fails on fetch entitlement', async () => {
    const fetch = fetchMock([
      {
        request: placeReactivationOrderRequest,
        response: placeReactivationOrderSuccessResponse,
      },
      {
        request: fetchReactivationOrderRequest,
        response: fetchReactivationOrderSuccessResponse,
      },
      {
        request: fetchOrderEntitlementsRequest,
        response: fetchOrderEntitlementsFailureResponse,
      },
    ]);

    const result = reactivateEntitlement(
      fetch,
      TXA_ID,
      SP_ENTITLEMENT_1,
      REACTIVATION_ORDER_ID,
    );

    await expect(result).rejects.toBeInstanceOf(Error);
  });
});

test('use reactivation service succeeds', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useReactivateEntitlement(TXA_ID),
    {
      wrapper: ({ children }) => (
        <CommerceMockedEnvironment
          scenarios={[
            orderScenarios.placeOrderSuccess,
            orderScenarios.fetchReactivationOrderSuccess,
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
