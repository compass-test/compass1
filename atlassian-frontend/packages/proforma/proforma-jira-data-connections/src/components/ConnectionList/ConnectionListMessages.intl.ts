import { defineMessages } from 'react-intl';

export enum ConnectionListMessage {
  ConnectionsHeader = 'ConnectionsHeader',
  ConnectionsPara = 'ConnectionsPara',
  AddConnectionBtn = 'AddConnectionBtn',
  TableHeaderName = 'TableHeaderName',
  TableHeaderSource = 'TableHeaderSource',
  TableHeaderStatus = 'TableHeaderStatus',
  ConnectionStatusOk = 'ConnectionStatusOk',
  ConnectionStatusFailing = 'ConnectionStatusFailing',
  ConnectionStatusDeleted = 'ConnectionStatusDeleted',
  ConnectionStatusDeletedTooltip = 'ConnectionStatusDeletedTooltip',
  EmptyStateHeader = 'EmptyStateHeader',
  EmptyStateDescription = 'EmptyStateDescription',
}

export const IntlConnectionListMessages = defineMessages({
  [ConnectionListMessage.ConnectionsHeader]: {
    id: 'ui-admin.AdminConnections.ConnectionList.ConnectionsHeader',
    defaultMessage: 'ProForma Data Connections',
  },
  [ConnectionListMessage.ConnectionsPara]: {
    id: 'ui-admin.AdminConnections.ConnectionList.ConnectionsPara',
    defaultMessage:
      'Data connections allow you to load data from an external source into ProForma choice lists.',
  },
  [ConnectionListMessage.AddConnectionBtn]: {
    id: 'ui-admin.AdminConnections.ConnectionList.AddConnectionBtn',
    defaultMessage: 'Add Connection',
  },
  [ConnectionListMessage.TableHeaderName]: {
    id: 'ui-admin.AdminConnections.ConnectionList.TableHeaderName',
    defaultMessage: 'Name',
  },
  [ConnectionListMessage.TableHeaderSource]: {
    id: 'ui-admin.AdminConnections.ConnectionList.TableHeaderSource',
    defaultMessage: 'Source',
  },
  [ConnectionListMessage.TableHeaderStatus]: {
    id: 'ui-admin.AdminConnections.ConnectionList.TableHeaderStatus',
    defaultMessage: 'Status',
  },
  [ConnectionListMessage.ConnectionStatusOk]: {
    id: 'ui-admin.AdminConnections.ConnectionList.ConnectionStatusOk',
    defaultMessage: 'OK',
  },
  [ConnectionListMessage.ConnectionStatusFailing]: {
    id: 'ui-admin.AdminConnections.ConnectionList.ConnectionStatusFailing',
    defaultMessage: 'Failing',
  },
  [ConnectionListMessage.ConnectionStatusDeleted]: {
    id: 'ui-admin.AdminConnections.ConnectionList.ConnectionStatusDeleted',
    defaultMessage: 'Deleted',
  },
  [ConnectionListMessage.ConnectionStatusDeletedTooltip]: {
    id:
      'ui-admin.AdminConnections.ConnectionList.ConnectionStatusDeletedTooltip',
    defaultMessage:
      'To prevent unintended loss of data on forms, deleted connections can be easily reactivated.',
  },
  [ConnectionListMessage.EmptyStateHeader]: {
    id: 'ui-admin.AdminConnections.ConnectionList.EmptyStateHeader',
    defaultMessage: 'Show live data in your forms',
  },
  [ConnectionListMessage.EmptyStateDescription]: {
    id: 'ui-admin.AdminConnections.ConnectionList.EmptyStateDescription',
    defaultMessage:
      'Use data connections to populate choice lists on your forms with information from an external data source. When the original source data is changed, your forms will update automatically.',
  },
});
