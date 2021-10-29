import React, { FC, useEffect } from 'react';

import { render } from '@testing-library/react';

import { AnalyticsScreenContext } from '../../../src';

describe('<AnalyticsScreenContext />', () => {
  it('should not re-render if props instances unchanged', () => {
    const callback = jest.fn();
    const ChildComponent: FC = () => {
      useEffect(callback, [callback]);

      return <p>Dummy Dummy</p>;
    };
    const WrapperComponent: FC = () => {
      return (
        <AnalyticsScreenContext name="ScreenA">
          <ChildComponent />
        </AnalyticsScreenContext>
      );
    };
    const { rerender } = render(<WrapperComponent />);

    expect(callback).toBeCalledTimes(1);
    rerender(<WrapperComponent />);
    expect(callback).toBeCalledTimes(1);
  });
});
