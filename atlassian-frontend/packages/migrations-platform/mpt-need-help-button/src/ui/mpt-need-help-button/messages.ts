import { defineMessages, FormattedMessage } from 'react-intl';

type MessageType = 'dropdownName' | 'support' | 'community' | 'documentation';

type Messages = Record<MessageType, FormattedMessage.MessageDescriptor>;

export const messages = defineMessages<Messages>({
  dropdownName: {
    id:
      'com.atlassian.migrations-platform.mpt-need-help-button.mpt-need-help-button.dropdownName',
    defaultMessage: 'Need help?',
    description:
      'Label of the dropdown, asking if a user needs help. Clicking this opens a dropdown.',
  },
  support: {
    id:
      'com.atlassian.migrations-platform.mpt-need-help-button.mpt-need-help-button.support',
    defaultMessage: 'Support',
    description:
      'Text of an item in a dropdown, which links to the support page',
  },
  community: {
    id:
      'com.atlassian.migrations-platform.mpt-need-help-button.mpt-need-help-button.community',
    defaultMessage: 'Community',
    description:
      'Text of an item in a dropdown, which links to the community page',
  },
  documentation: {
    id:
      'com.atlassian.migrations-platform.mpt-need-help-button.mpt-need-help-button.documentation',
    defaultMessage: 'Documentation',
    description:
      'Text of an item in a dropdown, which links to the documentation page',
  },
});
