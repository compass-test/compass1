import React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import { ItemCardContent } from '../index';
import { makeInstruction } from '../instruction';
import { TaskId } from '../../../../../common/types';

import messages from './messages';

const AutomationRulesItemCardContentBase = ({ intl }: InjectedIntlProps) => {
  const keyElements = {
    projectSettings: (
      <strong>{intl.formatMessage(messages.projectSettings)}</strong>
    ),
    projectAutomation: (
      <strong>{intl.formatMessage(messages.projectAutomation)}</strong>
    ),
    addTemplateRules: (
      <strong>{intl.formatMessage(messages.addTemplateRules)}</strong>
    ),
  };
  return (
    <ItemCardContent
      description={intl.formatMessage(messages.automationRulesDescription)}
      learnMore={{
        url:
          'https://confluence.atlassian.com/servicedeskcloud/create-and-edit-rules-998868664.html',
        text: intl.formatMessage(messages.automationRulesLearnMore),
        taskId: TaskId.TurnOnAutomationRules,
      }}
      instructions={[
        makeInstruction(messages.automationRulesStep1, keyElements),
        makeInstruction(messages.automationRulesStep2, keyElements),
      ]}
    />
  );
};

export const AutomationRulesItemCardContent = injectIntl(
  AutomationRulesItemCardContentBase,
);
