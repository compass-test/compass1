import { defineMessages } from 'react-intl';

export default defineMessages({
  componentNotFound: {
    id: 'dragonfruit.components.links.delete-dialog.component-not-found',
    defaultMessage:
      'The component you’re trying to edit could not be found, and may have been recently deleted.',
    description:
      'An error message for when the component being edited cannot be found',
  },
  componentLinkDoesNotExist: {
    id:
      'dragonfruit.components.links.delete-dialog.component-link-does-not-exist',
    defaultMessage:
      'This link does not exist and may have already been deleted.',
    description:
      'Error message for when a user tries to delete a link that cannot be found',
  },
  deleteRepositoryLinkModalTitle: {
    id: 'dragonfruit.components.links.delete-dialog.delete-repo-link-title',
    defaultMessage: 'Remove repository link?',
    description: 'Title of modal shown to confirm item deletion',
  },
  deleteDocumentLinkModalTitle: {
    id: 'dragonfruit.components.links.delete-dialog.delete-document-link-title',
    defaultMessage: 'Remove document link?',
    description: 'Title of modal shown to confirm item deletion',
  },
  deleteProjectLinkModalTitle: {
    id: 'dragonfruit.components.links.delete-dialog.delete-project-link-title',
    defaultMessage: 'Remove project link?',
    description: 'Title of modal shown to confirm item deletion',
  },
  deleteDashboardLinkModalTitle: {
    id:
      'dragonfruit.components.links.delete-dialog.delete-dashboard-link-title',
    defaultMessage: 'Remove dashboard link?',
    description: 'Title of modal shown to confirm item deletion',
  },
  deleteOtherLinkModalTitle: {
    id: 'dragonfruit.components.links.delete-dialog.delete-other-link-title',
    defaultMessage: 'Remove other link?',
    description: 'Title of modal shown to confirm item deletion',
  },
  deleteChatChannelLinkModalTitle: {
    id:
      'dragonfruit.components.links.delete-dialog.delete-chat-channel-link-title',
    defaultMessage: 'Remove this chat channel?',
    description: 'Title of modal shown to confirm item deletion',
  },
  deleteOnCallLinkModalTitle: {
    id: 'dragonfruit.components.links.delete-dialog.delete-on-call-link-title',
    defaultMessage: 'Remove this on-call schedule?',
    description: 'Title of modal shown to confirm item deletion',
  },
  deleteLinkModalDescription: {
    id: 'dragonfruit.components.links.delete-dialog.delete-modal-description',
    defaultMessage:
      'This link will no longer be available on <b>{componentName}</b>. <br />' +
      'You can add the link again if you ever need to.',
    description: 'Description shown in modal to confirm item deletion',
  },
  deleteRepositoryLinkErrorFlagTitle: {
    id: 'dragonfruit.components.links.delete-repo-error-flag.title',
    defaultMessage: 'Error removing repository link',
    description: 'Title of error flag when failed to delete link',
  },
  deleteDocumentLinkErrorFlagTitle: {
    id: 'dragonfruit.components.links.delete-document-error-flag.title',
    defaultMessage: 'Error removing document link',
    description: 'Title of error flag when failed to delete link',
  },
  deleteProjectLinkErrorFlagTitle: {
    id: 'dragonfruit.components.links.delete-project-error-flag.title',
    defaultMessage: 'Error removing project link',
    description: 'Title of error flag when failed to delete link',
  },
  deleteDashboardLinkErrorFlagTitle: {
    id: 'dragonfruit.components.links.delete-dashboard-error-flag.title',
    defaultMessage: 'Error removing dashboard link',
    description: 'Title of error flag when failed to delete link',
  },
  deleteOtherLinkErrorFlagTitle: {
    id: 'dragonfruit.components.links.delete-other-error-flag.title',
    defaultMessage: 'Error removing other link',
    description: 'Title of error flag when failed to delete link',
  },
  deleteChatChannelLinkErrorFlagTitle: {
    id: 'dragonfruit.components.links.delete-chat-channel-error-flag.title',
    defaultMessage: 'Error removing chat channel',
    description: 'Title of error flag when failed to delete link',
  },
  deleteOnCallLinkErrorFlagTitle: {
    id: 'dragonfruit.components.links.delete-dashboard-error-flag.title',
    defaultMessage: 'Error removing on-call schedule',
    description: 'Title of error flag when failed to delete link',
  },
  deleteLinkErrorFlagDescription: {
    id: 'dragonfruit.components.links.delete-error-flag.description',
    defaultMessage:
      'An error occurred while removing your link. Try removing it again.',
    description: 'Shown when deleting a link fails',
  },
  deleteChatChannelLinkErrorFlagDescription: {
    id:
      'dragonfruit.components.links.delete-chat-channel-error-flag.description',
    defaultMessage: `Chat link couldn't be saved. Try adding the link again.`,
    description: 'Shown when deleting a chat channel link fails',
  },
  deleteOnCallLinkErrorFlagDescription: {
    id: 'dragonfruit.components.links.delete-on-call-error-flag.description',
    defaultMessage: `On-call link couldn't be saved. Try adding the link again.`,
    description: 'Shown when deleting a on-call link fails',
  },
});
