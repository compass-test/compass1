import { defineMessages } from 'react-intl';

export default defineMessages({
  pageHeader: {
    id: 'dragonfruit-page-component-details.ui.jira.page-header.nonfinal',
    defaultMessage: 'Jira issues',
    description: 'The main page header for the component details Jira page',
  },
  pageDescription: {
    id: 'dragonfruit-page-component-details.ui.jira.page-description.nonfinal',
    defaultMessage:
      'Keep track of your issues and project data from Jira Software.',
    description: 'The description for the component Jira page',
  },
  issueFilterExplanation: {
    id:
      'dragonfruit-page-component-details.ui.jira.issue-filter-explanation.nonfinal',
    defaultMessage:
      'These Jira issues are displaying ticket link, epic, and status because they have their component field set as',
    description: 'The description for the component Jira page',
  },
  issueFilterExplanation2: {
    id:
      'dragonfruit-page-component-details.ui.jira.issue-filter-explanation-2.nonfinal',
    defaultMessage:
      '. To filter further, continue this search in Jira Software.',
    description: 'The description for the component Jira page',
  },
  jiraAdvSearch: {
    id: 'dragonfruit-page-component-details.ui.jira.adv-search-link.nonfinal',
    defaultMessage: 'Search in Jira Software',
    description: 'The link text to go to Advanced Search in Jira',
  },
  noProjectsHeader: {
    id:
      'dragonfruit-page-component-details.ui.jira.empty-state-header.nonfinal',
    defaultMessage: "See what's happening with your component",
    description:
      'The default empty state header for a component with no Jira projects linked',
  },
  noProjectsDescription: {
    id:
      'dragonfruit-page-component-details.ui.jira.empty-state-description.nonfinal',
    defaultMessage:
      'Add Jira projects to Compass and bring disconnected information about components to help you track your epics and issues.',
    description:
      'The default empty state description for a component with no Jira projects linked',
  },
});
