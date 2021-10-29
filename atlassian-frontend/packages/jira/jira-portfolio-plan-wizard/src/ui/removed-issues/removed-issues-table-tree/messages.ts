// @flow strict-local

import { defineMessages } from 'react-intl';

export default defineMessages({
  noAvailableRemovedIssues: {
    id: 'jira-portfolio-plan-wizard.remove-issues.no-available-excluded-issues',
    defaultMessage: 'No issues are available to re-include in the plan.',
    description: 'when there are no issues excluded to re-include',
  },
  tableHeaderSelectAll: {
    id: 'jira-portfolio-plan-wizard.remove-issues.table-header-select-all',
    defaultMessage: 'Select all',
    description: 'Select all',
  },
  tableHeaderDeselectAll: {
    id: 'jira-portfolio-plan-wizard.remove-issues.table-header-deselect-all',
    defaultMessage: 'Deselect all',
    description: 'Deselect all',
  },
  tableHeaderIssue: {
    id: 'jira-portfolio-plan-wizard.remove-issues.table-header-issue',
    defaultMessage: 'Issue',
    description: 'Table header for Issue column',
  },
  tableHeaderStatus: {
    id: 'jira-portfolio-plan-wizard.remove-issues.table-header-status',
    defaultMessage: 'Status',
    description: 'Table header for Status column',
  },
  moreOptions: {
    id: 'jira-portfolio-plan-wizard.remove-issues.more',
    defaultMessage: 'more options',
    description: 'Meatballs menu label for more options',
  },
  selectThisAndAllDescendants: {
    id:
      'jira-portfolio-plan-wizard.remove-issues.select-this-and-all-descendants',
    defaultMessage: 'Select this and all descendant issues',
    description: 'Select the item clicked on and all of its descendants',
  },
  selectOnlyDescendants: {
    id: 'jira-portfolio-plan-wizard.remove-issues.select-only-descendants',
    defaultMessage: 'Select only descendant issues',
    description: 'Select only descendant issues',
  },
  defaultStatus: {
    id: 'jira-portfolio-plan-wizard.remove-issues.default-status',
    defaultMessage: 'todo',
    description:
      'default status category when there is some api mismatch which is todo',
  },
});
