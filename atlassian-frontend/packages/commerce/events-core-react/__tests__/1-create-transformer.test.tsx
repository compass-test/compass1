import React from 'react';

import { render } from '@testing-library/react';

import Example, {
  BASE_EVENT_EMITTING_BUTTON_TEST_ID,
} from '../examples/1-create-transformer-event-channel';

it('Button event dispatches to closest parent listener', () => {
  const mockedLog = jest.fn();
  // Transformer listener logs a message
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  const { getByTestId } = render(<Example />);

  expect(mockedLog).not.toBeCalled();

  getByTestId(BASE_EVENT_EMITTING_BUTTON_TEST_ID).click();

  expect(mockedLog).toBeCalledWith(expect.any(String), {
    baseEventField: 'a-value',
    anAddedField: 'another-value',
  });
});
