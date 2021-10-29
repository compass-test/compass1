import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'project-pages.improvement.errors.access-error.title',
    defaultMessage: 'You don’t have permission to view project pages',
    description: "Title when the user doesn't have access to project pages",
  },
  description: {
    id: 'project-pages.improvement.errors.access-error.description',
    defaultMessage: 'Try contacting the site admin to ask for access.',
    description:
      'Suggestion to contact the site admin directly to get granted access to Confluence',
  },
});
