import React from 'react';

import { render } from '@testing-library/react';

import {
  JiraMigrationConfigurationBasic,
  JiraMigrationConfigurationJiraJSM,
  JiraMigrationConfigurationMinimumData,
  JiraMigrationConfigurationPreserveGroupMemberships,
  JiraMigrationConfigurationProjectAllData,
  JiraMigrationConfigurationProjectAttachmentsOnly,
  JiraMigrationConfigurationProjectConfigOnly,
  JiraMigrationConfigurationProjectSingle,
  JiraMigrationConfigurationWithCustomDestinationCloudPlanHeader,
  JiraMigrationConfigurationWithCustomDestinationHeader,
  JiraMigrationConfigurationWithCustomSourceHeader,
  JiraMigrationConfigurationWithEdit,
} from './examples';
import messages from './messages';

describe('<JiraMigrationConfiguration />', () => {
  it('should show source url, destination url, cloud plan and project configuration content when data is available', () => {
    const { getByText } = render(<JiraMigrationConfigurationBasic />);

    expect(
      getByText(messages.destinationUrlHeader.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.sourceUrlHeader.defaultMessage!),
    ).toBeInTheDocument();
    expect(getByText('Cloud plan')).toBeInTheDocument();
    expect(
      getByText(messages.projectsHeader.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.migrateUsersGroupsSeparately.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should not show source url, destination url, cloud plan and project configuration content when data is not available', () => {
    const { queryByText } = render(<JiraMigrationConfigurationMinimumData />);

    expect(
      queryByText(messages.destinationUrlHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.sourceUrlHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(queryByText('Cloud plan')).not.toBeInTheDocument();
    expect(
      queryByText(messages.projectsHeader.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.usersAndGroupsHeader.defaultMessage!),
    ).not.toBeInTheDocument();
  });

  it('should show correct custom source url header', () => {
    const { getByText } = render(
      <JiraMigrationConfigurationWithCustomSourceHeader />,
    );

    expect(getByText('Source site header')).toBeInTheDocument();
  });

  it('should show correct custom destination url header', () => {
    const { getByText } = render(
      <JiraMigrationConfigurationWithCustomDestinationHeader />,
    );

    expect(getByText('Destination site')).toBeInTheDocument();
  });

  it('should show correct custom destination cloud plan header', () => {
    const { getByText } = render(
      <JiraMigrationConfigurationWithCustomDestinationCloudPlanHeader />,
    );

    expect(getByText('Destination Cloud plan')).toBeInTheDocument();
  });

  it('should show correct message when preserving group membership', () => {
    const { getByText } = render(
      <JiraMigrationConfigurationPreserveGroupMemberships />,
    );

    expect(
      getByText(messages.preserveGroupMembership.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should show render edit migration button', () => {
    const { getByTestId } = render(<JiraMigrationConfigurationWithEdit />);

    const editButton = getByTestId('editMigrationConfigButton');
    expect(editButton).toBeInTheDocument();
    expect(editButton.textContent).toMatch(/Edit/i);
    expect(editButton).toBeEnabled();
  });

  describe('Projects content', () => {
    it('should show correct message when config only', () => {
      const { getByText } = render(
        <JiraMigrationConfigurationProjectConfigOnly />,
      );

      expect(getByText('2 projects: configuration only')).toBeInTheDocument();
    });

    it('should show correct message when attachments only', () => {
      const { getByText } = render(
        <JiraMigrationConfigurationProjectAttachmentsOnly />,
      );

      expect(
        getByText('3 projects: attachments only (2 KB)'),
      ).toBeInTheDocument();
    });

    it('should show correct message when all projectt data', () => {
      const { getByText } = render(
        <JiraMigrationConfigurationProjectAllData />,
      );

      expect(
        getByText('6 projects, 200 issues and 2 KB of attachments.'),
      ).toBeInTheDocument();
    });

    it('should show correct message when all projectt data', () => {
      const { getByText } = render(<JiraMigrationConfigurationProjectSingle />);

      expect(
        getByText('1 project, 1 issue and 2 KB of attachments.'),
      ).toBeInTheDocument();
    });

    it('should show source url, destination url, cloud plan and project configuration content when data is available', () => {
      const { getByText } = render(<JiraMigrationConfigurationJiraJSM />);

      expect(
        getByText('Jira Service Management Cloud Free plan'),
      ).toBeInTheDocument();
      expect(
        getByText(
          '12 Jira Service Management projects, 200 issues and 0 KB of attachments.',
        ),
      ).toBeInTheDocument();
      expect(
        getByText('12 Jira projects, 200 issues, and 0 KB of attachments.'),
      ).toBeInTheDocument();
    });
  });
});
