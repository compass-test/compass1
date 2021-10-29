import React, { createContext, useContext } from 'react';

import {
  BaseCreditCardFormState,
  StripeServiceHook,
} from '@atlassian/commerce-credit-card-base';

import {
  CreateIntentSecretURLProvider,
  useHAMSServiceWithUrl,
} from '../../services/hams';
import { BrandValidationProvider } from '../../services/hams/brand-validation';

export type HAMSCreditCardFormStateProps = React.PropsWithChildren<{
  stripeKeyUrl?: string;
  paymentMethodTokenUrl?: string;
  useStripeService?: StripeServiceHook;
}>;

const hamsGatewayContext = createContext<string | undefined>(undefined);

export const useHAMSGateway = (): string | undefined => {
  return useContext(hamsGatewayContext);
};

const CreditCardFormStateWithService = ({
  children,
  stripeKeyUrl,
  paymentMethodTokenUrl,
  useStripeService,
}: HAMSCreditCardFormStateProps) => {
  const hamsService = useHAMSServiceWithUrl(stripeKeyUrl);

  const { token } = hamsService;

  return (
    <CreateIntentSecretURLProvider value={paymentMethodTokenUrl}>
      <hamsGatewayContext.Provider
        value={
          token.state === 'complete' ? token.payload.hams.gateway : undefined
        }
      >
        <BaseCreditCardFormState
          commerceService={hamsService}
          useStripeService={useStripeService}
        >
          {children}
        </BaseCreditCardFormState>
      </hamsGatewayContext.Provider>
    </CreateIntentSecretURLProvider>
  );
};

export const HAMSCreditCardFormState = ({
  children,
  stripeKeyUrl,
  paymentMethodTokenUrl,
  useStripeService,
}: HAMSCreditCardFormStateProps) => (
  <BrandValidationProvider>
    <CreditCardFormStateWithService
      stripeKeyUrl={stripeKeyUrl}
      paymentMethodTokenUrl={paymentMethodTokenUrl}
      useStripeService={useStripeService}
    >
      {children}
    </CreditCardFormStateWithService>
  </BrandValidationProvider>
);
