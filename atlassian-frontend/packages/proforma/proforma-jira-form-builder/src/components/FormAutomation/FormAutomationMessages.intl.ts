import { defineMessages } from 'react-intl';

export enum FormAutomationMessage {
  FormAutomationTitle = 'FormAutomationTitle',
  NewAutomationRuleName = 'NewAutomationRuleName',
  AutomationRule = 'AutomationRule',
}

export const IntlFormAutomationMessages = defineMessages({
  [FormAutomationMessage.FormAutomationTitle]: {
    id: 'ui-form-builder.JiraAdfFormBuilder.FormAutomation.FormAutomationTitle',
    defaultMessage: 'Form Automation',
  },
  [FormAutomationMessage.NewAutomationRuleName]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.NewAutomationRuleName',
    defaultMessage: 'New Automation Rule',
  },
  [FormAutomationMessage.AutomationRule]: {
    id: 'ui-form-builder.JiraAdfFormBuilder.FormAutomation.AutomationRule',
    defaultMessage: 'Automation Rule',
  },
});
