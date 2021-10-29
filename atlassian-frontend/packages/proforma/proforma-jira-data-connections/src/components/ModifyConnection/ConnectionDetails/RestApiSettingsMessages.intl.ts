import { defineMessages } from 'react-intl';

export enum RestApiSettingsMessage {
  UrlLabel = 'UrlLabel',
  UrlPlaceholder = 'UrlPlaceholder',
  AuthenticationLabel = 'AuthenticationLabel',
  AuthenticationPlaceholder = 'AuthenticationPlaceholder',
  AuthenticationOptionBasicLabel = 'AuthenticationOptionBasicLabel',
  AuthenticationOptionDigestLabel = 'AuthenticationOptionDigestLabel',
  AuthenticationOptionCustomLabel = 'AuthenticationOptionCustomLabel',
  AuthenticationOptionNoneLabel = 'AuthenticationOptionNoneLabel',
  CacheResultsLabel = 'CacheResultsLabel',
  CacheResultsOptionNoneLabel = 'CacheResultsOptionNoneLabel',
  CacheResultsOptionOneMinuteLabel = 'CacheResultsOptionOneMinuteLabel',
  CacheResultsOptionFiveMinutesLabel = 'CacheResultsOptionFiveMinutesLabel',
  CacheResultsOptionFifteenMinutesLabel = 'CacheResultsOptionFifteenMinutesLabel',
  CacheResultsOptionOneHourLabel = 'CacheResultsOptionOneHourLabel',
  CacheResultsOptionEightHoursLabel = 'CacheResultsOptionEightHoursLabel',
  CacheResultsOptionOneDayLabel = 'CacheResultsOptionOneDayLabel',
  CacheResultsOptionSevenDaysLabel = 'CacheResultsOptionSevenDaysLabel',
  UsernameLabel = 'UsernameLabel',
  UsernamePlaceholder = 'UsernamePlaceholder',
  PasswordLabel = 'PasswordLabel',
  PasswordPlaceholder = 'PasswordPlaceholder',
  AuthenticationTokenLabel = 'AuthenticationTokenLabel',
  AuthenticationTokenPlaceholder = 'AuthenticationTokenPlaceholder',
}

export const IntlRestApiSettingsMessages = defineMessages({
  [RestApiSettingsMessage.UrlLabel]: {
    id: 'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.UrlLabel',
    defaultMessage: 'URL',
  },
  [RestApiSettingsMessage.UrlPlaceholder]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.UrlPlaceholder',
    defaultMessage: 'Enter the REST API URL',
  },
  [RestApiSettingsMessage.AuthenticationLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.AuthenticationLabel',
    defaultMessage: 'Authentication',
  },
  [RestApiSettingsMessage.AuthenticationPlaceholder]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.AuthenticationPlaceholder',
    defaultMessage: 'Choose an authentication type',
  },
  [RestApiSettingsMessage.AuthenticationOptionBasicLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.AuthenticationOptionBasicLabel',
    defaultMessage: 'Basic',
  },
  [RestApiSettingsMessage.AuthenticationOptionDigestLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.AuthenticationOptionDigestLabel',
    defaultMessage: 'Digest',
  },
  [RestApiSettingsMessage.AuthenticationOptionCustomLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.AuthenticationOptionCustomLabel',
    defaultMessage: 'Custom',
  },
  [RestApiSettingsMessage.AuthenticationOptionNoneLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.AuthenticationOptionNoneLabel',
    defaultMessage: 'None',
  },
  [RestApiSettingsMessage.CacheResultsLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.CacheResultsLabel',
    defaultMessage: 'Cache results',
  },
  [RestApiSettingsMessage.CacheResultsOptionNoneLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.CacheResultsOptionNoneLabel',
    defaultMessage: 'Do not cache',
  },
  [RestApiSettingsMessage.CacheResultsOptionOneMinuteLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.CacheResultsOptionOneMinuteLabel',
    defaultMessage: '1 minute',
  },
  [RestApiSettingsMessage.CacheResultsOptionFiveMinutesLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.CacheResultsOptionFiveMinutesLabel',
    defaultMessage: '5 minutes',
  },
  [RestApiSettingsMessage.CacheResultsOptionFifteenMinutesLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.CacheResultsOptionFifteenMinutesLabel',
    defaultMessage: '15 minutes',
  },
  [RestApiSettingsMessage.CacheResultsOptionOneHourLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.CacheResultsOptionOneHourLabel',
    defaultMessage: '1 hour',
  },
  [RestApiSettingsMessage.CacheResultsOptionEightHoursLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.CacheResultsOptionEightHoursLabel',
    defaultMessage: '8 hours',
  },
  [RestApiSettingsMessage.CacheResultsOptionOneDayLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.CacheResultsOptionOneDayLabel',
    defaultMessage: '1 day',
  },
  [RestApiSettingsMessage.CacheResultsOptionSevenDaysLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.CacheResultsOptionSevenDaysLabel',
    defaultMessage: '7 days',
  },
  [RestApiSettingsMessage.UsernameLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.UsernameLabel',
    defaultMessage: 'Username',
  },
  [RestApiSettingsMessage.UsernamePlaceholder]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.UsernamePlaceholder',
    defaultMessage: 'Username',
  },
  [RestApiSettingsMessage.PasswordLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.PasswordLabel',
    defaultMessage: 'Password',
  },
  [RestApiSettingsMessage.PasswordPlaceholder]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.PasswordPlaceholder',
    defaultMessage: 'Password',
  },
  [RestApiSettingsMessage.AuthenticationTokenLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.AuthenticationTokenLabel',
    defaultMessage: 'Authentication Token',
  },
  [RestApiSettingsMessage.AuthenticationTokenPlaceholder]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.RestApiSettings.AuthenticationTokenPlaceholder',
    defaultMessage: 'e.g. a JWT token',
  },
});
