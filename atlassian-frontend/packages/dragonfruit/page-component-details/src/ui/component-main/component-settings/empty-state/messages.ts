import { defineMessages } from 'react-intl';

export default defineMessages({
  emptyStateHeading: {
    id:
      'dragonfruit-page-component-details.ui.settings.empty-state.empty-state-heading.nonfinal',
    defaultMessage: 'Manage components from their source',
    description:
      'Heading shown in the empty state for the component details settings page',
  },
  emptyStateDescription: {
    id:
      'dragonfruit-page-component-details.ui.settings.empty-state.empty-state-description.nonfinal',
    defaultMessage:
      'Use Bitbucket or another SCM tool to manage your components via configuration files. Compass automatically syncs with the configuration file to provide a source of truth.',
    description:
      'Description shown in the component details settings page empty state',
  },
  learnMore: {
    id:
      'dragonfruit-page-component-details.ui.settings.empty-state.learn-more.nonfinal',
    defaultMessage: 'Learn more about component management',
    description:
      'Link to documentation on how to use config-as-code to manage components',
  },
  installSCMPrompt: {
    id:
      'dragonfruit-page-component-details.ui.settings.empty-state.install-scm-prompt.nonfinal',
    defaultMessage: 'Install and configure your SCM tool',
    description:
      'Text shown in button that prompts the user to go to apps page',
  },
  sectionMessageHeading: {
    id:
      'dragonfruit-page-component-details.ui.settings.empty-state.section-message-heading.nonfinal',
    defaultMessage:
      'You must be a Compass admin to set up component management',
    description:
      'Non-admin message heading shown in empty state for the component details settings page',
  },
  sectionMessageDescription: {
    id:
      'dragonfruit-page-component-details.ui.settings.empty-state.section-message-description.nonfinal',
    defaultMessage:
      'Contact your Compass product admin to get started by integrating with your SCM tool.',
    description:
      'Non-admin message description shown in empty state for the component details settings page',
  },
});
