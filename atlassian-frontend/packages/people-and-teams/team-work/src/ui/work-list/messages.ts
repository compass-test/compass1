import { defineMessages } from 'react-intl';

const PREFIX = 'ptc.team-work';

export const messages = defineMessages({
  emptyStateTitle: {
    id: `${PREFIX}.empty-state.title`,
    defaultMessage: "Your team's issues",
    description: 'Title of Team Work empty state',
  },
  emptyStateDescription: {
    id: `${PREFIX}.empty-state.description`,
    defaultMessage:
      'Work associated with your team in Jira Software will appear here.',
    description: 'Further description of Team Work empty state',
  },
  errorStateTitle: {
    id: `${PREFIX}.error-state.title`,
    defaultMessage: 'Failed to load',
    description: 'Title of Team Work error state',
  },
  errorStateDescription: {
    id: `${PREFIX}.error-state.description`,
    defaultMessage:
      'Please reload the page or contact your site administrator.',
    description: 'Further descriptiont of Team Work error state',
  },
  viewAll: {
    id: `${PREFIX}.viewAll`,
    defaultMessage: 'View all Jira issues assigned to team',
    description: 'Link to JIRA search showing all team issues',
  },
});
