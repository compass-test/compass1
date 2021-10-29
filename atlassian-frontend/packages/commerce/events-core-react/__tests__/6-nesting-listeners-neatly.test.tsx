import React from 'react';

import { render } from '@testing-library/react';

import Example, {
  EVENT_EMITTING_BUTTON_TEST_ID,
} from '../examples/6-nesting-listeners-neatly';

it('listeners are nested correcly', () => {
  const mockedLog = jest.fn();
  // Listeners log messages
  // eslint-disable-next-line no-console
  console.log = mockedLog;
  const { getByTestId } = render(<Example />);

  expect(mockedLog).not.toBeCalled();

  const button1 = getByTestId(EVENT_EMITTING_BUTTON_TEST_ID);
  button1.click();
  expect(mockedLog).toBeCalledTimes(3);
  expect(mockedLog.mock.calls[0]).toEqual(['called', 'first']);
  expect(mockedLog.mock.calls[1]).toEqual(['called', 'second']);
  expect(mockedLog.mock.calls[2]).toEqual(['called', 'last']);
});
