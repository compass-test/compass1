import { defineMessages } from 'react-intl';

export default defineMessages({
  emptyViewTitle: {
    id: 'page-team-details.components-owner-card.empty-state.title',
    defaultMessage: 'No owner team',
    description: 'Title of empty state of owner card',
  },
  emptyViewBody: {
    id: 'page-team-details.components-owner-card.empty-state.body',
    defaultMessage:
      'Set an owner to help people know who to ask when they need information about this component.',
    description: 'Description of no owner card',
  },
  emptyViewBodyManaged: {
    id: 'page-team-details.components-owner-card.empty-state-managed.body',
    defaultMessage:
      'Set the owner field in compass.yml to help people know who to ask when they need information about this component.',
    description: 'Description of no owner card under managed state',
  },
  emptyViewButton: {
    id: 'page-team-details.components-owner-card.empty-state.add-button',
    defaultMessage: 'Add owner team',
    description: 'Button to add an owner to component',
  },
  emptyViewButtonManaged: {
    id:
      'page-team-details.components-owner-card.empty-state-managed.add-button',
    defaultMessage: 'Set in compass.yml',
    description: 'Button to go to compass.yml',
  },
});
