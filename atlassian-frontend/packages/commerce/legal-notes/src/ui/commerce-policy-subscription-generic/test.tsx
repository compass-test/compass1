import React from 'react';

import { render } from '@testing-library/react';

import { byTestId, getElement } from '@atlassian/commerce-test-library';

import { CommercePolicyAgreementSubscriptionGenericExample } from './examples';

describe('should render the approved legal text', () => {
  it('renders Promotions or tax benefits text', () => {
    render(<CommercePolicyAgreementSubscriptionGenericExample />);

    const legalNote = getElement(byTestId('commerce-legal-notes.legal-note'));

    expect(legalNote.textContent).toMatch(
      'Atlassian will also use these credit card details to automatically renew your subscription going forward.',
    );

    const taxNote = getElement(
      byTestId('commerce-legal-notes.tax-and-promotions'),
    );

    expect(taxNote.textContent).toContain(
      'Promotions or tax benefits are reflected in your final invoice if they are applicable for your subscription.',
    );
  });
});
