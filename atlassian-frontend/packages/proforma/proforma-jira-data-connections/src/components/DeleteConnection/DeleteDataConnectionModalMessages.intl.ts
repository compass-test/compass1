import { defineMessages } from 'react-intl';

export enum DeleteDataConnectionMessage {
  Title = 'Title',
  CheckingForConnectionUsageMessage = 'CheckingForConnectionUsageMessage',
  DataConnectionUsedByMessage = 'DataConnectionUsedByMessage',
  ProjectColumnName = 'ProjectColumnName',
  FormNameColumnName = 'FormNameColumnName',
  ErrorNoDataConnectionMessage = 'ErrorNoDataConnectionMessage',
  ErrorUnknownMessage = 'ErrorUnknownMessage',
  WarningListItem1 = 'WarningListItem1',
  WarningListItem2 = 'WarningListItem2',
  WarningListItem3 = 'WarningListItem3',
  WarningListItem4 = 'WarningListItem4',
}

export const IntlDeleteDataConnectionMessages = defineMessages({
  [DeleteDataConnectionMessage.Title]: {
    id: 'ui-admin.AdminDeleteConnection.Title',
    defaultMessage: 'Confirm Connection Deletion ...',
  },
  [DeleteDataConnectionMessage.CheckingForConnectionUsageMessage]: {
    id: 'ui-admin.AdminDeleteConnection.CheckingForConnectionUsageMessage',
    defaultMessage: 'Checking for connection usage ...',
  },
  [DeleteDataConnectionMessage.DataConnectionUsedByMessage]: {
    id: 'ui-admin.AdminDeleteConnection.DataConnectionUsedByMessage',
    defaultMessage: 'This data connection is used by the following forms',
  },
  [DeleteDataConnectionMessage.ProjectColumnName]: {
    id: 'ui-admin.AdminDeleteConnection.ProjectColumnName',
    defaultMessage: 'Project',
  },
  [DeleteDataConnectionMessage.FormNameColumnName]: {
    id: 'ui-admin.AdminDeleteConnection.FormNameColumnName',
    defaultMessage: 'Form name',
  },
  [DeleteDataConnectionMessage.ErrorNoDataConnectionMessage]: {
    id: 'ui-admin.AdminDeleteConnection.ErrorNoDataConnectionMessage',
    defaultMessage: 'No data connection found to delete.',
  },
  [DeleteDataConnectionMessage.ErrorUnknownMessage]: {
    id: 'ui-admin.AdminDeleteConnection.ErrorUnknownMessage',
    defaultMessage: 'Unknown error occurred during connection delete.',
  },
  [DeleteDataConnectionMessage.WarningListItem1]: {
    id: 'ui-admin.AdminDeleteConnection.WarningListItem1',
    defaultMessage: 'The linked choices on these forms will be cleared.',
  },
  [DeleteDataConnectionMessage.WarningListItem2]: {
    id: 'ui-admin.AdminDeleteConnection.WarningListItem2',
    defaultMessage: 'Existing forms on issues may use this data connection.',
  },
  [DeleteDataConnectionMessage.WarningListItem3]: {
    id: 'ui-admin.AdminDeleteConnection.WarningListItem3',
    defaultMessage: 'Data on submitted forms will be preserved.',
  },
  [DeleteDataConnectionMessage.WarningListItem4]: {
    id: 'ui-admin.AdminDeleteConnection.WarningListItem4',
    defaultMessage:
      'For open forms the list of choices, including any selected option, will be cleared.',
  },
});
