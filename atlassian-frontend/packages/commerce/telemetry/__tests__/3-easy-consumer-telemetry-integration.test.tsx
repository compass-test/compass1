import React from 'react';

import { render } from '@testing-library/react';

import Example, {
  EXAMPLE_BUTTON_TEST_ID,
} from '../examples/3-easy-consumer-telemetry-integration';

it('Listener still logs something when safe guard component lives inbetween dispatch and listener', () => {
  const mockedLog = jest.fn();
  // Closest listener logs a message
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  const { getByTestId } = render(<Example />);
  expect(mockedLog).toBeCalledTimes(0);

  getByTestId(EXAMPLE_BUTTON_TEST_ID).click();

  expect(mockedLog).toBeCalledTimes(1);
});
