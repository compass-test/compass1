import { defineMessages } from 'react-intl';

export default defineMessages({
  private: {
    id: 'jira.portfolio-plan-wizard.plan-form.permission-field.private',
    defaultMessage: 'Private',
  },
  privateExplained: {
    id:
      'jira.portfolio-plan-wizard.plan-form.permission-field.private-explained',
    defaultMessage:
      'Only you can view the plan. You can share it with individual users or groups later.',
  },
  open: {
    id: 'jira.portfolio-plan-wizard.plan-form.permission-field.open',
    defaultMessage: 'Open',
  },
  openExplained: {
    id: 'jira.portfolio-plan-wizard.plan-form.permission-field.open-explained',
    defaultMessage:
      'All Advanced Roadmaps users can view and edit the plan. You can restrict access later.',
  },
});
