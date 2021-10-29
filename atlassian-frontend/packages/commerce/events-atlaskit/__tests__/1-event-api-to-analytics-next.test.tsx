import React from 'react';

import { render } from '@testing-library/react';

import Example, {
  EVENT_Channel_EVENT_EMITTING_BUTTON_TEST_ID,
} from '../examples/1-event-channel-to-analytics-next';

it('Event discarder stops event bubbling', () => {
  // This will be called if the AnalyticsListener picks up the event
  const mockedLog = jest.fn();
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  expect(mockedLog).not.toBeCalled();

  const { getByTestId } = render(<Example />);
  getByTestId(EVENT_Channel_EVENT_EMITTING_BUTTON_TEST_ID).click();

  expect(mockedLog).toBeCalledTimes(2);
});
