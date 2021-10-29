import { defineMessages } from 'react-intl';

export default defineMessages({
  addProjectsLabel: {
    id: 'dragonfruit.components.links.add-link-form.project-field',
    defaultMessage: 'Add <b>"{projectName}"</b>',
    description: 'Text for user adding custom URL in project search.',
  },
  projectSelectPlaceholder: {
    id: 'dragonfruit.components.links.add-link-form.project-field-placeholder',
    defaultMessage: 'URL or Jira project',
    description: 'Placeholder for project search field.',
  },
  projectSearchFailedError: {
    id:
      'dragonfruit.components.links.add-link-form.project-field-search-failed',
    defaultMessage: 'Search failed. Start typing to search again',
    description: 'Error message shown when Jira project search fails.',
  },
  projectSearchEmptyInput: {
    id: 'dragonfruit.components.links.add-link-form.project-field-search-empty',
    defaultMessage: 'Start typing to search Jira projects',
    description: 'This message appears on empty results for project search.',
  },
  projectLengthTooLongError: {
    id: 'dragonfruit.components.links.add-link-form.project-field-search-empty',
    defaultMessage: 'Start typing to search Jira projects',
    description: 'This message appears on empty results for project search.',
  },
});
