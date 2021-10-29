import { defineMessages } from 'react-intl';

export default defineMessages({
  emptySection: {
    id:
      'dragonfruit-page-component-details.ui.jira.epics-empty-section.nonfinal',
    defaultMessage:
      'There are currently no relevant issues assigned to this Project',
    description: 'The placeholder for a section with no issues',
  },
  fetchIssuesError: {
    id:
      'dragonfruit-page-component-details.ui.jira.fetch-issues-error.nonfinal',
    defaultMessage: 'Failed to fetch issues for this Project',
    description: 'Error message to display on fetching issues for a project',
  },
});
