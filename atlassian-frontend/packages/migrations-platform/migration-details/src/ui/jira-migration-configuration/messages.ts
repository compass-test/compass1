import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey =
  | 'configurationCaption'
  | 'migrationNameHeader'
  | 'sourceUrlHeader'
  | 'destinationUrlHeader'
  | 'destinationCloudPlanHeader'
  | 'projectsHeader'
  | 'usersAndGroupsHeader'
  | 'cloudMigrationUsersAndGroupsContent'
  | 'groupMembershipHeader'
  | 'appDataHeader'
  | 'appDataContent'
  | 'preserveGroupMembership'
  | 'cloudMigrationGroupMembershipContent'
  | 'cloudMigrationGroupMembershipLink'
  | 'migrateUsersGroupsSeparately'
  | 'configOnly'
  | 'attachmentsOnly'
  | 'all'
  | 'issuesCountString'
  | 'projectsCountString'
  | 'editMigration'
  | 'editMigrationTooltip'
  | 'customersHeader';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  configurationCaption: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.configuration-caption',
    defaultMessage: 'Configuration',
  },
  migrationNameHeader: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.migration-name-header',
    defaultMessage: 'Migration name',
  },
  sourceUrlHeader: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.source-url-header',
    defaultMessage: 'Source site',
  },
  destinationUrlHeader: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.destination-url-header',
    defaultMessage: 'Destination',
  },
  destinationCloudPlanHeader: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.destination-cloud-plan-header',
    defaultMessage: '{count, plural, one {Cloud plan} other {Cloud plans}}',
  },
  projectsHeader: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.projects-header',
    defaultMessage: 'Projects',
  },
  usersAndGroupsHeader: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.users-and-groups-header',
    defaultMessage: 'Users and groups',
  },
  cloudMigrationUsersAndGroupsContent: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.cloud-migration-users-and-groups-content',
    defaultMessage:
      'All users and groups of the source site will be migrated to the destination site',
  },
  groupMembershipHeader: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.group-membership-header',
    defaultMessage: 'Group membership',
  },
  appDataHeader: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.app-data-header',
    defaultMessage: 'App data',
  },
  appDataContent: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.app-data-content-plural',
    defaultMessage: '{count} {count, plural, one {app} other {apps}}',
  },
  preserveGroupMembership: {
    id:
      'com.atlassian.migrations-platform.migration-details.configuration.group-membership-content.preserve',
    defaultMessage:
      'Group membership will be preserved. Users will get product access and will be added to your cloud license.',
  },
  migrateUsersGroupsSeparately: {
    id:
      'com.atlassian.migrations-platform.migration-details.configuration.group-membership-content.migrate-separately',
    defaultMessage:
      'Users and groups will be migrated separately. Users will not be given project permissions and will not be added to your license.',
  },
  cloudMigrationGroupMembershipContent: {
    id:
      'com.atlassian.migrations-platform.migration-details.configuration.cloud-migration-group-membership-content',
    defaultMessage:
      "Users and groups will be migrated separately. Users will not be added to groups in the destination site. You'll need to manually <a href='{url}' target='_blank'>add users to groups</a> after migration.",
  },
  cloudMigrationGroupMembershipLink: {
    id:
      'com.atlassian.migrations-platform.migration-details.configuration.cloud-migration-group-membership-link',
    defaultMessage: 'add users to groups after the migration.',
  },
  configOnly: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.project-configuration-content.config-only',
    defaultMessage: '{numberOfProjectsString}: configuration only',
  },
  attachmentsOnly: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.project-configuration-content.attachments-only',
    defaultMessage:
      '{numberOfProjectsString}: attachments only ({attachmentsBytesSizeString})',
  },
  all: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.project-configuration-content.all',
    defaultMessage:
      '{numberOfProjectsString}, {numberOfIssuesString} and {attachmentsBytesSizeString} of attachments.',
  },
  issuesCountString: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.project-configuration-content.issues-count-string',
    defaultMessage: '{count} {count, plural, one {issue} other {issues}}',
  },
  projectsCountString: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.project-configuration-content.projects-count-string',
    defaultMessage: '{count} {count, plural, one {project} other {projects}}',
  },
  editMigration: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.edit-migration',
    defaultMessage: 'Edit',
  },
  editMigrationTooltip: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.edit-migration-tooltip',
    defaultMessage: 'Edit migration',
  },
  customersHeader: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.customers-header',
    defaultMessage: 'Customers',
  },
});
