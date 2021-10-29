import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { FocusState } from './main';

const TestChildren: React.FC = () => {
  return <div data-testid="children">Test children</div>;
};

describe('FocusState', () => {
  it('should render `children` when supplied', () => {
    const { queryByTestId } = render(
      <CompassTestProvider>
        <FocusState isOpen>
          <TestChildren />
        </FocusState>
      </CompassTestProvider>,
    );

    const focusState = queryByTestId('children');

    expect(focusState).toBeTruthy();
    expect(focusState).toBeInTheDocument();
  });

  it('should invoke `onClose` when close button is clicked', () => {
    const onClose = jest.fn();

    const { getByTestId } = render(
      <CompassTestProvider>
        <FocusState isOpen onClose={onClose} testId="focus-state">
          <TestChildren />
        </FocusState>
      </CompassTestProvider>,
    );

    const cancelButton = getByTestId('focus-state.cancel');

    act(() => {
      userEvent.click(cancelButton);
    });

    expect(onClose).toHaveBeenCalled();
  });
});
