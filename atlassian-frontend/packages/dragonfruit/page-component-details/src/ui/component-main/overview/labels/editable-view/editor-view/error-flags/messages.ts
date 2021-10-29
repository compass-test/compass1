import { defineMessages } from 'react-intl';

export default defineMessages({
  addLabelErrorFlagTitle: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels.editable-view.editor-view.error-flags.add-label-error-flag-title',
    defaultMessage: 'Error saving component label',
    description:
      'Shown as the error flag title when an error occurs while adding a component label',
  },
  componentNotFoundErrorDescription: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels.editable-view.editor-view.error-flags.component-not-found-error-flag-description',
    defaultMessage:
      ' The component you’re trying to edit could not be found, and may have been recently deleted.',
    description:
      'Shown as the error flag description when the component to operate on could not be found',
  },
  labelInputHasTooManyValuesDescription: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels.editable-view.editor-view.error-flags.label-input-too-long-error-flag-description',
    defaultMessage:
      'The list of component labels contains too many values. Try again with {labelInputLimit} or fewer labels.',
    description:
      'Shown as the error flag description when the user tries to add or remove too many labels in a single API call',
  },
  labelLimitReachedErrorDescription: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels.editable-view.editor-view.error-flags.label-limit-reached-error-flag-description',
    defaultMessage:
      'A component can have a maximum of {labelLimit} labels. Try reducing the number of labels associated with the component.',
    description:
      'Shown as the error flag description when the user tries to add more labels to a component than the allowed label limit',
  },
  labelInputCannotBeEmptyErrorDescription: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels.editable-view.editor-view.error-flags.label-input-cannot-be-empty-error-flag-description',
    defaultMessage:
      'The list of component labels is empty. Provide at least one label and try again.',
    description:
      'Shown as the error flag description when the component labels "add" operation is triggered but no labels were provided',
  },
  labelNameCannotBeBlankErrorDescription: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels.editable-view.editor-view.error-flags.label-name-cannot-be-blank-error-flag-description',
    defaultMessage:
      'A component label name cannot be blank. Provide a name and try again.',
    description:
      'Shown as the error flag description when the user tries to add a label with a blank name (e.g. an empty string, or a string containing only whitespace characters)',
  },
  labelNameContainsInvalidCharacterErrorDescription: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels.editable-view.editor-view.error-flags.label-name-contains-invalid-character-error-flag-description',
    defaultMessage:
      'The component label name contains invalid characters. Remove those characters and try again.',
    description:
      'Shown as the error flag description when the user tries to add a label that contains invalid characters in its name',
  },
  labelNameTooLongErrorDescription: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels.editable-view.editor-view.error-flags.label-name-too-long-error-flag-description',
    defaultMessage:
      'The component label name is too long. Try again with a name that is {characterLimit} characters or fewer',
    description:
      'Shown as the error flag description when the user tries to add a label with a name longer than the allowed character limit',
  },
  labelNameCannotContainWhitespaceCharactersErrorDescription: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels.editable-view.editor-view.error-flags.label-name-cannot-contain-whitespace-characters-error-flag-description',
    defaultMessage:
      'The component label name contains whitespace characters. Remove all whitespace characters and try again.',
    description:
      'Shown as the error flag description when the user tries to add a label that contains whitespace characters (including newlines) in its name',
  },
  labelNameCannotContainUppercaseCharactersErrorDescription: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels.editable-view.editor-view.error-flags.label-name-cannot-contain-uppercase-characters-error-flag-description',
    defaultMessage:
      'The component label name must be in lowercase. Remove all uppercase characters and try again.',
    description:
      'Shown as the error flag description when the user tries to add a label that contains uppercase characters in its name',
  },
  removeLabelErrorFlagTitle: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels.editable-view.editor-view.error-flags.remove-label-error-flag-title',
    defaultMessage: 'Error removing component label',
    description:
      'Shown as the error flag title when an error occurs while removing a component label',
  },
});
