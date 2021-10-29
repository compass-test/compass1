import React from 'react';

import { render } from '@testing-library/react';

import Example, {
  LogOnLayoutUnmountEvent,
  LogOnUnmountEvent,
  TOGGLE_BREADCRUMB_COMPONENT_TEST_ID,
  TOGGLE_UNMOUNT_EVENT_COMPONENT_TEST_ID,
} from '../examples/3-swapping-breadcrumbs-behaviour';

it('Breadcrumb gets moutned and the emitted event is logged', () => {
  // Breadcrumb events get logged
  const mockedLog = jest.fn();
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  const { getByTestId } = render(<Example />);
  expect(mockedLog).toBeCalledTimes(1);
  expect(mockedLog).toBeCalledWith(
    'new breadcrumb mounted',
    expect.objectContaining({
      payload: {
        name: LogOnUnmountEvent.name,
      },
    }),
  );

  const toggleUnmountComponentButton = getByTestId(
    TOGGLE_UNMOUNT_EVENT_COMPONENT_TEST_ID,
  );
  toggleUnmountComponentButton.click();
  expect(mockedLog).toBeCalledTimes(2);
  expect(mockedLog.mock.calls[1]).toEqual([
    'unmount event',
    expect.objectContaining({
      payload: {
        name: LogOnUnmountEvent.name,
      },
    }),
  ]);

  const toggleBreadcrumbComponentButton = getByTestId(
    TOGGLE_BREADCRUMB_COMPONENT_TEST_ID,
  );

  toggleBreadcrumbComponentButton.click();
  toggleUnmountComponentButton.click();
  expect(mockedLog).toBeCalledTimes(4);
  expect(mockedLog.mock.calls[2]).toEqual([
    'new breadcrumb mounted',
    expect.objectContaining({
      payload: {
        name: LogOnLayoutUnmountEvent.name,
      },
    }),
  ]);

  expect(mockedLog.mock.calls[3]).toEqual([
    'unmount event',
    expect.objectContaining({
      payload: {
        name: LogOnLayoutUnmountEvent.name,
      },
    }),
  ]);
});
