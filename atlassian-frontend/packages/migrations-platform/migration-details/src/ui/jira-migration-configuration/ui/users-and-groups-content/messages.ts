import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey =
  | 'allUsersAndGroups'
  | 'referencedUsersAndGroups'
  | 'referencedUsersAndGroupsWithOptions'
  | 'includeRoleActors'
  | 'includeUsersInGroups';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  allUsersAndGroups: {
    id:
      'com.atlassian.migrations-platform.migration-details.configuration.users-and-groups-content.all-users-and-groups',
    defaultMessage:
      'You have chosen to migrate all users and groups from the Jira directory',
  },
  referencedUsersAndGroups: {
    id:
      'com.atlassian.migrations-platform.migration-details.configuration.users-and-groups-content.referenced-users-and-groups',
    defaultMessage: 'Users and groups related to the selected projects.',
  },
  referencedUsersAndGroupsWithOptions: {
    id:
      'com.atlassian.migrations-platform.migration-details.configuration.users-and-groups-content.referenced-users-and-groups-options',
    defaultMessage: 'Users and groups related to the selected projects. Plus:',
  },
  includeRoleActors: {
    id:
      'com.atlassian.migrations-platform.migration-details.configuration.users-and-groups-content.include-role-actors',
    defaultMessage: 'All users and groups assigned to roles',
  },
  includeUsersInGroups: {
    id:
      'com.atlassian.migrations-platform.migration-details.configuration.users-and-groups-content.include-users-in-groups',
    defaultMessage: 'Any user who is a member of any related group',
  },
});
