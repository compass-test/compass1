import { defineMessages } from 'react-intl';

export default defineMessages({
  componentTypePlaceHolder: {
    id:
      'dragonfruit-create-component-modal.component-type-select.label-placeholder',
    defaultMessage: 'Select a component type',
    description: 'Placeholder for component type',
  },
  ownerFieldHelperMessage: {
    id:
      'dragonfruit-create-component-modal.create-component-owner-field-helper-message',
    defaultMessage: 'The team responsible for maintaining the component.',
    description:
      'The helper message for the owner field in the component creation form',
  },
  nameFieldPlaceholder: {
    id:
      'dragonfruit-create-component-modal.create-component-name-field-placeholder',
    defaultMessage: 'Enter a component name',
    description:
      'The placeholder for the name field in the component creation form',
  },
  createComponentErrorFlagTitle: {
    id: 'dragonfruit-create-component-modal.create-component-error-flag-title',
    defaultMessage: 'Error creating component',
    description: 'Title for the error flag when creating a component',
  },
  createComponentErrorFlagContent: {
    id:
      'dragonfruit-create-component-modal.create-component-error-flag-content',
    defaultMessage:
      'An error occured while creating your component. Please try again.',
    description: 'The generic error message when you try to create a component',
  },
  createComponentDescriptionTooLong: {
    id:
      'dragonfruit-create-component-modal.create-component-description-too-long',
    defaultMessage: 'The component description is too long.',
    description:
      'An error shown when the user tries to create a component with a description that is too long',
  },
  createComponentNameBlank: {
    id: 'dragonfruit-create-component-modal.create-component-name-blank',
    defaultMessage:
      'The component name is blank. Provide a name and try again.',
    description:
      'An error shown when the user tries to create a component without providing a name',
  },
  createComponentNameTooLong: {
    id: 'dragonfruit-create-component-modal.create-component-name-too-long',
    defaultMessage: 'The component name is too long.',
    description:
      'An error shown when the user tries to create a component with a name that is too long',
  },
  startTeamButtonLabel: {
    id:
      'dragonfruit-create-component-modal.create-component-form-create-team-button',
    defaultMessage: 'Start a team',
    description:
      'Label for the button that toggles the modal for starting a team',
  },
});
