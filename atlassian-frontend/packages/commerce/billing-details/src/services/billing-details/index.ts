import { useCallback } from 'react';

import { useCommerceFetch } from '@atlassian/commerce-environment';
import {
  FetchServiceResult,
  HttpResponseError,
  rejectOnHttpError,
  UpdateServiceResult,
  useFetchService,
  useUpdateService,
} from '@atlassian/commerce-service-hook';
import { Service } from '@atlassian/commerce-telemetry';
import {
  getTaskResultFromResourceNotFoundError,
  getTaskResultFromServiceError,
} from '@atlassian/commerce-telemetry-ccp-utils';
import { TransactionAccountId } from '@atlassian/commerce-types';

import { BillingDetails } from '../../common/types';
import { useTaskTracker } from '../../common/utils/analytics';
import { ValidationError } from '../../common/utils/validation-errors';

import { BILL_TO_PARTY_URL } from './constants';

/**
 * fetches billing details for TransactionAccount
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/bill-to-party-resource/get}
 *
 * Account receivable (AR):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/bill-to-party-resource/get}
 *
 * @param fetch
 * @param txaId
 */
export const fetchBillingDetails = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
): Promise<BillingDetails | undefined> => {
  const response = await rejectOnHttpError(
    'billing-details',
    fetch(BILL_TO_PARTY_URL, {
      headers: { 'X-transaction-account': txaId },
    }),
  );
  if (response.status === 200) {
    return response.json();
  }
  if (response.status === 204) {
    return;
  }
};

export const useBillingDetailsService = (
  txaId: TransactionAccountId,
): FetchServiceResult<BillingDetails | undefined> => {
  const fetch = useCommerceFetch();
  return useFetchService(
    useCallback(() => fetchBillingDetails(fetch, txaId), [fetch, txaId]),
  );
};

/**
 * service hook for {@link fetchBillingDetails}
 *
 * CCP api gateway (CCP API):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/ccp-api-gateway}
 * - Api docs - {@link https://ccp-api-gateway.us-east-1.staging.atl-paas.net/swagger-ui/index.html?configUrl=/openapi/swagger-config#/bill-to-party-resource/update}
 *
 * Account receivable (AR):
 * - Microscope - {@link https://microscope.prod.atl-paas.net/services/accounts-receivable}
 * - Api docs - {@link https://accounts-receivable.us-east-1.staging.atl-paas.net/swagger-ui/index.html?url=/v3/api-docs#/bill-to-party-resource/update}
 *
 * @param fetch
 * @param startTask
 * @param txaId
 * @param billingDetails
 */
export const updateBillingDetails = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
  billingDetails: BillingDetails,
): Promise<BillingDetails> => {
  try {
    const response = await rejectOnHttpError(
      'billing-details-update',
      fetch(BILL_TO_PARTY_URL, {
        method: 'PUT',
        headers: {
          'X-transaction-account': txaId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(billingDetails),
      }),
    );
    return response.json();
  } catch (e) {
    if (e instanceof HttpResponseError && e.statusCode === 400) {
      throw new ValidationError(e.body);
    }
    throw e;
  }
};

export const useBillingDetailsUpdateService = (
  txaId: TransactionAccountId,
): UpdateServiceResult<
  BillingDetails,
  [BillingDetails],
  Error | HttpResponseError | ValidationError
> => {
  const fetch = useCommerceFetch();
  const startTask = useTaskTracker({
    action: 'updated',
    actionSubject: 'billingDetails',
  });
  return useUpdateService(
    useCallback(
      async (data) => {
        const result = await startTask(async () => {
          try {
            const response = {
              succeed: {
                payload: await updateBillingDetails(fetch, txaId, data),
              },
            };
            return response;
          } catch (err) {
            if (err instanceof ValidationError) {
              return {
                fail: {
                  payload: err,
                  responsibleService: Service.UNKNOWN_EXTERNAL,
                },
              };
            }

            const notFoundResult = getTaskResultFromResourceNotFoundError(err);
            if (notFoundResult !== undefined) {
              return notFoundResult;
            }

            const serviceResult = getTaskResultFromServiceError(err);
            if (serviceResult !== undefined) {
              return serviceResult;
            }

            throw err;
          }
        });

        if (result.succeed !== undefined) {
          return result.succeed.payload;
        }

        throw result.fail.payload;
      },
      [fetch, txaId, startTask],
    ),
  );
};
