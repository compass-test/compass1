import { Dispatch, useEffect, useReducer } from 'react';

import { InjectedIntl } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';

import {
  AutomationRuleActionTransition,
  AutomationRuleData,
  LocalAutomationRuleData,
} from '@atlassian/proforma-common-core/jira-common-models';

import {
  FormAutomationMessage,
  IntlFormAutomationMessages,
} from '../FormAutomation/FormAutomationMessages.intl';

export type AutomationRulesState = {
  loadingRules: boolean;
  rules: LocalAutomationRuleData[];
  ruleForEdit: LocalAutomationRuleData | null;
};

export enum AutomationRuleStateAction {
  UpdateRules = 'UpdateRules',
  UpdateLoading = 'UpdateLoading',
  EditRule = 'EditRule',
  CancelEditRule = 'CancelEditRule',
  UpdateRule = 'UpdateRule',
  AddRule = 'AddRule',
  DeleteRule = 'DeleteRule',
  MarkRuleDeleted = 'MarkRuleDeleted',
  NewRuleSaved = 'NewRuleSaved',
}

export type AutomationRulesStateActions =
  | {
      type: AutomationRuleStateAction.UpdateRules;
      rules: LocalAutomationRuleData[];
    }
  | { type: AutomationRuleStateAction.UpdateLoading; loading: boolean }
  | { type: AutomationRuleStateAction.EditRule; rule: LocalAutomationRuleData }
  | {
      type: AutomationRuleStateAction.CancelEditRule;
      rule: LocalAutomationRuleData;
    }
  | {
      type: AutomationRuleStateAction.UpdateRule;
      rule: LocalAutomationRuleData;
      oldId?: string;
    }
  | { type: AutomationRuleStateAction.AddRule }
  | {
      type: AutomationRuleStateAction.DeleteRule;
      rule: LocalAutomationRuleData;
    }
  | {
      type: AutomationRuleStateAction.MarkRuleDeleted;
      rule: LocalAutomationRuleData;
    }
  | {
      type: AutomationRuleStateAction.NewRuleSaved;
      oldId: string;
      newId: string;
    };

function updateAutomationRule(
  updatedRule: LocalAutomationRuleData,
  currentRules: LocalAutomationRuleData[],
): LocalAutomationRuleData[] {
  const newRules = [...currentRules];
  const updateIndex = newRules.findIndex(rule => rule.id === updatedRule.id);
  if (updateIndex >= 0) {
    newRules[updateIndex] = updatedRule;
    newRules[updateIndex].updated = true;
  }
  return newRules;
}

function updateNewAutomationRule(
  oldId: string,
  newId: string,
  currentRules: LocalAutomationRuleData[],
): LocalAutomationRuleData[] {
  const newRules = [...currentRules];
  const updateIndex = newRules.findIndex(rule => rule.id === oldId);
  if (updateIndex >= 0) {
    newRules[updateIndex].id = newId;
    newRules[updateIndex].updated = false;
    newRules[updateIndex].new = false;
  } else {
    // eslint-disable-next-line no-console
    console.warn(
      `Unable to find rule with temporary id ${oldId}. Unable to update to correct id ${newId}.`,
    );
  }
  return newRules;
}

function getNewAutomationRule(intl: InjectedIntl): LocalAutomationRuleData {
  return {
    id: uuidv4(),
    name: intl.formatMessage(
      IntlFormAutomationMessages[FormAutomationMessage.NewAutomationRuleName],
    ),
    trigger: {
      type: null,
    },
    conditions: {},
    action: {} as AutomationRuleActionTransition,
    new: true,
  };
}

function addNameToRules(
  rules: LocalAutomationRuleData[],
  intl: InjectedIntl,
): LocalAutomationRuleData[] {
  const newRules = [...rules];
  newRules.forEach((rule, index) => {
    if (!rule.name) {
      newRules[index].name = `${intl.formatMessage(
        IntlFormAutomationMessages[FormAutomationMessage.AutomationRule],
      )} ${index + 1}`;
    }
  });
  return newRules;
}

function addNewAutomationRule(
  currentRules: LocalAutomationRuleData[],
  newRule: LocalAutomationRuleData,
): LocalAutomationRuleData[] {
  return [...currentRules, newRule];
}

function removeAutomationRule(
  rule: LocalAutomationRuleData,
  currentRules: LocalAutomationRuleData[],
): LocalAutomationRuleData[] {
  const newRules = [...currentRules];
  return newRules.filter(r => r.id !== rule.id);
}

function markRuleDeleted(
  deletedRule: LocalAutomationRuleData,
  currentRules: LocalAutomationRuleData[],
): LocalAutomationRuleData[] {
  const newRules = [...currentRules];
  const updateIndex = newRules.findIndex(rule => rule.id === deletedRule.id);
  if (updateIndex >= 0) {
    newRules[updateIndex].delete = true;
  }
  return newRules;
}

function automationRulesReducer(intl: InjectedIntl) {
  return function (
    state: AutomationRulesState,
    action: AutomationRulesStateActions,
  ) {
    switch (action.type) {
      case AutomationRuleStateAction.UpdateRules:
        return {
          ...state,
          rules: addNameToRules(action.rules, intl),
        };
      case AutomationRuleStateAction.UpdateLoading:
        return {
          ...state,
          loadingRules: action.loading,
        };
      case AutomationRuleStateAction.EditRule:
        return {
          ...state,
          ruleForEdit: action.rule,
        };
      case AutomationRuleStateAction.CancelEditRule:
        if (!action.rule.updated && action.rule.new) {
          return {
            ...state,
            ruleForEdit: null,
            rules: removeAutomationRule(action.rule, state.rules),
          };
        }
        return {
          ...state,
          ruleForEdit: null,
        };
      case AutomationRuleStateAction.UpdateRule:
        return {
          ...state,
          rules: updateAutomationRule(action.rule, state.rules),
        };
      case AutomationRuleStateAction.AddRule:
        const newRule = getNewAutomationRule(intl);
        return {
          ...state,
          rules: addNewAutomationRule(state.rules, newRule),
          ruleForEdit: newRule,
        };
      case AutomationRuleStateAction.MarkRuleDeleted:
        return {
          ...state,
          rules: markRuleDeleted(action.rule, state.rules),
        };
      case AutomationRuleStateAction.NewRuleSaved:
        return {
          ...state,
          rules: updateNewAutomationRule(
            action.oldId,
            action.newId,
            state.rules,
          ),
        };
      case AutomationRuleStateAction.DeleteRule:
        return {
          ...state,
          rules: removeAutomationRule(action.rule, state.rules),
        };
      default:
        return state;
    }
  };
}

const automationRulesInitialState: AutomationRulesState = {
  loadingRules: true,
  rules: [],
  ruleForEdit: null,
};

export function useAutomationRulesState(
  loadAutomationRules: () => Promise<AutomationRuleData[]>,
  intl: InjectedIntl,
): {
  automationRulesState: AutomationRulesState;
  updateAutomationRulesState: Dispatch<AutomationRulesStateActions>;
} {
  const [automationRulesState, updateAutomationRulesState] = useReducer(
    automationRulesReducer(intl),
    automationRulesInitialState,
  );
  useEffect(() => {
    loadAutomationRules()
      .then(automationRules => {
        updateAutomationRulesState({
          type: AutomationRuleStateAction.UpdateRules,
          rules: automationRules,
        });
      })
      .finally(() => {
        updateAutomationRulesState({
          type: AutomationRuleStateAction.UpdateLoading,
          loading: false,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { automationRulesState, updateAutomationRulesState };
}
