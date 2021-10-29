import { MockData } from '@af/proforma-mocks';
import {
  AutomationRuleData,
  AutomationRuleDataNoId,
} from '@atlassian/proforma-common-core/jira-common-models';

import { SettingsApi } from '../../src/apis/SettingsApi';

export class MockSettingsApi implements SettingsApi {
  // Used for mocking stateful api endpoints
  private lastAutomationRuleId = 1000;

  constructor(private mockData: MockData) {}

  public getAutomationRules = (): Promise<AutomationRuleData[]> => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(this.mockData.automationRules);
      }),
    );
  };

  public postAutomationRule = (
    automationRule: AutomationRuleDataNoId,
  ): Promise<AutomationRuleData> => {
    this.lastAutomationRuleId += 1;

    const newAutomationRule = {
      ...automationRule,
      id: `mockRule${this.lastAutomationRuleId}`,
    };

    return new Promise(resolve =>
      setTimeout(() => {
        resolve(newAutomationRule);
      }, 1000),
    );
  };

  public putAutomationRule = (
    automationRule: AutomationRuleData,
  ): Promise<any> => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve({});
      }, 1000),
    );
  };

  public deleteAutomationRule = (ruleId: string): Promise<any> => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve({});
      }, 1000),
    );
  };
}
