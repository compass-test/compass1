import React from 'react';

import { fireEvent, render, act } from '@testing-library/react';
import uuid from 'uuid';

import { FlagProps } from '../../common/types';
import { useFlags } from '../../controllers/flags';

import { FlagsProvider } from './index';

jest.mock('react-transition-group/TransitionGroup', () =>
  jest.fn(({ children }) => children),
);

const Consumer: React.FC<Partial<FlagProps>> = (props) => {
  const { showFlag } = useFlags();
  const show = (): void => {
    showFlag({
      id: uuid.v4(),
      title: 'title',
      description: 'description',
      testId: 'flag',
      ...props,
    });
  };
  return (
    <>
      <button type="button" onClick={show}>
        show
      </button>
    </>
  );
};

describe('flag-container', () => {
  it('should render children', () => {
    const { getByText } = render(<FlagsProvider>child</FlagsProvider>);
    expect(getByText('child')).toBeDefined();
  });

  it('should render 3 flags', () => {
    const { queryAllByText, getByText } = render(
      <FlagsProvider>
        <Consumer />
      </FlagsProvider>,
    );
    const showFlagButton = getByText('show');
    fireEvent.click(showFlagButton);
    fireEvent.click(showFlagButton);
    fireEvent.click(showFlagButton);

    expect(queryAllByText('title')).toHaveLength(3);
  });

  it('should dismiss the 2nd flag and only render 1 when directly closing the flag', () => {
    jest.useFakeTimers();
    const { queryAllByText, getByText, getByTestId } = render(
      <FlagsProvider>
        <Consumer />
      </FlagsProvider>,
    );
    const showFlagButton = getByText('show');
    act(() => {
      fireEvent.click(showFlagButton);
      fireEvent.click(showFlagButton);
    });
    act(() => {
      fireEvent.click(getByTestId('flag-dismiss'));
    });
    act(() => {
      jest.runAllTimers();
    });

    expect(queryAllByText('title')).toHaveLength(1);
    jest.useRealTimers();
  });
});
