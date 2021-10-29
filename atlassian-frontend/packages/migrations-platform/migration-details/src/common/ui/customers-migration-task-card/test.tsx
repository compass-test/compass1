import React from 'react';

import { render } from '@testing-library/react';

import { NoSelection } from './examples';

describe('<CustomersTaskCard />', () => {
  describe('when in initial state', () => {
    it('should show not-complete icon', () => {
      const { getByRole } = render(<NoSelection />);
      expect(getByRole('img')).toHaveAttribute('aria-label', 'Not completed');
    });

    it('should be disabled', () => {
      const { getByText } = render(<NoSelection />);
      expect(getByText('Select')).toBeDisabled();
    });
  });
});
