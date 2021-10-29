import { defineMessages } from 'react-intl';

export enum FormSettingsMessage {
  FormLanguageHelper = 'FormLanguageHelper',
  FormLanguageLabel = 'FormLanguageLabel',
  FormLanguageNoSelection = 'FormLanguageNoSelection',
  FormLanguageManuallyTranslatedGroupLabel = 'FormLanguageManuallyTranslatedGroupLabel',
  FormLanguageAutoTranslatedGroupLabel = 'FormLanguageAutoTranslatedGroupLabel',
  IssueFormSelectLabelIssueType = 'IssueFormSelectLabelIssueType',
  IssueFormSelectLabelRequestType = 'IssueFormSelectLabelRequestType',
  IssueRequestTypePlaceholder = 'IssueRequestTypePlaceholder',
}

export const IntlFormSettingsMessages = defineMessages({
  [FormSettingsMessage.FormLanguageHelper]: {
    id: 'ui-form-builder.FormBuilderSettings.FormLanguageHelper',
    defaultMessage:
      'Set the language for validation messages and buttons on the form',
  },
  [FormSettingsMessage.FormLanguageLabel]: {
    id: 'ui-form-builder.FormBuilderSettings.FormLanguageLabel',
    defaultMessage: 'Language',
  },
  [FormSettingsMessage.FormLanguageNoSelection]: {
    id: 'ui-form-builder.FormBuilderSettings.FormLanguageNoSelection',
    defaultMessage: 'User language (if available)',
  },
  [FormSettingsMessage.FormLanguageManuallyTranslatedGroupLabel]: {
    id:
      'ui-form-builder.FormBuilderSettings.FormLanguageManuallyTranslatedGroupLabel',
    defaultMessage: 'Available',
  },
  [FormSettingsMessage.FormLanguageAutoTranslatedGroupLabel]: {
    id:
      'ui-form-builder.FormBuilderSettings.FormLanguageAutoTranslatedGroupLabel',
    defaultMessage: 'Auto Translated',
  },
  [FormSettingsMessage.IssueFormSelectLabelIssueType]: {
    id: 'ui-form-builder.FormBuilderSettings.IssueFormSelectLabelIssueType',
    defaultMessage: 'Issue Types',
  },
  [FormSettingsMessage.IssueFormSelectLabelRequestType]: {
    id: 'ui-form-builder.FormBuilderSettings.IssueFormSelectLabelRequestType',
    defaultMessage: 'Request Types',
  },
  [FormSettingsMessage.IssueRequestTypePlaceholder]: {
    id: 'ui-form-builder.FormBuilderSettings.IssueRequestTypePlaceholder',
    defaultMessage: 'All issue/request types',
  },
});
