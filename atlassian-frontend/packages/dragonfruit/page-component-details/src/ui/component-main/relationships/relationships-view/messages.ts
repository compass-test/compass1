import { defineMessages } from 'react-intl';

export default defineMessages({
  relationshipsViewDescription: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.relationships-view.description',
    defaultMessage:
      "Define upstream dependencies to understand whether you're affected if downtime occurs.",
    description:
      'This messages helps the users to understand that a dependency of a component is',
  },
  relationshipsViewLoadingErrorDescription: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.relationships-view.error-message',
    defaultMessage: "We couldn't load your dependencies",
    description:
      'Indicates that an unknown error occured while fetching the dependencies from the backend.',
  },
});
