import { defineMessages } from 'react-intl';

const PREFIX = 'people-and-teams.people-menu';

export const messages = defineMessages({
  yourCollab: {
    id: `${PREFIX}.collaborators.title`,
    defaultMessage: 'Your Collaborators',
    description:
      'A title of Your-Collaborators section in People Menu dropdown',
  },
  yourTeams: {
    id: `${PREFIX}.your-teams.title`,
    defaultMessage: 'Your Teams',
    description: 'A title of a Your-Teams section in People Menu dropdown',
  },
  viewAllPeopleAndTeams: {
    id: `${PREFIX}.view-all-people-teams`,
    defaultMessage: 'Search people and teams',
    description:
      'A link in People Menu. Clicking on it will navigate to in-product People search home page',
  },
  viewYourProfile: {
    id: `${PREFIX}.view-your-profile`,
    defaultMessage: 'View your profile',
    description:
      'A link in People Menu. Clicking on it will navigate the user to their personal profile',
  },
  errorHeading: {
    id: `${PREFIX}.error-heading`,
    defaultMessage: 'Something’s gone wrong',
    description:
      'Heading of the error screen which is shown when an unknown error happens in the People Menu. Usually due to failed network requests.',
  },
  errorText: {
    id: `${PREFIX}.error-text`,
    defaultMessage:
      'We keep track of these errors, but feel free to contact us if refreshing doesn’t fix things',
    description:
      'Text that is displayed when an unknown error happens in the People Menu.',
  },
  errorImageAltText: {
    id: `${PREFIX}.error-image-alt-text`,
    defaultMessage: 'A broken robot and a number of people busy fixing it.',
    description:
      'Text displayed as alt text when an error occurs in the People Menu',
  },
  teams: {
    id: `${PREFIX}.teams`,
    defaultMessage: 'Teams',
    description: 'An alternative title of primary menu',
  },
  startATeam: {
    id: `${PREFIX}.start-a-team`,
    defaultMessage: 'Start a team',
    description:
      'A menu item in People Menu. Clicking on it will open a Create Team Dialog',
  },
  invitePeople: {
    id: `${PREFIX}.invite.teammates`,
    defaultMessage: 'Add people to {product}',
    description:
      'A button in People Menu. Clicking on it will open a modal with the form to give another user access to the product',
  },
  viewAllTeams: {
    id: `${PREFIX}.view.all.teams`,
    defaultMessage: 'View all teams',
    description:
      'A button in People Menu. Clicking on it will navigate to the team list page',
  },
  inviteATeammate: {
    id: `${PREFIX}.invite-a-teammate.`,
    defaultMessage: 'Invite a teammate',
    description:
      'A button in People Menu to invite a teammate. Clicking on it will open a modal with the form to give another user access to the product',
  },
});
