import React from 'react';

import { render } from '@testing-library/react';

import Example, {
  EVENT_1_EMITTING_BUTTON_TEST_ID,
  EVENT_2_EMITTING_BUTTON_TEST_ID,
} from '../examples/2-combining-listeners';

it('Button event dispatches to closest parent listener', () => {
  const mockedLog = jest.fn();
  // Listener logs a message
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  const { getByTestId } = render(<Example />);

  expect(mockedLog).not.toBeCalled();

  getByTestId(EVENT_1_EMITTING_BUTTON_TEST_ID).click();
  expect(mockedLog).toBeCalledTimes(1);
  expect(mockedLog).toBeCalledWith(expect.any(String), {
    event1Field: 'a-value',
  });

  getByTestId(EVENT_2_EMITTING_BUTTON_TEST_ID).click();
  expect(mockedLog).toBeCalledTimes(2);
  expect(mockedLog).toBeCalledWith(expect.any(String), {
    event2Field: 'another-value',
  });
});
