import { defineMessages } from 'react-intl';

export enum EditChoiceMessage {
  NewOptionPlaceholder = 'NewOptionPlaceholder',
  SelectPlaceholder = 'SelectPlaceholder',
}

export const IntlEditChoiceMessages = defineMessages({
  [EditChoiceMessage.NewOptionPlaceholder]: {
    id: 'form-system.ChoiceQuestion.NewOptionPlaceholder',
    defaultMessage: 'New option...',
  },
  [EditChoiceMessage.SelectPlaceholder]: {
    id: 'form-system.ChoiceQuestion.SelectPlaceholder',
    defaultMessage: 'Select...',
  },
});
