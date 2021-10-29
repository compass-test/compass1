import { defineMessages } from 'react-intl';

export default defineMessages({
  addComponentOwner: {
    id: 'dragonfruit-components.component-list.owners.contacts-add-owner',
    defaultMessage: 'Add owner',
    description: 'Prompt to add a component owner.',
  },
  errorMessage: {
    id: 'dragonfruit-page-component-list.error-message',
    defaultMessage: 'Something went wrong',
    description: 'PLACEHOLDER. Indicates when components could not be fetched.',
  },
  errorMessageDescription: {
    id: 'dragonfruit-page-component-list.error-message-description',
    defaultMessage: 'Please try again',
    description:
      'PLACEHOLDER. Directions for user to refresh page when components could not be fetched.',
  },
  scorecardsColumn: {
    id: 'dragonfruit-components.component-list.scorecards-column',
    defaultMessage: 'Scorecards',
    description: 'The label for the scorecards column',
  },
});
