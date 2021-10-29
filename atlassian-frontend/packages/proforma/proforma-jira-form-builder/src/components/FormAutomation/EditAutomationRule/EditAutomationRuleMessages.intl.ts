import { defineMessages } from 'react-intl';

export enum EditAutomationRuleMessage {
  RuleNameSectionTitle = 'RuleNameSectionTitle',
  WhenSectionTitle = 'WhenSectionTitle',
  TriggerLabelSubmit = 'TriggerLabelSubmit',
  TriggerLabelTransition = 'TriggerLabelTransition',
  TriggerLabelWorkflow = 'TriggerLabelWorkflow',
  ValidationMsgNoTriggerStatus = 'ValidationMsgNoTriggerStatus',
  ValidationMsgNoConditionStatus = 'ValidationMsgNoConditionStatus',
  ValidationMsgNoActionStatus = 'ValidationMsgNoActionStatus',
  ValidationMsgNoTrigger = 'ValidationMsgNoTrigger',
  ForSectionTitle = 'ForSectionTitle',
  IfSectionTitle = 'IfSectionTitle',
  ThenSectionTitle = 'ThenSectionTitle',
  MissingWhenOption = 'MissingWhenOption',
  ConditionLabelAllFormsSubmitted = 'ConditionLabelAllFormsSubmitted',
  ConditionLabelMatchingIssueStatus = 'ConditionLabelMatchingIssueStatus',
  ConditionLabelPreviousIssueStatus = 'ConditionLabelPreviousIssueStatus',
  ConditionLabelIsNotSubmitted = 'ConditionLabelIsNotSubmitted',
  ConditionLabelToStatus = 'ConditionLabelToStatus',
  ConditionLabelFromStatus = 'ConditionLabelFromStatus',
  ActionLabelChangeStatus = 'ActionLabelChangeStatus',
  ActionLabelAddForm = 'ActionLabelAddForm',
  ActionLabelPreventStatusChange = 'ActionLabelPreventStatusChange',
  ActionLabelPreventStatusChangeUnlessThisFormIsAttached = 'ActionLabelPreventStatusChangeUnlessThisFormIsAttached',
  StatusSelectPlaceholder = 'StatusSelectPlaceholder',
  RuleTriggerSelectPlaceholder = 'RuleTriggerSelectPlaceholder',
}

export const IntlEditAutomationRuleMessages = defineMessages({
  [EditAutomationRuleMessage.RuleNameSectionTitle]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.RuleNameSectionTitle',
    defaultMessage: 'Rule Name:',
  },
  [EditAutomationRuleMessage.WhenSectionTitle]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.WhenSectionTitle',
    defaultMessage: 'When...',
  },
  [EditAutomationRuleMessage.TriggerLabelSubmit]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.TriggerLabelSubmit',
    defaultMessage: 'this form is submitted',
  },
  [EditAutomationRuleMessage.TriggerLabelTransition]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.TriggerLabelTransition',
    defaultMessage: 'the status changes to',
  },
  [EditAutomationRuleMessage.TriggerLabelWorkflow]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.TriggerLabelWorkflow',
    defaultMessage: 'a Jira workflow validation is performed',
  },
  [EditAutomationRuleMessage.ValidationMsgNoTriggerStatus]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ValidationMsgNoTriggerStatus',
    defaultMessage: 'Required status for the rule trigger is missing.',
  },
  [EditAutomationRuleMessage.ValidationMsgNoConditionStatus]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ValidationMsgNoConditionStatus',
    defaultMessage: 'Required status for the condition is missing',
  },
  [EditAutomationRuleMessage.ValidationMsgNoActionStatus]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ValidationMsgNoActionStatus',
    defaultMessage: 'A Required status for the action is missing',
  },
  [EditAutomationRuleMessage.ValidationMsgNoTrigger]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ValidationMsgNoTrigger',
    defaultMessage: "A 'When' option is required",
  },
  [EditAutomationRuleMessage.ForSectionTitle]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ForSectionTitle',
    defaultMessage: 'For...',
  },
  [EditAutomationRuleMessage.IfSectionTitle]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.IfSectionTitle',
    defaultMessage: 'If...',
  },
  [EditAutomationRuleMessage.ThenSectionTitle]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ThenSectionTitle',
    defaultMessage: 'Then...',
  },
  [EditAutomationRuleMessage.MissingWhenOption]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.MissingWhenOption',
    defaultMessage: 'Please select a When option first',
  },
  [EditAutomationRuleMessage.ConditionLabelAllFormsSubmitted]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ConditionLabelAllFormsSubmitted',
    defaultMessage: 'all forms are submitted',
  },
  [EditAutomationRuleMessage.ConditionLabelMatchingIssueStatus]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ConditionLabelMatchingIssueStatus',
    defaultMessage: 'the issue status is',
  },
  [EditAutomationRuleMessage.ConditionLabelPreviousIssueStatus]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ConditionLabelPreviousIssueStatus',
    defaultMessage: 'the issue status was',
  },
  [EditAutomationRuleMessage.ConditionLabelIsNotSubmitted]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ConditionLabelIsNotSubmitted',
    defaultMessage:
      'the form is not attached to the issue and is not submitted',
  },
  [EditAutomationRuleMessage.ConditionLabelToStatus]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ConditionLabelToStatus',
    defaultMessage: 'the issue is changing to',
  },
  [EditAutomationRuleMessage.ConditionLabelFromStatus]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ConditionLabelFromStatus',
    defaultMessage: 'the issue is changing from',
  },
  [EditAutomationRuleMessage.ActionLabelChangeStatus]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ActionLabelChangeStatus',
    defaultMessage: 'change the issue status to',
  },
  [EditAutomationRuleMessage.ActionLabelAddForm]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ActionLabelAddForm',
    defaultMessage: 'add this form to the issue',
  },
  [EditAutomationRuleMessage.ActionLabelPreventStatusChange]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ActionLabelPreventStatusChange',
    defaultMessage: 'prevent the status change',
  },
  [EditAutomationRuleMessage.ActionLabelPreventStatusChangeUnlessThisFormIsAttached]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.ActionLabelPreventStatusChangeUnlessThisFormIsAttached',
    defaultMessage: 'prevent the status change, unless this form is attached',
  },
  [EditAutomationRuleMessage.StatusSelectPlaceholder]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.StatusSelectPlaceholder',
    defaultMessage: 'Select Status',
  },
  [EditAutomationRuleMessage.RuleTriggerSelectPlaceholder]: {
    id:
      'ui-form-builder.JiraAdfFormBuilder.FormAutomation.EditAutomationRule.RuleTriggerSelectPlaceholder',
    defaultMessage: 'Select...',
  },
});
