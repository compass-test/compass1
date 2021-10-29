import { defineMessages } from 'react-intl';

export default defineMessages({
  updateOwnerErrorFlagTitle: {
    id: 'dragonfruit-update-component-owner-modal.error-flag-title',
    defaultMessage: 'Error updating component owner',
    description: 'Title for the error flag when updating an owner',
  },
  updateOwnerErrorFlagContent: {
    id: 'dragonfruit-update-component-owner-modal.error-flag-content',
    defaultMessage: 'Owner failed to update. Try updating the owner again.',
    description: 'The generic error message when you try to update an owner',
  },
  updateOwnerSuccessFlagContent: {
    id: 'dragonfruit-update-component-owner-modal.success-flag-content',
    defaultMessage: 'The owner of this component is now {team}.',
    description: 'Content when component owner is updated',
  },
  updateOwnerSuccessFlagTitle: {
    id: 'dragonfruit-update-component-owner-modal.success-flag-title',
    defaultMessage: 'Component owner updated',
    description: 'Title of flag message when component owner is updated',
  },
});
