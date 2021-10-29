import React, { useRef } from 'react';

import { render } from '@testing-library/react';

import { useFocus } from './index';

describe('useFocus()', () => {
  test('should focus the ref element when focused is true', () => {
    const Component = ({ focused }: { focused: boolean }) => {
      const ref = useRef(null);

      useFocus(ref, focused);

      return <button ref={ref}>My button</button>;
    };

    const { getByText, rerender } = render(<Component focused={false} />);
    expect(getByText('My button')).not.toHaveFocus();

    rerender(<Component focused />);
    expect(getByText('My button')).toHaveFocus();
  });

  test('should not break if ref is not set', () => {
    const Component = ({ focused }: { focused: boolean }) => {
      const ref = useRef(null);

      useFocus(ref, focused);

      return <button>My button</button>;
    };

    expect(() => {
      const { rerender } = render(<Component focused={false} />);
      rerender(<Component focused />);
    }).not.toThrow();
  });
});
