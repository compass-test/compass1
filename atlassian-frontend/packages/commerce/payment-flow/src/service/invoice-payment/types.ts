import { InvoiceId } from '@atlassian/commerce-billing-history';
import {
  PaymentMethod,
  PaymentMethodId,
} from '@atlassian/commerce-payment-methods';
export type InvoicePaymentData = {
  ccpInvoiceId: InvoiceId;
  ccpPaymentMethodId: PaymentMethodId;
  paymentIntentId: string;
  publicKey: string;
  paymentIntentClientSecret: string;
};

export type DetailedInvoicePaymentData = {
  paymentMethod: PaymentMethod;
  invoicePaymentData: InvoicePaymentData;
};
