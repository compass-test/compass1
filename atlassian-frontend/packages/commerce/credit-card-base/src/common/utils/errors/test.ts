import { StripeError } from '@stripe/stripe-js';

import {
  createExceptionResult,
  ErrorResult,
} from '@atlassian/commerce-resultful';

import {
  createFieldCreditCardStripeError,
  createFieldCustomValidationError,
  createGenericCreditCardStripeError,
  CreditCardError,
  getUserFriendlyFailureMessage,
  isPaymentAuthenticationFailureResult,
  isSystemErrorResult,
} from './index';

const expectIsPaymentAuthenticationFailureResult = (
  result: ErrorResult<CreditCardError>,
) => expect(isPaymentAuthenticationFailureResult(result));

const expectIsSystemErrorResult = (result: ErrorResult<CreditCardError>) =>
  expect(isSystemErrorResult(result));

const stripeCardError: StripeError = {
  type: 'card_error',
  message: 'card error message',
};

const stripeValidationError: StripeError = {
  type: 'validation_error',
  message: 'validation error message',
};

const stripeRateLimitError: StripeError = {
  type: 'rate_limit_error',
  message: 'rate limited error message',
};

const stripeConfirmCardSetupAuthenticationError: StripeError = {
  type: 'invalid_request_error',
  code: 'payment_intent_authentication_failure',
  message: 'authentication error message',
};

const stripeConfirmCardPaymentAuthenticationError: StripeError = {
  type: 'invalid_request_error',
  code: 'setup_intent_authentication_failure',
  message: 'authentication error message',
};

type StripeTestCaseExpectedValues = {
  isSystemErrorResult: boolean;
  isPaymentAuthenticationFailureResult: boolean;
};
const stripeTestCase = <T extends (...args: any[]) => any>(
  resultFactory: T,
  stripeError: StripeError,
  ...otherArgs: any[]
) => {
  const expectUtilityReturnValuesToBe = ({
    isSystemErrorResult: isSystemErrorResultValue,
    isPaymentAuthenticationFailureResult: isPaymentAuthenticationFailureResultValue,
  }: StripeTestCaseExpectedValues) => {
    describe(`${resultFactory.name} with Stripe Error type ${stripeError.type} and code ${stripeError.code}`, () => {
      const result = resultFactory(stripeError, ...otherArgs);
      it(`${isSystemErrorResult.name} evaluates to ${isSystemErrorResultValue}`, () => {
        expectIsSystemErrorResult(result).toBe(isSystemErrorResultValue);
      });
      it(`${isPaymentAuthenticationFailureResult.name} evaluates to ${isPaymentAuthenticationFailureResultValue}`, () => {
        expectIsPaymentAuthenticationFailureResult(result).toBe(
          isPaymentAuthenticationFailureResultValue,
        );
      });
    });
  };

  return {
    expectUtilityReturnValuesToBe,
  };
};

describe('errors', () => {
  stripeTestCase(
    createGenericCreditCardStripeError,
    stripeValidationError,
  ).expectUtilityReturnValuesToBe({
    isSystemErrorResult: false,
    isPaymentAuthenticationFailureResult: false,
  });

  stripeTestCase(
    createFieldCreditCardStripeError,
    stripeCardError,
  ).expectUtilityReturnValuesToBe({
    isSystemErrorResult: false,
    isPaymentAuthenticationFailureResult: false,
  });

  stripeTestCase(
    createGenericCreditCardStripeError,
    stripeRateLimitError,
  ).expectUtilityReturnValuesToBe({
    isSystemErrorResult: true,
    isPaymentAuthenticationFailureResult: false,
  });

  stripeTestCase(
    createGenericCreditCardStripeError,
    stripeConfirmCardPaymentAuthenticationError,
  ).expectUtilityReturnValuesToBe({
    isSystemErrorResult: false,
    isPaymentAuthenticationFailureResult: true,
  });

  stripeTestCase(
    createGenericCreditCardStripeError,
    stripeConfirmCardSetupAuthenticationError,
  ).expectUtilityReturnValuesToBe({
    isSystemErrorResult: false,
    isPaymentAuthenticationFailureResult: true,
  });

  describe(`${createFieldCustomValidationError.name}`, () => {
    const result = createFieldCustomValidationError('', '');
    it(`always evaluates to false for ${isSystemErrorResult.name}`, () => {
      expectIsSystemErrorResult(result).toBe(false);
    });
    it(`always evaluates to false for ${isPaymentAuthenticationFailureResult}`, () => {
      expectIsPaymentAuthenticationFailureResult(result).toBe(false);
    });
  });
});

describe(`${getUserFriendlyFailureMessage.name}`, () => {
  describe('shows error messages for', () => {
    it('non-system Stripe errors', () => {
      const errorResult = createGenericCreditCardStripeError(stripeCardError);
      // Just making sure that this error is a system error
      expect(isSystemErrorResult(errorResult)).toBe(false);
      expect(getUserFriendlyFailureMessage(errorResult)).toBe(
        stripeCardError.message,
      );
    });
    it('Commerce errors with user friendly messages', () => {
      const userFriendlyMessage = 'user friendly message';
      const errorResult = createFieldCustomValidationError(
        'non friendly message',
        'not relevant',
        userFriendlyMessage,
      );
      expect(getUserFriendlyFailureMessage(errorResult)).toBe(
        userFriendlyMessage,
      );
    });
  });
  describe('no user friendly message for', () => {
    it('Exception results', () => {
      // Not <any> is here to bypass the attempt to ensure exceptions are always Error instances (They should be don't have to be)
      const exceptionResult = createExceptionResult<any>(
        /this-could-be-literally-anything/,
      );
      expect(getUserFriendlyFailureMessage(exceptionResult)).toBe(undefined);
    });
    it('Stripe system errors', () => {
      const errorResult = createGenericCreditCardStripeError(
        stripeRateLimitError,
      );
      // Just making sure that this error is a system error
      expectIsSystemErrorResult(errorResult).toBe(true);
      expect(getUserFriendlyFailureMessage(errorResult)).toBeUndefined();
    });
    it('Commerce errors with no user friendly message', () => {
      const errorResult = createFieldCustomValidationError(
        'non friendly message',
        'no relevant',
      );
      expect(getUserFriendlyFailureMessage(errorResult)).toBeUndefined();
    });
  });
});
