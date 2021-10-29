import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey =
  | 'taskName'
  | 'noSelectionText'
  | 'allUsersAndGroups'
  | 'usersAndGroupsCounts'
  | 'preserveGroupMembershipTitle'
  | 'preserveGroupMembershipDescription'
  | 'migrateUsersGroupsSeparatelyTitle'
  | 'migrateUsersGroupsSeparatelyDescription'
  | 'referencedUsersAndGroupsTitle'
  | 'referencedUsersAndGroupsMinimum'
  | 'includeRoleActors'
  | 'referencedUsersAndGroupsWithOptions'
  | 'includeUsersInGroups'
  | 'skipAllUsersAndGroupsButtonText'
  | 'selectAllUsersAndGroupsButtonText'
  | 'attachmentsOnlyDisabledDescription';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  taskName: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.task-name',
    defaultMessage: 'Users and groups',
  },
  noSelectionText: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.no-selection-text',
    defaultMessage: 'No users, groups, or group membership selected',
  },
  allUsersAndGroups: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.all-users-and-groups',
    defaultMessage: 'All users and groups from the Jira directory',
  },
  usersAndGroupsCounts: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.users-and-groups-counts',
    defaultMessage: 'Currently, {usersCount} users and {groupsCount} groups.',
  },
  preserveGroupMembershipTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.preserver-group-membership-title',
    defaultMessage: 'Preserve group memberships',
  },
  preserveGroupMembershipDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.preserver-group-membership-description',
    defaultMessage:
      'Users will get product access and will be added to your cloud license.',
  },
  migrateUsersGroupsSeparatelyTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.migrate-users-groups-separately-title',
    defaultMessage: 'Migrate users and groups separately',
  },
  migrateUsersGroupsSeparatelyDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.migrate-users-groups-separately-description',
    defaultMessage:
      'Users will not be given project permissions and will not be added to your license.',
  },

  referencedUsersAndGroupsTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.refrenced-users-and-groups-title',
    defaultMessage: 'Only users and groups related to selected projects',
  },

  referencedUsersAndGroupsMinimum: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.refrenced-users-and-groups-minimum',
    defaultMessage: 'Users and groups referenced in projects.',
  },

  includeRoleActors: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.include-role-actors',
    defaultMessage: 'All users and groups assigned to required roles.',
  },

  referencedUsersAndGroupsWithOptions: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.referenced-users-and-groups-with-options',
    defaultMessage: 'Users and groups referenced in projects.',
  },
  includeUsersInGroups: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.include-users-in-groups',
    defaultMessage: 'Any user that is a member of a group in this migration.',
  },
  skipAllUsersAndGroupsButtonText: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.skip-all-users-and-groups-button-text',
    defaultMessage: 'Skip all users and groups',
  },
  selectAllUsersAndGroupsButtonText: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.select-all-users-and-groups-button-text',
    defaultMessage: 'Select all users and groups',
  },
  attachmentsOnlyDisabledDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.users-and-groups-task-card.attachments-only-disabled-description',
    defaultMessage:
      'Since only project attachments are selected, no users, groups, or group membership can be migrated.',
  },
});
