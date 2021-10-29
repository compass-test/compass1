import { defineMessages } from 'react-intl';

export enum ActionSectionMessage {
  SelectLabelAllowDuplicates = 'SelectLabelAllowDuplicates',
  SelectLabelNoDuplicates = 'SelectLabelNoDuplicates',
  SelectLabelInternal = 'SelectLabelInternal',
  SelectLabelExternal = 'SelectLabelExternal',
}

export const IntlActionSectionMessages = defineMessages({
  [ActionSectionMessage.SelectLabelAllowDuplicates]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ActionSection.SelectLabelAllowDuplicates',
    defaultMessage: 'and allow duplicates of this form to be added',
  },
  [ActionSectionMessage.SelectLabelNoDuplicates]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ActionSection.SelectLabelNoDuplicates',
    defaultMessage: 'if this form is not already attached',
  },
  [ActionSectionMessage.SelectLabelInternal]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ActionSection.SelectLabelInternal',
    defaultMessage: 'and set form to INTERNAL',
  },
  [ActionSectionMessage.SelectLabelExternal]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ActionSection.SelectLabelExternal',
    defaultMessage: 'and set form to EXTERNAL',
  },
});
