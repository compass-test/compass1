import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { UsersAndGroupsMode } from '../../types';

import {
  DisabledForAttachmentsOnly,
  DisabledWithCustomReason,
  MigratingAllUsersAndGroupsButMigrateUsersAndGroupsSeparately,
  MigratingAllUsersAndGroupsPreservingGroupMembership,
  MigratingReferencedUsersAndGroups,
  MigratingReferencedUsersAndGroupsIncludingAllUsersReferencedInIncludedGroups,
  MigratingReferencedUsersAndGroupsIncludingThoseReferencedInRoles,
  MigratingReferencedUsersAndGroupsIncludingThoseReferencedInRolesAndAllUsersReferencedInIncludedGroups,
  MigratingUsersAndGroupsButProjectAttachmentsOnly,
  NoSelection,
} from './examples';

describe('<UsersAndGroupsTaskCard />', () => {
  describe('when in initial state', () => {
    it('should show not-complete icon', () => {
      const { getByRole } = render(<NoSelection />);
      expect(getByRole('img')).toHaveAttribute('aria-label', 'Not completed');
    });

    it('should show nothing selected description', () => {
      const { getByText } = render(<NoSelection />);
      expect(
        getByText('No users, groups, or group membership selected'),
      ).toBeInTheDocument();
    });

    it('should be disabled', () => {
      const { getByText } = render(<NoSelection />);
      expect(getByText('Select')).toBeDisabled();
    });
  });

  describe('when selecting all users and groups and preserving group membership', () => {
    it('should show all selected description', () => {
      const { getByText } = render(
        <MigratingAllUsersAndGroupsPreservingGroupMembership />,
      );
      expect(
        getByText('All users and groups from the Jira directory'),
      ).toBeInTheDocument();
    });

    it('should show the number of users and groups selected', () => {
      const { getByText } = render(
        <MigratingAllUsersAndGroupsPreservingGroupMembership />,
      );
      expect(
        getByText('Currently, 1435 users and 10 groups.'),
      ).toBeInTheDocument();
    });

    it('should show preserve group membership message', () => {
      const { getByText } = render(
        <MigratingAllUsersAndGroupsPreservingGroupMembership />,
      );

      expect(getByText('Preserve group memberships')).toBeInTheDocument();
      expect(
        getByText(
          'Users will get product access and will be added to your cloud license.',
        ),
      ).toBeInTheDocument();
    });

    it('should NOT show migrate users and groups separately message', () => {
      const { queryByText } = render(
        <MigratingAllUsersAndGroupsPreservingGroupMembership />,
      );

      expect(
        queryByText('Migrate users and groups separately'),
      ).not.toBeInTheDocument();
      expect(
        queryByText(
          'Users will not be given project permissions and will not be added to your license.',
        ),
      ).not.toBeInTheDocument();
    });
  });

  describe('when selecting all users and groups but migrating users and groups separately', () => {
    it('should show migrate users and groups separately message', () => {
      const { getByText } = render(
        <MigratingAllUsersAndGroupsButMigrateUsersAndGroupsSeparately />,
      );

      expect(
        getByText('Migrate users and groups separately'),
      ).toBeInTheDocument();
      expect(
        getByText(
          'Users will not be given project permissions and will not be added to your license.',
        ),
      ).toBeInTheDocument();
    });

    it('should not show preserve group membership message', () => {
      const { queryByText } = render(
        <MigratingAllUsersAndGroupsButMigrateUsersAndGroupsSeparately />,
      );

      expect(queryByText('Preserve group memberships')).not.toBeInTheDocument();
      expect(
        queryByText(
          'Users will get product access and will be added to your cloud license.',
        ),
      ).not.toBeInTheDocument();
    });
  });

  describe('when selecting minimum referenced users and groups', () => {
    it('should show referenced users and groups selected message', () => {
      const { getByText, queryByText } = render(
        <MigratingReferencedUsersAndGroups />,
      );

      expect(
        getByText('Only users and groups related to selected projects'),
      ).toBeInTheDocument();
      expect(
        getByText('Users and groups referenced in projects.'),
      ).toBeInTheDocument();
      expect(
        queryByText('All users and groups assigned to required roles.', {
          exact: false,
        }),
      ).not.toBeInTheDocument();
      expect(
        queryByText('Any user that is a member of a group in this migration.', {
          exact: false,
        }),
      ).not.toBeInTheDocument();
    });
  });

  describe('when selecting referenced users and groups including those assigned to required roles', () => {
    it('should show referenced users and groups selected message', () => {
      const { getByText, queryByText } = render(
        <MigratingReferencedUsersAndGroupsIncludingThoseReferencedInRoles />,
      );

      expect(
        getByText('Only users and groups related to selected projects'),
      ).toBeInTheDocument();
      expect(
        getByText('Users and groups referenced in projects.', { exact: false }),
      ).toBeInTheDocument();
      expect(
        getByText('All users and groups assigned to required roles.', {
          exact: false,
        }),
      ).toBeInTheDocument();
      expect(
        queryByText('Any user that is a member of a group in this migration.', {
          exact: false,
        }),
      ).not.toBeInTheDocument();
    });
  });

  describe('when selecting referenced users and groups including those assigned to required roles and all members in referenced groups', () => {
    it('should show referenced users and groups selected message', () => {
      const { getByText } = render(
        <MigratingReferencedUsersAndGroupsIncludingThoseReferencedInRolesAndAllUsersReferencedInIncludedGroups />,
      );

      expect(
        getByText('Only users and groups related to selected projects'),
      ).toBeInTheDocument();
      expect(
        getByText('Users and groups referenced in projects.', { exact: false }),
      ).toBeInTheDocument();
      expect(
        getByText('All users and groups assigned to required roles.', {
          exact: false,
        }),
      ).toBeInTheDocument();
      expect(
        getByText('Any user that is a member of a group in this migration.', {
          exact: false,
        }),
      ).toBeInTheDocument();
    });
  });

  describe('when selecting referenced users and groups including all members in referenced groups', () => {
    it('should show referenced users and groups selected message', () => {
      const { getByText, queryByText } = render(
        <MigratingReferencedUsersAndGroupsIncludingAllUsersReferencedInIncludedGroups />,
      );

      expect(
        getByText('Only users and groups related to selected projects'),
      ).toBeInTheDocument();
      expect(
        getByText('Users and groups referenced in projects.', { exact: false }),
      ).toBeInTheDocument();
      expect(
        queryByText('All users and groups assigned to required roles.', {
          exact: false,
        }),
      ).not.toBeInTheDocument();
      expect(
        getByText('Any user that is a member of a group in this migration.', {
          exact: false,
        }),
      ).toBeInTheDocument();
    });
  });

  describe('when explicitly disabled with a given reason', () => {
    it('should show custom disabled description', () => {
      const { getByText } = render(<DisabledWithCustomReason />);
      expect(
        getByText('Some specific reason why this is disabled'),
      ).toBeInTheDocument();
    });

    it('should show the Select button disabled', () => {
      const { getByText } = render(<DisabledWithCustomReason />);
      expect(getByText('Select')).toBeDisabled();
    });
  });

  ['All' as UsersAndGroupsMode, 'Referenced' as UsersAndGroupsMode].forEach(
    (selectionMode) => {
      describe(`when migrating ${selectionMode} Users and Groups and migrating project attachements only`, () => {
        it('should show error icon', () => {
          const { getByRole } = render(
            <MigratingUsersAndGroupsButProjectAttachmentsOnly
              selection={{
                mode: selectionMode,
                shouldPreserveMemberships: false,
              }}
            />,
          );
          expect(getByRole('img')).toHaveAttribute('aria-label', 'Error');
        });

        it('should enable the Edit button for manually fixing the problem', () => {
          const { getByText } = render(
            <MigratingUsersAndGroupsButProjectAttachmentsOnly
              selection={{
                mode: selectionMode,
                shouldPreserveMemberships: false,
              }}
            />,
          );
          expect(getByText('Edit')).toBeEnabled();
        });

        it(`should enable the 'Skip all users and groups' button and fire correct handler when clilcked`, () => {
          const onSkipUsersAndGroups = jest.fn();
          const { getByText } = render(
            <MigratingUsersAndGroupsButProjectAttachmentsOnly
              selection={{
                mode: selectionMode,
                shouldPreserveMemberships: false,
              }}
              onSkipUsersAndGroups={onSkipUsersAndGroups}
            />,
          );
          const skipUsersAndGroupsButton = getByText(
            'Skip all users and groups',
          );
          expect(skipUsersAndGroupsButton).toBeEnabled();
          expect(onSkipUsersAndGroups).not.toHaveBeenCalled();
          fireEvent.click(skipUsersAndGroupsButton);
          expect(onSkipUsersAndGroups).toHaveBeenCalledTimes(1);
        });
      });
    },
  );

  describe(`when migrating All Users and Groups but not migrating any projects`, () => {
    it('should be permitted and show completed icon', () => {
      const { getByRole } = render(
        <MigratingAllUsersAndGroupsPreservingGroupMembership
          isNotMigratingAnyProjects={true}
        />,
      );
      expect(getByRole('img')).toHaveAttribute('aria-label', 'Completed');
    });
  });

  describe(`when migrating Referenced Users and Groups but not migrating any projects`, () => {
    it('should show error icon', () => {
      const { getByRole } = render(
        <MigratingReferencedUsersAndGroups isNotMigratingAnyProjects={true} />,
      );
      expect(getByRole('img')).toHaveAttribute('aria-label', 'Error');
    });

    it('should enable the Edit button for manually fixing the problem', () => {
      const { getByText } = render(
        <MigratingReferencedUsersAndGroups isNotMigratingAnyProjects={true} />,
      );
      expect(getByText('Edit')).toBeEnabled();
    });

    it(`should enable the 'Select all users and groups' button and fire correct handler when clilcked`, () => {
      const onSelectAllUsersAndGroups = jest.fn();
      const { getByText } = render(
        <MigratingReferencedUsersAndGroups
          isNotMigratingAnyProjects={true}
          onSelectAllUsersAndGroups={onSelectAllUsersAndGroups}
        />,
      );
      const selectAllUsersAndGroupsButton = getByText(
        'Select all users and groups',
      );
      expect(selectAllUsersAndGroupsButton).toBeEnabled();
      expect(onSelectAllUsersAndGroups).not.toHaveBeenCalled();
      fireEvent.click(selectAllUsersAndGroupsButton);
      expect(onSelectAllUsersAndGroups).toHaveBeenCalledTimes(1);
    });
  });

  describe('when migrating project attachments only and skipping all users and groups', () => {
    it('should show not-complete icon', () => {
      const { getByRole } = render(<DisabledForAttachmentsOnly />);
      expect(getByRole('img')).toHaveAttribute('aria-label', 'Not completed');
    });

    it('should show description explaining why this task is disabled', () => {
      const { getByText } = render(<DisabledForAttachmentsOnly />);
      expect(
        getByText(
          'Since only project attachments are selected, no users, groups, or group membership can be migrated.',
        ),
      ).toBeInTheDocument();
    });

    it('should disable the Select button', () => {
      const { getByText } = render(<DisabledForAttachmentsOnly />);
      expect(getByText('Select')).toBeDisabled();
    });
  });
});
