import { defineMessages } from 'react-intl';

import { CONFIG_AS_CODE_FILE_NAME } from '@atlassian/dragonfruit-external-component-management/constants';

export default defineMessages({
  firstDashboardDisabled: {
    id: 'dragonfruit.components.links.empty-state.first-dashboard-disabled',
    defaultMessage: `Add dashboards in ${CONFIG_AS_CODE_FILE_NAME}`,
    description:
      'Shown when a user has not added any dashboard links and the field is disabled',
  },
  firstDocumentDisabled: {
    id: 'dragonfruit.components.links.empty-state.first-document-disabled',
    defaultMessage: `Add documentation in ${CONFIG_AS_CODE_FILE_NAME}`,
    description:
      'Shown when a user has not added any document links and the field is disabled',
  },
  firstOtherDisabled: {
    id: 'dragonfruit.components.links.empty-state.other-link-disabled',
    defaultMessage: `Add other links in ${CONFIG_AS_CODE_FILE_NAME}`,
    description:
      'Shown when a user has not added any other relevant links to the component and the field is disabled',
  },
  firstProjectDisabled: {
    id: 'dragonfruit.components.links.empty-state.first-project-disabled',
    defaultMessage: `Add projects in ${CONFIG_AS_CODE_FILE_NAME}`,
    description:
      'Shown when a user has not added any project links and the field is disabled',
  },
  firstRepositoryDisabled: {
    id: 'dragonfruit.components.links.empty-state.first-repository-disabled',
    defaultMessage: `Add repositories in ${CONFIG_AS_CODE_FILE_NAME}`,
    description:
      'Shown when a user has not added any repository links and the field is disabled',
  },
  firstChatChannelDisabled: {
    id: 'dragonfruit.components.links.empty-state.first-chat-channel-disabled',
    defaultMessage: `Add in ${CONFIG_AS_CODE_FILE_NAME}`,
    description:
      'Shown when a user has not added any chat channel links and the field is disabled',
  },
  firstOnCallDisabled: {
    id: 'dragonfruit.components.links.empty-state.first-on-call-disabled',
    defaultMessage: `Add in ${CONFIG_AS_CODE_FILE_NAME}`,
    description:
      'Shown when a user has not added any on-call links and the field is disabled',
  },
});
