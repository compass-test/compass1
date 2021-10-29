import { defineMessages } from 'react-intl';

const messages = defineMessages({
  FAILED: {
    id:
      'com.atlassian.migrations-platform.migration-progress.app-migration.failed',
    defaultMessage: 'App data migration failed',
    description: 'Message to display when the app migration failed.',
  },
  FAILED_TOOLTIP: {
    id:
      'com.atlassian.migrations-platform.migration-progress.app-migration.failed-toolti' +
      'p',
    defaultMessage:
      'If a migration fails, the app data migration cannot start.',
    description:
      'Tooltip to display when hovering on the tooltip icon. This is for the failed sta' +
      'te',
  },
  COMPLETE: {
    id:
      'com.atlassian.migrations-platform.migration-progress.app-migration.complete',
    defaultMessage: 'App data migration complete',
    description:
      'Message to display when app migration is successfully completed',
  },
  READY: {
    id:
      'com.atlassian.migrations-platform.migration-progress.app-migration.ready',
    defaultMessage: 'Ready to migrate app data',
    description: 'Message to display when app migration is ready to run',
  },
  READY_TOOLTIP: {
    id:
      'com.atlassian.migrations-platform.migration-progress.app-migration.ready-tooltip',
    defaultMessage:
      'App data migration will start after data migration is complete.',
    description:
      'Tooltip to display when hovering on the tooltip icon. This is for the ready stat' +
      'e',
  },
  INCOMPLETE: {
    id:
      'com.atlassian.migrations-platform.migration-progress.app-migration.incomplete',
    defaultMessage: 'App data partially migrated',
    description: 'Message to display when app migration is not completed',
  },
  RUNNING: {
    id:
      'com.atlassian.migrations-platform.migration-progress.app-migration.running',
    defaultMessage: 'App data migration in progress',
    description: 'Message to display when app migration is in progress',
  },
  SAVED_PREFLIGHT_ERROR: {
    id:
      'com.atlassian.migrations-platform.migration-progress.app-migration.some-checks-f' +
      'ailed',
    defaultMessage: 'Some app checks failed',
    description: 'Message when the preflight checks failed for a saved plan',
  },
  UNKNOWN_STATUS: {
    id:
      'com.atlassian.migrations-platform.migration-progress.app-migration.unknown',
    defaultMessage: 'Progress of app data migration could not be confirmed',
    description: 'Message to display when the state is unknown',
  },
  EXPIRED: {
    id:
      'com.atlassian.migrations-platform.migration-progress.app-migration.expired',
    defaultMessage: 'Migration not available',
    description: 'When the migration has expired',
  },
});

export default messages;
