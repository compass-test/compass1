import { useCallback } from 'react';

import { useCommerceFetch } from '@atlassian/commerce-environment';
import {
  FetchServiceResult,
  rejectOnHttpError,
  useFetchService,
} from '@atlassian/commerce-service-hook';

import { GATEWAY_URL } from '../../constants/api-gateway';
import { BillingCountry } from '../../types';

export const BILLING_COUNTRIES_URL = `${GATEWAY_URL}/billing-ux/api/ccp/countries`;

export type Lang = 'en' | 'ja' | 'fr';

/**
 * Fetches available countries
 *
 * Billing ux Service (BUX/BUX):
 * - Microscope {@link https://microscope.prod.atl-paas.net/services/billing-ux-service}
 * - Api docs {@link https://billing-ux-service.prod.public.atl-paas.net/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/ccp-country-resource/getCountriesExperimental}
 *
 * Tax as a service (TaaS):
 * - Docs {@link https://hello.atlassian.net/wiki/spaces/tintin/pages/661027326/Tax-as-a-Service+TaaS}
 * - Microscope {@link https://microscope.prod.atl-paas.net/services/atl-avalara-tax-process-api}
 * - Api docs {@link https://atl-avalara-tax-process-api-adev.cloudhub.io/avalara/console/#docs/method/#2542}
 * - Avatax API docs {@link https://developer.avalara.com/api-reference/avatax/rest/v2/methods/Definitions/ListCountries/}
 *
 * @param fetch
 * @param lang
 */
export const fetchBillingCountries = async (
  fetch: typeof window.fetch,
  lang?: Lang,
): Promise<BillingCountry[]> => {
  const response = await rejectOnHttpError(
    'billing-countries',
    fetch(BILLING_COUNTRIES_URL + (lang ? `?lang=${lang}` : '')),
  );
  const countries: BillingCountry[] = await response.json();
  return countries.map((country) => {
    if (!country.states) {
      // temporary fix until we will fetch states for each country
      country.states = [];
    }
    return country;
  });
};

/**
 * service Hook for {@link fetchBillingCountries}
 * @param lang
 */
export const useBillingCountriesService = (
  lang?: Lang,
): FetchServiceResult<BillingCountry[]> => {
  const fetch = useCommerceFetch();
  return useFetchService(
    useCallback(() => fetchBillingCountries(fetch, lang), [fetch, lang]),
  );
};
