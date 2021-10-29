import { defineMessages } from 'react-intl';

export default defineMessages({
  pageHeader: {
    id: 'dragonfruit-page-component-details.ui.activity-feed.page-header',
    defaultMessage: 'Activity',
    description: 'The main page header for the component details activity page',
  },
  pageDescription: {
    id: 'dragonfruit-page-component-details.ui.activity-feed.page-description',
    defaultMessage:
      'See rich, real time activity updates from your components and their dependencies, with data pulled in from across all the tools in your software development toolchain. All successful production deployments will appear here.',
    description: 'The description for the component details activity page',
  },
  deploymentLinkText: {
    id:
      'dragonfruit-page-component-details.ui.activity-feed.deployment-link-text',
    defaultMessage: 'Deploy {displayName}',
    description:
      'The text for the event link which uses the event display name. For example (Deploy #1)',
  },
  time: {
    id: 'dragonfruit-page-component-details.ui.activity-feed.time',
    defaultMessage: 'Time',
    description:
      'The word time used as a column name for the deployment time in the component events table',
  },
  status: {
    id: 'dragonfruit-page-component-details.ui.activity-feed.status',
    defaultMessage: 'Status',
    description:
      'The word status used as a column name for the deployment status in the component events table',
  },
  event: {
    id: 'dragonfruit-page-component-details.ui.activity-feed.event',
    defaultMessage: 'Event',
    description:
      'The word event used as a column name for displaying the event link in the component events table',
  },
  description: {
    id: 'dragonfruit-page-component-details.ui.activity-feed.description',
    defaultMessage: 'Description',
    description:
      'The word description used as a column name for displaying the event description in the component events table',
  },
  environment: {
    id: 'dragonfruit-page-component-details.ui.activity-feed.environment',
    defaultMessage: 'Environment',
    description:
      'The word environment used as a column name for displaying what environment the event happened in the component events table',
  },
  emptyStateConfiguredDescription: {
    id:
      'dragonfruit-page-component-details.ui.activity-feed.empty-state-configured-description',
    defaultMessage: `We'll show the next successful production deployment of your component here.`,
    description:
      'Description for the activity feed empty state when a component is managed.',
  },
  emptyStateUnonfiguredDescription: {
    id:
      'dragonfruit-page-component-details.ui.activity-feed.empty-state-unconfigured-description',
    defaultMessage:
      'We recommend using a configuration file to manage your components.',
    description:
      'Description for the activity feed empty state when a component is not managed.',
  },
  emptyStateConfiguredTitle: {
    id:
      'dragonfruit-page-component-details.ui.activity-feed.empty-state-configured-title',
    defaultMessage: 'Deploy your component to see its activity',
    description:
      'Title for the activity feed empty state when a component is managed.',
  },
  emptyStateUnconfiguredTitle: {
    id:
      'dragonfruit-page-component-details.ui.activity-feed.empty-state-unconfigured-title',
    defaultMessage: 'Manage this component with compass.yml',
    description:
      'Title for the activity feed empty state when a component is not managed.' +
      'compass.yml is the name of the file, and should not be translated.',
  },
  learnMore: {
    id: 'dragonfruit-page-component-details.ui.activity-feed.learn-more',
    defaultMessage: 'Learn more about configuration files',
    description:
      'Link to documentation on how to use config-as-code to manage components.',
  },
});
