import { defineMessages } from 'react-intl';

export default defineMessages({
  emptyStateHeader: {
    id:
      'dragonfruit-page-scorecard-details.ui.component-list.empty-state.header',
    defaultMessage: 'No {componentTypeMessage} to show',
    description: 'The header for the component list empty state',
  },
  emptyStateBody: {
    id:
      'dragonfruit-page-scorecard-details.ui.component-list.empty-state.description',
    defaultMessage:
      'This scorecard hasn’t been applied to any {componentTypeMessage}. When you apply this scorecard to {componentTypeMessage}, they’ll appear here with their respective scores.',
    description: 'The description for the component list empty state',
  },
  unowned: {
    id: 'dragonfruit-page-scorecard-details.ui.component-list.unowned',
    defaultMessage: 'Unowned',
    description: 'Label for unowned component',
  },
  score: {
    id: 'dragonfruit-page-scorecard-details.ui.component-list.score',
    defaultMessage: 'Score',
    description: 'Label for score column',
  },
  otherComponentTypeDescription: {
    id:
      'dragonfruit-page-scorecard-details.ui.component-list.other-component-type',
    defaultMessage: "components of the 'other' type",
    description: 'Description for components of type OTHER',
  },
  errorMessage: {
    id: 'dragonfruit-page-scorecard-details.ui.component-list.error-message',
    defaultMessage: 'Something went wrong',
    description: 'Error message when components cannot be loaded',
  },
  errorMessageDescription: {
    id:
      'dragonfruit-page-scorecard-details.ui.component-list.error-message-description',
    defaultMessage: "We couldn't load your components.",
    description:
      'Directions for user to refresh page when components could not be fetched.',
  },
});
