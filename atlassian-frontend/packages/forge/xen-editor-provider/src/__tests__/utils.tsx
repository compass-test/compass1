import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { hookToRenderProps } from '../utils';

describe('hookToRenderProps', () => {
  it('convert a hook to render props', async () => {
    /**
     * We are using a custom `useCustomHook` because `useState`
     * has function overloading (https://www.typescriptlang.org/docs/handbook/functions.html#overloads)
     * and `ReturnType` type helper doesn't work properly with it.
     */
    const useCustomHook = (x: number) => useState(x);
    const State = hookToRenderProps(useCustomHook);
    const { getByText } = render(
      <State params={[0]}>
        {([val, setVal]) => (
          <div>
            <span>{`Value: ${val}`}</span>
            <button onClick={() => setVal(val + 1)}>+1</button>
          </div>
        )}
      </State>,
    );
    expect(getByText(/Value/).textContent).toMatch('0');
    fireEvent.click(getByText(/\+1/));
    expect(getByText(/Value/).textContent).toMatch('1');
    fireEvent.click(getByText(/\+1/));
    expect(getByText(/Value/).textContent).toMatch('2');
  });
});
