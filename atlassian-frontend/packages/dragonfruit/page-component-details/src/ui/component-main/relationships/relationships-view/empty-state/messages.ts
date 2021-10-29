import { defineMessages } from 'react-intl';

export default defineMessages({
  configAsCodePrompt: {
    id:
      'page-team-details.components-owner-card.empty-state-managed.add-button',
    defaultMessage: 'Define in compass.yml',
    description:
      "Text shown in button that prompts the user to go to the component's compass.yml file",
  },
  emptyStateDescription: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.empty-state.empty-state-description',
    defaultMessage:
      "Define upstream dependencies to understand whether you're affected if downtime occurs.",
    description: 'Description shown in the relationships view empty state',
  },
  emptyStateHeading: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.empty-state.empty-state-heading',
    defaultMessage: 'Map your software infrastructure',
    description: 'Heading shown in the empty state for the relationships view',
  },
  learnMore: {
    id:
      'dragonfruit-page-component-details.component-main.relationships.empty-state.learn-more',
    defaultMessage: 'Learn how to define dependencies in a compass.yml file.',
    description:
      'Link to documentation on how to use config-as-code to manage component relationships',
  },
});
