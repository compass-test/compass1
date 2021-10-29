import { defineMessages } from 'react-intl';

export default defineMessages({
  componentNotFoundErrorDescription: {
    id:
      'dragonfruit-page-component-details.announcements.component-announcements.update-announcement-modal.error-handling.component-not-found-error-flag-description.nonfinal',
    defaultMessage:
      'The component that the announcement belongs to could not be found, and may have been recently deleted.',
    description:
      'Shown as the error flag description when the component that owns the announcement being updated could not be found, ' +
      'suggesting that the component may have been recently deleted.',
  },
  announcementNotFoundErrorDescription: {
    id:
      'dragonfruit-page-component-details.announcements.component-announcements.update-announcement-modal.error-handling.announcement-not-found-error-flag-description.nonfinal',
    defaultMessage:
      'The announcement could not be found, and may have been recently deleted.',
    description:
      'Shown as the error flag description when the announcement being updated could not be found, ' +
      'suggesting that the announcement may have been recently deleted.',
  },
});
