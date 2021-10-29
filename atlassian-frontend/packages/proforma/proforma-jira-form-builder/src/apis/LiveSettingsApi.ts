import { ApiUtil } from '@atlassian/proforma-common-core/jira-common-apis';
import {
  AutomationRuleData,
  AutomationRuleDataNoId,
  BackendSettings,
} from '@atlassian/proforma-common-core/jira-common-models';

import { SettingsApi } from './SettingsApi';

export class LiveSettingsApi implements SettingsApi {
  private util: ApiUtil;

  private settings: BackendSettings<{
    projectId: number;
    templateFormId: number;
  }>;

  public constructor(
    util: ApiUtil,
    settings: BackendSettings<{ projectId: number; templateFormId: number }>,
  ) {
    this.util = util;
    this.settings = settings;
  }

  public getAutomationRules = (): Promise<AutomationRuleData[]> => {
    const { projectId, templateFormId } = this.settings.context;
    return this.util.get(
      `/api/1/projects/${projectId}/forms/${templateFormId}/automation`,
    );
  };

  public postAutomationRule = (
    automationRule: AutomationRuleDataNoId,
  ): Promise<AutomationRuleData> => {
    const { projectId } = this.settings.context;
    return this.util.post(
      `/api/1/projects/${projectId}/automation`,
      automationRule,
    );
  };

  public putAutomationRule = (
    automationRule: AutomationRuleData,
  ): Promise<any> => {
    const { projectId } = this.settings.context;
    return this.util.put(
      `/api/1/projects/${projectId}/automation/${automationRule.id}`,
      automationRule,
    );
  };

  public deleteAutomationRule = (ruleId: string): Promise<any> => {
    const { projectId } = this.settings.context;
    return this.util.delete(
      `/api/1/projects/${projectId}/automation/${ruleId}`,
    );
  };
}
