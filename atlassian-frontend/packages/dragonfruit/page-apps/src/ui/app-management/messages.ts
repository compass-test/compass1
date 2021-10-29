import { defineMessages } from 'react-intl';

export default defineMessages({
  mainSkipLinkTitle: {
    id: 'dragonfruit-apps.app-management.main-skip-link-title',
    defaultMessage: 'Apps',
    description:
      'Title for the skip link to jump to the main section of the app management page',
  },
  appManagementHeader: {
    id: 'dragonfruit-apps.app-management.app-management-header',
    defaultMessage: 'Apps',
    description: 'Header for the app management page',
  },
  appManagementByLine: {
    id: 'dragonfruit-apps.app-management.app-management-byline',
    defaultMessage: 'You can install and configure apps here.',
    description: 'Byline for the app management page',
  },
  appManagementAdminRestrictionHeader: {
    id:
      'dragonfruit-apps.app-management.app-management-admin-restriction-header',
    defaultMessage: 'You must be a Compass admin to manage apps',
    description:
      'Title of the section message shown when a non-admin views the manage apps page',
  },
  appManagementAdminRestrictionBody: {
    id: 'dragonfruit-apps.app-management.app-management-admin-restriction-body',
    defaultMessage: 'Contact your Compass product admin to manage your apps.',
    description:
      'Body of the section message shown when a non-admin views the manage apps page',
  },
  appManagementHelp: {
    id: 'dragonfruit-apps.app-management.app-management-help.nonfinal',
    defaultMessage: "Don't see what you're looking for? ",
    description: 'Part of help text below the list of apps',
  },
  appManagementHelpFeedbackLink: {
    id: 'dragonfruit-apps.app-management.app-management-help-feedback-link',
    defaultMessage: 'Tell us',
    description:
      'Part of help text below the list of apps that links to opening feedback modal',
  },
  appManagementHelpBuildCustomApp: {
    id: 'dragonfruit-apps.app-management.app-management-help-custom-app',
    defaultMessage:
      " what you'd like to see or <a href={forgeLink}>build a custom app</a>.",
    description:
      'Part of help text below the list of apps that links to forge documentation',
  },

  comingSoon: {
    id: 'dragonfruit-apps.app-management.coming-soon',
    defaultMessage: 'Coming Soon',
    description: 'Coming Soon lozenge text',
  },
});
