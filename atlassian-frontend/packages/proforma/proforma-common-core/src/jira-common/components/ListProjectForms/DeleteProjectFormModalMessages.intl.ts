import { defineMessages } from 'react-intl';

export enum DeleteProjectFormModalMessage {
  Heading = 'Heading',
  Cancel = 'Cancel',
  Delete = 'Delete',
  ConfirmDeleteMsg = 'ConfirmDeleteMsg',
  WillRemoveRequestTypesMsg = 'WillRemoveRequestTypesMsg',
  WillRemoveIssueTypesMsg = 'WillRemoveIssueTypesMsg',
  FutureRequestMessage = 'FutureRequestMessage',
  AffectExistingIssues = 'AffectExistingIssues',
}

export const IntlDeleteProjectFormModalMessages = defineMessages({
  [DeleteProjectFormModalMessage.Heading]: {
    id: 'jira-common.ListProjectForms.Heading.non-final',
    defaultMessage: 'Delete {formName}?',
  },
  [DeleteProjectFormModalMessage.Cancel]: {
    id: 'jira-common.ListProjectForms.Cancel',
    defaultMessage: 'Cancel',
  },
  [DeleteProjectFormModalMessage.Delete]: {
    id: 'jira-common.ListProjectForms.Delete',
    defaultMessage: 'Delete',
  },
  [DeleteProjectFormModalMessage.WillRemoveRequestTypesMsg]: {
    id: 'jira-common.ListProjectForms.WillRemoveRequestTypesMsg',
    defaultMessage:
      'Deleting this form will also remove it from the following request types: ',
  },
  [DeleteProjectFormModalMessage.WillRemoveIssueTypesMsg]: {
    id: 'jira-common.ListProjectForms.WillRemoveIssueTypesMsg',
    defaultMessage:
      'Deleting this form will also remove it from the following issue types: ',
  },
  [DeleteProjectFormModalMessage.FutureRequestMessage]: {
    id: 'jira-common.ListProjectForms.FutureRequestMessage.non-final',
    defaultMessage:
      'Future requests created using these request types will no longer include this form.',
  },
  [DeleteProjectFormModalMessage.AffectExistingIssues]: {
    id: 'jira-common.ListProjectForms.AffectExistingIssues.non-final',
    defaultMessage:
      'This won’t affect existing issues that already use this form, or any copies of this form in other projects. Learn more about deleting forms',
  },
});
