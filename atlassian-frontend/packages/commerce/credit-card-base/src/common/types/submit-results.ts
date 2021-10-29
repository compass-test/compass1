import {
  PaymentIntent as StripePaymentIntent,
  PaymentMethod as StripePaymentMethod,
  SetupIntent as StripeSetupIntent,
} from '@stripe/stripe-js';

import { Result } from '@atlassian/commerce-resultful';

import { CreditCardError } from '../utils/errors';

export type SubmissionResult<T> = Result<T, CreditCardError>;

export type CreatePaymentMethodPayload = {
  paymentMethod: StripePaymentMethod;
};

export type ConfirmedCardSetupPayload = {
  setupIntent: StripeSetupIntent;
};

export type ConfirmedCardPaymentPayload = {
  paymentIntent: StripePaymentIntent;
};
