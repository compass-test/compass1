import { defineMessages } from 'react-intl';

export default defineMessages({
  addAnother: {
    id: 'jira.portfolio-plan-wizard.plan-form.issue-sources-field.add-another',
    defaultMessage: 'Add another',
  },
  removeDialogHeading: {
    id:
      'jira.portfolio-plan-wizard.plan-form.issue-sources-field.remove-dialog-heading',
    defaultMessage: 'Remove {issueSourceName}',
  },
  removeDialogDescription: {
    id:
      'jira.portfolio-plan-wizard.plan-form.issue-sources-field.remove-dialog-description',
    defaultMessage:
      'All of the issues associated with {issueSourceName} will be removed from your plan.',
  },
  remove: {
    id: 'jira.portfolio-plan-wizard.plan-form.issue-sources-field.remove',
    defaultMessage: 'Remove',
    description: 'Remove button',
  },
  cancel: {
    id: 'jira.portfolio-plan-wizard.plan-form.issue-sources-field.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button',
  },
});
