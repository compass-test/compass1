import { defineMessages } from 'react-intl';

export default defineMessages({
  defaultErrorDescription: {
    id: 'dragonfruit-other-list.error-description',
    defaultMessage: "We couldn't load your components",
    description:
      'Description for when we get back an unexpected error for the other components table.',
  },
  emptyStateHeading: {
    id: 'dragonfruit-other-list.empty-state-heading',
    defaultMessage: 'Want to track something else?',
    description: 'Heading for state when no other components are shown.',
  },
  emptyStateDescription: {
    id: 'dragonfruit-other-list.empty-state-description',
    defaultMessage:
      'Add other components here so your team and other teams can find them easily.',
    description: 'Description shown when no other components exist.',
  },
});
