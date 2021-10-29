import { defineMessages } from 'react-intl';

export default defineMessages({
  RequiredField: {
    id: 'dragonfruit-scorecards.errors.required-field',
    defaultMessage: 'This field is required.',
    description:
      'Generic error displayed when a required field is left blank or unselected',
  },
  ScorecardNameBlank: {
    id: 'dragonfruit-scorecards.errors.name.blank',
    defaultMessage: 'Add a name for this scorecard.',
    description: 'Error displayed when the scorecard name is blank',
  },
  ScorecardNameTooLong: {
    id: 'dragonfruit-scorecards.errors.name.too-long',
    defaultMessage: 'Scorecard name must be less than 40 characters.',
    description: 'Error displayed when the scorecard name is too long',
  },
  ScorecardNameNotUnique: {
    id: 'dragonfruit-scorecards.errors.name.not-unique',
    defaultMessage:
      'This name is already used for another scorecard. Choose another name.',
    description:
      'Error displayed when the scorecard with this name already exists',
  },
  ScorecardDescriptionBlank: {
    id: 'dragonfruit-scorecards.errors.description.blank',
    defaultMessage: 'Add a description for this scorecard.',
    description: 'Error displayed when the scorecard description is blank',
  },
  ScorecardDescriptionTooLong: {
    id: 'dragonfruit-scorecards.errors.description.too-long',
    defaultMessage: 'Scorecard description must be less than 330 characters.',
    description: 'Error displayed when the scorecard description is too long',
  },
  ScorecardCriteriaWeightsInvalid: {
    id: 'dragonfruit-scorecards.errors.criteria-weights.invalid',
    defaultMessage: 'Adjust your criteria values so they add up to 100%.',
    description:
      'Error displayed when the scorecard criteria weights do not sum to exactly 100',
  },
  ScorecardCriteriaAreRequired: {
    id: 'dragonfruit-scorecards.errors.criteria.required',
    defaultMessage:
      'Scorecard must have at least one criteria to be created or edited.',
    description:
      'Error displayed when the scorecard does not have any criteria',
  },
  ScorecardCriteriaDropdownSelectRequired: {
    id: 'dragonfruit-scorecards.errors.criteria.dropdown-select.required',
    defaultMessage:
      'No criterion can be left blank. Remove blank criterion or select an option.',
    description:
      'Error displayed when any criterion dropdown select has been left blank',
  },
  ScorecardOwnerInvalidPerms: {
    id: 'dragonfruit-scorecards.errors.owner.invalid',
    defaultMessage: 'Owner must be an admin.',
    description:
      'Error displayed when an owner without manage permissions is assigned to a required scorecard',
  },
});
