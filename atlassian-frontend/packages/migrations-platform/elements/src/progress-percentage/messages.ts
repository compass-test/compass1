import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  ready: {
    id: 'com.atlassian.migrations-platform.elements.progress-percentage.ready',
    defaultMessage: 'Ready',
    description: 'Ready status for progress percentage',
  },
  running: {
    id:
      'com.atlassian.migrations-platform.elements.progress-percentage.running',
    defaultMessage: 'Running',
    description: 'Running status for progress percentage',
  },
  failed: {
    id: 'com.atlassian.migrations-platform.elements.progress-percentage.failed',
    defaultMessage: 'Failed',
    description: 'Failed status for progress percentage',
  },
  incomplete: {
    id:
      'com.atlassian.migrations-platform.elements.progress-percentage.incomplete',
    defaultMessage: 'Incomplete',
    description: 'Incomplete status for progress percentage',
  },
  complete: {
    id:
      'com.atlassian.migrations-platform.elements.progress-percentage.complete',
    defaultMessage: 'Complete',
    description: 'Complete status for progress percentage',
  },
  timed_out: {
    id:
      'com.atlassian.migrations-platform.elements.progress-percentage.timed-out',
    defaultMessage: 'Timed out',
    description: 'Timed out status for progress percentage',
  },
});
