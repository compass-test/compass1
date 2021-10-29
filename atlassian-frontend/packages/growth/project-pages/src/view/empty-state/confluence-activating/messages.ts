import { defineMessages } from 'react-intl';

export default defineMessages({
  heading: {
    id: 'project-pages.activating.heading',
    defaultMessage: 'Confluence is still loading',
    description: 'Heading when Confluence is active but not ready',
  },
  description: {
    id: 'project-pages.activating.description',
    defaultMessage:
      'The connected Confuence space isn’t quite ready yet. {contactSupport} if refreshing doesn’t fix things.',
    description: 'Description when Confluence is active but not ready',
  },
});
