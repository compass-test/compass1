import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'dragonfruit-scorecards.ui.apply-scorecard-modal.header',
    defaultMessage: 'Apply a scorecard',
    description: 'Apply scorecard modal header',
  },
  explanation: {
    id: 'dragonfruit-scorecards.ui.apply-scorecard-modal.explanation',
    defaultMessage: 'Choose a scorecard to apply to this component.',
    description: 'Explanation of apply scorecard modal',
  },
  linkText: {
    id: 'dragonfruit-scorecards.ui.apply-scorecard-modal.link-text',
    defaultMessage: 'Learn more about scorecards.',
    description: 'Scorecards documentation link text',
  },
  scorecardSelectPlaceholder: {
    id:
      'dragonfruit-scorecards.ui.apply-scorecard-modal.scorecard-select-placeholder',
    defaultMessage: 'Choose a scorecard',
    description: 'Scorecard select placeholder text',
  },
  scorecardNotFoundErrorMessage: {
    id:
      'dragonfruit-scorecards.ui.apply-scorecard-modal.scorecard-not-found-error-message',
    defaultMessage: 'This scorecard was recently deleted.',
    description: 'Scorecard selected does not exist',
  },
  wrongComponentTypeErrorMessage: {
    id:
      'dragonfruit-scorecards.ui.apply-scorecard-modal.wrong-component-type-error-message',
    defaultMessage:
      'Select a scorecard that’s applicable to the component’s type.',
    description: 'Scorecard selected has different type from current component',
  },
  requiredScorecardNotApplicableErrorMessage: {
    id:
      'dragonfruit-scorecards.ui.apply-scorecard-modal.scorecard-not-found-error-message',
    defaultMessage:
      'Scorecard is not applicable because it’s already required for this component.',
    description: 'Scorecard selected is required and thus not applicable',
  },
});
