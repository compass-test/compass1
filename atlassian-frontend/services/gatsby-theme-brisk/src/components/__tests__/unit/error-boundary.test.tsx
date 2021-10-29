import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from '../../error-boundary';

const error = new Error('boom');

const Throw = () => {
  throw error;
};

describe('error boundary', () => {
  it('should send an error to sentry when it occurs during a render', () => {
    const setExtra = jest.fn();
    window.Sentry = {
      captureException: jest.fn(),
      configureScope: (cb) => {
        cb({ setExtra });
      },
    };

    render(
      <ErrorBoundary>
        <Throw />
      </ErrorBoundary>,
    );

    expect(setExtra.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "componentStack",
        "
          in Throw
          in ErrorBoundary",
      ]
    `);
    expect(window.Sentry.captureException).toHaveBeenCalledWith(error);
  });
});
