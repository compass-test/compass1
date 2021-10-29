// @flow strict-local

import { defineMessages } from 'react-intl';

export default defineMessages({
  label: {
    id: 'jira-portfolio-plan-wizard.view-releases.project-select.label',
    defaultMessage: 'Project',
    description: 'The word Project on the button',
  },
  all: {
    id: 'jira-portfolio-plan-wizard.view-releases.project-select.all',
    defaultMessage: 'All',
    description: 'When all projects are selected',
  },
  loading: {
    id: 'jira-portfolio-plan-wizard.view-releases.project-select.loading',
    defaultMessage: 'Loading...',
    description: 'Loading text for when projects are loading',
  },
  noneAvailable: {
    id: 'jira-portfolio-plan-wizard.view-releases.project-select.none',
    defaultMessage: 'No projects available',
    description: 'When no projects are available',
  },
  allProjects: {
    id: 'jira-portfolio-plan-wizard.view-releases.project-select.all-projects',
    defaultMessage: 'All projects',
    description: 'Label for checkbox for select all projects',
  },
  clearSelected: {
    id:
      'jira-portfolio-plan-wizard.view-releases.project-select.clear-selected',
    defaultMessage: 'Clear selected',
    description: 'Label for checkbox for clearing selected',
  },
});
