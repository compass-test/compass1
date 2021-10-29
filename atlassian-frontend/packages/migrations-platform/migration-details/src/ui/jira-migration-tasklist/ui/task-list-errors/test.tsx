import React from 'react';

import { render } from '@testing-library/react';

import { ErrorState, NonErrorState } from './examples';

describe('<TaskListErrors />', () => {
  describe('when not in an error state', () => {
    it('should not be displayed', () => {
      const { getByTestId } = render(<NonErrorState />);
      const wrapper = getByTestId('non-error-state-wrapper');
      expect(wrapper.innerText).toEqual(
        'This text appears BEFORE the component.' +
          'This component does not render anything in its non-error state.' +
          'This text appears AFTER the component.',
      );
    });
  });

  describe('when in an error state', () => {
    const { getByText } = render(<ErrorState />);
    expect(getByText('Error Title')).toBeInTheDocument();
    expect(getByText('Description of the error.')).toBeInTheDocument();
  });
});
