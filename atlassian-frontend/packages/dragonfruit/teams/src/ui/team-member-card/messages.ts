import { defineMessages } from 'react-intl';

export default defineMessages({
  summaryContentText: {
    id: 'team-member-card.summary-content-text',
    defaultMessage: '{teamMemberCount} team members',
    description: 'Text for the team member card summary content',
  },
  summaryContentTextSingular: {
    id: 'team-member-card.summary-content-text.singular',
    defaultMessage: '1 team member',
    description:
      'Text for the team member card summary content when there is only one team member',
  },
  errorContent: {
    id: 'team-member-card.summary-content-text.error',
    defaultMessage:
      'Unable to load team members. Refresh the page and try again.',
    description: 'Text for the team member card summary error component',
  },
});
