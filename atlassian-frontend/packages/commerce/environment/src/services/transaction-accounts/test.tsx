// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook } from '@testing-library/react-hooks';

import { HttpResponseError } from '@atlassian/commerce-service-hook';

import { TXA_ID, TXA_ID_2 } from '../../common/scenarios';
import { createMockedEnvironmentWrapper } from '../../controllers/mocked-provider';

import { scenarios } from './mocks';

import { useTransactionAccountsService } from './index';

test('transaction account service returns all transaction accounts', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useTransactionAccountsService(),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.success),
    },
  );

  await waitForNextUpdate();

  expect(result.current.data).toEqual([TXA_ID, TXA_ID_2]);
});

test('transaction account service returns error for bad response from server', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useTransactionAccountsService(),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.failure),
    },
  );

  await waitForNextUpdate();

  expect(result.current.error).toBeInstanceOf(HttpResponseError);
  expect(result.current.error).toHaveProperty('statusCode', 500);
});
