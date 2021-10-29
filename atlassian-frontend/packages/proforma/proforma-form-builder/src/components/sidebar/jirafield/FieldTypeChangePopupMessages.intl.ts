import { defineMessages } from 'react-intl';

export enum FieldTypeChangePopupMessages {
  Heading = 'Heading',
  WillChangeQuestionType = 'WillChangeQuestionType',
  CurrentQuestionType = 'CurrentQuestionType',
  NewQuestionType = 'NewQuestionType',
  ChangeType = 'ChangeType',
  Cancel = 'Cancel',
}

export const IntlFieldTypeChangePopupMessages = defineMessages({
  [FieldTypeChangePopupMessages.Heading]: {
    id: 'form-builder.QuestionSidebar.FieldTypeChangePopup.Heading',
    defaultMessage: 'Question type will change',
  },
  [FieldTypeChangePopupMessages.WillChangeQuestionType]: {
    id:
      'form-builder.QuestionSidebar.FieldTypeChangePopup.WillChangeQuestionType',
    defaultMessage:
      'Linking to the {jiraFieldName} Jira field will change the question type.',
  },
  [FieldTypeChangePopupMessages.CurrentQuestionType]: {
    id: 'form-builder.QuestionSidebar.FieldTypeChangePopup.CurrentQuestionType',
    defaultMessage: 'Current question type:',
  },
  [FieldTypeChangePopupMessages.NewQuestionType]: {
    id: 'form-builder.QuestionSidebar.FieldTypeChangePopup.NewQuestionType',
    defaultMessage: 'New question type:',
  },
  [FieldTypeChangePopupMessages.ChangeType]: {
    id: 'form-builder.QuestionSidebar.FieldTypeChangePopup.ChangeType',
    defaultMessage: 'Change type',
  },
  [FieldTypeChangePopupMessages.Cancel]: {
    id: 'form-builder.QuestionSidebar.FieldTypeChangePopup.Cancel',
    defaultMessage: 'Cancel',
  },
});
