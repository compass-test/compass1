// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook } from '@testing-library/react-hooks';

import {
  createMockedEnvironmentWrapper,
  TXA_ID,
} from '@atlassian/commerce-environment/mocks';
import { HttpResponseError } from '@atlassian/commerce-service-hook';

import { invoice1, invoice2, invoice4, scenarios } from './mocks';

import { useInvoicesService } from './index';

test('invoice service returns data for transaction account', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useInvoicesService(TXA_ID),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.invoicesSuccess),
    },
  );

  await waitForNextUpdate();

  expect(result.current.data).toEqual({
    data: [invoice2, invoice4, invoice1],
    min: invoice1.id,
    max: invoice4.id,
  });
});

test('invoice service returns error for bad response from server', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useInvoicesService(TXA_ID),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.invoicesFailure),
    },
  );

  await waitForNextUpdate();

  expect(result.current.error).toBeInstanceOf(HttpResponseError);
  expect(result.current.error).toHaveProperty('statusCode', 500);
});
