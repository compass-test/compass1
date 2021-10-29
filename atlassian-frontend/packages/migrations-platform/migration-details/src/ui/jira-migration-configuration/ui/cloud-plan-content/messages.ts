import { defineMessages, FormattedMessage } from 'react-intl';

type MessageKey = 'cloudPlan';

type Messages = Record<MessageKey, FormattedMessage.MessageDescriptor>;

export default defineMessages<Messages>({
  cloudPlan: {
    id:
      'com.atlassian.migrations-platform.migration-details.jira-migration-configuration.cloud-plan-content.cloud-plan',
    defaultMessage: '{productName} {productEdition} plan',
  },
});
