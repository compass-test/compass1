import React from 'react';

import { cleanup, render } from '@testing-library/react';

import { checkA11y } from '@atlassian/commerce-test-library';

import Example from '../examples/02-mocked-data';

beforeEach(() => {
  cleanup();
});

describe('aXe audit', () => {
  test('Billing history form shouldnot fail aXe audit', async () => {
    const { container } = render(<Example />);
    await checkA11y(container);
  });
});
