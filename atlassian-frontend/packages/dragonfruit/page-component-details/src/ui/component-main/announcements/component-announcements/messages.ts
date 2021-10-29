import { defineMessages } from 'react-intl';

export default defineMessages({
  announcementsViewLoadingErrorDescription: {
    id:
      'dragonfruit-page-component-details.component-main.announcements.announcements-view.error-message.nonfinal',
    defaultMessage: 'We couldn’t retrieve your dependencies',
    description:
      'Indicates that an unknown error occurred while fetching the dependencies from the backend.',
  },
  emptyStateHeader: {
    id:
      'dragonfruit-page-component-details.component-main.announcements.announcements-view.empty-state-header.nonfinal',
    defaultMessage: 'Broadcast upcoming changes',
    description:
      'Title for the empty state shown when there are no announcements. Prompts the user to create a new announcement for the component they are viewing.',
  },
  emptyStateDescription: {
    id:
      'dragonfruit-page-component-details.component-main.announcements.announcements-view.empty-state-description.nonfinal',
    defaultMessage:
      'Create announcements to share updates with any components that depend on {componentName}. For example:',
    description:
      'Description for the empty state shown when there are no announcements. Describes the purpose of creating announcements.',
  },
  emptyStateExample1: {
    id:
      'dragonfruit-page-component-details.component-main.announcements.announcements-view.empty-state-example1.nonfinal',
    defaultMessage: 'New features',
    description:
      'An example of what can be communicated in an announcement. Shown in a bulleted list.',
  },
  emptyStateExample2: {
    id:
      'dragonfruit-page-component-details.component-main.announcements.announcements-view.empty-state-example2.nonfinal',
    defaultMessage: 'API deprecation',
    description:
      'An example of what can be communicated in an announcement. Shown in a bulleted list.',
  },
  emptyStateExample3: {
    id:
      'dragonfruit-page-component-details.component-main.announcements.announcements-view.empty-state-example3.nonfinal',
    defaultMessage: 'Scheduled downtime',
    description:
      'An example of what can be communicated in an announcement. Shown in a bulleted list.',
  },
  createAnnouncement: {
    id:
      'dragonfruit-page-component-details.component-main.announcements.announcements-view.create-announcement.nonfinal',
    defaultMessage: 'Create announcement',
    description:
      'Text displayed in a button that allows the user to create an announcement.',
  },
});
