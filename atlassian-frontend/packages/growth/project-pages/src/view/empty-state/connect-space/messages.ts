import { defineMessages } from 'react-intl';

export default defineMessages({
  connectSpaceHeading: {
    id: 'project-pages.connect-space.heading',
    defaultMessage: 'Connect this project to a Confluence space',
    description:
      'Heading when a Confluence space is not connected to a Jira project',
  },
  connectSpaceDescription: {
    id: 'project-pages.connect-space.description',
    defaultMessage:
      'Spaces are like folders - you can use them to create, organize, and collaborate on all the content related to your project.',
    description: '',
  },
  connectSpaceButton: {
    id: 'project-pages.connect-space.button',
    defaultMessage: 'Connect a space',
    description: '',
  },
  granularPagesConnectSpaceHeading: {
    id: 'project-pages.granular-pages.connect-space.heading',
    defaultMessage: 'Connect this project to a Confluence space or page',
    description:
      'Heading when a Confluence space or page is not connected to a Jira project',
  },
  granularPagesConnectSpaceButton: {
    id: 'project-pages.granular-pages.connect-space.button',
    defaultMessage: 'Connect to Confluence',
    description:
      'Button to connect a Jira project to a Confluence space or page',
  },
});
