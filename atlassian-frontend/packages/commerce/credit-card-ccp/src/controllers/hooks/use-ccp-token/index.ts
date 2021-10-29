import { useContext, useEffect, useState } from 'react';

import {
  RequestState,
  stateGuard,
  StripeEnvironment,
  StripeEnvironmentResponse,
} from '@atlassian/commerce-credit-card-base';
import { useCommerceFetch } from '@atlassian/commerce-environment';
import { PaymentMethodId } from '@atlassian/commerce-payment-methods';
import { TransactionAccountId } from '@atlassian/commerce-types';

import { tokenContext } from '../../context';

import { SETUP_INTENT_URL } from './constants';

export const useCCPToken = () => useContext(tokenContext);

export type CcpStripeIntent = {
  clientSecret: string;
  publicKey: string;
  paymentMethodId: PaymentMethodId;
};

export type CCPStripeEnvironment = StripeEnvironment & {
  intentSecret: string;
  /**
   * target payment method id
   */
  paymentMethodId: PaymentMethodId;
  transactionAccountId: TransactionAccountId;
};

export const fetchStripeIntent = async (
  fetch: typeof window.fetch,
  txaId: TransactionAccountId,
): Promise<CcpStripeIntent> => {
  const response = await fetch(SETUP_INTENT_URL, {
    headers: {
      'X-transaction-account': txaId,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
  if (response.ok) {
    const json = await response.json();
    if (!json.publicKey || !json.clientSecret) {
      throw new Error('wrong intent response');
    }
    return json as CcpStripeIntent;
  }
  throw new Error(
    `Failed to retrieve stripe intent ${response.status} ${response.statusText}`,
  );
};

/**
 * fetches Stripe API tokens from CCP
 * to be used with {@link CreditCardFormState}
 * @param {String} accountId target account id
 */
export const useCCPTokenService = (
  accountId: string,
): StripeEnvironmentResponse<CCPStripeEnvironment> => {
  const [token, setToken] = useState<CCPStripeEnvironment | undefined>(
    undefined,
  );
  const [state, setState] = useState<RequestState>('loading');
  const fetch = useCommerceFetch();

  useEffect(() => {
    (async () => {
      try {
        const transactionAccountId = accountId as TransactionAccountId;
        const response = await fetchStripeIntent(fetch, transactionAccountId);

        setState('complete');
        setToken({
          publicKey: response.publicKey,
          intentSecret: response.clientSecret,
          paymentMethodId: response.paymentMethodId,
          transactionAccountId,
        });
      } catch (e) {
        // TODO: report commerce monitoring
        setState('error');
      }
    })();
  }, [accountId, fetch]);

  return stateGuard(token, state, undefined);
};
