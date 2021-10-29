import { defineMessages } from 'react-intl';

export default defineMessages({
  errorComponentNotFound: {
    id:
      'dragonfruit-services-components.inline-description.error-component-not-found.nonfinal',
    defaultMessage:
      'The component you are trying to edit could not be found. It may have been removed.',
    description:
      'Error shown when the user tries to edit the description but the component cannot be found',
  },
  errorSaving: {
    id:
      'dragonfruit-services-components.inline-description.error-saving.nonfinal',
    defaultMessage:
      'An error occurred while saving the description. Please try again.',
    description: 'Shown when the inline description fails to save',
  },
  errorTitle: {
    id:
      'dragonfruit-services-components.inline-description.error-title.nonfinal',
    defaultMessage: 'Error saving description',
    description:
      'Shown when an error occurs while trying to save the new description',
  },
  errorTooLong: {
    id: 'dragonfruit-services-components.inline-description.error-too-long',
    defaultMessage: 'The description must be less than 1000 characters long',
    description: 'Shown when the description provided is too long',
  },
  editDescription: {
    id: 'dragonfruit-services-components.inline-description.edit-label',
    defaultMessage: 'Edit component description',
    description: 'Aria label for inline edit for component description',
  },
});
