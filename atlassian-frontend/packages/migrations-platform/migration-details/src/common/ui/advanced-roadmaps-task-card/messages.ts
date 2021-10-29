import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey =
  | 'taskName'
  | 'noSelectionText'
  | 'selectedPlansTitle'
  | 'selectedPlansDescription'
  | 'notMigratingText'
  | 'skipButtonText'
  | 'configOnlyDisabledText'
  | 'attachmentsOnlyDisabledText'
  | 'fixErrorButtonText';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  notMigratingText: {
    id:
      'com.atlassian.migrations-platform.migration-details.advanced-roadmaps-task-card.not-migrating-text',
    defaultMessage: 'You haven’t selected any plans.',
  },
  taskName: {
    id:
      'com.atlassian.migrations-platform.migration-details.advanced-roadmaps-task-card.task-name',
    defaultMessage: 'Advanced Roadmaps plans',
  },
  noSelectionText: {
    id:
      'com.atlassian.migrations-platform.migration-details.advanced-roadmaps-task-card.no-selection-text',
    defaultMessage: 'No plans selected',
  },
  selectedPlansTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.advanced-roadmaps-task-card.plans-count-title',
    defaultMessage: '{count, plural, one {{count} plan} other {{count} plans}}',
  },
  selectedPlansDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.advanced-roadmaps-task-card.plans-count-description',
    defaultMessage: 'Includes all associated issue sources and entities',
  },
  skipButtonText: {
    id:
      'com.atlassian.migrations-platform.migration-details.advanced-roadmaps-task-card.skip-button-text',
    defaultMessage: 'Skip plans',
  },
  configOnlyDisabledText: {
    id:
      'com.atlassian.migrations-platform.migration-details.advanced-roadmaps-task-card.config-only-disabled-text',
    defaultMessage:
      'Since only project configuration is selected, no plans can be migrated.',
  },
  attachmentsOnlyDisabledText: {
    id:
      'com.atlassian.migrations-platform.migration-details.advanced-roadmaps-task-card.attachments-only-disabled-text',
    defaultMessage:
      'Since only project attachments are selected, no plans can be migrated.',
  },
  fixErrorButtonText: {
    id:
      'com.atlassian.migrations-platform.migration-details.advanced-roadmaps-task-card.fix-error-button-text',
    defaultMessage: 'Skip plans',
  },
});
