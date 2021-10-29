import { defineMessages } from 'react-intl';

export default defineMessages({
  mainSkipLinkTitle: {
    id:
      'dragonfruit-page-component-details.ui.relationships.main-skip-link-title',
    defaultMessage: 'Component details',
    description:
      'Title for the skip link to jump to the main section of the component details page',
  },
  leftSidebarSkipLinkTitle: {
    id:
      'dragonfruit-page-component-details.ui.overview.left-sidebar-skip-link-title',
    defaultMessage: 'Component navigation',
    description:
      'Title for the skip link to jump to the left sidebar of the component details page',
  },
  rightSidebarSkipLinkTitle: {
    id:
      'dragonfruit-page-component-details.ui.overview.right-sidebar-skip-link-title',
    defaultMessage: 'Scorecards',
    description:
      'Title for the skip link to jump to the right sidebar of the component details page',
  },
  errorStateHeading: {
    id: 'dragonfruit-page-component-details.error-heading',
    defaultMessage: 'Something went wrong',
    description:
      'Error state heading shown when an error occurs while loading the component details page.',
  },
  componentRetrievalErrorMessage: {
    id: 'dragonfruit-page-component-details.component-retrieval-error-message',
    defaultMessage: "We couldn't load your component.",
    description:
      'Message shown when an error occurs while fetching the component.',
  },
  invalidUrlErrorMessage: {
    id: 'dragonfruit-page-component-details.invalid-url-error-message',
    defaultMessage: 'Make sure the URL you entered is correct and try again.',
    description:
      'Error state description shown when the user provides an invalid component URL.',
  },
});
