import React from 'react';

import { render } from '@testing-library/react';

import Example, {
  BASE_EVENT_1_EMITTING_BUTTON_TEST_ID,
  BASE_EVENT_2_EMITTING_BUTTON_TEST_ID,
} from '../examples/3-transforming-multiple-channels';

it('Button event dispatches to closest parent listener', () => {
  const mockedLog = jest.fn();
  // Listener logs a message
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  const { getByTestId } = render(<Example />);

  expect(mockedLog).not.toBeCalled();

  getByTestId(BASE_EVENT_1_EMITTING_BUTTON_TEST_ID).click();
  expect(mockedLog).toBeCalledTimes(1);
  expect(mockedLog).toBeCalledWith(expect.any(String), {
    baseEvent1Field: 'a-value',
    anAddedField: 'yet-another-value',
  });

  getByTestId(BASE_EVENT_2_EMITTING_BUTTON_TEST_ID).click();
  expect(mockedLog).toBeCalledTimes(2);
  expect(mockedLog).toBeCalledWith(expect.any(String), {
    baseEvent2Field: 'another-value',
    anAddedField: 'yet-another-value',
  });
});
