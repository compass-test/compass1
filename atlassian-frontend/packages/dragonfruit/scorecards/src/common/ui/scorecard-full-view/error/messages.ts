import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'dragonfruit-scorecards.common.ui.scorecard-full-view.error.title',
    defaultMessage: 'Oops! Something went wrong',
    description:
      'Title to display in flag when loading scorecard details for full view failed.',
  },
  description: {
    id:
      'dragonfruit-scorecards.common.ui.scorecard-full-view.error.description',
    defaultMessage: "Scorecard isn't loading, try refreshing the page.",
    description:
      'Content to display in flag when loading scorecard details for full view failed.',
  },
});
