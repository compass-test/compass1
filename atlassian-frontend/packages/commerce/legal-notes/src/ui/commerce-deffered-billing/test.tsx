import React from 'react';

import { render } from '@testing-library/react';

import { byTestId, getElement } from '@atlassian/commerce-test-library';

import { CommerceLegalNoteStatementDefault } from './examples';

describe('should render the aproved legal statement', () => {
  it('renders the approved text', () => {
    render(<CommerceLegalNoteStatementDefault />);

    const legalNote = getElement(byTestId('commerce-legal-notes.legal-note'));

    expect(legalNote.textContent).toMatch(
      'Your billing statement will display Atlassian B.V., located in Amsterdam, Netherlands. Atlassian Pty Limited, our principal place of business, is at Level 6, 341 George Street, Sydney NSW Australia 2000.',
    );
  });
});
