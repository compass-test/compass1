import { defineMessages } from 'react-intl';

export enum QuestionSidebarMessage {
  Title = 'Title',
  SubTitle = 'SubTitle',
  Type = 'Type',
  Label = 'Label',
  LabelPlaceholder = 'LabelPlaceholder',
  Section = 'Section',
  Description = 'Description',
  DescriptionPlaceholder = 'DescriptionPlaceholder',
  Choices = 'Choices',
  NewChoicePlaceholder = 'NewChoicePlaceholder',
  AddChoice = 'AddChoice',
  AddOther = 'AddOther',
  ChoiceOr = 'ChoiceOr',
  ShowAllChoices = 'ShowAllChoices',
  ShowFirstChoices = 'ShowFirstChoices',
  DefaultAnswer = 'DefaultAnswer',
  DefaultAnswerPlaceholder = 'DefaultAnswerPlaceholder',
  LinkedJiraField = 'LinkedJiraField',
  LinkedJiraFieldPlaceholder = 'LinkedJiraFieldPlaceholder',
  DoNotLink = 'DoNotLink',
  LoadingFields = 'LoadingFields',
  UnknownJiraField = 'UnknownJiraField',
  DataConnection = 'DataConnection',
  DataConnectionPlaceholder = 'DataConnectionPlaceholder',
  UnknownDataConnection = 'UnknownDataConnection',
  SearchTypesExplainedTitle = 'SearchTypesExplainedTitle',
  DefaultUserSearchType = 'DefaultUserSearchType',
  DefaultUserSearchTypeText1 = 'DefaultUserSearchTypeText1',
  DefaultUserSearchTypeText2 = 'DefaultUserSearchTypeText2',
  UnknownSearchType = 'UnknownSearchType',
  UsersWithBrowseProjectsSearchType = 'UsersWithBrowseProjectsSearchType',
  UsersWithBrowseProjectsSearchText = 'UsersWithBrowseProjectsSearchText',
  UserSearchType = 'UserSearchType',
  Validation = 'Validation',
  ReadOnly = 'ReadOnly',
  EditProperties = 'EditProperties',
  ValidationResponseRequired = 'ValidationResponseRequired',
  ValidationMatchRegex = 'ValidationMatchRegex',
  ValidationMinimum = 'ValidationMinimum',
  ValidationMinimumPlaceholder = 'ValidationMinimumPlaceholder',
  ValidationMaximum = 'ValidationMaximum',
  ValidationMaximumPlaceholder = 'ValidationMaximumPlaceholder',
  ValidationCharacters = 'ValidationCharacters',
  ValidationWords = 'ValidationWords',
  ValidationNumber = 'ValidationNumber',
  ValidationWholeNumber = 'ValidationWholeNumber',
  ValidationMinChoices = 'ValidationMinChoices',
  ValidationMaxChoices = 'ValidationMaxChoices',
  ValidationNumChoicesNone = 'ValidationNumChoicesNone',
  ValidationNumChoicesOptions = 'ValidationNumChoicesOptions',
  ValidationNumChoicesLoading = 'ValidationNumChoicesLoading',
  ValidationMinDate = 'ValidationMinDate',
  ValidationMinDatePlaceholder = 'ValidationMinDatePlaceholder',
  ValidationMaxDate = 'ValidationMaxDate',
  ValidationMaxDatePlaceholder = 'ValidationMaxDatePlaceholder',
  ValidationMinTime = 'ValidationMinTime',
  ValidationMinTimePlaceholder = 'ValidationMinTimePlaceholder',
  ValidationMaxTime = 'ValidationMaxTime',
  ValidationMaxTimePlaceholder = 'ValidationMaxTimePlaceholder',
  ValidationMinDateAndTime = 'ValidationMinDateAndTime',
  ValidationMaxDateAndTime = 'ValidationMaxDateAndTime',
  ValidationRegexPattern = 'ValidationRegexPattern',
  ValidationRegexExample = 'ValidationRegexExample',
  ValidationRegexMessage = 'ValidationRegexMessage',
  ValidationRegexPlaceholder = 'ValidationRegexPlaceholder',
  ValidationRequiredChoice = 'ValidationRequiredChoice',
  ValidationRequiredChoicePlaceholder = 'ValidationRequiredChoicePlaceholder',
  QuestionKey = 'Questionkey',
  QuestionKeyPlaceholder = 'QuestionKeyPlaceholder',
  QuestionKeyErrorMsg = 'QuestionKeyErrorMsg',
  InsightChoicesLimitTitle = 'InsightChoicesLimitTitle',
  InsightChoicesLimitMsg = 'InsightChoicesLimitMsg',
}

export const IntlQuestionSidebarMessages = defineMessages({
  [QuestionSidebarMessage.Title]: {
    id: 'form-builder.QuestionSidebar.Title',
    defaultMessage: 'Question',
  },
  [QuestionSidebarMessage.SubTitle]: {
    id: 'form-builder.QuestionSidebar.SubTitle',
    defaultMessage: 'Questions provide a place for answers to be filled in.',
  },
  [QuestionSidebarMessage.Type]: {
    id: 'form-builder.QuestionSidebar.Type',
    defaultMessage: 'Type',
  },
  [QuestionSidebarMessage.Label]: {
    id: 'form-builder.QuestionSidebar.Label',
    defaultMessage: 'Label',
  },
  [QuestionSidebarMessage.LabelPlaceholder]: {
    id: 'form-builder.QuestionSidebar.LabelPlaceholder',
    defaultMessage: 'No label',
  },
  [QuestionSidebarMessage.Section]: {
    id: 'form-builder.QuestionSidebar.Section',
    defaultMessage: 'Section',
  },
  [QuestionSidebarMessage.Description]: {
    id: 'form-builder.QuestionSidebar.Description',
    defaultMessage: 'Description',
  },
  [QuestionSidebarMessage.DescriptionPlaceholder]: {
    id: 'form-builder.QuestionSidebar.DescriptionPlaceholder',
    defaultMessage: 'No description',
  },
  [QuestionSidebarMessage.Choices]: {
    id: 'form-builder.QuestionSidebar.Choices',
    defaultMessage: 'Choices',
  },
  [QuestionSidebarMessage.NewChoicePlaceholder]: {
    id: 'form-builder.QuestionSidebar.NewChoicePlaceholder',
    defaultMessage: 'New Choice',
  },
  [QuestionSidebarMessage.AddChoice]: {
    id: 'form-builder.QuestionSidebar.AddChoice',
    defaultMessage: 'Add choice',
  },
  [QuestionSidebarMessage.AddOther]: {
    id: 'form-builder.QuestionSidebar.AddOther',
    defaultMessage: "Add 'Other...'",
  },
  [QuestionSidebarMessage.ChoiceOr]: {
    id: 'form-builder.QuestionSidebar.ChoiceOr',
    defaultMessage: 'or',
  },
  [QuestionSidebarMessage.ShowAllChoices]: {
    id: 'form-builder.QuestionSidebar.ShowAllChoices',
    defaultMessage: 'Show all {choicesLength} choices',
  },
  [QuestionSidebarMessage.ShowFirstChoices]: {
    id: 'form-builder.QuestionSidebar.ShowFirstChoices',
    defaultMessage: 'Show first {choicesLength} choices',
  },
  [QuestionSidebarMessage.DefaultAnswer]: {
    id: 'form-builder.QuestionSidebar.DefaultAnswer',
    defaultMessage: 'Default answer',
  },
  [QuestionSidebarMessage.DefaultAnswerPlaceholder]: {
    id: 'form-builder.QuestionSidebar.DefaultAnswerPlaceholder',
    defaultMessage: 'Pre-fill answer with a default',
  },
  [QuestionSidebarMessage.LinkedJiraField]: {
    id: 'form-builder.QuestionSidebar.LinkedJiraField',
    defaultMessage: 'Linked Jira Field',
  },
  [QuestionSidebarMessage.LinkedJiraFieldPlaceholder]: {
    id: 'form-builder.QuestionSidebar.LinkedJiraFieldPlaceholder',
    defaultMessage: 'Select a field',
  },
  [QuestionSidebarMessage.DoNotLink]: {
    id: 'form-builder.QuestionSidebar.DoNotLink',
    defaultMessage: 'Do not link',
  },
  [QuestionSidebarMessage.LoadingFields]: {
    id: 'form-builder.QuestionSidebar.LoadingFields',
    defaultMessage: 'Loading fields...',
  },
  [QuestionSidebarMessage.UnknownJiraField]: {
    id: 'form-builder.QuestionSidebar.UnknownJirafield',
    defaultMessage: 'Unknown Jira field: {jiraFieldKey}',
  },
  [QuestionSidebarMessage.DataConnection]: {
    id: 'form-builder.QuestionSidebar.DataConnection',
    defaultMessage: 'Data Connection',
  },
  [QuestionSidebarMessage.DataConnectionPlaceholder]: {
    id: 'form-builder.QuestionSidebar.DataConnectionPlaceholder',
    defaultMessage: 'Select a connection',
  },
  [QuestionSidebarMessage.UnknownDataConnection]: {
    id: 'form-builder.QuestionSidebar.UnknownDataConnection',
    defaultMessage: 'Unknown data connection: {dataConnectionId}',
  },
  [QuestionSidebarMessage.UnknownSearchType]: {
    id: 'form-builder.QuestionSidebar.UnknownSearchType',
    defaultMessage: 'Unknown search type: {searchTypeKey}',
  },
  [QuestionSidebarMessage.DefaultUserSearchType]: {
    id: 'form-builder.QuestionSidebar.DefaultUserSearchType',
    defaultMessage: 'Default Jira user search (Restricted)',
  },
  [QuestionSidebarMessage.SearchTypesExplainedTitle]: {
    id: 'form-builder.QuestionSidebar.SearchTypesExplainedTitle',
    defaultMessage: 'Search Types Explained',
  },
  [QuestionSidebarMessage.DefaultUserSearchTypeText1]: {
    id: 'form-builder.QuestionSidebar.DefaultUserSearchTypeText1',
    defaultMessage:
      'Only users with permission to access Jira can lookup other Jira users.',
  },
  [QuestionSidebarMessage.DefaultUserSearchTypeText2]: {
    id: 'form-builder.QuestionSidebar.DefaultUserSearchTypeText2',
    defaultMessage:
      'This search will NOT work for customers and anonymous users in the Jira Service Management portal.',
  },
  [QuestionSidebarMessage.UsersWithBrowseProjectsSearchType]: {
    id: 'form-builder.QuestionSidebar.UsersWithBrowseProjectsSearchType',
    defaultMessage: 'Users with Browse Project permission',
  },
  [QuestionSidebarMessage.UsersWithBrowseProjectsSearchText]: {
    id: 'form-builder.QuestionSidebar.UsersWithBrowseProjectsSearchText',
    defaultMessage:
      'Both Jira and Portal users can lookup Jira users who have the Browse project permission for this project.',
  },
  [QuestionSidebarMessage.UserSearchType]: {
    id: 'form-builder.QuestionSidebar.UserSearchType',
    defaultMessage: 'User Search Type',
  },
  [QuestionSidebarMessage.Validation]: {
    id: 'form-builder.QuestionSidebar.Validation',
    defaultMessage: 'Validation',
  },
  [QuestionSidebarMessage.ReadOnly]: {
    id: 'form-builder.QuestionSidebar.ReadOnly',
    defaultMessage: 'Read only',
  },
  [QuestionSidebarMessage.EditProperties]: {
    id: 'form-builder.QuestionSidebar.EditProperties',
    defaultMessage: 'Edit Properties',
  },
  [QuestionSidebarMessage.ValidationResponseRequired]: {
    id: 'form-builder.QuestionSidebar.ValidationResponseRequired',
    defaultMessage: 'Response required',
  },
  [QuestionSidebarMessage.ValidationMatchRegex]: {
    id: 'form-builder.QuestionSidebar.ValidationMatchRegex',
    defaultMessage: 'Must match regex pattern',
  },
  [QuestionSidebarMessage.ValidationMinimum]: {
    id: 'form-builder.QuestionSidebar.ValidationMinimum',
    defaultMessage: 'Minimum',
  },
  [QuestionSidebarMessage.ValidationMinimumPlaceholder]: {
    id: 'form-builder.QuestionSidebar.ValidationMinimumPlaceholder',
    defaultMessage: 'No min',
  },
  [QuestionSidebarMessage.ValidationMaximum]: {
    id: 'form-builder.QuestionSidebar.ValidationMaximum',
    defaultMessage: 'Maximum',
  },
  [QuestionSidebarMessage.ValidationMaximumPlaceholder]: {
    id: 'form-builder.QuestionSidebar.ValidationMaximumPlaceholder',
    defaultMessage: 'No max',
  },
  [QuestionSidebarMessage.ValidationCharacters]: {
    id: 'form-builder.QuestionSidebar.ValidationCharacters',
    defaultMessage: 'Characters',
  },
  [QuestionSidebarMessage.ValidationWords]: {
    id: 'form-builder.QuestionSidebar.ValidationWords',
    defaultMessage: 'Words',
  },
  [QuestionSidebarMessage.ValidationNumber]: {
    id: 'form-builder.QuestionSidebar.ValidationNumber',
    defaultMessage: 'Number',
  },
  [QuestionSidebarMessage.ValidationWholeNumber]: {
    id: 'form-builder.QuestionSidebar.ValidationWholeNumber',
    defaultMessage: 'Whole numbers only',
  },
  [QuestionSidebarMessage.ValidationMinChoices]: {
    id: 'form-builder.QuestionSidebar.ValidationMinChoices',
    defaultMessage: 'Minimum number of choices',
  },
  [QuestionSidebarMessage.ValidationMaxChoices]: {
    id: 'form-builder.QuestionSidebar.ValidationMaxChoices',
    defaultMessage: 'Maximum number of choices',
  },
  [QuestionSidebarMessage.ValidationNumChoicesNone]: {
    id: 'form-builder.QuestionSidebar.ValidationNumChoicesNone',
    defaultMessage: 'None',
  },
  [QuestionSidebarMessage.ValidationNumChoicesOptions]: {
    id: 'form-builder.QuestionSidebar.ValidationNumChoicesOptions',
    defaultMessage: 'Options',
  },
  [QuestionSidebarMessage.ValidationNumChoicesLoading]: {
    id: 'form-builder.QuestionSidebar.ValidationNumChoicesLoading',
    defaultMessage: 'Loading...',
  },
  [QuestionSidebarMessage.ValidationMinDate]: {
    id: 'form-builder.QuestionSidebar.ValidationMinDate',
    defaultMessage: 'Earliest date',
  },
  [QuestionSidebarMessage.ValidationMinDatePlaceholder]: {
    id: 'form-builder.QuestionSidebar.ValidationMinDatePlaceholder',
    defaultMessage: 'No minimum date',
  },
  [QuestionSidebarMessage.ValidationMaxDate]: {
    id: 'form-builder.QuestionSidebar.ValidationMaxDate',
    defaultMessage: 'Latest date',
  },
  [QuestionSidebarMessage.ValidationMaxDatePlaceholder]: {
    id: 'form-builder.QuestionSidebar.ValidationMaxDatePlaceholder',
    defaultMessage: 'No maximum date',
  },
  [QuestionSidebarMessage.ValidationMinTime]: {
    id: 'form-builder.QuestionSidebar.ValidationMinTime',
    defaultMessage: 'Earliest time',
  },
  [QuestionSidebarMessage.ValidationMinTimePlaceholder]: {
    id: 'form-builder.QuestionSidebar.ValidationMinTimePlaceholder',
    defaultMessage: 'No minimum time',
  },
  [QuestionSidebarMessage.ValidationMaxTime]: {
    id: 'form-builder.QuestionSidebar.ValidationMaxTime',
    defaultMessage: 'Latest time',
  },
  [QuestionSidebarMessage.ValidationMaxTimePlaceholder]: {
    id: 'form-builder.QuestionSidebar.ValidationMaxTimePlaceholder',
    defaultMessage: 'No maximum time',
  },
  [QuestionSidebarMessage.ValidationMinDateAndTime]: {
    id: 'form-builder.QuestionSidebar.ValidationMinDateAndTime',
    defaultMessage: 'Earliest date & time',
  },
  [QuestionSidebarMessage.ValidationMaxDateAndTime]: {
    id: 'form-builder.QuestionSidebar.ValidationMaxDateAndTime',
    defaultMessage: 'Latest date & time',
  },
  [QuestionSidebarMessage.ValidationRegexPattern]: {
    id: 'form-builder.QuestionSidebar.ValidationRegexPattern',
    defaultMessage: 'Regex: Pattern',
  },
  [QuestionSidebarMessage.ValidationRegexExample]: {
    id: 'form-builder.QuestionSidebar.ValidationRegexExample',
    defaultMessage: 'examples',
  },
  [QuestionSidebarMessage.ValidationRegexMessage]: {
    id: 'form-builder.QuestionSidebar.ValidationRegexMessage',
    defaultMessage: 'Regex: Message if input is invalid',
  },
  [QuestionSidebarMessage.ValidationRegexPlaceholder]: {
    id: 'form-builder.QuestionSidebar.ValidationRegexPlaceholder',
    defaultMessage: 'e.g. \\d+',
  },
  [QuestionSidebarMessage.ValidationRequiredChoice]: {
    id: 'form-builder.QuestionSidebar.ValidationRequiredChoice',
    defaultMessage: 'Required choice',
  },
  [QuestionSidebarMessage.ValidationRequiredChoicePlaceholder]: {
    id: 'form-builder.QuestionSidebar.ValidationRequiredChoicePlaceholder',
    defaultMessage: 'Select a required choice',
  },
  [QuestionSidebarMessage.QuestionKey]: {
    id: 'form-builder.QuestionSidebar.QuestionKey',
    defaultMessage: 'Question Key',
  },
  [QuestionSidebarMessage.QuestionKeyPlaceholder]: {
    id: 'form-builder.QuestionSidebar.QuestionKeyPlaceholder',
    defaultMessage: 'No question key',
  },
  [QuestionSidebarMessage.QuestionKeyErrorMsg]: {
    id: 'form-builder.QuestionSidebar.QuestionKeyErrorMsg',
    defaultMessage:
      'This question key is in use on another question on this form',
  },
  [QuestionSidebarMessage.InsightChoicesLimitTitle]: {
    id: 'form-builder.QuestionSidebar.InsightChoicesLimitTitle',
    defaultMessage: 'Linked Insight Choices Limit',
  },
  [QuestionSidebarMessage.InsightChoicesLimitMsg]: {
    id: 'form-builder.QuestionSidebar.InsightChoicesLimitMsg',
    defaultMessage:
      'This question will not display more than {insightChoicesLimit} choices. If there are more choices, the person filling out the form will not be able to choose them.',
  },
});
