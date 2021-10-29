import { defineMessages } from 'react-intl';

const PREFIX = 'ptc.pt';

export const messages = defineMessages({
  // member pickers
  limitedUsersInvitationMessageInfo: {
    id: `${PREFIX}.member-picker.msg.exceed.limited.number.info`,
    defaultMessage: `You can invite up to {maxNumber, plural, \
      one {1 person} \
      other {{maxNumber} people}} \
      at a time.`,
    description:
      'A info message which always shows beneath of the user select box',
  },
  limitedUsersInvitationMessageError: {
    id: `${PREFIX}.member-picker.error.msg.exceed.limited.number.error2`,
    defaultMessage: `You've entered more than {maxNumber, plural, \
      one {{maxNumber} person} \
      other {{maxNumber} people}}.`,
    description:
      'A error message which shows beneath of the user select box when users enter more than maximum items (ex: 10)',
  },
  userPickerPlaceholder: {
    id: `${PREFIX}.member-picker.placeholder`,
    defaultMessage: 'Their name or @mention',
    description: 'The empty search box for a user to begin typing',
  },
  userPickerNoOption: {
    id: `${PREFIX}.member-picker.no-option`,
    defaultMessage: 'No matches.',
    description: 'No search results found, and invite is not available',
  },
  // team-create-dialog
  modalTitle: {
    id: `${PREFIX}.team-create-dialog.title`,
    defaultMessage: 'Start a new team',
    description: 'Title of the modal for inviting members to a team',
  },
  formTextWithMention: {
    id: `${PREFIX}.team-create-dialog.pretext.with.mention`,
    defaultMessage: `Get everyone working in one place by adding them to a team. \
    Stay connected with @mentions, collaborate on work together, \
    and efficiently manage everything from the team profile page. {learnMoreLink}`,
    description:
      'Intro text that goes before form inputs (which hints about mentions as well)',
  },
  teamNameFieldLabel: {
    id: `${PREFIX}.team-create-dialog.team-name-field.label`,
    defaultMessage: 'Team name',
    description: 'Label of the field to input team name in Team Create modal',
  },
  teamNameFieldPlaceholder: {
    id: `${PREFIX}.team-create-dialog.modal.team-name-field.placeholder`,
    defaultMessage: 'What’s your team called?',
    description: 'Label of the field team name in Team Create modal',
  },
  submitButtonLabel: {
    id: `${PREFIX}.team-create-dialog.button.submit`,
    defaultMessage: 'Start team',
    description:
      'A main button in Team Create Dialog. Clicking on it will create a new team and close the dialog',
  },
  cancelButtonLabel: {
    id: `${PREFIX}.team-create-dialog.button.cancel`,
    defaultMessage: 'Cancel',
    description:
      'A main button in Team Create Dialog. Clicking on it to close the dialog without creating a team',
  },
  learnMore: {
    id: `${PREFIX}.team-create-dialog.learn-more`,
    defaultMessage: 'Learn more',
    description:
      'A link to https://confluence.atlassian.com/cloud/atlassian-teams-975031970.html',
  },
  // flags of team-create-dialog
  flagSuccessCreateTeamTitle: {
    id: `${PREFIX}.team-create-dialog.flag-success.title`,
    defaultMessage: 'You’ve created ‘{teamName}’',
    description:
      'A title of a success flag appearing when creating team succeeds',
  },
  flagSuccessCreateTeamDesc: {
    id: `${PREFIX}.team-create-dialog.flag-success.desc`,
    defaultMessage:
      'Mention your new team to start collaborating right away or edit the team in your team profile.',
    description:
      'A description of a success flag appearing when creating team succeeds',
  },
  flagSuccessCreateTeamAction: {
    id: `${PREFIX}.team-create-dialog.flag-success.action`,
    defaultMessage: 'View your team',
    description:
      'An link in success flag appearing when creating team succeeds. Clicking on it will go to the team profile page',
  },
  flagErrorCreateTeamTitle: {
    id: `${PREFIX}.team-create-dialog.flag-error.title`,
    defaultMessage: 'Sorry, something went wrong',
    description: 'A title of an error flag appearing when creating team fails',
  },
  flagErrorCreateTeamDesc: {
    id: `${PREFIX}.team-create-dialog.flag-error.desc`,
    defaultMessage: "We couldn't save your team. Please try again.",
    description:
      'A description of an error flag appearing when creating team fails',
  },
  // inviting members
  invitationsFieldLabel: {
    id: `${PREFIX}.team-create-dialog.modal.fields.invite-emails.label`,
    defaultMessage: 'Invite people to your team',
    description: 'Label of the field invite emails in Team Create modal',
  },
  flagErrorInviteMembersTitle: {
    id: `${PREFIX}.team-create-dialog.invite-members.failed.title`,
    defaultMessage: 'Something went wrong with your invites',
    description:
      'A title of an error flag appearing when creating team succeeded but members invitation fails',
  },
  flagErrorInviteMembersDesc: {
    id: `${PREFIX}.team-create-dialog.invite-members.failed.desc`,
    defaultMessage:
      "We created the team, but you'll need to add team members again.",
    description:
      'A description of an error flag appearing when creating team succeeded but members invitation fails',
  },
});
