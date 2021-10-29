import { defineMessages } from 'react-intl';

export default defineMessages({
  addRepositoryLinkErrorFlagTitle: {
    id: 'dragonfruit.components.links.add-link-form.error-saving-repo-title',
    defaultMessage: 'Error saving repository link',
    description: 'Shown when a new repository link fails to save',
  },
  addDocumentLinkErrorFlagTitle: {
    id:
      'dragonfruit.components.links.add-link-form.error-saving-document-title',
    defaultMessage: 'Error saving document link',
    description: 'Shown when a new document link fails to save',
  },
  addProjectLinkErrorFlagTitle: {
    id: 'dragonfruit.components.links.add-link-form.error-saving-project-title',
    defaultMessage: 'Error saving project link',
    description: 'Shown when a new project link fails to save',
  },
  addDashboardLinkErrorFlagTitle: {
    id:
      'dragonfruit.components.links.add-link-form.error-saving-dashboard-title',
    defaultMessage: 'Error saving dashboard link',
    description: 'Shown when a new dashboard link fails to save',
  },
  addOtherLinkErrorFlagTitle: {
    id: 'dragonfruit.components.links.add-link-form.error-saving-other-title',
    defaultMessage: 'Error saving other link',
    description: 'Shown when a new other link fails to save',
  },
  addChatChannelLinkErrorFlagTitle: {
    id:
      'dragonfruit.components.links.add-link-form.error-saving-chat-channel-title',
    defaultMessage: 'Error saving chat link',
    description: 'Shown when a new chat channel link fails to save',
  },
  addOnCallLinkErrorFlagTitle: {
    id: 'dragonfruit.components.links.add-link-form.error-saving-on-call-title',
    defaultMessage: 'Error saving on-call schedule',
    description: 'Shown when a new on-call link fails to save',
  },
  addLinkErrorFlagDescription: {
    id: 'dragonfruit.components.links.add-link-form.error-saving-description',
    defaultMessage: 'An error occurred saving your link. Try adding it again.',
    description: 'Shown when a new link fails to save',
  },
  addInvalidLinkErrorFlagDescription: {
    id: 'dragonfruit.components.links.add-link-form.error-saving-invalid-link',
    defaultMessage: 'The provided URL is invalid.',
    description: 'Shown when a link fails to save because the URL is invalid',
  },
  componentLinkNameTooLong: {
    id:
      'dragonfruit.components.links.add-link-form.component-link-name-too-long',
    defaultMessage: 'The provided component link name is too long.',
    description: 'An error message for when the link name is too long',
  },
  componentLinkUrlTooLong: {
    id:
      'dragonfruit.components.links.add-link-form.component-link-url-too-long',
    defaultMessage: 'The provided URL link is too long.',
    description: 'An error message for when the component link URL is too long',
  },
  componentNotFound: {
    id: 'dragonfruit.components.links.add-link-form.component-not-found',
    defaultMessage:
      'The component you are trying to edit could not be found. It may have been removed.',
    description:
      'An error message for when the component being edited cannot be found',
  },
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
      'The maximum number of links you can have for each component detail is {limit}.',
    description:
      'Message displayed when the user has reached the limit of links they can add to a component for each section',
  },
  chatChannelLinkLimitReachedFlagDescription: {
    id:
      'dragonfruit.components.links.chat-channel-link-limit-reached-flag-description',
    defaultMessage: 'The maximum number of chat links you can have is {limit}.',
    description:
      'Message displayed when the user has reached the limit of chat channel links they can add to a component',
  },
  onCallLinkLimitReachedFlagDescription: {
    id:
      'dragonfruit.components.links.on-call-link-limit-reached-flag-description',
    defaultMessage:
      'The maximum number of on-call schedule links you can have is {limit}.',
    description:
      'Message displayed when the user has reached the limit of on-call links they can add to a component',
  },
});
