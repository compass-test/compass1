import { defineMessages } from 'react-intl';

export enum FormActionsMessage {
  EditProjectForm = 'EditProjectForm',
  DownloadXlsx = 'DownloadXlsx',
  DeleteProjectForm = 'DeleteProjectForm',
  DownloadReady = 'DownloadReady',
  DownloadFlagAction = 'DownloadFlagAction',
  DownloadFlagInProgress = 'DownloadFlagInProgress',
  DownloadFlagPercentComplete = 'DownloadFlagPercentComplete',
  DownloadFlagReady = 'DownloadFlagReady',
  DownloadFlagStarting = 'DownloadFlagStarting',
  DownloadFlagComplete = 'DownloadFlagComplete',
  DownloadFlagError = 'DownloadFlagError',
  DownloadFlagClose = 'DownloadFlagClose',
  XlsxResponses = 'XlsxResponses',
  ExportInXlsx = 'ExportInXlsx',
  ExportWithJiraFields = 'ExportWithJiraFields',
  CopyTooltip = 'CopyTooltip',
  ExportForms = 'ExportForms',
  ResponsesXlsxDesc = 'ResponsesXlsxDesc',
  ResponsesXlsx = 'ResponsesXlsx',
  ResponsesJiraFieldsDesc = 'ResponsesJiraFieldsDesc',
  ResponsesJiraFields = 'ResponsesJiraFields',
  DeleteFormDesc = 'DeleteFormDesc',
  DeleteForm = 'DeleteForm',
  MoreOptions = 'MoreOptions',
}

export const IntlFormActionsMessages = defineMessages({
  [FormActionsMessage.EditProjectForm]: {
    id: 'jira-common.ListProjectForms.FormActions.EditProjectForm',
    defaultMessage: 'Edit project form',
  },
  [FormActionsMessage.DownloadXlsx]: {
    id: 'jira-common.ListProjectForms.FormActions.DownloadXlsx',
    defaultMessage: 'Download as *.xlsx spreadsheet',
  },
  [FormActionsMessage.DeleteProjectForm]: {
    id: 'jira-common.ListProjectForms.FormActions.DeleteProjectForm',
    defaultMessage: 'Delete project form',
  },
  [FormActionsMessage.DownloadReady]: {
    id: 'jira-common.ListProjectForms.FormActions.DownloadReady',
    defaultMessage: 'Download Ready',
  },
  [FormActionsMessage.DownloadFlagAction]: {
    id: 'jira-common.ListProjectForms.FormActions.DownloadFlagAction',
    defaultMessage: 'Download',
  },
  [FormActionsMessage.DownloadFlagInProgress]: {
    id: 'jira-common.ListProjectForms.FormActions.DownloadFlagInProgress',
    defaultMessage: 'Please wait while spreadsheet is generated.',
  },
  [FormActionsMessage.DownloadFlagStarting]: {
    id: 'jira-common.ListProjectForms.FormActions.DownloadFlagStarting',
    defaultMessage: 'Spreadsheet is downloading.',
  },
  [FormActionsMessage.DownloadFlagComplete]: {
    id: 'jira-common.ListProjectForms.FormActions.DownloadFlagComplete',
    defaultMessage: 'Spreadsheet downloaded.',
  },
  [FormActionsMessage.DownloadFlagPercentComplete]: {
    id: 'jira-common.ListProjectForms.FormActions.DownloadFlagPercentComplete',
    defaultMessage: '{percent}% complete',
  },
  [FormActionsMessage.DownloadFlagReady]: {
    id: 'jira-common.ListProjectForms.FormActions.DownloadFlagReady',
    defaultMessage: 'Spreadsheet is ready to download.',
    description:
      'Indicate that a spreadsheet is downloading in the users browser',
  },
  [FormActionsMessage.DownloadFlagError]: {
    id: 'jira-common.ListProjectForms.FormActions.DownloadFlagError',
    defaultMessage: 'Spreadsheet generation failed.',
  },
  [FormActionsMessage.DownloadFlagClose]: {
    id: 'jira-common.ListProjectForms.FormActions.DownloadFlagClose',
    defaultMessage: 'Close',
  },
  [FormActionsMessage.XlsxResponses]: {
    id: 'jira-common.ListProjectForms.FormActions.XlsxResponses',
    defaultMessage: 'XLSX Responses',
  },
  [FormActionsMessage.ExportInXlsx]: {
    id: 'jira-common.ListProjectForms.FormActions.ExportInXlsx',
    defaultMessage: 'Export in XLSX',
    description: 'Label for a link to export forms into an Excel spreadsheet',
  },
  [FormActionsMessage.ExportWithJiraFields]: {
    id: 'jira-common.ListProjectForms.FormActions.ExportWithJiraFields',
    defaultMessage: 'Export with Jira fields',
  },
  [FormActionsMessage.CopyTooltip]: {
    id: 'jira-common.ListProjectForms.FormActions.CopyTooltip',
    defaultMessage: 'Copy Form',
  },
  [FormActionsMessage.ExportForms]: {
    id: 'jira-common.ListProjectForms.FormActions.ExportForms',
    defaultMessage: 'Export Forms',
  },
  [FormActionsMessage.ResponsesXlsxDesc]: {
    id: 'jira-common.ListProjectForms.FormActions.ResponsesXlsxDesc',
    defaultMessage: 'Quick export in XLSX format',
  },
  [FormActionsMessage.ResponsesXlsx]: {
    id: 'jira-common.ListProjectForms.FormActions.ResponsesXlsx',
    defaultMessage: 'Responses (XLSX)',
  },
  [FormActionsMessage.ResponsesJiraFieldsDesc]: {
    id: 'jira-common.ListProjectForms.FormActions.ResponsesJiraFieldsDesc',
    defaultMessage: 'Use issue search to choose Jira fields',
  },
  [FormActionsMessage.ResponsesJiraFields]: {
    id: 'jira-common.ListProjectForms.FormActions.ResponsesJiraFields',
    defaultMessage: 'Responses with Jira fields',
  },
  [FormActionsMessage.DeleteFormDesc]: {
    id: 'jira-common.ListProjectForms.FormActions.DeleteFormDesc',
    defaultMessage: 'Existing forms on issues are unaffected',
  },
  [FormActionsMessage.DeleteForm]: {
    id: 'jira-common.ListProjectForms.FormActions.DeleteForm',
    defaultMessage: 'Delete Form',
  },
  [FormActionsMessage.MoreOptions]: {
    id: 'jira-common.ListProjectForms.FormActions.MoreOptions',
    defaultMessage: 'More options',
  },
});
