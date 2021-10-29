// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook } from '@testing-library/react-hooks';

import { createMockedEnvironmentWrapper } from '@atlassian/commerce-environment/mocks';
import { HttpResponseError } from '@atlassian/commerce-service-hook';

import { defaultCountries, defaultCountriesJapanese, scenarios } from './mocks';

import { useBillingCountriesService } from './index';

test('billing country service returns countries', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBillingCountriesService(),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.success),
    },
  );

  await waitForNextUpdate();

  expect(result.current.data).toEqual(defaultCountries);
});

test('billing country service returns countries in japanese language', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBillingCountriesService('ja'),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.successJapanese),
    },
  );

  await waitForNextUpdate();

  expect(result.current.data).toEqual(defaultCountriesJapanese);
});

test('billing country service returns error for bad response from server', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBillingCountriesService(),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.failure),
    },
  );

  await waitForNextUpdate();

  expect(result.current.error).toBeInstanceOf(HttpResponseError);
  expect(result.current.error).toHaveProperty('statusCode', 500);
});
