import React, { Dispatch } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import styled from 'styled-components';

import SectionMessage from '@atlaskit/section-message';
import { PfLink } from '@atlassian/proforma-common-core/jira-common';
import { usePfAnalyticsUtils } from '@atlassian/proforma-common-core/jira-common-context';
import { LocalAutomationRuleData } from '@atlassian/proforma-common-core/jira-common-models';
import { AnalyticsEventName } from '@atlassian/proforma-common-core/jira-common-utils';

import {
  AutomationRulesState,
  AutomationRulesStateActions,
  AutomationRuleStateAction,
} from '../hooks/automationRules-hook';
import { SettingHeader } from '../settings/styled';

import {
  FormAutomationMessage,
  IntlFormAutomationMessages,
} from './FormAutomationMessages.intl';
import { messages } from './messages';
import { ViewAutomationRule } from './ViewAutomationRule';

interface FormAutomationProps {
  automationRulesState: AutomationRulesState;
  updateAutomationRulesState: Dispatch<AutomationRulesStateActions>;
  projectKey: string;
  projectId: number;
  isSimplifiedProject: boolean;
}

export const FormAutomation = injectIntl(
  ({
    automationRulesState,
    updateAutomationRulesState,
    projectKey,
    projectId,
    isSimplifiedProject,
    intl,
  }: FormAutomationProps & InjectedIntlProps) => {
    const { rules } = automationRulesState;

    const analyticsUtils = usePfAnalyticsUtils();

    const visibleRules = rules.filter(rule => !rule.delete);

    if (visibleRules.length === 0) {
      return <></>;
    }

    const automationForJiraLink = isSimplifiedProject
      ? `/projects/${projectKey}/settings/apps/com.codebarrel.addons.automation__cb-automation-project-config`
      : `/plugins/servlet/ac/com.codebarrel.addons.automation/cb-automation-project-config?project.key=${projectKey}&project.id=${projectId}`;

    const handleEditAutomationRule = (rule: LocalAutomationRuleData) => {
      updateAutomationRulesState({
        type: AutomationRuleStateAction.EditRule,
        rule,
      });
      analyticsUtils.track(AnalyticsEventName.AutomationEditRule, {
        projectId,
      });
    };

    const handleDeleteAutomationRule = (rule: LocalAutomationRuleData) => {
      updateAutomationRulesState({
        type: AutomationRuleStateAction.MarkRuleDeleted,
        rule,
      });
      analyticsUtils.track(AnalyticsEventName.AutomationDeleteRule, {
        projectId,
      });
    };

    return (
      <>
        <SettingHeader>
          <FormattedMessage
            {...IntlFormAutomationMessages[
              FormAutomationMessage.FormAutomationTitle
            ]}
          />
        </SettingHeader>
        <AutomationRulesContent>
          {visibleRules.map(automationRule => (
            <ViewAutomationRule
              automationRule={automationRule}
              editAutomationRule={handleEditAutomationRule}
              deleteAutomationRule={handleDeleteAutomationRule}
            />
          ))}
        </AutomationRulesContent>
        <SectionMessage
          appearance="warning"
          title={intl.formatMessage(messages.migrateHeader)}
        >
          <FormattedMessage
            {...messages.migrateParagraph}
            values={{
              automationLink: (
                <PfLink
                  href={automationForJiraLink}
                  message={messages.automationLink}
                  popup
                />
              ),
            }}
          />
        </SectionMessage>
      </>
    );
  },
);

export const AutomationRuleHeading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 34px;
`;

export const AutomationRulesContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 14px 0;
`;
