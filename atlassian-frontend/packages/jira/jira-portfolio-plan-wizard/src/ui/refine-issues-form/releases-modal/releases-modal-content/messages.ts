// @flow strict-local

import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'jira-portfolio-plan-wizard.view-releases.title',
    defaultMessage: 'Releases',
    description: 'Title for view releases modal',
  },
  descriptionExclude: {
    id: 'jira-portfolio-plan-wizard.view-releases.description-exclude',
    defaultMessage:
      'Select releases to exclude from the plan. This will exclude all issues associated with the release.',
    description: 'Description for exclusion instructions',
  },
  descriptionReInclude: {
    id: 'jira-portfolio-plan-wizard.view-releases.description-re-include',
    defaultMessage:
      'Releases that have already been released are excluded from the plan. Select any below that you want to re-include.',
    description: 'Description for re include instructions',
  },
  descriptionSelectReinclude: {
    id:
      'jira-portfolio-plan-wizard.view-releases.description-select-re-include',
    defaultMessage:
      'Select releases to re-include in the plan. This will include all issues associated with the release.',
    description:
      'Description for re include instructions when plan contains released releases',
  },
  optionModeExclude: {
    id: 'jira-portfolio-plan-wizard.view-releases.option-exclude',
    defaultMessage: 'Releases included in plan',
    description: 'Option for showing included releases',
  },
  optionModeReInclude: {
    id: 'jira-portfolio-plan-wizard.view-releases.option-re-include',
    defaultMessage: 'Releases excluded from plan',
    description: 'Option for showing excluded releases',
  },
  searchForRelease: {
    id: 'jira-portfolio-plan-wizard.view-releases.search-for-release',
    defaultMessage: 'Search for release...',
    description: 'Placeholder for search for release',
  },
  tableHeaderTitle: {
    id: 'jira-portfolio-plan-wizard.view-releases.table-header-title',
    defaultMessage: 'Title',
    description: 'Table header Title',
  },
  tableHeaderStatus: {
    id: 'jira-portfolio-plan-wizard.view-releases.table-header-status',
    defaultMessage: 'Status',
    description: 'Table header Status',
  },
  tableHeaderStartDate: {
    id: 'jira-portfolio-plan-wizard.view-releases.table-header-start-date',
    defaultMessage: 'Start date',
    description: 'Table header start date',
  },
  tableHeaderReleaseDate: {
    id: 'jira-portfolio-plan-wizard.view-releases.table-header-relesea-date',
    defaultMessage: 'Release date',
    description: 'Table header release date',
  },
  tableHeaderSelectAll: {
    id: 'jira-portfolio-plan-wizard.view-releases.table-header-select-all',
    defaultMessage: 'Select all',
    description: 'Select all',
  },
  tableHeaderDeselectAll: {
    id: 'jira-portfolio-plan-wizard.view-releases.table-header-deselect-all',
    defaultMessage: 'Deselect all',
    description: 'Deselect all',
  },
  tableNoAvailableReleasesExclude: {
    id:
      'jira-portfolio-plan-wizard.view-releases.table-no-available-releases-exclude',
    defaultMessage: 'No releases are available to exclude from the plan.',
    description: 'When there is no releaes to choose from',
  },
  tableNoAvailableReleasesInclude: {
    id:
      'jira-portfolio-plan-wizard.view-releases.table-no-available-releases-include',
    defaultMessage: 'No releases are available to include in the plan.',
    description: 'When there is no releaes to choose from',
  },
  released: {
    id: 'jira-portfolio-plan-wizard.view-releases.released',
    defaultMessage: 'released',
    description: 'Released release',
  },
});
