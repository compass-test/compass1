import { defineMessages } from 'react-intl';

export default defineMessages({
  heading: {
    id:
      'dragonfruit-page-team-details.owner-override-confirmation-modal.heading',
    defaultMessage: 'Are you sure you want to change the owner team?',
    description: 'Header message for owner reassignment confirmation.',
  },
  content: {
    id:
      'dragonfruit-page-team-details.owner-override-confirmation-modal.content',
    defaultMessage:
      'This component is already owned by a team, are you sure you want to assign this component to another team?',
    description: 'A detailed message for owner reassignment confirmation.',
  },
  closeButton: {
    id:
      'dragonfruit-page-team-details.owner-override-confirmation-modal.close-button',
    defaultMessage: 'Cancel',
    description: 'Text for modal cancelation button.',
  },
  submitButton: {
    id:
      'dragonfruit-page-team-details.owner-override-confirmation-modal.submit-button',
    defaultMessage: 'Save',
    description: 'Text for modal submission button.',
  },
});
