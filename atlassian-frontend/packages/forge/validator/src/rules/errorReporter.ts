import * as array from 'fp-ts/lib/Array';
import { fold } from 'fp-ts/lib/Either';
import { map } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import * as t from 'io-ts';

const jsToString = (value: t.mixed) =>
  value === undefined ? 'undefined' : JSON.stringify(value);

export const formatValidationError = (error: t.ValidationError) => {
  const propPath = error.context
    .map((c) => c.key)
    .filter((key) => key.length > 0)
    .filter((key) => isNaN(Number(key)))
    .join('.');

  // The actual error is last in context
  const maybeErrorContext = array.last(
    // https://github.com/gcanti/fp-ts/pull/544/files
    error.context as Array<t.ContextEntry>,
  );

  return pipe(
    maybeErrorContext,
    map((errorContext) => {
      const expectedType = errorContext.type.name;
      if (typeof error.value === 'undefined') {
        return `Missing required prop: ${propPath}.`;
      }

      return `Expected ${propPath} to be of type ${expectedType} but instead got: ${jsToString(
        error.value,
      )}.`;
    }),
  );
};

export const reporter = <T>(validation: t.Validation<T>) =>
  pipe(
    validation,
    fold(
      (errors) => array.compact(errors.map(formatValidationError)),
      () => [],
    ),
  );
