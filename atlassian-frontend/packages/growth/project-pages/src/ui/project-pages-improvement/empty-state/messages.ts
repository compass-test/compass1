import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'project-pages.improvement.transient-states.empty-state.title',
    defaultMessage: 'There’s nothing here but potential',
    description: 'Title of message letting users know there are no pages',
  },
  description: {
    id: 'project-pages.improvement.transient-states.empty-state.description',
    defaultMessage:
      'Create some meeting notes, product requirements, decisions, or other content to see this space fill up.',
    description: 'Description text letting users know there are no pages',
  },
  createPageButton: {
    id:
      'project-pages.improvement.transient-states.empty-state.create-page-button',
    defaultMessage: 'Create your first page',
    description: 'Button label for creating a new page',
  },
});
