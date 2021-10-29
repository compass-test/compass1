import { defineMessages } from 'react-intl';

export default defineMessages({
  defaultErrorDescription: {
    id: 'dragonfruit-services-list.error-description',
    defaultMessage: "We couldn't load your services.",
    description:
      'Description for when we get back an unexpected error for the services table.',
  },
  emptyStateHeading: {
    id: 'dragonfruit-services-list.empty-state-heading',
    defaultMessage: 'Add the services your team owns',
    description:
      'Heading for state when no services are shown, suggesting that the user create a service.',
  },
  emptyStateDescription: {
    id: 'dragonfruit-services-list.empty-state-description',
    defaultMessage:
      'Manage the services that deliver capabilities to your users or team, with information about ownership and other important details.',
    description:
      'Description shown when no services exist. Instructs the user to create a service.',
  },
});
