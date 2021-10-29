import { defineMessages } from 'react-intl';
//
// ─── INTERFACES ─────────────────────────────────────────────────────────────────
//
export enum ApiErrorMessage {
  UnauthorisedTitle = 'UnauthorisedTitle',
  UnauthorisedMsg = 'UnauthorisedMsg',
  LiteExceededTitle = 'LiteExceededTitle',
  LiteExceededMsg = 'LiteExceededMsg',
  FullUnlicensedTitle = 'FullUnlicensedTitle',
  FullUnlicensedMsg = 'FullUnlicensedMsg',
  MissingPermissionsTitle = 'MissingPermissionsTitle',
  MissingPermissionsMsg = 'MissingPermissionsMsg',
  NotFoundTitle = 'NotFoundTitle',
  NotFoundMsg = 'NotFoundMsg',
  AddConnectionFailedTitle = 'AddConnectionFailedTitle',
  AddConnectionFailedMsg = 'AddConnectionFailedMsg',
  UpdateConnectionFailedTitle = 'UpdateConnectionFailedTitle',
  UpdateConnectionFailedMsg = 'UpdateConnectionFailedMsg',
  AddFormFailedTitle = 'AddFormFailedTitle',
  SubmitFormFailedTitle = 'SubmitFormFailedTitle',
  SubmitFormFailedMsg = 'SubmitFormFailedMsg',
  SaveFormFailedTitle = 'SaveFormFailedTitle',
  SaveFormFailedMsg = 'SaveFormFailedMsg',
  CreateIssueFailedTitle = 'CreateIssueFailedTitle',
  CreateIssueFailedMsg = 'CreateIssueFailedMsg',
  SaveTemplateFormFailedTitle = 'SaveTemplateFormFailedTitle',
  SaveTemplateFormFailedMsg = 'SaveTemplateFormFailedMsg',
  LoadTemplateFormFailedTitle = 'LoadTemplateFormFailedTitle',
  LoadTemplateFormFailedMsg = 'LoadTemplateFormFailedMsg',
  LoadJiraFieldsFailedTitle = 'LoadJiraFieldsFailedTitle',
  LoadJiraFieldsFailedMsg = 'LoadJiraFieldsFailedMsg',
  LoadDataConnectionsFailedTitle = 'LoadDataConnectionsFailedTitle',
  LoadDataConnectionsFailedMsg = 'LoadDataConnectionsFailedMsg',
  LoadHtmlSettingsFailedTitle = 'LoadHtmlSettingsFailedTitle',
  LoadHtmlSettingsFailedMsg = 'LoadHtmlSettingsFailedMsg',
  LoadSettingsRefDataFailedTitle = 'LoadSettingsRefDataFailedTitle',
  LoadSettingsRefDataFailedMsg = 'LoadSettingsRefDataFailedMsg',
  LoadAutomationRulesFailedTitle = 'LoadAutomationRulesFailedTitle',
  LoadAutomationRulesFailedMsg = 'LoadAutomationRulesFailedMsg',
  AddAutomationRuleFailedTitle = 'AddAutomationRuleFailedTitle',
  AddAutomationRuleFailedMsg = 'AddAutomationRuleFailedMsg',
  UpdateAutomationRuleFailedTitle = 'UpdateAutomationRuleFailedTitle',
  UpdateAutomationRuleFailedMsg = 'UpdateAutomationRuleFailedMsg',
  DeleteAutomationRuleFailedTitle = 'DeleteAutomationRuleFailedTitle',
  DeleteAutomationRuleFailedMsg = 'DeleteAutomationRuleFailedMsg',
}

export const IntlApiErrorMessages = defineMessages({
  [ApiErrorMessage.UnauthorisedTitle]: {
    id: 'ui-notices.apiError.title.UnauthorisedTitle',
    defaultMessage: 'Error: User Unauthorised',
  },
  [ApiErrorMessage.UnauthorisedMsg]: {
    id: 'ui-notices.apiError.msg.UnauthorisedMsg',
    defaultMessage: 'Try refreshing your page or logging into Jira again.',
  },
  [ApiErrorMessage.LiteExceededTitle]: {
    id: 'ui-notices.apiError.title.LiteExceededTitle',
    defaultMessage: 'ProForma Lite: Form Template Limit Reached',
  },
  [ApiErrorMessage.LiteExceededMsg]: {
    id: 'ui-notices.apiError.msg.LiteExceededMsg',
    defaultMessage:
      'Unfortunately three form templates already exist in Jira. Upgrade to the paid version of ProForma to build an unlimited number of templates and to access more features, such user lookup questions and data export functionality.',
  },
  [ApiErrorMessage.FullUnlicensedTitle]: {
    id: 'ui-notices.apiError.title.FullUnlicensedTitle',
    defaultMessage: 'ProForma: No license found',
  },
  [ApiErrorMessage.FullUnlicensedMsg]: {
    id: 'ui-notices.apiError.msg.FullUnlicensedMsg',
    defaultMessage:
      'Could not retrieve ProForma license details from Jira, most functionality of ProForma will be disabled. Please purchase ProForma or arrange a trial license.',
  },
  [ApiErrorMessage.MissingPermissionsTitle]: {
    id: 'ui-notices.apiError.title.MissingPermissionsTitle',
    defaultMessage: 'Error: User is not allowed this action',
  },
  [ApiErrorMessage.MissingPermissionsMsg]: {
    id: 'ui-notices.apiError.msg.MissingPermissionsMsg',
    defaultMessage:
      'You do not have the necessary permissions to perform this action. Please contact your Jira Administrator.',
  },
  [ApiErrorMessage.NotFoundTitle]: {
    id: 'ui-notices.apiError.title.NotFoundTitle',
    defaultMessage: 'Error: Not Found',
  },
  [ApiErrorMessage.NotFoundMsg]: {
    id: 'ui-notices.apiError.msg.NotFoundMsg',
    defaultMessage: 'The requested resource was not found.',
  },
  [ApiErrorMessage.AddConnectionFailedTitle]: {
    id: 'ui-notices.apiError.title.AddConnectionFailedTitle',
    defaultMessage: 'Error: Adding data connection failed',
  },
  [ApiErrorMessage.AddConnectionFailedMsg]: {
    id: 'ui-notices.apiError.msg.AddConnectionFailedMsg',
    defaultMessage:
      'A server error occured while trying to add the data connection.',
  },
  [ApiErrorMessage.UpdateConnectionFailedTitle]: {
    id: 'ui-notices.apiError.title.UpdateConnectionFailedTitle',
    defaultMessage: 'Error: Updating data connection failed',
  },
  [ApiErrorMessage.UpdateConnectionFailedMsg]: {
    id: 'ui-notices.apiError.msg.UpdateConnectionFailedMsg',
    defaultMessage:
      'A server error occurred while trying to update the data connection.',
  },
  [ApiErrorMessage.SubmitFormFailedTitle]: {
    id: 'ui-notices.apiError.title.SubmitFormFailedTitle',
    defaultMessage: 'Error: Submitting form failed',
  },
  [ApiErrorMessage.SubmitFormFailedMsg]: {
    id: 'ui-notices.apiError.msg.SubmitFormFailedMsg',
    defaultMessage: 'A server error occurred while trying to submit the form.',
  },
  [ApiErrorMessage.SaveFormFailedTitle]: {
    id: 'ui-notices.apiError.title.SaveFormFailedTitle',
    defaultMessage: 'Error: Saving form failed',
  },
  [ApiErrorMessage.SaveFormFailedMsg]: {
    id: 'ui-notices.apiError.msg.SaveFormFailedMsg',
    defaultMessage: 'A server error occurred while trying to save the form.',
  },
  [ApiErrorMessage.CreateIssueFailedTitle]: {
    id: 'ui-notices.apiError.title.CreateIssueFailedTitle',
    defaultMessage: 'Error: Creating Jira failed.',
  },
  [ApiErrorMessage.CreateIssueFailedMsg]: {
    id: 'ui-notices.apiError.msg.CreateIssueFailedMsg',
    defaultMessage: 'A server error occurred while trying create the issue.',
  },
  [ApiErrorMessage.SaveTemplateFormFailedTitle]: {
    id: 'ui-notices.apiError.title.SaveTemplateFormFailedTitle',
    defaultMessage: 'Error: Saving template form failed',
  },
  [ApiErrorMessage.SaveTemplateFormFailedMsg]: {
    id: 'ui-notices.apiError.msg.SaveTemplateFormFailedMsg',
    defaultMessage:
      'A server error occurred while trying to save the template form.',
  },
  [ApiErrorMessage.LoadTemplateFormFailedTitle]: {
    id: 'ui-notices.apiError.title.LoadTemplateFormFailedTitle',
    defaultMessage: 'Error: Loading template form failed',
  },
  [ApiErrorMessage.LoadTemplateFormFailedMsg]: {
    id: 'ui-notices.apiError.msg.LoadTemplateFormFailedMsg',
    defaultMessage:
      'A server error occurred while trying to load the template form.',
  },
  [ApiErrorMessage.LoadJiraFieldsFailedTitle]: {
    id: 'ui-notices.apiError.title.LoadJiraFieldsFailedTitle',
    defaultMessage: 'Error: Loading Jira fields failed',
  },
  [ApiErrorMessage.LoadJiraFieldsFailedMsg]: {
    id: 'ui-notices.apiError.msg.LoadJiraFieldsFailedMsg',
    defaultMessage:
      'A server error occurred while trying to load Jira fields on the template form.',
  },
  [ApiErrorMessage.LoadDataConnectionsFailedTitle]: {
    id: 'ui-notices.apiError.title.LoadDataConnectionsFailedTitle',
    defaultMessage: 'Error: Loading data connections failed.',
  },
  [ApiErrorMessage.LoadDataConnectionsFailedMsg]: {
    id: 'ui-notices.apiError.msg.LoadDataConnectionsFailedMsg',
    defaultMessage:
      'A server error occurred while trying to load data connections on the template form.',
  },
  [ApiErrorMessage.LoadHtmlSettingsFailedTitle]: {
    id: 'ui-notices.apiError.title.LoadHtmlSettingsFailedTitle',
    defaultMessage: 'Error: Loading HTML settings failed.',
  },
  [ApiErrorMessage.LoadHtmlSettingsFailedMsg]: {
    id: 'ui-notices.apiError.msg.LoadHtmlSettingsFailedMsg',
    defaultMessage:
      'A server error occurred while trying to load HTML settings for the template form.',
  },
  [ApiErrorMessage.LoadSettingsRefDataFailedTitle]: {
    id: 'ui-notices.apiError.title.LoadSettingsRefDataFailedTitle',
    defaultMessage: 'Error: Loading form settings reference data failed.',
  },
  [ApiErrorMessage.LoadSettingsRefDataFailedMsg]: {
    id: 'ui-notices.apiError.msg.LoadSettingsRefDataFailedMsg',
    defaultMessage:
      "A server error occurred while trying to load the reference for the template form's settings.",
  },
  [ApiErrorMessage.LoadAutomationRulesFailedTitle]: {
    id: 'ui-notices.apiError.title.LoadAutomationRulesFailedTitle',
    defaultMessage: 'Error: Loading automation rules failed.',
  },
  [ApiErrorMessage.LoadAutomationRulesFailedMsg]: {
    id: 'ui-notices.apiError.msg.LoadAutomationRulesFailedMsg',
    defaultMessage:
      'A server error occurred while trying to load the automation rules for the form',
  },
  [ApiErrorMessage.AddAutomationRuleFailedTitle]: {
    id: 'ui-notices.apiError.title.AddAutomationRuleFailedTitle',
    defaultMessage: 'Error: Adding automation rule failed.',
  },
  [ApiErrorMessage.AddAutomationRuleFailedMsg]: {
    id: 'ui-notices.apiError.msg.AddAutomationRuleFailedMsg',
    defaultMessage:
      'A server error occurred while trying to add an automation rule to the form.',
  },
  [ApiErrorMessage.UpdateAutomationRuleFailedTitle]: {
    id: 'ui-notices.apiError.title.UpdateAutomationRuleFailedTitle',
    defaultMessage: 'Error: Updating automation rule failed.',
  },
  [ApiErrorMessage.UpdateAutomationRuleFailedMsg]: {
    id: 'ui-notices.apiError.msg.UpdateAutomationRuleFailedMsg',
    defaultMessage:
      'A server error occurred while trying to update an automation rule.',
  },
  [ApiErrorMessage.DeleteAutomationRuleFailedTitle]: {
    id: 'ui-notices.apiError.title.DeleteAutomationRuleFailedTitle',
    defaultMessage: 'Error: Deleting automation rule failed.',
  },
  [ApiErrorMessage.DeleteAutomationRuleFailedMsg]: {
    id: 'ui-notices.apiError.msg.DeleteAutomationRuleFailedMsg',
    defaultMessage:
      'A server error occurred while trying to delete an automation rule',
  },
});
