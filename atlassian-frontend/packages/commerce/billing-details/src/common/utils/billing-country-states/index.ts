import { useCallback, useRef } from 'react';

import { useCommerceFetch } from '@atlassian/commerce-environment';
import {
  FetchServiceResult,
  rejectOnHttpError,
  useFetchService,
} from '@atlassian/commerce-service-hook';
import { CountryIsoCode } from '@atlassian/commerce-types';

import { GATEWAY_URL } from '../../constants/api-gateway';
import {
  BillingCountryState,
  BillingCountryStateLookup,
  BillingDetails,
} from '../../types';

export const billingCountryStateUrl = (country: CountryIsoCode) =>
  `${GATEWAY_URL}/billing-ux/api/ccp/countries/${country}/states`;

/**
 * fetches states for a specified country
 *
 * Billing ux Service (BUX/BUX):
 * - Microscope {@link https://microscope.prod.atl-paas.net/services/billing-ux-service}
 * - Api docs {@link https://billing-ux-service.prod.public.atl-paas.net/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/ccp-country-resource/getCountryStates}
 *
 * Tax as a service (TaaS):
 * - Docs {@link https://hello.atlassian.net/wiki/spaces/tintin/pages/661027326/Tax-as-a-Service+TaaS}
 * - Microscope {@link https://microscope.prod.atl-paas.net/services/atl-avalara-tax-process-api}
 * - Api docs {@link https://atl-avalara-tax-process-api-adev.cloudhub.io/avalara/console/#docs/method/#2728}
 * - Avatax API docs - {@link https://developer.avalara.com/api-reference/avatax/rest/v2/methods/Definitions/ListRegionsByCountry/}
 *
 * @param fetch
 * @param country
 */
export const fetchBillingCountryStates = async (
  fetch: typeof window.fetch,
  country: CountryIsoCode,
): Promise<BillingCountryState[]> => {
  const response = await rejectOnHttpError(
    'billing-country-states',
    fetch(billingCountryStateUrl(country)),
  );
  return response.json();
};

/**
 * service hook for {@link fetchBillingCountryStates}
 * @param country
 */
export const useBillingCountryStatesService = (
  country: CountryIsoCode,
): FetchServiceResult<BillingCountryState[]> => {
  const fetch = useCommerceFetch();
  return useFetchService(
    useCallback(() => fetchBillingCountryStates(fetch, country), [
      fetch,
      country,
    ]),
  );
};

export const fetchStatesForBillingDetailsCountry = async (
  fetch: typeof window.fetch,
  billingDetails?: { postalAddress?: { country: CountryIsoCode } },
  cache: BillingCountryStateLookup = {},
): Promise<BillingCountryState[]> => {
  const countryCode = billingDetails?.postalAddress?.country;
  if (!countryCode) {
    return Promise.resolve([]);
  }
  const cached = cache[countryCode];
  if (cached) {
    return cached;
  }
  const newValue = await fetchBillingCountryStates(fetch, countryCode);
  cache[countryCode] = newValue;
  return newValue;
};

export const useStatesForBillingDetailsCountryService = (
  billingDetails?: BillingDetails,
  stateCache?: BillingCountryStateLookup,
): FetchServiceResult<BillingCountryStateLookup> => {
  const fetch = useCommerceFetch();
  const cache = useRef<BillingCountryStateLookup>(stateCache || {}).current;
  return useFetchService(
    useCallback(async () => {
      await fetchStatesForBillingDetailsCountry(fetch, billingDetails, cache);
      return cache;
    }, [fetch, billingDetails, cache]),
  );
};
