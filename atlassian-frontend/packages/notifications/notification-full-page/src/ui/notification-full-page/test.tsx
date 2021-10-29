import React from 'react';

import { render } from '@testing-library/react';

import NotificationFullPage from './index';

describe('NotificationFullPage', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'notification-full-page';
      const { getByTestId } = render(<NotificationFullPage testId={testId} />);
      expect(getByTestId(testId)).toBeTruthy();
    });
  });
});
