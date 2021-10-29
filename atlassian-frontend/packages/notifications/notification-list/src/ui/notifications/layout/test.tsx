import React from 'react';

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import NotificationTabs from './index';

describe('NotificationTabs', () => {
  describe('testId property', () => {
    test('Should be found by data-testid', async () => {
      const testId = 'notification-list';
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <NotificationTabs testId={testId} />
        </IntlProvider>,
      );
      expect(getByTestId(testId)).toBeTruthy();
    });
  });
});
