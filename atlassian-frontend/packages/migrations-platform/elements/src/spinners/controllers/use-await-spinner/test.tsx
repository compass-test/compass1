import React from 'react';

import { render } from '@testing-library/react';

import useAwaitSpinner from './index';
jest.mock('@atlaskit/spinner', () => ({
  __esModule: true, // this property makes it work
  default: function SpinnerMock({ onComplete }: { onComplete: () => void }) {
    if (onComplete) {
      setTimeout(onComplete, 200);
    }
    return 'SPINNER CONTENT';
  },
}));

jest.useFakeTimers();

const props = {
  valueOnError: '[Error fallback value]',
  value: new Promise((r) => setTimeout(() => r('[Resolved value]'), 200)),
  spinnerProps: { size: 'small', delay: 1000 },
};

const Component = (cProps: any): JSX.Element => {
  const [value, spinner] = useAwaitSpinner<string>(cProps);
  return (
    <>
      {spinner}
      {value}
    </>
  );
};

describe('useAwaitSpinner', () => {
  it('should render spinner when value is not resolved', () => {
    const { container } = render(<Component {...props} />);
    expect(container.innerHTML).toContain('SPINNER CONTENT');
  });
});
