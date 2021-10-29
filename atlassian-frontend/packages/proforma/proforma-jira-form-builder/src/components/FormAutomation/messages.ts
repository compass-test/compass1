import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  automationLink: {
    id: 'proforma-form-builder.Automation.AutomationLink',
    defaultMessage: 'Automation',
    description:
      'This will be a link to Jira Automation replacing {automationLink} in proforma-form-builder.Automation.MigrateParagraph.',
  },
  migrateHeader: {
    id: 'proforma-form-builder.Automation.MigrateHeader',
    defaultMessage: 'Migrate your automation rules',
    description:
      'The automation migration message header in the Form Builder setting tab.',
  },
  migrateParagraph: {
    id: 'proforma-form-builder.Automation.MigrateParagraph',
    defaultMessage:
      'We recommend re-building your form automation rules in {automationLink}',
    description:
      'The automation migration message paragraph in the Form Builder setting tab.',
  },
});
