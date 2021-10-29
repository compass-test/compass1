import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'jira.portfolio-plan-wizard.over-limit-flag.title',
    defaultMessage: "We can't create your plan",
    description: 'Title for a popup flag when there are too many issues',
  },
  tooManyIssues: {
    id: 'jira.portfolio-plan-wizard.over-limit-flag.too-many-issues',
    defaultMessage:
      'Your plan has exceeded the limit of {limit} {limit, plural, one {issue} other {issues}}. Try removing an issue source, or setting rules to exclude more issues from the plan.',
    description:
      'Warning description for a popup flag when there are too many issues',
  },
  tooManyProjects: {
    id: 'jira.portfolio-plan-wizard.over-limit-flag.too-many-projects',
    defaultMessage:
      "The sources you've selected connect to more than {limit} {limit, plural, one {project} other {projects}}. You’ll need to change your issue sources to include fewer projects.",
    description:
      'Warning description for a popup flag when there are too many projects',
  },
});

export default messages;
