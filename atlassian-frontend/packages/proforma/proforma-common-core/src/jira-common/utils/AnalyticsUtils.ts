export interface AnalyticsTrackData {
  formFormat?: 'ADF';
  projectId?: number;
  setting?: string;
  exportType?: string;
  templateCategory?: string;
  templateLanguage?: string;
  jiraField?: string;
  templateId?: string;
  questionType?: string;
  requestTypes?: string;
  portalForm?: boolean;
  issueForm?: boolean;
}

export interface AnalyticsUtils {
  track(event: AnalyticsEventName, data: AnalyticsTrackData): void;
}

/* These events are legacy, do not add any more to this list. */
export enum AnalyticsEventName {
  SubmitForm = 'SubmitForm',
  DownloadPDF = 'DownloadPDF',
  MakeFormInternal = 'MakeFormInternal',
  MakeFormExternal = 'MakeFormExternal',
  ViewedDisabledProject = 'ViewedDisabledProject',
  DeleteForm = 'DeleteForm',
  ReopenForm = 'ReopenForm',
  AddForm = 'AddForm',
  EditForm = 'EditForm',
  CreateForm = 'CreateForm',
  LiteLimitExceeded = 'LiteLimitExceeded',

  AutomationAddRule = 'AutomationAddRule',
  AutomationDeleteRule = 'AutomationDeleteRule',
  AutomationEditRule = 'AutomationEditRule',

  BuilderChangeQuestion = 'BuilderChangeQuestion',
  BuilderEditTemplate = 'BuilderEditTemplate',
  BuilderFilterTemplates = 'BuilderFilterTemplates',
  BuilderInsertImage = 'BuilderInsertImage',
  BuilderInsertQuestion = 'BuilderInsertQuestion',
  BuilderInsertTemplate = 'BuilderInsertTemplate',
  BuilderLinkJiraField = 'BuilderLinkJiraField',
  BuilderOpenTemplateSidebar = 'BuilderOpenTemplateSidebar',
  BuilderPreviewTemplate = 'BuilderPreviewTemplate',
  BuilderSaveForm = 'BuilderSaveForm',
  BuilderSetQuestionKey = 'BuilderSetQuestionKey',
  BuilderSetRegexValidation = 'BuilderSetRegexValidation',
  BuilderSetSectionConditions = 'BuilderSetSectionConditions',
  BuilderUseDataConnection = 'BuilderUserDataConnection',

  ConfigurationToggleAllowHTML = 'ConfigurationToggleAllowHTML',
  ConfigurationToggleAnalytics = 'ConfigurationToggleAnalytics',
  ConfigurationToggleDefaultSetting = 'ConfigurationToggleDefaultSetting',
  ConfigurationToggleIssueForms = 'ConfigurationToggleIssueForms',

  ConnectionsAddConnection = 'ConnectionsAddConnection',
  ConnectionsDeleteConnection = 'ConnectionsDeleteConnection',
  ConnectionsEditConnection = 'ConnectionsEditConnection',

  ExportAllResponses = 'ExportAllResponses',
  ExportAllResponsesWithJiraFields = 'ExportAllResponsesWithJiraFields',
  ExportApiClicked = 'ExportAPIClicked',
  ExportSingleResponse = 'ExportSingleResponse',

  FormSettingsSetIssueForm = 'FormSettingsSetIssueForm',
  FormSettingsSetLanguage = 'FormSettingsSetLanguage',
  FormSettingsSetOnSubmission = 'FormSettingsSetOnSubmission',
  FormSettingsSetPortalForm = 'FormSettingsSetPortalForm',
  FormSettingsSetRecommendedForm = 'FormSettingsSetRecommendedForm',

  FormsListDeleteForm = 'FormsListDeleteForm',

  GettingStartedViewedPage = 'GettingStartedViewedPage',

  IssueCreateDirect = 'IssueCreateDirect',
  IssueViewForm = 'IssueViewForm',

  PortalCreateForm = 'PortalCreateForm',
  PortalViewForm = 'PortalViewForm',
}
