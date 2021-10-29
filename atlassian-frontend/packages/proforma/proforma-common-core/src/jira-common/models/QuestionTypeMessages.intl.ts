import { defineMessages } from 'react-intl';

export enum QuestionTypeMessage {
  TextQuestionsGroupLabel = 'TextQuestionsGroupLabel',
  TextShortLabel = 'TextShortLabel',
  TextLongLabel = 'TextLongLabel',
  TextParagraphLabel = 'TextParagraphLabel',
  TextEmailLabel = 'TextEmailLabel',
  TextUrlLabel = 'TextUrlLabel',
  ChoiceQuestionsGroupLabel = 'ChoiceQuestionsGroupLabel',
  ChoiceSingleLabel = 'ChoiceSingleLabel',
  ChoiceMultipleLabel = 'ChoiceMultipleLabel',
  ChoiceDropdownLabel = 'ChoiceDropdownLabel',
  ChoiceDropdownMultipleLabel = 'ChoiceDropdownMultipleLabel',
  DateQuestionsGroupLabel = 'DateQuestionsGroupLabel',
  DateLabel = 'DateLabel',
  DateTimeLabel = 'DateTimeLabel',
  TimeLabel = 'TimeLabel',
  NumericQuestionsGroupLabel = 'NumericQuestionsGroupLabel',
  NumberLabel = 'NumberLabel',
  UserQuestionsGroupLabel = 'UserQuestionsGroupLabel',
  UserSingleLabel = 'UserSingleLabel',
  UserMultipleLabel = 'UserMultipleLabel',
}

export const IntlQuestionTypeMessages = defineMessages({
  [QuestionTypeMessage.TextQuestionsGroupLabel]: {
    id: 'form-builder.QuestionType.TextQuestionsGroupLabel',
    defaultMessage: 'Text questions',
  },
  [QuestionTypeMessage.TextShortLabel]: {
    id: 'form-builder.QuestionType.TextShortLabel',
    defaultMessage: 'Short text',
  },
  [QuestionTypeMessage.TextLongLabel]: {
    id: 'form-builder.QuestionType.TextLongLabel',
    defaultMessage: 'Long text',
  },
  [QuestionTypeMessage.TextParagraphLabel]: {
    id: 'form-builder.QuestionType.TextParagraphLabel',
    defaultMessage: 'Paragraph',
  },
  [QuestionTypeMessage.TextEmailLabel]: {
    id: 'form-builder.QuestionType.TextEmailLabel',
    defaultMessage: 'Email',
  },
  [QuestionTypeMessage.TextUrlLabel]: {
    id: 'form-builder.QuestionType.TextUrlLabel',
    defaultMessage: 'URL',
  },
  [QuestionTypeMessage.ChoiceQuestionsGroupLabel]: {
    id: 'form-builder.QuestionType.ChoiceQuestionsGroupLabel',
    defaultMessage: 'Choice questions',
  },
  [QuestionTypeMessage.ChoiceSingleLabel]: {
    id: 'form-builder.QuestionType.ChoiceSingleLabel',
    defaultMessage: 'Radio buttons',
  },
  [QuestionTypeMessage.ChoiceMultipleLabel]: {
    id: 'form-builder.QuestionType.ChoiceMultipleLabel',
    defaultMessage: 'Checkboxes',
  },
  [QuestionTypeMessage.ChoiceDropdownLabel]: {
    id: 'form-builder.QuestionType.ChoiceDropdownLabel',
    defaultMessage: 'Dropdown',
  },
  [QuestionTypeMessage.ChoiceDropdownMultipleLabel]: {
    id: 'form-builder.QuestionType.ChoiceDropdownMultipleLabel',
    defaultMessage: 'Multiselect dropdown',
  },
  [QuestionTypeMessage.DateQuestionsGroupLabel]: {
    id: 'form-builder.QuestionType.DateQuestionsGroupLabel',
    defaultMessage: 'Date questions',
  },
  [QuestionTypeMessage.DateLabel]: {
    id: 'form-builder.QuestionType.DateLabel',
    defaultMessage: 'Date',
  },
  [QuestionTypeMessage.DateTimeLabel]: {
    id: 'form-builder.QuestionType.DateTimeLabel',
    defaultMessage: 'Date & Time',
  },
  [QuestionTypeMessage.TimeLabel]: {
    id: 'form-builder.QuestionType.TimeLabel',
    defaultMessage: 'Time',
  },
  [QuestionTypeMessage.NumericQuestionsGroupLabel]: {
    id: 'form-builder.QuestionType.NumericQuestionsGroupLabel',
    defaultMessage: 'Numeric questions',
  },
  [QuestionTypeMessage.NumberLabel]: {
    id: 'form-builder.QuestionType.NumberLabel',
    defaultMessage: 'Number',
  },
  [QuestionTypeMessage.UserQuestionsGroupLabel]: {
    id: 'form-builder.QuestionType.UserQuestionsGroupLabel',
    defaultMessage: 'User questions',
  },
  [QuestionTypeMessage.UserSingleLabel]: {
    id: 'form-builder.QuestionType.UserSingleLabel',
    defaultMessage: 'Single user',
  },
  [QuestionTypeMessage.UserMultipleLabel]: {
    id: 'form-builder.QuestionType.UserMultipleLabel',
    defaultMessage: 'Multiple users',
  },
});
