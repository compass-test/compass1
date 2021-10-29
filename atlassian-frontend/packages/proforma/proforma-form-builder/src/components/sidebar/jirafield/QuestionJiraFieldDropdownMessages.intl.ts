import { defineMessages } from 'react-intl';

export enum QuestionJiraFieldDropdownMessage {
  InUse = 'InUse',
  ReadOnly = 'ReadOnly',
}

export const IntlQuestionJiraFieldDropdownMessages = defineMessages({
  [QuestionJiraFieldDropdownMessage.InUse]: {
    id: 'form-builder.QuestionSidebar.QuestionJiraFieldDropdown.InUse',
    defaultMessage: 'in use',
  },
  [QuestionJiraFieldDropdownMessage.ReadOnly]: {
    id: 'form-builder.QuestionSidebar.QuestionJiraFieldDropdown.ReadOnly',
    defaultMessage: 'read only',
  },
});
