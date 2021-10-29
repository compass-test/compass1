import { defineMessages } from 'react-intl';

export enum TriggerSectionMessage {
  WorkflowValidatorDesc = 'WorkflowValidatorDesc',
  WorkflowValidatorTypesDesc = 'WorkflowValidatorTypesDesc',
  WorkflowValidatorType1 = 'WorkflowValidatorType1',
  WorkflowValidatorType2 = 'WorkflowValidatorType2',
  WorkflowValidatorType3 = 'WorkflowValidatorType3',
  WorkflowValidatorType3Details = 'WorkflowValidatorType3Details',
}

export const IntlTriggerSectionMessages = defineMessages({
  [TriggerSectionMessage.WorkflowValidatorDesc]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.TriggerSection.WorkflowValidatorDesc',
    defaultMessage:
      'There are three types of ProForma validators that can be added to your Jira workflows. These must be configured by a Jira administrator.',
  },
  [TriggerSectionMessage.WorkflowValidatorTypesDesc]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.TriggerSection.WorkflowValidatorTypesDesc',
    defaultMessage: 'The three ProForma validators that can be added are:',
  },
  [TriggerSectionMessage.WorkflowValidatorType1]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.TriggerSection.WorkflowValidatorType1',
    defaultMessage: 'At least one form is attached to an issue',
  },
  [TriggerSectionMessage.WorkflowValidatorType2]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.TriggerSection.WorkflowValidatorType2',
    defaultMessage: 'All forms attached to an issue are submitted',
  },
  [TriggerSectionMessage.WorkflowValidatorType3]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.TriggerSection.WorkflowValidatorType3',
    defaultMessage: 'A specific form is attached (and submitted)',
  },
  [TriggerSectionMessage.WorkflowValidatorType3Details]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.TriggerSection.WorkflowValidatorType3Details',
    defaultMessage:
      'The third validator must also be configured here, so that Jira knows which specific form to check.',
  },
});
