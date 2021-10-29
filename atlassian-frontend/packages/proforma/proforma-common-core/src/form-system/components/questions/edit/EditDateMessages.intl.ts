import { defineMessages } from 'react-intl';

export enum EditDateMessages {
  DatePlaceholder = 'DatePlaceholder',
}

export const IntlEditDateMessages = defineMessages({
  [EditDateMessages.DatePlaceholder]: {
    id: 'form-system.DateQuestion.DatePlaceholder',
    defaultMessage: 'e.g. {date}',
  },
});
