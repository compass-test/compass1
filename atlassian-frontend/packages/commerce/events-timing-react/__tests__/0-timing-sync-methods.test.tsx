import React from 'react';

import { render } from '@testing-library/react';

import Example, { BUTTON_TEST_ID } from '../examples/0-timing-sync-methods';

it('0-timing-sync-methods', () => {
  const { getByTestId } = render(<Example />);

  const mockedLog = jest.fn();
  // Event gets logged everytime an event gets emitted
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  expect(mockedLog).toBeCalledTimes(0);

  getByTestId(BUTTON_TEST_ID).click();

  expect(mockedLog).toBeCalledTimes(1);
  expect(mockedLog).toBeCalledWith(expect.any(String), {
    timedPayload: expect.anything(),
    duration: expect.any(Number),
  });
});
