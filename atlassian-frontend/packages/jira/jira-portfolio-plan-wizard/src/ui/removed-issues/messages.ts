// @flow strict-local

import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'jira-portfolio-plan-wizard.remove-issues.title',
    defaultMessage: 'Removed issues',
    description: 'Title for remove issues page',
  },
  description: {
    id: 'jira-portfolio-plan-wizard.remove-issues.description',
    defaultMessage:
      'The issues below have been removed from the plan, but are still in Jira. Select any that you want to re-include. A maximum of {issueLimit} issues can be loaded.',
    description: 'Description under the title for remove issues config page',
  },
  reinclude: {
    id: 'jira-portfolio-plan-wizard.remove-issues.reinclude',
    defaultMessage: 'Re-include',
    description: 'Button text to reinclude issues back into the plan',
  },
  hierarchy: {
    id: 'jira-portfolio-plan-wizard.remove-issues.hierarchy',
    defaultMessage: 'Hierarchy',
    description: 'Hierarchy as in issue Hierarchy',
  },
  hierarchyDivider: {
    id: 'jira-portfolio-plan-wizard.remove-issues.hierarchy-divider',
    defaultMessage: 'to',
    description:
      'Hierarchy divider word between two selections. ie [top] "to" [bottom]',
  },
  searchIssues: {
    id: 'jira-portfolio-plan-wizard.remove-issues.search-issues',
    defaultMessage: 'Search issues',
    description: 'Placeholder for the search box to search/filter for issues',
  },
  loading: {
    id: 'jira-portfolio-plan-wizard.remove-issues.loading',
    defaultMessage: 'loading',
    description: 'Placeholder while loading',
  },
  subtask: {
    id: 'jira-portfolio-plan-wizard.remove-issues.subtask',
    defaultMessage: 'subtask',
    description: 'Hierarchy subtask',
  },
  story: {
    id: 'jira-portfolio-plan-wizard.remove-issues.story',
    defaultMessage: 'story',
    description: 'Hierarchy story',
  },
  epic: {
    id: 'jira-portfolio-plan-wizard.remove-issues.epic',
    defaultMessage: 'epic',
    description: 'Hierarchy epic',
  },
});
