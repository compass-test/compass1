import { defineMessages } from 'react-intl';

export default defineMessages({
  copyAriFlagSuccessTitle: {
    id:
      'dragonfruit-page-team-details.services.flags.copy-owner-ari-flag-success',
    defaultMessage: 'ID copied!',
    description:
      'The text for the success flag when we successfully copied the team id to clipboard.',
  },
  copyAriFlagFailureDescription: {
    id:
      'dragonfruit-page-team-details.services.flags.copy-owner-ari-flag-failure',
    defaultMessage: "ID couldn't be copied. Try again.",
    description:
      'The text for the error flag when we failed to copy the team id to clipboard.',
  },
  updateOwnerFlagSuccessTitle: {
    id:
      'dragonfruit-page-team-details.services.flags.update-owner-flag-success-title',
    defaultMessage: 'You’ve assigned ownership of {componentName}',
    description:
      'The title for the success flag when owner has been successfully updated',
  },
  updateOwnerFlagSuccessDescription: {
    id:
      'dragonfruit-page-team-details.services.flags.update-owner-flag-success-description',
    defaultMessage:
      'You’ve successfully added the {componentType} {componentName} to this team’s dashboard.',
    description:
      'The text for the success flag when owner has been successfully updated',
  },
  updateOwnerFlagSuccessAction: {
    id:
      'dragonfruit-page-team-details.services.flags.update-owner-flag-success-action',
    defaultMessage: 'View component',
    description: 'Text for action link on update owner success flag',
  },
  updateOwnerFlagFailureDescription: {
    id:
      'dragonfruit-page-team-details.services.flags.update-owner-ari-flag-failure-description',
    defaultMessage: 'Ownership could not be assigned',
    description: 'The description for the error flag when owner update fails',
  },
});
