import { defineMessages, FormattedMessage } from 'react-intl';

type StatusMessageKey =
  | 'currentChecksStatusRunningTitle'
  | 'currentChecksStatusWarningTitle'
  | 'currentChecksStatusErrorTitle'
  | 'currentChecksStatusBlockingExecutionErrorTitle'
  | 'currentChecksStatusExecutionErrorTitle'
  | 'currentChecksStatusSuccessTitle';

type Messages = Record<StatusMessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  currentChecksStatusRunningTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.current-checks-status-running.title',
    defaultMessage: 'Running',
    description: 'Title for preflight checks status - Running',
  },
  currentChecksStatusWarningTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.current-checks-status-warning.title',
    defaultMessage: 'View warnings',
    description: 'Title for preflight checks status - Warning',
  },
  currentChecksStatusErrorTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.current-checks-status-error.title',
    defaultMessage: 'View errors and warnings',
    description: 'Title for preflight checks status - Error',
  },
  currentChecksStatusBlockingExecutionErrorTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.current-checks-status-blocking-execution-error.title',
    defaultMessage: 'View warnings',
    description:
      'Title for preflight checks status - Error that blocks the migration',
  },
  currentChecksStatusExecutionErrorTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.current-checks-status-execution-error.title',
    defaultMessage: 'View warnings',
    description:
      "Title for preflight checks status - Execution error that doesn't block the migration",
  },
  currentChecksStatusSuccessTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.migration-status.current-checks-status-success.title',
    defaultMessage: 'No warnings or errors',
    description: 'Title for preflight checks status - Success',
  },
});
