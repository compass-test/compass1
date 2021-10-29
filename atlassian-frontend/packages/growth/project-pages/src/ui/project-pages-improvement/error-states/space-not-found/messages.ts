import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'project-pages.improvement.errors.space-not-found.title',
    defaultMessage: 'Space not found',
    description:
      'Title when the Confluence space linked to a Jira project cannot be found',
  },
  description: {
    id: 'project-pages.improvement.errors.space-not-found.description',
    defaultMessage:
      'The Confluence space that was connected to project pages has been deleted or moved.',
    description:
      'Information about potential reasons why the space cannot found',
  },
  connectSpaceButton: {
    id: 'project-pages.improvement.errors.space-not-found.button',
    defaultMessage: 'Connect a different space',
    description: 'Button to connect to a different Confluence space',
  },
});
