import { defineMessages } from 'react-intl';

export default defineMessages({
  addLabelsPlaceholder: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels-section.editor-placeholder',
    defaultMessage: 'Add labels',
    description:
      'This message is the placeholder that will be shown on the select when trying to add a new label',
  },
  addLabelSelectFormat: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels-section.editor-add-value-format',
    defaultMessage: 'Add <b>"{labelName}"</b>',
    description:
      'This message that will be shown on the select when trying to add a new label',
  },
  editorEmptyInput: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels-section.editor-no-options-message',
    defaultMessage: 'Start typing to add labels',
    description:
      'This message will appear on the select after click 2 times to select an item',
  },
  editorLimitReached: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels-section.editor.validation-limit-reached',
    defaultMessage: 'A component can have a maximum of {labelLimit} labels',
    description:
      'This message will appear on an error message the editor when the limit of labels is reached',
  },
  editorLabelMaxLengthReached: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels-section.editor.validation-label-max-length',
    defaultMessage: 'Label must be {characterLimit} characters or fewer',
    description:
      'This message will appear on an error message the editor when adding a label with a long name',
  },
  editorLabelAlreadyAdded: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels-section.editor.validation-label-already-added',
    defaultMessage: 'This label has already been added to the component',
    description:
      'This message will appear on an error message the editor when trying to add a duplicate label',
  },
  editorUnknownError: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels-section.editor.validation-unknown-error',
    defaultMessage: 'An unknown error occurred. Please try again',
    description:
      'This message will appear on an error message the editor when an unknown error occurs',
  },
  editorNoResultsFound: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels-section.editor.no-results-found',
    defaultMessage: 'No results found',
    description:
      'Error message that is shown when a user searches for labels and there are no results',
  },
  editorSearchFailedError: {
    id:
      'dragonfruit-page-component-details.component-main.overview.labels-section.editor.search-failed-error',
    defaultMessage: 'Search failed. Start typing to search again',
    description:
      'Error message that is shown when the application failed to search for labels due to an error',
  },
});
