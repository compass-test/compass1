import React from 'react';

import { cleanup, render } from '@testing-library/react';

import { checkA11y } from '@atlassian/commerce-test-library';

import Example from '../examples/01-credit-card-form';

beforeEach(() => {
  cleanup();
});

describe('aXe audit', () => {
  test('Credit card form should not fail aXe audit', async () => {
    const { container } = render(<Example />);
    await checkA11y(container);
  });
});
