import { defineMessages } from 'react-intl';

export enum DefaultAnswerFieldMessage {
  DatePlaceholder = 'DatePlaceholder',
  TimePlaceholder = 'TimePlaceholder',
}

export const IntlDefaultAnswerFieldMessages = defineMessages({
  [DefaultAnswerFieldMessage.DatePlaceholder]: {
    id: 'form-builder.DefaultAnswerField.DatePlaceholder',
    defaultMessage: 'Enter default date',
  },
  [DefaultAnswerFieldMessage.TimePlaceholder]: {
    id: 'form-builder.DefaultAnswerField.TimePlaceholder',
    defaultMessage: 'Enter default time',
  },
});
