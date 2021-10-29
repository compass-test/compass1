import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey = 'rowsPerPageLabel';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  rowsPerPageLabel: {
    id:
      'com.atlassian.migrations-platform.container-selection.container-selection-footer.rows-per-page-label',
    defaultMessage: 'Rows per page',
  },
});
