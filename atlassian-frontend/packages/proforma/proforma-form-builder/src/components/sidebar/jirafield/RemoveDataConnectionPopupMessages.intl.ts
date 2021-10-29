import { defineMessages } from 'react-intl';

export enum RemoveDataConnectionPopupMessages {
  Heading = 'Heading',
  Message = 'Message',
  CurrentQuestionType = 'CurrentQuestionType',
  Choice = 'Choice',
  NewQuestionType = 'NewQuestionType',
  RemoveDataConnection = 'RemoveDataConnection',
  Cancel = 'Cancel',
}

export const IntlRemoveDataConnectionPopupMessages = defineMessages({
  [RemoveDataConnectionPopupMessages.Heading]: {
    id: 'form-builder.QuestionSidebar.RemoveDataConnectionPopup.Heading',
    defaultMessage: 'Link to data connection will be removed',
  },
  [RemoveDataConnectionPopupMessages.Message]: {
    id: 'form-builder.QuestionSidebar.RemoveDataConnectionPopup.Message',
    defaultMessage:
      'This question includes choices from a data connection to an outside source. Changing the question type will disconnect the question from {dataConnectionName}.',
  },
  [RemoveDataConnectionPopupMessages.CurrentQuestionType]: {
    id:
      'form-builder.QuestionSidebar.RemoveDataConnectionPopup.CurrentQuestionType',
    defaultMessage: 'Current question type:',
  },
  [RemoveDataConnectionPopupMessages.Choice]: {
    id: 'form-builder.QuestionSidebar.RemoveDataConnectionPopup.Choice',
    defaultMessage: 'Choice',
  },
  [RemoveDataConnectionPopupMessages.NewQuestionType]: {
    id:
      'form-builder.QuestionSidebar.RemoveDataConnectionPopup.NewQuestionType',
    defaultMessage: 'New question type:',
  },
  [RemoveDataConnectionPopupMessages.RemoveDataConnection]: {
    id:
      'form-builder.QuestionSidebar.RemoveDataConnectionPopup.RemoveDataConnection',
    defaultMessage: 'Remove data connection',
  },
  [RemoveDataConnectionPopupMessages.Cancel]: {
    id: 'form-builder.QuestionSidebar.RemoveDataConnectionPopup.Cancel',
    defaultMessage: 'Cancel',
  },
});
