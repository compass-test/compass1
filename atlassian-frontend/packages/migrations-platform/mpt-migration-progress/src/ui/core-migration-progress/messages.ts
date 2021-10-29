import { defineMessages } from 'react-intl';

const messages = defineMessages({
  FAILED: {
    id:
      'com.atlassian.migrations-platform.migration-progress.core-migration.failed',
    defaultMessage: 'Migration failed',
    description: 'Message to display when the core migration failed.',
  },
  COMPLETE: {
    id:
      'com.atlassian.migrations-platform.migration-progress.core-migration.complete',
    defaultMessage: 'Migration complete',
    description: 'Message to display when core migration is finished',
  },
  READY: {
    id:
      'com.atlassian.migrations-platform.migration-progress.core-migration.ready',
    defaultMessage: 'Ready to migrate',
    description: 'Message to display when core migration is ready to run',
  },
  INCOMPLETE: {
    id:
      'com.atlassian.migrations-platform.migration-progress.core-migration.incomplete',
    defaultMessage: 'Partially migrated',
    description: 'Message to display when core migration is partially done',
  },
  RUNNING: {
    id:
      'com.atlassian.migrations-platform.migration-progress.core-migration.running',
    defaultMessage: 'Migration in progress',
    description: 'Message to display when core migration is in progress',
  },
  SOME_CHECKS_FAILED: {
    id:
      'com.atlassian.migrations-platform.migration-progress.core-migration.some-checks-failed',
    defaultMessage: 'Some checks failed',
    description: 'Message when the preflight checks failed for a saved plan',
  },
  UNKNOWN_STATUS: {
    id:
      'com.atlassian.migrations-platform.migration-progress.core-migration.unknown',
    defaultMessage: 'Progress of migration could not be confirmed',
    description: 'Message to display when the state is unknown.',
  },
  VALIDATING: {
    id:
      'com.atlassian.migrations-platform.migration-progress.core-migration.validating',
    defaultMessage: 'Checking your migration',
    description: 'Message to display when preflight check is in progress',
  },
  EXPIRED: {
    id:
      'com.atlassian.migrations-platform.migration-progress.core-migration.expired',
    defaultMessage: 'Migration not available',
    description: 'When the migration has expired',
  },
});

export default messages;
