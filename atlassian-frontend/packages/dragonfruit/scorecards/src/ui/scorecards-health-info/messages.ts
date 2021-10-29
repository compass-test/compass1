import { defineMessages } from 'react-intl';

const PREFIX =
  'dragonfruit-page-team-details.ui.team-dashboard.components-list.components-table.scorecards-health-info';

export default defineMessages({
  noScorecards: {
    id: `${PREFIX}.no-scorecards-text`,
    defaultMessage: 'No scorecards',
    description: 'Summary text for no scorecards',
  },
  summaryTextForUnhealthyCompact: {
    id: `${PREFIX}.summary-text-for-unhealthy-compact`,
    defaultMessage: '{unHealthyScorecardsCount} of {totalScorecardsCount}',
    description: 'Compact summary text for unhealthy scorecards',
  },
  summaryTextForUnhealthy: {
    id: `${PREFIX}.summary-text-for-unhealthy`,
    defaultMessage:
      '{unHealthyScorecardsCount} of {totalScorecardsCount, plural, one {# scorecard} other {# scorecards}} {totalScorecardsCount, plural, one {needs} other {need}} attention',
    description: 'Summary text for unhealthy scorecards',
  },
  summaryTextForHealthyCompact: {
    id: `${PREFIX}.summary-text-for-healthy-compact`,
    defaultMessage: '{totalScorecardsCount} of {totalScorecardsCount}',
    description: 'Compact summary text for healthy scorecards',
  },
  summaryTextForHealthy: {
    id: `${PREFIX}.summary-text-for-healthy`,
    defaultMessage:
      '{totalScorecardsCount} of {totalScorecardsCount, plural, one {# scorecard} other {# scorecards}} in good health',
    description: 'Summary text for healthy scorecards',
  },
  moreScorecards: {
    id: `${PREFIX}.more-text`,
    defaultMessage: '{moreScorecardsCount} more',
    description: 'Text for more link',
  },
});
