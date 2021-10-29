import { defineMessages } from 'react-intl';

export default defineMessages({
  installApp: {
    id: 'dragonfruit-apps.common.install-app',
    defaultMessage: 'Install',
    description: 'Option for installing a Forge app',
  },
  uninstallApp: {
    id: 'dragonfruit-apps.common.uninstall-app',
    defaultMessage: 'Uninstall app',
    description: 'Option for uninstalling a Forge app',
  },
  configureApp: {
    id: 'dragonfruit-apps.common.configure-app',
    defaultMessage: 'Configure',
    description: 'Option for configuring a Forge app',
  },
  installedApp: {
    id: 'dragonfruit-apps.common.installed-app',
    defaultMessage: 'Installed',
    description: 'Installed app label',
  },
  notInstalledApp: {
    id: 'dragonfruit-apps.common.not-installed-app',
    defaultMessage: 'Not installed',
    description: 'Not installed app label',
  },
  byVendor: {
    id: 'dragonfruit-apps.app-card.bitbucket-app-vendor',
    defaultMessage: 'By {vendor}',
    description: 'Text for vendor name on app card',
  },
  flagInstallAppTitle: {
    id: 'dragonfruit-apps.common.flag-install-app-title',
    defaultMessage: '{name} app successfully installed',
    description: 'Flag message title once a Forge app sucessfully installed',
  },
  flagInstallErrorAppTitle: {
    id: 'dragonfruit-apps.common.flag-install-app-title.error.nonfinal',
    defaultMessage: '{name} app installation failed',
    description:
      'Flag message title when error occurs when installing Forge app',
  },
  flagInstallErrorAppDesc: {
    id: 'dragonfruit-apps.common.flag-install-app-title.error.nonfinal',
    defaultMessage: 'Try installing the app again.',
    description:
      'Flag message description when error occurs when installing Forge app',
  },
  flagInstallAppConfigureLink: {
    id: 'dragonfruit-apps.common.flag-install-app-configure-link',
    defaultMessage: 'Configure app',
    description: 'Link to configure an app once it was installed',
  },
});
