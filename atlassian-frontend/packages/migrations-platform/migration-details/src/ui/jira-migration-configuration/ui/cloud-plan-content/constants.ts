import { JiraAppConstants } from './types';

export const jiraConstants: JiraAppConstants = {
  cloudEditionNames: {
    free: 'Free',
    standard: 'Standard',
    premium: 'Premium',
  },
  cloudName: 'Jira Cloud',
  feedbackCollector: {
    requestTypeId: '120',
    embeddableKey: 'e6e94b5a-b236-41ad-be67-d30ceb46e05c',
  },
  cloudProductNames: {
    'jira-core.ondemand': 'Jira Work Management Cloud',
    'jira-software.ondemand': 'Jira Software Cloud',
    'jira-servicedesk.ondemand': 'Jira Service Management Cloud',
  },
  cloudProductScores: {
    'jira-core.ondemand': 0,
    'jira-software.ondemand': 1,
    'jira-servicedesk.ondemand': 2,
  },
};
