import { useCallback } from 'react';

import {
  BillingCountry,
  BillingCountryStateLookup,
  BillingDetails,
  fetchBillingCountries,
  fetchBillingDetails,
  fetchStatesForBillingDetailsCountry,
} from '@atlassian/commerce-billing-details';
import { useCommerceFetch } from '@atlassian/commerce-environment';
import {
  fetchDefaultPaymentMethod,
  fetchPaymentMethods,
  PaymentMethod,
} from '@atlassian/commerce-payment-methods';
import {
  FetchServiceResult,
  useFetchService,
} from '@atlassian/commerce-service-hook';
import {
  InvoiceGroupId,
  TransactionAccountId,
} from '@atlassian/commerce-types';

export type BillingInitialDetails = {
  billingCountries: BillingCountry[];
  billingDetails?: BillingDetails;
  countryStates: BillingCountryStateLookup;
};

export const fetchBillingInitialData = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
): Promise<BillingInitialDetails> => {
  let billingDetailsPromise = fetchBillingDetails(fetch, txaId);
  const [billingCountries, billingDetails, countryStates] = await Promise.all([
    fetchBillingCountries(fetch),
    billingDetailsPromise,
    billingDetailsPromise.then(async (billingDetails) => {
      // this variable will be used as a sharedCountryStates for all subsequent requests
      const countryStateCache: BillingCountryStateLookup = {};
      await fetchStatesForBillingDetailsCountry(
        fetch,
        billingDetails,
        countryStateCache,
      );
      return countryStateCache;
    }),
  ]);
  return {
    billingCountries,
    billingDetails,
    countryStates,
  };
};

export type InitialDetails = BillingInitialDetails & {
  initialPaymentMethod?: PaymentMethod;
  paymentMethods: PaymentMethod[];
};

/**
 * gets information for commerce-billing-details, including billingCountries, paymentMethod, billingDetails
 * @param fetch
 * @param txaId
 * @param igId
 */
export const fetchFlowInitialData = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  igId: InvoiceGroupId,
): Promise<InitialDetails> => {
  const [
    billingDetails,
    initialPaymentMethod,
    paymentMethods,
  ] = await Promise.all([
    fetchBillingInitialData(fetch, txaId),
    fetchDefaultPaymentMethod(fetch, txaId, igId),
    fetchPaymentMethods(fetch, txaId),
  ]);
  return {
    ...billingDetails,
    initialPaymentMethod,
    paymentMethods: paymentMethods.data,
  };
};

/**
 * service hook that gets the initial data for commerce-payment-flow
 * @param txaId
 * @param igId
 */
export const useBillingDetailsDataLoaderService = (
  txaId: TransactionAccountId,
): FetchServiceResult<BillingInitialDetails> => {
  const fetch = useCommerceFetch();

  return useFetchService(
    useCallback(async () => fetchBillingInitialData(fetch, txaId), [
      fetch,
      txaId,
    ]),
  );
};

export const useInitialDataLoaderService = (
  txaId: TransactionAccountId,
  igId: InvoiceGroupId,
): FetchServiceResult<InitialDetails> => {
  const fetch = useCommerceFetch();

  return useFetchService(
    useCallback(async () => fetchFlowInitialData(fetch, txaId, igId), [
      fetch,
      txaId,
      igId,
    ]),
  );
};
