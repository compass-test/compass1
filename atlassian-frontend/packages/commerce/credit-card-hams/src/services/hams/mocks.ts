import { ok, serverFailure, url } from '@atlassian/commerce-environment/mocks';

import { ClientSecretPayload, StripeKeyPayload } from './requests';
import {
  PAYMENT_METHOD_TOKEN_URL,
  STRIPE_KEY_URL,
} from './use-hams-service/constants';

export type { ScenarioRequest } from '@atlassian/commerce-environment/mocks';
export { stripeOverride } from '@atlassian/commerce-credit-card-base/mocks';

export const scenarios = {
  stripeKeySuccess: {
    request: url(STRIPE_KEY_URL),
    response: ok<StripeKeyPayload>({
      publishableKey: 'hams-mocked-key',
      gateway: 'STRIPE_NL',
    }),
  },
  stripeKeyServerFailure: {
    request: url(STRIPE_KEY_URL, 'POST'),
    response: serverFailure(),
  },
  stripePaymentMethodTokenSuccess: {
    request: url(PAYMENT_METHOD_TOKEN_URL),
    response: ok<ClientSecretPayload>({
      setupIntentClientSecret: 'xx_yy_secret_zz',
    }),
  },
  stripePaymentMethodServerFailure: {
    request: url(PAYMENT_METHOD_TOKEN_URL, 'POST'),
    response: serverFailure(),
  },
};
