import { InvoicePaymentDataErrorCodes } from './constants';

export type InvoicePaymentDataErrorResponse = {
  errorKey: string;
  errorDetails: {
    reason: InvoicePaymentDataErrorCodes;
  };
};

export const templateError: InvoicePaymentDataErrorResponse = {
  errorKey: 'UNKNOWN',
  errorDetails: {
    reason: InvoicePaymentDataErrorCodes.UNKNOWN_ERROR,
  },
};

export class InvoicePaymentDataError extends Error {
  error: InvoicePaymentDataErrorResponse;
  constructor(errorBody: Partial<InvoicePaymentDataErrorResponse>) {
    super('Payment confirmation conflict for invoice');
    this.error = { ...templateError, ...errorBody };
    this.name = `InvoicePaymentDataError - reason:${this.code}`;
    // necessary as Subclassing Error needs special treatment in typescript for some compilation targets
    //https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, InvoicePaymentDataError.prototype);
  }

  public get code(): InvoicePaymentDataErrorCodes {
    return this.error.errorDetails.reason;
  }
}
