import {
  AutomationRuleActionTransition,
  LocalAutomationRuleData,
  LocalRuleCondition,
  LocalRuleConditionType,
  TriggerType,
} from '@atlassian/proforma-common-core/jira-common-models';

import { EditAutomationRuleMessage } from '../EditAutomationRuleMessages.intl';

export enum ValidationErrorType {
  NoTriggerStatus = 'noTriggerStatus',
  NoConditionStatus = 'noConditionStatus',
  NoActionStatus = 'noActionStatus',
  NoTrigger = 'noTrigger',
}

export interface ValidationError {
  errorType: ValidationErrorType;
  errorMsg: string;
}

export const noTriggerStatusError: ValidationError = {
  errorType: ValidationErrorType.NoTriggerStatus,
  errorMsg: EditAutomationRuleMessage.ValidationMsgNoTriggerStatus,
};

export const noConditionStatusError: ValidationError = {
  errorType: ValidationErrorType.NoConditionStatus,
  errorMsg: EditAutomationRuleMessage.ValidationMsgNoConditionStatus,
};

export const noActionStatusError: ValidationError = {
  errorType: ValidationErrorType.NoActionStatus,
  errorMsg: EditAutomationRuleMessage.ValidationMsgNoActionStatus,
};

export const noTriggerError: ValidationError = {
  errorType: ValidationErrorType.NoTrigger,
  errorMsg: EditAutomationRuleMessage.ValidationMsgNoTrigger,
};

export function getValidationErrors(
  rule: LocalAutomationRuleData,
  localConditions: LocalRuleCondition[],
): ValidationError[] {
  const validationErrors: ValidationError[] = [];

  if (!rule.trigger.type) {
    validationErrors.push(noTriggerError);
  }

  if (
    rule.trigger.type === TriggerType.transition &&
    !rule.conditions.status2
  ) {
    validationErrors.push(noTriggerStatusError);
  }

  // Check for empty status in conditions
  localConditions.forEach(condition => {
    if (
      condition.type === LocalRuleConditionType.fromStatus ||
      condition.type === LocalRuleConditionType.toStatus ||
      condition.type === LocalRuleConditionType.previousIssueStatus ||
      condition.type === LocalRuleConditionType.matchingIssueStatus
    ) {
      if (!condition.statusId) {
        if (
          !validationErrors
            .map(valError => valError.errorType)
            .includes(ValidationErrorType.NoConditionStatus)
        ) {
          validationErrors.push(noConditionStatusError);
        }
      }
    }
  });

  if (
    rule.trigger.type === TriggerType.submit &&
    !(rule.action as AutomationRuleActionTransition).to
  ) {
    validationErrors.push(noActionStatusError);
  }

  return validationErrors;
}
