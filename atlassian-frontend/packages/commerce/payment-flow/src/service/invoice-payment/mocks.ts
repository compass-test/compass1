import { openInvoice } from '@atlassian/commerce-billing-history/mocks';
import {
  error,
  networksScenarios,
  ok,
  url,
} from '@atlassian/commerce-environment/mocks';
import { visaPaymentMethodId } from '@atlassian/commerce-payment-methods/mocks';

import { InvoicePaymentDataErrorResponse } from '../../common/utils/invoice-payment-data-error';
import { InvoicePaymentDataErrorCodes } from '../../common/utils/invoice-payment-data-error/constants';

import { InvoicePaymentData } from './types';

import { INVOICES_URL } from './index';

export const invoicePaymentData: InvoicePaymentData = {
  ccpInvoiceId: openInvoice.id,
  ccpPaymentMethodId: visaPaymentMethodId,
  paymentIntentId: 'a-payment-intent-id',
  publicKey: 'a-test-stripe-key',
  paymentIntentClientSecret: 'a-test-stripe-intent-secret',
};

export const invoicePaymentDataInvoiceAlreadyPaid: InvoicePaymentDataErrorResponse = {
  errorKey: 'CONFLICT',
  errorDetails: {
    reason: InvoicePaymentDataErrorCodes.INVOICE_ALREADY_PAID,
  },
};

export const invoicePaymentDataInvoiceNotPayable: InvoicePaymentDataErrorResponse = {
  errorKey: 'CONFLICT',
  errorDetails: {
    reason: InvoicePaymentDataErrorCodes.INVOICE_NOT_PAYABLE,
  },
};

export const invoicePaymentDataConfirmationNotRequired: InvoicePaymentDataErrorResponse = {
  errorKey: 'CONFLICT',
  errorDetails: {
    reason: InvoicePaymentDataErrorCodes.CONFIRMATION_NOT_REQUIRED,
  },
};

export const invoicePaymentDataPaymentMethodChanged: InvoicePaymentDataErrorResponse = {
  errorKey: 'CONFLICT',
  errorDetails: {
    reason: InvoicePaymentDataErrorCodes.PAYMENT_METHOD_CHANGED,
  },
};

export const invoicePaymentDataInvalidPaymentMethod: InvoicePaymentDataErrorResponse = {
  errorKey: 'CONFLICT',
  errorDetails: {
    reason: InvoicePaymentDataErrorCodes.INVALID_PAYMENT_METHOD,
  },
};

export const scenarios = networksScenarios({
  invoicePaymentDataSuccess: {
    name: 'Request to confirm payment',
    request: url(`${INVOICES_URL}/${openInvoice.id}/confirm-payment`, 'POST'),
    response: ok<InvoicePaymentData>(invoicePaymentData),
  },
  invoicePaymentDataInvoiceAlreadyPaid: {
    name: 'Request to confirm payment for invoice already paid',
    request: url(`${INVOICES_URL}/${openInvoice.id}/confirm-payment`, 'POST'),
    response: error<InvoicePaymentDataErrorResponse>(
      invoicePaymentDataInvoiceAlreadyPaid,
      409,
    ),
  },
  invoicePaymentDataInvoiceNotPayable: {
    name: 'Request to confirm payment for invoice not payable',
    request: url(`${INVOICES_URL}/${openInvoice.id}/confirm-payment`, 'POST'),
    response: error<InvoicePaymentDataErrorResponse>(
      invoicePaymentDataInvoiceNotPayable,
      409,
    ),
  },
  invoicePaymentDataConfirmationNotRequired: {
    name: 'Request to confirm payment for invoice confirmation not required',
    request: url(`${INVOICES_URL}/${openInvoice.id}/confirm-payment`, 'POST'),
    response: error<InvoicePaymentDataErrorResponse>(
      invoicePaymentDataConfirmationNotRequired,
      409,
    ),
  },
  invoicePaymentDataPaymentMethodChanged: {
    name: 'Request to confirm payment for payment method changed',
    request: url(`${INVOICES_URL}/${openInvoice.id}/confirm-payment`, 'POST'),
    response: error<InvoicePaymentDataErrorResponse>(
      invoicePaymentDataPaymentMethodChanged,
      409,
    ),
  },
  confirmPaymentInvalidPaymentMethod: {
    name: 'Request to confirm payment for invalid payment method',
    request: url(`${INVOICES_URL}/${openInvoice.id}/confirm-payment`, 'POST'),
    response: error<InvoicePaymentDataErrorResponse>(
      invoicePaymentDataInvalidPaymentMethod,
      409,
    ),
  },
});
