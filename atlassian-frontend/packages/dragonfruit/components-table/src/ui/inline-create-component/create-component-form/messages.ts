import { defineMessages } from 'react-intl';

export default defineMessages({
  createComponentDescriptionPlaceholder: {
    id: 'dragonfruit.teams.team-create-component.description.placeholder',
    defaultMessage: 'Component description',
    description: 'Placeholder text for component description field',
  },
  createComponentNamePlaceholder: {
    id: 'dragonfruit.teams.team-create-component.name.placeholder',
    defaultMessage: 'Component name',
    description: 'Placeholder text for component name field',
  },
  createComponentOwnerPlaceholder: {
    id: 'dragonfruit.teams.team-create-component.owner-team.placeholder',
    defaultMessage: 'Select...',
    description: 'Placeholder text for component owner select dropdown',
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
});
