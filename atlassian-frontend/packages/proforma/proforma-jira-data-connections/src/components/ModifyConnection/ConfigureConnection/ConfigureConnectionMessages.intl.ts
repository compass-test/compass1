import { defineMessages } from 'react-intl';

export enum ConfigureConnectionMessage {
  ParseJsonErrorLog = 'ParseJsonErrorLog',
  ContentTypeNotSupportedTitle = 'ContentTypeNotSupportedTitle',
  ContentTypeNotSupportedMessage = 'ContentTypeNotSupportedMessage',
  UnableToParseDataMessage = 'UnableToParseDataMessage',
  ConfigureItemsToRetrieveMessage = 'ConfigureItemsToRetrieveMessage',
  ItemsLabel = 'ItemsLabel',
  ItemsPlaceholder = 'ItemsPlaceholder',
  IdPlaceholder = 'IdPlaceholder',
  LabelPlaceholder = 'LabelPlaceholder',
}

export const IntlConfigureConnectionMessages = defineMessages({
  [ConfigureConnectionMessage.ParseJsonErrorLog]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfigureConnection.ParseJsonErrorLog',
    defaultMessage: 'Invalid JSON returned',
  },
  [ConfigureConnectionMessage.ContentTypeNotSupportedTitle]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfigureConnection.ContentTypeNotSupportedTitle',
    defaultMessage: 'Unsupported Data Format',
  },
  [ConfigureConnectionMessage.ContentTypeNotSupportedMessage]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfigureConnection.ContentTypeNotSupportedMessage',
    defaultMessage:
      'This data connection returned data in a format that is not currently supported. ProForma only supports JSON at this time.',
  },
  [ConfigureConnectionMessage.UnableToParseDataMessage]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfigureConnection.UnableToParseDataMessage',
    defaultMessage:
      'The data connection returned data that ProForma was unable to parse.',
  },
  [ConfigureConnectionMessage.ConfigureItemsToRetrieveMessage]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfigureConnection.ConfigureItemsToRetrieveMessage',
    defaultMessage:
      'This data connection is providing the following data. Please configure which items ProForma should retrieve from this connection:',
  },
  [ConfigureConnectionMessage.ItemsLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfigureConnection.ItemsLabel',
    defaultMessage: 'Items',
  },
  [ConfigureConnectionMessage.ItemsPlaceholder]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfigureConnection.ItemsPlaceholder',
    defaultMessage: 'Choose an item location',
  },
  [ConfigureConnectionMessage.IdPlaceholder]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfigureConnection.IdPlaceholder',
    defaultMessage: 'ID property',
  },
  [ConfigureConnectionMessage.LabelPlaceholder]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfigureConnection.LabelPlaceholder',
    defaultMessage: 'Label Property',
  },
});
