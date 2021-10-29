import { defineMessages } from 'react-intl';

export enum RemoveJiraFieldPopupMessages {
  Heading = 'Heading',
  WillRemoveLink = 'WillRemoveLink',
  CannotRemainLinked = 'CannotRemainLinked',
  CurrentQuestionType = 'CurrentQuestionType',
  NewQuestionType = 'NewQuestionType',
  RemoveJiraField = 'RemoveJiraField',
  Cancel = 'Cancel',
}

export const IntlRemoveJiraFieldPopupMessages = defineMessages({
  [RemoveJiraFieldPopupMessages.Heading]: {
    id: 'form-builder.QuestionSidebar.RemoveJiraFieldPopup.Heading',
    defaultMessage: 'Link to Jira field will be removed',
  },
  [RemoveJiraFieldPopupMessages.WillRemoveLink]: {
    id: 'form-builder.QuestionSidebar.RemoveJiraFieldPopup.WillRemoveLink',
    defaultMessage:
      'Changing the question type will remove the link to a Jira field.',
  },
  [RemoveJiraFieldPopupMessages.CannotRemainLinked]: {
    id: 'form-builder.QuestionSidebar.RemoveJiraFieldPopup.CannotRemainLinked',
    defaultMessage:
      'The {jiraFieldName} Jira field stores data in a different format and so cannot remain linked.',
  },
  [RemoveJiraFieldPopupMessages.CurrentQuestionType]: {
    id: 'form-builder.QuestionSidebar.RemoveJiraFieldPopup.CurrentQuestionType',
    defaultMessage: 'Current question type:',
  },
  [RemoveJiraFieldPopupMessages.NewQuestionType]: {
    id: 'form-builder.QuestionSidebar.RemoveJiraFieldPopup.NewQuestionType',
    defaultMessage: 'New question type:',
  },
  [RemoveJiraFieldPopupMessages.RemoveJiraField]: {
    id: 'form-builder.QuestionSidebar.RemoveJiraFieldPopup.RemoveJiraField',
    defaultMessage: 'Remove Jira field',
  },
  [RemoveJiraFieldPopupMessages.Cancel]: {
    id: 'form-builder.QuestionSidebar.RemoveJiraFieldPopup.Cancel',
    defaultMessage: 'Cancel',
  },
});
