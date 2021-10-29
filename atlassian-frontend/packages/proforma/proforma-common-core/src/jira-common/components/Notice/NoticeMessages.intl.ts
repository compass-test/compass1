import { defineMessages } from 'react-intl';

export enum NoticeMessage {
  Delete = 'Delete',
  Discard = 'Discard',
  Change = 'Change',
  Confirm = 'Confirm',
  Submit = 'Submit',
  Reopen = 'Reopen',
  Close = 'Close',
  Cancel = 'Cancel',
  UpgradeNow = 'UpgradeNow',
  AutomationRuleDeleteTitle = 'AutomationRuleDeleteTitle',
  AutomationRuleDeleteMsg = 'AutomationRuleDeleteMsg',
  DiscardChangesTitle = 'DiscardChangesTitle',
  DiscardChangesMsg = 'DiscardChangesMsg',
  DeleteFormTitle = 'DeleteFormTitle',
  DeleteFormMsg = 'DeleteFormMsg',
  ChangeFormAvailabilityTitle = 'ChangeFormAvailabilityTitle',
  ChangeFormAvailabilityToInternalMsg = 'ChangeFormAvailabilityToInternalMsg',
  ChangeFormAvailabilityToExternalMsg = 'ChangeFormAvailabilityToExternalMsg',
  CancelEditFormTitle = 'CancelEditFormTitle',
  CancelEditFormMsg = 'CancelEditFormMsg',
  SubmitFormTitle = 'SubmitFormTitle',
  SubmitFormMsg = 'SubmitFormMsg',
  SubmitFormPdfMsg = 'SubmitFormPdfMsg',
  SubmitFormLockMsg = 'SubmitFormLockMsg',
  SubmitFormPdfLockMsg = 'SubmitFormPdfLockMsg',
  ReopenFormTitle = 'ReopenFormTitle',
  ReopenFormMsg = 'ReopenFormMsg',
  RepositionNodeInFormBuilderTitle = 'RepositionNodeInFormBuilderTitle',
  RepositionNodeInFormBuilderMsg = 'RepositionNodeInFormBuilderMsg',
  RemoveConditionForDependentQuestionTitle = 'RemoveConditionForDependentQuestionTitle',
  RemoveConditionForDependentQuestionMsg = 'RemoveConditionForDependentQuestionMsg',
  ErrorExplanations1 = 'ErrorExplanations1',
  ErrorExplanations2 = 'ErrorExplanations2',
  ErrorExplanations3 = 'ErrorExplanations3',
  ErrorExplanations4 = 'ErrorExplanations4',
}

export const IntlNoticeMessages = defineMessages({
  [NoticeMessage.Delete]: {
    id: 'ui-notices.confirmText.Delete',
    defaultMessage: 'Delete',
  },
  [NoticeMessage.Discard]: {
    id: 'ui-notices.confirmText.Discard',
    defaultMessage: 'Discard',
  },
  [NoticeMessage.Change]: {
    id: 'ui-notices.confirmText.Change',
    defaultMessage: 'Change',
  },
  [NoticeMessage.Confirm]: {
    id: 'ui-notices.confirmText.Confirm',
    defaultMessage: 'Confirm',
  },
  [NoticeMessage.Submit]: {
    id: 'ui-notices.confirmText.Submit',
    defaultMessage: 'Submit',
  },
  [NoticeMessage.Reopen]: {
    id: 'ui-notices.confirmText.Reopen',
    defaultMessage: 'Reopen',
  },
  [NoticeMessage.Close]: {
    id: 'ui-notices.confirmText.Close',
    defaultMessage: 'Close',
  },
  [NoticeMessage.Cancel]: {
    id: 'ui-notices.confirmText.Cancel',
    defaultMessage: 'Cancel',
  },
  [NoticeMessage.UpgradeNow]: {
    id: 'ui-notices.confirmText.UpgradeNow',
    defaultMessage: 'Upgrade Now',
  },
  [NoticeMessage.AutomationRuleDeleteTitle]: {
    id: 'ui-notices.title.AutomationRuleDeleteTitle',
    defaultMessage: 'Confirm Deleting Automation Rule',
  },
  [NoticeMessage.AutomationRuleDeleteMsg]: {
    id: 'ui-notices.msg.AutomationRuleDeleteMsg',
    defaultMessage:
      'Please confirm you would like to delete this automation rule. This action cannot be reversed.',
  },
  [NoticeMessage.DiscardChangesTitle]: {
    id: 'ui-notices.title.DiscardChangesTitle',
    defaultMessage: 'Confirm Discarding Changes',
  },
  [NoticeMessage.DiscardChangesMsg]: {
    id: 'ui-notices.msg.DiscardChangesMsg',
    defaultMessage: 'All unsaved changes will be lost if you click "Discard".',
  },
  [NoticeMessage.DeleteFormTitle]: {
    id: 'ui-notices.title.DeleteFormTitle',
    defaultMessage: 'Confirm Deleting Form',
  },
  [NoticeMessage.DeleteFormMsg]: {
    id: 'ui-notices.msg.DeleteFormMsg',
    defaultMessage:
      'Are you sure you want to delete the {formName} form? This cannot be undone.',
  },
  [NoticeMessage.ChangeFormAvailabilityTitle]: {
    id: 'ui-notices.title.ChangeFormAvailabilityTitle',
    defaultMessage: 'Confirm Changing Form Availability',
  },
  [NoticeMessage.ChangeFormAvailabilityToInternalMsg]: {
    id: 'ui-notices.msg.ChangeFormAvailabilityToInternalMsg',
    defaultMessage:
      'Please confirm you want to change the form so that it is only accessible through the Jira issue, and not through the Customer Portal.',
  },
  [NoticeMessage.ChangeFormAvailabilityToExternalMsg]: {
    id: 'ui-notices.msg.ChangeFormAvailabilityToExternalMsg',
    defaultMessage:
      'Please confirm you want to change the form so that it is accessible through the Jira issue and the Customer Portal.',
  },
  [NoticeMessage.CancelEditFormTitle]: {
    id: 'ui-notices.title.CancelEditFormTitle',
    defaultMessage: 'Confirm Discarding Changes',
  },
  [NoticeMessage.CancelEditFormMsg]: {
    id: 'ui-notices.msg.CancelEditFormMsg',
    defaultMessage:
      'There are changes to answers on the {formName} form that will be lost if you choose "Confirm". Are you sure you want to continue?',
  },
  [NoticeMessage.SubmitFormTitle]: {
    id: 'ui-notices.title.SubmitFormTitle',
    defaultMessage: 'Confirm Form Submission',
  },
  [NoticeMessage.SubmitFormMsg]: {
    id: 'ui-notices.msg.SubmitFormMsg',
    defaultMessage: 'Are you sure you want to submit this form ?',
  },
  [NoticeMessage.SubmitFormPdfMsg]: {
    id: 'ui-notices.msg.SubmitFormPdfMsg',
    defaultMessage:
      'Submitting this form will also attach a PDF of the form to the issue/request. Are you sure you want to submit this form ?',
  },
  [NoticeMessage.SubmitFormLockMsg]: {
    id: 'ui-notices.msg.SubmitFormLockMsg',
    defaultMessage:
      'Are you sure you want to submit this form ? Once submitted no further changes can be made.',
  },
  [NoticeMessage.SubmitFormPdfLockMsg]: {
    id: 'ui-notices.msg.SubmitFormPdfLockMsg',
    defaultMessage:
      'Submitting this form will also attach a PDF of the form to the issue/request. Are you sure you want to submit this form ? Once submitted no further changes can be made.',
  },
  [NoticeMessage.ReopenFormTitle]: {
    id: 'ui-notices.title.ReopenFormTitle',
    defaultMessage: 'Confirm Reopening Form',
  },
  [NoticeMessage.ReopenFormMsg]: {
    id: 'ui-notices.msg.ReopenFormMsg',
    defaultMessage:
      'Are you sure you want to reopen the submitted form for editing?',
  },
  [NoticeMessage.RepositionNodeInFormBuilderTitle]: {
    id: 'ui-notices.title.RepositionNodeInFormBuilderTitle',
    defaultMessage: 'Confirm removal of condition(s)',
  },
  [NoticeMessage.RepositionNodeInFormBuilderMsg]: {
    id: 'ui-notices.msg.RepositionNodeInFormBuilderMsg',
    defaultMessage:
      'Conditions on sections can only refer to questions above the section. Your change has caused some condition(s) to break this rule. ProForma will remove the condition(s). Are you sure you want to continue?',
  },
  [NoticeMessage.RemoveConditionForDependentQuestionTitle]: {
    id: 'ui-notices.Notice.RemoveConditionForDependentQuestionTitle',
    defaultMessage: 'Confirm removal of condition(s)',
  },
  [NoticeMessage.RemoveConditionForDependentQuestionMsg]: {
    id: 'ui-notices.Notice.RemoveConditionForDependentQuestionMsg',
    defaultMessage:
      'You have modified or deleted some question(s) which are linked to one or more conditions. Your change has caused some condition(s) to break. ProForma will remove the condition(s). Are you sure you want to continue?',
  },
  [NoticeMessage.ErrorExplanations1]: {
    id: 'ui-notices.msg.ErrorExplanations1',
    defaultMessage: 'Please refer to our',
  },
  [NoticeMessage.ErrorExplanations2]: {
    id: 'ui-notices.msg.ErrorExplanations2',
    defaultMessage: 'Error Explanations',
  },
  [NoticeMessage.ErrorExplanations3]: {
    id: 'ui-notices.msg.ErrorExplanations3',
    defaultMessage: 'page for more details or contact',
  },
  [NoticeMessage.ErrorExplanations4]: {
    id: 'ui-notices.msg.ErrorExplanations4',
    defaultMessage: 'ThinkTilt Support',
  },
});
