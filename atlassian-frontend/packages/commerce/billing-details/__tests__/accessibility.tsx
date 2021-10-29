import React from 'react';

import { cleanup, render } from '@testing-library/react';

import { checkA11y } from '@atlassian/commerce-test-library';

import EmptyForm from '../examples/01-billing-details-form-empty';
import BillingDetailsPanel from '../examples/17-vr-billing-details-panel';

beforeEach(() => {
  cleanup();
});

describe('aXe audit', () => {
  test('Billing details form shouldnot fail aXe audit', async () => {
    const { container } = render(<EmptyForm />);
    await checkA11y(container);
  });

  test('Billing details panel shouldnot fail aXe audit', async () => {
    const { container } = render(<BillingDetailsPanel />);
    await checkA11y(container);
  });
});
