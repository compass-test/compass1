import { AddressFieldErrorMessages } from '../../types';

import {
  allErrorsValidationResponse,
  formAndInlineErrorsValidationResponse,
  formErrorValidationResponse,
  inlineErrorsValidationResponse,
} from './mocks';

import { ValidationError } from './index';

const expectedFieldMessageBag: AddressFieldErrorMessages = {
  'address-line1':
    'Street name does not match the city and postcode information provided',
  'address-level2':
    'City name provided does not match the state and country selected',
  'tax-id': 'Invalid tax ID format',
};

const expectedFormMessages = [
  'There seems to be a problem with the address you have entered. Please check if the information provided is correct. If you are still unable to submit the form, please contact support',
];

test('Custom ValidationError can be caught and is the intance of the correct constructor', () => {
  const error = new ValidationError(inlineErrorsValidationResponse);

  // noinspection SuspiciousTypeOfGuard
  expect(error instanceof Error).toBeTruthy();
  // noinspection SuspiciousTypeOfGuard
  expect(error instanceof ValidationError).toBeTruthy();
});

test('Custom ValidationError holds expected inline messages', () => {
  const error = new ValidationError(inlineErrorsValidationResponse);

  expect(error.fieldMessages).toEqual(expectedFieldMessageBag);
});

test('Errors codes associated to the same field do not generate duplicate inline messages', () => {
  const error = new ValidationError(allErrorsValidationResponse);

  expect(Object.keys(error.fieldMessages)).toEqual(
    expect.arrayContaining(['address-line1', 'tax-id', 'address-level2']),
  );
});

test('ValidationError holds expected form messages', () => {
  const error = new ValidationError(formErrorValidationResponse);

  expect(error.formMessages).toEqual(expectedFormMessages);
});

test('ValidationError can hold multiple types of messages', () => {
  const error = new ValidationError(formAndInlineErrorsValidationResponse);

  expect(error.fieldMessages).toEqual(expectedFieldMessageBag);
  expect(error.formMessages).toEqual(expectedFormMessages);
});
