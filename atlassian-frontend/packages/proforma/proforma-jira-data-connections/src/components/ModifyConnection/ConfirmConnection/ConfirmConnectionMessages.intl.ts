import { defineMessages } from 'react-intl';

export enum ConfirmConnectionMessage {
  ContentTypeUnknown = 'ContentTypeUnknown',
  ContentTypeJson = 'ContentTypeJson',
  ContentTypeXml = 'ContentTypeXml',
  Para1 = 'Para1',
  ConnectionHeading = 'ConnectionHeading',
  ConnectionTypeHeading = 'ConnectionTypeHeading',
  ConnectionIsReturnDataOfType = 'ConnectionIsReturnDataOfType',
  ItemsHeading = 'ItemsHeading',
  ItemsLoadingMessage = 'ItemsLoadingMessage',
  LegacyFormTemplateIncompatibilityHeading = 'LegacyFormTemplateIncompatibilityHeading',
  LegacyFormTemplateIncompatibilityPara1 = 'LegacyFormTemplateIncompatibilityPara1',
  LegacyFormTemplateIncompatibilityPara2 = 'LegacyFormTemplateIncompatibilityPara2',
  SavingConnectionMessage = 'SavingConnectionMessage',
  SourceHeading = 'SourceHeading',
  AuthenticationHeading = 'AuthenticationHeading',
  NoAuthentication = 'NoAuthentication',
  CacheResultsHeading = 'CacheResultsHeading',
  CachingDisabled = 'CachingDisabled',
  CachingFor = 'CachingFor',
}

export const IntlConfirmConnectionMessages = defineMessages({
  [ConfirmConnectionMessage.ContentTypeUnknown]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.ContentTypeUnknown',
    defaultMessage: 'Unknown',
  },
  [ConfirmConnectionMessage.ContentTypeJson]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.ContentTypeJson',
    defaultMessage: 'JSON',
  },
  [ConfirmConnectionMessage.ContentTypeXml]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.ContentTypeXml',
    defaultMessage: 'XML',
  },
  [ConfirmConnectionMessage.Para1]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.Para1',
    defaultMessage: 'Your data connection is now ready to be created.',
  },
  [ConfirmConnectionMessage.ConnectionHeading]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.ConnectionHeading',
    defaultMessage: 'Connection',
  },
  [ConfirmConnectionMessage.ConnectionTypeHeading]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.ConnectionTypeHeading',
    defaultMessage: 'Connection Type',
  },
  [ConfirmConnectionMessage.ConnectionIsReturnDataOfType]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.ConnectionIsReturnDataOfType',
    defaultMessage: 'connection returning {contentType} data',
  },
  [ConfirmConnectionMessage.ItemsHeading]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.ItemsHeading',
    defaultMessage: 'Items',
  },
  [ConfirmConnectionMessage.ItemsLoadingMessage]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.ItemsLoadingMessage',
    defaultMessage: 'Loading items...',
  },
  [ConfirmConnectionMessage.LegacyFormTemplateIncompatibilityHeading]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.LegacyFormTemplateIncompatibilityHeading',
    defaultMessage: 'Incompatible with Legacy Form Templates',
  },
  [ConfirmConnectionMessage.LegacyFormTemplateIncompatibilityPara1]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.LegacyFormTemplateIncompatibilityPara1',
    defaultMessage:
      'The selected ID field {fieldId} contains letters and is not compatible with Legacy Form Templates created prior to April 2020.',
  },
  [ConfirmConnectionMessage.LegacyFormTemplateIncompatibilityPara2]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.LegacyFormTemplateIncompatibilityPara2',
    defaultMessage:
      'There is no problem using this ID field for Standard Form Templates.',
  },
  [ConfirmConnectionMessage.SavingConnectionMessage]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.SavingConnectionMessage',
    defaultMessage: 'Saving connection...',
  },
  [ConfirmConnectionMessage.SourceHeading]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.SourceHeading',
    defaultMessage: 'Source',
  },
  [ConfirmConnectionMessage.AuthenticationHeading]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.AuthenticationHeading',
    defaultMessage: 'Authentication',
  },
  [ConfirmConnectionMessage.NoAuthentication]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.NoAuthentication',
    defaultMessage: 'None',
  },
  [ConfirmConnectionMessage.CacheResultsHeading]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.CacheResultsHeading',
    defaultMessage: 'Cache Results',
  },
  [ConfirmConnectionMessage.CachingDisabled]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.CachingDisabled',
    defaultMessage: 'Caching disabled',
  },
  [ConfirmConnectionMessage.CachingFor]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.ConfirmConnection.CachingFor',
    defaultMessage: 'For up to {cachingTimeout}',
  },
});
