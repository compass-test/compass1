import { defineMessages } from 'react-intl';

export default defineMessages({
  noEpic: {
    id: 'dragonfruit-page-component-details.ui.jira.no-epic-header.nonfinal',
    defaultMessage: 'Issues with no Epic',
    description: 'The title for issues with no associated epic',
  },
  emptySection: {
    id:
      'dragonfruit-page-component-details.ui.jira.issue-empty-section.nonfinal',
    defaultMessage:
      'There are currently no relevant issues assigned to this Epic',
    description: 'The placeholder for a section with no issues',
  },
  fetchIssuesError: {
    id:
      'dragonfruit-page-component-details.ui.jira.fetch-issues-error.nonfinal',
    defaultMessage: 'Failed to fetch issues for this Epic',
    description: 'Error message to display on fetching issues for an epic',
  },
});
