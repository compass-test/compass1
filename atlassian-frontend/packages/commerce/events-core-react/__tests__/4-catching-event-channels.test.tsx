import React from 'react';

import { render } from '@testing-library/react';

import Example, {
  EVENT_EMITTING_BUTTON_1_TEST_ID,
  EVENT_EMITTING_BUTTON_2_TEST_ID,
} from '../examples/4-catching-event-channels';

it('Both transparent listeners receive an event', () => {
  const mockedLog = jest.fn();
  // Inner listener logs a message
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  const mockedWarn = jest.fn();
  // Default callback logs a warning message
  // eslint-disable-next-line no-console
  console.warn = mockedWarn;

  const mockedError = jest.fn();
  // Outter listener logs an error message
  // eslint-disable-next-line no-console
  console.error = mockedError;

  const { getByTestId } = render(<Example />);
  expect(mockedLog).not.toBeCalled();

  getByTestId(EVENT_EMITTING_BUTTON_1_TEST_ID).click();
  expect(mockedLog).toBeCalledTimes(1);
  expect(mockedWarn).toBeCalledTimes(0);

  getByTestId(EVENT_EMITTING_BUTTON_2_TEST_ID).click();
  expect(mockedLog).toBeCalledTimes(1);
  expect(mockedWarn).toBeCalledTimes(1);

  expect(mockedError).not.toBeCalled();
});
