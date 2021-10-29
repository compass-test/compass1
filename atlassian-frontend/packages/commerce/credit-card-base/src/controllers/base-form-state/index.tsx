import React, { useCallback, useMemo, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';

import { InternalCommerceTelemetryIntegrations } from '@atlassian/commerce-telemetry';

import { CC_STATE_PROVIDER } from '../../common/constants/breadcrumb-names';
import { Breadcrumb } from '../../common/utils/events';
import { FormStartTimeProvider } from '../../common/utils/start-time';
import { composeState, stateGuard } from '../../common/utils/state';
import { SafeGuard } from '../../common/utils/telemetry-safe-guard';
import {
  StripeServiceHook,
  useStripeService as useStripeServiceDI,
} from '../../services/stripe';
import { formContext, retryContext } from '../context';
import { FormStateController } from '../form-fields';
import { StripeProvider } from '../hooks/use-commerce-stripe';
import { CommerceService, StripeEnvironment } from '../types';
import { useStripePromise } from '../utils';
export interface BaseCreditCardFormStateProps {
  commerceService: CommerceService;
  /**
   * Usually not needed - Overrides the existing hook to get download and use the Stripe API
   */
  useStripeService?: StripeServiceHook;
}

const EMPTY_TOKEN: StripeEnvironment = {} as any;

export const BaseCreditCardFormState: React.FC<BaseCreditCardFormStateProps> = ({
  commerceService,
  useStripeService = useStripeServiceDI,
  children,
}) => {
  const { payload: token = EMPTY_TOKEN, ...tokenState } = commerceService.token;
  const { payload: stripe, ...stripeState } = useStripeService(token.publicKey);

  const { state, error } = composeState(tokenState, stripeState);

  const formState = stateGuard(stripe, state, error);

  const contextValue = useMemo(
    () => ({
      token,
      state: formState.state,
      fieldConfigs: commerceService.fieldConfigs,
    }),
    [formState.state, token, commerceService.fieldConfigs],
  );

  const [retryKey, setRetryKey] = useState(0);
  const retry = useCallback(() => setRetryKey((oldKey) => oldKey + 1), []);

  return (
    <FormStartTimeProvider>
      <InternalCommerceTelemetryIntegrations>
        <SafeGuard>
          <Breadcrumb name={CC_STATE_PROVIDER} isForDevsOnly>
            <StripeProvider value={stripe}>
              <retryContext.Provider value={retry} key={retryKey}>
                <formContext.Provider value={contextValue}>
                  <FormStateController>
                    <Elements
                      stripe={useStripePromise(formState.payload || null)}
                    >
                      {children}
                    </Elements>
                  </FormStateController>
                </formContext.Provider>
              </retryContext.Provider>
            </StripeProvider>
          </Breadcrumb>
        </SafeGuard>
      </InternalCommerceTelemetryIntegrations>
    </FormStartTimeProvider>
  );
};
