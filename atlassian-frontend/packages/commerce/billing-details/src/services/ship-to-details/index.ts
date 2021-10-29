import { useCallback } from 'react';

import { useCommerceFetch } from '@atlassian/commerce-environment';
import {
  CreateServiceResult,
  FetchServiceResult,
  HttpResponseError,
  rejectOnHttpError,
  UpdateServiceResult,
  useCreateService,
  useFetchService,
  useUpdateService,
} from '@atlassian/commerce-service-hook';
import {
  InvoiceGroupId,
  TransactionAccountId,
} from '@atlassian/commerce-types';

import { GATEWAY_URL } from '../../common/constants/api-gateway';
import {
  ShipToDetails,
  ShipToDetailsId,
  ShipToDetailsWithId,
} from '../../common/types';
// noinspection ES6PreferShortImport
import { ValidationError } from '../../common/utils/validation-errors';

export const SHIP_TO_PARTY_URL = `${GATEWAY_URL}/ccp/api/v1/ship-to-parties`;
export const INVOICE_GROUP_URL = `${GATEWAY_URL}/ccp/api/v1/invoice-groups`;

type EmptyPage<T> = {
  data: T[];
};

export type PagedList<T, ID> =
  | EmptyPage<T>
  | {
      data: T[];
      min: ID;
      max: ID;
    };
export type ShipToDetailsList = PagedList<ShipToDetailsWithId, ShipToDetailsId>;

/**
 * fetches ship-to details for TransactionAccount
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/ship-to-party-resource/getAll}
 *
 * Account receivable (AR):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/ship-to-party-resource/getAll}
 *
 * @param fetch
 * @param txaId
 */
export const fetchShipToDetailsList = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
): Promise<ShipToDetailsList> => {
  const response = await rejectOnHttpError(
    'ship-to-details-list',
    fetch(SHIP_TO_PARTY_URL, {
      headers: { 'X-transaction-account': txaId },
    }),
  );
  return response.json();
};

/**
 * service hook for {@link fetchBillingDetails}
 * @param txaId
 */
export const useShipToDetailsListService = (
  txaId: TransactionAccountId,
): FetchServiceResult<ShipToDetailsWithId[]> => {
  const fetch = useCommerceFetch();
  return useFetchService(
    useCallback(
      () => fetchShipToDetailsList(fetch, txaId).then((it) => it.data),
      [fetch, txaId],
    ),
  );
};

/**
 * creates ship-to details for TransactionAccount
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/ship-to-party-resource/getAll}
 *
 * Account receivable (AR):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/ship-to-party-resource/createNew}
 *
 * @param fetch
 * @param txaId
 * @param shipToDetails
 */
export const createShipToDetails = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  shipToDetails: ShipToDetails,
): Promise<ShipToDetailsWithId> => {
  try {
    const response = await rejectOnHttpError(
      'ship-to-details-create',
      fetch(SHIP_TO_PARTY_URL, {
        method: 'POST',
        headers: {
          'X-transaction-account': txaId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shipToDetails),
      }),
    );
    return response.json();
  } catch (e) {
    if ((e as HttpResponseError).statusCode === 400) {
      throw new ValidationError(e.body);
    }
    throw e;
  }
};

export const useCreateShipToDetailsService = (
  txaId: TransactionAccountId,
): CreateServiceResult<
  ShipToDetailsWithId,
  [ShipToDetails],
  Error | HttpResponseError | ValidationError
> => {
  const fetch = useCommerceFetch();
  return useCreateService(
    useCallback((data) => createShipToDetails(fetch, txaId, data), [
      fetch,
      txaId,
    ]),
  );
};

/**
 * fetch ship-to details by id
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/ship-to-party-resource/get_1}
 *
 * Account receivable (AR):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/ship-to-party-resource/get_1}
 *
 * @param fetch
 * @param txaId
 * @param shipToDetailsId
 */
export const fetchShipToDetails = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  shipToDetailsId: ShipToDetailsId,
): Promise<ShipToDetailsWithId> => {
  const response = await rejectOnHttpError(
    'ship-to-details',
    fetch(`${SHIP_TO_PARTY_URL}/${shipToDetailsId}`, {
      headers: { 'X-transaction-account': txaId },
    }),
  );
  return response.json();
};

export const useShipToDetailsService = (
  txaId: TransactionAccountId,
  shipToDetailsId: ShipToDetailsId,
): FetchServiceResult<ShipToDetails> => {
  const fetch = useCommerceFetch();
  return useFetchService(
    useCallback(() => fetchShipToDetails(fetch, txaId, shipToDetailsId), [
      fetch,
      txaId,
      shipToDetailsId,
    ]),
  );
};

/**
 * updates ship-to details
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/ship-to-party-resource/updateAddress}
 *
 * Account receivable (AR):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/ship-to-party-resource/updateAddress}
 *
 * @param fetch
 * @param txaId
 * @param shipToDetailsId
 * @param shipToDetails
 */
export const updateShipToDetails = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  shipToDetailsId: ShipToDetailsId,
  shipToDetails: ShipToDetails,
): Promise<ShipToDetailsWithId> => {
  try {
    const response = await rejectOnHttpError(
      'ship-to-details-update',
      fetch(`${SHIP_TO_PARTY_URL}/${shipToDetailsId}`, {
        method: 'PUT',
        headers: {
          'X-transaction-account': txaId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shipToDetails),
      }),
    );
    return response.json();
  } catch (e) {
    if ((e as HttpResponseError).statusCode === 400) {
      throw new ValidationError(e.body);
    }
    throw e;
  }
};

export const useUpdateShipToDetailsService = (
  txaId: TransactionAccountId,
  shipToDetailsId: ShipToDetailsId,
): UpdateServiceResult<
  ShipToDetailsWithId,
  [ShipToDetails],
  Error | HttpResponseError | ValidationError
> => {
  const fetch = useCommerceFetch();
  return useUpdateService(
    useCallback(
      (data) => updateShipToDetails(fetch, txaId, shipToDetailsId, data),
      [fetch, txaId, shipToDetailsId],
    ),
  );
};

/**
 * updates default ship-to details for given invoice group
 *
 * * CCP api gateway (CCP API):
 * - Api docs - {@link https://ccp-api-gateway.staging.atl-paas.net/webjars/swagger-ui/index.html?configUrl=/openapi/swagger-config#/invoice-group-resource/updateInvoiceGroup}
 *
 * @param fetch
 * @param txaId
 * @param invoiceGroupId
 * @param shipToDetailsDefaultId
 */
export const updateDefaultShipToDetails = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  invoiceGroupId: InvoiceGroupId,
  shipToDetailsDefaultId: ShipToDetailsId,
): Promise<ShipToDetailsWithId> => {
  const response = await rejectOnHttpError(
    'ship-to-details-default-update',
    fetch(`${INVOICE_GROUP_URL}/${invoiceGroupId}`, {
      method: 'PUT',
      headers: {
        'X-transaction-account': txaId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shipToParty: shipToDetailsDefaultId,
      }),
    }),
  );
  return response.json();
};

export const useUpdateDefaultShipToDetailsService = (
  txaId: TransactionAccountId,
  invoiceGroupId: InvoiceGroupId,
): UpdateServiceResult<ShipToDetailsWithId, [ShipToDetailsId]> => {
  const fetch = useCommerceFetch();
  return useUpdateService(
    useCallback(
      (newShipToAddressId: ShipToDetailsId) =>
        updateDefaultShipToDetails(
          fetch,
          txaId,
          invoiceGroupId,
          newShipToAddressId,
        ),
      [fetch, txaId, invoiceGroupId],
    ),
  );
};
