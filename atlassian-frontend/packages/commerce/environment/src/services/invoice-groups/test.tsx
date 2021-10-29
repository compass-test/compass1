// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook } from '@testing-library/react-hooks';

import { HttpResponseError } from '@atlassian/commerce-service-hook';

import { IG_ID, IG_ID_2, TXA_ID } from '../../common/scenarios';
import { createMockedEnvironmentWrapper } from '../../controllers/mocked-provider';

import { scenarios } from './mocks';

import { useInvoiceGroupService } from './index';

test('invoice group service returns all transaction accounts', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useInvoiceGroupService(TXA_ID),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.success),
    },
  );

  await waitForNextUpdate();

  expect(result.current.data).toEqual([IG_ID, IG_ID_2]);
});

test('invoice group service returns error for bad response from server', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useInvoiceGroupService(TXA_ID),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.failure),
    },
  );

  await waitForNextUpdate();

  expect(result.current.error).toBeInstanceOf(HttpResponseError);
  expect(result.current.error).toHaveProperty('statusCode', 500);
});
