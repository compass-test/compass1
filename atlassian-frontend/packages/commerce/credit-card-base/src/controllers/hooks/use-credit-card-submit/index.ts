import { useCallback, useContext } from 'react';

import {
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  CreatePaymentMethodCardData,
  PaymentMethodCreateParams,
  Stripe,
  StripeCardNumberElement,
  ConfirmCardSetupOptions as StripeConfirmCardSetupOptions,
  StripeError,
} from '@stripe/stripe-js';

import {
  timeDuration,
  TimingData,
} from '@atlassian/commerce-events-telemetry-react/timing';
import { sanitizeUrlString } from '@atlassian/commerce-privacy/url';
import {
  createExceptionResult,
  createSuccessResult,
  ExceptionResult,
  isError,
  isFailure,
  isSuccessful,
} from '@atlassian/commerce-resultful';

import * as FieldNames from '../../../common/constants/field-names';
import {
  CreatePaymentMethodPayload,
  SubmissionResult,
} from '../../../common/types/submit-results';
import {
  createFieldCreditCardStripeError,
  createFieldCustomValidationError,
  createGenericCreditCardStripeError,
  UIAssociations,
} from '../../../common/utils/errors';
import {
  useConfirmCardPaymentResultEventDispatch,
  useConfirmCardSetupResultEventDispatch,
  useCreatePaymentMethodEventDispatch,
  UseEventDispatchHook,
} from '../../../common/utils/events';
import { formStateRefs } from '../../context';
import { useSetCreditCardFailure } from '../use-credit-card-failure';
import { useCardFields } from '../use-credit-card-fields';

const ERROR_MAPPING: Record<string, FieldNames.FieldName> = {
  incomplete_number: FieldNames.NUMBER,
  incorrect_number: FieldNames.NUMBER,
  invalid_number: FieldNames.NUMBER,

  incomplete_name: FieldNames.NAME,

  incomplete_expiry: FieldNames.EXPIRY,
  invalid_expiry_year: FieldNames.EXPIRY,
  invalid_expiry_month_past: FieldNames.EXPIRY,
  invalid_expiry_year_past: FieldNames.EXPIRY,

  incomplete_cvc: FieldNames.CVC,
  incorrect_cvc: FieldNames.CVC,
  invalid_cvc: FieldNames.CVC,
};

type PaymentMethod = Omit<CreatePaymentMethodCardData, 'type'> & {
  card: StripeCardNumberElement;
};

const useFailureResultUIHandlerWrapper = <ArgsType extends any[], ReturnedType>(
  callback: (...args: ArgsType) => Promise<SubmissionResult<ReturnedType>>,
): typeof callback => {
  const setFailure = useSetCreditCardFailure();
  const [refs] = useContext(formStateRefs);

  const trackedAction = useCallback(
    async (...args: ArgsType) => {
      setFailure(undefined);

      const result = await callback(...args);

      if (isSuccessful(result)) {
        return result;
      }

      if (
        isError(result) &&
        result.error.association.type === UIAssociations.BindingLevels.INPUT
      ) {
        // TODO: Refactor this to be castless
        const ref = refs[result.error.association.name as FieldNames.FieldName];
        ref.setFailure(result);
        ref.focus();
      } else {
        setFailure(result);
      }

      return result;
    },
    [setFailure, callback, refs],
  );

  return trackedAction;
};

type TryCatchExceptionWrapperHook = {
  <ArgsType extends any[], ReturnedType>(
    callback: (...args: ArgsType) => Promise<ReturnedType>,
  ): (
    ...args: ArgsType
  ) => Promise<ReturnedType> | Promise<ExceptionResult<any>>;
  <ArgsType extends any[], ReturnedType>(
    callback: (...args: ArgsType) => ReturnedType,
  ): (...args: ArgsType) => Promise<ReturnedType | ExceptionResult<any>>;
};
// TODO: Put this in another file or package
export const useTryCatchToExceptionResultWrapper: TryCatchExceptionWrapperHook = (
  callback: (...args: any[]) => any,
) => {
  const callbackWrapper = async (...args: Parameters<typeof callback>) => {
    try {
      return await callback(...args);
    } catch (err) {
      return createExceptionResult(err);
    }
  };

  const trackedAction = useFailureResultUIHandlerWrapper(callbackWrapper);

  return trackedAction;
};

const wrapHookWithSubmissionWrappers = <
  SubmitHookArgsType extends any[],
  SubmitArgsType extends any[],
  SuccessPayload
>(
  useEventDispatch: UseEventDispatchHook<TimingData<SubmissionResult<any>>>,
  useSubmitHook: (
    ...args: SubmitHookArgsType
  ) => (...args: SubmitArgsType) => Promise<SubmissionResult<SuccessPayload>>,
): typeof useSubmitHook => {
  const useWrappedSubmitHook = (...args: SubmitHookArgsType) => {
    const submit = useSubmitHook(...args);

    const wrappedSubmit = useTryCatchToExceptionResultWrapper(
      useFailureResultUIHandlerWrapper(
        useTryCatchToExceptionResultWrapper(submit),
      ),
    );

    const dispatchEvent = useEventDispatch();

    const eventDispatchedSubmit = useCallback(
      async (...submitArgs: SubmitArgsType) => {
        const timingData = await timeDuration(() =>
          wrappedSubmit(...submitArgs),
        );
        dispatchEvent(timingData);
        return timingData.timedPayload;
      },
      [dispatchEvent, wrappedSubmit],
    );

    return eventDispatchedSubmit;
  };

  return useWrappedSubmitHook;
};

type ResolvedReturnType<
  T extends (...args: any[]) => Promise<any>
> = T extends (...args: any[]) => Promise<infer K> ? K : never;

type StripeErrorHolder = {
  error?: StripeError;
};
type StripeResult = StripeErrorHolder & Record<string, any>;

const stripeResultErrorHandlingWrapper = <
  T extends (...args: any[]) => Promise<StripeResult>,
  P,
  R
>(
  callback: T,
  getStripePayload: (result: ResolvedReturnType<typeof callback>) => P,
  createCommercePayload: (stripePayload: Exclude<P, undefined>) => R,
): ((...args: Parameters<typeof callback>) => Promise<SubmissionResult<R>>) => {
  return async (...args) => {
    const result = (await callback(...args)) as ResolvedReturnType<
      typeof callback
    >;

    if (result.error !== undefined) {
      const mappedErrorField =
        result.error.code !== undefined
          ? ERROR_MAPPING[result.error.code]
          : undefined;

      if (mappedErrorField !== undefined) {
        return createFieldCreditCardStripeError(result.error, mappedErrorField);
      } else {
        // TODO: Revisit this as many are likely not generic errors
        return createGenericCreditCardStripeError(result.error);
      }
    }

    const payload = getStripePayload(result);
    if (payload === undefined) {
      return createExceptionResult(new Error('Payload was undefined'));
    }

    return createSuccessResult(
      createCommercePayload(payload as Exclude<P, undefined>),
    );
  };
};

const createPaymentMethod = stripeResultErrorHandlingWrapper(
  (stripe: Stripe, paymentMethodData: PaymentMethod) =>
    stripe.createPaymentMethod({
      type: 'card',
      ...paymentMethodData,
    }),
  ({ paymentMethod }) => paymentMethod,
  (paymentMethod) => ({ paymentMethod }),
);

/**
 * Combines the create payment method API and the confirm card API.
 * Payment method API is used to get CC details.
 * Confirm CC API is used to get the setup intent.
 * @see https://stripe.com/docs/js/payment_intents/confirm_card_payment
 * @see https://stripe.com/docs/js/payment_methods/create_payment_method
 */
const confirmCardSetup = stripeResultErrorHandlingWrapper(
  (
    stripe: Stripe,
    intentSecret: string,
    paymentMethodId: string,
    options?: StripeConfirmCardSetupOptions,
  ) =>
    stripe.confirmCardSetup(
      intentSecret,
      {
        payment_method: paymentMethodId,
      },
      options,
    ),
  ({ setupIntent }) => setupIntent,
  (setupIntent) => ({ setupIntent }),
);

const confirmCardPayment = stripeResultErrorHandlingWrapper(
  (
    stripe: Stripe,
    intentSecret: string,
    paymentMethodId?: string,
    options?: StripeConfirmCardSetupOptions,
  ) =>
    stripe.confirmCardPayment(
      intentSecret,
      paymentMethodId
        ? {
            payment_method: paymentMethodId,
          }
        : undefined,
      options,
    ),
  ({ paymentIntent }) => paymentIntent,
  (paymentIntent) => ({ paymentIntent }),
);

const useBaseCreatePaymentMethod = () => {
  const elements = useElements();
  const fields = useCardFields();

  const validateFormAndCreatePaymentMethod = useCallback(
    async (
      stripe: Stripe,
      billingDetails?: PaymentMethodCreateParams.BillingDetails,
    ) => {
      if (elements === null) {
        return createExceptionResult(
          new Error(
            'Expected it to be impossible for Stripe not to be loaded at this point',
          ),
        );
      }

      const element = elements.getElement(CardNumberElement);
      if (element === null) {
        const message = 'Your creditcard number is incomplete.';
        const errorResult = createFieldCustomValidationError(
          message,
          FieldNames.NUMBER,
        );

        return errorResult;
      }

      if (!fields.name) {
        const message = 'Your cardholder name is incomplete.';
        return createFieldCustomValidationError(
          message,
          FieldNames.NAME,
          message,
        );
      }

      return createPaymentMethod(stripe, {
        card: element,
        billing_details: {
          ...fields,
          ...billingDetails,
        },
        metadata: {
          'globalThis.location.href': sanitizeUrlString(
            globalThis.location.href,
          ),
        },
      });
    },
    [elements, fields],
  );

  return validateFormAndCreatePaymentMethod;
};

type SubmitFunction<ArgsType extends any[], SuccessPayload> = (
  ...args: ArgsType
) => Promise<SubmissionResult<SuccessPayload>>;
export type TransactionCallback<
  OriginalSubmitArgsType extends any[],
  OriginalSubmitReturnType,
  NewSubmitArgsType extends any[],
  NewSubmitReturnType
> = (
  originalSubmit: SubmitFunction<
    OriginalSubmitArgsType,
    OriginalSubmitReturnType
  >,
) => SubmitFunction<NewSubmitArgsType, NewSubmitReturnType>;
export type TransactionHook<
  OriginalSubmitArgsType extends any[],
  OriginalSubmitReturnType
> = <NewSubmitArgsType extends any[], NewSubmitReturnType>(
  tranasctionCallback: TransactionCallback<
    OriginalSubmitArgsType,
    OriginalSubmitReturnType,
    NewSubmitArgsType,
    NewSubmitReturnType
  >,
) => SubmitFunction<NewSubmitArgsType, NewSubmitReturnType>;
const createUseSubmitTransactionHook = <
  OriginalSubmitArgsType extends any[],
  OriginalSubmitReturnType
>(
  useEventDispatch: UseEventDispatchHook<TimingData<SubmissionResult<any>>>,
  useSubmitHook: () => SubmitFunction<
    OriginalSubmitArgsType,
    OriginalSubmitReturnType
  >,
): TransactionHook<OriginalSubmitArgsType, OriginalSubmitReturnType> => {
  const useTransaction: TransactionHook<
    OriginalSubmitArgsType,
    OriginalSubmitReturnType
  > = (transaction) => {
    const submit = useSubmitHook();

    // AFP-2511 TODO: Fix automatic suppressions below
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const consumerWrappedSubmit = useCallback(transaction(submit), [
      submit,
      transaction,
    ]);

    return consumerWrappedSubmit;
  };

  const useSubmitTransaction = wrapHookWithSubmissionWrappers(
    useEventDispatch,
    useTransaction,
  );

  return useSubmitTransaction;
};

export const useCreatePaymentMethodWithStripeTransaction = createUseSubmitTransactionHook(
  useCreatePaymentMethodEventDispatch,
  useBaseCreatePaymentMethod,
);

const useBaseConfirmCardSetup = () => confirmCardSetup;
export const useConfirmCardSetupWithStripeTransaction = createUseSubmitTransactionHook(
  useConfirmCardSetupResultEventDispatch,
  useBaseConfirmCardSetup,
);

const useBaseConfirmCardPayment = () => confirmCardPayment;
export const useConfirmCardPaymentWithStripeTransaction = createUseSubmitTransactionHook(
  useConfirmCardPaymentResultEventDispatch,
  useBaseConfirmCardPayment,
);

type SubmitWithStripeFunction<ArgsType extends any[], SuccessPayload> = (
  stripe: Stripe,
  ...args: ArgsType
) => Promise<SubmissionResult<SuccessPayload>>;

const wrapUseTransactionInFormStripe = <ArgsType extends any[], SuccessPayload>(
  useSubmitWithStripeTransaction: <
    NewArgsType extends any[],
    NewSuccessPayload
  >(
    transactionCallback: (
      submit: SubmitWithStripeFunction<ArgsType, SuccessPayload>,
    ) => SubmitFunction<NewArgsType, NewSuccessPayload>,
  ) => SubmitFunction<NewArgsType, NewSuccessPayload>,
) => {
  const useSubmitTransaction = <NewArgsType extends any[], NewSuccessPayload>(
    transactionCallback: (
      submit: SubmitFunction<ArgsType, SuccessPayload>,
    ) => SubmitFunction<NewArgsType, NewSuccessPayload>,
  ) => {
    const stripe = useStripe();
    const newSubmit = useSubmitWithStripeTransaction(
      useCallback(
        (submit) =>
          transactionCallback((...args: ArgsType) => submit(stripe!, ...args)),
        [stripe, transactionCallback],
      ),
    );
    return stripe !== null ? newSubmit : null;
  };

  return useSubmitTransaction;
};

export const useCreatePaymentMethodTransaction = wrapUseTransactionInFormStripe(
  useCreatePaymentMethodWithStripeTransaction,
);

export const useConfirmCardSetupTransaction = wrapUseTransactionInFormStripe(
  useConfirmCardSetupWithStripeTransaction,
);

export const useConfirmCardPaymentTransaction = wrapUseTransactionInFormStripe(
  useConfirmCardPaymentWithStripeTransaction,
);

export type UseSubmissionHook<CallbackType> = () => CallbackType | null;
export type UseCreatePaymentMethod = UseSubmissionHook<
  () => Promise<SubmissionResult<CreatePaymentMethodPayload>>
>;
export type UseConfirmCard<ConfirmCardPayloadType> = () =>
  | ((
      paymentMethodId: string,
      options?: StripeConfirmCardSetupOptions,
    ) => Promise<SubmissionResult<ConfirmCardPayloadType>>)
  | null;
/**
 * Utility method that combines your {@link UseCreatePaymentMethod} and {@link UseConfirmCard} hooks together
 * so you don't have to do so manually.
 */
export const combineCreatePaymentMethodAndConfirmCardHooks = <
  CreatePaymentMethodPayloadType extends CreatePaymentMethodPayload,
  ConfirmCardPayloadType extends Record<any, any>
>(
  useCreatePaymentMethod: UseSubmissionHook<
    () => Promise<SubmissionResult<CreatePaymentMethodPayloadType>>
  >,
  useConfirmCard: UseConfirmCard<ConfirmCardPayloadType>,
) => {
  const useCreatePaymentMethodAndConfirmCard = () => {
    const createPaymentMethod = useCreatePaymentMethod();
    const confirmCard = useConfirmCard();

    const confirm = useCallback(
      async (options?: StripeConfirmCardSetupOptions) => {
        const paymentMethodResult = await createPaymentMethod!();
        if (isFailure(paymentMethodResult)) {
          return paymentMethodResult;
        }
        const confirmCardResult = await confirmCard!(
          paymentMethodResult.payload.paymentMethod.id,
          options,
        );

        if (isFailure(confirmCardResult)) {
          return confirmCardResult;
        }

        return createSuccessResult({
          ...paymentMethodResult.payload,
          ...confirmCardResult.payload,
        });
      },
      [createPaymentMethod, confirmCard],
    );

    return createPaymentMethod !== null && confirmCard !== null
      ? confirm
      : null;
  };

  return useCreatePaymentMethodAndConfirmCard;
};
