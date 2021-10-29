import React from 'react';

import { render } from '@testing-library/react';

import {
  UsersAndGroupsAll,
  UsersAndGroupsMin,
  UsersAndGroupsMinPlusGroups,
  UsersAndGroupsMinPlusRoles,
  UsersAndGroupsMinPlusRolesPlusGroups,
} from './examples';
import messages from './messages';

describe('<UsersAndGroupsContent />', () => {
  it('should show correct message for all users', () => {
    const { getByText, queryByText } = render(<UsersAndGroupsAll />);

    expect(
      getByText(messages.allUsersAndGroups.defaultMessage!),
    ).toBeInTheDocument();

    expect(
      queryByText(messages.referencedUsersAndGroups.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.referencedUsersAndGroupsWithOptions.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.includeUsersInGroups.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.includeRoleActors.defaultMessage!),
    ).not.toBeInTheDocument();
  });

  it('should show correct message for minimum referenced users', () => {
    const { getByText, queryByText } = render(<UsersAndGroupsMin />);

    expect(
      queryByText(messages.allUsersAndGroups.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      getByText(messages.referencedUsersAndGroups.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      queryByText(messages.referencedUsersAndGroupsWithOptions.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.includeUsersInGroups.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      queryByText(messages.includeRoleActors.defaultMessage!),
    ).not.toBeInTheDocument();
  });

  it('should show correct message for referenced users and role actors', () => {
    const { getByText, queryByText } = render(<UsersAndGroupsMinPlusRoles />);

    expect(
      queryByText(messages.allUsersAndGroups.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      getByText(messages.referencedUsersAndGroupsWithOptions.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      queryByText(messages.includeUsersInGroups.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      getByText(messages.includeRoleActors.defaultMessage!),
    ).toBeInTheDocument();
  });

  it('should show correct message for referenced users and users in groups', () => {
    const { getByText, queryByText } = render(<UsersAndGroupsMinPlusGroups />);

    expect(
      queryByText(messages.allUsersAndGroups.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      getByText(messages.referencedUsersAndGroupsWithOptions.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.includeUsersInGroups.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      queryByText(messages.includeRoleActors.defaultMessage!),
    ).not.toBeInTheDocument();
  });

  it('should show correct message for referenced users and role actors and users in groups', () => {
    const { getByText, queryByText } = render(
      <UsersAndGroupsMinPlusRolesPlusGroups />,
    );

    expect(
      queryByText(messages.allUsersAndGroups.defaultMessage!),
    ).not.toBeInTheDocument();
    expect(
      getByText(messages.referencedUsersAndGroupsWithOptions.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.includeUsersInGroups.defaultMessage!),
    ).toBeInTheDocument();
    expect(
      getByText(messages.includeRoleActors.defaultMessage!),
    ).toBeInTheDocument();
  });
});
