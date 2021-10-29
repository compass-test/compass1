import React from 'react';

import { render } from '@testing-library/react';

import {
  ProjectTaskCardNoSelection,
  ProjectTaskCardNotMigrating,
  ProjectTaskCardWithJiraJsmProjects,
  ProjectTaskCardWithMultipleProjectsAndAttachmentsOnly,
  ProjectTaskCardWithMultipleProjectsAndConfigOnly,
  ProjectTaskCardWithOneProject,
  ProjectTaskCardWithOneProjectAndSelectedAdvancedRoadmaps,
} from './examples';
import messages from './messages';

describe('<ProjectTaskCard />', () => {
  it('should show correct selection description when config only', () => {
    const { getByText } = render(
      <ProjectTaskCardWithMultipleProjectsAndConfigOnly />,
    );

    expect(getByText(messages.configOnly.defaultMessage!)).toBeInTheDocument();
  });

  it('should show correct selection description when attachments only', () => {
    const { getByText } = render(
      <ProjectTaskCardWithMultipleProjectsAndAttachmentsOnly />,
    );

    expect(
      getByText(messages.attachmentsOnly.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should show correct selection description when all project data and selected Advanced Roadmaps plans', () => {
    const { getByText } = render(
      <ProjectTaskCardWithOneProjectAndSelectedAdvancedRoadmaps />,
    );

    expect(
      getByText(
        '1 project linked to selected Advanced Roadmaps plans' +
          '895 issues and 6 MB of attachments.',
      ),
    ).toBeInTheDocument();
  });

  it('should show correct selection description when all project data and Advanced Roadmaps plans not selected', () => {
    const { getByText, queryByText } = render(
      <ProjectTaskCardWithOneProject />,
    );

    expect(
      queryByText('12 projects linked to selected Advanced Roadmaps plans'),
    ).not.toBeInTheDocument();

    expect(
      getByText('895 issues and 6 MB of attachments.'),
    ).toBeInTheDocument();
  });

  it('should show correct description when nothing selected', () => {
    const { getByText } = render(<ProjectTaskCardNoSelection />);

    expect(
      getByText(messages.noSelectionText.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should show correct description and button when not migrating projects', () => {
    const { getByText, getByTestId } = render(<ProjectTaskCardNotMigrating />);
    expect(getByText('0 projects')).toBeInTheDocument();
    expect(
      getByText(messages.notMigratingText.defaultMessage!),
    ).toBeInTheDocument();

    expect(getByTestId('buttonEdit')).toBeInTheDocument();
  });

  it('should show correct description when both JSM and Jira projects are present', () => {
    const { getByText } = render(<ProjectTaskCardWithJiraJsmProjects />);

    expect(getByText('12 Jira projects')).toBeInTheDocument();
    expect(
      getByText('12 Jira Service Management projects'),
    ).toBeInTheDocument();
  });
});
