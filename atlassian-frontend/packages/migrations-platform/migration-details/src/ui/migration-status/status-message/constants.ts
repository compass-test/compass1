import messages from '../../../common/messages';
import type { OverallMigrationStatus } from '../../../common/types';

import { StatusMessages } from './types';

export const statusToMessages: Record<
  OverallMigrationStatus,
  StatusMessages
> = {
  ChecksRunning: {
    title: messages.checksRunningTitle,
    description: messages.checksRunningDescription,
  },
  ChecksSuccess: {
    title: messages.checksSuccessTitle,
    description: messages.checksSuccessDescription,
  },
  ChecksError: {
    title: messages.checksErrorsTitle,
    description: messages.checksErrorsDescription,
  },
  ChecksWarning: {
    title: messages.checksWarningsTitle,
    description: messages.checksWarningsDescription,
  },
  ChecksExecutionError: {
    title: messages.checksExecutionErrorsTitle,
    description: messages.checksExecutionErrorsDescription,
  },
  ChecksBlockingExecutionError: {
    title: messages.checksBlockingErrorsTitle,
    description: messages.checksBlockingErrorsDescription,
  },
  MigrationValidating: {
    title: messages.migrationValidatingTitle,
    description: messages.migrationValidatingDescription,
  },
  MigrationRunning: {
    title: messages.migrationRunningTitle,
    description: messages.migrationRunningDescription,
  },
  MigrationComplete: {
    title: messages.migrationCompleteTitle,
    cloudDestination: {
      jira: messages.siteCloudDestinationMigrationCompleteDescription,
      confluence: messages.defaultCloudDestinationMigrationCompleteDescription,
      bitbucket: messages.defaultCloudDestinationMigrationCompleteDescription,
    },
  },
  MigrationIncomplete: {
    title: messages.migrationIncompleteTitle,
    description: messages.migrationIncompleteDescription,
  },
  MigrationFailed: {
    title: messages.migrationFailedTitle,
    description: messages.migrationFailedDescription,
  },
  MigrationStopping: {
    title: messages.migrationStoppingTitle,
    description: messages.migrationStoppingDescription,
  },
  MigrationStopped: {
    title: messages.migrationStoppedTitle,
    description: messages.migrationStoppedDescription,
  },
};

export const statusToMessagesForCloudMigration: Record<
  OverallMigrationStatus,
  StatusMessages
> = {
  ...statusToMessages,
  ChecksRunning: {
    title: messages.checksRunningTitle,
    description: messages.checksRunningAutoSaveDescription,
  },
  MigrationIncomplete: {
    title: messages.migrationIncompleteTitle,
    description: messages.migrationIncompleteCloudDescription,
  },
  MigrationFailed: {
    title: messages.migrationFailedTitle,
    description: messages.migrationFailedDescriptionWithoutReports,
  },
};

export const preMigrationStatuses = [
  'ChecksRunning',
  'ChecksSuccess',
  'ChecksError',
  'ChecksWarning',
  'ChecksExecutionError',
  'ChecksBlockingExecutionError',
];
