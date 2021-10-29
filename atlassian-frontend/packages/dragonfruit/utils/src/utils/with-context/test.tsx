import React, { useState } from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { withContext } from './index';

describe('withContext', () => {
  it('should initialize the supplied hook with `hookArgs` provided to the provider', () => {
    const spy = jest.fn();

    const useHook = (...args: any[]) => {
      spy(...args);

      const [state, mutator] = useState('foo');

      return [
        {
          state,
        },
        {
          mutator,
        },
      ];
    };

    const { SharedStateProvider } = withContext(useHook);

    render(<SharedStateProvider hookArgs={['foo']} />);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('foo');
  });

  describe('shared state hook', () => {
    let Component: React.FC,
      Provider: React.FC,
      useHook: () => [{ count: number }, { increment: () => void }],
      useSharedHook: () => [{ count: number }, { increment: () => void }];

    beforeEach(() => {
      useHook = () => {
        const [count, setCount] = useState(0);

        const increment = () => setCount((current) => current + 1);

        return [
          {
            count,
          },
          {
            increment,
          },
        ];
      };

      const { SharedStateProvider, useSharedStateHook } = withContext(useHook);

      useSharedHook = useSharedStateHook;
      Provider = SharedStateProvider;

      Component = () => {
        const [{ count }, { increment }] = useSharedHook();

        return (
          <div data-testid="component">
            <span data-testid="count">{count}</span>
            <button data-testid="increment" onClick={increment}>
              Increment
            </button>
          </div>
        );
      };
    });

    it('should yield shared state to multiple consumers', () => {
      const { getAllByTestId } = render(
        <Provider>
          <Component />
          <Component />
        </Provider>,
      );

      const counts = getAllByTestId('count');
      const incrementors = getAllByTestId('increment');

      expect(counts[0].textContent).toBe('0');
      expect(counts[1].textContent).toBe('0');

      act(() => {
        userEvent.click(incrementors[0]);
      });

      expect(counts[0].textContent).toBe('1');
      expect(counts[1].textContent).toBe('1');

      act(() => {
        userEvent.click(incrementors[1]);
      });

      expect(counts[0].textContent).toBe('2');
      expect(counts[1].textContent).toBe('2');
    });

    it('should throw when invoked without a shared state provider ancestor', () => {
      const fn = () => render(<Component />);

      expect(fn).toThrowError(
        'Invocation of shared state hook must be within the associated SharedStateProvider.',
      );
    });
  });
});
