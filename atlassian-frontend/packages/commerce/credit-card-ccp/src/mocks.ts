import { ok, serverFailure, url } from '@atlassian/commerce-environment/mocks';
import {
  scenarios as paymentMethodScenarios,
  visaPaymentMethodId,
} from '@atlassian/commerce-payment-methods/mocks';

import type { CcpStripeIntent } from './controllers/hooks/use-ccp-token';
import { SETUP_INTENT_URL } from './controllers/hooks/use-ccp-token/constants';

export {
  stripeOverride,
  stripeConfirmCardPaymentErrorOverride,
  stripeConfirmCardSetupErrorOverride,
} from '@atlassian/commerce-credit-card-base/mocks';

export type { CcpStripeIntent };

export const scenarios = {
  success: {
    request: url(SETUP_INTENT_URL, 'POST'),
    response: ok<CcpStripeIntent>({
      publicKey: 'mocked-key',
      clientSecret: 'xx_yy_mockedsecret_zz',
      paymentMethodId: visaPaymentMethodId,
    }),
  },
  serverFailure: {
    request: url(SETUP_INTENT_URL, 'POST'),
    response: serverFailure(),
  },
};

export const ccpCreditCardSetupSuccessScenarios = [
  scenarios.success,
  paymentMethodScenarios.paymentMethodSuccess,
];
