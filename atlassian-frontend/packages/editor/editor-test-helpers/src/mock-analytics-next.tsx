import React from 'react';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

/**
 * Inject a mock instead of `createAnalyticsEvent` so we can make assertions on it.
 * Should be called before the import of the component that uses the decorator.
 */
export const mockFire = jest.fn();
export const mockCreateAnalyticsEvent = jest.fn(() => {
  const event: UIAnalyticsEvent = {
    _isAnalyticsEvent: true,
    _isUIAnalyticsEvent: true,
    context: [],
    handlers: [],
    hasFired: false,
    payload: {},
    clone: () => event,
    update: () => event,
    fire: mockFire,
  };

  return event;
});

jest.mock('@atlaskit/analytics-next', () => {
  const originalModule = jest.requireActual('@atlaskit/analytics-next');
  const React = require('react');

  return {
    ...originalModule,
    withAnalyticsEvents: jest.fn(
      () => (WrappedComponent: React.JSXElementConstructor<any>) =>
        React.forwardRef((props: any, ref: any) => (
          <WrappedComponent
            createAnalyticsEvent={mockCreateAnalyticsEvent}
            {...props}
            ref={ref}
          />
        )),
    ),
  };
});

afterEach(() => {
  mockFire.mockClear();
  mockCreateAnalyticsEvent.mockClear();
});
