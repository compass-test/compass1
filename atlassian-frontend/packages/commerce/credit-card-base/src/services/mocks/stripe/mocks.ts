import { loadStripe } from '@stripe/stripe-js';

import { asCommerceOverride } from '@atlassian/commerce-environment/mocks';

import { createMockedStripeLoader } from './index';

export const stripeOverride = asCommerceOverride(
  loadStripe,
  createMockedStripeLoader(),
);

export const stripeConfirmCardPaymentErrorOverride = asCommerceOverride(
  loadStripe,
  createMockedStripeLoader({
    failureScenariosForMethods: ['confirmCardPayment'],
  }),
);

export const stripeConfirmCardSetupErrorOverride = asCommerceOverride(
  loadStripe,
  createMockedStripeLoader({
    failureScenariosForMethods: ['confirmCardSetup'],
  }),
);
