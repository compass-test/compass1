import React from 'react';

import { ValidationError } from '../../../common/utils/validation-errors';
import { formErrorValidationResponse } from '../../../common/utils/validation-errors/mocks';

import { FormErrorMessage } from './index';

const unexpectedError = new Error('An unexpected error ocurred');
const unresolvableValidationError = new ValidationError({});

const validationErrorWithFormMessages = new ValidationError(
  formErrorValidationResponse,
);

export const FormMessageWithUnexpectedError = () => (
  <FormErrorMessage error={unexpectedError} />
);

export const FormMessageWithUnResolvableError = () => (
  <FormErrorMessage error={unresolvableValidationError} />
);

export const FormMessageWithFormLevelMessages = () => (
  <FormErrorMessage error={validationErrorWithFormMessages} />
);

export const FormMessageWithUndefinedError = () => (
  // expected to display nothing
  <FormErrorMessage error={undefined} />
);

export const Example = () => (
  <>
    <FormMessageWithUnexpectedError />
    <FormMessageWithUnResolvableError />
    <FormMessageWithFormLevelMessages />
    <FormMessageWithUndefinedError />
  </>
);

export default Example;
