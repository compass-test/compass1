import { defineMessages } from 'react-intl';

export enum ConnectionConflictPopupMessages {
  Heading = 'Heading',
  CannotLinkJiraFieldAndDataConnection = 'CannotLinkJiraFieldAndDataConnection',
  RemoveJiraField = 'RemoveJiraField',
  ExistingJiraField = 'ExistingJiraField',
  NewDataConnection = 'NewDataConnection',
  RemoveDataConnection = 'RemoveDataConnection',
  ExistingDataConnection = 'ExistingDataConnection',
  NewJiraField = 'NewJiraField',
  Close = 'Close',
}

export const IntlConnectionConflictPopupMessages = defineMessages({
  [ConnectionConflictPopupMessages.Heading]: {
    id: 'form-builder.QuestionSidebar.ConnectionConflictPopup.Heading',
    defaultMessage: 'Cannot link simultaneously',
  },
  [ConnectionConflictPopupMessages.CannotLinkJiraFieldAndDataConnection]: {
    id:
      'form-builder.QuestionSidebar.ConnectionConflictPopup.CannotLinkJiraFieldAndDataConnection',
    defaultMessage:
      'A question cannot be linked to both a Jira field and a data connection.',
  },
  [ConnectionConflictPopupMessages.RemoveJiraField]: {
    id: 'form-builder.QuestionSidebar.ConnectionConflictPopup.RemoveJiraField',
    defaultMessage:
      'If you wish to link to this data connection, remove the Jira field link first.',
  },
  [ConnectionConflictPopupMessages.ExistingJiraField]: {
    id:
      'form-builder.QuestionSidebar.ConnectionConflictPopup.ExistingJiraField',
    defaultMessage: 'Existing linked Jira field:',
  },
  [ConnectionConflictPopupMessages.NewDataConnection]: {
    id:
      'form-builder.QuestionSidebar.ConnectionConflictPopup.NewDataConnection',
    defaultMessage: 'New data connection:',
  },
  [ConnectionConflictPopupMessages.RemoveDataConnection]: {
    id:
      'form-builder.QuestionSidebar.ConnectionConflictPopup.RemoveDataConnection',
    defaultMessage:
      'If you wish to link to this Jira field, remove the data connection first.',
  },
  [ConnectionConflictPopupMessages.ExistingDataConnection]: {
    id:
      'form-builder.QuestionSidebar.ConnectionConflictPopup.ExistingDataConnection',
    defaultMessage: 'Existing data connection:',
  },
  [ConnectionConflictPopupMessages.NewJiraField]: {
    id: 'form-builder.QuestionSidebar.ConnectionConflictPopup.NewJiraField',
    defaultMessage: 'New linked Jira field:',
  },
  [ConnectionConflictPopupMessages.Close]: {
    id: 'form-builder.QuestionSidebar.ConnectionConflictPopup.Close',
    defaultMessage: 'Close',
  },
});
