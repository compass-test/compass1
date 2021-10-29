import { defineMessages } from 'react-intl';

export default defineMessages({
  announcementsViewLoadingErrorDescription: {
    id:
      'dragonfruit-page-component-details.component-main.announcements.announcements-view.error-message.nonfinal',
    defaultMessage: 'We couldn’t retrieve your dependencies',
    description:
      'Indicates that an unknown error occurred while fetching the dependencies from the backend.',
  },
  noDependenciesEmptyStateHeader: {
    id:
      'dragonfruit-page-component-details.component-main.announcements.dependency-announcements-view.no-dependencies-empty-state-header.nonfinal',
    defaultMessage: 'No dependencies have been defined',
    description:
      'Title for the empty state shown when there are no dependencies.',
  },
  noDependenciesEmptyStateDescription: {
    id:
      'dragonfruit-page-component-details.component-main.announcements.dependency-announcements-view.no-dependencies-empty-state-description.nonfinal',
    defaultMessage:
      'Define upstream dependencies to stay up-to-date with any announcements that may affect this component.',
    description:
      'Description for the empty state shown when there are no dependencies.',
  },
  goToDependenciesButton: {
    id:
      'dragonfruit-page-component-details.component-main.announcements.dependency-announcements-view.go-to-dependencies-button.nonfinal',
    defaultMessage: 'Set up dependencies',
    description:
      'Button text that prompts the user to set up their component dependencies. Clicking on it will navigate to the "Dependencies" page.',
  },
  noAnnouncementsEmptyStateHeader: {
    id:
      'dragonfruit-page-component-details.component-main.announcements.dependency-announcements-view.no-announcements-empty-state-header.nonfinal',
    defaultMessage: 'No announcements from dependencies',
    description:
      "Title for the empty state shown when there are no announcements from the component's dependencies",
  },
  noAnnouncementsEmptyStateDescription: {
    id:
      'dragonfruit-page-component-details.component-main.announcements.dependency-announcements-view.no-announcements-empty-state-description.nonfinal',
    defaultMessage:
      "Any announcements from this component's upstream dependencies will appear here.",
    description:
      'Description for the empty state shown when there are no announcements.',
  },
});
