import React from 'react';

import { render } from '@testing-library/react';

import { byTestId, getElement } from '@atlassian/commerce-test-library';

import { CommercePolicyAgreementImplicit } from './index';

test('should render aproved legal text', () => {
  render(<CommercePolicyAgreementImplicit />);

  const paragraph = getElement(byTestId('commerce-legal-notes.legal-note'));

  expect(paragraph.textContent).toMatch(
    'By clicking Save you accept the Atlassian Customer Agreement, Privacy Policy and agree to pay fees charged in accordance with our pricing.',
  );
});
