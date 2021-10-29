import { StripeError } from '@stripe/stripe-js';

import {
  createErrorResult,
  ErrorResult,
  FailureResult,
  isError,
  isException,
  Result,
} from '@atlassian/commerce-resultful';

import * as ErrorTypes from './error-types';
import * as UIAssociations from './error-ui-associations';

export { ErrorTypes, UIAssociations };

export type UIAssociationHolder<
  T extends UIAssociations.UIAssociation = UIAssociations.UIAssociation
> = {
  association: T;
};

export type SharedErrorInformation<
  T extends UIAssociations.UIAssociation = UIAssociations.UIAssociation
> = UIAssociationHolder<T>;

export type CreditCardCustomError = {
  type: typeof ErrorTypes.COMMERCE_CREDIT_CARD_ERROR;
  /**
   * A message we can show the developers that will help them understand what's gone wrong
   */
  message: string;
  /**
   * A message we can show the user that will help them understand what's gone wrong
   */
  userFriendlyMessage?: string;
} & SharedErrorInformation;

export type CreditCardStripe = {
  type: typeof ErrorTypes.STRIPE_ERROR;
  stripeError: StripeError;
} & SharedErrorInformation;

// TODO: Standarize naming
const createCreditCardStripe = (
  stripeError: StripeError,
  association: UIAssociations.UIAssociation,
): ErrorResult<CreditCardStripe> =>
  createErrorResult({
    type: ErrorTypes.STRIPE_ERROR,
    stripeError,
    association,
  });

export const createGenericCreditCardStripeError = (
  stripeError: StripeError,
): ErrorResult<CreditCardStripe> =>
  createCreditCardStripe(stripeError, {
    type: UIAssociations.BindingLevels.NONE,
  });

export const createFieldCreditCardStripeError = (
  stripeError: StripeError,
  fieldName: string,
): ErrorResult<CreditCardStripe> =>
  createCreditCardStripe(stripeError, {
    type: UIAssociations.BindingLevels.INPUT,
    name: fieldName,
  });

export const createCreditCardCustomError = (
  message: string,
  association: UIAssociations.UIAssociation,
  userFriendlyMessage?: string,
) =>
  createErrorResult({
    type: ErrorTypes.COMMERCE_CREDIT_CARD_ERROR,
    message,
    association,
    userFriendlyMessage,
  } as const);

export const createFieldCustomValidationError = (
  message: string,
  fieldName: string,
  userFriendlyMessage?: string,
): ErrorResult<CreditCardCustomError> =>
  createCreditCardCustomError(
    message,
    {
      type: UIAssociations.BindingLevels.INPUT,
      name: fieldName,
    },
    userFriendlyMessage,
  );

export type CreditCardError = CreditCardCustomError | CreditCardStripe;

/**
 * Useful if you want to figure out if a error is worth logging (say, to Sentry)
 * @returns
 * true if the user was the one who caused the error in the first place. E.g. They used an invalid card/validation error
 * false if it's something in our code or service communication, etc has caused it.
 */
export const isSystemErrorResult = (
  result: Result<any, CreditCardError, any>,
): result is ErrorResult<CreditCardError> => {
  if (!isError(result)) {
    return false;
  }

  switch (result.error.type) {
    case ErrorTypes.COMMERCE_CREDIT_CARD_ERROR:
      return false;
    case ErrorTypes.STRIPE_ERROR:
      switch (result.error.stripeError.type) {
        case 'card_error':
        case 'validation_error':
        case 'api_connection_error': // Happens, primarily, when you have a bad internet connection
          return false;
        case 'invalid_request_error':
          switch (result.error.stripeError.code) {
            case 'payment_intent_authentication_failure':
            case 'setup_intent_authentication_failure':
              // These errors are initiated by the user
              return false;
            default:
              return true;
          }
        default:
          return true;
      }
    default:
      return true;
  }
};

export const getUserFriendlyFailureMessage = (
  result: FailureResult<CreditCardError, any>,
): string | undefined => {
  if (isException(result)) {
    return undefined;
  }

  const { error } = result;
  switch (error.type) {
    case ErrorTypes.COMMERCE_CREDIT_CARD_ERROR:
      return error.userFriendlyMessage;
    case ErrorTypes.STRIPE_ERROR:
      if (isSystemErrorResult(result)) {
        // We're assuming Stripe won't have user friendly messages for system errors
        return undefined;
      }
      return error.stripeError.message;
  }
};

/**
 * @returns true if the error is a 3DS failure (both caused by either the system/internals or user)
 */
export const isPaymentAuthenticationFailureResult = (
  result: Result<any, CreditCardError, any>,
): boolean => {
  if (!isError(result)) {
    return false;
  }
  const { error } = result;
  if (error.type !== ErrorTypes.STRIPE_ERROR) {
    return false;
  }

  const { stripeError } = error;
  if (stripeError.code === undefined) {
    return false;
  }

  return [
    'authentication_required',
    'payment_intent_authentication_failure',
    'setup_intent_authentication_failure',
  ].includes(stripeError.code);
};
