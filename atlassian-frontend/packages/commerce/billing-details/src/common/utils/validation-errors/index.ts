import { AddressFieldErrorMessages } from '../../types';

import {
  errorCodesToFieldMessagesMap,
  errorCodesToFormMessagesMap,
} from './constants';
import { ValidationErrorResponse, ValidationResponse } from './types';

const notUndefined = <T>(x: T | undefined): x is T => {
  return x !== undefined;
};

const errorsToInlineMessageMapper = (
  errors: ValidationErrorResponse[],
): AddressFieldErrorMessages => {
  return errors
    .map((error) => errorCodesToFieldMessagesMap[error.code])
    .filter(notUndefined)
    .reduce((acc, current) => ({ ...acc, ...current }), {});
};

const errorsToFormMessageMapper = (
  errors: ValidationErrorResponse[],
): string[] => {
  return errors
    .map((error) => errorCodesToFormMessagesMap[error.code])
    .filter(notUndefined);
};

export class ValidationError extends Error {
  errors: ValidationErrorResponse[];

  constructor(validationErrors: Partial<ValidationResponse>) {
    super('Validation errors');
    this.name = 'ValidationErrors';
    this.errors = (validationErrors.errorDetails || {}).validationErrors || [];
    // necessary as Subclassing Error needs special treatment in typescript for some compilation targets
    //https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  public get fieldMessages(): AddressFieldErrorMessages {
    return errorsToInlineMessageMapper(this.errors);
  }

  public get formMessages(): string[] {
    return errorsToFormMessageMapper(this.errors);
  }
}
