// eslint-disable-next-line import/no-extraneous-dependencies
import { renderHook } from '@testing-library/react-hooks';

import { createMockedEnvironmentWrapper } from '@atlassian/commerce-environment/mocks';
import { HttpResponseError } from '@atlassian/commerce-service-hook';

import { BillingCountryStateLookup } from '../../types';
import { australia, canada } from '../billing-country/mocks';

import {
  scenarios,
  statesOfAustralia,
  successScenariosForDefaultCountries,
} from './mocks';

import {
  billingCountryStateUrl,
  fetchBillingCountryStates,
  fetchStatesForBillingDetailsCountry,
  useBillingCountryStatesService,
} from './index';

describe('caching', () => {
  const auResult = billingCountryStateUrl(australia.isoCode);
  const caResult = billingCountryStateUrl(canada.isoCode);

  test('low-level API does not cache', async () => {
    const fetchSpy = jest.fn().mockImplementation((country) => ({
      ok: true,
      json: () => Promise.resolve(country),
    }));

    expect(await fetchBillingCountryStates(fetchSpy, australia.isoCode)).toBe(
      auResult,
    );
    expect(await fetchBillingCountryStates(fetchSpy, australia.isoCode)).toBe(
      auResult,
    );

    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  test('no caching', async () => {
    const fetchSpy = jest.fn().mockImplementation((country) => ({
      ok: true,
      json: () => Promise.resolve(country),
    }));

    expect(
      await fetchStatesForBillingDetailsCountry(fetchSpy, {
        postalAddress: { country: australia.isoCode },
      }),
    ).toBe(auResult);
    expect(
      await fetchStatesForBillingDetailsCountry(fetchSpy, {
        postalAddress: { country: australia.isoCode },
      }),
    ).toBe(auResult);

    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });

  test('caching', async () => {
    const fetchSpy = jest.fn().mockImplementation((country) => ({
      ok: true,
      json: () => Promise.resolve(country),
    }));

    const cache: BillingCountryStateLookup = {};
    expect(
      await fetchStatesForBillingDetailsCountry(
        fetchSpy,
        { postalAddress: { country: australia.isoCode } },
        cache,
      ),
    ).toBe(auResult);
    expect(
      await fetchStatesForBillingDetailsCountry(
        fetchSpy,
        { postalAddress: { country: australia.isoCode } },
        cache,
      ),
    ).toBe(auResult);

    expect(fetchSpy).toHaveBeenCalledTimes(1);

    expect(
      await fetchStatesForBillingDetailsCountry(
        fetchSpy,
        { postalAddress: { country: canada.isoCode } },
        cache,
      ),
    ).toBe(caResult);

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(cache).toEqual({
      [australia.isoCode]: auResult,
      [canada.isoCode]: caResult,
    });
  });
});

test('billing country states service returns state for country', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBillingCountryStatesService(australia.isoCode),
    {
      wrapper: createMockedEnvironmentWrapper(
        ...successScenariosForDefaultCountries,
      ),
    },
  );

  await waitForNextUpdate();

  expect(result.current.data).toEqual(statesOfAustralia);
});

test('billing country states service returns error for bad response from server', async () => {
  const { result, waitForNextUpdate } = renderHook(
    () => useBillingCountryStatesService(australia.isoCode),
    {
      wrapper: createMockedEnvironmentWrapper(scenarios.failureAustralia),
    },
  );

  await waitForNextUpdate();

  expect(result.current.error).toBeInstanceOf(HttpResponseError);
  expect(result.current.error).toHaveProperty('statusCode', 500);
});
