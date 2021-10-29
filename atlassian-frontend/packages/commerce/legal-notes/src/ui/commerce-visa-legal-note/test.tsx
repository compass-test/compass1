import React from 'react';

import { render } from '@testing-library/react';

import { byTestId, getElement } from '@atlassian/commerce-test-library';

import {
  CommerceVisaLegalNoteWithoutPrice,
  CommerceVisaLegalNoteWithPrice,
} from './examples';

describe('should render the aproved legal text', () => {
  it('renders "accordingly to the usage" when missing total', () => {
    render(<CommerceVisaLegalNoteWithoutPrice />);

    const legalNote = getElement(byTestId('commerce-legal-notes.legal-note'));

    expect(legalNote.textContent).toMatch(
      'Your billing statement will display Atlassian B.V., located in Amsterdam, Netherlands. Atlassian Pty Limited, our principal place of business, is at Level 6, 341 George Street, Sydney NSW Australia 2000.Your credit card issuer may charge foreign transaction or cross-border fees in addition to the total price.',
    );
  });

  it('renders "accordingly to the usage" when missing total', () => {
    render(<CommerceVisaLegalNoteWithPrice />);

    const legalNote = getElement(byTestId('commerce-legal-notes.legal-note'));

    expect(legalNote.textContent).toMatch(
      'Your billing statement will display Atlassian B.V., located in Amsterdam, Netherlands. Atlassian Pty Limited, our principal place of business, is at Level 6, 341 George Street, Sydney NSW Australia 2000.Your credit card issuer may charge foreign transaction or cross-border fees in addition to the total price above.',
    );
  });
});
