import cloneDeep from 'lodash/cloneDeep';

import {
  AutomationRuleActionAddForm,
  AutomationRuleActionPreventTransition,
  LocalAutomationRuleData,
  LocalRuleCondition,
  LocalRuleConditionType,
  ReferenceDataIssueTypeItem,
  ReferenceDataRequestTypeItem,
  ReferenceDataStatusItem,
} from '@atlassian/proforma-common-core/jira-common-models';

import { RuleActionType } from '../../../../model/AutomationRule';
import { TriggerType } from '../sections/TriggerSection/TriggerSection';

// Gets a list of rule conditions based off the data in the automation rule
export function extractConditions(
  rule: LocalAutomationRuleData,
): LocalRuleCondition[] {
  let ruleIndex = 0;
  const conditions: LocalRuleCondition[] = [];

  if (rule.trigger.type === TriggerType.submit) {
    if (rule.conditions.otherFormsSubmitted) {
      ruleIndex += 1;
      conditions.push({
        id: ruleIndex,
        type: LocalRuleConditionType.allFormsSubmitted,
      });
    }

    if (typeof rule.conditions.status !== 'undefined') {
      ruleIndex += 1;
      conditions.push({
        id: ruleIndex,
        type: LocalRuleConditionType.matchingIssueStatus,
        statusId: rule.conditions.status,
      });
    }
  }

  if (rule.trigger.type === TriggerType.transition) {
    if (typeof rule.conditions.status !== 'undefined') {
      ruleIndex += 1;
      conditions.push({
        id: ruleIndex,
        type: LocalRuleConditionType.previousIssueStatus,
        statusId: rule.conditions.status,
      });
    }
  }

  if (rule.trigger.type === TriggerType.workflowValidator) {
    if (
      typeof (rule.action as AutomationRuleActionPreventTransition)
        .fromStatus !== 'undefined'
    ) {
      ruleIndex += 1;
      conditions.push({
        id: ruleIndex,
        type: LocalRuleConditionType.fromStatus,
        statusId: (rule.action as AutomationRuleActionPreventTransition)
          .fromStatus,
      });
    }

    if (
      typeof (rule.action as AutomationRuleActionPreventTransition).toStatus !==
      'undefined'
    ) {
      ruleIndex += 1;
      conditions.push({
        id: ruleIndex,
        type: LocalRuleConditionType.toStatus,
        statusId: (rule.action as AutomationRuleActionPreventTransition)
          .toStatus,
      });
    }

    if ((rule.action as AutomationRuleActionPreventTransition).isNotSubmitted) {
      ruleIndex += 1;
      conditions.push({
        id: ruleIndex,
        type: LocalRuleConditionType.isNotSubmitted,
      });
    }
  }
  return conditions;
}

// Returns a list of available conditions based on the trigger type
export function getAvailableConditions(
  triggerType: TriggerType,
): LocalRuleConditionType[] {
  switch (triggerType) {
    case TriggerType.submit:
      return [
        LocalRuleConditionType.allFormsSubmitted,
        LocalRuleConditionType.matchingIssueStatus,
      ];
    case TriggerType.transition:
      return [LocalRuleConditionType.previousIssueStatus];
    case TriggerType.workflowValidator:
      return [
        LocalRuleConditionType.fromStatus,
        LocalRuleConditionType.toStatus,
        LocalRuleConditionType.isNotSubmitted,
      ];
    default:
      return [];
  }
}

// Returns a list of available statuses based on the Issue/Request type
export function getAvailableStatuses(
  allStatuses: ReferenceDataStatusItem[],
  availableIssueTypes: ReferenceDataIssueTypeItem[],
  availableRequestTypes: ReferenceDataRequestTypeItem[],
  issueType?: string,
  requestType?: string,
): ReferenceDataStatusItem[] {
  const supportedStatusIds: string[] = [];

  if (!issueType && !requestType) {
    availableIssueTypes.forEach(type => {
      supportedStatusIds.push(...type.statuses);
    });
    availableRequestTypes.forEach(type => {
      const linkedIssueType = availableIssueTypes.find(
        iType => iType.id === type.issueTypeId,
      );
      if (linkedIssueType) {
        supportedStatusIds.push(...linkedIssueType.statuses);
      }
    });
  }

  if (issueType) {
    availableIssueTypes.forEach(type => {
      if (type.id === issueType) {
        supportedStatusIds.push(...type.statuses);
      }
    });
  }

  if (requestType) {
    availableRequestTypes.forEach(type => {
      if (type.id === requestType) {
        const linkedIssueType = availableIssueTypes.find(
          iType => iType.id === type.issueTypeId,
        );
        if (linkedIssueType) {
          supportedStatusIds.push(...linkedIssueType.statuses);
        }
      }
    });
  }

  return allStatuses.filter(status => supportedStatusIds.includes(status.id));
}

export function getConditionsMaxId(conditions: LocalRuleCondition[]): number {
  if (conditions.length) {
    return Math.max(...conditions.map(c => c.id));
  }
  return 0;
}

export function getRuleActionTypeFromRule(
  rule: LocalAutomationRuleData,
): RuleActionType | null {
  switch (rule.trigger.type) {
    case TriggerType.submit:
      return RuleActionType.changeStatus;
    case TriggerType.transition:
      return RuleActionType.addForm;
    case TriggerType.workflowValidator:
      if (
        (rule.action as AutomationRuleActionPreventTransition).isNotSubmitted
      ) {
        return RuleActionType.preventStatusChange;
      }
      return RuleActionType.preventStatusChangeUnlessThisFormIsAttached;
    default:
      return null;
  }
}

export function addFormIdToRule(
  rule: LocalAutomationRuleData,
  formId: number,
): LocalAutomationRuleData {
  const newRule: LocalAutomationRuleData = cloneDeep(rule);
  switch (newRule.trigger.type) {
    case TriggerType.submit:
      newRule.conditions.formId = formId;
      break;
    case TriggerType.transition:
      (newRule.action as AutomationRuleActionAddForm).formId = formId;
      break;
    case TriggerType.workflowValidator:
      (newRule.action as AutomationRuleActionPreventTransition).formId = formId;
      break;
  }
  return newRule;
}
