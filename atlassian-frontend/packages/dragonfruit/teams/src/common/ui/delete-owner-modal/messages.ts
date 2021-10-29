import { defineMessages } from 'react-intl';

export default defineMessages({
  deleteOwnerTitle: {
    id: 'dragonfruit-delete-component-owner-modal.title',
    defaultMessage: 'Remove this owner',
    description: 'Title of modal when deleting an owner of a component',
  },
  deleteOwnerContent: {
    id: 'dragonfruit-delete-component-owner-modal.content',
    defaultMessage:
      'Are you sure you want to remove the owner from this component?',
    description: 'Content of modal when deleting an owner of a component',
  },
  deleteOwnerSuccessFlagContent: {
    id: 'dragonfruit-delete-component-owner-modal.success-flag-content',
    defaultMessage: 'Owner removed from component.',
    description: 'Content of flag when deleting an owner of a component',
  },
  deleteOwnerErrorFlagTitle: {
    id: 'dragonfruit-update-component-owner-modal.error-flag-title',
    defaultMessage: 'Error removing component owner',
    description: 'Title for the error flag when removing an owner',
  },
  deleteOwnerErrorFlagContent: {
    id: 'dragonfruit-delete-component-owner-modal.error-flag-content',
    defaultMessage: 'Failed to remove owner. Try removing the owner again.',
    description: 'Error content of flag when deleting an owner of a component',
  },
});
