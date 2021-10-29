import React from 'react';

import { render } from '@testing-library/react';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { InlineErrorMessage } from './index';

describe('InlineErrorMessage', () => {
  test('should be found by provided message', async () => {
    const testId = 'fake-test-id';
    const message = 'fake-message';

    const { getByTestId, getByText } = render(
      <CompassTestProvider>
        <InlineErrorMessage testId={testId} message={message} />
      </CompassTestProvider>,
    );
    expect(getByTestId(`${testId}-error`)).toBeInTheDocument();
    expect(getByText(message)).toBeInTheDocument();
  });
});
