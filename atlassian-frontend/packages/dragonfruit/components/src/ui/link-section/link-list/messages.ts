import { defineMessages } from 'react-intl';

import { CONFIG_AS_CODE_FILE_NAME } from '@atlassian/dragonfruit-external-component-management/constants';

export default defineMessages({
  repositoryLinkLimitReachedFlagTitle: {
    id: 'dragonfruit.components.links.repository-link-limit-reached-flag-title',
    defaultMessage: 'Repository link limit reached',
    description:
      'Title of message displayed when the user has reached the limit of (code) repository links they can add to a component',
  },
  documentationLinkLimitReachedFlagTitle: {
    id:
      'dragonfruit.components.links.documentation-link-limit-reached-flag-title',
    defaultMessage: 'Documentation link limit reached',
    description:
      'Title of message displayed when the user has reached the limit of documentation links they can add to a component',
  },
  projectLinkLimitReachedFlagTitle: {
    id: 'dragonfruit.components.links.project-link-limit-reached-flag-title',
    defaultMessage: 'Project link limit reached',
    description:
      'Title of message displayed when the user has reached the limit of project links they can add to a component',
  },
  dashboardLinkLimitReachedFlagTitle: {
    id: 'dragonfruit.components.links.dashboard-link-limit-reached-flag-title',
    defaultMessage: 'Dashboard link limit reached',
    description:
      'Title of message displayed when the user has reached the limit of dashboard links they can add to a component',
  },
  otherLinkLimitReachedFlagTitle: {
    id: 'dragonfruit.components.links.other-link-limit-reached-flag-title',
    defaultMessage: 'Other link limit reached',
    description:
      'Title of message displayed when the user has reached the limit of other links they can add to a component',
  },
  chatChannelLinkLimitReachedFlagTitle: {
    id:
      'dragonfruit.components.links.chat-channel-link-limit-reached-flag-title',
    defaultMessage: 'Chat link limit reached',
    description:
      'Title of message displayed when the user has reached the limit of chat channel links they can add to a component',
  },
  onCallLinkLimitReachedFlagTitle: {
    id: 'dragonfruit.components.links.on-call-link-limit-reached-flag-title',
    defaultMessage: 'On-call schedule limit reached',
    description:
      'Title of message displayed when the user has reached the limit of on-call links they can add to a component',
  },
  linkLimitReachedFlagDescription: {
    id: 'dragonfruit.components.links.link-limit-reached-flag-description',
    defaultMessage:
      'The maximum number of links you can have for each component detail is 5.',
    description:
      'Message displayed when the user has reached the limit of links they can add to a component for each section',
  },
  chatChannelLinkLimitReachedFlagDescription: {
    id:
      'dragonfruit.components.links.chat-channel-link-limit-reached-flag-description',
    defaultMessage: 'The maximum number of chat links you can have is 5.',
    description:
      'Message displayed when the user has reached the limit of chat channel links they can add to a component',
  },
  onCallLinkLimitReachedFlagDescription: {
    id:
      'dragonfruit.components.links.on-call-link-limit-reached-flag-description',
    defaultMessage:
      'The maximum number of on-call schedule links you can have is 5.',
    description:
      'Message displayed when the user has reached the limit of on-call links they can add to a component',
  },
  disabledByConfigAsCodeMessage: {
    id:
      'page-component-details.component-main.disabled-by-config-as-code-message',
    defaultMessage: `Edit in ${CONFIG_AS_CODE_FILE_NAME}`,
    description:
      'The message that is shown for why editing a field is disabled, when that field is managed by config as code',
  },
});
