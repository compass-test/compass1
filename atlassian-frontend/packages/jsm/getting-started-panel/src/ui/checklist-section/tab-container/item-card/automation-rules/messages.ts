import { ReactElement } from 'react';
import { defineMessages } from 'react-intl';
import messages from '../messages';

export interface AutomationRulesElements {
  projectSettings: ReactElement;
  projectAutomation: ReactElement;
  addTemplateRules: ReactElement;
}

export default {
  ...messages,
  ...defineMessages({
    automationRulesDescription: {
      id: 'jsm.gettingStartedPanel.automationRulesDescription',
      defaultMessage:
        'There are a number of sample automation rules that can be turned on to get you started with change management.',
      description: 'Summary of what turning on automation rules can do',
    },
    automationRulesStep1: {
      id: 'jsm.gettingStartedPanel.automationRulesStep1',
      defaultMessage: '1. Go to {projectSettings} > {projectAutomation}',
      description: `
    The first step to turn on automation rules.
    {projectSettings} will match 'jsm.gettingStartedPanel.projectSettings' - Heading/button for the project settings page.
    {projectAutomation} will match 'jsm.gettingStartedPanel.projectAutomation' - The Project automation sidebar item in Project settings.
  `,
    },
    automationRulesStep2: {
      id: 'jsm.gettingStartedPanel.automationRulesStep2',
      defaultMessage: '2. Select {addTemplateRules}',
      description: `
    The second step to turn on automation rules.
    {addTemplateRules} will match 'jsm.gettingStartedPanel.addTemplateRules' - The button in Project automation to add sample rules.
  `,
    },
    automationRulesLearnMore: {
      id: 'jsm.gettingStartedPanel.automationRulesLearnMore',
      defaultMessage: 'Learn more about automation rules',
      description: 'Button to learn more about automation rules',
    },
  }),
};
