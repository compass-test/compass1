import { defineMessages } from 'react-intl';

export default defineMessages({
  errorComponentNotFound: {
    id: 'dragonfruit-components.tier-field-picker.error-component-not-found',
    defaultMessage:
      'The component you are trying to edit could not be found. It may have been removed.',
    description:
      'Error shown when the user tries to edit the tier field but the component cannot be found',
  },
  errorSaving: {
    id: 'dragonfruit-components.tier-field-picker.error-saving',
    defaultMessage: 'Try updating the tier again.',
    description: 'Shown when the tier field fails to save',
  },
  errorTitle: {
    id: 'dragonfruit-components.tier-field-picker.error-title',
    defaultMessage: 'Error updating tier field',
    description:
      'An error shown when an error occurs while updating the tier field',
  },
});
