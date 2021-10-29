import { ValidationError } from 'class-validator';
import logger from '../../logger';

export const isClassValidatorException = (error: ValidationError[]) =>
  Array.isArray(error) && error.some((err) => err instanceof ValidationError);

export const logClassValidatorExceptions = (error: ValidationError[]) =>
  error.forEach((err: ValidationError) => logger.error(err));

export class BadRequestException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestException';
  }
}

export class NotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundException';
  }
}
export class ValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationException';
  }
}
