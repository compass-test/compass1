import { defineMessages, FormattedMessage } from 'react-intl';

type MessageType =
  | 'emptyDescription'
  | 'headDescriptionCanBeMigrated'
  | 'headDescriptionHasCloudVersion'
  | 'headDescriptionMigrationNotes'
  | 'headDescriptionMigrationStatus'
  | 'headDescriptionPages'
  | 'headDescriptionUsers'
  | 'headLabelCanBeMigrated'
  | 'headLabelHasCloudVersion'
  | 'headLabelMigrationNotes'
  | 'headLabelMigrationStatus'
  | 'headLabelPages'
  | 'headLabelUsers';

type Messages = Record<MessageType, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  emptyDescription: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.empty-description',
    defaultMessage:
      'You don’t have any apps that need migrating with this tool.',
    description:
      'The empty placeholder message if user does not have any apps to migrate',
  },
  headDescriptionCanBeMigrated: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.head-description.can-be-migrated',
    defaultMessage: 'Shows the available vendor migration pathway',
    description:
      'The has cloud version head column description, the column indicates whether the app can be migrated to cloud',
  },
  headDescriptionHasCloudVersion: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.head-description.has-cloud-version',
    defaultMessage:
      'Shows whether this app has an equivalent cloud version by the same vendor',
    description:
      'The has cloud version head column description, the column indicates whether the app has corresponding cloud app',
  },
  headDescriptionMigrationNotes: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.head-description.migration-notes',
    defaultMessage: 'Add notes for yourself here',
    description:
      'The has cloud version head column description, the column can let user to attach custom note',
  },
  headDescriptionMigrationStatus: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.head-description.migration-status',
    defaultMessage: 'Status options you can assign to your app',
    description: 'The migration status head column description',
  },
  headDescriptionPages: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.head-description.pages',
    defaultMessage: 'Number of pages containing the macros of this app',
    description: 'The migration pages head column description',
  },
  headDescriptionUsers: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.head-description.users',
    defaultMessage:
      'Number of unique user views of relevant macros, from the last 60 days',
    description: 'The migration users head column description',
  },
  headLabelCanBeMigrated: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.head-label.can-be-migrated',
    defaultMessage: 'Can be migrated',
    description: 'The head column label for can be migrated',
  },
  headLabelHasCloudVersion: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.head-label.has-cloud-version',
    defaultMessage: 'Exists in cloud',
    description: 'The head column label for exists in cloud',
  },
  headLabelMigrationNotes: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.head-label.migration-notes',
    defaultMessage: 'Notes',
    description: 'The head column label for migration notes',
  },
  headLabelMigrationStatus: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.head-label.migration-status',
    defaultMessage: 'Status',
    description: 'The head column label for migration status',
  },
  headLabelPages: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.head-label.pages',
    defaultMessage: 'Appears on',
    description: 'The head column label for migration pages',
  },
  headLabelUsers: {
    id:
      'com.atlassian.migrations-platform.app-assessment-table.head-label.users',
    defaultMessage: 'Viewed by',
    description: 'The head column label for migration users',
  },
});
