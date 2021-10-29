import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey =
  | 'taskName'
  | 'noSelectionText'
  | 'referencedProjectCustomersSelectionTitle'
  | 'referencedProjectCustomersSelectionDescription'
  | 'allCustomersSelectionTitle'
  | 'allCustomersSelectionDescription'
  | 'noCustomersSelectionTitle'
  | 'noCustomersSelectionDescription'
  | 'invalidSelectionCustomersSelectionTitle'
  | 'invalidSelectionCustomersSelectionDescription'
  | 'skipAllCustomersButtonText'
  | 'selectAllCustomersButtonText';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  taskName: {
    id:
      'com.atlassian.migrations-platform.migration-details.customers-task-card.task-name',
    defaultMessage: 'Customers',
    description: '',
  },
  noSelectionText: {
    id:
      'com.atlassian.migrations-platform.migration-details.customers-task-card.no-selection-text',
    defaultMessage: 'No customers selected',
    description: '',
  },
  referencedProjectCustomersSelectionTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.customers-task-card.referenced-project-customers.title',
    defaultMessage: 'Only customers related to the selected projects',
    description: '',
  },
  referencedProjectCustomersSelectionDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.customers-task-card.referenced-project-customers.description',
    defaultMessage:
      'Includes any customer who has created a request or is referenced in a request.',
    description: '',
  },
  allCustomersSelectionTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.customers-task-card.all-customers.title',
    defaultMessage: 'All customers from the Jira directory',
    description: '',
  },
  allCustomersSelectionDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.customers-task-card.all-customers.description',
    defaultMessage:
      'Currently, {customers} {customers, plural, one {customer} other {customers}}.',
    description: '',
  },
  noCustomersSelectionTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.customers-task-card.no-customers.title',
    defaultMessage:
      '{customers} {customers, plural, one {customer} other {customers}}',
    description: '',
  },
  noCustomersSelectionDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.customers-task-card.no-customers.description',
    defaultMessage: 'You haven’t selected any customers.',
    description: '',
  },
  invalidSelectionCustomersSelectionTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.customers-task-card.invalid-selection-customers-selection.title',
    defaultMessage: '',
    description: '',
  },
  invalidSelectionCustomersSelectionDescription: {
    id:
      'com.atlassian.migrations-platform.migration-details.invalid-selection-customers-selection.description',
    defaultMessage: '',
    description: '',
  },
  skipAllCustomersButtonText: {
    id:
      'com.atlassian.migrations-platform.migration-details.skip-all-customers-button.text',
    defaultMessage: 'Skip all customers',
    description: '',
  },
  selectAllCustomersButtonText: {
    id:
      'com.atlassian.migrations-platform.migration-details.select-all-customers-button.text',
    defaultMessage: 'Select all customers',
    description: '',
  },
});
