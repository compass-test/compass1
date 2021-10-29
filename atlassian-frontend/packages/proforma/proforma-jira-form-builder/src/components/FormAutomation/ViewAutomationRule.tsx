import React, { FC } from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import BitbucketBuildsIcon from '@atlaskit/icon/glyph/bitbucket/builds';
import BitbucketCompareIcon from '@atlaskit/icon/glyph/bitbucket/compare';
import DecisionIcon from '@atlaskit/icon/glyph/decision';
import SendIcon from '@atlaskit/icon/glyph/send';
import { N20, N30 } from '@atlaskit/theme/colors';
import {
  CommonMessage,
  IntlCommonMessages,
} from '@atlassian/proforma-common-core/jira-common';
import {
  AutomationRuleData,
  TriggerType,
} from '@atlassian/proforma-common-core/jira-common-models';

interface ViewAutomationRuleProps {
  automationRule: AutomationRuleData;
  editAutomationRule: (rule: AutomationRuleData) => void;
  deleteAutomationRule: (rule: AutomationRuleData) => void;
}

export const ViewAutomationRule: FC<ViewAutomationRuleProps> = ({
  automationRule,
  editAutomationRule,
  deleteAutomationRule,
}) => {
  const { trigger, name } = automationRule;

  const getRuleIcon = () => {
    switch (trigger.type) {
      case TriggerType.submit:
        return <SendIcon label="Rule Type: Submit" size="xlarge" />;
      case TriggerType.transition:
        return (
          <BitbucketCompareIcon label="Rule Type: Transition" size="xlarge" />
        );
      case TriggerType.workflowValidator:
        return (
          <BitbucketBuildsIcon
            label="Rule Type: Workflow Validator"
            size="xlarge"
          />
        );
      default:
        return <DecisionIcon label="Rule Type: Default" size="xlarge" />;
    }
  };

  const preventDefaultWrapper = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleEditAutomationRule = () => {
    editAutomationRule(automationRule);
  };

  const handleDeleteAutomationRule = () => {
    deleteAutomationRule(automationRule);
  };

  return (
    <ViewAutomationRuleWrapper onClick={handleEditAutomationRule}>
      {getRuleIcon()}
      <ViewAutomationRuleText>{name}</ViewAutomationRuleText>
      <DroplistWrapper onClick={preventDefaultWrapper}>
        <DropdownMenu triggerType="button" position="right top">
          <DropdownItemGroup>
            <DropdownItem onClick={handleEditAutomationRule}>
              <FormattedMessage {...IntlCommonMessages[CommonMessage.View]} />
            </DropdownItem>
            <DropdownItem onClick={handleDeleteAutomationRule}>
              <FormattedMessage {...IntlCommonMessages[CommonMessage.Delete]} />
            </DropdownItem>
          </DropdownItemGroup>
        </DropdownMenu>
      </DroplistWrapper>
    </ViewAutomationRuleWrapper>
  );
};

const ViewAutomationRuleWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${N20};
  padding: 14px;
  margin-bottom: 14px;
  border-radius: 5px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: ${N30};
  }
`;

const ViewAutomationRuleText = styled.div`
  width: 100%;
  margin: 0 14px;
`;

const DroplistWrapper = styled.div`
  width: 48px;
  min-width: 48px;
  text-align: center;
`;
