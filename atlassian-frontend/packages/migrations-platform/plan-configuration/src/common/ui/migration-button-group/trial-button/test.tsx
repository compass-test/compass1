import React from 'react';

import { render, wait } from '@testing-library/react';

import { TrialButtonBasic } from './examples';

describe('<TrialButton />', async () => {
  test('renders disabled button by default', () => {
    const { container } = render(<TrialButtonBasic />);

    expect(container.innerHTML).toMatchSnapshot();
  });

  test('loads url and enables button', async () => {
    const { container } = render(<TrialButtonBasic />);

    await wait(() => {
      expect(container.querySelector('[href="dummy-url"]')).toBeInTheDocument();
    });
  });
});
