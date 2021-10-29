import { defineMessages } from 'react-intl';

export default defineMessages({
  createComponentTypePlaceholder: {
    id: 'dragonfruit.teams.team-create-component.component-type.placeholder',
    defaultMessage: 'Component type',
    description: 'Placeholder text for component type select',
  },
  createComponentNamePlaceholder: {
    id: 'dragonfruit.teams.team-create-component.name.placeholder',
    defaultMessage: 'Component name',
    description: 'Placeholder text for component name field',
  },
  errorComponentNameBlank: {
    id: 'dragonfruit.teams.team-create-component.name.error-blank',
    defaultMessage: 'Add a name for this component.',
    description: 'Error displayed when the component name is blank',
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
  createTeamButtonLabel: {
    id:
      'dragonfruit-create-component-modal.create-component-form-create-team-button',
    defaultMessage: 'Create a team',
    description:
      'Label for the button that toggles the modal for creating a team',
  },
});
