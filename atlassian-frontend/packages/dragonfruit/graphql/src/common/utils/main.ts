import { MutationError, Payload } from '../../index';

export class CompassMutationError extends Error {
  errors: MutationError[];

  constructor(message: string, errors: MutationError[]) {
    super(message);
    this.name = 'CompassMutationError';
    this.errors = errors;
  }

  getFirstError(): MutationError | null {
    return this.errors[0] ?? null;
  }

  getFirstErrorType(): string | null {
    return this.getFirstError()?.extensions?.errorType ?? null;
  }

  static FromMutationPayload(payload?: Payload | null) {
    if (payload?.errors?.length) {
      if (payload?.errors?.length > 1) {
        return new CompassMutationError(
          'Multiple Errors Occurred',
          payload.errors,
        );
      } else if (payload?.errors[0] && payload.errors[0].message) {
        return new CompassMutationError(
          payload.errors[0].message,
          payload.errors,
        );
      }
    }
    return new CompassMutationError('Unknown Error Occurred', []);
  }
}

export const checkCompassMutationSuccess = (payload?: Payload | null) => {
  if (!payload?.success) {
    throw CompassMutationError.FromMutationPayload(payload);
  }
};
