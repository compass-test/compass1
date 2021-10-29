import { defineMessages } from 'react-intl';

export default defineMessages({
  createComponentNameBlank: {
    id:
      'dragonfruit-services-components.inline-name.create-component-name-blank.nonfinal',
    defaultMessage:
      'The component name is blank. Provide a name and try again.',
    description:
      'An error shown when the user tries to edit the component to have no name',
  },
  errorComponentNotFound: {
    id:
      'dragonfruit-services-components.inline-name.error-component-not-found.nonfinal',
    defaultMessage:
      'The component you are trying to edit could not be found. It may have been removed.',
    description:
      'Error shown when the user tries to edit the name but the component cannot be found',
  },
  errorSaving: {
    id: 'dragonfruit-services-components.inline-name.error-saving.nonfinal',
    defaultMessage:
      'An error occurred while saving the component name. Please try again.',
    description: 'Shown when the inline name fails to save',
  },
  errorTitle: {
    id: 'dragonfruit-services-components.inline-name.error-title.nonfinal',
    defaultMessage: 'Error saving component name',
    description:
      'Shown when an error occurs while trying to save the new component name',
  },
  errorTooLong: {
    id: 'dragonfruit-services-components.inline-name.error-too-long',
    defaultMessage: 'The name must be less than 100 characters long',
    description: 'Shown when the name provided is too long',
  },
  editName: {
    id: 'dragonfruit-services-componnets.inline-name.edit-label',
    defaultMessage: 'Edit component name',
    description: 'Aria label for inline-edit for component name',
  },
});
