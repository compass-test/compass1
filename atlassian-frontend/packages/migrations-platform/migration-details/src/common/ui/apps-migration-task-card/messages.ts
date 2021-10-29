import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey =
  | 'taskName'
  | 'noSelectionText'
  | 'selectedAppsTitle'
  | 'selectedAppsDescription'
  | 'notMigratingText';
type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  notMigratingText: {
    id:
      'com.atlassian.migrations-platform.migration-details.app-migrations-task-card.not-selected',
    defaultMessage: 'No apps to be migrated',
    description:
      'When the user does not make any selection of apps to migrate, this message is shown',
  },
  taskName: {
    id:
      'com.atlassian.migrations-platform.migration-details.app-migrations-task-card.task-name',
    defaultMessage: 'Apps',
    description: 'This is the title for the apps migration task card.',
  },
  noSelectionText: {
    id:
      'com.atlassian.migrations-platform.migration-details.app-migrations-task-card.no-selection-text',
    defaultMessage: 'No apps selected',
    description:
      'This message is displayed when there user chose not to migrate the selected apps',
  },
  selectedAppsTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.app-migrations-task-card.apps-count-title',
    defaultMessage: '{count, plural, one {{count} app} other {{count} apps}}',
    description:
      'This message is to show the number of apps selected for migration. It can be one or more',
  },
  selectedAppsDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.app-migrations-task-card.apps-count-description',
    defaultMessage:
      'All apps marked as ‘Needed in cloud’ with a migration path.',
    description:
      'This description message is displayed when the user has selected apps to be migrated.',
  },
});
