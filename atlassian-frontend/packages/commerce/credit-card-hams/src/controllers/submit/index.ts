import { useCallback } from 'react';

import {
  combineCreatePaymentMethodAndConfirmCardHooks,
  createCreditCardCustomError,
  createFieldCustomValidationError,
  createSuccessResult,
  FieldNames,
  isFailure,
  StripeConfirmCardSetupOptions,
  UIAssociations,
  useConfirmCardPaymentWithStripeTransaction,
  useConfirmCardSetupTransaction,
  useCreatePaymentMethodTransaction,
  useTryCatchToExceptionResultWrapper,
} from '@atlassian/commerce-credit-card-base';
import { useCommerceFetch } from '@atlassian/commerce-environment';

import { useIntentSecretURL } from '../../services/hams';
import { useBrandError } from '../../services/hams/brand-validation';
import { createSetupIntentClientSecret } from '../../services/hams/requests';
import { useHAMSGateway } from '../form-state';

const useBrandValidator = () => {
  const brandError = useBrandError();

  const validate = useCallback(() => {
    if (brandError !== undefined) {
      return createFieldCustomValidationError(
        brandError.message,
        FieldNames.NUMBER,
      );
    }

    return createSuccessResult(null);
  }, [brandError]);

  return useTryCatchToExceptionResultWrapper(validate);
};

const useCreateSetupIntentClientSecret = () => {
  const fetch = useCommerceFetch();
  const url = useIntentSecretURL();
  const gateway = useHAMSGateway();

  const createSetupIntentClientSecretCallback = useCallback(async () => {
    const setupIntentSecretResult = await createSetupIntentClientSecret(
      fetch,
      url,
      { gateway: gateway! },
    );

    if (isFailure(setupIntentSecretResult)) {
      return createCreditCardCustomError('Setup intent secret was invalid', {
        type: UIAssociations.BindingLevels.NONE,
      });
    }

    return setupIntentSecretResult;
  }, [fetch, url, gateway]);

  return createSetupIntentClientSecretCallback;
};

/**
 * Consider using {@link useHAMSOneTimePaymentConfirm} or {@link useHAMSRenewablePaymentConfirm} if you do not need
 * manual control over when certain Stripe objects are created.
 * @see https://stripe.com/docs/js/payment_methods/create_payment_method
 */
export const useHAMSCreatePaymentMethod = () => {
  const validate = useBrandValidator();

  return useCreatePaymentMethodTransaction(
    useCallback(
      (create) => async (...args: Parameters<typeof create>) => {
        const validationResult = await validate();

        if (isFailure(validationResult)) {
          return validationResult;
        }

        return create(...args);
      },
      [validate],
    ),
  );
};

export const useHAMSConfirmCardSetup = () => {
  const createSetupIntentClientSecretCallback = useCreateSetupIntentClientSecret();

  return useConfirmCardSetupTransaction(
    useCallback(
      (confirm) => async (
        paymentMethodId: string,
        options?: StripeConfirmCardSetupOptions,
      ) => {
        const setupIntentSecretResult = await createSetupIntentClientSecretCallback();

        if (isFailure(setupIntentSecretResult)) {
          return setupIntentSecretResult;
        }

        return confirm(
          setupIntentSecretResult.payload.setupIntentClientSecret,
          paymentMethodId,
          options,
        );
      },
      [createSetupIntentClientSecretCallback],
    ),
  );
};

/**
 * Use this if you want to create a payment method that can be transacted with multiple times.
 * @see {@link useHAMSRenewablePaymentConfirm}
 * @see https://stripe.com/docs/js/payment_methods/create_payment_method
 * @see https://stripe.com/docs/js/setup_intents/confirm_card_setup
 */
export const useHAMSRenewablePaymentConfirm = combineCreatePaymentMethodAndConfirmCardHooks(
  useHAMSCreatePaymentMethod,
  useHAMSConfirmCardSetup,
);

/**
 * Use this if you want to create a payment method for a one-time transaction.
 * @see {@link useHAMSRenewablePaymentConfirm}
 * @see https://stripe.com/docs/js/payment_methods/create_payment_method
 * @see https://stripe.com/docs/js/setup_intents/confirm_card_setup
 */
export const useHAMSOneTimePaymentConfirm = useHAMSRenewablePaymentConfirm;

export const useHAMSConfirmCardPaymentWithStripe = () =>
  useConfirmCardPaymentWithStripeTransaction((confirm) => confirm);
