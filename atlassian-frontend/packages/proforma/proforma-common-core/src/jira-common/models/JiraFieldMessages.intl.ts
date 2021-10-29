import { defineMessages } from 'react-intl';

export enum JiraFieldMessage {
  TextLabel = 'TextLabel',
  ChoiceMultipleLabel = 'ChoiceMultipleLabel',
  ChoiceSingleLabel = 'ChoiceSingleLabel',
  UnsupportedLabel = 'UnsupportedLabel',
  NoneLabel = 'NoneLabel',
}

export const IntlJiraFieldMessages = defineMessages({
  [JiraFieldMessage.TextLabel]: {
    id: 'form-system.JiraField.TextLabel',
    defaultMessage: 'Text',
  },
  [JiraFieldMessage.ChoiceMultipleLabel]: {
    id: 'form-system.JiraField.ChoiceMultipleLabel',
    defaultMessage: 'Multiple choice',
  },
  [JiraFieldMessage.ChoiceSingleLabel]: {
    id: 'form-system.JiraField.ChoiceSingleLabel',
    defaultMessage: 'Single choice',
  },
  [JiraFieldMessage.UnsupportedLabel]: {
    id: 'form-system.JiraField.UnsupportedLabel',
    defaultMessage: 'Unknown',
  },
  [JiraFieldMessage.NoneLabel]: {
    id: 'form-system.JiraField.NoneLabel',
    defaultMessage: 'Unknown',
  },
});
