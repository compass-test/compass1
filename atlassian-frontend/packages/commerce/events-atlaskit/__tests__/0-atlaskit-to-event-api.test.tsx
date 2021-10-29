import React from 'react';

import { render } from '@testing-library/react';

import Example, {
  ANALYTICS_NEXT_EVENT_EMITTING_BUTTON_TEST_ID,
} from '../examples/0-atlaskit-to-event-channel';

it('Event discarder stops event bubbling', () => {
  // This will be called if the AnalyticsListener picks up the event
  const mockedLog = jest.fn();
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  expect(mockedLog).not.toBeCalled();

  const { getByTestId } = render(<Example />);
  getByTestId(ANALYTICS_NEXT_EVENT_EMITTING_BUTTON_TEST_ID).click();

  expect(mockedLog).toBeCalledTimes(1);
});
