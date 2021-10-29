import React from 'react';

import { render } from '@testing-library/react';

import { buildConfluenceNotification } from '../../mocks/notifications-factory';

import ErrorBoundary from './index';

const ComponentWithException = (): JSX.Element => {
  throw new Error('Expected - Fake error for test');
};

const mockTrigger = jest.fn();
jest.mock('../../utils/analytics', () => ({
  triggerErrorBoundaryRenderedEvent: mockTrigger,
  useCreateFireAnalyticsFromTrigger: jest
    .fn()
    .mockImplementation(() => mockTrigger),
}));

const baseNotification = buildConfluenceNotification({
  id: 'abcdef',
});

describe('ErrorBoundary', () => {
  describe('Analytic Event', () => {
    beforeEach(() => {
      mockTrigger.mockReset();
    });

    test('should be fired when there is an error', () => {
      render(
        <ErrorBoundary
          subjectId="adf"
          fallbackUI={<></>}
          onErrorCallback={() => {}}
        >
          <ComponentWithException />
        </ErrorBoundary>,
      );

      expect(mockTrigger).toHaveBeenCalledWith(
        'adf',
        false,
        undefined,
        undefined,
      );
    });

    test('should be fired with notifications context if given', () => {
      render(
        <ErrorBoundary
          subjectId="adf"
          fallbackUI={<></>}
          onErrorCallback={() => {}}
          notificationContext={baseNotification}
          notificationPosition={1}
        >
          <ComponentWithException />
        </ErrorBoundary>,
      );

      expect(mockTrigger).toHaveBeenCalledWith(
        'adf',
        false,
        baseNotification,
        1,
      );
    });
  });
});
