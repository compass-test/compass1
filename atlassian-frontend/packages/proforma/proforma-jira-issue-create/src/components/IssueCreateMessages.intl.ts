import { defineMessages } from 'react-intl';

export enum IssueCreateMessage {
  IssueCreateSuccessMsg = 'IssueCreateSuccessMsg',
  IssueCreateModalHeader = 'IssueCreateModalHeader',
  IssueCreateActiveFormName = 'IssueCreateActiveFormName',
  IssueCreateActiveFormType = 'IssueCreateActiveFormType',
  IssueCreateChangeBtn = 'IssueCreateChangeBtn',
  IssueCreateNoAvailableForms = 'IssueCreateNoAvailableForms',
  InvalidLinkPageTitle = 'InvalidLinkPageTitle',
  InvalidLinkPageMsg = 'InvalidLinkPageMsg',
}

export const IntlIssueCreateMessages = defineMessages({
  [IssueCreateMessage.IssueCreateSuccessMsg]: {
    id: 'ui-user.IssueCreate.IssueCreateSuccessMsg',
    defaultMessage: 'New Jira issue successfully created!',
  },
  [IssueCreateMessage.IssueCreateModalHeader]: {
    id: 'ui-user.IssueCreate.IssueCreateModalHeader',
    defaultMessage: 'Create an issue using a form',
  },
  [IssueCreateMessage.IssueCreateActiveFormName]: {
    id: 'ui-user.IssueCreate.IssueCreateActiveFormName',
    defaultMessage: 'Form Name',
  },
  [IssueCreateMessage.IssueCreateActiveFormType]: {
    id: 'ui-user.IssueCreate.IssueCreateActiveFormType',
    defaultMessage: 'Type',
  },
  [IssueCreateMessage.IssueCreateChangeBtn]: {
    id: 'ui-user.IssueCreate.IssueCreateChangeBtn',
    defaultMessage: 'Change',
  },
  [IssueCreateMessage.IssueCreateNoAvailableForms]: {
    id: 'ui-user.IssueCreate.IssueCreateNoAvailableForms',
    defaultMessage: 'No available forms found',
  },
  [IssueCreateMessage.InvalidLinkPageTitle]: {
    id: 'ui-user.IssueCreate.InvalidLinkPageTitle',
    defaultMessage: 'Invalid form link',
  },
  [IssueCreateMessage.InvalidLinkPageMsg]: {
    id: 'ui-user.IssueCreate.InvalidLinkMsg',
    defaultMessage:
      'This link is not connected to a form. Perhaps the issue or request types associated with this form have changed. Please contact your Jira or Project administrator for the correct link.',
  },
});
