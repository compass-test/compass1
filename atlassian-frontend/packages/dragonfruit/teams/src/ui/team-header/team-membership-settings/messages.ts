import { defineMessages } from 'react-intl';

export default defineMessages({
  invitationOnly: {
    id: 'dragonfruit-page-team-details.team-header.invitation-only',
    defaultMessage: 'invite-only',
    description: 'Label describing teams that require an invitation',
  },
  invitationOnlyTooltip: {
    id: 'dragonfruit-page-team-details.team-header.invitation-only-tooltip',
    defaultMessage:
      'Joining the team requires an invite from someone already on the team. Visit the Atlassian profile to add someone to the team.',
    description: 'Tooltip explaining teams that require an invitation',
  },
});
