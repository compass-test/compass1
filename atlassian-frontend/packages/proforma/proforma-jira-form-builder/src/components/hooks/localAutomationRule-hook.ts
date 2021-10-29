import { Dispatch, useEffect, useReducer } from 'react';

import {
  LocalAutomationRuleData,
  LocalRuleCondition,
  LocalRuleConditionType,
  TriggerType,
} from '@atlassian/proforma-common-core/jira-common-models';

import { extractConditions } from '../FormAutomation/EditAutomationRule/helpers/helpers';

import {
  addLocalCondition,
  applyLocalConditions,
  deleteLocalCondition,
  removeUnCompatibleStatuses,
  updateActionDoNotDuplicate,
  updateActionStatus,
  updateActionVisibility,
  updateConditionStatus,
  updateConditionType,
  updateRuleIssueType,
  updateRuleName,
  updateRuleTriggerType,
  updateTriggerStatus,
} from './localAutomationRule-transformations';

export type LocalAutomationRuleState = {
  rule: LocalAutomationRuleData;
  localConditions: LocalRuleCondition[];
};

export enum LocalAutomationRuleStateAction {
  UpdateRuleName = 'UpdateRuleName',
  UpdateTriggerType = 'UpdateTriggerType',
  UpdateTriggerStatus = 'UpdateTriggerStatus',
  AddCondition = 'AddCondition',
  DeleteCondition = 'DeleteCondition',
  UpdateConditionType = 'UpdateConditionType',
  UpdateConditionStatus = 'UpdateConditionStatus',
  UpdateIssueType = 'UpdateIssueType',
  UpdateActionStatus = 'UpdateActionStatus',
  UpdateActionDoNotDuplicate = 'UpdateActionDoNotDuplicate',
  UpdateActionVisibility = 'UpdateActionVisibility',
  ApplyLocalConditions = 'ApplyLocalConditions',
  RemoveUnCompatibleStatuses = 'RemoveUnCompatibleStatuses',
}

export type LocalAutomationRuleStateActions =
  | { type: LocalAutomationRuleStateAction.UpdateRuleName; name: string }
  | {
      type: LocalAutomationRuleStateAction.UpdateTriggerType;
      triggerType: TriggerType;
    }
  | { type: LocalAutomationRuleStateAction.UpdateTriggerStatus; status: string }
  | { type: LocalAutomationRuleStateAction.AddCondition }
  | {
      type: LocalAutomationRuleStateAction.DeleteCondition;
      conditionId: number;
    }
  | {
      type: LocalAutomationRuleStateAction.UpdateConditionType;
      conditionId: number;
      conditionType: LocalRuleConditionType;
    }
  | {
      type: LocalAutomationRuleStateAction.UpdateConditionStatus;
      conditionId: number;
      statusId: string;
    }
  | {
      type: LocalAutomationRuleStateAction.UpdateIssueType;
      issueTypeId: string;
      issueType?: 'issueType' | 'requestType';
    }
  | {
      type: LocalAutomationRuleStateAction.UpdateActionStatus;
      statusId: string;
    }
  | {
      type: LocalAutomationRuleStateAction.UpdateActionDoNotDuplicate;
      doNotDuplicate: boolean;
    }
  | {
      type: LocalAutomationRuleStateAction.UpdateActionVisibility;
      external: boolean;
    }
  | { type: LocalAutomationRuleStateAction.ApplyLocalConditions }
  | {
      type: LocalAutomationRuleStateAction.RemoveUnCompatibleStatuses;
      compatibleStatuses: string[];
    };

function localAutomationRuleReducer(
  state: LocalAutomationRuleState,
  action: LocalAutomationRuleStateActions,
): LocalAutomationRuleState {
  switch (action.type) {
    case LocalAutomationRuleStateAction.UpdateRuleName:
      return {
        ...state,
        rule: updateRuleName(state.rule, action.name),
      };
    case LocalAutomationRuleStateAction.UpdateTriggerType:
      return {
        ...state,
        localConditions: [],
        rule: updateRuleTriggerType(state.rule, action.triggerType),
      };
    case LocalAutomationRuleStateAction.UpdateTriggerStatus:
      return {
        ...state,
        rule: updateTriggerStatus(state.rule, action.status),
      };
    case LocalAutomationRuleStateAction.AddCondition:
      return {
        ...state,
        localConditions: addLocalCondition(state.localConditions),
      };
    case LocalAutomationRuleStateAction.DeleteCondition:
      return {
        ...state,
        localConditions: deleteLocalCondition(
          state.localConditions,
          action.conditionId,
        ),
      };
    case LocalAutomationRuleStateAction.UpdateConditionType:
      return {
        ...state,
        localConditions: updateConditionType(
          state.localConditions,
          action.conditionId,
          action.conditionType,
        ),
      };
    case LocalAutomationRuleStateAction.UpdateConditionStatus:
      return {
        ...state,
        localConditions: updateConditionStatus(
          state.localConditions,
          action.conditionId,
          action.statusId,
        ),
      };
    case LocalAutomationRuleStateAction.UpdateIssueType:
      return {
        ...state,
        rule: updateRuleIssueType(
          state.rule,
          action.issueTypeId,
          action.issueType,
        ),
      };
    case LocalAutomationRuleStateAction.UpdateActionStatus:
      return {
        ...state,
        rule: updateActionStatus(state.rule, action.statusId),
      };
    case LocalAutomationRuleStateAction.UpdateActionDoNotDuplicate:
      return {
        ...state,
        rule: updateActionDoNotDuplicate(state.rule, action.doNotDuplicate),
      };
    case LocalAutomationRuleStateAction.UpdateActionVisibility:
      return {
        ...state,
        rule: updateActionVisibility(state.rule, action.external),
      };
    case LocalAutomationRuleStateAction.ApplyLocalConditions:
      return {
        ...state,
        rule: applyLocalConditions(state.rule, state.localConditions),
      };
    case LocalAutomationRuleStateAction.RemoveUnCompatibleStatuses:
      return {
        ...state,
        rule: removeUnCompatibleStatuses(state.rule, action.compatibleStatuses),
      };
    default:
      return state;
  }
}

function getInitialState(
  initialRule: LocalAutomationRuleData,
): LocalAutomationRuleState {
  return {
    rule: initialRule,
    localConditions: extractConditions(initialRule),
  };
}

export function useLocalAutomationRuleState(
  initialRule: LocalAutomationRuleData,
): {
  localAutomationRuleState: LocalAutomationRuleState;
  updateLocalAutomationRuleState: Dispatch<LocalAutomationRuleStateActions>;
} {
  const [localAutomationRuleState, updateLocalAutomationRuleState] = useReducer(
    localAutomationRuleReducer,
    getInitialState(initialRule),
  );
  // Update the currentRule every time the list of conditions changes
  useEffect(() => {
    updateLocalAutomationRuleState({
      type: LocalAutomationRuleStateAction.ApplyLocalConditions,
    });
  }, [localAutomationRuleState.localConditions]);
  return { localAutomationRuleState, updateLocalAutomationRuleState };
}
