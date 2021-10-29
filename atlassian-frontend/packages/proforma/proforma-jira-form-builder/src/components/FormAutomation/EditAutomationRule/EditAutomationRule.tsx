import React, { Dispatch, FC, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Button, { ButtonGroup } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import { N40 } from '@atlaskit/theme/colors';
import {
  CommonMessage,
  IntlCommonMessages,
} from '@atlassian/proforma-common-core/jira-common';
import {
  AutomationRuleActionAddForm,
  AutomationRuleActionTransition,
  LocalAutomationRuleData,
  ReferenceData,
} from '@atlassian/proforma-common-core/jira-common-models';

import {
  AutomationRulesStateActions,
  AutomationRuleStateAction,
} from '../../hooks/automationRules-hook';
import {
  LocalAutomationRuleStateAction,
  useLocalAutomationRuleState,
} from '../../hooks/localAutomationRule-hook';
import { SettingHeader } from '../../settings/styled';
import {
  FormAutomationMessage,
  IntlFormAutomationMessages,
} from '../FormAutomationMessages.intl';

import {
  EditAutomationRuleMessage,
  IntlEditAutomationRuleMessages,
} from './EditAutomationRuleMessages.intl';
import {
  getAvailableConditions,
  getAvailableStatuses,
  getRuleActionTypeFromRule,
} from './helpers/helpers';
import { ActionSection } from './sections/ActionSection/ActionSection';
import { ConditionSection } from './sections/ConditionSection/ConditionSection';
import { IssueTypeSection } from './sections/IssueTypeSection/IssueTypeSection';
import {
  TriggerSection,
  TriggerType,
} from './sections/TriggerSection/TriggerSection';

interface EditAutomationRuleProps {
  isServiceProject: boolean;
  initialRule: LocalAutomationRuleData;
  settingsRefData: ReferenceData;
  updateAutomationRulesState: Dispatch<AutomationRulesStateActions>;
}

export const EditAutomationRule: FC<EditAutomationRuleProps> = ({
  isServiceProject,
  initialRule,
  settingsRefData,
  updateAutomationRulesState,
}) => {
  const {
    localAutomationRuleState,
    updateLocalAutomationRuleState,
  } = useLocalAutomationRuleState(initialRule);
  const { rule, localConditions } = localAutomationRuleState;

  // Conditions that are available based on the trigger Type
  const availableConditions = getAvailableConditions(
    rule.trigger.type as TriggerType,
  );

  // Conditions that can be added (available conditions - current conditions)
  const applicableConditions = availableConditions.filter(
    condition => !localConditions.some(c => c.type === condition),
  );

  const availableStatuses = getAvailableStatuses(
    settingsRefData.statuses,
    settingsRefData.issueTypes,
    settingsRefData.requestTypes,
    rule.conditions.issueTypeId,
    rule.conditions.requestTypeId,
  );

  useEffect(() => {
    // Remove status values that are incompatible due to a issue/request type change
    const compatibleStatuses = getAvailableStatuses(
      settingsRefData.statuses,
      settingsRefData.issueTypes,
      settingsRefData.requestTypes,
      rule.conditions.issueTypeId,
      rule.conditions.requestTypeId,
    ).map(status => status.id);

    updateLocalAutomationRuleState({
      type: LocalAutomationRuleStateAction.RemoveUnCompatibleStatuses,
      compatibleStatuses,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rule.conditions.issueTypeId, rule.conditions.requestTypeId]);

  const handleCancelEdit = () => {
    updateAutomationRulesState({
      type: AutomationRuleStateAction.CancelEditRule,
      rule,
    });
  };

  return (
    <EditAutomationRuleWrapper>
      <SettingHeader>
        <FormattedMessage
          {...IntlFormAutomationMessages[
            FormAutomationMessage.FormAutomationTitle
          ]}
        />
      </SettingHeader>
      <AutomationRuleContent>
        <AutomationRuleSection>
          <h3>
            <FormattedMessage
              {...IntlEditAutomationRuleMessages[
                EditAutomationRuleMessage.RuleNameSectionTitle
              ]}
            />
          </h3>
          <Textfield value={rule.name} isDisabled />
        </AutomationRuleSection>
        <AutomationRuleSection>
          <h3>
            <FormattedMessage
              {...IntlEditAutomationRuleMessages[
                EditAutomationRuleMessage.WhenSectionTitle
              ]}
            />
          </h3>
          <TriggerSection
            // @ts-ignore
            triggerType={rule.trigger.type}
            status={rule.conditions.status2}
            availableStatuses={availableStatuses}
            validationErrors={[]}
          />
        </AutomationRuleSection>
        <AutomationRuleSection>
          <h3>
            <FormattedMessage
              {...IntlEditAutomationRuleMessages[
                EditAutomationRuleMessage.ForSectionTitle
              ]}
            />
          </h3>
          <IssueTypeSection
            availableIssueTypes={settingsRefData.issueTypes}
            availableRequestTypes={settingsRefData.requestTypes}
            issueTypeId={rule.conditions.issueTypeId}
            requestTypeId={rule.conditions.requestTypeId}
          />
        </AutomationRuleSection>
        <AutomationRuleSection>
          <h3>
            <FormattedMessage
              {...IntlEditAutomationRuleMessages[
                EditAutomationRuleMessage.IfSectionTitle
              ]}
            />
          </h3>
          <ConditionSection
            conditions={localConditions}
            availableConditions={applicableConditions}
            availableStatuses={availableStatuses}
            validationErrors={[]}
          />
        </AutomationRuleSection>
        <AutomationRuleSection>
          <h3>
            <FormattedMessage
              {...IntlEditAutomationRuleMessages[
                EditAutomationRuleMessage.ThenSectionTitle
              ]}
            />
          </h3>
          <ActionSection
            isServiceProject={isServiceProject}
            actionType={getRuleActionTypeFromRule(rule)}
            availableStatuses={availableStatuses}
            actionStatus={(rule.action as AutomationRuleActionTransition).to}
            addFormDoNotDuplicate={
              (rule.action as AutomationRuleActionAddForm).doNotDuplicate
            }
            addFormVisibilityExternal={
              (rule.action as AutomationRuleActionAddForm).external
            }
            validationErrors={[]}
          />
        </AutomationRuleSection>
      </AutomationRuleContent>
      <AutomationRulesControlPanel>
        <ButtonGroup>
          <Button onClick={handleCancelEdit}>
            <FormattedMessage {...IntlCommonMessages[CommonMessage.Cancel]} />
          </Button>
        </ButtonGroup>
      </AutomationRulesControlPanel>
    </EditAutomationRuleWrapper>
  );
};

export const EditAutomationRuleWrapper = styled.div`
  margin-bottom: 120px;
`;

export const AutomationRuleHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 34px;
`;

export const AutomationRuleContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 14px 0;
`;

export const AutomationRuleSection = styled.div`
  border: solid 1px ${N40};
  padding: 14px;
  margin-bottom: 14px;

  &:last-child {
    margin: 0;
  }
`;

export const AutomationRulesControlPanel = styled.div`
  display: flex;
  justify-content: flex-end;
`;
