import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import {
  FailureResult,
  isError,
  isFailure,
  StatedResponse,
  StripeEnvironment,
} from '@atlassian/commerce-credit-card-base';
import { useCommerceFetch } from '@atlassian/commerce-environment';
import { HamsError } from '@atlassian/commerce-hams-client';

import { getStripeKey } from '../requests';

type HAMSStripeEnvironment = StripeEnvironment & {
  hams: {
    gateway: string | undefined;
  };
};

type Setters = {
  error: (error: string) => any;
  complete: (payload: HAMSStripeEnvironment) => any;
};

const createSetters = (
  setTokenHookResponse: Dispatch<
    SetStateAction<StatedResponse<HAMSStripeEnvironment>>
  >,
): Setters => ({
  error: (error: string) =>
    setTokenHookResponse({
      state: 'error',
      error,
    }),
  complete: (payload: HAMSStripeEnvironment) =>
    setTokenHookResponse({
      state: 'complete',
      payload,
    }),
});

const useTokenResponseState = (): [
  StatedResponse<HAMSStripeEnvironment>,
  Setters,
] => {
  const [tokenHookResponse, setTokenHookResponse] = useState<
    StatedResponse<HAMSStripeEnvironment>
  >({
    state: 'loading',
    payload: undefined,
  });
  const setters = useMemo(() => createSetters(setTokenHookResponse), [
    setTokenHookResponse,
  ]);
  return [tokenHookResponse, setters];
};

const failureResultToErrorMessage = (
  response: FailureResult<HamsError>,
): string =>
  isError(response) ? response.error.errorDetail : response.exception.message;

export const useHAMSTokenServiceHookWithUrl = (stripeKeyUrl: string) => {
  const [token, setters] = useTokenResponseState();
  const fetch = useCommerceFetch();

  useEffect(() => {
    (async () => {
      try {
        const keyResult = await getStripeKey(fetch, stripeKeyUrl);
        if (isFailure(keyResult)) {
          const compiledErrorMessage = failureResultToErrorMessage(keyResult);
          setters.error(compiledErrorMessage);
          return;
        }

        const { publishableKey, gateway } = keyResult.payload;

        if (publishableKey === undefined) {
          setters.error('Received invalid public key responses');
          return;
        }

        setters.complete({
          publicKey: publishableKey,
          hams: { gateway },
        });
      } catch (err) {
        setters.error(err.message || err);
      }
    })();
  }, [stripeKeyUrl, setters, fetch]);

  return token;
};
