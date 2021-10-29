import { defineMessages, FormattedMessage } from 'react-intl';

type Messages = Record<
  'loading' | 'done' | 'back',
  FormattedMessage.MessageDescriptor
>;

export default defineMessages<Messages>({
  loading: {
    id: 'com.atlassian.migrations-platform.app-migration.loading',
    defaultMessage: 'Loading…',
    description: 'The placeholder loading text',
  },
  done: {
    id: 'com.atlassian.migrations-platform.app-migration.done',
    defaultMessage: 'Done',
    description: 'The done button text',
  },
  back: {
    id: 'com.atlassian.migrations-platform.app-migration.back',
    defaultMessage: 'Back',
    description: 'The back button text',
  },
});
