import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey =
  | 'skipProjectsButReferencedUsersGroupsErrorTitle'
  | 'skipProjectsButReferencedUsersGroupsErrorDescription'
  | 'invalidSelectionErrorTitle'
  | 'configOnlyErrorDescription'
  | 'attachmentsOnlyErrorDescription'
  | 'skipProjectsReferencedUsersGroupsCustomersErrorTitle'
  | 'skipProjectsReferencedUsersGroupsCustomersErrorDescription'
  | 'skipProjectsReferencedCustomersErrorTitle'
  | 'skipProjectsReferencedCustomersErrorDescription';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  skipProjectsButReferencedUsersGroupsErrorTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-list-errors.skip-projects-but-referenced-users-groups-error-title',
    defaultMessage: 'Invalid users and groups selection',
  },
  skipProjectsButReferencedUsersGroupsErrorDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-list-errors.skip-projects-but-referenced-users-groups-error-description',
    defaultMessage:
      'Since you haven’t selected any projects, you can’t migrate users and groups related to those projects. Either add projects to your migration or select all users and groups.',
  },
  invalidSelectionErrorTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-list-errors.invalid-selection-error-title',
    defaultMessage: 'Invalid selection',
  },
  configOnlyErrorDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-list-errors.config-only-error-description',
    defaultMessage: `Since you are migrating configuration only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Configuration only selection.`,
  },
  attachmentsOnlyErrorDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-list-errors.attachments-only-error-description',
    defaultMessage: `Since you are migrating attachments only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Attachments only selection.`,
  },
  skipProjectsReferencedUsersGroupsCustomersErrorTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-list-errors.skip-projects-referenced-users-groups-customers-error-title',
    defaultMessage: 'Invalid selection',
  },
  skipProjectsReferencedUsersGroupsCustomersErrorDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-list-errors.skip-projects-referenced-users-groups-customers-error-description',
    defaultMessage:
      'Since you haven’t selected any projects, you can’t migrate related users and groups or customers. Either add projects to your migration or change your selections.',
  },
  skipProjectsReferencedCustomersErrorTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-list-errors.skip-projects-referenced-customers-error-title',
    defaultMessage: 'Invalid customer selection',
  },
  skipProjectsReferencedCustomersErrorDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.task-list-errors.skip-projects-referenced-customers-error-description',
    defaultMessage:
      'Since you haven’t selected any projects, you can’t migrate customers related to those projects. You must add projects to your migration or select all or no customers.',
  },
});
