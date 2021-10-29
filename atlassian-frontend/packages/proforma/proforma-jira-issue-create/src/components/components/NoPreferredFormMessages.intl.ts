import { defineMessages } from 'react-intl';

export enum NoPreferredFormMessage {
  Description = 'Description',
  EditSettingsMsg = 'EditSettingsMsg',
  IssueFormsMsg = 'IssueFormsMsg',
}

export const IntlNoPreferredFormMessages = defineMessages({
  [NoPreferredFormMessage.Description]: {
    id: 'ui-user.IssueCreate.NoPreferredFormMessage.Description',
    defaultMessage: `No compatible forms are available for use with this feature yet. To get started, create a new form or edit an existing one with the ProForma Form Builder. Click on the {EditSettingsMsg} button and enable the {IssueFormsMsg} setting to make the form available for use with this feature.`,
    description: `This message is displayed when no preferred forms are available.
     It's two placeholders {EditSettingsMsg} and {IssueFormsMsg} will be displayed in bold and translated
     separately`,
  },
  [NoPreferredFormMessage.EditSettingsMsg]: {
    id: 'ui-user.IssueCreate.NoPreferredFormMessage.EditSettingsMsg',
    defaultMessage: 'Edit Settings',
    description:
      'This will be used as a placeholder and displayed in NoPreferredFormMessage.Description',
  },
  [NoPreferredFormMessage.IssueFormsMsg]: {
    id: 'ui-user.IssueCreate.NoPreferredFormMessage.IssueFormsMsg',
    defaultMessage: 'Issue Forms',
    description:
      'This will be used as a placeholder and displayed in NoPreferredFormMessage.Description',
  },
});
