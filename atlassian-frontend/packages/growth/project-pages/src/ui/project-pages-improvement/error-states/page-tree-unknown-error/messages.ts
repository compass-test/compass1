import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'project-pages.improvement.errors.page-tree-unknown-error.title',
    defaultMessage: 'We’re having trouble displaying project pages',
    description:
      'Title when an unknown error occurred while fetching Confluence pages',
  },
  description: {
    id: 'project-pages.improvement.errors.page-tree-unknown-error.description',
    defaultMessage:
      'Something went wrong while trying to display pages from your connected Confluence space. {contactSupport} if refreshing doesn’t fix things.',
    description:
      'Description when an unknown error occurred while fetching Confluence pages',
  },
});
