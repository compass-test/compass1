export type PagedList<T> = {
  data: T[];
  min?: string;
  max?: string;
};

export type PaymentMethodId = string & { readonly __opq__: unique symbol };

export type CreditCardBrand = 'visa' | 'amex' | 'mastercard' | string;
export type CreditCardFounding = 'debit' | 'credit' | string;

type PaymentMethodCommon = {
  id: PaymentMethodId;
  default: boolean;
};

export type CreditCard = {
  name?: string;
  brand: CreditCardBrand;
  expMonth: number;
  expYear: number;
  last4: string;
};

export type CreditCardPaymentMethod = PaymentMethodCommon & {
  type: 'CARD';
  card: CreditCard;
};

export type DeferredPaymentMethod = PaymentMethodCommon & {
  type: 'DEFERRED';
};

type UnrecognizedPaymentMethod = PaymentMethodCommon & {
  type: string;
};

export const isCreditCardPaymentMethod = (
  paymentMethod: PaymentMethod,
): paymentMethod is CreditCardPaymentMethod => paymentMethod.type === 'CARD';

export const isDeferredPaymentMethod = (
  paymentMethod: PaymentMethod,
): paymentMethod is DeferredPaymentMethod => paymentMethod.type === 'DEFERRED';

export type PaymentMethod =
  | CreditCardPaymentMethod
  | DeferredPaymentMethod
  | UnrecognizedPaymentMethod;
