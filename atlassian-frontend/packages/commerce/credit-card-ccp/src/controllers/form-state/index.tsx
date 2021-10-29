import React from 'react';

import {
  BaseCreditCardFormState,
  StripeServiceHook,
} from '@atlassian/commerce-credit-card-base';

import { BrandValidationProvider } from '../brand-validation';
import { tokenContext } from '../context';
import { useCCPService } from '../hooks/use-ccp-service';

export type CCPCreditCardFormStateProps = React.PropsWithChildren<{
  accountId: string;
  useStripeService?: StripeServiceHook;
}>;

export const STRIPE_KEY_URL = `/hamlet/1.0/public/creditCard/stripeKey`;
export const PAYMENT_METHOD_TOKEN_URL = `/hamlet/1.0/public/creditCard/stripePaymentMethodToken`;

const CreditCardFormStateWithService = ({
  accountId,
  children,
  useStripeService,
}: CCPCreditCardFormStateProps) => {
  const ccpService = useCCPService(accountId);

  return (
    <tokenContext.Provider value={ccpService.token}>
      <BaseCreditCardFormState
        commerceService={ccpService}
        useStripeService={useStripeService}
      >
        {children}
      </BaseCreditCardFormState>
    </tokenContext.Provider>
  );
};

export const CCPCreditCardFormState = ({
  accountId,
  children,
  useStripeService,
}: CCPCreditCardFormStateProps) => (
  <BrandValidationProvider>
    <CreditCardFormStateWithService
      accountId={accountId}
      useStripeService={useStripeService}
    >
      {children}
    </CreditCardFormStateWithService>
  </BrandValidationProvider>
);
