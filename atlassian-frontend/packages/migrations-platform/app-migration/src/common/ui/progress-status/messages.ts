import { defineMessages, FormattedMessage } from 'react-intl';

type Messages = Record<
  'complete' | 'label',
  FormattedMessage.MessageDescriptor
>;

export default defineMessages<Messages>({
  complete: {
    id: 'com.atlassian.migrations-platform.progress-status.complete',
    defaultMessage: '{percent} complete',
    description:
      'The text represents how many percents of the overall progress has completed',
  },
  label: {
    id: 'com.atlassian.migrations-platform.progress-status.label',
    defaultMessage: '{done} of {total} {unit}',
    description:
      'The text represents the progress of a certain ‘label‘. It could be ‘1 of 10 projects migrated‘ or ‘3 of 10 confluence pages created‘',
  },
});
