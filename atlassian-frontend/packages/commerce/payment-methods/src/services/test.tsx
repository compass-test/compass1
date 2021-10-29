// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook } from '@testing-library/react-hooks';

import {
  createMockedEnvironmentWrapper,
  fetchMock,
  IG_ID,
  IG_ID_2,
  scenarioToRequestPredicate,
  scenarioToResponse,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';
import { HttpResponseError } from '@atlassian/commerce-service-hook';

import {
  masterPaymentMethodId,
  removePaymentMethodSuccessScenario,
  scenarios,
  updatePaymentMethodsForInvoiceGroupSuccessScenario,
  visaPaymentMethod,
  visaPaymentMethodId,
} from './mocks';

import {
  pollPaymentMethod,
  useDefaultPaymentMethodService,
  useReplacePaymentMethodService,
} from './index';

test('payment method service returns data for transaction account', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useDefaultPaymentMethodService(TXA_ID, IG_ID),
    {
      wrapper: createMockedEnvironmentWrapper(
        scenarios.paymentMethodsForInvoiceGroupSuccess,
        scenarios.paymentMethodSuccess,
      ),
    },
  );

  await waitForNextUpdate();

  expect(result.current.data).toEqual(visaPaymentMethod);
});

test('payment method returns error for bad response from server', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useDefaultPaymentMethodService(TXA_ID, IG_ID),
    {
      wrapper: createMockedEnvironmentWrapper(
        scenarios.paymentMethodsForInvoiceGroupNotFound,
      ),
    },
  );

  await waitForNextUpdate();

  expect(result.current.error).toBeInstanceOf(HttpResponseError);
  expect(result.current.error).toHaveProperty('statusCode', 404);
});

test('replace payment methods updates old payment method for ig and removes it', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useReplacePaymentMethodService(TXA_ID, masterPaymentMethodId),
    {
      wrapper: createMockedEnvironmentWrapper(
        scenarios.fetchDefaultPaymentMethodsSuccess,
        scenarios.paymentMethodsSuccess,
        updatePaymentMethodsForInvoiceGroupSuccessScenario(
          IG_ID_2,
          visaPaymentMethodId,
        ),
        removePaymentMethodSuccessScenario(masterPaymentMethodId),
      ),
    },
  );

  result.current.update(masterPaymentMethodId).catch((e) => console.error(e));
  await waitForNextUpdate();

  expect(result.current.error).toBeUndefined();
  expect(result.current.data).toEqual(masterPaymentMethodId);
});

test('replace default txa payment methods updates old payment method for ig, txa, and removes it', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useReplacePaymentMethodService(TXA_ID, visaPaymentMethodId),
    {
      wrapper: createMockedEnvironmentWrapper(
        scenarios.fetchDefaultPaymentMethodsSuccess,
        scenarios.paymentMethodsSuccess,
        scenarios.updateDefaultPaymentMethodForTxaSuccess,
        updatePaymentMethodsForInvoiceGroupSuccessScenario(
          IG_ID,
          masterPaymentMethodId,
        ),
        removePaymentMethodSuccessScenario(visaPaymentMethodId),
      ),
    },
  );

  result.current.update(masterPaymentMethodId).catch((e) => console.error(e));
  await waitForNextUpdate();

  expect(result.current.error).toBeUndefined();
  expect(result.current.data).toEqual(masterPaymentMethodId);
});

describe('poll payment method', () => {
  const request = scenarioToRequestPredicate(scenarios.paymentMethodSuccess);
  const notFound = scenarioToResponse(scenarios.visaPaymentMethodNotFound);
  const success = scenarioToResponse(scenarios.paymentMethodSuccess);

  test('retries until succeeds', async () => {
    const fetch = fetchMock([
      {
        request: request,
        response: [notFound, notFound, success],
      },
    ]);

    const result = pollPaymentMethod(fetch, TXA_ID, visaPaymentMethod.id, 0, 3);

    await expect(result).resolves.toEqual(visaPaymentMethod);
  });

  test('does not retries if succeeds on first call', async () => {
    const fetch = fetchMock([
      {
        request: request,
        response: [success],
      },
    ]);

    const result = pollPaymentMethod(fetch, TXA_ID, visaPaymentMethod.id, 0, 3);

    await expect(result).resolves.toEqual(visaPaymentMethod);
  });

  test('can success on the last retry', async () => {
    const fetch = fetchMock([
      {
        request: request,
        response: [notFound, notFound, notFound, success],
      },
    ]);

    const result = pollPaymentMethod(fetch, TXA_ID, visaPaymentMethod.id, 0, 3);

    await expect(result).resolves.toEqual(visaPaymentMethod);
  });

  test('fails after exceeding number of max retries', async () => {
    const fetch = fetchMock([
      {
        request: request,
        response: [notFound, notFound, notFound, notFound],
      },
    ]);

    const result = pollPaymentMethod(fetch, TXA_ID, visaPaymentMethod.id, 0, 3);

    await expect(result).rejects.toBeInstanceOf(Error);
  });
});
