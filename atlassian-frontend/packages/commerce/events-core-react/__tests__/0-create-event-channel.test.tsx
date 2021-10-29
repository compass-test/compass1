import React from 'react';

import { render } from '@testing-library/react';

import Example, {
  EVENT_EMITTING_BUTTON_TEST_ID,
} from '../examples/0-create-event-channel';

it('Button event dispatches to closest parent listener', () => {
  const mockedLog = jest.fn();
  // Closest listener logs a message
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  const mockedWarnLog = jest.fn();
  // Outer listener logs as an error
  // eslint-disable-next-line no-console
  console.warn = mockedWarnLog;

  const { getByTestId } = render(<Example />);

  expect(mockedLog).not.toBeCalled();

  getByTestId(EVENT_EMITTING_BUTTON_TEST_ID).click();
  expect(mockedLog).toBeCalledTimes(2);
  expect(mockedLog.mock.calls[0][0]).not.toBe(mockedLog.mock.calls[1][0]);
});
