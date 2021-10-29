import React from 'react';

import { render } from '@testing-library/react';

import { AnonymousAccessJira } from './examples';
import messages from './messages';

describe('<AnonymousAccessContent />', () => {
  it('should show correct message for Jira', () => {
    const { getByText } = render(<AnonymousAccessJira />);

    expect(
      getByText(messages.projectsAvailableToPublic.defaultMessage!),
    ).toBeInTheDocument();
  });
});
