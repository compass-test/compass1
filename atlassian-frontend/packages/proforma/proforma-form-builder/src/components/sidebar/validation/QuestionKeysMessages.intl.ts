import { defineMessages } from 'react-intl';

export enum QuestionKeysMessages {
  Heading = 'Heading',
  Message = 'Message',
  Close = 'Close',
}

export const IntlQuestionKeysMessages = defineMessages({
  [QuestionKeysMessages.Heading]: {
    id: 'form-builder.QuestionSidebar.QuestionKeys.Heading',
    defaultMessage: 'Question key in use',
  },
  [QuestionKeysMessages.Message]: {
    id: 'form-builder.QuestionSidebar.QuestionKeys.Message',
    defaultMessage:
      'The question key "{questionKey}" is already in use on this form. Please choose another question key.',
  },
  [QuestionKeysMessages.Close]: {
    id: 'form-builder.QuestionSidebar.QuestionKeys.Close',
    defaultMessage: 'Close',
  },
});
