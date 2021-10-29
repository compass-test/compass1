import { ValidationErrorCodes } from './constants';
import { ValidationResponse } from './types';

export const inlineErrorsValidationResponse: ValidationResponse = {
  errorDetails: {
    validationErrors: [
      { code: ValidationErrorCodes.INVALID_STREET_NAME },
      { code: ValidationErrorCodes.INVALID_TAX_FORMAT },
      { code: ValidationErrorCodes.CITY_NOT_DETERMINED },
    ],
  },
};

export const formErrorValidationResponse: ValidationResponse = {
  errorDetails: {
    validationErrors: [{ code: ValidationErrorCodes.ADDRESS_NOT_DELIVERABLE }],
  },
};

export const formAndInlineErrorsValidationResponse = {
  errorDetails: {
    validationErrors: [
      ...inlineErrorsValidationResponse.errorDetails.validationErrors,
      ...formErrorValidationResponse.errorDetails.validationErrors,
    ],
  },
};

export const allErrorsValidationResponse: ValidationResponse = {
  errorDetails: {
    validationErrors: [
      { code: ValidationErrorCodes.INVALID_STREET_NAME },
      { code: ValidationErrorCodes.INVALID_TAX_NUMBER },
      { code: ValidationErrorCodes.CITY_NOT_DETERMINED },
      { code: ValidationErrorCodes.INVALID_STREET_NUMBER },
      { code: ValidationErrorCodes.INVALID_TAX_FORMAT },
      { code: ValidationErrorCodes.CITY_NOT_DETERMINED },
      { code: ValidationErrorCodes.ADDRESS_NOT_DELIVERABLE },
    ],
  },
};
