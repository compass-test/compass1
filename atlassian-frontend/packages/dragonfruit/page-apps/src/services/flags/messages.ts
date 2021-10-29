import { defineMessages } from 'react-intl';

export default defineMessages({
  flagUninstallSuccessAppTitle: {
    id: 'dragonfruit-apps.services.flags.uninstall-app-success-title',
    defaultMessage: 'App uninstalled',
    description: 'Flag message title once a Forge app sucessfully uninstalled',
  },
  flagUninstallSuccessAppContent: {
    id:
      'dragonfruit-apps.services.flags.uninstall-app-success-content.nonfinal',
    defaultMessage: '{name} app successfully uninstalled.',
    description:
      'Content of flag message title once a Forge app sucessfully uninstalled',
  },
  flagUninstallErrorAppTitle: {
    id: 'dragonfruit-apps.services.flags.uninstall-app-error-title.nonfinal',
    defaultMessage: 'App uninstallation failed',
    description:
      'Flag message title when there is an error in uninstalling Forge app',
  },
  flagUninstallErrorAppDesc: {
    id: 'dragonfruit-apps.services.flags.uninstall-app-error-desc.nonfinal',
    defaultMessage:
      '{name} app uninstallation failed. Try uninstalling the app again.',
    description:
      'Flag message description when there is an error in uninstalling Forge app',
  },
});
