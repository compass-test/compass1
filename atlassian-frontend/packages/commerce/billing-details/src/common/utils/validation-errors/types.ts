import { AddressFieldErrorMessages } from '../../types';

import { ValidationErrorCodes } from './constants';

export type ValidationErrorResponse = {
  code: ValidationErrorCodes;
};

export type ValidationResponse = {
  errorDetails: {
    validationErrors: ValidationErrorResponse[];
  };
};

export type FormErrorMessageMap = {
  [code in ValidationErrorCodes]?: string;
};

export type FieldErrorMessageMap = {
  [code in ValidationErrorCodes]?: AddressFieldErrorMessages;
};
