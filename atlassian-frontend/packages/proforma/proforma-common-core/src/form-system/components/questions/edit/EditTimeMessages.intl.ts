import { defineMessages } from 'react-intl';

export enum EditTimeMessages {
  TimePlaceholder = 'TimePlaceholder',
}

export const IntlEditTimeMessages = defineMessages({
  [EditTimeMessages.TimePlaceholder]: {
    id: 'form-system.TimeQuestion.TimePlaceholder',
    defaultMessage: 'e.g. {time}',
  },
});
