import { defineMessages } from 'react-intl';

export enum ConnectionDetailsMessage {
  RequiredField = 'RequiredField',
  Para1 = 'Para1',
  NameLabel = 'NameLabel',
  NameInfo = 'NameInfo',
  NamePlaceholder = 'NamePlaceholder',
  TypeLabel = 'TypeLabel',
  TypePlaceholder = 'TypePlaceholder',
}

export const IntlConnectionDetailsMessages = defineMessages({
  [ConnectionDetailsMessage.RequiredField]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConnectionDetails.RequiredField',
    defaultMessage: 'This field is required.',
  },
  [ConnectionDetailsMessage.Para1]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.ConnectionDetails.Para1',
    defaultMessage:
      'Please provide connection details for this data source. This information will be visible to Jira administrators but not to people who use the data source to design or fill in forms.',
  },
  [ConnectionDetailsMessage.NameLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConnectionDetails.NameLabel',
    defaultMessage: 'Name',
  },
  [ConnectionDetailsMessage.NameInfo]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.ConnectionDetails.NameInfo',
    defaultMessage:
      'This name will be displayed to people designing forms, but not people filling out forms.',
  },
  [ConnectionDetailsMessage.NamePlaceholder]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConnectionDetails.NamePlaceholder',
    defaultMessage: 'Enter a connection name',
  },
  [ConnectionDetailsMessage.TypeLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConnectionDetails.TypeLabel',
    defaultMessage: 'Connection Type',
  },
  [ConnectionDetailsMessage.TypePlaceholder]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConnectionDetails.TypePlaceholder',
    defaultMessage: 'Choose a connection type',
  },
});
