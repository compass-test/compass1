import { defineMessages } from 'react-intl';

export default defineMessages({
  errorStateTitle: {
    id: 'dragonfruit.page-scorecard-details.error-state.title.nonfinal',
    defaultMessage: 'Oops! Something went wrong',
    description: 'Something went wrong',
  },
  errorStateBody: {
    id: 'dragonfruit.page-scorecard-details.error-state.body',
    defaultMessage: "We couldn't load your scorecards.",
    description: 'Error message for scorecard loading failure',
  },
  scorecardDetailsSkipLink: {
    id: 'dragonfruit-page-scorecard-details.ui.skip-link',
    defaultMessage: 'Scorecard details',
    description: 'Skip link title for scorecard details page',
  },
  scorecardEditButton: {
    id: 'dragonfruit-page-scorecard-details.ui.scorecard-edit.button',
    defaultMessage: 'Edit scorecard',
    description: 'Button title for editing scorecard',
  },
  scorecardEditSuccessTitle: {
    id: 'dragonfruit-page-scorecard-details.ui.scorecard-edit.success.title',
    defaultMessage: 'This scorecard has been updated',
    description:
      'Title message to display in success flag when scorecard has been edited',
  },
  scorecardEditSuccessDescription: {
    id:
      'dragonfruit-page-scorecard-details.ui.scorecard-edit.success.description',
    defaultMessage:
      'Some components may have been added/removed. Refresh this page to see the latest list of components.',
    description:
      'Description message to display in success flag when scorecard has been edited',
  },
});
