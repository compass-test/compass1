import { defineMessages } from 'react-intl';

export enum ChoiceMessage {
  OtherPlaceholder = 'OtherPlaceholder',
  InsightChoicesLimitMsg = 'InsightChoicesLimitMsg',
}

export const IntlChoiceMessages = defineMessages({
  [ChoiceMessage.OtherPlaceholder]: {
    id: 'form-system.ChoiceQuestion.OtherPlaceholder',
    defaultMessage: 'Other...',
  },
  [ChoiceMessage.InsightChoicesLimitMsg]: {
    id: 'form-system.ChoiceQuestion.InsightChoicesLimitMsg',
    defaultMessage:
      'There are choices that are not listed here. Please contact the support team.',
  },
});
