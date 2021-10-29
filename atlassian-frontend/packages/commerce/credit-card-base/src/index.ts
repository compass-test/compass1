import * as FieldNames from './common/constants/field-names';
export { FieldNames };

export { CreditCardForm } from './ui/form';
export {
  CreditCardErrorMessage,
  CreditCardFormErrorMessage,
  CreditCardPageErrorMessage,
  CreditCardSubmissionErrorMessage,
} from './ui/error-message';
export type { CreditCardErrorMessageProps } from './ui/error-message';
export { BaseCreditCardFormState } from './controllers/base-form-state';
export type { BaseCreditCardFormStateProps } from './controllers/base-form-state';
export type { Language } from './common/utils/i18n-hack';
export {
  LanguagePreferencesProvider,
  usePreferredLanguage,
  isJapaneseLanguage,
} from './common/utils/i18n-hack';

export { useCreditCardState } from './controllers/hooks/use-credit-card-state';
export type {
  CreatePaymentMethodPayload,
  ConfirmedCardSetupPayload,
  SubmissionResult,
} from './common/types/submit-results';
export {
  combineCreatePaymentMethodAndConfirmCardHooks,
  useConfirmCardPaymentTransaction,
  useConfirmCardPaymentWithStripeTransaction,
  useConfirmCardSetupTransaction,
  useConfirmCardSetupWithStripeTransaction,
  useCreatePaymentMethodTransaction,
  useCreatePaymentMethodWithStripeTransaction,
  useTryCatchToExceptionResultWrapper,
} from './controllers/hooks/use-credit-card-submit';

export { useCreditCardRetry } from './controllers/hooks/use-credit-card-retry';
export { useCreditCardIsReady } from './controllers/hooks/use-creditcard-ready';

export { useCreditCardFailure } from './controllers/hooks/use-credit-card-failure';

export { useCommerceStripe } from './controllers/hooks/use-commerce-stripe';

export type { StripeServiceHook, StripeResponse } from './services/stripe';
export type {
  CommerceService,
  StripeEnvironment,
  StripeEnvironmentResponse,
} from './controllers/types';

export type { StatedResponse, RequestState } from './common/utils/state/types';
export { stateGuard } from './common/utils/state';

// TODO: Probably make this more generic and create it's own package
export {
  isSystemErrorResult,
  UIAssociations,
  ErrorTypes,
  createCreditCardCustomError,
  createFieldCreditCardStripeError,
  createFieldCustomValidationError,
  createGenericCreditCardStripeError,
} from './common/utils/errors/index';
export type {
  UIAssociationHolder,
  CreditCardError,
} from './common/utils/errors/index';

export {
  isError,
  isException,
  isFailure,
  isSuccessful,
  createSuccessResult,
  createExceptionResult,
  createErrorResult,
} from '@atlassian/commerce-resultful';
export type {
  FailureResult,
  ErrorResult,
  SuccessResult,
  ExceptionResult,
  Result,
} from '@atlassian/commerce-resultful';

export type {
  ConfirmCardSetupOptions as StripeConfirmCardSetupOptions,
  ConfirmCardPaymentOptions as StripeConfirmCardPaymentOptions,
} from '@stripe/stripe-js';
