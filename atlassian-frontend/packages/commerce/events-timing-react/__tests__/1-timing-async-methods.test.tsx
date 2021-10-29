import React from 'react';

import { render } from '@testing-library/react';

import Example, { BUTTON_TEST_ID } from '../examples/1-timing-async-methods';
import { timeDuration } from '../src';

jest.mock('../src', () => {
  const { timeDuration, ...other } = jest.requireActual('../src/index');

  return {
    ...other,
    timeDuration: jest.fn().mockImplementation(timeDuration),
  };
});

it('1-timing-async-methods', async () => {
  const { getByTestId } = render(<Example />);

  const mockedLog = jest.fn();
  // Event gets logged everytime an event gets emitted
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  expect(mockedLog).toBeCalledTimes(0);

  getByTestId(BUTTON_TEST_ID).click();

  expect(timeDuration).toBeCalledTimes(1);
  await expect(
    (timeDuration as jest.Mock).mock.results[0].value,
  ).resolves.toEqual({
    timedPayload: expect.anything(),
    duration: expect.any(Number),
  });
  expect(mockedLog).toBeCalledTimes(1);
  expect(mockedLog).toBeCalledWith(expect.any(String), {
    timedPayload: expect.anything(),
    duration: expect.any(Number),
  });
});
