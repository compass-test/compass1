import React from 'react';

import { render } from '@testing-library/react';

import Example, {
  LogOnLayoutUnmountEvent,
  LogOnUnmountEvent,
  TOGGLE_UNMOUNT_EVENT_COMPONENT_TEST_ID,
} from '../examples/2-component-lifecycle-behaviour';

it('Breadcrumb gets moutned and the emitted event is logged', () => {
  // Breadcrumb events get logged
  const mockedLog = jest.fn();
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  const { getByTestId } = render(<Example />);
  expect(mockedLog).toBeCalledTimes(0);

  const toggleButton = getByTestId(TOGGLE_UNMOUNT_EVENT_COMPONENT_TEST_ID);
  toggleButton.click();
  expect(mockedLog).toBeCalledTimes(1);
  expect(mockedLog).toBeCalledWith(
    expect.objectContaining({
      payload: {
        name: LogOnUnmountEvent.name,
      },
    }),
  );

  toggleButton.click();
  expect(mockedLog).toBeCalledTimes(2);
  expect(mockedLog).toBeCalledWith(
    expect.objectContaining({
      payload: {
        name: LogOnLayoutUnmountEvent.name,
      },
    }),
  );
});
