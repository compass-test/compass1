import { defineMessages, FormattedMessage } from 'react-intl';

type MessageType = 'migrationHomeButtonLabel' | 'migrationHomeButtonText';

type Messages = Record<MessageType, FormattedMessage.MessageDescriptor>;

export const messages = defineMessages<Messages>({
  migrationHomeButtonLabel: {
    id: 'com.atlassian.migrations-platform.home-button-label',
    defaultMessage: 'Migration Assistant home',
    description: 'Label for migration assistant home button',
  },
  migrationHomeButtonText: {
    id: 'com.atlassian.migrations-platform.home-button-text',
    defaultMessage: 'Migration Assistant home',
    description: 'Text for migration assistant home button',
  },
});
