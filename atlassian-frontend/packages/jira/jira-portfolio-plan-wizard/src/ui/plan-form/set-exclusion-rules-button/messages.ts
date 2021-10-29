import { defineMessages } from 'react-intl';

export default defineMessages({
  noIssueSourcesTooltip: {
    id:
      'jira.portfolio-plan-wizard.plan-form.set-exclusion-rules.no-issue-sources-tooltip',
    defaultMessage: 'Select an issue source to set rules',
    description:
      'Tooltip for the set exclusion rules button for when the issues sources are not set',
  },

  projectsOverLimitTooltip: {
    id:
      'jira.portfolio-plan-wizard.plan-form.set-exclusion-rules.projects-over-limit-tooltip',
    defaultMessage:
      'Edit your issue sources to include less than {limit} projects',
    description:
      'Tooltip for the set exclusion rules button for when the projects hit the limit',
  },
  label: {
    id: 'jira.portfolio-plan-wizard.plan-form.set-exclusion-rules.label',
    defaultMessage: 'Set exclusion rules',
  },
});
