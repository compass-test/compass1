import React from 'react';

import { render } from '@testing-library/react';

import { createAnalyticsClient } from '@atlassian/commerce-telemetry-clients';

import Example, {
  EXAMPLE_BUTTON_TEST_ID,
} from '../examples/1-uploading-internal-package-telemetry';

it('GasV3 client uploads an event when telemetry bridges component wraps dispatch location', () => {
  const mockedLog = jest.fn();
  // Closest listener logs a message
  // eslint-disable-next-line no-console
  console.log = mockedLog;

  const { sendUIEvent } = createAnalyticsClient();

  const { getByTestId } = render(<Example />);
  expect(mockedLog).toBeCalledTimes(0);
  expect(sendUIEvent).toBeCalledTimes(0);

  getByTestId(EXAMPLE_BUTTON_TEST_ID).click();

  expect(sendUIEvent).toBeCalledTimes(1);
  expect(mockedLog).toBeCalledTimes(1);
});
