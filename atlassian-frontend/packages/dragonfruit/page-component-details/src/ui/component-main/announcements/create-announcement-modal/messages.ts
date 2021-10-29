import { defineMessages } from 'react-intl';

export default defineMessages({
  createAnnouncementModalDialogTitle: {
    id:
      'dragonfruit-page-component-details.announcements.create-announcement-modal.create-announcement-modal-title.nonfinal',
    defaultMessage: 'Create announcement',
    description: 'Modal title for creating an announcement',
  },
  modalDialogDescription: {
    id:
      'dragonfruit-page-component-details.announcements.create-announcement-modal.create-announcement-modal-description.nonfinal',
    defaultMessage: 'Announcements will be sent to all dependencies.',
    description:
      "Description shown in the modal for creating an announcement. Tells the user that created announcements will be automatically shared with the component's dependencies.",
  },
});
