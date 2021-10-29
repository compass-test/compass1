// @flow strict-local

import { defineMessages } from 'react-intl';

export default defineMessages({
  status: {
    id: 'jira-portfolio-plan-wizard.refine-issues.status',
    defaultMessage: 'Status',
    description: 'The word status for issue status',
  },
  allStatusesFromCategory: {
    id: 'jira-portfolio-plan-wizard.refine-issues.all-statuses-from-category',
    defaultMessage: 'All {categoryName} Statuses',
    description: 'For selecting entire category of statuses',
  },
  noStatusesExcluded: {
    id: 'jira-portfolio-plan-wizard.refine-issues.no-statuses-excluded',
    defaultMessage: '0 issue statuses excluded from the plan',
    description: 'When nothing is excluded',
  },
  statusLoading: {
    id: 'jira-portfolio-plan-wizard.refine-issues.status-loading',
    defaultMessage: 'loading...',
    description: 'Message for loading',
  },
  statusNoOptions: {
    id: 'jira-portfolio-plan-wizard.refine-issues.status-no-options',
    defaultMessage: 'No options',
    description: 'Message for when there are no options',
  },
  chooseStatusPlaceholder: {
    id: 'jira-portfolio-plan-wizard.refine-issues.choose-status-placeholder',
    defaultMessage: 'Choose status',
    description: 'Placeholder for search for status',
  },
});
