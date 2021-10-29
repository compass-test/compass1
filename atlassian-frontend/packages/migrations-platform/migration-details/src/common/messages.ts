import { defineMessages, FormattedMessage } from 'react-intl';

type StatusMessageKey =
  | 'checksRunningTitle'
  | 'checksRunningDescription'
  | 'checksRunningAutoSaveDescription'
  | 'checksWarningsTitle'
  | 'checksWarningsDescription'
  | 'checksErrorsTitle'
  | 'checksErrorsDescription'
  | 'checksExecutionErrorsTitle'
  | 'checksExecutionErrorsDescription'
  | 'checksBlockingErrorsTitle'
  | 'checksBlockingErrorsDescription'
  | 'checksSuccessTitle'
  | 'checksSuccessDescription'
  | 'migrationValidatingTitle'
  | 'migrationValidatingDescription'
  | 'migrationRunningTitle'
  | 'migrationRunningDescription'
  | 'migrationFailedTitle'
  | 'migrationFailedDescription'
  | 'migrationFailedDescriptionWithoutReports'
  | 'migrationIncompleteTitle'
  | 'migrationIncompleteDescription'
  | 'migrationIncompleteCloudDescription'
  | 'migrationCompleteTitle'
  | 'siteCloudDestinationMigrationCompleteDescription'
  | 'defaultCloudDestinationMigrationCompleteDescription'
  | 'migrationStoppingTitle'
  | 'migrationStoppingDescription'
  | 'migrationStoppedTitle'
  | 'migrationStoppedDescription'
  | 'statusIndicatorErrorIconLabel';

type Messages = Record<StatusMessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  checksRunningTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.checks-running.title',
    defaultMessage: 'Checking your migration',
    description: 'Title for migration status - preflight-checks running',
  },
  checksRunningDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.checks-running.description',
    defaultMessage:
      'We are still checking some of your data. You can see the results of these checks later. Save your migration or go back to view the checks now.',
    description: 'Description for migration status - preflight-checks running',
  },
  checksRunningAutoSaveDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.checks-running-auto-save.description',
    defaultMessage:
      'We are still checking some of your data. You can see the results of these checks later.',
    description:
      'Description for migration status - preflight-checks running with auto-save',
  },
  checksWarningsTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.checks-warnings.title',
    defaultMessage: 'Warnings found',
    description: 'Title for migration status - preflight-checks warnings found',
  },
  checksWarningsDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.checks-warning.description',
    defaultMessage: 'Review these warnings before running your migration.',
    description:
      'Description for migration status - preflight-checks warnings found',
  },
  checksErrorsTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.checks-errors.title',
    defaultMessage: 'Errors found',
    description: 'Title for migration status - preflight-checks errors found',
  },
  checksErrorsDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.checks-errors.description',
    defaultMessage: 'Fix these errors before running your migration.',
    description:
      'Description for migration status - preflight-checks errors found',
  },
  checksExecutionErrorsTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.checks-execution-errors.title',
    defaultMessage: 'We could not check some of your migration',
    description:
      'Title for migration status - execution errors occurred during preflight checks',
  },
  checksExecutionErrorsDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.checks-execution-errors.description',
    defaultMessage:
      "We couldn't check some of your migration for errors. You can run your migration but it may fail.",
    description:
      'Description for migration status - execution errors occurred during preflight checks',
  },
  checksBlockingErrorsTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.checks-blocking-errors.title',
    defaultMessage: 'We could not check your migration',
    description:
      'Title for migration status - blocking execution errors occurred during preflight checks',
  },
  checksBlockingErrorsDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.checks-blocking-errors.description',
    defaultMessage:
      'Refresh to try again or contact support if you continue to get this message.',
    description:
      'Description for migration status - blocking execution errors occurred during preflight checks',
  },
  checksSuccessTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.checks-success.title',
    defaultMessage: 'Your migration is ready to run',
    description: 'Title for migration status - checks successful, ready to run',
  },
  checksSuccessDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.checks-success.description',
    defaultMessage: 'No errors or warnings were found.',
    description:
      'Description for migration status - checks successful, ready to run',
  },
  migrationValidatingTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-validating.title',
    defaultMessage: 'Checking your migration',
    description:
      'Title for migration validating status - validates the migration prior to switching to migration running status',
  },
  migrationValidatingDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-validating.description',
    defaultMessage: 'We are still checking some of your data.',
    description:
      'Description for migration validating status - validates the migration prior to switching to migration running status',
  },
  migrationRunningTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-running.title',
    defaultMessage: 'Migration running',
    description:
      'Title for migration status - blocking execution errors occurred during preflight checks',
  },
  migrationRunningDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-running.description',
    defaultMessage: 'The migration is currently in progress.',
    description:
      'Description for migration status - blocking execution errors occurred during preflight checks',
  },
  migrationFailedTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-failed.title',
    defaultMessage: 'Migration failed',
    description:
      'Title for migration status - blocking execution errors occurred during preflight checks',
  },
  migrationFailedDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-failed.description',
    defaultMessage:
      'We could not complete the migration. Review error log for more details and try running a new migration.',
    description:
      'Description for migration status - blocking execution errors occurred during preflight checks',
  },
  migrationFailedDescriptionWithoutReports: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-failed.description.without.reports',
    defaultMessage: 'We could not complete the migration.',
    description:
      'Description for migration status - blocking execution errors occurred during preflight checks without reports',
  },
  migrationIncompleteTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-incomplete.title',
    defaultMessage: 'Migration incomplete',
    description:
      'Title for migration status - blocking execution errors occurred during preflight checks',
  },
  migrationIncompleteDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-incomplete.description',
    defaultMessage:
      'We could not migrate some data. Review the error log for more details.',
    description:
      'Description for migration status - blocking execution errors occurred during preflight checks',
  },
  migrationIncompleteCloudDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-incomplete.cloud.description',
    defaultMessage: 'We could not migrate some data.',
    description:
      'Description for cloud migration status - blocking execution errors occurred during preflight checks',
  },
  migrationCompleteTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-complete.title',
    defaultMessage: 'Migration complete',
    description:
      'Title for migration status - blocking execution errors occurred during preflight checks',
  },
  siteCloudDestinationMigrationCompleteDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-complete-site-cloud-destination.description',
    defaultMessage:
      'It may take some time for migrated data to appear in your destination site.',
    description:
      'Description for migration status - blocking execution errors occurred during preflight checks',
  },
  defaultCloudDestinationMigrationCompleteDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-complete-default-cloud-destination.description',
    defaultMessage:
      'It may take some time for migrated data to appear in your cloud destination.',
    description:
      'Description for migration status - blocking execution errors occurred during preflight checks',
  },
  migrationStoppingTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-stopping.title',
    defaultMessage: 'Stopping migration',
    description: 'Title for migration status - stopping a migration',
  },
  migrationStoppingDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-stopping.description',
    defaultMessage: 'The migration is currently being stopped.',
    description: 'Description for migration status - stopping a migration',
  },
  migrationStoppedTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-stopped.title',
    defaultMessage: 'Migration stopped',
    description: 'Title for migration status - stopped a migration',
  },
  migrationStoppedDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.migration-stopped.description',
    defaultMessage: `We've already migrated the data marked as complete. If you want to re-migrate them later, you'll need to delete them from your migration destination.`,
    description: 'Description for migration status - stopped a migration',
  },
  statusIndicatorErrorIconLabel: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-card.status-indicator-error-icon-label',
    defaultMessage: 'Error',
  },
});
