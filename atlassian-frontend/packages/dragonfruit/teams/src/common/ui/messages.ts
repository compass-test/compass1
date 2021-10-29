import { defineMessages } from 'react-intl';

export default defineMessages({
  errorLoadingOrgPermissions: {
    id: 'dragonfruit-teams.error-loading-org-permissions',
    defaultMessage:
      'Unable to load team because it exists in a different organization.',
    description:
      'Error message shown if the team name fails to load because the team exists in a different organization',
  },
});
