import { defineMessages } from 'react-intl';

export default defineMessages({
  defaultErrorDescription: {
    id: 'dragonfruit-library-list.error-description',
    defaultMessage: "We couldn't load your libraries.",
    description:
      'Description for when we get back an unexpected error for the libraries table.',
  },
  emptyStateHeading: {
    id: 'dragonfruit-library-list.empty-state-heading',
    defaultMessage: 'Add the libraries your team uses',
    description: 'Heading for state when no libraries are shown.',
  },
  emptyStateDescription: {
    id: 'dragonfruit-library-list.empty-state-description',
    defaultMessage:
      'Manage the libraries you use alongside your services– like design libraries or C++ libraries, for example.',
    description: 'Description shown when no libraries exist.',
  },
});
