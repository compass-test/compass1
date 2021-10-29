import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  formCardLayout: {
    id: 'proforma-jira-issue-create.FormCardLayout',
    defaultMessage: '{label}: {value}',
    description:
      'Row layout to display form information. The {label} will be replaced with another message from this file.',
  },
  formCardNameLabel: {
    id: 'proforma-jira-issue-create.FormCardNameLabel',
    defaultMessage: 'Name',
    description:
      'Form name label to go in "proforma-jira-issue-create.FormCardLayout" with the form name.',
  },
  formCardIssueTypeLabel: {
    id: 'proforma-jira-issue-create.FormCardIssueTypeLabel',
    defaultMessage: 'Type',
    description:
      'Issue type label to go in "proforma-jira-issue-create.FormCardLayout" with the issue type.',
  },
});
