import { defineMessages } from 'react-intl';

export default defineMessages({
  errorStateTitle: {
    id: 'dragonfruit-scorecards.ui.teams-cards.fallback-error-state.title',
    defaultMessage: 'Oops! Something went wrong',
    description: 'Something went wrong',
  },

  errorStateBody: {
    id: 'dragonfruit-scorecards.ui.teams-cards.fallback-error-state.body',
    defaultMessage: "Team information isn't loading, try refreshing the page",
    description: "Couldn't retrieve team information",
  },
});
