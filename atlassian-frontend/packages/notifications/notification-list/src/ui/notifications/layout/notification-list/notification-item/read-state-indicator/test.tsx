import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';

import ReadStateIndicator from './index';

describe('(Component) ReadStateIndicator', () => {
  describe('User Interactions', () => {
    test('tab keypress should focus', () => {
      const mockToggleHandler = jest.fn();
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <ReadStateIndicator read={true} onToggle={mockToggleHandler} />
        </IntlProvider>,
      );

      const indicator = getByTestId('mark-as-read-button');
      userEvent.tab();

      expect(indicator).toHaveFocus();
    });

    test('onClick events should call onToggle', () => {
      const mockToggleHandler = jest.fn();
      const { getByTestId } = render(
        <IntlProvider locale="en">
          <ReadStateIndicator read={false} onToggle={mockToggleHandler} />
        </IntlProvider>,
      );

      userEvent.click(getByTestId('mark-as-read-button'));

      expect(mockToggleHandler).toHaveBeenCalledTimes(1);
    });

    test('should display a tooltip on focus', async () => {
      const mockToggleHandler = jest.fn();
      const { queryByTestId, findByTestId } = render(
        <IntlProvider locale="en">
          <ReadStateIndicator read={false} onToggle={mockToggleHandler} />
        </IntlProvider>,
      );

      expect(queryByTestId('read-state-tooltip', { exact: true })).toBeFalsy();

      userEvent.tab();
      const tooltip = await findByTestId('read-state-tooltip', { exact: true });
      expect(tooltip).toBeTruthy();
    });
  });
});
