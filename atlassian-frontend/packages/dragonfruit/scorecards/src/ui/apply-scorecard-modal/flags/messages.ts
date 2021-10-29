import { defineMessages } from 'react-intl';

export default defineMessages({
  applyScorecardFailureFlagTitle: {
    id:
      'dragonfruit-scorecards.apply-scorecard-modal.flags.apply-scorecard-failure-flag-title',
    defaultMessage: 'Scorecard not applied',
    description:
      'The title for the failure flag when scorecard has not been successfully applied',
  },
  applyScorecardFailureFlagDescription: {
    id:
      'dragonfruit-scorecards.apply-scorecard-modal.flags.apply-scorecard-failure-flag-description',
    defaultMessage:
      'Something went wrong while applying {scorecardName} scorecard to this component.',
    description:
      'The text for the failure flag when scorecard has not been successfully applied',
  },
  applyScorecardSuccessFlagTitle: {
    id:
      'dragonfruit-scorecards.apply-scorecard-modal.flags.apply-scorecard-success-flag-title',
    defaultMessage: 'Scorecard applied',
    description:
      'The title for the success flag when scorecard has been successfully applied',
  },
  applyScorecardSuccessFlagDescription: {
    id:
      'dragonfruit-scorecards.apply-scorecard-modal.flags.apply-scorecard-success-flag-description',
    defaultMessage:
      'You’ve successfully applied the {scorecardName} scorecard to this component.',
    description:
      'The text for the success flag when scorecard has been successfully applied',
  },
});
