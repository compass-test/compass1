import {
  AutomationRuleData,
  AutomationRuleDataNoId,
} from '@atlassian/proforma-common-core/jira-common-models';

export interface SettingsApi {
  getAutomationRules: () => Promise<AutomationRuleData[]>;
  postAutomationRule: (
    automationRule: AutomationRuleDataNoId,
  ) => Promise<AutomationRuleData>;
  putAutomationRule: (automationRule: AutomationRuleData) => Promise<any>;
  deleteAutomationRule: (ruleId: string) => Promise<any>;
}
