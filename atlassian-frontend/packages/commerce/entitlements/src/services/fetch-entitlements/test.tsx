import { renderHook } from '@testing-library/react-hooks';

import {
  createMockedEnvironmentWrapper,
  fetchMock,
  scenarioToRequestPredicate,
  scenarioToResponse,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';
import { HttpResponseError } from '@atlassian/commerce-service-hook';

import {
  FREE_SP_ENTITLEMENT,
  FREE_SP_ENTITLEMENT_INACTIVE,
  LIRA_ENTITLEMENT,
  LIRA_ENTITLEMENT_CANCELLED,
  LIRA_ENTITLEMENT_INACTIVE,
  LIRA_ENTITLEMENT_PENDING_CANCELLATION,
  LIRA_ENTITLEMENT_TRIAL,
  SP_ENTITLEMENT_1,
  SP_ENTITLEMENT_2,
  SP_ENTITLEMENT_3,
  SP_ENTITLEMENT_CANCELLED,
  SP_ENTITLEMENT_INACTIVE,
  SP_ENTITLEMENT_PENDING_CANCELLATION,
} from '../../common/mocks';

import { scenarios as entitlementScenarios } from './mocks';

import { useEntitlementsService, waitUntilEntitlementUpdates } from './index';

test('fetch entitlements service returns data for transaction account', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useEntitlementsService(TXA_ID),
    {
      wrapper: createMockedEnvironmentWrapper(
        entitlementScenarios.fetchEntitlementsSuccess,
      ),
    },
  );

  await waitForNextUpdate();

  expect(result.current.data).toEqual([
    SP_ENTITLEMENT_1,
    SP_ENTITLEMENT_2,
    SP_ENTITLEMENT_3,
    LIRA_ENTITLEMENT,
    FREE_SP_ENTITLEMENT,
    SP_ENTITLEMENT_INACTIVE,
    LIRA_ENTITLEMENT_INACTIVE,
    FREE_SP_ENTITLEMENT_INACTIVE,
    SP_ENTITLEMENT_PENDING_CANCELLATION,
    LIRA_ENTITLEMENT_PENDING_CANCELLATION,
    LIRA_ENTITLEMENT_CANCELLED,
    SP_ENTITLEMENT_CANCELLED,
    LIRA_ENTITLEMENT_TRIAL,
  ]);
});

test('fetch entitlements service returns error for bad response from server', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useEntitlementsService(TXA_ID),
    {
      wrapper: createMockedEnvironmentWrapper(
        entitlementScenarios.fetchEntitlementsNotFoundFailure,
      ),
    },
  );

  await waitForNextUpdate();

  expect(result.current.error).toBeInstanceOf(HttpResponseError);
  expect(result.current.error).toHaveProperty('statusCode', 404);
});

describe('wait until update polling', () => {
  const fetchEntitlementRequest = scenarioToRequestPredicate(
    entitlementScenarios.fetchEntitlementSuccess,
  );
  const fetchEntitlementV1SuccessResponse = scenarioToResponse(
    entitlementScenarios.fetchEntitlementSuccess,
  );
  const fetchEntitlementV2SuccessResponse = scenarioToResponse(
    entitlementScenarios.fetchEntitlementV2Success,
  );

  test('succeeds on first try', async () => {
    const fetch = fetchMock([
      {
        request: fetchEntitlementRequest,
        response: fetchEntitlementV2SuccessResponse,
      },
    ]);

    const result = waitUntilEntitlementUpdates(
      fetch,
      TXA_ID,
      SP_ENTITLEMENT_1.entitlementId,
      SP_ENTITLEMENT_1.version,
      0,
      3,
    );

    await expect(result).resolves.toEqual(undefined);
  });

  test('can succeed on last retry', async () => {
    const fetch = fetchMock([
      {
        request: fetchEntitlementRequest,
        response: [
          fetchEntitlementV1SuccessResponse,
          fetchEntitlementV1SuccessResponse,
          fetchEntitlementV1SuccessResponse,
          fetchEntitlementV2SuccessResponse,
        ],
      },
    ]);

    const result = waitUntilEntitlementUpdates(
      fetch,
      TXA_ID,
      SP_ENTITLEMENT_1.entitlementId,
      SP_ENTITLEMENT_1.version,
      0,
      3,
    );

    await expect(result).resolves.toEqual(undefined);
  });

  test('fails after exceeding max retries', async () => {
    const fetch = fetchMock([
      {
        request: fetchEntitlementRequest,
        response: [
          fetchEntitlementV1SuccessResponse,
          fetchEntitlementV1SuccessResponse,
          fetchEntitlementV1SuccessResponse,
          fetchEntitlementV1SuccessResponse,
        ],
      },
    ]);

    const result = waitUntilEntitlementUpdates(
      fetch,
      TXA_ID,
      SP_ENTITLEMENT_1.entitlementId,
      SP_ENTITLEMENT_1.version,
      0,
      3,
    );

    await expect(result).rejects.toBeInstanceOf(HttpResponseError);
  });
});
