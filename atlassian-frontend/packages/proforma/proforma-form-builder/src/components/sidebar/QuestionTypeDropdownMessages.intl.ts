import { defineMessages } from 'react-intl';

export enum QuestionTypeDropdownMessage {
  ChooseAQuestionType = 'ChooseAQuestionType',
}

export const IntlQuestionTypeDropdownMessages = defineMessages({
  [QuestionTypeDropdownMessage.ChooseAQuestionType]: {
    id: 'form-builder.QuestionTypeDropdown.ChooseAQuestionType',
    defaultMessage: 'Choose a question type',
  },
});
