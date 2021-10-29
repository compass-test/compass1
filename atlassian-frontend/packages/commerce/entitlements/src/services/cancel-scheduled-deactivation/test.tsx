import React from 'react';

import { renderHook } from '@testing-library/react-hooks';

import {
  CommerceMockedEnvironment,
  fetchMock,
  scenarioToRequestPredicate,
  scenarioToResponse,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';

import {
  CANCEL_DEACTIVATION_ORDER_ID,
  FREE_SP_ENTITLEMENT,
  SP_ENTITLEMENT_1,
} from '../../common/mocks';
import { orderIdGeneratorOverrides } from '../../mocks';
import { scenarios as entitlementScenarios } from '../fetch-entitlements/mocks';
import { scenarios as orderScenarios } from '../order/mocks';

import {
  cancelScheduledDeactivation,
  useCancelScheduledDeactivation,
} from './index';

describe('cancel scheduled deactivation service', () => {
  const placeOrderRequest = scenarioToRequestPredicate(
    orderScenarios.placeOrderSuccess,
  );
  const fetchCancelDeactivationOrderRequest = scenarioToRequestPredicate(
    orderScenarios.fetchCancelDeactivationOrderSuccess,
  );

  const placeOrderSuccessResponse = scenarioToResponse(
    orderScenarios.placeOrderSuccess,
  );
  const placeOrderFailureResponse = scenarioToResponse(
    orderScenarios.placeOrderNotFoundFailure,
  );
  const fetchCancelDeactivationOrderSuccessResponse = scenarioToResponse(
    orderScenarios.fetchCancelDeactivationOrderSuccess,
  );
  const fetchCancelDeactivationOrderProcessingResponse = scenarioToResponse(
    orderScenarios.fetchCancelDeactivationOrderProcessing,
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

  test('succeeds on paid entitlement', async () => {
    const fetch = fetchMock([
      {
        request: placeOrderRequest,
        response: placeOrderSuccessResponse,
      },
      {
        request: fetchCancelDeactivationOrderRequest,
        response: fetchCancelDeactivationOrderSuccessResponse,
      },
      {
        request: fetchOrderEntitlementsRequest,
        response: fetchOrderEntitlementsUpdatedSuccessResponse,
      },
    ]);

    const result = cancelScheduledDeactivation(
      fetch,
      TXA_ID,
      SP_ENTITLEMENT_1,
      CANCEL_DEACTIVATION_ORDER_ID,
    );

    await expect(result).resolves.toEqual(undefined);
  });

  test('fails on free entitlement', async () => {
    const fetch = fetchMock([]);

    const result = cancelScheduledDeactivation(
      fetch,
      TXA_ID,
      FREE_SP_ENTITLEMENT,
      CANCEL_DEACTIVATION_ORDER_ID,
    );

    await expect(result).rejects.toBeInstanceOf(Error);
  });

  test('fails on order creation', async () => {
    const fetch = fetchMock([
      {
        request: placeOrderRequest,
        response: placeOrderFailureResponse,
      },
    ]);

    const result = cancelScheduledDeactivation(
      fetch,
      TXA_ID,
      FREE_SP_ENTITLEMENT,
      CANCEL_DEACTIVATION_ORDER_ID,
    );

    await expect(result).rejects.toBeInstanceOf(Error);
  });

  test('fails on fetch order processing', async () => {
    const fetch = fetchMock([
      {
        request: placeOrderRequest,
        response: placeOrderSuccessResponse,
      },
      {
        request: fetchCancelDeactivationOrderRequest,
        response: fetchCancelDeactivationOrderProcessingResponse,
      },
    ]);

    const result = cancelScheduledDeactivation(
      fetch,
      TXA_ID,
      FREE_SP_ENTITLEMENT,
      CANCEL_DEACTIVATION_ORDER_ID,
    );

    await expect(result).rejects.toBeInstanceOf(Error);
  });

  test('fails on fetch entitlement', async () => {
    const fetch = fetchMock([
      {
        request: placeOrderRequest,
        response: placeOrderSuccessResponse,
      },
      {
        request: fetchCancelDeactivationOrderRequest,
        response: fetchCancelDeactivationOrderSuccessResponse,
      },
      {
        request: fetchOrderEntitlementsRequest,
        response: fetchOrderEntitlementsFailureResponse,
      },
    ]);

    const result = cancelScheduledDeactivation(
      fetch,
      TXA_ID,
      FREE_SP_ENTITLEMENT,
      CANCEL_DEACTIVATION_ORDER_ID,
    );

    await expect(result).rejects.toBeInstanceOf(Error);
  });
});

test('use cancel deactivation service succeeds', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useCancelScheduledDeactivation(TXA_ID),
    {
      wrapper: ({ children }) => (
        <CommerceMockedEnvironment
          scenarios={[
            orderScenarios.placeOrderSuccess,
            orderScenarios.fetchCancelDeactivationOrderSuccess,
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
