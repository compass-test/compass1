import { useCallback, useContext } from 'react';

import {
  combineCreatePaymentMethodAndConfirmCardHooks,
  createCreditCardCustomError,
  createExceptionResult,
  createFieldCustomValidationError,
  createSuccessResult,
  FieldNames,
  isFailure,
  isSuccessful,
  StripeConfirmCardSetupOptions,
  UIAssociations,
  useConfirmCardPaymentTransaction,
  useConfirmCardSetupTransaction,
  useCreatePaymentMethodTransaction,
} from '@atlassian/commerce-credit-card-base';
import { usePollPaymentMethodService } from '@atlassian/commerce-payment-methods';

import { useBrandError } from '../brand-validation';
import { tokenContext } from '../context';

export const useCCPCreatePaymentMethod = () => {
  const token = useContext(tokenContext);
  const brandError = useBrandError();

  return useCreatePaymentMethodTransaction(
    useCallback(
      (createPaymentMethod) => async () => {
        if (token === undefined) {
          return createExceptionResult(
            new Error('token was not expected to be undefined'),
          );
        } else if (token.state !== 'complete') {
          return createExceptionResult(
            new Error(
              `Expected token state to be "complete" but got ${token.state}`,
            ),
          );
        }

        if (brandError !== undefined) {
          return createFieldCustomValidationError(
            brandError.message,
            FieldNames.NUMBER,
          );
        }

        const {
          intentSecret,
          paymentMethodId: ccpPaymentMethodId,
        } = token.payload;

        const result = await createPaymentMethod();
        if (isSuccessful(result)) {
          return createSuccessResult({
            // TODO: This shouldn't need to be returned at all but required due to the token being
            // encapsulated within the credit card package.
            intentSecret,
            ccpPaymentMethodId,
            ...result.payload,
          });
        }
        return result;
      },
      [brandError, token],
    ),
  );
};

export const useCCPConfirmCardSetup = () => {
  const token = useContext(tokenContext);
  const { fetchData: pollPaymentMethod } = usePollPaymentMethodService();

  const confirm = useConfirmCardSetupTransaction(
    useCallback(
      (confirmCardSetup) => async (
        stripePaymentMethodId: string,
        options?: StripeConfirmCardSetupOptions,
      ) => {
        if (token === undefined) {
          return createExceptionResult(
            new Error('token was not expected to be undefined'),
          );
        } else if (token.state !== 'complete') {
          return createExceptionResult(
            new Error(
              `Expected token state to be "complete" but got ${token.state}`,
            ),
          );
        }

        const {
          intentSecret,
          paymentMethodId,
          transactionAccountId,
        } = token.payload;

        const confirmCardResult = await confirmCardSetup(
          intentSecret,
          stripePaymentMethodId,
          options,
        );

        if (isFailure(confirmCardResult)) {
          return confirmCardResult;
        }

        try {
          await pollPaymentMethod({ transactionAccountId, paymentMethodId });
        } catch (error) {
          return createCreditCardCustomError(error.message, {
            type: UIAssociations.BindingLevels.ACTION,
          });
        }

        return confirmCardResult;
      },
      [pollPaymentMethod, token],
    ),
  );

  return token.state === 'complete' ? confirm : null;
};

export const useCCPCreatePaymentMethodAndConfirmCardSetup = combineCreatePaymentMethodAndConfirmCardHooks(
  useCCPCreatePaymentMethod,
  useCCPConfirmCardSetup,
);

export const useCCPConfirmCardPayment = () => {
  return useConfirmCardPaymentTransaction(
    useCallback((confirmCardPayment) => {
      return async (
        intentSecret: string,
        paymentMethodId?: string,
        options?: StripeConfirmCardSetupOptions,
      ) => {
        return confirmCardPayment(intentSecret, paymentMethodId, options);
      };
    }, []),
  );
};
