import { defineMessages } from 'react-intl';

export default defineMessages({
  ConfirmationHeader: {
    id: 'dragonfruit-scorecard-templates.delete-dialog.confirmation-header',
    defaultMessage:
      'Are you sure you want to delete the {scorecardName} scorecard?',
    description: 'Delete confirmation dialog header',
  },
  ConfirmationMessage: {
    id: 'dragonfruit-scorecard-templates.delete-dialog.confirmation-message',
    defaultMessage:
      'Deleting this required scorecard will impact all of this type of component.',
    description: 'Delete confirmation dialog body',
  },
});
