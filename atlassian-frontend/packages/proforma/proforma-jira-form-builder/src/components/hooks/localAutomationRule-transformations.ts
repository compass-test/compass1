import cloneDeep from 'lodash/cloneDeep';

import {
  ActionId,
  AutomationRuleAction,
  AutomationRuleActionAddForm,
  AutomationRuleActionPreventTransition,
  AutomationRuleActionTransition,
  LocalAutomationRuleData,
  LocalRuleCondition,
  LocalRuleConditionType,
  ReferenceDataStatusItem,
  TriggerType,
} from '@atlassian/proforma-common-core/jira-common-models';

export function updateRuleName(
  rule: LocalAutomationRuleData,
  newName: string,
): LocalAutomationRuleData {
  const updatedRule: LocalAutomationRuleData = cloneDeep(rule);
  updatedRule.name = newName;
  return updatedRule;
}

function getDefaultActionDataForTriggerType(
  triggerType: TriggerType,
): AutomationRuleAction | undefined {
  switch (triggerType) {
    case TriggerType.submit:
      const defaultAutomationRuleActionTransition: AutomationRuleActionTransition = {
        id: ActionId.transition,
        to: '',
      };
      return defaultAutomationRuleActionTransition;
    case TriggerType.transition:
      const defaultAutomationRuleActionAddForm: AutomationRuleActionAddForm = {
        id: ActionId.addform,
        author: '', // blank value as this is no longer used
        formId: 321, // This is a dummy value, the real formId get's added on save
        doNotDuplicate: false,
      };
      return defaultAutomationRuleActionAddForm;
    case TriggerType.workflowValidator:
      const defaultAutomationRuleActionPreventTransition: AutomationRuleActionPreventTransition = {
        id: ActionId.preventTransition,
        formId: 321,
        isNotSubmitted: false,
      };
      return defaultAutomationRuleActionPreventTransition;
    default:
      return undefined;
  }
}

export function updateRuleTriggerType(
  rule: LocalAutomationRuleData,
  newTriggerType: TriggerType,
): LocalAutomationRuleData {
  const updatedRule: LocalAutomationRuleData = cloneDeep(rule);
  updatedRule.conditions = {};
  const newActionData = getDefaultActionDataForTriggerType(newTriggerType);
  if (!newActionData) {
    // eslint-disable-next-line no-console
    console.error(
      'Could not update the AutomationRuleData, unable to build the default action data from the triggerType',
    );
    return rule;
  }
  updatedRule.action = newActionData;
  updatedRule.trigger.type = newTriggerType;
  return updatedRule;
}

export function updateTriggerStatus(
  rule: LocalAutomationRuleData,
  newStatus: string,
): LocalAutomationRuleData {
  const updatedRule: LocalAutomationRuleData = cloneDeep(rule);
  updatedRule.conditions.status2 = newStatus;
  return updatedRule;
}

export function getConditionsMaxId(conditions: LocalRuleCondition[]): number {
  if (conditions.length) {
    return Math.max(...conditions.map(c => c.id));
  }
  return 0;
}

export function addLocalCondition(
  currentConditions: LocalRuleCondition[],
): LocalRuleCondition[] {
  const newIndex = getConditionsMaxId(currentConditions) + 1;
  const emptyCondition: LocalRuleCondition = {
    id: newIndex,
    type: null,
  };
  const newConditions = [...currentConditions];
  newConditions.push(emptyCondition);
  return newConditions;
}

export function deleteLocalCondition(
  currentConditions: LocalRuleCondition[],
  conditionId: number,
): LocalRuleCondition[] {
  const newConditions = [
    ...currentConditions.filter(c => c.id !== conditionId),
  ];
  return newConditions;
}

export function updateConditionType(
  currentConditions: LocalRuleCondition[],
  conditionId: number,
  newConditionType: LocalRuleConditionType,
): LocalRuleCondition[] {
  const newConditions = [...currentConditions];
  const foundIndex = newConditions.findIndex(c => c.id === conditionId);
  if (foundIndex >= 0) {
    newConditions[foundIndex].type = newConditionType;
    delete newConditions[foundIndex].statusId;
  }
  return newConditions;
}

export function updateConditionStatus(
  currentConditions: LocalRuleCondition[],
  conditionId: number,
  statusId: string,
): LocalRuleCondition[] {
  const newConditions = [...currentConditions];
  const foundIndex = newConditions.findIndex(c => c.id === conditionId);
  if (foundIndex >= 0) {
    newConditions[foundIndex].statusId = statusId;
  }
  return newConditions;
}

export function updateRuleIssueType(
  rule: LocalAutomationRuleData,
  newIssueTypeId: string,
  type?: 'issueType' | 'requestType',
): LocalAutomationRuleData {
  const updatedRule: LocalAutomationRuleData = cloneDeep(rule);
  if (newIssueTypeId === 'all') {
    delete updatedRule.conditions.issueTypeId;
    delete updatedRule.conditions.requestTypeId;
  }
  if (type === 'issueType') {
    updatedRule.conditions.issueTypeId = newIssueTypeId;
    delete updatedRule.conditions.requestTypeId;
  }
  if (type === 'requestType') {
    updatedRule.conditions.requestTypeId = newIssueTypeId;
    delete updatedRule.conditions.issueTypeId;
  }
  return updatedRule;
}

export function removeUnCompatibleStatuses(
  currentRule: LocalAutomationRuleData,
  compatibleStatuses: string[],
): LocalAutomationRuleData {
  const updatedRule: LocalAutomationRuleData = cloneDeep(currentRule);
  const { status2, status } = updatedRule.conditions;
  const {
    fromStatus,
    toStatus,
  } = updatedRule.action as AutomationRuleActionPreventTransition;
  if (status && !compatibleStatuses.includes(status)) {
    delete updatedRule.conditions.status;
  }
  if (status2 && !compatibleStatuses.includes(status2)) {
    delete updatedRule.conditions.status2;
  }
  if (fromStatus && !compatibleStatuses.includes(fromStatus)) {
    delete (updatedRule.action as AutomationRuleActionPreventTransition)
      .fromStatus;
  }
  if (toStatus && !compatibleStatuses.includes(toStatus)) {
    delete (updatedRule.action as AutomationRuleActionPreventTransition)
      .toStatus;
  }
  return updatedRule;
}

export function updateActionStatus(
  currentRule: LocalAutomationRuleData,
  statusId: ReferenceDataStatusItem['id'],
): LocalAutomationRuleData {
  const updatedRule: LocalAutomationRuleData = cloneDeep(currentRule);
  updatedRule.conditions.status2 = statusId;
  (updatedRule.action as AutomationRuleActionTransition).to = statusId;
  return updatedRule;
}

export function updateActionDoNotDuplicate(
  currentRule: LocalAutomationRuleData,
  doNotDuplicate: boolean,
): LocalAutomationRuleData {
  const updatedRule: LocalAutomationRuleData = cloneDeep(currentRule);
  (updatedRule.action as AutomationRuleActionAddForm).doNotDuplicate = doNotDuplicate;
  return updatedRule;
}

export function updateActionVisibility(
  currentRule: LocalAutomationRuleData,
  external: boolean,
): LocalAutomationRuleData {
  const updatedRule: LocalAutomationRuleData = cloneDeep(currentRule);
  if (external) {
    (updatedRule.action as AutomationRuleActionAddForm).external = external;
  } else {
    delete (updatedRule.action as AutomationRuleActionAddForm).external;
  }
  return updatedRule;
}

function applyConditionToRule(
  rule: LocalAutomationRuleData,
  condition: LocalRuleCondition,
): LocalAutomationRuleData {
  const updatedRule: LocalAutomationRuleData = cloneDeep(rule);
  if (condition.type === LocalRuleConditionType.allFormsSubmitted) {
    updatedRule.conditions.otherFormsSubmitted = true;
  }
  if (
    condition.type === LocalRuleConditionType.matchingIssueStatus ||
    condition.type === LocalRuleConditionType.previousIssueStatus
  ) {
    updatedRule.conditions.status = condition.statusId;
  }
  if (condition.type === LocalRuleConditionType.fromStatus) {
    (updatedRule.action as AutomationRuleActionPreventTransition).fromStatus =
      condition.statusId;
  }
  if (condition.type === LocalRuleConditionType.toStatus) {
    (updatedRule.action as AutomationRuleActionPreventTransition).toStatus =
      condition.statusId;
  }
  if (condition.type === LocalRuleConditionType.isNotSubmitted) {
    (updatedRule.action as AutomationRuleActionPreventTransition).isNotSubmitted = true;
  }
  return updatedRule;
}

export function applyLocalConditions(
  currentRule: LocalAutomationRuleData,
  localConditions: LocalRuleCondition[],
): LocalAutomationRuleData {
  let updatedRule: LocalAutomationRuleData = cloneDeep(currentRule);
  // wipe properties related to conditions
  delete updatedRule.conditions.otherFormsSubmitted;
  delete updatedRule.conditions.status;
  delete (updatedRule.action as AutomationRuleActionPreventTransition)
    .fromStatus;
  delete (updatedRule.action as AutomationRuleActionPreventTransition).toStatus;
  if (
    (updatedRule.action as AutomationRuleActionPreventTransition).isNotSubmitted
  ) {
    (updatedRule.action as AutomationRuleActionPreventTransition).isNotSubmitted = false;
  }
  localConditions.forEach(condition => {
    updatedRule = applyConditionToRule(updatedRule, condition);
  });
  return updatedRule;
}
