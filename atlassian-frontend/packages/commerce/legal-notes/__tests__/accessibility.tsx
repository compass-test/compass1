import React from 'react';

import { cleanup, render } from '@testing-library/react';

import { checkA11y } from '@atlassian/commerce-test-library';

import CommercePolicySubscription from '../examples/01-commerce-policy-subscription';
import PolicyAgreementImplicit from '../examples/02-policy-agreement-implicit';
import PolicyAgreementExplicit from '../examples/03-policy-agreement-explicit';
import CommerceVisaLegalNote from '../examples/04-visa-legal-note';

beforeEach(() => {
  cleanup();
});

describe('aXe audit', () => {
  test('Commerce policy subscription legal notes should not fail aXe audit', async () => {
    const { container } = render(<CommercePolicySubscription />);
    await checkA11y(container);
  });

  test('Policy agreement implicit should not fail aXe audit', async () => {
    const { container } = render(<PolicyAgreementImplicit />);
    await checkA11y(container);
  });

  test('Policy agreement explicit should not fail aXe audit', async () => {
    const { container } = render(<PolicyAgreementExplicit />);
    await checkA11y(container);
  });

  test('Visa legal note should not fail aXe audit', async () => {
    const { container } = render(<CommerceVisaLegalNote />);
    await checkA11y(container);
  });
});
