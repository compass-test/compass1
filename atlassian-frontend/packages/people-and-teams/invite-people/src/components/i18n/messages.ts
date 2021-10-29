import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  formTitle: {
    id: 'ptc.ip.form.title',
    defaultMessage: 'Invite your teammates',
    description: 'A title for the invite users form',
  },
  // Use this for usersFormTitle when translation is complete
  formTitleUpdated: {
    id: 'ptc.ip.form.title.people',
    defaultMessage: 'Invite people',
    description: 'A title for the invite users form',
  },
  usersFormTitle: {
    id: 'ptc.ip.users.form.title',
    defaultMessage: 'Add your teammates',
    description: 'A title for the invite users form',
  },
  formTitleProduct: {
    id: 'ptc.ip.form.title.product',
    defaultMessage: 'Invite your teammates to {product}',
    description:
      'A title for the invite users form stating to which product users should be invited',
  },
  formTitleProductUpdated: {
    id: 'ptc.ip.form.title.product.people',
    defaultMessage: 'Invite people to {product}',
    description:
      'A title for the invite users form stating to which product users should be invited',
  },
  formManageAccessSettingsLabel: {
    id: 'ptc.ip.form.manageAccessSettings.label',
    defaultMessage: 'Manage Access Settings',
    description:
      'The label of the manage access settings link in the drop down menu',
  },
  usersFormTitleProduct: {
    id: 'ptc.ip.users.form.title.product',
    defaultMessage: 'Add your teammates to {product}',
    description:
      'A title for the invite users form stating to which product users should be added',
  },
  usersFormTitleProductUpdated: {
    id: 'ptc.ip.users.form.title.product.people',
    defaultMessage: 'Invite people to {product}',
    description:
      'A title for the invite users form stating to which product users should be added',
  },
  formDescription: {
    id: 'ptc.ip.users.form.description.new',
    defaultMessage:
      'People you add will receive an invite automatically or after your site admin has approved the request.',
    description:
      'Description for the invite people form for basic user with no invite permission',
  },
  formDescriptionUpdated: {
    id: 'ptc.ip.users.form.description',
    defaultMessage:
      'If you don’t have permission to invite, we’ll send an access request to your admin instead.',
    description:
      'Description for the invite people form for basic user with no invite permission',
  },
  addMoreButton: {
    id: 'ptc.ip.form.addMoreButton',
    defaultMessage: '+ Add more',
    description: 'Text for Add more invite fields button',
  },
  sendInviteButton: {
    id: 'ptc.ip.form.sendButton',
    defaultMessage: 'Invite teammates',
    description: 'Text for Send invite button',
  },
  // Use this for usersSendInviteButton when translation is complete
  sendInviteButtonUpdated: {
    id: 'ptc.ip.form.sendButton.count',
    defaultMessage: `Invite {numberOfUniqueEmails, plural,
        =0 {people}
        one {{numberOfUniqueEmails} person}
        other {{numberOfUniqueEmails} people}}`,
    description:
      'Text for send invite button. Should be one of "Invite people", "Invite 1 person", "Invite n people"',
  },
  usersSendInviteButton: {
    id: 'ptc.ip.users.form.sendButton',
    defaultMessage: 'Add teammates',
    description: 'Text for Send invite button',
  },
  cancelButton: {
    id: 'ptc.ip.form.cancelButton',
    defaultMessage: 'Cancel',
    description: 'Text for cancel invite button',
  },
  invalidEmailMessage: {
    id: 'ptc.ip.form.invalid-email-message',
    defaultMessage: 'Please enter a valid email address',
    description:
      'Error message to be shown when the users adds an invalid email address',
  },
  emptyEmailMessage: {
    id: 'ptc.ip.form.empty-email-message',
    defaultMessage: 'Please add at least one email address',
    description:
      'Error message to be shown when the user tries to submit the invite form without add any email',
  },
  emptyEmailMessageUpdated: {
    id: 'ptc.ip.form.empty-email-message.person',
    defaultMessage: 'Choose at least one person',
    description:
      'Error message to be shown when the user tries to submit the invite form without add any email',
  },
  noProductSelectedMessage: {
    id: 'ptc.ip.form.no-product-selected-message',
    defaultMessage: 'Please select a product',
    description:
      'Error message to be shown when the user tries to submit the invite form with no product selected',
  },
  noProductSelectedMessageUpdated: {
    id: 'ptc.ip.form.no-product-selected-message.choose',
    defaultMessage: 'Choose at least one product',
    description:
      'Error message to be shown when the user tries to submit the invite form with no product selected',
  },
  selectProducts: {
    id: 'ptc.ip.form.select-products.label',
    defaultMessage: 'Select products',
    description: 'Label for product select field',
  },
  selectProductsUpdated: {
    id: 'ptc.ip.form.select-products.label.choose',
    defaultMessage: 'Choose products to invite to',
    description: 'Label for product select field',
  },
  jiraCoreMessage: {
    id: 'ptc.ip.form.jira-core-message',
    defaultMessage: 'Jira Core is included with other Jira products.',
    description:
      'Warning message to be shown when the user select any of the Jira products',
  },
  optionIncludedWithOtherJiraProducts: {
    id:
      'people-and-teams.invite-people.form.option-included-with-other-jira-products',
    defaultMessage: 'Included with other Jira products',
    description:
      'Shown in the product select dropdown, next to a Jira product that was included for free with other Jira products',
  },
  emailInputLabel: {
    id: 'ptc.ip.form.email-input-label',
    defaultMessage: 'Email address',
    description: 'Label to the field where the user will add the email',
  },
  viralSettingsModalTitle: {
    id: 'ptc.ip.viral-settings-modal.title',
    defaultMessage: "Free up time for what's important",
    description: 'Title to be shown in the viral settings modal',
  },
  viralSettingsModalDescription: {
    id: 'ptc.ip.viral-settings-modal.description',
    defaultMessage:
      "These settings are configured for enhanced team collaboration in {selectedProduct}. You can update them at any time, and we'll keep you up-to-date about all new users.",
    description: 'Description to be shown in the viral settings modal',
  },
  viralSettingsModalCloseButtonLabel: {
    id: 'ptc.ip.viral-settings-modal.close-button.label',
    defaultMessage: 'Close',
    description:
      'Label of the close button to be shown in viral settings modal',
  },
  genericSuccessFlagTitle: {
    id: 'ptc.ip.flag.generic-success-flag-title',
    defaultMessage: 'Success',
  },
  invitedPlural: {
    id: 'ptc.ip.flag.invited-plural',
    defaultMessage:
      '{inviteCount, plural, one {{emailInvited}} other {{inviteCount} people}}',
    description: `This is a segment of a larger message which notifies the user that they have successfully invited people to one or more products. The final string should read like "You've invited user@email.com." or "You've invited 2 people to Confluence."`,
  },
  productsPlural: {
    id: 'ptc.ip.flag.products-plural',
    defaultMessage:
      '{productCount, plural, one { \xa0to {product}.} other {.}}',
    description: `This is a segment of a larger message which notifies the user that they have successfully invited people to one or more products. The final string should read like "You've invited user@email.com." or "You've invited 2 people to Confluence."`,
  },
  inviteSuccessFlagDescription: {
    id: 'ptc.ip.flag.invite-success-flag-description',
    defaultMessage: "You've invited {invitedPlural}{productsPlural}",
    description: `This message notifies the user that they have successfully invited people to one or more products. The final string should read like "You've invited user@email.com." or "You've invited 2 people to Confluence."`,
  },
  requestAccessSuccessFlagDescription: {
    id: 'ptc.ip.flag.request-access-success-flag-description',
    defaultMessage:
      "You've requested access for {requestAccessCount, plural, =0 {no one} one {{emailRequestedAccess}} other {{requestAccessCount} people}}.",
  },
  invitedHybridPlural: {
    id: 'ptc.ip.flag.invited-hybrid-plural',
    defaultMessage:
      '{inviteCount, plural, one {{emailInvited}} other {{inviteCount} people}}',
    description: `This is a segment of a larger message which notifies the user that they have invited people and requested access for others. The final string should read like "You've invited alice@email.com and requested access for bob@email.com." or "You've invited 2 people and requested access for 3 others."`,
  },
  requestAccessHybridPlural: {
    id: 'ptc.ip.flag.request-access-hybrid-plural',
    defaultMessage:
      '{requestAccessCount, plural, one {{emailRequestedAccess}} other {{requestAccessCount} others}}',
    description: `This is a segment of a larger message which notifies the user that they have invited people and requested access for others. The final string should read like "You've invited alice@email.com and requested access for bob@email.com." or "You've invited 2 people and requested access for 3 others."`,
  },
  hybridSuccessFlagDescription: {
    id: 'ptc.ip.flag.hybrid-success-flag-description',
    defaultMessage:
      "You've invited {invitedHybridPlural} and requested access for {requestAccessHybridPlural}.",
    description: `This message notifies the user that they have invited people and requested access for others. The final string should read like "You've invited alice@email.com and requested access for bob@email.com." or "You've invited 2 people and requested access for 3 others."`,
  },
  genericFailedFlagTitle: {
    id: 'ptc.ip.flag.generic-failed-flag-title',
    defaultMessage: 'Something went wrong',
  },
  genericFailedFlagDescription: {
    id: 'ptc.ip.flag.generic-failed-flag-description',
    defaultMessage:
      "We couldn't send any access requests or invitations. {isAdmin, select, true {Contact your admin for help.} false {}}",
  },
  inviteFailedFlagTitle: {
    id: 'ptc.ip.flag.invite-failed-flag-title',
    defaultMessage:
      '{failedInviteCount, plural, one {Invite} other {Invites}} {isAdmin, select, true {not sent} false {failed}}',
  },
  inviteFailedFlagDescription: {
    id: 'ptc.ip.flag.invite-failed-flag-description',
    defaultMessage:
      "{failedInviteCount, plural, one {We couldn't invite {emailFailedToInvite}.} other {We couldn't send any invitations.}} {isAdmin, select, false {Contact your admin for help.} true {}}",
  },
  licenceExceededFlagTitle: {
    id: 'ptc.ip.flag.licence-exceeded-flag-title',
    defaultMessage: 'Invites not sent',
  },
  licenceExceededFlagDescription: {
    id: 'ptc.ip.flag.licence-exceeded-flag-description',
    defaultMessage:
      "{userRole, select, admin {We couldn't invite anyone because you've reached your user limit.} trusted {We couldn't invite anyone because you've reached your user limit. Contact your admin for help.} other {You can't invite anyone. Ask your admin to upgrade your plan.}}",
  },
  contactSupportActionLabel: {
    id: 'ptc.ip.flag.contact-support-action-label',
    defaultMessage: 'Contact support',
  },
  viewUsersActionLabel: {
    id: 'ptc.ip.flag.view-users-action-label',
    defaultMessage: 'View users',
  },
  upgradePlanActionLabel: {
    id: 'ptc.ip.flag.upgrade-plan-action-label',
    defaultMessage: 'Upgrade plan',
  },
  jiraCoreOptionSubText: {
    id: 'ptc.ip.jira.core.option.subtext',
    defaultMessage: 'Included with other Jira products',
  },
  selectPlaceholder: {
    id: 'ptc.ip.product.select.placeholder',
    defaultMessage: 'What product are you inviting people to?',
  },
  selectAllOption: {
    id: 'ptc.ip.product.select.alloption',
    defaultMessage: 'Select all',
  },
  selectAllOptionUpdated: {
    id: 'ptc.ip.product.select.alloption.choose',
    defaultMessage: 'Choose all',
  },
  inviteeListUserPickerPlaceholder: {
    id: 'ptc.ip.form.invitee-list.user-picker.placeholder',
    defaultMessage: "Enter user's name or email address",
    description: 'Placeholder to show in user picker in invitee list',
  },
  inviteeListUserPickerEmailPlaceholder: {
    id: 'ptc.ip.form.invitee-list.user-picker.email.placeholder',
    defaultMessage: 'Enter email address',
    description:
      'Placeholder to show in user picker in invitee list when no integrations are connected',
  },
  inviteeListLabel: {
    id: 'ptc.ip.form.invitee-list.label',
    defaultMessage: 'Add with email',
    description: 'Label to be shown above the invitee list text field.',
  },
  inviteeListLabelThirdParty: {
    id: 'ptc.ip.form.invitee-list-third-party.label',
    defaultMessage: 'Find teammates',
    description: 'Label to be shown above the invitee list user picker field.',
  },
  inviteeListLabelThirdPartyUpdated: {
    id: 'ptc.ip.form.invitee-list-third-party.label.choose',
    defaultMessage: 'Choose people to invite',
    description: 'Label to be shown above the invitee list user picker field.',
  },
  inviteeListLabelThirdPartyNoIntegrations: {
    id: 'ptc.ip.form.invitee-list-third-party.no-integrations.label',
    defaultMessage: 'Add with email',
    description:
      'Label to be shown above the invitee list user picker field when no integrations are connected.',
  },
  inviteeListLabelThirdPartyNoIntegrationsUpdated: {
    id: 'ptc.ip.form.invitee-list-third-party.no-integrations.label.invite',
    defaultMessage: 'Invite with email',
    description:
      'Label to be shown above the invitee list user picker field when no integrations are connected.',
  },
  invalidMultipleEmailMessage: {
    id: 'ptc.ip.form.invalid-multiple-email-message',
    defaultMessage:
      'To send your invites, please correct any invalid addresses.',
    description:
      'Error message to be shown when the users adds an invalid email address to the multiple email input',
  },
  tooManyEmailAddresses: {
    id: 'ptc.ip.form.too-many-email-addresses',
    defaultMessage: 'You can only send up to 10 email invites at once.',
    description:
      'Error message to be shown when the users adds an invalid email address to the multiple email input',
  },
  inviteeListNote: {
    id: 'ptc.ip.form.invitee-list.note',
    defaultMessage: 'Enter up to 10 email addresses, separated by a comma.',
    description: 'Note to be shown below the invitee list text field.',
  },
  inviteeListPickerNote: {
    id: 'ptc.ip.form.invitee-list-picker.note',
    defaultMessage: 'Add at least one teammate.',
    description:
      'Note to be shown below the invitee list user picker field if user tries to submit empty form.',
  },
  inviteeListPickerNoteUpdated: {
    id: 'ptc.ip.form.invitee-list-picker.note.choose',
    defaultMessage: 'Choose at least one person',
    description:
      'Note to be shown below the invitee list user picker field if user tries to submit empty form.',
  },
  googleThirdPartyConnectedTooltip: {
    id: 'ptc.ip.thirdparty.google.connected.tooltip',
    defaultMessage: 'Disconnect Google',
    description: 'Tooltip to show over unlink icon for google integration',
  },
  googleThirdPartyButton: {
    id: 'ptc.ip.thirdparty.google.button',
    defaultMessage: 'Google',
    description:
      'Starts a connection flow between the users atlassian account to his google account in order to invite google users to atlassian',
  },
  microsoftThirdPartyConnectedTooltip: {
    id: 'ptc.ip.thirdparty.microsoft.connected.tooltip',
    defaultMessage: 'Disconnect Microsoft',
    description: 'Tooltip to show over unlink icon for microsoft integration',
  },
  microsoftThirdPartyButton: {
    id: 'ptc.ip.thirdparty.microsoft.button',
    defaultMessage: 'Microsoft',
    description:
      'Starts a connection flow between the users atlassian account to his microsoft account in order to invite microsoft users to atlassian',
  },
  slackThirdPartyConnectedTooltip: {
    id: 'ptc.ip.thirdparty.slack.connected.tooltip',
    defaultMessage: 'Manage this connection',
    description: 'Tooltip to show over cog icon for slack integration',
  },
  slackThirdPartyButton: {
    id: 'ptc.ip.thirdparty.slack.button',
    defaultMessage: 'Slack',
    description:
      'Opens a modal allowing the user to connect third party invites to one of his connected slack workspaces',
  },
  thirdPartyConnect: {
    id: 'ptc.ip.thirdparty-footer.connect.label',
    defaultMessage: 'Connect more teammates from',
    description:
      'Label telling to user to connect more teammates from listed integrations',
  },
  thirdPartyConnectUpdated: {
    id: 'ptc.ip.thirdparty-footer.connect.label.people',
    defaultMessage: 'Connect more people from',
    description:
      'Label telling to user to connect more teammates from listed integrations',
  },
  thirdPartyConnectTeammates: {
    id: 'ptc.ip.thirdparty-connect.connect.label',
    defaultMessage: 'Connect teammates from',
    description:
      'Label telling to user to connect teammates from listed integrations',
  },
  thirdPartyConnectTeammatesUpdated: {
    id: 'ptc.ip.thirdparty-connect.connect.label.people',
    defaultMessage: 'Connect people from',
    description:
      'Label telling to user to connect teammates from listed integrations',
  },
  thirdPartyConnectedTo: {
    id: 'ptc.ip.thirdparty.connect-to.label',
    defaultMessage: 'Connected to',
    description:
      'Label on list of connected third party sources for user invitess',
  },
  thirdPartyOr: {
    id: 'ptc.ip.thirdparty.connect.or.label',
    defaultMessage: 'OR',
    description:
      'Label on that lets user select between connecting integrations or just inviting',
  },
  slackWorkspacesConnectDialogHeading: {
    id: 'ptc.ip.slack.workspaces.connect.dialog.heading',
    defaultMessage: 'Connect Slack workspace',
    description: 'Heading for the Connect Slack workspaces dialog',
  },
  slackWorkspacesManageDialogHeading: {
    id: 'ptc.ip.slack.workspaces.manage.dialog.heading',
    defaultMessage: 'Manage Slack connection',
    description: 'Heading for the Manage Slack workspaces dialog',
  },
  slackWorkspacesDialogBody: {
    id: 'ptc.ip.slack.workspaces.dialog.body',
    defaultMessage:
      'Select one workspace that you’d like to invite users from.',
    description: 'Body for the Slack workspaces dialog',
  },
  slackWorkspacesDialogDisconnectSlack: {
    id: 'ptc.ip.slack.workspaces.dialog.disconnect.slack',
    defaultMessage: 'Disconnect Slack',
    description:
      'Text for the Disconnect Slack link on the Slack workspaces dialog',
  },
  slackWorkspacesDoneButton: {
    id: 'ptc.ip.slack.workspaces.dialog.connet-workspace',
    defaultMessage: 'Connect workspace',
    description:
      'Text for connectioon button in slack workspace selection dialog',
  },
  slackWorkspacesDisconnectDialogHeading: {
    id: 'ptc.ip.slack.workspaces.disconnect.dialog.heading',
    defaultMessage: 'Disconnect Slack',
    description: 'Title for the Disconnect Slack workspaces dialog',
  },
  slackWorkspacesDisconnectDialogBody: {
    id: 'ptc.ip.slack.workspaces.disconnect.dialog.body',
    defaultMessage:
      "You're about to disconnect this Slack workspace and limit your ability to search through its contacts.",
    description:
      'text too shoow in the body of the Disconnect Slack workspaces dialog',
  },
  disconnectButton: {
    id: 'ptc.ip.slack.disconnect.dialog.disconnect.button',
    defaultMessage: 'Disconnect',
    description: 'Text for Disconnect slack button',
  },
  slackConnectSuccessFlagTitle: {
    id: 'ptc.ip.flag.slack-connect-success-flag-title',
    defaultMessage: '‘{workspace}’ from Slack connected',
    description: 'Flag header for slack connection',
  },
  slackConnectSuccessFlagDescription: {
    id: 'ptc.ip.flag.slack-connect-success-flag-description',
    defaultMessage:
      'You can now search through this workspace’s list of contacts.',
    description: 'Flag description for slack connection',
  },
  slackDisconnectSuccessFlagTitle: {
    id: 'ptc.ip.flag.slack-disconnect-success-flag-title',
    defaultMessage: 'Slack disconnected',
    description: 'Flag header for slack disconnection',
  },
  slackDiscnnectSuccessFlagDescription: {
    id: 'ptc.ip.flag.slack-disconnect-success-flag-description',
    defaultMessage:
      'You can no longer search through this workspace’s list of contacts.',
    description: 'Flag description for slack disconnection',
  },
  microsoftConnectSuccessFlagTitle: {
    id: 'ptc.ip.flag.microsoft-connect-success-flag-title',
    defaultMessage: 'Microsoft connected',
    description: 'Flag header for successful microsoft connection',
  },
  microsoftConnectSuccessFlagDescription: {
    id: 'ptc.ip.flag.microsoft-connect-success-flag-description',
    defaultMessage: 'You can now search through its list of contacts.',
    description: 'Flag description for successful microsoft connection',
  },
  googleConnectSuccessFlagTitle: {
    id: 'ptc.ip.flag.google-connect-success-flag-title',
    defaultMessage: 'Google Workspace connected',
    description: 'Flag header for successful google workspace connection',
  },
  googleConnectSuccessFlagDescription: {
    id: 'ptc.ip.flag.google-connect-success-flag-description',
    defaultMessage: 'You can now search through its list of contacts.',
    description: 'Flag description for successful google workspace connection',
  },
  googleUserTooltipContent: {
    id: 'ptc.ip.tooltip.google-connect-user',
    defaultMessage: 'Connect from Google Workspace',
    description:
      'Tooltip content shown on thirdd party google button for users',
  },
  jiraProjectSettingsLabel: {
    id: 'ptc.ip.flag.jira-project-settings-action-label',
    defaultMessage: '{jiraProjectName} settings',
  },
  inviteToJiraProjectSuccessFlagTitle: {
    id: 'ptc.ip.flag.invite-to-jira-project-success-flag-title',
    defaultMessage: '{inviteCount, plural, one {Invite} other {Invites}} sent',
  },
  inviteToJiraProjectSuccessFlagDescription: {
    id: 'ptc.ip.flag.invite-to-jira-project-success-flag-description',
    defaultMessage:
      "You've invited {inviteCount, plural, one {{emailInvited}} other {{inviteCount} people}}. {isAdmin, select, true {Add them to project {jiraProjectName}} false {Ask an admin to add them to this project} other {}} to start collaborating.",
  },
  requestAccessToJiraProjectSuccessFlagTitle: {
    id: 'ptc.ip.flag.request-access-to-jira-project-success-flag-title',
    defaultMessage:
      "You've requested access for {requestAccessCount} {requestAccessCount, plural, one {user} other {users}}",
  },
  requestAccessToJiraProjectSuccessFlagDescription: {
    id: 'ptc.ip.flag.request-access-to-jira-project-success-flag-description',
    defaultMessage:
      "They'll be able to start collaborating when your admin approves their access request and adds them to the project.",
  },
  hybridToJiraProjectSuccessFlagTitle: {
    id: 'ptc.ip.flag.hybrid-to-jira-project-success-flag-title',
    defaultMessage:
      '{inviteCount, plural, one {Invite and request} other {Invites and requests}} sent',
  },
  multipleHybridInvitePlural: {
    id: 'ptc.ip.flag.hybrid-to-jira-project-multiple-hybrid-invite-plural',
    defaultMessage: '{inviteCount, plural, one {person} other {people}}',
    description: `This is a segment of a larger message which notifies the user that they have invited people and requested access for others to a jira project. The final string should read like "You've sent one invite and one request. Ask an admin to add them to this project to start collaborating." or "You've invited 1 person and requested access for 3 others. Ask an admin to add them to this project to start collaborating."`,
  },
  multipleHybridRequestAccessPlural: {
    id:
      'ptc.ip.flag.hybrid-to-jira-project-multiple-hybrid-request-access-plural',
    defaultMessage: '{requestAccessCount, plural, one {other} other {others}}.',
    description: `This is a segment of a larger message which notifies the user that they have invited people and requested access for others to a jira project. The final string should read like "You've sent one invite and one request. Ask an admin to add them to this project to start collaborating." or "You've invited 1 person and requested access for 3 others. Ask an admin to add them to this project to start collaborating."`,
  },
  multipleHybridDescription: {
    id: 'ptc.ip.flag.hybrid-to-jira-project-multiple-hybrid-description',
    defaultMessage:
      "You've invited {inviteCount} {multipleHybridInvitePlural} and requested access for {requestAccessCount} {multipleHybridRequestAccessPlural}.",
    description: `This is a segment of a larger message which notifies the user that they have invited people and requested access for others to a jira project. The final string should read like "You've sent one invite and one request. Ask an admin to add them to this project to start collaborating." or "You've invited 1 person and requested access for 3 others. Ask an admin to add them to this project to start collaborating."`,
  },
  hybridToJiraProjectSuccessFlagDescription: {
    id: 'ptc.ip.flag.hybrid-to-jira-project-success-flag-description',
    defaultMessage:
      "{combination, select, singleHybrid {You've sent one invite and one request} multipleHybrid {multipleHybridDescription}. Ask an admin to add them to this project to start collaborating.",
    description: `This message notifies the user that they have invited people and requested access for others to a jira project. The final string should read like "You've sent one invite and one request. Ask an admin to add them to this project to start collaborating." or "You've invited 1 person and requested access for 3 others. Ask an admin to add them to this project to start collaborating."`,
  },
  licenceExceededInJiraProjectFlagTitle: {
    id: 'ptc.ip.flag.licence-exceeded-in-jira-project-flag-title',
    defaultMessage:
      '{failedInviteCount} {failedInviteCount, plural, one {invite} other {invites}} not sent',
  },
  licenceExceededInJiraProjectFlagDescription: {
    id: 'ptc.ip.flag.licence-exceeded-in-jira-project-flag-description',
    defaultMessage:
      "{userRole, select, admin {We couldn't {failedInviteCount, plural, one {invite {emailFailedToInvite}} other {send {failedInviteCount} of your invites}} because you've reached your user limit.} trusted {We couldn't invite {failedInviteCount} {failedInviteCount, plural, one {person} other {people}} because you've reached your user limit. Contact your admin for help.} other {Your team has reached its user limit for the Jira Software Free plan. To unlock user limits, ask your admin to upgrade your plan.}}",
  },
  errorHeading: {
    id: `ptc.ip.error-heading`,
    defaultMessage: 'Something’s gone wrong',
    description:
      'Heading of the error screen which is shown when an unknown error happens in Invite people. Usually due to failed network requests.',
  },
  errorText: {
    id: `ptc.ip.error-text`,
    defaultMessage:
      'We keep track of these errors, but feel free to contact us if refreshing doesn’t fix things',
    description:
      'Text that is displayed when an unknown error happens in the Invite People.',
  },
  errorImageAltText: {
    id: `ptc.ip.error-image-alt-text`,
    defaultMessage: 'A broken robot and a number of people busy fixing it.',
    description:
      'Text displayed as alt text when an error occurs in the Invite People',
  },
  viralSettingsHeading: {
    id: 'ptc.ip.viral-settings.heading',
    defaultMessage: 'Enhance collaboration in {product}',
    description:
      'Heading for viral setting section in the invite People component. Will only show one product at any given time.',
  },
  directAccessDescription: {
    id: 'ptc.ip.viral-settings.direct-access.description',
    defaultMessage:
      'Let anyone with a verified {domainWithStyling} email address join',
    description:
      'Text explaining to the user what enabling direct access will do. Will only be a single domain at any given time.',
  },
  directAccessExtendedDescription: {
    id: 'ptc.ip.viral-settings.open-invite.extended-description',
    defaultMessage:
      'People in your org can join without an invite when they need to collaborate.',
    description:
      'An extended description of what enabling direct access will do.',
  },
  openInviteDescription: {
    id: 'ptc.ip.viral-settings.open-invite.description',
    defaultMessage: 'Let my teammates invite other people',
    description:
      'Text explaining to the user what enabling open invite will do, will only update the currently selected product.',
  },
  openInviteDescriptionUpdated: {
    id: 'ptc.ip.viral-settings.open-invite.description.users',
    defaultMessage: 'Let my users invite other people',
    description:
      'Text explaining to the user what enabling open invite will do, will only update the currently selected product.',
  },
  openInviteSuccessFlagTitle: {
    id: 'ptc.ip.flag.viral-settings.open-invite.success.title',
    defaultMessage: 'You updated {product} invite settings',
    description:
      'The title of a notification shown to users when they enable user invites.',
  },
  openInviteSuccessFlagDescription: {
    id: 'ptc.ip.flag.viral-settings.open-invite.success.description',
    defaultMessage:
      'Your teammates can now invite other people without your approval.',
    description:
      'The description of a notification shown to users when they enable user invites.',
  },
  openInviteFailureFlagTitle: {
    id: 'ptc.ip.flag.viral-settings.open-invite.failure.title',
    defaultMessage: 'We couldn’t save your invite settings',
    description:
      'The title of a notification shown to users when they failed to enable user invites.',
  },
  openInviteFailureFlagDescription: {
    id: 'ptc.ip.flag.viral-settings.open-invite.failure.description',
    defaultMessage:
      'Go to Administration to allow your teammates to invite other people to {product}.',
    description:
      'The title of a notification shown to users when they failed to enable user invites.',
  },
  viralSettingsSuccessFlagActionLabel: {
    id: 'ptc.ip.flag.viral-settings.success.action-label',
    defaultMessage: 'See access settings',
    description:
      'The action label of all viral settings success notifications, shown to users when they successfully enable a viral setting.',
  },
  viralSettingsFailureFlagActionLabel: {
    id: 'ptc.ip.flag.viral-settings.failure.action-label',
    defaultMessage: 'See access settings in Administration',
    description:
      'The action label of all viral settings failure notifications, shown to users when the system failed to enable a/both viral setting.',
  },
  directAccessSuccessFlagTitle: {
    id: 'ptc.ip.flag.viral-settings.direct-access.success.title',
    defaultMessage: 'You updated {product} join settings',
    description:
      'The title of a notification shown to users when they enable direct access.',
  },
  directAccessSuccessFlagDescription: {
    id: 'ptc.ip.flag.viral-settings.direct-access.success.description',
    defaultMessage:
      'New users with a verified {domains} email address can now join without an invite.',
    description:
      'The description of a notification shown to users when they enable direct access.',
  },
  directAccessFailureFlagTitle: {
    id: 'ptc.ip.flag.viral-settings.direct-access.failure.title',
    defaultMessage: 'We couldn’t save your join settings',
    description:
      'The title of a notification shown to users when the system fails to enable direct access',
  },
  directAccessFailureFlagDescription: {
    id: 'ptc.ip.flag.viral-settings.direct-access.failure.description',
    defaultMessage:
      'Go to Administration to allow new users with a verified {domain} email address to join {product}.',
    description:
      'The title of a notification shown to users when the system fails to enable direct access',
  },
  viralSettingsSuccessFlagTitle: {
    id: 'ptc.ip.flag.viral-settings.success.title',
    defaultMessage: 'You updated {product} access settings',
    description:
      'The title of a notification shown to users when they enable both direct access and open invite.',
  },
  viralSettingsSuccessFlagDescription: {
    id: 'ptc.ip.flag.viral-settings.success.description',
    defaultMessage:
      'Users can invite new users, and org members with a verified {domains} email can join without an invite.',
    description:
      'The description of a notification shown to users when they enable both direct access and open invite.',
  },
  openInviteExtendedDescription: {
    id: 'ptc.ip.viral-settings.direct-access.extended-description',
    defaultMessage:
      'Your users will be able to invite new collaborators as needed.',
    description:
      'An extended description of what enabling open invite will do.',
  },
  viralSettingsInfoModalTitle: {
    id: 'ptc.ip.viral-settings.info-modal.title',
    defaultMessage: 'Free up time for what’s important',
    description:
      'Title displayed to users who clicked the info button on the invite people dialog',
  },
  viralSettingsInfoModalDescription: {
    id: 'ptc.ip.viral-settings.info-modal.description',
    defaultMessage:
      'These settings are configured for enhanced team collaboration in {selectedProductLabel}. You can update them at any time, and we’ll keep you up-to-date about all new users.',
    description:
      'Description displayed to users who clicked the info button on the invite people dialog',
  },
  slackWorkspaceAddNewWorkspaceOption: {
    id: 'ptc.ip.slack.workspace.dropdown.add-new-workspace',
    defaultMessage: 'Add a new Workspace',
    description: 'Option which allows to add a new Slack workspace',
  },
  userRecommendations: {
    id: 'ptc.ip.add.collaborators',
    defaultMessage: 'Add your top collaborators',
    description: 'Title above recommended collaborators in core invites',
  },
  userRecommendationsTooltip: {
    id: 'ptc.ip.add.collaborators.tooltip',
    defaultMessage: 'Found in',
    description:
      'Tooltip diplaying where suggested collaborators have been sourced from. eg. Found in: Jira Software, ACME',
  },
});
