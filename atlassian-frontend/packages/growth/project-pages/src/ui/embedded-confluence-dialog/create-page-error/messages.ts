import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'project-pages.embedded-pages.create-page-error.title',
    defaultMessage: 'We couldn’t create a page',
    description: 'Title of create page error modal',
  },
  description: {
    id: 'project-pages.embedded-pages.create-page-error.description',
    defaultMessage:
      'There was a problem and we couldn’t create a page for you.',
    description: 'Description of create page error modal',
  },
  tryAgain: {
    id: 'project-pages.embedded-pages.create-page-error.try-again-button',
    defaultMessage: 'Try again',
    description: 'Try again button label for the create page error modal',
  },
  close: {
    id: 'project-pages.embedded-pages.create-page-error.close-button',
    defaultMessage: 'Close',
    description: 'Button label for closing the create page error modal',
  },
});
