import { defineMessages } from 'react-intl';

export enum TestConnectionMessage {
  TestingConnectionTo = 'TestingConnectionTo',
  HttpResponse = 'HttpResponse',
  SummaryTabLabel = 'SummaryTabLabel',
  ResponseTabLabel = 'ResponseTabLabel',
  RequestTabLabel = 'RequestTabLabel',
  SuccessMessage = 'SuccessMessage',
  MovedMessage = 'MovedMessage',
  RemovedMessage = 'RemovedMessage',
  ResponseSuccessTitle = 'ResponseSuccessTitle',
  ResponseSuccessPara1 = 'ResponseSuccessPara1',
  ResponseRedirectionTitle = 'ResponseRedirectionTitle',
  ResponseUnauthorisedTitle = 'ResponseUnauthorisedTitle',
  ResponseUnauthorisedPara1 = 'ResponseUnauthorisedPara1',
  ResponseForbiddenTitle = 'ResponseForbiddenTitle',
  ResponseForbiddenPara1 = 'ResponseForbiddenPara1',
  ResponseNotFoundTitle = 'ResponseNotFoundTitle',
  ResponseNotFoundPara1 = 'ResponseNotFoundPara1',
  Response496Title = 'Response496Title',
  Response496Para1 = 'Response496Para1',
  Response497Title = 'Response497Title',
  Response497Para1Part1 = 'Response497Para1Part1',
  Response497Para1Part2 = 'Response497Para1Part2',
  Response497Para1Part3 = 'Response497Para1Part3',
  Response497Para2Part1 = 'Response497Para2Part1',
  Response497Para2Part2 = 'Response497Para2Part2',
  Response497Para2Part3 = 'Response497Para2Part3',
  Response498Title = 'Response498Title',
  Response498Para1 = 'Response498Para1',
  Response499Title = 'Response499Title',
  Response499Para1 = 'Response499Para1',
  ResponseBadGatewayTitle = 'ResponseBadGatewayTitle',
  ResponseBadGatewayPara1 = 'ResponseBadGatewayPara1',
  ResponseGatewayTimeoutTitle = 'ResponseGatewayTimeoutTitle',
  ResponseGatewayTimeoutPara1 = 'ResponseGatewayTimeoutPara1',
  ResponseOtherErrorPara1 = 'ResponseOtherErrorPara1',
}

export const IntlTestConnectionMessages = defineMessages({
  [TestConnectionMessage.TestingConnectionTo]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.TestingConnectionTo',
    defaultMessage: 'Testing connection to {source}',
  },
  [TestConnectionMessage.HttpResponse]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.HttpResponse',
    defaultMessage: 'HTTP Response: {responseCode}',
  },
  [TestConnectionMessage.SummaryTabLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.SummaryTabLabel',
    defaultMessage: 'Summary',
  },
  [TestConnectionMessage.ResponseTabLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseTabLabel',
    defaultMessage: 'Response',
  },
  [TestConnectionMessage.RequestTabLabel]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.RequestTabLabel',
    defaultMessage: 'Request',
  },
  [TestConnectionMessage.SuccessMessage]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.SuccessMessage',
    defaultMessage: 'OK',
  },
  [TestConnectionMessage.MovedMessage]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.MovedMessage',
    defaultMessage: 'Warning',
  },
  [TestConnectionMessage.RemovedMessage]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.RemovedMessage',
    defaultMessage: 'Error',
  },
  [TestConnectionMessage.ResponseSuccessTitle]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseSuccessTitle',
    defaultMessage: 'Connection Successful',
  },
  [TestConnectionMessage.ResponseSuccessPara1]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseSuccessPara1',
    defaultMessage:
      'ProForma successfully retrieved data from this connection.',
  },
  [TestConnectionMessage.ResponseRedirectionTitle]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseRedirectionTitle',
    defaultMessage: 'Connection Failed',
  },
  [TestConnectionMessage.ResponseUnauthorisedTitle]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseUnauthorisedTitle',
    defaultMessage: 'Authentication failed',
  },
  [TestConnectionMessage.ResponseUnauthorisedPara1]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseUnauthorisedPara1',
    defaultMessage:
      'ProForma was unable to connect because authentication failed. Please go back and check that username and password have been specified correctly.',
  },
  [TestConnectionMessage.ResponseForbiddenTitle]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseForbiddenTitle',
    defaultMessage: 'Forbidden',
  },
  [TestConnectionMessage.ResponseForbiddenPara1]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseForbiddenPara1',
    defaultMessage:
      'Please go back and check that the connection details have been specified correctly.',
  },
  [TestConnectionMessage.ResponseNotFoundTitle]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseNotFoundTitle',
    defaultMessage: 'Page not found',
  },
  [TestConnectionMessage.ResponseNotFoundPara1]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseNotFoundPara1',
    defaultMessage:
      'ProForma was unable to connect because the page was not found. Please go back and check that the connection details have been specified correctly.',
  },
  [TestConnectionMessage.Response496Title]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.Response496Title',
    defaultMessage: 'Blocked URL',
  },
  [TestConnectionMessage.Response496Para1]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.Response496Para1',
    defaultMessage:
      'ProForma does not allow access to this URL for security reasons. Please go back and check that the connection details have been specified correctly.',
  },
  [TestConnectionMessage.Response497Title]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.Response497Title',
    defaultMessage: 'Jira Whitelist Enabled',
  },
  [TestConnectionMessage.Response497Para1Part1]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.Response497Para1Part1',
    defaultMessage: 'ProForma could not connect to the page because the Jira',
  },
  [TestConnectionMessage.Response497Para1Part2]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.Response497Para1Part2',
    defaultMessage: 'whitelist',
  },
  [TestConnectionMessage.Response497Para1Part3]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.Response497Para1Part3',
    defaultMessage:
      'is enabled and the URL does not match any of the whitelist rules.',
  },
  [TestConnectionMessage.Response497Para2Part1]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.Response497Para2Part1',
    defaultMessage: 'Refer to',
  },
  [TestConnectionMessage.Response497Para2Part2]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.Response497Para2Part2',
    defaultMessage: 'the Atlassian documentation',
  },
  [TestConnectionMessage.Response497Para2Part3]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.Response497Para2Part3',
    defaultMessage: 'for more information.',
  },
  [TestConnectionMessage.Response498Title]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.Response498Title',
    defaultMessage: 'Invalid JSON document',
  },
  [TestConnectionMessage.Response498Para1]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.Response498Para1',
    defaultMessage:
      'ProForma was able to connect to the page but the data returned does not appear to be a valid JSON document.',
  },
  [TestConnectionMessage.Response499Title]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.Response499Title',
    defaultMessage: 'Maximum body length exceeded',
  },
  [TestConnectionMessage.Response499Para1]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.Response499Para1',
    defaultMessage:
      "ProForma was able to connect to the page but the page length exceeds ProForma's limit of 10MB.",
  },
  [TestConnectionMessage.ResponseBadGatewayTitle]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseBadGatewayTitle',
    defaultMessage: 'Bad Gateway',
  },
  [TestConnectionMessage.ResponseBadGatewayPara1]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseBadGatewayPara1',
    defaultMessage:
      'ProForma was unable to connect to the page. Please go back and check that the connection details have been specified correctly.',
  },
  [TestConnectionMessage.ResponseGatewayTimeoutTitle]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseGatewayTimeoutTitle',
    defaultMessage: 'Gateway Timeout',
  },
  [TestConnectionMessage.ResponseGatewayTimeoutPara1]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseGatewayTimeoutPara1',
    defaultMessage:
      'ProForma attempted to connect to the page but the request timed out after 30 seconds. Please go back and check that the connection details have been specified correctly.',
  },
  [TestConnectionMessage.ResponseOtherErrorPara1]: {
    id:
      'ui-admin.AdminConnections.ModifyConnection.TestConnection.ResponseOtherErrorPara1',
    defaultMessage: 'Unexpected error during connection.',
  },
});
