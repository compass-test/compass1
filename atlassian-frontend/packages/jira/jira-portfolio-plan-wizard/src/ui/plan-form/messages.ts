import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'jira.portfolio-plan-wizard.plan-form.title',
    defaultMessage: 'Create plan',
  },
  issueSourcesTitleSettings: {
    id: 'jira.portfolio-plan-wizard.plan-form.issue-sources-title-settings',
    defaultMessage: 'Issue sources',
  },
  issueSourcesDescriptionSettingsStatusCategoryChangeDate: {
    id:
      'jira.portfolio-plan-wizard.plan-form.issue-sources-description-settings-status-category-change-date',
    defaultMessage:
      "Issue sources form the scope of your plan. If you can't find a specific issue, {LearnMoreLink}.",
  },
  learnMore: {
    id: 'jira.portfolio-plan-wizard.plan-form.learn-more',
    defaultMessage: 'learn more about missing issues',
  },
  subTitle: {
    id: 'jira.portfolio-plan-wizard.plan-form.subtitle',
    defaultMessage:
      'Connect to issue sources in Jira Software to create a roadmap that’s always in sync with your work.',
  },
  nameLabel: {
    id: 'jira.portfolio-plan-wizard.plan-form.name-label',
    defaultMessage: 'Plan name',
  },
  namePlaceholder: {
    id: 'jira.portfolio-plan-wizard.plan-form.name-placeholder',
    defaultMessage: 'Enter a plan name',
  },
  mameEmptyError: {
    id: 'jira.portfolio-plan-wizard.plan-form.name-empty-error',
    defaultMessage: 'Enter a plan name to continue.',
  },
  nameHitLimitError: {
    id: 'jira.portfolio-plan-wizard.plan-form.name-hit-limit-error',
    defaultMessage:
      'Enter a plan name with less than {limit} {limit, plural, one {character} other {characters}}.',
  },
  permissionLabel: {
    id: 'jira.portfolio-plan-wizard.plan-form.permission-label',
    defaultMessage: 'Access',
  },
  issueSourcesLabel: {
    id: 'jira.portfolio-plan-wizard.plan-form.issue-sources-label',
    defaultMessage: 'Issue sources',
  },
  issueSourcesEmptyError: {
    id: 'jira.portfolio-plan-wizard.plan-form.issue-sources-empty-error',
    defaultMessage: 'Select an issue source to continue.',
  },
  setRulesHeading: {
    id: 'jira.portfolio-plan-wizard.plan-form.set-rules-heading',
    defaultMessage: 'Refine issues displayed',
  },
  setRulesMessage: {
    id: 'jira.portfolio-plan-wizard.plan-form.set-rules-message',
    defaultMessage:
      'Set rules to exclude certain issues from the issue sources selected.',
  },
  tellMeMore: {
    id: 'jira.portfolio-plan-wizard.plan-form.tell-me-more',
    defaultMessage: 'Tell me more',
  },
  create: {
    id: 'jira.portfolio-plan-wizard.plan-form.create',
    defaultMessage: 'Create',
  },
  cancel: {
    id: 'jira.portfolio-plan-wizard.plan-form.cancel',
    defaultMessage: 'Cancel',
  },
  issueLimitErrorOnCreationPage: {
    id: 'jira.portfolio-plan-wizard.issue-limit-creation-page',
    defaultMessage:
      'Your plan contains more than {issueLimit} {issueLimit, plural, one {issue} other {issues}}. Remove issue sources or use the section below to refine your plan.',
    description: 'Issue limit inline error for creation page',
  },
  issueLimitErrorOnEditPage: {
    id: 'jira.portfolio-plan-wizard.issue-limit-edit-page',
    defaultMessage:
      'The plan has exceeded the limit of {issueLimit} {issueLimit, plural, one {issue} other {issues}}. Try removing an issue source, or setting rules to exclude more issues from the plan.',
    description: 'Issue limit inline error for edit page',
  },
  projectLimitOnCreationPage: {
    id: 'jira.portfolio-plan-wizard.project-limit-creation-page',
    defaultMessage:
      'Your plan contains more than {projectLimit} {projectLimit, plural, one {project} other {projects}}. Remove issue sources or use the section below to refine your plan.',
    description: 'Project limit inline error for creation page',
  },
  issueAndProjectLimitErrorOnCreationPage: {
    id:
      'jira.portfolio-plan-wizard.issue-limit-and-project-limit-creation-page',
    defaultMessage:
      'Your plan contains more than {projectLimit} {projectLimit, plural, one {project} other {projects}} and {issueLimit} {issueLimit, plural, one {issue} other {issues}}. Remove issue sources or use the section below to refine your plan.',
    description: 'Issue limit and Project limit inline error for creation page',
  },
  issueAndProjectLimitErrorOnEditPage: {
    id: 'jira.portfolio-plan-wizard.issue-limit-and-project-limit-edit-page',
    defaultMessage:
      'Advanced Roadmaps can’t display your plan because it contains more than {projectLimit} {projectLimit, plural, one {project} other {projects}} and {issueLimit} {issueLimit, plural, one {issue} other {issues}}. You’ll need to remove some before you can continue.',
    description: 'Issue limit and Project limit inline error for edit page',
  },
  projectLimitOnEditPage: {
    id: 'jira.portfolio-plan-wizard.project-limit-edit-page',
    defaultMessage:
      'Advanced Roadmaps can’t display your plan because it contains more than {projectLimit} {projectLimit, plural, one {project} other {projects}}. You’ll need to remove some before you can continue.',
    description: 'Project limit inline error for edit pager',
  },
  projectOverLimitSectionHeader: {
    id: 'jira.portfolio-plan-wizard.project-over-limit.section-header',
    defaultMessage: 'Your plan contains too many projects',
    description: 'Project limit section header',
  },
  projectOverLimitSectionBody: {
    id: 'jira.portfolio-plan-wizard.project-over-limit.section-body',
    defaultMessage:
      'Advanced Roadmaps limits the number of projects you can include in a plan.',
    description: 'Project limit section body',
  },
  issueSourcesLearnMore: {
    id: 'jira.portfolio-plan-wizard.project-over-limit.section-learnmore',
    defaultMessage: 'Learn more about issue sources',
  },
  projectOverLimitTitle: {
    id: 'jira.portfolio-plan-wizard.project-over-limit.title',
    defaultMessage: `Edit {planName} plan issue sources`,
    description: 'Project limit title',
  },
  update: {
    id: 'jira.portfolio-plan-wizard.project-over-limit.update',
    defaultMessage: 'Update',
  },
});
