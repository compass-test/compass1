import { useCallback } from 'react';

import {
  reportHttpError,
  useCommerceFetch,
} from '@atlassian/commerce-environment';
import {
  autoRetry,
  FetchServiceResult,
  HttpResponseError,
  rejectOnHttpError,
  ServiceResult,
  UpdateServiceResult,
  useFetchService,
  useService,
  useUpdateService,
  withQueryParams,
} from '@atlassian/commerce-service-hook';
import { useSentryExceptionDispatch } from '@atlassian/commerce-telemetry/dispatch-hooks';
import {
  InvoiceGroupId,
  TransactionAccountId,
} from '@atlassian/commerce-types';

import { PagedList, PaymentMethod, PaymentMethodId } from '../common/types';
export const GATEWAY_URL = `/gateway/api`;
export const PAYMENT_METHOD_URL = `${GATEWAY_URL}/ccp/api/v1/payment-methods`;
export const INVOICE_GROUP_URL = `${GATEWAY_URL}/ccp/api/v1/invoice-groups`;

/**
 * fetches Payment Methods for a given TransactionAccount
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/payment-method-resource/getPaymentMethods}
 *
 * Account receivable (AR):;
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/payment-method-resource/getPaymentMethods}
 *
 * @param fetch
 * @param txaId
 */
export const fetchPaymentMethods = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
): Promise<PagedList<PaymentMethod>> => {
  const response = await rejectOnHttpError(
    'payment-methods',
    fetch(withQueryParams(PAYMENT_METHOD_URL, { pageSize: 1000 }), {
      headers: { 'X-transaction-account': txaId },
    }),
  );
  return response.json();
};

/**
 * service hook for {@link fetchPaymentMethods}
 * @param txaId
 */
export const usePaymentMethodsService = (
  txaId: TransactionAccountId,
): FetchServiceResult<PaymentMethod[]> => {
  // todo implement paging
  const fetch = useCommerceFetch();
  return useFetchService(
    useCallback(() => fetchPaymentMethods(fetch, txaId).then((it) => it.data), [
      fetch,
      txaId,
    ]),
  );
};

/**
 * fetches payment method information for a given PaymentMethodId
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/payment-method-resource/getPaymentMethod}
 *
 * Account receivable (AR):;
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/payment-method-resource/getPaymentMethod}
 *
 * @param fetch
 * @param txaId
 * @param pmId
 */
export const fetchPaymentMethod = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  pmId: PaymentMethodId,
): Promise<PaymentMethod> => {
  const response = await rejectOnHttpError(
    'payment-method',
    fetch(`${PAYMENT_METHOD_URL}/${pmId}`, {
      headers: { 'X-transaction-account': txaId },
    }),
  );
  return response.json();
};

/**
 * fetches periodically list of payment methods for a given TransactionAccount until expected payment method is on that list
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/payment-method-resource/getPaymentMethods}
 *
 * Account receivable (AR):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/payment-method-resource/getPaymentMethods}
 *
 * @param fetch
 * @param txaId
 * @param pmId
 * @param retryInterval
 * @param maxRetries
 */
export const pollPaymentMethod = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  pmId: PaymentMethodId,
  retryInterval = 2500,
  maxRetries = 8,
): Promise<PaymentMethod> => {
  const response = await autoRetry<Response>(
    () =>
      fetch(`${PAYMENT_METHOD_URL}/${pmId}`, {
        headers: { 'X-transaction-account': txaId },
      }),
    (response) => response.status === 404,
    retryInterval,
    maxRetries,
  );
  if (response.status === 404) {
    throw new HttpResponseError(
      'payment-method-poll',
      404,
      `Polling for a payment method "${pmId}" timed out after ${maxRetries} retires`,
    );
  }
  return rejectOnHttpError('payment-method-poll', response).then((it) =>
    it.json(),
  );
};

type PollPaymentMethodArgs = {
  transactionAccountId: TransactionAccountId;
  paymentMethodId: PaymentMethodId;
};

/**
 * service hook for {@link fetchPaymentMethods}
 */
export const usePollPaymentMethodService = (): ServiceResult<
  PaymentMethod,
  [PollPaymentMethodArgs]
> => {
  const fetch = useCommerceFetch();
  const dispatchSentryException = useSentryExceptionDispatch();

  return useService(
    useCallback(
      ({ paymentMethodId, transactionAccountId }) =>
        reportHttpError(
          pollPaymentMethod(fetch, transactionAccountId, paymentMethodId),
          dispatchSentryException,
        ),
      [fetch, dispatchSentryException],
    ),
  );
};

export type InvoiceGroupPaymentMethod = {
  id: InvoiceGroupId;
  defaultPaymentMethod: PaymentMethodId | null;
};

/**
 * fetches default payment method for a given InvoiceGroupId
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/invoice-group-resource/getInvoiceGroup}
 *
 * Account receivable (AR):;
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/invoice-group-resource/getInvoiceGroup}
 *
 * @param fetch
 * @param txaId
 * @param igId
 */
export const fetchDefaultPaymentMethod = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  igId: InvoiceGroupId,
): Promise<PaymentMethod | undefined> => {
  const igResponse = await rejectOnHttpError(
    'invoice-group',
    fetch(`${INVOICE_GROUP_URL}/${igId}`, {
      headers: { 'X-transaction-account': txaId },
    }),
  );
  const invoiceGroup = (await igResponse.json()) as InvoiceGroupPaymentMethod;
  const pmId = invoiceGroup.defaultPaymentMethod;

  if (!pmId) {
    return;
  }

  return fetchPaymentMethod(fetch, txaId, pmId);
};

export const fetchInvoiceGroupsWithDefaultPaymentMethodData = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
): Promise<InvoiceGroupPaymentMethod[]> => {
  const igResponse = await rejectOnHttpError(
    'invoice-group',
    fetch(`${INVOICE_GROUP_URL}`, {
      headers: { 'X-transaction-account': txaId },
    }),
  );
  const invoiceGroupsPage = (await igResponse.json()) as PagedList<
    InvoiceGroupPaymentMethod
  >;
  return invoiceGroupsPage.data;
};

/**
 * service hook for {@link fetchDefaultPaymentMethod}
 * @param txaId
 * @param igId
 */
export const useDefaultPaymentMethodService = (
  txaId: TransactionAccountId,
  igId: InvoiceGroupId,
): FetchServiceResult<PaymentMethod | undefined> => {
  const fetch = useCommerceFetch();
  return useFetchService(
    useCallback(() => fetchDefaultPaymentMethod(fetch, txaId, igId), [
      fetch,
      igId,
      txaId,
    ]),
  );
};

/**
 * updated default payment method for a given InvoiceGroupId
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/invoice-group-resource/updateInvoiceGroup}
 *
 * Account receivable (AR):;
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/invoice-group-resource/updateInvoiceGroup}
 *
 * @param fetch
 * @param txaId
 * @param igId
 * @param newPmId
 */
export const updateDefaultPaymentMethod = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  igId: InvoiceGroupId,
  newPmId: PaymentMethodId,
): Promise<PaymentMethodId> => {
  await rejectOnHttpError(
    'invoice-group-update',
    fetch(`${INVOICE_GROUP_URL}/${igId}`, {
      headers: {
        'X-transaction-account': txaId,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        defaultPaymentMethod: newPmId,
      }),
    }),
  );
  return newPmId;
};

export const useDefaultPaymentMethodUpdateService = (
  txaId: TransactionAccountId,
  igId: InvoiceGroupId,
): UpdateServiceResult<PaymentMethodId, [PaymentMethodId]> => {
  const fetch = useCommerceFetch();
  return useUpdateService(
    useCallback(
      (newPaymentMethodId: PaymentMethodId) =>
        updateDefaultPaymentMethod(fetch, txaId, igId, newPaymentMethodId),
      [fetch, igId, txaId],
    ),
  );
};

/**
 * set payment method as default for a given Transaction Account
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/payment-method-resource/setDefault}
 *
 * Account receivable (AR):;
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/payment-method-resource/setDefault}
 *
 * @param fetch
 * @param txaId
 * @param paymentMethodId
 */

export const updateDefaultTransactionAccountPaymentMethod = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  paymentMethodId: PaymentMethodId,
): Promise<PaymentMethodId> => {
  await rejectOnHttpError(
    'default-transaction-account-payment-method-update',
    fetch(`${PAYMENT_METHOD_URL}/${paymentMethodId}/set-default`, {
      headers: {
        'X-transaction-account': txaId,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    }),
  );
  return paymentMethodId;
};

export const useDefaultTransactionAccountPaymentMethodUpdateService = (
  txaId: TransactionAccountId,
): UpdateServiceResult<PaymentMethodId, [PaymentMethodId]> => {
  const fetch = useCommerceFetch();
  return useUpdateService(
    useCallback(
      (newPaymentMethodId: PaymentMethodId) =>
        updateDefaultTransactionAccountPaymentMethod(
          fetch,
          txaId,
          newPaymentMethodId,
        ),
      [fetch, txaId],
    ),
  );
};

/**
 * Delete payment method. If payment method is used as default for transaction account or invoice group it would be unset.
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/payment-method-resource/deletePaymentMethod}
 *
 * Account receivable (AR):;
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/payment-method-resource/deletePaymentMethod}
 *
 * @param fetch
 * @param txaId
 * @param paymentMethodId
 */

export const deletePaymentMethod = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  paymentMethodId: PaymentMethodId,
): Promise<PaymentMethodId> => {
  await rejectOnHttpError(
    'payment-method-delete',
    fetch(`${PAYMENT_METHOD_URL}/${paymentMethodId}`, {
      headers: {
        'X-transaction-account': txaId,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }),
  );
  return paymentMethodId;
};

/**
 * Replace payment method.
 * It replaces usage of the old payment method by the new payment method and then removes the old payment method.
 * Right now all the operations happens in the browser which is error prone.
 * It is going to be natively supported by CCP https://hello.atlassian.net/browse/CASAR-603
 *
 * @param fetch
 * @param txaId
 * @param oldPaymentMethodId
 * @param newPaymentMethodId
 */

export const replacePaymentMethod = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  oldPaymentMethodId: PaymentMethodId,
  newPaymentMethodId: PaymentMethodId,
): Promise<PaymentMethodId> => {
  // prefetch data needed for replacement
  const [defaultPaymentMethods, paymentMethods] = await Promise.all([
    fetchInvoiceGroupsWithDefaultPaymentMethodData(fetch, txaId),
    fetchPaymentMethods(fetch, txaId),
  ]);

  const wasDefaultPaymentMethodForTxa = Boolean(
    paymentMethods.data.find((it) => it.id === oldPaymentMethodId)?.default,
  );
  const invoiceGroupsUsingOldPaymentMethod = defaultPaymentMethods
    .filter((ig) => ig.defaultPaymentMethod === oldPaymentMethodId)
    .map((ig) => ig.id);

  // replace the old payment method method by the new one
  await Promise.all([
    ...(wasDefaultPaymentMethodForTxa
      ? [
          updateDefaultTransactionAccountPaymentMethod(
            fetch,
            txaId,
            newPaymentMethodId,
          ),
        ]
      : []),
    ...invoiceGroupsUsingOldPaymentMethod.map((ig) =>
      updateDefaultPaymentMethod(fetch, txaId, ig, newPaymentMethodId),
    ),
  ]);

  // replace the old payment method
  await deletePaymentMethod(fetch, txaId, oldPaymentMethodId);

  return newPaymentMethodId;
};

export const useReplacePaymentMethodService = (
  txaId: TransactionAccountId,
  oldPaymentMethodId: PaymentMethodId,
): UpdateServiceResult<PaymentMethodId, [PaymentMethodId]> => {
  const fetch = useCommerceFetch();
  return useUpdateService(
    useCallback(
      (newPaymentMethodId: PaymentMethodId) =>
        replacePaymentMethod(
          fetch,
          txaId,
          oldPaymentMethodId,
          newPaymentMethodId,
        ),
      [fetch, txaId, oldPaymentMethodId],
    ),
  );
};
