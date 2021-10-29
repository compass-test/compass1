import { defineMessages } from 'react-intl';

export default defineMessages({
  emptyStateHeading: {
    id: 'page-team-details.components-owned.empty-view.header',
    defaultMessage: 'See components that your team owns',
    description: 'The title for the empty state of the component list',
  },
  emptyStateDescription: {
    id: 'page-team-details.components-owned.empty-view.description',
    defaultMessage:
      'After you add components your team owns they’ll be shown here.',
    description: 'The description for the empty state of the component list',
  },
  emptyStateCreateComponentButton: {
    id: 'page-team-details.components-owned.empty-view.create-component-button',
    defaultMessage: 'Create components',
    description:
      'The call-to-action button to create components from the team component list empty state',
  },
  errorStateHeader: {
    id: 'page-team-details.components-owned.error-view.header',
    defaultMessage: "We couldn't retrieve the components your team owns.",
    description: 'The description for the empty state of the component list',
  },
});
