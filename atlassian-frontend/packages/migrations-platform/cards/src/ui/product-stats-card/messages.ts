import { defineMessages, FormattedMessage } from 'react-intl';

type MessageType =
  | 'apps'
  | 'groups'
  | 'users'
  | 'customers'
  | 'issues'
  | 'attachments';

type Messages = Record<MessageType, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  apps: {
    id: 'com.atlassian.migrations-platform.mpt-cards.product-stats-card.apps',
    defaultMessage: 'Apps',
    description: 'the row title to indicate how many apps will be migrated',
  },
  groups: {
    id: 'com.atlassian.migrations-platform.mpt-cards.product-stats-card.groups',
    defaultMessage: 'Groups',
    description: 'the row title to indicate how many groups will be migrated',
  },
  users: {
    id: 'com.atlassian.migrations-platform.mpt-cards.product-stats-card.users',
    defaultMessage: 'Users',
    description: 'the row title to indicate how many users will be migrated',
  },
  customers: {
    id:
      'com.atlassian.migrations-platform.mpt-cards.product-stats-card.customers',
    defaultMessage: 'Customers',
    description:
      'the row title to indicate how many customers will be migrated',
  },
  issues: {
    id: 'com.atlassian.migrations-platform.mpt-cards.product-stats-card.issues',
    defaultMessage: 'Issues',
    description: 'the row title to indicate how many issues will be migrated',
  },
  attachments: {
    id:
      'com.atlassian.migrations-platform.mpt-cards.product-stats-card.attachments',
    defaultMessage: 'Attachments',
    description:
      'the row title to indicate the size of attachments that will be migrated',
  },
});
