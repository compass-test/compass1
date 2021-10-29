import React from 'react';

import { render } from '@testing-library/react';

import Example, {
  EXAMPLE_BUTTON_TEST_ID,
} from '../examples/0-dispatch-and-listen-to-telemetry-events';

it('Singleton listeners are triggered by events dispatched by children', () => {
  const mockedLog = jest.fn();
  // Closest listener logs a message
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  const mockedErrorLog = jest.fn();
  // Outer listener logs as an error
  // eslint-disable-next-line no-console
  console.error = mockedErrorLog;

  expect(mockedLog).not.toBeCalled();
  const { getByTestId } = render(<Example />);
  getByTestId(EXAMPLE_BUTTON_TEST_ID).click();

  expect(mockedLog).toBeCalledWith(
    expect.any(String),
    expect.objectContaining({
      actionSubjectId: expect.any(String),
    }),
  );
  expect(mockedErrorLog).not.toBeCalled();
});
