// @flow strict-local

import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'jira-portfolio-plan-wizard.refine-issues.title',
    defaultMessage: 'Refine issues displayed',
    description: 'Title for refine issues page',
  },
  titleSettings: {
    id: 'jira-portfolio-plan-wizard.refine-issues.title-settings-page',
    defaultMessage: 'Exclusion rules',
    description: 'Title for refine issues page when in settings mode',
  },
  description: {
    id: 'jira-portfolio-plan-wizard.refine-issues.description',
    defaultMessage:
      'Set rules to exclude issues you don’t need to see in this plan. These rules can be changed later.',
    description: 'Description under the title for refine issues page',
  },
  descriptionSettings: {
    id: 'jira-portfolio-plan-wizard.refine-issues.description-settings',
    defaultMessage:
      'Edit the rules for excluding issues you don’t need to see in this plan.',
    description: 'Description under the title for refine issues page',
  },
  excludeDaysLabel: {
    id: 'jira-portfolio-plan-wizard.refine-issues.exclude-days-label',
    defaultMessage: 'Exclude resolved issues after',
    description: 'Title for exclude resolved issues after',
  },
  excludeDaysLabelStatusCategoryChangeDate: {
    id:
      'jira-portfolio-plan-wizard.refine-issues.exclude-days-label-status-category-change-date',
    defaultMessage: 'Exclude any completed issues after',
    description: 'Title for exclude completed issues after',
  },
  excludeIssueTypeLabel: {
    id: 'jira-portfolio-plan-wizard.refine-issues.exclude-issue-type-label',
    defaultMessage: 'Exclude issue types',
    description: 'Title for exclude issues types',
  },
  excludeStatusTypeLabel: {
    id: 'jira-portfolio-plan-wizard.refine-issues.exclude-status-type-label',
    defaultMessage: 'Exclude statuses',
    description: 'Title for exclude status types',
  },
  backToPlan: {
    id: 'jira-portfolio-plan-wizard.refine-issues.back-to-create-plan',
    defaultMessage: 'Back to create plan',
    description: 'Back to first page button',
  },
  excludeReleases: {
    id: 'jira-portfolio-plan-wizard.refine-issues.exclude-releases',
    defaultMessage: 'Exclude releases',
    description: 'Title for Exclude releases',
  },
  viewReleases: {
    id: 'jira-portfolio-plan-wizard.refine-issues.view-releases',
    defaultMessage: 'View releases',
    description: 'Opens a release exclude modal',
  },
  viewReleasesCancel: {
    id: 'jira-portfolio-plan-wizard.refine-issues.view-releases-cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button in the view releases modal',
  },
  numReleasesExcluded: {
    id: 'jira-portfolio-plan-wizard.refine-issues.num-excluded-releases',
    defaultMessage:
      '{numExcludedReleases} {numExcludedReleases, plural, one {release} other {releases}} excluded',
    description: 'Cancel button in the view releases modal',
  },
  daysSinceDoneValidation: {
    id: 'jira-portfolio-plan-wizard.refine-issues.days-since-done-validation',
    defaultMessage: 'Please enter a whole number.',
    description: 'Only whole numbers allowed',
  },
});
