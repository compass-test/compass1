import React from 'react';

import { render } from '@testing-library/react';

import Example, {
  EVENT_EMITTING_BUTTON_TEST_ID,
  FILTERED_EVENT_EMITTING_BUTTON_TEST_ID,
} from '../examples/5-filtering-out-events';

it('1 event is received but the other one is filtered out', () => {
  const mockedLog = jest.fn();
  // Listener logs a message
  // eslint-disable-next-line no-console
  console.log = mockedLog;
  const { getByTestId } = render(<Example />);

  expect(mockedLog).not.toBeCalled();

  const button1 = getByTestId(EVENT_EMITTING_BUTTON_TEST_ID);
  button1.click();
  expect(mockedLog).toBeCalledTimes(1);

  const button2 = getByTestId(FILTERED_EVENT_EMITTING_BUTTON_TEST_ID);
  button2.click();
  expect(mockedLog).toBeCalledTimes(1);
});
