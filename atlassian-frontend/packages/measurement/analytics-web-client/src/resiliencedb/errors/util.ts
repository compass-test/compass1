import {
  AbandonWriteErrorName
} from './AbandonWriteError';
import {
  CallbackProcessingErrorName
} from './CallbackProcessingError';
import {
  InvalidPolicyErrorName
} from './InvalidPolicyError';

type ErrorWithName = Error & {
  name: unknown;
};

export const shouldIgnoreResilienceDbError = (error?: unknown): boolean => {
  if (error &&
    typeof error === 'object' &&
    'name' in error
  ) {
    const errorWithName = error as ErrorWithName;
    return typeof errorWithName.name === 'string' && (
      errorWithName.name === AbandonWriteErrorName ||
      errorWithName.name === CallbackProcessingErrorName ||
      errorWithName.name === InvalidPolicyErrorName
    );
  }
  return false;
}
