import { defineMessages, FormattedMessage } from 'react-intl';

type MessageType = 'success' | 'error' | 'noopSuccess' | 'noopError';
type Messages = Record<MessageType, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  success: {
    id: 'com.atlassian.migrations-platform.app-status-value.success',
    defaultMessage: 'Success',
    description: 'The status is success',
  },
  error: {
    id: 'com.atlassian.migrations-platform.app-status-value.error',
    defaultMessage: 'Error',
    description: 'The status is error',
  },
  noopSuccess: {
    id: 'com.atlassian.migrations-platform.app-status-value.noop-success',
    defaultMessage: 'Success without any further action',
    description: 'The status is success without any further action',
  },
  noopError: {
    id: 'com.atlassian.migrations-platform.app-status-value.noop-fail',
    defaultMessage: 'The status is ignored',
    description: 'The status is ignored',
  },
});
