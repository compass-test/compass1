export enum InvoicePaymentDataErrorCodes {
  INVOICE_ALREADY_PAID = 'INVOICE_ALREADY_PAID',
  INVOICE_NOT_PAYABLE = 'INVOICE_NOT_PAYABLE',
  CONFIRMATION_NOT_REQUIRED = 'CONFIRMATION_NOT_REQUIRED',
  PAYMENT_METHOD_CHANGED = 'PAYMENT_METHOD_CHANGED',
  INVALID_PAYMENT_METHOD = 'INVALID_PAYMENT_METHOD',
  // Following error code is not returned from server
  // will be used as fallback in case of defective payload response
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}
