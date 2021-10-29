import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey =
  | 'noCustomersSelectionTitle'
  | 'referencedProjectCustomersSelectionTitle'
  | 'allCustomersSelectionTitle';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  noCustomersSelectionTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.customers-task-card.no-customers.title',
    defaultMessage:
      '{customers} {customers, plural, one {customer} other {customers}}',
    description: '',
  },
  referencedProjectCustomersSelectionTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.customers-task-card.referenced-project-customers.title',
    defaultMessage: 'Only customers related to the selected projects',
    description: '',
  },
  allCustomersSelectionTitle: {
    id:
      'com.atlassian.migrations-platform.migration-details.customers-task-card.all-customers.title',
    defaultMessage: 'All customers from the Jira directory',
    description: '',
  },
});
