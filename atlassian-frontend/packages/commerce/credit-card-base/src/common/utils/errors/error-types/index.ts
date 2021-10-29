export const STRIPE_ERROR = 'stripe-error';
export const COMMERCE_CREDIT_CARD_ERROR = 'commerce-credit-card-error';

export type ErrorType = typeof STRIPE_ERROR | typeof COMMERCE_CREDIT_CARD_ERROR;
