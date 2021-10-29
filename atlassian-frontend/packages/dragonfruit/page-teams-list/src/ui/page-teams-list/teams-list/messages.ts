import { defineMessages } from 'react-intl';

export default defineMessages({
  membersLabel: {
    id: 'dragonfruit-page-teams-list.teams-list.members.label',
    defaultMessage: 'Members',
    description: 'Label for members column of teams list table.',
  },
  createTeam: {
    id: 'dragonfruit-page-teams-list.teams-list',
    defaultMessage: 'Start a team',
    description: 'Text of the create team button on the teams list page',
  },
  errorStateTitle: {
    id: 'dragonfruit-page-teams-list.teams-list.fallback-error-state.title',
    defaultMessage: 'Something went wrong',
    description: 'Title of the error state of the teams list page',
  },
  errorStateBody: {
    id: 'dragonfruit-page-teams-list.teams-list.fallback-error-state.body',
    defaultMessage: "We couldn't load any teams.",
    description: 'Body of the error state of the teams list page',
  },
  emptyStateHeader: {
    id: 'dragonfruit-page-teams-list.teams-list.empty-state.title',
    defaultMessage: 'Create a team',
    description: 'Header of the empty state of the teams list page',
  },
  emptyStateBody: {
    id: 'dragonfruit-page-teams-list.teams-list.empty-state.body',
    defaultMessage: 'Create a team to start collaborating on Compass',
    description: 'Body of the empty state of the teams list page',
  },
});
