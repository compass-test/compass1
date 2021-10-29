import { defineMessages } from 'react-intl';

import { CONFIG_AS_CODE_FILE_NAME } from '@atlassian/dragonfruit-external-component-management/constants';

export default defineMessages({
  description: {
    id:
      'dragonfruit-page-component-details.ui.settings.managed-settings.description.nonfinal',
    defaultMessage:
      'Manage your component with a component manager to define component details from an external tool.',
    description:
      'Managed settings description for the component details settings page',
  },
  learnMore: {
    id:
      'dragonfruit-page-component-details.ui.settings.managed-settings.learn-more.nonfinal',
    defaultMessage: 'Learn more about managing components',
    description:
      'Learn more message for managed settings on the component details settings page',
  },
  componentManagerHeading: {
    id:
      'dragonfruit-page-component-details.ui.settings.managed-settings.component-manager-heading.nonfinal',
    defaultMessage: 'Component manager',
    description:
      'Heading for the component manager setting on managed settings on the component details settings page',
  },
  syncHeading: {
    id:
      'dragonfruit-page-component-details.ui.settings.managed-settings.sync-heading.nonfinal',
    defaultMessage: 'Last sync',
    description:
      'Heading for the sync heading on managed settings on the component details settings page',
  },
  linkText: {
    id:
      'dragonfruit-page-component-details.ui.settings.managed-settings.link-text.nonfinal',
    defaultMessage: `Go to ${CONFIG_AS_CODE_FILE_NAME}`,
    description:
      'Link text for button on managed settings on the component details settings page',
  },
  managerDescription: {
    id:
      'dragonfruit-page-component-details.ui.settings.managed-settings.manager-info.nonfinal',
    defaultMessage: '{configFileName} in {forgeAppName}',
    description:
      'description for manager on managed settings on the component details settings page',
  },
});
