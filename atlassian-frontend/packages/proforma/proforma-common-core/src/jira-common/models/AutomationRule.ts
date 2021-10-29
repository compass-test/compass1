import { ReferenceDataStatusItem } from './ReferenceData';

export enum TriggerType {
  submit = 'submit',
  transition = 'transition',
  workflowValidator = 'workflowValidator',
}

export enum TriggerTypes {
  submit = 'submit',
  transition = 'transition',
  workflowValidator = 'workflowValidator',
}

export enum AutomationRuleTriggerLabels {
  submit = 'this form is submitted',
  transition = 'the status changes to',
  workflowValidator = 'a Jira workflow validation is performed',
}

interface AutomationRuleTrigger {
  type: TriggerType | null | TriggerTypes | string;
}

export interface AutomationRuleConditions {
  formId?: number;
  status?: string;
  status2?: string;
  requestTypeId?: string;
  issueTypeId?: string;
  otherFormsSubmitted?: boolean;
}

export enum ActionId {
  transition = 1,
  addform = 2,
  preventTransition = 3,
}

export interface AutomationRuleActionTransition {
  id: ActionId.transition;
  to: string;
}

export interface AutomationRuleActionAddForm {
  id: ActionId.addform;
  author: string; // TODO: remove this property it is no longer relevant. Removing will require backend changes though, otherwise it will break.
  formId: number;
  doNotDuplicate: boolean;
  external?: boolean;
}

export interface AutomationRuleActionPreventTransition {
  id: ActionId.preventTransition;
  formId: number;
  isNotSubmitted: boolean;
  toStatus?: string;
  fromStatus?: string;
}

export type AutomationRuleAction =
  | AutomationRuleActionTransition
  | AutomationRuleActionAddForm
  | AutomationRuleActionPreventTransition;

export interface AutomationRuleDataNoId {
  trigger: AutomationRuleTrigger;
  conditions: AutomationRuleConditions;
  action: AutomationRuleAction;
  name?: string;
}

export interface AutomationRuleData extends AutomationRuleDataNoId {
  id: string;
}

export interface LocalAutomationRuleData extends AutomationRuleData {
  new?: boolean;
  updated?: boolean;
  delete?: boolean;
}

export enum LocalRuleConditionType {
  allFormsSubmitted = 'allFormsSubmitted',
  matchingIssueStatus = 'matchingIssueStatus',
  previousIssueStatus = 'previousIssueStatus',
  isNotSubmitted = 'isNotSubmitted',
  toStatus = 'toStatus',
  fromStatus = 'fromStatus',
}

export interface LocalRuleCondition {
  id: number;
  type: LocalRuleConditionType | null; // Null is used for an empty condition
  statusId?: ReferenceDataStatusItem['id'];
}
