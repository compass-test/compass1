import React from 'react';

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import ErrorSummary from '../../ErrorSummary';

const count = 5;

describe('ErrorSummary', () => {
  test('Should render ErrorSummary with the correct message', () => {
    const { getByTestId, getByLabelText } = render(
      <IntlProvider locale="en">
        <ErrorSummary count={count} />
      </IntlProvider>,
    );
    const icon = getByLabelText('Error');
    const message = getByTestId('error-message');
    expect(icon).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(message.textContent).toBe(`${count} blocking errors`);
  });

  test('Should render ErrorSummary success state with correct message', () => {
    const { getByTestId, queryByLabelText } = render(
      <IntlProvider locale="en">
        <ErrorSummary count={0} />
      </IntlProvider>,
    );
    const icon = queryByLabelText('Error');
    const message = getByTestId('error-message');
    expect(icon).toBeNull();
    expect(message).toBeInTheDocument();
    expect(message.textContent).toBe('No blocking errors found');
  });
});
