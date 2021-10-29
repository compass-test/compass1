/**
 * One field validation error
 */
export type FieldValidationError = {
  field: string;
  error: string;
};

class ExtensibleError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}

/**
 * Request validation error
 */
export class ValidationError extends ExtensibleError {
  errors: FieldValidationError[];

  constructor(message: string, errors: FieldValidationError[] = []) {
    super(message);
    this.errors = errors;
  }
}

/**
 * Generic HTTP error for calling Fetch.
 * <p>
 * This would be used if there isn't a specific HTTP error that you are expecting to receive from
 * the server. For example, a Bad Gateway error (502).
 */
export default class FetchError extends ExtensibleError {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message || `Fetch call failed with status code: ${statusCode}`);
    this.statusCode = statusCode;
  }
}
