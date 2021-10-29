import { StripePaymentMethod } from '@atlassian/commerce-credit-card-ccp';
import { PaymentMethod } from '@atlassian/commerce-payment-methods';
import {
  InvoiceGroupId,
  TransactionAccountId,
} from '@atlassian/commerce-types';

export type PaymentDetailsStepIn = {
  txa: TransactionAccountId;
  ig: InvoiceGroupId;
  initialPaymentMethod?: PaymentMethod;
  paymentMethod?: PaymentMethod;
  paymentMethods: PaymentMethod[];
  isUpdatingPaymentMethod?: boolean;
};

export type PaymentDetailsStepOut = {
  paymentMethod: PaymentMethod;
  stripePaymentMethodId?: StripePaymentMethod['id'];
};
