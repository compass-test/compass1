import { defineMessages, FormattedMessage } from 'react-intl';

type MessageType = 'loading' | 'of' | 'complete';

type Messages = Record<MessageType, FormattedMessage.MessageDescriptor>;

export const messages = defineMessages<Messages>({
  loading: {
    id:
      'com.atlassian.migrations-platform.mpt-progress-status.mpt-progress-status.loading',
    defaultMessage: 'Loading',
    description: 'Label status text while the component is loading.',
  },
  of: {
    id:
      'com.atlassian.migrations-platform.mpt-progress-status.mpt-progress-status.of',
    defaultMessage: 'of',
    description: 'Label joining text in the context "XX of YY tasks done"',
  },
  complete: {
    id:
      'com.atlassian.migrations-platform.mpt-progress-status.mpt-progress-status.complete',
    defaultMessage: 'complete',
    description: 'Label used in the context of "33% complete"',
  },
});
