import { defineMessages } from 'react-intl';

export enum FieldChoiceChangePopupMessages {
  Heading = 'Heading',
  Message = 'Message',
  ReplaceChoices = 'ReplaceChoices',
  Cancel = 'Cancel',
}

export const IntlFieldChoiceChangePopupMessages = defineMessages({
  [FieldChoiceChangePopupMessages.Heading]: {
    id: 'form-builder.QuestionSidebar.FieldChoiceChangePopup.Heading',
    defaultMessage: 'Choices will be replaced',
  },
  [FieldChoiceChangePopupMessages.Message]: {
    id: 'form-builder.QuestionSidebar.FieldChoiceChangePopup.Message',
    defaultMessage:
      'Linking to the {jiraFieldName} Jira field will replace all of your existing choices for the question with the Jira field choices.',
  },
  [FieldChoiceChangePopupMessages.ReplaceChoices]: {
    id: 'form-builder.QuestionSidebar.FieldChoiceChangePopup.ReplaceChoices',
    defaultMessage: 'Replace choices',
  },
  [FieldChoiceChangePopupMessages.Cancel]: {
    id: 'form-builder.QuestionSidebar.FieldChoiceChangePopup.Cancel',
    defaultMessage: 'Cancel',
  },
});
