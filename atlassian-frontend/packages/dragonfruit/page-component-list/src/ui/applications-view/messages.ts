import { defineMessages } from 'react-intl';

export default defineMessages({
  defaultErrorDescription: {
    id: 'dragonfruit-application-list.error-description',
    defaultMessage: "We couldn't load your applications.",
    description:
      'Description for when we get back an unexpected error for the applications table.',
  },
  emptyStateHeading: {
    id: 'dragonfruit-application-list.empty-state-heading',
    defaultMessage: 'Add the applications your team is building',
    description: 'Heading for state when no applications are shown.',
  },
  emptyStateDescription: {
    id: 'dragonfruit-application-list.empty-state-description',
    defaultMessage:
      "Use Compass to manage the details of your team's mobile and web applications, and find other team's applications.",
    description: 'Description shown when no applications exist.',
  },
});
