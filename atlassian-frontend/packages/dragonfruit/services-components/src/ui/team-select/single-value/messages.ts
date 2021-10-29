import { defineMessages } from 'react-intl';

export default defineMessages({
  teamNameFetchFailureMessage: {
    id:
      'dragonfruit-services-components.team-select.team-name-fetch-failure-message',
    defaultMessage: 'Error loading data',
    description:
      'Label shown in place of team name in the team select when default team name could not be retrieved',
  },
  teamNotFoundMessage: {
    id:
      'dragonfruit-services-components.team-select.team-not-found-message.nonfinal',
    defaultMessage: 'Team deleted',
    description:
      'Label shown in place of team name in the team select when default team name does not exist',
  },
  teamNameAccessRestrictedMessage: {
    id:
      'dragonfruit-services-components.team-select.team-access-restricted-message.nonfinal',
    defaultMessage: 'Request access to view',
    description:
      'Label shown in place of team name when the user does not have permission to view the team name in the team select',
  },
});
