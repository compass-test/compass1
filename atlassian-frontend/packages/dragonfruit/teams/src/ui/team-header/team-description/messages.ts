import { defineMessages } from 'react-intl';

export default defineMessages({
  noTeamDescription: {
    id: 'dragonfruit-page-team-details.team-header.no-team-description',
    defaultMessage:
      'Add a description to the {TeamPageLink} for this team and it will be reflected here.',
    description: 'Message for teams that have no description',
  },
  atlassianTeamPage: {
    id: 'dragonfruit-page-team-details.team-header.atlassian-team-page',
    defaultMessage: 'Atlassian team page',
    description: 'Message for link to Atlassian team profile',
  },
});
