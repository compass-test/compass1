import React from 'react';

import { render } from '@testing-library/react';

import { ErrorFragment } from '@atlassian/commerce-test-library';

import {
  FormMessageWithFormLevelMessages,
  FormMessageWithUndefinedError,
  FormMessageWithUnexpectedError,
  FormMessageWithUnResolvableError,
} from './examples';

test('Nothing is rendered when form error message receives undefined error', async () => {
  const { container } = render(<FormMessageWithUndefinedError />);
  expect(await ErrorFragment(container).displayed()).toBeFalsy();
});

test('Validate form level error rendered for unexpected errors', async () => {
  const { container } = render(<FormMessageWithUnexpectedError />);

  const errorHeading = 'Something went wrong';
  const errorContent =
    'An unexpected error occurred, try again later. If the problem persists, please contact support';

  const errorFragment = ErrorFragment(container);
  expect(await errorFragment.displayed()).toBeTruthy();
  expect(await errorFragment.content()).toMatch(errorHeading);
  expect(await errorFragment.content()).toMatch(errorContent);
});

test('Validate form level error rendered for unresolvable errors', async () => {
  const { container } = render(<FormMessageWithUnResolvableError />);

  const errorHeading = 'Incorrect address';
  const errorContent =
    'The address or tax id provided seems to be incorrect. Please check the details provided and then submit. If the problem persists, please contact support';

  const errorFragment = ErrorFragment(container);
  expect(await errorFragment.displayed()).toBeTruthy();
  expect(await errorFragment.content()).toMatch(errorHeading);
  expect(await errorFragment.content()).toMatch(errorContent);
});

test('Validate form level error rendered for known form level messages', async () => {
  const { container } = render(<FormMessageWithFormLevelMessages />);

  const errorHeading = 'Unable to validate your address';
  const errorContent =
    'There seems to be a problem with the address you have entered. Please check if the information provided is correct. If you are still unable to submit the form, please contact support';

  const errorFragment = ErrorFragment(container);
  expect(await errorFragment.displayed()).toBeTruthy();
  expect(await errorFragment.content()).toMatch(errorHeading);
  expect(await errorFragment.content()).toMatch(errorContent);
});
