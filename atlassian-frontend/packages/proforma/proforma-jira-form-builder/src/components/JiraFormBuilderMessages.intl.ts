import { defineMessages } from 'react-intl';

export enum FormBuilderMessage {
  SettingsTabHeading = 'SettingsTabHeading',
  PreviewTabHeading = 'PreviewTabHeading',
  PreviewTabHeaderBar = 'PreviewTabHeaderBar',
  CommonJiraFieldsLabel = 'CommonJiraFieldsLabel',
  OtherJiraFieldsLabel = 'OtherJiraFieldsLabel',
}

export const IntlFormBuilderMessages = defineMessages({
  [FormBuilderMessage.SettingsTabHeading]: {
    id: 'ui-form-builder.FormBuilder.SettingsTabHeading',
    defaultMessage: 'Settings',
  },
  [FormBuilderMessage.PreviewTabHeading]: {
    id: 'ui-form-builder.FormBuilder.PreviewTabHeading',
    defaultMessage: 'Preview',
  },
  [FormBuilderMessage.PreviewTabHeaderBar]: {
    id: 'ui-form-builder.FormBuilder.PreviewTabHeaderBar',
    defaultMessage: 'Editing Form',
  },
  [FormBuilderMessage.CommonJiraFieldsLabel]: {
    id: 'ui-form-builder.FormBuilder.CommonJiraFieldsLabel',
    defaultMessage: 'Common Jira fields',
  },
  [FormBuilderMessage.OtherJiraFieldsLabel]: {
    id: 'ui-form-builder.FormBuilder.OtherJiraFieldsLabel',
    defaultMessage: 'Other Jira fields',
  },
});
