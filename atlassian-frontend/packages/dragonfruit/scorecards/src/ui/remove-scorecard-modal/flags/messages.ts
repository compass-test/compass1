import { defineMessages } from 'react-intl';

export default defineMessages({
  removeScorecardSuccessFlagTitle: {
    id: 'dragonfruit-scorecards.remove-scorecard-modal.success-flag.title',
    defaultMessage: 'Success removing scorecard',
    description:
      'Title of flag when successful removing the scorecard from a component',
  },
  removeScorecardSuccessFlagDescription: {
    id: 'dragonfruit-scorecards.remove-scorecard-modal.success-flag.content',
    defaultMessage: 'Successfully removed {scorecardName} from this component.',
    description:
      'Content of flag when successful removing the scorecard from a component',
  },
  removeScorecardFailureFlagTitle: {
    id: 'dragonfruit-scorecards.remove-scorecard-modal.failure-flag.title',
    defaultMessage: 'Error removing scorecard',
    description:
      'Title of flag when failure removing the scorecard from a component',
  },
});
