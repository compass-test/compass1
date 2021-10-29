import { defineMessages } from 'react-intl';

const messages = defineMessages({
  pagePublishedFlagTitle: {
    id: 'project-pages.page-published-flag.title',
    defaultMessage: 'Your page has been published.',
    description: 'Notification title when a Confluence page is published',
  },
  draftSavedFlagTitle: {
    id: 'project-pages.draft-saved-flag.title',
    defaultMessage: 'Draft saved',
    description: 'Notification title when a Confluence draft is saved',
  },
  draftSavedFlagDescription: {
    id: 'project-pages.draft-saved-flag.description',
    defaultMessage: 'Your draft is only visible to you until you publish it.',
    description: 'Notification body when a Confluence draft is saved.',
  },
  draftSavedFlagOpenDraft: {
    id: 'project-pages.draft-saved-flag.action',
    defaultMessage: 'Open draft',
    description: 'Notification link to open the Confluence saved draft',
  },
  pageDeletedFlagTitle: {
    id: 'project-pages.page-deleted-flag.title',
    defaultMessage: 'Page deleted.',
    description: 'Notification title when a Confluence page is deleted',
  },
});

export default messages;
