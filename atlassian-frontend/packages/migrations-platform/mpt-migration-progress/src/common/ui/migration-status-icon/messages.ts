import { defineMessages } from 'react-intl';

const messages = defineMessages({
  ERROR_LABEL: {
    id: 'com.atlassian.migrations-platform.migration-status-icon.error-label',
    defaultMessage: 'Error',
    description: 'Icon label when in error state',
  },
  READY_LABEL: {
    id: 'com.atlassian.migrations-platform.migration-status-icon.ready-label',
    defaultMessage: 'Ready',
    description: 'Icon label when in ready state',
  },
  COMPLETE_LABEL: {
    id:
      'com.atlassian.migrations-platform.migration-status-icon.complete-label',
    defaultMessage: 'Complete',
    description: 'Icon label when in complete state',
  },
  ERROR_LITE_LABEL: {
    id:
      'com.atlassian.migrations-platform.migration-status-icon.error-lite-label',
    defaultMessage: 'Error',
    description: 'Icon label when in error state',
  },
  WARNING_LABEL: {
    id: 'com.atlassian.migrations-platform.migration-status-icon.warning-label',
    defaultMessage: 'Warning',
    description: 'Icon label when in warning state',
  },
  DISABLED_LABEL: {
    id: 'com.atlassian.migrations-platform.migration-status-icon.warning-label',
    defaultMessage: 'Disabled',
    description: 'Icon label when in disabled state',
  },
});

export default messages;
