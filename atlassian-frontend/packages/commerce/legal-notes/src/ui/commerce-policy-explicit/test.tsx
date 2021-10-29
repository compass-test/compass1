import React from 'react';

import { render } from '@testing-library/react';

import { byTestId, getElement } from '@atlassian/commerce-test-library';

import { CommercePolicyAgreementExplicitDefault } from './examples';

test('should render approved legal text', () => {
  render(<CommercePolicyAgreementExplicitDefault />);

  const paragraph = getElement(byTestId('policy-checkbox--checkbox-label'));

  expect(paragraph.textContent).toMatch(
    'I agree to the Atlassian Cloud Terms of Service and Privacy Policy.',
  );
});
