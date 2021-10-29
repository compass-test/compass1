import React from 'react';

import { render } from '@testing-library/react';

import { ProjectsContentJiraJSM } from './examples';

describe('<ProjectsContent />', () => {
  it('should display correct content when JSM and Jira projects info is present', () => {
    const { getByText } = render(<ProjectsContentJiraJSM />);

    expect(getByText('Jira projects', { exact: false })).toBeInTheDocument();
    expect(
      getByText('Jira Service Management projects', { exact: false }),
    ).toBeInTheDocument();
  });
});
