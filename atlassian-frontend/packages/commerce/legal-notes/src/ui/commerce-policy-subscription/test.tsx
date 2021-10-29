import React from 'react';

import { render } from '@testing-library/react';

import { byTestId, getElement } from '@atlassian/commerce-test-library';

import {
  CommercePolicyAgreementSubscriptionWithCost,
  CommercePolicyAgreementSubscriptionWithStartingDate,
} from './examples';

describe('should render the approved legal text', () => {
  it('renders "accordingly to the usage" when missing total', () => {
    render(<CommercePolicyAgreementSubscriptionWithStartingDate />);

    const paragraph = getElement(byTestId('commerce-legal-notes.legal-note'));

    expect(paragraph.textContent).toMatch(
      'Upon subscribing, you’ll be charged accordingly to the usage per month starting on Apr 9, 2020. Atlassian will also use these credit card details to automatically renew your subscription going forward.',
    );
  });

  it('renders correctly when theres total and no date', () => {
    render(<CommercePolicyAgreementSubscriptionWithCost />);

    const paragraph = getElement(byTestId('commerce-legal-notes.legal-note'));

    expect(paragraph.textContent).toMatch(
      'Upon subscribing, you’ll be charged $100 per month. Atlassian will also use these credit card details to automatically renew your subscription going forward.',
    );
  });
});
